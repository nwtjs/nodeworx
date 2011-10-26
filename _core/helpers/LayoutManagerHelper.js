(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false);

	/**
	 * LayoutManager helper class
	 * The LayoutManager creates structured layouts with little to no effort.
	 * Each layout area is chainable. The following layout methods are availble:
	 * [top, left, main, right, bottom]
	 *
	 * By default, all links inside of a LayoutManager will attempt to update the 
	 * content inside of the LayoutManager "main" area.
	 */
	function LayoutManagerHelper() {
		this.config = {};
		this.panels = {};
	};
	global.nwt.extend(LayoutManagerHelper, nwtHelperInstance);
	

	 /**
         * Renders the LayoutManager 
         */
        LayoutManagerHelper.prototype.render = function() {
		
		global.nwt.requireScript('widgets/LayoutManager');

		var content = [],
			classPrefix = ( this.config.classPrefix ? this.config.classPrefix + '_' : '' );

		// The nwt_layout class is only for semantics and traversal
		// The nwt_event_sink class handles bubbling if a data-callback attribute is present
		content.push('<div class="nwt_layout nwt_event_sink" data-callback="layoutManager">');

		content.push('<div class="nwt_layout_inner' + ( this.initialState ? ' layout_' + this.initialState.join('_') : '' )  + '">');

		for( var i in this.panels ) {
			// Display several classes, the nwt_main, nwt_left, nwt_right classes are reserved for JS functionality
			content.push('<div class="' + classPrefix + '' + i + ' nwt_' + i + '"><div class="inner">');
				content.push(this.panels[i].content);
			content.push('</div></div>');
		}

		content.push('</div>'); // End div.nwt_layout_inner

		content.push('</div>'); // End div.nwt_layout

		// Reset vars
		this.panels = {};
		this.config = {};
		this.initialState = null;

	        return content.join('');
        };


         /**
         * Adds a panel to the layout manager 
         */
        LayoutManagerHelper.prototype._add = function(position, args) {
		if( !args[0] ) {
			args = '';
		} else {
			args = args[0];
		}

		// If the content is a string, or has a render method, set an object.
//		if( typeof args === "string" || args.render !== undefined ) {
			args = {content: args + ''};
//		}
		var definition = args;

        	this.panels[position] = definition;
	};


	/**
	 * Adds a class prefix to this instance of the layout manager
	 * This is useful when mutliple instances of layouts are nested
	 * The prefix is only added to the wrappers of the inner panes
	 * @param string The class prefix to add
	 */
	LayoutManagerHelper.prototype.addClassPrefix = function(classPrefix) {
		this.config.classPrefix = classPrefix;
		return this;
	};


	/**
	 * Creates a top layout panel
	 */
	LayoutManagerHelper.prototype.top = function() {
		this._add('top', arguments);
		return this;
	};


        /**
         * Creates a left layout panel
         */
        LayoutManagerHelper.prototype.left = function() {
                this._add('left', arguments);
                return this;
        };


        /**
         * Creates a main  layout panel
         */
        LayoutManagerHelper.prototype.main = function() {
                this._add('main', arguments);
                return this;
        };


        /**
         * Creates a right layout panel
         */
        LayoutManagerHelper.prototype.right = function() {
                this._add('right', arguments);
                return this;
        };


        /**
         * Creates a bottom layout panel
         */
        LayoutManagerHelper.prototype.bottom = function() {
                this._add('bottom', arguments);
                return this;
        };


	/**
	 * Returns and generates partial content
	 * The reason of calling LayoutManagerHelper.partial instead of NWTLayout.partial
	 * is so we can populate the class of the default display pre render
	 * @param array Resource array allocator
	 */
	LayoutManagerHelper.prototype.partial = function(path) {
		this.initialState = path;
		var NWTLayout = global.nwt.load().library('NWTLayout');
		return NWTLayout.partial(path);
	};

	root.LayoutManagerHelper = LayoutManagerHelper;
}(this));
