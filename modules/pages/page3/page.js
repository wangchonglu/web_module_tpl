/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseDialogModule = require('baseDialogModule');
    var util = require("util");
    //数据
    module.exports = $.extend({}, baseDialogModule, {
        html: $(__inline("./page.html")),
        title: "页面3",
        data: {},
        //组件init 仅执行一次
        ready: function (params) {

            //事件初始化
            this.initEvent(params);

        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            this.params = params;
            util.logger.log(this.title, ' load');
        },
        methods: {
            initEvent: function (params) {
                var self = this;
                util.logger.log(this.title, 'ready , 事件初始化');
                this.html.on("click", ".closeDialog", function () {
                    self.params.ok("abcdefg");
                    self.hideDialog();
                });

            }
        }

    });
});
