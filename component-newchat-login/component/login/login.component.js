/**
 * Created by 黄忠园 on 2017/8/29.
 */
angular.module('module.login')
    .component('editableField',{
        template: '<div ng-if="vm.loginformVisible" ng-include="vm.path">',
        bindings: {
            loginformVisible:'<',
            ceshiButton:'&'
        },
        require: {
            // applicationComponent: '^applicationComponent'
        },

        controller:('EditableFieldController', EditableFieldController),
        controllerAs:'vm'

    })
EditableFieldController.$inject = ['$scope','$state','$rootScope','AUTH_EVENTS','AuthService','CookieService','IMSdkService'];
function EditableFieldController($scope,$state,$rootScope,AUTH_EVENTS,AuthService,CookieService,IMSdkService) {
    // this.$onInit = function () {}//component嵌套需要

    var vm = this;
    vm.path = login_viewurl+"view/loginform/loginform.html";
    var showDialog = function () {
        vm.loginformVisible = true;
    };
    var hideDialog = function () {
        vm.loginformVisible = false;
    };


    $scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);

    $scope.$on(AUTH_EVENTS.sessionTimeout, showDialog);

    $scope.$on(AUTH_EVENTS.loginSuccess, hideDialog);


    //*登录按钮*/
    vm.login = function (user) {
        if(!vm.user.username && !vm.user.password){
            vm.message = "账号密码不能为空";
            vm.messageVisible = true;
        }else if(!vm.user.username){
            vm.message = "账号不能为空";
            vm.messageVisible = true;
        }else if(!vm.user.password){
            vm.message = "密码不能为空";
            vm.messageVisible = true;
        }else if(checkphone(vm.user.username) != true){
            vm.message = checkphone(vm.user.username);
            vm.messageVisible = true;
        }
        else {
            user.password = hex_hmac_md5("fjswxxjsyxgstyrz", user.password);
            user.acctype = 1;
            AuthService.login(user,function (userinfo) {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                IMSdkService.init();
            }, function (error) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed,error);
            });

        }
    };
    javascript:;//点击链接后不做任何事情 伪协议，少写的好 http://www.jb51.net/article/37904.html


}