function NWTPanel() {

}


/**
 * Renders an ajax dialog based off of a link generated with Panel.ajax
 */
NWTPanel.prototype.ajax = function(el) {

	nwt.socket.send(el.data('resource'),{
		success: function(response) {
			var newContent = nwt.node.create('<div></div>');

			// setContent called required to populate event_hooks
			newContent.setContent(response.content);

			nwt.one('body').append(newContent.one('.panel'));
		}
	});
};

nwt.panel = new NWTPanel();