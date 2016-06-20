/**
 * Created by zyc on 2016/6/9.
 */
//入口模块
define(function (require, exports, module) {
    // 通过 require 引入依赖
    window["$"] = window.jQuery = require('jquery');
    require("comm");//通用函数

    var _router = require("router");
    //路由配置
    var routesConfig = {
        "/:moudle/:page/?((\w|.)*)": function (moudle, page, data) {

            console.log("加载模块：{0}/{1}  ,参数：{2}".format(moudle, page, data));
            var moduleTpl = "./modules/{0}/{1}/page.html".format(moudle, page);
            var moduleJs = "./modules/{0}/{1}/page.js".format(moudle, page);
            var moduleCss = "./modules/{0}/{1}/page.css".format(moudle, page);
           // var baseModule = "./modules/common/basePage.js".format(moudle, page);
            //加载动态数据，需用async
            require.async([moduleTpl, moduleJs, moduleCss], function (tpl, run) {
                debugger
                var $content = $(tpl);
                $.isFunction(run.load) && run.load($content, data);
                $("#main").html($content);
            });
        }
    };
    window.router = new _router.Router(routesConfig);
    router.setRoute("pages/page1");//设置默认首页
    router.init();//路由初始化
});


