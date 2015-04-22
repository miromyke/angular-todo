describe('Todo App', function () {
	'use strict';

	browser.get('http://localhost:8000');

	var TODO_TEXT = 'Do homework';

	beforeEach(function () {
		showAllTodos();

		removeAllTodos();

		createTodo(TODO_TEXT);
	});

	it('creates todo', function () {
		var todo;

		todo = getTodos().get(0);

		expect(todo.getText()).toEqual(TODO_TEXT);
	});

	it('clears up input field when todo is created', function () {
		var input;

		input = element(by.model('todos.currentText'));

		expect(input.getAttribute('value')).toEqual('');
	});

	describe('todo', function () {
		var TODO_TEXT = 'Do history';

		beforeEach(function () {
			showAllTodos();

			removeAllTodos();

			createTodo(TODO_TEXT);
		});

		it('is incomplete initially', function () {
			var todo;

			todo = getTodos().get(0);

			expect(hasClass(todo, 'incomplete')).toBe(true);
		});

		it('can be toggled to complete/incomplete states', function () {
			var todo;

			todo = getTodos().get(0);

			toggleTodo(todo);
			expect(hasClass(todo, 'complete')).toBe(true);

			toggleTodo(todo);
			expect(hasClass(todo, 'incomplete')).toBe(true);
		});

		it('can be removed', function () {
			var todo = getTodos().get(0);

			removeTodo(todo);
			expect(getTodos().count()).toEqual(0);
		});
	});

	describe('tabs', function () {
		var FIRST_TODO_TEXT = 'Do math',
			SECND_TODO_TEXT = 'Do math again',
			todos = getTodos();

		beforeEach(function () {
			showAllTodos();
			removeAllTodos();

			createTodo(FIRST_TODO_TEXT);
			createTodo(SECND_TODO_TEXT);
		});

		it('shows all todos when on "Show all" tab', function () {
			var todo;

			showAllTodos();

			todo = todos.get(0);
			toggleTodo(todo);
			
			expect(todos.get(1).getText()).toEqual(FIRST_TODO_TEXT);
			expect(todos.get(0).getText()).toEqual(SECND_TODO_TEXT);
		});

		it('shows complete todos when on "Show complete" tab', function () {
			var todo;

			todo = todos.get(0);
			toggleTodo(todo);

			showComplete();

			expect(todos.count()).toEqual(1);
			expect(todos.get(0).getText()).toEqual(SECND_TODO_TEXT);
		});

		it('shows incomplete todos when on "Show incomplete" tab', function () {
			var todo;

			todo = todos.get(0);
			toggleTodo(todo);

			showIncomplete();

			expect(todos.count()).toEqual(1);
			expect(todos.get(0).getText()).toEqual(FIRST_TODO_TEXT);
		});
	});

	function createTodo(text) {
		var input = element(by.model('todos.currentText'));

		input.sendKeys(text);

		input.sendKeys(protractor.Key.ENTER);
	}

	function toggleTodo(todo) {
		var toggleBtn = todo.element(by.css('[role="toggle"]'));

		toggleBtn.click();
	}

	function removeTodo(todo) {
		var removeBtn;

		removeBtn = todo.element(by.css('[role="remove"]'));

		removeBtn.click();
	}

	function removeAllTodos() {
		var todos = getTodos();

		todos.count().then(function (count) {
			if (count) {
				removeTodo(todos.get(0));

				removeAllTodos();
			}
		});
	}

	function getButtons() {
		return element.all(by.repeater('tab in todos.tabs'));
	}

	function showAllTodos() {
		getButtons().get(0).click();
	}

	function showComplete() {
		getButtons().get(1).click();
	}

	function showIncomplete() {
		getButtons().get(2).click();
	}

	function getTodos() {
		return element.all(by.repeater('item in todos.getTodos()'));
	}

	function hasClass(element, klass) {
		return element.getAttribute('class').then(function (data) {
			var classes = data.split(' ');

			return !!~classes.indexOf(klass);
		});
	}
});