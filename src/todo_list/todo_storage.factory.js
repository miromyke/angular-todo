(function () {
	'use strict';

	angular
		.module('todoList')
		.factory('todoStorage', TodoStorage);

	TodoStorage.$inject = ['uid'];

	function TodoStorage(uid) {
		var items = getAll(),
			indexedItems = items.length ? _.indexBy(items, 'id') : {},
			getUid;

		getUid = uid.getIdGenerator(getMaxId());

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

			id = getUid();

			item = {
				id: id,
				text: text,
				complete: false
			};

			items.unshift(item);

			indexedItems[id] = item;

			store(items);

			return item;
		}

		function remove(id) {
			var item = indexedItems[id];

			items.splice(items.indexOf(item), 1);

			store(items);

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
			var items = fetch();

			return items ? clearNgData(JSON.parse(items)) : [];
		}

		function fetch() {
			return localStorage.getItem('todoApp');
		}

		function store(data) {
			localStorage.setItem('todoApp', JSON.stringify(data));
		}

		function getMaxId() {
			var keys = Object.keys(indexedItems);

			return Math.max.apply(Math, keys.length ? keys : [0]);
		}

		function clearNgData(items) {
			return items.map(function (item) {
				var keys = Object.keys(item);

				keys.forEach(function (key) {
					if (key.charAt(0) === '$$') {
						delete item[key];
					}
				});
			});
		}
	}
})();