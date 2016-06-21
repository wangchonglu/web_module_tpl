/**
 * Created by zyc on 2016/6/20.
 * base页面模块  所有模块均继承与它
 */
define(function (require, exports, module) {

    module.exports = {
        title:"模块化project",//标题
        html:undefined,//模块html
        params:undefined,//参数
        _isInit:false,//是否初始化
        data:{
            
        },
        //组件init 仅执行一次
        baseReady:function(){
            logger.log("组件初始化baseReady ",this.title);
        },
        //每次切换进入到该组件 都会被执行
        baseLoad:function(){
            logger.log("组件加载baseLoad ",this.title);
            window.document.title = this.title;
        },
        destroy:function(){
            
            logger.log("组件销毁destroy ",this.title);
            
        }
    }
});