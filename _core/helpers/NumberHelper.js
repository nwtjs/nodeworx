(function(root) {

	/**
	 * Number helper class
	 * Allows easy formatting and display of numbers
	 * @constructor
	 */
	function NumberHelper() {
	};


	/**
	 * Returns a number formatted to params
	 */
	NumberHelper.prototype.format = function(number, decimals, decPoint, thousandsSep) {

		decimals = decimals || 2;
		decPoint = decPoint || '.';
		thousandsSep = thousandsSep || ',';

		var number = number + '',
			numberParts = number.split('.'),
			currentPart = numberParts[0];

		var decPart = numberParts.length > 1 ? decPoint + numberParts[1] : '',
			thousandsTest = /(\d+)(\d{3})/;

		while (thousandsTest.test(currentPart)) {
			currentPart = currentPart.replace(thousandsTest, '$1' + thousandsSep + '$2');
		}

		if( decimals > 0 ) {
			decPart = decPart.substring(0, decimals+1);
			currentPart += decPart;
		}

		return currentPart;
	};

	root.NumberHelper = NumberHelper;
}(this));
