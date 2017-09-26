import React, { Component } from 'react';

class LoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar-module sidebar-module-inset">
        <div> Logged In as <strong>{this.props.userName}</strong> </div>
        <button onClick={this.props.onLogOutClick}>Log Out</button>
        </div>
    )
  }
}

export default LoggedIn;
