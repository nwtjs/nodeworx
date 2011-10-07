{
	pageTitle: 'Installation',

	content: Html.h1('Installation') +
		Html.p('1 - Recommend install is with NPM: $ npm install nwt') +
		Html.p('2 - Note: due to the npm install, the entire framework will now reside within node_modules/nwt. We recommend moving the framework, or creating a symlink for easier access: ln -s node_modules/nwt nwt. This will create a nwt symlink for you as a shortcut. You should now be able to type: cd nwt to enter the framework directory.') +
		Html.p('3 - Run the server: $ node _core/server.js') +
		Html.p('4 - Navigate to your hostname (defaults to port 80). This will launch the example app. ')
}