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
	this.config.failure = this.config.failure || function(){alert('fail');};

	if( this.config.form !== undefined ) {
		this.config.postData = this.config.form.serialize();
	}

	var request = new XMLHttpRequest();

	request.open("POST", this.resource, true);
	//request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	
	request.onreadystatechange = function () {
		if (request.readyState != 4) return;
		if (request.status != 200 && request.status != 304) {
			mythis.config.callback.failure();
			return;
		}

		var response = JSON.parse(request.responseText);

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

		mythis.config.success(response);
	}
	if (request.readyState == 4) { return; }
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
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
