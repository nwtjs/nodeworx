function NWTEmptyLayout(NWTLayout) {
	return JSON.stringify({
		title: NWTLayout.definition.title,
		content: NWTLayout.definition.content + '',
		scripts : NWTLayout._generateScripts()
	});
}
exports.NWTViewLayoutWrapper = NWTEmptyLayout;
