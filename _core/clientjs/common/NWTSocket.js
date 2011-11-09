/**
 * A single socket connection
 * @constructor
 */
function NWTSocketInstance(params) {
	var mythis = this;

	this.resource = params[0];

	if( !this.resource ) {
		throw "NWTSocketInstance resource not specified.";
	}

	this.resource += ( this.resource.substring(0, this.resource.length - 1) == '/' ? '' : '/' ) + 'ajax/1/';

	this.config = params[1] || {};

	// Default some stuff
	this.config.postData = this.config.postData || '';

	if( this.config.form !== undefined ) {
		this.config.postData = this.config.form.serialize();
	}

	var data = {
		resource : this.resource,
		host: NWT_Config.host
	};

	data.postData = this.config.postData;
	nwt.socket.io.emit('socketRequest', data);
}


/**
 * Socket wrapper
 * @constructor
 */
function NWTSocket() {

	// Keeps track of which socket we are using
	this.lastSocketId = 0;

	// Mapping of callback to generated socket IDs
	// This allows us to use sockets like standard ajax requests if desired
	this.callbackMap = {};

	this.io = window.io.connect('http://' + NWT_Config.host);

	this.io.on('socketResponse', function(response) {

		console.log('Got response', response);

		// Handle special response keys
		// Scripts are included if they don't exist in the dom
		if( response.scripts !== undefined ) {
			for( var i in response.scripts  ) {
				if( !nwt.one('script#' +i)  ) {
				   var head= document.getElementsByTagName('head')[0];
				   var script= document.createElement('script');
				   script.type= 'text/javascript';
				   script.src= response.scripts[i];
				   script.id = i;
				   head.appendChild(script);
				}
			}
		}
	
		// Handle the pageTitle response key update
		// Update the main title of the page
		if( response.title !== undefined ) {
			nwt.one('head title').setContent(response.title);
		}
	
		nwt.socket.callbackMap[response.inject.socket_id](response);
	});
}


/**
 * Makes a connection to the backend
 */
NWTSocket.prototype.send = function() {

	var args = arguments;

	this.lastSocketId++;

	args[0] += '/socket_id/' + this.lastSocketId;
	this.callbackMap[this.lastSocketId] = args[1].success;

	return new NWTSocketInstance(args);
};

nwt.socket = new NWTSocket();
