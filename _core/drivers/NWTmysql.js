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

NWTmysql.prototype.find = function(params) {

	var buildQuery =[];

	buildQuery.push('SELECT * FROM ');

	buildQuery.push(this.model.tableName);

	buildQuery = buildQuery.join('');

	console.log('Querying with: ', buildQuery);

	var result = this.client.querySync(buildQuery + ";");

	var returnData = result.fetchAllSync();

	console.log('Got data ', returnData);

	return returnData;
};

exports.client = NWTmysql;