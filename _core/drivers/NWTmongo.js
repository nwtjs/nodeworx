/**
 * NWT mongo driver
 * @constructor
 */
function NWTmongo(config, model) {
	this.model = model;

	var Db = require(__dirname + '/../external/node-mongodb-native/lib/mongodb').Db,
		Server = require(__dirname + '/../external/node-mongodb-native/lib/mongodb').Server;

	this.client = new Db(
		config.database,
		new Server(config.host, config.port, {})
	);
	//config.username, config.password

	var mythis = this;

	this.client.open(function(err, p_client) {

		var useCollection = function(err, collection) {
			mythis.dataClient = collection;
		}

		if( err ) {
			console.log('Error connecting to mongo', err, p_client);
			return;
		}

		p_client.collection(mythis.model.tableName, useCollection);
	});

/*
	var modelSchema = new Schema(this.model.fields);

	var clientModel = mongoose.model(this.model.tableName, modelSchema);
	this.client = new clientModel();
*/
	return this;
}

NWTmongo.prototype.save = function(data) {

	if( data.id === undefined ) {

		data._id = data.id;
		delete data.id;
	}

	global.nwt.waitForAvailable(this, 'dataClient');

	this.dataClient.insert(data, function(err, docs){
		console.log('data inserted');
	});
	
	if( result ) {
		this.model.lastInsertId = this.client.lastInsertIdSync();
	}
};

NWTmongo.prototype.find = function(params) {

	global.nwt.waitForAvailable(this, 'dataClient');

	this.dataClient.find().toArray(function(err, results) {
		// docs.forEach
		console.log('Got documents', results);
	});


	return {};
};

exports.client = NWTmongo;