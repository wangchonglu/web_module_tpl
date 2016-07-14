/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseModule = require('baseModule');
    module.exports = $.extend({}, baseModule, {
        title: "页面1",
        html: $(__inline("./page.html")),
        //数据
        data: {
            list: [
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00},
                {name: "商品：美食烧鹅", price: 100.00}
            ]
        },
        //组件init 仅执行一次
        ready: function (params) {
            //跳转
            this.jump();
            this.selectImage();

            //数据绑定
            this.dataBind(".itemTpl",this.data.list,".shopList");
        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            logger.log(this.title, ' load 完成,传递过来的参数：', params);


        },
        jump: function () {
            this.html.on("click", "li", function () {
                showPage('/pages/page2', '123456789')
            });
        },
        selectImage: function () {
            var self = this;
            this.dom.uploadFile.on("change", function () { //当input发生改变的时候，
                debugger
                var file = this.files[0];//图片只能上传一张

                if (!file.type.match('image.*')) {   //判断是否是图片类型
                    alert('请选择图片');
                    return false;
                }
                var reader = new FileReader();//new 一个新的file对象
                reader.onload = function () {  //当图片加载完成后
                    self.dom.img.attr('src', reader.result);//把当前转换的对象添加到img对象中
                };
                reader.readAsDataURL(file);//把读取到的图片编码成Data URL

            });

        }
    });
});
