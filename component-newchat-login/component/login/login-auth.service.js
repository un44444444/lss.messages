/**
 * Created by 黄忠园 on 2017/8/28.
 */
angular.module('service.auth', [
    'ngResource',
    'ngCookies'
])
    .service('AuthService', AuthService)
AuthService.$inject = ['$http', '$resource', '$cookies', 'CookieService', 'CacheService']
function AuthService($http, $resource, $cookies, CookieService, CacheService) {
    var authService = {};

    /*登录*/
    authService.ready = function (user, success, error) {
        var resource = $resource(authurl + 'login', {}, {
            login: {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data, headersGetter) {
                    var str = [];
                    for (var d in data)
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                    return str.join("&");
                },
                cache:false
            }
        });
        return resource.login({}, user, success, error);
    };

    authService.login = function (user, success, error) {
        authService.ready(user, function (res) {
            var info = {};
            info.userid = res.userid;
            info.phone = user.phone;
            info.username = res.username;

            if (typeof (success) == "function") {
                return success(info);
            }
        }, function (error_info) {
            if (typeof (error) == "function") {
                return error(error_info);
            }
        })
    }

    /*是否认登录*/
    authService.isAuthenticated = function () {
        if (CookieService.getObject("currentUser")) {
            return !!CookieService.getObject("currentUser").userId;
        } else {
            return false;
        }
    };

    /*是否具有权限*/
    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        var pass = false;
        if(CookieService.getObject("currentUser")){
            var userPower = CookieService.getObject("currentUser").userPower;
            for (var mypow in userPower) {
                for (var pow in authorizedRoles) {
                    if (userPower[mypow] == authorizedRoles[pow]) {
                        pass = true;
                        break;
                    }
                }
            }
        }
        var res = (authService.isAuthenticated() && pass);
        return res;
    };

    /*获取当前用户cookie信息*/
    authService.getCurrentUser = function () {
        return CookieService.getObject("currentUser");
    };

    return authService;
}