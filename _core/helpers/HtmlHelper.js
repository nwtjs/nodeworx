(function(root) {

	var nwtHelper = global.require('./../libraries/NWTHelper.js');


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


	/**
	 * Renders the HtmlLink object
	 */
	HtmlLink.prototype.render = function() {
		return '<a href="' + this.get('href') + '" ' + this._parseAttributes() + '>' + this.get('content') + '</a>';
	};


	/**
	 * Html image helper
	 */
	function HtmlImage(args) {
		this.src = args[0];
		this.attributes = args[1];

		HtmlLink._super.call(this, args);
	}
	global.nwt.extend(HtmlImage, nwtHelper.NWTHelperInstance);


	/**
	 * Renders the HtmlLink object
	 */
	HtmlImage.prototype.render = function() {
		return '<img src="' + this.get('src') + '" ' + this._parseAttributes() + '>';
	};



	/**
	 * @constructor
	 */
	function HtmlHelper() {
		
	}


	/**
	 * Returns a link helper object
	 * @see HtmlLink
	 */
	HtmlHelper.prototype.link = function() {
		return new HtmlLink(arguments);
	};


	/**
	 * Returns an image helper object
	 * @see HtmlImage
	 */
	HtmlHelper.prototype.image = function() {
		return new HtmlImage(arguments);
	};

	root.HtmlHelper = new HtmlHelper();


}(this));