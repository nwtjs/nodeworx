(function(root) {

	/**
	 * Extendable class so we can render nodes properly
	 * @constructor
	 */
	function NWTLayoutNode() {
		
	}


	/**
	 * NwtLayoutTitle class
	 * Generates a title based on the controller
	 * @constructor
	 * @param object NwtLayout reference
	 */
	function NWTLayoutTitle(nwtLayout) {
		this.nwtLayout = nwtLayout;
	}
	global.nwt.extend(NWTLayoutTitle, NWTLayoutNode);


	/**
	 * Returns the title of this page
	 */
	NWTLayoutTitle.prototype.toString = function() {
		return this.nwtLayout.pageTitle || '(no title)';
	};


	/**
	 * NWTLayoutContent class
	 * Generates page content based on the controller
	 * @constructor
	 * @param object NwtLayout reference
	 */
	function NWTLayoutContent(nwtLayout) {
		this.nwtLayout = nwtLayout;
	}
	global.nwt.extend(NWTLayoutContent, NWTLayoutNode);


	/**
	 * Returns the content of this page
	 */
	NWTLayoutContent.prototype.toString = function() {
		return this.nwtLayout.content + '' || '&nbsp;';
	};


	/**
	 * Layout class
	 * @constructor
	 */
	function NWTLayout() {
		
	}


	/**
	 * Returns a single tag
	 */
	NWTLayout.prototype._getTag = function(tag, spec) {
		var content = '<' + tag + '>';

		if( spec instanceof NWTLayoutNode || spec.isRenderable !== undefined ) {

			content += spec;

		} else if( spec instanceof Array ) {
			for( var i = 0, contentItem; contentItem = spec[i] ; i++ ) {
				content += contentItem;
			}
		} else if ( spec instanceof Object ) {
			for( var i in spec ) {
				content += this._getTag(i, spec[i]);
			}
		}

		// Special processing for the </body> tag
		if( tag === 'body' ) {
			content += this._beforeBody();
		}

		content += '</' + tag + '>';
		
		return content;
	};


	/**
	 * Renders framework things before the body tag including javascriptz
	 */
	NWTLayout.prototype._beforeBody = function() {

		var content = [];

		for( var i = 0, script ; script = global.context().clientScripts[i] ; i++ ) {
			content.push('<script type="text/javascript" src="/_core/clientjs/' + script + '.js"></script>');			
		}

		return content.join('');
	};


	/**
	 * Loads in the controller spec to populate data
	 */
	NWTLayout.prototype._loadController = function(controller) {
		controller.call(this);
	};


	/**
	 * Renders the entire content of the layout
	 */
	NWTLayout.prototype.toString = function() {

		// Handle JSON layout
		if( this.json ) {

			var json = {};
			for( var i in this.json ) {
				if( this.json[i] instanceof NWTLayoutNode ) {
					json[i] = this.json[i].toString();
				} else {
					json[i] = this.json[i];
				}
			}

			return JSON.stringify(json);
		}

		// Standard shell layout
		var content=['<!DOCTYPE html><html>'];

		for( var i in this.definition ) {
			content.push(this._getTag(i, this.definition[i]));
		}

		content.push('</html>');

		// Reset the definition after rendering due to Node.js module caching
		this.definition = {};

		return content.join('');
	};


	/**
	 * Wraps a layout with a full HTML shell
	 */
	NWTLayout.prototype.shell = function(definition) {
		this.definition = definition;
	};


	/**
	 * Wraps an empty layout
	 */
	NWTLayout.prototype.empty = function(json) {
		this.json = json;
	};


	/**
	 * Renders the page title
	 */
	NWTLayout.prototype.title = function() {
		return new NWTLayoutTitle(this);
	};


	/**
	 * Renders the main page content
	 */
	NWTLayout.prototype.content = function() {
		return new NWTLayoutContent(this);
	};

	exports.NWTLayout = NWTLayout;

}(this));
