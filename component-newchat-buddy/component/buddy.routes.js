/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.buddy', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('buddy.buddyinfo', {
                url: "/buddyinfo?topic&name",
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