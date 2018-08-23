var conv = {};

// 日期转换
conv.toDateStr = function(date, fmt){
  if(!date){
    return "";
  }

  fmt = fmt || "yyyy-MM-dd";

  var _date = date;
  if(typeof(date) === "string"){
    //添加IE兼容性
    date = date.replace(/-/g,"/");
    date = date.replace(/\./g,"/");

    _date = new Date(date);
  } if (typeof(date) === "number"){
    _date = new Date(date);
  }

  var o = {
    "M+": _date.getMonth() + 1, //月份
    "d+": _date.getDate(), //日
    "h+": _date.getHours(), //小时
    "m+": _date.getMinutes(), //分
    "s+": _date.getSeconds(), //秒
    "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
    "S": _date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

  return fmt;
}

// 获取枚举值字符串
conv.getEnumText = function(value, enumData, defaultText){
  if(!value && value !== 0){
    return "";
  }

  var valueStr = value.toString();
  return enumData[valueStr] || defaultText || value;
}

module.exports = conv;