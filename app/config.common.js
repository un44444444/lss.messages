/**
 * Created by 黄忠园 on 2017/8/24.
 */
//viewurl
var template_viewurl = "component-newchat-template/view";
var login_viewurl = 'component-newchat-login/';
var conversation_viewurl = 'component-newchat-conversation/';
var groupconversation_viewurl = 'component-newchat-groupconversation/';
var buddy_viewurl = 'component-newchat-buddy/';
var group_viewurl = 'component-newchat-group/';

/*整体风格css*/
var style_list = [
    {
        name: "默认",
        url: "css/main.css"
    },
    {
        name: "浅蓝",
        url: "css/blue.css"
    },
    {
        name: "浅黄",
        url: "css/yellow.css"
    },
]

/*不用页面拦截state*/
var exclude_state = [
    "login",
    "newfoget",
]

/*http排除拦截地址*/
var httpurl_list = [
    {//统一登录
        url:'http://gw.test.shuwang.info/security/',
        method:"GET"
    },
    {//统一登录修改密码接口
        url:'http://gw.test.shuwang.info/security/user/reset/psw',
        method:'POST'
    },
]

