function NWTLayoutManager() {
}

/**
 * Magically called when any link is found inside of 
 * a div with a class of "nwt_event_sink"
 */
NWTLayoutManager.prototype.trapEvent = function(el) {

	// Make sure we have a valid href, try to filter out enpty hrefs, or hrefs that only have /#/
	// Trap any link for now, links with target_="blank" will open in a new window
	//if( !el || !el.get('href') || /[a-zA-Z0-9]*$/.test(el.get('href')) ) { return; }

	var resource = el.get('href'),
		layoutWrapper = el.ancestor('.nwt_layout'),
		layoutIdentifierParts = resource.split('/');

	// Quick and dirty way to attempt to generate a semantic resource identifier for styling
	// Take the last two segments from the resource, and implode them with an underscore
	var layoutIdentifier = [layoutIdentifierParts.pop(), layoutIdentifierParts.pop()].reverse().join('_');

	layoutWrapper.one('.nwt_layout_inner').set('className', 'nwt_layout_inner').addClass('layout_' + layoutIdentifier);

	nwt.socket.send(resource,{
		success: function(response) {
			layoutWrapper.one('.nwt_main .inner').setContent(response.content);
		}
	});
};

nwt.layoutManager = new NWTLayoutManager();
