import decode from 'jwt-decode';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:3000' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        console.log('this.Auth.login called');
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            console.log('/login response from server: ', res);
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    register(email, password) {
        console.log('this.Auth.register called');
        return this.fetch(`${this.domain}/register`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
          console.log('/login response from server: ', res);
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    isLoggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token);
        // !! coerces an object to a boolean
        // anything other than 0, undefined, null, etc returns true (i.e. string of JWT);
    }

    isTokenExpired(token) {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) { // Checking if token is expired
            return true;
          } else {
            return false;
          }
        }
        catch (err) {
          return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
      console.log('getProfile()');
      // Using jwt-decode npm package to decode the token
      console.log('decoded token: ', decode(this.getToken()));
      return decode(this.getToken());
    }


    fetch(url, options) {
      console.log('this.fetch called')
      // performs api calls sending the required authentication headers
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      // Setting Authorization header
      // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
      if (this.isLoggedIn()) {
          headers['Authorization'] = 'Bearer ' + this.getToken()
      }
      return fetch(url, {
          headers,
          ...options
      })
      .then(this._checkStatus)
      .then(response => response.json());
    }

    _checkStatus(response) {
      // raises an error in case response status is not a success
      if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
        return response;
      } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
}
