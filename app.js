(function () {
	function counter() {
		var i = 0;

		return function () {
			return i++;
		}
	}

	var uid = counter();

	angular.module('todos', [])
		.controller('TodoListController', ['$timeout', TodoListController]);

	function TodoListController($timeout) {
		var indexedItems = {};
		var vm = this;

		vm.currentText = '';

		vm.displayMode = 'all';

		vm.items = [];

		vm.add = function add() {
			var text = vm.currentText,
				item;

			if (!text) return;

			item = {
				id: uid(),
				text: text,
				complete: false,
				isBeingCreated: true
			};

			$timeout(function () {
				delete item.isBeingCreated;
			}, 500);

			vm.items.unshift(item);
			
			vm.currentText = '';

			reindex();
		}

		vm.remove = function (id) {
			var toRemove = indexedItems[id];

			toRemove.isBeingRemoved = true;

			$timeout(function () {
				vm.items.splice(vm.items.indexOf(toRemove), 1);

				reindex();
			}, 500);
		}

		vm.toggleComplete = function (id) {
			var item = indexedItems[id],
				mode = vm.displayMode,
				isComplete = !item.complete,
				shouldBeTransfered;

			shouldBeTransfered = (mode === 'incomplete' && isComplete) || (mode === 'complete' && !isComplete);

			if (shouldBeTransfered) {
				item.isBeingTransferred = true;

				$timeout(function () {
					item.complete = isComplete;
					delete item.isBeingTransferred;
				}, 800);
			} else {
				item.complete = isComplete;
			}
		}

		vm.getItemClasses = function (id) {
			var item = indexedItems[id],
				classes,
				animation;

			classes = {
				complete: item.complete,
				animated: true
			};

			if (item.isBeingRemoved) {
				animation = 'bounceOutLeft';
			} else if (item.isBeingCreated) {
				animation = 'flipInX';
			} else if (item.isBeingTransferred) {
				animation = 'flipOutX';
			}

			classes[animation] = true;

			return classes;
		}

		vm.getVisibleTodos = function () {
			var todos = vm.items;

			switch (vm.displayMode) {
				case 'complete':
					todos = todos.filter(function (todo) {
						return todo.complete;
					});

					break;

				case 'incomplete':
					todos = todos.filter(function (todo) {
						return !todo.complete;
					});

					break;
			}

			return todos;
		}

		vm.hasNoTodos = function () {
			return !vm.getVisibleTodos().length;
		}

		vm.showAll = function () {
			vm.displayMode = 'all';
		}

		vm.showComplete = function () {
			vm.displayMode = 'complete';
		}

		vm.showIncomplete = function () {
			vm.displayMode = 'incomplete';
		}

		vm.getEmptyText = function () {
			var text = 'No ' + this.displayMode + ' todos';

			if (this.displayMode === 'all') {
				text = 'No todos yet';
			}

			return text;
		}

		vm.actions = [
			{ type: 'default', text: 'Show all', 		method: vm.showAll },
			{ type: 'success', text: 'Show complete', 	method: vm.showComplete },
			{ type: 'warning', text: 'Show incomplete', method: vm.showIncomplete }
		];

		function reindex() {
			indexedItems = _.indexBy(vm.items, 'id');
		}
	}
})();