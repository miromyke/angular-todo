(function () {
	'use strict';

	angular
		.module('core')
		.factory('uid', Uid);

	function Uid() {
		var i = 0;

		return function () {
			return i++;
		}
	}
})();