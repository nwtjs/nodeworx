{
	pageTitle: 'Panel Helper',

	content: Html.h2('PanelHelper') +
		Html.p('The PanelHelper provides methods to generate in page panels.') +

		Docs.example(
			"PanelHelper::render",
			"Renders a panel.",
			function() {
Panel.render('Content inside a panel.', {height:300})
}, true
		) +

		Docs.example(
			"PanelHelper::ajax",
			"Renders a link which triggers an ajax panel.",
			function() {
Panel.ajax('Link here', ['docs', 'views_example_partial'])
}, true
		)
}