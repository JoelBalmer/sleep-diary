import "./navbar.css";
import React from "react";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.export = this.export.bind(this);
  }

  export() {
    alert("Export entries as a CSV file - coming soon!");
  }

  render() {
    return (
      <div className="navbar nav-bar">
        <div className="logo nav navbar-nav pull-sm-left">
          <a className="logo-link" href="http://localhost:3000/">
            <img src="./img/logo.png" />
          </a>
        </div>
        <h1 className="title nav navbar-nav mx-auto">{this.props.title}</h1>
        <div className="login nav navbar-nav pull-sm-right">
          <a className="login-link" onClick={this.export}>
            <h2>Export</h2>
          </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
