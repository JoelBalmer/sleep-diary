import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Enter your sleep</h1>
        <h3>Went to bed at</h3>
        <input
          className="bed-time"
          type="range"
          min="0"
          max="10"
          defaultValue="0"
          list="times"
          step="1"
        />
      </div>
    );
  }
}

export default App;
