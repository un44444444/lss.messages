(function (exports) {
    'use strict';

    // 导出类
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
        this.init = function (mqtt_ws, config) {
            // 连接服务器
            if (!client) {
                client = mqtt.connect(mqtt_ws);
            }
            // 设置各种事件处理方法
            if (true) {
                client.on('connect', config && config.onConnect ? config.onConnect : default_config.onConnect);
                client.on('reconnect', config && config.onReconnect ? config.onReconnect : default_config.onReconnect);
                client.on('offline', config && config.onOffline ? config.onOffline : default_config.onOffline);
                client.on('close', config && config.onClose ? config.onClose : default_config.onClose);
                client.on('message', config && config.onMessage ? config.onMessage : default_config.onMessage);
                //client.on('message', default_config.onMessage);
            }
            // 
            return this;
        }

        // 监听事件处理
        this.onMessage = function (message_handle_func) {
            default_config.onMessage = message_handle_func;
            if (!client) {
                client.on('message', message_handle_func);
            }
            return this;
        }

        // 订阅主题
        this.subscribe = function (topic) {
            console.log("MqttMessage subscribe(), topic=", topic);
            if (!client) {
                // TODO 错误提示
            }
            client.subscribe(topic, null, function(err, granted){
                console.log("client.subscribe callback(), err=", err, ", granted=", granted);
            });
            return this;
        }

        // 发布消息
        this.publish = function (topic, message) {
            console.log("MqttMessage publish(), topic=", topic, ", message=", message);
            if (!client) {
                // TODO 错误提示
            }
            client.publish(topic, message);
            return this;
        }
    }

    function onMessage(topic, payload) {
        console.log("MqttMessage onMessage()");
    }

    function onConnect() {
        console.log("MqttMessage onConnect()");
    }

    function onReconnect() {
        console.log("MqttMessage onReconnect()");
    }

    function onOffline() {
        console.log("MqttMessage onOffline()");
    }

    function onClose() {
        console.log("MqttMessage onClose()");
    }

})(window);
