var FormatMoney = {};

FormatMoney.formatMoney = function (s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
};

FormatMoney.formatCount = function (s) {
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(0) + "";
  var l = s.split(".")[0].split("").reverse();
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("");
};

FormatMoney.formatInt = function (s) {
  return parseInt(parseFloat(s));
}

FormatMoney.formatAmount = function (s) {
  s = parseFloat(s);
  return {
    y: parseInt(s / 100000000),
    w: parseInt((s % 100000000) / 10000)
  }
}

FormatMoney.formatUsers = function (s) {
  s = parseFloat(s);
  return {
    w: parseInt(s / 10000),
    g: parseInt(s % 10000)
  };
}

FormatMoney.formatNum = function (str) {
  var newStr = "";
  var count = 0;
  var str = str.toString();
  if (str.indexOf(".") == -1) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; //自动补小数点后两位
  } else {
    for (var i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
  }
  return str;
}


module.exports = FormatMoney;
