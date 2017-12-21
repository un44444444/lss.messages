(function (exports) {
    'use strict';

    // 导出类
    exports.MessageSdk = MessageSdk;

    // 即时消息集成开发服务
    function MessageSdk() {
        this.client = null;

        // 初始化各项配置
        this.init = function (server, config) {
            console.log("MessageSdk init(), config=", config);
            // TODO 合并配置
            config = config ? config : {};
            config.onMessage = allMessageHandler;
            // 连接服务器
            if (!this.client) {
                this.client = new MqttMessage();
                this.client.init(server, config);
            }
            // 
            return this;
        }


        this.setBusinessHandler = function (platformtype,handler_func) {
            business_handler [platformtype] = handler_func;
        }
    }

    var business_handler = {};
    // var business_handler;

    // 收到消息后，分拣给各个回调处理函数
    function allMessageHandler(topic, payload) {
        console.log("MessageSdk allMessageHandler(), topic=", topic,",payload=",payload);
        var topic_parts = topic.split("/");
        var platformtype = topic_parts[1]
        //已注册业务的消息
        if (business_handler [platformtype]) {
            var handler_func = business_handler [platformtype];
            handler_func(topic, payload);
        }
        //未知业务消息
        else {
            console.log("MessageSdk allMessageHandler（）unknown topic = ", topic);
        }
    }
})(window);
