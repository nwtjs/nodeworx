function NWTTemplateDataBinder() {

}

NWTTemplateDataBinder.prototype.update = function(objClass) {
	nwt.event.fire(objClass + ':nwt:rerender', {
		model: objClass
	});
};

nwt.templateDataBinder = new NWTTemplateDataBinder();