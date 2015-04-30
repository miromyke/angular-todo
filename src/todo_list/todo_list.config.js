(function () {
	'use strict';

	angular
		.module('todoList')
		.config(configureTodoList);

	configureTodoList.$inject = ['cfpLoadingBarProvider'];		

	function configureTodoList(cfpLoadingBarProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
	}
})();