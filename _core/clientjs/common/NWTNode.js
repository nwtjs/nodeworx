/**
 * Individually wrapped NWTNode
 * @constructor
 */
function NWTNodeInstance(node) {
	this._node = node;
}


NWTNodeInstance.prototype.setContent = function(content) {
	this._node.innerHTML = content;
};

NWTNodeInstance.prototype.on = function(event, callback) {
	this._node.addEventListener(event, callback, false);
};


NWTNodeInstance.prototype.one = function(selector) {};
NWTNodeInstance.prototype.all = function(selector) {};

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
	var node = Sizzle(selector);
	return new NWTNodeInstance(node[0]);
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