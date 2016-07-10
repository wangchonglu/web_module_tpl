/**
 * Created by zyc on 2016/6/9.
 */
//入口模块
define(function (require, exports, module) {

    // 通过 require 引入依赖
    window["$"] = window.jQuery = require('jquery');
    require("comm");//通用函数

    var mainDom = $("#main");
    var mainDialogDom = $("#dialogBox");

    //路由模块跳转请求
    function routeRequire(moudle, page, data) {

        logger.log("加载模块：{0}/{1}  ,参数：{2}".format(moudle, page, data));
        var moduleJs = "./modules/{0}/{1}/page.js".format(moudle, page);
        //加载动态数据，需用async
        require.async([moduleJs], function (mod) {

            if (window.currentModule) {
                //新模块进入显示前，使用detach删除旧模块，以保存模块所有事件
                window.currentModule.html = window.currentModule.html.detach();
            }
            window.currentModule = mod;//保存当前模块
            mainDom.html(mod.html);//显示模块内容

            !mod._isInit && $.isFunction(mod.baseReady) && mod.baseReady(data);//父组件初始化
            !mod._isInit && $.isFunction(mod.ready) && mod.ready(data);//组件初始化
            !mod._isInit && (mod._isInit = true);//组件设为已经初始化
            $.isFunction(mod.baseLoad) && mod.baseLoad(data);//父组件进入
            $.isFunction(mod.load) && mod.load(data);//组件进入
        });
    }

    var _router = require("router");
    //路由配置
    var routesConfig = {
        "/:moudle/:page/?((\w|.)*)": {
            before: function (moudle, page, data) {
                // return false;     
            },
            on: function (moudle, page, data) {
                routeRequire(moudle, page, data);
            }
        },
    };
    var router = new _router.Router(routesConfig);
    router.setRoute("/pages/page1");//设置默认首页
    router.init();//路由初始化

    //跳转页面
    window.showPage = function (url, param) {
        param = typeof param == "object" ? JSON.stringify(param) : param;
        router.setRoute('{0}/{1}'.format(url, param));
    }
    //加載彈出框页面
    window.showDialogPage = function (url, data) {  //url:pages/page3   param:1234567
        logger.log("加载弹出模块：{0}  ,参数：{1}".format(url, data));
        var moduleJs = "./modules/{0}/page.js".format(url);
        //加载动态数据，需用async
        require.async([moduleJs], function (mod) {

            if (window.currentDialogModule) {
                //新模块进入显示前，使用detach删除旧模块，以保存模块所有事件
                window.currentDialogModule.html = window.currentDialogModule.html.detach();
            }
            window.currentDialogModule = mod;//保存当前模块

            //显示模块内容
            mainDialogDom.find(".dialogContent").html(mod.html);
            mainDialogDom.fadeIn("slow");

            !mod._isInit && $.isFunction(mod.baseReady) && mod.baseReady(data);//父组件初始化
            !mod._isInit && $.isFunction(mod.ready) && mod.ready(data);//组件初始化
            !mod._isInit && (mod._isInit = true);//组件设为已经初始化
            $.isFunction(mod.baseLoad) && mod.baseLoad(data);//父组件进入
            $.isFunction(mod.load) && mod.load(data);//组件进入
        });
    }


});


