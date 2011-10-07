{
	pageTitle: 'Table Helper',

	content: Html.h2('TableHelper') +
		Html.p('The TableHelper generates table markup for tabular data.') +
		Table.headers('Username', 'Content')
			.cellIterator(
				ChatModel.all({limit:10}),
				function(record){
					this.cells(record.username, record.content);
				}
			) +
		Table.headers('Test 1', 'Test 2', 'Test 3')
			.cells('No', 'Yes', 'No')
}