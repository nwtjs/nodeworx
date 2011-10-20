(function(root) {

	/**
	 * Each helper returns an object which is ineherits from this
	 */
	function NWTHelperInstance() {
		this.isRenderable = true;

		// Generic content display hook. Displays before generated content
		// This should display inside of any helper wrapper tag
		this.beforeContent = '';

		// Generic content display hook. Displays after generated content
		// This should display inside of any helper wrapper tag
		this.afterContent = '';

		// List of plugns to render before rendering the content
		this.plugins = [];
	}


	/**
	 * Magic method which renders the object
	 * Calles render on the subclass
	 */
	NWTHelperInstance.prototype.toString = function() {

		var meta = '';

		if( this._events !== undefined ) {
			meta = '<script type="text/javascript" class="event_hooks">' + JSON.stringify(this._events) + '</script>';
		}

		// Run any plugins
		if( this.plugins  )
		for( var i = 0, plugin ; plugin = this.plugins[i] ; i++  ) {
			// Create a plugin class and push the configuration into it
			var pluginName = plugin[0] + 'Plugin';
			var pluginClass = require(__dirname + '/../plugins/' + pluginName + '.js');
			pluginClass = new pluginClass[pluginName](plugin[1]);

			console.log('plugin class', __dirname + '/../plugins/' + pluginName + '.js', pluginClass);
			pluginClass.process(this);
		}

		return meta + this.render();
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


	/**
	 * Implements a permissions broker interface to listen and respond to events
	 */
	NWTHelperInstance.prototype.on = function(event, callback) {

		console.log('Creating new event listener ', arguments);

		if( !this._events ) {
			this._events = [];
		}

		this._events.push({event: global.nwt.getClass(this) + ':' + event, callback: callback.toString()});

		return this;
	};


	/**
	 * Sets the before content of this helper instance
	 * The before content appears beforeany user specified content
	 * @chainable
	 */
	NWTHelperInstance.prototype.before = function(content) {
		this.beforeContent = content;
		return this;
	};


	/**
	 * Sets the after content of this helper instance
	 * The after content appears after any user specified content
	 * @chainable
	 */
	NWTHelperInstance.prototype.after = function(content) {
		this.afterContent = content;
		return this;
	};


	/**
	 * Creates a plugin instance which can modify this helper
	 */
	NWTHelperInstance.prototype.plug = function(plugin, args) {
console.log('about to push plugin');
		this.plugins.push([plugin, args]);

console.log('Pushing plugin', this.plugins);
		return this;
	};

	root.NWTHelperInstance = NWTHelperInstance;

}(this));
