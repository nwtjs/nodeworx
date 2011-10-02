function NWTDefaultLayout(NWTLayout) {
	var content=['<!DOCTYPE html><html>',
		'<head>',
			'<title>', NWTLayout.definition.pageTitle, '</title>',
			NWTLayout._stylesheets(),
		'</head>',
		'<body><div class="nwt_root">',
			NWTLayout.getContent(),
			NWTLayout._beforeBody(),
		'</div></body>'];

	return content.join('');
}
exports.NWTViewLayoutWrapper = NWTDefaultLayout;
