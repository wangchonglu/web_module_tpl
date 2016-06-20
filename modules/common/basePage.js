/**
 * Created by zyc on 2016/6/20.
 * base页面模块  所有模块均继承与它
 */
define(function (require, exports, module) {
    module.exports = {
        title:"",
        html:require("./page.html"),
        data:{

        },
        ready:function(){
            logger.log("组件初始化",this.title);
        },
        load:function(){
            logger.log("组件加载",this.title);
            window.document.title = this.title;
        },
        destroy:function(){
            logger.log("组件销毁",this.title);
        }
    }
});