{
	pageTitle: 'Layout Manager',

	content: Html.h2('LayoutManagerHelper') +
		Html.p('The LayoutManagerHelper enables you to format sections of the page quickly.') +

		Docs.example(
			"LayoutManagerHelper::[top, left, main, right, bottom]",
			"Generates layout sections for content. All links inside of a layout manager will reload the main content with an ajax fetch.",
			function() {
LayoutManager
		.top('Any')
		.left('Content')
		.main('You')
		.right('Want')
		.bottom('Here')
					},
			true
		) +

		Docs.example(
			"LayoutManagerHelper::addClassPrefix",
			"Adds a class prefix to the container. This is useful for nested layout managers.",
			function() {
LayoutManager
		.addClassPrefix('docs')
					},
			true
		)
		
}