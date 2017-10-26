angular.module('modelapp', [
    'ui.router',
    'app.chat',
    'app.login',
    'app.logininterface',
    'app.service.mqttjs',

    'ui.bootstrap',
])
    .run(
        [          '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        [          '$stateProvider', '$urlRouterProvider','$locationProvider',
            function ($stateProvider,   $urlRouterProvider,$locationProvider) {
                $urlRouterProvider
                    .otherwise('/chat');
            }
        ]
    )
;
