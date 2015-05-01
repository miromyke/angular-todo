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
			removeAll: removeAll,
			update: update
		}

		function get(id) {
			var url = getUrl(id);

			return $http
				.get(url)
				.then(parseResponse);
		}

		function getAll() {

			return $http
				.get('/todos')
				.then(parseResponse);
		}

		function create(text) {

			return $http
				.post(getUrl(), { text: text })
				.then(parseResponse);
		}

		function remove(id) {

			return $http
				.delete(getUrl(id))
				.then(parseResponse);
		}

		function removeAll() {

			return $http
				.delete(getUrl())
				.then(parseResponse);
		}

		function update(id, data) {

			return $http
				.put(getUrl(id), data)
				.then(parseResponse);
		}

		function getUrl(id) {
			return '/todos' + (id ? '/' + id : '');
		}
	}

	function parseResponse(res) {
		return res.data;
	}
})();