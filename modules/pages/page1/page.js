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
            this.selectImage();//选择图片事件初始化


        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            logger.log(this.title, ' load 完成,传递过来的参数：', params);

            console.log(this.dom.uploadFile);

        },
        jump: function () {
            $("#page1 ul").on("click", "li", function () {
                jumpPage('/pages/page2', '123456789')
            });
        },
        selectImage: function () {
            var self = this;
            this.dom.uploadFile.on("change", function () {
                var file = this.files[0];

                if (!file.type.match('image.*')) {
                    alert('请选择图片');
                    return false;
                }
                var reader = new FileReader();
                reader.onload = function () {
                    self.dom.img.attr('src',reader.result);
                };
                reader.readAsDataURL(file);

            });

        }
    })
    ;
})
;
