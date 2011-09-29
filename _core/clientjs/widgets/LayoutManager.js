function NWTLayoutManager() {
}

/**
 * Magically called when any link is found inside of 
 * a div with a class of "nwt_event_sink"
 */
NWTLayoutManager.prototype.trapEvent = function(el) {

	var resource = el.get('href');

	nwt.socket.send(resource,{
		success: function(response) {
			el.ancestor('.nwt_layout').one('.main .inner').setContent(response.content);
		}
	});
};

nwt.layoutManager = new NWTLayoutManager();
