(function () {
	'use strict';

	angular
		.module('todoList')
		.service('todoStorage', TodoStorage);

	TodoStorage.$inject = ['uid', '$timeout'];

	function TodoStorage(uid, $timeout) {
		var items = [],
			indexedItems = {};

		return {
			getComplete: getComplete,
			getIncomplete: getIncomplete,
			getAll: getAll,
			create: create,
			remove: remove,
			get: get
		}

		function get(id) {
			return indexedItems[id] || null;
		}

		function create(text) {
			var id,
				item;

			if (!text) return;

			id = uid();

			item = {
				id: id,
				text: text,
				complete: false
			};

			items.unshift(item);

			indexedItems[id] = item;

			return item;
		}

		function remove(id) {
			var item = indexedItems[id];

			items.splice(items.indexOf(item), 1);

			delete indexedItems[id];
		}

		function getComplete() {
			return items.filter(function (item) {
				return item.complete;
			});
		}

		function getIncomplete() {
			return items.filter(function (item) {
				return !item.complete;
			});
		}

		function getAll() {
			return items;
		}
	}
})();