/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.buddy', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        //空白页
            .state('buddy.blank', {
                url: "/buddyblank",
                views: {
                    "@buddy": {
                        template: "<div style='display:flex;width:100%;height:100%;justify-content:center;align-items:center;font-size: 20px'><span>好友列表首页空白</span></div>",
                        controller: 'BuddyBlankController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('buddy.buddyinfo', {
                url: "/buddyinfo?userid&chatid&name",
                views: {
                    "@buddy": {
                        templateUrl: buddy_viewurl + "view/buddyinfo.html",
                        controller: 'BuddyinfoController',
                        controllerAs: 'vm'
                    }
                }
            })
    }])
;