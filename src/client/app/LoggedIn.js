import React, { Component } from 'react';

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-status">
        Logged In as <strong>{this.props.userName}</strong> <button onClick={this.props.onLogOutClick}>Log Out</button>
      </div>
    )
  }
}

export default LoggedIn;
