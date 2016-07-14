/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {
    var baseModule = require('baseModule');
    module.exports = $.extend({}, baseModule, {
        html: $(__inline("./page.html")),
        title: "页面2",
        //数据
        data: {},
        //组件init 仅执行一次
        ready: function (params) {
            //事件初始化
            this.methods.initEvent();
        },
        //每次切换进入到该组件 都会被执行
        load: function (params) {
            logger.log(this.title, ' load');
        },
        methods: {
            initEvent: function () {
                logger.log(this.title, 'ready , 事件初始化');
                this.html.on("click", ".topage1", function () {
                    showPage('#pages/page1', '123456789');
                });
                this.html.on("click", ".selectAddress", function () {
                    showDialogPage("pages/page3");
                });
            },
            //获取工时单价
            getPriceTime: function () {
                var that = this;
                var data = {
                    //"storeId": localStorage.storeId
                    "storeId": "7567179513947668613"
                };
                that.normalAjaxRequest(that.proiceTimeUrl, JSON.stringify(data), function (data) {
                    var datas = data.data;
                    //获取工时并且写入进input
                    $(".spanPrice .price").val(datas[0].labortimePrice);
                    $(".spanPrice .price").attr("data-ltpriceId", datas[0].ltpriceId);
                    //修改工时
                    $(".lot-time .price").change(function () {
                        $.confirm("确认要更改工时单价吗?", function () {
                            var data = {
                                "labortimePrice": $(".spanPrice .price").val(),
                                "ltpriceId": datas[0].ltpriceId
                            };
                            that.normalAjaxRequest(that.proiceTotalUrl, JSON.stringify(data), function (data) {
                                var $priceModify = parseFloat($(".price").val()).toFixed(2);
                                $(".price").html($priceModify);
                                window.location.reload();
                            })
                        })
                    });
                })
            },
            //批量工时渲染
            getlotTime: function () {
                var that = this;
                var data = {
                    //"storeId": localStorage.storeId
                    "storeId": "7567179513947668613"
                };
                that.normalAjaxRequest(that.lotTimeUrl, JSON.stringify(data), function (data) {
                    data.labortimePrice = +parseFloat($(".spanPrice .price").val());//当前工时单价
                    var html = require('../../tpl/workingHours.tpl')(data);//模板渲染数据
                    $('.table-reserve').html(html);
                    //改变工时，对应的改变价格
                    var timer = -1;
                    $(".table-reserve input").bind("input propertychange", function () {
                        var price = $(".price").val();
                        //工时改变
                        that.hasEdit = true;
                        //清除
                        clearTimeout(timer);
                        var $input = $(this);
                        var val = $input.val();//当前修改的input的值
                        //判断工时
                        if (!/^\+?[1-9][0-9]*$/.test(val)) {
                            $input.val("");
                            $input.parent().next().find("span").text("0.00");
                            return;
                        }
                        //工时改变，对应的总价也改变
                        timer = setTimeout(function () {
                            var total = (parseFloat(val) * parseFloat(price));
                            $input.parent().next().find("span").text(total);
                        }, 500);
                    });
                })
            },
            //保存批量工时设置
            saveShow: function () {
                var that = this;
                $(".btn-full").on("click", function () {
                    var isOk = true;
                    var batchList = [];
                    //循环选中的服务，并取出其中所需的值
                    $(".table-reserve .set-note .active ").each(function (i, item) {
                        var $tr = $(this).closest(".set-note");
                        var item = {
                            standardServiceCode: $tr.attr("data-standardservicecode"),//服务code
                            standardServiceName: $.trim($tr.find(".serverName").text()),//服务名称
                            aNum: $tr.find(".aNum-a").val(),//每个等级的工时价格
                            bNum: $tr.find(".aNum-b").val(),
                            cNum: $tr.find(".aNum-c").val(),
                            dNum: $tr.find(".aNum-d").val()
                        };
                        //保存时，判断工时的范围
                        if (!item.aNum || item.aNum == "0" || item.aNum > 9999 || !item.bNum || item.bNum == "0" || item.bNum > 9999 || !item.cNum || item.cNum == "0" || item.cNum > 9999 || !item.dNum || item.dNum == "0" || item.dNum > 9999) {
                            isOk = false;
                            return false;
                        }
                        batchList.push(item);
                    });
                    if (!isOk) {
                        $.alert("存在工时为0，范围为1到9999");
                        return false;
                    }
                    var data = {
                        //"storeId": localStorage.storeId,
                        "storeId": "7567179513947668613",
                        "batchList": batchList
                    };
                    that.normalAjaxRequest(that.saveLotTimeUrl, JSON.stringify(data), function (data) {
                        $.alert("保存成功!");
                        that.hasEdit = false;
                        history.go(-1);
                        //window.location.href = "../html/storeSet.html";
                    })
                })
            },
            //模糊查询
            fuzzyQuery: function () {
                var that = this;
                //点击清除搜索框的值
                $(".cancel").on("click", function () {
                    $(".fuzzyQuery").val("");
                });
                //当input失去焦点的时候，开始模糊查询
                $(".fuzzyQuery").on("blur", function () {
                    var $keyWord = $(this).val();
                    var data = {
                        "storeId": "7567179513947668613",
                        "keyWord": $keyWord
                    };
                    that.normalAjaxRequest(that.lotTimeUrl, JSON.stringify(data), function (data) {
                        console.log(data.data)
                        data.labortimePrice = +parseFloat($(".spanPrice .price").val());//当前工时单价
                        var html = require('../../tpl/workingHours.tpl')(data);//模板渲染数据
                        $('.table-reserve').html(html);
                        $(".pageOne").show();
                        $("#router").hide();
                    })
                })
            }

        }


    })
});
