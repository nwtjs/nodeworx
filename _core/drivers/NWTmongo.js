/**
 * NWT mongo driver
 * @constructor
 */
function NWTmongo(config, model) {
	this.model = model;

	var Db = require('mongodb').Db,
		Server = require('mongodb').Server;

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

	return this;
}

NWTmongo.prototype.save = function(data) {

	if( data.id === undefined ) {

		data._id = data.id;
		delete data.id;
	}

	global.context().fiber.waitFor(this, 'dataClient');

	var returnObj = {};

	this.dataClient.insert(data, function(error, docs){
		returnObj.docs = docs;
		returnObj.error = error;
	});
	
	global.context().fiber.waitFor(returnObj, 'docs');

	if( returnObj.docs ) {
		this.model.lastInsertId = returnObj.docs[0]._id;
	}
};

NWTmongo.prototype.find = function(params) {
	console.log('Got find request');

	global.context().fiber.waitFor(this, 'dataClient');

	var returnObj = {};

	var findParams = {};

	var mongoCursor = this.dataClient.find(findParams);

	if( params.order ) {
		for( var i in params.order ) {
			mongoCursor.sort([i, params.order[i]]);
		}
	}

	if( params.limit ) {
		mongoCursor.limit(params.limit);
	}

	mongoCursor.toArray(function(error, results) {
		returnObj.error = error;
		returnObj.results = results;
	});

	global.context().fiber.waitFor(returnObj, 'results');

	return returnObj.results;
};

exports.client = NWTmongo;
