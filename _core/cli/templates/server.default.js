// The port to listen on for connections
global.port = 9090;

// A mapping of hostname to site definitions
// Each site definition should have a folder which corresponds to a 
// top level directory inside of the NWT folder.
global.connections = {
	'example' : {
		folder : 'example'
	}
};

require('nwt/_core/server.js');