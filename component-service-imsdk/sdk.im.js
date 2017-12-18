(function (exports) {
    'use strict';

    // 导出类
    var MessageSdk = exports.MessageSdk;
    // 增加IM方法
    MessageSdk.prototype.login = login;
    MessageSdk.prototype.subscribeGroup = subscribeGroup;
    MessageSdk.prototype.sendFriendMessage = sendFriendMessage;
    MessageSdk.prototype.sendGroupMessage = sendGroupMessage;
    MessageSdk.prototype.onChatMessage = onChatMessage;
    MessageSdk.prototype.onOfflineMessage = onOfflineMessage;

    //
    var userid = null;

    // 用户登录
    function login(user) {
        console.log(user);
        // this.setBusinessHandler("im", imMessageHandler);
        this.setBusinessHandler(imMessageHandler);
        //
        if (!this.client) {
            // TODO 错误提示
            console.log("client not init.");
        }


        /*正式设计代码*/
        for (var i = 0; i < user.friendchatidList.length; i++) {
            this.client.subscribe("/1/" + user.friendchatidList[i]);
        }
        //群组聊天
        for (var i = 0;i  < user.groupchatidList.length; i++) {
            this.client.subscribe("/2/" + user.groupchatidList[i]);
        }
        //订阅聊天室
        for (var i = 0; i < user.chatroomchatidList.length; i++) {
            this.client.subscribe("/3/" + user.chatroomchatidList[i]);
        }
        //订阅公告
        for (var i = 0; i < user.chatroomchatidList.length; i++) {
            this.client.subscribe("/4/" + user.announcechatidList[i]);
        }
        //
        return this;
    }

    // 用户加入群聊
    function subscribeGroup(groupid) {
        if (!this.client) {
            // TODO 错误提示
            console.log("client not init.");
        }
        var topic = "/im/group/" + groupid;
        console.log("ImSdk subscribeGroup(), topic=", topic);
        this.client.subscribe(topic);
        //
        return this;
    }

    // 发布用户聊天消息
    function sendFriendMessage(friendid, msgtype, content) {
        if (!this.client) {
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
        this.client.publish(topic, JSON.stringify(message));
        return this;
    }

    // 发布群聊天消息
    function sendGroupMessage(groupid, msgtype, content) {
        console.log(groupid, msgtype, content)
        if (!this.client) {
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
        this.client.publish(topic, JSON.stringify(message));
        return this;
    }

    // 处理收到的聊天消息
    function imMessageHandler(topic, payload) {
        console.log("ImSdk imMessageHandler topic=",topic,",payload=",payload)
        var message = JSON.parse(payload);
        console.log("ImSdk imMessageHandler message=",message)
        /*//废弃掉content-type的chat offline
        var message_type = message.header["content-type"].split(".")[0];
        var content = message.body;
        content["type"] = message.header["content-type"].substring(message_type.length + 1);
        //
        var topic_parts = topic.split("/");
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
        }*/
        var topic_parts = topic.split("/");
        var fromtype = topic_parts[1];
        var fromid = message.headers.receiver;
        var content = message.body;
        content.sender = message.headers.sender;
        content.createtime = message.headers.createtime;
        message_handler.onImChatMessage(fromtype, fromid, content);
    }

    // 管理所有消息回调处理函数
    var message_handler = {
        // IM
        onImChatMessage: function (fromtype, fromid, message) {
            console.log("ImSdk onImChatMessage()");
        },
        onImOfflineMessage: function (fromtype, fromid, message) {
            console.log("ImSdk onImOfflineMessage()");
        },
        // Cupboard
    };

    // 设置接收到聊天消息后的回调处理函数
    function onChatMessage(onImChatMessage) {
        message_handler.onImChatMessage = onImChatMessage;
    }

    // 设置接收到离线消息后的回调处理函数
    function onOfflineMessage(onImOfflineMessage) {
        message_handler.onImOfflineMessage = onImOfflineMessage;
    }

})(window);
