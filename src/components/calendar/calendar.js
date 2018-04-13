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
<<<<<<< HEAD
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
			console.log(newEntry);

			entries.push(newEntry);
		}

=======
>>>>>>> d4de9ba7f287d3d4b2bdb3c784353d34bf7eba34
		$("#calendar").fullCalendar({
			theme: "standard",
			timezone: "local",
			defaultView: "month",
			contentHeight: "auto",
			dayClick: this.props.handleDayClick,
<<<<<<< HEAD
			events: entries
=======
			events: this.props.entries
>>>>>>> d4de9ba7f287d3d4b2bdb3c784353d34bf7eba34
		});
	}

	render() {
		return <div id="calendar" />;
	}
}

export default Calendar;
