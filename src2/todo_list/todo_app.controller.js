(function () {
	'use strict';

	angular
		.module('todoApp')
		.controller('todoAppController', TodoAppController);

	TodoAppController.$inject = ['TodoStorage'];

	function TodoAppController(TodoStorage) {

	}
})();