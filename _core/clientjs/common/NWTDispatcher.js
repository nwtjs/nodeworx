function NWTDispatcher() {
	this.classPattern = new RegExp(/(nwt-)(.[^\s*$]*)/);

	nwt.one('body').on('click', this.dispatch);
}


/**
 * Dispatches a click to a NWT class
 * @param object Event listener
 */
NWTDispatcher.prototype.dispatch = function(e) {

	var target = e.target,
		handlerFound = false;

	while( target.parentNode ) {

		if ( target.nodeName.toUpperCase() !== "A" && target.nodeName.toUpperCase() !== "INPUT" ) { return; }

		if ( target.className.indexOf('nwt-') !== -1 ) {
			var actions = this.classPattern.exec(target.className);

			// Call the callback with the correct scope
			var actionParts = actions[2].split('-'),
				callback = nwt;

			for( var i = 1, nextClass; nextClass = actionParts[i]; i++ ) {
				callback = callback[nextClass];
			}

			handlerFound = true;

			// Use a node object if we are dispatching to a YUI3 callback
			callback(target);
			break;
		} else {
			return;
		}

		target = target.parentNode;
	}

	// If we found a callback, we usually want to stop the event
	// Except for input elements (still want checkboxes to check and stuff)
	if( handlerFound && target.nodeName.toUpperCase() !== "INPUT") {
		e.preventDefault();
	}

	return;
};

nwt.dispatcher = new NWTDispatcher();