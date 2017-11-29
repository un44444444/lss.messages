/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation')
    .controller('ConversationController', ConversationController)
;

ConversationController.$inject = ['$scope','$state','$stateParams','$rootScope','IMSdkService','AUTH_EVENTS','HTTP_ERROR','ErrorService'];

function ConversationController($scope,$state,$stateParams,$rootScope,IMSdkService,AUTH_EVENTS,HTTP_ERROR,ErrorService) {
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.google_waves', ['waves-button', 'waves-float']);
    })
    var vm = this;
    var userid = $stateParams.userid;
    var chatid = $stateParams.chatid;
    var arr = [];//存储每条消息信息
    vm.userid = userid;
    vm.name = $stateParams.name;//标题名设置

    //发送消息
    $scope.sendContent =function(){
        getContentBuffer=$scope.user+"~&"+$scope.s_content+"~&"+$scope.avatar;
        //IMSdkService.sendGroupText($scope.toname, getContentBuffer);//发布
        IMSdkService.sendGroupText(1, getContentBuffer);//发布
        arr=addMessage($scope.s_content,"","self","text",$scope.toname,$scope.avatar,arr);
        $scope.messages=arr[$scope.toname];
        $scope.s_content="";
    };
}