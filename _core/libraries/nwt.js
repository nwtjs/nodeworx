(function(root) {
	/**
	 * Utility class
	 * @constructor
	 */
	function NWTUtils() {
	
	}
	
	
	/**
	 * Clones an object
	 * @param object Object to clone
	 */
	NWTUtils.prototype.clone = function(obj) {
	
		if(obj == null || typeof(obj) != 'object') {
			return obj;
			}
	
		var temp = new obj.constructor();
	
		for(var key in obj) {
			temp[key] = clone(obj[key]);
			}
		return temp;
	}
	
	
	/**
	 * Extends a class with another
	 * @param class Sub class that is inheriting from the superclass
	 * @param class Super class
	 */
	NWTUtils.prototype.extend = function(subType, superType) {
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
	NWTUtils.prototype.random = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	
	/**
	 * Trims whitespace from the front and end of a string
	 * @param string String to trim
	 */
	NWTUtils.prototype.trim = function(string) {
			return string.replace(/^\s*|\s*$/, '')
	};

	NWTUtils.prototype.load = function() {

		function NWTLoader() {}

		NWTLoader.prototype.helper = function(helper) {
			var className = helper + 'Helper',
				helperClass = require('./../helpers/' + className + '.js')[className];
			return helperClass;
		};

		NWTLoader.prototype.library = function(library) {
			var helperClass = require('./../libraries/' + library+ '.js')[library];
			return helperClass;
		};

		return new NWTLoader();
	};

	global.nwt = new NWTUtils();
}(this));