(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false);


	/**
 	* Returns a NWTStdHtmlElement object
	*/
	function NWTStdHtmlElementWrapper(elem) {
		var mythis = this;
		return function(content, attributes) {
			return new NWTStdHtmlElement(elem, content, attributes);
		}
	}

	function NWTStdHtmlElement(tag, content, attributes) {
		console.log('Creating std element');
		this.tag = tag;
		this.content = content;	
		this.attributes = attributes;
	};
	global.nwt.extend(NWTStdHtmlElement, nwtHelperInstance);


	NWTStdHtmlElement.prototype.render = function() {
		return '<' + this.tag + ' ' + this._parseAttributes() + '>' + this.content + '</' + this.tag + '>';
	};


	/**
	 * Html link helper
	 */
	function HtmlLink(args) {
		this.content = args[0];
		this.href = args[1];
		this.attributes = args[2];

		HtmlLink._super.call(this, args);
	}
	global.nwt.extend(HtmlLink, nwtHelperInstance);


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
	global.nwt.extend(HtmlImage, nwtHelperInstance);


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
		var stdElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p','blockquote'];

		for ( var i = 0 , elem ; elem = stdElements[i] ; i++ ) {
			this[elem] = new NWTStdHtmlElementWrapper(elem);
		}
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

	root.HtmlHelper = HtmlHelper;


}(this));
