/**
 * Created by 黄忠园 on 2017/11/25.
 */
angular.module('service.mqhp.message', [
    'ngResource'
])
    .service('MqhpMessageService', MqhpMessageService);
MqhpMessageService.$inject = [ '$resource','CacheService','CookieService'];
function MqhpMessageService($resource,CacheService,CookieService) {
    //发送消息接口
    this.sendMessage = function (chatid, msgtype, content,success,error) {
        var resource = $resource(mqhpUrl + "/message ");
        var date=new Date();
        var mytime=date.toLocaleTimeString();
        var obj = {
            "header": {
                "createtime": mytime,
                "receiver": chatid,
                "content_type": "chat." + msgtype,
                "sender": CookieService.getObject('currentUser').userid,
                "content_encoding": "json",
                "content_length": content.length
            },
            "body": content
        }
        return resource.save({},obj,success,error);
    };
}