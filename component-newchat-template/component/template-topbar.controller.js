/**
 * Created by dywu on 2015/9/24.
 */
angular.module('module.template')
    .controller('TemplateTopbarController', TemplateTopbarController)
;

// Topbar 控制器
TemplateTopbarController.$inject = ['$scope','$state','CookieService','MenuService','UPDATE_SIDERBAR','UPDATE_TOPBAR'];
function TemplateTopbarController($scope,$state,CookieService,MenuService,UPDATE_SIDERBAR,UPDATE_TOPBAR) {
    console.log("进入topbar控制器")
    var vm = this;

    vm.userid = CookieService.getObject('currentUser').userid;
    var init = init();//初始化菜单列表
    vm.state = $state;//css点击样式处理
    vm.truenum = getnum();
    vm.myinfo = myinfo;//点击个人信息
    vm.gorecent = gorecent;//跳转最近通讯
    vm.gobuddy = gobuddy;//跳转好友列表
    vm.gogroup = gogroup;//跳转群组列表

    function myinfo() {
        vm.loginformVisible = true;
    }

    //初始化菜单列表方法
    function init() {
            MenuService.init(vm.userid,function () {
                console.log("更新siderbar",sidebars_list);
                vm.truenum = getnum();
            })
    }

    //总共消息条数
    function getnum() {
        var num = 0;
        for(var i = 0;i < sidebars_list.conversation.length;i++){
            num += sidebars_list.conversation[i].truenum;
        }
        return num;
    }


    //跳转最近通讯
    function gorecent() {
        if(CookieService.getObject("activesiderbar").recent.sref){
            var aim = CookieService.getObject("activesiderbar").recent;
            $state.go(aim.sref,{
                userid:vm.userid,
                chatid:aim.chatid,
                name:aim.name,
                biztype:aim.biztype
            })
        }else {
            $state.go("conversation.blank");
        }
    }

    //跳转好友列表
    function gobuddy() {
        if(CookieService.getObject("activesiderbar").buddy.sref){
            var aim = CookieService.getObject("activesiderbar").buddy;
            $state.go(aim.sref,{
                userid:vm.userid,
                chatid:aim.chatid,
                name:aim.name,
            })
        }else {
            $state.go("buddy.blank");
        }
    }

    //跳转群组列表
    function gogroup() {
        if(CookieService.getObject("activesiderbar").group.sref){
            var aim = CookieService.getObject("activesiderbar").group;
            $state.go(aim.sref,{
                groupid:vm.groupid,
                chatid:aim.chatid,
                name:aim.name,
            })
        }else {
            $state.go("group.blank");
        }
    }

    //接收广播更新sidebars_list
    $scope.$on(UPDATE_SIDERBAR.siderbarList,function (event,info) {
        vm.truenum -= info.truenum;
    })

    //接收广播更新topbarTruenum
    $scope.$on(UPDATE_TOPBAR.topbarTruenum,function (event) {
        $scope.$apply(function () {
            vm.truenum += 1;
        })
    })
}
