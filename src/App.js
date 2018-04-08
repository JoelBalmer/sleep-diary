import React, { Component } from "react";
import DateUtils from "./utils/time.js";
import "./App.css";

//add date picker

class App extends Component {
  constructor(props) {
    super(props);

    let currentDate = new Date();
    let date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      17
    );

    this.state = {
      times: [66, 78, 168, 186],
      date: date
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

    console.log(value);
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
        <h1>
          {"Enter your sleep for " +
            this.state.date.getDate() +
            "/" +
            this.state.date.getMonth() +
            "/" +
            this.state.date.getFullYear()}
        </h1>

        {this.state.times.map((item, index) => {
          return (
            <div>
              <h3>{"Enter the time you " + sliderTexts[index]}</h3>
              <p className={"timeLabel timeLabel_" + index}>
                {DateUtils.getNewHours(
                  this.state.date,
                  this.state.times[index]
                )}
              </p>
              <input
                list="times"
                className={"slider slider_" + index}
                type="range"
                min="0"
                max="288"
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
