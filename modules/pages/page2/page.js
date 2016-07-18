/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseModule = require('baseModule');
    var util = require("util");
    module.exports = $.extend({}, baseModule, {
        html: $(__inline("./page.html")),
        title: "页面2",
        //数据
        data: {},
        //组件init 仅执行一次
        ready: function (params) {
            //事件初始化
            this.initEvent();
        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            util.logger.log(this.title, ' load');
        },

        initEvent: function () {
            util.logger.log(this.title, 'ready , 事件初始化');
            this.html.on("click", ".topage1", function () {
                showPage('#pages/page1', '123456789');
            });
            this.html.on("click", ".selectAddress", function () {
                showDialogPage("pages/page3");
            });
        },
    })
});
