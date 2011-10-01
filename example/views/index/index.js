{
	pageTitle: 'Welcome to NWT',

	content: TabView.
		addDynamic('Home', ['index', 'home'], {preload: true}).
		addDynamic('About', ['index', 'about']).
		addDynamic('API', ['index', 'api']).
		addDynamic('Chat', ['index', 'chat']).
		addDynamic('Download', ['index', 'download'])
}
