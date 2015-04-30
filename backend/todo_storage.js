var fs = require('fs'),
	uuid = require('node-uuid'),
	_ = require('underscore'),
	STORAGE_FILE = '.todos',
	todos,
	indexed,
	initialApi,
	api;

exports.init = boot;

api = {
	readAll: readTodos,
	update: writeTodo,
	create: createTodo,
	read: readTodo,
	remove: removeTodo
};

function boot(cb) {
	ensureTodosFileCreated(function () {
		readSource(function (data) {
			open();

			todos = data;
			indexed = indexBy(data, 'id');

			cb();
		})
	});
}

function open() {
	_.extend(module.exports, api);

	delete exports.init;
}

function ensureTodosFileCreated(cb) {
	fs.exists(STORAGE_FILE, function (exists) {
		if (!exists) {
			fs.writeFileSync(STORAGE_FILE, '');
		}

		cb();
	});
}

function createTodo(text, cb) {
	var newTodo,
		id = uuid.v1();

	newTodo = {
		text: text,
		id: id,
		complete: false
	};

	indexed[id] = newTodo;

	todos.unshift(newTodo);

	storeTodos(function () { cb(newTodo); });
}

function readTodos(cb) {
	cb(todos, indexed);
}

function readSource(cb) {
	fs.readFile(STORAGE_FILE, { encoding: 'utf8' }, function (err, data) {
		data = data ? JSON.parse(data) : [];

		cb(data);
	});
}

function readTodo(id, cb) {
	cb(indexed[id]);
}

function writeTodo(id, data, cb) {
	var todoToUpdate = indexed[id];

	_.extend(todoToUpdate, data);

	storeTodos(cb.bind(null, todoToUpdate));
}

function removeTodo(id, cb) {
	var todo = indexed[id];

	todos.splice(todos.indexOf(todo), 1);

	delete indexed[id];

	storeTodos(cb.bind(null, id));
}

function storeTodos(cb) {
	fs.writeFile(STORAGE_FILE, JSON.stringify(todos), cb);
}

function indexBy(arr, key) {
	return arr.reduce(function (index, item) {
		index[item[key]] = item;

		return index;
	}, {});
}

function noop() {}