/**
 * Created by 黄忠园 on 2017/12/21.
 */
angular.module('service.mqsp.user', [
    'ngResource'
])
    .service('MqspUserService', MqspUserService);
MqspUserService.$inject = [ '$resource','CacheService','CookieService'];
/*user : 用户接口*/
function MqspUserService($resource,CacheService,CookieService) {
    //根据id新增
    this.addnewuser = function (info,success,error) {
        var resource = $resource(personalUrl + '/user');
        return resource.save({},info,success,error);
    }
    //根据id查询信息
    this.getuser = function (uid,success,error) {
        var resource = $resource(personalUrl + '/user/:uid');
        return resource.get({uid:uid},success,error);
    }
    //根据id修改信息
    this.modifyuser = function (uid,info,success,error) {
        var resource = $resource(personalUrl + '/user/:uid');
        return resource.save({uid:uid},info,success,error);
    }
    //根据id删除信息
    this.deleteuser = function (uid,success,error) {
        var resource = $resource(personalUrl + '/user/:uid');
        return resource.remove({uid:uid},success,error);
    }
}