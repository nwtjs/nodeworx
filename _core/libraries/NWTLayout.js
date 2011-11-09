(function(root) {

	var fs = require('fs'),
		path = require('path');

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

		var subPartial = new NWTLayout();
		subPartial._loadView(path, {layout: 'none'});
		return subPartial;
	};


	/**
	 * Loads in the controller spec to populate data
	 * @param array Resource locator
	 * @param object Params object to store
	 */
	NWTLayout.prototype._loadView = function(resource, params) {

		var context = global.context(),

		appPath = context.privatePath || context.siteRoot,

		viewContent = fs.readFileSync(appPath + '/views/' + resource[0] + '/' + resource[1] + '.js');

		// Trigger the toString() method
		viewContent += '';

		return this._loadFromContent(viewContent, params);
	}


	/**
	 * Loads the NWTLayout class from view content
	 * @param string View content
	 * @param object Params object to store
	 */
	NWTLayout.prototype._loadFromContent = function(viewContent, params) {

		if( params ) {
			this.params = params;
		}

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

			stylesheetContent.push('<link rel="stylesheet" type="text/css" href="' + path + '">');
		}
		return stylesheetContent.join('');
	};

	/**
	 * Renders framework things before the body tag including javascriptz
	 */
	NWTLayout.prototype._beforeBody = function() {

		var content = [];

		content.push('<script src="/socket.io/socket.io.js"></script>');

		for( var i = 0, script ; script = global.context().clientScripts[i] ; i++ ) {
			content.push('<script id="' + script.replace(/\//g, '-') + '" type="text/javascript" src="' + this._getClientScriptPath(script) + '"></script>');			
		}

		// Now handle manually requested scripts
		if( this.definition.js ) {
			for( var i = 0, script ; script = this.definition.js[i] ; i++ ) {
				content.push('<script id="' + script.replace(/\//g, '-') + '" type="text/javascript" src="' + this._getManualScriptPath('/' + script) + '"></script>');			
			}	
		}

		return content.join('');
	};


	/**
	 * Generates an object of required scripts
	 */
	NWTLayout.prototype._generateScripts = function() {
		var scripts = {};
		
		for( var i = 0, script ; script = global.context().clientScripts[i] ; i++ ) {
			   scripts[script.replace(/\//g, '-')] = this._getClientScriptPath(script);
		}

		// Now handle manually requested scripts
		if( this.definition.js ) {
			for( var i = 0, script ; script = this.definition.js[i] ; i++ ) {
			   scripts[script.replace(/\//g, '-')] = this._getManualScriptPath('/' + script);
			}	
		}

		return scripts;
	};


	/**
	 * Returns the minified and obsfuscicated path to the javascript file
	 * We need to save the file as .txt or some other format than .js because we do not allow loading of js files
	 */
	NWTLayout.prototype._getMinifiedPath = function(filepath) {

		var fileStat;

		if( filepath.indexOf('_core') === -1 ) {
			filepath = global.context().siteRoot + filepath;
			fileStat = fs.statSync(filepath);
		} else {
			filepath = __dirname + '/../..' + filepath;
			fileStat = fs.statSync(filepath);
		}

		var minifiedPath = '/cache/' + global.context().config.folder + '_' + new Date(fileStat.mtime).getTime() + '_' + filepath.replace(/\//g, '_') + '.min',

		systemCachePath = __dirname + '/../..' + minifiedPath;

		//console.log('Path are: ', filepath, minifiedPath, systemCachePath);

		if( !path.existsSync(systemCachePath) ) {

			var jsp = require("uglify-js").parser;
			var pro = require("uglify-js").uglify;

			var orig_code =  fs.readFileSync(filepath) + '';
			var ast = jsp.parse(orig_code); // parse code and get the initial AST
			ast = pro.ast_mangle(ast); // get a new AST with mangled names
			ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
			var finalCode = pro.gen_code(ast); // compressed code here

			fs.writeFileSync(systemCachePath, finalCode);
		}

		return minifiedPath;
	};


	/**
	 * Generates the path of a client script
	 * Generally we want a script inside _core/clientjs, except for models
	 * If it's a model, load it out of the app path
	 */
	NWTLayout.prototype._getClientScriptPath = function(path) {
		if( path.indexOf('/') === 0 || path.indexOf('models') === 0 ) {
			if( path.indexOf('/') !== 0 ) {
				path = '/' + path;
			}
			return this._getMinifiedPath(path + '.js');
		} else {
			return this._getMinifiedPath('/_core/clientjs/' + path + '.js');
		}
	};



	/**
	 * Generates the path of a manually included script
	 */
	NWTLayout.prototype._getManualScriptPath = function(path) {
		return this._getMinifiedPath(path);
	};

	/**
	 * Renders the entire content of the layout
	 */
	NWTLayout.prototype.toString = function() {
		// Run the prefilter
		if( this.definition && this.definition.preFilter !== undefined ) {
			console.log('passing in params to prefilter: ', this.params);
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
