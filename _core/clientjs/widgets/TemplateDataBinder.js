function NWTTemplateDataBinder() {

}


/**
 * Triggers a databinder update based on a node
 */
NWTTemplateDataBinder.prototype.trigger = function(el) {
	nwt.templateDataBinder.update(el.data('model'));
	nwt.templateDataBinder.update(el.data('uri'));
};


/**
 * Updates bindable instances based on an object class
 */
NWTTemplateDataBinder.prototype.update = function(objClass, path) {
	nwt.event.fire(objClass + ':nwt:rerender', {
		model: objClass
		path: path
	});
};

nwt.templateDataBinder = new NWTTemplateDataBinder();