/**
 * A single socket connection
 * @constructor
 */
function NWTSocketInstance(params) {
	var mythis = this;

	this.resource = params[0];
	this.resource += ( this.resource.substring(0, this.resource.length - 1) == '/' ? '' : '/' ) + 'ajax/1/';

	this.config = params[1] || {};

	// Default some stuff
	this.config.postData = this.config.postData || '';
	this.config.failure = this.config.failure || function(){alert('fail');};

	var request = new XMLHttpRequest();

	request.open("POST", this.resource, true);
	//request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	
	request.onreadystatechange = function () {
		if (request.readyState != 4) return;
		if (request.status != 200 && request.status != 304) {
			config.callback.failure();
			return;
		}

		var response = JSON.parse(request.responseText);
		mythis.config.success(response);
	}
	if (request.readyState == 4) { return; }
	request.send(this.config.postData);
}


/**
 * Socket wrapper
 * @constructor
 */
function NWTSocket() {
}


/**
 * Makes a connection to the backend
 */
NWTSocket.prototype.send = function() {
	return new NWTSocketInstance(arguments);
};

nwt.socket = new NWTSocket();