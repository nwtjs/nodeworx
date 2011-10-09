{
	pageTitle: 'Date Helper',

	content: Html.h2('DateHelper') +
		Html.p('The DateHelper provides for utility methods for formatting dates.') +

		Docs.example(
			"DateHelper::relative",
			"Outputs the date since the provided date.",
			function() {
Date.relative('2011-10-02 01:51:24') + ' | ' + 
Date.relative('2010-05-02 01:51:24') + ' | ' + 
Date.relative('2011-05-02 01:51:24')
			}
		) +

		Docs.example(
			"DateHelper::short",
			"Displays the date in a 'short' format.",
			function() {
Date.short('2011-10-02 01:51:24') + ' | ' + 
Date.short('2010-05-02 01:51:24') + ' | ' + 
Date.short('2011-05-02 01:51:24')
			}
		) +

		Docs.example(
			"DateHelper::full",
			"Displays the date in a 'full' format.",
			function() {
Date.full('2011-10-02 01:51:24') + ' | ' + 
Date.full('2010-05-02 01:51:24') + ' | ' + 
Date.full('2011-05-02 01:51:24')
			}
		)
}