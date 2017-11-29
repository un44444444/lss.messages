/**
 * Created by 黄忠园 on 2017/9/22.
 */
angular.module('service.error', [

])

    .service("ErrorService",ErrorService);
ErrorService.$inject = [];
function ErrorService() {
    /*失败信息命名列表*/
    var error_list = [
        "msg","message","reason"
    ]
    this.public_error_handling = function (error_info,vm) {
        var end = true;
        vm.messageVisible = true;
        for(var key in error_info.data) {
            //遍历对象，key即为key，error_info[key]为当前key对应的值
            for(var i = 0;i < error_list.length;i++){
                if(key == error_list[i]){
                    vm.message = error_info.data[key];
                    end = false;
                    break;
                }
            }
        }
        if(end){
            if(error_info.data){
                vm.message = JSON.stringify(error_info.data);
            }else if(error_info) {
                vm.message = "服务器报错！"+JSON.stringify(error_info);
            }else {
                vm.message = "服务器报错！";
            }
        }
    }
}