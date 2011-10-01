(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false);

	/**
	 * The NWTModelRender class is a wrapper for markup created from a model
	 * Currently NWTModel::each calls this
	 */
	function NWTModelRender(content, model) {
		this.content = content;
		this.model = model;
		this.getClass = this.model.getClass;
	}
	global.nwt.extend(NWTModelRender, nwtHelperInstance);

	NWTModelRender.prototype.render = function() {
		return this.content;
	};


	function NWTModel() {

		// Holds the DB Connection
		this._client = null;

		// Whether or not the params have been modified
		this.dirty = false;

		// Conditional params
		this.params = {};

		// Holds data
		this._data = [];
	}


	/**
	 * Don't do anything when the toString method is called
	 */
	NWTModel.prototype.toString = function() {
		return '';
	};


	/**
	 * Fetches records that match the params
	 */
	NWTModel.prototype.all = function(params) {
		this.setParams(params);
		this.dirty = true;
		return this;
	};


	/**
	 * Fetches a single record
	 */
	NWTModel.prototype.one = function(params) {
		this.setParams({limit : 1});
		return this.all(params);
	};


	/**
	 * Sets params for the model
	 * @param object Key -> value paired object with params. Values may be:
	 *    where -> object (key => value paird object)
	 *    limit -> integer (how many results to return)
	 *    order -> object (column -> order paired)
	 */
	NWTModel.prototype.setParams = function(params) {
		this.dirty = true;
		for( var i in params ) {
			this.params[i] = params[i];
		}
	};


	/**
	 * Loads the DB client
	 * @return object
	 */	
	NWTModel.prototype._getClient = function() {

		// If we do not have a client yet, instantiate one
		if( !this._client ) {
			var _clientConfig = require(__dirname + '/../../' + global.context().config.folder + '/config.js').db,
				driverClass = require(__dirname + '/../drivers/NWT' + _clientConfig.driver + '.js').client;
			this._client = new driverClass(_clientConfig,  this);
		}

		return this._client;
	};


	/**
	 * Updates the current dataset based on the params
	 */
	NWTModel.prototype._update = function() {
		this._data = this._getClient().find(this.params);
	};


	/**
	 * Saves the model record to the database
	 */
	NWTModel.prototype.save = function(data) {
		this.dirty = true;
		this._getClient().save(data);
	};


	/**
	 * Iterates through each record and calls the callback
	 * If we have not fetched the data, do so
	 */
	NWTModel.prototype.each = function(callback) {
		this._update();

		var returnData = [];
		for( var i = 0, record; record = this._data[i] ; i++) {
			returnData.push(callback(record));
		}

		return new NWTModelRender(returnData.join(''), this);
	};

	root.NWTModel = NWTModel;

}(this));
