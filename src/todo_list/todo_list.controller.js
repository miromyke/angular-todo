(function () {
	'use strict';

	angular
		.module('todoList')
		.controller('TodoListController', TodoListController);

	TodoListController.$inject = ['todoStorage'];

	function TodoListController(todoStorage) {
		var vm = this,
			indexedTodos = {};

		reload();

		vm.todos = [];

		vm.currentText = '';

		vm.displayMode = 'all';

		vm.create = create;

		vm.remove = remove;

		vm.toggleComplete = toggleComplete;

		vm.getItemClassesFor = getItemClassesFor;

		vm.isTodoVisible = isVisible;

		vm.isTodoListEmpty = isTodoListEmpty;

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

			return todoStorage.create(text).then(handleTodoCreate).then(emptyInput);
		}

		function reload() {
			return todoStorage.get().then(handleTodosReload);
		}

		function remove(id) {
			return todoStorage.remove(id).then(handleTodoRemoval);
		}

		function toggleComplete(todo) {
			return todoStorage.update(todo.id, { complete: !todo.complete }).then(handleTodoUpdate);
		}

		function getEmptyText() {
			var text = 'No ' + vm.displayMode + ' todos';

			if (vm.displayMode === 'all') {
				text = 'No todos yet';
			}

			return text;
		}

		function getItemClassesFor(todo) {

			return {
				complete: todo.complete,
				incomplete: !todo.complete
			};
		}

		function isVisible(todo) {
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

		function emptyInput() {
			vm.currentText = '';
		}

		function isTodoListEmpty() {
			var visibleTodos = vm.todos.filter(isVisible);

			return !visibleTodos.length;
		}

		function handleTodoCreate(newTodo) {
			vm.todos.unshift(newTodo);

			indexedTodos[newTodo.id] = newTodo;

			return newTodo;
		}

		function handleTodoUpdate(updatedTodo) {
			var todoToUpdate = indexedTodos[updatedTodo.id];

			_.extend(todoToUpdate, updatedTodo);
		}

		function handleTodoRemoval(todo) {
			var todo = indexedTodos[todo.id];

			vm.todos.splice(vm.todos.indexOf(todo), 1);

			delete indexedTodos[todo.id];
		}

		function handleTodosReload(todos) {
			vm.todos = todos;

			indexedTodos = _.indexBy(todos, 'id');
		}
	}
})();