/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation')
    .controller('GroupconversationController', GroupconversationController)
;

GroupconversationController.$inject = ['$scope','$rootScope','$state','$stateParams','CookieService','LocalstorageService','UPDATE_MSG','AUTH_EVENTS','HTTP_ERROR','ErrorService','IMSdkService','MqhpMessageService'];

function GroupconversationController($scope,$rootScope,$state,$stateParams,CookieService,LocalstorageService,UPDATE_MSG,AUTH_EVENTS,HTTP_ERROR,ErrorService,IMSdkService,MqhpMessageService) {
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.google_waves', ['waves-button', 'waves-float']);
        pagebody.scrollTop = pagebody.scrollHeight;
    })
    var vm = this;
    var pagebody = document.getElementById('pagebody');//自动滚动到最新信息设置参数
    // var chatid = $stateParams.chatid;
    var chatid = 1;
    var userid = $stateParams.userid;
    var name = CookieService.getObject("currentUser").username;//当前账号用户名
    var chatid = $stateParams.chatid;
    var getContentBuffer = "";//设置发送消息内容用于发送
    var getContentBufferList = [];//设置发送消息内容用于本地存储
    var avatar="img/defauleAvatar.png";//用户头像
    vm.name = $stateParams.name;//标题名设置
    vm.sendContent = sendContent;//发送按钮
    vm.messages = LocalstorageService.getItemObj(userid).group ? LocalstorageService.getItemObj(userid).group[chatid] : function () {
        LocalstorageService.getItemObj(userid).group = {};
        return LocalstorageService.getItemObj(userid).group[chatid];
    };//页面聊天信息


    //监听群组消息
    $scope.$on(UPDATE_MSG.groupMsg,function (event,info) {
        if(chatid == info){
            $scope.$apply(function(){
                vm.messages = LocalstorageService.getItemObj(userid).group[chatid];
                //自动滚动到最新信息
                angular.element(document).ready(function () {
                    pagebody.scrollTop = pagebody.scrollHeight;
                })
            })
        }
    })


    //发送消息
    function sendContent(){
        getContentBuffer = name + "~&" + vm.content + "~&" + avatar;
        getContentBufferList = [name,vm.content,avatar]
        //IMSdkService.sendGroupText($scope.toname, getContentBuffer);//发布
        LocalstorageService.getItemObj(userid).group = addMessage(getContentBufferList,chatid,LocalstorageService.getItemObj(userid).group,"messageright");
        LocalstorageService.setItemObj(userid,LocalstorageService.getItemObj(userid));//更新存储
        // IMSdkService.sendGroupText(chatid, getContentBuffer);//发布
        MqhpMessageService.sendMessage(chatid,'text', getContentBuffer);
        vm.content="";
    };

}