/**
 * Created by zyc on 2016/6/20.
 * base页面模块
 */
define(function (require, exports, module) {

    var baseModule = require('baseModule');
    var util = require("util");
    module.exports = $.extend({}, baseModule, {
        //组件init 仅执行一次
        show:false,
        isDialogPage:true,
        hideDialog: function () {
            util.logger.log("隱藏模式窗口", this.title);
            this.html.parent().removeClass(this.positionCss).parent().fadeOut();
            this.show = false;
        }
    });
});
