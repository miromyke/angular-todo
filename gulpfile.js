var gulp = require('gulp'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	exec = require('child_process').exec;

gulp.task('default', ['build', 'less']);

gulp.task('pre-commit', ['e2e']);

gulp.task('watch', function () {
	gulp.watch([
		'./less/**/*.less',
		'./less/**/*.css'
	], ['less']);

	gulp.watch('./src/**/*.js', ['build'])
});

gulp.task('build', function () {
	return gulp.src([
			'./src/**/*.module.js',
			'./src/*/**/*.js',
			'./src/app.js'
		])
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

	server = exec('python ' + getServerParams());
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

function getServerParams() {
	var params = '-m ';

	if (/^win/.test(process.platform)) {
		params += 'http.server';
	} else {
		params += 'SimpleHTTPServer';
	}

	return params;
}