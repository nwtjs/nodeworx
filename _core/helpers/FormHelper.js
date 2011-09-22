(function(root) {

	var nwtHelper = global.require('./helpers/NWTHelper.js');

	/**
	 * Form field helper
	 */
	function FormField(args) {
		this.key = args[0];
		this.args = args[1] || {};

		this.type = this.args.type || 'text';
		this.value = this.args.value || '';
		this.label = this.args.label || this.key;

		FormField._super.call(this, args);
	}
	global.nwt.extend(FormField, nwtHelper.NWTHelperInstance);


	/**
	 * Renders the form field
	 */
	FormField.prototype.render = function() {
		var content = [
			'<div class="row ', this.get('type'), '">',
				'<label>', this.get('label'), '</label>',
				this['render_' + this.get('type')](),
			'</div>'
		];

		return content.join('');
	};


	/**
	 * Renders a select box with options
	 */
	FormField.prototype.render_select = function() {

		var optionMarkup = '',
			options = this.get('args').options || {},
			selected = this.get('args').selected || 0,
			selectedMarkup = '';

		for( var i in options ) {

			selectedMarkup = i == selected ? ' selected' : '';

			optionMarkup += '<option value="' + i + '"' + selectedMarkup + '>' + options[i] + '</option>';
		}

		return '<select>' + optionMarkup + '</select>';
	}


	/**
	 * Renders a text input field
	 */
	FormField.prototype.render_text = function() {
		return '<input type="' + this.get('type') + '" value="' + this.get('value') + '">';
	}


	/**
	 * Renders a textarea
	 */
	FormField.prototype.render_textarea = function() {
		return '<textarea>' + this.get('value') + '</textarea>';
	}


	/**
	 * @constructor
	 */
	function FormHelper() {
		
	}


	/**
	 * Creates the openeing <form> tag
	 */
	FormHelper.prototype.open = function() {
		return '<form>';
	};


	/**
	 * Closes the form
	 */
	FormHelper.prototype.close = function() {
		return '</form>';
	};


	/**
	 * Generates a form field
	 * @param string Key for the field e.g., Model.column_name
	 */
	FormHelper.prototype.field = function() {
		return new FormField(arguments);
	};

	root.FormHelper = new FormHelper();

}(this));