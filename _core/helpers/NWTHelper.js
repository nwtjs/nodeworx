(function(root) {

	/**
	 * Each helper returns an object which is ineherits from this
	 */
	function NWTHelperInstance() {
		
	}

	NWTHelperInstance.prototype.toString = function() {
		return this.render();
	}

	NWTHelperInstance.prototype.get = function(item) {
		return this[item];
	};

	root.NWTHelperInstance = NWTHelperInstance;

	function NWTHelper() {
		
	}

	root.NWTHelper = NWTHelper;
}(this));