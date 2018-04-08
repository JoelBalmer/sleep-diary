var moment = require("moment");

exports.getNewHours = (date, timeToAdd) => {
	let milsToAdd = timeToAdd * 5 * 60 * 1000;
	let totalMils = Number(date.getTime()) + Number(milsToAdd);
	let newDate = new Date(totalMils);
	return moment(newDate).format("h:mm a");
};
