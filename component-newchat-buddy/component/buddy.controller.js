/**
 * Created by 黄忠园 on 2017/11/1.
 */
angular.module('module.buddy')
    .controller('BuddyinfoController', BuddyinfoController)
;

BuddyinfoController.$inject = ['$scope','$state','$stateParams','$rootScope','$cookieStore','AUTH_EVENTS','HTTP_ERROR','ErrorService'];

function BuddyinfoController($scope,$state,$stateParams,$rootScope,$cookieStore,AUTH_EVENTS,HTTP_ERROR,ErrorService) {
    angular.element(document).ready(function () {
        /*点击水波效果控制*/
        Waves.init();
        Waves.attach('.google_waves', ['waves-button', 'waves-float']);
    })
    var vm = this;
    vm.name = $stateParams.name;//标题名设置
}