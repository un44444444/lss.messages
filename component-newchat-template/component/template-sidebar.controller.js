angular.module('module.template')
    .controller('TemplateSidebarController', TemplateSidebarController)
;

// Sidebar 控制器
TemplateSidebarController.$inject = ['$rootScope','$state','UPDATE_MSG','CookieService','LocalstorageService','IMSdkService'];
function TemplateSidebarController($rootScope,$state,UPDATE_MSG,CookieService,LocalstorageService,IMSdkService) {
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
    if(!LocalstorageService.getItemObj(userid)){
        LocalstorageService.setItemObj(userid,{
            buddy:{},
            group:{},
            chatroom:{}
        });
    }
    var msgobj = LocalstorageService.getItemObj(userid);//当前用户的全部会话



    IMSdkService.onChatMessage(function(fromtype, fromid, message) {
        console.log("IMSdkService.onChatMessage() fromtype=", fromtype, ", fromid=", fromid, ", message=", message);
        getmessage=message.text.split("~&");

        // 收到好友聊天消息
        if (fromtype == "chat") {
            console.log("IMSdkService.onChatMessage() 收到好友聊天消息, fromid=", fromid);


            $rootScope.$broadcast(UPDATE_MSG.buddyMsg);
        }
        // 收到群组聊天消息
        else if (fromtype == "group") {
            console.log("IMSdkService.onChatMessage() 收到群组聊天消息, fromid=", fromid);

            //自己发送的消息样式处理为显示在右侧
            cssChange();

            msgobj.group = addMessage(getmessage,fromid,msgobj.group,css);
            LocalstorageService.setItemObj(userid,msgobj);//更新存储

            $rootScope.$broadcast(UPDATE_MSG.groupMsg, fromid);
        }
        // 收到聊天室聊天消息
        else if (fromtype == "chatroom") {
            console.log("IMSdkService.onChatMessage() 收到聊天室聊天消息, fromid=", fromid);



            $rootScope.$broadcast(UPDATE_MSG.chatroomMsg);
        }
        else {
            console.log("IMSdkService.onChatMessage() 收到未知类型聊天消息");
        }
        //  client.end();//关闭连接
    });

    //对接收到的消息显示样式处理
    function cssChange() {
        if(getmessage[0] == name){
            css = 'messageright';
        }else {
            css = 'messageleft';
        }
    }
}
