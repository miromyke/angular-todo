var gulp 	= require('gulp'),
	concat 	= require('gulp-concat'),
	less 	= require('gulp-less'),
	exec 	= require('child_process').exec,
	fs 		= require('fs'),
	APP_DIR = readFile('.app');

gulp.task('default', ['build', 'less']);

gulp.task('pre-commit', ['e2e']);

gulp.task('watch', function () {
	gulp.watch([
		'./less/**/*.less',
		'./less/**/*.css'
	], ['less']);

	gulp.watch('.' + APP_DIR + '/**/*.js', ['build'])
});

gulp.task('build', function () {
	var jsAssets = [
		'/**/*.module.js',
		'/*/**/*.js',
		'/app.js'
	].map(function (path) { return '.' + APP_DIR + path });

	return gulp.src(jsAssets)
    	.pipe(concat('app.js'))
		.pipe(gulp.dest('./build'));
});

gulp.task('less', function () {
	return gulp
		.src('./less/app.less')
		.pipe(less())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./build'));
});

gulp.task('e2e', function (done) {
	var server,
		webdriver,
		protractor;

	server = exec('node server.js');
	webdriver = exec('webdriver-manager start');
	protractor = exec('protractor e2e/conf.js');

	protractor.stdout.on('data', function (buffer) {
		process.stdout.write(buffer.toString());
	});

	protractor.once('close', function () {
		server.kill();
		webdriver.kill();

		done();

		process.exit(0);
	});
});

function readFile(path) {
	return fs.readFileSync(path, { encoding: 'utf8' });
}