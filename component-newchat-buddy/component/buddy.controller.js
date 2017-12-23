/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.buddy')
    .controller('BuddyinfoController', BuddyinfoController)
    .controller('BuddyBlankController', BuddyBlankController)
;

BuddyinfoController.$inject = ['$scope','$state','$stateParams','$rootScope','CookieService','LocalstorageService','AUTH_EVENTS','HTTP_ERROR','ErrorService'];
BuddyBlankController.$inject = [];

function BuddyinfoController($scope,$state,$stateParams,$rootScope,CookieService,LocalstorageService,AUTH_EVENTS,HTTP_ERROR,ErrorService) {
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.google_waves', ['waves-button', 'waves-float']);
    })
    var vm = this;
    vm.name = $stateParams.name;//标题名设置
    var userid = CookieService.getObject('currentUser').userid;
    vm.gochat = gochat;//跳转聊天
    function gochat() {
        updatesiderbuddy($stateParams.chatid);
        $state.go("conversation.conversation",{
            userid:$stateParams.userid,
            chatid:$stateParams.chatid,
            name:$stateParams.name,
            biztype:1
        });
    }
}

function BuddyBlankController() {
    var vm = this;
}