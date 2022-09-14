import $ from "jquery";
import whatInput from "what-input";
window.$ = $;
import Foundation from "foundation-sites";
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? e(require("$"))
    : e(window.$ || window.Zepto);
})(function (e) {
  var t,
    n,
    o,
    a,
    i,
    s,
    r = function () {},
    l = !!window.$,
    c = e(window),
    d = function (e, n) {
      t.ev.on("mfp" + e + ".mfp", n);
    },
    p = function (t, n, o, a) {
      var i = document.createElement("div");
      return (
        (i.className = "mfp-" + t),
        o && (i.innerHTML = o),
        a ? n && n.appendChild(i) : ((i = e(i)), n && i.appendTo(n)),
        i
      );
    },
    u = function (n, o) {
      t.ev.triggerHandler("mfp" + n, o),
        t.st.callbacks &&
          ((n = n.charAt(0).toLowerCase() + n.slice(1)),
          t.st.callbacks[n] &&
            t.st.callbacks[n].apply(t, e.isArray(o) ? o : [o]));
    },
    m = function (n) {
      return (
        (n === s && t.currTemplate.closeBtn) ||
          ((t.currTemplate.closeBtn = e(
            t.st.closeMarkup.replace("%title%", t.st.tClose)
          )),
          (s = n)),
        t.currTemplate.closeBtn
      );
    },
    f = function () {
      e.magnificPopup.instance ||
        ((t = new r()).init(), (e.magnificPopup.instance = t));
    };
  (r.prototype = {
    constructor: r,
    init: function () {
      var n = navigator.appVersion;
      (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
        (t.isAndroid = /android/gi.test(n)),
        (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
        (t.supportsTransition = (function () {
          var e = document.createElement("p").style,
            t = ["ms", "O", "Moz", "Webkit"];
          if (void 0 !== e.transition) return !0;
          for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
          return !1;
        })()),
        (t.probablyMobile =
          t.isAndroid ||
          t.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (o = e(document)),
        (t.popupsCache = {});
    },
    open: function (n) {
      var a;
      if (!1 === n.isObj) {
        (t.items = n.items.toArray()), (t.index = 0);
        var s,
          r = n.items;
        for (a = 0; a < r.length; a++)
          if (((s = r[a]).parsed && (s = s.el[0]), s === n.el[0])) {
            t.index = a;
            break;
          }
      } else
        (t.items = e.isArray(n.items) ? n.items : [n.items]),
          (t.index = n.index || 0);
      if (!t.isOpen) {
        (t.types = []),
          (i = ""),
          n.mainEl && n.mainEl.length ? (t.ev = n.mainEl.eq(0)) : (t.ev = o),
          n.key
            ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
              (t.currTemplate = t.popupsCache[n.key]))
            : (t.currTemplate = {}),
          (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
          (t.fixedContentPos =
            "auto" === t.st.fixedContentPos
              ? !t.probablyMobile
              : t.st.fixedContentPos),
          t.st.modal &&
            ((t.st.closeOnContentClick = !1),
            (t.st.closeOnBgClick = !1),
            (t.st.showCloseBtn = !1),
            (t.st.enableEscapeKey = !1)),
          t.bgOverlay ||
            ((t.bgOverlay = p("bg").on("click.mfp", function () {
              t.close();
            })),
            (t.wrap = p("wrap")
              .attr("tabindex", -1)
              .on("click.mfp", function (e) {
                t._checkIfClose(e.target) && t.close();
              })),
            (t.container = p("container", t.wrap))),
          (t.contentContainer = p("content")),
          t.st.preloader &&
            (t.preloader = p("preloader", t.container, t.st.tLoading));
        var l = e.magnificPopup.modules;
        for (a = 0; a < l.length; a++) {
          var f = l[a];
          (f = f.charAt(0).toUpperCase() + f.slice(1)), t["init" + f].call(t);
        }
        u("BeforeOpen"),
          t.st.showCloseBtn &&
            (t.st.closeBtnInside
              ? (d("MarkupParse", function (e, t, n, o) {
                  n.close_replaceWith = m(o.type);
                }),
                (i += " mfp-close-btn-in"))
              : t.wrap.append(m())),
          t.st.alignTop && (i += " mfp-align-top"),
          t.fixedContentPos
            ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY,
              })
            : t.wrap.css({ top: c.scrollTop(), position: "absolute" }),
          (!1 === t.st.fixedBgPos ||
            ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
            t.bgOverlay.css({ height: o.height(), position: "absolute" }),
          t.st.enableEscapeKey &&
            o.on("keyup.mfp", function (e) {
              27 === e.keyCode && t.close();
            }),
          c.on("resize.mfp", function () {
            t.updateSize();
          }),
          t.st.closeOnContentClick || (i += " mfp-auto-cursor"),
          i && t.wrap.addClass(i);
        var v = (t.wH = c.height()),
          g = {};
        if (t.fixedContentPos && t._hasScrollBar(v)) {
          var h = t._getScrollbarSize();
          h && (g.marginRight = h);
        }
        t.fixedContentPos &&
          (t.isIE7
            ? e("body, html").css("overflow", "hidden")
            : (g.overflow = "hidden"));
        var w = t.st.mainClass;
        return (
          t.isIE7 && (w += " mfp-ie7"),
          w && t._addClassToMFP(w),
          t.updateItemHTML(),
          u("BuildControls"),
          e("html").css(g),
          t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
          (t._lastFocusedEl = document.activeElement),
          setTimeout(function () {
            t.content
              ? (t._addClassToMFP("mfp-ready"), t._setFocus())
              : t.bgOverlay.addClass("mfp-ready"),
              o.on("focusin.mfp", t._onFocusIn);
          }, 16),
          (t.isOpen = !0),
          t.updateSize(v),
          u("Open"),
          n
        );
      }
      t.updateItemHTML();
    },
    close: function () {
      t.isOpen &&
        (u("BeforeClose"),
        (t.isOpen = !1),
        t.st.removalDelay && !t.isLowIE && t.supportsTransition
          ? (t._addClassToMFP("mfp-removing"),
            setTimeout(function () {
              t._close();
            }, t.st.removalDelay))
          : t._close());
    },
    _close: function () {
      u("Close");
      var n = "mfp-removing mfp-ready ";
      if (
        (t.bgOverlay.detach(),
        t.wrap.detach(),
        t.container.empty(),
        t.st.mainClass && (n += t.st.mainClass + " "),
        t._removeClassFromMFP(n),
        t.fixedContentPos)
      ) {
        var a = { marginRight: "" };
        t.isIE7 ? e("body, html").css("overflow", "") : (a.overflow = ""),
          e("html").css(a);
      }
      o.off("keyup.mfp focusin.mfp"),
        t.ev.off(".mfp"),
        t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        t.bgOverlay.attr("class", "mfp-bg"),
        t.container.attr("class", "mfp-container"),
        !t.st.showCloseBtn ||
          (t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type]) ||
          (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
        t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
        (t.currItem = null),
        (t.content = null),
        (t.currTemplate = null),
        (t.prevHeight = 0),
        u("AfterClose");
    },
    updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth,
          o = window.innerHeight * n;
        t.wrap.css("height", o), (t.wH = o);
      } else t.wH = e || c.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), u("Resize");
    },
    updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(),
        t.content && t.content.detach(),
        n.parsed || (n = t.parseEl(t.index));
      var o = n.type;
      if (
        (u("BeforeChange", [t.currItem ? t.currItem.type : "", o]),
        (t.currItem = n),
        !t.currTemplate[o])
      ) {
        var i = !!t.st[o] && t.st[o].markup;
        u("FirstMarkupParse", i), (t.currTemplate[o] = !i || e(i));
      }
      a && a !== n.type && t.container.removeClass("mfp-" + a + "-holder");
      var s = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](
        n,
        t.currTemplate[o]
      );
      t.appendContent(s, o),
        (n.preloaded = !0),
        u("Change", n),
        (a = n.type),
        t.container.prepend(t.contentContainer),
        u("AfterChange");
    },
    appendContent: function (e, n) {
      (t.content = e),
        e
          ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n]
            ? t.content.find(".mfp-close").length || t.content.append(m())
            : (t.content = e)
          : (t.content = ""),
        u("BeforeAppend"),
        t.container.addClass("mfp-" + n + "-holder"),
        t.contentContainer.append(t.content);
    },
    parseEl: function (n) {
      var o,
        a = t.items[n];
      if (
        (a.tagName
          ? (a = { el: e(a) })
          : ((o = a.type), (a = { data: a, src: a.src })),
        a.el)
      ) {
        for (var i = t.types, s = 0; s < i.length; s++)
          if (a.el.hasClass("mfp-" + i[s])) {
            o = i[s];
            break;
          }
        (a.src = a.el.attr("data-mfp-src")),
          a.src || (a.src = a.el.attr("href"));
      }
      return (
        (a.type = o || t.st.type || "inline"),
        (a.index = n),
        (a.parsed = !0),
        (t.items[n] = a),
        u("ElementParse", a),
        t.items[n]
      );
    },
    addGroup: function (e, n) {
      var o = function (o) {
        (o.mfpEl = this), t._openClick(o, e, n);
      };
      n || (n = {});
      var a = "click.magnificPopup";
      (n.mainEl = e),
        n.items
          ? ((n.isObj = !0), e.off(a).on(a, o))
          : ((n.isObj = !1),
            n.delegate
              ? e.off(a).on(a, n.delegate, o)
              : ((n.items = e), e.off(a).on(a, o)));
    },
    _openClick: function (n, o, a) {
      if (
        (void 0 !== a.midClick
          ? a.midClick
          : e.magnificPopup.defaults.midClick) ||
        !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)
      ) {
        var i =
          void 0 !== a.disableOn
            ? a.disableOn
            : e.magnificPopup.defaults.disableOn;
        if (i)
          if (e.isFunction(i)) {
            if (!i.call(t)) return !0;
          } else if (c.width() < i) return !0;
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
          (a.el = e(n.mfpEl)),
          a.delegate && (a.items = o.find(a.delegate)),
          t.open(a);
      }
    },
    updateStatus: function (e, o) {
      if (t.preloader) {
        n !== e && t.container.removeClass("mfp-s-" + n),
          o || "loading" !== e || (o = t.st.tLoading);
        var a = { status: e, text: o };
        u("UpdateStatus", a),
          (e = a.status),
          (o = a.text),
          t.preloader.html(o),
          t.preloader.find("a").on("click", function (e) {
            e.stopImmediatePropagation();
          }),
          t.container.addClass("mfp-s-" + e),
          (n = e);
      }
    },
    _checkIfClose: function (n) {
      if (!e(n).hasClass("mfp-prevent-close")) {
        var o = t.st.closeOnContentClick,
          a = t.st.closeOnBgClick;
        if (o && a) return !0;
        if (
          !t.content ||
          e(n).hasClass("mfp-close") ||
          (t.preloader && n === t.preloader[0])
        )
          return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (o) return !0;
        } else if (a && e.contains(document, n)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e);
    },
    _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
    },
    _hasScrollBar: function (e) {
      return (
        (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || c.height())
      );
    },
    _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
    },
    _onFocusIn: function (n) {
      if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target))
        return t._setFocus(), !1;
    },
    _parseMarkup: function (t, n, o) {
      var a;
      o.data && (n = e.extend(o.data, n)),
        u("MarkupParse", [t, n, o]),
        e.each(n, function (n, o) {
          if (void 0 === o || !1 === o) return !0;
          if ((a = n.split("_")).length > 1) {
            var i = t.find(".mfp-" + a[0]);
            if (i.length > 0) {
              var s = a[1];
              "replaceWith" === s
                ? i[0] !== o[0] && i.replaceWith(o)
                : "img" === s
                ? i.is("img")
                  ? i.attr("src", o)
                  : i.replaceWith(
                      e("<img>").attr("src", o).attr("class", i.attr("class"))
                    )
                : i.attr(a[1], o);
            }
          } else t.find(".mfp-" + n).html(o);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        (e.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(e),
          (t.scrollbarSize = e.offsetWidth - e.clientWidth),
          document.body.removeChild(e);
      }
      return t.scrollbarSize;
    },
  }),
    (e.magnificPopup = {
      instance: null,
      proto: r.prototype,
      modules: [],
      open: function (t, n) {
        return (
          f(),
          ((t = t ? e.extend(!0, {}, t) : {}).isObj = !0),
          (t.index = n || 0),
          this.instance.open(t)
        );
      },
      close: function () {
        return e.magnificPopup.instance && e.magnificPopup.instance.close();
      },
      registerModule: function (t, n) {
        n.options && (e.magnificPopup.defaults[t] = n.options),
          e.extend(this.proto, n.proto),
          this.modules.push(t);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (e.fn.magnificPopup = function (n) {
      f();
      var o = e(this);
      if ("string" == typeof n)
        if ("open" === n) {
          var a,
            i = l ? o.data("magnificPopup") : o[0].magnificPopup,
            s = parseInt(arguments[1], 10) || 0;
          i.items
            ? (a = i.items[s])
            : ((a = o), i.delegate && (a = a.find(i.delegate)), (a = a.eq(s))),
            t._openClick({ mfpEl: a }, o, i);
        } else
          t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
      else
        (n = e.extend(!0, {}, n)),
          l ? o.data("magnificPopup", n) : (o[0].magnificPopup = n),
          t.addGroup(o, n);
      return o;
    });
  var v,
    g,
    h,
    w = function () {
      h && (g.after(h.addClass(v)).detach(), (h = null));
    };
  e.magnificPopup.registerModule("inline", {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        t.types.push("inline"),
          d("Close.inline", function () {
            w();
          });
      },
      getInline: function (n, o) {
        if ((w(), n.src)) {
          var a = t.st.inline,
            i = e(n.src);
          if (i.length) {
            var s = i[0].parentNode;
            s &&
              s.tagName &&
              (g || ((v = a.hiddenClass), (g = p(v)), (v = "mfp-" + v)),
              (h = i.after(g).detach().removeClass(v))),
              t.updateStatus("ready");
          } else t.updateStatus("error", a.tNotFound), (i = e("<div>"));
          return (n.inlineElement = i), i;
        }
        return t.updateStatus("ready"), t._parseMarkup(o, {}, n), o;
      },
    },
  });
  var y,
    b = function () {
      y && e(document.body).removeClass(y);
    },
    C = function () {
      b(), t.req && t.req.abort();
    };
  e.magnificPopup.registerModule("ajax", {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        t.types.push("ajax"),
          (y = t.st.ajax.cursor),
          d("Close.ajax", C),
          d("BeforeChange.ajax", C);
      },
      getAjax: function (n) {
        y && e(document.body).addClass(y), t.updateStatus("loading");
        var o = e.extend(
          {
            url: n.src,
            success: function (o, a, i) {
              var s = { data: o, xhr: i };
              u("ParseAjax", s),
                t.appendContent(e(s.data), "ajax"),
                (n.finished = !0),
                b(),
                t._setFocus(),
                setTimeout(function () {
                  t.wrap.addClass("mfp-ready");
                }, 16),
                t.updateStatus("ready"),
                u("AjaxContentAdded");
            },
            error: function () {
              b(),
                (n.finished = n.loadError = !0),
                t.updateStatus(
                  "error",
                  t.st.ajax.tError.replace("%url%", n.src)
                );
            },
          },
          t.st.ajax.settings
        );
        return (t.req = e.ajax(o)), "";
      },
    },
  });
  var $,
    k = function (n) {
      if (n.data && void 0 !== n.data.title) return n.data.title;
      var o = t.st.image.titleSrc;
      if (o) {
        if (e.isFunction(o)) return o.call(t, n);
        if (n.el) return n.el.attr(o) || "";
      }
      return "";
    };
  e.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var n = t.st.image,
          o = ".image";
        t.types.push("image"),
          d("Open" + o, function () {
            "image" === t.currItem.type &&
              n.cursor &&
              e(document.body).addClass(n.cursor);
          }),
          d("Close" + o, function () {
            n.cursor && e(document.body).removeClass(n.cursor),
              c.off("resize.mfp");
          }),
          d("Resize" + o, t.resizeImage),
          t.isLowIE && d("AfterChange", t.resizeImage);
      },
      resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE &&
            (n =
              parseInt(e.img.css("padding-top"), 10) +
              parseInt(e.img.css("padding-bottom"), 10)),
            e.img.css("max-height", t.wH - n);
        }
      },
      _onImageHasSize: function (e) {
        e.img &&
          ((e.hasSize = !0),
          $ && clearInterval($),
          (e.isCheckingImgSize = !1),
          u("ImageHasSize", e),
          e.imgHidden &&
            (t.content && t.content.removeClass("mfp-loading"),
            (e.imgHidden = !1)));
      },
      findImageSize: function (e) {
        var n = 0,
          o = e.img[0],
          a = function (i) {
            $ && clearInterval($),
              ($ = setInterval(function () {
                o.naturalWidth > 0
                  ? t._onImageHasSize(e)
                  : (n > 200 && clearInterval($),
                    3 === ++n ? a(10) : 40 === n ? a(50) : 100 === n && a(500));
              }, i));
          };
        a(1);
      },
      getImage: function (n, o) {
        var a = 0,
          i = function () {
            n &&
              (n.img[0].complete
                ? (n.img.off(".mfploader"),
                  n === t.currItem &&
                    (t._onImageHasSize(n), t.updateStatus("ready")),
                  (n.hasSize = !0),
                  (n.loaded = !0),
                  u("ImageLoadComplete"))
                : ++a < 200
                ? setTimeout(i, 100)
                : s());
          },
          s = function () {
            n &&
              (n.img.off(".mfploader"),
              n === t.currItem &&
                (t._onImageHasSize(n),
                t.updateStatus("error", r.tError.replace("%url%", n.src))),
              (n.hasSize = !0),
              (n.loaded = !0),
              (n.loadError = !0));
          },
          r = t.st.image,
          l = o.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          (c.className = "mfp-img"),
            n.el &&
              n.el.find("img").length &&
              (c.alt = n.el.find("img").attr("alt")),
            (n.img = e(c).on("load.mfploader", i).on("error.mfploader", s)),
            (c.src = n.src),
            l.is("img") && (n.img = n.img.clone()),
            (c = n.img[0]).naturalWidth > 0
              ? (n.hasSize = !0)
              : c.width || (n.hasSize = !1);
        }
        return (
          t._parseMarkup(o, { title: k(n), img_replaceWith: n.img }, n),
          t.resizeImage(),
          n.hasSize
            ? ($ && clearInterval($),
              n.loadError
                ? (o.addClass("mfp-loading"),
                  t.updateStatus("error", r.tError.replace("%url%", n.src)))
                : (o.removeClass("mfp-loading"), t.updateStatus("ready")),
              o)
            : (t.updateStatus("loading"),
              (n.loading = !0),
              n.hasSize ||
                ((n.imgHidden = !0),
                o.addClass("mfp-loading"),
                t.findImageSize(n)),
              o)
        );
      },
    },
  });
  var T;
  e.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (e) {
        return e.is("img") ? e : e.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var e,
          n = t.st.zoom,
          o = ".zoom";
        if (n.enabled && t.supportsTransition) {
          var a,
            i,
            s = n.duration,
            r = function (e) {
              var t = e
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                o = "all " + n.duration / 1e3 + "s " + n.easing,
                a = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                i = "transition";
              return (
                (a["-webkit-" + i] = a["-moz-" + i] = a["-o-" + i] = a[i] = o),
                t.css(a),
                t
              );
            },
            l = function () {
              t.content.css("visibility", "visible");
            };
          d("BuildControls" + o, function () {
            if (t._allowZoom()) {
              if (
                (clearTimeout(a),
                t.content.css("visibility", "hidden"),
                !(e = t._getItemToZoom()))
              )
                return void l();
              (i = r(e)).css(t._getOffset()),
                t.wrap.append(i),
                (a = setTimeout(function () {
                  i.css(t._getOffset(!0)),
                    (a = setTimeout(function () {
                      l(),
                        setTimeout(function () {
                          i.remove(), (e = i = null), u("ZoomAnimationEnded");
                        }, 16);
                    }, s));
                }, 16));
            }
          }),
            d("BeforeClose" + o, function () {
              if (t._allowZoom()) {
                if ((clearTimeout(a), (t.st.removalDelay = s), !e)) {
                  if (!(e = t._getItemToZoom())) return;
                  i = r(e);
                }
                i.css(t._getOffset(!0)),
                  t.wrap.append(i),
                  t.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    i.css(t._getOffset());
                  }, 16);
              }
            }),
            d("Close" + o, function () {
              t._allowZoom() && (l(), i && i.remove(), (e = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === t.currItem.type;
      },
      _getItemToZoom: function () {
        return !!t.currItem.hasSize && t.currItem.img;
      },
      _getOffset: function (n) {
        var o,
          a = (o = n
            ? t.currItem.img
            : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
          i = parseInt(o.css("padding-top"), 10),
          s = parseInt(o.css("padding-bottom"), 10);
        a.top -= e(window).scrollTop() - i;
        var r = {
          width: o.width(),
          height: (l ? o.innerHeight() : o[0].offsetHeight) - s - i,
        };
        return (
          void 0 === T &&
            (T = void 0 !== document.createElement("p").style.MozTransform),
          T
            ? (r["-moz-transform"] = r.transform =
                "translate(" + a.left + "px," + a.top + "px)")
            : ((r.left = a.left), (r.top = a.top)),
          r
        );
      },
    },
  });
  var S = function (e) {
    if (t.currTemplate.iframe) {
      var n = t.currTemplate.iframe.find("iframe");
      n.length &&
        (e || (n[0].src = "//about:blank"),
        t.isIE8 && n.css("display", e ? "block" : "none"));
    }
  };
  e.magnificPopup.registerModule("iframe", {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        t.types.push("iframe"),
          d("BeforeChange", function (e, t, n) {
            t !== n && ("iframe" === t ? S() : "iframe" === n && S(!0));
          }),
          d("Close.iframe", function () {
            S();
          });
      },
      getIframe: function (n, o) {
        var a = n.src,
          i = t.st.iframe;
        e.each(i.patterns, function () {
          if (a.indexOf(this.index) > -1)
            return (
              this.id &&
                (a =
                  "string" == typeof this.id
                    ? a.substr(
                        a.lastIndexOf(this.id) + this.id.length,
                        a.length
                      )
                    : this.id.call(this, a)),
              (a = this.src.replace("%id%", a)),
              !1
            );
        });
        var s = {};
        return (
          i.srcAction && (s[i.srcAction] = a),
          t._parseMarkup(o, s, n),
          t.updateStatus("ready"),
          o
        );
      },
    },
  });
  var _ = function (e) {
      var n = t.items.length;
      return e > n - 1 ? e - n : e < 0 ? n + e : e;
    },
    x = function (e, t, n) {
      return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
    };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: true,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var n = t.st.gallery,
          a = ".mfp-gallery";
        if (((t.direction = !0), !n || !n.enabled)) return !1;
        (i += " mfp-gallery"),
          d("Open" + a, function () {
            n.navigateByImgClick &&
              t.wrap.on("click" + a, ".mfp-img", function () {
                if (t.items.length > 1) return t.next(), !1;
              }),
              o.on("keydown" + a, function (e) {
                37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
              });
          }),
          d("UpdateStatus" + a, function (e, n) {
            n.text && (n.text = x(n.text, t.currItem.index, t.items.length));
          }),
          d("MarkupParse" + a, function (e, o, a, i) {
            var s = t.items.length;
            a.counter = s > 1 ? x(n.tCounter, i.index, s) : "";
          }),
          d("BuildControls" + a, function () {
            if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
              var o = n.arrowMarkup,
                a = (t.arrowLeft = e(
                  o.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")
                ).addClass("mfp-prevent-close")),
                i = (t.arrowRight = e(
                  o.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")
                ).addClass("mfp-prevent-close"));
              a.click(function () {
                t.prev();
              }),
                i.click(function () {
                  t.next();
                }),
                t.container.append(a.add(i));
            }
          }),
          d("Change" + a, function () {
            t._preloadTimeout && clearTimeout(t._preloadTimeout),
              (t._preloadTimeout = setTimeout(function () {
                t.preloadNearbyImages(), (t._preloadTimeout = null);
              }, 16));
          }),
          d("Close" + a, function () {
            o.off(a),
              t.wrap.off("click" + a),
              (t.arrowRight = t.arrowLeft = null);
          });
      },
      next: function () {
        (t.direction = !0), (t.index = _(t.index + 1)), t.updateItemHTML();
      },
      prev: function () {
        (t.direction = !1), (t.index = _(t.index - 1)), t.updateItemHTML();
      },
      goTo: function (e) {
        (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var e,
          n = t.st.gallery.preload,
          o = Math.min(n[0], t.items.length),
          a = Math.min(n[1], t.items.length);
        for (e = 1; e <= (t.direction ? a : o); e++)
          t._preloadItem(t.index + e);
        for (e = 1; e <= (t.direction ? o : a); e++)
          t._preloadItem(t.index - e);
      },
      _preloadItem: function (n) {
        if (((n = _(n)), !t.items[n].preloaded)) {
          var o = t.items[n];
          o.parsed || (o = t.parseEl(n)),
            u("LazyLoad", o),
            "image" === o.type &&
              (o.img = e('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  o.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (o.hasSize = !0), (o.loadError = !0), u("LazyLoadError", o);
                })
                .attr("src", o.src)),
            (o.preloaded = !0);
        }
      },
    },
  });
  e.magnificPopup.registerModule("retina", {
    options: {
      replaceSrc: function (e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return "@2x" + e;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina,
            n = e.ratio;
          (n = isNaN(n) ? n() : n) > 1 &&
            (d("ImageHasSize.retina", function (e, t) {
              t.img.css({
                "max-width": t.img[0].naturalWidth / n,
                width: "100%",
              });
            }),
            d("ElementParse.retina", function (t, o) {
              o.src = e.replaceSrc(o, n);
            }));
        }
      },
    },
  }),
    f();
}),
  (function (e) {
    "function" == typeof define && define.amd
      ? define([], e)
      : "undefined" != typeof module && null !== module && module.exports
      ? (module.exports = e)
      : e();
  })(function () {
    var e = Object.assign || (window.$ && $.extend),
      t = 8,
      n =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e, t) {
          return window.setTimeout(function () {
            e();
          }, 25);
        };
    !(function () {
      if ("function" == typeof window.CustomEvent) return !1;
      function e(e, t) {
        t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
      }
      (e.prototype = window.Event.prototype), (window.CustomEvent = e);
    })();
    var o = { textarea: !0, input: !0, select: !0, button: !0 },
      a = { move: "mousemove", cancel: "mouseup dragstart", end: "mouseup" },
      i = { move: "touchmove", cancel: "touchend", end: "touchend" },
      s = /\s+/,
      r = { bubbles: !0, cancelable: !0 },
      l = "function" == typeof Symbol ? Symbol("events") : {};
    function c(e) {
      return e[l] || (e[l] = {});
    }
    function d(e, t, n, o, a) {
      t = t.split(s);
      var i,
        r = c(e),
        l = t.length;
      function d(e) {
        n(e, o);
      }
      for (; l--; )
        (r[(i = t[l])] || (r[i] = [])).push([n, d]), e.addEventListener(i, d);
    }
    function p(e, t, n, o) {
      t = t.split(s);
      var a,
        i,
        r,
        l = c(e),
        d = t.length;
      if (l)
        for (; d--; )
          if ((i = l[(a = t[d])]))
            for (r = i.length; r--; )
              i[r][0] === n &&
                (e.removeEventListener(a, i[r][1]), i.splice(r, 1));
    }
    function u(t, n, o) {
      var a = (function (e) {
        return new CustomEvent(e, r);
      })(n);
      o && e(a, o), t.dispatchEvent(a);
    }
    function m(e) {
      var t = e,
        o = !1,
        a = !1;
      function i(e) {
        o ? (t(), n(i), (a = !0), (o = !1)) : (a = !1);
      }
      (this.kick = function (e) {
        (o = !0), a || i();
      }),
        (this.end = function (e) {
          var n = t;
          e &&
            (a
              ? ((t = o
                  ? function () {
                      n(), e();
                    }
                  : e),
                (o = !0))
              : e());
        });
    }
    function f() {}
    function v(e) {
      e.preventDefault();
    }
    function g(e, t) {
      var n, o;
      if (e.identifiedTouch) return e.identifiedTouch(t);
      for (n = -1, o = e.length; ++n < o; )
        if (e[n].identifier === t) return e[n];
    }
    function h(e, t) {
      var n = g(e.changedTouches, t.identifier);
      if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n;
    }
    function w(e, t) {
      k(e, t, e, b);
    }
    function y(e, t) {
      b();
    }
    function b() {
      p(document, a.move, w), p(document, a.cancel, y);
    }
    function C(e) {
      p(document, i.move, e.touchmove), p(document, i.cancel, e.touchend);
    }
    function k(e, n, o, a) {
      var i = o.pageX - n.pageX,
        s = o.pageY - n.pageY;
      i * i + s * s < t * t ||
        (function (e, t, n, o, a, i) {
          var s = e.targetTouches,
            r = e.timeStamp - t.timeStamp,
            l = {
              altKey: e.altKey,
              ctrlKey: e.ctrlKey,
              shiftKey: e.shiftKey,
              startX: t.pageX,
              startY: t.pageY,
              distX: o,
              distY: a,
              deltaX: o,
              deltaY: a,
              pageX: n.pageX,
              pageY: n.pageY,
              velocityX: o / r,
              velocityY: a / r,
              identifier: t.identifier,
              targetTouches: s,
              finger: s ? s.length : 1,
              enableMove: function () {
                (this.moveEnabled = !0),
                  (this.enableMove = f),
                  e.preventDefault();
              },
            };
          u(t.target, "movestart", l), i(t);
        })(e, n, o, i, s, a);
    }
    function T(e, t) {
      var n = t.timer;
      (t.touch = e), (t.timeStamp = e.timeStamp), n.kick();
    }
    function S(e, t) {
      var n = t.target,
        o = t.event,
        i = t.timer;
      p(document, a.move, T),
        p(document, a.end, S),
        x(n, o, i, function () {
          setTimeout(function () {
            p(n, "click", v);
          }, 0);
        });
    }
    function _(e, t) {
      var n = t.target,
        o = t.event,
        a = t.timer;
      g(e.changedTouches, o.identifier) &&
        (!(function (e) {
          p(document, i.move, e.activeTouchmove),
            p(document, i.end, e.activeTouchend);
        })(t),
        x(n, o, a));
    }
    function x(e, t, n, o) {
      n.end(function () {
        return u(e, "moveend", t), o && o();
      });
    }
    if (
      (d(document, "mousedown", function (e) {
        (function (e) {
          return 1 === e.which && !e.ctrlKey && !e.altKey;
        })(e) &&
          ((function (e) {
            return !!o[e.target.tagName.toLowerCase()];
          })(e) ||
            (d(document, a.move, w, e), d(document, a.cancel, y, e)));
      }),
      d(document, "touchstart", function (e) {
        if (!o[e.target.tagName.toLowerCase()]) {
          var t = e.changedTouches[0],
            n = {
              target: t.target,
              pageX: t.pageX,
              pageY: t.pageY,
              identifier: t.identifier,
              touchmove: function (e, t) {
                !(function (e, t) {
                  var n = h(e, t);
                  n && k(e, t, n, C);
                })(e, t);
              },
              touchend: function (e, t) {
                !(function (e, t) {
                  g(e.changedTouches, t.identifier) && C(t);
                })(e, t);
              },
            };
          d(document, i.move, n.touchmove, n),
            d(document, i.cancel, n.touchend, n);
        }
      }),
      d(document, "movestart", function (e) {
        if (!e.defaultPrevented && e.moveEnabled) {
          var t = {
              startX: e.startX,
              startY: e.startY,
              pageX: e.pageX,
              pageY: e.pageY,
              distX: e.distX,
              distY: e.distY,
              deltaX: e.deltaX,
              deltaY: e.deltaY,
              velocityX: e.velocityX,
              velocityY: e.velocityY,
              identifier: e.identifier,
              targetTouches: e.targetTouches,
              finger: e.finger,
            },
            n = {
              target: e.target,
              event: t,
              timer: new m(function (e) {
                (function (e, t, n) {
                  var o = n - e.timeStamp;
                  (e.distX = t.pageX - e.startX),
                    (e.distY = t.pageY - e.startY),
                    (e.deltaX = t.pageX - e.pageX),
                    (e.deltaY = t.pageY - e.pageY),
                    (e.velocityX = 0.3 * e.velocityX + (0.7 * e.deltaX) / o),
                    (e.velocityY = 0.3 * e.velocityY + (0.7 * e.deltaY) / o),
                    (e.pageX = t.pageX),
                    (e.pageY = t.pageY);
                })(t, n.touch, n.timeStamp),
                  u(n.target, "move", t);
              }),
              touch: void 0,
              timeStamp: e.timeStamp,
            };
          void 0 === e.identifier
            ? (d(e.target, "click", v),
              d(document, a.move, T, n),
              d(document, a.end, S, n))
            : ((n.activeTouchmove = function (e, t) {
                !(function (e, t) {
                  var n = t.event,
                    o = t.timer,
                    a = h(e, n);
                  a &&
                    (e.preventDefault(),
                    (n.targetTouches = e.targetTouches),
                    (t.touch = a),
                    (t.timeStamp = e.timeStamp),
                    o.kick());
                })(e, t);
              }),
              (n.activeTouchend = function (e, t) {
                _(e, t);
              }),
              d(document, i.move, n.activeTouchmove, n),
              d(document, i.end, n.activeTouchend, n));
        }
      }),
      window.$)
    ) {
      var I =
        "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(
          " "
        );
      ($.event.special.movestart = {
        setup: function () {
          return d(this, "movestart", E), !1;
        },
        teardown: function () {
          return p(this, "movestart", E), !1;
        },
        add: M,
      }),
        ($.event.special.move = {
          setup: function () {
            return d(this, "movestart", P), !1;
          },
          teardown: function () {
            return p(this, "movestart", P), !1;
          },
          add: M,
        }),
        ($.event.special.moveend = {
          setup: function () {
            return d(this, "movestart", z), !1;
          },
          teardown: function () {
            return p(this, "movestart", z), !1;
          },
          add: M,
        });
    }
    function E(e) {
      e.enableMove();
    }
    function P(e) {
      e.enableMove();
    }
    function z(e) {
      e.enableMove();
    }
    function M(e) {
      var t = e.handler;
      e.handler = function (e) {
        for (var n, o = I.length; o--; ) e[(n = I[o])] = e.originalEvent[n];
        t.apply(this, arguments);
      };
    }
  }),
  ($.fn.twentytwenty = function (e) {
    e = $.extend(
      {
        default_offset_pct: 0.5,
        orientation: "horizontal",
        before_label: "Before",
        after_label: "After",
        no_overlay: !1,
        move_slider_on_hover: !1,
        move_with_handle_only: !0,
        click_to_move: !1,
      },
      e
    );
    return this.each(function () {
      var t = e.default_offset_pct,
        n = $(this),
        o = e.orientation,
        a = "vertical" === o ? "down" : "left",
        i = "vertical" === o ? "up" : "right";
      if (
        (n.wrap(
          "<div class='twentytwenty-wrapper twentytwenty-" + o + "'></div>"
        ),
        !e.no_overlay)
      ) {
        n.append("<div class='twentytwenty-overlay'></div>");
        var s = n.find(".twentytwenty-overlay");
        s.append(
          "<div class='twentytwenty-before-label' data-content='" +
            e.before_label +
            "'></div>"
        ),
          s.append(
            "<div class='twentytwenty-after-label' data-content='" +
              e.after_label +
              "'></div>"
          );
      }
      var r = n.find("img:first"),
        l = n.find("img:last");
      n.append("<div class='twentytwenty-handle'></div>");
      var c = n.find(".twentytwenty-handle");
      c.append("<span class='twentytwenty-" + a + "-arrow'></span>"),
        c.append("<span class='twentytwenty-" + i + "-arrow'></span>"),
        n.addClass("twentytwenty-container"),
        r.addClass("twentytwenty-before"),
        l.addClass("twentytwenty-after");
      var d = function (e) {
          var t,
            a,
            i,
            s =
              ((t = e),
              (a = r.width()),
              (i = r.height()),
              { w: a + "px", h: i + "px", cw: t * a + "px", ch: t * i + "px" });
          c.css(
            "vertical" === o ? "top" : "left",
            "vertical" === o ? s.ch : s.cw
          ),
            (function (e) {
              "vertical" === o
                ? (r.css("clip", "rect(0," + e.w + "," + e.ch + ",0)"),
                  l.css("clip", "rect(" + e.ch + "," + e.w + "," + e.h + ",0)"))
                : (r.css("clip", "rect(0," + e.cw + "," + e.h + ",0)"),
                  l.css(
                    "clip",
                    "rect(0," + e.w + "," + e.h + "," + e.cw + ")"
                  )),
                n.css("height", e.h);
            })(s);
        },
        p = function (e, t) {
          var n, a, i;
          return (
            (n = "vertical" === o ? (t - m) / v : (e - u) / f),
            (a = 0),
            (i = 1),
            Math.max(a, Math.min(i, n))
          );
        };
      $(window).on("resize.twentytwenty", function (e) {
        d(t);
      });
      var u = 0,
        m = 0,
        f = 0,
        v = 0,
        g = function (e) {
          ((e.distX > e.distY && e.distX < -e.distY) ||
            (e.distX < e.distY && e.distX > -e.distY)) &&
          "vertical" !== o
            ? e.preventDefault()
            : ((e.distX < e.distY && e.distX < -e.distY) ||
                (e.distX > e.distY && e.distX > -e.distY)) &&
              "vertical" === o &&
              e.preventDefault(),
            n.addClass("active"),
            (u = n.offset().left),
            (m = n.offset().top),
            (f = r.width()),
            (v = r.height());
        },
        h = function (e) {
          n.hasClass("active") && ((t = p(e.pageX, e.pageY)), d(t));
        },
        w = function () {
          n.removeClass("active");
        },
        y = e.move_with_handle_only ? c : n;
      y.on("movestart", g),
        y.on("move", h),
        y.on("moveend", w),
        e.move_slider_on_hover &&
          (n.on("mouseenter", g), n.on("mousemove", h), n.on("mouseleave", w)),
        c.on("touchmove", function (e) {
          e.preventDefault();
        }),
        n.find("img").on("mousedown", function (e) {
          e.preventDefault();
        }),
        e.click_to_move &&
          n.on("click", function (e) {
            (u = n.offset().left),
              (m = n.offset().top),
              (f = r.width()),
              (v = r.height()),
              (t = p(e.pageX, e.pageY)),
              d(t);
          }),
        $(window).trigger("resize.twentytwenty");
    });
  }),
  $(document).foundation();
