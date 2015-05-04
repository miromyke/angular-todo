(function () {
	'use strict';

	angular
		.module('todoApp')
		.factory('todoStorage', getTodoStorage);

	getTodoStorage.$inject = ['$http'];

	function getTodoStorage($http) {
		return {
			get: get,
			create: create,
			deleteOne: deleteOne,
			deleteAll: deleteAll,
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

		function deleteOne(id) {

			return $http
				.delete(getUrl(id))
				.then(parseResponse);
		}

		function deleteAll() {

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