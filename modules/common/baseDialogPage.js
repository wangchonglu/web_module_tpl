/**
 * Created by zyc on 2016/6/20.
 * base页面模块
 */
define(function (require, exports, module) {

    var baseModule = require('baseModule');
    module.exports = $.extend({}, baseModule, {
        //组件init 仅执行一次
        isDialogPage:true,
        hideDialog: function () {

            logger.log("隱藏模式窗口", this.title);
            this.html.closest('#dialogBox').fadeOut();
            //this.html.remove();

        }
    });
});
