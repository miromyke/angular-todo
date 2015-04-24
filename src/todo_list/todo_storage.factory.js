(function () {
	'use strict';

	angular
		.module('todoList')
		.factory('todoStorage', GetTodoStorage);

	GetTodoStorage.$inject = ['uid'];

	function GetTodoStorage(uid) {
		var todos = fetch(),
			indexedItems = todos.length ? _.indexBy(todos, 'id') : {},
			generateId;

		generateId = uid.createGenerator(getMaxId());

		return {
			getComplete: getComplete,
			getIncomplete: getIncomplete,
			todos: todos,
			create: create,
			remove: remove,
			get: get,
			store: store,
			toggleTodo: toggleTodo
		}

		function get(id) {
			return indexedItems[id] || null;
		}

		function create(text) {
			var id,
				item;

			if (!text) return;

			id = generateId();

			item = {
				id: id,
				text: text,
				complete: false
			};

			todos.unshift(item);

			indexedItems[id] = item;

			store();

			return item;
		}

		function remove(id) {
			var item = indexedItems[id];

			todos.splice(todos.indexOf(item), 1);

			delete indexedItems[id];

			store();
		}

		function getComplete() {
			return todos.filter(function (item) {
				return item.complete;
			});
		}

		function getIncomplete() {
			return todos.filter(function (item) {
				return !item.complete;
			});
		}

		function toggleTodo(id) {
			var todo = indexedItems[id];

			todo.complete = !todo.complete;

			store();
		}

		function fetch() {
			var data = localStorage.getItem('todoAppItems');

			return data ? angular.fromJson(data) : [];
		}

		function store() {
			localStorage.setItem('todoAppItems', angular.toJson(todos));
		}

		function getMaxId() {
			var ids = Object.keys(indexedItems);

			return Math.max.apply(Math, ids.length ? ids : [0]);
		}
	}
})();