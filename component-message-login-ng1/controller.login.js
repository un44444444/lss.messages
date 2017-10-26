(function() {
    'use strict';
angular
      .module('app.login')
      .controller('LoginController', LoginController);

    // 控制器依赖
    LoginController.$inject = ['$scope','$http','$modal','MessageMqttjsService'];
    // 聊天控制器
    function LoginController($scope,$http,$modal,MessageMqttjsService){

        $scope.countArray=new Array();//计数未接收消息数组
        $scope.user="无";//用户名
        $scope.userid=0;//用户id
        $scope.toname="聊天室";//发生消息的对象
        $scope.messages = []; //发生接收的消息
        $scope.bg = {"聊天室":"active"}; //按钮背景颜色
        $scope.textcorlor=[{0:"textbgcolor"}]
        $scope.avatar="img/defauleAvatar.png"; //头像
        $scope.barArrays= [{avatar:"img/zjlx2.png",type:"最近通讯列表"},{avatar:"img/hy1.png",type:"好友列表"},{avatar:"img/qz1.png",type:"群组列表"}];
        $scope.settings=[{name:"账号设置"},{name:"通用设置"},{name:"快捷设置"},{name:"聊天备份"},{name:"关于"}];
        $scope.loginOrRegist="登  录";
        $scope.loginOrRegistModal="#myModal";


        //用户登录
        $scope.logininterface = function(size) {
            var modalInstance = $modal.open({

                templateUrl : loginroom_viewurl + '/loginInterface.html',
                controller: 'LoginInterfaceController',
                size : size, //大小配置
            })
            modalInstance.result.then(function(response){
                if (response.length!=0){
                    $('#myModal').modal('hide');
                    $scope.avatar=response.avatar;
                    $scope.user=response.name;
                    $scope.userid=response.userid;
                    client.subscribe(response.name); //订阅自己
                    subMyGroup();//订阅添加的群组
                    $scope.barArrays= [{avatar:"img/zjlx2.png",type:"最近通讯列表"},{avatar:"img/hy1.png",type:"好友列表"},{avatar:"img/qz1.png",type:"群组列表"}];
                    $scope.loginOrRegist="退 出 登 录";
                    $scope.loginOrRegistModal="";
                }else {
                    alert('账号或密码错误');
                }
            })
        };

    }


})();
