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
	 * Trims whitespace from the front and end of a string
	 * @param string String to trim
	 */
	NWTUtils.prototype.trim = function(string) {
			return string.replace(/^\s*|\s*$/, '')
	};

	NWTUtils.prototype.load = function() {

		function NWTLoader() {}

		NWTLoader.prototype.load = function(baseDir, className, instantiate) {
			try {
				//console.log('folder', global.context().config.folder);
				//console.log('./../../' + global.context().config.folder + '/' + baseDir + '/' + className + '.js');
				var classToLoad = require('./../../' + global.context().config.folder + '/' + baseDir + '/' + className + '.js')[className];
			} catch(e) {
				var classToLoad = require('./../' + baseDir + '/' + className + '.js')[className];
			}

			classToLoad.prototype.getClass = function() {
				return className;
			};

			if( typeof instantiate === 'undefined' ) {
				return new classToLoad();
			} else {
				return classToLoad;
			}
		};

		NWTLoader.prototype.helper = function(helper, instantiate) { return this.load('helpers', helper + 'Helper', instantiate); };
		NWTLoader.prototype.library = function(library, instantiate) { return this.load('libraries', library, instantiate); };
		NWTLoader.prototype.model = function(model, instantiate) { return this.load('models', model, instantiate); };

		return new NWTLoader();
	};


        /**
         * Returns the name of an object
         * @param object Object to return
         */
        NWTUtils.prototype.getClass = function(obj) {
                return obj.getClass();
        };


	/**
	 * Adds a script onto the stack of script to include
	 * These scripts are pulled in at render time
	 * @param string Script bundle name
	 */
	NWTUtils.prototype.requireScript = function(script) {

		console.log('Requiring script: ', script);

		var context = global.context();
		if( !context.clientScripts) {
			context.clientScripts = [];
		}

		// Loop through the current required scripts to make sure we only include it once
		for( var i = 0, clientScript; clientScript = context.clientScripts[i] ; i++ ) {
			if( script == clientScript ) {
				return;
			}
		}

		context.clientScripts.push(script);
	};


	/**
	 * Sleeps until a specified key is available on an object
	 * This is blocking for the request (unless we are running other fibers),
	  * but non-blocking for other fibers.
	 * @param object Object we are polling
	 * @param string Object key we are looking for
	 *
	NWTUtils.prototype.waitForAvailable = function(obj, classKey) {
		require('fibers');
		var current = Fiber.current,
		
		// How long to sleep for
		timeout = 5;

		// Set the timeout so the fiber will pick back up again
		// We have a simple backoff strategy 
		var resumeFiber = function() {
			if( obj[classKey] ) {
				current.run();
			} else {
				timeout += timeout;
				setTimeout(resumeFiber, timeout);
			}
		};

		setTimeout(resumeFiber, timeout);
		yield();
	};
*/

	global.nwt = new NWTUtils();

	require(__dirname + '/SharedUtils.js');
}(this));
