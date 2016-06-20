/**
 * Created by zyc on 2016/6/11.
 */
// seajs 的简单配置
seajs.config({
    base: "/",
    paths: {

    },
    alias: {
        "jquery": "./static/js/jquery.min",
        "router": "./static/js/director",
        "comm": "./static/js/comm",
    },
    map: [
        [/^(.*\.(?:css|js|htm))(\?.*)?$/i, '$1?20160616']
    ]
});