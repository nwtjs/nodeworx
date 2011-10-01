/**
 * NWT mysql driver
 * @constructor
 */
function NWTmysql(config, model) {
	this.model = model;
	var mysql = require(__dirname + '/../external/node-mysql-libmysqlclient/mysql-libmysqlclient.js');

	this.client = mysql.createConnectionSync();
	this.client.connectSync(config.host, config.username, config.password, config.database);

	return this;
}

NWTmysql.prototype.save = function(data) {

	var buildQuery =[],
		keys = [],
		values = [];

	if( data.id === undefined ) {
		
		for( var i in data ) {
			keys.push(i);
			values.push("'" + data[i].replace("'", "\'") + "'");
		}
		
		buildQuery.push('INSERT INTO ');
		buildQuery.push(this.model.tableName);
		buildQuery.push(' (' + keys.join(', ') + ') VALUES (');
			buildQuery.push(values.join(', '));
		buildQuery.push(')');
	} else {
		buildQuery.push('UPDATE ');
		buildQuery.push(this.model.tableName);
		buildQuery.push(' SET ');

		var updateStatements = [];
		for( var i in data ) {
			updateStatements.push(i + " = '" + data[i].replace("'", "\'") + "'");
		}
		buildQuery.push(updateStatements.join(','));

		buildQuery.push(' WHERE id = ' + data.id);
	}

	try {
		var result = this.client.querySync(buildQuery.join('') + ";")
	} catch(e) {
		console.log('Query failed ', buildQuery.join(''));
	}

	if( result ) {
		this.model.lastInsertId = this.client.lastInsertIdSync();
	}
};

NWTmysql.prototype.find = function(params) {

	var buildQuery =[];

	buildQuery.push('SELECT * FROM ');

	buildQuery.push(this.model.tableName);

	if( params.limit  ) {
		buildQuery.push(' LIMIT ' + params.limit);
		if( params.offset && !isNaN(params.offset) ) {
			buildQuery.push(' OFFSET ' + params.offset);
		}
	}

	buildQuery = buildQuery.join('');

	console.log('Querying with: ', buildQuery);

	var result = this.client.querySync(buildQuery + ";");

	var returnData = result.fetchAllSync();

	console.log('Got data ', returnData);

	return returnData;
};

exports.client = NWTmysql;
