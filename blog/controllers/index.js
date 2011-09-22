module.exports = {
	index : function() {
		var Html = global.nwt.load().helper('Html');
			Form = global.nwt.load().helper('Form');

		return Html.link('Index', '/', {title : 'Home page'}) + ' | ' + Html.link('New Blog', '/index/add');
	},

	add: function() {
		return 'Add Blog';
	}
}