/**
 * Created by dywu on 2015/9/24.
 */
angular.module('module.template')
    .controller('TemplateTopbarController', TemplateTopbarController)
;

// Topbar 控制器
TemplateTopbarController.$inject = ['$state','CookieService'];
function TemplateTopbarController($state,CookieService) {
    console.log("进入topbar控制器")
    var vm = this;

    vm.userid = CookieService.getObject('currentUser').userid;
    var init = init();//初始化菜单列表
    vm.state = $state;//css点击样式处理
    vm.myinfo = myinfo;//点击个人信息

    function myinfo() {
        vm.loginformVisible = true;
    }

    //初始化菜单列表方法
    function init() {
        if(sidebars_list.conversation.length == 0){
            sidebars_list.conversation = [
                {
                    name: "个人最近会话页",
                    imgurl:"/newchat/images/1.jpg",
                    num:0,
                    sref: "conversation.conversation",
                    chatid:0
                },
                {
                    name: "群组最近会话页",
                    imgurl:"/newchat/images/2.jpg",
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
                    imgurl:"/newchat/images/3.jpg",
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
                    imgurl:"/newchat/images/4.jpg",
                    num:3,
                    sref: "group.groupinfo",
                    chatid:3
                },
            ];
        }
        vm.conversation = sidebars_list.conversation[0];
        vm.buddy = sidebars_list.buddy[0];
        vm.group = sidebars_list.group[0];
    }
}
