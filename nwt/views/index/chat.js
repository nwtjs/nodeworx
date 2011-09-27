{
	pageTitle : ' Chat',

        content : ChatModel.recent().each(function(chat) {
			return '<div class="chat">' + chat.username + ':' + chat.content + '</div>'
		}) +
        Form.field('Chat.input') + Form.submit('Send')
}

