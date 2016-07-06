/**
 * Created by zyc on 2016/6/20.
 * base页面模块
 */
define(function (require, exports, module) {

    module.exports = {
        title: "模块化project",//标题
        html: undefined,//模块html
        _isInit: false,//是否初始化
        //数据
        data: {

        },
        //组件init 仅执行一次
        baseReady: function (params) {
            logger.log("组件初始化baseReady ", this.title);

            //将模块中的包含jid元素保存到对象中  方便操作
            var self = this;
            self.dom = {};
            self.html.find('[id]').each(function(){
                var key = this.getAttribute("id");
                self.dom[key] = $(this);
            });
        },
        //每次切换进入到该组件 都会被执行
        baseLoad: function (params) {
            logger.log("组件加载baseLoad ", this.title);
            window.document.title = this.title;
        },
        destroy: function () {

            logger.log("组件销毁destroy ", this.title);

        }
    }
});
