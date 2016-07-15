/**
 * Created by zyc on 2016/6/11.
 */

define(function (require, exports, module) {

    //字符串格式化
    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({[" + i + "]})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
    var config = require("config");
    //常用工具
    module.exports = {
        //日志
        logger: {
            _loggerList: [],
            log: function () {
                if (config.isDebug) {
                    console.log.apply(console, arguments);
                    this._loggerList.push(arguments);
                }
            },
            warn: function () {
                if (config.isDebug) {
                    console.warn.apply(console, arguments);
                    this._loggerList.push(arguments);
                }
            },
            error: function () {
                debugger
                if (config.isDebug) {
                    console.error.apply(console, arguments);
                    this._loggerList.push(arguments);
                }
            },
            info: function () {
                if (config.isDebug) {
                    console.info.apply(console, arguments);
                    this._loggerList.push(arguments);
                }
            }

        },
        //ajax
        ajaxRequest: function (options) {
            var opts = $.extend({
                success: undefined,
                error: undefined,
                type: "POST",
                url: "",
                data: {}
            }, options);
            $.ajax({
                type: opts.type,
                url: config.serviceHost + opts.url,
                data: opts.data,
                dataType: "jsonp",
                success: function (data) {
                    //返回数据格式如下：
                    //{
                    //    status: -1,  1：正确   其他值错误码
                    //    errorMsg: "登录账号不存在",
                    //    data: []
                    //};
                    if (data.status == 1) {
                        $.isFunction(opts.success) && opts.success(data);
                    }
                    else {
                        (data.errorMsg) && alert(data.errorMsg);
                        $.isFunction(opts.error) && opts.error(data);
                    }
                },
                error: function (xhr, exception) {
                    if (xhr.status == '200') {
                    }
                    if (xhr.status == '400') {
                        alert("请求参数格式不正确");
                    } else if (xhr.status == '401') {
                        alert("您没有操作权限");
                    } else if (xhr.status == '404') {
                        alert('请求地址不存在');
                    } else if (xhr.status == '500') {
                        alert('服务器内部错误');
                    }
                    else {
                        switch (exception) {
                            case 'timeout':
                                alert('请求超时');
                                break;
                            case 'abort':
                                alert('连接被终止');
                                break;
                            default:
                                alert('请求出错');
                        }
                    }
                    $.isFunction(opts.error) && opts.error(xhr, exception);
                }
            });
        }

    };


});