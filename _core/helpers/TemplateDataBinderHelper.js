(function(root) {

	/**
	 * The databinder object allows for easy updating of objects within pages
	 * Use TemplateDataBinder.wrap(Object.renderer) in a template, and you 
	 * will have easy access to update those areas in callbacks.
	 * E.g., nwt.dataBinder('ObjectModel').update();
	 * @constructor
	 */
	function TemplateDataBinderHelper() {
		this.content = null;
	}


	/**
	 * Wraps an object within an updatable area
	 */
	TemplateDataBinderHelper.prototype.wrap = function() {
		// Just wrap one content piece for now
		this.content = arguments[0];
		return this;
	};


	/**
	 * Renders the data binder
	 */
	TemplateDataBinderHelper.prototype.toString = function() {
		global.context().clientScripts.push('widgets/TemplateDataBinder');

		var objClass = global.nwt.getClass(this.content);

//console.log(global.context());
		this.content.on('nwt:rerender', function(args){
			nwt.socket.send('/index/chat',{
				success: function(response) {
					var tempElement = document.createElement('div');
					tempElement.innerHTML = response.content;

					var tempNode = nwt.one(tempElement),
						index = 0,
						pageNodes = nwt.all('.bindable-' + args.model);

					tempNode.all('.bindable-' + args.model).each(function(newBindable) {
						pageNodes.item(index).setContent(newBindable.getContent());
						index++;
					});
					console.log('rerender ', response);
				}
			});
		});

		return '<div class="bindable-' + objClass + '">' + this.content + '</div>';
	};

	root.TemplateDataBinderHelper = TemplateDataBinderHelper;

}(this));