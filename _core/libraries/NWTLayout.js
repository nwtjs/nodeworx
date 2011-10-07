(function(root) {

	var fs = require('fs');

	/**
	 * Layout class
	 * @constructor
	 */
	function NWTLayout() {
		this.content = '';
		this.params = {};
	}


	/**
	 * Returns the content from this object
	 * Implodes the content if it's an array
	 */
	NWTLayout.prototype.getContent = function() {
		var content = this.definition.content;
		return content + '';
	};

	/**
	 * Binds model data to a callback
	 */
	NWTLayout.prototype.bind = function(model, method, params, callback) {
		return model + method;
	};


	/**
	 * Generates and returns content for a partial view
	 * @param array Resource locator e.g., [viewFolder, view]
	 */
	NWTLayout.prototype.partial = function(path) {
		this._loadView(path, {layout: 'none'});
		return this + '';
	};


	/**
	 * Loads in the controller spec to populate data
	 * @param array Resource locator
	 * @param object Params object to store
	 */
	NWTLayout.prototype._loadView = function(resource, params) {

		if( params ) {
			this.params = params;
		}

		var viewContent = fs.readFileSync(global.context().siteRoot + resource[0] + '/' + resource[1] + '.js');

		// Trigger the toString() method
		viewContent += '';

		// Load dynamic libraries
		// TODO: Add caching
		// Regex info:
		// Match the classname
		// Match a . (dot) and a class name
		// Match to a paren to ensure a function call
		// This regex *may* still match content, but should be good enough for now
		var regex =  new RegExp(/([a-zA-Z]+)\s*\.[\sa-zA-Z0-9]+\(/gi),
			match;

		while( (match = regex.exec(viewContent)) !== null ) {
		
			var method = 'helper',
				lib = match[1];

        		if( lib.indexOf('Model') !== -1 ) {
		                 method = 'model';
	                }

			//console.log('Attempting to autoload lib: ', lib);

			try {
                		eval('var ' + lib + ' = global.nwt.load().' + method + '(\'' + lib + '\');');
			} catch(e){
				//console.log('Could not load lib', e);
			}
		}
		console.log('View content is: ', viewContent);

		eval('this.definition = ' + viewContent + ';');

		// Use closures to give the preFilter access to declared vars here if it exists
		if( this.definition.preFilter ) {
			var oldPrefilter = this.definition.preFilter;
			this.definition.preFilter = function(params) {
				oldPrefilter(params);
			};
		}
	};

	NWTLayout.prototype._stylesheets = function() {

		if( !this.definition.css  ) {
			return;
		}

		var stylesheetContent = [];
		for( var i = 0, path ; path = this.definition.css[i] ; i++ ) {
			if( path.indexOf('http') !== 0 && path.indexOf('/') !== 0 ) {
				path = '/' + path;
			}

			stylesheetContent.push('<link rel="stylesheet"i type="text/css" href="' + path + '">');
		}
		return stylesheetContent.join('');
	};

	/**
	 * Renders framework things before the body tag including javascriptz
	 */
	NWTLayout.prototype._beforeBody = function() {

		var content = [];

		for( var i = 0, script ; script = global.context().clientScripts[i] ; i++ ) {
			content.push('<script id="' + script.replace('/', '-') + '" type="text/javascript" src="/_core/clientjs/' + script + '.js"></script>');			
		}

		return content.join('');
	};


	/**
	 * Generates an object of required scripts
	 */
	NWTLayout.prototype._generateScripts = function() {
                var scripts = {};

                for( var i = 0, script ; script = global.context().clientScripts[i] ; i++ ) {
                       scripts[script.replace('/', '-')] = '/_core/clientjs/' + script + '.js';
                }

                return scripts;

	};

	/**
	 * Renders the entire content of the layout
	 */
	NWTLayout.prototype.toString = function() {
		// Run the prefilter
		if( this.definition && this.definition.preFilter !== undefined ) {
			console.log('passing in params: ', this.params);
			this.definition.preFilter(this.params);
		}

		this.params.layout = this.params.layout || 'default';

		var layoutClass = require('./../views/layouts/' + this.params.layout + '.js'),
			content = layoutClass.NWTViewLayoutWrapper(this);

		// Reset the definition after rendering due to Node.js module caching
		this.definition = {};

		return content;
	};


	exports.NWTLayout = NWTLayout;

}(this));
