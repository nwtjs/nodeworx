(function(root) {

	/**
	 * Layout class
	 * @constructor
	 */
	function NWTLayout() {
		this.content = '';
	}


	/**
	 * Binds model data to a callback
	 */
	NWTLayout.prototype.bind = function(model, method, params, callback) {
		return model + moethod;
	};


	/**
	 * Loads in the controller spec to populate data
	 */
	NWTLayout.prototype._loadView = function(viewContent, params) {

		this.params = params;

		// Trigger the toString() method
		viewContent += '';

		// Load dynamic libraries
		// TODO: Add caching
		// Regex info:
		// Match the classname
		// Match a . (dot) and a class name
		// Match to a paren to ensure a function call
		// This regex *may* still match content, but should be good enough for now
		var regex =  new RegExp(/([a-zA-Z]+)\.[\sa-zA-Z]+\(/gi),
			match;

		while( (match = regex.exec(viewContent)) !== null ) {
		
			var method = 'helper',
				lib = match[1];
			console.log('Autoloading lib ', lib);
        		if( lib.indexOf('Model') !== -1 ) {
		                 method = 'model';
	                }

                	eval('var ' + lib + ' = global.nwt.load().' + method + '(\'' + lib + '\');');
		}

		console.log('View content is: ', viewContent);

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
