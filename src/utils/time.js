exports.getNewHours = (date, hoursToAdd) => {
	let milsToAdd = hoursToAdd * 60 * 60 * 1000;
	let totalMils = Number(date.getTime()) + Number(milsToAdd);
	let newDate = new Date(totalMils);
	return Number(newDate.getHours());
};
