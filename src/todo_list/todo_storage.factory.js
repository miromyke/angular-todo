(function () {
	'use strict';

	angular
		.module('todoList')
		.factory('todoStorage', getTodoStorage);

	getTodoStorage.$inject = ['$http', 'todoStorageCache'];

	function getTodoStorage($http, todoCache) {
		return {
			get: get,
			create: create,
			remove: remove,
			update: update
		}

		function get(id) {
			var url = getUrl(id),
				cache = id ? todoCache.byId : todoCache.set;

			return $http
				.get(url)
				.then(parseResponse)
				.then(cache);
		}

		function getAll() {

			return $http
				.get('/todos')
				.then(parseResponse);
		}

		function create(text) {

			return $http
				.post(getUrl(), { text: text })
				.then(parseResponse)
				.then(todoCache.cache);
		}

		function remove(id) {

			return $http
				.delete(getUrl(id))
				.then(parseResponse)
				.then(todoCache.remove);
		}

		function update(id, data) {

			return $http
				.put(getUrl(id), data))
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