import libs from "./lib/dependencies";
(window.libs = libs),
  $(".information-highlights-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }),
  $(".template-slider").slick({
    infinite: !0,
    dots: !0,
    arrows: true,
    speed: 3e3,
    autoplay: !0,
    autoplaySpeed: 7e3,
    slidesToShow: 1,
    slidesToScroll: 1,
  }),
  $(".home-slider").slick({
    infinite: !0,
    dots: !1,
    speed: 3e3,
    autoplay: !0,
    autoplaySpeed: 7e3,
    slidesToShow: 1,
    slidesToScroll: 1,
  }),
  $(".contact-slider").slick({
    infinite: !0,
    dots: !1,
    speed: 3e3,
    autoplay: !0,
    autoplaySpeed: 7e3,
    slidesToShow: 1,
    slidesToScroll: 1,
  }),
  $(".before-after-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipe: !1,
    asNavFor: ".before-after-thumbnail-slider",
    speed: 2e3,
  }),
  $(".before-after-thumbnail-slider").slick({
    slidesToShow: 8,
    slidesToScroll: 3,
    asNavFor: ".before-after-slider",
    dots: !1,
    centerMode: !0,
    focusOnSelect: !0,
    speed: 2e3,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 8, slidesToScroll: 3 } },
      { breakpoint: 1023, settings: { slidesToShow: 6, slidesToScroll: 2 } },
      { breakpoint: 639, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    ],
  }),
  $(".project-detail-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 2e3,
    asNavFor: ".project-thumbnail-slider",
  }),
  $(".project-thumbnail-slider").slick({
    slidesToShow: 8,
    slidesToScroll: 3,
    asNavFor: ".project-detail-slider",
    centerMode: !0,
    focusOnSelect: !0,
    speed: 2e3,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 8, slidesToScroll: 3 } },
      { breakpoint: 1023, settings: { slidesToShow: 6, slidesToScroll:3 } },
      { breakpoint: 639, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    ],
  }),
  $(".recomended-products-slider").slick({
    infinite: !0,
    dots: !1,
    arrows: true,
    speed: 2e3,
    autoplay: !0,
    autoplaySpeed: 3e3,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 639, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }),
  $(".partners-slider").slick({
    arrows: true,
    speed: 2e3,
    dots: !1,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5, slidesToScroll: 5 } },
      { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 639, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }),
  $(".appreciations-slider").slick({
    infinite: !0,
    dots: !1,
    arrows: true,
    speed: 350,
    autoplay: !1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: !0,
  }),
  $(".prev-appreciation").click(function () {
    $(".appreciations-slider").slick("slickPrev");
  }),
  $(".next-appreciation").click(function () {
    $(".appreciations-slider").slick("slickNext");
  }),
  $(".caracteristics-slider").slick({
    infinite: !0,
    dots: !1,
    arrows: true,
    speed: 350,
    autoplay: !1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: !0,
  }),
  $(".prev-caracteristic").click(function () {
    $(".caracteristics-slider").slick("slickPrev");
  }),
  $(".next-caracteristic").click(function () {
    $(".caracteristics-slider").slick("slickNext");
  }),
  $(".testemonials-slider").slick({
    infinite: !0,
    dots: !1,
    arrows: true,
    speed: 350,
    autoplay: !1,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: !0,
  }),
  $(".prev-testemonial").click(function () {
    $(".testemonials-slider").slick("slickPrev");
  }),
  $(".next-testemonial").click(function () {
    $(".testemonials-slider").slick("slickNext");
  }),
  $(".main-nav nav li.tabs-title").click(function () {
    $(".main-nav").addClass("is-open"), $(".main-nav").removeClass("is-closed");
    var e = $(".main-nav").find(".subnav");
    e.slideDown(350), e.fadeIn(350);
  }),
  $(".main-nav").mouseleave(function () {
    $(this).addClass("is-closed"), $(this).removeClass("is-open");
    var e = $(this).find(".subnav");
    e.slideUp(350), e.fadeOut(350);
  }),
  $("[data-rating] .star").on("click", function () {
    var e = $(this);
    e.siblings(".selected").removeClass("selected"),
      e.addClass("selected").parent().addClass("is-voted");
  }),
  $(window).on("load", function () {
    $(".subnav").slideUp(350),
      $("#status").delay(50).fadeOut(),
      $("#status").delay(250).fadeOut(),
      $("#preloader").delay(50).fadeOut(),
      $("body").delay(150).css({ "overflow-y": "visible" }),
      setTimeout(function () {
        $("body").addClass("animate is-animating");
      }, 200),
      setTimeout(function () {
        $(".container-animation").addClass("is-animating");
      }, 200),
      $(".before-after-container").twentytwenty({
        default_offset_pct: 0.5,
        orientation: "horizontal",
        before_label: "Antes",
        after_label: "Depois",
        no_overlay: !0,
        move_slider_on_hover: !1,
        move_with_handle_only: !0,
        click_to_move: !0,
      }),
      $(".popup-gallery").magnificPopup({
        removalDelay: 300,
        mainClass: "mfp-fade",
        delegate: "a",
        type: "image",
        tLoading: "A carregar imagem #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
        image: {
          tError: '<a href="%url%">A Imagem #%curr%</a> não foi carregada.',
          titleSrc: function (e) {
            return e.el.attr("title");
          },
        },
      }),
      $(".popup-gallery-mobile").magnificPopup({
        removalDelay: 300,
        mainClass: "mfp-fade",
        delegate: "a",
        type: "image",
        tLoading: "A carregar imagem #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
        image: {
          tError: '<a href="%url%">A Imagem #%curr%</a> não foi carregada.',
          titleSrc: function (e) {
            return e.el.attr("title");
          },
        },
      });
  }),
  $(document).on("click", ".accordion-title", function (e) {
    $(".accordion-content .slick-slider").slick("setPosition");
  }),
  $("#product-list-sidebar").on("change.zf.tabs", function () {
    $("#price-range-slider").foundation("_reflow"),
      setTimeout(function () {
        $("#price-range-slider").foundation("_reflow");
      }, 350);
  }),
  $("#priceMin").change(function () {
    $("#price-range-slider").foundation("_reflow");
  }),
  $("#priceMin").change(function () {
    $("#price-range-slider").foundation("_reflow");
  }),
  $("a#open-convidado").click(() => {
    $("div.convidado").hasClass("visible")
      ? $("div.convidado").css("display", "none")
      : $("div.convidado").addClass("invisible"),
      $("h5.morada-title").hasClass("blocked")
        ? $("h5.morada-title").removeClass("blocked")
        : $("h5.morada-title").addClass("blocked"),
      $("#iniciar-sessao").hasClass("closed")
        ? $("#iniciar-sessao").removeClass("closed")
        : $("#iniciar-sessao").addClass("open"),
      $("#create-new-form").css("display", "none");
  }),
  // $(document).ready(function () {
  //   $(".billing input,.billing select").change( function () {
  //     let e = !1
  //     $(".billing input ,.billing select").each(function () {
  //       0 == $(this).val().length && (e = !0);
  //     })
     
      
  //       e 
  //         ? $("#continue-to-send").attr("disabled", true)
  //         : $("#continue-to-send").attr("disabled", false);
  //   });
  // }),

  $("button#continue-to-send").click(() => {
    $("p.summary-info").text(
      `Morada de faturação: ${$("#id-first-name-billing").val()} \n\t\t${$(
        "#id-dni-billing"
      ).val()} , ${$("#id-morada-billing").val()} ${$(
        "#id-city-billing"
      ).val()} , ${$("#id-district-billing").val()} - ${$(
        "#id-postalcode-billing"
      ).val()}`
    ),
      $("div.summary-faturacao").hasClass("visible")
        ? $("div.summary-faturacao").removeClass("visible") &&
          $("div.summary-faturacao").addClass("invisible")
        : $("div.summary-faturacao").addClass("visible") &&
          $("div.summary-faturacao").removeClass("invisible"),
      $("#cart-delivery-confirmation").css("display", "none"),
      $("#cart-delivery-method").css("display", "block"),
      $("span#edit-faturacao").removeClass("invisible") &&
        $("span#edit-faturacao").addClass("visible"),
      $(".morada-title").addClass("blocked"),
      $(".envio-title").removeClass("blocked"),
      $(".delivery-content").css("display", "block");
  }),
  $("button#continue-to-payment").click(() => {
    $(".pagamento-title").hasClass("blocked")
      ? $(".pagamento-title").removeClass("blocked")
      : $(".pagamento-title").addClass("blocked"),
      $("span#edit-envio").removeClass("invisible") &&
        $("span#edit-envio").addClass("visible"),
      $(".delivery-content").css("display", "none"),
      $(".envio-title").addClass("blocked"),
      $(".pagamento-content").css("display", "block");
  }),
  $("span#edit-envio").click(() => {
    $("span#edit-envio").removeClass("visible") &&
      $("span#edit-envio").addClass("invisible"),
      $(".delivery-content").css("display", "block"),
      $("#cart-delivery-confirmation").css("display", "none"),
      $(".pagamento-content").css("display", "none"),
      $(".envio-title").removeClass("blocked");
  }),
  $("span#edit-faturacao").click(() => {
    $("span#edit-faturacao").removeClass("visible") &&
      $("span#edit-faturacao").addClass("invisible"),
      $(".delivery-content").css("display", "none"),
      $(".pagamento-content").css("display", "none"),
      $("#cart-delivery-confirmation").css("display", "block"),
      $(".morada-title").removeClass("blocked");
  }),
  $("#iniciar-sessao").on("click", () => {
    $("#iniciar-sessao").hasClass("closed")
      ? $("#iniciar-sessao").removeClass("closed") &&
        $("#iniciar-sessao").addClass("open")
      : $("#iniciar-sessao").addClass("closed") &&
        $("#iniciar-sessao").removeClass("open");
  }),
  $(document).ready(function () {
    $("#tos").on("change", (e) => {
      (this.checked = !1),
        e.preventDefault(),
        $("#tos").prop("checked")
          ? $(".enviar-encomenda").removeClass("disabled")
          : $(".enviar-encomenda").addClass("disabled");
    })
      
  }),
  $(document).ready(function () {
    $(".icon-logo-gracehome").hasClass("icon-logo-gracehome") &&
      $(".icon-logo-gracehome").append("<span class='path1'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path2'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path3'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path4'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path5'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path6'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path7'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path8'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path9'> </span>") &&
      $(".icon-logo-gracehome").append("<span class='path10'> </span>"),
      $(".icon-logo-sonno ").hasClass("icon-logo-sonno") &&
        $(".icon-logo-sonno").append("<span class='path1'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path2'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path3'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path4'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path5'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path6'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path7'> </span>") &&
        $(".icon-logo-sonno").append("<span class='path8'> </span>");
  }),
  $(document).ready(function () {
    $(".open-resume").on("click", () => {
      $(".cart-content").hasClass("invisible")
        ? $(".cart-content").removeClass("invisible") &&
          $(".cart-content").addClass("visible")
        : $(".cart-content").addClass("invisible") &&
          $(".cart-content").removeClass("visible"),
        $(".icon-arrow_downward").hasClass("open-resume")
          ? $(".icon-arrow_downward").removeClass("open-resume") &&
            $(".resume-info").removeClass("open") &&
            $(".resume-info").addClass("close") &&
            $(".icon-arrow_downward").addClass("close-resume")
          : $(".icon-arrow_downward").addClass("open-resume") &&
            $(".icon-arrow_downward").removeClass("close-resume") &&
            $(".resume-info").removeClass("close") &&
            $(".resume-info").addClass("open");
    });
  }),
  $(".lateral-menu").on("click", () => {
    $("#lateralMenu").hasClass("open")
      ? $("#lateralMenu").removeClass("open") &&
        $("#lateralMenu").addClass("closed") &&
        $("#bodyCanvas").removeClass("sized") &&
        $("#bodyCanvas").addClass("normal") &&
        $(".partners-container").removeClass("sized") &&
        $(".partners-container").addClass("normal") &&
        $("#socialNav").removeClass("sized") &&
        $("#socialNav").addClass("normal") &&
        $("#subscribe").removeClass("sized") &&
        $("#subscribe").addClass("normal") &&
        $(".normal").animate({ "padding-left": 0 }, 500)
      : $("#lateralMenu").addClass("open") &&
        $("#lateralMenu").removeClass("closed") &&
        $("#bodyCanvas").removeClass("normal") &&
        $("#bodyCanvas").addClass("sized") &&
        $(".partners-container").removeClass("normal") &&
        $(".partners-container").addClass("sized") &&
        $("#socialNav").removeClass("normal") &&
        $("#socialNav").addClass("sized") &&
        $("#subscribe").removeClass("normal") &&
        $("#subscribe").addClass("sized") &&
        $(".sized").animate({ "padding-left": 300 }, 500);
  }),
  $('body').hasClass('default')?
  $("#navbar-new").on("click", () => {
    $("#lateralMenu").hasClass("open")
      ? $("#lateralMenu").removeClass("open") &&
        $("#lateralMenu").addClass("closed") &&
        $("#navbar-new").css("color", 'black') &&
      $("#navbar-new").css("background", 'none') &&
        $("#bodyCanvas").removeClass("sized") &&
        $("#bodyCanvas").addClass("normal") &&
        $(".partners-container").removeClass("sized") &&
        $(".partners-container").addClass("normal") &&
        $("#socialNav").removeClass("sized") &&
        $("#socialNav").addClass("normal") &&
        $("#subscribe").removeClass("sized") &&
        $("#subscribe").addClass("normal") &&
        $("#filters").addClass("is-active") &&
        $("#filters-label").addClass("is-active") &&
        $("#filters-label").css("color", 'white') &&
        $("#filters-label").css("background", 'black') &&
        $(".normal").animate({ "padding-left": 0 }, 500)&&
        $("#categories").css("display", "none")&&
        $("#filters").css("display", "block")&&
        $(".container-filter").css("min-width", "100%")&&
        $("#categories").removeClass("is-active")
      : $("#lateralMenu").addClass("open") &&
      $("#navbar-new").css("color", 'black') &&
      $("#navbar-new").css("background", 'none') &&
        $("#lateralMenu").removeClass("closed") &&
        $("#bodyCanvas").removeClass("normal") &&
        $("#bodyCanvas").addClass("sized") &&
        $("#categories").removeClass("is-active")&&
        $(".partners-container").removeClass("normal") &&
        $(".partners-container").addClass("sized") &&
        $("#socialNav").removeClass("normal") &&
        $("#socialNav").addClass("sized") &&
        $("#subscribe").removeClass("normal") &&
        $("#subscribe").addClass("sized") &&
        $("#categories").css("display", "none")&&
        $(".container-filter").css("min-width", "100%")&&
        $("#filters").addClass("is-active") &&
        $("#filters").css("display", "block")&&
        $("#filters-label").css("color", 'white') &&
        $("#filters-label").css("background", 'black') &&
        $("#filters-label").addClass("is-active") &&
        $(".sized").animate({ "padding-left": 300 }, 500);
  }):
  $("#offCanvasMobileNav").hasClass("is-closed")
  
  $(".menu-category-list").children(".submenu-toggle").on("click", () => {
    
    $(".menu").hasClass("menu-open") ?
    $('.menu').removeClass("menu-open") 
    :  null
  })

  $(".menu-category-list").children(".submenu-toggle").on("click", () => {
    
    $(".menu").hasClass("menu-open") ?
    $('.menu').removeClass("menu-open") 
    :  null
  })
  $(".submenu-toggle").on("click", () => {
    
    $(".menu").hasClass("submenu-open") ?
    $('.menu').removeClass("submenu-open") 
    :  null
  })
  

  $(".menu-category-list").children(".submenu-toggle").css("position", "absolute"),
  $(".menu-category-list").children(".submenu-toggle").css("width", "100%"),
  $(".menu-category-list").children(".submenu-toggle").css("display", "flex"),
  $(".menu-category-list").children(".submenu-toggle").css("justify-content", "flex-end"),
  $(".menu-category-list").children(".submenu-toggle").css("align-items", "center"),
  $(".menu-category-list").children(".submenu-toggle").css("padding-right", "5px"),

  $(".menu-submenu-list").children(".submenu-toggle").css("position", "absolute"),
  $(".menu-submenu-list").children(".submenu-toggle").css("width", "100%"),
  $(".menu-submenu-list").children(".submenu-toggle").css("display", "flex"),
  $(".menu-submenu-list").children(".submenu-toggle").css("justify-content", "flex-end"),
  $(".menu-submenu-list").children(".submenu-toggle").css("align-items", "center"),
  $(".menu-submenu-list").children(".submenu-toggle").css("padding-right", "5px"),
  
  
  $(".before-after-slider").parent("div.small-12").css("max-width", "63%"),
  $(".before-after-slider").parent("div.small-12").css("margin", "0 auto"),

  $("i.icon-logo-sonno").parent("a.logo").css("margin", "-1rem 1rem 0 1rem"),
  $("i.icon-logo-sonno").parent("a.logo").css("transform", "scale(1.3)"),
  $("i.icon-logo-sonno").parent("a.logo").css("min-width", "10rem"),
  $("i.icon-logo-gracehome").parent("a.logo").css("transform", "scale(1.3)"),
  $("i.icon-logo-gracehome").parent("a.logo").css("margin-left", "2rem"),
  $("i.icon-logo-gracehome").parent("a.logo").css("margin-top", "-.9rem"),
  $("iframe").parent(".grid-x").addClass("responsive-embed"),
  $("iframe").parent(".grid-x").addClass("widescreen");
  $("i.icon-logo-minna").parent("a.logo").css("margin-left", "1rem");

  $("button.account").on("click", () => {
 
  $("#create-form").hasClass("open")
    ? $("#create-form").removeClass("open") &&
      $("ul.vertical").addClass("fade-in-vertical") &&
      $("ul.vertical").removeClass("fade-out-vertical")
    : $("#create-form").addClass("open") &&
      $("ul.vertical").addClass("fade-out-vertical") &&
      $("ul.vertical").removeClass("fade-in-vertical");
  });

  $("button.lateral-menu").on("click", () => {
    setTimeout(function() {
      $("div.project-detail-slider").children("button.slick-next").trigger("click")
    },500)
 })

