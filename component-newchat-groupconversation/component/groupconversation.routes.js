/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('conversation.groupconversation', {
                url: "/groupconversation?groupid&chatid&name&biztype",//传入用户统一登录id，传入会话chatid，用户名，会话名，会话的业务类型
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