(function(root) {

	var nwtHelper = global.require('./helpers/NWTHelper.js');

	/**
	 * Html link helper
	 */
	function HtmlLink(args) {
		this.content = args[0];
		this.href = args[1];
		this.attributes = args[2];

		HtmlLink._super.call(this, args);
	}
	global.nwt.extend(HtmlLink, nwtHelper.NWTHelperInstance);

	HtmlLink.prototype.render = function() {
		return '<a href="' + this.get('href') + '">' + this.get('content') + '</a>';
	};

	function HtmlHelper() {
		
	}

	HtmlHelper.prototype.link = function() {
		return new HtmlLink(arguments);
	};

	HtmlHelper.prototype.toString = function() {
		return this.render();
	};

	root.HtmlHelper = new HtmlHelper();


}(this));