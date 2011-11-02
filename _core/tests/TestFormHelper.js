var vows = require("vows"),
	assert = require("assert"),
	nwt = require('./../libraries/nwt.js');

var formHelper = global.nwt.load().helper('Form');

// Make a context stub
// TODO: Rip this out into a test utility
global.context = function() {
	return {clientScripts : []};
};

vows.describe('FormHelper').addBatch({
	'FormHelper::generate': {
		'with no elements': {
			topic: formHelper,

            'Proper markup': function (helper) {
                assert.equal(helper.generate().render(), '<form method="POST" action="#"></form>');
            }
        },
		'with elements': {
			topic: formHelper,

            'Proper markup': function (helper) {
				var markup = helper.generate(
					formHelper.field('Test.field', {type: 'text'})
				);
                assert.equal(markup.render(), '<form method="POST" action="#"><div class="row text"><label for="TestField">Test.field</label><input type="text" value="" id="TestField" name="Test[field]"></div></form>');
            }
        }
    }
}).addBatch({
	'FormHelper::field': {
		'Test generic form fields': {
			topic: formHelper,

            'Default text input': function (helper) {
				var markup = helper.field('Key.value');
                assert.equal(markup.render(), '<div class="row text"><label for="KeyValue">Key.value</label><input type="text" value="" id="KeyValue" name="Key[value]"></div>');
            },

            'Text input': function (helper) {
				var markup = helper.field('Key.value', {type: 'text'});
                assert.equal(markup.render(), '<div class="row text"><label for="KeyValue">Key.value</label><input type="text" value="" id="KeyValue" name="Key[value]"></div>');
            },

            'Textarea': function (helper) {
				var markup = helper.field('Key.value', {type: 'textarea'});
                assert.equal(markup.render(), '<div class="row textarea"><label for="KeyValue">Key.value</label><textarea type="textarea" id="KeyValue" name="Key[value]"></textarea></div>');
            },

            'Select (no options)': function (helper) {
				var markup = helper.field('Key.value', {type: 'select'});
                assert.equal(markup.render(), '<div class="row select"><label for="KeyValue">Key.value</label><select type="select" id="KeyValue" name="Key[value]"></select></div>');
            },

            'Select (with options)': function (helper) {
				var markup = helper.field('Key.value', {type: 'select', options: {0: '1', 1: '2'}});
                assert.equal(markup.render(), '<div class="row select"><label for="KeyValue">Key.value</label><select type="select" id="KeyValue" name="Key[value]"><option value="0" selected>1</option><option value="1">2</option></select></div>');
            },

            'Multiselect': function (helper) {
				var markup = helper.field('Key.value', {type: 'select', multiple: true});
                assert.equal(markup.render(), '<div class="row select"><label for="KeyValue">Key.value</label><select type="select" multiple="true" id="KeyValue" name="Key[value]"></select></div>');
            },

            'Checkbox (unchecked)': function (helper) {
				var markup = helper.field('Key.value', {type: 'checkbox'});
                assert.equal(markup.render(), '<div class="row checkbox"><label for="KeyValue">Key.value</label><input type="checkbox" value="" id="KeyValue" name="Key[value]"></div>');
            },

            'Checkbox (checked)': function (helper) {
				var markup = helper.field('Key.value', {type: 'checkbox', checked: true});
                assert.equal(markup.render(), '<div class="row checkbox"><label for="KeyValue">Key.value</label><input type="checkbox" value="" checked="true" id="KeyValue" name="Key[value]"></div>');
            },

            'Radio': function (helper) {
				var markup = helper.field('Key.value', {type: 'radio'});
                assert.equal(markup.render(), '<div class="row radio"><label for="KeyValue">Key.value</label><input type="radio" value="" id="KeyValue" name="Key[value]"></div>');
            },

            'checkboxgroup': function (helper) {
				var markup = helper.field('Key.value', {type: 'checkboxgroup', options: {0: '1', 1: '2'}});
                assert.equal(markup.render(), '<div class="row checkboxgroup"><label for="KeyValue">Key.value</label><div class="grouped"><div class="row checkbox"><label for="KeyValue[0]">1</label><input type="checkbox" value="0" value="0" label="1" name="Key[value][0]" id="KeyValue[0]"></div><div class="row checkbox"><label for="KeyValue[1]">2</label><input type="checkbox" value="1" value="1" label="2" name="Key[value][1]" id="KeyValue[1]"></div></div></div>');
            },

            'radiogroup': function (helper) {
				var markup = helper.field('Key.value', {type: 'radiogroup', options: {0: '1', 1: '2'}});
                assert.equal(markup.render(), '<div class="row radiogroup"><label for="KeyValue">Key.value</label><div class="grouped"><div class="row radio"><label for="KeyValue[0]">1</label><input type="radio" value="0" value="0" label="1" name="Key[value]" id="KeyValue[0]"></div><div class="row radio"><label for="KeyValue[1]">2</label><input type="radio" value="1" value="1" label="2" name="Key[value]" id="KeyValue[1]"></div></div></div>');
            },

            'File': function (helper) {
				var markup = helper.field('Key.value', {type: 'radio'});
                assert.equal(markup.render(), '<div class="row radio"><label for="KeyValue">Key.value</label><input type="radio" value="" id="KeyValue" name="Key[value]"></div>');
            },

            'Submit': function (helper) {
				var markup = helper.submit('Submit');
                assert.equal(markup + '', '<input type="submit" value="Submit">');
            },

            'Before | Between | After': function (helper) {
				var markup = helper.field('Key.value', {type: 'text'})
					.before('Before')
					.between('Between')
					.after('After');

                assert.equal(markup.render(), '<div class="row text">Before<label for="KeyValue">Key.value</label>Between<input type="text" value="" id="KeyValue" name="Key[value]">After</div>');
            },
        }
    }
}).export(module);