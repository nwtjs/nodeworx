function NWTTabView() {
	
}

NWTTabView.prototype.open = function(el) {
	nwt.socket.send(el.get('href'),{
		success: function() {
			alert('got success');
		}
	});
};

nwt.tabview = new NWTTabView();