function NWTEmptyLayout(NWTLayout) {
	return JSON.stringify({
		title: NWTLayout.definition.title,
		content: NWTLayout.definition.content
	});
}
exports.NWTViewLayoutWrapper = NWTEmptyLayout;