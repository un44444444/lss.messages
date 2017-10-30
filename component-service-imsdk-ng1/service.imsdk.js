(function () {
    'use strict';

    angular
        .module('app.service.imsdk', [
        ])
        .service('IMSdkService', IMSdkService);

    // 服务依赖
    IMSdkService.$inject = [];
    // 即时消息集成开发服务
    function IMSdkService() {
        var imsdk = null;

        // 初始话SDK
        this.init = function (appid, appsecret) {
            if (!client) {
                imsdk = new ImSdk();
                imsdk.init(mqtt_ws);
            }
            return this;
        }

        // 用户登录
        this.login = function (user) {
            if (!imsdk) {
                // TODO 错误提示
            }
            imsdk.login(user);
            return this;
        }

        // 监听事件处理
        this.onChatMessage = function (listen_func) {
            if (!imsdk) {
                // TODO 错误提示
            }
            imsdk.onChatMessage(listen_func);
            return this;
        }

        // 发布文本消息
        this.sendFriendText = function (friendid, text) {
            if (!imsdk) {
                // TODO 错误提示
            }
            var content = {
                text: text
            };
            imsdk.sendFriendMessage(friendid, "text", content);
            return this;
        }

        // 发布文本消息
        this.sendGroupText = function (groupid, text) {
            if (!imsdk) {
                // TODO 错误提示
            }
            var content = {
                text: text
            };
            imsdk.sendGroupMessage(groupid, "text", content);
            return this;
        }

    }
})();
