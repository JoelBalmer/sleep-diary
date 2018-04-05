import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Enter your sleep</h1>
        <h3>Time in bed</h3>
        <input className="bed-time" type="range" min="0" max="5" />
        <h3>Time asleep</h3>
        <input className="bed-time" type="range" min="0" max="5" />
      </div>
    );
  }
}

export default App;
