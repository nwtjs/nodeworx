function NWTTabView() {
}

NWTTabView.prototype.open = function(el) {

	var resource = el.get('href');
	resource = resource.replace('/#!', '');

	nwt.socket.send(resource,{
		success: function(response) {
			el.ancestor('.tab_view').one('.tab_content').setContent(response.content);
		}
	});
};

nwt.tabview = new NWTTabView();


        // preload any tabs with the calss of "nwt_tabview_selected"
        nwt.all('li.nwt_tabview_selected').each(function(el){
                el.one('a').click();
        });

