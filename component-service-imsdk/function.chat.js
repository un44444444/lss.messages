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

//显示未读取消息的条数
function viewCount(toname,name,countArray){
    if (toname!=name){
        if (countArray[name]==null)
            countArray[name]="";
        if (countArray[name]==""){
            countArray[name]=1;
        }else {
            countArray[name]=countArray[name]+1;
        }
    }else {
        countArray[name]="";
    }
    return countArray;
}