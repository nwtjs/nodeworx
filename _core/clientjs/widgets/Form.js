function NWTForm() {
	nwt.one('body').on('submit', function(e) {
		nwt.form.submit(e.target);
		e.stop();		
	});
}

NWTForm.prototype.submit = function(el) {

	// Get a 'utilized' model if there is one available, and check for active client-side validation rules
	var modelName = el.get('action').match(/([a-zA-Z]+)$/);

	if( window[modelName[1]] ) {

		var validationPassed = true;

		var modelClass = new window[modelName[1]]();

		if( modelClass.validates !== undefined ) {

			for( var i in modelClass.validates ) {
				var fieldName = modelName[1].replace('Model', '') + '[' + i + ']',

				formField = nwt.one('*[name="' + fieldName + '"]');

				var fieldValidationResult = nwt.validation.validateProvidedValue(formField.get('value'), modelClass.validates[i]);

				// Remove any pre-existing validation messages
				formField.ancestor('.row').all('.validation_message').remove();

				if( !fieldValidationResult.status ) {
					for( var j in fieldValidationResult ) {
						if( j == 'status' ) { continue; }

						var newMsg = nwt.node.create('<div class="validation_message">' + fieldValidationResult[j] + '</div>');
						formField.ancestor('.row').append(newMsg);
					}
					formField.ancestor('.row').addClass('validation_failed');
					validationPassed = false;
				} else {
					formField.ancestor('.row').removeClass('validation_failed');
				}
			}

			if ( !validationPassed ) {
				return;
			}
		}
	} else {
		// Should not get here
	}

	var resource = el.get('action');
	resource = resource.replace('/#!', '');

	nwt.socket.send(resource,{
		success: function(response) {
			console.log('Got response', response);

			nwt.event.fire('FormHelper:success');
		},
		form: el
	});
};

nwt.form = new NWTForm();
