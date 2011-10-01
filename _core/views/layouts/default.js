function NWTDefaultLayout(NWTLayout) {
	var content=['<!DOCTYPE html><html>',
		'<head>',
			'<title>', NWTLayout.definition.title, '</title>',
			NWTLayout._stylesheets(),
		'</head>',
		'<body>',
			NWTLayout.getContent(),
			NWTLayout._beforeBody(),
		'</body>'];

	return content.join('');
}
exports.NWTViewLayoutWrapper = NWTDefaultLayout;
