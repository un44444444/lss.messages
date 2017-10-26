(function() {
    'use strict';

angular
    .module('app.service.mqttjs', [
])
    .service('MessageMqttjsService', MessageMqttjsService);

    // 服务依赖
    MessageMqttjsService.$inject = [];
    // MQTT.js消息服务
    function MessageMqttjsService() {
        var client = null;

        // 连接服务器
        this.connect=function(){
            if (!client) {
                client = mqtt.connect(mqtt_ws);
            }
            return client;
        }

        // 订阅主题
        this.subscribe=function(topic){
            if (!client) {
                // TODO 错误提示
            }
            return client.subscribe(topic);
        }

        // 监听事件处理
        this.on=function(event, listen_func){
            if (!client) {
                // TODO 错误提示
            }
            return client.on(event, listen_func);
        }

        // 发布消息
        this.publish=function(topic, content){
            if (!client) {
                // TODO 错误提示
            }
            return client.publish(topic, content);
        }

    }
})();
