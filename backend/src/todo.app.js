var multer      = require('multer'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    TodoCtrl,
    staticServer,
    APP_CONFIG_FILE;

APP_CONFIG_FILE = '.app';

staticServer = getStaticServer();

TodoCtrl = require('./todo.controller');

exports.init = bindTo;

function bindTo(app, cb) {
    TodoCtrl.init(function () {
        setupMiddlewares(app);
        cb();
    });
}

function setupMiddlewares(app) {
    app.use(randomizeLatency);

    app.use(bodyParser.json());

    app.use(multer({ dest: './uploads/origin' }));

    app.post('/todos', TodoCtrl.create);

    app.get('/todos', TodoCtrl.fetchAll);

    app.get('/todos/:id', TodoCtrl.fetch);

    app.put('/todos/:id', TodoCtrl.update);

    app.delete('/todos/:id', TodoCtrl.delete);

    app.delete('/todos', TodoCtrl.deleteAll);

    app.post('/todos/:id/files', TodoCtrl.uploadTodoFiles);

    app.delete('/todos/:id/files', TodoCtrl.deleteTodoFile);

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

function randomizeLatency(req, res, next) {
    var latency = Math.random() * 300;

    setTimeout(next, latency);
}