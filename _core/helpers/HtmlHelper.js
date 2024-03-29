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
		var attributes = this._parseAttributes();
		return '<' + this.tag + ( attributes ? ' ' + attributes : '' ) + '>' + this.content + '</' + this.tag + '>';
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

		var attributes = this._parseAttributes();

		return this.beforeContent +
		'<a href="' + this.get('href') + '"' + ( attributes ? ' ' + attributes : '' ) + '>' + 
			this.get('content') +
		'</a>' +
		this.afterContent;
	};


	/**
	 * Html list helper
	 * Generates an unordered list
	 * Each argument is a list item
	 */
	function HtmlList(args) {
		this.content = [];

		for( var i = 0, argLen = args.length ; i < argLen ; i++ ) {
			this.content.push(args[i]);
		}

		HtmlList._super.call(this, args);
	}
	global.nwt.extend(HtmlList, nwtHelperInstance);


	/**
	 * Renders the HtmlLink object
	 */
	HtmlList.prototype.render = function() {
		var items = this.get('content'),
			content = [];

		for( var i = 0, item ; item = items[i] ; i++ ) {
			content.push('<li>');
				content.push(item + '');
			content.push('</li>');
		}

		var attributes = this._parseAttributes();

		return '<ul' + ( attributes ? ' ' + attributes : '' ) + '>' + content.join('') + '</ul>';
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

		var attributes = this._parseAttributes();

		return '<img src="' + this.get('src') + '"' + ( attributes ? ' ' + attributes : '' ) + '>';
	};



	/**
	 * @constructor
	 */
	function HtmlHelper() {
		var stdElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p','blockquote', 'code', 'em', 'div', 'pre'];

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
	 * Returns a list helper object
	 * @see HtmlList
	 */
	HtmlHelper.prototype.list = function() {
		return new HtmlList(arguments);
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
