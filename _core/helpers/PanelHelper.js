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
		config.width = config.width || 'auto';

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

		var style = 'style="' + styles.join('') + '"',

		title = '';

		if( this.content.definition && this.content.definition.pageTitle ) {
			title = this.content.definition.pageTitle;
		}

		var content = [
			'<div class="panel" ', style , '>',
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


	root.PanelHelper = PanelHelper;
}(this));
