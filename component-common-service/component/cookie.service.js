/**
 * Created by 黄忠园 on 2017/7/17.
 */
angular.module('service.cookie', ['ngCookies'])

    .service("CookieService",['$cookies',function($cookies){
        /*暂不加密
        /!*
        * 传入只支持字符串类型,json对象请用JSON.stringify(json对象)转为字符串
        * 获取json字符串后请用JSON.parse()转为json对象
        * *!/

        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;


        //设置cookie
        this.put = function (name,val) {
            val = btoa("fjswxxjsyxgstyrz"+val);
            $cookies.put(name,val);
        }
        //读取cookie
        this.get = function (name) {
            if($cookies.get(name)){
                var val = $cookies.get(name);
                if(base64regex.test(val) && name != "openid"){//微信的openid也是通过base64加密
                    val = atob(val).replace("fjswxxjsyxgstyrz","");
                }

                return val;
            }else {
                return $cookies.get(name);
            }
        }*/
        function settime(time,way) {
            var expireDate = new Date();
            if(way){
                switch(way){
                    case "y":
                        expireDate.setFullYear(expireDate.getFullYear() + time);
                        break;
                    case "m":
                        expireDate.setMonth(expireDate.getMonth()+1 + time);
                        break;
                    case "d":
                        expireDate.setDate(expireDate.getDate() + time);
                        break;
                    case "h":
                        expireDate.setHours(expireDate.getHours() + time);
                        break;
                    case "mm":
                        expireDate.setMinutes(expireDate.getMinutes() + time);
                        break;
                    case "s":
                        expireDate.setSeconds(expireDate.getSeconds() + time)
                        break;
                }
            }else {
                expireDate.setDate(expireDate.getDate() + time);
            }
            return expireDate;
        }
        //删除cookie
        this.remove = function (name) {
            $cookies.remove(name);
        }

        //设置cookie  time:保存时间, way: 保存时间存贮类型从【y,m,d,h,mm,s】中选择
        //Set the cookie    time: the time of save, way: time storage type from [y, m, d, h, mm, s] to chose
        this.put = function (name,val,time,way) {
            var newtime = settime(time,way);
            $cookies.put(name,val,{'expires': newtime.toUTCString()});
        }

        //设置存储对象  time:保存时间, way: 保存时间存贮类型从【y,m,d,h,mm,s】中选择
        //Set the cookie    time: the time of save, way: time storage type from [y, m, d, h, mm, s] to chose
        this.putObject = function (name,val,time,way) {
            var newtime = settime(time,way);
            $cookies.putObject(name,val,{'expires': newtime.toUTCString()});
        }

        //读取cookie
        this.get = function (name) {
            return $cookies.get(name);
        }

        //读取cookie对象
        this.getObject = function (name) {
            if($cookies.get(name)){
                return JSON.parse($cookies.get(name));
            }else {
                $cookies.get(name);
            }
        }
    }])
