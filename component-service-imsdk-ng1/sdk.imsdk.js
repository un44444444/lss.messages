(function (exports) {
    'use strict';

    // 导出类
    exports.ImSdk = ImSdk;
    // 即时消息集成开发服务
    function ImSdk() {
        var client = null;
        var userid = null;

        // 初始化各项配置
        this.init = function (server, config) {
            // TODO 合并配置
            config = config ? config : {};
            config.onMessage = allMessageHandler;
            // 连接服务器
            if (!client) {
                client = new MqttMessage();
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

        // 用户加入群聊
        this.subscribeGroup = function (groupid) {
            if (!client) {
                // TODO 错误提示
                console.log("client not init.");
            }
            var topic = "/im/group/" + groupid;
            console.log("ImSdk subscribeGroup(), topic=", topic);
            client.subscribe(topic);
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
            client.publish(topic, JSON.stringify(message));
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
            var topic = "/im/group/" + groupid;
            var message = {
                "header": {
                    "content-type": "chat." + msgtype,
                    "content-encoding": "json",
                    "sender": userid,
                },
                "body": content
            }
            console.log("ImSdk sendGroupMessage(), topic=", topic);
            client.publish(topic, JSON.stringify(message));
            return this;
        }

        this.onChatMessage = function (onImChatMessage) {
            message_handler.onImChatMessage = onImChatMessage;
        }
        this.onOfflineMessage = function (onImOfflineMessage) {
            message_handler.onImOfflineMessage = onImOfflineMessage;
        }
    }

    // 收到消息后，分拣给各个回调处理函数
    function allMessageHandler(topic, payload) {
        console.log("ImSdk allMessageHandler(), topic=", topic);
        var message = JSON.parse(payload);
        var topic_parts = topic.split("/");
        // IM消息
        if (topic_parts[1] == "im") {
            var message_type = message.header["content-type"].split(".")[0];
            var content = message.body;
            content["type"] = message.header["content-type"].substring(message_type.length + 1);
            //
            var fromtype = topic_parts[2];
            var fromid = topic_parts[3];
            //
            switch (message_type) {
                case "chat":
                    if (message_handler.onImChatMessage) {
                        message_handler.onImChatMessage(fromtype, fromid, content);
                    }
                    break;
                case "offline":
                    if (message_handler.onImOfflineMessage) {
                        message_handler.onImOfflineMessage(fromtype, fromid, content);
                    }
                    break;
                default:
                    console.log("ImSdk allMessageHandler() unknown IM message_type=", message_type);
            }
        }
        // 智能立柜消息
        else if (topic_parts[1] == "cupboard") {
            ;
        }
        // 未知业务消息
        else {
            console.log("ImSdk allMessageHandler() unknown topic=", topic);
        }
    }

    var message_handler = {
        // IM
        onImChatMessage: onImChatMessage,
        onImOfflineMessage: onImOfflineMessage,
        // Cupboard
    };

    function onImChatMessage(fromtype, fromid, message) {
        console.log("ImSdk onImChatMessage()");
    }

    function onImOfflineMessage(fromtype, fromid, message) {
        console.log("ImSdk onImOfflineMessage()");
    }

})(window);
