/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.conversation')
    .controller('ConversationController', ConversationController)
    .controller('ConversationBlankController', ConversationBlankController)
;

ConversationController.$inject = ['$scope','$rootScope','$state','$stateParams','CookieService','LocalstorageService','UPDATE_MSG','AUTH_EVENTS','HTTP_ERROR','ErrorService','IMSdkService','MqhpMessageService','MqhpUserchatmsgService'];
ConversationBlankController.$inject = [];

function ConversationController($scope,$rootScope,$state,$stateParams,CookieService,LocalstorageService,UPDATE_MSG,AUTH_EVENTS,HTTP_ERROR,ErrorService,IMSdkService,MqhpMessageService,MqhpUserchatmsgService) {
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.google_waves', ['waves-button', 'waves-float']);
        //自动滚动到最新信息
        pagebody.scrollTop = pagebody.scrollHeight;
        //更新消息游标
        /*var newcurrent_time = Date.parse(new Date());
        var newupdateinfo = {
            uid : userid,
            readmsgid : vm.messages.chatmsgid,
            readtime : newcurrent_time,
            chatid : chatid,
            receivemsgid : info.chatmsgid
        }
        MqhpUserchatmsgService.updateVernier(userid,chatid,newupdateinfo).$promise.then(function (successinfo) {
            console.log("更新已读消息成功",successinfo)
        },function (errorinfo) {
            console.log("更新已读消息失败",errorinfo)
        })*/
    })
    var vm = this;
    var pagebody = document.getElementById('pagebody');//自动滚动到最新信息设置参数
    var friendid = $stateParams.userid;
    var userid = CookieService.getObject("currentUser").userid;
    var name = CookieService.getObject("currentUser").username;//当前账号用户名
    var chatid = $stateParams.chatid;
    var getContentBuffer = "";//设置发送消息内容用于发送
    var avatar="img/defauleAvatar.png";//用户头像
    vm.name = $stateParams.name;//标题名设置
    vm.sendContent = sendContent;//发送按钮
    vm.keydown = keydown;//发送键盘输入enter事件
    vm.messages = LocalstorageService.getItemObj(userid).buddy ? LocalstorageService.getItemObj(userid).buddy[chatid] : function () {
        LocalstorageService.getItemObj(userid).buddy = {};
        return LocalstorageService.getItemObj(userid).buddy[chatid];
    };//页面聊天信息


    //监听好友消息
    $scope.$on(UPDATE_MSG.buddyMsg,function (event,info) {
        console.log(chatid,info)
        if(chatid === info.chatid){
            $scope.$apply(function(){
                var newmsglist = LocalstorageService.getItemObj(userid).buddy[chatid];
                vm.messages ? vm.messages.push(newmsglist[newmsglist.length-1]) : function () {
                    vm.messages = [];
                    vm.messages.push(newmsglist[newmsglist.length-1]);
                }();
                //更新消息游标
                var current_time = Date.parse(new Date());
                var updateinfo = {
                    uid : userid,
                    readmsgid : info.chatmsgid,
                    readtime : current_time,
                    chatid : chatid,
                    receivemsgid : info.chatmsgid
                }
                MqhpUserchatmsgService.updateVernier(userid,chatid,updateinfo).$promise.then(function (successinfo) {
                    console.log("更新已读消息成功",successinfo)
                },function (errorinfo) {
                    console.log("更新已读消息失败",errorinfo)
                })
                //自动滚动到最新信息
                angular.element(document).ready(function () {
                    pagebody.scrollTop = pagebody.scrollHeight;
                })
            })
        }
    })


    //发送消息
    function sendContent(){

        getContentBuffer = {
            name:name,
            content:vm.content,
            avatar:avatar
        }
        MqhpMessageService.sendMessage(chatid,1, getContentBuffer);//参数chatid, msgtype（1:text 2:image 3:语音）, content
        vm.content="";

    }

    function keydown(e) {
        var keycode = window.event?e.keyCode:e.which;
        if(keycode === 13){
            sendContent();
        }
    }
}

function ConversationBlankController() {
    var vm = this;
}