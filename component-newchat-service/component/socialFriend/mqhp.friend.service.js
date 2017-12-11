/**
 * Created by 黄忠园 on 2017/11/25.
 */
angular.module('service.mqhp.friend', [
    'ngResource'
])
    .service('MqhpFriendService', MqhpFriendService);
MqhpFriendService.$inject = [ '$resource','CacheService','CookieService'];
/*friend : 好友接口*/
function MqhpFriendService($resource,CacheService,CookieService) {
    //通过ownuid查询好友列表
    this.getFriendList= function (ownuid,success,error) {
        var resource = $resource(socialFriendUrl + '/friend/byowner/:ownuid');
        return resource.query({ownuid:ownuid},success,error);
    }
    //通过ownuid增加好友
    this.addFriend = function (ownuid,info,success,error) {
        var resource = $resource(socialFriendUrl + '/friend/:ownuid');
        return resource.save({ownuid:ownuid},info,success,error);
    }
    //通过ownuid,frienduid 修改好友信息
    this.modifyFriend = function (ownuid,frienduid,info,success,error) {
        var resource = $resource(socialFriendUrl + '/friend/:ownuid/:frienduid');
        return resource.save({ownuid:ownuid,frienduid:frienduid},info,success,error);
    }
    //通过ownuid,frienduid 查询好友信息
    this.getFriend = function (ownuid,frienduid,success,error) {
        var resource = $resource(socialFriendUrl + '/friend/:ownuid/:frienduid');
        return resource.get({ownuid:ownuid,frienduid:frienduid},success,error);
    }
    //通过ownuid,frienduid 删除好友
    this.deleteFriend = function (ownuid,frienduid,success,error) {
        var resource = $resource(socialFriendUrl + '/friend/:ownuid/:frienduid');
        return resource.remove({ownuid:ownuid,frienduid:frienduid},success,error);
    }
}