(function () {
    'use strict';

    angular
        .module('app.service.imsdk', [
        ])
        .service('IMSdkService', IMSdkService);

    // 服务依赖
    IMSdkService.$inject = ['MessageMqttjsService'];
    // 即时消息集成开发服务
    function IMSdkService(MessageMqttjsService) {
        var client = null;

        // 初始话SDK
        this.init = function (appid, appsecret) {
            if (!client) {
                client=MessageMqttjsService.connect();
            }
            return client;
        }

        // 用户登录
        this.login = function (user) {
            if (!client) {
                // TODO 错误提示
            }
            client.subscribe("/user/"+user.userid);
            client.subscribe("聊天室");
            return client;
        }

        // 监听事件处理
        this.on = function (event, listen_func) {
            if (!client) {
                // TODO 错误提示
            }
            return client.on(event, listen_func);
        }

        // 发布消息
        this.publish = function (topic, content) {
            if (!client) {
                // TODO 错误提示
            }
            return client.publish(topic, content);
        }

    }
})();
