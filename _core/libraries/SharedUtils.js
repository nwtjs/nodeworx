(function(root) {
	/**
	 * Extends a class with another
	 * @param class Sub class that is inheriting from the superclass
	 * @param class Super class
	 */
	global.nwt.extend = function(subType, superType) {
			var intermediateConstructor = function() {};
			intermediateConstructor.prototype = superType.prototype;
			subType.prototype = new intermediateConstructor();
			subType._super = superType;
	}


	/**
	 * Random number generator between a range
	 * @param integer Min of range
	 * @param integer Max of range
	 */
	global.nwt.random = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function NWTValidation() {
		
	}


	/**
	 * Validates email addresses
	 */
	NWTValidation.prototype._validate_VALID_EMAIL = function(value, definition) {
		var re = /^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i;

		if( !re.test(value) ) {
			throw "OMG WRON EMAIL.";
		}
	};


	/**
	 * Validates uniqueness
	 */
	NWTValidation.prototype._validate_UNIQUE = function(value, definition) {
		// TODO: Implement on server side
	};


	/**
	 * Validates min length
	 */
	NWTValidation.prototype._validate_MIN_LENGTH = function(value, definition) {
		if( value.length < definition.value ) {
			throw "Not enough characters (" + definition.value + " min).";
		}
	};


	/**
	 * Validates max length
	 */
	NWTValidation.prototype._validate_MAX_LENGTH = function(value, definition) {
		if( value.length > definition.value ) {
			throw "Too many characters (" + definition.value + " max).";
		}
	};


	/**
	 * Validates alpha only strings
	 */
	NWTValidation.prototype._validate_ALPHA = function(value, definition) {
		var re = /^[A-Za-z]+$/;

		if( !re.test(value) ) {
			throw "Must be letters only."
		}
	};


	/**
	 * Validates alpha numeric strings
	 */
	NWTValidation.prototype._validate_ALPHA_NUMERIC = function(value, definition) {
		var re = /^[A-Za-z0-9]+$/;

		if( !re.test(value) ) {
			throw "Must be alphanumeric."
		}
	};


	/**
	 * Validates a number
	 */
	NWTValidation.prototype._validate_NUMERIC = function(value, definition) {
		var re = /^[0-9]+$/;

		if( !re.test(value) ) {
			throw "Must be numeric."
		}
	};


	/**
	 * Validates that something looks like a url
	 */
	NWTValidation.prototype._validate_URL = function(value, definition) {
		var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

		if( !re.test(value) ) {
			throw "Valid URL not found."
		}
	};


	/**
	 * Runs a validation rule on a single method
	 */
	NWTValidation.prototype.validate = function(rule, value, definition) {
		var method = '_validate_' + rule;

		if( !(definition instanceof Object) ) {
			definition = {value: definition};
		}

		try {
			this[method](value, definition);
		} catch(e) {
			return false;
		}
		return true;
	};


	/**
	 * Validates a provided value with a ruleset
	 */
	NWTValidation.prototype.validateProvidedValue = function(value, rules) {
		var response = {status: true};

		for( var i in rules ) {
			var method = '_validate_' + i;

			var definition = rules[i];

			if( !(definition instanceof Object) ) {
				definition = {value: definition};
			}

			try {
				this[method](value, definition);
			} catch(e) {
				response.status = false;
				response[rules[i]] = e;
			}
		}

		return response;
	};

	global.nwt.validation = new NWTValidation();


}(this));