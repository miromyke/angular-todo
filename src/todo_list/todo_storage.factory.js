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
			update: update,
			removeTodoFile: removeTodoFile
		}

		function get(id) {
			var url = getTodoUrl(id);

			return $http
				.get(url)
				.then(parseResponse);
		}

		function getAll() {

			return $http
				.get('/todos')
				.then(parseResponse);
		}

		function create(payload) {

			return $http
				.post(getTodoUrl(), payload)
				.then(parseResponse);
		}

		function deleteOne(id) {

			return $http
				.delete(getTodoUrl(id))
				.then(parseResponse);
		}

		function deleteAll() {

			return $http
				.delete(getTodoUrl())
				.then(parseResponse);
		}

		function update(id, data) {

			return $http
				.put(getTodoUrl(id), data)
				.then(parseResponse);
		}

		function removeTodoFile(id, filePath) {
			return $http
				.delete(getTodoFilesUrl(id), {
					params: {
						filePath: filePath
					}
				})
				.then(parseResponse);
		}

		function getTodoUrl(id) {
			return '/todos' + (id ? '/' + id : '');
		}

		function getTodoFilesUrl(id) {
			return '/todos/' + id + '/files';
		}
	}

	function parseResponse(res) {
		return res.data;
	}
})();