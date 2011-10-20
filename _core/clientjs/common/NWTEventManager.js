/**
 * Event Manager
 */
function NWTEventManager() {
	this.events = {};
}


/**
 * Implements an event listener
 * @param object Object which wraps the event
 * @param bool Pass as true to not reset the existing listeners
 */
NWTEventManager.prototype.implement = function(eventSpecs, doNotReset) {

	console.log('Implementing event', eventSpecs);

	for( var i = 0 , eventSpec ; eventSpec = eventSpecs[i] ; i++ ) {

		// I'm fairly certain that we can just remove this and always reset the events
		if( doNotReset ) {
			if ( this.events[eventSpec.event] === undefined ) {
				this.events[eventSpec.event] = [];
			}
		} else {
			this.events[eventSpec.event] = [];
		}

		eval( 'var callback = ' + eventSpec.callback + ";");
	
		this.events[eventSpec.event].push(callback);
	}
};


/**
 * Fires off an event
 * Calls all event listeners on the event
 */
NWTEventManager.prototype.fire = function(event, args) {

	console.log('Firing event', event);

	console.log(this.events);

	if( this.events[event] === undefined ) { return; }

	for( var i = 0 , callback ; callback = this.events[event][i] ; i++ ) {
		callback(args);
	}
};

nwt.event = new NWTEventManager();
