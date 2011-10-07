(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false);

	/**
	 * The TableHelper class
	 * Tables can be auto-rendered with the toString method
	 * Or you can call Table.noRender() to turn rendering off
	 * To render the table call the Table.flush() method
	 * @constructor
	 */
	function TableHelper() {
		this._headers = [];
		this._cells = [];

		this._autoRender = true;

		TableHelper._super.call(this);
	}
	global.nwt.extend(TableHelper, nwtHelperInstance);


	/**
	 * Normally the TableHelper is rendered with the toString method
	 * This is fine for most cases, but sometimes you may break up calls
	 * for whatever reason. In this case you may want to render the table manually
	 * To render the table manually, you can call Table.flush()
	 * E.g., Table.noRender().cells(...).flush()
	 */
	TableHelper.prototype.noRender = function() {
		this._autoRender = false;
		return this;
	};


	/**
	 * Table rendering logic
	 * @param bool Pass true if you do not want to reset helper data
	 */
	TableHelper.prototype.flush = function(doNotReset) {

		var content = [this.open()];

		content.push('<tr>');
		for( var i = 0, header; header = this._headers[i] ; i++ ) {
			content.push('<th>' + header + '</th>');
		}
		content.push('</tr>');

		for( var j = 0, cellCollection; cellCollection = this._cells[j] ; j++ ) {
			content.push('<tr>');
				for( var k = 0, numCells = cellCollection.length; k < numCells ; k++ ) {
					content.push('<td>' + cellCollection[k] + '</td>');
				}
			content.push('</tr>');
		}

		if( !doNotReset ) {
			this._headers = [];
			this._cells = [];
		}

		return content.join('');
	};


	/**
	 * Passthrough method to render the table if autoRender is set to true
	 */
	TableHelper.prototype.render = function() {
		if( !this._autoRender ) { return ''; }
		return this.flush();
	};


	/**
	 * Opens the table
	 * Returns an opening table tag
	 */
	TableHelper.prototype.open = function() {
		return '<table>';
	};


	/**
	 * Closes the table
	 * Returns a closing table tag
	 */
	TableHelper.prototype.close = function() {
		return '</table>';
	};


	/**
	 * Implements table cells
	 * This is generally called once per row
	 * @param string, ... Each argument is a table cell
	 */
	TableHelper.prototype.cells = function() {
		var cellRow = [];
		for( var i = 0, argLen = arguments.length ; i < argLen ; i++ ) {
			//var thisCell = arguments[i] || '';
			cellRow.push(arguments[i]);
		}
		this._cells.push(cellRow);
		return this;
	};


	/**
	 * Implements table headers
	 * @param string, ... Each argument is a table header
	 */
	TableHelper.prototype.headers = function() {
		for( var i = 0, argLen = arguments.length ; i < argLen ; i++ ) {
			this._headers.push(arguments[i]);
		}
		return this;
	};


	/**
	 * Implements cells for an object which has an iteratable interface defined
	 * Checks for object.iterator
	 * @param object Object to iterate on
	 * @param function Callback method
	 */
	TableHelper.prototype.rowIterator = function(object, callback) {

		var mythis = this,

		// Wrap the callback in a function
		// The callback expects an array return, so implement cells based on that
		wrappedCallback = function(){
			var results = callback.apply(mythis, arguments);
			mythis.cells.apply(mythis, results);
		};

		object.iterator(wrappedCallback, this);
		return this;
	};


	root.TableHelper = TableHelper;


}(this));
