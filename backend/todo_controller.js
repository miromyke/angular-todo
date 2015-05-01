var TodoStorage = require('./todo_storage'),
	_ = require('underscore'),
	api;

exports.init = boot;

api = {
	fetchAll: 	onTodoFetchAll,
	create: 	onTodoCreate,
	fetch: 		onTodoFetch,
	update: 	onTodoUpdate,
	delete: 	onTodoDelete,
	deleteAll:  onTodosDeleteAll
};

function boot(cb) {
	TodoStorage.init(function () {
		open();
		cb();
	});
}

function open() {
	_.extend(module.exports, api);

	delete exports.init;
}

function onTodoCreate(req, res, next) {
	var text = req.body.text;

	TodoStorage.create(text, function (newTodo) {
		res.send(newTodo);
	});
}

function onTodoFetchAll(req, res, next) {
	TodoStorage.readAll(function (todos) {
		res.send(todos);
	});
}

function onTodoFetch(req, res, next) {
	var id = req.params.id;

	TodoStorage.read(id, function (todo) {
		res.send(todo);
	});
}

function onTodoUpdate(req, res, next) {
	var id = req.params.id,
		params = req.body;

	TodoStorage.update(id, params, function (todo) {
		res.send(todo);
	});
}

function onTodoDelete(req, res, next) {
	var id = req.params.id;

	TodoStorage.remove(id, function (id) {
		res.send({ id: id });
	});
}

function onTodosDeleteAll(req, res, next) {
	TodoStorage.removeAll(req.body.ids, function (deletedIds) {
		res.send(deletedIds);
	});
}