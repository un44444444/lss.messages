/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        //空白页
            .state('conversation.blank', {
                url: "/conversationblank",
                views: {
                    "@conversation": {
                        template: "<div style='display:flex;width:100%;height:100%;justify-content:center;align-items:center;font-size: 20px'><span>首页空白</span></div>",
                        controller: 'ConversationBlankController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('conversation.conversation', {
                url: "/conversation?userid&chatid&name&biztype",//传入用户统一登录id，传入会话chatid，用户名，会话名，会话的业务类型
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