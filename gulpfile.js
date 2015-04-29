var gulp 	= require('gulp'),
	concat 	= require('gulp-concat'),
	less 	= require('gulp-less'),
	exec 	= require('child_process').exec,
	env 	= require('./env');

gulp.task('default', ['js', 'less']);

gulp.task('pre-commit', ['e2e']);

gulp.task('watch', watch);

gulp.task('js', buildJs);

gulp.task('less', buildLess);

gulp.task('e2e', e2e);

gulp.task('clean', clean);

function watch() {
	gulp.watch(env.lessAssetsToWatch(), ['less']);

	gulp.watch(env.jsAssetsToWatch(), ['js'])

	gulp.watch(env.APP_CONFIG_FILE, ['js', 'less']);
}

function buildJs() {
	return gulp.src(env.jsAssetsSequence())
		.pipe(concat(env.BUILD_FILE_PREFIX + '.js'))
		.pipe(gulp.dest(env.buildDir()));
}

function buildLess() {
	return gulp
		.src(env.mainLessFile())
		.pipe(less())
		.pipe(concat(env.BUILD_FILE_PREFIX + '.css'))
		.pipe(gulp.dest(env.buildDir()));
}

function e2e(done) {
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
}

function clean(done) {
	var removal = exec('rm -rf ' + env.BUILD_DIR);

	removal.once('close', done);
}