(function () {
	'use strict';

	angular
		.module('todoList')
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['todoStorage'];

	function TodoListController(todoStorage) {
		var vm = this;

		vm.todos = todoStorage.todos;

		vm.currentText = '';

		vm.displayMode = 'all';

		vm.create = create;

		vm.remove = remove;

		vm.toggleComplete = todoStorage.toggleTodo;

		vm.getItemClasses = getItemClasses;

		vm.isTodoVisible = isTodoVisible;

		vm.hasNoVisibleTodos = function () {
			return !getVisibleTodos().length;
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
			{ action: 'all', 		type: 'default', text: 'Show all', 			method: 'showAll' },
			{ action: 'complete', 	type: 'success', text: 'Show complete', 	method: 'showComplete' },
			{ action: 'incomplete', type: 'warning', text: 'Show incomplete', 	method: 'showIncomplete' }
		];

		function create() {
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

		function getItemClasses(id) {
			var item = todoStorage.get(id);

			return {
				complete: item.complete,
				incomplete: !item.complete
			};
		}

		function getEmptyText() {
			var text = 'No ' + vm.displayMode + ' todos';

			if (vm.displayMode === 'all') {
				text = 'No todos yet';
			}

			return text;
		}

		function getVisibleTodos() {
			return vm.todos.filter(isTodoVisible);
		}

		function isTodoVisible(todo) {
			var display = vm.displayMode,
				showAll = display === 'all',
				showComplete,
				showIncomplete,
				isComplete,
				todoFits;

			if (showAll) {
				return true;
			}

			isComplete 		= todo.complete;
			showComplete 	= display === 'complete';
			showIncomplete 	= display === 'incomplete';

			todoFits = (isComplete && showComplete) || (!isComplete && showIncomplete);

			return todoFits;
		}
	}
})();