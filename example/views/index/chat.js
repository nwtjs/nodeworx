{
	pageTitle : ' Chat',

	content : 
	Html.h1('NWT Chat Example') +
	TemplateDataBinder.wrap(
		ChatModel.recent().each(function(chat) {
			return '<div class="chat">' + chat.username + ':' + chat.content + '</div>'
		})
	) +
	Form.generate(
		Form.field('Chat.username'),
		Form.field('Chat.content'),
		Form.submit('Send')
	)
	.utilize(ChatModel)
	.on('success', function(result) {
		nwt.one('#ChatContent').set('value', '');
		nwt.templateDataBinder.update('ChatModel', '/index/chat');
	})
}