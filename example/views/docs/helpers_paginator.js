{
	pageTitle: 'Paginator Helper',

	content: Html.h2('PaginatorHelper') +
		Html.p('The PaginatorHelper provides methods to generate page links.') +

		Docs.example(
			"PaginatorHelper::previous",
			"Generates a previous link.",
			function() {
ChatModel.all() +
Paginator.previous(ChatModel, '< Previous')
}, true
		) +

		Docs.example(
			"PaginatorHelper::next",
			"Generates a next link.",
			function() {
ChatModel.all() +
Paginator.next(ChatModel, 'Next >')
}, true
		)
}