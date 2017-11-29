/**
 * Created by 黄忠园 on 2017/9/6.
 */
angular.module('module.login')
    .component('messageComponent',{
        template: '<div ng-if="vm.messageVisible" ng-include="vm.path">',
        bindings: {
            messageVisible:'<',
            message:'<',
            btn:'<',
            cancel:'&',
            sure:'&'
        },
        require: {
            // applicationComponent: '^applicationComponent'
        },

        controller:('MessageComponentController', MessageComponentController),
        controllerAs:'vm'

    })
MessageComponentController.$inject = [];
function MessageComponentController() {
    console.log("进入messageComponent");
    var vm = this;
    vm.path = login_viewurl + "view/message/message.html";
}