import React, { Component } from "react";
import Calendar from "./components/calendar/calendar.js";
import DayEntry from "./components/day_entry/day_entry.js";
import DateUtils from "./utils/time.js";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const currentDate = DateUtils.getCurrentDate();

    this.state = {
      view: "calendar",
      date: currentDate
    };

    this.handleCalendarClick = this.handleCalendarClick.bind(this);
  }

  handleCalendarClick(date, jsEvent, view) {
    alert("handling day click!" + date);
  }

  render() {
    return (
      <div className="App">
        {this.state.view === "calendar" && (
          <Calendar handleDayClick={this.handleCalendarClick} />
        )}
        {this.state.view === "dayEntry" && <DayEntry date={this.state.date} />}
      </div>
    );
  }
}

export default App;
