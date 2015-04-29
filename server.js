var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	app,
	PORT,
	TodoApp;

TodoApp = require('./backend/todo_app');

PORT = 8000;

app = express();

app.set('PORT', 8000);

app.use(bodyParser.json());

TodoApp.init(app, listen);

function listen() {
	app.listen(app.get('PORT'));

	console.log('Listening on port %d', app.get('PORT'));
}