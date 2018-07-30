import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Calendar from "./components/calendar/calendar.js";
import Navbar from "./components/navbar/navbar.js";
import DayEntry from "./components/day_entry/day_entry.js";
const moment = require("moment");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: "Sleep diary",
      entries: [],
      nameText: "Login"
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
    let existingEntry = false;

    //check we don't already have an entry
    entries.forEach(currentEntry => {
      if (+this.state.date === +currentEntry) {
        existingEntry = true;
      }
    });

    //add entry if not found
    if (!existingEntry) {
      entries.push(this.state.date);
    }

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

    entries.forEach(currentEntry => {
      if (+this.state.date === +currentEntry) {
        entries.splice(entries.indexOf(currentEntry), 1);
        return;
      }
    });

    this.setState({
      view: "Sleep diary",
      entries: entries
    });
  }

  componentDidMount() {
    fetch("/profile")
      .then(res => res.json())
      .then(profile => {
        this.setState({
          nameText: profile.nameText,
          uid: profile.userId
        });

        if (Number(profile.userId)) {
          fetch("/entries/" + profile.userId)
            .then(res => res.json())
            .then(entries => {
              let newEntries = [];
              entries.forEach(entry => {
                newEntries.push(new Date(entry.date));
              });
              this.setState({
                view: "Sleep diary",
                entries: newEntries
              });
            });
        }
      });
  }

  render() {
    let title =
      this.state.view === "Sleep diary"
        ? this.state.view
        : this.state.view + moment(this.state.date).format("DD/MM/YY");

    let helpInfo = this.state.view === "Sleep diary" ? "a day" : "save";

    return (
      <div className="App">
        <Navbar title={title} nameText={this.state.nameText} />
        <h4>Click {helpInfo} to make an entry</h4>
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
            disableSubmit={!this.state.entries[this.state.date] ? "" : "true"}
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
