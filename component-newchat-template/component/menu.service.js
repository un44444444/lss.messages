/**
 * Created by 黄忠园 on 2017/12/12.
 */
angular.module('service.menu', [
])
    .service('MenuService', MenuService);
MenuService.$inject = ['CookieService', 'LocalstorageService','MqhpFriendService','MqhpUsergroupService','MqhpUserchatmsgService','IMSdkService'];
/*获取好友列表，群组列表，最近消息列表*/
function MenuService(CookieService,LocalstorageService,MqhpFriendService,MqhpUsergroupService,MqhpUserchatmsgService,IMSdkService) {

    var body = {};//暂时存储解析出的消息body
    var getmessage = [];//存储接收的解析后消息
    var css = "messageleft";//初始化消息样式
    var msgobj = {};//当前用户的全部会话
    var hasrun = false;//标识该初始化菜单未执行
    var friendchatidList = [];//存储好友会话chatid用于订阅
    var groupchatidList = [];//存储群组会话chatid用于订阅
    var chatroomchatidList = [];//存储聊天室会话chatid用于订阅
    var announcechatidList = [];//存储公告会话chatid用于订阅

    this.init = function (userid,func) {
        if(LocalstorageService.getItemObj(userid)){
            msgobj = LocalstorageService.getItemObj(userid);//当前用户的全部会话
        }else {
            LocalstorageService.setItemObj(userid,{
                buddy:{},
                group:{},
                chatroom:{}
            });//存储全部消息
            msgobj = LocalstorageService.getItemObj(userid);//当前用户的全部会话
        }

        //初始化菜单未执行则初始化菜单
        if(!hasrun){


            MqhpFriendService.getFriendList(userid).$promise.then(function (friendlist) {
                for(var i = 0;i < friendlist.length;i++){
                    friendchatidList.push(friendlist[i].chatid);
                    var sidebar_template = {
                        name: "第"+i+"个朋友",
                        imgurl: "/lss.messages/images/1.jpg",
                        sref: "buddy.buddyinfo",
                        chatid:friendlist[i].chatid,
                        frienduid:friendlist[i].frienduid,
                        type:"buddy"
                    }
                    sidebars_list.buddy.push(sidebar_template);
                }
                console.log("好友列表：",sidebars_list.buddy)
            }).then(function () {
                MqhpUsergroupService.getGroupList(userid).$promise.then(function (grouplist) {
                    for(var i = 0;i < grouplist.length;i++){
                        groupchatidList.push(grouplist[i].chatid);
                        var sidebar_template = {
                            name: "第"+i+"个群组",
                            imgurl: "/lss.messages/images/1.jpg",
                            sref: "group.groupinfo",
                            chatid:grouplist[i].chatid,
                            groupid:grouplist[i].groupid,
                            notify:grouplist[i].notify,
                            type:"group"
                        }
                        sidebars_list.group.push(sidebar_template)
                    }
                    console.log("群列表：",sidebars_list.group)
                });
            }).then(function () {
                var i,j,k,n;
                MqhpUserchatmsgService.isreadByUid(userid,false).$promise.then(function (recentlist) {
                    console.log(recentlist)
                    for (i = 0; i < recentlist.length; i++) {



                        //判断是否好友会话
                        for(j = 0;j < sidebars_list.buddy.length;j++){
                            if(recentlist[i].chatid === sidebars_list.buddy[j].chatid){
                                var sidebar_template = {};
                                sidebar_template.chatid = sidebars_list.buddy[j].chatid,
                                sidebar_template.frienduid = sidebars_list.buddy[j].frienduid,
                                sidebar_template.imgurl = sidebars_list.buddy[j].imgurl,
                                sidebar_template.name = sidebars_list.buddy[j].name,
                                sidebar_template.sref = "conversation.conversation";
                                sidebar_template.biztype = 1;
                                sidebar_template.num = recentlist[i].chatMessages.length;
                                sidebar_template.truenum = recentlist[i].chatMessages.length;
                                sidebar_template.type = "recent_buddy";
                                sidebars_list.conversation.push(sidebar_template);

                                //更新存储
                                for(n = 0;n < recentlist[i].chatMessages.length;n++){
                                    updateStorage(recentlist[i].chatid,recentlist[i].chatMessages[n],userid,"buddy")
                                }

                                break;
                            }
                        }
                        //判断是否是群会话
                        if(j === sidebars_list.buddy.length){

                            for(k = 0;k < sidebars_list.group.length;k++){
                                if(recentlist[i].chatid === sidebars_list.group[k].chatid){
                                    var sidebar_template = {};
                                    sidebar_template.chatid = sidebars_list.group[k].chatid;
                                    sidebar_template.groupid = sidebars_list.group[k].groupid;
                                    sidebar_template.imgurl = sidebars_list.group[k].imgurl;
                                    sidebar_template.name = sidebars_list.group[k].name;
                                    sidebar_template.notify = sidebars_list.group[k].notify;
                                    sidebar_template.sref = "conversation.groupconversation";
                                    sidebar_template.biztype = 2;
                                    sidebar_template.num = recentlist[i].chatMessages.length;
                                    sidebar_template.truenum = recentlist[i].chatMessages.length;
                                    sidebar_template.type = "recent_group";
                                    sidebars_list.conversation.push(sidebar_template);

                                    //更新存储
                                    for(n = 0;n < recentlist[i].chatMessages.length;n++){
                                        updateStorage(recentlist[i].chatid,recentlist[i].chatMessages[n],userid,"group");
                                    }
                                    break;
                                }

                            }


                        }
                    }
                    console.log("最近未读会话列表",sidebars_list.conversation);
                    //创建存储活跃页面
                    if(!CookieService.getObject("activesiderbar")){
                        CookieService.putObject("activesiderbar",{
                            recent:{},
                            buddy:{},
                            group:{}
                        })
                    }
                    hasrun = true;//标识菜单初始化完成
                    if(typeof func == "function"){
                        return func(friendchatidList,groupchatidList,chatroomchatidList,announcechatidList);
                    }

                },function () {

                })
            })
        }
    }




    function updateStorage(chatid,messages,userid,type) {
        // console.log(messages)
        if(messages.message.senduid == userid){
            css = 'messageright';
        }else {
            css = 'messageleft';
        }
        body = JSON.parse(messages.message.body);
        getmessage = body;
        getmessage.chatid = messages.chatid;
        getmessage.chatmsgid = messages.chatmsgid;
        getmessage.msgid = messages.msgid;
        getmessage.createtime = messages.message.createtime;
        getmessage.status = messages.status;
        getmessage.sender = messages.message.senduid;

        if(msgobj[type][chatid.toString()]){
            //超过99条存储信息处理
            if(msgobj[type][chatid.toString()].length == 99){
                msgobj[type][chatid.toString()].splice(0,1);
            }

            //重复未读消息处理
            if(parseInt(msgobj[type][chatid.toString()][msgobj[type][chatid.toString()].length - 1].chatmsgid) < parseInt(messages.chatmsgid)){
                msgobj[type] = addMessage(getmessage,getmessage.chatid,msgobj[type],css);
                LocalstorageService.setItemObj(userid,msgobj);//更新存储
            }

        }else {

                msgobj[type] = addMessage(getmessage,getmessage.chatid,msgobj[type],css);
                LocalstorageService.setItemObj(userid,msgobj);//更新存储


        }
    }
}