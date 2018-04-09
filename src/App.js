import React, { Component } from "react";
import DateUtils from "./utils/time.js";
import "bootstrap/dist/css/bootstrap.css";
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
      wakeTime: 0,
      date: date
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleWakeChange = this.handleWakeChange.bind(this);
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

  handleWakeChange(event) {
    //convert slider value to minutes
    this.setState({
      wakeTime: event.target.value * 5
    });
  }

  render() {
    //create array for less repeated code
    const sliderTexts = [
      "got into bed",
      "fell asleep",
      "woke up",
      "got out of bed",
      "were awake for in the night"
    ];

    return (
      <div className="App">
        <div className="row">
          <div className="diary-entry col-lg-9 col-md-9 col-sm-9 col-xs-9">
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

            <h3>{"Enter the time you " + sliderTexts[4]}</h3>
            <p className="wake-time">
              {DateUtils.formatWakeTime(this.state.wakeTime)}
            </p>
            <input
              type="range"
              min="0"
              max="144"
              defaultValue="0"
              onChange={this.handleWakeChange}
            />
          </div>
          <div className="overview col-lg-3 col-md-3 col-sm-3 col-xs-3">
            <h1>Overview</h1>
            <h3>Time in bed</h3>
            <p>
              {DateUtils.subtractDates(
                this.state.date,
                this.state.times[0],
                this.state.times[3]
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
