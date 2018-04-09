var moment = require("moment");

const formatZero = value => {
	if (value < 10) {
		return "0" + value;
	}
	return value;
};

const minsToMils = mins => {
	return mins * 5 * 60 * 1000;
};

exports.getNewHours = (date, timeToAdd) => {
	let totalMils = Number(date.getTime()) + Number(minsToMils(timeToAdd));
	let newDate = new Date(totalMils);
	return moment(newDate).format("h:mm a");
};

exports.formatWakeTime = mins => {
	let hours = Math.floor(mins / 60);
	let minutes = mins % 60;
	return formatZero(hours) + "h " + formatZero(minutes) + "m";
};

exports.subtractDates = (date, mins1, mins2) => {
	let startDate = moment(date).add(minsToMils(mins1));
	let endDate = moment(date).add(minsToMils(mins2));
	let difference = moment(endDate).diff(startDate, "minutes");
	return this.formatWakeTime(difference);
};
