function NWTEmptyLayout(NWTLayout) {
	return JSON.stringify({
		title: NWTLayout.definition.title,
		content: NWTLayout.getContent(),
		scripts : NWTLayout._generateScripts()
	});
}
exports.NWTViewLayoutWrapper = NWTEmptyLayout;
