function NWTDefaultLayout(NWTLayout) {
	var content=['<!DOCTYPE html><html>',
		'<head>',
			'<title>', NWTLayout.definition.title, '</title>',
		'</head>',
		'<body>',
			NWTLayout.definition.content,
			NWTLayout._beforeBody(),
		'</body>'];

	return content.join('');
}
exports.NWTViewLayoutWrapper = NWTDefaultLayout;