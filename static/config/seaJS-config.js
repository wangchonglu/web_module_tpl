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
        "comm": "/static/js/comm",
        "baseModule":'/modules/common/basePage',
        "baseDialogModule":'/modules/common/baseDialogPage'
    }
});
