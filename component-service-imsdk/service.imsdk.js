(function () {
    'use strict';

    angular
        .module('service.imsdk', [
        ])
        .service('IMSdkService', IMSdkService);

    // 服务依赖
    IMSdkService.$inject = ['CookieService'];
    // 即时消息集成开发服务
    function IMSdkService(CookieService) {
        var imsdk = null;

        // 初始话SDK
        this.init = function (appid, appsecret) {
            if (!imsdk) {
                imsdk = new MessageSdk();
                imsdk.init(mqtt_ws);
            }
            console.log("IMSdkService.init() success");
            return this;
        }

        // 用户登录
        this.login = function (user) {
            if (!imsdk) {
                // TODO 错误提示
                //console.log("IMSdkService.login imsdk is null");
                this.init();
            }
            imsdk.login(user);
            // imsdk.subscribeGroup(user);
            return this;
        }

        // 用户加入群聊
        this.subscribeGroup = function (groupid) {
            if (!imsdk) {
                // TODO 错误提示
            }
            imsdk.subscribeGroup(groupid);
            return this;
        }

        // 监听事件处理
        this.onChatMessage = function (listen_func) {
            if (!imsdk) {
                // TODO 错误提示
                if(CookieService.getObject('mqttLoginInfo')){
                    this.login(CookieService.getObject('mqttLoginInfo'));
                }else {
                    console.log("IMSdkService.onChatMessage re-login failed")
                }
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
