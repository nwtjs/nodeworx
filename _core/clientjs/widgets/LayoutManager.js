function NWTLayoutManager() {
}

/**
 * Magically called when any link is found inside of 
 * a div with a class of "nwt_event_sink"
 */
NWTLayoutManager.prototype.trapEvent = function(el) {

	var resource = el.get('href'),
		layoutWrapper = el.ancestor('.nwt_layout');


	layoutWrapper.addClass('layout_' + resource.replace('/', '_'));

	nwt.socket.send(resource,{
		success: function(response) {
			layoutWrapper.one('.main .inner').setContent(response.content);
		}
	});
};

nwt.layoutManager = new NWTLayoutManager();
