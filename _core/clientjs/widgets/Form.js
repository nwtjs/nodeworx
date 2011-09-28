function NWTForm() {
	nwt.one('body').on('submit', function(e) {
		nwt.form.submit(e.target);
		e.stop();		
	});
}

NWTForm.prototype.submit = function(el) {

	var resource = el.get('action');
	resource = resource.replace('/#!', '');

	nwt.socket.send(resource,{
		success: function(response) {
			console.log('Got response', response);
		}
	});
};

nwt.form = new NWTForm();
