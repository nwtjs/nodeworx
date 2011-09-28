(function(root) {

	/**
	 * Each helper returns an object which is ineherits from this
	 */
	function NWTHelperInstance() {
		this.isRenderable = true;
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

		if( !this._events ) {
			this._events = [];
		}

		this._events.push({event: global.nwt.getClass(this) + ':' + event, callback: callback.toString()});

		return this;
	};


	root.NWTHelperInstance = NWTHelperInstance;

}(this));
