/**
 * Created by zyc on 2016/6/9.
 */
//入口模块
define(function (require, exports, module) {
  // 通过 require 引入依赖
  window[ "$" ] = window.jQuery = require('jquery');
  require("comm");//通用函数

  var _router = require("router");
  //路由配置
  var routesConfig = {
    "/:moudle/:page/?((\w|.)*)": function (moudle, page, data) {

      console.log("加载模块：{0}/{1}  ,参数：{2}".format(moudle, page, data));
      var moduleTpl = "./modules/{0}/{1}/page.html".format(moudle, page);
      var moduleJs = "./modules/{0}/{1}/page.js".format(moudle, page);
      var moduleCss = "./modules/{0}/{1}/page.css".format(moudle, page);
      //加载动态数据，需用async
      require.async([ moduleTpl, moduleJs, moduleCss ], function (tpl, mod) {

        console.log('html-------',mod.html);
        !mod.html && (mod.html = $(tpl));//设置模块的html
        mod.params = data;//设置模块参数
        !mod._isInit && $.isFunction(mod.baseReady) && mod.baseReady();//父组件初始化
        !mod._isInit && $.isFunction(mod.ready) && mod.ready();//组件初始化
        !mod._isInit && (mod._isInit = true);//组件设为已经初始化
        $.isFunction(mod.baseLoad) && mod.baseLoad();//父组件进入
        $.isFunction(mod.load) && mod.load();//组件进入

        $("#main").html(mod.html);//显示模块内容

      });
    }
  };
  window.router = new _router.Router(routesConfig);
  router.setRoute("pages/page1");//设置默认首页
  router.init();//路由初始化

  //跳转页面
  window.jumpPage = function (url, param) {
    var param = typeof param == "object" ? JSON.stringify(param) : param;
    router.setRoute(url, param);
  }

});


