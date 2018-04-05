import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="range" min="0" max="100" />
      </div>
    );
  }
}

export default App;
