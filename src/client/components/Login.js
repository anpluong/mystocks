import React, { Component } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import AuthService from './AuthService';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService(); // Create an instance of the AuthService class.
        // This gives us access to the authentication methods we need
    }

    componentWillMount() {
      if (this.Auth.isLoggedIn()) {
        this.props.history.replace('/'); // redirect to home if already logged in
      }
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form className="login" onSubmit={this.handleFormSubmit}>
                        <input
                            id="email"
                            className="form-item"
                            placeholder="Email"
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            id="password"
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                    <div className="register-link">
                      <Link to='/register'>Don't have an account?</Link>
                    </div>
                </div>
            </div>
        );
    }

    handleChange(e){
      this.setState({[e.target.name]: e.target.value})
    }

    handleFormSubmit(e) {
      console.log('handleFormSubmit called');
      e.preventDefault();
      console.log('THIS.STATE.EMAIL', this.state.email)
      console.log('THIS.STATE.PASSWORD', this.state.password);

      // Call the login method on the class instance that was created in the constructor
      this.Auth.login(this.state.email, this.state.password)
          .then(res => {
             this.props.history.replace('/');
          })
          .catch(err => {
              alert(err);
          })
    }
}

export default Login;
