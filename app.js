/**
 * Created by zyc on 2016/6/9.
 */
//入口模块
define(function (require, exports, module) {

    // 通过 require 引入依赖
    var util = require("util");//通用函数

    var mainDom = $("#main");
    var mainDialogContent = $("#dialogBox .dialogContent");

    //地址和参数转换成hashUrl
    function dataToUrl(url, param) {
        param = typeof param == "object" ? JSON.stringify(param) : param;
        return '{0}/{1}'.format(url, param);
    }

    //路由模块跳转请求
    function routeRequire(moudle, page, data) {

        util.logger.log("加载模块：{0}/{1}  ,参数：{2}".format(moudle, page, data));
        var moduleJs = "./modules/{0}/{1}/page.js".format(moudle, page);
        //加载动态数据，需用async
        require.async([moduleJs], function (mod) {
            if (window.currentModule) {
                //新模块进入显示前，使用detach删除旧模块，以保存模块所有事件
                window.currentModule.html = window.currentModule.html.detach();
            }
            //保存當前模塊hashUrl
            mod.hashUrl = window.location.hash;
            window.currentModule = mod;//保存当前模块
            //显示模块内容
            mainDom.html(mod.html);

            !mod._isInit && $.isFunction(mod.baseReady) && mod.baseReady(data);//父组件初始化
            !mod._isInit && $.isFunction(mod.ready) && mod.ready(data);//组件初始化
            !mod._isInit && (mod._isInit = true);//组件设为已经初始化
            $.isFunction(mod.baseLoad) && mod.baseLoad(data);//父组件进入
            $.isFunction(mod.load) && mod.load(data);//组件进入
        });
    }

    //路由配置
    var routesConfig = {
        "/:moudle/:page/?((\w|.)*)": {
            before: function (moudle, page, data) {
                //如果有模式窗口 則回退失效
                if (window.currentDialogModule && window.currentDialogModule.show) {
                    if(window.location.hash==window.currentModule.hashUrl){
                        window.currentDialogModule.hideDialog();//关闭模式窗口
                    }
                    window.location.hash = window.currentModule.hashUrl;//当前模块路径
                    //window.history.forward();
                    return false;
                }
            },
            on: function (moudle, page, data) {
                //记录当前模块
                localStorage.setItem("currentMoudleHash",location.hash.substr(1));
                //解析加载当前模块
                routeRequire(moudle, page, data);
            }
        }
    };
    var router = new Router(routesConfig);
    var homePage = localStorage.getItem("currentMoudleHash") || "/pages/home";
    router.setRoute(homePage);//设置默认首页
    router.init();//路由初始化

    //跳转页面
    window.showPage = function (url, param) {
        router.setRoute(dataToUrl(url, param));
    };

    /**
     * 加載彈出框页面
     * @url 模块path 例如pages/detail
     * @data 参数
     * @position 弹出框口位置，枚举值：center、top、bottom .默认为center
     */
    window.showDialogPage = function (url, data, position) {
        util.logger.log("加载弹出模块：{0}  ,参数：{1}".format(url, data));

        var positionCssClass = {
            top: "positionTop",
            center: "positionCenter",
            bottom: "positionBottom"
        };
        var cssClass = positionCssClass[position] || "positionCenter";

        var moduleJs = "./modules/{0}/page.js".format(url);
        //加载动态数据，需用async
        require.async([moduleJs], function (mod) {
            if (window.currentDialogModule) {
                //新模块进入显示前，使用detach删除旧模块，以保存模块所有事件
                window.currentDialogModule.html = window.currentDialogModule.html.detach();
            }
            mod.show = true;//显示
            mod.positionCss=cssClass;
            window.currentDialogModule = mod;//保存当前模块

            //显示模块内容
            mainDialogContent.html(mod.html).addClass(cssClass).parent().show("fast");

            !mod._isInit && $.isFunction(mod.baseReady) && mod.baseReady(data);//父组件初始化
            !mod._isInit && $.isFunction(mod.ready) && mod.ready(data);//组件初始化
            !mod._isInit && (mod._isInit = true);//组件设为已经初始化
            $.isFunction(mod.baseLoad) && mod.baseLoad(data);//父组件进入
            $.isFunction(mod.load) && mod.load(data);//组件进入
        });
    }

});


