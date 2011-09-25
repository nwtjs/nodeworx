{
	pageTitle: 'Welcome to NWT',

	helpers: ['TabView'],

	content: TabView.
		addDynamic('Home', ['index', 'home'], {preload: true}).
		addDynamic('About', ['index', 'about']).
		addDynamic('API', ['index', 'api']).
		addDynamic('Download', ['index', 'download'])
}
