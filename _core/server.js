var connections = require('./../config.connections.js').connections,
url = require('url'),
nwt = require('./libraries/nwt.js'),
fs = require('fs'),
http = require('http'),
path = require('path');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

function getServer(definition) {

	var server = http.createServer(function (request, response) {

		var pathname = url.parse(request.url).pathname,
			filename = './' + (pathname.indexOf('_core') === -1 ? definition.folder  : '' ) + pathname;
			reqParts = pathname.substring(1).split('/'),
			controller = reqParts[0].length > 0 && reqParts[0].length > 0 ? reqParts[0] : 'index',
			action = reqParts[1] && reqParts[1].length > 0 && reqParts[1].length > 0 ? reqParts[1] : 'index',
			content = '';

		console.log('Request for: ' , filename);
		// If it's a request for a whitelisted file type, stream it
		if( /\.[a-zA-Z]+$/.test(filename) ) {

			// The file exists, stream it
			path.exists(filename, function(exists) {
				console.log('serving', exists);
				if( exists ) {

					var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
					console.log(mimeType);
					response.writeHead(200, {'Content-Type':mimeType});

					var fileStream = fs.createReadStream(filename);
					fileStream.pipe(response);
				} else {
					response.end();
				}
			});
		
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
	
			// Require the controller for the application we've requested
			try {
				var viewContent = fs.readFileSync(__dirname  + '/../' + definition.folder + '/views/' + controller + '/' + action + '.js')
					contextObject = {
						// Default the client scripts
						clientScripts : ['external/sizzle', 'common/NWTBase', 'common/NWTEventWrapper', 'common/NWTNode', 'common/NWTSocket', 'common/NWTDispatcher']
					};

				global.context = function() {
					return contextObject;
				};
	
				// Now load in the layout file
				// Read the file and perform an eval on it, this is how we will typically access templates to keep them clean
				var NWTLayout = global.nwt.load().library('NWTLayout'),

					// Holds request params that came in from a /key/value format
					params = {};

				params.layout = 'default'

				// Get the request params
				for( var i = 2 , param ; param = reqParts[i] ; i+=2 ) {
					params[param] = reqParts[(i+1)];
				}

				// Set the ajax layout file
				if( params.ajax ) {
					params.layout = 'empty';
				}

				NWTLayout._loadView(viewContent, params);
	
				content = NWTLayout + '';
	
			} catch(e) {
				content = 'Could not load entrypoint at: ' + definition.folder + '/controllers/' + controller + '/' + action;
				console.log(content + '', e, e.stack);
			}

			// Reset the context holder
			contextObject = {};
	
			// Append empty string to always trigger the toString method
			response.end(content + '');
		}
	});
	
	server.listen(serverDefinition.port);
	console.log("Server running on port: " + serverDefinition.port);
};

for( var i = 0, serverDefinition ; serverDefinition = connections[i] ; i++ ) {
	getServer(serverDefinition);
}
