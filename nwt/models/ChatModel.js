(function(root){

	var NWTModel = global.nwt.load().model('NWTModel', false);

	function ChatModel() {

		this.tableName = 'chat';

		this.fields = {
			id : 'integer',
			content : 'string',
			created : 'datetime'
		};

	}
	global.nwt.extend(ChatModel, NWTModel);

	exports.ChatModel = ChatModel;

}(this));
