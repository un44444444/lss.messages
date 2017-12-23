/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.group')
    .controller('GroupinfoController', GroupinfoController)
    .controller('GroupBlankController', GroupBlankController)
;

GroupinfoController.$inject = ['$scope','$state','$stateParams','$rootScope','CookieService','LocalstorageService','AUTH_EVENTS','HTTP_ERROR','ErrorService'];
GroupBlankController.$inject = [];

function GroupinfoController($scope,$state,$stateParams,$rootScope,CookieService,LocalstorageService,AUTH_EVENTS,HTTP_ERROR,ErrorService) {
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.google_waves', ['waves-button', 'waves-float']);
    })
    var vm = this;
    vm.name = $stateParams.name;//标题名设置
    var userid = CookieService.getObject('currentUser').userid;
    vm.gochat = gochat;
    function gochat() {
        updatesidergroup($stateParams.chatid);
        $state.go("conversation.groupconversation",{
            userid:$stateParams.userid,
            chatid:$stateParams.chatid,
            name:$stateParams.name,
            biztype:1,
        });
    }
}

function GroupBlankController() {
    var vm = this;
}