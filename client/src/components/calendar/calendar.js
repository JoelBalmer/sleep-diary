import React from "react";
import $ from "jquery";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";
import "./calendar.css";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.updateCalendar = this.updateCalendar.bind(this);
  }

  updateCalendar() {
    let entries = [];
    for (
      let entryIndex = 0;
      entryIndex < this.props.entries.length;
      entryIndex++
    ) {
      let newEntry = {};
      newEntry.title = "Entry made";
      newEntry.allDay = true;
      newEntry.start = new Date(this.props.entries[entryIndex]);
      newEntry.end = new Date(this.props.entries[entryIndex]);
      newEntry.rendering = "background";
      entries.push(newEntry);
    }

    return entries;
  }

  componentDidMount() {
    $("#calendar").fullCalendar({
      theme: "standard",
      timezone: "local",
      defaultView: "month",
      contentHeight: "auto",
      dayClick: this.props.handleDayClick,
      events: this.updateCalendar()
    });
  }

  componentDidUpdate() {
    $("#calendar").fullCalendar("removeEvents");
    $("#calendar").fullCalendar("addEventSource", this.updateCalendar());
  }

  render() {
    return <div id="calendar" />;
  }
}

export default Calendar;
