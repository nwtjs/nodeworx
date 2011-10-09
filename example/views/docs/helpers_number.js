{
	pageTitle: 'Number Helper',

	content: Html.h2('NumberHelper') +
		Html.p('The NumberHelper provides functions that format numbers painlessly.') +

		Docs.example(
			"NumberHelper::format",
			"Format a number with decimal places and thousands separators.",
			function() {
Number.format(23847982374981.123123421) + '<br>' +
Number.format(23847982374981.123123421, 4, '-', '.')
			}
		)
}