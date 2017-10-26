(function() {
    'use strict';

angular
    .module('app.chat')
    .controller('ChatController', ChatController);

    // 控制器依赖
    ChatController.$inject = ['$scope','$http','$modal','MessageMqttjsService'];
    // 聊天控制器
    function ChatController($scope,$http,$modal,MessageMqttjsService){
        var client=MessageMqttjsService.connect();
        var getTopic="";
        var arr=new Array();
        var getContentBuffer="";
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
        //document.getElementById("btn_send").focus();//获取按钮焦点

        //订阅聊天室
        client.subscribe("聊天室");
        //监听他人发过来的消息
        client.on("message", function(topic, payload) {
            var getname=payload.toString().split("~&");
            if (topic==$scope.user){
                arr=addMessage(getname[1],getname[0],"backself","backtext",getname[0],getname[2],arr);
                $scope.$apply(function(){
                    if ($scope.toname==getname[0])
                        $scope.messages=viewMessage($scope.toname,getname[0],arr,getname[0]);
                    $scope.countArray=viewCount($scope.toname,getname[0],$scope.countArray);
                });
            }else {
                if(payload.toString()!=getContentBuffer){//显示聊天室不是自己的消息
                    arr=addMessage(getname[1],getname[0],"backself","backtext",topic,getname[2],arr);
                    $scope.$apply(function(){
                        $scope.messages=viewMessage($scope.toname,topic,arr,topic);
                        $scope.countArray=viewCount($scope.toname,topic,$scope.countArray);
                    });
                }
            }
            //  client.end();//关闭连接
        });

        //发送消息
        $scope.sendContent =function(){
            getContentBuffer=$scope.user+"~&"+$scope.s_content+"~&"+$scope.avatar;
            client.publish($scope.toname, getContentBuffer);//发布
            arr=addMessage($scope.s_content,"","self","text",$scope.toname,$scope.avatar,arr);
            $scope.messages=arr[$scope.toname];
            $scope.s_content="";
        };

        //用户登录
        $scope.open = function(size) {
            var modalInstance = $modal.open({

                templateUrl : loginroom_viewurl + '/login.html',
                controller: 'LoginController',
                size : size, //大小配置
                resolve : {

                }

            })

        };

        //切换窗口初始化
        $scope.setToName=function(n){
            $scope.toname=n;
            $scope.s_content="";
            $scope.messages=arr[$scope.toname];
            $scope.countArray=viewCount($scope.toname,$scope.toname,$scope.countArray);
        };

        //获取好友或群组或最近联系列表列表
        $scope.getFriendOrGroupList=function(index,type){
            $scope.barArrays=isBar($scope.barArrays,index);
            if(type=="好友列表"){
                //获取好友列表
                $http.get("http://localhost:8080/friend?userid="+$scope.userid).success(function(response) {
                    $scope.friends = response;
                });
            }else if(type=="群组列表"){
                //获取群组列表
                $http.get("http://localhost:8080/group?userid="+$scope.userid).success(function(response) {
                    $scope.friends = response;
                });
            }else if(type=="最近通讯列表"){
                $scope.friends = [];
            }

            $scope.isCurrent("聊天室");
            $scope.toname="聊天室";
        };

        //导航列表按钮背景切换
        $scope.isCurrent = function(index){
            $scope.bg = [];
            $scope.bg[index] = 'active';
        };

        //订阅自己添加额群组
        function subMyGroup(){
            $http.get("http://localhost:8080/group?userid="+$scope.userid).success(function(response) {
                for (var i=0;i<response.length;i++){
                    client.subscribe(response[i].name);
                }
            });
        }

    }

})();
