/**
 * Created by 黄忠园 on 2017/11/25.
 */
angular.module('service.mqhp.message', [
    'ngResource'
])
    .service('MqhpMessageService', MqhpMessageService);
MqhpMessageService.$inject = [ '$resource','CacheService','CookieService'];
/*messge : 消息接口 */
function MqhpMessageService($resource,CacheService,CookieService) {
    //发送消息接口
    this.sendMessage = function (chatid, msgtype, content,success,error) {
        var resource = $resource(mqhpUrl + "/message");
        var timestamp = Date.parse(new Date());
        var obj = {
            "headers": {
                "createtime": timestamp,
                "receiver": chatid,
                "content_type": msgtype,//1:text 2；image
                "sender": CookieService.getObject('currentUser').userid,
                "content_encoding": "json",
                "content_length": JSON.stringify(content).length
            },
            "body": content
        }
        return resource.save({},obj,success,error);
    };
}