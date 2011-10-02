{
	pageTitle: 'Number Helper',

	content: Html.h2('NumberHelper') +
		Html.p('The NumberHelper provides functions that format numbers painlessly.') +
		Number.format(23847982374981.123123421) + ' - ' +  Number.format(23847982374981.123123421, 4, '-', '')
}