/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseModule = require('baseModule');
    module.exports = $.extend({}, baseModule, {
        title: "页面1",
        html: $(__inline("./page.html")),
        //数据
        data: {},
        //组件init 仅执行一次
        ready: function (params) {

            //跳转
            this.jump();
            //图片上传
            // this.selectImage();
            //焦点图轮播
            this.swiperShow();
            this.droploadInit();
            //数据绑定
            this.dataBind(".itemTpl", this.data.list, ".shopList");
        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            logger.log(this.title, ' load 完成,传递过来的参数：', params);

        },


        // 点击跳转
        jump: function () {
            this.html.on("click", "li", function () {
                showPage('/pages/page2', '123456789')
            });
        },
        //图片轮播
        swiperShow: function () {
            var mySwiper = new Swiper(".swiper-container", {
                direction: "horizontal",
                loop: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                pagination: ".swiper-pagination"
            })
        },
        //上拉下拉
        droploadInit: function () {
            this.html.dropload({
                scrollArea: window,
                loadDownFn: function (me) {
                    logger.log("上拉");
                    setTimeout(function(){
                        me.resetload();
                    },2000)
                },
                loadUpFn: function (me) {
                    logger.log("下拉");
                    setTimeout(function(){
                        me.resetload();
                    },2000)
                }
            });
        },


    });
});

