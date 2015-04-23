(function () {
	'use strict';

	angular
		.module('core')
		.service('uid', Uid);

	function Uid() {
		this.getIdGenerator = function (from) {
			return function () {
				return from++;
			}
		}
	}
})();