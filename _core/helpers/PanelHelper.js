(function(root) {


	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false);

	/**
	 * A panel instance represents a single panel
	 */
	function PanelInstance(content, config) {
		this.content = content;

		if( !config ) {
			config = {};
		}

		// Default any styles
		config.pos = config.pos || [0,0];
		config.width = config.width || (config.centered ? 400 : 'auto');

		this.config = config;
	}
	global.nwt.extend(PanelInstance, nwtHelperInstance);


	/**
	 * Renders the panel instnace
	 */
	PanelInstance.prototype.render = function() {

		var styles = [];

		styles.push('position:absolute;');
		styles.push('left:' + this.config.pos[0] + 'px;');
		styles.push('top:' + this.config.pos[1] + 'px;');
		styles.push('width:' + this.config.width + 'px;');

		var extraClass = "";
		if( this.config.centered ) {
			extraClass = ' nwt_panel_centered';
			styles.push('position:absolute;');
			styles.push('left:50%;');
			styles.push('top:50%;');
			styles.push('margin-left:-' + (this.config.width/2) + 'px;');
			styles.push('margin-top:-200px;');
		}

		var style = 'style="' + styles.join('') + '" ',

		title = '';

		if( this.content.definition && this.content.definition.pageTitle ) {
			title = this.content.definition.pageTitle;
		}

		var content = [
			'<div class="panel', extraClass, '" ', style, '>',
				'<div class="panel_top">', title , '</div>',
				'<div class="panel_inner">',
					this.content + '',
				'</div>',
				'<div class="panel_bottom"></div>',
			'</div>'
		];

		return content.join('');
	};

	/**
	 * Panel helper class
	 * Creates panels on the page
	 * @constructor
	 */
	function PanelHelper() {
	};


	/**
	 * Returns a new panel object
	 */
	PanelHelper.prototype.render = function(content, config) {
		return new PanelInstance(content, config);
	};


	/**
	 * Renders a close link for the panel
	 */
	PanelHelper.prototype.closeLink = function(linkText) {
		linkText = linkText || 'Close';

		var Html = global.nwt.load().helper('Html');

		return Html.link(linkText, '#', {class: 'nwt_panel_closeParentPanel'});
	};


	/**
	 * Returns a link which renders a panel loaded
	 * via ajax when clicked
	 * @param string Link title
	 * @param resource
	 */
	PanelHelper.prototype.ajax = function(linkContent, ajaxResource) {
		var htmlHelper = global.nwt.load().helper('Html');

		global.nwt.requireScript('widgets/Panel');

		if( !(ajaxResource instanceof String) ) {
			ajaxResource = ajaxResource.join('/');
		}

		return htmlHelper.link(linkContent, '#', {class: 'nwt_panel_ajax', 'data-resource' : ajaxResource });
	};


	root.PanelHelper = PanelHelper;
}(this));
