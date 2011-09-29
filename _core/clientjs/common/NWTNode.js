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
 * Gets a data attribute from the node
 * Pass just whatever comes after data-
 * If the attribute were data-user-id,
 * you should pass 'user-id' to this function
 * @param string Data attribute to get
 */
NWTNodeInstance.prototype.data = function(property) {
	return this._node.getAttribute('data-' + property);
};


/**
 * Gets an attribute from the node
 * @param string Attribute to get
 */
NWTNodeInstance.prototype.get = function(property) {
	return this._node[property];
};


/**
 * Sets an attribute on the node
 * @param string Attribute to set
 * @param string Value to set
 */
NWTNodeInstance.prototype.set = function(property, value) {
	this._node[property] = value;
	return this;
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
 * Serializes sub children of the current node into post data
 */
NWTNodeInstance.prototype.serialize = function() {

    var retVal = '',

    // Getting ALL elements inside of form element
    els = this._node.getElementsByTagName('*');

    // Looping through all elements inside of form and checking to see if they're "form elements"
    for( var i = 0, el; el = els[i]; i++ ) {
      if( !el.disabled && el.name && el.name.length > 0 ) {
        switch(el.tagName.toLowerCase()) {
          case 'input':
            switch( el.type ) {
              // Note we SKIP Buttons and Submits since there are no reasons as to why we 
              // should submit those anyway
              case 'checkbox':
              case 'radio':
                if( el.checked ) {
                  if( retVal.length > 0 ) {
                    retVal  = '&';
                  }
                  retVal  = el.name + '=' + encodeURIComponent(el.value);
                }
                break;
              case 'hidden':
              case 'password':
              case 'text':
                if( retVal.length > 0 ) {
                  retVal  = '&';
                }
                retVal  = el.name + '=' + encodeURIComponent(el.value);
                break;
            }
            break;
          case 'select':
          case 'textarea':
            if( retVal.length > 0 ) {
              retVal  = '&';
            }
            retVal  = el.name  + '=' + encodeURIComponent(el.value);
            break;
        }
      }
    }
    return retVal;
};


/**
 * Gets the content of the node
 */
NWTNodeInstance.prototype.getContent = function(content) {
	return this._node.innerHTML;
};


/**
 * Sets the content of the node
 * @param string Content to set
 */
NWTNodeInstance.prototype.setContent = function(content) {
	this._node.innerHTML = content;

	// Pull out any custom event hooks, and listen for them
	this.all('script.event_hooks').each(function(eventBlock) {
		var event = eval(eventBlock.getContent());
		nwt.event.implement(event);
		eventBlock.remove();
	});
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
 * Removes a node instance from the dom
 */
NWTNodeInstance.prototype.remove = function() {
	this._node.parentNode.removeChild(this._node);
};


/**
 * Simulates a click event on a node
 */
NWTNodeInstance.prototype.click = function() {

	var evt = document.createEvent("HTMLEvents");
	evt.initEvent('click', true, true ); // event type,bubbling,cancelable
	return !this._node.dispatchEvent(evt);
};


/**
 * A node iterator
 * @constructor
 */
function NWTNodeList(nodes) {
	var wrappedNodes = [];

	for( var i = 0, node ; node = nodes[i] ; i++  ) {
		wrappedNodes.push(new NWTNodeInstance(node));
	}  
	this.nodes = wrappedNodes;
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
 * Returns a node specified by an offset
 * @param integer Offset of the item
 */
NWTNodeList.prototype.item = function(offset) {
	return this.nodes[offset];
}


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
		
		if( node.length == 0 ) {
			return null;
		}

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
