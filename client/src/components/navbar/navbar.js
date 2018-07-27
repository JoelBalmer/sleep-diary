import "./navbar.css";
import React from "react";
var userInfo = require("../../user_info");

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameText: userInfo.nameText
    };

    this.login = this.login.bind(this);
  }

  login() {
    document.location.href = "/auth/facebook";
  }

  render() {
    return (
      <div className="navbar nav-bar">
        <div className="logo nav navbar-nav pull-sm-left">
          <a className="logo-link" href={document.location.href}>
            <img src="./img/logo.png" />
          </a>
        </div>
        <h1 className="title nav navbar-nav mx-auto">{this.props.title}</h1>
        <div className="login nav navbar-nav pull-sm-right">
          <a className="login-link" onClick={this.login}>
            <h2>{this.state.nameText}</h2>
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
