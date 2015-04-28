var express = require('express'),
	multer = require('multer'),
	serveStatic = require('serve-static'),
	uuid = require('node-uuid'),
	app,
	PORT;

PORT = 8000;

app = express();

app.use(multer({ dest: './uploads/' }));

app.use(serveStatic(__dirname));

app.listen(PORT);
console.log('Listening on port %d', PORT);	