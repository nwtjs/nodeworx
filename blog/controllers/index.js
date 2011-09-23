module.exports = {
	index : function() {
		var Html = global.nwt.load().helper('Html');
			Form = global.nwt.load().helper('Form');

		return Html.link('Index', '/', {title : 'Home page'}) + ' | ' + Html.link('New Blog', '/index/add');
	},

	add: function() {
		var Form = global.nwt.load().helper('Form');

		return ['Add Blog',
			Form.open(),
			Form.field('Blog.title'),
			Form.field('Blog.status', {
				type:'select',
				options:{
					private: 'Private',
					public: 'Public'
				}
			}),
			Form.field('Blog.description',{
				type:'textarea'
			}),
			Form.field('Blog.tos_agree', {
				'type' : 'checkbox',
				'label' : 'Agree to the terms of service?'
			}),
			Form.submit('Submit!'),
			Form.close()
		].join('');
	}
}
