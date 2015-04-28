var express 	= require('express'),
	multer 		= require('multer'),
	serveStatic = require('serve-static'),
	uuid 		= require('node-uuid'),
	bodyParser 	= require('body-parser'),
	_ 			= require('underscore'),
	fs 			= require('fs'),
	app,
	PORT;

PORT = 8000;

app = express();

app.set('PORT', 8000);

app.use(bodyParser.json());

app.use(multer({ dest: './uploads/' }));

app.use(ensureTodosFileCreated);

app.post('/todos', function (req, res, next) {
	var text = req.body.text;

	readTodos(function (todos, indexed) {
		var newTodo,
			id = uuid.v1();

		newTodo = {
			text: text,
			id: id,
			complete: false
		};

		todos.unshift(newTodo);

		writeTodos(todos, function () {
			res.send(newTodo);
		});
	});
});

app.get('/todos', function (req, res, next) {
	readTodos(function (todos) {
		res.send(todos);
	});
});

app.get('/todos/:id', function (req, res, next) {
	var id = req.params.id;

	readTodos(function (todos, indexed) {
		res.send(id ? indexed[id] : todos);
	});
});

app.put('/todos/:id', function (req, res, next) {
	var id = req.params.id,
		params = req.body;

	readTodos(function (todos, indexed) {
		var toUpdate = indexed[id];

		_.extend(toUpdate, params);

		writeTodos(todos, function () {
			res.send(toUpdate);
		});
	});
});

app.delete('/todos/:id', function (req, res, next) {
	var id = req.params.id;

	readTodos(function (todos, indexed) {
		var toDelete = todos.indexOf(indexed[id]);

		todos.splice(toDelete, 1);

		writeTodos(todos, function () {
			res.send({ id: id });
		});
	});
});

app.use(serveStatic(__dirname));

app.listen(app.get('PORT'));
console.log('Listening on port %d', app.get('PORT'));

function ensureTodosFileCreated(req, res, next) {
	fs.exists('.todos', function (exists) {
		if (!exists) {
			fs.writeFileSync('.todos', '');
		}

		next();
	});
}

function readTodos(cb) {
	fs.readFile('.todos', { encoding: 'utf8' }, function (err, data) {
		var todos = data ? JSON.parse(data) : [],
			indexed = indexBy(todos, 'id');

		cb(todos, indexed);
	});
}

function writeTodos(todos, cb) {
	fs.writeFile('.todos', JSON.stringify(todos), cb);
}

function indexBy(arr, key) {
	return arr.reduce(function (index, item) {
		index[item[key]] = item;

		return index;
	}, {});
}