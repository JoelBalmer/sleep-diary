import React, { Component } from "react";
import Calendar from "./components/calendar/calendar.js";
import Navbar from "./components/navbar/navbar.js";
import DayEntry from "./components/day_entry/day_entry.js";
import DateUtils from "./utils/time.js";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
const moment = require("moment");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "Sleep diary",
      date: new Date()
    };

    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleDiarySubmit = this.handleDiarySubmit.bind(this);
  }

  handleCalendarClick(date, jsEvent, view) {
    this.setState({
      date: new Date(date),
      view: "Diary Entry: "
    });
  }

  handleDiarySubmit(event) {
    this.setState({
      view: "Sleep diary"
    });
  }

  render() {
    let title =
      this.state.view === "Sleep diary"
        ? this.state.view
        : this.state.view + moment(this.state.date).format("DD/MM/YY");

    return (
      <div className="App">
        <Navbar title={title} />
        {this.state.view === "Sleep diary" && (
          <Calendar handleDayClick={this.handleCalendarClick} />
        )}
        {this.state.view === "Diary Entry: " && (
          <DayEntry
            date={this.state.date}
            onDiarySubmit={this.handleDiarySubmit}
          />
        )}
      </div>
    );
  }
}

export default App;
