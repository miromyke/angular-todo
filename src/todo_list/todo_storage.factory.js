(function () {
	'use strict';

	angular
		.module('todoList')
		.factory('todoStorage', getTodoStorage);

	getTodoStorage.$inject = ['$http'];

	function getTodoStorage($http) {
		return {
			get: get,
			create: create,
			remove: remove,
			update: update
		}

		function get(id) {
			var url = getUrl(id);

			return $http.get(url);
		}

		function create(text) {
			return $http.post(getUrl(), { text: text });
		}

		function remove(id) {
			return $http.delete(getUrl(id));
		}

		function update(id, data) {
			return $http.put(getUrl(id), data);
		}

		function getUrl(optionalId) {
			return '/todos' + (optionalId ? '/' + optionalId : '');
		}
	}
})();