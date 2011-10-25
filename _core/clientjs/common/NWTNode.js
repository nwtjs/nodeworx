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
 * Returns true if the class exists on the node, false if not
 */
NWTNodeInstance.prototype.hasClass = function(className) {
	return (this._node.className && this._node.className.indexOf(className) !== -1);
};


/**
 * Adds a class to the node
 */
NWTNodeInstance.prototype.addClass = function(className) {
	if( !this.hasClass(className)  ) {
		this._node.className = this._node.className +  ' ' + className;
	}
};


/**
 * Removes a class from the node.
 */
NWTNodeInstance.prototype.removeClass = function(className) {
	this._node.className = this._node.className.replace(className, '');
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

	if( property === 'parentNode' ) {
		var node = this._node[property];
		if( !node ) { return null; }
		return new NWTNodeInstance(node);
	}

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
 * Gets a style attribute set on the node
 * @param string Style attribute to get
 */
NWTNodeInstance.prototype.getStyle = function(property) {

	if( !this._node.getAttribute('style') ) {
		return '';
	}

	var matchedStyle = this._node.getAttribute('style').match(new RegExp(property + ':([a-zA-Z0-9\-]*);'), '');

	if( matchedStyle && matchedStyle[1] ) {
		return matchedStyle[1];
	} else {
		return null;
	}
};


/**
 * Sets a style attribute
 * @param string Style attribute to set
 * @param string Value to set
 */
NWTNodeInstance.prototype.setStyle = function(property, value) {

	if( !this._node.getAttribute('style') ) {
		this._node.setAttribute('style', '');
	}

	var newStyle = this._node.getAttribute('style').replace(new RegExp(property + ':[a-zA-Z0-9\-]*;'), '');

	newStyle += property + ':' + value + ';';

	this._node.setAttribute('style', newStyle);
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
                    retVal += '&';
                  }
                  retVal += el.name + '=' + encodeURIComponent(el.value);
                }
                break;
              case 'hidden':
              case 'password':
              case 'text':
                if( retVal.length > 0 ) {
                  retVal  += '&';
                }
                retVal += el.name + '=' + encodeURIComponent(el.value);
                break;
            }
            break;
          case 'select':
          case 'textarea':
            if( retVal.length > 0 ) {
              retVal  += '&';
            }
            retVal += el.name  + '=' + encodeURIComponent(el.value);
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
 * Returns the next node
 */
NWTNodeInstance.prototype.next = function() {
	var node = this._node.nextSibling;
	return new NWTNodeInstance(node);
};


/**
 * Returns the previous node
 */
NWTNodeInstance.prototype.previous = function() {
	var node = this._node.previousSibling;
	return new NWTNodeInstance(node);
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
 * Appends a node instance to this node
 */
NWTNodeInstance.prototype.append = function(node) {

	if( node instanceof NWTNodeInstance ) {
		node = node._node;
	}

	this._node.appendChild(node);
};


/**
 * Removes a node instance from the dom
 */
NWTNodeInstance.prototype.remove = function() {
	this._node.parentNode.removeChild(this._node);
};


/**
 * Inserts a given node into this node at the proper position
 */
NWTNodeInstance.prototype.insert = function(node, position) {
	position = position || 'before';

	if( position == 'before'  ) {
		this._node.parentNode.insertBefore(node._node, this._node);
	} else if ( position == 'after' ) {
		this._node.parentNode.insertBefore(node._node, this.next()._node);
	}
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

	var iteratedFunctions = [
		'remove', 'addClass', 'removeClass'
	],

	mythis = this;

	function getIteratedCallback(method) {
		return function() {
			console.log(method, 'called', mythis.nodes);
			for( var j = 0 , node ; node = mythis.nodes[j] ; j++ ) {
				node[method].apply(node, arguments);
			}
		};		
	};

	for( var i = 0, func; func = iteratedFunctions[i] ; i++ ) {
		this[func] = getIteratedCallback(func);
	}
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
 * Returns the size of the current nodelist
 * @return integer
 */
NWTNodeList.prototype.size = function() {
	return this.nodes.length;
}


/**
 * NWTNode Class
 * Used for getting elements
 * @constructor
 */
function NWTNode() {
	
}


/**
 * Creates a node from markup
 * @param string Node markup
 */
NWTNode.prototype.create = function(markup) {

	var container = document.createElement('div');
	container.innerHTML = markup;

	return new NWTNodeInstance(container.childNodes[0]);
};


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
