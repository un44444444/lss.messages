(function (exports) {
    'use strict';

    function onMessage() {
        console.log("onMessage()");
    }

    function onConnect() {
        console.log("onConnect()");
    }

    function onReconnect() {
        console.log("onReconnect()");
    }

    function onOffline() {
        console.log("onOffline()");
    }

    function onClose() {
        console.log("onClose()");
    }

    // 服务依赖
    exports.MqttMessage = MqttMessage;
    // 即时消息集成开发服务
    function MqttMessage() {
        var client = null;
        var default_config = {
            onMessage: onMessage,
            onConnect: onConnect,
            onReconnect: onReconnect,
            onOffline: onOffline,
            onClose: onClose,
        };

        // 初始化各项配置
        this.init = function (config) {
            // 连接服务器
            if (!client) {
                client = mqtt.connect(mqtt_ws);
            }
            // 设置各种事件处理方法
            client.on('connect', config.onConnect ? config.onConnect : default_config.onConnect);
            client.on('reconnect', config.onReconnect ? config.onReconnect : default_config.onReconnect);
            client.on('offline', config.onOffline ? config.onOffline : default_config.onOffline);
            client.on('close', config.onClose ? config.onClose : default_config.onClose);
            client.on('message', config.onMessage ? config.onMessage : default_config.onMessage);
            // 
            return this;
        }

        // 监听事件处理
        this.onMessageArrive = function (message_handle_func) {
            default_config.onMessage = message_handle_func;
            client.on('message', message_handle_func);
            return this;
        }

        // 订阅主题
        this.subscribe = function (topic) {
            if (!client) {
                // TODO 错误提示
            }
            client.subscribe(topic);
            return this;
        }

        // 发布消息
        this.sendMessage = function (topic, content) {
            if (!client) {
                // TODO 错误提示
            }
            client.publish(topic, content);
            return this;
        }
    }
})();
