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
			'data-uri' : '/' + global.context().request.controller + '/' + global.context().request.action + '/offset/' + this.linkOffset,
			'class' : 'nwt_templateDataBinder_trigger ' + this.className
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
		this.currentOffset = this.model.params.offset || 0;
		this.className = 'nwt_previous';
		this.linkOffset = parseInt(this.currentOffset, 10) - this.model.params.limit;
		return this + ''; // Auto render for now until we break these out into a separate helper class
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
		this.currentOffset = this.model.params.offset || 0;
		this.className = 'nwt_next';
		this.linkOffset = parseInt(this.currentOffset, 10) + this.model.params.limit;
		return this + ''; // Auto render for now until we break these out into a separate helper class
	};


	root.PaginatorHelper = PaginatorHelper;
}(this));
