/**
 * Created by 黄忠园 on 2017/11/25.
 */
angular.module('service.mqhp.usergroup', [
    'ngResource'
])
    .service('MqhpUsergroupService', MqhpUsergroupService);
MqhpUsergroupService.$inject = [ '$resource','CacheService','CookieService'];
/*usergroup : 用户群管理 */
function MqhpUsergroupService($resource,CacheService,CookieService) {
    //通过ownuid查询用户所有的群
    this.getGroupList= function (ownuid,success,error) {
        var resource = $resource(socialGroupUrl + '/usergroup/byowner/:ownuid');
        return resource.query({ownuid:ownuid},success,error);
    }
    //通过ownuid,groupid更新
    this.modifyGroup = function (ownuid,frienduid,info,success,error) {
        var resource = $resource(socialGroupUrl + '/usergroup/:ownuid/:groupid');
        return resource.save({ownuid:ownuid,frienduid:frienduid},info,success,error);
    }
    //通过ownuid,groupid 删除
    this.deleteGroup = function (ownuid,frienduid,success,error) {
        var resource = $resource(socialGroupUrl + '/usergroup/:ownuid/:frienduid');
        return resource.remove({ownuid:ownuid,frienduid:frienduid},success,error);
    }
    //通过ownuid,groupid 查询
    this.getGroup = function (ownuid,frienduid,success,error) {
        var resource = $resource(socialGroupUrl + '/friend/:ownuid/:frienduid');
        return resource.get({ownuid: ownuid, frienduid: frienduid}, success, error);
    }
}