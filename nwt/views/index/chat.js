{
	pageTitle : ' Chat',

        content : ChatModel.all({order:{id:'desc'}, limit:10}).each(function(chat) {
			return '<div class="chat">' + chat.content + '</div>'
		}) +
        Form.field('Chat.input') + Form.submit('Send')
}

