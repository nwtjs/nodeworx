(function(root) {

	function FormHelper() {
		
	}

	FormHelper.prototype.generate = function() {
		return this;
	};

	FormHelper.prototype.toString = function() {
		return this.render();
	};

	root.FormHelper = new FormHelper();

}(this));