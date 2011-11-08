var vows = require("vows"),
	assert = require("assert"),
	nwt = require('./NWTTestBase.js');

var htmlHelper = global.nwt.load().helper('Html');

vows.describe('HtmlHelper').addBatch({
	'HtmlHelper::link': {
		'With some content': {
			topic: htmlHelper.link('Content', '#'),

            'Proper markup': function (topic) {
                assert.equal(topic + '', '<a href="#">Content</a>');
            }
        },
        'with a class': {
			topic: htmlHelper.link('Content', '#', {class: 'awesome'}),

            'has a class of "awesome"': function (topic) {
                assert.equal(topic + '', '<a href="#" class="awesome">Content</a>');
            }
        }
    }
}).addBatch({
	'HtmlHelper::image': {
		'With src': {
			topic: htmlHelper.image('/'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<img src="/">');
            }
        },
        'with width/height settings': {
			topic: htmlHelper.image('/', {height:20, width:20}),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<img src="/" height="20" width="20">');
            }
        }
    }
}).addBatch({
	'HtmlHelper::list': {
		'with no items': {
			topic: htmlHelper.list(),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<ul></ul>');
            }
        },
		'with several items': {
			topic: htmlHelper.list('Item 1', 'Item 2'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<ul><li>Item 1</li><li>Item 2</li></ul>');
            }
        }
    }
}).addBatch({
	'HtmlHelper Standard Elements': {
		'h1': {
			topic: htmlHelper.h1('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<h1>Content</h1>');
            }
        },
		'h2': {
			topic: htmlHelper.h2('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<h2>Content</h2>');
            }
        },
		'h3': {
			topic: htmlHelper.h3('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<h3>Content</h3>');
            }
        },
		'h4': {
			topic: htmlHelper.h4('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<h4>Content</h4>');
            }
        },
		'h5': {
			topic: htmlHelper.h5('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<h5>Content</h5>');
            }
        },
		'h6': {
			topic: htmlHelper.h6('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<h6>Content</h6>');
            }
        },
		'p': {
			topic: htmlHelper.p('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<p>Content</p>');
            }
        },
		'blockquote': {
			topic: htmlHelper.blockquote('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<blockquote>Content</blockquote>');
            }
        },
		'code': {
			topic: htmlHelper.code('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<code>Content</code>');
            }
        },
		'em': {
			topic: htmlHelper.em('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<em>Content</em>');
            }
        },
		'div': {
			topic: htmlHelper.div('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<div>Content</div>');
            }
        },
		'pre': {
			topic: htmlHelper.pre('Content'),

            'proper markup': function (topic) {
                assert.equal(topic + '', '<pre>Content</pre>');
            }
        }
    }
}).export(module);