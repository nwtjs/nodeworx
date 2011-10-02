{
	pageTitle: 'Development Methodologies',

	content: Html.p('NWT provides a web framework for: ') +
		Html.list(
			'Rapidly developing applications which look and feel like native desktop applications.',
			'Flexible model layer which doesn\'t restrict scaling.',
			'Powerful helpers and UI widgets.',
			'Clean, spec-driven, templates and generated code.'
		) +
		Html.h3('Is NWT right for me?') +
		Html.p('While certain frameworks have inspired a great deal of NWT, we have taken a much different approach towards web development frameworks. We heavily rely on magic objects to render themselves with smart defaults and plugins to modify the behavior of these objects. Due to the object-heavy use of templating helpers and models, there is likely a bit of a learning curve when using NWT for the first time.') +
		Html.h3('Where\'s the HTML?') +
		Html.p('We believe that you can create a scalable, single-page web application, without writing a single line of HTML. By avoiding the need to write HTML your platform will have much more standardized markup and styles. Fight CSS bloat!')
}