(function () {
	'use strict';

	angular
		.module('core')
		.service('uid', Uid);

	function Uid() {
		this.createGenerator = function (from) {
			return function () {
				return ++from;
			}
		}
	}
})();