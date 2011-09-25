(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false),
		Html = global.nwt.load().helper('Html');

	function TabViewInstance() {

		global.context().clientScripts.push('widgets/TabView');

		this.tabs = [];
		TabViewInstance._super.call(this);
	}
	global.nwt.extend(TabViewInstance, nwtHelperInstance);


	/**
	 * Adds a tab
	 * @param array NWT content resource lookup
	 */
	TabViewInstance.prototype.addDynamic = function(label, resource) {
		this.tabs.push({
			label: label,
			resource: resource
		});
		return this;
	};


	/**
	 * Renders the content of the TabViewInstance
	 */
	TabViewInstance.prototype.render = function() {

		global.nwt.requireScript('widgets/TabView');

		var content = ['<div class="tab_view"><ul>'];

		for( var i = 0, tab; tab = this.tabs[i] ; i++ ) {
			content.push('<li>' + Html.link(tab.label, '/#!/' + tab.resource.join('/'), {class: 'nwt_tabview_open'}) + '</li>');
		}

		content.push('</ul><div class="tab_content"></div></div>');

		// Reset the tabs
		this.tabs = [];

		return content.join('');
	};


	/**
	 * Tab view helper class
	 */
	function TabViewHelper() {
		return new TabViewInstance();
	};

	root.TabViewHelper = TabViewHelper;
}(this));
