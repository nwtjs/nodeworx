var vows = require("vows"),
	assert = require("assert"),
	nwt = require('./NWTTestBase.js'),
	validation = global.nwt.validation;


vows.describe('Validation').addBatch({
	'NWTValidation::VALID_EMAIL': {
		'with wrong email': {
			topic: 'asdfbbq',

            'test validates': function (topic) {
				var validates = validation.validate('VALID_EMAIL', topic);
                assert.isFalse(validates);
            }
        },
		'with correct email': {
			topic: 'asdfbbq@fake.com',

            'test validates': function (topic) {
				var validates = validation.validate('VALID_EMAIL', topic);
                assert.isTrue(validates);
            }
        }
    }
}).addBatch({
	'NWTValidation::MIN_LENGTH': {
		'with digits': {
			topic: 'bbqbbq',

            'too short': function (topic) {
				var validates = validation.validate('MIN_LENGTH', topic, 10);
                assert.isFalse(validates);
            },

            'long enough': function (topic) {
				var validates = validation.validate('MIN_LENGTH', topic, 5);
                assert.isTrue(validates);
            }
        }
    }
}).addBatch({
	'NWTValidation::MAX_LENGTH': {
		'with digits': {
			topic: 'bbqbbq',

            'too long': function (topic) {
				var validates = validation.validate('MAX_LENGTH', topic, 5);
                assert.isFalse(validates);
            },

            'short enough': function (topic) {
				var validates = validation.validate('MAX_LENGTH', topic, 10);
                assert.isTrue(validates);
            }
        }
    }
}).addBatch({
	'NWTValidation::ALPHA | ALPHA_NUMERIC | NUMERIC': {
		'with string': {
			topic: 'bbqbbq',

            'Test alpha': function (topic) {
				var validates = validation.validate('ALPHA', topic);
                assert.isTrue(validates);
            },

            'Test alpha numeric': function (topic) {
				var validates = validation.validate('ALPHA_NUMERIC', topic);
                assert.isTrue(validates);
            },

            'Test numeric': function (topic) {
				var validates = validation.validate('NUMERIC', topic);
                assert.isFalse(validates);
            }
        },
		'with integer': {
			topic: 10,

            'Test alpha': function (topic) {
				var validates = validation.validate('ALPHA', topic);
                assert.isFalse(validates);
            },

            'Test alpha numeric': function (topic) {
				var validates = validation.validate('ALPHA_NUMERIC', topic);
                assert.isTrue(validates);
            },

            'Test numeric': function (topic) {
				var validates = validation.validate('NUMERIC', topic);
                assert.isTrue(validates);
            }
        },
		'with mixed': {
			topic: 'asdfbbq123456',

            'Test alpha': function (topic) {
				var validates = validation.validate('ALPHA', topic);
                assert.isFalse(validates);
            },

            'Test alpha numeric': function (topic) {
				var validates = validation.validate('ALPHA_NUMERIC', topic);
                assert.isTrue(validates);
            },

            'Test numeric': function (topic) {
				var validates = validation.validate('NUMERIC', topic);
                assert.isFalse(validates);
            }
        },
		'with symbols': {
			topic: 'asdf!@#$%^ ',

            'Test alpha': function (topic) {
				var validates = validation.validate('ALPHA', topic);
                assert.isFalse(validates);
            },

            'Test alpha numeric': function (topic) {
				var validates = validation.validate('ALPHA_NUMERIC', topic);
                assert.isFalse(validates);
            },

            'Test numeric': function (topic) {
				var validates = validation.validate('NUMERIC', topic);
                assert.isFalse(validates);
            }
        }
    }
}).addBatch({
	'NWTValidation::VALID_URL': {
		'with invalid url': {
			topic: 'asdf.bbq',

            'test validates': function (topic) {
				var validates = validation.validate('URL', topic);
                assert.isFalse(validates);
            }
        },
		'require full http path': {
			topic: 'www.asdf.bbq',

            'test validates': function (topic) {
				var validates = validation.validate('URL', topic);
                assert.isFalse(validates);
            }
        },
		'with valid url': {
			topic: 'http://www.aol.com',

            'test validates': function (topic) {
				var validates = validation.validate('URL', topic);
                assert.isTrue(validates);
            }
        }
    }
}).export(module);