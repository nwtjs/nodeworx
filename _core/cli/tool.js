/*
console.log('Received cliargs:');

process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});
*/

var fs = require('fs'),
path = require('path');


var cliargs = process.argv.splice(2),


// The shortcut to the server inside of wherever we installed NWT from NPM
serverPath = __dirname + '/../../../../server.js';;

// Make sure that they selected a valid command
var commands = {

	/**
	 * Initializes the NWT installation
	 * Creates a top level file that includes and runs the server
	 */
	init : function() {
		console.log('Creating new NWT implementation.');

		if( path.existsSync(serverPath) ) {

			console.log('NWT already implemented, nothing to do.');
			return;

		} else {

			console.log('Generating NWT server include.');

			var serverInit = fs.readFileSync(__dirname + '/templates/server.default.js');

			fs.writeFileSync(serverPath, serverInit);
		}
	},


	/**
	 * Creates a new site structure and config for NWT
	 * Requires that init has been run
	 */
	create : function() {

		if( !path.existsSync(serverPath) ) {
			console.log('NWT has not been initialzed. Please run the following command first:');
			console.log('node node_modules/nwt/_core/cli/tool.js init');
			return;
		}

		var appName = cliargs[1];

		if( !appName ) {
			console.log('Hostname is required. Please enter the hostname of the site you are generating a skeleton for. An IPAddress will also work.');
			return;
		}

		console.log('Initializing a new site for: ', appName);

		// Make sure the folder does not exist
		var appFolderPath = __dirname + '/../../../../' + appName;

		// Error out if the folder already exists
		if( path.existsSync(appFolderPath) ) {
			console.log('It appears that an application already exists with that name.');
			console.log('Nothing to do.');
			return;
		}

		console.log('Creating folder, ', appName);
		fs.mkdirSync(appFolderPath, 755);

		console.log('Creating folder, ', appName + '/views');
		fs.mkdirSync(appFolderPath + '/views', 755);

		console.log('Creating initial view, ', appName + '/views/index/index.js');
		fs.mkdirSync(appFolderPath + '/views/index', 755);
		fs.writeFileSync(appFolderPath + '/views/index/index.js', "{\n\tcontent: 'Hello world'\n}\n");

		console.log('Creating folder, ', appName + '/models');
		fs.mkdirSync(appFolderPath + '/models', 755);


		// Create a base config file (config.js)
		var configTemplate = fs.readFileSync(__dirname + '/templates/config.default.js');
		fs.writeFileSync(appFolderPath + '/config.js', configTemplate);

		// Implement the hostname inside of config.connections
		var existingConfig = fs.readFileSync(serverPath) + '';

		var newSetting = [
			"global.connections = {\n",
				"\t'", appName, "' : {\n",
					"\t\tfolder : '", appName, "'\n",
				"\t},"
		];

		existingConfig = existingConfig.replace(/global\.connections\s*=\s*\{*/, newSetting.join(''));
		console.log('new server is', existingConfig);
		fs.writeFileSync(serverPath, existingConfig);
	}
};

var action = cliargs[0];
if( !commands[action] ) {
	console.log('Invalid action specified. Tried: ', action);
	return;
}

commands[action]();

console.log('All done!');