var fs 		= require('fs'),
	util	= require('util');

var APP_CONFIG_FILE = '.app',
	BUILD_DIR = './build/',
	BUILD_FILE_PREFIX = 'app';

module.exports = {
	appDir: appDir,
	buildDir: buildDir,
	jsAssetsSequence: jsAssetsSequence,
	lessAssetsToWatch: lessAssetsToWatch,
	jsAssetsToWatch: jsAssetsToWatch,
	mainLessFile: mainLessFile,
	BUILD_DIR: BUILD_DIR,
	BUILD_FILE_PREFIX: BUILD_FILE_PREFIX,
	APP_CONFIG_FILE: APP_CONFIG_FILE
}

function appDir() {
	return readFile(APP_CONFIG_FILE);
}

function buildDir() {
	return BUILD_DIR + appDir();
}

function jsAssetsSequence() {
	var format = getFormatter();

	return [
		'./%s/**/*.module.js',
		'./%s/*/**/*.js',
		'./%s/app.js'
	].map(format);
}

function lessAssetsToWatch() {
	var format = getFormatter();

	return [
		'./less/%s/**/*.less',
		'./less/%s/**/*.css'
	].map(format);
}

function jsAssetsToWatch() {
	var format = getFormatter();

	return format('./%s/**/*.js');
}

function mainLessFile() {
	var format = getFormatter();

	return format('./less/%s/app.less');	
}

function getFormatter() {
	return formatStr.bind(null, appDir());
}

function formatStr(str, format) {
	return util.format(format, str);
}

function readFile(path) {
	return fs.readFileSync(path, { encoding: 'utf8' });
}