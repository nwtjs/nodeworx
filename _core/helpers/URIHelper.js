(function(root) {

	/**
	 * URI helper class
	 * Allows easy access to URI params/encoding
	 * @constructor
	 */
	function URIHelper() {
	};


	/**
	 * Returns a URI segment based on the name
	 */
	URIHelper.prototype.get = function(param) {
		return global.context().request.params[param];
	};

	root.URIHelper = URIHelper;
}(this));
