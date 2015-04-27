(function () {
	'use strict';

	var $ = jQuery;

	angular
		.module('core')
		.directive('fileUploader', FileUploader);

	FileUploader.$inject = ['$q'];

	function FileUploader($q) {
		return {
			restrict: 'E',
			scope: {
				to: '=url',
				type: '@method',
				id: '=name'
			},
			link: link,
			controller: FileUploaderController,
			controllerAs: 'vm',
			bindToController: true,
			templateUrl: 'src/core/templates/file_uploader.html'
		}

		function FileUploaderController() {}

		function link(scope, el, attrs, ctrl) {
			scope.vm.images = [];

			scope.vm.submit = function () {
				var deferred = $q.defer();

			 	$(el).find('form').ajaxSubmit(function (res) {
			 		var images = JSON.parse(res);

			 		images = images.map(function (fileName) {
			 			return 'uploads/' + fileName;
			 		});

			 		scope.vm.images = images;

			 		deferred.resolve(images);

			 		return false;
			 	});

			 	return deferred.promise;
			}
		}
	}
})();