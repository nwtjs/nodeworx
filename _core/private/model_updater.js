{
	preFilter : function(params) {
		var model = global.nwt.load().model(params.model),
			lookupKey = params.model.replace('Model', ''),
			saveData = params[lookupKey];

		model.save(saveData);
	},

	status : true
}
