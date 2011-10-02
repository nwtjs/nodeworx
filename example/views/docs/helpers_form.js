{
	pageTitle: 'Form Helper',

	content: Html.h2('FormHelper') +
		Html.p('The FormHelper provides for utility methods for creating forms.') +
		Form.generate(
			Form.field('Form.username'),
			Form.field('Form.email'),
			Form.field('Form.password', {
				type: 'password'
			}),
			Form.field('Form.textarea', {
				type: 'textarea'
			}),
			Form.field('Form.select', {
				type: 'select',
				options: {
					0: 'Select one',
					1: 'First option',
					2: 'Second option',
				},
				selected: 0
			}),
			Form.field('Form.multiselect', {
				type: 'select',
				multiple: true,
				options: {
					0: 'Select one',
					1: 'First option',
					2: 'Second option',
				},
				selected: 0
			}),
			Form.field('Form.checkbox', {
				type: 'checkbox'
			}),
			Form.field('Form.radio', {
				type: 'radio'
			}),
			Form.field('Form.checkboxgroup', {
				type: 'checkboxgroup',
				options: {
					0: 'First option',
					1: 'Second option',
					2: 'Third option'
				},
			}),
			Form.field('Form.radio', {
				type: 'radiogroup',
				options: {
					0: 'First option',
					1: 'Second option',
					2: 'Third option'
				},
			}),
			Form.field('Form.file', {
				type: 'file'
			}),
			Form.field('Form.someField')
				.before('test before')
				.between(' | TEST BETWEEN | ')
				.after('test after'),
			Form.submit('Submit')
		)
}		