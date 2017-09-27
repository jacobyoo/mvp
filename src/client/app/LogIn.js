import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleLogIn(e) {
    e.preventDefault();
    let user = { username: this.state.username, password: this.state.password };
    this.props.onLogInSubmit(user);
  }

  handleUserName(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    return (
      <div className="login-status">
        <form onSubmit={this.handleLogIn.bind(this)}>
          <label>username: </label> <input type="text" onChange={this.handleUserName}/>&nbsp;&nbsp;
          <label>password: </label> <input type="password" onChange={this.handlePassword}/>&nbsp;
          <input type="submit" value="Log In"/>
        </form>
      </div>
    )
  }
}

export default LogIn;
