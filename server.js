var express = require('express'),
	multer = require('multer'),
	serveStatic = require('serve-static'),
	app,
	PORT;

PORT = 8000;

app = express();

app.use(multer({
	dest: './uploads/',
	onFileUploadComplete: function (file) {
		console.log('his name', file.name);
		console.log('File', file.originalname, ', of size', file.size, ', uploaded to', file.path);
	},

	onUploadStart: function (fieldname, filename) {
		console.log('Upload of file', filename, ' has been started');
	},

	rename: function (fieldname, filename) {
		var separator = '__';

		return [fieldname, filename, Date.now()].join(separator);
	}
}));

app.post('/todo', function (req, res) {
	var files = req.files['todo-images'];

	files = Array.isArray(files) ? files : [files];

	files = files.map(function (file) {
		return file.name;
	});
	
	console.log('files', JSON.stringify(files));

	res.end(JSON.stringify(files));
});

app.use(serveStatic(__dirname));

app.listen(PORT);
console.log('Listening on port %d', PORT);