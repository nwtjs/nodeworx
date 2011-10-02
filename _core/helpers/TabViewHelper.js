(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false),
		Html = global.nwt.load().helper('Html');

	/**
	 * A single renderable tabview instance
	 * @constructor
	 */
	function TabViewInstance() {

		global.context().clientScripts.push('widgets/TabView');

		this.initialResource = false;
		this.tabs = [];
		TabViewInstance._super.call(this);
	}
	global.nwt.extend(TabViewInstance, nwtHelperInstance);


	/**
	 * Adds a tab
	 * @param string Label of the link to render
	 * @param array NWT content resource lookup
	 * @param object (optional) Configuration for each tab, may contain:
	 * 	- preload : Boolean indicating whether or not to preload the resource for this tab
	 */
	TabViewInstance.prototype.addDynamic = function(label, resource, config) {
		config = config || {};
		
		if( config.preload ) {
			this.initialResource = this.tabs.length + 1;
		}

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

		var initialContent = "",
			content = ['<div class="tab_view"><div class="tabs"><ul>'];

		for( var i = 0, tab; tab = this.tabs[i] ; i++ ) {
	
			var className = '';
			if( this.initialResource && this.initialResource == i+1 ) {
				className = 'nwt_tabview_selected';
			}

			content.push('<li class="' + className + '">' + Html.link(tab.label, '/#!/' + tab.resource.join('/'), {class: 'nwt_tabview_open'}) + '</li>');
		}

		content.push('</ul></div><div class="tab_content">', initialContent, '</div></div>');

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
