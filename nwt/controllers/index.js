var Form = global.nwt.load().helper('Form'),
	TabView = global.nwt.load().helper('TabView');

module.exports = {
	index : function() {
		this.pageTitle = 'Welcome to NWT';

		this.content = TabView.
			addDynamic('Home', ['index', 'index']).
			addDynamic('About', ['index', 'about']).
			addDynamic('Download', ['index', 'download']); 
	}
}
