(function() {
    'use strict';

angular.module('app.chat', [
    ])
    .config(['$stateProvider',   '$urlRouterProvider',
        function($stateProvider) {
            $stateProvider
                .state('chat', {
                    url : '/chat',
                    templateUrl : chatroom_viewurl + '/chat.html',
                    controller: 'ChatController'
                })

        }]);

})();
