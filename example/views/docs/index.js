{
	pageTitle: 'NWT Docs',

	content: LayoutManager
		.addClassPrefix('docs')
		.left(Html.list(
			Html.link('NWT Basics', '/docs/basics') +
			Html.list(
				Html.link('Development Methodologies', '/docs/basics_methodologies'),
				Html.link('Directory Structure', '/docs/basics_structure')
			),
			Html.link('View Helpers', '/docs/helpers') +
			Html.list(
				Html.link('Html Helper', '/docs/helpers_html'),
				Html.link('Form Helper', '/docs/helpers_form'),
				Html.link('Date Helper', '/docs/helpers_date'),
				Html.link('Number Helper', '/docs/helpers_number'),
				Html.link('TabView Helper', '/docs/helpers_tabview'),
				Html.link('LayoutManager Helper', '/docs/helpers_layoutmanager')
			)
		))
		.main('Welcome to the NWT docs')
}