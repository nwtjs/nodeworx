{
	pageTitle: 'Table Helper',

	content: Html.h2('TableHelper') +
		Html.p('The TableHelper generates table markup for tabular data.') +

		Docs.example(
			"TableHelper::headers",
			"Adds headers to the table instance.",
			function() {
Table
		.headers('Column 1', 'Column 2')
					}
		) +


		Docs.example(
			"TableHelper::cells",
			"Adds a row of cells to the table instance. Cells are generated from arguments.",
			function() {
Table
		.headers('Person', 'Favorite Foods')
		.cells('Kevin', 'Mac & Cheese')
		.cells('Dave', 'Pizza')
					}
		) +

		Docs.example(
			"TableHelper::rowIterator",
			"Takes a model and callback to iterate over table data and output rows.",
			function() {
Table.headers('Username', 'Content')
	.rowIterator(
		ChatModel.all({limit:10}),
		function(record){
			return [record.username, record.content];
		}
	)
					}
		)
}