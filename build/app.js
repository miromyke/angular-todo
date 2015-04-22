(function () {
	'use strict';

	angular.module('core', []);
})();
(function () {
	'use strict';

	angular.module('todoList', ['core', 'ngAnimate']);
})();
(function () {
	'use strict';

	angular
		.module('core')
		.factory('uid', Uid);

	function Uid() {
		var i = 0;

		return function () {
			return i++;
		}
	}
})();
(function () {
	'use strict';

	angular
		.module('todoList')
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['todoStorage'];

	function TodoListController(todoStorage) {
		var vm = this;

		vm.currentText = '';

		vm.displayMode = 'all';

		vm.add = add;

		vm.remove = remove;

		vm.toggleComplete = toggleComplete;

		vm.getItemClasses = getItemClasses;

		vm.getTodos = getTodos;

		vm.hasNoTodos = function () {
			return !vm.getTodos().length;
		};

		vm.showAll = function () {
			vm.displayMode = 'all';
		}

		vm.showComplete = function () {
			vm.displayMode = 'complete';
		}

		vm.showIncomplete = function () {
			vm.displayMode = 'incomplete';
		}

		vm.getEmptyText = getEmptyText;

		vm.tabs = [
			{ action: 'all', 		type: 'default', text: 'Show all', 			method: vm.showAll },
			{ action: 'complete', 	type: 'success', text: 'Show complete', 	method: vm.showComplete },
			{ action: 'incomplete', type: 'warning', text: 'Show incomplete', 	method: vm.showIncomplete }
		];

		function add() {
			var text = vm.currentText,
				item;

			if (!text) return;

			item = todoStorage.create(text);

			vm.currentText = '';
		}

		function remove(id) {
			var item = todoStorage.get(id);

			todoStorage.remove(id);
		}

		function toggleComplete(id) {
			var item = todoStorage.get(id);
			
			item.complete = !item.complete;
		}

		function getItemClasses(id) {
			var item = todoStorage.get(id);

			return {
				complete: item.complete,
				incomplete: !item.complete
			};
		}

		function getTodos() {
			var todos = todoStorage.getAll();

			switch (vm.displayMode) {
				case 'complete':
					todos = todoStorage.getComplete();
					break;

				case 'incomplete':
					todos = todoStorage.getIncomplete();
					break;
			}

			return todos;
		}

		function getEmptyText() {
			var text = 'No ' + this.displayMode + ' todos';

			if (this.displayMode === 'all') {
				text = 'No todos yet';
			}

			return text;
		}
	}
})();
(function () {
	'use strict';

	angular
		.module('todoList')
		.factory('todoStorage', TodoStorage);

	TodoStorage.$inject = ['uid'];

	function TodoStorage(uid) {
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
(function () {
	'use strict';

	angular.bootstrap(document.body, ['todoList']);	
})();