/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.group', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('group.groupinfo', {
                url: "/groupinfo?topic&name",
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