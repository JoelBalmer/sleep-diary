import "./navbar.css";
import React from "react";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar nav-bar d-flex p-2">
        <div className="logo p-2 bd-highlight">
          <a className="logo p-2 bd-highlight" href="http://localhost:3000/">
            <img src="./img/logo.png" />
          </a>
        </div>
        <h1 className="title justify-content-center">{this.props.title}</h1>
        <a className="login p-2 bd-highlight" href="http://localhost:3000/">
          <h2 className="">Login</h2>
        </a>
      </div>
    );
  }
}

export default Navbar;
