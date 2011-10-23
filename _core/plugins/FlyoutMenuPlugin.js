(function(root) {


	function FlyoutMenuPlugin(menuItems) {
		this.menuItems = menuItems;
	}


	/**
	 * Modifies a view helper to become a drag list
	 */
	FlyoutMenuPlugin.prototype.process = function(viewObject) {

		global.nwt.requireScript('widgets/FlyoutMenuPlugin');

		viewObject.attributes = viewObject.attributes || {};

		viewObject.attributes.class = viewObject.attributes.class || '';

		viewObject.attributes.class += 'nwt_flyout_menu';

		var htmlHelper = global.nwt.load().helper('Html');

		viewObject.after(
			htmlHelper.div(
				htmlHelper.list.apply(null, this.menuItems),
				{style: 'display:none;', class: 'nwt_flyout_list'}
			)
		);

		return viewObject;
	};

	root.FlyoutMenuPlugin = FlyoutMenuPlugin;

}(this));