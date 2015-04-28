(function () {
	'use strict';

	angular
		.module('todoList')
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['todoStorage'];

	function TodoListController(todoStorage) {
		var vm = this;

		todoStorage.get().then(reloadTodos);

		vm.todos = [];

		vm.currentText = '';

		vm.displayMode = 'all';

		vm.create = create;

		vm.remove = remove;

		vm.toggleComplete = toggleComplete;

		vm.getItemClassesFor = getItemClassesFor;

		vm.isTodoVisible = isTodoVisible;

		vm.hasNoVisibleTodos = hasNoVisibleTodos;

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
			var text = vm.currentText;

			if (!text) return;

			return todoStorage.create(text)
				.then(parseResponse)
				.then(reloadTodos)
				.then(emptyInput);

			function parseResponce(res) { return res.data };
		}

		function reloadTodos() {
			return todoStorage.get().then(assignTodos);
		}

		function remove(id) {
			todoStorage.remove(id).then(reloadTodos);
		}

		function getItemClassesFor(todo) {
			return {
				complete: todo.complete,
				incomplete: !todo.complete
			};
		}

		function toggleComplete(todo) {
			return todoStorage
				.update(todo.id, { complete: !todo.complete })
				.then(reloadTodos);
		}

		function getEmptyText() {
			var text = 'No ' + vm.displayMode + ' todos';

			if (vm.displayMode === 'all') {
				text = 'No todos yet';
			}

			return text;
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

		function assignTodos(res) {
			vm.todos = res.data;
		}

		function emptyInput() {
			vm.currentText = '';
		}

		function hasNoVisibleTodos() {
			var visibleTodos = vm.todos.filter(isTodoVisible);

			return !visibleTodos.length;
		}
	}
})();