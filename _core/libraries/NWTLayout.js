(function(root) {

	/**
	 * Layout class
	 * @constructor
	 */
	function NWTLayout() {
		this.content = '';
	}


	/**
	 * Loads in the controller spec to populate data
	 */
	NWTLayout.prototype._loadView = function(viewContent, params) {

		this.params = params;

		// Find any required helpers and load them
		viewContent += '';
		var helpers = viewContent.match(/helpers\s*:\s*(\[[^\]]*\])/);
		if( helpers && helpers[1] ) {
			eval('helpers = ' + helpers[1] + ';');
		} else {
			helpers = [];
		}
		helpers.push('Html');
		console.log('Loading helpers:', helpers);

		for( var i = 0, helper ; helper = helpers[i] ; i++ ) {
			eval('var ' + helper + ' = global.nwt.load().helper(\'' + helper + '\');');
		}

		eval('this.definition = ' + viewContent + ';');
	};


	/**
	 * Renders framework things before the body tag including javascriptz
	 */
	NWTLayout.prototype._beforeBody = function() {

		var content = [];

		for( var i = 0, script ; script = global.context().clientScripts[i] ; i++ ) {
			content.push('<script type="text/javascript" src="/_core/clientjs/' + script + '.js"></script>');			
		}

		return content.join('');
	};


	/**
	 * Renders the entire content of the layout
	 */
	NWTLayout.prototype.toString = function() {

		var layoutClass = require('./../views/layouts/' + this.params.layout + '.js'),
			content = layoutClass.NWTViewLayoutWrapper(this);

		// Reset the definition after rendering due to Node.js module caching
		this.definition = {};

		return content;
	};


	exports.NWTLayout = NWTLayout;

}(this));
