{
	responseCallback : function(response, params) {

		var fs = require('fs'),
		path = require('path'),
		http = require("http"),
		url = require("url");

		var mimeTypes = {
			"html": "text/html",
			"jpeg": "image/jpeg",
			"jpg": "image/jpeg",
			"png": "image/png",
			"js": "text/javascript",
			"min": "text/javascript",
			"css": "text/css"};

		params.file = params.file.replace(/_dot_/g, '.');
		params.file = decodeURIComponent(params.file);

		var extension = params.file.substring(params.file.lastIndexOf(".")+1);
		Console.log(extension);

		response.writeHead(200, {'Content-Type':mimeTypes[extension]});


		var pathURL = url.parse(params.file);
		var hostname = pathURL.hostname;

		http.get({ 
			host: hostname, 
			path: pathURL.pathname },
			function(getRes) {
				
				var pageData = "";
				getRes.setEncoding('binary');
				getRes.on('data', function (chunk) {
					response.write(chunk, 'binary');
				});
				
				getRes.on('end', function(){
					response.end()
				});			
			});
	}
}