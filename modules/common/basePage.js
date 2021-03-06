/**
 * Created by zyc on 2016/6/20.
 * base页面模块
 */
define(function (require, exports, module) {
    var util = require("util");
    module.exports = {
        title: "模块化project",//标题
        html: undefined,//模块html
        _isInit: false,//是否初始化
        //数据
        data: {

        },
        //组件init 仅执行一次
        baseReady: function (params) {
            util.logger.log("组件初始化baseReady ", this.title);

            //将模块中的包含jid元素保存到对象中  方便操作
            var self = this;
            self.dom = {};
            self.html.find('[id]').each(function () {
                var key = this.getAttribute("id");
                self.dom[key] = $(this);
            });

            //将methods里面的函数复制一份到模块上  方便在具体模块中用this.abc()调用
            for (var funName in this.methods) {
                self[funName] = self.methods[funName];
            }
            delete this.methods;//复制完后  删除methods属性，保持模块干净

        },
        //每次切换进入到该组件 都会被执行
        baseLoad: function (params) {
            util.logger.log("组件加载baseLoad ", this.title);
            window.document.title = this.title;




        },
        //数据-模板 绑定
        dataBind: function (tplFilter, data, targetFilter) {
            var tpl = this.html.filter(tplFilter).html();
            var listHtml = doT.template(tpl)(data);
            this.html.find(targetFilter).html(listHtml);
        },
        destroy: function () {

            util.logger.log("组件销毁destroy ", this.title);

        }
    }
});
