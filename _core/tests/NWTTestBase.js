var nwt = require('./../libraries/nwt.js');

// Make a context stub
// TODO: Rip this out into a test utility
global.context = function() {
	return {clientScripts : []};
};

exports = nwt;