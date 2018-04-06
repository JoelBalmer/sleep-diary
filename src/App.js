import React, { Component } from "react";
import "./App.css";
import DateUtils from "./utils/time.js";

let date = DateUtils.getDate();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      times: [2, 7, 13, 18]
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    const value = event.target.value;
    const newTimeIndex = event.currentTarget.getAttribute("event-order");
    let newTimes = this.state.times.map(item => item);
    newTimes[newTimeIndex] = value;
    this.setState({
      times: newTimes
    });
  }

  render() {
    const sliderTexts = [
      "got into bed",
      "fell asleep",
      "woke up",
      "got out of bed"
    ];

    return (
      <div className="App">
        <h1>{"Enter your sleep for " + date}</h1>

        {this.state.times.map((item, index) => {
          return (
            <div>
              <h3>{"Enter the time you " + sliderTexts[index]}</h3>
              <p className={"timeLabel timeLabel_" + index}>
                {this.state.times[index]}
              </p>
              <input
                className={"slider slider_" + index}
                type="range"
                min="0"
                max="20"
                step="1"
                defaultValue={this.state.times[index]}
                onChange={this.handleOnChange}
                event-order={index}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
