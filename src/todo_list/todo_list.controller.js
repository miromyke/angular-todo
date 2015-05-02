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

		vm.deleteAll = deleteAll;

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

		function deleteAll() {
			return todoStorage.deleteAll().then(handleTodosRemoval);
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

		function handleTodoUpdate(updatedTodo, shouldExtend) {
			var id = updatedTodo.id,
				todo = indexedTodos[id];

			if (!todo) {
				return;
			}

			if (shouldExtend) {
				_.extend(todo, updatedTodo);
			} else {
				replaceTodo(id, updatedTodo);
			}
		}

		function replaceTodo(id, updatedTodo) {
			var todo = indexedTodos[id];

			vm.todos.splice(vm.todos.indexOf(todo), 1, updatedTodo);

			indexedTodos[id] = updatedTodo;	
		}

		function handleTodoRemoval(todo) {
			var todo = indexedTodos[todo.id];

			vm.todos.splice(vm.todos.indexOf(todo), 1);

			delete indexedTodos[todo.id];
		}

		function handleTodosRemoval(removedIds) {
			removedIds.forEach(function (id) {
				var todo = indexedTodos[id],
					position = vm.todos.indexOf(todo);

				if (!!~position) {
					vm.todos.splice(position, 1);
				}

				delete indexedTodos[id];
			});
		}

		function handleTodosReload(todos) {
			vm.todos = todos;

			indexedTodos = _.indexBy(todos, 'id');
		}
	}
})();