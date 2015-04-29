var multer 		= require('multer'),
	serveStatic = require('serve-static'),
	fs = require('fs'),
	path = require('path'),
	TodoCtrl,
	staticServer,
	APP_CONFIG_FILE;

APP_CONFIG_FILE = '.app';

staticServer = getStaticServer();

TodoCtrl = require('./todo_controller'),

exports.init = bindTo;

function bindTo(app, cb) {
	TodoCtrl.init(function () {
		setupMiddlewares(app);
		cb();
	});	
}

function setupMiddlewares(app) {
	app.use(multer({ dest: './uploads/' }));

	app.post('/todos', TodoCtrl.create);

	app.get('/todos', TodoCtrl.fetchAll);

	app.get('/todos/:id', TodoCtrl.fetch);

	app.put('/todos/:id', TodoCtrl.update);

	app.delete('/todos/:id', TodoCtrl.delete);

	app.use('/', staticServer);

	app.use(serveStatic(process.cwd()));
}

function getStaticServer() {
	var basePath = readFile(APP_CONFIG_FILE);
	
	return serveStatic(path.join(process.cwd(), basePath));
}

function readFile(path) {
	return fs.readFileSync(path, { encoding: 'utf8' });
}