(function(root) {

	// The port to listen on for connections
	root.port = 80;

	// A mapping of hostname to site definitions
	// Each site definition should have a folder which corresponds to a 
	// top level directory inside of the NWT folder.
	root.connections = {
		'example' : {
			folder : 'example'
		}
	};

}(this));