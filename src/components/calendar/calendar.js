import React from "react";
import "./calendar.css";
import $ from "jquery";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";

class Calendar extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let entries = [];
		console.log(this.props.entries);
		for (
			let entryIndex = 0;
			entryIndex < this.props.entries.length;
			entryIndex++
		) {
			let newEntry = {};
			newEntry.title = "Entry made";
			newEntry.allDay = true;
			newEntry.start = this.props.entries[entryIndex];
			newEntry.end = this.props.entries[entryIndex];
			newEntry.rendering = "background";
			entries.push(newEntry);
		}

		$("#calendar").fullCalendar({
			theme: "standard",
			timezone: "local",
			defaultView: "month",
			contentHeight: "auto",
			dayClick: this.props.handleDayClick,
			events: entries
		});
	}

	render() {
		return <div id="calendar" />;
	}
}

export default Calendar;
