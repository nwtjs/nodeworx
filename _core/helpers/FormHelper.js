(function(root) {

	var nwtHelper = global.require('./helpers/NWTHelper.js');

	/**
	 * Form field helper
	 */
	function FormField(attributes) {
		this.key = attributes[0];
		this.attributes = attributes[1] || {};

		this.type = this.attributes.type || 'text';
		this.value = this.attributes.value || '';
		this.label = this.attributes.label || this.key;
		this.attributes.id = this.attributes.id || this._generateId(this.key);

		FormField._super.call(this, attributes);
	}
	global.nwt.extend(FormField, nwtHelper.NWTHelperInstance);


	/**
	 * Generates an ID from a form key
	 * E.g., User.username turns into: UserUsername
	 */
	FormField.prototype._generateId = function(key) {
		var id = key.replace(/^([a-z])|\.+([a-z])/g, function (firstChar) {
	        	return firstChar.toUpperCase();
		});
		return id;
	};


	/**
	 * Renders the form field
	 */
	FormField.prototype.render = function() {
		var content = [
			'<div class="row ', this.get('type'), '">',
				'<label for="', this.get('attributes').id,'">', this.get('label'), '</label>',
				this['render_' + this.get('type')](),
			'</div>'
		];

		return content.join('');
	};


	/**
	 * Renders a checkbox form element
	 */
	FormField.prototype.render_checkbox = function() {
		return this.render_text();
	};


	/**
	 * Renders a radio button
	 */
	FormField.prototype.render_radio = function() {
		return this.render_text();
	};


	/**
	 * Renders a select box with options
	 */
	FormField.prototype.render_select = function() {

		var optionMarkup = '',
			options = this.get('attributes').options || {},
			selected = this.get('attributes').selected || 0,
			selectedMarkup = '';

		for( var i in options ) {

			selectedMarkup = i == selected ? ' selected' : '';

			optionMarkup += '<option value="' + i + '"' + selectedMarkup + '>' + options[i] + '</option>';
		}

		return '<select ' + this._parseAttributes() + '>' + optionMarkup + '</select>';
	}


	/**
	 * Renders a text input field
	 */
	FormField.prototype.render_text = function() {
		return '<input type="' + this.get('type') + '" value="' + this.get('value') + '" ' + this._parseAttributes() + '>';
	}


	/**
	 * Renders a textarea
	 */
	FormField.prototype.render_textarea = function() {
		return '<textarea ' + this._parseAttributes() + '>' + this.get('value') + '</textarea>';
	}


	/**
	 * @constructor
	 */
	function FormHelper() {
		
	}


	/**
	 * Creates the openeing <form> tag
	 */
	FormHelper.prototype.open = function(action) {
		action = action || '/';
		return '<form method="POST" action="' + action + '">';
	};


	/**
	 * Closes the form
	 */
	FormHelper.prototype.close = function() {
		return '</form>';
	};

	FormHelper.prototype.submit = function(value) {
		value = value || 'Submit';
		return '<input type="submit" value="' + value + '">';
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
