(function() {
    'use strict';
    angular
        .module('app.logininterface', [])
        .controller('LoginInterfaceController', LoginInterfaceController);

    // 控制器依赖
    LoginInterfaceController.$inject = ['$scope','$http','$modalInstance','MessageMqttjsService'];
    // 聊天控制器
    function LoginInterfaceController($scope,$http,$modalInstance,MessageMqttjsService){

        $scope.login=function(){
            var userInfo={"name":$scope.name, "pwd":$scope.pwd};
            $http.post("http://localhost:8080/user/",userInfo).success(function(response) {
                $modalInstance.close(response);
            })
        }

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel'); // 退出
        }
    }


})();
