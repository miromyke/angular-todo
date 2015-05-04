var TodoStorage = require('./todo_storage'),
	_ = require('underscore'),
	api;

exports.init = boot;

api = {
	fetchAll: 			onTodoFetchAll,
	create: 			onTodoCreate,
	fetch: 				onTodoFetch,
	update: 			onTodoUpdate,
	delete: 			onTodoDelete,
	deleteAll:  		onTodosDeleteAll,
	uploadTodoFiles: 	onUploadTodoFiles
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

function onUploadTodoFiles(req, res, next) {
	var files = req.files['todo-files'],
		id = req.params.id;

	files = Array.isArray(files) ? files : [files];

	TodoStorage.read(id, function (todo) {
		todo.files = todo.files.concat(files.map(formatFile));

		TodoStorage.update(todo.id, todo, function (todo) {
			res.send(todo);
		});
	});
}

function formatFile(file) {
	return {
		name: file.originalname,
		type: mimeToFileType(file.mimetype),
		path: file.path,
		ext: file.extension
	};
}

function mimeToFileType(mimeType) {
	var prefix,
		type;

	prefix = mimeType.split('/')[0];

	switch (prefix) {
		case 'application':
			type = 'file';
			break;

		case 'video':
			type = 'video';
			break;

		case 'audio':
			type = 'audio';
			break;

		case 'image':
			type = 'image';
			break;

		case 'text':
			type = 'text';
			break;

		default:
			type = 'file';
			break;
	}

	return type;
}