(function () {
	'use strict';

	angular
		.module('todoApp')
		.config(configure);

	configure.$inject = ['cfpLoadingBarProvider'];

	function configure(barProvider) {
		barProvider.includeSpinner = false;
	}
})();