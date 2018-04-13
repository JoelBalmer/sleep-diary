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
<<<<<<< HEAD
      entries: []
=======
      entries: [
        {
          title: "Entry made",
          allDay: true,
          start: new Date(),
          end: new Date(),
          rendering: "background",
          backgroundColor: "lightgreen"
        }
      ]
>>>>>>> d4de9ba7f287d3d4b2bdb3c784353d34bf7eba34
    };

    this.handleCalendarClick = this.handleCalendarClick.bind(this);
    this.handleDiarySubmit = this.handleDiarySubmit.bind(this);
    this.handleDiaryCancel = this.handleDiaryCancel.bind(this);
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
<<<<<<< HEAD
=======
            date={this.state.date}
            entries={this.state.entries}
>>>>>>> d4de9ba7f287d3d4b2bdb3c784353d34bf7eba34
            handleDayClick={this.handleCalendarClick}
            entries={this.state.entries}
          />
        )}
        {this.state.view === "Diary entry: " && (
          <DayEntry
            date={this.state.date}
            onDiarySubmit={this.handleDiarySubmit}
            onDiaryCancel={this.handleDiaryCancel}
          />
        )}
      </div>
    );
  }
}

export default App;
