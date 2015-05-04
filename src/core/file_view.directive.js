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
                path: '='
            },
            controller: function noop() {},
            template: '<div ng-include="vm.getTemplate()"></div>'
        }

        function link(scope, el) {
            var type = scope.vm.type;

            scope.vm.getTemplate = getTemplate;

            function getTemplate() {
                return 'src/core/file_view/' + (type || 'default') + '.html';
            }
        }
    }
})();