{
	pageTitle: 'Date Helper',

	content: Html.h2('DateHelper') +
		Html.p('The DateHelper provides for utility methods for formatting dates.') +
		Date.relative('2011-10-02 01:51:24') + ' - ' + Date.relative('2010-05-02 01:51:24') + ' - ' + Date.relative('2011-05-02 01:51:24') + '<br>' +
		Date.short('2011-10-02 01:51:24') + ' - ' + Date.short('2010-05-02 01:51:24') + ' - ' + Date.short('2011-05-02 01:51:24') + '<br>' +
		Date.full('2011-10-02 01:51:24') + ' - ' + Date.full('2010-05-02 01:51:24') + ' - ' + Date.full('2011-05-02 01:51:24') + '<br>'
}