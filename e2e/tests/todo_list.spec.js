describe('Todo App', function () {
	'use strict';

	var TODO_TEXT 		= 'Do homework',
		FIRST_TODO_TEXT = 'Wash dishes',
		SECND_TODO_TEXT = 'Become a ninja',
		APP_ROOT_URL 	= 'http://localhost:8000';

	browser.get(APP_ROOT_URL);

	beforeEach(bootAndFullfill);

	it('creates todo', function () {
		var todo;

		todo = getTodos().get(0);

		expect(todo.getText()).toEqual(TODO_TEXT);
	});

	it('clears up input field when todo is created', function () {
		expect(getInput().getAttribute('value')).toEqual('');
	});

	it('saves it\'s state within page reloads', function () {
		var todos = getTodos();

		createTodo('one more tiny little task');
		toggleTodo(todos.get(0));

		browser.get(APP_ROOT_URL);

		expect(todos.count()).toEqual(2);
		expect(todos.get(0).getText()).toEqual('one more tiny little task');
		expect(hasClass(todos.get(0), 'complete')).toBe(true);

		deleteTodo(todos.get(0));
		browser.get(APP_ROOT_URL);

		expect(todos.get(0).getText()).toEqual(TODO_TEXT);
	});

	describe('todo', function () {
		beforeEach(bootAndFullfill);

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

			deleteTodo(todo);
			expect(getTodos().count()).toEqual(0);
		});
	});

	describe('tabs', function () {
		var todos = getTodos();

		beforeEach(function () {
			showAll();
			deleteAll();

			createTodo(FIRST_TODO_TEXT);
			createTodo(SECND_TODO_TEXT);
		});

		it('shows all todos when on "Show all" tab', function () {
			var todo;

			showAll();

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

	function bootAndFullfill() {
		showAll();

		deleteAll();

		createTodo(TODO_TEXT);
	}

	function createTodo(text) {
		var input = getInput();

		input.sendKeys(text);

		input.sendKeys(protractor.Key.ENTER);
	}

	function toggleTodo(todo) {
		todo.element(by.css('[role="toggleTodo"]')).click();
	}

	function deleteTodo(todo) {
		todo.element(by.css('[role="deleteTodo"]')).click();
	}

	function deleteAll() {
		element(by.css('[role="deleteAll"]')).click().click();
	}

	function getTabButtons() {
		return element(by.model('vm.displayMode'));
	}

	function showAll() {
		getTabButtons().element(by.css('[value="all"]'));
	}

	function showComplete() {
		getTabButtons().element(by.css('[value="complete"]'));
	}

	function showIncomplete() {
		getTabButtons().element(by.css('[value="incomplete"]'));
	}

	function getTodos() {
		return element.all(by.repeater('todo in vm.todos'));
	}

	function getInput() {
		return element(by.model('vm.currentText'));
	}

	function hasClass(element, klass) {
		return element.getAttribute('class').then(function (data) {
			var classes = data.split(' ');

			return !!~classes.indexOf(klass);
		});
	}
});