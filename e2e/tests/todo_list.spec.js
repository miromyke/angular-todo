describe('Todo App', function () {
	'use strict';

	browser.get('http://localhost:8000');

	it('creates/removes todos', function () {
		var todos,
			todo,
			text = 'Do homework',
			removeBtn;

		createTodo(text);

		todos = getTodos();

		todo = todos.get(0);

		expect(todo.getText()).toEqual(text);

		removeBtn = todo.element(by.css('[role="remove"]'));

		removeBtn.click();

		expect(getTodos().count()).toEqual(0);
	});

	it('clears up input field when todo is created', function () {
		var todo,
			input;

		createTodo('Do some fun stuff');

		input = element(by.model('todos.currentText'));

		expect(input.getAttribute('value')).toEqual('');
	});

	describe('todo', function () {
		it('is incomplete initially', function () {
			var todo,
				todos;

			createTodo('Do history');

			todos = getTodos();

			todo = todos.get(0);

			expect(hasClass(todo, 'incomplete')).toBe(true);
		});

		it('can be toggled between complete/incomplete states', function () {
			var todo,
				todos,
				toggleBtn;

			createTodo('Do math');

			todos = getTodos();

			todo = todos.get(0);

			toggleBtn = todo.element(by.css('[role="toggle"]'));

			toggleBtn.click();
			expect(hasClass(todo, 'complete')).toBe(true);

			toggleBtn.click();
			expect(hasClass(todo, 'incomplete')).toBe(true);
		});
	});

	xdescribe('"Show all" tab', function () {
		it('shows all todos', function () {

		});
	});

	xdescribe('"Show complete" tab', function () {
		it('shows complete todos', function () {

		});
	});

	xdescribe('"Show incomplete" tab', function () {
		it('shows incomplete todos', function () {

		});
	});

	function createTodo(text) {
		var input = element(by.model('todos.currentText'));

		input.sendKeys(text);

		input.sendKeys(protractor.Key.ENTER);
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