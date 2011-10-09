{
	pageTitle: 'Views',

	content: Html.h2('NWT Views') +
		Html.p('Views in NWT are meant for rapid templating of dynamic sites. They are highly magical, but flexible enough to solve any layout requirement.') +

		Docs.example(
			"NWTLayout",
			"All views are invoked via an object literal, such as:",
"{\n" +
"	pageTitle: 'My Page Title',\n" +
"	content: Html.p('My page content here')\n" +
"}\n",
			true
		) +

		Docs.example(
			"NWTLayout::partial",
			"You may run a partial from inside a template with this.partial() syntax.",
			function(){
this.partial(['docs', 'views_example_partial'])
			}
		)
		
}