/**
 * Created by 黄忠园 on 2017/8/24.
 */
angular.module('module.login', [])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        //登录首页
            .state('login', {
                url: "/login",
                views: {
                    "": {
                        templateUrl: login_viewurl + "view/login/login.html",
                        resolve: {
                            loginbycookies:['$q','$timeout','$state','CookieService',function ($q,$timeout,$state,CookieService) {
                                if(CookieService.getObject("currentUser")){
                                    var user = CookieService.getObject("currentUser");
                                    $timeout(function () {
                                        $state.go("conversation.conversation",{userid:user.userid});
                                    }, 0);
                                    return $q.resolve();
                                }else {
                                    return;
                                }
                            }]
                        },
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    }
                }
            })
            //注册页面
            .state('register', {
                url: "/register",
                views: {
                    "": {
                        templateUrl: login_viewurl + "view/login/register.html",
                        controller: 'RegisterController',
                        controllerAs: 'vm'
                    }
                }
            })
            //忘记密码
            .state('newfoget', {
                url: "/newfoget",
                views: {
                    "": {
                        templateUrl: login_viewurl + "view/login/newfoget.html",
                        controller: 'NewfogetController',
                        controllerAs: 'vm'
                    }
                }
            })
            /*.state('newfoget', {
                url : "/newfoget",
                templateUrl : 'view/login/newfoget.html',
                controller : 'NewfogetController'
            })*/
    }])
;