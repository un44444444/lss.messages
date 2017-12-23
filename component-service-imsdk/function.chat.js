/**
 * Created by lsm on 2016/8/3.
 */

//在界面显示发送和接收的消息
function addMessage(content,chatid,allchat,css){//chatid即fromid
    var mytime = new Date(parseInt(content.createtime)).toLocaleString();
    if (!allchat[chatid+''])
        allchat[chatid+'']=new Array();
    allchat[chatid].push({
        chatmsgid:content.chatmsgid,
        time:mytime,
        content:content.content,
        msgid:content.msgid,
        name:content.name,
        sender:content.sender,
        avatar:content.avatar,
        css:css
    });
    return allchat;
}

//更新siderbar_list最近未读消息的好友消息
function updatesiderbuddy(chatid) {
    var status = true;
    for(var i = 0;i < sidebars_list.conversation.length;i++){
        if(chatid === sidebars_list.conversation[i].chatid.toString()){
            status = false;
        }
    }
    if(status){
        for(var j = 0;j < sidebars_list.buddy.length;j++){
            if(chatid === sidebars_list.buddy[j].chatid.toString()){
                var sidebar_template = {};
                sidebar_template.chatid = sidebars_list.buddy[j].chatid,
                    sidebar_template.frienduid = sidebars_list.buddy[j].frienduid,
                    sidebar_template.imgurl = sidebars_list.buddy[j].imgurl,
                    sidebar_template.name = sidebars_list.buddy[j].name,
                    sidebar_template.sref = "conversation.conversation";
                sidebar_template.biztype = 1;
                sidebar_template.num = 0;
                sidebar_template.truenum = 0;
                sidebar_template.type = "recent_buddy";
                sidebars_list.conversation.splice(0,0,sidebar_template);
                break;
            }
        }
    }
}
//更新siderbar_list最近未读消息的群消息
function updatesidergroup(chatid) {
    var status = true;
    for(var i = 0;i < sidebars_list.conversation.length;i++){
        if(chatid === sidebars_list.conversation[i].chatid.toString()){
            status = false;
        }
    }
    if(status){
        for(var j = 0;j < sidebars_list.group.length;j++){
            if(chatid === sidebars_list.group[j].chatid.toString()){
                var sidebar_template = {};
                sidebar_template.chatid = sidebars_list.group[j].chatid,
                    sidebar_template.frienduid = sidebars_list.group[j].frienduid,
                    sidebar_template.imgurl = sidebars_list.group[j].imgurl,
                    sidebar_template.name = sidebars_list.group[j].name,
                    sidebar_template.sref = "conversation.groupconversation";
                sidebar_template.biztype = 2;
                sidebar_template.num = 0;
                sidebar_template.truenum = 0;
                sidebar_template.type = "recent_group";
                sidebars_list.conversation.splice(0,0,sidebar_template);
                break;
            }
        }
    }

}