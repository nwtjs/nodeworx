function NWTTabView() {
	
}

NWTTabView.prototype.open = function(el) {
	console.log('TabView triggered', el);
};

nwt.tabview = new NWTTabView();