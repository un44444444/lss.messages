/**
 * Created by 黄忠园 on 2017/9/13.
 */

angular.module('module.login')
    .controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope','$state','$rootScope','AUTH_EVENTS','HTTP_ERROR'];

function RegisterController($scope,$state,$rootScope,AUTH_EVENTS,HTTP_ERROR) {
    var vm = this;


    /*初始化开始*/
    vm.messageVisible = false;//弹窗视图初始化
    $scope.$on(HTTP_ERROR.httpError,function (ev,error_info) {
        for(var key in error_info.data) {
            //遍历对象，key即为key，error_info[key]为当前key对应的值
            for(var i = 0;i < error_list.length;i++){
                if(key == error_list[i]){
                    vm.messageVisible = true;
                    vm.message = error_info.data[key];
                    break;
                }
            }
        }
    });
    $scope.$on(AUTH_EVENTS.loginFailed,function (ev,error_info) {
        for(var key in error_info.data) {
            //遍历对象，key即为key，error_info[key]为当前key对应的值
            for(var i = 0;i < error_list.length;i++){
                if(key == error_list[i]){
                    vm.messageVisible = true;
                    vm.message = error_info.data[key];
                    break;
                }
            }
        }
    });
    /*关闭弹窗*/
    vm.cancel = function () {
        vm.messageVisible = false;
    }
    /*弹窗确认按钮*/
    vm.sure = function () {
        vm.messageVisible = false;
    }
    /*初始化结束*/


    //验证手机号方法
    function checkphone(phone) {
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (phone == ''||phone==undefined) {
            vm.message = "手机号码不能为空！";
            vm.messageVisible = true;
            $("#phone").focus();
        } else if (phone.length != 11) {
            vm.message = "请输入有效的手机号码！";
            vm.messageVisible = true;
            $("#phone").focus();
        } else if (!myreg.test(phone)) {
            vm.message = "请输入有效的手机号码！";
            vm.messageVisible = true;
            $("#phone").focus();
        }
        else{
            return "success";
        }
    }
    
    
}