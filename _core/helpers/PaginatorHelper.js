(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false),
		Html = global.nwt.load().helper('Html');

	/**
	 * Paginator helper class
	 * 
	 * Generates pagination links based on an active record
	 */
	function PaginatorHelper() {
		PaginatorHelper._super.call(this);
	};
	global.nwt.extend(PaginatorHelper, nwtHelperInstance);
	

	/**
	 * Renders the Paginator
	 */
	PaginatorHelper.prototype.render = function() {
		var content = Html.link(this.linkText, '', {
			'data-model' : this.modelClass,
			'data-uri' : '/' + global.context().request.controller + '/' + global.context().request.action,
			'class' : 'nwt_templateDataBinder_trigger'
		});

		return content;
	};


	/**
	 * Generates a link to go back a page
	 * @param object Standard NWT model instance
	 * @param string Link text, defaults to: "previous"
	 */
	PaginatorHelper.prototype.previous = function(model, linkText) {
		this.modelClass = global.nwt.getClass(model);
		this.model = model;
		this.linkText = linkText;
		this.currentOffset = this.model.offset || 0;
		this.linkOffset = this.currentOffset - this.model.limit;
		return this;
	};


	/**
	 * Generates a link to go a page forward
	 * @param object Standard NWT model instance
	 * @param string Link text, defaults to: "next"
	 */
	PaginatorHelper.prototype.next = function(model, linkText) {
		this.modelClass = global.nwt.getClass(model);
		this.model = model;
		this.linkText = linkText;
		this.currentOffset = this.model.offset || 0;
		this.linkOffset = this.currentOffset + this.model.limit;
		return this;
	};


	root.PaginatorHelper = PaginatorHelper;
}(this));