$('body').hasClass('sonno')?
$("#navbar-new").on("click", () => {
$("#offCanvasMobileNav").hasClass("is-closed")
? a
: a
}) :
null

$(document).ready(function () {
$('#modal-info').foundation('open')

})

$("#last-message-action").click(function() {
  var $target = $('ul.accordion');
  var scrTop = Math.abs($target.offset().top);
  $target.animate({
	  scrollTop: scrTop
	},500);
});
// $("#first-message-action").click(function() {
//   var $target = $('ul.accordion');
//   var scrTop = Math.abs($target.offset().top);
//   $target.animate({ scrollTop: ($('#first-message').height()) - 10000}, 500);
// });

$("#change-filter-view").click(() => {
  $(".container-filter-main").hasClass("open")
    ?
    $(".container-filter-main").addClass("closed")&&
    $(".container-filter-main").removeClass("open")&&
    $("a#change-filter-view").addClass("close-product-filter")&&
    $("a#change-filter-view").removeClass("open-product-filter")
    : 
    $(".container-filter-main").addClass("open")&&
    $(".container-filter-main").removeClass("closed")&&
    $("#change-filter-view").addClass("open-product-filter")&&
    $("#change-filter-view").removeClass("close-product-filter")
   
})

const togglePassword = document.querySelector('#check');
  const password = document.querySelector('#login-pass');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    $("#check").hasClass("icon-eye") 
    ?
    $("#check").addClass("icon-eye-blocked")&&
    $("#check").removeClass("icon-eye")
    :
    $("#check").addClass("icon-eye")&&
    $("#check").removeClass("icon-eye-blocked")
});