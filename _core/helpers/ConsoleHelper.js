(function(root) {

	/**
	 * Console helper class
	 * Helper methods to log data from the view
	 * The console object is not generally available in a view, so we need this
	 * @constructor
	 */
	function ConsoleHelper() {
	};


	ConsoleHelper.prototype.log = function() {

		for( var i = 0 ; i < arguments.length ; i++ ) {
			var argument = arguments[i];
			console.log(argument);
		}

	};

	root.ConsoleHelper = ConsoleHelper;
}(this));
