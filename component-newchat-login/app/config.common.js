/**
 * Created by 黄忠园 on 2017/8/24.
 */
/*viewurl*/
var login_viewurl = '';


/*失败信息命名列表*/
var error_list = [
    "msg","message","reason"
]
/*不用页面拦截state*/
var exclude_state = [
    "virtual.register",
    "newfoget",
]




/*http排除拦截地址*/
var httpurl_list = [
    {//登录接口
        url:'http://inner.test.shuwang.info/receipt/receipt/user/usercenter/login',
        method:"POST"
    }
]