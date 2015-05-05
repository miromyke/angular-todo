(function () {
    'use strict';

    angular
        .module('core')
        .directive('niceFileView', niceFileViewDirective);

    function niceFileViewDirective() {
        return {
            restrict: 'E',
            link: link,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                type: '=',
                name: '=',
                path: '=',
                onRemove: '&'
            },
            controller: FileViewController,
            templateUrl: 'src/core/templates/file_view/base.html'
        }

        function FileViewController() {}

        function link(scope, el, attrs) {
            var vm = scope.vm,
                onRemove = vm.onRemove();

            vm.template = 'src/core/templates/file_view/' + (vm.type || 'default') + '.html';

            vm.remove = remove;

            function remove() {
                onRemove(vm.path);
            }
        }
    }
})();