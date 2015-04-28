var multer 		= require('multer'),
	serveStatic = require('serve-static'),
	TodoCtrl;

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

	app.use(serveStatic(process.cwd()));
}