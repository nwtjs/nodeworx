{
	pageTitle: 'Welcome to NWT',
	
	css: ['stylesheet.css'],

	content: LayoutManager
                .top(
						'<div class="header">'+
						Html.h1(
							Html.link('NWT', 'index/home')
						) +
						'</div>' +
						'<div class="nav">' +
                        Html.list(
                                Html.link('Home', 'index/home'),
                                Html.link('Docs', 'docs/index'),
                                Html.link('Chat', 'index/chat'),
                                Html.link('Download', 'index/download')
                        ) +
						'</div>'
                )
                .main(
                        LayoutManager.partial(['index', 'home'])
                )
}
