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
                MenuService.init(userinfo.userid,function (friendchatidList,groupchatidList,chatroomchatidList,announcechatidList) {
                    IMSdkService.init();//消息服务初始化
                    //订阅聊天室
                    var mqttLoginInfo = {
                        platformtype:"0",
                        body:[
                            {
                                biztype:"1",
                                biztoutidlist:friendchatidList
                            },
                            {
                                biztype:"2",
                                biztoutidlist:groupchatidList
                            },
                            {
                                biztype:"3",
                                biztoutidlist:chatroomchatidList
                            },
                            {
                                biztype:"4",
                                biztoutidlist:announcechatidList
                            },

                        ]
                    }
                    CookieService.putObject('mqttLoginInfo',mqttLoginInfo);
                    IMSdkService.login(mqttLoginInfo);//登录订阅消息
                    $state.go("conversation.blank");
                })
            }, function (error) {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed,error);
            });

        }
    };


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