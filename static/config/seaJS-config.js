/**
 * Created by zyc on 2016/6/27.
 */
// seajs 的简单配置
seajs.config({
    base: "/",
    alias: {
        "config": "/static/config/config",
        "jquery": "/static/js/jquery.min",
        "template": "/static/js/doT.min",
        "router": "/static/js/director",
        "store": "/static/js/store",
        "util": "/static/js/comm",
        "baseModule":'/modules/common/basePage',
        "baseDialogModule":'/modules/common/baseDialogPage'
    }
});


var list = [
    'pages/page1',
    'pages/page2',
    'pages/page4',
    'pages/page2',
    'pages/page4',
    'pages/page2',
    'pages/page4'

];