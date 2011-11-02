(function(root) {

	var nwtHelperInstance = global.nwt.load().library('NWTHelperInstance', false);

	/**
	 * Form field helper
	 */
	function FormField(attributes) {
		
		// Before and after are handled by NWTHelperInstance
		// So far, "betweenContent" is only used for forms
		this.betweenContent = '';
		console.log('Form attributes', attributes);
		this.key = attributes[0];
		this.attributes = attributes[1] || {};

		this.type = this.attributes.type || 'text';
		this.value = this.attributes.value || '';
		this.label = this.attributes.label || this.key;
		this.attributes.id = this.attributes.id || this._generateId(this.key);
		this.attributes.name = this.attributes.name || this._generateName(this.key);

		FormField._super.call(this, attributes);
	}
	global.nwt.extend(FormField, nwtHelperInstance);


	/**
	 * Generates an ID from a form key
	 * E.g., User.username turns into: UserUsername
	 */
	FormField.prototype._generateId = function(key) {
		var id = key.replace(/^([a-z])|\.+([a-z])/g, function (firstChar) {
	        	return firstChar.toUpperCase();
		});
		return id.replace('.', '');
	};


	/**
	 * Generates a field name from a form key
	 * E.g., User.username turns into: User[username]
	 */
	FormField.prototype._generateName = function(key) {
		var keyParts = key.split('.'),
			nameBuild = keyParts[0];

		for( var i = 1 , part ; part = keyParts[i] ; i++ ) {
			nameBuild = nameBuild + "[" + part + "]";
		}
		return nameBuild;
	};


	/**
	 * Renders the form field
	 */
	FormField.prototype.render = function() {
		var content = [
			'<div class="row ', this.get('type'), '">',
				this.beforeContent,
				'<label for="', this.get('attributes').id,'">', this.get('label'), '</label>',
				this.betweenContent,
				this['render_' + this.get('type')](),
				this.afterContent,
			'</div>'
		];

		return content.join('');
	};


	/**
	 * Sets the "betweenContent" property
	 * This gets rendered between the label and input
	 */
	FormField.prototype.between = function(content) {
		this.betweenContent = content;
		return this;
	};


	/**
	 * Renders a checkbox form element
	 */
	FormField.prototype.render_checkbox = function() {
		return this.render_text();
	};


	/**
	 * Renders a file upload control
	 */
	FormField.prototype.render_file = function() {
		return this.render_text();
	};


	/**
	 * Renders a password input
	 */
	FormField.prototype.render_password = function() {
		// Always reset the values
		this.attributes.value = '';
		return this.render_text();
	};


	/**
	 * Renders a radio button
	 */
	FormField.prototype.render_radio = function() {
		return this.render_text();
	};


	/**
	 * Renders a "grouped" set of radio buttons
	 */
	FormField.prototype.render_radiogroup = function() {
		return this.render_grouped('radio');
	};


	/**
	 * Renders a "grouped" set of checkboxes
	 */
	FormField.prototype.render_checkboxgroup = function() {
		return this.render_grouped('checkbox');
	};


	/**
	 * Renders a "grouped" set of controls
	 * See FormField.render_radiogroup and FormField.render_checkboxgroup
	 */
	FormField.prototype.render_grouped = function(fieldType) {

		var optionMarkup = '',
			options = this.get('attributes').options || {};

		for( var i in options ) {

			optionMarkup += new FormField([this.key,
			{
				type: fieldType,
				value : i,
				label: options[i],
				name: this.attributes.name + (fieldType == 'checkbox' ? '[' + i + ']' : '' ),
				id: this.attributes.id + '[' + i + ']'

			}]);
		}

		return '<div class="grouped">' + optionMarkup + '</div>';
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

		delete this.attributes.options;

		return '<select ' + this._parseAttributes() + '>' + optionMarkup + '</select>';
	}


	/**
	 * Renders a text input field
	 */
	FormField.prototype.render_text = function() {
		delete this.attributes.type;
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
		// Keeps all of the fields that we have generated
		this._fields = [];

		// Forms may utilize a model for submission or updating
		this._model = null;

		FormHelper._super.call(this);
	}
	global.nwt.extend(FormHelper, nwtHelperInstance);


	/**
	 * Renders the form object
	 */
	FormHelper.prototype.render = function() {

		global.context().clientScripts.push('widgets/Form');

		var formPath = "#";

		if( this._model ) {
			formPath = '/_nwt/model_updater/model/' + global.nwt.getClass(this._model)
		}

		var content = [
			this._open(formPath),
			this._fields.join(''),
			this._close()
		];
		return content.join('');
	};


	/**
	 * Loads a model into the object to update
	 * @param object Model which extends NWTModel
	 */
	FormHelper.prototype.utilize = function(model) {
		if( typeof model === 'string' ) {
			this._model = global.nwt.load().model(model + 'Model');
		} else {
			this._model = model;
		}

		global.context().clientScripts.push('models/' + global.nwt.getClass(this._model));

		return this;
	};


	/**
	 * Creates the openeing <form> tag
	 */
	FormHelper.prototype._open = function(action) {
		action = action || '/';
		return '<form method="POST" action="' + action + '">';
	};


	/**
	 * Closes the form
	 */
	FormHelper.prototype._close = function() {
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
		var newField = new FormField(arguments);
		return newField;
	};


	/**
	 * Generates a form with multiple inputs
	 * @params objects... Several form field objects
	 */
	FormHelper.prototype.generate = function() {
		for (var i = 0, len = arguments.length; i < len; i++){
			var field = arguments[i];
			this._fields.push(field);
		}
		return this;
	};

	root.FormHelper = FormHelper;

}(this));
