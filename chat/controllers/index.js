var Form = global.nwt.load().helper('Form');

module.exports = {
	index : function() {
		this.pageTitle = 'NWT Chat Application';

		this.content = Form.open() + 
			Form.field('Chat.line', {type: 'textarea'}) +
			Form.submit('Send') +
		Form.close();
	}
}
