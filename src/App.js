import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import DateUtils from "./utils/time.js";

import Calendar from "./components/calendar/calendar.js";
import Navbar from "./components/navbar/navbar.js";
import DayEntry from "./components/day_entry/day_entry.js";

const moment = require("moment");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "Sleep diary",
      entries: []
    };

    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleDiarySubmit = this.handleDiarySubmit.bind(this);
    this.handleDiaryCancel = this.handleDiaryCancel.bind(this);
    this.handleDiaryDelete = this.handleDiaryDelete.bind(this);
  }

  handleCalendarClick(date, jsEvent, view) {
    this.setState({
      date: new Date(moment(date).add(16, "h")),
      view: "Diary entry: "
    });
  }

  handleDiarySubmit(event) {
    let entries = this.state.entries;
    entries.push(this.state.date);

    this.setState({
      view: "Sleep diary",
      entries: entries
    });
  }

  handleDiaryCancel(event) {
    this.setState({
      view: "Sleep diary"
    });
  }

  handleDiaryDelete(event) {
    let entries = this.state.entries;
    entries.splice(entries.indexOf(this.state.date), 1);

    this.setState({
      view: "Sleep diary",
      entries: entries
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
          <Calendar
            date={this.state.date}
            entries={this.state.entries}
            handleDayClick={this.handleCalendarClick}
          />
        )}
        {this.state.view === "Diary entry: " && (
          <DayEntry
            date={this.state.date}
            onDiarySubmit={this.handleDiarySubmit}
            onDiaryCancel={this.handleDiaryCancel}
            onDiaryDelete={this.handleDiaryDelete}
          />
        )}
      </div>
    );
  }
}

export default App;
