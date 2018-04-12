import React from "react";
import "./calendar.css";
import $ from "jquery";
import "fullcalendar";
import "fullcalendar/dist/fullcalendar.css";

class Calendar extends React.Component {
	constructor(props) {
		super(props);
	}

	/*
	let entries = this.props.entries.map((entry, index) =>{
		{
			title: "Entry made",
			allDay: true,
			start: entry.date,
			end: entry.date,
			rendering: "background",
			backgroundColor: "lightgreen"
		}
	});
	*/

	componentDidMount() {
		$("#calendar").fullCalendar({
			theme: "standard",
			timezone: "local",
			defaultView: "month",
			contentHeight: "auto",
			dayClick: this.props.handleDayClick,
			events: [
				{
					title: "Entry made",
					allDay: true,
					start: this.props.date,
					end: this.props.date,
					rendering: "background",
					backgroundColor: "lightgreen"
				}
			]
		});
	}

	render() {
		return <div id="calendar" />;
	}
}

export default Calendar;
