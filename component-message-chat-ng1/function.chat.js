/**
 * Created by lsm on 2016/8/3.
 */
//返回显示的消息
function viewMessage(toname,topic,arr,index){
    if(toname==topic){//判断当前窗口与topic是否相对应
        return arr[index];
    }
}

//在界面显示发送和接收的消息
function addMessage(message,name,messagetype,boxtype,index,avatar,arr){
    var date=new Date();
    var mytime=date.toLocaleTimeString();
    if (arr[index]==null)
        arr[index]=new Array();
    arr[index].push({time:mytime, content:message, avatar:avatar, messagetype:messagetype,name:name,boxtype:boxtype});
    return arr;
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

//导航栏图标切换
function isBar(barArrays,index){
    var imgUrls=["img/zjlx2.png","img/hy2.png","img/qz2.png"];
    barArrays= [{avatar:"img/zjlx1.png",type:"最近通讯列表"},{avatar:"img/hy1.png",type:"好友列表"},{avatar:"img/qz1.png",type:"群组列表"}];
    barArrays[index]["avatar"]=imgUrls[index];
    return barArrays;
}

$("#setModal").modal().css({
    "margin-left": function () {
        return - ($(this).height() / 2);
    }
});