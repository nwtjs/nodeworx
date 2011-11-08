var vows = require("vows"),
	assert = require("assert"),
	nwt = require('./NWTTestBase.js');

var numberHelper = global.nwt.load().helper('Number');

vows.describe('numberHelper').addBatch({
	'NumberHelper::format': {
		'with no elements': {
			topic: numberHelper,

            'Format whole': function (helper) {
                assert.equal(helper.format(100), 100);
            },

            'Format thousands': function (helper) {
                assert.equal(helper.format(1000), '1,000');
            },

            'Format decimals': function (helper) {
                assert.equal(helper.format(100.123), '100.12');
            },

            'Format thousands and decimals': function (helper) {
                assert.equal(helper.format(1000.999), '1,000.99');
            },

            'Custom format': function (helper) {
                assert.equal(helper.format(123456.987, 1, "|", ">"), '123>456|9');
            }
        }
    }
}).export(module);