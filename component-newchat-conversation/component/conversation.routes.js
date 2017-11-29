/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('conversation.conversation', {
                url: "/conversation?userid&chatid&name",
                views: {
                    "@conversation": {
                        templateUrl: conversation_viewurl + "view/conversation.html",
                        controller: 'ConversationController',
                        controllerAs: 'vm'
                    }
                }
            })
    }])
;