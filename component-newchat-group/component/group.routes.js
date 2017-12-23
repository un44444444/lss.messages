/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.group', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        //空白页
            .state('group.blank', {
                url: "/groupblank",
                views: {
                    "@group": {
                        template: "<div style='display:flex;width:100%;height:100%;justify-content:center;align-items:center;font-size: 20px'><span>群组列表首页空白</span></div>",
                        controller: 'GroupBlankController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('group.groupinfo', {
                url: "/groupinfo?groupid&chatid&name",
                views: {
                    "@group": {
                        templateUrl: group_viewurl + "view/groupinfo.html",
                        controller: 'GroupinfoController',
                        controllerAs: 'vm'
                    }
                }
            })
    }])
;