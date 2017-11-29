/**
 * Created by 黄忠园 on 2017/8/28.
 */
angular.module('module.login')
    /*身份事件*/
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    /*http错误*/
    .constant('HTTP_ERROR', {
        httpError:"http-error"
    })
    /*广播消息更新*/
    .constant('UPDATE_MSG', {
        buddyMsg:"buddy-msg",
        groupMsg:"group-msg",
        chatroomMsg:"chatroom-msg",
    })
    /*权限*/
    .value('POWER', {
        default: '*'
    })