{
	pageTitle: 'Html Helper',

	content: Html.h2('HtmlHelper') +
		Html.p('The HtmlHelper provides for quick access for everyday normal HTML functions.') +
		Docs.example(
			"HtmlHelper::image",
			"Generates an image based on url.",
			function() {
Html.image(
	'https://a248.e.akamai.net/assets.github.com/images/icons/emoji/v2/octocat.png',
	{height:20, width:20}
)
			}
		) +
		Docs.example(
			"HtmlHelper::link",
			"Generate any kind of link.",
			function() {
Html.link('Test link', '#')
			}
		) +
		Docs.example(
			"HtmlHelper::list",
			"Generates an unordered list.",
			function() {
Html.list(
	'Item 1',
	'Item 2',
	'Item 3'
)
			}
		)
}