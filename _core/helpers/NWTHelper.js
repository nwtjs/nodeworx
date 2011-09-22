(function(root) {

	/**
	 * Each helper returns an object which is ineherits from this
	 */
	function NWTHelperInstance() {
		
	}


	/**
	 * Magic method which renders the object
	 * Calles render on the subclass
	 */
	NWTHelperInstance.prototype.toString = function() {
		return this.render();
	}


	/**
	 * Generic property getter
	 */
	NWTHelperInstance.prototype.get = function(item) {
		return this[item];
	};


	/**
	 * Parses this.attributes and returns a string like: title="My Title" onclick="#"
	 */
	NWTHelperInstance.prototype._parseAttributes = function() {
		var attributes = [];

		for( var i in this.attributes ) {
			attributes.push(i + '="' +this.attributes[i] + '"');
		}

		return attributes.join(' ');
	};


	root.NWTHelperInstance = NWTHelperInstance;

	function NWTHelper() {
		
	}

	root.NWTHelper = NWTHelper;
}(this));