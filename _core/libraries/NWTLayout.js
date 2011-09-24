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

		content += '</' + tag + '>';
		
		return content;
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
		var content=['<!DOCTYPE html><html>'];

		for( var i in this.definition ) {
			content.push(this._getTag(i, this.definition[i]));
		}

		content.push('</html>');

		return content.join('');
	};

	/**
	 * Wraps a layout
	 */
	NWTLayout.prototype.wrap = function(definition) {
		this.definition = definition;
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

	exports.NWTLayout = new NWTLayout();

}(this));
