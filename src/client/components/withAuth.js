import React, { Component} from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService('http://localhost:8080');

  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        jwt: null
      }
    }

    componentWillMount() {
      console.log('withAuth componentWillMount called');
      if (!Auth.isLoggedIn()) { // Checks local storage for jwt and makes sure it isn't expired
        this.props.history.replace('/login'); //
      } else {
        try {
          const profile = Auth.getProfile(); // returns decoded jwt;
          this.setState({
            jwt: profile
          })
        } catch(err){
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      if (this.state.jwt) {
        return (
          <AuthComponent history={this.props.history} jwt={this.state.jwt} />
        )
      }
      else {
        return null;
      }
    }
  }
}
