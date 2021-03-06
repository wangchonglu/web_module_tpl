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
            var store = require("store");//什么时候用，就在什么时候调用
            this.dom.address.val(store.baoxianType["1"]);
        },
        methods: {
            initEvent: function () {
                util.logger.log(this.title, 'ready , 事件初始化');
                var self = this;
                this.html.on("click", ".topage1", function () {
                    showPage('#pages/page1', '123456789');
                });
                this.html.on("click", ".selectAddress", function () {
                    showDialogPage("pages/page3", {
                        ok: function (data) {
                            self.dom.address.val(data);
                            util.logger.log("获取到的值：", data);
                        }
                    });
                });
            }
        }
    });
});
