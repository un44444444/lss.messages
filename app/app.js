/**'clerk.filter',
 * Created by 黄忠园 on 2017/8/24.
 */
angular.module('newchat', [
    'ui.router',//路由
    'ngAnimate',//动画
    'ngCookies',//cookie
    'ng.comfirm',//全局comfirm确认框
    'service.cookie',//cookies服务
    'service.localstorage',//localStorage服务
    'service.cache',//cache服务
    'service.error',//错误服务

    'module.login',
    'module.template',
    'module.conversation',
    'module.buddy',
    'module.group',

    'service.imsdk',
    'service.auth',
    'service.mqhp.message',
    'service.mqhp.userchatmsg',
    'service.mqsp.user',
    'service.mqsp.friend',
    'service.mqsp.usergroup',
    'service.mqsp.group',
    'service.menu',

    'filter.num'
])
    .run(
        ['$http','$rootScope', '$state', '$stateParams', '$location','AUTH_EVENTS','POWER','AuthService','CacheFactory', function ($http,$rootScope, $state, $stateParams, $location,AUTH_EVENTS,POWER,AuthService,CacheFactory) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            /*添加转圈动画设置*/
            var newdiv,loadDiv;
            newdiv = '<div class="loader color_white" id="loader" style="top:0px;"> <div class="loader_bac"></div> </div>';
            loadDiv = document.createElement('div');
            loadDiv.setAttribute("id","loading_div");
            loadDiv.innerHTML = newdiv;
            document.body.appendChild(loadDiv);

            /*全局http请求缓存，默认存入内存memory,存入内存刷新可重新读取接口*/
            if(!CacheFactory('defaultCache')){
                //CacheFactory.destroyAll()会删除此默认缓存，故每次创建
                $http.defaults.cache = CacheFactory('defaultCache', {
                    maxAge: 60 * 60 * 1000, // Items added to this cache expire after an hour
                    cacheFlushInterval: 24 * 60 * 60 * 1000, // This cache will clear itself every day
                    deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
                });
            }

            //路由监听事件  
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                console.log("toState",toState)
                loadCart(true, "loader");;//加载转圈
                /*首页不返回登录页*/
                if(toState.name == "login" && fromState.name == "conversation.conversation" && AuthService.isAuthenticated()){
                    loadCart(false, "loader");
                    event.preventDefault();
                }
                /*配置每个页面权限*/
                if(POWER[toState.name]){
                    toState.data = {
                        authorizedRoles:[POWER[toState.name]],
                    }
                }else {
                    toState.data = {
                        authorizedRoles:[POWER.default],
                    }
                }
                /*判断地址是否需要拦截*/
                var clude = false;//需要拦截值false
                for(var i = 0;i < exclude_state.length;i++){
                    if(toState.name == exclude_state[i]){
                        clude = true;//不需要拦截值true
                        break;
                    }
                }
                /*判断是否是无需权限页面*/
                var needpower = true;
                if(toState.data.authorizedRoles[0] == "*"){
                    needpower = false;
                }
                /*限制无权限用户无法进入页面*/
                // if(toState.data && clude == false){
                var authorizedRoles = toState.data.authorizedRoles;
                if(clude == false && needpower == true){
                    console.log("跳转到\""+toState.name+"\"页面需要用户权限",authorizedRoles)
                    if (!AuthService.isAuthorized(authorizedRoles)) {
                        loadCart(false, "loader");
                        event.preventDefault();
                        if (AuthService.isAuthenticated()) {
                            // user is not allowed
                            console.log("【user is not allowed】");
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        } else {
                            // user is not logged in
                            console.log("【user is not logged in】");
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        }
                    }
                }
                /*简单处理退出登录后返回到之前页面*/
                if(toState.name == "settings" && fromState.name == "login"){
                    loadCart(false, "loader");
                    event.preventDefault();
                    $state.go("login");
                }


            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                console.log("跳转Success")
                loadCart(false, "loader")
             });

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
                console.log("跳转Error")
                loadCart(false, "loader"); });

             /* if (toState.name == "newlogin") {
             //获取参数之后可以调请求判断需要渲染什么页面，渲染不同的页面通过 $location 实现  
             if (toParams.userid) {
             console.log("进入阻止进程")
             $location.path();//获取路由地址  
             $location.path('/validation').replace();
             event.preventDefault()//可以阻止模板解析  
             }
             }*/


            /* // $viewContentLoading- 当视图开始加载，DOM渲染完成之前触发，该事件将在$scope链上广播此事件。  
             $rootScope.$watch('$viewContentLoading', function (event, viewConfig) {
             // console.log('模板加载完成前');
             });*/

            /*//$viewContentLoaded- 当视图加载完成，DOM渲染完成之后触发，视图所在的$scope发出该事件。  
             $rootScope.$watch('$viewContentLoaded', function (event) {
             // console.log('模板加载完成后');
             });*/

        }])
    .config(
        ['$provide','$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($provide,$httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
                $httpProvider.defaults.withCredentials = true;
                $httpProvider.interceptors.push(['$injector', function ($injector) {
                    return $injector.get('MyInterceptor');
                }]);

                /*修改value，获取全部权限*/
                /*$provide.decorator('POWER',['$delegate','MallofflineAuthdictService',function ($delegate,MallofflineAuthdictService) {
                    MallofflineAuthdictService.getallauth().$promise.then(function (data) {
                        for(var i = 0;i < data.length;i++){
                            if(data[i].authkey){
                                $delegate[data[i].authkey] = data[i].authid.toString();
                            }
                        }
                    })
                    return $delegate;
                }]);*/

                $urlRouterProvider.otherwise('/login');
                if(window.cordova){
                    $locationProvider.html5Mode(false);

                }else {
                    $locationProvider.html5Mode(html5mode);
                }
            }
        ]
    )
    .factory('MyInterceptor', ['$rootScope','$q','HTTP_ERROR',function($rootScope,$q,HTTP_ERROR) {
        /*排除需要单独处理的接口*/
        function match_httpurl(url,method) {
            var result = false;
            for(var i = 0;i < httpurl_list.length;i++){
                if((url.indexOf(httpurl_list[i].url) > -1) && (method == httpurl_list[i].method)){
                    result = true;
                    break;
                }
            }
            return result;
        }
        return {
            /*// 可选，拦截成功的请求
             request: function(config) {
             // 进行预处理
             // ...
             return config || $q.when(config);
             },*/

            // 可选，拦截失败的请求
            requestError: function (rejection) {
                // 对失败的请求进行处理
                // ...
                console.log("对失败的请求进行处理")
                var res = match_httpurl(rejection.config.url,rejection.config.method)
                if (!res) {
                    console.log("拦截失败的请求,不做处理")
                }
                return $q.reject(rejection);
            },


            /* // 可选，拦截成功的响应
             response: function(response) {
             // 进行预处理
             // ....
             return response || $q.when(reponse);
             },*/

            // 可选，拦截失败的响应
            responseError: function (rejection) {
                console.log(rejection)
                // 对失败的响应进行处理
                // ...
                var res = match_httpurl(rejection.config.url,rejection.config.method)
                if (!res) {
                    console.log("进入对失败的响应进行处理",rejection)
                    /*不需要单独处理地址的广播事件*/
                    $rootScope.$broadcast(HTTP_ERROR.httpError, rejection);
                }
                /*else if (rejection.config.url == httpurl_list[0]) {
                 /!*登录地址单独广播*!/
                 $rootScope.$broadcast({
                 /!*以下作为参考写法，使用constant的不可变对象处理各种报错，具体请根据实际情况，
                 也可不广播此事件在调接口处单独处理，httpurl_list[0]设置的是测试登录地址
                 401: AUTH_EVENTS.notAuthenticated,
                 403: AUTH_EVENTS.notAuthorized,
                 419: AUTH_EVENTS.sessionTimeout,
                 440: AUTH_EVENTS.sessionTimeout*!/
                 }[response.status], response);
                 }*/

                return $q.reject(rejection);
            }
        };
    }]);