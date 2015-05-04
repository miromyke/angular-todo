(function () {
	'use strict';

	angular
		.module('todoApp')
		.config(configureTodoList);

	configureTodoList.$inject = [
        'cfpLoadingBarProvider',
        '$routeProvider',
        '$locationProvider'
    ];

	function configureTodoList(cfpLoadingBarProvider, $routeProvider, $locationProvider) {
		cfpLoadingBarProvider.includeSpinner = false;

        $routeProvider
            .when('/', {
                templateUrl: 'src/todo_list/todo_list.html',
                controller: 'TodoAppController',
                controllerAs: 'vm'
            })

        $locationProvider.html5Mode(true);
	}
})();