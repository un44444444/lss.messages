/**
 * Created by 黄忠园 on 2017/11/28.
 */

angular.module('service.localstorage', [])
    .service("LocalstorageService",LocalstorageService)
LocalstorageService.$inject = [];
function LocalstorageService() {
    //存储数据
    this.setItem = function (name,val) {
        return localStorage.setItem(name,val);
    }
    //读取数据
    this.getItem = function (name) {
        return localStorage.getItem(name);
    }
    //存储对象
    this.setItemObj = function (name,obj) {
        return localStorage.setItem(name,JSON.stringify(obj));
    }
    //读取对象
    this.getItemObj = function (name) {
        return JSON.parse(localStorage.getItem(name));
    }
    //删除数据
    this.removeItem = function (name) {
        return localStorage.removeItem(name);
    }
    //清空localStorage上存储的数据
    this.clear = function () {
        return localStorage.clear();
    }
    //检查localStorage上是否保存了变量x，需要传入x
    this.hasOwnProperty = function (name) {
        return localStorage.hasOwnProperty(name);
    }
    //读取第i个数据的名字或称为键值(从0开始计数)
    this.key = function (name) {
        return localStorage.key(name);
    }
    //localStorage存储变量的个数
    this.length = function () {
        return localStorage.length;
    }
    //将（数组）转为本地字符串
    this.toLocaleString = function (name) {
        return localStorage[name].toLocaleString();
    }
    //获取所有存储的数据
    this.valueOf = function () {
        return localStorage.valueOf();
    }
}