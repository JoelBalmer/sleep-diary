import React, { Component } from "react";
import DateUtils from "./utils/time.js";
import Calendar from "./components/calendar/calendar.js";
import DayEntry from "./components/day_entry/day_entry.js";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

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
    //converts slider value to minutes
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
      wakeTime: event.target.value
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
        <Calendar />
        <DayEntry />
      </div>
    );
  }
}

export default App;
