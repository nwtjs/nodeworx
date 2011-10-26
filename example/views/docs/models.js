{
	pageTitle: 'Models',

	content: Html.h2('NWT Models') +
		Html.p('NWT provides a lightweight data access layer. Currently supported databases are : mySQL and MongoDB.') +
		Html.p('A lazy-loaded "Acive Recordset" makes fetching and formatting data a breeze. All model files should reside in: yoursite/models/ModeName.js.') +
		Html.p('Due to the fact that NWT does not have controllers, models and their formatting methods are instantiated directly in the view. Best practices dictate that heavy model logic should reside within each application model.') +

		Docs.example(
			"NWTModel::one",
			"Loads a single model record into the active recordset.",
			function(){
ChatModel.one({where: {id: 10}})
			},
true
		) +

		Docs.example(
			"NWTModel::all",
			"Loads several records into the active recordset.",
			function(){
ChatModel.all({limit: 10})
			},
true
		) +


		Docs.example(
			"NWTModel::get",
			"Gets a single record based on the primary id.",
			function(){
ChatModel.get(10)
			},
true
		) +

		Docs.example(
			"NWTModel::each",
			"Runs a callback on each record in the active recordset to format it..",
			function(){
ChatModel.all({limit: 10, order: {id: 'desc'}}).each(function(record){
	return record.username + ':' + record.content + '<br>'
})
			}
		) +

		Docs.example(
			"NWTModel::setParams",
			"Sets additional params to the active recordset.",
			function(){
// First fetch some data with the params
ChatModel.all({limit: 10}) +

// Now set additional parameters
ChatModel.setParams({order: {id: 'desc'}})
			},
true
		)

}