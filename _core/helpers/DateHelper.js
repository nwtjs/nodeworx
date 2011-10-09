(function(root) {

	/**
	 * Date helper class
	 * Allows easy formatting and display of dates
	 * If any dates are requested without a date, we take the current date
	 * @constructor
	 */
	function DateHelper() {
	};


	DateHelper.prototype.now = function() {
		return new Date();
	};


	/**
	 * Returns a date formatted in a "short" format
	 */
	DateHelper.prototype.short = function(date) {
		var d = new Date(date);
			day = d.getDate(),
			month = d.getMonth() + 1, //months are zero based
			year = d.getFullYear();

		return month + '/' + day + '/' + year;
	};


	/**
	 * Returns a date formatted in a "full" format
	 */
	DateHelper.prototype.full = function(date) {
		var d = new Date(date);
			day = d.getDate(),
			month = d.getMonth() + 1, //months are zero based
			year = d.getFullYear(),
			hours = d.getHours(),
			minutes = d.getMinutes();

		return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes ;
	};


	/**
	 * Returns the relative time since the provided date has passed
	 */
	DateHelper.prototype.relative = function(date) {
		var msDistance = new Date().getTime() - new Date(date).getTime(),
			minuteDistance = Math.round(Math.abs(msDistance / 60000));
			dateFormat = "";

		if (minuteDistance == 0) {
			dateFormat = "less than a minute";
		} else if (minuteDistance == 1) {
			dateFormat = "1 minute";
		} else if (minuteDistance < 45) {
			dateFormat = minuteDistance + " minutes";
		} else if (minuteDistance < 90) {
			dateFormat = "about 1 hour";
		} else if (minuteDistance < 1440) {
			dateFormat = "about " + Math.round(minuteDistance / 60) + " hours";
		} else if (minuteDistance < 2160) {
			dateFormat = "about 1 day";
		} else if (minuteDistance < 43200) {
			dateFormat = Math.round(minuteDistance / 1440) + " days";
		} else if (minuteDistance < 86400) {
			dateFormat = "about 1 month";
		} else if (minuteDistance < 525600) {
			dateFormat = Math.round(minuteDistance / 43200) + " months";
		} else if (minuteDistance < 1051200) {
			dateFormat = "about 1 year";
		} else {
			dateFormat = "over " + Math.round(minuteDistance / 525600) + " years";
		}

		return dateFormat + " ago";
	};

	root.DateHelper = DateHelper;
}(this));
