function NWTEmptyLayout(NWTLayout) {
	return JSON.stringify({
		title: NWTLayout.definition.pageTitle,
		content: NWTLayout.getContent(),
		scripts : NWTLayout._generateScripts()
	});
}
exports.NWTViewLayoutWrapper = NWTEmptyLayout;
