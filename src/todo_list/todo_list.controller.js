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

		vm.actions = [
			{ type: 'default', text: 'Show all', 		method: vm.showAll },
			{ type: 'success', text: 'Show complete', 	method: vm.showComplete },
			{ type: 'warning', text: 'Show incomplete', method: vm.showIncomplete }
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