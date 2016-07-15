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
    //日志
    window.logger = {
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

    };

    


});