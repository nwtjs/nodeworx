{
	preFilter : function(params) {
		var model = global.nwt.load().model(params.model);
		model.save(params[params.model]);
	},

	content : 'return?'
}
