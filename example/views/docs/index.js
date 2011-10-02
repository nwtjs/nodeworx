{
	pageTitle: 'NWT Docs',

	content: LayoutManager
		.addClassPrefix('docs')
		.left(Html.list(
			Html.h3('View Helpers'),
			Html.link('Html Helper', '/docs/helpers_html'),
			Html.link('Form Helper', '/docs/helpers_form'),
			Html.link('Date Helper', '/docs/helpers_date'),
			Html.link('Number Helper', '/docs/helpers_number')
		))
		.main('Welcome to the NWT docs')
}