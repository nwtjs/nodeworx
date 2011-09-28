/**
 * Event object wrapper
 */
function NWTEventWrapper(event) {
	this._event = event;

	this.target = nwt.one(event.target);
}


/**
 * Calls both preventDefault and stopPropagaion on the event
 */
NWTEventWrapper.prototype.stop = function() {
	this._event.preventDefault();
	this._event.stopPropagation();
};
