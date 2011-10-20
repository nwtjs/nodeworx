function NWTDrag() {

	// Flag whether or not we are currently dragging an element
	this.inDrag = false;

	// The drag shim renders to the body and follows the mouse around
	this.shim = null;

	// References the current drag target
	this.currentDragTarget = null;

	// Keep track of the last position so we can tell if we are going left or right
	this.lastPosition = [0, 0];

	this.mousedown = false;

	nwt.one('body').on('mousedown', function(e) {
		nwt.drag.mousedown = true;
	});

	nwt.one('body').on('mousemove', function(e) {
                if( e.target.ancestor('.nwt_draggable') && !nwt.drag.inDrag && nwt.drag.mousedown ) {
                        nwt.drag.inDrag = true;

                        if( e.target.ancestor('li')  ) {
                                nwt.drag.currentDragTarget = e.target.ancestor('li');
                        } else {
                                nwt.drag.currentDragTarget = e.target;
                        }

                        // Might need to perform some setup
                        nwt.drag.currentDragTarget.ancestor('.nwt_draggable').setStyle('position', 'relative');
                        nwt.drag.currentDragTarget.setStyle('visibility', 'hidden');

                        // Create a shim that follows you around
                        nwt.drag.shim = nwt.node.create('<div style="border:1px solid #ccc; opacity:0.5;">' + nwt.drag.currentDragTarget.getContent()  + '</div>');
                        nwt.drag.shim.setStyle('position', 'absolute');
                        nwt.one('body').append(nwt.drag.shim);

                        nwt.drag.drag(e);

                        e.stop();
                }

		if( nwt.drag.inDrag ) {
			nwt.drag.drag(e);
			e.stop();
		}
	});

	nwt.one('body').on('mouseup', function(e) {
		nwt.drag.mousedown = false;
		if( nwt.drag.inDrag ) {
			nwt.drag.stopDrag(e);
		}
	});
}


/**
 * Callback during a drag action
 */
NWTDrag.prototype.drag = function(e) {

	var shimMargin = 5;

	nwt.drag.shim.setStyle('top', e._event.clientY + shimMargin + 'px');
	nwt.drag.shim.setStyle('left', e._event.clientX + shimMargin + 'px');

	// Check for elements that we are over and reposition as needed
	var dragOver = null;
	if( e.target.ancestor('li') ) {
		dragOver = e.target.ancestor('li');
	} else if( e.target._node.nodeName == 'li' ) {
		dragOver = e.target;
	}
	
	if( !dragOver || !dragOver.ancestor('ul').hasClass('nwt_draggable') ) { return; }

	// The position of insert depends on whether or not we were going up or down
	var position = ( nwt.drag.lastPosition[1] < e._event.clientY ? 'after' : 'before'  );
	nwt.drag.lastPosition = [e._event.clientX, e._event.clientY];

	// Now insert the node into the proper place
	dragOver.insert(nwt.drag.currentDragTarget, position);
};


/**
 * Callback when a drag is finished
 */
NWTDrag.prototype.stopDrag = function(e) {
	nwt.drag.inDrag = false;

	nwt.drag.shim.remove();
	nwt.drag.currentDragTarget.setStyle('visibility', 'visibile');

	nwt.event.fire('NWTDrag:reorder');
};

nwt.drag = new NWTDrag();
