{
	pageTitle: 'Installation',

	content: Html.h1('Installation') +
		Html.p('1 - Recommend install is with NPM: $ npm install nwt') +
		Html.p('2 - Note: due to the npm install, the entire framework will now reside within node_modules/nwt. The easiest way to work with NWT is by leaving the framework in the installed location, and to configure your sites using the command line tool.') +
		Html.p('3 - Initialze the NWT environment: $ node node_modules/nwt/_core/cli/tool.js init') +
		Html.p('4 - Run the server: $ node server.js') +
		Html.p('5 - Navigate to your hostname (defaults to port 80). This will launch the example app. ') +
		Docs.example(
			"Creating a site",
			"The easiest way to generate a NWT site is by using the included command line tool. Call the create method with the hostname that points to your host. For example, we can replace &lt;hostname&gt; with nwtjs.org for this site.",
			'node node_modules/nwt/_core/cli/tool.js create <hostname>', true
		)
}