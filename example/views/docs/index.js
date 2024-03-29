{
	pageTitle: 'NWT Docs',

	content: LayoutManager
		.addClassPrefix('docs')
		.left(Html.list(
			Html.link('NWT Basics', '/docs/basics') +
			Html.list(
				Html.link('Installation', '/docs/basics_installation'),
				Html.link('Methodologies', '/docs/basics_methodologies'),
				Html.link('Directory Structure', '/docs/basics_structure')
			),
			Html.link('View Files', '/docs/views'),
			Html.link('View Helpers', '/docs/helpers') +
			Html.list(
				Html.link('Html Helper', '/docs/helpers_html'),
				Html.link('Form Helper', '/docs/helpers_form'),
				Html.link('Date Helper', '/docs/helpers_date'),
				Html.link('Number Helper', '/docs/helpers_number'),
				Html.link('TabView Helper', '/docs/helpers_tabview'),
				Html.link('LayoutManager Helper', '/docs/helpers_layoutmanager'),
				Html.link('Panel Helper', '/docs/helpers_panel'),
				Html.link('Paginator Helper', '/docs/helpers_paginator'),
				Html.link('Table Helper', '/docs/helpers_table')
			),
			Html.link('Models', '/docs/models'),
			Html.link('NWT Client Libs', '/docs/uijs'),
			Html.list(
				Html.link('Client Node', '/docs/uijs_node')
			)
		))
		.main('Welcome to the NWT docs') +
		'<div style="clear:both;"></div>'
}