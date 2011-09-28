/**
 * Event Manager
 */
function NWTEventManager() {
	this.events = {};
}


/**
 * Implements an event listener
 * @param object Object which wraps the event
 */
NWTEventManager.prototype.implement = function(eventSpecs) {

	for( var i = 0 , eventSpec ; eventSpec = eventSpecs[i] ; i++ ) {

		if ( this.events[eventSpec.event] === undefined ) {
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
	if( this.events[event] === undefined ) { return; }

	for( var i = 0 , callback ; callback = this.events[event][i] ; i++ ) {
		callback(args);
	}
};

nwt.event = new NWTEventManager();