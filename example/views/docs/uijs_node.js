{
	pageTitle: 'Node',

	content: Html.h2('NWT Node Client JS') +
		Html.p('Provides node wrappers and quick and easy methods to traverse the dom.') +
		Html.p('A <strong>NodeList</strong> is a collection of wrapped dom nodes. A <strong>Node</strong> is a singaly wrapped DOM node.') +

		Docs.example(
			"nwt.one",
			"Returns a single node instance based on selector.",
			"nwt.node.one('.selector');"
		) +

		Docs.example(
			"nwt.all",
			"Returns a node collection based on selector.",
			"nwt.node.all('.selector');"
		) +

		Docs.example(
			"NWTNode::addClass",
			"Adds a class to the node.",
			"mynode.addClass('class');"
		) +

		Docs.example(
			"NWTNode::all",
			"Find a nodelist based on a selector.",
			"mynode.all('.selector');"
		) +

		Docs.example(
			"NWTNode::ancestor",
			"Returns the ancestor of the node which matches the CSS selector.",
			"mynode.ancestor('.class');"
		) +

		Docs.example(
			"NWTNode::append",
			"Appends a node to the current node.",
			"mynode.append(newNode);"
		) +

		Docs.example(
			"NWTNode::data",
			"Returns a data- attribute form the node.",
			"mynode.data('somekey');"
		) +

		Docs.example(
			"NWTNode::get",
			"Gets a property from the node. Can also be used to retrieve the parentNode.",
			"mynode.get('href');"
		) +

		Docs.example(
			"NWTNode::getContent",
			"Gets the innerHTML of a node.",
			"mynode.getContent();"
		) +

		Docs.example(
			"NWTNode::getStyle",
			"Gets a style from the node.",
			"mynode.getStyle('opacity');"
		) +

		Docs.example(
			"NWTNode::hasClass",
			"Returns whether or not the node has a class.",
			"mynode.hasClass('class');"
		) +

		Docs.example(
			"NWTNode::insert",
			"Inserts a node at a provided location (before or after).",
			"mynode.insert(newNode, 'before');"
		) +

		Docs.example(
			"NWTNode::next",
			"Returns the next node.",
			"mynode.next();"
		) +

		Docs.example(
			"NWTNode::on",
			"Implements an event listener on the node. The callback receives an NWTEventWrapper.",
			"mynode.on('click', callback);"
		) +

		Docs.example(
			"NWTNode::one",
			"Find a single child node based on a selector.",
			"mynode.one('.selector');"
		) +

		Docs.example(
			"NWTNode::previous",
			"Returns the previous node.",
			"mynode.previous();"
		) +

		Docs.example(
			"NWTNode::remove",
			"Removes the node.",
			"mynode.remove();"
		) +

		Docs.example(
			"NWTNode::removeClass",
			"Removes a class from the node.",
			"mynode.removeClass('class');"
		) +

		Docs.example(
			"NWTNode::serialize",
			"Serializes form elements inside of a node into a querystring.",
			"mynode.serialize();"
		) +

		Docs.example(
			"NWTNode::set",
			"Sets an attribute.",
			"mynode.set('href', '#');"
		) +

		Docs.example(
			"NWTNode::setContent",
			"Sets the innerHTML of a node.",
			"mynode.setContent('Some content');"
		) +

		Docs.example(
			"NWTNode::setStyle",
			"Sets a style.",
			"mynode.setStyle('opacity', '0.50');"
		) 		
}