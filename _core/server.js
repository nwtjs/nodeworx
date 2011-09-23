global.require = function(lib) {
	var lib = require(lib);
	return lib;
};

var connections = require('./../config.connections.js').connections,
url = require('url'),
nwt = require('./libraries/nwt.js'),
fs = require('fs'),
http = require('http');

function getServer(definition) {

	var server = http.createServer(function (request, response) {

		var reqParts = url.parse(request.url).pathname.substring(1).split('/'),
			controller = reqParts[0].length > 0 && reqParts[0].length > 0 ? reqParts[0] : 'index',
			action = reqParts[1] && reqParts[1].length > 0 && reqParts[1].length > 0 ? reqParts[1] : 'index',
			content = '';

		console.log('Request URL parts: ', reqParts);

		response.writeHead(200, {"Content-Type": "text/html"});

		// Require the controller for the application we've requested
		try {
			var controllerClass = require('./../' + definition.folder + '/controllers/' + controller + '.js')[action];

			// Now load in the layout file
			// Read the file and perform an eval on it, this is how we will typically access templates to keep them clean
			var layoutTemplate = 'default',
				NWTLayout = global.nwt.load().library('NWTLayout');

			eval(fs.readFileSync(__dirname + '/../' + definition.folder + '/views/layouts/' + layoutTemplate + '.js')+'');

			NWTLayout._loadController(controllerClass);

			content = NWTLayout + '';

		} catch(e) {
			content = 'Could not load entrypoint at: ' + definition.folder + '/controllers/' + controller + '/' + action;
			console.log(content, e, JSON.stringify(e));
		}

		// Append empty string to always trigger the toString method
		response.end(content + '');
	});
	
	server.listen(serverDefinition.port);
	console.log("Server running on port: " + serverDefinition.port);
};

for( var i = 0, serverDefinition ; serverDefinition = connections[i] ; i++ ) {
	getServer(serverDefinition);
}