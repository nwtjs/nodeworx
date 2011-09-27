(function(root) {

	function NWTModel() {
		this.limit = null;
	}


	/**
	 * Fetches records that match the params
	 */
	NWTModel.prototype.all = function(params) {
		return this;
	};


	/**
	 * Fetches a single record
	 */
	NWTModel.prototype.one = function(params) {
		this.limit = 1;
		return this;
	};


	/**
	 * Iterates through each record and calls the callback
	 * If we have not fetched the data, do so
	 */
	NWTModel.prototype.each = function(callback) {
		var returnData = [];
		for( var i = 0, record; record = this._data ; i++) {
			returnData.push(callback(record));
		}
		return returnData.join('');
	};

	root.NWTModel = NWTModel;

}(this));
