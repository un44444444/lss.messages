angular.module('module.template')
    .controller('TemplateSidebarController', TemplateSidebarController)
;

// Sidebar 控制器
TemplateSidebarController.$inject = ['$scope','$rootScope','$state','UPDATE_MSG','CookieService','LocalstorageService','IMSdkService','UPDATE_SIDERBAR','UPDATE_TOPBAR'];
function TemplateSidebarController($scope,$rootScope,$state,UPDATE_MSG,CookieService,LocalstorageService,IMSdkService,UPDATE_SIDERBAR,UPDATE_TOPBAR) {
    console.log("进入siderbar控制器")
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.menu-close', ['waves-block', 'waves-float']);
    })

    var vm = this;
    var userid = CookieService.getObject('currentUser').userid;
    var name = CookieService.getObject("currentUser").username;//当前账号用户名
    var css = "messageleft";//初始化消息样式
    var getmessage = [];//存储接收的解析后消息
    vm.sidebars = sidebars_list[$state.current.name.split('.')[0]];//菜单内容填充
    vm.userid = userid;
    vm.state = $state;//路由活跃样式控制
    vm.go = go;//点击跳转路由
    vm.close = close;//关闭会话
    var activesiderbar = CookieService.getObject("activesiderbar");//获取当前活跃页面
    if(!LocalstorageService.getItemObj(userid)){
        LocalstorageService.setItemObj(userid,{
            buddy:{},
            group:{},
            chatroom:{}
        });
    }
    var msgobj = LocalstorageService.getItemObj(userid);//当前用户的全部会话


    IMSdkService.onChatMessage(function(fromtype, chatid, message) {
        console.log("IMSdkService.onChatMessage() fromtype=", fromtype, ", chatid=", chatid, ", message=", message);

        //增加提示消息数目
        var needupdatestate = ["conversation.conversation","conversation.groupconversation"];
        var needupdatestatus = false;
        for(var i = 0;i < needupdatestate.length;i++){
            if($state.current.name == needupdatestate[i]){
                needupdatestatus = true;
            }
        }
        if((chatid != $state.params.chatid) && needupdatestatus){
            for(var i = 0;i < sidebars_list.conversation.length;i++){
                if(sidebars_list.conversation[i].chatid.toString() == chatid){
                    sidebars_list.conversation[i].num += 1;
                    sidebars_list.conversation[i].truenum += 1;
                    console.log(sidebars_list[$state.current.name.split('.')[0]])
                    $scope.$apply(function () {
                        vm.sidebars = sidebars_list[$state.current.name.split('.')[0]];
                    })
                    //广播更新topbarTruenum
                    $rootScope.$broadcast(UPDATE_TOPBAR.topbarTruenum);
                    break;
                }
            }
        }else if(!needupdatestatus){
            for(var i = 0;i < sidebars_list.conversation.length;i++){
                if(sidebars_list.conversation[i].chatid == chatid){
                    sidebars_list.conversation[i].num += 1;
                    sidebars_list.conversation[i].truenum += 1;
                    $scope.$apply(function () {
                        vm.sidebars = sidebars_list[$state.current.name.split('.')[0]];
                    })
                    //广播更新topbarTruenum
                    $rootScope.$broadcast(UPDATE_TOPBAR.topbarTruenum);
                    break;
                }
            }
        }

        message.body.chatmsgid = message.chatmsgid;
        message.body.msgid = message.msgid;
        message.body.status = message.status;
        message.body.sender = message.sender;
        message.body.chatid = chatid;
        message.body.createtime = message.createtime;
        getmessage=message.body;
        // 收到好友聊天消息
        if (fromtype === "1") {
            console.log("IMSdkService.onChatMessage() 收到好友聊天消息, chatid=", chatid);

            //自己发送的消息样式处理为显示在右侧
            cssChange(message.sender);

            msgobj.buddy = addMessage(getmessage,chatid,msgobj.buddy,css);
            LocalstorageService.setItemObj(userid,msgobj);//更新存储


            $rootScope.$broadcast(UPDATE_MSG.buddyMsg, getmessage);
        }
        // 收到群组聊天消息
        else if (fromtype === "2") {
            console.log("IMSdkService.onChatMessage() 收到群组聊天消息, chatid=", chatid);

            //自己发送的消息样式处理为显示在右侧
            cssChange(message.sender);

            msgobj.group = addMessage(getmessage,chatid,msgobj.group,css);
            LocalstorageService.setItemObj(userid,msgobj);//更新存储

            $rootScope.$broadcast(UPDATE_MSG.groupMsg, getmessage);
        }
        // 收到聊天室聊天消息
        else if (fromtype === "3") {
            console.log("IMSdkService.onChatMessage() 收到聊天室聊天消息, chatid=", chatid);



            $rootScope.$broadcast(UPDATE_MSG.chatroomMsg, getmessage);
        }
        else {
            console.log("IMSdkService.onChatMessage() 收到未知类型聊天消息");
        }
        //  client.end();//关闭连接
    });

    //对接收到的消息显示样式处理
    function cssChange(sender) {
        if(sender === userid){
            css = 'messageright';
        }else {
            css = 'messageleft';
        }
    }

    //点击跳转路由
    function go(siderbar) {
        switch (siderbar.type){
            case "recent_buddy" :
                activesiderbar.recent = siderbar;
                CookieService.putObject("activesiderbar",activesiderbar);
                $state.go(siderbar.sref,{
                    userid:siderbar.userid,
                    chatid:siderbar.chatid,
                    name:siderbar.name,
                    biztype:siderbar.biztype,
                });
                break;
            case "recent_group" :
                activesiderbar.recent = siderbar;
                CookieService.putObject("activesiderbar",activesiderbar);
                $state.go(siderbar.sref,{
                    groupid:siderbar.groupid,
                    chatid:siderbar.chatid,
                    name:siderbar.name,
                    biztype:siderbar.biztype,
                });
                break;
            case "buddy" :
                activesiderbar.buddy = siderbar;
                CookieService.putObject("activesiderbar",activesiderbar);
                $state.go(siderbar.sref,{
                    userid:siderbar.userid,
                    chatid:siderbar.chatid,
                    name:siderbar.name,
                });
                break;
            case "group" :
                activesiderbar.group = siderbar;
                CookieService.putObject("activesiderbar",activesiderbar);
                $state.go(siderbar.sref,{
                    groupid:siderbar.groupid,
                    chatid:siderbar.chatid,
                    name:siderbar.name,
                    notify:siderbar.notify,
                });
                break;

        }

    }

    function close(index) {
        console.log(index);
        //TODO
        alert("暂时没做")
    }

    //接收广播更新sidebars_list
    $scope.$on(UPDATE_SIDERBAR.siderbarList,function (event,info) {
        console.log(info)
        for(var i = 0;i < sidebars_list.conversation.length;i++){
            if(sidebars_list.conversation[i].chatid == info.chatid){
                sidebars_list.conversation[i].num = 0;
                sidebars_list.conversation[i].truenum = 0;
                vm.sidebars = sidebars_list[$state.current.name.split('.')[0]];
                break;
            }
        }
    })
}
