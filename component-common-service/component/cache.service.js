/**
 * Created by 黄忠园 on 2017/9/21.
 */
angular.module('service.cache', [
    'angular-cache'
])

    .service("CacheService",CacheService);
CacheService.$inject = ['CacheFactory'];
function CacheService(CacheFactory) {

    /*获取Cache*/
    this.get = function (cache_name,time) {
        /*name以请求地址命名  time（时间格式）：如cacheFlushInterval的格式 */
        if(!CacheFactory.get(cache_name)){
            CacheFactory(cache_name, {
                maxAge: time, // Items added to this cache expire after 2 hour
                cacheFlushInterval: 24 * 60 * 60 * 1000, // This cache will clear itself every day
                deleteOnExpire: 'aggressive' // Items will be deleted from this cache when they expire
            });
        }

        return CacheFactory.get(cache_name);
    }

    /*删除单个Cache*/
    this.destroy = function (cache_name) {
        CacheFactory.destroy(cache_name);
    }

    /*删除所有Cache*/
    this.destroyAll = function () {
        CacheFactory.destroyAll()
    }


}