function NWTTabView() {
	
}

NWTTabView.prototype.open = function(el) {

	var resource = el.get('href');
	resource = resource.replace('/#!', '');

	nwt.socket.send(resource,{
		success: function(response) {
			el.ancestor('.TabView').one('.TabContent').setContent(response.content);
		}
	});
};

nwt.tabview = new NWTTabView();