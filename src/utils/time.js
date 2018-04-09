var moment = require("moment");

const formatZero = value => {
	if (value < 10) {
		return "0" + value;
	}

	return value;
};

exports.getNewHours = (date, timeToAdd) => {
	let milsToAdd = timeToAdd * 5 * 60 * 1000;
	let totalMils = Number(date.getTime()) + Number(milsToAdd);
	let newDate = new Date(totalMils);
	return moment(newDate).format("h:mm a");
};

exports.formatWakeTime = mins => {
	let hours = Math.floor(mins / 60);
	let minutes = mins % 60;
	return formatZero(hours) + "h " + formatZero(minutes) + "m";
};
