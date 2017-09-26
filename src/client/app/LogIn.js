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
      <div className="sidebar-module sidebar-module-inset">
        <form onSubmit={this.handleLogIn.bind(this)}>
          <p className="text-right"><label>id: </label> <input type="text" onChange={this.handleUserName}/></p>
          <p className="text-right"><label>pw: </label> <input type="password" onChange={this.handlePassword}/></p>
          <p className="text-right"><input type="submit" value="Log In"/></p>
        </form>
      </div>
    )
  }
}

export default LogIn;
