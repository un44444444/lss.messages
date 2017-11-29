/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('conversation.groupconversation', {
                url: "/groupconversation?userid&chatid&name",
                views: {
                    "@conversation": {
                        templateUrl: groupconversation_viewurl + "view/groupconversation.html",
                        controller: 'GroupconversationController',
                        controllerAs: 'vm'
                    }
                }
            })
    }])
;