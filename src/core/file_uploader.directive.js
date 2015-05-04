(function () {
    'use strict';

    angular
        .module('core')
        .directive('niceFileUploader', niceFileUploaderDirective);

    niceFileUploaderDirective.$inject = [];

    function niceFileUploaderDirective() {

        return {
            restrict: 'E',
            scope: {
                url: '=',
                method: '@',
                name: '@',
                onUpload: '&'
            },
            controllerAs: 'vm',
            bindToController: true,
            controller: function noop() {},
            templateUrl: 'src/core/file_uploader.html',
            link: link
        };

        function link(scope, el) {
            var form = el.find('form'),
                fileInput = form.find('input[type="file"]'),
                vm = scope.vm;

            form.on('submit', preventDefault);

            fileInput.on('change', onFilesChange);

            vm.submit = submit;

            form.ajaxForm();

            vm.hasFilesToUpload = hasFilesToUpload;

            function onFilesChange(e) {
                var input = e.target,
                    files = input.files;

                files = files.length ? _.map(files, getFileName) : [];
                files = files.join(', ');

                vm.filesToUpload = files;

                scope.$digest();
            }

            function reset() {
                form.get(0).reset();
            }

            function getFileName(file) {
                return file.name;
            }

            function submit() {
                vm.isLoading = true;

                form.ajaxSubmit(function (data) {
                    scope.vm.onUpload()(data);

                    vm.isLoading = false;

                    reset();

                    vm.filesToUpload = '';

                    scope.$apply();
                });
            }

            function removeFile(file) {
                
            }

            function hasFilesToUpload() {
                return vm.filesToUpload && vm.filesToUpload.length;
            }

            function preventDefault(e) {
                e.preventDefault();
            }
        }
    }
})();