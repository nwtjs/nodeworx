function NWTEmptyLayout(NWTLayout) {

	var responseObj = {
		title: NWTLayout.definition.pageTitle,
		content: NWTLayout.getContent(),
		scripts : NWTLayout._generateScripts()
	};

	// Insert any injected data
	if( NWTLayout.definition.inject ) {
		responseObj.inject = NWTLayout.definition.inject;
	}

	return JSON.stringify(responseObj);
}
exports.NWTViewLayoutWrapper = NWTEmptyLayout;
