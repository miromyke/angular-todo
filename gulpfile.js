var gulp = require('gulp'),
	concat = require('gulp-concat');

gulp.task('default', function () {
	return gulp.src([
			'./src/**/*.module.js',
			'./src/*/**/*.js',
			'./src/app.js'
		])
    	.pipe(concat('app.js'))
    	.pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
	return gulp.watch([
		'./**/*.js',
		'./**/*.html'
	], ['default']);
});