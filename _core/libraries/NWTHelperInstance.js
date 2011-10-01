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


	root.NWTHelperInstance = NWTHelperInstance;

}(this));
