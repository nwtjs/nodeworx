/**
 * NWT mysql driver
 * @constructor
 */
function NWTmysql(config, model) {
	this.model = model;
	var mysql = require('mysql');

	this.client = mysql.createClient({
		host: config.host,
		port: config.port,
		user: config.username,
		password: config.password,
	});

	this.client.query('USE '+config.database);

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

	var returnData = {};

	this.client.query(buildQuery.join('') + ";", function(error, results){
		console.log('Got mysql results', results);
		returnData.insertId = results.insertId;
	});

	global.context().fiber.waitFor(returnData, 'insertId');

	if( returnData ) {
		this.model.lastInsertId = returnData.insertId;
	}
};

NWTmysql.prototype.find = function(params) {

	var buildQuery =[];

	buildQuery.push('SELECT * FROM ');

	buildQuery.push(this.model.tableName);

	if( params.where ) {
		buildQuery.push(' WHERE 1=1 ');

		for( var i in params.where ) {
			buildQuery.push(' AND ' + i + ' = ' + params.where[i]);
		}
	}

	if( params.order  ) {
		buildQuery.push(' ORDER BY ');
		for( var i in params.order ) {
			buildQuery.push(i + ' ' + params.order[i]);
		}
	}

	if( params.limit  ) {
		buildQuery.push(' LIMIT ' + params.limit);
		if( params.offset && !isNaN(params.offset) ) {
			buildQuery.push(' OFFSET ' + params.offset);
		}
	}

	buildQuery = buildQuery.join('');

	console.log('Querying with: ', buildQuery);

	var returnData = {};

	this.client.query(buildQuery + ";", function(error, results){
		//console.log('Got mysql results', results);
		returnData.error = error;
		returnData.results = results;
	});

	global.context().fiber.waitFor(returnData, 'results');

	//console.log('Got data ', returnData);

	return returnData.results;
};

exports.client = NWTmysql;
