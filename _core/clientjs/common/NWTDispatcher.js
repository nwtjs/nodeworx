function NWTDispatcher() {
	this.register('nwt', window.nwt);
}


/**
 * Dispatches a click to a NWT class
 * @param object Event listener
 */
NWTDispatcher.prototype.getDispatcher = function(entryPoint, entryPointClass) {

	
	var classPattern = new RegExp('(' + entryPoint  + '_)(.[^\\s]*)');

	return function(e) {
	var target = e.target,
		handlerFound = false,

		// What element the user wanted
		// Tends to be either an input, or anchor
		intendedTarget = false;

	// Check and see if there is a target="_blank" on the link, of so, return
	if( target.get('target') == '_blank' ) { return; }

	while( target.get('parentNode') ) {

		if( target.get('nodeName').toUpperCase() === "A" || target.get('nodeName').toUpperCase() === "INPUT" ) {
			intendedTarget = target;
		}

		if ( target.get('className') && target.get('className').indexOf(entryPoint + '_') !== -1 && (target.get('nodeName').toUpperCase() === "A" || target.get('nodeName').toUpperCase() === "INPUT") ) {
			var actions = classPattern.exec(target.get('className'));
			
			// Call the callback with the correct scope
			var actionParts = actions[2].split('_'),
				callback = entryPointClass;
			
			// Assume that each callback has 3 class components for now for proper scoping 
			entryPointClass[actionParts[0]][actionParts[1]](intendedTarget);

			/*	
			for( var i = 0, nextClass; nextClass = actionParts[i]; i++ ) {
				console.log(callback, nextClass);
				callback = callback[nextClass];
			}
			*/
			handlerFound = true;

			// Use a node object if we are dispatching to a YUI3 callback
			//callback(intendedTarget);
			break;
		} else if ( target._node && target.hasClass(entryPoint+ '_event_sink') && intendedTarget && intendedTarget.get('nodeName').toUpperCase() === "A" ) {

			e.stop();

			callback = entryPointClass;	

			callback = callback[target.data('callback')].trapEvent;

			callback(intendedTarget);
			handlerFound = true;
			break;
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
};


/**
 * Registers a possible global entrypoint for dispatched callbacks
 * @param string Entry point name
 * @param object Object reference
 */
NWTDispatcher.prototype.register = function(entryPoint, entryPointClass) {

	nwt.one('body').on('click', this.getDispatcher(entryPoint, entryPointClass));

};

nwt.dispatcher = new NWTDispatcher();
