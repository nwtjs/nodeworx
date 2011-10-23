function NWTFlyoutMenu() {

	// Current menu trigger (generally a link which opens the menu)
	this.trigger = null;

	// Current menu container
	this.currentMenu = null;

	nwt.one('body').on('mousemove', this.mouseMove);
}


/**
 * Checks if we need to open or close the menu
 */
NWTFlyoutMenu.prototype.mouseMove = function(e) {

	if( e.target.hasClass('nwt_flyout_menu') ) {
		nwt.flyoutMenu.trigger = e.target;
		nwt.flyoutMenu.open();
	} else if( nwt.flyoutMenu.currentMenu !== null ) {

		try {
			var hasTriggerNode = e.target.ancestor('ul').get('parentNode').previous().hasClass('nwt_flyout_menu');
		} catch(e) {
		}

		if( !hasTriggerNode ) {
			nwt.flyoutMenu.close();
		}
	}
};


/**
 * Closes the menu
 */
NWTFlyoutMenu.prototype.close = function() {
	this.currentMenu.setStyle('display', 'none');
	this.currentMenu = null;
};


/**
 * Opens the menu
 */
NWTFlyoutMenu.prototype.open = function() {
	if( this.currentMenu && this.currentMenu !== this.trigger.next() ) {
		this.close();
	}

	this.currentMenu = this.trigger.next();

	this.currentMenu.setStyle('display', 'block');
};

nwt.flyoutMenu = new NWTFlyoutMenu();