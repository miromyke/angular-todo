exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: './tests/**/*.spec.js',
	allScriptsTimeout: 11000,
	framework: 'jasmine2',
	onPrepare: function () {
	    browser.addMockModule('disableNgAnimate', disableNgAnimate);

	    function disableNgAnimate() {
	      angular.module('disableNgAnimate', []).run(['$animate', function($animate) {
	        $animate.enabled(false);
	      }]);
	    };
	},
	jasmineNodeOpts: {
		defaultTimeoutInterval: 60000,
		showTiming: true
	}
}