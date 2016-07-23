/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseModule = require('baseModule');
    var util = require("util");
    module.exports = $.extend({}, baseModule, {
        html: $(__inline("./page.html")),
        title: "门店列表",
        //数据
        data: {
            page: 1,
            pageSize:10
        },
        //组件init 仅执行一次
        ready: function (params) {
            //事件初始化
            this.initEvent();
            //效果切换
            this.changeEvent();
            //上拉，下拉刷新
            this.droploadInit();
        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            util.logger.log(this.title, ' load');
        },
        /** 页面跳转
         * */
        initEvent: function () {
            util.logger.log(this.title, 'ready , 事件初始化');
            //
            this.html.on("click", ".topage1", function () {
                showPage('#pages/home', '123456789');
            });
            //
            this.html.on("click", ".selectAddress", function () {
                //showDialogPage("pages/detail");
                showPage('#pages/detail', '1234567');
            });
        },

        /** 效果切换
         * */
        changeEvent: function () {
            this.html.on("click", "i", function () {
                $(".storeList .address i").removeClass("active").addClass("radio");
                $(this).removeClass("radio").addClass("active");
            })
        },
        /**
         *上拉，下拉，加载刷新
         **/
        droploadInit: function () {
            var self = this;
            self.html.dropload({
                loadUpFn: function (dropload) {
                    console.log("下拉");
                    self.getStoreAddress(true, dropload);
                },
                loadDownFn: function (dropload) {
                    console.log("上拉");
                    self.getStoreAddress(false, dropload);
                }
            });
        },
        //获取数据
        getStoreAddress: function (isReload, dropload) {
            var self = this;
            if (isReload)self.data.page = 1;
            util.ajaxRequest({
                url: "services/getStoreAddress",
                data: {
                    page: self.data.page
                },
                success: function (d) {
                    self.dataBind(".storeItemTpl", d.data, ".storeListBox", isReload);//模板，数据，目标，
                    dropload.resetload();//重置上拉下拉控件
                    if (!isReload) {
                        self.data.page++;
                    }

                }
            });
        }


    })
});


