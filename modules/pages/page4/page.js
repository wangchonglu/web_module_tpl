/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseModule = require('baseModule');
    module.exports = $.extend({}, baseModule, {
        html:$(__inline("./page.html")),
        title: "页面4",
        //数据
        data: {},
        //组件init 仅执行一次
        ready: function (params) {

            //事件初始化
            this.initEvent();

        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            logger.log(this.title, ' load');
        },
        initEvent: function () {

            logger.log(this.title, 'ready , 事件初始化');
            this.html.on("click", ".topage1", function () {
                jumpPage('#pages/page1', '123456789')
            });

        }

    });
});