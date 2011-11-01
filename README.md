## Node Web Toolkit

Node Web Toolkit (NWT) is a drastic departure from traditional web frameworks. NWT is geared towards rapid development of single page applications which behave and feel like desktop applications. NWT is currently under active development and changing rapidly.

For more information, visit: [nwtjs.org](http://nwtjs.org/)


## Using NWT

Installation is a breeze with npm. For full details visit the documentation at: For more information, visit: [nwtjs.org](http://nwtjs.org/).

1 - Recommend install is with NPM: 
	$ npm install nwt

2 - Note: due to the npm install, the entire framework will now reside within node_modules/nwt. The easiest way to work with NWT is by leaving the framework in the installed location, and to configure your sites using the command line tool. Initialze the NWT environment: 
	$ node node_modules/nwt/_core/cli/tool.js init

4 - Run the server: 
	$ node server.js

5 - Navigate to your hostname (defaults to port 9090). This will launch the example app.

6 - Configure additional sites by calling the command line tool along with a hostname.
	$ node node_modules/nwt/_core/cli/tool.js create <hostname>