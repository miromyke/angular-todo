var gulp = require('gulp'),
	concat = require('gulp-concat'),
	less = require('gulp-less');

gulp.task('default', ['build', 'less']);

gulp.task('watch', function () {
	gulp.watch([
		'./css/**/*.less',
		'./css/**/*.css'
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
		.src('./css/app.less')
		.pipe(less())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('./build'));
});