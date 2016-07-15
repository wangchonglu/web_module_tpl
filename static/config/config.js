/**
 * Created by zyc on 2016/6/20.
 */

/* *
 * 项目相关的全局配置
 */
define(function (require, exports, module) {

    module.exports = {
        isDebug: true,// 是否开启调试模式,调试模式开启会打印日志信息
        //ajax请求通用方法
       normalAjaxRequest : function(url, json, func, errorFn) {
            $.ajax({
                type: "GET",
                url: url,
                data: {
                    json: json,
                    dataType: '1'
                },
                dataType: "jsonp",
                success: function(data) {
                    if (data.result == "0") {
                        //把指针转换到ajax里的对象
                        this.root = root;
                        //0为成功
                        func(data);
                    } else {
                        //这里做了兼容
                        if ($.isFunction(errorFn)) {
                            errorFn(data);
                        } else {
                            //返回错误代码时显示错误信息
                            alert(data.message);
                        }
                    }
                },
                error: function(textstatus) {
                }
            })
        }
    };

});
