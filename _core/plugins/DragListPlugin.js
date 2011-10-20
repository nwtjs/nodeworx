(function(root) {


	function DragListPlugin(config) {
		config = config || {};
		config.direction = config.direction || 'vertical';

		this.config = config;
	}


	/**
	 * Modifies a view helper to become a drag list
	 */
	DragListPlugin.prototype.process = function(viewObject) {

		global.context().clientScripts.push('widgets/DragPlugin');

		if( !viewObject.attributes  ) {
			viewObject.attributes = {};
		}

		if( !viewObject.attributes.class  ) {
			viewObject.attributes.class = "";
		}

		viewObject.attributes.class += 'nwt_draggable nwt_draggable_' + this.config.direction;

		return viewObject;	
	};

	root.DragListPlugin = DragListPlugin;

}(this));
