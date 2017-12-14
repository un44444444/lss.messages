/**
 * Created by 黄忠园 on 2017/8/30.
 */
angular.module('module.login')
    .controller('LoginController', LoginController)
    .controller('NewfogetController', NewfogetController);

LoginController.$inject = ['$scope','$state','$rootScope','AUTH_EVENTS','HTTP_ERROR','ErrorService','AuthService','CookieService','LocalstorageService','IMSdkService','MqhpFriendService','MqhpUsergroupService','MqhpUserchatmsgService','MenuService'];
NewfogetController.$inject = ['$scope','$state','$rootScope','$cookieStore','$interval','AUTH_EVENTS','HTTP_ERROR','ErrorService','SecurityuserService','CookieService'];

function LoginController($scope,$state,$rootScope,AUTH_EVENTS,HTTP_ERROR,ErrorService,AuthService,CookieService,LocalstorageService,IMSdkService,MqhpFriendService,MqhpUsergroupService,MqhpUserchatmsgService,MenuService) {
    var vm = this;
    $("title").html("媒体运营");


    /*初始化开始*/
    vm.messageVisible = false;//弹窗视图初始化
    $scope.$on(HTTP_ERROR.httpError,function (ev,error_info) {
        ErrorService.public_error_handling(error_info,vm);
    });
    $scope.$on(AUTH_EVENTS.loginFailed,function (ev,error_info) {
        ErrorService.public_error_handling(error_info,vm);
    });
    $scope.$on(AUTH_EVENTS.notAuthorized,function (ev,error_info) {
        vm.messageVisible = true;
        vm.message = "您没有此项权限！";
    });
    /*关闭弹窗*/
    vm.cancel = function () {
        vm.messageVisible = false;
    }
    /*弹窗确认按钮*/
    vm.sure = function () {
        vm.messageVisible = false;
    }
    /*初始化结束*/


    /*轮播开始*/
    var newPage = Page();
    newPage.init();
    /*轮播结束*/
    vm.login = login;

    var body = {};//暂时存储解析出的消息body
    var getmessage = [];//存储接收的解析后消息
    var css = "messageleft";//初始化消息样式
    var msgobj = {};//当前用户的全部会话


    //*登录按钮*/
    function login(user) {
        if(!vm.user.username && !vm.user.password){
            vm.message = "账号密码不能为空";
            vm.messageVisible = true;
        }else if(!vm.user.username){
            vm.message = "账号不能为空";
            vm.messageVisible = true;
        }else if(!vm.user.password){
            vm.message = "密码不能为空";
            vm.messageVisible = true;
        }else if(checkphone(vm.user.username) != true){
            vm.message = checkphone(vm.user.username);
            vm.messageVisible = true;
        }
        else {
            user.password = hex_hmac_md5("fjswxxjsyxgstyrz", user.password);
            user.acctype = 1;
            AuthService.login(user,function (userinfo) {
                CookieService.putObject("currentUser", {
                    phone: userinfo.phone,
                    userid: userinfo.userid,
                    username: userinfo.username,
                })
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                // init(userinfo);
                MenuService.init(userinfo.userid,function () {
                    IMSdkService.init();//消息服务初始化
                    //订阅聊天室
                    var mqttLoginInfo = {friendchatid:0,groupchatid:1,chatroomchatid:'',announcechatid:'',smartCabinetchatid:''};
                    CookieService.putObject('mqttLoginInfo',mqttLoginInfo);
                    IMSdkService.login(mqttLoginInfo);//登录订阅消息
                    $state.go("conversation.blank");
                })
            }, function (error) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed,error);
            });

        }
    };

    //初始化菜单列表方法
    function init(userinfo) {
        if(LocalstorageService.getItemObj(userinfo.userid)){
            msgobj = LocalstorageService.getItemObj(userinfo.userid);//当前用户的全部会话
        }else {
            LocalstorageService.setItemObj(userinfo.userid,{
                buddy:{},
                group:{},
                chatroom:{}
            });//存储全部消息
            msgobj = LocalstorageService.getItemObj(userinfo.userid);//当前用户的全部会话
        }

        MqhpFriendService.getFriendList(userinfo.userid).$promise.then(function (friendlist) {
            for(var i = 0;i < friendlist.length;i++){
                var sidebar_template = {
                    name: "第"+i+"个朋友",
                    imgurl: "/lss.messages/images/1.jpg",
                    sref: "buddy.buddyinfo",
                    chatid:friendlist[i].chatid,
                    frienduid:friendlist[i].frienduid
                }
                sidebars_list.buddy.push(sidebar_template);
            }
            console.log("好友列表：",sidebars_list.buddy)
        }).then(function () {
            MqhpUsergroupService.getGroupList(userinfo.userid).$promise.then(function (grouplist) {
                for(var i = 0;i < grouplist.length;i++){
                    var sidebar_template = {
                        name: "第"+i+"个群组",
                        imgurl: "/lss.messages/images/1.jpg",
                        sref: "group.groupinfo",
                        chatid:grouplist[i].chatid,
                        groupid:grouplist[i].groupid,
                        notify:grouplist[i].notify,
                    }
                    sidebars_list.group.push(sidebar_template)
                }
                console.log("群列表：",sidebars_list.group)
            });
        }).then(function () {
            var i,j,k,n;
            MqhpUserchatmsgService.isreadByUid(userinfo.userid,false).$promise.then(function (recentlist) {
                for (i = 0; i < recentlist.length; i++) {



                    //判断是否好友会话
                    for(j = 0;j < sidebars_list.buddy.length;j++){
                        if(recentlist[i].chatid === sidebars_list.buddy[j].chatid){
                            var sidebar_template = sidebars_list.buddy[j];
                            sidebar_template.sref = "conversation.conversation";
                            sidebar_template.num = recentlist[i].messages.length;
                            sidebars_list.conversation.push(sidebar_template);

                            //更新存储
                            for(n = 0;n < recentlist[i].messages.length;n++){
                                updateStorage(recentlist[i].messages[n],userinfo.userid,"buddy")
                            }

                            break;
                        }
                    }
                    //判断是否是群会话
                    if(j === sidebars_list.buddy.length){

                        for(k = 0;k < sidebars_list.group.length;k++){
                            if(recentlist[i].chatid === sidebars_list.group[k].chatid){
                                var sidebar_template = sidebars_list.group[k];
                                sidebar_template.sref = "conversation.groupconversation";
                                sidebar_template.num = recentlist[i].messages.length;
                                sidebars_list.conversation.push(sidebar_template);

                                //更新存储
                                for(n = 0;n < recentlist[i].messages.length;n++){
                                    updateStorage(recentlist[i].messages[n],userinfo.userid,"group");
                                }
                                break;
                            }

                        }


                    }
                }
                console.log("最近未读会话列表",sidebars_list.conversation)
                IMSdkService.init();//消息服务初始化
                //订阅聊天室
                var mqttLoginInfo = {friendchatid:0,groupchatid:1,chatroomchatid:'',announcechatid:'',smartCabinetchatid:''};
                CookieService.putObject('mqttLoginInfo',mqttLoginInfo);
                IMSdkService.login(mqttLoginInfo);//登录订阅消息

                $state.go("conversation.blank");

            },function () {

            })
        })
        
        
        function updateStorage(messages,userid,type) {
            if(messages.senduid == userid){
                css = 'messageright';
            }else {
                css = 'messageleft';
            }
            body = JSON.parse(messages.body);
            getmessage = body;
            getmessage.chatmsgid = messages.chatmsgid;
            getmessage.msgid = messages.msgid;
            getmessage.status = messages.status;
            getmessage.sender = messages.senduid;
            getmessage.chatid = messages.chatid;
            msgobj.group = addMessage(getmessage,getmessage.chatid,msgobj[type],css);
            LocalstorageService.setItemObj(userid,msgobj);//更新存储
            
        }

        /*if(sidebars_list.conversation.length == 0){
            sidebars_list.conversation = [
                {
                    name: "个人最近会话页",
                    imgurl:"/lss.messages/images/1.jpg",
                    num:0,
                    sref: "conversation.conversation",
                    chatid:0
                },
                {
                    name: "群组最近会话页",
                    imgurl:"/lss.messages/images/2.jpg",
                    num:1,
                    sref: "conversation.groupconversation",
                    chatid:1
                },
            ];
        }
        if(sidebars_list.buddy.length == 0){
            sidebars_list.buddy =  [
                {
                    name: "好友信息",
                    imgurl:"/lss.messages/images/3.jpg",
                    num:2,
                    sref: "buddy.buddyinfo",
                    chatid:2
                },
            ];
        }
        if(sidebars_list.group.length == 0){
            sidebars_list.group =  [
                {
                    name: "群信息",
                    imgurl:"/lss.messages/images/4.jpg",
                    num:3,
                    sref: "group.groupinfo",
                    chatid:3
                },
            ];
        }
        IMSdkService.init();//消息服务初始化
        //订阅聊天室
        var mqttLoginInfo = {friendchatid:0,groupchatid:1,chatroomchatid:'',announcechatid:'',smartCabinetchatid:''};
        CookieService.putObject('mqttLoginInfo',mqttLoginInfo);
        IMSdkService.login(mqttLoginInfo);//登录订阅消息

        $state.go("conversation.conversation",{userid:userinfo.userid,chatid:sidebars_list.conversation[0].chatid,name:sidebars_list.conversation[0].name});*/
    }

};
function NewfogetController($scope,$state,$rootScope,$cookieStore,$interval,AUTH_EVENTS,HTTP_ERROR,ErrorService,SecurityuserService,CookieService) {

        var vm = this;

        /*初始化开始*/
        vm.messageVisible = false;//弹窗视图初始化
        $scope.$on(HTTP_ERROR.httpError,function (ev,error_info) {
            ErrorService.public_error_handling(error_info,vm);
        });
        $scope.$on(AUTH_EVENTS.loginFailed,function (ev,error_info) {
            ErrorService.public_error_handling(error_info,vm);
        });

        /*初始化开始*/
        vm.messageVisible = false;//弹窗视图初始化

        /*关闭弹窗*/
        vm.cancel = function () {
            vm.messageVisible = false;
            if(vm.close == 1){
                vm.close = null;
                $cookieStore.remove("currentUser");
                $state.go('login');
            }
        }
        /*弹窗确认按钮*/
        vm.sure = function () {
            vm.messageVisible = false;
            if(vm.close == 1){
                vm.close = null;
                $cookieStore.remove("currentUser");
                $state.go('login');
            }
        }
        /*初始化结束*/
    vm.codectrl = true;//倒计时显示控制
    var nextbtn = document.getElementById("nextbtn")//获取提交按钮;
    var phoneobj = document.getElementById("phone");//获取电话号码输入框

    var phoneNumber;//作为验证手机号是否变更
    //获取验证码按钮
    vm.getcode = function (phone) {
        if(checkphone(phone) == "success"){
            nextbtn.removeAttribute("disabled","disabled");
            //获取验证码

            SecurityuserService.getFgpwdCode(phone,function (data) {
                phoneNumber = phone;
                vm.time= 60000;
                vm.codectrl = false;
                var timer = $interval(function(){
                    vm.time -= 1000;
                    if (vm.time == 0){
                        $interval.cancel(timer);
                        vm.codectrl = true;
                        nextbtn.setAttribute("disabled","");
                    }
                },1000);

            },function (data) {

                vm.message = "获取验证码失败";
                vm.ctrl = true;
            })
        }
    };



        //提交按钮
        vm.nextbtn = function (phone,code) {
            if(checkphone(phone) == true){

                if(phoneNumber != phone){
                    vm.message = "手机号码有变动！";
                    vm.ctrl = true;
                    $("#phone").focus();
                }else {
                    SecurityuserService.getResetpwd(phone,code).$promise.then(function (data) {
                        vm.message = "你已成功重置密码，新密码为123456,为您的密码安全起见，请尽快登陆并修改密码!";
                        vm.messageVisible=true;
                        $cookieStore.remove("currentUser");
                        vm.close = 1;
                    },function (error) {
                        vm.message = "密码重置失败!";
                        vm.messageVisible=true;
                    })
                }

            }
        }


    };