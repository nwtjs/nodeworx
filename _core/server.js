var connections = global.connections,
url = require('url'),
nwt = require('./libraries/nwt.js'),
fs = require('fs'),
http = require('http'),
io = require('socket.io'),
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


function getServer() {

	/**
	 * Generic request handler for sockets or http requests
	 */
	function handleRequest(request, response, callback) {

		// Format data how we want it
		request.hostName = request.hostName.replace(/^www\./, '').replace(/[:0-9]*$/, '');

		Fiber(function(){

			var definition = connections[request.hostName],
				siteRoot;
	
			console.log('Host request for: ' + request.hostName, definition);
	
			if( !definition ) {
				definition = connections.example;
				siteRoot =  __dirname  + '/../' + definition.folder;
			} else {
				siteRoot =  __dirname  + '/../../../' + definition.folder;
			}

			var pathname = url.parse(request.resource).pathname,
				filename = __dirname + '/..' + pathname;

				// Strip any initial slashes in the pathname
				pathname = (pathname[0] == '/' ? pathname.substring(1) : pathname),
				reqParts = pathname.split('/'),
				controller = reqParts[0].length > 0 && reqParts[0].length > 0 ? reqParts[0] : 'index',
				action = reqParts[1] && reqParts[1].length > 0 && reqParts[1].length > 0 ? reqParts[1] : 'index',
				content = '';
	
			// Special lookup for cache requests (hit the nwt folder)
			if ( pathname.indexOf('cache/') === -1 && pathname.indexOf('_core') === -1 ) {
				filename = siteRoot + '/' + pathname;
			}

			console.log('controller:: ', controller, action);

			console.log('Request for: ' , filename, ' | Path: ', pathname);
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
				var contextObject = {
					// Default the client scripts
					clientScripts : [
						'/_core/clientjs/external/sizzle',
						'/_core/clientjs/common/NWTBase',
						'/_core/libraries/SharedUtils',
						'/_core/clientjs/common/NWTEventManager',
						'/_core/clientjs/common/NWTEventWrapper',
						'/_core/clientjs/common/NWTNode',
						'/_core/clientjs/common/NWTSocket',
						'/_core/clientjs/common/NWTDispatcher',
						'/_core/libraries/NWTHelperInstance',
						'/_core/models/NWTModel'
					],
					config : definition,
					hostName: request.hostName,
					siteRoot : siteRoot,
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
				var layoutOverride = false;

				if( pathname.indexOf('_nwt') !== -1  ) {
					// Set a private path, we don't want to overload siteRoot because that will cause loading issues
					global.context().privatePath = __dirname + '/';
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

						// Inject special data for the response
						// Used by NWTSocket to map callbacks
						if( params.socket_id ) {
							NWTLayout.definition = NWTLayout.definition || {};
							NWTLayout.definition.inject = {socket_id: params.socket_id};
						}

						if( NWTLayout.definition && NWTLayout.definition.responseCallback !== undefined ) {

							// Views may implement a custom response handler
							// If they do, make the callback
							// See _core/private/proxy_pass for an example
							NWTLayout.definition.responseCallback(response, params);

						} else {
							// Append empty string to always trigger the toString method
							request.responseContent = NWTLayout + '';
							callback();
						}

						// Reset the context holder
						console.log('Resetting contextObject after fiber.');
						contextObject = {};

					}).run();
				};

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

				// Handle postdata, inject them into the params
				if ( request.postData ) {
					params = processPostParams(request.postData);
					console.log('got parsed params', params);
					return paramsParsed();
				} else {
					return paramsParsed();
				}
			}
		}).run(); // End Fiber() wrap
	}

	var server = http.createServer(function (request, response) {
		var hostName = request.headers.host;

		try {

			var mockRequestObject = {
				hostName: hostName,
				resource: request.url
			};

			handleRequest(mockRequestObject, response, function(){

				waitFor(mockRequestObject, 'responseContent');

				if( mockRequestObject.responseContent ) {
					// Return content like we usually do
					response.writeHead(200, {"Content-Type": "text/html"});
		
					response.end(mockRequestObject.responseContent + '');
				}
			});

		} catch(e) {
			response.end('Could not load entrypoint at: ' + definition.folder + '/views/' + controller + '/' + action);
			console.log(content + '', e, e.stack);
		}
	});

	server.listen(global.port);

	// Listen for socket connections
	var socket = io.listen(server);
	socket.enable('browser client minification');  // send minified client
	socket.enable('browser client etag');          // apply etag caching logic based on version number
	socket.enable('browser client gzip');          // gzip the file
	socket.set('log level', 1);                    // reduce logging
	socket.sockets.on('connection', function (socket) {
		socket.on('socketRequest', function (data) {

			console.log('Got socket data: ', data);

			// Right now we only support post through the socket
			var qs = require('querystring')

			data.postData = qs.parse(data.postData);

			var mockRequestObject = {
				hostName: data.host,
				resource: data.resource,
				postData: data.postData
			};

			Fiber(function(){
				handleRequest(mockRequestObject, null, function(){

					waitFor(mockRequestObject, 'responseContent');
					var responseData = JSON.parse(mockRequestObject.responseContent + '');

					console.log(responseData);

					socket.emit('socketResponse', responseData);
				});
			}).run();
		});
	});

	console.log("Server running on port: " + global.port);
};

getServer();


/**
 * Log all uncaught excpetions
 */
process.on('uncaughtException', function(err) {
	console.log('===== UNCAUGHT EXCEPTION =====');
	console.log(err);
	console.log(err.stack);
	console.log('===== END EXCEPTION CATCH =====');
});
