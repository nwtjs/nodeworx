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
		this.panels = {};
	};
	global.nwt.extend(LayoutManagerHelper, nwtHelperInstance);
	

	 /**
         * Renders the LayoutManager 
         */
        LayoutManagerHelper.prototype.render = function() {
		
		global.nwt.requireScript('widgets/LayoutManager');

		var content = [];

		// The nwt_layout class is only for semantics and traversal
		// The nwt_event_sink class handles bubbling if a data-callback attribute is present
		content.push('<div class="nwt_layout nwt_event_sink" data-callback="layoutManager">');

		for( var i in this.panels ) {
			content.push('<div class="' + i + '"><div class="inner">');
				content.push(this.panels[i].content);
			content.push('</div></div>');
		}

		content.push('</div>'); // End div.nwt_layout

	        return content.join('');
        };


         /**
         * Adds a panel to the layout manager 
         */
        LayoutManagerHelper.prototype._add = function(position, args) {
		args = args[0];

		// If the content is a string, or has a render method, set an object.
		if( typeof args === "string" || args.render !== undefined ) {
			args = {content: args};
		}
		var definition = args;

        	this.panels[position] = definition;
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


	root.LayoutManagerHelper = LayoutManagerHelper;
}(this));
