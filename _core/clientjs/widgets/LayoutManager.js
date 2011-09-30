function NWTLayoutManager() {
}

/**
 * Magically called when any link is found inside of 
 * a div with a class of "nwt_event_sink"
 */
NWTLayoutManager.prototype.trapEvent = function(el) {
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
