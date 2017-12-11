/**
 * Created by 黄忠园 on 2017/11/25.
 */
angular.module('service.mqhp.userchatmsg', [
    'ngResource'
])
    .service('MqhpUserchatmsgService', MqhpUserchatmsgService);
MqhpUserchatmsgService.$inject = [ '$resource','CacheService','CookieService'];
/*userchatmsg : 用户消息接口 */
function MqhpUserchatmsgService($resource,CacheService,CookieService) {
    //根据uid chatid更新uid下chatid游标
    this.updateVernier = function (uid,chatid,info,success,error) {
        var resource = $resource(mqhpUrl + '/userchatmsg/chat/:uid/:chatid');
        return resource.save({uid:uid,chatid:chatid},info,success,error);
    }
    //根据uid查询已读未读信息
    this.isreadByUid = function (uid,isRead,success,error) {
        var resource = $resource(mqhpUrl + '/userchatmsg/isread/:uid');
        return resource.query({uid:uid,isRead:isRead},success,error);
    }
}