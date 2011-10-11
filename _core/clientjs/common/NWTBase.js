/**
 * NWT primary entry point
 * @constructor
 */
function NWT() {

};


/**
 * Some day this will load libraries and do cool stuff.
 */
NWT.prototype.load = function() {

	var loadGlobalLibrary = function(libName) {
		if( window[libName] ) {
			return window[libName];
		}
	};

	return {
		model: loadGlobalLibrary,
		library: loadGlobalLibrary,
		helper: loadGlobalLibrary
	};
};

var nwt = new NWT();

/** 
 * Global window object with a reference to the nwt object
 * This is so we can share libraries client and server side
 */
window.global = {
	nwt: nwt
};