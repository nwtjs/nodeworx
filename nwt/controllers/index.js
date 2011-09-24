var Form = global.nwt.load().helper('Form'),
	TabView = global.nwt.load().helper('TabView');

module.exports = {
	index : function() {
		this.pageTitle = 'Welcome to NWT';

		this.content = TabView.
			addDynamic('Home', ['index', 'home']).
			addDynamic('About', ['index', 'about']).
			addDynamic('API', ['index', 'api']).
			addDynamic('Download', ['index', 'download']); 
	},

	home : function() {
		this.content = 'Home content';
	},

	about : function() {
		this.content = 'About content';
	},

	api : function() {
		this.content = 'API content';
	},

	download : function() {
		this.content = 'Download content';
	}
}
