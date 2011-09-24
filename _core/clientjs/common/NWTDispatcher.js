var classPattern = new RegExp(/(nwt_)(.[^\s*$]*)/);

function NWTDispatcher() {
	nwt.one('body').on('click', this.dispatch);
}


/**
 * Dispatches a click to a NWT class
 * @param object Event listener
 */
NWTDispatcher.prototype.dispatch = function(e) {

	var target = e.target,
		handlerFound = false;

	while( target.get('parentNode') ) {

		if ( target.get('nodeName').toUpperCase() !== "A" && target.get('nodeName').toUpperCase() !== "INPUT" ) { return; }

		if ( target.get('className').indexOf('nwt_') !== -1 ) {
			var actions = classPattern.exec(target.get('className'));

			// Call the callback with the correct scope
			var actionParts = actions[2].split('_'),
				callback = nwt;

			for( var i = 0, nextClass; nextClass = actionParts[i]; i++ ) {
				console.log(callback, nextClass);
				callback = callback[nextClass];
			}

			handlerFound = true;

			// Use a node object if we are dispatching to a YUI3 callback
			callback(target);
			break;
		} else {
			return;
		}

		target = target.get('parentNode');
	}

	// If we found a callback, we usually want to stop the event
	// Except for input elements (still want checkboxes to check and stuff)
	if( handlerFound && target.get('nodeName').toUpperCase() !== "INPUT") {
		e.stop();
	}

	return;
};

nwt.dispatcher = new NWTDispatcher();