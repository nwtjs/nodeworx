/**
 * Individually wrapped NWTNode
 * @constructor
 */
function NWTNodeInstance(node) {
	this._node = node;
}


/**
 * Returns the ancestor that matches the css selector
 * Implements Sizzle.matches
 * @param string CSS Selector
 */
NWTNodeInstance.prototype.ancestor = function(selector) {

	var testNode = this._node,
		ancestor = null;

	while( true ) {

		var ancestor = Sizzle.matches(selector, [testNode]);
		if( ancestor.length > 0 ) { break; }

		var parentNode = testNode.parentNode;

		if( !parentNode ) { break; }
		testNode = parentNode;
	}

	if( ancestor[0] ) {
		return new NWTNodeInstance(ancestor[0]);
	} else {
		return null;
	}
};


/**
 * Gets an attribute from the node
 * @param string Attribute to get
 */
NWTNodeInstance.prototype.get = function(property) {
	return this._node[property];
};


/**
 * Adds an event listener tot he node
 * @param string Event to listen for
 * @param function Event callback function
 */
NWTNodeInstance.prototype.on = function(event, callback) {
	this._node.addEventListener(event, function(e) {
		callback(new NWTEventWrapper(e));
	}, false);
};



/**
 * Sets the content of the node
 * @param string Content to set
 */
NWTNodeInstance.prototype.setContent = function(content) {
	this._node.innerHTML = content;
};


/**
 * Returns a child node instance based on a selector
 * Implements Sizzle
 * @param string CSS Selector
 */
NWTNodeInstance.prototype.one = function(selector) {
	var node = Sizzle(selector, this._node);
	return new NWTNodeInstance(node[0]);
};


/**
 * Returns a child nodelist based on a selector
 * Implements Sizzle
 * @param string CSS Selector
 */
NWTNodeInstance.prototype.all = function(selector) {
	var nodelist = Sizzle(selector, this._node);
	return new NWTNodeList(nodelist);
};


/**
 * A node iterator
 * @constructor
 */
function NWTNodeList() {
	
}


/**
 * Node iterator
 * @param function Callback for each node
 */
NWTNodeList.prototype.each = function(callback) {
	for( var i = 0 , node ; node = this.nodes[i] ; i++ ) {
		callback(node);
	}
};


/**
 * NWTNode Class
 * Used for getting elements
 * @constructor
 */
function NWTNode() {
	
}


/**
 * Returns a NWTNodeInstance class
 * @constructor
 */
NWTNode.prototype.one = function(selector) {
	if( typeof selector == 'string' ) {
		var node = Sizzle(selector);
		return new NWTNodeInstance(node[0]);
	} else {
		return new NWTNodeInstance(selector);
	}
};


/**
 * Returns a NWTNodeList class
 * @constructor
 */
NWTNode.prototype.all = function(selector) {
	var nodelist = Sizzle(selector);
	return new NWTNodeList(nodelist);
};


nwt.node = new NWTNode();
nwt.one = nwt.node.one;
nwt.all = nwt.node.all;