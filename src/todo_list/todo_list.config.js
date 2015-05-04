(function () {
	'use strict';

	angular
		.module('todoApp')
		.config(configureTodoList);

	configureTodoList.$inject = ['cfpLoadingBarProvider'];		

	function configureTodoList(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
	}
})();