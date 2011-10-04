var connections = require('./../config.connections.js'),
url = require('url'),
nwt = require('./libraries/nwt.js'),
fs = require('fs'),
http = require('http'),
path = require('path');

require('fibers');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

function getServer() {

	var server = http.createServer(function (request, response) {
	Fiber(function(){
		var hostName = request.headers.host,
			hostName = hostName.replace(/^www\./, ''),
			definition = connections.connections[hostName];

		if( !definition ) {
			definition = connections.connections.example;
		}

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
				if( exists ) {

					var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
					response.writeHead(200, {'Content-Type':mimeType});

					var fileStream = fs.createReadStream(filename);
					fileStream.pipe(response);
				} else {
					response.writeHead(404, {"Content-Type": "text/html"});
					console.log('File does not exist: ' , filename);
					response.end();
				}
			});
		
		} else {
			response.writeHead(200, {"Content-Type": "text/html"});
	
			// Require the controller for the application we've requested
			try {
				var contextObject = {
					// Default the client scripts
					clientScripts : ['external/sizzle', 'common/NWTBase', 'common/NWTEventManager', 'common/NWTEventWrapper', 'common/NWTNode', 'common/NWTSocket', 'common/NWTDispatcher'],
					config : definition,
					request: {
						controller: controller,
						action: action
					}
				};

				global.context = function() {
					return contextObject;
				};

				// Handle special _nwt requests
				// This calls an internal entrypoint to handle a private request
				// E.g., _nwt/model_updater/model/ChatModel
				global.context().siteRoot = __dirname  + '/../' + definition.folder + '/views/';
				var layoutOverride = false;

				if( pathname.indexOf('_nwt') !== -1  ) {
					global.context().siteRoot = __dirname + '/';
					controller = 'private';
					layoutOverride = 'empty';
				}

				// Now load in the layout file
				// Read the file and perform an eval on it, this is how we will typically access templates to keep them clean
				var NWTLayout = global.nwt.load().library('NWTLayout'),

					// Holds request params that came in from a /key/value format
					params = {};

				params.layout = 'default'


				/**
				 * Callback after all params have been parsed (including POST params)
				 */
				var paramsParsed = function() {

					//console.log('processed params are: ', params);

					// Get the request params
					for( var i = 2 , param ; param = reqParts[i] ; i+=2 ) {
						params[param] = reqParts[(i+1)];
					}

					// Set the ajax layout file
					if( params.ajax || layoutOverride == 'empty' ) {
						params.layout = 'empty';
					}

					global.context().request.params = params;

					NWTLayout._loadView([controller, action], params);

					content = NWTLayout + ''

					// Reset the context holder
					contextObject = {};

					// Append empty string to always trigger the toString method
					response.end(content + '');
				};


				// Handle postdata, inject them into the params
				if (request.method == 'POST') {

					/**
					 * Processes the post params to turn Key[key2]=values into an object: {key:{key2:value}}
					 */
					function processPostParams(data) {
						var newData = {},
							i;

						for( i in data ) {
							if( i.indexOf('[')!== -1 ) {
								// Special case, make recursive call
								var matchKeys = /([a-zA-Z0-9]*)(?:\[([a-zA-Z0-9\[\[]*)\])?/gi.exec(i),
									child = {};

								child[matchKeys[2]] = data[i];

								newData[matchKeys[1]] = processPostParams(child);
							} else {
								newData[i] = data[i].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
							}
						}

						return newData;
					}
				
					var qs = require('querystring'),
						body = '';

					request.on('data', function (data) {
							body += data;
							});

					request.on('end', function () {
							var POST = qs.parse(body);
							if( POST ) {
								params = processPostParams(POST);
							}
							paramsParsed();
							});
				} else {
					paramsParsed();
				}
			} catch(e) {
				response.end('Could not load entrypoint at: ' + definition.folder + '/views/' + controller + '/' + action);
				console.log(content + '', e, e.stack);
			}
		}
	}).run(); // End Fiber() wrap
	});
	
	server.listen(connections.port);
	console.log("Server running on port: " + connections.port);
};

getServer();
