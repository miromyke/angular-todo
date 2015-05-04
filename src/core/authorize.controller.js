(function () {
    'use strict';

    angular
        .module('core')
        .controller('AuthorizeController', AuthorizeController);

    AuthorizeController.$inject = [];

    function AuthorizeController() {
        this.isVisible = false;

        this.toggle = toggle;

        function toggle() {
            this.isVisible = !this.isVisible;
        }
    }
})();