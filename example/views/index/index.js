{
	pageTitle: 'Welcome to NWT',
	
	css: ['stylesheet.css'],

	content: Html.h1('NWT') +
	TabView.
		addDynamic('Home', ['index', 'home'], {preload: true}).
		addDynamic('Docs', ['docs', 'index']).
		addDynamic('Chat', ['index', 'chat']).
		addDynamic('Download', ['index', 'download'])
}
