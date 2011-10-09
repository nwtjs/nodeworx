(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false),
		nwtLayout = global.nwt.load().library('NWTLayout'),
		html = global.nwt.load().helper('Html');

	/**
	 * @constructor
	 */
	function DocsHelper() {
	}
	global.nwt.extend(DocsHelper, nwtHelperInstance);


	/**
	 * Generates a markup example
	 * @param title
	 * @param description
	 * @param callback
	 * @param bool tells whether or not we should render the content
	 */
	DocsHelper.prototype.example = function(title, description, callback, noRender) {

		if( typeof callback == 'function' ) {
			// Generate the exec content, (strip the callback function
			var userContent = callback.toString().replace(/^function\s*\(\s*\)\s*{\s*/, '').replace(/\}$/, ''),
	
			execContent = '{' +
				'content:' + userContent +
			'}';
	
			nwtLayout._loadFromContent(execContent, {layout: 'none'});
		} else {
			userContent = callback;
			noRender = true;
		}

		var content = [
			'<div class="example"><h3>' + title + '</h3>',
			html.p(description),
			html.pre(html.code(userContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'))),
			( noRender ? '' : '<div class="renders">' + nwtLayout + '</div>'),
			'</div>'
		];

		return content.join('');
	};


	root.DocsHelper = DocsHelper;

}(this));
