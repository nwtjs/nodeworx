{
	pageTitle: 'Form Helper',

	content: Html.h2('FormHelper') +
		Html.p('The FormHelper provides for utility methods for creating forms.') +
		Form.generate(
			Form.field('User.username'),
			Form.field('User.email'),
			Form.field('User.password'),
			Form.submit('Submit')
		)
}		