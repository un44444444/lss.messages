(function() {
    'use strict';

    angular.module('app.login', [
    ])
        .config(['$stateProvider',   '$urlRouterProvider',
            function($stateProvider) {
                $stateProvider


                    .state('login', {
                        url : '/login',
                        templateUrl : loginroom_viewurl + '/login.html',
                        controller: 'LoginController'
                    })

                    .state('login.logininterface', {
                        url : '/logininterface',
                        templateUrl : loginroom_viewurl + '/loginInterface.html',
                        controller: 'LoginInterfaceController'
                    })
            }]);

})();
