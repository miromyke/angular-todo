(function () {
	'use strict';

	angular
		.module('todoApp')
		.directive('todoAppActions', TodoAppActionsDirective);

	Todo.$inject = [];

	function TodoAppActionsDirective($http) {
		return {
			readAll: readAll,
			remove: remove,
			update: update,
			create: create,
			read: read
		};

		function readAll() {
			return $http.get('/todos');
		}

		function read(id) {
			return $http.get('/todos/' + id);
		}

		function remove(id) {
			return $http.delete('/todos/' + id);
		}

		function update(id, overrides) {
			return $http.put('/todos/' + id, overrides);
		}

		function create(text) {
			return $http.post('/todos', { text: text });
		}
	}
})();