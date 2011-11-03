var vows = require("vows"),
	assert = require("assert"),
	nwt = require('./../libraries/nwt.js');

var NWTLayout = global.nwt.load().library('NWTLayout');

// We need to create a mock context object because NWTLayout loads the view from a site root
global.context = function() {
	// Create a mock application in the tests directory
	return {siteRoot : __dirname + '/resources'};
};

vows.describe('NWTLayout').addBatch({
	'NWTLayout | View Loading': {
		'only content': {
			topic: NWTLayout,

            'From view file': function (layout) {
				layout._loadView(['unit_tests', 'hello'], {layout: 'none'});
                assert.equal(layout + '', 'Hello');
            },

            'From view content': function (layout) {
				layout._loadFromContent('{content: "Hello"}', {layout: 'none'})
                assert.equal(layout + '', 'Hello');
            }
        }
    }
}).addBatch({
	'NWTLayout | Partials': {
		'only content': {
			topic: NWTLayout,

            'Partial rendering': function (layout) {
				layout._loadView(['unit_tests', 'partial'], {layout: 'none'});
                assert.equal(layout + '', 'Hello');
            }
        }
    }
}).addBatch({
	'NWTLayout | Autoloading of libraries': {
		'only content': {
			topic: NWTLayout,

            'Html helper': function (layout) {
				layout._loadView(['unit_tests', 'html_helper'], {layout: 'none'});
                assert.equal(layout + '', '<div>hi2u</div>');
            }
        }
    }
}).addBatch({
	'NWTLayout | Template hooks': {
		'only content': {
			topic: NWTLayout,

            'Page title': function (layout) {
				layout._loadFromContent('{pageTitle: "Hello", content: "Byebye"}', {layout: 'none'})
                assert.equal(layout.definition.pageTitle, 'Hello');
            },

            'CSS Loading': function (layout) {
				layout._loadFromContent('{css: ["hello.css"], content: "Byebye"}', {layout: 'none'})
                assert.equal(layout._stylesheets(), '<link rel="stylesheet" type="text/css" href="/hello.css">');
            },

            'JS Loading': function (layout) {
				layout._loadFromContent('{js: ["/test.js"], content: "script"}', {layout: 'none'})
                assert.equal(layout.definition.js.length, 1);
                assert.equal(layout.definition.js[0], '/test.js');
            }
        }
    }
}).export(module);