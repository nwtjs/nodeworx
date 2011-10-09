{
	pageTitle: 'TabView Helper',

	content: Html.h2('TabView Helper') +
		Html.p('The TabView Helper provides a qucik and easy method for creating a tabbed interface. Each tab is loaded via ajax.') +
		Docs.example(
			"TabViewHelper::addDynamic",
			"Generates dynamic tabs.",
			function() {
TabView.
	addDynamic('First', ['docs', 'views_example_partial']).
	addDynamic('Second', ['index', 'download'])
			}
		)
}