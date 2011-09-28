(function(root){

	var NWTModel = global.nwt.load().model('NWTModel', false);

	function ChatModel() {

		this.tableName = 'chat';

		this.fields = {
			id : 'integer',
			content : 'string',
			created : 'datetime'
		};
		ChatModel._super.call(this);
	}
	global.nwt.extend(ChatModel, NWTModel);


	/**
	 * Generate the recent chat records
	 */
	ChatModel.prototype.recent = function() {
		return this.all({order:{id:'desc'}, limit:10});
	};

	exports.ChatModel = ChatModel;

}(this));
