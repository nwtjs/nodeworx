{
	pageTitle: 'TabView Helper',

	content: Html.h2('TabView Helper') +
		Html.p('The TabView Helper provides a qucik and easy method for creating a tabbed interface. Each tab is loaded via ajax.') +
		'<pre><code>' +
		"TabView.<br>\
			addDynamic('Home', ['index', 'home'], {preload: true}).<br>\
			addDynamic('Docs', ['docs', 'index']).<br>\
			addDynamic('Chat', ['index', 'chat']).<br>\
			addDynamic('Download', ['index', 'download'])"

}