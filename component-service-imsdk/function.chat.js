/**
 * Created by lsm on 2016/8/3.
 */

//在界面显示发送和接收的消息
function addMessage(message,chatid,allchat,css){//chatid即fromid
    var date=new Date();
    var mytime=date.toLocaleTimeString();
    if (!allchat[chatid+''])
        allchat[chatid+'']=new Array();
    allchat[chatid].push({time:mytime, name:message[0],content:message[1], avatar:message[2], css:css});
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