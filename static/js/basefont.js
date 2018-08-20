;(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    var fontSize = 20 * (clientWidth / 375);
    fontSize = (fontSize > 54) ? 54: fontSize;
    //如果是pc访问
    if(!/windows phone|iphone|android|iPad/ig.test(window.navigator.userAgent)) {
      fontSize = 20;
    }
    docEl.style.fontSize = fontSize + 'px';
    var dpi =  window.devicePixelRatio;
    docEl.setAttribute('data-dpi',dpi);
    var scale = 1/dpi;
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();
})(document, window);