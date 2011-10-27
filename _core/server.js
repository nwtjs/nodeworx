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
    "min": "text/javascript",
    "css": "text/css"};

function getServer() {

	var server = http.createServer(function (request, response) {

		var waitFor = function(obj, classKey) {
			var current = Fiber.current,

			// How long to sleep for
			timeout = 5;
			
			// Set the timeout so the fiber will pick back up again
			// We have a simple backoff strategy
			var resumeFiber = function() {
				if( obj[classKey] ) {
				console.log('Object populated, resume fiber. Context is: ', global.context(), global.context().clientScripts);
				current.run();
			} else {
				timeout += timeout;
				setTimeout(resumeFiber, timeout);
			}
		};

		setTimeout(resumeFiber, timeout);
		yield();
	};

	Fiber(function(){
		var hostName = request.headers.host,
			hostName = hostName.replace(/^www\./, '').replace(/[:0-9]*$/, ''),
			definition = connections.connections[hostName];

		console.log('Host request for: ' + hostName);

		if( !definition ) {
			definition = connections.connections.example;
		}

		var pathname = url.parse(request.url).pathname,
			filename = './' + (pathname.indexOf('cache/') === -1 && pathname.indexOf('_core') === -1 ? definition.folder  : '' ) + pathname;
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

					var extension = path.extname(filename).split(".")[1];

					// Do NOT allow direct access to javascript files, we only serve up whitelisted minified versions
					if( extension == 'js' ) {
						console.log('Unallowed script accessto: ', filename);
						response.end();
					}

					var mimeType = mimeTypes[extension];
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

			// Require the controller for the application we've requested
			try {
				var contextObject = {
					// Default the client scripts
					clientScripts : ['external/sizzle', 'common/NWTBase', '/_core/libraries/SharedUtils', 'common/NWTEventManager', 'common/NWTEventWrapper', 'common/NWTNode', 'common/NWTSocket', 'common/NWTDispatcher', '/_core/libraries/NWTHelperInstance', '/_core/models/NWTModel' ],
					config : definition,
					request: {
						controller: controller,
						action: action
					},
					fiber: {
						waitFor: waitFor
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

					Fiber(function(){
						NWTLayout._loadView([controller, action], params);

						if( NWTLayout.definition && NWTLayout.definition.responseCallback !== undefined ) {

							// Views may implement a custom response handler
							// If they do, make the callback
							// See _core/private/proxy_pass for an example
							NWTLayout.definition.responseCallback(response, params);

						} else {
							// Append empty string to always trigger the toString method
							content = NWTLayout + '';

							// Return content like we usually do
							response.writeHead(200, {"Content-Type": "text/html"});

							response.end(content + '');
						}

						// Reset the context holder
						console.log('Resetting contextObject after fiber.');
						contextObject = {};

					}).run();
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

								var subData = processPostParams(child);
								if( !newData[matchKeys[1]]  ) {
									newData[matchKeys[1]] = {};
								}

								for (var member in subData) { newData[matchKeys[1]][member] = subData[member]; }
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


/**
 * Log all uncaught excpetions
 */
process.on('uncaughtException', function(err) {
	console.log('===== UNCAUGHT EXCEPTION =====');
	console.log(err);
	console.log('===== END EXCEPTION CATCH =====');
});
