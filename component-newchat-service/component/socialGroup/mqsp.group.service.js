/**
 * Created by 黄忠园 on 2017/11/25.
 */
angular.module('service.mqsp.group', [
    'ngResource'
])
    .service('MqhpGroupService', MqhpGroupService);
MqhpGroupService.$inject = [ '$resource','CacheService','CookieService'];
/*group : 群信息接口 */
function MqhpGroupService($resource,CacheService,CookieService) {
    //创建一个新群
    this.addnewgroup= function (info,success,error) {
        var resource = $resource(socialGroupUrl + '/groups');
        return resource.save({},info,success,error);
    }
    //查询聊天id
    this.getcgroupchatbychatid= function (chatid,success,error) {
        var resource = $resource(socialGroupUrl + '/groups/bychatid/:chatid');
        return resource.query({chatid:chatid},success,error);
    }
    //查询用户所有的群
    this.getallgroup= function (inuid,success,error) {
        var resource = $resource(socialGroupUrl + '/groups/byinuid/:inuid');
        return resource.query({inuid:inuid},success,error);
    }
    //查询群资料
    this.getgroupinfo= function (groupid,success,error) {
        var resource = $resource(socialGroupUrl + '/groups/:groupid');
        return resource.get({groupid:groupid},success,error);
    }
    //通过群id删除群
    this.deletegroup = function (groupid,success,error) {
        var resource = $resource(socialGroupUrl + '/groups/:groupid');
        return resource.remove({groupid:groupid},success,error);
    }
}