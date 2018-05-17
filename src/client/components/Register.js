import React, { Component } from 'react';
import AuthService from './AuthService';

class Register extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount() {
      if (this.Auth.isLoggedIn()) {
        this.props.history.replace('/');
      }
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Register</h1>
                    <form className="register" onSubmit={this.handleFormSubmit}>
                        <input
                            id="registerEmail"
                            className="form-item"
                            placeholder="Email"
                            name="email"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <input
                            id="registerPassword"
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            id="registerPassconf"
                            className="form-item"
                            placeholder="Confirm password"
                            name="passconf"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
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
      if (this.state.password !== this.state.passconf) {
        console.log('password and passconf do not match');
        return null;
      }
      console.log('THIS.STATE.EMAIL', this.state.email)
      console.log('THIS.STATE.PASSWORD', this.state.password);

      this.Auth.register(this.state.email, this.state.password)
          .then(res => {
             this.props.history.replace('/');
          })
          .catch(err => {
              alert(err);
          })
    }
}

export default Register;
