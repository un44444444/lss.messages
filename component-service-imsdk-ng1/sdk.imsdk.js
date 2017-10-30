(function (exports) {
    'use strict';

    // 导出类
    exports.ImSdk = ImSdk;
    // 即时消息集成开发服务
    function ImSdk() {
        var client = null;
        var userid = null;
        var message_handler = {
            onChatMessage: onChatMessage,
            onOfflineMessage: onOfflineMessage,
        };

        // 初始化各项配置
        this.init = function (server, config) {
            // TODO 合并配置
            // 连接服务器
            if (!client) {
                client = new MqttMessage();
                //
                config.onMessage = allMessageHandler;
                client.init(server, config);
            }
            // 
            return this;
        }

        // 用户登录
        this.login = function (user) {
            if (!client) {
                // TODO 错误提示
                console.log("client not init.");
            }
            userid = user.userid;
            client.subscribe("/im/user/" + userid);
            //订阅聊天室
            client.subscribe("聊天室");
            //
            return this;
        }

        // 发布用户聊天消息
        this.sendFriendMessage = function (friendid, msgtype, content) {
            if (!client) {
                // TODO 错误提示
                console.log("client not init.");
            }
            if (!userid) {
                // TODO 错误提示
                console.log("user not login.");
            }
            //
            var topic = "/im/user/" + friendid;
            var message = {
                "header": {
                    "content-type": "chat." + msgtype,
                    "content-encoding": "json",
                    "sender": userid,
                },
                "body": content
            }
            client.publish(topic, message);
            return this;
        }

        // 发布群聊天消息
        this.sendGroupMessage = function (groupid, msgtype, content) {
            if (!client) {
                // TODO 错误提示
                console.log("client not init.");
            }
            if (!userid) {
                // TODO 错误提示
                console.log("user not login.");
            }
            //
            //var topic = "/im/group/" + groupid;
            var topic = "聊天室";
            var message = {
                "header": {
                    "content-type": "chat." + msgtype,
                    "content-encoding": "json",
                    "sender": userid,
                },
                "body": content
            }
            client.publish(topic, message);
            return this;
        }

        this.onChatMessage = function (onChatMessage) {
            message_handler.onChatMessage = onChatMessage;
        }
        this.onOfflineMessage = function (onOfflineMessage) {
            message_handler.onOfflineMessage = onOfflineMessage;
        }
    }

    // 收到消息后，分拣给各个回调处理函数
    function allMessageHandler(topic, payload) {
        var message = JSON.parse(payload);
        var message_type = message.header["content-type"].split(".")[0];
        var content = message.body;
        content["type"] = message.header["content-type"].substring(strlen(message_type)+1);
        //
        switch (message_type) {
            case "chat":
                if (message_handler.onChatMessage) {
                    message_handler.onChatMessage(topic, message);
                }
                break;
            case "offline":
                if (message_handler.onOfflineMessage) {
                    message_handler.onOfflineMessage(message);
                }
                break;
            default:
                console.log("ImSdk allMessageHandler() unknown message_type=", message_type);
        }
    }

    function onChatMessage(message) {
        console.log("ImSdk onChatMessage()");
    }

    function onOfflineMessage(message) {
        console.log("ImSdk onOfflineMessage()");
    }

})(window);
