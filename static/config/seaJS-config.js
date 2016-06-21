/**
 * Created by zyc on 2016/6/11.
 */
// seajs 的简单配置
seajs.config({
    base: "/web_module_tpl",
    paths: {
        "configPath":"./../../static/config",
        "libPath":"./static/js",
    },
    alias: {
        "config": "configPath/config",
        "jquery": "libPath/jquery.min",
        "router": "libPath/director",
        "comm": "libPath/comm",
        "baseModule":'./../../common/basePage'
    },
    map: [
        [/^(.*\.(?:css|js|htm))(\?.*)?$/i, '$1?20160616']
    ]
});