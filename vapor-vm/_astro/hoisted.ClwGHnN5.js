var mt =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function Ye(E) {
  return E && E.__esModule && Object.prototype.hasOwnProperty.call(E, "default")
    ? E.default
    : E;
}
var St = !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  ),
  bt = St;
const $e = Ye(bt);
var Ct =
    typeof global == "object" && global && global.Object === Object && global,
  yt = typeof self == "object" && self && self.Object === Object && self,
  Je = Ct || yt || Function("return this")(),
  ke = Je.Symbol,
  Ze = Object.prototype,
  wt = Ze.hasOwnProperty,
  Et = Ze.toString,
  ge = ke ? ke.toStringTag : void 0;
function kt(E) {
  var b = wt.call(E, ge),
    w = E[ge];
  try {
    E[ge] = void 0;
    var C = !0;
  } catch {}
  var B = Et.call(E);
  return C && (b ? (E[ge] = w) : delete E[ge]), B;
}
var Lt = Object.prototype,
  xt = Lt.toString;
function Dt(E) {
  return xt.call(E);
}
var Rt = "[object Null]",
  At = "[object Undefined]",
  je = ke ? ke.toStringTag : void 0;
function Ot(E) {
  return E == null
    ? E === void 0
      ? At
      : Rt
    : je && je in Object(E)
    ? kt(E)
    : Dt(E);
}
function Tt(E) {
  return E != null && typeof E == "object";
}
var Bt = "[object Symbol]";
function Mt(E) {
  return typeof E == "symbol" || (Tt(E) && Ot(E) == Bt);
}
var Pt = /\s/;
function It(E) {
  for (var b = E.length; b-- && Pt.test(E.charAt(b)); );
  return b;
}
var Ht = /^\s+/;
function Wt(E) {
  return E && E.slice(0, It(E) + 1).replace(Ht, "");
}
function Le(E) {
  var b = typeof E;
  return E != null && (b == "object" || b == "function");
}
var qe = NaN,
  Ft = /^[-+]0x[0-9a-f]+$/i,
  Nt = /^0b[01]+$/i,
  zt = /^0o[0-7]+$/i,
  Ut = parseInt;
function Ke(E) {
  if (typeof E == "number") return E;
  if (Mt(E)) return qe;
  if (Le(E)) {
    var b = typeof E.valueOf == "function" ? E.valueOf() : E;
    E = Le(b) ? b + "" : b;
  }
  if (typeof E != "string") return E === 0 ? E : +E;
  E = Wt(E);
  var w = Nt.test(E);
  return w || zt.test(E) ? Ut(E.slice(2), w ? 2 : 8) : Ft.test(E) ? qe : +E;
}
var Me = function () {
    return Je.Date.now();
  },
  $t = "Expected a function",
  jt = Math.max,
  qt = Math.min;
function we(E, b, w) {
  var C,
    B,
    H,
    L,
    r,
    o,
    h = 0,
    u = !1,
    n = !1,
    d = !0;
  if (typeof E != "function") throw new TypeError($t);
  (b = Ke(b) || 0),
    Le(w) &&
      ((u = !!w.leading),
      (n = "maxWait" in w),
      (H = n ? jt(Ke(w.maxWait) || 0, b) : H),
      (d = "trailing" in w ? !!w.trailing : d));
  function f(_) {
    var g = C,
      c = B;
    return (C = B = void 0), (h = _), (L = E.apply(c, g)), L;
  }
  function p(_) {
    return (h = _), (r = setTimeout(i, b)), u ? f(_) : L;
  }
  function l(_) {
    var g = _ - o,
      c = _ - h,
      m = b - g;
    return n ? qt(m, H - c) : m;
  }
  function t(_) {
    var g = _ - o,
      c = _ - h;
    return o === void 0 || g >= b || g < 0 || (n && c >= H);
  }
  function i() {
    var _ = Me();
    if (t(_)) return e(_);
    r = setTimeout(i, l(_));
  }
  function e(_) {
    return (r = void 0), d && C ? f(_) : ((C = B = void 0), L);
  }
  function s() {
    r !== void 0 && clearTimeout(r), (h = 0), (C = o = B = r = void 0);
  }
  function a() {
    return r === void 0 ? L : e(Me());
  }
  function v() {
    var _ = Me(),
      g = t(_);
    if (((C = arguments), (B = this), (o = _), g)) {
      if (r === void 0) return p(o);
      if (n) return clearTimeout(r), (r = setTimeout(i, b)), f(o);
    }
    return r === void 0 && (r = setTimeout(i, b)), L;
  }
  return (v.cancel = s), (v.flush = a), v;
}
var Kt = "Expected a function";
function Vt(E, b, w) {
  var C = !0,
    B = !0;
  if (typeof E != "function") throw new TypeError(Kt);
  return (
    Le(w) &&
      ((C = "leading" in w ? !!w.leading : C),
      (B = "trailing" in w ? !!w.trailing : B)),
    we(E, b, { leading: C, maxWait: b, trailing: B })
  );
}
var de = function () {
    return (
      (de =
        Object.assign ||
        function (b) {
          for (var w, C = 1, B = arguments.length; C < B; C++) {
            w = arguments[C];
            for (var H in w)
              Object.prototype.hasOwnProperty.call(w, H) && (b[H] = w[H]);
          }
          return b;
        }),
      de.apply(this, arguments)
    );
  },
  ce = null,
  Ve = null;
$e &&
  window.addEventListener("resize", function () {
    Ve !== window.devicePixelRatio &&
      ((Ve = window.devicePixelRatio), (ce = null));
  });
function Ge() {
  if (ce === null) {
    if (typeof document > "u") return (ce = 0), ce;
    var E = document.body,
      b = document.createElement("div");
    b.classList.add("simplebar-hide-scrollbar"), E.appendChild(b);
    var w = b.getBoundingClientRect().right;
    E.removeChild(b), (ce = w);
  }
  return ce;
}
function Qe(E) {
  return !E || !E.ownerDocument || !E.ownerDocument.defaultView
    ? window
    : E.ownerDocument.defaultView;
}
function et(E) {
  return !E || !E.ownerDocument ? document : E.ownerDocument;
}
var tt = function (E) {
  var b = {},
    w = Array.prototype.reduce.call(
      E,
      function (C, B) {
        var H = B.name.match(/data-simplebar-(.+)/);
        if (H) {
          var L = H[1].replace(/\W+(.)/g, function (r, o) {
            return o.toUpperCase();
          });
          switch (B.value) {
            case "true":
              C[L] = !0;
              break;
            case "false":
              C[L] = !1;
              break;
            case void 0:
              C[L] = !0;
              break;
            default:
              C[L] = B.value;
          }
        }
        return C;
      },
      b
    );
  return w;
};
function it(E, b) {
  var w;
  E && (w = E.classList).add.apply(w, b.split(" "));
}
function st(E, b) {
  E &&
    b.split(" ").forEach(function (w) {
      E.classList.remove(w);
    });
}
function rt(E) {
  return ".".concat(E.split(" ").join("."));
}
var Gt = Object.freeze({
    __proto__: null,
    addClasses: it,
    classNamesToQuery: rt,
    getElementDocument: et,
    getElementWindow: Qe,
    getOptions: tt,
    removeClasses: st,
  }),
  ae = Qe,
  Pe = et,
  Xt = tt,
  he = it,
  le = st,
  te = rt,
  Ee = (function () {
    function E(b, w) {
      w === void 0 && (w = {});
      var C = this;
      if (
        ((this.removePreventClickId = null),
        (this.minScrollbarWidth = 20),
        (this.stopScrollDelay = 175),
        (this.isScrolling = !1),
        (this.isMouseEntering = !1),
        (this.isDragging = !1),
        (this.scrollXTicking = !1),
        (this.scrollYTicking = !1),
        (this.wrapperEl = null),
        (this.contentWrapperEl = null),
        (this.contentEl = null),
        (this.offsetEl = null),
        (this.maskEl = null),
        (this.placeholderEl = null),
        (this.heightAutoObserverWrapperEl = null),
        (this.heightAutoObserverEl = null),
        (this.rtlHelpers = null),
        (this.scrollbarWidth = 0),
        (this.resizeObserver = null),
        (this.mutationObserver = null),
        (this.elStyles = null),
        (this.isRtl = null),
        (this.mouseX = 0),
        (this.mouseY = 0),
        (this.onMouseMove = function () {}),
        (this.onWindowResize = function () {}),
        (this.onStopScrolling = function () {}),
        (this.onMouseEntered = function () {}),
        (this.onScroll = function () {
          var B = ae(C.el);
          C.scrollXTicking ||
            (B.requestAnimationFrame(C.scrollX), (C.scrollXTicking = !0)),
            C.scrollYTicking ||
              (B.requestAnimationFrame(C.scrollY), (C.scrollYTicking = !0)),
            C.isScrolling ||
              ((C.isScrolling = !0), he(C.el, C.classNames.scrolling)),
            C.showScrollbar("x"),
            C.showScrollbar("y"),
            C.onStopScrolling();
        }),
        (this.scrollX = function () {
          C.axis.x.isOverflowing && C.positionScrollbar("x"),
            (C.scrollXTicking = !1);
        }),
        (this.scrollY = function () {
          C.axis.y.isOverflowing && C.positionScrollbar("y"),
            (C.scrollYTicking = !1);
        }),
        (this._onStopScrolling = function () {
          le(C.el, C.classNames.scrolling),
            C.options.autoHide && (C.hideScrollbar("x"), C.hideScrollbar("y")),
            (C.isScrolling = !1);
        }),
        (this.onMouseEnter = function () {
          C.isMouseEntering ||
            (he(C.el, C.classNames.mouseEntered),
            C.showScrollbar("x"),
            C.showScrollbar("y"),
            (C.isMouseEntering = !0)),
            C.onMouseEntered();
        }),
        (this._onMouseEntered = function () {
          le(C.el, C.classNames.mouseEntered),
            C.options.autoHide && (C.hideScrollbar("x"), C.hideScrollbar("y")),
            (C.isMouseEntering = !1);
        }),
        (this._onMouseMove = function (B) {
          (C.mouseX = B.clientX),
            (C.mouseY = B.clientY),
            (C.axis.x.isOverflowing || C.axis.x.forceVisible) &&
              C.onMouseMoveForAxis("x"),
            (C.axis.y.isOverflowing || C.axis.y.forceVisible) &&
              C.onMouseMoveForAxis("y");
        }),
        (this.onMouseLeave = function () {
          C.onMouseMove.cancel(),
            (C.axis.x.isOverflowing || C.axis.x.forceVisible) &&
              C.onMouseLeaveForAxis("x"),
            (C.axis.y.isOverflowing || C.axis.y.forceVisible) &&
              C.onMouseLeaveForAxis("y"),
            (C.mouseX = -1),
            (C.mouseY = -1);
        }),
        (this._onWindowResize = function () {
          (C.scrollbarWidth = C.getScrollbarWidth()), C.hideNativeScrollbar();
        }),
        (this.onPointerEvent = function (B) {
          if (
            !(
              !C.axis.x.track.el ||
              !C.axis.y.track.el ||
              !C.axis.x.scrollbar.el ||
              !C.axis.y.scrollbar.el
            )
          ) {
            var H, L;
            (C.axis.x.track.rect = C.axis.x.track.el.getBoundingClientRect()),
              (C.axis.y.track.rect = C.axis.y.track.el.getBoundingClientRect()),
              (C.axis.x.isOverflowing || C.axis.x.forceVisible) &&
                (H = C.isWithinBounds(C.axis.x.track.rect)),
              (C.axis.y.isOverflowing || C.axis.y.forceVisible) &&
                (L = C.isWithinBounds(C.axis.y.track.rect)),
              (H || L) &&
                (B.stopPropagation(),
                B.type === "pointerdown" &&
                  B.pointerType !== "touch" &&
                  (H &&
                    ((C.axis.x.scrollbar.rect =
                      C.axis.x.scrollbar.el.getBoundingClientRect()),
                    C.isWithinBounds(C.axis.x.scrollbar.rect)
                      ? C.onDragStart(B, "x")
                      : C.onTrackClick(B, "x")),
                  L &&
                    ((C.axis.y.scrollbar.rect =
                      C.axis.y.scrollbar.el.getBoundingClientRect()),
                    C.isWithinBounds(C.axis.y.scrollbar.rect)
                      ? C.onDragStart(B, "y")
                      : C.onTrackClick(B, "y"))));
          }
        }),
        (this.drag = function (B) {
          var H, L, r, o, h, u, n, d, f, p, l;
          if (!(!C.draggedAxis || !C.contentWrapperEl)) {
            var t,
              i = C.axis[C.draggedAxis].track,
              e =
                (L =
                  (H = i.rect) === null || H === void 0
                    ? void 0
                    : H[C.axis[C.draggedAxis].sizeAttr]) !== null &&
                L !== void 0
                  ? L
                  : 0,
              s = C.axis[C.draggedAxis].scrollbar,
              a =
                (o =
                  (r = C.contentWrapperEl) === null || r === void 0
                    ? void 0
                    : r[C.axis[C.draggedAxis].scrollSizeAttr]) !== null &&
                o !== void 0
                  ? o
                  : 0,
              v = parseInt(
                (u =
                  (h = C.elStyles) === null || h === void 0
                    ? void 0
                    : h[C.axis[C.draggedAxis].sizeAttr]) !== null &&
                  u !== void 0
                  ? u
                  : "0px",
                10
              );
            B.preventDefault(),
              B.stopPropagation(),
              C.draggedAxis === "y" ? (t = B.pageY) : (t = B.pageX);
            var _ =
              t -
              ((d =
                (n = i.rect) === null || n === void 0
                  ? void 0
                  : n[C.axis[C.draggedAxis].offsetAttr]) !== null &&
              d !== void 0
                ? d
                : 0) -
              C.axis[C.draggedAxis].dragOffset;
            _ =
              C.draggedAxis === "x" && C.isRtl
                ? ((p =
                    (f = i.rect) === null || f === void 0
                      ? void 0
                      : f[C.axis[C.draggedAxis].sizeAttr]) !== null &&
                  p !== void 0
                    ? p
                    : 0) -
                  s.size -
                  _
                : _;
            var g = _ / (e - s.size),
              c = g * (a - v);
            C.draggedAxis === "x" &&
              C.isRtl &&
              (c =
                !((l = E.getRtlHelpers()) === null || l === void 0) &&
                l.isScrollingToNegative
                  ? -c
                  : c),
              (C.contentWrapperEl[C.axis[C.draggedAxis].scrollOffsetAttr] = c);
          }
        }),
        (this.onEndDrag = function (B) {
          C.isDragging = !1;
          var H = Pe(C.el),
            L = ae(C.el);
          B.preventDefault(),
            B.stopPropagation(),
            le(C.el, C.classNames.dragging),
            C.onStopScrolling(),
            H.removeEventListener("mousemove", C.drag, !0),
            H.removeEventListener("mouseup", C.onEndDrag, !0),
            (C.removePreventClickId = L.setTimeout(function () {
              H.removeEventListener("click", C.preventClick, !0),
                H.removeEventListener("dblclick", C.preventClick, !0),
                (C.removePreventClickId = null);
            }));
        }),
        (this.preventClick = function (B) {
          B.preventDefault(), B.stopPropagation();
        }),
        (this.el = b),
        (this.options = de(de({}, E.defaultOptions), w)),
        (this.classNames = de(
          de({}, E.defaultOptions.classNames),
          w.classNames
        )),
        (this.axis = {
          x: {
            scrollOffsetAttr: "scrollLeft",
            sizeAttr: "width",
            scrollSizeAttr: "scrollWidth",
            offsetSizeAttr: "offsetWidth",
            offsetAttr: "left",
            overflowAttr: "overflowX",
            dragOffset: 0,
            isOverflowing: !0,
            forceVisible: !1,
            track: { size: null, el: null, rect: null, isVisible: !1 },
            scrollbar: { size: null, el: null, rect: null, isVisible: !1 },
          },
          y: {
            scrollOffsetAttr: "scrollTop",
            sizeAttr: "height",
            scrollSizeAttr: "scrollHeight",
            offsetSizeAttr: "offsetHeight",
            offsetAttr: "top",
            overflowAttr: "overflowY",
            dragOffset: 0,
            isOverflowing: !0,
            forceVisible: !1,
            track: { size: null, el: null, rect: null, isVisible: !1 },
            scrollbar: { size: null, el: null, rect: null, isVisible: !1 },
          },
        }),
        typeof this.el != "object" || !this.el.nodeName)
      )
        throw new Error(
          "Argument passed to SimpleBar must be an HTML element instead of ".concat(
            this.el
          )
        );
      (this.onMouseMove = Vt(this._onMouseMove, 64)),
        (this.onWindowResize = we(this._onWindowResize, 64, { leading: !0 })),
        (this.onStopScrolling = we(
          this._onStopScrolling,
          this.stopScrollDelay
        )),
        (this.onMouseEntered = we(this._onMouseEntered, this.stopScrollDelay)),
        this.init();
    }
    return (
      (E.getRtlHelpers = function () {
        if (E.rtlHelpers) return E.rtlHelpers;
        var b = document.createElement("div");
        b.innerHTML =
          '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
        var w = b.firstElementChild,
          C = w?.firstElementChild;
        if (!C) return null;
        document.body.appendChild(w), (w.scrollLeft = 0);
        var B = E.getOffset(w),
          H = E.getOffset(C);
        w.scrollLeft = -999;
        var L = E.getOffset(C);
        return (
          document.body.removeChild(w),
          (E.rtlHelpers = {
            isScrollOriginAtZero: B.left !== H.left,
            isScrollingToNegative: H.left !== L.left,
          }),
          E.rtlHelpers
        );
      }),
      (E.prototype.getScrollbarWidth = function () {
        try {
          return (this.contentWrapperEl &&
            getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar")
              .display === "none") ||
            "scrollbarWidth" in document.documentElement.style ||
            "-ms-overflow-style" in document.documentElement.style
            ? 0
            : Ge();
        } catch {
          return Ge();
        }
      }),
      (E.getOffset = function (b) {
        var w = b.getBoundingClientRect(),
          C = Pe(b),
          B = ae(b);
        return {
          top: w.top + (B.pageYOffset || C.documentElement.scrollTop),
          left: w.left + (B.pageXOffset || C.documentElement.scrollLeft),
        };
      }),
      (E.prototype.init = function () {
        $e &&
          (this.initDOM(),
          (this.rtlHelpers = E.getRtlHelpers()),
          (this.scrollbarWidth = this.getScrollbarWidth()),
          this.recalculate(),
          this.initListeners());
      }),
      (E.prototype.initDOM = function () {
        var b, w;
        (this.wrapperEl = this.el.querySelector(te(this.classNames.wrapper))),
          (this.contentWrapperEl =
            this.options.scrollableNode ||
            this.el.querySelector(te(this.classNames.contentWrapper))),
          (this.contentEl =
            this.options.contentNode ||
            this.el.querySelector(te(this.classNames.contentEl))),
          (this.offsetEl = this.el.querySelector(te(this.classNames.offset))),
          (this.maskEl = this.el.querySelector(te(this.classNames.mask))),
          (this.placeholderEl = this.findChild(
            this.wrapperEl,
            te(this.classNames.placeholder)
          )),
          (this.heightAutoObserverWrapperEl = this.el.querySelector(
            te(this.classNames.heightAutoObserverWrapperEl)
          )),
          (this.heightAutoObserverEl = this.el.querySelector(
            te(this.classNames.heightAutoObserverEl)
          )),
          (this.axis.x.track.el = this.findChild(
            this.el,
            ""
              .concat(te(this.classNames.track))
              .concat(te(this.classNames.horizontal))
          )),
          (this.axis.y.track.el = this.findChild(
            this.el,
            ""
              .concat(te(this.classNames.track))
              .concat(te(this.classNames.vertical))
          )),
          (this.axis.x.scrollbar.el =
            ((b = this.axis.x.track.el) === null || b === void 0
              ? void 0
              : b.querySelector(te(this.classNames.scrollbar))) || null),
          (this.axis.y.scrollbar.el =
            ((w = this.axis.y.track.el) === null || w === void 0
              ? void 0
              : w.querySelector(te(this.classNames.scrollbar))) || null),
          this.options.autoHide ||
            (he(this.axis.x.scrollbar.el, this.classNames.visible),
            he(this.axis.y.scrollbar.el, this.classNames.visible));
      }),
      (E.prototype.initListeners = function () {
        var b = this,
          w,
          C = ae(this.el);
        if (
          (this.el.addEventListener("mouseenter", this.onMouseEnter),
          this.el.addEventListener("pointerdown", this.onPointerEvent, !0),
          this.el.addEventListener("mousemove", this.onMouseMove),
          this.el.addEventListener("mouseleave", this.onMouseLeave),
          (w = this.contentWrapperEl) === null ||
            w === void 0 ||
            w.addEventListener("scroll", this.onScroll),
          C.addEventListener("resize", this.onWindowResize),
          !!this.contentEl)
        ) {
          if (window.ResizeObserver) {
            var B = !1,
              H = C.ResizeObserver || ResizeObserver;
            (this.resizeObserver = new H(function () {
              B &&
                C.requestAnimationFrame(function () {
                  b.recalculate();
                });
            })),
              this.resizeObserver.observe(this.el),
              this.resizeObserver.observe(this.contentEl),
              C.requestAnimationFrame(function () {
                B = !0;
              });
          }
          (this.mutationObserver = new C.MutationObserver(function () {
            C.requestAnimationFrame(function () {
              b.recalculate();
            });
          })),
            this.mutationObserver.observe(this.contentEl, {
              childList: !0,
              subtree: !0,
              characterData: !0,
            });
        }
      }),
      (E.prototype.recalculate = function () {
        if (
          !(
            !this.heightAutoObserverEl ||
            !this.contentEl ||
            !this.contentWrapperEl ||
            !this.wrapperEl ||
            !this.placeholderEl
          )
        ) {
          var b = ae(this.el);
          (this.elStyles = b.getComputedStyle(this.el)),
            (this.isRtl = this.elStyles.direction === "rtl");
          var w = this.contentEl.offsetWidth,
            C = this.heightAutoObserverEl.offsetHeight <= 1,
            B = this.heightAutoObserverEl.offsetWidth <= 1 || w > 0,
            H = this.contentWrapperEl.offsetWidth,
            L = this.elStyles.overflowX,
            r = this.elStyles.overflowY;
          (this.contentEl.style.padding = ""
            .concat(this.elStyles.paddingTop, " ")
            .concat(this.elStyles.paddingRight, " ")
            .concat(this.elStyles.paddingBottom, " ")
            .concat(this.elStyles.paddingLeft)),
            (this.wrapperEl.style.margin = "-"
              .concat(this.elStyles.paddingTop, " -")
              .concat(this.elStyles.paddingRight, " -")
              .concat(this.elStyles.paddingBottom, " -")
              .concat(this.elStyles.paddingLeft));
          var o = this.contentEl.scrollHeight,
            h = this.contentEl.scrollWidth;
          (this.contentWrapperEl.style.height = C ? "auto" : "100%"),
            (this.placeholderEl.style.width = B
              ? "".concat(w || h, "px")
              : "auto"),
            (this.placeholderEl.style.height = "".concat(o, "px"));
          var u = this.contentWrapperEl.offsetHeight;
          (this.axis.x.isOverflowing = w !== 0 && h > w),
            (this.axis.y.isOverflowing = o > u),
            (this.axis.x.isOverflowing =
              L === "hidden" ? !1 : this.axis.x.isOverflowing),
            (this.axis.y.isOverflowing =
              r === "hidden" ? !1 : this.axis.y.isOverflowing),
            (this.axis.x.forceVisible =
              this.options.forceVisible === "x" ||
              this.options.forceVisible === !0),
            (this.axis.y.forceVisible =
              this.options.forceVisible === "y" ||
              this.options.forceVisible === !0),
            this.hideNativeScrollbar();
          var n = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
            d = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
          (this.axis.x.isOverflowing = this.axis.x.isOverflowing && h > H - d),
            (this.axis.y.isOverflowing =
              this.axis.y.isOverflowing && o > u - n),
            (this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
            (this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
            this.axis.x.scrollbar.el &&
              (this.axis.x.scrollbar.el.style.width = "".concat(
                this.axis.x.scrollbar.size,
                "px"
              )),
            this.axis.y.scrollbar.el &&
              (this.axis.y.scrollbar.el.style.height = "".concat(
                this.axis.y.scrollbar.size,
                "px"
              )),
            this.positionScrollbar("x"),
            this.positionScrollbar("y"),
            this.toggleTrackVisibility("x"),
            this.toggleTrackVisibility("y");
        }
      }),
      (E.prototype.getScrollbarSize = function (b) {
        var w, C;
        if (
          (b === void 0 && (b = "y"),
          !this.axis[b].isOverflowing || !this.contentEl)
        )
          return 0;
        var B = this.contentEl[this.axis[b].scrollSizeAttr],
          H =
            (C =
              (w = this.axis[b].track.el) === null || w === void 0
                ? void 0
                : w[this.axis[b].offsetSizeAttr]) !== null && C !== void 0
              ? C
              : 0,
          L = H / B,
          r;
        return (
          (r = Math.max(~~(L * H), this.options.scrollbarMinSize)),
          this.options.scrollbarMaxSize &&
            (r = Math.min(r, this.options.scrollbarMaxSize)),
          r
        );
      }),
      (E.prototype.positionScrollbar = function (b) {
        var w, C, B;
        b === void 0 && (b = "y");
        var H = this.axis[b].scrollbar;
        if (
          !(
            !this.axis[b].isOverflowing ||
            !this.contentWrapperEl ||
            !H.el ||
            !this.elStyles
          )
        ) {
          var L = this.contentWrapperEl[this.axis[b].scrollSizeAttr],
            r =
              ((w = this.axis[b].track.el) === null || w === void 0
                ? void 0
                : w[this.axis[b].offsetSizeAttr]) || 0,
            o = parseInt(this.elStyles[this.axis[b].sizeAttr], 10),
            h = this.contentWrapperEl[this.axis[b].scrollOffsetAttr];
          (h =
            b === "x" &&
            this.isRtl &&
            !((C = E.getRtlHelpers()) === null || C === void 0) &&
            C.isScrollOriginAtZero
              ? -h
              : h),
            b === "x" &&
              this.isRtl &&
              (h =
                !((B = E.getRtlHelpers()) === null || B === void 0) &&
                B.isScrollingToNegative
                  ? h
                  : -h);
          var u = h / (L - o),
            n = ~~((r - H.size) * u);
          (n = b === "x" && this.isRtl ? -n + (r - H.size) : n),
            (H.el.style.transform =
              b === "x"
                ? "translate3d(".concat(n, "px, 0, 0)")
                : "translate3d(0, ".concat(n, "px, 0)"));
        }
      }),
      (E.prototype.toggleTrackVisibility = function (b) {
        b === void 0 && (b = "y");
        var w = this.axis[b].track.el,
          C = this.axis[b].scrollbar.el;
        !w ||
          !C ||
          !this.contentWrapperEl ||
          (this.axis[b].isOverflowing || this.axis[b].forceVisible
            ? ((w.style.visibility = "visible"),
              (this.contentWrapperEl.style[this.axis[b].overflowAttr] =
                "scroll"),
              this.el.classList.add(
                "".concat(this.classNames.scrollable, "-").concat(b)
              ))
            : ((w.style.visibility = "hidden"),
              (this.contentWrapperEl.style[this.axis[b].overflowAttr] =
                "hidden"),
              this.el.classList.remove(
                "".concat(this.classNames.scrollable, "-").concat(b)
              )),
          this.axis[b].isOverflowing
            ? (C.style.display = "block")
            : (C.style.display = "none"));
      }),
      (E.prototype.showScrollbar = function (b) {
        b === void 0 && (b = "y"),
          this.axis[b].isOverflowing &&
            !this.axis[b].scrollbar.isVisible &&
            (he(this.axis[b].scrollbar.el, this.classNames.visible),
            (this.axis[b].scrollbar.isVisible = !0));
      }),
      (E.prototype.hideScrollbar = function (b) {
        b === void 0 && (b = "y"),
          !this.isDragging &&
            this.axis[b].isOverflowing &&
            this.axis[b].scrollbar.isVisible &&
            (le(this.axis[b].scrollbar.el, this.classNames.visible),
            (this.axis[b].scrollbar.isVisible = !1));
      }),
      (E.prototype.hideNativeScrollbar = function () {
        this.offsetEl &&
          ((this.offsetEl.style[this.isRtl ? "left" : "right"] =
            this.axis.y.isOverflowing || this.axis.y.forceVisible
              ? "-".concat(this.scrollbarWidth, "px")
              : "0px"),
          (this.offsetEl.style.bottom =
            this.axis.x.isOverflowing || this.axis.x.forceVisible
              ? "-".concat(this.scrollbarWidth, "px")
              : "0px"));
      }),
      (E.prototype.onMouseMoveForAxis = function (b) {
        b === void 0 && (b = "y");
        var w = this.axis[b];
        !w.track.el ||
          !w.scrollbar.el ||
          ((w.track.rect = w.track.el.getBoundingClientRect()),
          (w.scrollbar.rect = w.scrollbar.el.getBoundingClientRect()),
          this.isWithinBounds(w.track.rect)
            ? (this.showScrollbar(b),
              he(w.track.el, this.classNames.hover),
              this.isWithinBounds(w.scrollbar.rect)
                ? he(w.scrollbar.el, this.classNames.hover)
                : le(w.scrollbar.el, this.classNames.hover))
            : (le(w.track.el, this.classNames.hover),
              this.options.autoHide && this.hideScrollbar(b)));
      }),
      (E.prototype.onMouseLeaveForAxis = function (b) {
        b === void 0 && (b = "y"),
          le(this.axis[b].track.el, this.classNames.hover),
          le(this.axis[b].scrollbar.el, this.classNames.hover),
          this.options.autoHide && this.hideScrollbar(b);
      }),
      (E.prototype.onDragStart = function (b, w) {
        var C;
        w === void 0 && (w = "y"), (this.isDragging = !0);
        var B = Pe(this.el),
          H = ae(this.el),
          L = this.axis[w].scrollbar,
          r = w === "y" ? b.pageY : b.pageX;
        (this.axis[w].dragOffset =
          r -
          (((C = L.rect) === null || C === void 0
            ? void 0
            : C[this.axis[w].offsetAttr]) || 0)),
          (this.draggedAxis = w),
          he(this.el, this.classNames.dragging),
          B.addEventListener("mousemove", this.drag, !0),
          B.addEventListener("mouseup", this.onEndDrag, !0),
          this.removePreventClickId === null
            ? (B.addEventListener("click", this.preventClick, !0),
              B.addEventListener("dblclick", this.preventClick, !0))
            : (H.clearTimeout(this.removePreventClickId),
              (this.removePreventClickId = null));
      }),
      (E.prototype.onTrackClick = function (b, w) {
        var C = this,
          B,
          H,
          L,
          r;
        w === void 0 && (w = "y");
        var o = this.axis[w];
        if (
          !(
            !this.options.clickOnTrack ||
            !o.scrollbar.el ||
            !this.contentWrapperEl
          )
        ) {
          b.preventDefault();
          var h = ae(this.el);
          this.axis[w].scrollbar.rect = o.scrollbar.el.getBoundingClientRect();
          var u = this.axis[w].scrollbar,
            n =
              (H =
                (B = u.rect) === null || B === void 0
                  ? void 0
                  : B[this.axis[w].offsetAttr]) !== null && H !== void 0
                ? H
                : 0,
            d = parseInt(
              (r =
                (L = this.elStyles) === null || L === void 0
                  ? void 0
                  : L[this.axis[w].sizeAttr]) !== null && r !== void 0
                ? r
                : "0px",
              10
            ),
            f = this.contentWrapperEl[this.axis[w].scrollOffsetAttr],
            p = w === "y" ? this.mouseY - n : this.mouseX - n,
            l = p < 0 ? -1 : 1,
            t = l === -1 ? f - d : f + d,
            i = 40,
            e = function () {
              C.contentWrapperEl &&
                (l === -1
                  ? f > t &&
                    ((f -= i),
                    (C.contentWrapperEl[C.axis[w].scrollOffsetAttr] = f),
                    h.requestAnimationFrame(e))
                  : f < t &&
                    ((f += i),
                    (C.contentWrapperEl[C.axis[w].scrollOffsetAttr] = f),
                    h.requestAnimationFrame(e)));
            };
          e();
        }
      }),
      (E.prototype.getContentElement = function () {
        return this.contentEl;
      }),
      (E.prototype.getScrollElement = function () {
        return this.contentWrapperEl;
      }),
      (E.prototype.removeListeners = function () {
        var b = ae(this.el);
        this.el.removeEventListener("mouseenter", this.onMouseEnter),
          this.el.removeEventListener("pointerdown", this.onPointerEvent, !0),
          this.el.removeEventListener("mousemove", this.onMouseMove),
          this.el.removeEventListener("mouseleave", this.onMouseLeave),
          this.contentWrapperEl &&
            this.contentWrapperEl.removeEventListener("scroll", this.onScroll),
          b.removeEventListener("resize", this.onWindowResize),
          this.mutationObserver && this.mutationObserver.disconnect(),
          this.resizeObserver && this.resizeObserver.disconnect(),
          this.onMouseMove.cancel(),
          this.onWindowResize.cancel(),
          this.onStopScrolling.cancel(),
          this.onMouseEntered.cancel();
      }),
      (E.prototype.unMount = function () {
        this.removeListeners();
      }),
      (E.prototype.isWithinBounds = function (b) {
        return (
          this.mouseX >= b.left &&
          this.mouseX <= b.left + b.width &&
          this.mouseY >= b.top &&
          this.mouseY <= b.top + b.height
        );
      }),
      (E.prototype.findChild = function (b, w) {
        var C =
          b.matches ||
          b.webkitMatchesSelector ||
          b.mozMatchesSelector ||
          b.msMatchesSelector;
        return Array.prototype.filter.call(b.children, function (B) {
          return C.call(B, w);
        })[0];
      }),
      (E.rtlHelpers = null),
      (E.defaultOptions = {
        forceVisible: !1,
        clickOnTrack: !0,
        scrollbarMinSize: 25,
        scrollbarMaxSize: 0,
        ariaLabel: "scrollable content",
        classNames: {
          contentEl: "simplebar-content",
          contentWrapper: "simplebar-content-wrapper",
          offset: "simplebar-offset",
          mask: "simplebar-mask",
          wrapper: "simplebar-wrapper",
          placeholder: "simplebar-placeholder",
          scrollbar: "simplebar-scrollbar",
          track: "simplebar-track",
          heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
          heightAutoObserverEl: "simplebar-height-auto-observer",
          visible: "simplebar-visible",
          horizontal: "simplebar-horizontal",
          vertical: "simplebar-vertical",
          hover: "simplebar-hover",
          dragging: "simplebar-dragging",
          scrolling: "simplebar-scrolling",
          scrollable: "simplebar-scrollable",
          mouseEntered: "simplebar-mouse-entered",
        },
        scrollableNode: null,
        contentNode: null,
        autoHide: !0,
      }),
      (E.getOptions = Xt),
      (E.helpers = Gt),
      E
    );
  })(),
  Fe = function (E, b) {
    return (
      (Fe =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (w, C) {
            w.__proto__ = C;
          }) ||
        function (w, C) {
          for (var B in C)
            Object.prototype.hasOwnProperty.call(C, B) && (w[B] = C[B]);
        }),
      Fe(E, b)
    );
  };
function Yt(E, b) {
  if (typeof b != "function" && b !== null)
    throw new TypeError(
      "Class extends value " + String(b) + " is not a constructor or null"
    );
  Fe(E, b);
  function w() {
    this.constructor = E;
  }
  E.prototype =
    b === null ? Object.create(b) : ((w.prototype = b.prototype), new w());
}
var nt = Ee.helpers,
  Ie = nt.getOptions,
  se = nt.addClasses,
  Jt = (function (E) {
    Yt(b, E);
    function b() {
      for (var w = [], C = 0; C < arguments.length; C++) w[C] = arguments[C];
      var B = E.apply(this, w) || this;
      return b.instances.set(w[0], B), B;
    }
    return (
      (b.initDOMLoadedElements = function () {
        document.removeEventListener(
          "DOMContentLoaded",
          this.initDOMLoadedElements
        ),
          window.removeEventListener("load", this.initDOMLoadedElements),
          Array.prototype.forEach.call(
            document.querySelectorAll("[data-simplebar]"),
            function (w) {
              w.getAttribute("data-simplebar") !== "init" &&
                !b.instances.has(w) &&
                new b(w, Ie(w.attributes));
            }
          );
      }),
      (b.removeObserver = function () {
        var w;
        (w = b.globalObserver) === null || w === void 0 || w.disconnect();
      }),
      (b.prototype.initDOM = function () {
        var w = this,
          C,
          B,
          H;
        if (
          !Array.prototype.filter.call(this.el.children, function (o) {
            return o.classList.contains(w.classNames.wrapper);
          }).length
        ) {
          for (
            this.wrapperEl = document.createElement("div"),
              this.contentWrapperEl = document.createElement("div"),
              this.offsetEl = document.createElement("div"),
              this.maskEl = document.createElement("div"),
              this.contentEl = document.createElement("div"),
              this.placeholderEl = document.createElement("div"),
              this.heightAutoObserverWrapperEl = document.createElement("div"),
              this.heightAutoObserverEl = document.createElement("div"),
              se(this.wrapperEl, this.classNames.wrapper),
              se(this.contentWrapperEl, this.classNames.contentWrapper),
              se(this.offsetEl, this.classNames.offset),
              se(this.maskEl, this.classNames.mask),
              se(this.contentEl, this.classNames.contentEl),
              se(this.placeholderEl, this.classNames.placeholder),
              se(
                this.heightAutoObserverWrapperEl,
                this.classNames.heightAutoObserverWrapperEl
              ),
              se(
                this.heightAutoObserverEl,
                this.classNames.heightAutoObserverEl
              );
            this.el.firstChild;

          )
            this.contentEl.appendChild(this.el.firstChild);
          this.contentWrapperEl.appendChild(this.contentEl),
            this.offsetEl.appendChild(this.contentWrapperEl),
            this.maskEl.appendChild(this.offsetEl),
            this.heightAutoObserverWrapperEl.appendChild(
              this.heightAutoObserverEl
            ),
            this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
            this.wrapperEl.appendChild(this.maskEl),
            this.wrapperEl.appendChild(this.placeholderEl),
            this.el.appendChild(this.wrapperEl),
            (C = this.contentWrapperEl) === null ||
              C === void 0 ||
              C.setAttribute("tabindex", "0"),
            (B = this.contentWrapperEl) === null ||
              B === void 0 ||
              B.setAttribute("role", "region"),
            (H = this.contentWrapperEl) === null ||
              H === void 0 ||
              H.setAttribute("aria-label", this.options.ariaLabel);
        }
        if (!this.axis.x.track.el || !this.axis.y.track.el) {
          var L = document.createElement("div"),
            r = document.createElement("div");
          se(L, this.classNames.track),
            se(r, this.classNames.scrollbar),
            L.appendChild(r),
            (this.axis.x.track.el = L.cloneNode(!0)),
            se(this.axis.x.track.el, this.classNames.horizontal),
            (this.axis.y.track.el = L.cloneNode(!0)),
            se(this.axis.y.track.el, this.classNames.vertical),
            this.el.appendChild(this.axis.x.track.el),
            this.el.appendChild(this.axis.y.track.el);
        }
        Ee.prototype.initDOM.call(this),
          this.el.setAttribute("data-simplebar", "init");
      }),
      (b.prototype.unMount = function () {
        Ee.prototype.unMount.call(this), b.instances.delete(this.el);
      }),
      (b.initHtmlApi = function () {
        (this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this)),
          typeof MutationObserver < "u" &&
            ((this.globalObserver = new MutationObserver(b.handleMutations)),
            this.globalObserver.observe(document, {
              childList: !0,
              subtree: !0,
            })),
          document.readyState === "complete" ||
          (document.readyState !== "loading" &&
            !document.documentElement.doScroll)
            ? window.setTimeout(this.initDOMLoadedElements)
            : (document.addEventListener(
                "DOMContentLoaded",
                this.initDOMLoadedElements
              ),
              window.addEventListener("load", this.initDOMLoadedElements));
      }),
      (b.handleMutations = function (w) {
        w.forEach(function (C) {
          C.addedNodes.forEach(function (B) {
            B.nodeType === 1 &&
              (B.hasAttribute("data-simplebar")
                ? !b.instances.has(B) &&
                  document.documentElement.contains(B) &&
                  new b(B, Ie(B.attributes))
                : B.querySelectorAll("[data-simplebar]").forEach(function (H) {
                    H.getAttribute("data-simplebar") !== "init" &&
                      !b.instances.has(H) &&
                      document.documentElement.contains(H) &&
                      new b(H, Ie(H.attributes));
                  }));
          }),
            C.removedNodes.forEach(function (B) {
              var H;
              B.nodeType === 1 &&
                (B.getAttribute("data-simplebar") === "init"
                  ? !document.documentElement.contains(B) &&
                    ((H = b.instances.get(B)) === null ||
                      H === void 0 ||
                      H.unMount())
                  : Array.prototype.forEach.call(
                      B.querySelectorAll('[data-simplebar="init"]'),
                      function (L) {
                        var r;
                        !document.documentElement.contains(L) &&
                          ((r = b.instances.get(L)) === null ||
                            r === void 0 ||
                            r.unMount());
                      }
                    ));
            });
        });
      }),
      (b.instances = new WeakMap()),
      b
    );
  })(Ee);
$e && Jt.initHtmlApi();
var ot = (function () {
    if (typeof Map < "u") return Map;
    function E(b, w) {
      var C = -1;
      return (
        b.some(function (B, H) {
          return B[0] === w ? ((C = H), !0) : !1;
        }),
        C
      );
    }
    return (function () {
      function b() {
        this.__entries__ = [];
      }
      return (
        Object.defineProperty(b.prototype, "size", {
          get: function () {
            return this.__entries__.length;
          },
          enumerable: !0,
          configurable: !0,
        }),
        (b.prototype.get = function (w) {
          var C = E(this.__entries__, w),
            B = this.__entries__[C];
          return B && B[1];
        }),
        (b.prototype.set = function (w, C) {
          var B = E(this.__entries__, w);
          ~B ? (this.__entries__[B][1] = C) : this.__entries__.push([w, C]);
        }),
        (b.prototype.delete = function (w) {
          var C = this.__entries__,
            B = E(C, w);
          ~B && C.splice(B, 1);
        }),
        (b.prototype.has = function (w) {
          return !!~E(this.__entries__, w);
        }),
        (b.prototype.clear = function () {
          this.__entries__.splice(0);
        }),
        (b.prototype.forEach = function (w, C) {
          C === void 0 && (C = null);
          for (var B = 0, H = this.__entries__; B < H.length; B++) {
            var L = H[B];
            w.call(C, L[1], L[0]);
          }
        }),
        b
      );
    })();
  })(),
  Ne =
    typeof window < "u" &&
    typeof document < "u" &&
    window.document === document,
  xe = (function () {
    return typeof global < "u" && global.Math === Math
      ? global
      : typeof self < "u" && self.Math === Math
      ? self
      : typeof window < "u" && window.Math === Math
      ? window
      : Function("return this")();
  })(),
  Zt = (function () {
    return typeof requestAnimationFrame == "function"
      ? requestAnimationFrame.bind(xe)
      : function (E) {
          return setTimeout(function () {
            return E(Date.now());
          }, 1e3 / 60);
        };
  })(),
  Qt = 2;
function ei(E, b) {
  var w = !1,
    C = !1,
    B = 0;
  function H() {
    w && ((w = !1), E()), C && r();
  }
  function L() {
    Zt(H);
  }
  function r() {
    var o = Date.now();
    if (w) {
      if (o - B < Qt) return;
      C = !0;
    } else (w = !0), (C = !1), setTimeout(L, b);
    B = o;
  }
  return r;
}
var ti = 20,
  ii = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
  si = typeof MutationObserver < "u",
  ri = (function () {
    function E() {
      (this.connected_ = !1),
        (this.mutationEventsAdded_ = !1),
        (this.mutationsObserver_ = null),
        (this.observers_ = []),
        (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
        (this.refresh = ei(this.refresh.bind(this), ti));
    }
    return (
      (E.prototype.addObserver = function (b) {
        ~this.observers_.indexOf(b) || this.observers_.push(b),
          this.connected_ || this.connect_();
      }),
      (E.prototype.removeObserver = function (b) {
        var w = this.observers_,
          C = w.indexOf(b);
        ~C && w.splice(C, 1),
          !w.length && this.connected_ && this.disconnect_();
      }),
      (E.prototype.refresh = function () {
        var b = this.updateObservers_();
        b && this.refresh();
      }),
      (E.prototype.updateObservers_ = function () {
        var b = this.observers_.filter(function (w) {
          return w.gatherActive(), w.hasActive();
        });
        return (
          b.forEach(function (w) {
            return w.broadcastActive();
          }),
          b.length > 0
        );
      }),
      (E.prototype.connect_ = function () {
        !Ne ||
          this.connected_ ||
          (document.addEventListener("transitionend", this.onTransitionEnd_),
          window.addEventListener("resize", this.refresh),
          si
            ? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
              this.mutationsObserver_.observe(document, {
                attributes: !0,
                childList: !0,
                characterData: !0,
                subtree: !0,
              }))
            : (document.addEventListener("DOMSubtreeModified", this.refresh),
              (this.mutationEventsAdded_ = !0)),
          (this.connected_ = !0));
      }),
      (E.prototype.disconnect_ = function () {
        !Ne ||
          !this.connected_ ||
          (document.removeEventListener("transitionend", this.onTransitionEnd_),
          window.removeEventListener("resize", this.refresh),
          this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
          this.mutationEventsAdded_ &&
            document.removeEventListener("DOMSubtreeModified", this.refresh),
          (this.mutationsObserver_ = null),
          (this.mutationEventsAdded_ = !1),
          (this.connected_ = !1));
      }),
      (E.prototype.onTransitionEnd_ = function (b) {
        var w = b.propertyName,
          C = w === void 0 ? "" : w,
          B = ii.some(function (H) {
            return !!~C.indexOf(H);
          });
        B && this.refresh();
      }),
      (E.getInstance = function () {
        return this.instance_ || (this.instance_ = new E()), this.instance_;
      }),
      (E.instance_ = null),
      E
    );
  })(),
  at = function (E, b) {
    for (var w = 0, C = Object.keys(b); w < C.length; w++) {
      var B = C[w];
      Object.defineProperty(E, B, {
        value: b[B],
        enumerable: !1,
        writable: !1,
        configurable: !0,
      });
    }
    return E;
  },
  ue = function (E) {
    var b = E && E.ownerDocument && E.ownerDocument.defaultView;
    return b || xe;
  },
  ht = Re(0, 0, 0, 0);
function De(E) {
  return parseFloat(E) || 0;
}
function Xe(E) {
  for (var b = [], w = 1; w < arguments.length; w++) b[w - 1] = arguments[w];
  return b.reduce(function (C, B) {
    var H = E["border-" + B + "-width"];
    return C + De(H);
  }, 0);
}
function ni(E) {
  for (
    var b = ["top", "right", "bottom", "left"], w = {}, C = 0, B = b;
    C < B.length;
    C++
  ) {
    var H = B[C],
      L = E["padding-" + H];
    w[H] = De(L);
  }
  return w;
}
function oi(E) {
  var b = E.getBBox();
  return Re(0, 0, b.width, b.height);
}
function ai(E) {
  var b = E.clientWidth,
    w = E.clientHeight;
  if (!b && !w) return ht;
  var C = ue(E).getComputedStyle(E),
    B = ni(C),
    H = B.left + B.right,
    L = B.top + B.bottom,
    r = De(C.width),
    o = De(C.height);
  if (
    (C.boxSizing === "border-box" &&
      (Math.round(r + H) !== b && (r -= Xe(C, "left", "right") + H),
      Math.round(o + L) !== w && (o -= Xe(C, "top", "bottom") + L)),
    !li(E))
  ) {
    var h = Math.round(r + H) - b,
      u = Math.round(o + L) - w;
    Math.abs(h) !== 1 && (r -= h), Math.abs(u) !== 1 && (o -= u);
  }
  return Re(B.left, B.top, r, o);
}
var hi = (function () {
  return typeof SVGGraphicsElement < "u"
    ? function (E) {
        return E instanceof ue(E).SVGGraphicsElement;
      }
    : function (E) {
        return E instanceof ue(E).SVGElement && typeof E.getBBox == "function";
      };
})();
function li(E) {
  return E === ue(E).document.documentElement;
}
function ci(E) {
  return Ne ? (hi(E) ? oi(E) : ai(E)) : ht;
}
function di(E) {
  var b = E.x,
    w = E.y,
    C = E.width,
    B = E.height,
    H = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object,
    L = Object.create(H.prototype);
  return (
    at(L, {
      x: b,
      y: w,
      width: C,
      height: B,
      top: w,
      right: b + C,
      bottom: B + w,
      left: b,
    }),
    L
  );
}
function Re(E, b, w, C) {
  return { x: E, y: b, width: w, height: C };
}
var ui = (function () {
    function E(b) {
      (this.broadcastWidth = 0),
        (this.broadcastHeight = 0),
        (this.contentRect_ = Re(0, 0, 0, 0)),
        (this.target = b);
    }
    return (
      (E.prototype.isActive = function () {
        var b = ci(this.target);
        return (
          (this.contentRect_ = b),
          b.width !== this.broadcastWidth || b.height !== this.broadcastHeight
        );
      }),
      (E.prototype.broadcastRect = function () {
        var b = this.contentRect_;
        return (
          (this.broadcastWidth = b.width), (this.broadcastHeight = b.height), b
        );
      }),
      E
    );
  })(),
  fi = (function () {
    function E(b, w) {
      var C = di(w);
      at(this, { target: b, contentRect: C });
    }
    return E;
  })(),
  _i = (function () {
    function E(b, w, C) {
      if (
        ((this.activeObservations_ = []),
        (this.observations_ = new ot()),
        typeof b != "function")
      )
        throw new TypeError(
          "The callback provided as parameter 1 is not a function."
        );
      (this.callback_ = b), (this.controller_ = w), (this.callbackCtx_ = C);
    }
    return (
      (E.prototype.observe = function (b) {
        if (!arguments.length)
          throw new TypeError("1 argument required, but only 0 present.");
        if (!(typeof Element > "u" || !(Element instanceof Object))) {
          if (!(b instanceof ue(b).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var w = this.observations_;
          w.has(b) ||
            (w.set(b, new ui(b)),
            this.controller_.addObserver(this),
            this.controller_.refresh());
        }
      }),
      (E.prototype.unobserve = function (b) {
        if (!arguments.length)
          throw new TypeError("1 argument required, but only 0 present.");
        if (!(typeof Element > "u" || !(Element instanceof Object))) {
          if (!(b instanceof ue(b).Element))
            throw new TypeError('parameter 1 is not of type "Element".');
          var w = this.observations_;
          w.has(b) &&
            (w.delete(b), w.size || this.controller_.removeObserver(this));
        }
      }),
      (E.prototype.disconnect = function () {
        this.clearActive(),
          this.observations_.clear(),
          this.controller_.removeObserver(this);
      }),
      (E.prototype.gatherActive = function () {
        var b = this;
        this.clearActive(),
          this.observations_.forEach(function (w) {
            w.isActive() && b.activeObservations_.push(w);
          });
      }),
      (E.prototype.broadcastActive = function () {
        if (this.hasActive()) {
          var b = this.callbackCtx_,
            w = this.activeObservations_.map(function (C) {
              return new fi(C.target, C.broadcastRect());
            });
          this.callback_.call(b, w, b), this.clearActive();
        }
      }),
      (E.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
      }),
      (E.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
      }),
      E
    );
  })(),
  lt = typeof WeakMap < "u" ? new WeakMap() : new ot(),
  ct = (function () {
    function E(b) {
      if (!(this instanceof E))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var w = ri.getInstance(),
        C = new _i(b, w, this);
      lt.set(this, C);
    }
    return E;
  })();
["observe", "unobserve", "disconnect"].forEach(function (E) {
  ct.prototype[E] = function () {
    var b;
    return (b = lt.get(this))[E].apply(b, arguments);
  };
});
var vi = (function () {
  return typeof xe.ResizeObserver < "u" ? xe.ResizeObserver : ct;
})();
window.ResizeObserver = vi;
const pi = localStorage.getItem("theme") || "light";
document.documentElement.dataset.theme = pi;
setTimeout(() => (document.documentElement.dataset.status = "loaded"), 150);
function dt() {
  const E = ["en", "ru", "uk"],
    b = localStorage.getItem("language");
  if (b)
    b !== document.documentElement.lang &&
      (E.includes(b)
        ? (location.href = `/${b}/`)
        : (localStorage.removeItem("language"), dt()));
  else {
    const w = navigator.language?.split("-")?.[0];
    let C = "en";
    switch (w) {
      case "ru":
        C = "ru";
        break;
      case "uk":
        C = "uk";
        break;
    }
    document.documentElement.lang !== C &&
      (localStorage.setItem("language", C), (location.href = `/${C}/`));
  }
}
dt();
var ut = { exports: {} };
/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */ (function (E) {
  (function (b, w) {
    E.exports ? (E.exports = w()) : (b.Toastify = w());
  })(mt, function (b) {
    var w = function (L) {
        return new w.lib.init(L);
      },
      C = "1.12.0";
    (w.defaults = {
      oldestFirst: !0,
      text: "Toastify is awesome!",
      node: void 0,
      duration: 3e3,
      selector: void 0,
      callback: function () {},
      destination: void 0,
      newWindow: !1,
      close: !1,
      gravity: "toastify-top",
      positionLeft: !1,
      position: "",
      backgroundColor: "",
      avatar: "",
      className: "",
      stopOnFocus: !0,
      onClick: function () {},
      offset: { x: 0, y: 0 },
      escapeMarkup: !0,
      ariaLive: "polite",
      style: { background: "" },
    }),
      (w.lib = w.prototype =
        {
          toastify: C,
          constructor: w,
          init: function (L) {
            return (
              L || (L = {}),
              (this.options = {}),
              (this.toastElement = null),
              (this.options.text = L.text || w.defaults.text),
              (this.options.node = L.node || w.defaults.node),
              (this.options.duration =
                L.duration === 0 ? 0 : L.duration || w.defaults.duration),
              (this.options.selector = L.selector || w.defaults.selector),
              (this.options.callback = L.callback || w.defaults.callback),
              (this.options.destination =
                L.destination || w.defaults.destination),
              (this.options.newWindow = L.newWindow || w.defaults.newWindow),
              (this.options.close = L.close || w.defaults.close),
              (this.options.gravity =
                L.gravity === "bottom"
                  ? "toastify-bottom"
                  : w.defaults.gravity),
              (this.options.positionLeft =
                L.positionLeft || w.defaults.positionLeft),
              (this.options.position = L.position || w.defaults.position),
              (this.options.backgroundColor =
                L.backgroundColor || w.defaults.backgroundColor),
              (this.options.avatar = L.avatar || w.defaults.avatar),
              (this.options.className = L.className || w.defaults.className),
              (this.options.stopOnFocus =
                L.stopOnFocus === void 0
                  ? w.defaults.stopOnFocus
                  : L.stopOnFocus),
              (this.options.onClick = L.onClick || w.defaults.onClick),
              (this.options.offset = L.offset || w.defaults.offset),
              (this.options.escapeMarkup =
                L.escapeMarkup !== void 0
                  ? L.escapeMarkup
                  : w.defaults.escapeMarkup),
              (this.options.ariaLive = L.ariaLive || w.defaults.ariaLive),
              (this.options.style = L.style || w.defaults.style),
              L.backgroundColor &&
                (this.options.style.background = L.backgroundColor),
              this
            );
          },
          buildToast: function () {
            if (!this.options) throw "Toastify is not initialized";
            var L = document.createElement("div");
            (L.className = "toastify on " + this.options.className),
              this.options.position
                ? (L.className += " toastify-" + this.options.position)
                : this.options.positionLeft === !0
                ? ((L.className += " toastify-left"),
                  console.warn(
                    "Property `positionLeft` will be depreciated in further versions. Please use `position` instead."
                  ))
                : (L.className += " toastify-right"),
              (L.className += " " + this.options.gravity),
              this.options.backgroundColor &&
                console.warn(
                  'DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.'
                );
            for (var r in this.options.style)
              L.style[r] = this.options.style[r];
            if (
              (this.options.ariaLive &&
                L.setAttribute("aria-live", this.options.ariaLive),
              this.options.node &&
                this.options.node.nodeType === Node.ELEMENT_NODE)
            )
              L.appendChild(this.options.node);
            else if (
              (this.options.escapeMarkup
                ? (L.innerText = this.options.text)
                : (L.innerHTML = this.options.text),
              this.options.avatar !== "")
            ) {
              var o = document.createElement("img");
              (o.src = this.options.avatar),
                (o.className = "toastify-avatar"),
                this.options.position == "left" ||
                this.options.positionLeft === !0
                  ? L.appendChild(o)
                  : L.insertAdjacentElement("afterbegin", o);
            }
            if (this.options.close === !0) {
              var h = document.createElement("button");
              (h.type = "button"),
                h.setAttribute("aria-label", "Close"),
                (h.className = "toast-close"),
                (h.innerHTML = "&#10006;"),
                h.addEventListener(
                  "click",
                  function (t) {
                    t.stopPropagation(),
                      this.removeElement(this.toastElement),
                      window.clearTimeout(this.toastElement.timeOutValue);
                  }.bind(this)
                );
              var u = window.innerWidth > 0 ? window.innerWidth : screen.width;
              (this.options.position == "left" ||
                this.options.positionLeft === !0) &&
              u > 360
                ? L.insertAdjacentElement("afterbegin", h)
                : L.appendChild(h);
            }
            if (this.options.stopOnFocus && this.options.duration > 0) {
              var n = this;
              L.addEventListener("mouseover", function (t) {
                window.clearTimeout(L.timeOutValue);
              }),
                L.addEventListener("mouseleave", function () {
                  L.timeOutValue = window.setTimeout(function () {
                    n.removeElement(L);
                  }, n.options.duration);
                });
            }
            if (
              (typeof this.options.destination < "u" &&
                L.addEventListener(
                  "click",
                  function (t) {
                    t.stopPropagation(),
                      this.options.newWindow === !0
                        ? window.open(this.options.destination, "_blank")
                        : (window.location = this.options.destination);
                  }.bind(this)
                ),
              typeof this.options.onClick == "function" &&
                typeof this.options.destination > "u" &&
                L.addEventListener(
                  "click",
                  function (t) {
                    t.stopPropagation(), this.options.onClick();
                  }.bind(this)
                ),
              typeof this.options.offset == "object")
            ) {
              var d = B("x", this.options),
                f = B("y", this.options),
                p = this.options.position == "left" ? d : "-" + d,
                l = this.options.gravity == "toastify-top" ? f : "-" + f;
              L.style.transform = "translate(" + p + "," + l + ")";
            }
            return L;
          },
          showToast: function () {
            this.toastElement = this.buildToast();
            var L;
            if (
              (typeof this.options.selector == "string"
                ? (L = document.getElementById(this.options.selector))
                : this.options.selector instanceof HTMLElement ||
                  (typeof ShadowRoot < "u" &&
                    this.options.selector instanceof ShadowRoot)
                ? (L = this.options.selector)
                : (L = document.body),
              !L)
            )
              throw "Root element is not defined";
            var r = w.defaults.oldestFirst ? L.firstChild : L.lastChild;
            return (
              L.insertBefore(this.toastElement, r),
              w.reposition(),
              this.options.duration > 0 &&
                (this.toastElement.timeOutValue = window.setTimeout(
                  function () {
                    this.removeElement(this.toastElement);
                  }.bind(this),
                  this.options.duration
                )),
              this
            );
          },
          hideToast: function () {
            this.toastElement.timeOutValue &&
              clearTimeout(this.toastElement.timeOutValue),
              this.removeElement(this.toastElement);
          },
          removeElement: function (L) {
            (L.className = L.className.replace(" on", "")),
              window.setTimeout(
                function () {
                  this.options.node &&
                    this.options.node.parentNode &&
                    this.options.node.parentNode.removeChild(this.options.node),
                    L.parentNode && L.parentNode.removeChild(L),
                    this.options.callback.call(L),
                    w.reposition();
                }.bind(this),
                400
              );
          },
        }),
      (w.reposition = function () {
        for (
          var L = { top: 15, bottom: 15 },
            r = { top: 15, bottom: 15 },
            o = { top: 15, bottom: 15 },
            h = document.getElementsByClassName("toastify"),
            u,
            n = 0;
          n < h.length;
          n++
        ) {
          H(h[n], "toastify-top") === !0
            ? (u = "toastify-top")
            : (u = "toastify-bottom");
          var d = h[n].offsetHeight;
          u = u.substr(9, u.length - 1);
          var f = 15,
            p = window.innerWidth > 0 ? window.innerWidth : screen.width;
          p <= 360
            ? ((h[n].style[u] = o[u] + "px"), (o[u] += d + f))
            : H(h[n], "toastify-left") === !0
            ? ((h[n].style[u] = L[u] + "px"), (L[u] += d + f))
            : ((h[n].style[u] = r[u] + "px"), (r[u] += d + f));
        }
        return this;
      });
    function B(L, r) {
      return r.offset[L]
        ? isNaN(r.offset[L])
          ? r.offset[L]
          : r.offset[L] + "px"
        : "0px";
    }
    function H(L, r) {
      return !L || typeof r != "string"
        ? !1
        : !!(L.className && L.className.trim().split(/\s+/gi).indexOf(r) > -1);
    }
    return (w.lib.init.prototype = w.lib), w;
  });
})(ut);
var gi = ut.exports;
const mi = Ye(gi);
var ft = { exports: {} };
(function (E, b) {
  (function (w, C) {
    E.exports = C();
  })(globalThis, () =>
    (() => {
      var w = {
          4567: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (e, s, a, v) {
                  var _,
                    g = arguments.length,
                    c =
                      g < 3
                        ? s
                        : v === null
                        ? (v = Object.getOwnPropertyDescriptor(s, a))
                        : v;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    c = Reflect.decorate(e, s, a, v);
                  else
                    for (var m = e.length - 1; m >= 0; m--)
                      (_ = e[m]) &&
                        (c =
                          (g < 3 ? _(c) : g > 3 ? _(s, a, c) : _(s, a)) || c);
                  return g > 3 && c && Object.defineProperty(s, a, c), c;
                },
              u =
                (this && this.__param) ||
                function (e, s) {
                  return function (a, v) {
                    s(a, v, e);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.AccessibilityManager = void 0);
            const n = o(9042),
              d = o(9924),
              f = o(844),
              p = o(4725),
              l = o(2585),
              t = o(3656);
            let i = (r.AccessibilityManager = class extends f.Disposable {
              constructor(e, s, a, v) {
                super(),
                  (this._terminal = e),
                  (this._coreBrowserService = a),
                  (this._renderService = v),
                  (this._rowColumns = new WeakMap()),
                  (this._liveRegionLineCount = 0),
                  (this._charsToConsume = []),
                  (this._charsToAnnounce = ""),
                  (this._accessibilityContainer =
                    this._coreBrowserService.mainDocument.createElement("div")),
                  this._accessibilityContainer.classList.add(
                    "xterm-accessibility"
                  ),
                  (this._rowContainer =
                    this._coreBrowserService.mainDocument.createElement("div")),
                  this._rowContainer.setAttribute("role", "list"),
                  this._rowContainer.classList.add("xterm-accessibility-tree"),
                  (this._rowElements = []);
                for (let _ = 0; _ < this._terminal.rows; _++)
                  (this._rowElements[_] = this._createAccessibilityTreeNode()),
                    this._rowContainer.appendChild(this._rowElements[_]);
                if (
                  ((this._topBoundaryFocusListener = (_) =>
                    this._handleBoundaryFocus(_, 0)),
                  (this._bottomBoundaryFocusListener = (_) =>
                    this._handleBoundaryFocus(_, 1)),
                  this._rowElements[0].addEventListener(
                    "focus",
                    this._topBoundaryFocusListener
                  ),
                  this._rowElements[
                    this._rowElements.length - 1
                  ].addEventListener(
                    "focus",
                    this._bottomBoundaryFocusListener
                  ),
                  this._refreshRowsDimensions(),
                  this._accessibilityContainer.appendChild(this._rowContainer),
                  (this._liveRegion =
                    this._coreBrowserService.mainDocument.createElement("div")),
                  this._liveRegion.classList.add("live-region"),
                  this._liveRegion.setAttribute("aria-live", "assertive"),
                  this._accessibilityContainer.appendChild(this._liveRegion),
                  (this._liveRegionDebouncer = this.register(
                    new d.TimeBasedDebouncer(this._renderRows.bind(this))
                  )),
                  !this._terminal.element)
                )
                  throw new Error(
                    "Cannot enable accessibility before Terminal.open"
                  );
                this._terminal.element.insertAdjacentElement(
                  "afterbegin",
                  this._accessibilityContainer
                ),
                  this.register(
                    this._terminal.onResize((_) => this._handleResize(_.rows))
                  ),
                  this.register(
                    this._terminal.onRender((_) =>
                      this._refreshRows(_.start, _.end)
                    )
                  ),
                  this.register(
                    this._terminal.onScroll(() => this._refreshRows())
                  ),
                  this.register(
                    this._terminal.onA11yChar((_) => this._handleChar(_))
                  ),
                  this.register(
                    this._terminal.onLineFeed(() =>
                      this._handleChar(`
`)
                    )
                  ),
                  this.register(
                    this._terminal.onA11yTab((_) => this._handleTab(_))
                  ),
                  this.register(
                    this._terminal.onKey((_) => this._handleKey(_.key))
                  ),
                  this.register(
                    this._terminal.onBlur(() => this._clearLiveRegion())
                  ),
                  this.register(
                    this._renderService.onDimensionsChange(() =>
                      this._refreshRowsDimensions()
                    )
                  ),
                  this.register(
                    (0, t.addDisposableDomListener)(
                      document,
                      "selectionchange",
                      () => this._handleSelectionChange()
                    )
                  ),
                  this.register(
                    this._coreBrowserService.onDprChange(() =>
                      this._refreshRowsDimensions()
                    )
                  ),
                  this._refreshRows(),
                  this.register(
                    (0, f.toDisposable)(() => {
                      this._accessibilityContainer.remove(),
                        (this._rowElements.length = 0);
                    })
                  );
              }
              _handleTab(e) {
                for (let s = 0; s < e; s++) this._handleChar(" ");
              }
              _handleChar(e) {
                this._liveRegionLineCount < 21 &&
                  (this._charsToConsume.length > 0
                    ? this._charsToConsume.shift() !== e &&
                      (this._charsToAnnounce += e)
                    : (this._charsToAnnounce += e),
                  e ===
                    `
` &&
                    (this._liveRegionLineCount++,
                    this._liveRegionLineCount === 21 &&
                      (this._liveRegion.textContent += n.tooMuchOutput)));
              }
              _clearLiveRegion() {
                (this._liveRegion.textContent = ""),
                  (this._liveRegionLineCount = 0);
              }
              _handleKey(e) {
                this._clearLiveRegion(),
                  /\p{Control}/u.test(e) || this._charsToConsume.push(e);
              }
              _refreshRows(e, s) {
                this._liveRegionDebouncer.refresh(e, s, this._terminal.rows);
              }
              _renderRows(e, s) {
                const a = this._terminal.buffer,
                  v = a.lines.length.toString();
                for (let _ = e; _ <= s; _++) {
                  const g = a.lines.get(a.ydisp + _),
                    c = [],
                    m = g?.translateToString(!0, void 0, void 0, c) || "",
                    R = (a.ydisp + _ + 1).toString(),
                    A = this._rowElements[_];
                  A &&
                    (m.length === 0
                      ? ((A.innerText = " "), this._rowColumns.set(A, [0, 1]))
                      : ((A.textContent = m), this._rowColumns.set(A, c)),
                    A.setAttribute("aria-posinset", R),
                    A.setAttribute("aria-setsize", v));
                }
                this._announceCharacters();
              }
              _announceCharacters() {
                this._charsToAnnounce.length !== 0 &&
                  ((this._liveRegion.textContent += this._charsToAnnounce),
                  (this._charsToAnnounce = ""));
              }
              _handleBoundaryFocus(e, s) {
                const a = e.target,
                  v =
                    this._rowElements[
                      s === 0 ? 1 : this._rowElements.length - 2
                    ];
                if (
                  a.getAttribute("aria-posinset") ===
                    (s === 0 ? "1" : `${this._terminal.buffer.lines.length}`) ||
                  e.relatedTarget !== v
                )
                  return;
                let _, g;
                if (
                  (s === 0
                    ? ((_ = a),
                      (g = this._rowElements.pop()),
                      this._rowContainer.removeChild(g))
                    : ((_ = this._rowElements.shift()),
                      (g = a),
                      this._rowContainer.removeChild(_)),
                  _.removeEventListener(
                    "focus",
                    this._topBoundaryFocusListener
                  ),
                  g.removeEventListener(
                    "focus",
                    this._bottomBoundaryFocusListener
                  ),
                  s === 0)
                ) {
                  const c = this._createAccessibilityTreeNode();
                  this._rowElements.unshift(c),
                    this._rowContainer.insertAdjacentElement("afterbegin", c);
                } else {
                  const c = this._createAccessibilityTreeNode();
                  this._rowElements.push(c), this._rowContainer.appendChild(c);
                }
                this._rowElements[0].addEventListener(
                  "focus",
                  this._topBoundaryFocusListener
                ),
                  this._rowElements[
                    this._rowElements.length - 1
                  ].addEventListener(
                    "focus",
                    this._bottomBoundaryFocusListener
                  ),
                  this._terminal.scrollLines(s === 0 ? -1 : 1),
                  this._rowElements[
                    s === 0 ? 1 : this._rowElements.length - 2
                  ].focus(),
                  e.preventDefault(),
                  e.stopImmediatePropagation();
              }
              _handleSelectionChange() {
                if (this._rowElements.length === 0) return;
                const e = document.getSelection();
                if (!e) return;
                if (e.isCollapsed)
                  return void (
                    this._rowContainer.contains(e.anchorNode) &&
                    this._terminal.clearSelection()
                  );
                if (!e.anchorNode || !e.focusNode)
                  return void console.error(
                    "anchorNode and/or focusNode are null"
                  );
                let s = { node: e.anchorNode, offset: e.anchorOffset },
                  a = { node: e.focusNode, offset: e.focusOffset };
                if (
                  ((s.node.compareDocumentPosition(a.node) &
                    Node.DOCUMENT_POSITION_PRECEDING ||
                    (s.node === a.node && s.offset > a.offset)) &&
                    ([s, a] = [a, s]),
                  s.node.compareDocumentPosition(this._rowElements[0]) &
                    (Node.DOCUMENT_POSITION_CONTAINED_BY |
                      Node.DOCUMENT_POSITION_FOLLOWING) &&
                    (s = {
                      node: this._rowElements[0].childNodes[0],
                      offset: 0,
                    }),
                  !this._rowContainer.contains(s.node))
                )
                  return;
                const v = this._rowElements.slice(-1)[0];
                if (
                  (a.node.compareDocumentPosition(v) &
                    (Node.DOCUMENT_POSITION_CONTAINED_BY |
                      Node.DOCUMENT_POSITION_PRECEDING) &&
                    (a = { node: v, offset: v.textContent?.length ?? 0 }),
                  !this._rowContainer.contains(a.node))
                )
                  return;
                const _ = ({ node: m, offset: R }) => {
                    const A = m instanceof Text ? m.parentNode : m;
                    let T = parseInt(A?.getAttribute("aria-posinset"), 10) - 1;
                    if (isNaN(T))
                      return (
                        console.warn("row is invalid. Race condition?"), null
                      );
                    const k = this._rowColumns.get(A);
                    if (!k)
                      return (
                        console.warn("columns is null. Race condition?"), null
                      );
                    let P = R < k.length ? k[R] : k.slice(-1)[0] + 1;
                    return (
                      P >= this._terminal.cols && (++T, (P = 0)),
                      { row: T, column: P }
                    );
                  },
                  g = _(s),
                  c = _(a);
                if (g && c) {
                  if (
                    g.row > c.row ||
                    (g.row === c.row && g.column >= c.column)
                  )
                    throw new Error("invalid range");
                  this._terminal.select(
                    g.column,
                    g.row,
                    (c.row - g.row) * this._terminal.cols - g.column + c.column
                  );
                }
              }
              _handleResize(e) {
                this._rowElements[
                  this._rowElements.length - 1
                ].removeEventListener(
                  "focus",
                  this._bottomBoundaryFocusListener
                );
                for (
                  let s = this._rowContainer.children.length;
                  s < this._terminal.rows;
                  s++
                )
                  (this._rowElements[s] = this._createAccessibilityTreeNode()),
                    this._rowContainer.appendChild(this._rowElements[s]);
                for (; this._rowElements.length > e; )
                  this._rowContainer.removeChild(this._rowElements.pop());
                this._rowElements[
                  this._rowElements.length - 1
                ].addEventListener("focus", this._bottomBoundaryFocusListener),
                  this._refreshRowsDimensions();
              }
              _createAccessibilityTreeNode() {
                const e =
                  this._coreBrowserService.mainDocument.createElement("div");
                return (
                  e.setAttribute("role", "listitem"),
                  (e.tabIndex = -1),
                  this._refreshRowDimensions(e),
                  e
                );
              }
              _refreshRowsDimensions() {
                if (this._renderService.dimensions.css.cell.height) {
                  (this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`),
                    this._rowElements.length !== this._terminal.rows &&
                      this._handleResize(this._terminal.rows);
                  for (let e = 0; e < this._terminal.rows; e++)
                    this._refreshRowDimensions(this._rowElements[e]);
                }
              }
              _refreshRowDimensions(e) {
                e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
              }
            });
            r.AccessibilityManager = i = h(
              [
                u(1, l.IInstantiationService),
                u(2, p.ICoreBrowserService),
                u(3, p.IRenderService),
              ],
              i
            );
          },
          3614: (L, r) => {
            function o(d) {
              return d.replace(/\r?\n/g, "\r");
            }
            function h(d, f) {
              return f ? "\x1B[200~" + d + "\x1B[201~" : d;
            }
            function u(d, f, p, l) {
              (d = h(
                (d = o(d)),
                p.decPrivateModes.bracketedPasteMode &&
                  l.rawOptions.ignoreBracketedPasteMode !== !0
              )),
                p.triggerDataEvent(d, !0),
                (f.value = "");
            }
            function n(d, f, p) {
              const l = p.getBoundingClientRect(),
                t = d.clientX - l.left - 10,
                i = d.clientY - l.top - 10;
              (f.style.width = "20px"),
                (f.style.height = "20px"),
                (f.style.left = `${t}px`),
                (f.style.top = `${i}px`),
                (f.style.zIndex = "1000"),
                f.focus();
            }
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.rightClickHandler =
                r.moveTextAreaUnderMouseCursor =
                r.paste =
                r.handlePasteEvent =
                r.copyHandler =
                r.bracketTextForPaste =
                r.prepareTextForTerminal =
                  void 0),
              (r.prepareTextForTerminal = o),
              (r.bracketTextForPaste = h),
              (r.copyHandler = function (d, f) {
                d.clipboardData &&
                  d.clipboardData.setData("text/plain", f.selectionText),
                  d.preventDefault();
              }),
              (r.handlePasteEvent = function (d, f, p, l) {
                d.stopPropagation(),
                  d.clipboardData &&
                    u(d.clipboardData.getData("text/plain"), f, p, l);
              }),
              (r.paste = u),
              (r.moveTextAreaUnderMouseCursor = n),
              (r.rightClickHandler = function (d, f, p, l, t) {
                n(d, f, p),
                  t && l.rightClickSelect(d),
                  (f.value = l.selectionText),
                  f.select();
              });
          },
          7239: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.ColorContrastCache = void 0);
            const h = o(1505);
            r.ColorContrastCache = class {
              constructor() {
                (this._color = new h.TwoKeyMap()),
                  (this._css = new h.TwoKeyMap());
              }
              setCss(u, n, d) {
                this._css.set(u, n, d);
              }
              getCss(u, n) {
                return this._css.get(u, n);
              }
              setColor(u, n, d) {
                this._color.set(u, n, d);
              }
              getColor(u, n) {
                return this._color.get(u, n);
              }
              clear() {
                this._color.clear(), this._css.clear();
              }
            };
          },
          3656: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.addDisposableDomListener = void 0),
              (r.addDisposableDomListener = function (o, h, u, n) {
                o.addEventListener(h, u, n);
                let d = !1;
                return {
                  dispose: () => {
                    d || ((d = !0), o.removeEventListener(h, u, n));
                  },
                };
              });
          },
          3551: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (i, e, s, a) {
                  var v,
                    _ = arguments.length,
                    g =
                      _ < 3
                        ? e
                        : a === null
                        ? (a = Object.getOwnPropertyDescriptor(e, s))
                        : a;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    g = Reflect.decorate(i, e, s, a);
                  else
                    for (var c = i.length - 1; c >= 0; c--)
                      (v = i[c]) &&
                        (g =
                          (_ < 3 ? v(g) : _ > 3 ? v(e, s, g) : v(e, s)) || g);
                  return _ > 3 && g && Object.defineProperty(e, s, g), g;
                },
              u =
                (this && this.__param) ||
                function (i, e) {
                  return function (s, a) {
                    e(s, a, i);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Linkifier = void 0);
            const n = o(3656),
              d = o(8460),
              f = o(844),
              p = o(2585),
              l = o(4725);
            let t = (r.Linkifier = class extends f.Disposable {
              get currentLink() {
                return this._currentLink;
              }
              constructor(i, e, s, a, v) {
                super(),
                  (this._element = i),
                  (this._mouseService = e),
                  (this._renderService = s),
                  (this._bufferService = a),
                  (this._linkProviderService = v),
                  (this._linkCacheDisposables = []),
                  (this._isMouseOut = !0),
                  (this._wasResized = !1),
                  (this._activeLine = -1),
                  (this._onShowLinkUnderline = this.register(
                    new d.EventEmitter()
                  )),
                  (this.onShowLinkUnderline = this._onShowLinkUnderline.event),
                  (this._onHideLinkUnderline = this.register(
                    new d.EventEmitter()
                  )),
                  (this.onHideLinkUnderline = this._onHideLinkUnderline.event),
                  this.register(
                    (0, f.getDisposeArrayDisposable)(this._linkCacheDisposables)
                  ),
                  this.register(
                    (0, f.toDisposable)(() => {
                      (this._lastMouseEvent = void 0),
                        this._activeProviderReplies?.clear();
                    })
                  ),
                  this.register(
                    this._bufferService.onResize(() => {
                      this._clearCurrentLink(), (this._wasResized = !0);
                    })
                  ),
                  this.register(
                    (0, n.addDisposableDomListener)(
                      this._element,
                      "mouseleave",
                      () => {
                        (this._isMouseOut = !0), this._clearCurrentLink();
                      }
                    )
                  ),
                  this.register(
                    (0, n.addDisposableDomListener)(
                      this._element,
                      "mousemove",
                      this._handleMouseMove.bind(this)
                    )
                  ),
                  this.register(
                    (0, n.addDisposableDomListener)(
                      this._element,
                      "mousedown",
                      this._handleMouseDown.bind(this)
                    )
                  ),
                  this.register(
                    (0, n.addDisposableDomListener)(
                      this._element,
                      "mouseup",
                      this._handleMouseUp.bind(this)
                    )
                  );
              }
              _handleMouseMove(i) {
                this._lastMouseEvent = i;
                const e = this._positionFromMouseEvent(
                  i,
                  this._element,
                  this._mouseService
                );
                if (!e) return;
                this._isMouseOut = !1;
                const s = i.composedPath();
                for (let a = 0; a < s.length; a++) {
                  const v = s[a];
                  if (v.classList.contains("xterm")) break;
                  if (v.classList.contains("xterm-hover")) return;
                }
                (this._lastBufferCell &&
                  e.x === this._lastBufferCell.x &&
                  e.y === this._lastBufferCell.y) ||
                  (this._handleHover(e), (this._lastBufferCell = e));
              }
              _handleHover(i) {
                if (this._activeLine !== i.y || this._wasResized)
                  return (
                    this._clearCurrentLink(),
                    this._askForLink(i, !1),
                    void (this._wasResized = !1)
                  );
                (this._currentLink &&
                  this._linkAtPosition(this._currentLink.link, i)) ||
                  (this._clearCurrentLink(), this._askForLink(i, !0));
              }
              _askForLink(i, e) {
                (this._activeProviderReplies && e) ||
                  (this._activeProviderReplies?.forEach((a) => {
                    a?.forEach((v) => {
                      v.link.dispose && v.link.dispose();
                    });
                  }),
                  (this._activeProviderReplies = new Map()),
                  (this._activeLine = i.y));
                let s = !1;
                for (const [
                  a,
                  v,
                ] of this._linkProviderService.linkProviders.entries())
                  e
                    ? this._activeProviderReplies?.get(a) &&
                      (s = this._checkLinkProviderResult(a, i, s))
                    : v.provideLinks(i.y, (_) => {
                        if (this._isMouseOut) return;
                        const g = _?.map((c) => ({ link: c }));
                        this._activeProviderReplies?.set(a, g),
                          (s = this._checkLinkProviderResult(a, i, s)),
                          this._activeProviderReplies?.size ===
                            this._linkProviderService.linkProviders.length &&
                            this._removeIntersectingLinks(
                              i.y,
                              this._activeProviderReplies
                            );
                      });
              }
              _removeIntersectingLinks(i, e) {
                const s = new Set();
                for (let a = 0; a < e.size; a++) {
                  const v = e.get(a);
                  if (v)
                    for (let _ = 0; _ < v.length; _++) {
                      const g = v[_],
                        c = g.link.range.start.y < i ? 0 : g.link.range.start.x,
                        m =
                          g.link.range.end.y > i
                            ? this._bufferService.cols
                            : g.link.range.end.x;
                      for (let R = c; R <= m; R++) {
                        if (s.has(R)) {
                          v.splice(_--, 1);
                          break;
                        }
                        s.add(R);
                      }
                    }
                }
              }
              _checkLinkProviderResult(i, e, s) {
                if (!this._activeProviderReplies) return s;
                const a = this._activeProviderReplies.get(i);
                let v = !1;
                for (let _ = 0; _ < i; _++)
                  (this._activeProviderReplies.has(_) &&
                    !this._activeProviderReplies.get(_)) ||
                    (v = !0);
                if (!v && a) {
                  const _ = a.find((g) => this._linkAtPosition(g.link, e));
                  _ && ((s = !0), this._handleNewLink(_));
                }
                if (
                  this._activeProviderReplies.size ===
                    this._linkProviderService.linkProviders.length &&
                  !s
                )
                  for (let _ = 0; _ < this._activeProviderReplies.size; _++) {
                    const g = this._activeProviderReplies
                      .get(_)
                      ?.find((c) => this._linkAtPosition(c.link, e));
                    if (g) {
                      (s = !0), this._handleNewLink(g);
                      break;
                    }
                  }
                return s;
              }
              _handleMouseDown() {
                this._mouseDownLink = this._currentLink;
              }
              _handleMouseUp(i) {
                if (!this._currentLink) return;
                const e = this._positionFromMouseEvent(
                  i,
                  this._element,
                  this._mouseService
                );
                e &&
                  this._mouseDownLink === this._currentLink &&
                  this._linkAtPosition(this._currentLink.link, e) &&
                  this._currentLink.link.activate(
                    i,
                    this._currentLink.link.text
                  );
              }
              _clearCurrentLink(i, e) {
                this._currentLink &&
                  this._lastMouseEvent &&
                  (!i ||
                    !e ||
                    (this._currentLink.link.range.start.y >= i &&
                      this._currentLink.link.range.end.y <= e)) &&
                  (this._linkLeave(
                    this._element,
                    this._currentLink.link,
                    this._lastMouseEvent
                  ),
                  (this._currentLink = void 0),
                  (0, f.disposeArray)(this._linkCacheDisposables));
              }
              _handleNewLink(i) {
                if (!this._lastMouseEvent) return;
                const e = this._positionFromMouseEvent(
                  this._lastMouseEvent,
                  this._element,
                  this._mouseService
                );
                e &&
                  this._linkAtPosition(i.link, e) &&
                  ((this._currentLink = i),
                  (this._currentLink.state = {
                    decorations: {
                      underline:
                        i.link.decorations === void 0 ||
                        i.link.decorations.underline,
                      pointerCursor:
                        i.link.decorations === void 0 ||
                        i.link.decorations.pointerCursor,
                    },
                    isHovered: !0,
                  }),
                  this._linkHover(this._element, i.link, this._lastMouseEvent),
                  (i.link.decorations = {}),
                  Object.defineProperties(i.link.decorations, {
                    pointerCursor: {
                      get: () =>
                        this._currentLink?.state?.decorations.pointerCursor,
                      set: (s) => {
                        this._currentLink?.state &&
                          this._currentLink.state.decorations.pointerCursor !==
                            s &&
                          ((this._currentLink.state.decorations.pointerCursor =
                            s),
                          this._currentLink.state.isHovered &&
                            this._element.classList.toggle(
                              "xterm-cursor-pointer",
                              s
                            ));
                      },
                    },
                    underline: {
                      get: () =>
                        this._currentLink?.state?.decorations.underline,
                      set: (s) => {
                        this._currentLink?.state &&
                          this._currentLink?.state?.decorations.underline !==
                            s &&
                          ((this._currentLink.state.decorations.underline = s),
                          this._currentLink.state.isHovered &&
                            this._fireUnderlineEvent(i.link, s));
                      },
                    },
                  }),
                  this._linkCacheDisposables.push(
                    this._renderService.onRenderedViewportChange((s) => {
                      if (!this._currentLink) return;
                      const a =
                          s.start === 0
                            ? 0
                            : s.start + 1 + this._bufferService.buffer.ydisp,
                        v = this._bufferService.buffer.ydisp + 1 + s.end;
                      if (
                        this._currentLink.link.range.start.y >= a &&
                        this._currentLink.link.range.end.y <= v &&
                        (this._clearCurrentLink(a, v), this._lastMouseEvent)
                      ) {
                        const _ = this._positionFromMouseEvent(
                          this._lastMouseEvent,
                          this._element,
                          this._mouseService
                        );
                        _ && this._askForLink(_, !1);
                      }
                    })
                  ));
              }
              _linkHover(i, e, s) {
                this._currentLink?.state &&
                  ((this._currentLink.state.isHovered = !0),
                  this._currentLink.state.decorations.underline &&
                    this._fireUnderlineEvent(e, !0),
                  this._currentLink.state.decorations.pointerCursor &&
                    i.classList.add("xterm-cursor-pointer")),
                  e.hover && e.hover(s, e.text);
              }
              _fireUnderlineEvent(i, e) {
                const s = i.range,
                  a = this._bufferService.buffer.ydisp,
                  v = this._createLinkUnderlineEvent(
                    s.start.x - 1,
                    s.start.y - a - 1,
                    s.end.x,
                    s.end.y - a - 1,
                    void 0
                  );
                (e
                  ? this._onShowLinkUnderline
                  : this._onHideLinkUnderline
                ).fire(v);
              }
              _linkLeave(i, e, s) {
                this._currentLink?.state &&
                  ((this._currentLink.state.isHovered = !1),
                  this._currentLink.state.decorations.underline &&
                    this._fireUnderlineEvent(e, !1),
                  this._currentLink.state.decorations.pointerCursor &&
                    i.classList.remove("xterm-cursor-pointer")),
                  e.leave && e.leave(s, e.text);
              }
              _linkAtPosition(i, e) {
                const s =
                    i.range.start.y * this._bufferService.cols +
                    i.range.start.x,
                  a = i.range.end.y * this._bufferService.cols + i.range.end.x,
                  v = e.y * this._bufferService.cols + e.x;
                return s <= v && v <= a;
              }
              _positionFromMouseEvent(i, e, s) {
                const a = s.getCoords(
                  i,
                  e,
                  this._bufferService.cols,
                  this._bufferService.rows
                );
                if (a)
                  return {
                    x: a[0],
                    y: a[1] + this._bufferService.buffer.ydisp,
                  };
              }
              _createLinkUnderlineEvent(i, e, s, a, v) {
                return {
                  x1: i,
                  y1: e,
                  x2: s,
                  y2: a,
                  cols: this._bufferService.cols,
                  fg: v,
                };
              }
            });
            r.Linkifier = t = h(
              [
                u(1, l.IMouseService),
                u(2, l.IRenderService),
                u(3, p.IBufferService),
                u(4, l.ILinkProviderService),
              ],
              t
            );
          },
          9042: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.tooMuchOutput = r.promptLabel = void 0),
              (r.promptLabel = "Terminal input"),
              (r.tooMuchOutput =
                "Too much output to announce, navigate to rows manually to read");
          },
          3730: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (l, t, i, e) {
                  var s,
                    a = arguments.length,
                    v =
                      a < 3
                        ? t
                        : e === null
                        ? (e = Object.getOwnPropertyDescriptor(t, i))
                        : e;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    v = Reflect.decorate(l, t, i, e);
                  else
                    for (var _ = l.length - 1; _ >= 0; _--)
                      (s = l[_]) &&
                        (v =
                          (a < 3 ? s(v) : a > 3 ? s(t, i, v) : s(t, i)) || v);
                  return a > 3 && v && Object.defineProperty(t, i, v), v;
                },
              u =
                (this && this.__param) ||
                function (l, t) {
                  return function (i, e) {
                    t(i, e, l);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.OscLinkProvider = void 0);
            const n = o(511),
              d = o(2585);
            let f = (r.OscLinkProvider = class {
              constructor(l, t, i) {
                (this._bufferService = l),
                  (this._optionsService = t),
                  (this._oscLinkService = i);
              }
              provideLinks(l, t) {
                const i = this._bufferService.buffer.lines.get(l - 1);
                if (!i) return void t(void 0);
                const e = [],
                  s = this._optionsService.rawOptions.linkHandler,
                  a = new n.CellData(),
                  v = i.getTrimmedLength();
                let _ = -1,
                  g = -1,
                  c = !1;
                for (let m = 0; m < v; m++)
                  if (g !== -1 || i.hasContent(m)) {
                    if (
                      (i.loadCell(m, a),
                      a.hasExtendedAttrs() && a.extended.urlId)
                    ) {
                      if (g === -1) {
                        (g = m), (_ = a.extended.urlId);
                        continue;
                      }
                      c = a.extended.urlId !== _;
                    } else g !== -1 && (c = !0);
                    if (c || (g !== -1 && m === v - 1)) {
                      const R = this._oscLinkService.getLinkData(_)?.uri;
                      if (R) {
                        const A = {
                          start: { x: g + 1, y: l },
                          end: { x: m + (c || m !== v - 1 ? 0 : 1), y: l },
                        };
                        let T = !1;
                        if (!s?.allowNonHttpProtocols)
                          try {
                            const k = new URL(R);
                            ["http:", "https:"].includes(k.protocol) ||
                              (T = !0);
                          } catch {
                            T = !0;
                          }
                        T ||
                          e.push({
                            text: R,
                            range: A,
                            activate: (k, P) =>
                              s ? s.activate(k, P, A) : p(0, P),
                            hover: (k, P) => s?.hover?.(k, P, A),
                            leave: (k, P) => s?.leave?.(k, P, A),
                          });
                      }
                      (c = !1),
                        a.hasExtendedAttrs() && a.extended.urlId
                          ? ((g = m), (_ = a.extended.urlId))
                          : ((g = -1), (_ = -1));
                    }
                  }
                t(e);
              }
            });
            function p(l, t) {
              if (
                confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)
              ) {
                const i = window.open();
                if (i) {
                  try {
                    i.opener = null;
                  } catch {}
                  i.location.href = t;
                } else
                  console.warn(
                    "Opening link blocked as opener could not be cleared"
                  );
              }
            }
            r.OscLinkProvider = f = h(
              [
                u(0, d.IBufferService),
                u(1, d.IOptionsService),
                u(2, d.IOscLinkService),
              ],
              f
            );
          },
          6193: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.RenderDebouncer = void 0),
              (r.RenderDebouncer = class {
                constructor(o, h) {
                  (this._renderCallback = o),
                    (this._coreBrowserService = h),
                    (this._refreshCallbacks = []);
                }
                dispose() {
                  this._animationFrame &&
                    (this._coreBrowserService.window.cancelAnimationFrame(
                      this._animationFrame
                    ),
                    (this._animationFrame = void 0));
                }
                addRefreshCallback(o) {
                  return (
                    this._refreshCallbacks.push(o),
                    this._animationFrame ||
                      (this._animationFrame =
                        this._coreBrowserService.window.requestAnimationFrame(
                          () => this._innerRefresh()
                        )),
                    this._animationFrame
                  );
                }
                refresh(o, h, u) {
                  (this._rowCount = u),
                    (o = o !== void 0 ? o : 0),
                    (h = h !== void 0 ? h : this._rowCount - 1),
                    (this._rowStart =
                      this._rowStart !== void 0
                        ? Math.min(this._rowStart, o)
                        : o),
                    (this._rowEnd =
                      this._rowEnd !== void 0 ? Math.max(this._rowEnd, h) : h),
                    this._animationFrame ||
                      (this._animationFrame =
                        this._coreBrowserService.window.requestAnimationFrame(
                          () => this._innerRefresh()
                        ));
                }
                _innerRefresh() {
                  if (
                    ((this._animationFrame = void 0),
                    this._rowStart === void 0 ||
                      this._rowEnd === void 0 ||
                      this._rowCount === void 0)
                  )
                    return void this._runRefreshCallbacks();
                  const o = Math.max(this._rowStart, 0),
                    h = Math.min(this._rowEnd, this._rowCount - 1);
                  (this._rowStart = void 0),
                    (this._rowEnd = void 0),
                    this._renderCallback(o, h),
                    this._runRefreshCallbacks();
                }
                _runRefreshCallbacks() {
                  for (const o of this._refreshCallbacks) o(0);
                  this._refreshCallbacks = [];
                }
              });
          },
          3236: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Terminal = void 0);
            const h = o(3614),
              u = o(3656),
              n = o(3551),
              d = o(9042),
              f = o(3730),
              p = o(1680),
              l = o(3107),
              t = o(5744),
              i = o(2950),
              e = o(1296),
              s = o(428),
              a = o(4269),
              v = o(5114),
              _ = o(8934),
              g = o(3230),
              c = o(9312),
              m = o(4725),
              R = o(6731),
              A = o(8055),
              T = o(8969),
              k = o(8460),
              P = o(844),
              F = o(6114),
              U = o(8437),
              K = o(2584),
              z = o(7399),
              S = o(5941),
              x = o(9074),
              D = o(2585),
              O = o(5435),
              W = o(4567),
              $ = o(779);
            class V extends T.CoreTerminal {
              get onFocus() {
                return this._onFocus.event;
              }
              get onBlur() {
                return this._onBlur.event;
              }
              get onA11yChar() {
                return this._onA11yCharEmitter.event;
              }
              get onA11yTab() {
                return this._onA11yTabEmitter.event;
              }
              get onWillOpen() {
                return this._onWillOpen.event;
              }
              constructor(M = {}) {
                super(M),
                  (this.browser = F),
                  (this._keyDownHandled = !1),
                  (this._keyDownSeen = !1),
                  (this._keyPressHandled = !1),
                  (this._unprocessedDeadKey = !1),
                  (this._accessibilityManager = this.register(
                    new P.MutableDisposable()
                  )),
                  (this._onCursorMove = this.register(new k.EventEmitter())),
                  (this.onCursorMove = this._onCursorMove.event),
                  (this._onKey = this.register(new k.EventEmitter())),
                  (this.onKey = this._onKey.event),
                  (this._onRender = this.register(new k.EventEmitter())),
                  (this.onRender = this._onRender.event),
                  (this._onSelectionChange = this.register(
                    new k.EventEmitter()
                  )),
                  (this.onSelectionChange = this._onSelectionChange.event),
                  (this._onTitleChange = this.register(new k.EventEmitter())),
                  (this.onTitleChange = this._onTitleChange.event),
                  (this._onBell = this.register(new k.EventEmitter())),
                  (this.onBell = this._onBell.event),
                  (this._onFocus = this.register(new k.EventEmitter())),
                  (this._onBlur = this.register(new k.EventEmitter())),
                  (this._onA11yCharEmitter = this.register(
                    new k.EventEmitter()
                  )),
                  (this._onA11yTabEmitter = this.register(
                    new k.EventEmitter()
                  )),
                  (this._onWillOpen = this.register(new k.EventEmitter())),
                  this._setup(),
                  (this._decorationService =
                    this._instantiationService.createInstance(
                      x.DecorationService
                    )),
                  this._instantiationService.setService(
                    D.IDecorationService,
                    this._decorationService
                  ),
                  (this._linkProviderService =
                    this._instantiationService.createInstance(
                      $.LinkProviderService
                    )),
                  this._instantiationService.setService(
                    m.ILinkProviderService,
                    this._linkProviderService
                  ),
                  this._linkProviderService.registerLinkProvider(
                    this._instantiationService.createInstance(f.OscLinkProvider)
                  ),
                  this.register(
                    this._inputHandler.onRequestBell(() => this._onBell.fire())
                  ),
                  this.register(
                    this._inputHandler.onRequestRefreshRows((y, I) =>
                      this.refresh(y, I)
                    )
                  ),
                  this.register(
                    this._inputHandler.onRequestSendFocus(() =>
                      this._reportFocus()
                    )
                  ),
                  this.register(
                    this._inputHandler.onRequestReset(() => this.reset())
                  ),
                  this.register(
                    this._inputHandler.onRequestWindowsOptionsReport((y) =>
                      this._reportWindowsOptions(y)
                    )
                  ),
                  this.register(
                    this._inputHandler.onColor((y) => this._handleColorEvent(y))
                  ),
                  this.register(
                    (0, k.forwardEvent)(
                      this._inputHandler.onCursorMove,
                      this._onCursorMove
                    )
                  ),
                  this.register(
                    (0, k.forwardEvent)(
                      this._inputHandler.onTitleChange,
                      this._onTitleChange
                    )
                  ),
                  this.register(
                    (0, k.forwardEvent)(
                      this._inputHandler.onA11yChar,
                      this._onA11yCharEmitter
                    )
                  ),
                  this.register(
                    (0, k.forwardEvent)(
                      this._inputHandler.onA11yTab,
                      this._onA11yTabEmitter
                    )
                  ),
                  this.register(
                    this._bufferService.onResize((y) =>
                      this._afterResize(y.cols, y.rows)
                    )
                  ),
                  this.register(
                    (0, P.toDisposable)(() => {
                      (this._customKeyEventHandler = void 0),
                        this.element?.parentNode?.removeChild(this.element);
                    })
                  );
              }
              _handleColorEvent(M) {
                if (this._themeService)
                  for (const y of M) {
                    let I,
                      N = "";
                    switch (y.index) {
                      case 256:
                        (I = "foreground"), (N = "10");
                        break;
                      case 257:
                        (I = "background"), (N = "11");
                        break;
                      case 258:
                        (I = "cursor"), (N = "12");
                        break;
                      default:
                        (I = "ansi"), (N = "4;" + y.index);
                    }
                    switch (y.type) {
                      case 0:
                        const q = A.color.toColorRGB(
                          I === "ansi"
                            ? this._themeService.colors.ansi[y.index]
                            : this._themeService.colors[I]
                        );
                        this.coreService.triggerDataEvent(
                          `${K.C0.ESC}]${N};${(0, S.toRgbString)(q)}${
                            K.C1_ESCAPED.ST
                          }`
                        );
                        break;
                      case 1:
                        if (I === "ansi")
                          this._themeService.modifyColors(
                            (j) =>
                              (j.ansi[y.index] = A.channels.toColor(...y.color))
                          );
                        else {
                          const j = I;
                          this._themeService.modifyColors(
                            (Y) => (Y[j] = A.channels.toColor(...y.color))
                          );
                        }
                        break;
                      case 2:
                        this._themeService.restoreColor(y.index);
                    }
                  }
              }
              _setup() {
                super._setup(), (this._customKeyEventHandler = void 0);
              }
              get buffer() {
                return this.buffers.active;
              }
              focus() {
                this.textarea && this.textarea.focus({ preventScroll: !0 });
              }
              _handleScreenReaderModeOptionChange(M) {
                M
                  ? !this._accessibilityManager.value &&
                    this._renderService &&
                    (this._accessibilityManager.value =
                      this._instantiationService.createInstance(
                        W.AccessibilityManager,
                        this
                      ))
                  : this._accessibilityManager.clear();
              }
              _handleTextAreaFocus(M) {
                this.coreService.decPrivateModes.sendFocus &&
                  this.coreService.triggerDataEvent(K.C0.ESC + "[I"),
                  this.element.classList.add("focus"),
                  this._showCursor(),
                  this._onFocus.fire();
              }
              blur() {
                return this.textarea?.blur();
              }
              _handleTextAreaBlur() {
                (this.textarea.value = ""),
                  this.refresh(this.buffer.y, this.buffer.y),
                  this.coreService.decPrivateModes.sendFocus &&
                    this.coreService.triggerDataEvent(K.C0.ESC + "[O"),
                  this.element.classList.remove("focus"),
                  this._onBlur.fire();
              }
              _syncTextArea() {
                if (
                  !this.textarea ||
                  !this.buffer.isCursorInViewport ||
                  this._compositionHelper.isComposing ||
                  !this._renderService
                )
                  return;
                const M = this.buffer.ybase + this.buffer.y,
                  y = this.buffer.lines.get(M);
                if (!y) return;
                const I = Math.min(this.buffer.x, this.cols - 1),
                  N = this._renderService.dimensions.css.cell.height,
                  q = y.getWidth(I),
                  j = this._renderService.dimensions.css.cell.width * q,
                  Y =
                    this.buffer.y *
                    this._renderService.dimensions.css.cell.height,
                  Z = I * this._renderService.dimensions.css.cell.width;
                (this.textarea.style.left = Z + "px"),
                  (this.textarea.style.top = Y + "px"),
                  (this.textarea.style.width = j + "px"),
                  (this.textarea.style.height = N + "px"),
                  (this.textarea.style.lineHeight = N + "px"),
                  (this.textarea.style.zIndex = "-5");
              }
              _initGlobal() {
                this._bindKeys(),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.element,
                      "copy",
                      (y) => {
                        this.hasSelection() &&
                          (0, h.copyHandler)(y, this._selectionService);
                      }
                    )
                  );
                const M = (y) =>
                  (0, h.handlePasteEvent)(
                    y,
                    this.textarea,
                    this.coreService,
                    this.optionsService
                  );
                this.register(
                  (0, u.addDisposableDomListener)(this.textarea, "paste", M)
                ),
                  this.register(
                    (0, u.addDisposableDomListener)(this.element, "paste", M)
                  ),
                  F.isFirefox
                    ? this.register(
                        (0, u.addDisposableDomListener)(
                          this.element,
                          "mousedown",
                          (y) => {
                            y.button === 2 &&
                              (0, h.rightClickHandler)(
                                y,
                                this.textarea,
                                this.screenElement,
                                this._selectionService,
                                this.options.rightClickSelectsWord
                              );
                          }
                        )
                      )
                    : this.register(
                        (0, u.addDisposableDomListener)(
                          this.element,
                          "contextmenu",
                          (y) => {
                            (0, h.rightClickHandler)(
                              y,
                              this.textarea,
                              this.screenElement,
                              this._selectionService,
                              this.options.rightClickSelectsWord
                            );
                          }
                        )
                      ),
                  F.isLinux &&
                    this.register(
                      (0, u.addDisposableDomListener)(
                        this.element,
                        "auxclick",
                        (y) => {
                          y.button === 1 &&
                            (0, h.moveTextAreaUnderMouseCursor)(
                              y,
                              this.textarea,
                              this.screenElement
                            );
                        }
                      )
                    );
              }
              _bindKeys() {
                this.register(
                  (0, u.addDisposableDomListener)(
                    this.textarea,
                    "keyup",
                    (M) => this._keyUp(M),
                    !0
                  )
                ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "keydown",
                      (M) => this._keyDown(M),
                      !0
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "keypress",
                      (M) => this._keyPress(M),
                      !0
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "compositionstart",
                      () => this._compositionHelper.compositionstart()
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "compositionupdate",
                      (M) => this._compositionHelper.compositionupdate(M)
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "compositionend",
                      () => this._compositionHelper.compositionend()
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "input",
                      (M) => this._inputEvent(M),
                      !0
                    )
                  ),
                  this.register(
                    this.onRender(() =>
                      this._compositionHelper.updateCompositionElements()
                    )
                  );
              }
              open(M) {
                if (!M) throw new Error("Terminal requires a parent element.");
                if (
                  (M.isConnected ||
                    this._logService.debug(
                      "Terminal.open was called on an element that was not attached to the DOM"
                    ),
                  this.element?.ownerDocument.defaultView &&
                    this._coreBrowserService)
                )
                  return void (
                    this.element.ownerDocument.defaultView !==
                      this._coreBrowserService.window &&
                    (this._coreBrowserService.window =
                      this.element.ownerDocument.defaultView)
                  );
                (this._document = M.ownerDocument),
                  this.options.documentOverride &&
                    this.options.documentOverride instanceof Document &&
                    (this._document =
                      this.optionsService.rawOptions.documentOverride),
                  (this.element = this._document.createElement("div")),
                  (this.element.dir = "ltr"),
                  this.element.classList.add("terminal"),
                  this.element.classList.add("xterm"),
                  M.appendChild(this.element);
                const y = this._document.createDocumentFragment();
                (this._viewportElement = this._document.createElement("div")),
                  this._viewportElement.classList.add("xterm-viewport"),
                  y.appendChild(this._viewportElement),
                  (this._viewportScrollArea =
                    this._document.createElement("div")),
                  this._viewportScrollArea.classList.add("xterm-scroll-area"),
                  this._viewportElement.appendChild(this._viewportScrollArea),
                  (this.screenElement = this._document.createElement("div")),
                  this.screenElement.classList.add("xterm-screen"),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.screenElement,
                      "mousemove",
                      (I) => this.updateCursorStyle(I)
                    )
                  ),
                  (this._helperContainer = this._document.createElement("div")),
                  this._helperContainer.classList.add("xterm-helpers"),
                  this.screenElement.appendChild(this._helperContainer),
                  y.appendChild(this.screenElement),
                  (this.textarea = this._document.createElement("textarea")),
                  this.textarea.classList.add("xterm-helper-textarea"),
                  this.textarea.setAttribute("aria-label", d.promptLabel),
                  F.isChromeOS ||
                    this.textarea.setAttribute("aria-multiline", "false"),
                  this.textarea.setAttribute("autocorrect", "off"),
                  this.textarea.setAttribute("autocapitalize", "off"),
                  this.textarea.setAttribute("spellcheck", "false"),
                  (this.textarea.tabIndex = 0),
                  (this._coreBrowserService = this.register(
                    this._instantiationService.createInstance(
                      v.CoreBrowserService,
                      this.textarea,
                      M.ownerDocument.defaultView ?? window,
                      this._document ?? typeof window < "u"
                        ? window.document
                        : null
                    )
                  )),
                  this._instantiationService.setService(
                    m.ICoreBrowserService,
                    this._coreBrowserService
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.textarea,
                      "focus",
                      (I) => this._handleTextAreaFocus(I)
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(this.textarea, "blur", () =>
                      this._handleTextAreaBlur()
                    )
                  ),
                  this._helperContainer.appendChild(this.textarea),
                  (this._charSizeService =
                    this._instantiationService.createInstance(
                      s.CharSizeService,
                      this._document,
                      this._helperContainer
                    )),
                  this._instantiationService.setService(
                    m.ICharSizeService,
                    this._charSizeService
                  ),
                  (this._themeService =
                    this._instantiationService.createInstance(R.ThemeService)),
                  this._instantiationService.setService(
                    m.IThemeService,
                    this._themeService
                  ),
                  (this._characterJoinerService =
                    this._instantiationService.createInstance(
                      a.CharacterJoinerService
                    )),
                  this._instantiationService.setService(
                    m.ICharacterJoinerService,
                    this._characterJoinerService
                  ),
                  (this._renderService = this.register(
                    this._instantiationService.createInstance(
                      g.RenderService,
                      this.rows,
                      this.screenElement
                    )
                  )),
                  this._instantiationService.setService(
                    m.IRenderService,
                    this._renderService
                  ),
                  this.register(
                    this._renderService.onRenderedViewportChange((I) =>
                      this._onRender.fire(I)
                    )
                  ),
                  this.onResize((I) =>
                    this._renderService.resize(I.cols, I.rows)
                  ),
                  (this._compositionView = this._document.createElement("div")),
                  this._compositionView.classList.add("composition-view"),
                  (this._compositionHelper =
                    this._instantiationService.createInstance(
                      i.CompositionHelper,
                      this.textarea,
                      this._compositionView
                    )),
                  this._helperContainer.appendChild(this._compositionView),
                  (this._mouseService =
                    this._instantiationService.createInstance(_.MouseService)),
                  this._instantiationService.setService(
                    m.IMouseService,
                    this._mouseService
                  ),
                  (this.linkifier = this.register(
                    this._instantiationService.createInstance(
                      n.Linkifier,
                      this.screenElement
                    )
                  )),
                  this.element.appendChild(y);
                try {
                  this._onWillOpen.fire(this.element);
                } catch {}
                this._renderService.hasRenderer() ||
                  this._renderService.setRenderer(this._createRenderer()),
                  (this.viewport = this._instantiationService.createInstance(
                    p.Viewport,
                    this._viewportElement,
                    this._viewportScrollArea
                  )),
                  this.viewport.onRequestScrollLines((I) =>
                    this.scrollLines(I.amount, I.suppressScrollEvent, 1)
                  ),
                  this.register(
                    this._inputHandler.onRequestSyncScrollBar(() =>
                      this.viewport.syncScrollArea()
                    )
                  ),
                  this.register(this.viewport),
                  this.register(
                    this.onCursorMove(() => {
                      this._renderService.handleCursorMove(),
                        this._syncTextArea();
                    })
                  ),
                  this.register(
                    this.onResize(() =>
                      this._renderService.handleResize(this.cols, this.rows)
                    )
                  ),
                  this.register(
                    this.onBlur(() => this._renderService.handleBlur())
                  ),
                  this.register(
                    this.onFocus(() => this._renderService.handleFocus())
                  ),
                  this.register(
                    this._renderService.onDimensionsChange(() =>
                      this.viewport.syncScrollArea()
                    )
                  ),
                  (this._selectionService = this.register(
                    this._instantiationService.createInstance(
                      c.SelectionService,
                      this.element,
                      this.screenElement,
                      this.linkifier
                    )
                  )),
                  this._instantiationService.setService(
                    m.ISelectionService,
                    this._selectionService
                  ),
                  this.register(
                    this._selectionService.onRequestScrollLines((I) =>
                      this.scrollLines(I.amount, I.suppressScrollEvent)
                    )
                  ),
                  this.register(
                    this._selectionService.onSelectionChange(() =>
                      this._onSelectionChange.fire()
                    )
                  ),
                  this.register(
                    this._selectionService.onRequestRedraw((I) =>
                      this._renderService.handleSelectionChanged(
                        I.start,
                        I.end,
                        I.columnSelectMode
                      )
                    )
                  ),
                  this.register(
                    this._selectionService.onLinuxMouseSelection((I) => {
                      (this.textarea.value = I),
                        this.textarea.focus(),
                        this.textarea.select();
                    })
                  ),
                  this.register(
                    this._onScroll.event((I) => {
                      this.viewport.syncScrollArea(),
                        this._selectionService.refresh();
                    })
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this._viewportElement,
                      "scroll",
                      () => this._selectionService.refresh()
                    )
                  ),
                  this.register(
                    this._instantiationService.createInstance(
                      l.BufferDecorationRenderer,
                      this.screenElement
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      this.element,
                      "mousedown",
                      (I) => this._selectionService.handleMouseDown(I)
                    )
                  ),
                  this.coreMouseService.areMouseEventsActive
                    ? (this._selectionService.disable(),
                      this.element.classList.add("enable-mouse-events"))
                    : this._selectionService.enable(),
                  this.options.screenReaderMode &&
                    (this._accessibilityManager.value =
                      this._instantiationService.createInstance(
                        W.AccessibilityManager,
                        this
                      )),
                  this.register(
                    this.optionsService.onSpecificOptionChange(
                      "screenReaderMode",
                      (I) => this._handleScreenReaderModeOptionChange(I)
                    )
                  ),
                  this.options.overviewRulerWidth &&
                    (this._overviewRulerRenderer = this.register(
                      this._instantiationService.createInstance(
                        t.OverviewRulerRenderer,
                        this._viewportElement,
                        this.screenElement
                      )
                    )),
                  this.optionsService.onSpecificOptionChange(
                    "overviewRulerWidth",
                    (I) => {
                      !this._overviewRulerRenderer &&
                        I &&
                        this._viewportElement &&
                        this.screenElement &&
                        (this._overviewRulerRenderer = this.register(
                          this._instantiationService.createInstance(
                            t.OverviewRulerRenderer,
                            this._viewportElement,
                            this.screenElement
                          )
                        ));
                    }
                  ),
                  this._charSizeService.measure(),
                  this.refresh(0, this.rows - 1),
                  this._initGlobal(),
                  this.bindMouse();
              }
              _createRenderer() {
                return this._instantiationService.createInstance(
                  e.DomRenderer,
                  this,
                  this._document,
                  this.element,
                  this.screenElement,
                  this._viewportElement,
                  this._helperContainer,
                  this.linkifier
                );
              }
              bindMouse() {
                const M = this,
                  y = this.element;
                function I(j) {
                  const Y = M._mouseService.getMouseReportCoords(
                    j,
                    M.screenElement
                  );
                  if (!Y) return !1;
                  let Z, Q;
                  switch (j.overrideType || j.type) {
                    case "mousemove":
                      (Q = 32),
                        j.buttons === void 0
                          ? ((Z = 3),
                            j.button !== void 0 &&
                              (Z = j.button < 3 ? j.button : 3))
                          : (Z =
                              1 & j.buttons
                                ? 0
                                : 4 & j.buttons
                                ? 1
                                : 2 & j.buttons
                                ? 2
                                : 3);
                      break;
                    case "mouseup":
                      (Q = 0), (Z = j.button < 3 ? j.button : 3);
                      break;
                    case "mousedown":
                      (Q = 1), (Z = j.button < 3 ? j.button : 3);
                      break;
                    case "wheel":
                      if (
                        (M._customWheelEventHandler &&
                          M._customWheelEventHandler(j) === !1) ||
                        M.viewport.getLinesScrolled(j) === 0
                      )
                        return !1;
                      (Q = j.deltaY < 0 ? 0 : 1), (Z = 4);
                      break;
                    default:
                      return !1;
                  }
                  return (
                    !(Q === void 0 || Z === void 0 || Z > 4) &&
                    M.coreMouseService.triggerMouseEvent({
                      col: Y.col,
                      row: Y.row,
                      x: Y.x,
                      y: Y.y,
                      button: Z,
                      action: Q,
                      ctrl: j.ctrlKey,
                      alt: j.altKey,
                      shift: j.shiftKey,
                    })
                  );
                }
                const N = {
                    mouseup: null,
                    wheel: null,
                    mousedrag: null,
                    mousemove: null,
                  },
                  q = {
                    mouseup: (j) => (
                      I(j),
                      j.buttons ||
                        (this._document.removeEventListener(
                          "mouseup",
                          N.mouseup
                        ),
                        N.mousedrag &&
                          this._document.removeEventListener(
                            "mousemove",
                            N.mousedrag
                          )),
                      this.cancel(j)
                    ),
                    wheel: (j) => (I(j), this.cancel(j, !0)),
                    mousedrag: (j) => {
                      j.buttons && I(j);
                    },
                    mousemove: (j) => {
                      j.buttons || I(j);
                    },
                  };
                this.register(
                  this.coreMouseService.onProtocolChange((j) => {
                    j
                      ? (this.optionsService.rawOptions.logLevel === "debug" &&
                          this._logService.debug(
                            "Binding to mouse events:",
                            this.coreMouseService.explainEvents(j)
                          ),
                        this.element.classList.add("enable-mouse-events"),
                        this._selectionService.disable())
                      : (this._logService.debug("Unbinding from mouse events."),
                        this.element.classList.remove("enable-mouse-events"),
                        this._selectionService.enable()),
                      8 & j
                        ? N.mousemove ||
                          (y.addEventListener("mousemove", q.mousemove),
                          (N.mousemove = q.mousemove))
                        : (y.removeEventListener("mousemove", N.mousemove),
                          (N.mousemove = null)),
                      16 & j
                        ? N.wheel ||
                          (y.addEventListener("wheel", q.wheel, {
                            passive: !1,
                          }),
                          (N.wheel = q.wheel))
                        : (y.removeEventListener("wheel", N.wheel),
                          (N.wheel = null)),
                      2 & j
                        ? N.mouseup || (N.mouseup = q.mouseup)
                        : (this._document.removeEventListener(
                            "mouseup",
                            N.mouseup
                          ),
                          (N.mouseup = null)),
                      4 & j
                        ? N.mousedrag || (N.mousedrag = q.mousedrag)
                        : (this._document.removeEventListener(
                            "mousemove",
                            N.mousedrag
                          ),
                          (N.mousedrag = null));
                  })
                ),
                  (this.coreMouseService.activeProtocol =
                    this.coreMouseService.activeProtocol),
                  this.register(
                    (0, u.addDisposableDomListener)(y, "mousedown", (j) => {
                      if (
                        (j.preventDefault(),
                        this.focus(),
                        this.coreMouseService.areMouseEventsActive &&
                          !this._selectionService.shouldForceSelection(j))
                      )
                        return (
                          I(j),
                          N.mouseup &&
                            this._document.addEventListener(
                              "mouseup",
                              N.mouseup
                            ),
                          N.mousedrag &&
                            this._document.addEventListener(
                              "mousemove",
                              N.mousedrag
                            ),
                          this.cancel(j)
                        );
                    })
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      y,
                      "wheel",
                      (j) => {
                        if (!N.wheel) {
                          if (
                            this._customWheelEventHandler &&
                            this._customWheelEventHandler(j) === !1
                          )
                            return !1;
                          if (!this.buffer.hasScrollback) {
                            const Y = this.viewport.getLinesScrolled(j);
                            if (Y === 0) return;
                            const Z =
                              K.C0.ESC +
                              (this.coreService.decPrivateModes
                                .applicationCursorKeys
                                ? "O"
                                : "[") +
                              (j.deltaY < 0 ? "A" : "B");
                            let Q = "";
                            for (let ee = 0; ee < Math.abs(Y); ee++) Q += Z;
                            return (
                              this.coreService.triggerDataEvent(Q, !0),
                              this.cancel(j, !0)
                            );
                          }
                          return this.viewport.handleWheel(j)
                            ? this.cancel(j)
                            : void 0;
                        }
                      },
                      { passive: !1 }
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      y,
                      "touchstart",
                      (j) => {
                        if (!this.coreMouseService.areMouseEventsActive)
                          return (
                            this.viewport.handleTouchStart(j), this.cancel(j)
                          );
                      },
                      { passive: !0 }
                    )
                  ),
                  this.register(
                    (0, u.addDisposableDomListener)(
                      y,
                      "touchmove",
                      (j) => {
                        if (!this.coreMouseService.areMouseEventsActive)
                          return this.viewport.handleTouchMove(j)
                            ? void 0
                            : this.cancel(j);
                      },
                      { passive: !1 }
                    )
                  );
              }
              refresh(M, y) {
                this._renderService?.refreshRows(M, y);
              }
              updateCursorStyle(M) {
                this._selectionService?.shouldColumnSelect(M)
                  ? this.element.classList.add("column-select")
                  : this.element.classList.remove("column-select");
              }
              _showCursor() {
                this.coreService.isCursorInitialized ||
                  ((this.coreService.isCursorInitialized = !0),
                  this.refresh(this.buffer.y, this.buffer.y));
              }
              scrollLines(M, y, I = 0) {
                I === 1
                  ? (super.scrollLines(M, y, I), this.refresh(0, this.rows - 1))
                  : this.viewport?.scrollLines(M);
              }
              paste(M) {
                (0, h.paste)(
                  M,
                  this.textarea,
                  this.coreService,
                  this.optionsService
                );
              }
              attachCustomKeyEventHandler(M) {
                this._customKeyEventHandler = M;
              }
              attachCustomWheelEventHandler(M) {
                this._customWheelEventHandler = M;
              }
              registerLinkProvider(M) {
                return this._linkProviderService.registerLinkProvider(M);
              }
              registerCharacterJoiner(M) {
                if (!this._characterJoinerService)
                  throw new Error("Terminal must be opened first");
                const y = this._characterJoinerService.register(M);
                return this.refresh(0, this.rows - 1), y;
              }
              deregisterCharacterJoiner(M) {
                if (!this._characterJoinerService)
                  throw new Error("Terminal must be opened first");
                this._characterJoinerService.deregister(M) &&
                  this.refresh(0, this.rows - 1);
              }
              get markers() {
                return this.buffer.markers;
              }
              registerMarker(M) {
                return this.buffer.addMarker(
                  this.buffer.ybase + this.buffer.y + M
                );
              }
              registerDecoration(M) {
                return this._decorationService.registerDecoration(M);
              }
              hasSelection() {
                return (
                  !!this._selectionService &&
                  this._selectionService.hasSelection
                );
              }
              select(M, y, I) {
                this._selectionService.setSelection(M, y, I);
              }
              getSelection() {
                return this._selectionService
                  ? this._selectionService.selectionText
                  : "";
              }
              getSelectionPosition() {
                if (
                  this._selectionService &&
                  this._selectionService.hasSelection
                )
                  return {
                    start: {
                      x: this._selectionService.selectionStart[0],
                      y: this._selectionService.selectionStart[1],
                    },
                    end: {
                      x: this._selectionService.selectionEnd[0],
                      y: this._selectionService.selectionEnd[1],
                    },
                  };
              }
              clearSelection() {
                this._selectionService?.clearSelection();
              }
              selectAll() {
                this._selectionService?.selectAll();
              }
              selectLines(M, y) {
                this._selectionService?.selectLines(M, y);
              }
              _keyDown(M) {
                if (
                  ((this._keyDownHandled = !1),
                  (this._keyDownSeen = !0),
                  this._customKeyEventHandler &&
                    this._customKeyEventHandler(M) === !1)
                )
                  return !1;
                const y =
                  this.browser.isMac &&
                  this.options.macOptionIsMeta &&
                  M.altKey;
                if (!y && !this._compositionHelper.keydown(M))
                  return (
                    this.options.scrollOnUserInput &&
                      this.buffer.ybase !== this.buffer.ydisp &&
                      this.scrollToBottom(),
                    !1
                  );
                y ||
                  (M.key !== "Dead" && M.key !== "AltGraph") ||
                  (this._unprocessedDeadKey = !0);
                const I = (0, z.evaluateKeyboardEvent)(
                  M,
                  this.coreService.decPrivateModes.applicationCursorKeys,
                  this.browser.isMac,
                  this.options.macOptionIsMeta
                );
                if ((this.updateCursorStyle(M), I.type === 3 || I.type === 2)) {
                  const N = this.rows - 1;
                  return (
                    this.scrollLines(I.type === 2 ? -N : N), this.cancel(M, !0)
                  );
                }
                return (
                  I.type === 1 && this.selectAll(),
                  !!this._isThirdLevelShift(this.browser, M) ||
                    (I.cancel && this.cancel(M, !0),
                    !I.key ||
                      !!(
                        M.key &&
                        !M.ctrlKey &&
                        !M.altKey &&
                        !M.metaKey &&
                        M.key.length === 1 &&
                        M.key.charCodeAt(0) >= 65 &&
                        M.key.charCodeAt(0) <= 90
                      ) ||
                      (this._unprocessedDeadKey
                        ? ((this._unprocessedDeadKey = !1), !0)
                        : ((I.key !== K.C0.ETX && I.key !== K.C0.CR) ||
                            (this.textarea.value = ""),
                          this._onKey.fire({ key: I.key, domEvent: M }),
                          this._showCursor(),
                          this.coreService.triggerDataEvent(I.key, !0),
                          !this.optionsService.rawOptions.screenReaderMode ||
                          M.altKey ||
                          M.ctrlKey
                            ? this.cancel(M, !0)
                            : void (this._keyDownHandled = !0))))
                );
              }
              _isThirdLevelShift(M, y) {
                const I =
                  (M.isMac &&
                    !this.options.macOptionIsMeta &&
                    y.altKey &&
                    !y.ctrlKey &&
                    !y.metaKey) ||
                  (M.isWindows && y.altKey && y.ctrlKey && !y.metaKey) ||
                  (M.isWindows && y.getModifierState("AltGraph"));
                return y.type === "keypress"
                  ? I
                  : I && (!y.keyCode || y.keyCode > 47);
              }
              _keyUp(M) {
                (this._keyDownSeen = !1),
                  (this._customKeyEventHandler &&
                    this._customKeyEventHandler(M) === !1) ||
                    ((function (y) {
                      return (
                        y.keyCode === 16 || y.keyCode === 17 || y.keyCode === 18
                      );
                    })(M) || this.focus(),
                    this.updateCursorStyle(M),
                    (this._keyPressHandled = !1));
              }
              _keyPress(M) {
                let y;
                if (
                  ((this._keyPressHandled = !1),
                  this._keyDownHandled ||
                    (this._customKeyEventHandler &&
                      this._customKeyEventHandler(M) === !1))
                )
                  return !1;
                if ((this.cancel(M), M.charCode)) y = M.charCode;
                else if (M.which === null || M.which === void 0) y = M.keyCode;
                else {
                  if (M.which === 0 || M.charCode === 0) return !1;
                  y = M.which;
                }
                return !(
                  !y ||
                  ((M.altKey || M.ctrlKey || M.metaKey) &&
                    !this._isThirdLevelShift(this.browser, M)) ||
                  ((y = String.fromCharCode(y)),
                  this._onKey.fire({ key: y, domEvent: M }),
                  this._showCursor(),
                  this.coreService.triggerDataEvent(y, !0),
                  (this._keyPressHandled = !0),
                  (this._unprocessedDeadKey = !1),
                  0)
                );
              }
              _inputEvent(M) {
                if (
                  M.data &&
                  M.inputType === "insertText" &&
                  (!M.composed || !this._keyDownSeen) &&
                  !this.optionsService.rawOptions.screenReaderMode
                ) {
                  if (this._keyPressHandled) return !1;
                  this._unprocessedDeadKey = !1;
                  const y = M.data;
                  return (
                    this.coreService.triggerDataEvent(y, !0), this.cancel(M), !0
                  );
                }
                return !1;
              }
              resize(M, y) {
                M !== this.cols || y !== this.rows
                  ? super.resize(M, y)
                  : this._charSizeService &&
                    !this._charSizeService.hasValidSize &&
                    this._charSizeService.measure();
              }
              _afterResize(M, y) {
                this._charSizeService?.measure(),
                  this.viewport?.syncScrollArea(!0);
              }
              clear() {
                if (this.buffer.ybase !== 0 || this.buffer.y !== 0) {
                  this.buffer.clearAllMarkers(),
                    this.buffer.lines.set(
                      0,
                      this.buffer.lines.get(this.buffer.ybase + this.buffer.y)
                    ),
                    (this.buffer.lines.length = 1),
                    (this.buffer.ydisp = 0),
                    (this.buffer.ybase = 0),
                    (this.buffer.y = 0);
                  for (let M = 1; M < this.rows; M++)
                    this.buffer.lines.push(
                      this.buffer.getBlankLine(U.DEFAULT_ATTR_DATA)
                    );
                  this._onScroll.fire({
                    position: this.buffer.ydisp,
                    source: 0,
                  }),
                    this.viewport?.reset(),
                    this.refresh(0, this.rows - 1);
                }
              }
              reset() {
                (this.options.rows = this.rows),
                  (this.options.cols = this.cols);
                const M = this._customKeyEventHandler;
                this._setup(),
                  super.reset(),
                  this._selectionService?.reset(),
                  this._decorationService.reset(),
                  this.viewport?.reset(),
                  (this._customKeyEventHandler = M),
                  this.refresh(0, this.rows - 1);
              }
              clearTextureAtlas() {
                this._renderService?.clearTextureAtlas();
              }
              _reportFocus() {
                this.element?.classList.contains("focus")
                  ? this.coreService.triggerDataEvent(K.C0.ESC + "[I")
                  : this.coreService.triggerDataEvent(K.C0.ESC + "[O");
              }
              _reportWindowsOptions(M) {
                if (this._renderService)
                  switch (M) {
                    case O.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                      const y =
                          this._renderService.dimensions.css.canvas.width.toFixed(
                            0
                          ),
                        I =
                          this._renderService.dimensions.css.canvas.height.toFixed(
                            0
                          );
                      this.coreService.triggerDataEvent(
                        `${K.C0.ESC}[4;${I};${y}t`
                      );
                      break;
                    case O.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                      const N =
                          this._renderService.dimensions.css.cell.width.toFixed(
                            0
                          ),
                        q =
                          this._renderService.dimensions.css.cell.height.toFixed(
                            0
                          );
                      this.coreService.triggerDataEvent(
                        `${K.C0.ESC}[6;${q};${N}t`
                      );
                  }
              }
              cancel(M, y) {
                if (this.options.cancelEvents || y)
                  return M.preventDefault(), M.stopPropagation(), !1;
              }
            }
            r.Terminal = V;
          },
          9924: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.TimeBasedDebouncer = void 0),
              (r.TimeBasedDebouncer = class {
                constructor(o, h = 1e3) {
                  (this._renderCallback = o),
                    (this._debounceThresholdMS = h),
                    (this._lastRefreshMs = 0),
                    (this._additionalRefreshRequested = !1);
                }
                dispose() {
                  this._refreshTimeoutID &&
                    clearTimeout(this._refreshTimeoutID);
                }
                refresh(o, h, u) {
                  (this._rowCount = u),
                    (o = o !== void 0 ? o : 0),
                    (h = h !== void 0 ? h : this._rowCount - 1),
                    (this._rowStart =
                      this._rowStart !== void 0
                        ? Math.min(this._rowStart, o)
                        : o),
                    (this._rowEnd =
                      this._rowEnd !== void 0 ? Math.max(this._rowEnd, h) : h);
                  const n = Date.now();
                  if (n - this._lastRefreshMs >= this._debounceThresholdMS)
                    (this._lastRefreshMs = n), this._innerRefresh();
                  else if (!this._additionalRefreshRequested) {
                    const d = n - this._lastRefreshMs,
                      f = this._debounceThresholdMS - d;
                    (this._additionalRefreshRequested = !0),
                      (this._refreshTimeoutID = window.setTimeout(() => {
                        (this._lastRefreshMs = Date.now()),
                          this._innerRefresh(),
                          (this._additionalRefreshRequested = !1),
                          (this._refreshTimeoutID = void 0);
                      }, f));
                  }
                }
                _innerRefresh() {
                  if (
                    this._rowStart === void 0 ||
                    this._rowEnd === void 0 ||
                    this._rowCount === void 0
                  )
                    return;
                  const o = Math.max(this._rowStart, 0),
                    h = Math.min(this._rowEnd, this._rowCount - 1);
                  (this._rowStart = void 0),
                    (this._rowEnd = void 0),
                    this._renderCallback(o, h);
                }
              });
          },
          1680: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (i, e, s, a) {
                  var v,
                    _ = arguments.length,
                    g =
                      _ < 3
                        ? e
                        : a === null
                        ? (a = Object.getOwnPropertyDescriptor(e, s))
                        : a;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    g = Reflect.decorate(i, e, s, a);
                  else
                    for (var c = i.length - 1; c >= 0; c--)
                      (v = i[c]) &&
                        (g =
                          (_ < 3 ? v(g) : _ > 3 ? v(e, s, g) : v(e, s)) || g);
                  return _ > 3 && g && Object.defineProperty(e, s, g), g;
                },
              u =
                (this && this.__param) ||
                function (i, e) {
                  return function (s, a) {
                    e(s, a, i);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Viewport = void 0);
            const n = o(3656),
              d = o(4725),
              f = o(8460),
              p = o(844),
              l = o(2585);
            let t = (r.Viewport = class extends p.Disposable {
              constructor(i, e, s, a, v, _, g, c) {
                super(),
                  (this._viewportElement = i),
                  (this._scrollArea = e),
                  (this._bufferService = s),
                  (this._optionsService = a),
                  (this._charSizeService = v),
                  (this._renderService = _),
                  (this._coreBrowserService = g),
                  (this.scrollBarWidth = 0),
                  (this._currentRowHeight = 0),
                  (this._currentDeviceCellHeight = 0),
                  (this._lastRecordedBufferLength = 0),
                  (this._lastRecordedViewportHeight = 0),
                  (this._lastRecordedBufferHeight = 0),
                  (this._lastTouchY = 0),
                  (this._lastScrollTop = 0),
                  (this._wheelPartialScroll = 0),
                  (this._refreshAnimationFrame = null),
                  (this._ignoreNextScrollEvent = !1),
                  (this._smoothScrollState = {
                    startTime: 0,
                    origin: -1,
                    target: -1,
                  }),
                  (this._onRequestScrollLines = this.register(
                    new f.EventEmitter()
                  )),
                  (this.onRequestScrollLines =
                    this._onRequestScrollLines.event),
                  (this.scrollBarWidth =
                    this._viewportElement.offsetWidth -
                      this._scrollArea.offsetWidth || 15),
                  this.register(
                    (0, n.addDisposableDomListener)(
                      this._viewportElement,
                      "scroll",
                      this._handleScroll.bind(this)
                    )
                  ),
                  (this._activeBuffer = this._bufferService.buffer),
                  this.register(
                    this._bufferService.buffers.onBufferActivate(
                      (m) => (this._activeBuffer = m.activeBuffer)
                    )
                  ),
                  (this._renderDimensions = this._renderService.dimensions),
                  this.register(
                    this._renderService.onDimensionsChange(
                      (m) => (this._renderDimensions = m)
                    )
                  ),
                  this._handleThemeChange(c.colors),
                  this.register(
                    c.onChangeColors((m) => this._handleThemeChange(m))
                  ),
                  this.register(
                    this._optionsService.onSpecificOptionChange(
                      "scrollback",
                      () => this.syncScrollArea()
                    )
                  ),
                  setTimeout(() => this.syncScrollArea());
              }
              _handleThemeChange(i) {
                this._viewportElement.style.backgroundColor = i.background.css;
              }
              reset() {
                (this._currentRowHeight = 0),
                  (this._currentDeviceCellHeight = 0),
                  (this._lastRecordedBufferLength = 0),
                  (this._lastRecordedViewportHeight = 0),
                  (this._lastRecordedBufferHeight = 0),
                  (this._lastTouchY = 0),
                  (this._lastScrollTop = 0),
                  this._coreBrowserService.window.requestAnimationFrame(() =>
                    this.syncScrollArea()
                  );
              }
              _refresh(i) {
                if (i)
                  return (
                    this._innerRefresh(),
                    void (
                      this._refreshAnimationFrame !== null &&
                      this._coreBrowserService.window.cancelAnimationFrame(
                        this._refreshAnimationFrame
                      )
                    )
                  );
                this._refreshAnimationFrame === null &&
                  (this._refreshAnimationFrame =
                    this._coreBrowserService.window.requestAnimationFrame(() =>
                      this._innerRefresh()
                    ));
              }
              _innerRefresh() {
                if (this._charSizeService.height > 0) {
                  (this._currentRowHeight =
                    this._renderDimensions.device.cell.height /
                    this._coreBrowserService.dpr),
                    (this._currentDeviceCellHeight =
                      this._renderDimensions.device.cell.height),
                    (this._lastRecordedViewportHeight =
                      this._viewportElement.offsetHeight);
                  const e =
                    Math.round(
                      this._currentRowHeight * this._lastRecordedBufferLength
                    ) +
                    (this._lastRecordedViewportHeight -
                      this._renderDimensions.css.canvas.height);
                  this._lastRecordedBufferHeight !== e &&
                    ((this._lastRecordedBufferHeight = e),
                    (this._scrollArea.style.height =
                      this._lastRecordedBufferHeight + "px"));
                }
                const i =
                  this._bufferService.buffer.ydisp * this._currentRowHeight;
                this._viewportElement.scrollTop !== i &&
                  ((this._ignoreNextScrollEvent = !0),
                  (this._viewportElement.scrollTop = i)),
                  (this._refreshAnimationFrame = null);
              }
              syncScrollArea(i = !1) {
                if (
                  this._lastRecordedBufferLength !==
                  this._bufferService.buffer.lines.length
                )
                  return (
                    (this._lastRecordedBufferLength =
                      this._bufferService.buffer.lines.length),
                    void this._refresh(i)
                  );
                (this._lastRecordedViewportHeight ===
                  this._renderService.dimensions.css.canvas.height &&
                  this._lastScrollTop ===
                    this._activeBuffer.ydisp * this._currentRowHeight &&
                  this._renderDimensions.device.cell.height ===
                    this._currentDeviceCellHeight) ||
                  this._refresh(i);
              }
              _handleScroll(i) {
                if (
                  ((this._lastScrollTop = this._viewportElement.scrollTop),
                  !this._viewportElement.offsetParent)
                )
                  return;
                if (this._ignoreNextScrollEvent)
                  return (
                    (this._ignoreNextScrollEvent = !1),
                    void this._onRequestScrollLines.fire({
                      amount: 0,
                      suppressScrollEvent: !0,
                    })
                  );
                const e =
                  Math.round(this._lastScrollTop / this._currentRowHeight) -
                  this._bufferService.buffer.ydisp;
                this._onRequestScrollLines.fire({
                  amount: e,
                  suppressScrollEvent: !0,
                });
              }
              _smoothScroll() {
                if (
                  this._isDisposed ||
                  this._smoothScrollState.origin === -1 ||
                  this._smoothScrollState.target === -1
                )
                  return;
                const i = this._smoothScrollPercent();
                (this._viewportElement.scrollTop =
                  this._smoothScrollState.origin +
                  Math.round(
                    i *
                      (this._smoothScrollState.target -
                        this._smoothScrollState.origin)
                  )),
                  i < 1
                    ? this._coreBrowserService.window.requestAnimationFrame(
                        () => this._smoothScroll()
                      )
                    : this._clearSmoothScrollState();
              }
              _smoothScrollPercent() {
                return this._optionsService.rawOptions.smoothScrollDuration &&
                  this._smoothScrollState.startTime
                  ? Math.max(
                      Math.min(
                        (Date.now() - this._smoothScrollState.startTime) /
                          this._optionsService.rawOptions.smoothScrollDuration,
                        1
                      ),
                      0
                    )
                  : 1;
              }
              _clearSmoothScrollState() {
                (this._smoothScrollState.startTime = 0),
                  (this._smoothScrollState.origin = -1),
                  (this._smoothScrollState.target = -1);
              }
              _bubbleScroll(i, e) {
                const s =
                  this._viewportElement.scrollTop +
                  this._lastRecordedViewportHeight;
                return (
                  !(
                    (e < 0 && this._viewportElement.scrollTop !== 0) ||
                    (e > 0 && s < this._lastRecordedBufferHeight)
                  ) || (i.cancelable && i.preventDefault(), !1)
                );
              }
              handleWheel(i) {
                const e = this._getPixelsScrolled(i);
                return (
                  e !== 0 &&
                  (this._optionsService.rawOptions.smoothScrollDuration
                    ? ((this._smoothScrollState.startTime = Date.now()),
                      this._smoothScrollPercent() < 1
                        ? ((this._smoothScrollState.origin =
                            this._viewportElement.scrollTop),
                          this._smoothScrollState.target === -1
                            ? (this._smoothScrollState.target =
                                this._viewportElement.scrollTop + e)
                            : (this._smoothScrollState.target += e),
                          (this._smoothScrollState.target = Math.max(
                            Math.min(
                              this._smoothScrollState.target,
                              this._viewportElement.scrollHeight
                            ),
                            0
                          )),
                          this._smoothScroll())
                        : this._clearSmoothScrollState())
                    : (this._viewportElement.scrollTop += e),
                  this._bubbleScroll(i, e))
                );
              }
              scrollLines(i) {
                if (i !== 0)
                  if (this._optionsService.rawOptions.smoothScrollDuration) {
                    const e = i * this._currentRowHeight;
                    (this._smoothScrollState.startTime = Date.now()),
                      this._smoothScrollPercent() < 1
                        ? ((this._smoothScrollState.origin =
                            this._viewportElement.scrollTop),
                          (this._smoothScrollState.target =
                            this._smoothScrollState.origin + e),
                          (this._smoothScrollState.target = Math.max(
                            Math.min(
                              this._smoothScrollState.target,
                              this._viewportElement.scrollHeight
                            ),
                            0
                          )),
                          this._smoothScroll())
                        : this._clearSmoothScrollState();
                  } else
                    this._onRequestScrollLines.fire({
                      amount: i,
                      suppressScrollEvent: !1,
                    });
              }
              _getPixelsScrolled(i) {
                if (i.deltaY === 0 || i.shiftKey) return 0;
                let e = this._applyScrollModifier(i.deltaY, i);
                return (
                  i.deltaMode === WheelEvent.DOM_DELTA_LINE
                    ? (e *= this._currentRowHeight)
                    : i.deltaMode === WheelEvent.DOM_DELTA_PAGE &&
                      (e *= this._currentRowHeight * this._bufferService.rows),
                  e
                );
              }
              getBufferElements(i, e) {
                let s,
                  a = "";
                const v = [],
                  _ = e ?? this._bufferService.buffer.lines.length,
                  g = this._bufferService.buffer.lines;
                for (let c = i; c < _; c++) {
                  const m = g.get(c);
                  if (!m) continue;
                  const R = g.get(c + 1)?.isWrapped;
                  if (
                    ((a += m.translateToString(!R)), !R || c === g.length - 1)
                  ) {
                    const A = document.createElement("div");
                    (A.textContent = a),
                      v.push(A),
                      a.length > 0 && (s = A),
                      (a = "");
                  }
                }
                return { bufferElements: v, cursorElement: s };
              }
              getLinesScrolled(i) {
                if (i.deltaY === 0 || i.shiftKey) return 0;
                let e = this._applyScrollModifier(i.deltaY, i);
                return (
                  i.deltaMode === WheelEvent.DOM_DELTA_PIXEL
                    ? ((e /= this._currentRowHeight + 0),
                      (this._wheelPartialScroll += e),
                      (e =
                        Math.floor(Math.abs(this._wheelPartialScroll)) *
                        (this._wheelPartialScroll > 0 ? 1 : -1)),
                      (this._wheelPartialScroll %= 1))
                    : i.deltaMode === WheelEvent.DOM_DELTA_PAGE &&
                      (e *= this._bufferService.rows),
                  e
                );
              }
              _applyScrollModifier(i, e) {
                const s = this._optionsService.rawOptions.fastScrollModifier;
                return (s === "alt" && e.altKey) ||
                  (s === "ctrl" && e.ctrlKey) ||
                  (s === "shift" && e.shiftKey)
                  ? i *
                      this._optionsService.rawOptions.fastScrollSensitivity *
                      this._optionsService.rawOptions.scrollSensitivity
                  : i * this._optionsService.rawOptions.scrollSensitivity;
              }
              handleTouchStart(i) {
                this._lastTouchY = i.touches[0].pageY;
              }
              handleTouchMove(i) {
                const e = this._lastTouchY - i.touches[0].pageY;
                return (
                  (this._lastTouchY = i.touches[0].pageY),
                  e !== 0 &&
                    ((this._viewportElement.scrollTop += e),
                    this._bubbleScroll(i, e))
                );
              }
            });
            r.Viewport = t = h(
              [
                u(2, l.IBufferService),
                u(3, l.IOptionsService),
                u(4, d.ICharSizeService),
                u(5, d.IRenderService),
                u(6, d.ICoreBrowserService),
                u(7, d.IThemeService),
              ],
              t
            );
          },
          3107: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (l, t, i, e) {
                  var s,
                    a = arguments.length,
                    v =
                      a < 3
                        ? t
                        : e === null
                        ? (e = Object.getOwnPropertyDescriptor(t, i))
                        : e;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    v = Reflect.decorate(l, t, i, e);
                  else
                    for (var _ = l.length - 1; _ >= 0; _--)
                      (s = l[_]) &&
                        (v =
                          (a < 3 ? s(v) : a > 3 ? s(t, i, v) : s(t, i)) || v);
                  return a > 3 && v && Object.defineProperty(t, i, v), v;
                },
              u =
                (this && this.__param) ||
                function (l, t) {
                  return function (i, e) {
                    t(i, e, l);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferDecorationRenderer = void 0);
            const n = o(4725),
              d = o(844),
              f = o(2585);
            let p = (r.BufferDecorationRenderer = class extends d.Disposable {
              constructor(l, t, i, e, s) {
                super(),
                  (this._screenElement = l),
                  (this._bufferService = t),
                  (this._coreBrowserService = i),
                  (this._decorationService = e),
                  (this._renderService = s),
                  (this._decorationElements = new Map()),
                  (this._altBufferIsActive = !1),
                  (this._dimensionsChanged = !1),
                  (this._container = document.createElement("div")),
                  this._container.classList.add("xterm-decoration-container"),
                  this._screenElement.appendChild(this._container),
                  this.register(
                    this._renderService.onRenderedViewportChange(() =>
                      this._doRefreshDecorations()
                    )
                  ),
                  this.register(
                    this._renderService.onDimensionsChange(() => {
                      (this._dimensionsChanged = !0), this._queueRefresh();
                    })
                  ),
                  this.register(
                    this._coreBrowserService.onDprChange(() =>
                      this._queueRefresh()
                    )
                  ),
                  this.register(
                    this._bufferService.buffers.onBufferActivate(() => {
                      this._altBufferIsActive =
                        this._bufferService.buffer ===
                        this._bufferService.buffers.alt;
                    })
                  ),
                  this.register(
                    this._decorationService.onDecorationRegistered(() =>
                      this._queueRefresh()
                    )
                  ),
                  this.register(
                    this._decorationService.onDecorationRemoved((a) =>
                      this._removeDecoration(a)
                    )
                  ),
                  this.register(
                    (0, d.toDisposable)(() => {
                      this._container.remove(),
                        this._decorationElements.clear();
                    })
                  );
              }
              _queueRefresh() {
                this._animationFrame === void 0 &&
                  (this._animationFrame =
                    this._renderService.addRefreshCallback(() => {
                      this._doRefreshDecorations(),
                        (this._animationFrame = void 0);
                    }));
              }
              _doRefreshDecorations() {
                for (const l of this._decorationService.decorations)
                  this._renderDecoration(l);
                this._dimensionsChanged = !1;
              }
              _renderDecoration(l) {
                this._refreshStyle(l),
                  this._dimensionsChanged && this._refreshXPosition(l);
              }
              _createElement(l) {
                const t =
                  this._coreBrowserService.mainDocument.createElement("div");
                t.classList.add("xterm-decoration"),
                  t.classList.toggle(
                    "xterm-decoration-top-layer",
                    l?.options?.layer === "top"
                  ),
                  (t.style.width = `${Math.round(
                    (l.options.width || 1) *
                      this._renderService.dimensions.css.cell.width
                  )}px`),
                  (t.style.height =
                    (l.options.height || 1) *
                      this._renderService.dimensions.css.cell.height +
                    "px"),
                  (t.style.top =
                    (l.marker.line - this._bufferService.buffers.active.ydisp) *
                      this._renderService.dimensions.css.cell.height +
                    "px"),
                  (t.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`);
                const i = l.options.x ?? 0;
                return (
                  i &&
                    i > this._bufferService.cols &&
                    (t.style.display = "none"),
                  this._refreshXPosition(l, t),
                  t
                );
              }
              _refreshStyle(l) {
                const t =
                  l.marker.line - this._bufferService.buffers.active.ydisp;
                if (t < 0 || t >= this._bufferService.rows)
                  l.element &&
                    ((l.element.style.display = "none"),
                    l.onRenderEmitter.fire(l.element));
                else {
                  let i = this._decorationElements.get(l);
                  i ||
                    ((i = this._createElement(l)),
                    (l.element = i),
                    this._decorationElements.set(l, i),
                    this._container.appendChild(i),
                    l.onDispose(() => {
                      this._decorationElements.delete(l), i.remove();
                    })),
                    (i.style.top =
                      t * this._renderService.dimensions.css.cell.height +
                      "px"),
                    (i.style.display = this._altBufferIsActive
                      ? "none"
                      : "block"),
                    l.onRenderEmitter.fire(i);
                }
              }
              _refreshXPosition(l, t = l.element) {
                if (!t) return;
                const i = l.options.x ?? 0;
                (l.options.anchor || "left") === "right"
                  ? (t.style.right = i
                      ? i * this._renderService.dimensions.css.cell.width + "px"
                      : "")
                  : (t.style.left = i
                      ? i * this._renderService.dimensions.css.cell.width + "px"
                      : "");
              }
              _removeDecoration(l) {
                this._decorationElements.get(l)?.remove(),
                  this._decorationElements.delete(l),
                  l.dispose();
              }
            });
            r.BufferDecorationRenderer = p = h(
              [
                u(1, f.IBufferService),
                u(2, n.ICoreBrowserService),
                u(3, f.IDecorationService),
                u(4, n.IRenderService),
              ],
              p
            );
          },
          5871: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.ColorZoneStore = void 0),
              (r.ColorZoneStore = class {
                constructor() {
                  (this._zones = []),
                    (this._zonePool = []),
                    (this._zonePoolIndex = 0),
                    (this._linePadding = {
                      full: 0,
                      left: 0,
                      center: 0,
                      right: 0,
                    });
                }
                get zones() {
                  return (
                    (this._zonePool.length = Math.min(
                      this._zonePool.length,
                      this._zones.length
                    )),
                    this._zones
                  );
                }
                clear() {
                  (this._zones.length = 0), (this._zonePoolIndex = 0);
                }
                addDecoration(o) {
                  if (o.options.overviewRulerOptions) {
                    for (const h of this._zones)
                      if (
                        h.color === o.options.overviewRulerOptions.color &&
                        h.position === o.options.overviewRulerOptions.position
                      ) {
                        if (this._lineIntersectsZone(h, o.marker.line)) return;
                        if (
                          this._lineAdjacentToZone(
                            h,
                            o.marker.line,
                            o.options.overviewRulerOptions.position
                          )
                        )
                          return void this._addLineToZone(h, o.marker.line);
                      }
                    if (this._zonePoolIndex < this._zonePool.length)
                      return (
                        (this._zonePool[this._zonePoolIndex].color =
                          o.options.overviewRulerOptions.color),
                        (this._zonePool[this._zonePoolIndex].position =
                          o.options.overviewRulerOptions.position),
                        (this._zonePool[this._zonePoolIndex].startBufferLine =
                          o.marker.line),
                        (this._zonePool[this._zonePoolIndex].endBufferLine =
                          o.marker.line),
                        void this._zones.push(
                          this._zonePool[this._zonePoolIndex++]
                        )
                      );
                    this._zones.push({
                      color: o.options.overviewRulerOptions.color,
                      position: o.options.overviewRulerOptions.position,
                      startBufferLine: o.marker.line,
                      endBufferLine: o.marker.line,
                    }),
                      this._zonePool.push(this._zones[this._zones.length - 1]),
                      this._zonePoolIndex++;
                  }
                }
                setPadding(o) {
                  this._linePadding = o;
                }
                _lineIntersectsZone(o, h) {
                  return h >= o.startBufferLine && h <= o.endBufferLine;
                }
                _lineAdjacentToZone(o, h, u) {
                  return (
                    h >= o.startBufferLine - this._linePadding[u || "full"] &&
                    h <= o.endBufferLine + this._linePadding[u || "full"]
                  );
                }
                _addLineToZone(o, h) {
                  (o.startBufferLine = Math.min(o.startBufferLine, h)),
                    (o.endBufferLine = Math.max(o.endBufferLine, h));
                }
              });
          },
          5744: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (s, a, v, _) {
                  var g,
                    c = arguments.length,
                    m =
                      c < 3
                        ? a
                        : _ === null
                        ? (_ = Object.getOwnPropertyDescriptor(a, v))
                        : _;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    m = Reflect.decorate(s, a, v, _);
                  else
                    for (var R = s.length - 1; R >= 0; R--)
                      (g = s[R]) &&
                        (m =
                          (c < 3 ? g(m) : c > 3 ? g(a, v, m) : g(a, v)) || m);
                  return c > 3 && m && Object.defineProperty(a, v, m), m;
                },
              u =
                (this && this.__param) ||
                function (s, a) {
                  return function (v, _) {
                    a(v, _, s);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.OverviewRulerRenderer = void 0);
            const n = o(5871),
              d = o(4725),
              f = o(844),
              p = o(2585),
              l = { full: 0, left: 0, center: 0, right: 0 },
              t = { full: 0, left: 0, center: 0, right: 0 },
              i = { full: 0, left: 0, center: 0, right: 0 };
            let e = (r.OverviewRulerRenderer = class extends f.Disposable {
              get _width() {
                return this._optionsService.options.overviewRulerWidth || 0;
              }
              constructor(s, a, v, _, g, c, m) {
                super(),
                  (this._viewportElement = s),
                  (this._screenElement = a),
                  (this._bufferService = v),
                  (this._decorationService = _),
                  (this._renderService = g),
                  (this._optionsService = c),
                  (this._coreBrowserService = m),
                  (this._colorZoneStore = new n.ColorZoneStore()),
                  (this._shouldUpdateDimensions = !0),
                  (this._shouldUpdateAnchor = !0),
                  (this._lastKnownBufferLength = 0),
                  (this._canvas =
                    this._coreBrowserService.mainDocument.createElement(
                      "canvas"
                    )),
                  this._canvas.classList.add("xterm-decoration-overview-ruler"),
                  this._refreshCanvasDimensions(),
                  this._viewportElement.parentElement?.insertBefore(
                    this._canvas,
                    this._viewportElement
                  );
                const R = this._canvas.getContext("2d");
                if (!R) throw new Error("Ctx cannot be null");
                (this._ctx = R),
                  this._registerDecorationListeners(),
                  this._registerBufferChangeListeners(),
                  this._registerDimensionChangeListeners(),
                  this.register(
                    (0, f.toDisposable)(() => {
                      this._canvas?.remove();
                    })
                  );
              }
              _registerDecorationListeners() {
                this.register(
                  this._decorationService.onDecorationRegistered(() =>
                    this._queueRefresh(void 0, !0)
                  )
                ),
                  this.register(
                    this._decorationService.onDecorationRemoved(() =>
                      this._queueRefresh(void 0, !0)
                    )
                  );
              }
              _registerBufferChangeListeners() {
                this.register(
                  this._renderService.onRenderedViewportChange(() =>
                    this._queueRefresh()
                  )
                ),
                  this.register(
                    this._bufferService.buffers.onBufferActivate(() => {
                      this._canvas.style.display =
                        this._bufferService.buffer ===
                        this._bufferService.buffers.alt
                          ? "none"
                          : "block";
                    })
                  ),
                  this.register(
                    this._bufferService.onScroll(() => {
                      this._lastKnownBufferLength !==
                        this._bufferService.buffers.normal.lines.length &&
                        (this._refreshDrawHeightConstants(),
                        this._refreshColorZonePadding());
                    })
                  );
              }
              _registerDimensionChangeListeners() {
                this.register(
                  this._renderService.onRender(() => {
                    (this._containerHeight &&
                      this._containerHeight ===
                        this._screenElement.clientHeight) ||
                      (this._queueRefresh(!0),
                      (this._containerHeight =
                        this._screenElement.clientHeight));
                  })
                ),
                  this.register(
                    this._optionsService.onSpecificOptionChange(
                      "overviewRulerWidth",
                      () => this._queueRefresh(!0)
                    )
                  ),
                  this.register(
                    this._coreBrowserService.onDprChange(() =>
                      this._queueRefresh(!0)
                    )
                  ),
                  this._queueRefresh(!0);
              }
              _refreshDrawConstants() {
                const s = Math.floor(this._canvas.width / 3),
                  a = Math.ceil(this._canvas.width / 3);
                (t.full = this._canvas.width),
                  (t.left = s),
                  (t.center = a),
                  (t.right = s),
                  this._refreshDrawHeightConstants(),
                  (i.full = 0),
                  (i.left = 0),
                  (i.center = t.left),
                  (i.right = t.left + t.center);
              }
              _refreshDrawHeightConstants() {
                l.full = Math.round(2 * this._coreBrowserService.dpr);
                const s =
                    this._canvas.height /
                    this._bufferService.buffer.lines.length,
                  a = Math.round(
                    Math.max(Math.min(s, 12), 6) * this._coreBrowserService.dpr
                  );
                (l.left = a), (l.center = a), (l.right = a);
              }
              _refreshColorZonePadding() {
                this._colorZoneStore.setPadding({
                  full: Math.floor(
                    (this._bufferService.buffers.active.lines.length /
                      (this._canvas.height - 1)) *
                      l.full
                  ),
                  left: Math.floor(
                    (this._bufferService.buffers.active.lines.length /
                      (this._canvas.height - 1)) *
                      l.left
                  ),
                  center: Math.floor(
                    (this._bufferService.buffers.active.lines.length /
                      (this._canvas.height - 1)) *
                      l.center
                  ),
                  right: Math.floor(
                    (this._bufferService.buffers.active.lines.length /
                      (this._canvas.height - 1)) *
                      l.right
                  ),
                }),
                  (this._lastKnownBufferLength =
                    this._bufferService.buffers.normal.lines.length);
              }
              _refreshCanvasDimensions() {
                (this._canvas.style.width = `${this._width}px`),
                  (this._canvas.width = Math.round(
                    this._width * this._coreBrowserService.dpr
                  )),
                  (this._canvas.style.height = `${this._screenElement.clientHeight}px`),
                  (this._canvas.height = Math.round(
                    this._screenElement.clientHeight *
                      this._coreBrowserService.dpr
                  )),
                  this._refreshDrawConstants(),
                  this._refreshColorZonePadding();
              }
              _refreshDecorations() {
                this._shouldUpdateDimensions && this._refreshCanvasDimensions(),
                  this._ctx.clearRect(
                    0,
                    0,
                    this._canvas.width,
                    this._canvas.height
                  ),
                  this._colorZoneStore.clear();
                for (const a of this._decorationService.decorations)
                  this._colorZoneStore.addDecoration(a);
                this._ctx.lineWidth = 1;
                const s = this._colorZoneStore.zones;
                for (const a of s)
                  a.position !== "full" && this._renderColorZone(a);
                for (const a of s)
                  a.position === "full" && this._renderColorZone(a);
                (this._shouldUpdateDimensions = !1),
                  (this._shouldUpdateAnchor = !1);
              }
              _renderColorZone(s) {
                (this._ctx.fillStyle = s.color),
                  this._ctx.fillRect(
                    i[s.position || "full"],
                    Math.round(
                      (this._canvas.height - 1) *
                        (s.startBufferLine /
                          this._bufferService.buffers.active.lines.length) -
                        l[s.position || "full"] / 2
                    ),
                    t[s.position || "full"],
                    Math.round(
                      (this._canvas.height - 1) *
                        ((s.endBufferLine - s.startBufferLine) /
                          this._bufferService.buffers.active.lines.length) +
                        l[s.position || "full"]
                    )
                  );
              }
              _queueRefresh(s, a) {
                (this._shouldUpdateDimensions =
                  s || this._shouldUpdateDimensions),
                  (this._shouldUpdateAnchor = a || this._shouldUpdateAnchor),
                  this._animationFrame === void 0 &&
                    (this._animationFrame =
                      this._coreBrowserService.window.requestAnimationFrame(
                        () => {
                          this._refreshDecorations(),
                            (this._animationFrame = void 0);
                        }
                      ));
              }
            });
            r.OverviewRulerRenderer = e = h(
              [
                u(2, p.IBufferService),
                u(3, p.IDecorationService),
                u(4, d.IRenderService),
                u(5, p.IOptionsService),
                u(6, d.ICoreBrowserService),
              ],
              e
            );
          },
          2950: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (l, t, i, e) {
                  var s,
                    a = arguments.length,
                    v =
                      a < 3
                        ? t
                        : e === null
                        ? (e = Object.getOwnPropertyDescriptor(t, i))
                        : e;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    v = Reflect.decorate(l, t, i, e);
                  else
                    for (var _ = l.length - 1; _ >= 0; _--)
                      (s = l[_]) &&
                        (v =
                          (a < 3 ? s(v) : a > 3 ? s(t, i, v) : s(t, i)) || v);
                  return a > 3 && v && Object.defineProperty(t, i, v), v;
                },
              u =
                (this && this.__param) ||
                function (l, t) {
                  return function (i, e) {
                    t(i, e, l);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CompositionHelper = void 0);
            const n = o(4725),
              d = o(2585),
              f = o(2584);
            let p = (r.CompositionHelper = class {
              get isComposing() {
                return this._isComposing;
              }
              constructor(l, t, i, e, s, a) {
                (this._textarea = l),
                  (this._compositionView = t),
                  (this._bufferService = i),
                  (this._optionsService = e),
                  (this._coreService = s),
                  (this._renderService = a),
                  (this._isComposing = !1),
                  (this._isSendingComposition = !1),
                  (this._compositionPosition = { start: 0, end: 0 }),
                  (this._dataAlreadySent = "");
              }
              compositionstart() {
                (this._isComposing = !0),
                  (this._compositionPosition.start =
                    this._textarea.value.length),
                  (this._compositionView.textContent = ""),
                  (this._dataAlreadySent = ""),
                  this._compositionView.classList.add("active");
              }
              compositionupdate(l) {
                (this._compositionView.textContent = l.data),
                  this.updateCompositionElements(),
                  setTimeout(() => {
                    this._compositionPosition.end = this._textarea.value.length;
                  }, 0);
              }
              compositionend() {
                this._finalizeComposition(!0);
              }
              keydown(l) {
                if (this._isComposing || this._isSendingComposition) {
                  if (
                    l.keyCode === 229 ||
                    l.keyCode === 16 ||
                    l.keyCode === 17 ||
                    l.keyCode === 18
                  )
                    return !1;
                  this._finalizeComposition(!1);
                }
                return (
                  l.keyCode !== 229 || (this._handleAnyTextareaChanges(), !1)
                );
              }
              _finalizeComposition(l) {
                if (
                  (this._compositionView.classList.remove("active"),
                  (this._isComposing = !1),
                  l)
                ) {
                  const t = {
                    start: this._compositionPosition.start,
                    end: this._compositionPosition.end,
                  };
                  (this._isSendingComposition = !0),
                    setTimeout(() => {
                      if (this._isSendingComposition) {
                        let i;
                        (this._isSendingComposition = !1),
                          (t.start += this._dataAlreadySent.length),
                          (i = this._isComposing
                            ? this._textarea.value.substring(t.start, t.end)
                            : this._textarea.value.substring(t.start)),
                          i.length > 0 &&
                            this._coreService.triggerDataEvent(i, !0);
                      }
                    }, 0);
                } else {
                  this._isSendingComposition = !1;
                  const t = this._textarea.value.substring(
                    this._compositionPosition.start,
                    this._compositionPosition.end
                  );
                  this._coreService.triggerDataEvent(t, !0);
                }
              }
              _handleAnyTextareaChanges() {
                const l = this._textarea.value;
                setTimeout(() => {
                  if (!this._isComposing) {
                    const t = this._textarea.value,
                      i = t.replace(l, "");
                    (this._dataAlreadySent = i),
                      t.length > l.length
                        ? this._coreService.triggerDataEvent(i, !0)
                        : t.length < l.length
                        ? this._coreService.triggerDataEvent(`${f.C0.DEL}`, !0)
                        : t.length === l.length &&
                          t !== l &&
                          this._coreService.triggerDataEvent(t, !0);
                  }
                }, 0);
              }
              updateCompositionElements(l) {
                if (this._isComposing) {
                  if (this._bufferService.buffer.isCursorInViewport) {
                    const t = Math.min(
                        this._bufferService.buffer.x,
                        this._bufferService.cols - 1
                      ),
                      i = this._renderService.dimensions.css.cell.height,
                      e =
                        this._bufferService.buffer.y *
                        this._renderService.dimensions.css.cell.height,
                      s = t * this._renderService.dimensions.css.cell.width;
                    (this._compositionView.style.left = s + "px"),
                      (this._compositionView.style.top = e + "px"),
                      (this._compositionView.style.height = i + "px"),
                      (this._compositionView.style.lineHeight = i + "px"),
                      (this._compositionView.style.fontFamily =
                        this._optionsService.rawOptions.fontFamily),
                      (this._compositionView.style.fontSize =
                        this._optionsService.rawOptions.fontSize + "px");
                    const a = this._compositionView.getBoundingClientRect();
                    (this._textarea.style.left = s + "px"),
                      (this._textarea.style.top = e + "px"),
                      (this._textarea.style.width =
                        Math.max(a.width, 1) + "px"),
                      (this._textarea.style.height =
                        Math.max(a.height, 1) + "px"),
                      (this._textarea.style.lineHeight = a.height + "px");
                  }
                  l || setTimeout(() => this.updateCompositionElements(!0), 0);
                }
              }
            });
            r.CompositionHelper = p = h(
              [
                u(2, d.IBufferService),
                u(3, d.IOptionsService),
                u(4, d.ICoreService),
                u(5, n.IRenderService),
              ],
              p
            );
          },
          9806: (L, r) => {
            function o(h, u, n) {
              const d = n.getBoundingClientRect(),
                f = h.getComputedStyle(n),
                p = parseInt(f.getPropertyValue("padding-left")),
                l = parseInt(f.getPropertyValue("padding-top"));
              return [u.clientX - d.left - p, u.clientY - d.top - l];
            }
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.getCoords = r.getCoordsRelativeToElement = void 0),
              (r.getCoordsRelativeToElement = o),
              (r.getCoords = function (h, u, n, d, f, p, l, t, i) {
                if (!p) return;
                const e = o(h, u, n);
                return e
                  ? ((e[0] = Math.ceil((e[0] + (i ? l / 2 : 0)) / l)),
                    (e[1] = Math.ceil(e[1] / t)),
                    (e[0] = Math.min(Math.max(e[0], 1), d + (i ? 1 : 0))),
                    (e[1] = Math.min(Math.max(e[1], 1), f)),
                    e)
                  : void 0;
              });
          },
          9504: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.moveToCellSequence = void 0);
            const h = o(2584);
            function u(t, i, e, s) {
              const a = t - n(t, e),
                v = i - n(i, e),
                _ =
                  Math.abs(a - v) -
                  (function (g, c, m) {
                    let R = 0;
                    const A = g - n(g, m),
                      T = c - n(c, m);
                    for (let k = 0; k < Math.abs(A - T); k++) {
                      const P = d(g, c) === "A" ? -1 : 1;
                      m.buffer.lines.get(A + P * k)?.isWrapped && R++;
                    }
                    return R;
                  })(t, i, e);
              return l(_, p(d(t, i), s));
            }
            function n(t, i) {
              let e = 0,
                s = i.buffer.lines.get(t),
                a = s?.isWrapped;
              for (; a && t >= 0 && t < i.rows; )
                e++, (s = i.buffer.lines.get(--t)), (a = s?.isWrapped);
              return e;
            }
            function d(t, i) {
              return t > i ? "A" : "B";
            }
            function f(t, i, e, s, a, v) {
              let _ = t,
                g = i,
                c = "";
              for (; _ !== e || g !== s; )
                (_ += a ? 1 : -1),
                  a && _ > v.cols - 1
                    ? ((c += v.buffer.translateBufferLineToString(g, !1, t, _)),
                      (_ = 0),
                      (t = 0),
                      g++)
                    : !a &&
                      _ < 0 &&
                      ((c += v.buffer.translateBufferLineToString(
                        g,
                        !1,
                        0,
                        t + 1
                      )),
                      (_ = v.cols - 1),
                      (t = _),
                      g--);
              return c + v.buffer.translateBufferLineToString(g, !1, t, _);
            }
            function p(t, i) {
              const e = i ? "O" : "[";
              return h.C0.ESC + e + t;
            }
            function l(t, i) {
              t = Math.floor(t);
              let e = "";
              for (let s = 0; s < t; s++) e += i;
              return e;
            }
            r.moveToCellSequence = function (t, i, e, s) {
              const a = e.buffer.x,
                v = e.buffer.y;
              if (!e.buffer.hasScrollback)
                return (
                  (function (c, m, R, A, T, k) {
                    return u(m, A, T, k).length === 0
                      ? ""
                      : l(f(c, m, c, m - n(m, T), !1, T).length, p("D", k));
                  })(a, v, 0, i, e, s) +
                  u(v, i, e, s) +
                  (function (c, m, R, A, T, k) {
                    let P;
                    P = u(m, A, T, k).length > 0 ? A - n(A, T) : m;
                    const F = A,
                      U = (function (K, z, S, x, D, O) {
                        let W;
                        return (
                          (W = u(S, x, D, O).length > 0 ? x - n(x, D) : z),
                          (K < S && W <= x) || (K >= S && W < x) ? "C" : "D"
                        );
                      })(c, m, R, A, T, k);
                    return l(f(c, P, R, F, U === "C", T).length, p(U, k));
                  })(a, v, t, i, e, s)
                );
              let _;
              if (v === i)
                return (_ = a > t ? "D" : "C"), l(Math.abs(a - t), p(_, s));
              _ = v > i ? "D" : "C";
              const g = Math.abs(v - i);
              return l(
                (function (c, m) {
                  return m.cols - c;
                })(v > i ? t : a, e) +
                  (g - 1) * e.cols +
                  1 +
                  ((v > i ? a : t) - 1),
                p(_, s)
              );
            };
          },
          1296: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (k, P, F, U) {
                  var K,
                    z = arguments.length,
                    S =
                      z < 3
                        ? P
                        : U === null
                        ? (U = Object.getOwnPropertyDescriptor(P, F))
                        : U;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    S = Reflect.decorate(k, P, F, U);
                  else
                    for (var x = k.length - 1; x >= 0; x--)
                      (K = k[x]) &&
                        (S =
                          (z < 3 ? K(S) : z > 3 ? K(P, F, S) : K(P, F)) || S);
                  return z > 3 && S && Object.defineProperty(P, F, S), S;
                },
              u =
                (this && this.__param) ||
                function (k, P) {
                  return function (F, U) {
                    P(F, U, k);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.DomRenderer = void 0);
            const n = o(3787),
              d = o(2550),
              f = o(2223),
              p = o(6171),
              l = o(6052),
              t = o(4725),
              i = o(8055),
              e = o(8460),
              s = o(844),
              a = o(2585),
              v = "xterm-dom-renderer-owner-",
              _ = "xterm-rows",
              g = "xterm-fg-",
              c = "xterm-bg-",
              m = "xterm-focus",
              R = "xterm-selection";
            let A = 1,
              T = (r.DomRenderer = class extends s.Disposable {
                constructor(k, P, F, U, K, z, S, x, D, O, W, $, V) {
                  super(),
                    (this._terminal = k),
                    (this._document = P),
                    (this._element = F),
                    (this._screenElement = U),
                    (this._viewportElement = K),
                    (this._helperContainer = z),
                    (this._linkifier2 = S),
                    (this._charSizeService = D),
                    (this._optionsService = O),
                    (this._bufferService = W),
                    (this._coreBrowserService = $),
                    (this._themeService = V),
                    (this._terminalClass = A++),
                    (this._rowElements = []),
                    (this._selectionRenderModel = (0,
                    l.createSelectionRenderModel)()),
                    (this.onRequestRedraw = this.register(
                      new e.EventEmitter()
                    ).event),
                    (this._rowContainer = this._document.createElement("div")),
                    this._rowContainer.classList.add(_),
                    (this._rowContainer.style.lineHeight = "normal"),
                    this._rowContainer.setAttribute("aria-hidden", "true"),
                    this._refreshRowElements(
                      this._bufferService.cols,
                      this._bufferService.rows
                    ),
                    (this._selectionContainer =
                      this._document.createElement("div")),
                    this._selectionContainer.classList.add(R),
                    this._selectionContainer.setAttribute(
                      "aria-hidden",
                      "true"
                    ),
                    (this.dimensions = (0, p.createRenderDimensions)()),
                    this._updateDimensions(),
                    this.register(
                      this._optionsService.onOptionChange(() =>
                        this._handleOptionsChanged()
                      )
                    ),
                    this.register(
                      this._themeService.onChangeColors((G) =>
                        this._injectCss(G)
                      )
                    ),
                    this._injectCss(this._themeService.colors),
                    (this._rowFactory = x.createInstance(
                      n.DomRendererRowFactory,
                      document
                    )),
                    this._element.classList.add(v + this._terminalClass),
                    this._screenElement.appendChild(this._rowContainer),
                    this._screenElement.appendChild(this._selectionContainer),
                    this.register(
                      this._linkifier2.onShowLinkUnderline((G) =>
                        this._handleLinkHover(G)
                      )
                    ),
                    this.register(
                      this._linkifier2.onHideLinkUnderline((G) =>
                        this._handleLinkLeave(G)
                      )
                    ),
                    this.register(
                      (0, s.toDisposable)(() => {
                        this._element.classList.remove(v + this._terminalClass),
                          this._rowContainer.remove(),
                          this._selectionContainer.remove(),
                          this._widthCache.dispose(),
                          this._themeStyleElement.remove(),
                          this._dimensionsStyleElement.remove();
                      })
                    ),
                    (this._widthCache = new d.WidthCache(
                      this._document,
                      this._helperContainer
                    )),
                    this._widthCache.setFont(
                      this._optionsService.rawOptions.fontFamily,
                      this._optionsService.rawOptions.fontSize,
                      this._optionsService.rawOptions.fontWeight,
                      this._optionsService.rawOptions.fontWeightBold
                    ),
                    this._setDefaultSpacing();
                }
                _updateDimensions() {
                  const k = this._coreBrowserService.dpr;
                  (this.dimensions.device.char.width =
                    this._charSizeService.width * k),
                    (this.dimensions.device.char.height = Math.ceil(
                      this._charSizeService.height * k
                    )),
                    (this.dimensions.device.cell.width =
                      this.dimensions.device.char.width +
                      Math.round(
                        this._optionsService.rawOptions.letterSpacing
                      )),
                    (this.dimensions.device.cell.height = Math.floor(
                      this.dimensions.device.char.height *
                        this._optionsService.rawOptions.lineHeight
                    )),
                    (this.dimensions.device.char.left = 0),
                    (this.dimensions.device.char.top = 0),
                    (this.dimensions.device.canvas.width =
                      this.dimensions.device.cell.width *
                      this._bufferService.cols),
                    (this.dimensions.device.canvas.height =
                      this.dimensions.device.cell.height *
                      this._bufferService.rows),
                    (this.dimensions.css.canvas.width = Math.round(
                      this.dimensions.device.canvas.width / k
                    )),
                    (this.dimensions.css.canvas.height = Math.round(
                      this.dimensions.device.canvas.height / k
                    )),
                    (this.dimensions.css.cell.width =
                      this.dimensions.css.canvas.width /
                      this._bufferService.cols),
                    (this.dimensions.css.cell.height =
                      this.dimensions.css.canvas.height /
                      this._bufferService.rows);
                  for (const F of this._rowElements)
                    (F.style.width = `${this.dimensions.css.canvas.width}px`),
                      (F.style.height = `${this.dimensions.css.cell.height}px`),
                      (F.style.lineHeight = `${this.dimensions.css.cell.height}px`),
                      (F.style.overflow = "hidden");
                  this._dimensionsStyleElement ||
                    ((this._dimensionsStyleElement =
                      this._document.createElement("style")),
                    this._screenElement.appendChild(
                      this._dimensionsStyleElement
                    ));
                  const P = `${this._terminalSelector} .${_} span { display: inline-block; height: 100%; vertical-align: top;}`;
                  (this._dimensionsStyleElement.textContent = P),
                    (this._selectionContainer.style.height =
                      this._viewportElement.style.height),
                    (this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`),
                    (this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`);
                }
                _injectCss(k) {
                  this._themeStyleElement ||
                    ((this._themeStyleElement =
                      this._document.createElement("style")),
                    this._screenElement.appendChild(this._themeStyleElement));
                  let P = `${this._terminalSelector} .${_} { color: ${k.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
                  (P += `${this._terminalSelector} .${_} .xterm-dim { color: ${
                    i.color.multiplyOpacity(k.foreground, 0.5).css
                  };}`),
                    (P += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`);
                  const F = `blink_underline_${this._terminalClass}`,
                    U = `blink_bar_${this._terminalClass}`,
                    K = `blink_block_${this._terminalClass}`;
                  (P += `@keyframes ${F} { 50% {  border-bottom-style: hidden; }}`),
                    (P += `@keyframes ${U} { 50% {  box-shadow: none; }}`),
                    (P += `@keyframes ${K} { 0% {  background-color: ${k.cursor.css};  color: ${k.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${k.cursor.css}; }}`),
                    (P += `${this._terminalSelector} .${_}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${F} 1s step-end infinite;}${this._terminalSelector} .${_}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${U} 1s step-end infinite;}${this._terminalSelector} .${_}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${K} 1s step-end infinite;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-block { background-color: ${k.cursor.css}; color: ${k.cursorAccent.css};}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${k.cursor.css} !important; color: ${k.cursorAccent.css} !important;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${k.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${k.cursor.css} inset;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${k.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`),
                    (P += `${this._terminalSelector} .${R} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${R} div { position: absolute; background-color: ${k.selectionBackgroundOpaque.css};}${this._terminalSelector} .${R} div { position: absolute; background-color: ${k.selectionInactiveBackgroundOpaque.css};}`);
                  for (const [z, S] of k.ansi.entries())
                    P += `${this._terminalSelector} .${g}${z} { color: ${
                      S.css
                    }; }${
                      this._terminalSelector
                    } .${g}${z}.xterm-dim { color: ${
                      i.color.multiplyOpacity(S, 0.5).css
                    }; }${
                      this._terminalSelector
                    } .${c}${z} { background-color: ${S.css}; }`;
                  (P += `${this._terminalSelector} .${g}${
                    f.INVERTED_DEFAULT_COLOR
                  } { color: ${i.color.opaque(k.background).css}; }${
                    this._terminalSelector
                  } .${g}${f.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${
                    i.color.multiplyOpacity(i.color.opaque(k.background), 0.5)
                      .css
                  }; }${this._terminalSelector} .${c}${
                    f.INVERTED_DEFAULT_COLOR
                  } { background-color: ${k.foreground.css}; }`),
                    (this._themeStyleElement.textContent = P);
                }
                _setDefaultSpacing() {
                  const k =
                    this.dimensions.css.cell.width -
                    this._widthCache.get("W", !1, !1);
                  (this._rowContainer.style.letterSpacing = `${k}px`),
                    (this._rowFactory.defaultSpacing = k);
                }
                handleDevicePixelRatioChange() {
                  this._updateDimensions(),
                    this._widthCache.clear(),
                    this._setDefaultSpacing();
                }
                _refreshRowElements(k, P) {
                  for (let F = this._rowElements.length; F <= P; F++) {
                    const U = this._document.createElement("div");
                    this._rowContainer.appendChild(U),
                      this._rowElements.push(U);
                  }
                  for (; this._rowElements.length > P; )
                    this._rowContainer.removeChild(this._rowElements.pop());
                }
                handleResize(k, P) {
                  this._refreshRowElements(k, P),
                    this._updateDimensions(),
                    this.handleSelectionChanged(
                      this._selectionRenderModel.selectionStart,
                      this._selectionRenderModel.selectionEnd,
                      this._selectionRenderModel.columnSelectMode
                    );
                }
                handleCharSizeChanged() {
                  this._updateDimensions(),
                    this._widthCache.clear(),
                    this._setDefaultSpacing();
                }
                handleBlur() {
                  this._rowContainer.classList.remove(m),
                    this.renderRows(0, this._bufferService.rows - 1);
                }
                handleFocus() {
                  this._rowContainer.classList.add(m),
                    this.renderRows(
                      this._bufferService.buffer.y,
                      this._bufferService.buffer.y
                    );
                }
                handleSelectionChanged(k, P, F) {
                  if (
                    (this._selectionContainer.replaceChildren(),
                    this._rowFactory.handleSelectionChanged(k, P, F),
                    this.renderRows(0, this._bufferService.rows - 1),
                    !k || !P)
                  )
                    return;
                  this._selectionRenderModel.update(this._terminal, k, P, F);
                  const U = this._selectionRenderModel.viewportStartRow,
                    K = this._selectionRenderModel.viewportEndRow,
                    z = this._selectionRenderModel.viewportCappedStartRow,
                    S = this._selectionRenderModel.viewportCappedEndRow;
                  if (z >= this._bufferService.rows || S < 0) return;
                  const x = this._document.createDocumentFragment();
                  if (F) {
                    const D = k[0] > P[0];
                    x.appendChild(
                      this._createSelectionElement(
                        z,
                        D ? P[0] : k[0],
                        D ? k[0] : P[0],
                        S - z + 1
                      )
                    );
                  } else {
                    const D = U === z ? k[0] : 0,
                      O = z === K ? P[0] : this._bufferService.cols;
                    x.appendChild(this._createSelectionElement(z, D, O));
                    const W = S - z - 1;
                    if (
                      (x.appendChild(
                        this._createSelectionElement(
                          z + 1,
                          0,
                          this._bufferService.cols,
                          W
                        )
                      ),
                      z !== S)
                    ) {
                      const $ = K === S ? P[0] : this._bufferService.cols;
                      x.appendChild(this._createSelectionElement(S, 0, $));
                    }
                  }
                  this._selectionContainer.appendChild(x);
                }
                _createSelectionElement(k, P, F, U = 1) {
                  const K = this._document.createElement("div"),
                    z = P * this.dimensions.css.cell.width;
                  let S = this.dimensions.css.cell.width * (F - P);
                  return (
                    z + S > this.dimensions.css.canvas.width &&
                      (S = this.dimensions.css.canvas.width - z),
                    (K.style.height =
                      U * this.dimensions.css.cell.height + "px"),
                    (K.style.top = k * this.dimensions.css.cell.height + "px"),
                    (K.style.left = `${z}px`),
                    (K.style.width = `${S}px`),
                    K
                  );
                }
                handleCursorMove() {}
                _handleOptionsChanged() {
                  this._updateDimensions(),
                    this._injectCss(this._themeService.colors),
                    this._widthCache.setFont(
                      this._optionsService.rawOptions.fontFamily,
                      this._optionsService.rawOptions.fontSize,
                      this._optionsService.rawOptions.fontWeight,
                      this._optionsService.rawOptions.fontWeightBold
                    ),
                    this._setDefaultSpacing();
                }
                clear() {
                  for (const k of this._rowElements) k.replaceChildren();
                }
                renderRows(k, P) {
                  const F = this._bufferService.buffer,
                    U = F.ybase + F.y,
                    K = Math.min(F.x, this._bufferService.cols - 1),
                    z = this._optionsService.rawOptions.cursorBlink,
                    S = this._optionsService.rawOptions.cursorStyle,
                    x = this._optionsService.rawOptions.cursorInactiveStyle;
                  for (let D = k; D <= P; D++) {
                    const O = D + F.ydisp,
                      W = this._rowElements[D],
                      $ = F.lines.get(O);
                    if (!W || !$) break;
                    W.replaceChildren(
                      ...this._rowFactory.createRow(
                        $,
                        O,
                        O === U,
                        S,
                        x,
                        K,
                        z,
                        this.dimensions.css.cell.width,
                        this._widthCache,
                        -1,
                        -1
                      )
                    );
                  }
                }
                get _terminalSelector() {
                  return `.${v}${this._terminalClass}`;
                }
                _handleLinkHover(k) {
                  this._setCellUnderline(k.x1, k.x2, k.y1, k.y2, k.cols, !0);
                }
                _handleLinkLeave(k) {
                  this._setCellUnderline(k.x1, k.x2, k.y1, k.y2, k.cols, !1);
                }
                _setCellUnderline(k, P, F, U, K, z) {
                  F < 0 && (k = 0), U < 0 && (P = 0);
                  const S = this._bufferService.rows - 1;
                  (F = Math.max(Math.min(F, S), 0)),
                    (U = Math.max(Math.min(U, S), 0)),
                    (K = Math.min(K, this._bufferService.cols));
                  const x = this._bufferService.buffer,
                    D = x.ybase + x.y,
                    O = Math.min(x.x, K - 1),
                    W = this._optionsService.rawOptions.cursorBlink,
                    $ = this._optionsService.rawOptions.cursorStyle,
                    V = this._optionsService.rawOptions.cursorInactiveStyle;
                  for (let G = F; G <= U; ++G) {
                    const M = G + x.ydisp,
                      y = this._rowElements[G],
                      I = x.lines.get(M);
                    if (!y || !I) break;
                    y.replaceChildren(
                      ...this._rowFactory.createRow(
                        I,
                        M,
                        M === D,
                        $,
                        V,
                        O,
                        W,
                        this.dimensions.css.cell.width,
                        this._widthCache,
                        z ? (G === F ? k : 0) : -1,
                        z ? (G === U ? P : K) - 1 : -1
                      )
                    );
                  }
                }
              });
            r.DomRenderer = T = h(
              [
                u(7, a.IInstantiationService),
                u(8, t.ICharSizeService),
                u(9, a.IOptionsService),
                u(10, a.IBufferService),
                u(11, t.ICoreBrowserService),
                u(12, t.IThemeService),
              ],
              T
            );
          },
          3787: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (_, g, c, m) {
                  var R,
                    A = arguments.length,
                    T =
                      A < 3
                        ? g
                        : m === null
                        ? (m = Object.getOwnPropertyDescriptor(g, c))
                        : m;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    T = Reflect.decorate(_, g, c, m);
                  else
                    for (var k = _.length - 1; k >= 0; k--)
                      (R = _[k]) &&
                        (T =
                          (A < 3 ? R(T) : A > 3 ? R(g, c, T) : R(g, c)) || T);
                  return A > 3 && T && Object.defineProperty(g, c, T), T;
                },
              u =
                (this && this.__param) ||
                function (_, g) {
                  return function (c, m) {
                    g(c, m, _);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.DomRendererRowFactory = void 0);
            const n = o(2223),
              d = o(643),
              f = o(511),
              p = o(2585),
              l = o(8055),
              t = o(4725),
              i = o(4269),
              e = o(6171),
              s = o(3734);
            let a = (r.DomRendererRowFactory = class {
              constructor(_, g, c, m, R, A, T) {
                (this._document = _),
                  (this._characterJoinerService = g),
                  (this._optionsService = c),
                  (this._coreBrowserService = m),
                  (this._coreService = R),
                  (this._decorationService = A),
                  (this._themeService = T),
                  (this._workCell = new f.CellData()),
                  (this._columnSelectMode = !1),
                  (this.defaultSpacing = 0);
              }
              handleSelectionChanged(_, g, c) {
                (this._selectionStart = _),
                  (this._selectionEnd = g),
                  (this._columnSelectMode = c);
              }
              createRow(_, g, c, m, R, A, T, k, P, F, U) {
                const K = [],
                  z = this._characterJoinerService.getJoinedCharacters(g),
                  S = this._themeService.colors;
                let x,
                  D = _.getNoBgTrimmedLength();
                c && D < A + 1 && (D = A + 1);
                let O = 0,
                  W = "",
                  $ = 0,
                  V = 0,
                  G = 0,
                  M = !1,
                  y = 0,
                  I = !1,
                  N = 0;
                const q = [],
                  j = F !== -1 && U !== -1;
                for (let Y = 0; Y < D; Y++) {
                  _.loadCell(Y, this._workCell);
                  let Z = this._workCell.getWidth();
                  if (Z === 0) continue;
                  let Q = !1,
                    ee = Y,
                    X = this._workCell;
                  if (z.length > 0 && Y === z[0][0]) {
                    Q = !0;
                    const J = z.shift();
                    (X = new i.JoinedCellData(
                      this._workCell,
                      _.translateToString(!0, J[0], J[1]),
                      J[1] - J[0]
                    )),
                      (ee = J[1] - 1),
                      (Z = X.getWidth());
                  }
                  const fe = this._isCellInSelection(Y, g),
                    Ae = c && Y === A,
                    Oe = j && Y >= F && Y <= U;
                  let Te = !1;
                  this._decorationService.forEachDecorationAtCell(
                    Y,
                    g,
                    void 0,
                    (J) => {
                      Te = !0;
                    }
                  );
                  let be = X.getChars() || d.WHITESPACE_CELL_CHAR;
                  if (
                    (be === " " &&
                      (X.isUnderline() || X.isOverline()) &&
                      (be = " "),
                    (N = Z * k - P.get(be, X.isBold(), X.isItalic())),
                    x)
                  ) {
                    if (
                      O &&
                      ((fe && I) || (!fe && !I && X.bg === $)) &&
                      ((fe && I && S.selectionForeground) || X.fg === V) &&
                      X.extended.ext === G &&
                      Oe === M &&
                      N === y &&
                      !Ae &&
                      !Q &&
                      !Te
                    ) {
                      X.isInvisible()
                        ? (W += d.WHITESPACE_CELL_CHAR)
                        : (W += be),
                        O++;
                      continue;
                    }
                    O && (x.textContent = W),
                      (x = this._document.createElement("span")),
                      (O = 0),
                      (W = "");
                  } else x = this._document.createElement("span");
                  if (
                    (($ = X.bg),
                    (V = X.fg),
                    (G = X.extended.ext),
                    (M = Oe),
                    (y = N),
                    (I = fe),
                    Q && A >= Y && A <= ee && (A = Y),
                    !this._coreService.isCursorHidden &&
                      Ae &&
                      this._coreService.isCursorInitialized)
                  ) {
                    if (
                      (q.push("xterm-cursor"),
                      this._coreBrowserService.isFocused)
                    )
                      T && q.push("xterm-cursor-blink"),
                        q.push(
                          m === "bar"
                            ? "xterm-cursor-bar"
                            : m === "underline"
                            ? "xterm-cursor-underline"
                            : "xterm-cursor-block"
                        );
                    else if (R)
                      switch (R) {
                        case "outline":
                          q.push("xterm-cursor-outline");
                          break;
                        case "block":
                          q.push("xterm-cursor-block");
                          break;
                        case "bar":
                          q.push("xterm-cursor-bar");
                          break;
                        case "underline":
                          q.push("xterm-cursor-underline");
                      }
                  }
                  if (
                    (X.isBold() && q.push("xterm-bold"),
                    X.isItalic() && q.push("xterm-italic"),
                    X.isDim() && q.push("xterm-dim"),
                    (W = X.isInvisible()
                      ? d.WHITESPACE_CELL_CHAR
                      : X.getChars() || d.WHITESPACE_CELL_CHAR),
                    X.isUnderline() &&
                      (q.push(`xterm-underline-${X.extended.underlineStyle}`),
                      W === " " && (W = " "),
                      !X.isUnderlineColorDefault()))
                  )
                    if (X.isUnderlineColorRGB())
                      x.style.textDecorationColor = `rgb(${s.AttributeData.toColorRGB(
                        X.getUnderlineColor()
                      ).join(",")})`;
                    else {
                      let J = X.getUnderlineColor();
                      this._optionsService.rawOptions
                        .drawBoldTextInBrightColors &&
                        X.isBold() &&
                        J < 8 &&
                        (J += 8),
                        (x.style.textDecorationColor = S.ansi[J].css);
                    }
                  X.isOverline() &&
                    (q.push("xterm-overline"), W === " " && (W = " ")),
                    X.isStrikethrough() && q.push("xterm-strikethrough"),
                    Oe && (x.style.textDecoration = "underline");
                  let ie = X.getFgColor(),
                    _e = X.getFgColorMode(),
                    re = X.getBgColor(),
                    ve = X.getBgColorMode();
                  const Be = !!X.isInverse();
                  if (Be) {
                    const J = ie;
                    (ie = re), (re = J);
                    const gt = _e;
                    (_e = ve), (ve = gt);
                  }
                  let ne,
                    Ce,
                    oe,
                    pe = !1;
                  switch (
                    (this._decorationService.forEachDecorationAtCell(
                      Y,
                      g,
                      void 0,
                      (J) => {
                        (J.options.layer !== "top" && pe) ||
                          (J.backgroundColorRGB &&
                            ((ve = 50331648),
                            (re = (J.backgroundColorRGB.rgba >> 8) & 16777215),
                            (ne = J.backgroundColorRGB)),
                          J.foregroundColorRGB &&
                            ((_e = 50331648),
                            (ie = (J.foregroundColorRGB.rgba >> 8) & 16777215),
                            (Ce = J.foregroundColorRGB)),
                          (pe = J.options.layer === "top"));
                      }
                    ),
                    !pe &&
                      fe &&
                      ((ne = this._coreBrowserService.isFocused
                        ? S.selectionBackgroundOpaque
                        : S.selectionInactiveBackgroundOpaque),
                      (re = (ne.rgba >> 8) & 16777215),
                      (ve = 50331648),
                      (pe = !0),
                      S.selectionForeground &&
                        ((_e = 50331648),
                        (ie = (S.selectionForeground.rgba >> 8) & 16777215),
                        (Ce = S.selectionForeground))),
                    pe && q.push("xterm-decoration-top"),
                    ve)
                  ) {
                    case 16777216:
                    case 33554432:
                      (oe = S.ansi[re]), q.push(`xterm-bg-${re}`);
                      break;
                    case 50331648:
                      (oe = l.channels.toColor(
                        re >> 16,
                        (re >> 8) & 255,
                        255 & re
                      )),
                        this._addStyle(
                          x,
                          `background-color:#${v(
                            (re >>> 0).toString(16),
                            "0",
                            6
                          )}`
                        );
                      break;
                    default:
                      Be
                        ? ((oe = S.foreground),
                          q.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`))
                        : (oe = S.background);
                  }
                  switch (
                    (ne ||
                      (X.isDim() && (ne = l.color.multiplyOpacity(oe, 0.5))),
                    _e)
                  ) {
                    case 16777216:
                    case 33554432:
                      X.isBold() &&
                        ie < 8 &&
                        this._optionsService.rawOptions
                          .drawBoldTextInBrightColors &&
                        (ie += 8),
                        this._applyMinimumContrast(
                          x,
                          oe,
                          S.ansi[ie],
                          X,
                          ne,
                          void 0
                        ) || q.push(`xterm-fg-${ie}`);
                      break;
                    case 50331648:
                      const J = l.channels.toColor(
                        (ie >> 16) & 255,
                        (ie >> 8) & 255,
                        255 & ie
                      );
                      this._applyMinimumContrast(x, oe, J, X, ne, Ce) ||
                        this._addStyle(
                          x,
                          `color:#${v(ie.toString(16), "0", 6)}`
                        );
                      break;
                    default:
                      this._applyMinimumContrast(
                        x,
                        oe,
                        S.foreground,
                        X,
                        ne,
                        Ce
                      ) ||
                        (Be && q.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`));
                  }
                  q.length && ((x.className = q.join(" ")), (q.length = 0)),
                    Ae || Q || Te ? (x.textContent = W) : O++,
                    N !== this.defaultSpacing &&
                      (x.style.letterSpacing = `${N}px`),
                    K.push(x),
                    (Y = ee);
                }
                return x && O && (x.textContent = W), K;
              }
              _applyMinimumContrast(_, g, c, m, R, A) {
                if (
                  this._optionsService.rawOptions.minimumContrastRatio === 1 ||
                  (0, e.treatGlyphAsBackgroundColor)(m.getCode())
                )
                  return !1;
                const T = this._getContrastCache(m);
                let k;
                if (
                  (R || A || (k = T.getColor(g.rgba, c.rgba)), k === void 0)
                ) {
                  const P =
                    this._optionsService.rawOptions.minimumContrastRatio /
                    (m.isDim() ? 2 : 1);
                  (k = l.color.ensureContrastRatio(R || g, A || c, P)),
                    T.setColor((R || g).rgba, (A || c).rgba, k ?? null);
                }
                return !!k && (this._addStyle(_, `color:${k.css}`), !0);
              }
              _getContrastCache(_) {
                return _.isDim()
                  ? this._themeService.colors.halfContrastCache
                  : this._themeService.colors.contrastCache;
              }
              _addStyle(_, g) {
                _.setAttribute(
                  "style",
                  `${_.getAttribute("style") || ""}${g};`
                );
              }
              _isCellInSelection(_, g) {
                const c = this._selectionStart,
                  m = this._selectionEnd;
                return (
                  !(!c || !m) &&
                  (this._columnSelectMode
                    ? c[0] <= m[0]
                      ? _ >= c[0] && g >= c[1] && _ < m[0] && g <= m[1]
                      : _ < c[0] && g >= c[1] && _ >= m[0] && g <= m[1]
                    : (g > c[1] && g < m[1]) ||
                      (c[1] === m[1] && g === c[1] && _ >= c[0] && _ < m[0]) ||
                      (c[1] < m[1] && g === m[1] && _ < m[0]) ||
                      (c[1] < m[1] && g === c[1] && _ >= c[0]))
                );
              }
            });
            function v(_, g, c) {
              for (; _.length < c; ) _ = g + _;
              return _;
            }
            r.DomRendererRowFactory = a = h(
              [
                u(1, t.ICharacterJoinerService),
                u(2, p.IOptionsService),
                u(3, t.ICoreBrowserService),
                u(4, p.ICoreService),
                u(5, p.IDecorationService),
                u(6, t.IThemeService),
              ],
              a
            );
          },
          2550: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.WidthCache = void 0),
              (r.WidthCache = class {
                constructor(o, h) {
                  (this._flat = new Float32Array(256)),
                    (this._font = ""),
                    (this._fontSize = 0),
                    (this._weight = "normal"),
                    (this._weightBold = "bold"),
                    (this._measureElements = []),
                    (this._container = o.createElement("div")),
                    this._container.classList.add(
                      "xterm-width-cache-measure-container"
                    ),
                    this._container.setAttribute("aria-hidden", "true"),
                    (this._container.style.whiteSpace = "pre"),
                    (this._container.style.fontKerning = "none");
                  const u = o.createElement("span");
                  u.classList.add("xterm-char-measure-element");
                  const n = o.createElement("span");
                  n.classList.add("xterm-char-measure-element"),
                    (n.style.fontWeight = "bold");
                  const d = o.createElement("span");
                  d.classList.add("xterm-char-measure-element"),
                    (d.style.fontStyle = "italic");
                  const f = o.createElement("span");
                  f.classList.add("xterm-char-measure-element"),
                    (f.style.fontWeight = "bold"),
                    (f.style.fontStyle = "italic"),
                    (this._measureElements = [u, n, d, f]),
                    this._container.appendChild(u),
                    this._container.appendChild(n),
                    this._container.appendChild(d),
                    this._container.appendChild(f),
                    h.appendChild(this._container),
                    this.clear();
                }
                dispose() {
                  this._container.remove(),
                    (this._measureElements.length = 0),
                    (this._holey = void 0);
                }
                clear() {
                  this._flat.fill(-9999), (this._holey = new Map());
                }
                setFont(o, h, u, n) {
                  (o === this._font &&
                    h === this._fontSize &&
                    u === this._weight &&
                    n === this._weightBold) ||
                    ((this._font = o),
                    (this._fontSize = h),
                    (this._weight = u),
                    (this._weightBold = n),
                    (this._container.style.fontFamily = this._font),
                    (this._container.style.fontSize = `${this._fontSize}px`),
                    (this._measureElements[0].style.fontWeight = `${u}`),
                    (this._measureElements[1].style.fontWeight = `${n}`),
                    (this._measureElements[2].style.fontWeight = `${u}`),
                    (this._measureElements[3].style.fontWeight = `${n}`),
                    this.clear());
                }
                get(o, h, u) {
                  let n = 0;
                  if (
                    !h &&
                    !u &&
                    o.length === 1 &&
                    (n = o.charCodeAt(0)) < 256
                  ) {
                    if (this._flat[n] !== -9999) return this._flat[n];
                    const p = this._measure(o, 0);
                    return p > 0 && (this._flat[n] = p), p;
                  }
                  let d = o;
                  h && (d += "B"), u && (d += "I");
                  let f = this._holey.get(d);
                  if (f === void 0) {
                    let p = 0;
                    h && (p |= 1),
                      u && (p |= 2),
                      (f = this._measure(o, p)),
                      f > 0 && this._holey.set(d, f);
                  }
                  return f;
                }
                _measure(o, h) {
                  const u = this._measureElements[h];
                  return (u.textContent = o.repeat(32)), u.offsetWidth / 32;
                }
              });
          },
          2223: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.TEXT_BASELINE =
                r.DIM_OPACITY =
                r.INVERTED_DEFAULT_COLOR =
                  void 0);
            const h = o(6114);
            (r.INVERTED_DEFAULT_COLOR = 257),
              (r.DIM_OPACITY = 0.5),
              (r.TEXT_BASELINE =
                h.isFirefox || h.isLegacyEdge ? "bottom" : "ideographic");
          },
          6171: (L, r) => {
            function o(u) {
              return 57508 <= u && u <= 57558;
            }
            function h(u) {
              return (
                (u >= 128512 && u <= 128591) ||
                (u >= 127744 && u <= 128511) ||
                (u >= 128640 && u <= 128767) ||
                (u >= 9728 && u <= 9983) ||
                (u >= 9984 && u <= 10175) ||
                (u >= 65024 && u <= 65039) ||
                (u >= 129280 && u <= 129535) ||
                (u >= 127462 && u <= 127487)
              );
            }
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.computeNextVariantOffset =
                r.createRenderDimensions =
                r.treatGlyphAsBackgroundColor =
                r.allowRescaling =
                r.isEmoji =
                r.isRestrictedPowerlineGlyph =
                r.isPowerlineGlyph =
                r.throwIfFalsy =
                  void 0),
              (r.throwIfFalsy = function (u) {
                if (!u) throw new Error("value must not be falsy");
                return u;
              }),
              (r.isPowerlineGlyph = o),
              (r.isRestrictedPowerlineGlyph = function (u) {
                return 57520 <= u && u <= 57527;
              }),
              (r.isEmoji = h),
              (r.allowRescaling = function (u, n, d, f) {
                return (
                  n === 1 &&
                  d > Math.ceil(1.5 * f) &&
                  u !== void 0 &&
                  u > 255 &&
                  !h(u) &&
                  !o(u) &&
                  !(function (p) {
                    return 57344 <= p && p <= 63743;
                  })(u)
                );
              }),
              (r.treatGlyphAsBackgroundColor = function (u) {
                return (
                  o(u) ||
                  (function (n) {
                    return 9472 <= n && n <= 9631;
                  })(u)
                );
              }),
              (r.createRenderDimensions = function () {
                return {
                  css: {
                    canvas: { width: 0, height: 0 },
                    cell: { width: 0, height: 0 },
                  },
                  device: {
                    canvas: { width: 0, height: 0 },
                    cell: { width: 0, height: 0 },
                    char: { width: 0, height: 0, left: 0, top: 0 },
                  },
                };
              }),
              (r.computeNextVariantOffset = function (u, n, d = 0) {
                return (u - (2 * Math.round(n) - d)) % (2 * Math.round(n));
              });
          },
          6052: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.createSelectionRenderModel = void 0);
            class o {
              constructor() {
                this.clear();
              }
              clear() {
                (this.hasSelection = !1),
                  (this.columnSelectMode = !1),
                  (this.viewportStartRow = 0),
                  (this.viewportEndRow = 0),
                  (this.viewportCappedStartRow = 0),
                  (this.viewportCappedEndRow = 0),
                  (this.startCol = 0),
                  (this.endCol = 0),
                  (this.selectionStart = void 0),
                  (this.selectionEnd = void 0);
              }
              update(u, n, d, f = !1) {
                if (
                  ((this.selectionStart = n),
                  (this.selectionEnd = d),
                  !n || !d || (n[0] === d[0] && n[1] === d[1]))
                )
                  return void this.clear();
                const p = u.buffers.active.ydisp,
                  l = n[1] - p,
                  t = d[1] - p,
                  i = Math.max(l, 0),
                  e = Math.min(t, u.rows - 1);
                i >= u.rows || e < 0
                  ? this.clear()
                  : ((this.hasSelection = !0),
                    (this.columnSelectMode = f),
                    (this.viewportStartRow = l),
                    (this.viewportEndRow = t),
                    (this.viewportCappedStartRow = i),
                    (this.viewportCappedEndRow = e),
                    (this.startCol = n[0]),
                    (this.endCol = d[0]));
              }
              isCellSelected(u, n, d) {
                return (
                  !!this.hasSelection &&
                  ((d -= u.buffer.active.viewportY),
                  this.columnSelectMode
                    ? this.startCol <= this.endCol
                      ? n >= this.startCol &&
                        d >= this.viewportCappedStartRow &&
                        n < this.endCol &&
                        d <= this.viewportCappedEndRow
                      : n < this.startCol &&
                        d >= this.viewportCappedStartRow &&
                        n >= this.endCol &&
                        d <= this.viewportCappedEndRow
                    : (d > this.viewportStartRow && d < this.viewportEndRow) ||
                      (this.viewportStartRow === this.viewportEndRow &&
                        d === this.viewportStartRow &&
                        n >= this.startCol &&
                        n < this.endCol) ||
                      (this.viewportStartRow < this.viewportEndRow &&
                        d === this.viewportEndRow &&
                        n < this.endCol) ||
                      (this.viewportStartRow < this.viewportEndRow &&
                        d === this.viewportStartRow &&
                        n >= this.startCol))
                );
              }
            }
            r.createSelectionRenderModel = function () {
              return new o();
            };
          },
          456: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.SelectionModel = void 0),
              (r.SelectionModel = class {
                constructor(o) {
                  (this._bufferService = o),
                    (this.isSelectAllActive = !1),
                    (this.selectionStartLength = 0);
                }
                clearSelection() {
                  (this.selectionStart = void 0),
                    (this.selectionEnd = void 0),
                    (this.isSelectAllActive = !1),
                    (this.selectionStartLength = 0);
                }
                get finalSelectionStart() {
                  return this.isSelectAllActive
                    ? [0, 0]
                    : this.selectionEnd &&
                      this.selectionStart &&
                      this.areSelectionValuesReversed()
                    ? this.selectionEnd
                    : this.selectionStart;
                }
                get finalSelectionEnd() {
                  if (this.isSelectAllActive)
                    return [
                      this._bufferService.cols,
                      this._bufferService.buffer.ybase +
                        this._bufferService.rows -
                        1,
                    ];
                  if (this.selectionStart) {
                    if (
                      !this.selectionEnd ||
                      this.areSelectionValuesReversed()
                    ) {
                      const o =
                        this.selectionStart[0] + this.selectionStartLength;
                      return o > this._bufferService.cols
                        ? o % this._bufferService.cols == 0
                          ? [
                              this._bufferService.cols,
                              this.selectionStart[1] +
                                Math.floor(o / this._bufferService.cols) -
                                1,
                            ]
                          : [
                              o % this._bufferService.cols,
                              this.selectionStart[1] +
                                Math.floor(o / this._bufferService.cols),
                            ]
                        : [o, this.selectionStart[1]];
                    }
                    if (
                      this.selectionStartLength &&
                      this.selectionEnd[1] === this.selectionStart[1]
                    ) {
                      const o =
                        this.selectionStart[0] + this.selectionStartLength;
                      return o > this._bufferService.cols
                        ? [
                            o % this._bufferService.cols,
                            this.selectionStart[1] +
                              Math.floor(o / this._bufferService.cols),
                          ]
                        : [
                            Math.max(o, this.selectionEnd[0]),
                            this.selectionEnd[1],
                          ];
                    }
                    return this.selectionEnd;
                  }
                }
                areSelectionValuesReversed() {
                  const o = this.selectionStart,
                    h = this.selectionEnd;
                  return (
                    !(!o || !h) &&
                    (o[1] > h[1] || (o[1] === h[1] && o[0] > h[0]))
                  );
                }
                handleTrim(o) {
                  return (
                    this.selectionStart && (this.selectionStart[1] -= o),
                    this.selectionEnd && (this.selectionEnd[1] -= o),
                    this.selectionEnd && this.selectionEnd[1] < 0
                      ? (this.clearSelection(), !0)
                      : (this.selectionStart &&
                          this.selectionStart[1] < 0 &&
                          (this.selectionStart[1] = 0),
                        !1)
                  );
                }
              });
          },
          428: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (e, s, a, v) {
                  var _,
                    g = arguments.length,
                    c =
                      g < 3
                        ? s
                        : v === null
                        ? (v = Object.getOwnPropertyDescriptor(s, a))
                        : v;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    c = Reflect.decorate(e, s, a, v);
                  else
                    for (var m = e.length - 1; m >= 0; m--)
                      (_ = e[m]) &&
                        (c =
                          (g < 3 ? _(c) : g > 3 ? _(s, a, c) : _(s, a)) || c);
                  return g > 3 && c && Object.defineProperty(s, a, c), c;
                },
              u =
                (this && this.__param) ||
                function (e, s) {
                  return function (a, v) {
                    s(a, v, e);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CharSizeService = void 0);
            const n = o(2585),
              d = o(8460),
              f = o(844);
            let p = (r.CharSizeService = class extends f.Disposable {
              get hasValidSize() {
                return this.width > 0 && this.height > 0;
              }
              constructor(e, s, a) {
                super(),
                  (this._optionsService = a),
                  (this.width = 0),
                  (this.height = 0),
                  (this._onCharSizeChange = this.register(
                    new d.EventEmitter()
                  )),
                  (this.onCharSizeChange = this._onCharSizeChange.event);
                try {
                  this._measureStrategy = this.register(
                    new i(this._optionsService)
                  );
                } catch {
                  this._measureStrategy = this.register(
                    new t(e, s, this._optionsService)
                  );
                }
                this.register(
                  this._optionsService.onMultipleOptionChange(
                    ["fontFamily", "fontSize"],
                    () => this.measure()
                  )
                );
              }
              measure() {
                const e = this._measureStrategy.measure();
                (e.width === this.width && e.height === this.height) ||
                  ((this.width = e.width),
                  (this.height = e.height),
                  this._onCharSizeChange.fire());
              }
            });
            r.CharSizeService = p = h([u(2, n.IOptionsService)], p);
            class l extends f.Disposable {
              constructor() {
                super(...arguments), (this._result = { width: 0, height: 0 });
              }
              _validateAndSet(s, a) {
                s !== void 0 &&
                  s > 0 &&
                  a !== void 0 &&
                  a > 0 &&
                  ((this._result.width = s), (this._result.height = a));
              }
            }
            class t extends l {
              constructor(s, a, v) {
                super(),
                  (this._document = s),
                  (this._parentElement = a),
                  (this._optionsService = v),
                  (this._measureElement = this._document.createElement("span")),
                  this._measureElement.classList.add(
                    "xterm-char-measure-element"
                  ),
                  (this._measureElement.textContent = "W".repeat(32)),
                  this._measureElement.setAttribute("aria-hidden", "true"),
                  (this._measureElement.style.whiteSpace = "pre"),
                  (this._measureElement.style.fontKerning = "none"),
                  this._parentElement.appendChild(this._measureElement);
              }
              measure() {
                return (
                  (this._measureElement.style.fontFamily =
                    this._optionsService.rawOptions.fontFamily),
                  (this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`),
                  this._validateAndSet(
                    Number(this._measureElement.offsetWidth) / 32,
                    Number(this._measureElement.offsetHeight)
                  ),
                  this._result
                );
              }
            }
            class i extends l {
              constructor(s) {
                super(),
                  (this._optionsService = s),
                  (this._canvas = new OffscreenCanvas(100, 100)),
                  (this._ctx = this._canvas.getContext("2d"));
                const a = this._ctx.measureText("W");
                if (
                  !(
                    "width" in a &&
                    "fontBoundingBoxAscent" in a &&
                    "fontBoundingBoxDescent" in a
                  )
                )
                  throw new Error("Required font metrics not supported");
              }
              measure() {
                this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
                const s = this._ctx.measureText("W");
                return (
                  this._validateAndSet(
                    s.width,
                    s.fontBoundingBoxAscent + s.fontBoundingBoxDescent
                  ),
                  this._result
                );
              }
            }
          },
          4269: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (i, e, s, a) {
                  var v,
                    _ = arguments.length,
                    g =
                      _ < 3
                        ? e
                        : a === null
                        ? (a = Object.getOwnPropertyDescriptor(e, s))
                        : a;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    g = Reflect.decorate(i, e, s, a);
                  else
                    for (var c = i.length - 1; c >= 0; c--)
                      (v = i[c]) &&
                        (g =
                          (_ < 3 ? v(g) : _ > 3 ? v(e, s, g) : v(e, s)) || g);
                  return _ > 3 && g && Object.defineProperty(e, s, g), g;
                },
              u =
                (this && this.__param) ||
                function (i, e) {
                  return function (s, a) {
                    e(s, a, i);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CharacterJoinerService = r.JoinedCellData = void 0);
            const n = o(3734),
              d = o(643),
              f = o(511),
              p = o(2585);
            class l extends n.AttributeData {
              constructor(e, s, a) {
                super(),
                  (this.content = 0),
                  (this.combinedData = ""),
                  (this.fg = e.fg),
                  (this.bg = e.bg),
                  (this.combinedData = s),
                  (this._width = a);
              }
              isCombined() {
                return 2097152;
              }
              getWidth() {
                return this._width;
              }
              getChars() {
                return this.combinedData;
              }
              getCode() {
                return 2097151;
              }
              setFromCharData(e) {
                throw new Error("not implemented");
              }
              getAsCharData() {
                return [
                  this.fg,
                  this.getChars(),
                  this.getWidth(),
                  this.getCode(),
                ];
              }
            }
            r.JoinedCellData = l;
            let t = (r.CharacterJoinerService = class _t {
              constructor(e) {
                (this._bufferService = e),
                  (this._characterJoiners = []),
                  (this._nextCharacterJoinerId = 0),
                  (this._workCell = new f.CellData());
              }
              register(e) {
                const s = { id: this._nextCharacterJoinerId++, handler: e };
                return this._characterJoiners.push(s), s.id;
              }
              deregister(e) {
                for (let s = 0; s < this._characterJoiners.length; s++)
                  if (this._characterJoiners[s].id === e)
                    return this._characterJoiners.splice(s, 1), !0;
                return !1;
              }
              getJoinedCharacters(e) {
                if (this._characterJoiners.length === 0) return [];
                const s = this._bufferService.buffer.lines.get(e);
                if (!s || s.length === 0) return [];
                const a = [],
                  v = s.translateToString(!0);
                let _ = 0,
                  g = 0,
                  c = 0,
                  m = s.getFg(0),
                  R = s.getBg(0);
                for (let A = 0; A < s.getTrimmedLength(); A++)
                  if (
                    (s.loadCell(A, this._workCell),
                    this._workCell.getWidth() !== 0)
                  ) {
                    if (this._workCell.fg !== m || this._workCell.bg !== R) {
                      if (A - _ > 1) {
                        const T = this._getJoinedRanges(v, c, g, s, _);
                        for (let k = 0; k < T.length; k++) a.push(T[k]);
                      }
                      (_ = A),
                        (c = g),
                        (m = this._workCell.fg),
                        (R = this._workCell.bg);
                    }
                    g +=
                      this._workCell.getChars().length ||
                      d.WHITESPACE_CELL_CHAR.length;
                  }
                if (this._bufferService.cols - _ > 1) {
                  const A = this._getJoinedRanges(v, c, g, s, _);
                  for (let T = 0; T < A.length; T++) a.push(A[T]);
                }
                return a;
              }
              _getJoinedRanges(e, s, a, v, _) {
                const g = e.substring(s, a);
                let c = [];
                try {
                  c = this._characterJoiners[0].handler(g);
                } catch (m) {
                  console.error(m);
                }
                for (let m = 1; m < this._characterJoiners.length; m++)
                  try {
                    const R = this._characterJoiners[m].handler(g);
                    for (let A = 0; A < R.length; A++) _t._mergeRanges(c, R[A]);
                  } catch (R) {
                    console.error(R);
                  }
                return this._stringRangesToCellRanges(c, v, _), c;
              }
              _stringRangesToCellRanges(e, s, a) {
                let v = 0,
                  _ = !1,
                  g = 0,
                  c = e[v];
                if (c) {
                  for (let m = a; m < this._bufferService.cols; m++) {
                    const R = s.getWidth(m),
                      A =
                        s.getString(m).length || d.WHITESPACE_CELL_CHAR.length;
                    if (R !== 0) {
                      if (
                        (!_ && c[0] <= g && ((c[0] = m), (_ = !0)), c[1] <= g)
                      ) {
                        if (((c[1] = m), (c = e[++v]), !c)) break;
                        c[0] <= g ? ((c[0] = m), (_ = !0)) : (_ = !1);
                      }
                      g += A;
                    }
                  }
                  c && (c[1] = this._bufferService.cols);
                }
              }
              static _mergeRanges(e, s) {
                let a = !1;
                for (let v = 0; v < e.length; v++) {
                  const _ = e[v];
                  if (a) {
                    if (s[1] <= _[0]) return (e[v - 1][1] = s[1]), e;
                    if (s[1] <= _[1])
                      return (
                        (e[v - 1][1] = Math.max(s[1], _[1])), e.splice(v, 1), e
                      );
                    e.splice(v, 1), v--;
                  } else {
                    if (s[1] <= _[0]) return e.splice(v, 0, s), e;
                    if (s[1] <= _[1]) return (_[0] = Math.min(s[0], _[0])), e;
                    s[0] < _[1] && ((_[0] = Math.min(s[0], _[0])), (a = !0));
                  }
                }
                return a ? (e[e.length - 1][1] = s[1]) : e.push(s), e;
              }
            });
            r.CharacterJoinerService = t = h([u(0, p.IBufferService)], t);
          },
          5114: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CoreBrowserService = void 0);
            const h = o(844),
              u = o(8460),
              n = o(3656);
            class d extends h.Disposable {
              constructor(l, t, i) {
                super(),
                  (this._textarea = l),
                  (this._window = t),
                  (this.mainDocument = i),
                  (this._isFocused = !1),
                  (this._cachedIsFocused = void 0),
                  (this._screenDprMonitor = new f(this._window)),
                  (this._onDprChange = this.register(new u.EventEmitter())),
                  (this.onDprChange = this._onDprChange.event),
                  (this._onWindowChange = this.register(new u.EventEmitter())),
                  (this.onWindowChange = this._onWindowChange.event),
                  this.register(
                    this.onWindowChange((e) =>
                      this._screenDprMonitor.setWindow(e)
                    )
                  ),
                  this.register(
                    (0, u.forwardEvent)(
                      this._screenDprMonitor.onDprChange,
                      this._onDprChange
                    )
                  ),
                  this._textarea.addEventListener(
                    "focus",
                    () => (this._isFocused = !0)
                  ),
                  this._textarea.addEventListener(
                    "blur",
                    () => (this._isFocused = !1)
                  );
              }
              get window() {
                return this._window;
              }
              set window(l) {
                this._window !== l &&
                  ((this._window = l), this._onWindowChange.fire(this._window));
              }
              get dpr() {
                return this.window.devicePixelRatio;
              }
              get isFocused() {
                return (
                  this._cachedIsFocused === void 0 &&
                    ((this._cachedIsFocused =
                      this._isFocused &&
                      this._textarea.ownerDocument.hasFocus()),
                    queueMicrotask(() => (this._cachedIsFocused = void 0))),
                  this._cachedIsFocused
                );
              }
            }
            r.CoreBrowserService = d;
            class f extends h.Disposable {
              constructor(l) {
                super(),
                  (this._parentWindow = l),
                  (this._windowResizeListener = this.register(
                    new h.MutableDisposable()
                  )),
                  (this._onDprChange = this.register(new u.EventEmitter())),
                  (this.onDprChange = this._onDprChange.event),
                  (this._outerListener = () => this._setDprAndFireIfDiffers()),
                  (this._currentDevicePixelRatio =
                    this._parentWindow.devicePixelRatio),
                  this._updateDpr(),
                  this._setWindowResizeListener(),
                  this.register(
                    (0, h.toDisposable)(() => this.clearListener())
                  );
              }
              setWindow(l) {
                (this._parentWindow = l),
                  this._setWindowResizeListener(),
                  this._setDprAndFireIfDiffers();
              }
              _setWindowResizeListener() {
                this._windowResizeListener.value = (0,
                n.addDisposableDomListener)(this._parentWindow, "resize", () =>
                  this._setDprAndFireIfDiffers()
                );
              }
              _setDprAndFireIfDiffers() {
                this._parentWindow.devicePixelRatio !==
                  this._currentDevicePixelRatio &&
                  this._onDprChange.fire(this._parentWindow.devicePixelRatio),
                  this._updateDpr();
              }
              _updateDpr() {
                this._outerListener &&
                  (this._resolutionMediaMatchList?.removeListener(
                    this._outerListener
                  ),
                  (this._currentDevicePixelRatio =
                    this._parentWindow.devicePixelRatio),
                  (this._resolutionMediaMatchList =
                    this._parentWindow.matchMedia(
                      `screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`
                    )),
                  this._resolutionMediaMatchList.addListener(
                    this._outerListener
                  ));
              }
              clearListener() {
                this._resolutionMediaMatchList &&
                  this._outerListener &&
                  (this._resolutionMediaMatchList.removeListener(
                    this._outerListener
                  ),
                  (this._resolutionMediaMatchList = void 0),
                  (this._outerListener = void 0));
              }
            }
          },
          779: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.LinkProviderService = void 0);
            const h = o(844);
            class u extends h.Disposable {
              constructor() {
                super(),
                  (this.linkProviders = []),
                  this.register(
                    (0, h.toDisposable)(() => (this.linkProviders.length = 0))
                  );
              }
              registerLinkProvider(d) {
                return (
                  this.linkProviders.push(d),
                  {
                    dispose: () => {
                      const f = this.linkProviders.indexOf(d);
                      f !== -1 && this.linkProviders.splice(f, 1);
                    },
                  }
                );
              }
            }
            r.LinkProviderService = u;
          },
          8934: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (p, l, t, i) {
                  var e,
                    s = arguments.length,
                    a =
                      s < 3
                        ? l
                        : i === null
                        ? (i = Object.getOwnPropertyDescriptor(l, t))
                        : i;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    a = Reflect.decorate(p, l, t, i);
                  else
                    for (var v = p.length - 1; v >= 0; v--)
                      (e = p[v]) &&
                        (a =
                          (s < 3 ? e(a) : s > 3 ? e(l, t, a) : e(l, t)) || a);
                  return s > 3 && a && Object.defineProperty(l, t, a), a;
                },
              u =
                (this && this.__param) ||
                function (p, l) {
                  return function (t, i) {
                    l(t, i, p);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.MouseService = void 0);
            const n = o(4725),
              d = o(9806);
            let f = (r.MouseService = class {
              constructor(p, l) {
                (this._renderService = p), (this._charSizeService = l);
              }
              getCoords(p, l, t, i, e) {
                return (0, d.getCoords)(
                  window,
                  p,
                  l,
                  t,
                  i,
                  this._charSizeService.hasValidSize,
                  this._renderService.dimensions.css.cell.width,
                  this._renderService.dimensions.css.cell.height,
                  e
                );
              }
              getMouseReportCoords(p, l) {
                const t = (0, d.getCoordsRelativeToElement)(window, p, l);
                if (this._charSizeService.hasValidSize)
                  return (
                    (t[0] = Math.min(
                      Math.max(t[0], 0),
                      this._renderService.dimensions.css.canvas.width - 1
                    )),
                    (t[1] = Math.min(
                      Math.max(t[1], 0),
                      this._renderService.dimensions.css.canvas.height - 1
                    )),
                    {
                      col: Math.floor(
                        t[0] / this._renderService.dimensions.css.cell.width
                      ),
                      row: Math.floor(
                        t[1] / this._renderService.dimensions.css.cell.height
                      ),
                      x: Math.floor(t[0]),
                      y: Math.floor(t[1]),
                    }
                  );
              }
            });
            r.MouseService = f = h(
              [u(0, n.IRenderService), u(1, n.ICharSizeService)],
              f
            );
          },
          3230: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (e, s, a, v) {
                  var _,
                    g = arguments.length,
                    c =
                      g < 3
                        ? s
                        : v === null
                        ? (v = Object.getOwnPropertyDescriptor(s, a))
                        : v;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    c = Reflect.decorate(e, s, a, v);
                  else
                    for (var m = e.length - 1; m >= 0; m--)
                      (_ = e[m]) &&
                        (c =
                          (g < 3 ? _(c) : g > 3 ? _(s, a, c) : _(s, a)) || c);
                  return g > 3 && c && Object.defineProperty(s, a, c), c;
                },
              u =
                (this && this.__param) ||
                function (e, s) {
                  return function (a, v) {
                    s(a, v, e);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.RenderService = void 0);
            const n = o(6193),
              d = o(4725),
              f = o(8460),
              p = o(844),
              l = o(7226),
              t = o(2585);
            let i = (r.RenderService = class extends p.Disposable {
              get dimensions() {
                return this._renderer.value.dimensions;
              }
              constructor(e, s, a, v, _, g, c, m) {
                super(),
                  (this._rowCount = e),
                  (this._charSizeService = v),
                  (this._renderer = this.register(new p.MutableDisposable())),
                  (this._pausedResizeTask = new l.DebouncedIdleTask()),
                  (this._observerDisposable = this.register(
                    new p.MutableDisposable()
                  )),
                  (this._isPaused = !1),
                  (this._needsFullRefresh = !1),
                  (this._isNextRenderRedrawOnly = !0),
                  (this._needsSelectionRefresh = !1),
                  (this._canvasWidth = 0),
                  (this._canvasHeight = 0),
                  (this._selectionState = {
                    start: void 0,
                    end: void 0,
                    columnSelectMode: !1,
                  }),
                  (this._onDimensionsChange = this.register(
                    new f.EventEmitter()
                  )),
                  (this.onDimensionsChange = this._onDimensionsChange.event),
                  (this._onRenderedViewportChange = this.register(
                    new f.EventEmitter()
                  )),
                  (this.onRenderedViewportChange =
                    this._onRenderedViewportChange.event),
                  (this._onRender = this.register(new f.EventEmitter())),
                  (this.onRender = this._onRender.event),
                  (this._onRefreshRequest = this.register(
                    new f.EventEmitter()
                  )),
                  (this.onRefreshRequest = this._onRefreshRequest.event),
                  (this._renderDebouncer = new n.RenderDebouncer(
                    (R, A) => this._renderRows(R, A),
                    c
                  )),
                  this.register(this._renderDebouncer),
                  this.register(
                    c.onDprChange(() => this.handleDevicePixelRatioChange())
                  ),
                  this.register(g.onResize(() => this._fullRefresh())),
                  this.register(
                    g.buffers.onBufferActivate(() =>
                      this._renderer.value?.clear()
                    )
                  ),
                  this.register(
                    a.onOptionChange(() => this._handleOptionsChanged())
                  ),
                  this.register(
                    this._charSizeService.onCharSizeChange(() =>
                      this.handleCharSizeChanged()
                    )
                  ),
                  this.register(
                    _.onDecorationRegistered(() => this._fullRefresh())
                  ),
                  this.register(
                    _.onDecorationRemoved(() => this._fullRefresh())
                  ),
                  this.register(
                    a.onMultipleOptionChange(
                      [
                        "customGlyphs",
                        "drawBoldTextInBrightColors",
                        "letterSpacing",
                        "lineHeight",
                        "fontFamily",
                        "fontSize",
                        "fontWeight",
                        "fontWeightBold",
                        "minimumContrastRatio",
                        "rescaleOverlappingGlyphs",
                      ],
                      () => {
                        this.clear(),
                          this.handleResize(g.cols, g.rows),
                          this._fullRefresh();
                      }
                    )
                  ),
                  this.register(
                    a.onMultipleOptionChange(
                      ["cursorBlink", "cursorStyle"],
                      () => this.refreshRows(g.buffer.y, g.buffer.y, !0)
                    )
                  ),
                  this.register(m.onChangeColors(() => this._fullRefresh())),
                  this._registerIntersectionObserver(c.window, s),
                  this.register(
                    c.onWindowChange((R) =>
                      this._registerIntersectionObserver(R, s)
                    )
                  );
              }
              _registerIntersectionObserver(e, s) {
                if ("IntersectionObserver" in e) {
                  const a = new e.IntersectionObserver(
                    (v) => this._handleIntersectionChange(v[v.length - 1]),
                    { threshold: 0 }
                  );
                  a.observe(s),
                    (this._observerDisposable.value = (0, p.toDisposable)(() =>
                      a.disconnect()
                    ));
                }
              }
              _handleIntersectionChange(e) {
                (this._isPaused =
                  e.isIntersecting === void 0
                    ? e.intersectionRatio === 0
                    : !e.isIntersecting),
                  this._isPaused ||
                    this._charSizeService.hasValidSize ||
                    this._charSizeService.measure(),
                  !this._isPaused &&
                    this._needsFullRefresh &&
                    (this._pausedResizeTask.flush(),
                    this.refreshRows(0, this._rowCount - 1),
                    (this._needsFullRefresh = !1));
              }
              refreshRows(e, s, a = !1) {
                this._isPaused
                  ? (this._needsFullRefresh = !0)
                  : (a || (this._isNextRenderRedrawOnly = !1),
                    this._renderDebouncer.refresh(e, s, this._rowCount));
              }
              _renderRows(e, s) {
                this._renderer.value &&
                  ((e = Math.min(e, this._rowCount - 1)),
                  (s = Math.min(s, this._rowCount - 1)),
                  this._renderer.value.renderRows(e, s),
                  this._needsSelectionRefresh &&
                    (this._renderer.value.handleSelectionChanged(
                      this._selectionState.start,
                      this._selectionState.end,
                      this._selectionState.columnSelectMode
                    ),
                    (this._needsSelectionRefresh = !1)),
                  this._isNextRenderRedrawOnly ||
                    this._onRenderedViewportChange.fire({ start: e, end: s }),
                  this._onRender.fire({ start: e, end: s }),
                  (this._isNextRenderRedrawOnly = !0));
              }
              resize(e, s) {
                (this._rowCount = s), this._fireOnCanvasResize();
              }
              _handleOptionsChanged() {
                this._renderer.value &&
                  (this.refreshRows(0, this._rowCount - 1),
                  this._fireOnCanvasResize());
              }
              _fireOnCanvasResize() {
                this._renderer.value &&
                  ((this._renderer.value.dimensions.css.canvas.width ===
                    this._canvasWidth &&
                    this._renderer.value.dimensions.css.canvas.height ===
                      this._canvasHeight) ||
                    this._onDimensionsChange.fire(
                      this._renderer.value.dimensions
                    ));
              }
              hasRenderer() {
                return !!this._renderer.value;
              }
              setRenderer(e) {
                (this._renderer.value = e),
                  this._renderer.value &&
                    (this._renderer.value.onRequestRedraw((s) =>
                      this.refreshRows(s.start, s.end, !0)
                    ),
                    (this._needsSelectionRefresh = !0),
                    this._fullRefresh());
              }
              addRefreshCallback(e) {
                return this._renderDebouncer.addRefreshCallback(e);
              }
              _fullRefresh() {
                this._isPaused
                  ? (this._needsFullRefresh = !0)
                  : this.refreshRows(0, this._rowCount - 1);
              }
              clearTextureAtlas() {
                this._renderer.value &&
                  (this._renderer.value.clearTextureAtlas?.(),
                  this._fullRefresh());
              }
              handleDevicePixelRatioChange() {
                this._charSizeService.measure(),
                  this._renderer.value &&
                    (this._renderer.value.handleDevicePixelRatioChange(),
                    this.refreshRows(0, this._rowCount - 1));
              }
              handleResize(e, s) {
                this._renderer.value &&
                  (this._isPaused
                    ? this._pausedResizeTask.set(() =>
                        this._renderer.value?.handleResize(e, s)
                      )
                    : this._renderer.value.handleResize(e, s),
                  this._fullRefresh());
              }
              handleCharSizeChanged() {
                this._renderer.value?.handleCharSizeChanged();
              }
              handleBlur() {
                this._renderer.value?.handleBlur();
              }
              handleFocus() {
                this._renderer.value?.handleFocus();
              }
              handleSelectionChanged(e, s, a) {
                (this._selectionState.start = e),
                  (this._selectionState.end = s),
                  (this._selectionState.columnSelectMode = a),
                  this._renderer.value?.handleSelectionChanged(e, s, a);
              }
              handleCursorMove() {
                this._renderer.value?.handleCursorMove();
              }
              clear() {
                this._renderer.value?.clear();
              }
            });
            r.RenderService = i = h(
              [
                u(2, t.IOptionsService),
                u(3, d.ICharSizeService),
                u(4, t.IDecorationService),
                u(5, t.IBufferService),
                u(6, d.ICoreBrowserService),
                u(7, d.IThemeService),
              ],
              i
            );
          },
          9312: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (c, m, R, A) {
                  var T,
                    k = arguments.length,
                    P =
                      k < 3
                        ? m
                        : A === null
                        ? (A = Object.getOwnPropertyDescriptor(m, R))
                        : A;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    P = Reflect.decorate(c, m, R, A);
                  else
                    for (var F = c.length - 1; F >= 0; F--)
                      (T = c[F]) &&
                        (P =
                          (k < 3 ? T(P) : k > 3 ? T(m, R, P) : T(m, R)) || P);
                  return k > 3 && P && Object.defineProperty(m, R, P), P;
                },
              u =
                (this && this.__param) ||
                function (c, m) {
                  return function (R, A) {
                    m(R, A, c);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.SelectionService = void 0);
            const n = o(9806),
              d = o(9504),
              f = o(456),
              p = o(4725),
              l = o(8460),
              t = o(844),
              i = o(6114),
              e = o(4841),
              s = o(511),
              a = o(2585),
              v = " ",
              _ = new RegExp(v, "g");
            let g = (r.SelectionService = class extends t.Disposable {
              constructor(c, m, R, A, T, k, P, F, U) {
                super(),
                  (this._element = c),
                  (this._screenElement = m),
                  (this._linkifier = R),
                  (this._bufferService = A),
                  (this._coreService = T),
                  (this._mouseService = k),
                  (this._optionsService = P),
                  (this._renderService = F),
                  (this._coreBrowserService = U),
                  (this._dragScrollAmount = 0),
                  (this._enabled = !0),
                  (this._workCell = new s.CellData()),
                  (this._mouseDownTimeStamp = 0),
                  (this._oldHasSelection = !1),
                  (this._oldSelectionStart = void 0),
                  (this._oldSelectionEnd = void 0),
                  (this._onLinuxMouseSelection = this.register(
                    new l.EventEmitter()
                  )),
                  (this.onLinuxMouseSelection =
                    this._onLinuxMouseSelection.event),
                  (this._onRedrawRequest = this.register(new l.EventEmitter())),
                  (this.onRequestRedraw = this._onRedrawRequest.event),
                  (this._onSelectionChange = this.register(
                    new l.EventEmitter()
                  )),
                  (this.onSelectionChange = this._onSelectionChange.event),
                  (this._onRequestScrollLines = this.register(
                    new l.EventEmitter()
                  )),
                  (this.onRequestScrollLines =
                    this._onRequestScrollLines.event),
                  (this._mouseMoveListener = (K) => this._handleMouseMove(K)),
                  (this._mouseUpListener = (K) => this._handleMouseUp(K)),
                  this._coreService.onUserInput(() => {
                    this.hasSelection && this.clearSelection();
                  }),
                  (this._trimListener = this._bufferService.buffer.lines.onTrim(
                    (K) => this._handleTrim(K)
                  )),
                  this.register(
                    this._bufferService.buffers.onBufferActivate((K) =>
                      this._handleBufferActivate(K)
                    )
                  ),
                  this.enable(),
                  (this._model = new f.SelectionModel(this._bufferService)),
                  (this._activeSelectionMode = 0),
                  this.register(
                    (0, t.toDisposable)(() => {
                      this._removeMouseDownListeners();
                    })
                  );
              }
              reset() {
                this.clearSelection();
              }
              disable() {
                this.clearSelection(), (this._enabled = !1);
              }
              enable() {
                this._enabled = !0;
              }
              get selectionStart() {
                return this._model.finalSelectionStart;
              }
              get selectionEnd() {
                return this._model.finalSelectionEnd;
              }
              get hasSelection() {
                const c = this._model.finalSelectionStart,
                  m = this._model.finalSelectionEnd;
                return !(!c || !m || (c[0] === m[0] && c[1] === m[1]));
              }
              get selectionText() {
                const c = this._model.finalSelectionStart,
                  m = this._model.finalSelectionEnd;
                if (!c || !m) return "";
                const R = this._bufferService.buffer,
                  A = [];
                if (this._activeSelectionMode === 3) {
                  if (c[0] === m[0]) return "";
                  const T = c[0] < m[0] ? c[0] : m[0],
                    k = c[0] < m[0] ? m[0] : c[0];
                  for (let P = c[1]; P <= m[1]; P++) {
                    const F = R.translateBufferLineToString(P, !0, T, k);
                    A.push(F);
                  }
                } else {
                  const T = c[1] === m[1] ? m[0] : void 0;
                  A.push(R.translateBufferLineToString(c[1], !0, c[0], T));
                  for (let k = c[1] + 1; k <= m[1] - 1; k++) {
                    const P = R.lines.get(k),
                      F = R.translateBufferLineToString(k, !0);
                    P?.isWrapped ? (A[A.length - 1] += F) : A.push(F);
                  }
                  if (c[1] !== m[1]) {
                    const k = R.lines.get(m[1]),
                      P = R.translateBufferLineToString(m[1], !0, 0, m[0]);
                    k && k.isWrapped ? (A[A.length - 1] += P) : A.push(P);
                  }
                }
                return A.map((T) => T.replace(_, " ")).join(
                  i.isWindows
                    ? `\r
`
                    : `
`
                );
              }
              clearSelection() {
                this._model.clearSelection(),
                  this._removeMouseDownListeners(),
                  this.refresh(),
                  this._onSelectionChange.fire();
              }
              refresh(c) {
                this._refreshAnimationFrame ||
                  (this._refreshAnimationFrame =
                    this._coreBrowserService.window.requestAnimationFrame(() =>
                      this._refresh()
                    )),
                  i.isLinux &&
                    c &&
                    this.selectionText.length &&
                    this._onLinuxMouseSelection.fire(this.selectionText);
              }
              _refresh() {
                (this._refreshAnimationFrame = void 0),
                  this._onRedrawRequest.fire({
                    start: this._model.finalSelectionStart,
                    end: this._model.finalSelectionEnd,
                    columnSelectMode: this._activeSelectionMode === 3,
                  });
              }
              _isClickInSelection(c) {
                const m = this._getMouseBufferCoords(c),
                  R = this._model.finalSelectionStart,
                  A = this._model.finalSelectionEnd;
                return !!(R && A && m) && this._areCoordsInSelection(m, R, A);
              }
              isCellInSelection(c, m) {
                const R = this._model.finalSelectionStart,
                  A = this._model.finalSelectionEnd;
                return !(!R || !A) && this._areCoordsInSelection([c, m], R, A);
              }
              _areCoordsInSelection(c, m, R) {
                return (
                  (c[1] > m[1] && c[1] < R[1]) ||
                  (m[1] === R[1] &&
                    c[1] === m[1] &&
                    c[0] >= m[0] &&
                    c[0] < R[0]) ||
                  (m[1] < R[1] && c[1] === R[1] && c[0] < R[0]) ||
                  (m[1] < R[1] && c[1] === m[1] && c[0] >= m[0])
                );
              }
              _selectWordAtCursor(c, m) {
                const R = this._linkifier.currentLink?.link?.range;
                if (R)
                  return (
                    (this._model.selectionStart = [
                      R.start.x - 1,
                      R.start.y - 1,
                    ]),
                    (this._model.selectionStartLength = (0, e.getRangeLength)(
                      R,
                      this._bufferService.cols
                    )),
                    (this._model.selectionEnd = void 0),
                    !0
                  );
                const A = this._getMouseBufferCoords(c);
                return (
                  !!A &&
                  (this._selectWordAt(A, m),
                  (this._model.selectionEnd = void 0),
                  !0)
                );
              }
              selectAll() {
                (this._model.isSelectAllActive = !0),
                  this.refresh(),
                  this._onSelectionChange.fire();
              }
              selectLines(c, m) {
                this._model.clearSelection(),
                  (c = Math.max(c, 0)),
                  (m = Math.min(
                    m,
                    this._bufferService.buffer.lines.length - 1
                  )),
                  (this._model.selectionStart = [0, c]),
                  (this._model.selectionEnd = [this._bufferService.cols, m]),
                  this.refresh(),
                  this._onSelectionChange.fire();
              }
              _handleTrim(c) {
                this._model.handleTrim(c) && this.refresh();
              }
              _getMouseBufferCoords(c) {
                const m = this._mouseService.getCoords(
                  c,
                  this._screenElement,
                  this._bufferService.cols,
                  this._bufferService.rows,
                  !0
                );
                if (m)
                  return (
                    m[0]--,
                    m[1]--,
                    (m[1] += this._bufferService.buffer.ydisp),
                    m
                  );
              }
              _getMouseEventScrollAmount(c) {
                let m = (0, n.getCoordsRelativeToElement)(
                  this._coreBrowserService.window,
                  c,
                  this._screenElement
                )[1];
                const R = this._renderService.dimensions.css.canvas.height;
                return m >= 0 && m <= R
                  ? 0
                  : (m > R && (m -= R),
                    (m = Math.min(Math.max(m, -50), 50)),
                    (m /= 50),
                    m / Math.abs(m) + Math.round(14 * m));
              }
              shouldForceSelection(c) {
                return i.isMac
                  ? c.altKey &&
                      this._optionsService.rawOptions
                        .macOptionClickForcesSelection
                  : c.shiftKey;
              }
              handleMouseDown(c) {
                if (
                  ((this._mouseDownTimeStamp = c.timeStamp),
                  (c.button !== 2 || !this.hasSelection) && c.button === 0)
                ) {
                  if (!this._enabled) {
                    if (!this.shouldForceSelection(c)) return;
                    c.stopPropagation();
                  }
                  c.preventDefault(),
                    (this._dragScrollAmount = 0),
                    this._enabled && c.shiftKey
                      ? this._handleIncrementalClick(c)
                      : c.detail === 1
                      ? this._handleSingleClick(c)
                      : c.detail === 2
                      ? this._handleDoubleClick(c)
                      : c.detail === 3 && this._handleTripleClick(c),
                    this._addMouseDownListeners(),
                    this.refresh(!0);
                }
              }
              _addMouseDownListeners() {
                this._screenElement.ownerDocument &&
                  (this._screenElement.ownerDocument.addEventListener(
                    "mousemove",
                    this._mouseMoveListener
                  ),
                  this._screenElement.ownerDocument.addEventListener(
                    "mouseup",
                    this._mouseUpListener
                  )),
                  (this._dragScrollIntervalTimer =
                    this._coreBrowserService.window.setInterval(
                      () => this._dragScroll(),
                      50
                    ));
              }
              _removeMouseDownListeners() {
                this._screenElement.ownerDocument &&
                  (this._screenElement.ownerDocument.removeEventListener(
                    "mousemove",
                    this._mouseMoveListener
                  ),
                  this._screenElement.ownerDocument.removeEventListener(
                    "mouseup",
                    this._mouseUpListener
                  )),
                  this._coreBrowserService.window.clearInterval(
                    this._dragScrollIntervalTimer
                  ),
                  (this._dragScrollIntervalTimer = void 0);
              }
              _handleIncrementalClick(c) {
                this._model.selectionStart &&
                  (this._model.selectionEnd = this._getMouseBufferCoords(c));
              }
              _handleSingleClick(c) {
                if (
                  ((this._model.selectionStartLength = 0),
                  (this._model.isSelectAllActive = !1),
                  (this._activeSelectionMode = this.shouldColumnSelect(c)
                    ? 3
                    : 0),
                  (this._model.selectionStart = this._getMouseBufferCoords(c)),
                  !this._model.selectionStart)
                )
                  return;
                this._model.selectionEnd = void 0;
                const m = this._bufferService.buffer.lines.get(
                  this._model.selectionStart[1]
                );
                m &&
                  m.length !== this._model.selectionStart[0] &&
                  m.hasWidth(this._model.selectionStart[0]) === 0 &&
                  this._model.selectionStart[0]++;
              }
              _handleDoubleClick(c) {
                this._selectWordAtCursor(c, !0) &&
                  (this._activeSelectionMode = 1);
              }
              _handleTripleClick(c) {
                const m = this._getMouseBufferCoords(c);
                m &&
                  ((this._activeSelectionMode = 2), this._selectLineAt(m[1]));
              }
              shouldColumnSelect(c) {
                return (
                  c.altKey &&
                  !(
                    i.isMac &&
                    this._optionsService.rawOptions
                      .macOptionClickForcesSelection
                  )
                );
              }
              _handleMouseMove(c) {
                if ((c.stopImmediatePropagation(), !this._model.selectionStart))
                  return;
                const m = this._model.selectionEnd
                  ? [this._model.selectionEnd[0], this._model.selectionEnd[1]]
                  : null;
                if (
                  ((this._model.selectionEnd = this._getMouseBufferCoords(c)),
                  !this._model.selectionEnd)
                )
                  return void this.refresh(!0);
                this._activeSelectionMode === 2
                  ? this._model.selectionEnd[1] < this._model.selectionStart[1]
                    ? (this._model.selectionEnd[0] = 0)
                    : (this._model.selectionEnd[0] = this._bufferService.cols)
                  : this._activeSelectionMode === 1 &&
                    this._selectToWordAt(this._model.selectionEnd),
                  (this._dragScrollAmount = this._getMouseEventScrollAmount(c)),
                  this._activeSelectionMode !== 3 &&
                    (this._dragScrollAmount > 0
                      ? (this._model.selectionEnd[0] = this._bufferService.cols)
                      : this._dragScrollAmount < 0 &&
                        (this._model.selectionEnd[0] = 0));
                const R = this._bufferService.buffer;
                if (this._model.selectionEnd[1] < R.lines.length) {
                  const A = R.lines.get(this._model.selectionEnd[1]);
                  A &&
                    A.hasWidth(this._model.selectionEnd[0]) === 0 &&
                    this._model.selectionEnd[0] < this._bufferService.cols &&
                    this._model.selectionEnd[0]++;
                }
                (m &&
                  m[0] === this._model.selectionEnd[0] &&
                  m[1] === this._model.selectionEnd[1]) ||
                  this.refresh(!0);
              }
              _dragScroll() {
                if (
                  this._model.selectionEnd &&
                  this._model.selectionStart &&
                  this._dragScrollAmount
                ) {
                  this._onRequestScrollLines.fire({
                    amount: this._dragScrollAmount,
                    suppressScrollEvent: !1,
                  });
                  const c = this._bufferService.buffer;
                  this._dragScrollAmount > 0
                    ? (this._activeSelectionMode !== 3 &&
                        (this._model.selectionEnd[0] =
                          this._bufferService.cols),
                      (this._model.selectionEnd[1] = Math.min(
                        c.ydisp + this._bufferService.rows,
                        c.lines.length - 1
                      )))
                    : (this._activeSelectionMode !== 3 &&
                        (this._model.selectionEnd[0] = 0),
                      (this._model.selectionEnd[1] = c.ydisp)),
                    this.refresh();
                }
              }
              _handleMouseUp(c) {
                const m = c.timeStamp - this._mouseDownTimeStamp;
                if (
                  (this._removeMouseDownListeners(),
                  this.selectionText.length <= 1 &&
                    m < 500 &&
                    c.altKey &&
                    this._optionsService.rawOptions.altClickMovesCursor)
                ) {
                  if (
                    this._bufferService.buffer.ybase ===
                    this._bufferService.buffer.ydisp
                  ) {
                    const R = this._mouseService.getCoords(
                      c,
                      this._element,
                      this._bufferService.cols,
                      this._bufferService.rows,
                      !1
                    );
                    if (R && R[0] !== void 0 && R[1] !== void 0) {
                      const A = (0, d.moveToCellSequence)(
                        R[0] - 1,
                        R[1] - 1,
                        this._bufferService,
                        this._coreService.decPrivateModes.applicationCursorKeys
                      );
                      this._coreService.triggerDataEvent(A, !0);
                    }
                  }
                } else this._fireEventIfSelectionChanged();
              }
              _fireEventIfSelectionChanged() {
                const c = this._model.finalSelectionStart,
                  m = this._model.finalSelectionEnd,
                  R = !(!c || !m || (c[0] === m[0] && c[1] === m[1]));
                R
                  ? c &&
                    m &&
                    ((this._oldSelectionStart &&
                      this._oldSelectionEnd &&
                      c[0] === this._oldSelectionStart[0] &&
                      c[1] === this._oldSelectionStart[1] &&
                      m[0] === this._oldSelectionEnd[0] &&
                      m[1] === this._oldSelectionEnd[1]) ||
                      this._fireOnSelectionChange(c, m, R))
                  : this._oldHasSelection &&
                    this._fireOnSelectionChange(c, m, R);
              }
              _fireOnSelectionChange(c, m, R) {
                (this._oldSelectionStart = c),
                  (this._oldSelectionEnd = m),
                  (this._oldHasSelection = R),
                  this._onSelectionChange.fire();
              }
              _handleBufferActivate(c) {
                this.clearSelection(),
                  this._trimListener.dispose(),
                  (this._trimListener = c.activeBuffer.lines.onTrim((m) =>
                    this._handleTrim(m)
                  ));
              }
              _convertViewportColToCharacterIndex(c, m) {
                let R = m;
                for (let A = 0; m >= A; A++) {
                  const T = c.loadCell(A, this._workCell).getChars().length;
                  this._workCell.getWidth() === 0
                    ? R--
                    : T > 1 && m !== A && (R += T - 1);
                }
                return R;
              }
              setSelection(c, m, R) {
                this._model.clearSelection(),
                  this._removeMouseDownListeners(),
                  (this._model.selectionStart = [c, m]),
                  (this._model.selectionStartLength = R),
                  this.refresh(),
                  this._fireEventIfSelectionChanged();
              }
              rightClickSelect(c) {
                this._isClickInSelection(c) ||
                  (this._selectWordAtCursor(c, !1) && this.refresh(!0),
                  this._fireEventIfSelectionChanged());
              }
              _getWordAt(c, m, R = !0, A = !0) {
                if (c[0] >= this._bufferService.cols) return;
                const T = this._bufferService.buffer,
                  k = T.lines.get(c[1]);
                if (!k) return;
                const P = T.translateBufferLineToString(c[1], !1);
                let F = this._convertViewportColToCharacterIndex(k, c[0]),
                  U = F;
                const K = c[0] - F;
                let z = 0,
                  S = 0,
                  x = 0,
                  D = 0;
                if (P.charAt(F) === " ") {
                  for (; F > 0 && P.charAt(F - 1) === " "; ) F--;
                  for (; U < P.length && P.charAt(U + 1) === " "; ) U++;
                } else {
                  let $ = c[0],
                    V = c[0];
                  k.getWidth($) === 0 && (z++, $--),
                    k.getWidth(V) === 2 && (S++, V++);
                  const G = k.getString(V).length;
                  for (
                    G > 1 && ((D += G - 1), (U += G - 1));
                    $ > 0 &&
                    F > 0 &&
                    !this._isCharWordSeparator(
                      k.loadCell($ - 1, this._workCell)
                    );

                  ) {
                    k.loadCell($ - 1, this._workCell);
                    const M = this._workCell.getChars().length;
                    this._workCell.getWidth() === 0
                      ? (z++, $--)
                      : M > 1 && ((x += M - 1), (F -= M - 1)),
                      F--,
                      $--;
                  }
                  for (
                    ;
                    V < k.length &&
                    U + 1 < P.length &&
                    !this._isCharWordSeparator(
                      k.loadCell(V + 1, this._workCell)
                    );

                  ) {
                    k.loadCell(V + 1, this._workCell);
                    const M = this._workCell.getChars().length;
                    this._workCell.getWidth() === 2
                      ? (S++, V++)
                      : M > 1 && ((D += M - 1), (U += M - 1)),
                      U++,
                      V++;
                  }
                }
                U++;
                let O = F + K - z + x,
                  W = Math.min(this._bufferService.cols, U - F + z + S - x - D);
                if (m || P.slice(F, U).trim() !== "") {
                  if (R && O === 0 && k.getCodePoint(0) !== 32) {
                    const $ = T.lines.get(c[1] - 1);
                    if (
                      $ &&
                      k.isWrapped &&
                      $.getCodePoint(this._bufferService.cols - 1) !== 32
                    ) {
                      const V = this._getWordAt(
                        [this._bufferService.cols - 1, c[1] - 1],
                        !1,
                        !0,
                        !1
                      );
                      if (V) {
                        const G = this._bufferService.cols - V.start;
                        (O -= G), (W += G);
                      }
                    }
                  }
                  if (
                    A &&
                    O + W === this._bufferService.cols &&
                    k.getCodePoint(this._bufferService.cols - 1) !== 32
                  ) {
                    const $ = T.lines.get(c[1] + 1);
                    if ($?.isWrapped && $.getCodePoint(0) !== 32) {
                      const V = this._getWordAt([0, c[1] + 1], !1, !1, !0);
                      V && (W += V.length);
                    }
                  }
                  return { start: O, length: W };
                }
              }
              _selectWordAt(c, m) {
                const R = this._getWordAt(c, m);
                if (R) {
                  for (; R.start < 0; )
                    (R.start += this._bufferService.cols), c[1]--;
                  (this._model.selectionStart = [R.start, c[1]]),
                    (this._model.selectionStartLength = R.length);
                }
              }
              _selectToWordAt(c) {
                const m = this._getWordAt(c, !0);
                if (m) {
                  let R = c[1];
                  for (; m.start < 0; )
                    (m.start += this._bufferService.cols), R--;
                  if (!this._model.areSelectionValuesReversed())
                    for (; m.start + m.length > this._bufferService.cols; )
                      (m.length -= this._bufferService.cols), R++;
                  this._model.selectionEnd = [
                    this._model.areSelectionValuesReversed()
                      ? m.start
                      : m.start + m.length,
                    R,
                  ];
                }
              }
              _isCharWordSeparator(c) {
                return (
                  c.getWidth() !== 0 &&
                  this._optionsService.rawOptions.wordSeparator.indexOf(
                    c.getChars()
                  ) >= 0
                );
              }
              _selectLineAt(c) {
                const m = this._bufferService.buffer.getWrappedRangeForLine(c),
                  R = {
                    start: { x: 0, y: m.first },
                    end: { x: this._bufferService.cols - 1, y: m.last },
                  };
                (this._model.selectionStart = [0, m.first]),
                  (this._model.selectionEnd = void 0),
                  (this._model.selectionStartLength = (0, e.getRangeLength)(
                    R,
                    this._bufferService.cols
                  ));
              }
            });
            r.SelectionService = g = h(
              [
                u(3, a.IBufferService),
                u(4, a.ICoreService),
                u(5, p.IMouseService),
                u(6, a.IOptionsService),
                u(7, p.IRenderService),
                u(8, p.ICoreBrowserService),
              ],
              g
            );
          },
          4725: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.ILinkProviderService =
                r.IThemeService =
                r.ICharacterJoinerService =
                r.ISelectionService =
                r.IRenderService =
                r.IMouseService =
                r.ICoreBrowserService =
                r.ICharSizeService =
                  void 0);
            const h = o(8343);
            (r.ICharSizeService = (0, h.createDecorator)("CharSizeService")),
              (r.ICoreBrowserService = (0, h.createDecorator)(
                "CoreBrowserService"
              )),
              (r.IMouseService = (0, h.createDecorator)("MouseService")),
              (r.IRenderService = (0, h.createDecorator)("RenderService")),
              (r.ISelectionService = (0, h.createDecorator)(
                "SelectionService"
              )),
              (r.ICharacterJoinerService = (0, h.createDecorator)(
                "CharacterJoinerService"
              )),
              (r.IThemeService = (0, h.createDecorator)("ThemeService")),
              (r.ILinkProviderService = (0, h.createDecorator)(
                "LinkProviderService"
              ));
          },
          6731: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (g, c, m, R) {
                  var A,
                    T = arguments.length,
                    k =
                      T < 3
                        ? c
                        : R === null
                        ? (R = Object.getOwnPropertyDescriptor(c, m))
                        : R;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    k = Reflect.decorate(g, c, m, R);
                  else
                    for (var P = g.length - 1; P >= 0; P--)
                      (A = g[P]) &&
                        (k =
                          (T < 3 ? A(k) : T > 3 ? A(c, m, k) : A(c, m)) || k);
                  return T > 3 && k && Object.defineProperty(c, m, k), k;
                },
              u =
                (this && this.__param) ||
                function (g, c) {
                  return function (m, R) {
                    c(m, R, g);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.ThemeService = r.DEFAULT_ANSI_COLORS = void 0);
            const n = o(7239),
              d = o(8055),
              f = o(8460),
              p = o(844),
              l = o(2585),
              t = d.css.toColor("#ffffff"),
              i = d.css.toColor("#000000"),
              e = d.css.toColor("#ffffff"),
              s = d.css.toColor("#000000"),
              a = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
            r.DEFAULT_ANSI_COLORS = Object.freeze(
              (() => {
                const g = [
                    d.css.toColor("#2e3436"),
                    d.css.toColor("#cc0000"),
                    d.css.toColor("#4e9a06"),
                    d.css.toColor("#c4a000"),
                    d.css.toColor("#3465a4"),
                    d.css.toColor("#75507b"),
                    d.css.toColor("#06989a"),
                    d.css.toColor("#d3d7cf"),
                    d.css.toColor("#555753"),
                    d.css.toColor("#ef2929"),
                    d.css.toColor("#8ae234"),
                    d.css.toColor("#fce94f"),
                    d.css.toColor("#729fcf"),
                    d.css.toColor("#ad7fa8"),
                    d.css.toColor("#34e2e2"),
                    d.css.toColor("#eeeeec"),
                  ],
                  c = [0, 95, 135, 175, 215, 255];
                for (let m = 0; m < 216; m++) {
                  const R = c[(m / 36) % 6 | 0],
                    A = c[(m / 6) % 6 | 0],
                    T = c[m % 6];
                  g.push({
                    css: d.channels.toCss(R, A, T),
                    rgba: d.channels.toRgba(R, A, T),
                  });
                }
                for (let m = 0; m < 24; m++) {
                  const R = 8 + 10 * m;
                  g.push({
                    css: d.channels.toCss(R, R, R),
                    rgba: d.channels.toRgba(R, R, R),
                  });
                }
                return g;
              })()
            );
            let v = (r.ThemeService = class extends p.Disposable {
              get colors() {
                return this._colors;
              }
              constructor(g) {
                super(),
                  (this._optionsService = g),
                  (this._contrastCache = new n.ColorContrastCache()),
                  (this._halfContrastCache = new n.ColorContrastCache()),
                  (this._onChangeColors = this.register(new f.EventEmitter())),
                  (this.onChangeColors = this._onChangeColors.event),
                  (this._colors = {
                    foreground: t,
                    background: i,
                    cursor: e,
                    cursorAccent: s,
                    selectionForeground: void 0,
                    selectionBackgroundTransparent: a,
                    selectionBackgroundOpaque: d.color.blend(i, a),
                    selectionInactiveBackgroundTransparent: a,
                    selectionInactiveBackgroundOpaque: d.color.blend(i, a),
                    ansi: r.DEFAULT_ANSI_COLORS.slice(),
                    contrastCache: this._contrastCache,
                    halfContrastCache: this._halfContrastCache,
                  }),
                  this._updateRestoreColors(),
                  this._setTheme(this._optionsService.rawOptions.theme),
                  this.register(
                    this._optionsService.onSpecificOptionChange(
                      "minimumContrastRatio",
                      () => this._contrastCache.clear()
                    )
                  ),
                  this.register(
                    this._optionsService.onSpecificOptionChange("theme", () =>
                      this._setTheme(this._optionsService.rawOptions.theme)
                    )
                  );
              }
              _setTheme(g = {}) {
                const c = this._colors;
                if (
                  ((c.foreground = _(g.foreground, t)),
                  (c.background = _(g.background, i)),
                  (c.cursor = _(g.cursor, e)),
                  (c.cursorAccent = _(g.cursorAccent, s)),
                  (c.selectionBackgroundTransparent = _(
                    g.selectionBackground,
                    a
                  )),
                  (c.selectionBackgroundOpaque = d.color.blend(
                    c.background,
                    c.selectionBackgroundTransparent
                  )),
                  (c.selectionInactiveBackgroundTransparent = _(
                    g.selectionInactiveBackground,
                    c.selectionBackgroundTransparent
                  )),
                  (c.selectionInactiveBackgroundOpaque = d.color.blend(
                    c.background,
                    c.selectionInactiveBackgroundTransparent
                  )),
                  (c.selectionForeground = g.selectionForeground
                    ? _(g.selectionForeground, d.NULL_COLOR)
                    : void 0),
                  c.selectionForeground === d.NULL_COLOR &&
                    (c.selectionForeground = void 0),
                  d.color.isOpaque(c.selectionBackgroundTransparent) &&
                    (c.selectionBackgroundTransparent = d.color.opacity(
                      c.selectionBackgroundTransparent,
                      0.3
                    )),
                  d.color.isOpaque(c.selectionInactiveBackgroundTransparent) &&
                    (c.selectionInactiveBackgroundTransparent = d.color.opacity(
                      c.selectionInactiveBackgroundTransparent,
                      0.3
                    )),
                  (c.ansi = r.DEFAULT_ANSI_COLORS.slice()),
                  (c.ansi[0] = _(g.black, r.DEFAULT_ANSI_COLORS[0])),
                  (c.ansi[1] = _(g.red, r.DEFAULT_ANSI_COLORS[1])),
                  (c.ansi[2] = _(g.green, r.DEFAULT_ANSI_COLORS[2])),
                  (c.ansi[3] = _(g.yellow, r.DEFAULT_ANSI_COLORS[3])),
                  (c.ansi[4] = _(g.blue, r.DEFAULT_ANSI_COLORS[4])),
                  (c.ansi[5] = _(g.magenta, r.DEFAULT_ANSI_COLORS[5])),
                  (c.ansi[6] = _(g.cyan, r.DEFAULT_ANSI_COLORS[6])),
                  (c.ansi[7] = _(g.white, r.DEFAULT_ANSI_COLORS[7])),
                  (c.ansi[8] = _(g.brightBlack, r.DEFAULT_ANSI_COLORS[8])),
                  (c.ansi[9] = _(g.brightRed, r.DEFAULT_ANSI_COLORS[9])),
                  (c.ansi[10] = _(g.brightGreen, r.DEFAULT_ANSI_COLORS[10])),
                  (c.ansi[11] = _(g.brightYellow, r.DEFAULT_ANSI_COLORS[11])),
                  (c.ansi[12] = _(g.brightBlue, r.DEFAULT_ANSI_COLORS[12])),
                  (c.ansi[13] = _(g.brightMagenta, r.DEFAULT_ANSI_COLORS[13])),
                  (c.ansi[14] = _(g.brightCyan, r.DEFAULT_ANSI_COLORS[14])),
                  (c.ansi[15] = _(g.brightWhite, r.DEFAULT_ANSI_COLORS[15])),
                  g.extendedAnsi)
                ) {
                  const m = Math.min(c.ansi.length - 16, g.extendedAnsi.length);
                  for (let R = 0; R < m; R++)
                    c.ansi[R + 16] = _(
                      g.extendedAnsi[R],
                      r.DEFAULT_ANSI_COLORS[R + 16]
                    );
                }
                this._contrastCache.clear(),
                  this._halfContrastCache.clear(),
                  this._updateRestoreColors(),
                  this._onChangeColors.fire(this.colors);
              }
              restoreColor(g) {
                this._restoreColor(g), this._onChangeColors.fire(this.colors);
              }
              _restoreColor(g) {
                if (g !== void 0)
                  switch (g) {
                    case 256:
                      this._colors.foreground = this._restoreColors.foreground;
                      break;
                    case 257:
                      this._colors.background = this._restoreColors.background;
                      break;
                    case 258:
                      this._colors.cursor = this._restoreColors.cursor;
                      break;
                    default:
                      this._colors.ansi[g] = this._restoreColors.ansi[g];
                  }
                else
                  for (let c = 0; c < this._restoreColors.ansi.length; ++c)
                    this._colors.ansi[c] = this._restoreColors.ansi[c];
              }
              modifyColors(g) {
                g(this._colors), this._onChangeColors.fire(this.colors);
              }
              _updateRestoreColors() {
                this._restoreColors = {
                  foreground: this._colors.foreground,
                  background: this._colors.background,
                  cursor: this._colors.cursor,
                  ansi: this._colors.ansi.slice(),
                };
              }
            });
            function _(g, c) {
              if (g !== void 0)
                try {
                  return d.css.toColor(g);
                } catch {}
              return c;
            }
            r.ThemeService = v = h([u(0, l.IOptionsService)], v);
          },
          6349: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CircularList = void 0);
            const h = o(8460),
              u = o(844);
            class n extends u.Disposable {
              constructor(f) {
                super(),
                  (this._maxLength = f),
                  (this.onDeleteEmitter = this.register(new h.EventEmitter())),
                  (this.onDelete = this.onDeleteEmitter.event),
                  (this.onInsertEmitter = this.register(new h.EventEmitter())),
                  (this.onInsert = this.onInsertEmitter.event),
                  (this.onTrimEmitter = this.register(new h.EventEmitter())),
                  (this.onTrim = this.onTrimEmitter.event),
                  (this._array = new Array(this._maxLength)),
                  (this._startIndex = 0),
                  (this._length = 0);
              }
              get maxLength() {
                return this._maxLength;
              }
              set maxLength(f) {
                if (this._maxLength === f) return;
                const p = new Array(f);
                for (let l = 0; l < Math.min(f, this.length); l++)
                  p[l] = this._array[this._getCyclicIndex(l)];
                (this._array = p),
                  (this._maxLength = f),
                  (this._startIndex = 0);
              }
              get length() {
                return this._length;
              }
              set length(f) {
                if (f > this._length)
                  for (let p = this._length; p < f; p++)
                    this._array[p] = void 0;
                this._length = f;
              }
              get(f) {
                return this._array[this._getCyclicIndex(f)];
              }
              set(f, p) {
                this._array[this._getCyclicIndex(f)] = p;
              }
              push(f) {
                (this._array[this._getCyclicIndex(this._length)] = f),
                  this._length === this._maxLength
                    ? ((this._startIndex =
                        ++this._startIndex % this._maxLength),
                      this.onTrimEmitter.fire(1))
                    : this._length++;
              }
              recycle() {
                if (this._length !== this._maxLength)
                  throw new Error("Can only recycle when the buffer is full");
                return (
                  (this._startIndex = ++this._startIndex % this._maxLength),
                  this.onTrimEmitter.fire(1),
                  this._array[this._getCyclicIndex(this._length - 1)]
                );
              }
              get isFull() {
                return this._length === this._maxLength;
              }
              pop() {
                return this._array[this._getCyclicIndex(this._length-- - 1)];
              }
              splice(f, p, ...l) {
                if (p) {
                  for (let t = f; t < this._length - p; t++)
                    this._array[this._getCyclicIndex(t)] =
                      this._array[this._getCyclicIndex(t + p)];
                  (this._length -= p),
                    this.onDeleteEmitter.fire({ index: f, amount: p });
                }
                for (let t = this._length - 1; t >= f; t--)
                  this._array[this._getCyclicIndex(t + l.length)] =
                    this._array[this._getCyclicIndex(t)];
                for (let t = 0; t < l.length; t++)
                  this._array[this._getCyclicIndex(f + t)] = l[t];
                if (
                  (l.length &&
                    this.onInsertEmitter.fire({ index: f, amount: l.length }),
                  this._length + l.length > this._maxLength)
                ) {
                  const t = this._length + l.length - this._maxLength;
                  (this._startIndex += t),
                    (this._length = this._maxLength),
                    this.onTrimEmitter.fire(t);
                } else this._length += l.length;
              }
              trimStart(f) {
                f > this._length && (f = this._length),
                  (this._startIndex += f),
                  (this._length -= f),
                  this.onTrimEmitter.fire(f);
              }
              shiftElements(f, p, l) {
                if (!(p <= 0)) {
                  if (f < 0 || f >= this._length)
                    throw new Error("start argument out of range");
                  if (f + l < 0)
                    throw new Error(
                      "Cannot shift elements in list beyond index 0"
                    );
                  if (l > 0) {
                    for (let i = p - 1; i >= 0; i--)
                      this.set(f + i + l, this.get(f + i));
                    const t = f + p + l - this._length;
                    if (t > 0)
                      for (this._length += t; this._length > this._maxLength; )
                        this._length--,
                          this._startIndex++,
                          this.onTrimEmitter.fire(1);
                  } else
                    for (let t = 0; t < p; t++)
                      this.set(f + t + l, this.get(f + t));
                }
              }
              _getCyclicIndex(f) {
                return (this._startIndex + f) % this._maxLength;
              }
            }
            r.CircularList = n;
          },
          1439: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.clone = void 0),
              (r.clone = function o(h, u = 5) {
                if (typeof h != "object") return h;
                const n = Array.isArray(h) ? [] : {};
                for (const d in h)
                  n[d] = u <= 1 ? h[d] : h[d] && o(h[d], u - 1);
                return n;
              });
          },
          8055: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.contrastRatio =
                r.toPaddedHex =
                r.rgba =
                r.rgb =
                r.css =
                r.color =
                r.channels =
                r.NULL_COLOR =
                  void 0);
            let o = 0,
              h = 0,
              u = 0,
              n = 0;
            var d, f, p, l, t;
            function i(s) {
              const a = s.toString(16);
              return a.length < 2 ? "0" + a : a;
            }
            function e(s, a) {
              return s < a ? (a + 0.05) / (s + 0.05) : (s + 0.05) / (a + 0.05);
            }
            (r.NULL_COLOR = { css: "#00000000", rgba: 0 }),
              (function (s) {
                (s.toCss = function (a, v, _, g) {
                  return g !== void 0
                    ? `#${i(a)}${i(v)}${i(_)}${i(g)}`
                    : `#${i(a)}${i(v)}${i(_)}`;
                }),
                  (s.toRgba = function (a, v, _, g = 255) {
                    return ((a << 24) | (v << 16) | (_ << 8) | g) >>> 0;
                  }),
                  (s.toColor = function (a, v, _, g) {
                    return {
                      css: s.toCss(a, v, _, g),
                      rgba: s.toRgba(a, v, _, g),
                    };
                  });
              })(d || (r.channels = d = {})),
              (function (s) {
                function a(v, _) {
                  return (
                    (n = Math.round(255 * _)),
                    ([o, h, u] = t.toChannels(v.rgba)),
                    { css: d.toCss(o, h, u, n), rgba: d.toRgba(o, h, u, n) }
                  );
                }
                (s.blend = function (v, _) {
                  if (((n = (255 & _.rgba) / 255), n === 1))
                    return { css: _.css, rgba: _.rgba };
                  const g = (_.rgba >> 24) & 255,
                    c = (_.rgba >> 16) & 255,
                    m = (_.rgba >> 8) & 255,
                    R = (v.rgba >> 24) & 255,
                    A = (v.rgba >> 16) & 255,
                    T = (v.rgba >> 8) & 255;
                  return (
                    (o = R + Math.round((g - R) * n)),
                    (h = A + Math.round((c - A) * n)),
                    (u = T + Math.round((m - T) * n)),
                    { css: d.toCss(o, h, u), rgba: d.toRgba(o, h, u) }
                  );
                }),
                  (s.isOpaque = function (v) {
                    return (255 & v.rgba) == 255;
                  }),
                  (s.ensureContrastRatio = function (v, _, g) {
                    const c = t.ensureContrastRatio(v.rgba, _.rgba, g);
                    if (c)
                      return d.toColor(
                        (c >> 24) & 255,
                        (c >> 16) & 255,
                        (c >> 8) & 255
                      );
                  }),
                  (s.opaque = function (v) {
                    const _ = (255 | v.rgba) >>> 0;
                    return (
                      ([o, h, u] = t.toChannels(_)),
                      { css: d.toCss(o, h, u), rgba: _ }
                    );
                  }),
                  (s.opacity = a),
                  (s.multiplyOpacity = function (v, _) {
                    return (n = 255 & v.rgba), a(v, (n * _) / 255);
                  }),
                  (s.toColorRGB = function (v) {
                    return [
                      (v.rgba >> 24) & 255,
                      (v.rgba >> 16) & 255,
                      (v.rgba >> 8) & 255,
                    ];
                  });
              })(f || (r.color = f = {})),
              (function (s) {
                let a, v;
                try {
                  const _ = document.createElement("canvas");
                  (_.width = 1), (_.height = 1);
                  const g = _.getContext("2d", { willReadFrequently: !0 });
                  g &&
                    ((a = g),
                    (a.globalCompositeOperation = "copy"),
                    (v = a.createLinearGradient(0, 0, 1, 1)));
                } catch {}
                s.toColor = function (_) {
                  if (_.match(/#[\da-f]{3,8}/i))
                    switch (_.length) {
                      case 4:
                        return (
                          (o = parseInt(_.slice(1, 2).repeat(2), 16)),
                          (h = parseInt(_.slice(2, 3).repeat(2), 16)),
                          (u = parseInt(_.slice(3, 4).repeat(2), 16)),
                          d.toColor(o, h, u)
                        );
                      case 5:
                        return (
                          (o = parseInt(_.slice(1, 2).repeat(2), 16)),
                          (h = parseInt(_.slice(2, 3).repeat(2), 16)),
                          (u = parseInt(_.slice(3, 4).repeat(2), 16)),
                          (n = parseInt(_.slice(4, 5).repeat(2), 16)),
                          d.toColor(o, h, u, n)
                        );
                      case 7:
                        return {
                          css: _,
                          rgba: ((parseInt(_.slice(1), 16) << 8) | 255) >>> 0,
                        };
                      case 9:
                        return { css: _, rgba: parseInt(_.slice(1), 16) >>> 0 };
                    }
                  const g = _.match(
                    /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/
                  );
                  if (g)
                    return (
                      (o = parseInt(g[1])),
                      (h = parseInt(g[2])),
                      (u = parseInt(g[3])),
                      (n = Math.round(
                        255 * (g[5] === void 0 ? 1 : parseFloat(g[5]))
                      )),
                      d.toColor(o, h, u, n)
                    );
                  if (!a || !v)
                    throw new Error("css.toColor: Unsupported css format");
                  if (
                    ((a.fillStyle = v),
                    (a.fillStyle = _),
                    typeof a.fillStyle != "string")
                  )
                    throw new Error("css.toColor: Unsupported css format");
                  if (
                    (a.fillRect(0, 0, 1, 1),
                    ([o, h, u, n] = a.getImageData(0, 0, 1, 1).data),
                    n !== 255)
                  )
                    throw new Error("css.toColor: Unsupported css format");
                  return { rgba: d.toRgba(o, h, u, n), css: _ };
                };
              })(p || (r.css = p = {})),
              (function (s) {
                function a(v, _, g) {
                  const c = v / 255,
                    m = _ / 255,
                    R = g / 255;
                  return (
                    0.2126 *
                      (c <= 0.03928
                        ? c / 12.92
                        : Math.pow((c + 0.055) / 1.055, 2.4)) +
                    0.7152 *
                      (m <= 0.03928
                        ? m / 12.92
                        : Math.pow((m + 0.055) / 1.055, 2.4)) +
                    0.0722 *
                      (R <= 0.03928
                        ? R / 12.92
                        : Math.pow((R + 0.055) / 1.055, 2.4))
                  );
                }
                (s.relativeLuminance = function (v) {
                  return a((v >> 16) & 255, (v >> 8) & 255, 255 & v);
                }),
                  (s.relativeLuminance2 = a);
              })(l || (r.rgb = l = {})),
              (function (s) {
                function a(_, g, c) {
                  const m = (_ >> 24) & 255,
                    R = (_ >> 16) & 255,
                    A = (_ >> 8) & 255;
                  let T = (g >> 24) & 255,
                    k = (g >> 16) & 255,
                    P = (g >> 8) & 255,
                    F = e(
                      l.relativeLuminance2(T, k, P),
                      l.relativeLuminance2(m, R, A)
                    );
                  for (; F < c && (T > 0 || k > 0 || P > 0); )
                    (T -= Math.max(0, Math.ceil(0.1 * T))),
                      (k -= Math.max(0, Math.ceil(0.1 * k))),
                      (P -= Math.max(0, Math.ceil(0.1 * P))),
                      (F = e(
                        l.relativeLuminance2(T, k, P),
                        l.relativeLuminance2(m, R, A)
                      ));
                  return ((T << 24) | (k << 16) | (P << 8) | 255) >>> 0;
                }
                function v(_, g, c) {
                  const m = (_ >> 24) & 255,
                    R = (_ >> 16) & 255,
                    A = (_ >> 8) & 255;
                  let T = (g >> 24) & 255,
                    k = (g >> 16) & 255,
                    P = (g >> 8) & 255,
                    F = e(
                      l.relativeLuminance2(T, k, P),
                      l.relativeLuminance2(m, R, A)
                    );
                  for (; F < c && (T < 255 || k < 255 || P < 255); )
                    (T = Math.min(255, T + Math.ceil(0.1 * (255 - T)))),
                      (k = Math.min(255, k + Math.ceil(0.1 * (255 - k)))),
                      (P = Math.min(255, P + Math.ceil(0.1 * (255 - P)))),
                      (F = e(
                        l.relativeLuminance2(T, k, P),
                        l.relativeLuminance2(m, R, A)
                      ));
                  return ((T << 24) | (k << 16) | (P << 8) | 255) >>> 0;
                }
                (s.blend = function (_, g) {
                  if (((n = (255 & g) / 255), n === 1)) return g;
                  const c = (g >> 24) & 255,
                    m = (g >> 16) & 255,
                    R = (g >> 8) & 255,
                    A = (_ >> 24) & 255,
                    T = (_ >> 16) & 255,
                    k = (_ >> 8) & 255;
                  return (
                    (o = A + Math.round((c - A) * n)),
                    (h = T + Math.round((m - T) * n)),
                    (u = k + Math.round((R - k) * n)),
                    d.toRgba(o, h, u)
                  );
                }),
                  (s.ensureContrastRatio = function (_, g, c) {
                    const m = l.relativeLuminance(_ >> 8),
                      R = l.relativeLuminance(g >> 8);
                    if (e(m, R) < c) {
                      if (R < m) {
                        const k = a(_, g, c),
                          P = e(m, l.relativeLuminance(k >> 8));
                        if (P < c) {
                          const F = v(_, g, c);
                          return P > e(m, l.relativeLuminance(F >> 8)) ? k : F;
                        }
                        return k;
                      }
                      const A = v(_, g, c),
                        T = e(m, l.relativeLuminance(A >> 8));
                      if (T < c) {
                        const k = a(_, g, c);
                        return T > e(m, l.relativeLuminance(k >> 8)) ? A : k;
                      }
                      return A;
                    }
                  }),
                  (s.reduceLuminance = a),
                  (s.increaseLuminance = v),
                  (s.toChannels = function (_) {
                    return [
                      (_ >> 24) & 255,
                      (_ >> 16) & 255,
                      (_ >> 8) & 255,
                      255 & _,
                    ];
                  });
              })(t || (r.rgba = t = {})),
              (r.toPaddedHex = i),
              (r.contrastRatio = e);
          },
          8969: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CoreTerminal = void 0);
            const h = o(844),
              u = o(2585),
              n = o(4348),
              d = o(7866),
              f = o(744),
              p = o(7302),
              l = o(6975),
              t = o(8460),
              i = o(1753),
              e = o(1480),
              s = o(7994),
              a = o(9282),
              v = o(5435),
              _ = o(5981),
              g = o(2660);
            let c = !1;
            class m extends h.Disposable {
              get onScroll() {
                return (
                  this._onScrollApi ||
                    ((this._onScrollApi = this.register(new t.EventEmitter())),
                    this._onScroll.event((A) => {
                      this._onScrollApi?.fire(A.position);
                    })),
                  this._onScrollApi.event
                );
              }
              get cols() {
                return this._bufferService.cols;
              }
              get rows() {
                return this._bufferService.rows;
              }
              get buffers() {
                return this._bufferService.buffers;
              }
              get options() {
                return this.optionsService.options;
              }
              set options(A) {
                for (const T in A) this.optionsService.options[T] = A[T];
              }
              constructor(A) {
                super(),
                  (this._windowsWrappingHeuristics = this.register(
                    new h.MutableDisposable()
                  )),
                  (this._onBinary = this.register(new t.EventEmitter())),
                  (this.onBinary = this._onBinary.event),
                  (this._onData = this.register(new t.EventEmitter())),
                  (this.onData = this._onData.event),
                  (this._onLineFeed = this.register(new t.EventEmitter())),
                  (this.onLineFeed = this._onLineFeed.event),
                  (this._onResize = this.register(new t.EventEmitter())),
                  (this.onResize = this._onResize.event),
                  (this._onWriteParsed = this.register(new t.EventEmitter())),
                  (this.onWriteParsed = this._onWriteParsed.event),
                  (this._onScroll = this.register(new t.EventEmitter())),
                  (this._instantiationService = new n.InstantiationService()),
                  (this.optionsService = this.register(
                    new p.OptionsService(A)
                  )),
                  this._instantiationService.setService(
                    u.IOptionsService,
                    this.optionsService
                  ),
                  (this._bufferService = this.register(
                    this._instantiationService.createInstance(f.BufferService)
                  )),
                  this._instantiationService.setService(
                    u.IBufferService,
                    this._bufferService
                  ),
                  (this._logService = this.register(
                    this._instantiationService.createInstance(d.LogService)
                  )),
                  this._instantiationService.setService(
                    u.ILogService,
                    this._logService
                  ),
                  (this.coreService = this.register(
                    this._instantiationService.createInstance(l.CoreService)
                  )),
                  this._instantiationService.setService(
                    u.ICoreService,
                    this.coreService
                  ),
                  (this.coreMouseService = this.register(
                    this._instantiationService.createInstance(
                      i.CoreMouseService
                    )
                  )),
                  this._instantiationService.setService(
                    u.ICoreMouseService,
                    this.coreMouseService
                  ),
                  (this.unicodeService = this.register(
                    this._instantiationService.createInstance(e.UnicodeService)
                  )),
                  this._instantiationService.setService(
                    u.IUnicodeService,
                    this.unicodeService
                  ),
                  (this._charsetService =
                    this._instantiationService.createInstance(
                      s.CharsetService
                    )),
                  this._instantiationService.setService(
                    u.ICharsetService,
                    this._charsetService
                  ),
                  (this._oscLinkService =
                    this._instantiationService.createInstance(
                      g.OscLinkService
                    )),
                  this._instantiationService.setService(
                    u.IOscLinkService,
                    this._oscLinkService
                  ),
                  (this._inputHandler = this.register(
                    new v.InputHandler(
                      this._bufferService,
                      this._charsetService,
                      this.coreService,
                      this._logService,
                      this.optionsService,
                      this._oscLinkService,
                      this.coreMouseService,
                      this.unicodeService
                    )
                  )),
                  this.register(
                    (0, t.forwardEvent)(
                      this._inputHandler.onLineFeed,
                      this._onLineFeed
                    )
                  ),
                  this.register(this._inputHandler),
                  this.register(
                    (0, t.forwardEvent)(
                      this._bufferService.onResize,
                      this._onResize
                    )
                  ),
                  this.register(
                    (0, t.forwardEvent)(this.coreService.onData, this._onData)
                  ),
                  this.register(
                    (0, t.forwardEvent)(
                      this.coreService.onBinary,
                      this._onBinary
                    )
                  ),
                  this.register(
                    this.coreService.onRequestScrollToBottom(() =>
                      this.scrollToBottom()
                    )
                  ),
                  this.register(
                    this.coreService.onUserInput(() =>
                      this._writeBuffer.handleUserInput()
                    )
                  ),
                  this.register(
                    this.optionsService.onMultipleOptionChange(
                      ["windowsMode", "windowsPty"],
                      () => this._handleWindowsPtyOptionChange()
                    )
                  ),
                  this.register(
                    this._bufferService.onScroll((T) => {
                      this._onScroll.fire({
                        position: this._bufferService.buffer.ydisp,
                        source: 0,
                      }),
                        this._inputHandler.markRangeDirty(
                          this._bufferService.buffer.scrollTop,
                          this._bufferService.buffer.scrollBottom
                        );
                    })
                  ),
                  this.register(
                    this._inputHandler.onScroll((T) => {
                      this._onScroll.fire({
                        position: this._bufferService.buffer.ydisp,
                        source: 0,
                      }),
                        this._inputHandler.markRangeDirty(
                          this._bufferService.buffer.scrollTop,
                          this._bufferService.buffer.scrollBottom
                        );
                    })
                  ),
                  (this._writeBuffer = this.register(
                    new _.WriteBuffer((T, k) => this._inputHandler.parse(T, k))
                  )),
                  this.register(
                    (0, t.forwardEvent)(
                      this._writeBuffer.onWriteParsed,
                      this._onWriteParsed
                    )
                  );
              }
              write(A, T) {
                this._writeBuffer.write(A, T);
              }
              writeSync(A, T) {
                this._logService.logLevel <= u.LogLevelEnum.WARN &&
                  !c &&
                  (this._logService.warn(
                    "writeSync is unreliable and will be removed soon."
                  ),
                  (c = !0)),
                  this._writeBuffer.writeSync(A, T);
              }
              input(A, T = !0) {
                this.coreService.triggerDataEvent(A, T);
              }
              resize(A, T) {
                isNaN(A) ||
                  isNaN(T) ||
                  ((A = Math.max(A, f.MINIMUM_COLS)),
                  (T = Math.max(T, f.MINIMUM_ROWS)),
                  this._bufferService.resize(A, T));
              }
              scroll(A, T = !1) {
                this._bufferService.scroll(A, T);
              }
              scrollLines(A, T, k) {
                this._bufferService.scrollLines(A, T, k);
              }
              scrollPages(A) {
                this.scrollLines(A * (this.rows - 1));
              }
              scrollToTop() {
                this.scrollLines(-this._bufferService.buffer.ydisp);
              }
              scrollToBottom() {
                this.scrollLines(
                  this._bufferService.buffer.ybase -
                    this._bufferService.buffer.ydisp
                );
              }
              scrollToLine(A) {
                const T = A - this._bufferService.buffer.ydisp;
                T !== 0 && this.scrollLines(T);
              }
              registerEscHandler(A, T) {
                return this._inputHandler.registerEscHandler(A, T);
              }
              registerDcsHandler(A, T) {
                return this._inputHandler.registerDcsHandler(A, T);
              }
              registerCsiHandler(A, T) {
                return this._inputHandler.registerCsiHandler(A, T);
              }
              registerOscHandler(A, T) {
                return this._inputHandler.registerOscHandler(A, T);
              }
              _setup() {
                this._handleWindowsPtyOptionChange();
              }
              reset() {
                this._inputHandler.reset(),
                  this._bufferService.reset(),
                  this._charsetService.reset(),
                  this.coreService.reset(),
                  this.coreMouseService.reset();
              }
              _handleWindowsPtyOptionChange() {
                let A = !1;
                const T = this.optionsService.rawOptions.windowsPty;
                T && T.buildNumber !== void 0 && T.buildNumber !== void 0
                  ? (A = T.backend === "conpty" && T.buildNumber < 21376)
                  : this.optionsService.rawOptions.windowsMode && (A = !0),
                  A
                    ? this._enableWindowsWrappingHeuristics()
                    : this._windowsWrappingHeuristics.clear();
              }
              _enableWindowsWrappingHeuristics() {
                if (!this._windowsWrappingHeuristics.value) {
                  const A = [];
                  A.push(
                    this.onLineFeed(
                      a.updateWindowsModeWrappedState.bind(
                        null,
                        this._bufferService
                      )
                    )
                  ),
                    A.push(
                      this.registerCsiHandler(
                        { final: "H" },
                        () => (
                          (0, a.updateWindowsModeWrappedState)(
                            this._bufferService
                          ),
                          !1
                        )
                      )
                    ),
                    (this._windowsWrappingHeuristics.value = (0,
                    h.toDisposable)(() => {
                      for (const T of A) T.dispose();
                    }));
                }
              }
            }
            r.CoreTerminal = m;
          },
          8460: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.runAndSubscribe = r.forwardEvent = r.EventEmitter = void 0),
              (r.EventEmitter = class {
                constructor() {
                  (this._listeners = []), (this._disposed = !1);
                }
                get event() {
                  return (
                    this._event ||
                      (this._event = (o) => (
                        this._listeners.push(o),
                        {
                          dispose: () => {
                            if (!this._disposed) {
                              for (let h = 0; h < this._listeners.length; h++)
                                if (this._listeners[h] === o)
                                  return void this._listeners.splice(h, 1);
                            }
                          },
                        }
                      )),
                    this._event
                  );
                }
                fire(o, h) {
                  const u = [];
                  for (let n = 0; n < this._listeners.length; n++)
                    u.push(this._listeners[n]);
                  for (let n = 0; n < u.length; n++) u[n].call(void 0, o, h);
                }
                dispose() {
                  this.clearListeners(), (this._disposed = !0);
                }
                clearListeners() {
                  this._listeners && (this._listeners.length = 0);
                }
              }),
              (r.forwardEvent = function (o, h) {
                return o((u) => h.fire(u));
              }),
              (r.runAndSubscribe = function (o, h) {
                return h(void 0), o((u) => h(u));
              });
          },
          5435: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (z, S, x, D) {
                  var O,
                    W = arguments.length,
                    $ =
                      W < 3
                        ? S
                        : D === null
                        ? (D = Object.getOwnPropertyDescriptor(S, x))
                        : D;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    $ = Reflect.decorate(z, S, x, D);
                  else
                    for (var V = z.length - 1; V >= 0; V--)
                      (O = z[V]) &&
                        ($ =
                          (W < 3 ? O($) : W > 3 ? O(S, x, $) : O(S, x)) || $);
                  return W > 3 && $ && Object.defineProperty(S, x, $), $;
                },
              u =
                (this && this.__param) ||
                function (z, S) {
                  return function (x, D) {
                    S(x, D, z);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.InputHandler = r.WindowsOptionsReportType = void 0);
            const n = o(2584),
              d = o(7116),
              f = o(2015),
              p = o(844),
              l = o(482),
              t = o(8437),
              i = o(8460),
              e = o(643),
              s = o(511),
              a = o(3734),
              v = o(2585),
              _ = o(1480),
              g = o(6242),
              c = o(6351),
              m = o(5941),
              R = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 },
              A = 131072;
            function T(z, S) {
              if (z > 24) return S.setWinLines || !1;
              switch (z) {
                case 1:
                  return !!S.restoreWin;
                case 2:
                  return !!S.minimizeWin;
                case 3:
                  return !!S.setWinPosition;
                case 4:
                  return !!S.setWinSizePixels;
                case 5:
                  return !!S.raiseWin;
                case 6:
                  return !!S.lowerWin;
                case 7:
                  return !!S.refreshWin;
                case 8:
                  return !!S.setWinSizeChars;
                case 9:
                  return !!S.maximizeWin;
                case 10:
                  return !!S.fullscreenWin;
                case 11:
                  return !!S.getWinState;
                case 13:
                  return !!S.getWinPosition;
                case 14:
                  return !!S.getWinSizePixels;
                case 15:
                  return !!S.getScreenSizePixels;
                case 16:
                  return !!S.getCellSizePixels;
                case 18:
                  return !!S.getWinSizeChars;
                case 19:
                  return !!S.getScreenSizeChars;
                case 20:
                  return !!S.getIconTitle;
                case 21:
                  return !!S.getWinTitle;
                case 22:
                  return !!S.pushTitle;
                case 23:
                  return !!S.popTitle;
                case 24:
                  return !!S.setWinLines;
              }
              return !1;
            }
            var k;
            (function (z) {
              (z[(z.GET_WIN_SIZE_PIXELS = 0)] = "GET_WIN_SIZE_PIXELS"),
                (z[(z.GET_CELL_SIZE_PIXELS = 1)] = "GET_CELL_SIZE_PIXELS");
            })(k || (r.WindowsOptionsReportType = k = {}));
            let P = 0;
            class F extends p.Disposable {
              getAttrData() {
                return this._curAttrData;
              }
              constructor(
                S,
                x,
                D,
                O,
                W,
                $,
                V,
                G,
                M = new f.EscapeSequenceParser()
              ) {
                super(),
                  (this._bufferService = S),
                  (this._charsetService = x),
                  (this._coreService = D),
                  (this._logService = O),
                  (this._optionsService = W),
                  (this._oscLinkService = $),
                  (this._coreMouseService = V),
                  (this._unicodeService = G),
                  (this._parser = M),
                  (this._parseBuffer = new Uint32Array(4096)),
                  (this._stringDecoder = new l.StringToUtf32()),
                  (this._utf8Decoder = new l.Utf8ToUtf32()),
                  (this._workCell = new s.CellData()),
                  (this._windowTitle = ""),
                  (this._iconName = ""),
                  (this._windowTitleStack = []),
                  (this._iconNameStack = []),
                  (this._curAttrData = t.DEFAULT_ATTR_DATA.clone()),
                  (this._eraseAttrDataInternal = t.DEFAULT_ATTR_DATA.clone()),
                  (this._onRequestBell = this.register(new i.EventEmitter())),
                  (this.onRequestBell = this._onRequestBell.event),
                  (this._onRequestRefreshRows = this.register(
                    new i.EventEmitter()
                  )),
                  (this.onRequestRefreshRows =
                    this._onRequestRefreshRows.event),
                  (this._onRequestReset = this.register(new i.EventEmitter())),
                  (this.onRequestReset = this._onRequestReset.event),
                  (this._onRequestSendFocus = this.register(
                    new i.EventEmitter()
                  )),
                  (this.onRequestSendFocus = this._onRequestSendFocus.event),
                  (this._onRequestSyncScrollBar = this.register(
                    new i.EventEmitter()
                  )),
                  (this.onRequestSyncScrollBar =
                    this._onRequestSyncScrollBar.event),
                  (this._onRequestWindowsOptionsReport = this.register(
                    new i.EventEmitter()
                  )),
                  (this.onRequestWindowsOptionsReport =
                    this._onRequestWindowsOptionsReport.event),
                  (this._onA11yChar = this.register(new i.EventEmitter())),
                  (this.onA11yChar = this._onA11yChar.event),
                  (this._onA11yTab = this.register(new i.EventEmitter())),
                  (this.onA11yTab = this._onA11yTab.event),
                  (this._onCursorMove = this.register(new i.EventEmitter())),
                  (this.onCursorMove = this._onCursorMove.event),
                  (this._onLineFeed = this.register(new i.EventEmitter())),
                  (this.onLineFeed = this._onLineFeed.event),
                  (this._onScroll = this.register(new i.EventEmitter())),
                  (this.onScroll = this._onScroll.event),
                  (this._onTitleChange = this.register(new i.EventEmitter())),
                  (this.onTitleChange = this._onTitleChange.event),
                  (this._onColor = this.register(new i.EventEmitter())),
                  (this.onColor = this._onColor.event),
                  (this._parseStack = {
                    paused: !1,
                    cursorStartX: 0,
                    cursorStartY: 0,
                    decodedLength: 0,
                    position: 0,
                  }),
                  (this._specialColors = [256, 257, 258]),
                  this.register(this._parser),
                  (this._dirtyRowTracker = new U(this._bufferService)),
                  (this._activeBuffer = this._bufferService.buffer),
                  this.register(
                    this._bufferService.buffers.onBufferActivate(
                      (y) => (this._activeBuffer = y.activeBuffer)
                    )
                  ),
                  this._parser.setCsiHandlerFallback((y, I) => {
                    this._logService.debug("Unknown CSI code: ", {
                      identifier: this._parser.identToString(y),
                      params: I.toArray(),
                    });
                  }),
                  this._parser.setEscHandlerFallback((y) => {
                    this._logService.debug("Unknown ESC code: ", {
                      identifier: this._parser.identToString(y),
                    });
                  }),
                  this._parser.setExecuteHandlerFallback((y) => {
                    this._logService.debug("Unknown EXECUTE code: ", {
                      code: y,
                    });
                  }),
                  this._parser.setOscHandlerFallback((y, I, N) => {
                    this._logService.debug("Unknown OSC code: ", {
                      identifier: y,
                      action: I,
                      data: N,
                    });
                  }),
                  this._parser.setDcsHandlerFallback((y, I, N) => {
                    I === "HOOK" && (N = N.toArray()),
                      this._logService.debug("Unknown DCS code: ", {
                        identifier: this._parser.identToString(y),
                        action: I,
                        payload: N,
                      });
                  }),
                  this._parser.setPrintHandler((y, I, N) =>
                    this.print(y, I, N)
                  ),
                  this._parser.registerCsiHandler({ final: "@" }, (y) =>
                    this.insertChars(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: " ", final: "@" },
                    (y) => this.scrollLeft(y)
                  ),
                  this._parser.registerCsiHandler({ final: "A" }, (y) =>
                    this.cursorUp(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: " ", final: "A" },
                    (y) => this.scrollRight(y)
                  ),
                  this._parser.registerCsiHandler({ final: "B" }, (y) =>
                    this.cursorDown(y)
                  ),
                  this._parser.registerCsiHandler({ final: "C" }, (y) =>
                    this.cursorForward(y)
                  ),
                  this._parser.registerCsiHandler({ final: "D" }, (y) =>
                    this.cursorBackward(y)
                  ),
                  this._parser.registerCsiHandler({ final: "E" }, (y) =>
                    this.cursorNextLine(y)
                  ),
                  this._parser.registerCsiHandler({ final: "F" }, (y) =>
                    this.cursorPrecedingLine(y)
                  ),
                  this._parser.registerCsiHandler({ final: "G" }, (y) =>
                    this.cursorCharAbsolute(y)
                  ),
                  this._parser.registerCsiHandler({ final: "H" }, (y) =>
                    this.cursorPosition(y)
                  ),
                  this._parser.registerCsiHandler({ final: "I" }, (y) =>
                    this.cursorForwardTab(y)
                  ),
                  this._parser.registerCsiHandler({ final: "J" }, (y) =>
                    this.eraseInDisplay(y, !1)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: "?", final: "J" },
                    (y) => this.eraseInDisplay(y, !0)
                  ),
                  this._parser.registerCsiHandler({ final: "K" }, (y) =>
                    this.eraseInLine(y, !1)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: "?", final: "K" },
                    (y) => this.eraseInLine(y, !0)
                  ),
                  this._parser.registerCsiHandler({ final: "L" }, (y) =>
                    this.insertLines(y)
                  ),
                  this._parser.registerCsiHandler({ final: "M" }, (y) =>
                    this.deleteLines(y)
                  ),
                  this._parser.registerCsiHandler({ final: "P" }, (y) =>
                    this.deleteChars(y)
                  ),
                  this._parser.registerCsiHandler({ final: "S" }, (y) =>
                    this.scrollUp(y)
                  ),
                  this._parser.registerCsiHandler({ final: "T" }, (y) =>
                    this.scrollDown(y)
                  ),
                  this._parser.registerCsiHandler({ final: "X" }, (y) =>
                    this.eraseChars(y)
                  ),
                  this._parser.registerCsiHandler({ final: "Z" }, (y) =>
                    this.cursorBackwardTab(y)
                  ),
                  this._parser.registerCsiHandler({ final: "`" }, (y) =>
                    this.charPosAbsolute(y)
                  ),
                  this._parser.registerCsiHandler({ final: "a" }, (y) =>
                    this.hPositionRelative(y)
                  ),
                  this._parser.registerCsiHandler({ final: "b" }, (y) =>
                    this.repeatPrecedingCharacter(y)
                  ),
                  this._parser.registerCsiHandler({ final: "c" }, (y) =>
                    this.sendDeviceAttributesPrimary(y)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: ">", final: "c" },
                    (y) => this.sendDeviceAttributesSecondary(y)
                  ),
                  this._parser.registerCsiHandler({ final: "d" }, (y) =>
                    this.linePosAbsolute(y)
                  ),
                  this._parser.registerCsiHandler({ final: "e" }, (y) =>
                    this.vPositionRelative(y)
                  ),
                  this._parser.registerCsiHandler({ final: "f" }, (y) =>
                    this.hVPosition(y)
                  ),
                  this._parser.registerCsiHandler({ final: "g" }, (y) =>
                    this.tabClear(y)
                  ),
                  this._parser.registerCsiHandler({ final: "h" }, (y) =>
                    this.setMode(y)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: "?", final: "h" },
                    (y) => this.setModePrivate(y)
                  ),
                  this._parser.registerCsiHandler({ final: "l" }, (y) =>
                    this.resetMode(y)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: "?", final: "l" },
                    (y) => this.resetModePrivate(y)
                  ),
                  this._parser.registerCsiHandler({ final: "m" }, (y) =>
                    this.charAttributes(y)
                  ),
                  this._parser.registerCsiHandler({ final: "n" }, (y) =>
                    this.deviceStatus(y)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: "?", final: "n" },
                    (y) => this.deviceStatusPrivate(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: "!", final: "p" },
                    (y) => this.softReset(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: " ", final: "q" },
                    (y) => this.setCursorStyle(y)
                  ),
                  this._parser.registerCsiHandler({ final: "r" }, (y) =>
                    this.setScrollRegion(y)
                  ),
                  this._parser.registerCsiHandler({ final: "s" }, (y) =>
                    this.saveCursor(y)
                  ),
                  this._parser.registerCsiHandler({ final: "t" }, (y) =>
                    this.windowOptions(y)
                  ),
                  this._parser.registerCsiHandler({ final: "u" }, (y) =>
                    this.restoreCursor(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: "'", final: "}" },
                    (y) => this.insertColumns(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: "'", final: "~" },
                    (y) => this.deleteColumns(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: '"', final: "q" },
                    (y) => this.selectProtected(y)
                  ),
                  this._parser.registerCsiHandler(
                    { intermediates: "$", final: "p" },
                    (y) => this.requestMode(y, !0)
                  ),
                  this._parser.registerCsiHandler(
                    { prefix: "?", intermediates: "$", final: "p" },
                    (y) => this.requestMode(y, !1)
                  ),
                  this._parser.setExecuteHandler(n.C0.BEL, () => this.bell()),
                  this._parser.setExecuteHandler(n.C0.LF, () =>
                    this.lineFeed()
                  ),
                  this._parser.setExecuteHandler(n.C0.VT, () =>
                    this.lineFeed()
                  ),
                  this._parser.setExecuteHandler(n.C0.FF, () =>
                    this.lineFeed()
                  ),
                  this._parser.setExecuteHandler(n.C0.CR, () =>
                    this.carriageReturn()
                  ),
                  this._parser.setExecuteHandler(n.C0.BS, () =>
                    this.backspace()
                  ),
                  this._parser.setExecuteHandler(n.C0.HT, () => this.tab()),
                  this._parser.setExecuteHandler(n.C0.SO, () =>
                    this.shiftOut()
                  ),
                  this._parser.setExecuteHandler(n.C0.SI, () => this.shiftIn()),
                  this._parser.setExecuteHandler(n.C1.IND, () => this.index()),
                  this._parser.setExecuteHandler(n.C1.NEL, () =>
                    this.nextLine()
                  ),
                  this._parser.setExecuteHandler(n.C1.HTS, () => this.tabSet()),
                  this._parser.registerOscHandler(
                    0,
                    new g.OscHandler(
                      (y) => (this.setTitle(y), this.setIconName(y), !0)
                    )
                  ),
                  this._parser.registerOscHandler(
                    1,
                    new g.OscHandler((y) => this.setIconName(y))
                  ),
                  this._parser.registerOscHandler(
                    2,
                    new g.OscHandler((y) => this.setTitle(y))
                  ),
                  this._parser.registerOscHandler(
                    4,
                    new g.OscHandler((y) => this.setOrReportIndexedColor(y))
                  ),
                  this._parser.registerOscHandler(
                    8,
                    new g.OscHandler((y) => this.setHyperlink(y))
                  ),
                  this._parser.registerOscHandler(
                    10,
                    new g.OscHandler((y) => this.setOrReportFgColor(y))
                  ),
                  this._parser.registerOscHandler(
                    11,
                    new g.OscHandler((y) => this.setOrReportBgColor(y))
                  ),
                  this._parser.registerOscHandler(
                    12,
                    new g.OscHandler((y) => this.setOrReportCursorColor(y))
                  ),
                  this._parser.registerOscHandler(
                    104,
                    new g.OscHandler((y) => this.restoreIndexedColor(y))
                  ),
                  this._parser.registerOscHandler(
                    110,
                    new g.OscHandler((y) => this.restoreFgColor(y))
                  ),
                  this._parser.registerOscHandler(
                    111,
                    new g.OscHandler((y) => this.restoreBgColor(y))
                  ),
                  this._parser.registerOscHandler(
                    112,
                    new g.OscHandler((y) => this.restoreCursorColor(y))
                  ),
                  this._parser.registerEscHandler({ final: "7" }, () =>
                    this.saveCursor()
                  ),
                  this._parser.registerEscHandler({ final: "8" }, () =>
                    this.restoreCursor()
                  ),
                  this._parser.registerEscHandler({ final: "D" }, () =>
                    this.index()
                  ),
                  this._parser.registerEscHandler({ final: "E" }, () =>
                    this.nextLine()
                  ),
                  this._parser.registerEscHandler({ final: "H" }, () =>
                    this.tabSet()
                  ),
                  this._parser.registerEscHandler({ final: "M" }, () =>
                    this.reverseIndex()
                  ),
                  this._parser.registerEscHandler({ final: "=" }, () =>
                    this.keypadApplicationMode()
                  ),
                  this._parser.registerEscHandler({ final: ">" }, () =>
                    this.keypadNumericMode()
                  ),
                  this._parser.registerEscHandler({ final: "c" }, () =>
                    this.fullReset()
                  ),
                  this._parser.registerEscHandler({ final: "n" }, () =>
                    this.setgLevel(2)
                  ),
                  this._parser.registerEscHandler({ final: "o" }, () =>
                    this.setgLevel(3)
                  ),
                  this._parser.registerEscHandler({ final: "|" }, () =>
                    this.setgLevel(3)
                  ),
                  this._parser.registerEscHandler({ final: "}" }, () =>
                    this.setgLevel(2)
                  ),
                  this._parser.registerEscHandler({ final: "~" }, () =>
                    this.setgLevel(1)
                  ),
                  this._parser.registerEscHandler(
                    { intermediates: "%", final: "@" },
                    () => this.selectDefaultCharset()
                  ),
                  this._parser.registerEscHandler(
                    { intermediates: "%", final: "G" },
                    () => this.selectDefaultCharset()
                  );
                for (const y in d.CHARSETS)
                  this._parser.registerEscHandler(
                    { intermediates: "(", final: y },
                    () => this.selectCharset("(" + y)
                  ),
                    this._parser.registerEscHandler(
                      { intermediates: ")", final: y },
                      () => this.selectCharset(")" + y)
                    ),
                    this._parser.registerEscHandler(
                      { intermediates: "*", final: y },
                      () => this.selectCharset("*" + y)
                    ),
                    this._parser.registerEscHandler(
                      { intermediates: "+", final: y },
                      () => this.selectCharset("+" + y)
                    ),
                    this._parser.registerEscHandler(
                      { intermediates: "-", final: y },
                      () => this.selectCharset("-" + y)
                    ),
                    this._parser.registerEscHandler(
                      { intermediates: ".", final: y },
                      () => this.selectCharset("." + y)
                    ),
                    this._parser.registerEscHandler(
                      { intermediates: "/", final: y },
                      () => this.selectCharset("/" + y)
                    );
                this._parser.registerEscHandler(
                  { intermediates: "#", final: "8" },
                  () => this.screenAlignmentPattern()
                ),
                  this._parser.setErrorHandler(
                    (y) => (this._logService.error("Parsing error: ", y), y)
                  ),
                  this._parser.registerDcsHandler(
                    { intermediates: "$", final: "q" },
                    new c.DcsHandler((y, I) => this.requestStatusString(y, I))
                  );
              }
              _preserveStack(S, x, D, O) {
                (this._parseStack.paused = !0),
                  (this._parseStack.cursorStartX = S),
                  (this._parseStack.cursorStartY = x),
                  (this._parseStack.decodedLength = D),
                  (this._parseStack.position = O);
              }
              _logSlowResolvingAsync(S) {
                this._logService.logLevel <= v.LogLevelEnum.WARN &&
                  Promise.race([
                    S,
                    new Promise((x, D) =>
                      setTimeout(() => D("#SLOW_TIMEOUT"), 5e3)
                    ),
                  ]).catch((x) => {
                    if (x !== "#SLOW_TIMEOUT") throw x;
                    console.warn(
                      "async parser handler taking longer than 5000 ms"
                    );
                  });
              }
              _getCurrentLinkId() {
                return this._curAttrData.extended.urlId;
              }
              parse(S, x) {
                let D,
                  O = this._activeBuffer.x,
                  W = this._activeBuffer.y,
                  $ = 0;
                const V = this._parseStack.paused;
                if (V) {
                  if (
                    (D = this._parser.parse(
                      this._parseBuffer,
                      this._parseStack.decodedLength,
                      x
                    ))
                  )
                    return this._logSlowResolvingAsync(D), D;
                  (O = this._parseStack.cursorStartX),
                    (W = this._parseStack.cursorStartY),
                    (this._parseStack.paused = !1),
                    S.length > A && ($ = this._parseStack.position + A);
                }
                if (
                  (this._logService.logLevel <= v.LogLevelEnum.DEBUG &&
                    this._logService.debug(
                      "parsing data" +
                        (typeof S == "string"
                          ? ` "${S}"`
                          : ` "${Array.prototype.map
                              .call(S, (y) => String.fromCharCode(y))
                              .join("")}"`),
                      typeof S == "string"
                        ? S.split("").map((y) => y.charCodeAt(0))
                        : S
                    ),
                  this._parseBuffer.length < S.length &&
                    this._parseBuffer.length < A &&
                    (this._parseBuffer = new Uint32Array(
                      Math.min(S.length, A)
                    )),
                  V || this._dirtyRowTracker.clearRange(),
                  S.length > A)
                )
                  for (let y = $; y < S.length; y += A) {
                    const I = y + A < S.length ? y + A : S.length,
                      N =
                        typeof S == "string"
                          ? this._stringDecoder.decode(
                              S.substring(y, I),
                              this._parseBuffer
                            )
                          : this._utf8Decoder.decode(
                              S.subarray(y, I),
                              this._parseBuffer
                            );
                    if ((D = this._parser.parse(this._parseBuffer, N)))
                      return (
                        this._preserveStack(O, W, N, y),
                        this._logSlowResolvingAsync(D),
                        D
                      );
                  }
                else if (!V) {
                  const y =
                    typeof S == "string"
                      ? this._stringDecoder.decode(S, this._parseBuffer)
                      : this._utf8Decoder.decode(S, this._parseBuffer);
                  if ((D = this._parser.parse(this._parseBuffer, y)))
                    return (
                      this._preserveStack(O, W, y, 0),
                      this._logSlowResolvingAsync(D),
                      D
                    );
                }
                (this._activeBuffer.x === O && this._activeBuffer.y === W) ||
                  this._onCursorMove.fire();
                const G =
                    this._dirtyRowTracker.end +
                    (this._bufferService.buffer.ybase -
                      this._bufferService.buffer.ydisp),
                  M =
                    this._dirtyRowTracker.start +
                    (this._bufferService.buffer.ybase -
                      this._bufferService.buffer.ydisp);
                M < this._bufferService.rows &&
                  this._onRequestRefreshRows.fire(
                    Math.min(M, this._bufferService.rows - 1),
                    Math.min(G, this._bufferService.rows - 1)
                  );
              }
              print(S, x, D) {
                let O, W;
                const $ = this._charsetService.charset,
                  V = this._optionsService.rawOptions.screenReaderMode,
                  G = this._bufferService.cols,
                  M = this._coreService.decPrivateModes.wraparound,
                  y = this._coreService.modes.insertMode,
                  I = this._curAttrData;
                let N = this._activeBuffer.lines.get(
                  this._activeBuffer.ybase + this._activeBuffer.y
                );
                this._dirtyRowTracker.markDirty(this._activeBuffer.y),
                  this._activeBuffer.x &&
                    D - x > 0 &&
                    N.getWidth(this._activeBuffer.x - 1) === 2 &&
                    N.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, I);
                let q = this._parser.precedingJoinState;
                for (let j = x; j < D; ++j) {
                  if (((O = S[j]), O < 127 && $)) {
                    const ee = $[String.fromCharCode(O)];
                    ee && (O = ee.charCodeAt(0));
                  }
                  const Y = this._unicodeService.charProperties(O, q);
                  W = _.UnicodeService.extractWidth(Y);
                  const Z = _.UnicodeService.extractShouldJoin(Y),
                    Q = Z ? _.UnicodeService.extractWidth(q) : 0;
                  if (
                    ((q = Y),
                    V && this._onA11yChar.fire((0, l.stringFromCodePoint)(O)),
                    this._getCurrentLinkId() &&
                      this._oscLinkService.addLineToLink(
                        this._getCurrentLinkId(),
                        this._activeBuffer.ybase + this._activeBuffer.y
                      ),
                    this._activeBuffer.x + W - Q > G)
                  ) {
                    if (M) {
                      const ee = N;
                      let X = this._activeBuffer.x - Q;
                      for (
                        this._activeBuffer.x = Q,
                          this._activeBuffer.y++,
                          this._activeBuffer.y ===
                          this._activeBuffer.scrollBottom + 1
                            ? (this._activeBuffer.y--,
                              this._bufferService.scroll(
                                this._eraseAttrData(),
                                !0
                              ))
                            : (this._activeBuffer.y >=
                                this._bufferService.rows &&
                                (this._activeBuffer.y =
                                  this._bufferService.rows - 1),
                              (this._activeBuffer.lines.get(
                                this._activeBuffer.ybase + this._activeBuffer.y
                              ).isWrapped = !0)),
                          N = this._activeBuffer.lines.get(
                            this._activeBuffer.ybase + this._activeBuffer.y
                          ),
                          Q > 0 &&
                            N instanceof t.BufferLine &&
                            N.copyCellsFrom(ee, X, 0, Q, !1);
                        X < G;

                      )
                        ee.setCellFromCodepoint(X++, 0, 1, I);
                    } else if (((this._activeBuffer.x = G - 1), W === 2))
                      continue;
                  }
                  if (Z && this._activeBuffer.x) {
                    const ee = N.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
                    N.addCodepointToCell(this._activeBuffer.x - ee, O, W);
                    for (let X = W - Q; --X >= 0; )
                      N.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, I);
                  } else if (
                    (y &&
                      (N.insertCells(
                        this._activeBuffer.x,
                        W - Q,
                        this._activeBuffer.getNullCell(I)
                      ),
                      N.getWidth(G - 1) === 2 &&
                        N.setCellFromCodepoint(
                          G - 1,
                          e.NULL_CELL_CODE,
                          e.NULL_CELL_WIDTH,
                          I
                        )),
                    N.setCellFromCodepoint(this._activeBuffer.x++, O, W, I),
                    W > 0)
                  )
                    for (; --W; )
                      N.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, I);
                }
                (this._parser.precedingJoinState = q),
                  this._activeBuffer.x < G &&
                    D - x > 0 &&
                    N.getWidth(this._activeBuffer.x) === 0 &&
                    !N.hasContent(this._activeBuffer.x) &&
                    N.setCellFromCodepoint(this._activeBuffer.x, 0, 1, I),
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y);
              }
              registerCsiHandler(S, x) {
                return S.final !== "t" || S.prefix || S.intermediates
                  ? this._parser.registerCsiHandler(S, x)
                  : this._parser.registerCsiHandler(
                      S,
                      (D) =>
                        !T(
                          D.params[0],
                          this._optionsService.rawOptions.windowOptions
                        ) || x(D)
                    );
              }
              registerDcsHandler(S, x) {
                return this._parser.registerDcsHandler(S, new c.DcsHandler(x));
              }
              registerEscHandler(S, x) {
                return this._parser.registerEscHandler(S, x);
              }
              registerOscHandler(S, x) {
                return this._parser.registerOscHandler(S, new g.OscHandler(x));
              }
              bell() {
                return this._onRequestBell.fire(), !0;
              }
              lineFeed() {
                return (
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y),
                  this._optionsService.rawOptions.convertEol &&
                    (this._activeBuffer.x = 0),
                  this._activeBuffer.y++,
                  this._activeBuffer.y === this._activeBuffer.scrollBottom + 1
                    ? (this._activeBuffer.y--,
                      this._bufferService.scroll(this._eraseAttrData()))
                    : this._activeBuffer.y >= this._bufferService.rows
                    ? (this._activeBuffer.y = this._bufferService.rows - 1)
                    : (this._activeBuffer.lines.get(
                        this._activeBuffer.ybase + this._activeBuffer.y
                      ).isWrapped = !1),
                  this._activeBuffer.x >= this._bufferService.cols &&
                    this._activeBuffer.x--,
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y),
                  this._onLineFeed.fire(),
                  !0
                );
              }
              carriageReturn() {
                return (this._activeBuffer.x = 0), !0;
              }
              backspace() {
                if (!this._coreService.decPrivateModes.reverseWraparound)
                  return (
                    this._restrictCursor(),
                    this._activeBuffer.x > 0 && this._activeBuffer.x--,
                    !0
                  );
                if (
                  (this._restrictCursor(this._bufferService.cols),
                  this._activeBuffer.x > 0)
                )
                  this._activeBuffer.x--;
                else if (
                  this._activeBuffer.x === 0 &&
                  this._activeBuffer.y > this._activeBuffer.scrollTop &&
                  this._activeBuffer.y <= this._activeBuffer.scrollBottom &&
                  this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + this._activeBuffer.y
                  )?.isWrapped
                ) {
                  (this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + this._activeBuffer.y
                  ).isWrapped = !1),
                    this._activeBuffer.y--,
                    (this._activeBuffer.x = this._bufferService.cols - 1);
                  const S = this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + this._activeBuffer.y
                  );
                  S.hasWidth(this._activeBuffer.x) &&
                    !S.hasContent(this._activeBuffer.x) &&
                    this._activeBuffer.x--;
                }
                return this._restrictCursor(), !0;
              }
              tab() {
                if (this._activeBuffer.x >= this._bufferService.cols) return !0;
                const S = this._activeBuffer.x;
                return (
                  (this._activeBuffer.x = this._activeBuffer.nextStop()),
                  this._optionsService.rawOptions.screenReaderMode &&
                    this._onA11yTab.fire(this._activeBuffer.x - S),
                  !0
                );
              }
              shiftOut() {
                return this._charsetService.setgLevel(1), !0;
              }
              shiftIn() {
                return this._charsetService.setgLevel(0), !0;
              }
              _restrictCursor(S = this._bufferService.cols - 1) {
                (this._activeBuffer.x = Math.min(
                  S,
                  Math.max(0, this._activeBuffer.x)
                )),
                  (this._activeBuffer.y = this._coreService.decPrivateModes
                    .origin
                    ? Math.min(
                        this._activeBuffer.scrollBottom,
                        Math.max(
                          this._activeBuffer.scrollTop,
                          this._activeBuffer.y
                        )
                      )
                    : Math.min(
                        this._bufferService.rows - 1,
                        Math.max(0, this._activeBuffer.y)
                      )),
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y);
              }
              _setCursor(S, x) {
                this._dirtyRowTracker.markDirty(this._activeBuffer.y),
                  this._coreService.decPrivateModes.origin
                    ? ((this._activeBuffer.x = S),
                      (this._activeBuffer.y = this._activeBuffer.scrollTop + x))
                    : ((this._activeBuffer.x = S), (this._activeBuffer.y = x)),
                  this._restrictCursor(),
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y);
              }
              _moveCursor(S, x) {
                this._restrictCursor(),
                  this._setCursor(
                    this._activeBuffer.x + S,
                    this._activeBuffer.y + x
                  );
              }
              cursorUp(S) {
                const x = this._activeBuffer.y - this._activeBuffer.scrollTop;
                return (
                  x >= 0
                    ? this._moveCursor(0, -Math.min(x, S.params[0] || 1))
                    : this._moveCursor(0, -(S.params[0] || 1)),
                  !0
                );
              }
              cursorDown(S) {
                const x =
                  this._activeBuffer.scrollBottom - this._activeBuffer.y;
                return (
                  x >= 0
                    ? this._moveCursor(0, Math.min(x, S.params[0] || 1))
                    : this._moveCursor(0, S.params[0] || 1),
                  !0
                );
              }
              cursorForward(S) {
                return this._moveCursor(S.params[0] || 1, 0), !0;
              }
              cursorBackward(S) {
                return this._moveCursor(-(S.params[0] || 1), 0), !0;
              }
              cursorNextLine(S) {
                return this.cursorDown(S), (this._activeBuffer.x = 0), !0;
              }
              cursorPrecedingLine(S) {
                return this.cursorUp(S), (this._activeBuffer.x = 0), !0;
              }
              cursorCharAbsolute(S) {
                return (
                  this._setCursor((S.params[0] || 1) - 1, this._activeBuffer.y),
                  !0
                );
              }
              cursorPosition(S) {
                return (
                  this._setCursor(
                    S.length >= 2 ? (S.params[1] || 1) - 1 : 0,
                    (S.params[0] || 1) - 1
                  ),
                  !0
                );
              }
              charPosAbsolute(S) {
                return (
                  this._setCursor((S.params[0] || 1) - 1, this._activeBuffer.y),
                  !0
                );
              }
              hPositionRelative(S) {
                return this._moveCursor(S.params[0] || 1, 0), !0;
              }
              linePosAbsolute(S) {
                return (
                  this._setCursor(this._activeBuffer.x, (S.params[0] || 1) - 1),
                  !0
                );
              }
              vPositionRelative(S) {
                return this._moveCursor(0, S.params[0] || 1), !0;
              }
              hVPosition(S) {
                return this.cursorPosition(S), !0;
              }
              tabClear(S) {
                const x = S.params[0];
                return (
                  x === 0
                    ? delete this._activeBuffer.tabs[this._activeBuffer.x]
                    : x === 3 && (this._activeBuffer.tabs = {}),
                  !0
                );
              }
              cursorForwardTab(S) {
                if (this._activeBuffer.x >= this._bufferService.cols) return !0;
                let x = S.params[0] || 1;
                for (; x--; )
                  this._activeBuffer.x = this._activeBuffer.nextStop();
                return !0;
              }
              cursorBackwardTab(S) {
                if (this._activeBuffer.x >= this._bufferService.cols) return !0;
                let x = S.params[0] || 1;
                for (; x--; )
                  this._activeBuffer.x = this._activeBuffer.prevStop();
                return !0;
              }
              selectProtected(S) {
                const x = S.params[0];
                return (
                  x === 1 && (this._curAttrData.bg |= 536870912),
                  (x !== 2 && x !== 0) || (this._curAttrData.bg &= -536870913),
                  !0
                );
              }
              _eraseInBufferLine(S, x, D, O = !1, W = !1) {
                const $ = this._activeBuffer.lines.get(
                  this._activeBuffer.ybase + S
                );
                $.replaceCells(
                  x,
                  D,
                  this._activeBuffer.getNullCell(this._eraseAttrData()),
                  W
                ),
                  O && ($.isWrapped = !1);
              }
              _resetBufferLine(S, x = !1) {
                const D = this._activeBuffer.lines.get(
                  this._activeBuffer.ybase + S
                );
                D &&
                  (D.fill(
                    this._activeBuffer.getNullCell(this._eraseAttrData()),
                    x
                  ),
                  this._bufferService.buffer.clearMarkers(
                    this._activeBuffer.ybase + S
                  ),
                  (D.isWrapped = !1));
              }
              eraseInDisplay(S, x = !1) {
                let D;
                switch (
                  (this._restrictCursor(this._bufferService.cols), S.params[0])
                ) {
                  case 0:
                    for (
                      D = this._activeBuffer.y,
                        this._dirtyRowTracker.markDirty(D),
                        this._eraseInBufferLine(
                          D++,
                          this._activeBuffer.x,
                          this._bufferService.cols,
                          this._activeBuffer.x === 0,
                          x
                        );
                      D < this._bufferService.rows;
                      D++
                    )
                      this._resetBufferLine(D, x);
                    this._dirtyRowTracker.markDirty(D);
                    break;
                  case 1:
                    for (
                      D = this._activeBuffer.y,
                        this._dirtyRowTracker.markDirty(D),
                        this._eraseInBufferLine(
                          D,
                          0,
                          this._activeBuffer.x + 1,
                          !0,
                          x
                        ),
                        this._activeBuffer.x + 1 >= this._bufferService.cols &&
                          (this._activeBuffer.lines.get(D + 1).isWrapped = !1);
                      D--;

                    )
                      this._resetBufferLine(D, x);
                    this._dirtyRowTracker.markDirty(0);
                    break;
                  case 2:
                    for (
                      D = this._bufferService.rows,
                        this._dirtyRowTracker.markDirty(D - 1);
                      D--;

                    )
                      this._resetBufferLine(D, x);
                    this._dirtyRowTracker.markDirty(0);
                    break;
                  case 3:
                    const O =
                      this._activeBuffer.lines.length -
                      this._bufferService.rows;
                    O > 0 &&
                      (this._activeBuffer.lines.trimStart(O),
                      (this._activeBuffer.ybase = Math.max(
                        this._activeBuffer.ybase - O,
                        0
                      )),
                      (this._activeBuffer.ydisp = Math.max(
                        this._activeBuffer.ydisp - O,
                        0
                      )),
                      this._onScroll.fire(0));
                }
                return !0;
              }
              eraseInLine(S, x = !1) {
                switch (
                  (this._restrictCursor(this._bufferService.cols), S.params[0])
                ) {
                  case 0:
                    this._eraseInBufferLine(
                      this._activeBuffer.y,
                      this._activeBuffer.x,
                      this._bufferService.cols,
                      this._activeBuffer.x === 0,
                      x
                    );
                    break;
                  case 1:
                    this._eraseInBufferLine(
                      this._activeBuffer.y,
                      0,
                      this._activeBuffer.x + 1,
                      !1,
                      x
                    );
                    break;
                  case 2:
                    this._eraseInBufferLine(
                      this._activeBuffer.y,
                      0,
                      this._bufferService.cols,
                      !0,
                      x
                    );
                }
                return (
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y), !0
                );
              }
              insertLines(S) {
                this._restrictCursor();
                let x = S.params[0] || 1;
                if (
                  this._activeBuffer.y > this._activeBuffer.scrollBottom ||
                  this._activeBuffer.y < this._activeBuffer.scrollTop
                )
                  return !0;
                const D = this._activeBuffer.ybase + this._activeBuffer.y,
                  O =
                    this._bufferService.rows -
                    1 -
                    this._activeBuffer.scrollBottom,
                  W =
                    this._bufferService.rows -
                    1 +
                    this._activeBuffer.ybase -
                    O +
                    1;
                for (; x--; )
                  this._activeBuffer.lines.splice(W - 1, 1),
                    this._activeBuffer.lines.splice(
                      D,
                      0,
                      this._activeBuffer.getBlankLine(this._eraseAttrData())
                    );
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.y,
                    this._activeBuffer.scrollBottom
                  ),
                  (this._activeBuffer.x = 0),
                  !0
                );
              }
              deleteLines(S) {
                this._restrictCursor();
                let x = S.params[0] || 1;
                if (
                  this._activeBuffer.y > this._activeBuffer.scrollBottom ||
                  this._activeBuffer.y < this._activeBuffer.scrollTop
                )
                  return !0;
                const D = this._activeBuffer.ybase + this._activeBuffer.y;
                let O;
                for (
                  O =
                    this._bufferService.rows -
                    1 -
                    this._activeBuffer.scrollBottom,
                    O =
                      this._bufferService.rows -
                      1 +
                      this._activeBuffer.ybase -
                      O;
                  x--;

                )
                  this._activeBuffer.lines.splice(D, 1),
                    this._activeBuffer.lines.splice(
                      O,
                      0,
                      this._activeBuffer.getBlankLine(this._eraseAttrData())
                    );
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.y,
                    this._activeBuffer.scrollBottom
                  ),
                  (this._activeBuffer.x = 0),
                  !0
                );
              }
              insertChars(S) {
                this._restrictCursor();
                const x = this._activeBuffer.lines.get(
                  this._activeBuffer.ybase + this._activeBuffer.y
                );
                return (
                  x &&
                    (x.insertCells(
                      this._activeBuffer.x,
                      S.params[0] || 1,
                      this._activeBuffer.getNullCell(this._eraseAttrData())
                    ),
                    this._dirtyRowTracker.markDirty(this._activeBuffer.y)),
                  !0
                );
              }
              deleteChars(S) {
                this._restrictCursor();
                const x = this._activeBuffer.lines.get(
                  this._activeBuffer.ybase + this._activeBuffer.y
                );
                return (
                  x &&
                    (x.deleteCells(
                      this._activeBuffer.x,
                      S.params[0] || 1,
                      this._activeBuffer.getNullCell(this._eraseAttrData())
                    ),
                    this._dirtyRowTracker.markDirty(this._activeBuffer.y)),
                  !0
                );
              }
              scrollUp(S) {
                let x = S.params[0] || 1;
                for (; x--; )
                  this._activeBuffer.lines.splice(
                    this._activeBuffer.ybase + this._activeBuffer.scrollTop,
                    1
                  ),
                    this._activeBuffer.lines.splice(
                      this._activeBuffer.ybase +
                        this._activeBuffer.scrollBottom,
                      0,
                      this._activeBuffer.getBlankLine(this._eraseAttrData())
                    );
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.scrollTop,
                    this._activeBuffer.scrollBottom
                  ),
                  !0
                );
              }
              scrollDown(S) {
                let x = S.params[0] || 1;
                for (; x--; )
                  this._activeBuffer.lines.splice(
                    this._activeBuffer.ybase + this._activeBuffer.scrollBottom,
                    1
                  ),
                    this._activeBuffer.lines.splice(
                      this._activeBuffer.ybase + this._activeBuffer.scrollTop,
                      0,
                      this._activeBuffer.getBlankLine(t.DEFAULT_ATTR_DATA)
                    );
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.scrollTop,
                    this._activeBuffer.scrollBottom
                  ),
                  !0
                );
              }
              scrollLeft(S) {
                if (
                  this._activeBuffer.y > this._activeBuffer.scrollBottom ||
                  this._activeBuffer.y < this._activeBuffer.scrollTop
                )
                  return !0;
                const x = S.params[0] || 1;
                for (
                  let D = this._activeBuffer.scrollTop;
                  D <= this._activeBuffer.scrollBottom;
                  ++D
                ) {
                  const O = this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + D
                  );
                  O.deleteCells(
                    0,
                    x,
                    this._activeBuffer.getNullCell(this._eraseAttrData())
                  ),
                    (O.isWrapped = !1);
                }
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.scrollTop,
                    this._activeBuffer.scrollBottom
                  ),
                  !0
                );
              }
              scrollRight(S) {
                if (
                  this._activeBuffer.y > this._activeBuffer.scrollBottom ||
                  this._activeBuffer.y < this._activeBuffer.scrollTop
                )
                  return !0;
                const x = S.params[0] || 1;
                for (
                  let D = this._activeBuffer.scrollTop;
                  D <= this._activeBuffer.scrollBottom;
                  ++D
                ) {
                  const O = this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + D
                  );
                  O.insertCells(
                    0,
                    x,
                    this._activeBuffer.getNullCell(this._eraseAttrData())
                  ),
                    (O.isWrapped = !1);
                }
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.scrollTop,
                    this._activeBuffer.scrollBottom
                  ),
                  !0
                );
              }
              insertColumns(S) {
                if (
                  this._activeBuffer.y > this._activeBuffer.scrollBottom ||
                  this._activeBuffer.y < this._activeBuffer.scrollTop
                )
                  return !0;
                const x = S.params[0] || 1;
                for (
                  let D = this._activeBuffer.scrollTop;
                  D <= this._activeBuffer.scrollBottom;
                  ++D
                ) {
                  const O = this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + D
                  );
                  O.insertCells(
                    this._activeBuffer.x,
                    x,
                    this._activeBuffer.getNullCell(this._eraseAttrData())
                  ),
                    (O.isWrapped = !1);
                }
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.scrollTop,
                    this._activeBuffer.scrollBottom
                  ),
                  !0
                );
              }
              deleteColumns(S) {
                if (
                  this._activeBuffer.y > this._activeBuffer.scrollBottom ||
                  this._activeBuffer.y < this._activeBuffer.scrollTop
                )
                  return !0;
                const x = S.params[0] || 1;
                for (
                  let D = this._activeBuffer.scrollTop;
                  D <= this._activeBuffer.scrollBottom;
                  ++D
                ) {
                  const O = this._activeBuffer.lines.get(
                    this._activeBuffer.ybase + D
                  );
                  O.deleteCells(
                    this._activeBuffer.x,
                    x,
                    this._activeBuffer.getNullCell(this._eraseAttrData())
                  ),
                    (O.isWrapped = !1);
                }
                return (
                  this._dirtyRowTracker.markRangeDirty(
                    this._activeBuffer.scrollTop,
                    this._activeBuffer.scrollBottom
                  ),
                  !0
                );
              }
              eraseChars(S) {
                this._restrictCursor();
                const x = this._activeBuffer.lines.get(
                  this._activeBuffer.ybase + this._activeBuffer.y
                );
                return (
                  x &&
                    (x.replaceCells(
                      this._activeBuffer.x,
                      this._activeBuffer.x + (S.params[0] || 1),
                      this._activeBuffer.getNullCell(this._eraseAttrData())
                    ),
                    this._dirtyRowTracker.markDirty(this._activeBuffer.y)),
                  !0
                );
              }
              repeatPrecedingCharacter(S) {
                const x = this._parser.precedingJoinState;
                if (!x) return !0;
                const D = S.params[0] || 1,
                  O = _.UnicodeService.extractWidth(x),
                  W = this._activeBuffer.x - O,
                  $ = this._activeBuffer.lines
                    .get(this._activeBuffer.ybase + this._activeBuffer.y)
                    .getString(W),
                  V = new Uint32Array($.length * D);
                let G = 0;
                for (let y = 0; y < $.length; ) {
                  const I = $.codePointAt(y) || 0;
                  (V[G++] = I), (y += I > 65535 ? 2 : 1);
                }
                let M = G;
                for (let y = 1; y < D; ++y) V.copyWithin(M, 0, G), (M += G);
                return this.print(V, 0, M), !0;
              }
              sendDeviceAttributesPrimary(S) {
                return (
                  S.params[0] > 0 ||
                    (this._is("xterm") ||
                    this._is("rxvt-unicode") ||
                    this._is("screen")
                      ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c")
                      : this._is("linux") &&
                        this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")),
                  !0
                );
              }
              sendDeviceAttributesSecondary(S) {
                return (
                  S.params[0] > 0 ||
                    (this._is("xterm")
                      ? this._coreService.triggerDataEvent(
                          n.C0.ESC + "[>0;276;0c"
                        )
                      : this._is("rxvt-unicode")
                      ? this._coreService.triggerDataEvent(
                          n.C0.ESC + "[>85;95;0c"
                        )
                      : this._is("linux")
                      ? this._coreService.triggerDataEvent(S.params[0] + "c")
                      : this._is("screen") &&
                        this._coreService.triggerDataEvent(
                          n.C0.ESC + "[>83;40003;0c"
                        )),
                  !0
                );
              }
              _is(S) {
                return (
                  (this._optionsService.rawOptions.termName + "").indexOf(S) ===
                  0
                );
              }
              setMode(S) {
                for (let x = 0; x < S.length; x++)
                  switch (S.params[x]) {
                    case 4:
                      this._coreService.modes.insertMode = !0;
                      break;
                    case 20:
                      this._optionsService.options.convertEol = !0;
                  }
                return !0;
              }
              setModePrivate(S) {
                for (let x = 0; x < S.length; x++)
                  switch (S.params[x]) {
                    case 1:
                      this._coreService.decPrivateModes.applicationCursorKeys =
                        !0;
                      break;
                    case 2:
                      this._charsetService.setgCharset(0, d.DEFAULT_CHARSET),
                        this._charsetService.setgCharset(1, d.DEFAULT_CHARSET),
                        this._charsetService.setgCharset(2, d.DEFAULT_CHARSET),
                        this._charsetService.setgCharset(3, d.DEFAULT_CHARSET);
                      break;
                    case 3:
                      this._optionsService.rawOptions.windowOptions
                        .setWinLines &&
                        (this._bufferService.resize(
                          132,
                          this._bufferService.rows
                        ),
                        this._onRequestReset.fire());
                      break;
                    case 6:
                      (this._coreService.decPrivateModes.origin = !0),
                        this._setCursor(0, 0);
                      break;
                    case 7:
                      this._coreService.decPrivateModes.wraparound = !0;
                      break;
                    case 12:
                      this._optionsService.options.cursorBlink = !0;
                      break;
                    case 45:
                      this._coreService.decPrivateModes.reverseWraparound = !0;
                      break;
                    case 66:
                      this._logService.debug(
                        "Serial port requested application keypad."
                      ),
                        (this._coreService.decPrivateModes.applicationKeypad =
                          !0),
                        this._onRequestSyncScrollBar.fire();
                      break;
                    case 9:
                      this._coreMouseService.activeProtocol = "X10";
                      break;
                    case 1e3:
                      this._coreMouseService.activeProtocol = "VT200";
                      break;
                    case 1002:
                      this._coreMouseService.activeProtocol = "DRAG";
                      break;
                    case 1003:
                      this._coreMouseService.activeProtocol = "ANY";
                      break;
                    case 1004:
                      (this._coreService.decPrivateModes.sendFocus = !0),
                        this._onRequestSendFocus.fire();
                      break;
                    case 1005:
                      this._logService.debug(
                        "DECSET 1005 not supported (see #2507)"
                      );
                      break;
                    case 1006:
                      this._coreMouseService.activeEncoding = "SGR";
                      break;
                    case 1015:
                      this._logService.debug(
                        "DECSET 1015 not supported (see #2507)"
                      );
                      break;
                    case 1016:
                      this._coreMouseService.activeEncoding = "SGR_PIXELS";
                      break;
                    case 25:
                      this._coreService.isCursorHidden = !1;
                      break;
                    case 1048:
                      this.saveCursor();
                      break;
                    case 1049:
                      this.saveCursor();
                    case 47:
                    case 1047:
                      this._bufferService.buffers.activateAltBuffer(
                        this._eraseAttrData()
                      ),
                        (this._coreService.isCursorInitialized = !0),
                        this._onRequestRefreshRows.fire(
                          0,
                          this._bufferService.rows - 1
                        ),
                        this._onRequestSyncScrollBar.fire();
                      break;
                    case 2004:
                      this._coreService.decPrivateModes.bracketedPasteMode = !0;
                  }
                return !0;
              }
              resetMode(S) {
                for (let x = 0; x < S.length; x++)
                  switch (S.params[x]) {
                    case 4:
                      this._coreService.modes.insertMode = !1;
                      break;
                    case 20:
                      this._optionsService.options.convertEol = !1;
                  }
                return !0;
              }
              resetModePrivate(S) {
                for (let x = 0; x < S.length; x++)
                  switch (S.params[x]) {
                    case 1:
                      this._coreService.decPrivateModes.applicationCursorKeys =
                        !1;
                      break;
                    case 3:
                      this._optionsService.rawOptions.windowOptions
                        .setWinLines &&
                        (this._bufferService.resize(
                          80,
                          this._bufferService.rows
                        ),
                        this._onRequestReset.fire());
                      break;
                    case 6:
                      (this._coreService.decPrivateModes.origin = !1),
                        this._setCursor(0, 0);
                      break;
                    case 7:
                      this._coreService.decPrivateModes.wraparound = !1;
                      break;
                    case 12:
                      this._optionsService.options.cursorBlink = !1;
                      break;
                    case 45:
                      this._coreService.decPrivateModes.reverseWraparound = !1;
                      break;
                    case 66:
                      this._logService.debug(
                        "Switching back to normal keypad."
                      ),
                        (this._coreService.decPrivateModes.applicationKeypad =
                          !1),
                        this._onRequestSyncScrollBar.fire();
                      break;
                    case 9:
                    case 1e3:
                    case 1002:
                    case 1003:
                      this._coreMouseService.activeProtocol = "NONE";
                      break;
                    case 1004:
                      this._coreService.decPrivateModes.sendFocus = !1;
                      break;
                    case 1005:
                      this._logService.debug(
                        "DECRST 1005 not supported (see #2507)"
                      );
                      break;
                    case 1006:
                    case 1016:
                      this._coreMouseService.activeEncoding = "DEFAULT";
                      break;
                    case 1015:
                      this._logService.debug(
                        "DECRST 1015 not supported (see #2507)"
                      );
                      break;
                    case 25:
                      this._coreService.isCursorHidden = !0;
                      break;
                    case 1048:
                      this.restoreCursor();
                      break;
                    case 1049:
                    case 47:
                    case 1047:
                      this._bufferService.buffers.activateNormalBuffer(),
                        S.params[x] === 1049 && this.restoreCursor(),
                        (this._coreService.isCursorInitialized = !0),
                        this._onRequestRefreshRows.fire(
                          0,
                          this._bufferService.rows - 1
                        ),
                        this._onRequestSyncScrollBar.fire();
                      break;
                    case 2004:
                      this._coreService.decPrivateModes.bracketedPasteMode = !1;
                  }
                return !0;
              }
              requestMode(S, x) {
                const D = this._coreService.decPrivateModes,
                  { activeProtocol: O, activeEncoding: W } =
                    this._coreMouseService,
                  $ = this._coreService,
                  { buffers: V, cols: G } = this._bufferService,
                  { active: M, alt: y } = V,
                  I = this._optionsService.rawOptions,
                  N = (Z) => (Z ? 1 : 2),
                  q = S.params[0];
                return (
                  (j = q),
                  (Y = x
                    ? q === 2
                      ? 4
                      : q === 4
                      ? N($.modes.insertMode)
                      : q === 12
                      ? 3
                      : q === 20
                      ? N(I.convertEol)
                      : 0
                    : q === 1
                    ? N(D.applicationCursorKeys)
                    : q === 3
                    ? I.windowOptions.setWinLines
                      ? G === 80
                        ? 2
                        : G === 132
                        ? 1
                        : 0
                      : 0
                    : q === 6
                    ? N(D.origin)
                    : q === 7
                    ? N(D.wraparound)
                    : q === 8
                    ? 3
                    : q === 9
                    ? N(O === "X10")
                    : q === 12
                    ? N(I.cursorBlink)
                    : q === 25
                    ? N(!$.isCursorHidden)
                    : q === 45
                    ? N(D.reverseWraparound)
                    : q === 66
                    ? N(D.applicationKeypad)
                    : q === 67
                    ? 4
                    : q === 1e3
                    ? N(O === "VT200")
                    : q === 1002
                    ? N(O === "DRAG")
                    : q === 1003
                    ? N(O === "ANY")
                    : q === 1004
                    ? N(D.sendFocus)
                    : q === 1005
                    ? 4
                    : q === 1006
                    ? N(W === "SGR")
                    : q === 1015
                    ? 4
                    : q === 1016
                    ? N(W === "SGR_PIXELS")
                    : q === 1048
                    ? 1
                    : q === 47 || q === 1047 || q === 1049
                    ? N(M === y)
                    : q === 2004
                    ? N(D.bracketedPasteMode)
                    : 0),
                  $.triggerDataEvent(`${n.C0.ESC}[${x ? "" : "?"}${j};${Y}$y`),
                  !0
                );
                var j, Y;
              }
              _updateAttrColor(S, x, D, O, W) {
                return (
                  x === 2
                    ? ((S |= 50331648),
                      (S &= -16777216),
                      (S |= a.AttributeData.fromColorRGB([D, O, W])))
                    : x === 5 &&
                      ((S &= -50331904), (S |= 33554432 | (255 & D))),
                  S
                );
              }
              _extractColor(S, x, D) {
                const O = [0, 0, -1, 0, 0, 0];
                let W = 0,
                  $ = 0;
                do {
                  if (((O[$ + W] = S.params[x + $]), S.hasSubParams(x + $))) {
                    const V = S.getSubParams(x + $);
                    let G = 0;
                    do O[1] === 5 && (W = 1), (O[$ + G + 1 + W] = V[G]);
                    while (++G < V.length && G + $ + 1 + W < O.length);
                    break;
                  }
                  if ((O[1] === 5 && $ + W >= 2) || (O[1] === 2 && $ + W >= 5))
                    break;
                  O[1] && (W = 1);
                } while (++$ + x < S.length && $ + W < O.length);
                for (let V = 2; V < O.length; ++V) O[V] === -1 && (O[V] = 0);
                switch (O[0]) {
                  case 38:
                    D.fg = this._updateAttrColor(D.fg, O[1], O[3], O[4], O[5]);
                    break;
                  case 48:
                    D.bg = this._updateAttrColor(D.bg, O[1], O[3], O[4], O[5]);
                    break;
                  case 58:
                    (D.extended = D.extended.clone()),
                      (D.extended.underlineColor = this._updateAttrColor(
                        D.extended.underlineColor,
                        O[1],
                        O[3],
                        O[4],
                        O[5]
                      ));
                }
                return $;
              }
              _processUnderline(S, x) {
                (x.extended = x.extended.clone()),
                  (!~S || S > 5) && (S = 1),
                  (x.extended.underlineStyle = S),
                  (x.fg |= 268435456),
                  S === 0 && (x.fg &= -268435457),
                  x.updateExtended();
              }
              _processSGR0(S) {
                (S.fg = t.DEFAULT_ATTR_DATA.fg),
                  (S.bg = t.DEFAULT_ATTR_DATA.bg),
                  (S.extended = S.extended.clone()),
                  (S.extended.underlineStyle = 0),
                  (S.extended.underlineColor &= -67108864),
                  S.updateExtended();
              }
              charAttributes(S) {
                if (S.length === 1 && S.params[0] === 0)
                  return this._processSGR0(this._curAttrData), !0;
                const x = S.length;
                let D;
                const O = this._curAttrData;
                for (let W = 0; W < x; W++)
                  (D = S.params[W]),
                    D >= 30 && D <= 37
                      ? ((O.fg &= -50331904), (O.fg |= 16777216 | (D - 30)))
                      : D >= 40 && D <= 47
                      ? ((O.bg &= -50331904), (O.bg |= 16777216 | (D - 40)))
                      : D >= 90 && D <= 97
                      ? ((O.fg &= -50331904), (O.fg |= 16777224 | (D - 90)))
                      : D >= 100 && D <= 107
                      ? ((O.bg &= -50331904), (O.bg |= 16777224 | (D - 100)))
                      : D === 0
                      ? this._processSGR0(O)
                      : D === 1
                      ? (O.fg |= 134217728)
                      : D === 3
                      ? (O.bg |= 67108864)
                      : D === 4
                      ? ((O.fg |= 268435456),
                        this._processUnderline(
                          S.hasSubParams(W) ? S.getSubParams(W)[0] : 1,
                          O
                        ))
                      : D === 5
                      ? (O.fg |= 536870912)
                      : D === 7
                      ? (O.fg |= 67108864)
                      : D === 8
                      ? (O.fg |= 1073741824)
                      : D === 9
                      ? (O.fg |= 2147483648)
                      : D === 2
                      ? (O.bg |= 134217728)
                      : D === 21
                      ? this._processUnderline(2, O)
                      : D === 22
                      ? ((O.fg &= -134217729), (O.bg &= -134217729))
                      : D === 23
                      ? (O.bg &= -67108865)
                      : D === 24
                      ? ((O.fg &= -268435457), this._processUnderline(0, O))
                      : D === 25
                      ? (O.fg &= -536870913)
                      : D === 27
                      ? (O.fg &= -67108865)
                      : D === 28
                      ? (O.fg &= -1073741825)
                      : D === 29
                      ? (O.fg &= 2147483647)
                      : D === 39
                      ? ((O.fg &= -67108864),
                        (O.fg |= 16777215 & t.DEFAULT_ATTR_DATA.fg))
                      : D === 49
                      ? ((O.bg &= -67108864),
                        (O.bg |= 16777215 & t.DEFAULT_ATTR_DATA.bg))
                      : D === 38 || D === 48 || D === 58
                      ? (W += this._extractColor(S, W, O))
                      : D === 53
                      ? (O.bg |= 1073741824)
                      : D === 55
                      ? (O.bg &= -1073741825)
                      : D === 59
                      ? ((O.extended = O.extended.clone()),
                        (O.extended.underlineColor = -1),
                        O.updateExtended())
                      : D === 100
                      ? ((O.fg &= -67108864),
                        (O.fg |= 16777215 & t.DEFAULT_ATTR_DATA.fg),
                        (O.bg &= -67108864),
                        (O.bg |= 16777215 & t.DEFAULT_ATTR_DATA.bg))
                      : this._logService.debug("Unknown SGR attribute: %d.", D);
                return !0;
              }
              deviceStatus(S) {
                switch (S.params[0]) {
                  case 5:
                    this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
                    break;
                  case 6:
                    const x = this._activeBuffer.y + 1,
                      D = this._activeBuffer.x + 1;
                    this._coreService.triggerDataEvent(
                      `${n.C0.ESC}[${x};${D}R`
                    );
                }
                return !0;
              }
              deviceStatusPrivate(S) {
                if (S.params[0] === 6) {
                  const x = this._activeBuffer.y + 1,
                    D = this._activeBuffer.x + 1;
                  this._coreService.triggerDataEvent(`${n.C0.ESC}[?${x};${D}R`);
                }
                return !0;
              }
              softReset(S) {
                return (
                  (this._coreService.isCursorHidden = !1),
                  this._onRequestSyncScrollBar.fire(),
                  (this._activeBuffer.scrollTop = 0),
                  (this._activeBuffer.scrollBottom =
                    this._bufferService.rows - 1),
                  (this._curAttrData = t.DEFAULT_ATTR_DATA.clone()),
                  this._coreService.reset(),
                  this._charsetService.reset(),
                  (this._activeBuffer.savedX = 0),
                  (this._activeBuffer.savedY = this._activeBuffer.ybase),
                  (this._activeBuffer.savedCurAttrData.fg =
                    this._curAttrData.fg),
                  (this._activeBuffer.savedCurAttrData.bg =
                    this._curAttrData.bg),
                  (this._activeBuffer.savedCharset =
                    this._charsetService.charset),
                  (this._coreService.decPrivateModes.origin = !1),
                  !0
                );
              }
              setCursorStyle(S) {
                const x = S.params[0] || 1;
                switch (x) {
                  case 1:
                  case 2:
                    this._optionsService.options.cursorStyle = "block";
                    break;
                  case 3:
                  case 4:
                    this._optionsService.options.cursorStyle = "underline";
                    break;
                  case 5:
                  case 6:
                    this._optionsService.options.cursorStyle = "bar";
                }
                const D = x % 2 == 1;
                return (this._optionsService.options.cursorBlink = D), !0;
              }
              setScrollRegion(S) {
                const x = S.params[0] || 1;
                let D;
                return (
                  (S.length < 2 ||
                    (D = S.params[1]) > this._bufferService.rows ||
                    D === 0) &&
                    (D = this._bufferService.rows),
                  D > x &&
                    ((this._activeBuffer.scrollTop = x - 1),
                    (this._activeBuffer.scrollBottom = D - 1),
                    this._setCursor(0, 0)),
                  !0
                );
              }
              windowOptions(S) {
                if (
                  !T(S.params[0], this._optionsService.rawOptions.windowOptions)
                )
                  return !0;
                const x = S.length > 1 ? S.params[1] : 0;
                switch (S.params[0]) {
                  case 14:
                    x !== 2 &&
                      this._onRequestWindowsOptionsReport.fire(
                        k.GET_WIN_SIZE_PIXELS
                      );
                    break;
                  case 16:
                    this._onRequestWindowsOptionsReport.fire(
                      k.GET_CELL_SIZE_PIXELS
                    );
                    break;
                  case 18:
                    this._bufferService &&
                      this._coreService.triggerDataEvent(
                        `${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`
                      );
                    break;
                  case 22:
                    (x !== 0 && x !== 2) ||
                      (this._windowTitleStack.push(this._windowTitle),
                      this._windowTitleStack.length > 10 &&
                        this._windowTitleStack.shift()),
                      (x !== 0 && x !== 1) ||
                        (this._iconNameStack.push(this._iconName),
                        this._iconNameStack.length > 10 &&
                          this._iconNameStack.shift());
                    break;
                  case 23:
                    (x !== 0 && x !== 2) ||
                      (this._windowTitleStack.length &&
                        this.setTitle(this._windowTitleStack.pop())),
                      (x !== 0 && x !== 1) ||
                        (this._iconNameStack.length &&
                          this.setIconName(this._iconNameStack.pop()));
                }
                return !0;
              }
              saveCursor(S) {
                return (
                  (this._activeBuffer.savedX = this._activeBuffer.x),
                  (this._activeBuffer.savedY =
                    this._activeBuffer.ybase + this._activeBuffer.y),
                  (this._activeBuffer.savedCurAttrData.fg =
                    this._curAttrData.fg),
                  (this._activeBuffer.savedCurAttrData.bg =
                    this._curAttrData.bg),
                  (this._activeBuffer.savedCharset =
                    this._charsetService.charset),
                  !0
                );
              }
              restoreCursor(S) {
                return (
                  (this._activeBuffer.x = this._activeBuffer.savedX || 0),
                  (this._activeBuffer.y = Math.max(
                    this._activeBuffer.savedY - this._activeBuffer.ybase,
                    0
                  )),
                  (this._curAttrData.fg =
                    this._activeBuffer.savedCurAttrData.fg),
                  (this._curAttrData.bg =
                    this._activeBuffer.savedCurAttrData.bg),
                  (this._charsetService.charset = this._savedCharset),
                  this._activeBuffer.savedCharset &&
                    (this._charsetService.charset =
                      this._activeBuffer.savedCharset),
                  this._restrictCursor(),
                  !0
                );
              }
              setTitle(S) {
                return (this._windowTitle = S), this._onTitleChange.fire(S), !0;
              }
              setIconName(S) {
                return (this._iconName = S), !0;
              }
              setOrReportIndexedColor(S) {
                const x = [],
                  D = S.split(";");
                for (; D.length > 1; ) {
                  const O = D.shift(),
                    W = D.shift();
                  if (/^\d+$/.exec(O)) {
                    const $ = parseInt(O);
                    if (K($))
                      if (W === "?") x.push({ type: 0, index: $ });
                      else {
                        const V = (0, m.parseColor)(W);
                        V && x.push({ type: 1, index: $, color: V });
                      }
                  }
                }
                return x.length && this._onColor.fire(x), !0;
              }
              setHyperlink(S) {
                const x = S.split(";");
                return (
                  !(x.length < 2) &&
                  (x[1]
                    ? this._createHyperlink(x[0], x[1])
                    : !x[0] && this._finishHyperlink())
                );
              }
              _createHyperlink(S, x) {
                this._getCurrentLinkId() && this._finishHyperlink();
                const D = S.split(":");
                let O;
                const W = D.findIndex(($) => $.startsWith("id="));
                return (
                  W !== -1 && (O = D[W].slice(3) || void 0),
                  (this._curAttrData.extended =
                    this._curAttrData.extended.clone()),
                  (this._curAttrData.extended.urlId =
                    this._oscLinkService.registerLink({ id: O, uri: x })),
                  this._curAttrData.updateExtended(),
                  !0
                );
              }
              _finishHyperlink() {
                return (
                  (this._curAttrData.extended =
                    this._curAttrData.extended.clone()),
                  (this._curAttrData.extended.urlId = 0),
                  this._curAttrData.updateExtended(),
                  !0
                );
              }
              _setOrReportSpecialColor(S, x) {
                const D = S.split(";");
                for (
                  let O = 0;
                  O < D.length && !(x >= this._specialColors.length);
                  ++O, ++x
                )
                  if (D[O] === "?")
                    this._onColor.fire([
                      { type: 0, index: this._specialColors[x] },
                    ]);
                  else {
                    const W = (0, m.parseColor)(D[O]);
                    W &&
                      this._onColor.fire([
                        { type: 1, index: this._specialColors[x], color: W },
                      ]);
                  }
                return !0;
              }
              setOrReportFgColor(S) {
                return this._setOrReportSpecialColor(S, 0);
              }
              setOrReportBgColor(S) {
                return this._setOrReportSpecialColor(S, 1);
              }
              setOrReportCursorColor(S) {
                return this._setOrReportSpecialColor(S, 2);
              }
              restoreIndexedColor(S) {
                if (!S) return this._onColor.fire([{ type: 2 }]), !0;
                const x = [],
                  D = S.split(";");
                for (let O = 0; O < D.length; ++O)
                  if (/^\d+$/.exec(D[O])) {
                    const W = parseInt(D[O]);
                    K(W) && x.push({ type: 2, index: W });
                  }
                return x.length && this._onColor.fire(x), !0;
              }
              restoreFgColor(S) {
                return this._onColor.fire([{ type: 2, index: 256 }]), !0;
              }
              restoreBgColor(S) {
                return this._onColor.fire([{ type: 2, index: 257 }]), !0;
              }
              restoreCursorColor(S) {
                return this._onColor.fire([{ type: 2, index: 258 }]), !0;
              }
              nextLine() {
                return (this._activeBuffer.x = 0), this.index(), !0;
              }
              keypadApplicationMode() {
                return (
                  this._logService.debug(
                    "Serial port requested application keypad."
                  ),
                  (this._coreService.decPrivateModes.applicationKeypad = !0),
                  this._onRequestSyncScrollBar.fire(),
                  !0
                );
              }
              keypadNumericMode() {
                return (
                  this._logService.debug("Switching back to normal keypad."),
                  (this._coreService.decPrivateModes.applicationKeypad = !1),
                  this._onRequestSyncScrollBar.fire(),
                  !0
                );
              }
              selectDefaultCharset() {
                return (
                  this._charsetService.setgLevel(0),
                  this._charsetService.setgCharset(0, d.DEFAULT_CHARSET),
                  !0
                );
              }
              selectCharset(S) {
                return S.length !== 2
                  ? (this.selectDefaultCharset(), !0)
                  : (S[0] === "/" ||
                      this._charsetService.setgCharset(
                        R[S[0]],
                        d.CHARSETS[S[1]] || d.DEFAULT_CHARSET
                      ),
                    !0);
              }
              index() {
                return (
                  this._restrictCursor(),
                  this._activeBuffer.y++,
                  this._activeBuffer.y === this._activeBuffer.scrollBottom + 1
                    ? (this._activeBuffer.y--,
                      this._bufferService.scroll(this._eraseAttrData()))
                    : this._activeBuffer.y >= this._bufferService.rows &&
                      (this._activeBuffer.y = this._bufferService.rows - 1),
                  this._restrictCursor(),
                  !0
                );
              }
              tabSet() {
                return (this._activeBuffer.tabs[this._activeBuffer.x] = !0), !0;
              }
              reverseIndex() {
                if (
                  (this._restrictCursor(),
                  this._activeBuffer.y === this._activeBuffer.scrollTop)
                ) {
                  const S =
                    this._activeBuffer.scrollBottom -
                    this._activeBuffer.scrollTop;
                  this._activeBuffer.lines.shiftElements(
                    this._activeBuffer.ybase + this._activeBuffer.y,
                    S,
                    1
                  ),
                    this._activeBuffer.lines.set(
                      this._activeBuffer.ybase + this._activeBuffer.y,
                      this._activeBuffer.getBlankLine(this._eraseAttrData())
                    ),
                    this._dirtyRowTracker.markRangeDirty(
                      this._activeBuffer.scrollTop,
                      this._activeBuffer.scrollBottom
                    );
                } else this._activeBuffer.y--, this._restrictCursor();
                return !0;
              }
              fullReset() {
                return this._parser.reset(), this._onRequestReset.fire(), !0;
              }
              reset() {
                (this._curAttrData = t.DEFAULT_ATTR_DATA.clone()),
                  (this._eraseAttrDataInternal = t.DEFAULT_ATTR_DATA.clone());
              }
              _eraseAttrData() {
                return (
                  (this._eraseAttrDataInternal.bg &= -67108864),
                  (this._eraseAttrDataInternal.bg |=
                    67108863 & this._curAttrData.bg),
                  this._eraseAttrDataInternal
                );
              }
              setgLevel(S) {
                return this._charsetService.setgLevel(S), !0;
              }
              screenAlignmentPattern() {
                const S = new s.CellData();
                (S.content = 4194373),
                  (S.fg = this._curAttrData.fg),
                  (S.bg = this._curAttrData.bg),
                  this._setCursor(0, 0);
                for (let x = 0; x < this._bufferService.rows; ++x) {
                  const D = this._activeBuffer.ybase + this._activeBuffer.y + x,
                    O = this._activeBuffer.lines.get(D);
                  O && (O.fill(S), (O.isWrapped = !1));
                }
                return (
                  this._dirtyRowTracker.markAllDirty(),
                  this._setCursor(0, 0),
                  !0
                );
              }
              requestStatusString(S, x) {
                const D = this._bufferService.buffer,
                  O = this._optionsService.rawOptions;
                return ((W) => (
                  this._coreService.triggerDataEvent(
                    `${n.C0.ESC}${W}${n.C0.ESC}\\`
                  ),
                  !0
                ))(
                  S === '"q'
                    ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q`
                    : S === '"p'
                    ? 'P1$r61;1"p'
                    : S === "r"
                    ? `P1$r${D.scrollTop + 1};${D.scrollBottom + 1}r`
                    : S === "m"
                    ? "P1$r0m"
                    : S === " q"
                    ? `P1$r${
                        { block: 2, underline: 4, bar: 6 }[O.cursorStyle] -
                        (O.cursorBlink ? 1 : 0)
                      } q`
                    : "P0$r"
                );
              }
              markRangeDirty(S, x) {
                this._dirtyRowTracker.markRangeDirty(S, x);
              }
            }
            r.InputHandler = F;
            let U = class {
              constructor(z) {
                (this._bufferService = z), this.clearRange();
              }
              clearRange() {
                (this.start = this._bufferService.buffer.y),
                  (this.end = this._bufferService.buffer.y);
              }
              markDirty(z) {
                z < this.start
                  ? (this.start = z)
                  : z > this.end && (this.end = z);
              }
              markRangeDirty(z, S) {
                z > S && ((P = z), (z = S), (S = P)),
                  z < this.start && (this.start = z),
                  S > this.end && (this.end = S);
              }
              markAllDirty() {
                this.markRangeDirty(0, this._bufferService.rows - 1);
              }
            };
            function K(z) {
              return 0 <= z && z < 256;
            }
            U = h([u(0, v.IBufferService)], U);
          },
          844: (L, r) => {
            function o(h) {
              for (const u of h) u.dispose();
              h.length = 0;
            }
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.getDisposeArrayDisposable =
                r.disposeArray =
                r.toDisposable =
                r.MutableDisposable =
                r.Disposable =
                  void 0),
              (r.Disposable = class {
                constructor() {
                  (this._disposables = []), (this._isDisposed = !1);
                }
                dispose() {
                  this._isDisposed = !0;
                  for (const h of this._disposables) h.dispose();
                  this._disposables.length = 0;
                }
                register(h) {
                  return this._disposables.push(h), h;
                }
                unregister(h) {
                  const u = this._disposables.indexOf(h);
                  u !== -1 && this._disposables.splice(u, 1);
                }
              }),
              (r.MutableDisposable = class {
                constructor() {
                  this._isDisposed = !1;
                }
                get value() {
                  return this._isDisposed ? void 0 : this._value;
                }
                set value(h) {
                  this._isDisposed ||
                    h === this._value ||
                    (this._value?.dispose(), (this._value = h));
                }
                clear() {
                  this.value = void 0;
                }
                dispose() {
                  (this._isDisposed = !0),
                    this._value?.dispose(),
                    (this._value = void 0);
                }
              }),
              (r.toDisposable = function (h) {
                return { dispose: h };
              }),
              (r.disposeArray = o),
              (r.getDisposeArrayDisposable = function (h) {
                return { dispose: () => o(h) };
              });
          },
          1505: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.FourKeyMap = r.TwoKeyMap = void 0);
            class o {
              constructor() {
                this._data = {};
              }
              set(u, n, d) {
                this._data[u] || (this._data[u] = {}), (this._data[u][n] = d);
              }
              get(u, n) {
                return this._data[u] ? this._data[u][n] : void 0;
              }
              clear() {
                this._data = {};
              }
            }
            (r.TwoKeyMap = o),
              (r.FourKeyMap = class {
                constructor() {
                  this._data = new o();
                }
                set(h, u, n, d, f) {
                  this._data.get(h, u) || this._data.set(h, u, new o()),
                    this._data.get(h, u).set(n, d, f);
                }
                get(h, u, n, d) {
                  return this._data.get(h, u)?.get(n, d);
                }
                clear() {
                  this._data.clear();
                }
              });
          },
          6114: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.isChromeOS =
                r.isLinux =
                r.isWindows =
                r.isIphone =
                r.isIpad =
                r.isMac =
                r.getSafariVersion =
                r.isSafari =
                r.isLegacyEdge =
                r.isFirefox =
                r.isNode =
                  void 0),
              (r.isNode = typeof process < "u" && "title" in process);
            const o = r.isNode ? "node" : navigator.userAgent,
              h = r.isNode ? "node" : navigator.platform;
            (r.isFirefox = o.includes("Firefox")),
              (r.isLegacyEdge = o.includes("Edge")),
              (r.isSafari = /^((?!chrome|android).)*safari/i.test(o)),
              (r.getSafariVersion = function () {
                if (!r.isSafari) return 0;
                const u = o.match(/Version\/(\d+)/);
                return u === null || u.length < 2 ? 0 : parseInt(u[1]);
              }),
              (r.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(
                h
              )),
              (r.isIpad = h === "iPad"),
              (r.isIphone = h === "iPhone"),
              (r.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(
                h
              )),
              (r.isLinux = h.indexOf("Linux") >= 0),
              (r.isChromeOS = /\bCrOS\b/.test(o));
          },
          6106: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.SortedList = void 0);
            let o = 0;
            r.SortedList = class {
              constructor(h) {
                (this._getKey = h), (this._array = []);
              }
              clear() {
                this._array.length = 0;
              }
              insert(h) {
                this._array.length !== 0
                  ? ((o = this._search(this._getKey(h))),
                    this._array.splice(o, 0, h))
                  : this._array.push(h);
              }
              delete(h) {
                if (this._array.length === 0) return !1;
                const u = this._getKey(h);
                if (
                  u === void 0 ||
                  ((o = this._search(u)), o === -1) ||
                  this._getKey(this._array[o]) !== u
                )
                  return !1;
                do
                  if (this._array[o] === h) return this._array.splice(o, 1), !0;
                while (
                  ++o < this._array.length &&
                  this._getKey(this._array[o]) === u
                );
                return !1;
              }
              *getKeyIterator(h) {
                if (
                  this._array.length !== 0 &&
                  ((o = this._search(h)),
                  !(o < 0 || o >= this._array.length) &&
                    this._getKey(this._array[o]) === h)
                )
                  do yield this._array[o];
                  while (
                    ++o < this._array.length &&
                    this._getKey(this._array[o]) === h
                  );
              }
              forEachByKey(h, u) {
                if (
                  this._array.length !== 0 &&
                  ((o = this._search(h)),
                  !(o < 0 || o >= this._array.length) &&
                    this._getKey(this._array[o]) === h)
                )
                  do u(this._array[o]);
                  while (
                    ++o < this._array.length &&
                    this._getKey(this._array[o]) === h
                  );
              }
              values() {
                return [...this._array].values();
              }
              _search(h) {
                let u = 0,
                  n = this._array.length - 1;
                for (; n >= u; ) {
                  let d = (u + n) >> 1;
                  const f = this._getKey(this._array[d]);
                  if (f > h) n = d - 1;
                  else {
                    if (!(f < h)) {
                      for (; d > 0 && this._getKey(this._array[d - 1]) === h; )
                        d--;
                      return d;
                    }
                    u = d + 1;
                  }
                }
                return u;
              }
            };
          },
          7226: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.DebouncedIdleTask =
                r.IdleTaskQueue =
                r.PriorityTaskQueue =
                  void 0);
            const h = o(6114);
            class u {
              constructor() {
                (this._tasks = []), (this._i = 0);
              }
              enqueue(f) {
                this._tasks.push(f), this._start();
              }
              flush() {
                for (; this._i < this._tasks.length; )
                  this._tasks[this._i]() || this._i++;
                this.clear();
              }
              clear() {
                this._idleCallback &&
                  (this._cancelCallback(this._idleCallback),
                  (this._idleCallback = void 0)),
                  (this._i = 0),
                  (this._tasks.length = 0);
              }
              _start() {
                this._idleCallback ||
                  (this._idleCallback = this._requestCallback(
                    this._process.bind(this)
                  ));
              }
              _process(f) {
                this._idleCallback = void 0;
                let p = 0,
                  l = 0,
                  t = f.timeRemaining(),
                  i = 0;
                for (; this._i < this._tasks.length; ) {
                  if (
                    ((p = Date.now()),
                    this._tasks[this._i]() || this._i++,
                    (p = Math.max(1, Date.now() - p)),
                    (l = Math.max(p, l)),
                    (i = f.timeRemaining()),
                    1.5 * l > i)
                  )
                    return (
                      t - p < -20 &&
                        console.warn(
                          `task queue exceeded allotted deadline by ${Math.abs(
                            Math.round(t - p)
                          )}ms`
                        ),
                      void this._start()
                    );
                  t = i;
                }
                this.clear();
              }
            }
            class n extends u {
              _requestCallback(f) {
                return setTimeout(() => f(this._createDeadline(16)));
              }
              _cancelCallback(f) {
                clearTimeout(f);
              }
              _createDeadline(f) {
                const p = Date.now() + f;
                return { timeRemaining: () => Math.max(0, p - Date.now()) };
              }
            }
            (r.PriorityTaskQueue = n),
              (r.IdleTaskQueue =
                !h.isNode && "requestIdleCallback" in window
                  ? class extends u {
                      _requestCallback(d) {
                        return requestIdleCallback(d);
                      }
                      _cancelCallback(d) {
                        cancelIdleCallback(d);
                      }
                    }
                  : n),
              (r.DebouncedIdleTask = class {
                constructor() {
                  this._queue = new r.IdleTaskQueue();
                }
                set(d) {
                  this._queue.clear(), this._queue.enqueue(d);
                }
                flush() {
                  this._queue.flush();
                }
              });
          },
          9282: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.updateWindowsModeWrappedState = void 0);
            const h = o(643);
            r.updateWindowsModeWrappedState = function (u) {
              const n = u.buffer.lines.get(u.buffer.ybase + u.buffer.y - 1),
                d = n?.get(u.cols - 1),
                f = u.buffer.lines.get(u.buffer.ybase + u.buffer.y);
              f &&
                d &&
                (f.isWrapped =
                  d[h.CHAR_DATA_CODE_INDEX] !== h.NULL_CELL_CODE &&
                  d[h.CHAR_DATA_CODE_INDEX] !== h.WHITESPACE_CELL_CODE);
            };
          },
          3734: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.ExtendedAttrs = r.AttributeData = void 0);
            class o {
              constructor() {
                (this.fg = 0), (this.bg = 0), (this.extended = new h());
              }
              static toColorRGB(n) {
                return [(n >>> 16) & 255, (n >>> 8) & 255, 255 & n];
              }
              static fromColorRGB(n) {
                return (
                  ((255 & n[0]) << 16) | ((255 & n[1]) << 8) | (255 & n[2])
                );
              }
              clone() {
                const n = new o();
                return (
                  (n.fg = this.fg),
                  (n.bg = this.bg),
                  (n.extended = this.extended.clone()),
                  n
                );
              }
              isInverse() {
                return 67108864 & this.fg;
              }
              isBold() {
                return 134217728 & this.fg;
              }
              isUnderline() {
                return this.hasExtendedAttrs() &&
                  this.extended.underlineStyle !== 0
                  ? 1
                  : 268435456 & this.fg;
              }
              isBlink() {
                return 536870912 & this.fg;
              }
              isInvisible() {
                return 1073741824 & this.fg;
              }
              isItalic() {
                return 67108864 & this.bg;
              }
              isDim() {
                return 134217728 & this.bg;
              }
              isStrikethrough() {
                return 2147483648 & this.fg;
              }
              isProtected() {
                return 536870912 & this.bg;
              }
              isOverline() {
                return 1073741824 & this.bg;
              }
              getFgColorMode() {
                return 50331648 & this.fg;
              }
              getBgColorMode() {
                return 50331648 & this.bg;
              }
              isFgRGB() {
                return (50331648 & this.fg) == 50331648;
              }
              isBgRGB() {
                return (50331648 & this.bg) == 50331648;
              }
              isFgPalette() {
                return (
                  (50331648 & this.fg) == 16777216 ||
                  (50331648 & this.fg) == 33554432
                );
              }
              isBgPalette() {
                return (
                  (50331648 & this.bg) == 16777216 ||
                  (50331648 & this.bg) == 33554432
                );
              }
              isFgDefault() {
                return (50331648 & this.fg) == 0;
              }
              isBgDefault() {
                return (50331648 & this.bg) == 0;
              }
              isAttributeDefault() {
                return this.fg === 0 && this.bg === 0;
              }
              getFgColor() {
                switch (50331648 & this.fg) {
                  case 16777216:
                  case 33554432:
                    return 255 & this.fg;
                  case 50331648:
                    return 16777215 & this.fg;
                  default:
                    return -1;
                }
              }
              getBgColor() {
                switch (50331648 & this.bg) {
                  case 16777216:
                  case 33554432:
                    return 255 & this.bg;
                  case 50331648:
                    return 16777215 & this.bg;
                  default:
                    return -1;
                }
              }
              hasExtendedAttrs() {
                return 268435456 & this.bg;
              }
              updateExtended() {
                this.extended.isEmpty()
                  ? (this.bg &= -268435457)
                  : (this.bg |= 268435456);
              }
              getUnderlineColor() {
                if (268435456 & this.bg && ~this.extended.underlineColor)
                  switch (50331648 & this.extended.underlineColor) {
                    case 16777216:
                    case 33554432:
                      return 255 & this.extended.underlineColor;
                    case 50331648:
                      return 16777215 & this.extended.underlineColor;
                    default:
                      return this.getFgColor();
                  }
                return this.getFgColor();
              }
              getUnderlineColorMode() {
                return 268435456 & this.bg && ~this.extended.underlineColor
                  ? 50331648 & this.extended.underlineColor
                  : this.getFgColorMode();
              }
              isUnderlineColorRGB() {
                return 268435456 & this.bg && ~this.extended.underlineColor
                  ? (50331648 & this.extended.underlineColor) == 50331648
                  : this.isFgRGB();
              }
              isUnderlineColorPalette() {
                return 268435456 & this.bg && ~this.extended.underlineColor
                  ? (50331648 & this.extended.underlineColor) == 16777216 ||
                      (50331648 & this.extended.underlineColor) == 33554432
                  : this.isFgPalette();
              }
              isUnderlineColorDefault() {
                return 268435456 & this.bg && ~this.extended.underlineColor
                  ? (50331648 & this.extended.underlineColor) == 0
                  : this.isFgDefault();
              }
              getUnderlineStyle() {
                return 268435456 & this.fg
                  ? 268435456 & this.bg
                    ? this.extended.underlineStyle
                    : 1
                  : 0;
              }
              getUnderlineVariantOffset() {
                return this.extended.underlineVariantOffset;
              }
            }
            r.AttributeData = o;
            class h {
              get ext() {
                return this._urlId
                  ? (-469762049 & this._ext) | (this.underlineStyle << 26)
                  : this._ext;
              }
              set ext(n) {
                this._ext = n;
              }
              get underlineStyle() {
                return this._urlId ? 5 : (469762048 & this._ext) >> 26;
              }
              set underlineStyle(n) {
                (this._ext &= -469762049), (this._ext |= (n << 26) & 469762048);
              }
              get underlineColor() {
                return 67108863 & this._ext;
              }
              set underlineColor(n) {
                (this._ext &= -67108864), (this._ext |= 67108863 & n);
              }
              get urlId() {
                return this._urlId;
              }
              set urlId(n) {
                this._urlId = n;
              }
              get underlineVariantOffset() {
                const n = (3758096384 & this._ext) >> 29;
                return n < 0 ? 4294967288 ^ n : n;
              }
              set underlineVariantOffset(n) {
                (this._ext &= 536870911), (this._ext |= (n << 29) & 3758096384);
              }
              constructor(n = 0, d = 0) {
                (this._ext = 0),
                  (this._urlId = 0),
                  (this._ext = n),
                  (this._urlId = d);
              }
              clone() {
                return new h(this._ext, this._urlId);
              }
              isEmpty() {
                return this.underlineStyle === 0 && this._urlId === 0;
              }
            }
            r.ExtendedAttrs = h;
          },
          9092: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Buffer = r.MAX_BUFFER_SIZE = void 0);
            const h = o(6349),
              u = o(7226),
              n = o(3734),
              d = o(8437),
              f = o(4634),
              p = o(511),
              l = o(643),
              t = o(4863),
              i = o(7116);
            (r.MAX_BUFFER_SIZE = 4294967295),
              (r.Buffer = class {
                constructor(e, s, a) {
                  (this._hasScrollback = e),
                    (this._optionsService = s),
                    (this._bufferService = a),
                    (this.ydisp = 0),
                    (this.ybase = 0),
                    (this.y = 0),
                    (this.x = 0),
                    (this.tabs = {}),
                    (this.savedY = 0),
                    (this.savedX = 0),
                    (this.savedCurAttrData = d.DEFAULT_ATTR_DATA.clone()),
                    (this.savedCharset = i.DEFAULT_CHARSET),
                    (this.markers = []),
                    (this._nullCell = p.CellData.fromCharData([
                      0,
                      l.NULL_CELL_CHAR,
                      l.NULL_CELL_WIDTH,
                      l.NULL_CELL_CODE,
                    ])),
                    (this._whitespaceCell = p.CellData.fromCharData([
                      0,
                      l.WHITESPACE_CELL_CHAR,
                      l.WHITESPACE_CELL_WIDTH,
                      l.WHITESPACE_CELL_CODE,
                    ])),
                    (this._isClearing = !1),
                    (this._memoryCleanupQueue = new u.IdleTaskQueue()),
                    (this._memoryCleanupPosition = 0),
                    (this._cols = this._bufferService.cols),
                    (this._rows = this._bufferService.rows),
                    (this.lines = new h.CircularList(
                      this._getCorrectBufferLength(this._rows)
                    )),
                    (this.scrollTop = 0),
                    (this.scrollBottom = this._rows - 1),
                    this.setupTabStops();
                }
                getNullCell(e) {
                  return (
                    e
                      ? ((this._nullCell.fg = e.fg),
                        (this._nullCell.bg = e.bg),
                        (this._nullCell.extended = e.extended))
                      : ((this._nullCell.fg = 0),
                        (this._nullCell.bg = 0),
                        (this._nullCell.extended = new n.ExtendedAttrs())),
                    this._nullCell
                  );
                }
                getWhitespaceCell(e) {
                  return (
                    e
                      ? ((this._whitespaceCell.fg = e.fg),
                        (this._whitespaceCell.bg = e.bg),
                        (this._whitespaceCell.extended = e.extended))
                      : ((this._whitespaceCell.fg = 0),
                        (this._whitespaceCell.bg = 0),
                        (this._whitespaceCell.extended =
                          new n.ExtendedAttrs())),
                    this._whitespaceCell
                  );
                }
                getBlankLine(e, s) {
                  return new d.BufferLine(
                    this._bufferService.cols,
                    this.getNullCell(e),
                    s
                  );
                }
                get hasScrollback() {
                  return (
                    this._hasScrollback && this.lines.maxLength > this._rows
                  );
                }
                get isCursorInViewport() {
                  const e = this.ybase + this.y - this.ydisp;
                  return e >= 0 && e < this._rows;
                }
                _getCorrectBufferLength(e) {
                  if (!this._hasScrollback) return e;
                  const s = e + this._optionsService.rawOptions.scrollback;
                  return s > r.MAX_BUFFER_SIZE ? r.MAX_BUFFER_SIZE : s;
                }
                fillViewportRows(e) {
                  if (this.lines.length === 0) {
                    e === void 0 && (e = d.DEFAULT_ATTR_DATA);
                    let s = this._rows;
                    for (; s--; ) this.lines.push(this.getBlankLine(e));
                  }
                }
                clear() {
                  (this.ydisp = 0),
                    (this.ybase = 0),
                    (this.y = 0),
                    (this.x = 0),
                    (this.lines = new h.CircularList(
                      this._getCorrectBufferLength(this._rows)
                    )),
                    (this.scrollTop = 0),
                    (this.scrollBottom = this._rows - 1),
                    this.setupTabStops();
                }
                resize(e, s) {
                  const a = this.getNullCell(d.DEFAULT_ATTR_DATA);
                  let v = 0;
                  const _ = this._getCorrectBufferLength(s);
                  if (
                    (_ > this.lines.maxLength && (this.lines.maxLength = _),
                    this.lines.length > 0)
                  ) {
                    if (this._cols < e)
                      for (let c = 0; c < this.lines.length; c++)
                        v += +this.lines.get(c).resize(e, a);
                    let g = 0;
                    if (this._rows < s)
                      for (let c = this._rows; c < s; c++)
                        this.lines.length < s + this.ybase &&
                          (this._optionsService.rawOptions.windowsMode ||
                          this._optionsService.rawOptions.windowsPty.backend !==
                            void 0 ||
                          this._optionsService.rawOptions.windowsPty
                            .buildNumber !== void 0
                            ? this.lines.push(new d.BufferLine(e, a))
                            : this.ybase > 0 &&
                              this.lines.length <= this.ybase + this.y + g + 1
                            ? (this.ybase--,
                              g++,
                              this.ydisp > 0 && this.ydisp--)
                            : this.lines.push(new d.BufferLine(e, a)));
                    else
                      for (let c = this._rows; c > s; c--)
                        this.lines.length > s + this.ybase &&
                          (this.lines.length > this.ybase + this.y + 1
                            ? this.lines.pop()
                            : (this.ybase++, this.ydisp++));
                    if (_ < this.lines.maxLength) {
                      const c = this.lines.length - _;
                      c > 0 &&
                        (this.lines.trimStart(c),
                        (this.ybase = Math.max(this.ybase - c, 0)),
                        (this.ydisp = Math.max(this.ydisp - c, 0)),
                        (this.savedY = Math.max(this.savedY - c, 0))),
                        (this.lines.maxLength = _);
                    }
                    (this.x = Math.min(this.x, e - 1)),
                      (this.y = Math.min(this.y, s - 1)),
                      g && (this.y += g),
                      (this.savedX = Math.min(this.savedX, e - 1)),
                      (this.scrollTop = 0);
                  }
                  if (
                    ((this.scrollBottom = s - 1),
                    this._isReflowEnabled &&
                      (this._reflow(e, s), this._cols > e))
                  )
                    for (let g = 0; g < this.lines.length; g++)
                      v += +this.lines.get(g).resize(e, a);
                  (this._cols = e),
                    (this._rows = s),
                    this._memoryCleanupQueue.clear(),
                    v > 0.1 * this.lines.length &&
                      ((this._memoryCleanupPosition = 0),
                      this._memoryCleanupQueue.enqueue(() =>
                        this._batchedMemoryCleanup()
                      ));
                }
                _batchedMemoryCleanup() {
                  let e = !0;
                  this._memoryCleanupPosition >= this.lines.length &&
                    ((this._memoryCleanupPosition = 0), (e = !1));
                  let s = 0;
                  for (; this._memoryCleanupPosition < this.lines.length; )
                    if (
                      ((s += this.lines
                        .get(this._memoryCleanupPosition++)
                        .cleanupMemory()),
                      s > 100)
                    )
                      return !0;
                  return e;
                }
                get _isReflowEnabled() {
                  const e = this._optionsService.rawOptions.windowsPty;
                  return e && e.buildNumber
                    ? this._hasScrollback &&
                        e.backend === "conpty" &&
                        e.buildNumber >= 21376
                    : this._hasScrollback &&
                        !this._optionsService.rawOptions.windowsMode;
                }
                _reflow(e, s) {
                  this._cols !== e &&
                    (e > this._cols
                      ? this._reflowLarger(e, s)
                      : this._reflowSmaller(e, s));
                }
                _reflowLarger(e, s) {
                  const a = (0, f.reflowLargerGetLinesToRemove)(
                    this.lines,
                    this._cols,
                    e,
                    this.ybase + this.y,
                    this.getNullCell(d.DEFAULT_ATTR_DATA)
                  );
                  if (a.length > 0) {
                    const v = (0, f.reflowLargerCreateNewLayout)(this.lines, a);
                    (0, f.reflowLargerApplyNewLayout)(this.lines, v.layout),
                      this._reflowLargerAdjustViewport(e, s, v.countRemoved);
                  }
                }
                _reflowLargerAdjustViewport(e, s, a) {
                  const v = this.getNullCell(d.DEFAULT_ATTR_DATA);
                  let _ = a;
                  for (; _-- > 0; )
                    this.ybase === 0
                      ? (this.y > 0 && this.y--,
                        this.lines.length < s &&
                          this.lines.push(new d.BufferLine(e, v)))
                      : (this.ydisp === this.ybase && this.ydisp--,
                        this.ybase--);
                  this.savedY = Math.max(this.savedY - a, 0);
                }
                _reflowSmaller(e, s) {
                  const a = this.getNullCell(d.DEFAULT_ATTR_DATA),
                    v = [];
                  let _ = 0;
                  for (let g = this.lines.length - 1; g >= 0; g--) {
                    let c = this.lines.get(g);
                    if (!c || (!c.isWrapped && c.getTrimmedLength() <= e))
                      continue;
                    const m = [c];
                    for (; c.isWrapped && g > 0; )
                      (c = this.lines.get(--g)), m.unshift(c);
                    const R = this.ybase + this.y;
                    if (R >= g && R < g + m.length) continue;
                    const A = m[m.length - 1].getTrimmedLength(),
                      T = (0, f.reflowSmallerGetNewLineLengths)(
                        m,
                        this._cols,
                        e
                      ),
                      k = T.length - m.length;
                    let P;
                    P =
                      this.ybase === 0 && this.y !== this.lines.length - 1
                        ? Math.max(0, this.y - this.lines.maxLength + k)
                        : Math.max(
                            0,
                            this.lines.length - this.lines.maxLength + k
                          );
                    const F = [];
                    for (let D = 0; D < k; D++) {
                      const O = this.getBlankLine(d.DEFAULT_ATTR_DATA, !0);
                      F.push(O);
                    }
                    F.length > 0 &&
                      (v.push({ start: g + m.length + _, newLines: F }),
                      (_ += F.length)),
                      m.push(...F);
                    let U = T.length - 1,
                      K = T[U];
                    K === 0 && (U--, (K = T[U]));
                    let z = m.length - k - 1,
                      S = A;
                    for (; z >= 0; ) {
                      const D = Math.min(S, K);
                      if (m[U] === void 0) break;
                      if (
                        (m[U].copyCellsFrom(m[z], S - D, K - D, D, !0),
                        (K -= D),
                        K === 0 && (U--, (K = T[U])),
                        (S -= D),
                        S === 0)
                      ) {
                        z--;
                        const O = Math.max(z, 0);
                        S = (0, f.getWrappedLineTrimmedLength)(
                          m,
                          O,
                          this._cols
                        );
                      }
                    }
                    for (let D = 0; D < m.length; D++)
                      T[D] < e && m[D].setCell(T[D], a);
                    let x = k - P;
                    for (; x-- > 0; )
                      this.ybase === 0
                        ? this.y < s - 1
                          ? (this.y++, this.lines.pop())
                          : (this.ybase++, this.ydisp++)
                        : this.ybase <
                            Math.min(
                              this.lines.maxLength,
                              this.lines.length + _
                            ) -
                              s &&
                          (this.ybase === this.ydisp && this.ydisp++,
                          this.ybase++);
                    this.savedY = Math.min(this.savedY + k, this.ybase + s - 1);
                  }
                  if (v.length > 0) {
                    const g = [],
                      c = [];
                    for (let U = 0; U < this.lines.length; U++)
                      c.push(this.lines.get(U));
                    const m = this.lines.length;
                    let R = m - 1,
                      A = 0,
                      T = v[A];
                    this.lines.length = Math.min(
                      this.lines.maxLength,
                      this.lines.length + _
                    );
                    let k = 0;
                    for (
                      let U = Math.min(this.lines.maxLength - 1, m + _ - 1);
                      U >= 0;
                      U--
                    )
                      if (T && T.start > R + k) {
                        for (let K = T.newLines.length - 1; K >= 0; K--)
                          this.lines.set(U--, T.newLines[K]);
                        U++,
                          g.push({ index: R + 1, amount: T.newLines.length }),
                          (k += T.newLines.length),
                          (T = v[++A]);
                      } else this.lines.set(U, c[R--]);
                    let P = 0;
                    for (let U = g.length - 1; U >= 0; U--)
                      (g[U].index += P),
                        this.lines.onInsertEmitter.fire(g[U]),
                        (P += g[U].amount);
                    const F = Math.max(0, m + _ - this.lines.maxLength);
                    F > 0 && this.lines.onTrimEmitter.fire(F);
                  }
                }
                translateBufferLineToString(e, s, a = 0, v) {
                  const _ = this.lines.get(e);
                  return _ ? _.translateToString(s, a, v) : "";
                }
                getWrappedRangeForLine(e) {
                  let s = e,
                    a = e;
                  for (; s > 0 && this.lines.get(s).isWrapped; ) s--;
                  for (
                    ;
                    a + 1 < this.lines.length &&
                    this.lines.get(a + 1).isWrapped;

                  )
                    a++;
                  return { first: s, last: a };
                }
                setupTabStops(e) {
                  for (
                    e != null
                      ? this.tabs[e] || (e = this.prevStop(e))
                      : ((this.tabs = {}), (e = 0));
                    e < this._cols;
                    e += this._optionsService.rawOptions.tabStopWidth
                  )
                    this.tabs[e] = !0;
                }
                prevStop(e) {
                  for (e == null && (e = this.x); !this.tabs[--e] && e > 0; );
                  return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
                }
                nextStop(e) {
                  for (
                    e == null && (e = this.x);
                    !this.tabs[++e] && e < this._cols;

                  );
                  return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
                }
                clearMarkers(e) {
                  this._isClearing = !0;
                  for (let s = 0; s < this.markers.length; s++)
                    this.markers[s].line === e &&
                      (this.markers[s].dispose(), this.markers.splice(s--, 1));
                  this._isClearing = !1;
                }
                clearAllMarkers() {
                  this._isClearing = !0;
                  for (let e = 0; e < this.markers.length; e++)
                    this.markers[e].dispose(), this.markers.splice(e--, 1);
                  this._isClearing = !1;
                }
                addMarker(e) {
                  const s = new t.Marker(e);
                  return (
                    this.markers.push(s),
                    s.register(
                      this.lines.onTrim((a) => {
                        (s.line -= a), s.line < 0 && s.dispose();
                      })
                    ),
                    s.register(
                      this.lines.onInsert((a) => {
                        s.line >= a.index && (s.line += a.amount);
                      })
                    ),
                    s.register(
                      this.lines.onDelete((a) => {
                        s.line >= a.index &&
                          s.line < a.index + a.amount &&
                          s.dispose(),
                          s.line > a.index && (s.line -= a.amount);
                      })
                    ),
                    s.register(s.onDispose(() => this._removeMarker(s))),
                    s
                  );
                }
                _removeMarker(e) {
                  this._isClearing ||
                    this.markers.splice(this.markers.indexOf(e), 1);
                }
              });
          },
          8437: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferLine = r.DEFAULT_ATTR_DATA = void 0);
            const h = o(3734),
              u = o(511),
              n = o(643),
              d = o(482);
            r.DEFAULT_ATTR_DATA = Object.freeze(new h.AttributeData());
            let f = 0;
            class p {
              constructor(t, i, e = !1) {
                (this.isWrapped = e),
                  (this._combined = {}),
                  (this._extendedAttrs = {}),
                  (this._data = new Uint32Array(3 * t));
                const s =
                  i ||
                  u.CellData.fromCharData([
                    0,
                    n.NULL_CELL_CHAR,
                    n.NULL_CELL_WIDTH,
                    n.NULL_CELL_CODE,
                  ]);
                for (let a = 0; a < t; ++a) this.setCell(a, s);
                this.length = t;
              }
              get(t) {
                const i = this._data[3 * t + 0],
                  e = 2097151 & i;
                return [
                  this._data[3 * t + 1],
                  2097152 & i
                    ? this._combined[t]
                    : e
                    ? (0, d.stringFromCodePoint)(e)
                    : "",
                  i >> 22,
                  2097152 & i
                    ? this._combined[t].charCodeAt(this._combined[t].length - 1)
                    : e,
                ];
              }
              set(t, i) {
                (this._data[3 * t + 1] = i[n.CHAR_DATA_ATTR_INDEX]),
                  i[n.CHAR_DATA_CHAR_INDEX].length > 1
                    ? ((this._combined[t] = i[1]),
                      (this._data[3 * t + 0] =
                        2097152 | t | (i[n.CHAR_DATA_WIDTH_INDEX] << 22)))
                    : (this._data[3 * t + 0] =
                        i[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0) |
                        (i[n.CHAR_DATA_WIDTH_INDEX] << 22));
              }
              getWidth(t) {
                return this._data[3 * t + 0] >> 22;
              }
              hasWidth(t) {
                return 12582912 & this._data[3 * t + 0];
              }
              getFg(t) {
                return this._data[3 * t + 1];
              }
              getBg(t) {
                return this._data[3 * t + 2];
              }
              hasContent(t) {
                return 4194303 & this._data[3 * t + 0];
              }
              getCodePoint(t) {
                const i = this._data[3 * t + 0];
                return 2097152 & i
                  ? this._combined[t].charCodeAt(this._combined[t].length - 1)
                  : 2097151 & i;
              }
              isCombined(t) {
                return 2097152 & this._data[3 * t + 0];
              }
              getString(t) {
                const i = this._data[3 * t + 0];
                return 2097152 & i
                  ? this._combined[t]
                  : 2097151 & i
                  ? (0, d.stringFromCodePoint)(2097151 & i)
                  : "";
              }
              isProtected(t) {
                return 536870912 & this._data[3 * t + 2];
              }
              loadCell(t, i) {
                return (
                  (f = 3 * t),
                  (i.content = this._data[f + 0]),
                  (i.fg = this._data[f + 1]),
                  (i.bg = this._data[f + 2]),
                  2097152 & i.content && (i.combinedData = this._combined[t]),
                  268435456 & i.bg && (i.extended = this._extendedAttrs[t]),
                  i
                );
              }
              setCell(t, i) {
                2097152 & i.content && (this._combined[t] = i.combinedData),
                  268435456 & i.bg && (this._extendedAttrs[t] = i.extended),
                  (this._data[3 * t + 0] = i.content),
                  (this._data[3 * t + 1] = i.fg),
                  (this._data[3 * t + 2] = i.bg);
              }
              setCellFromCodepoint(t, i, e, s) {
                268435456 & s.bg && (this._extendedAttrs[t] = s.extended),
                  (this._data[3 * t + 0] = i | (e << 22)),
                  (this._data[3 * t + 1] = s.fg),
                  (this._data[3 * t + 2] = s.bg);
              }
              addCodepointToCell(t, i, e) {
                let s = this._data[3 * t + 0];
                2097152 & s
                  ? (this._combined[t] += (0, d.stringFromCodePoint)(i))
                  : 2097151 & s
                  ? ((this._combined[t] =
                      (0, d.stringFromCodePoint)(2097151 & s) +
                      (0, d.stringFromCodePoint)(i)),
                    (s &= -2097152),
                    (s |= 2097152))
                  : (s = i | 4194304),
                  e && ((s &= -12582913), (s |= e << 22)),
                  (this._data[3 * t + 0] = s);
              }
              insertCells(t, i, e) {
                if (
                  ((t %= this.length) &&
                    this.getWidth(t - 1) === 2 &&
                    this.setCellFromCodepoint(t - 1, 0, 1, e),
                  i < this.length - t)
                ) {
                  const s = new u.CellData();
                  for (let a = this.length - t - i - 1; a >= 0; --a)
                    this.setCell(t + i + a, this.loadCell(t + a, s));
                  for (let a = 0; a < i; ++a) this.setCell(t + a, e);
                } else for (let s = t; s < this.length; ++s) this.setCell(s, e);
                this.getWidth(this.length - 1) === 2 &&
                  this.setCellFromCodepoint(this.length - 1, 0, 1, e);
              }
              deleteCells(t, i, e) {
                if (((t %= this.length), i < this.length - t)) {
                  const s = new u.CellData();
                  for (let a = 0; a < this.length - t - i; ++a)
                    this.setCell(t + a, this.loadCell(t + i + a, s));
                  for (let a = this.length - i; a < this.length; ++a)
                    this.setCell(a, e);
                } else for (let s = t; s < this.length; ++s) this.setCell(s, e);
                t &&
                  this.getWidth(t - 1) === 2 &&
                  this.setCellFromCodepoint(t - 1, 0, 1, e),
                  this.getWidth(t) !== 0 ||
                    this.hasContent(t) ||
                    this.setCellFromCodepoint(t, 0, 1, e);
              }
              replaceCells(t, i, e, s = !1) {
                if (s)
                  for (
                    t &&
                      this.getWidth(t - 1) === 2 &&
                      !this.isProtected(t - 1) &&
                      this.setCellFromCodepoint(t - 1, 0, 1, e),
                      i < this.length &&
                        this.getWidth(i - 1) === 2 &&
                        !this.isProtected(i) &&
                        this.setCellFromCodepoint(i, 0, 1, e);
                    t < i && t < this.length;

                  )
                    this.isProtected(t) || this.setCell(t, e), t++;
                else
                  for (
                    t &&
                      this.getWidth(t - 1) === 2 &&
                      this.setCellFromCodepoint(t - 1, 0, 1, e),
                      i < this.length &&
                        this.getWidth(i - 1) === 2 &&
                        this.setCellFromCodepoint(i, 0, 1, e);
                    t < i && t < this.length;

                  )
                    this.setCell(t++, e);
              }
              resize(t, i) {
                if (t === this.length)
                  return (
                    4 * this._data.length * 2 < this._data.buffer.byteLength
                  );
                const e = 3 * t;
                if (t > this.length) {
                  if (this._data.buffer.byteLength >= 4 * e)
                    this._data = new Uint32Array(this._data.buffer, 0, e);
                  else {
                    const s = new Uint32Array(e);
                    s.set(this._data), (this._data = s);
                  }
                  for (let s = this.length; s < t; ++s) this.setCell(s, i);
                } else {
                  this._data = this._data.subarray(0, e);
                  const s = Object.keys(this._combined);
                  for (let v = 0; v < s.length; v++) {
                    const _ = parseInt(s[v], 10);
                    _ >= t && delete this._combined[_];
                  }
                  const a = Object.keys(this._extendedAttrs);
                  for (let v = 0; v < a.length; v++) {
                    const _ = parseInt(a[v], 10);
                    _ >= t && delete this._extendedAttrs[_];
                  }
                }
                return (
                  (this.length = t), 4 * e * 2 < this._data.buffer.byteLength
                );
              }
              cleanupMemory() {
                if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
                  const t = new Uint32Array(this._data.length);
                  return t.set(this._data), (this._data = t), 1;
                }
                return 0;
              }
              fill(t, i = !1) {
                if (i)
                  for (let e = 0; e < this.length; ++e)
                    this.isProtected(e) || this.setCell(e, t);
                else {
                  (this._combined = {}), (this._extendedAttrs = {});
                  for (let e = 0; e < this.length; ++e) this.setCell(e, t);
                }
              }
              copyFrom(t) {
                this.length !== t.length
                  ? (this._data = new Uint32Array(t._data))
                  : this._data.set(t._data),
                  (this.length = t.length),
                  (this._combined = {});
                for (const i in t._combined) this._combined[i] = t._combined[i];
                this._extendedAttrs = {};
                for (const i in t._extendedAttrs)
                  this._extendedAttrs[i] = t._extendedAttrs[i];
                this.isWrapped = t.isWrapped;
              }
              clone() {
                const t = new p(0);
                (t._data = new Uint32Array(this._data)),
                  (t.length = this.length);
                for (const i in this._combined)
                  t._combined[i] = this._combined[i];
                for (const i in this._extendedAttrs)
                  t._extendedAttrs[i] = this._extendedAttrs[i];
                return (t.isWrapped = this.isWrapped), t;
              }
              getTrimmedLength() {
                for (let t = this.length - 1; t >= 0; --t)
                  if (4194303 & this._data[3 * t + 0])
                    return t + (this._data[3 * t + 0] >> 22);
                return 0;
              }
              getNoBgTrimmedLength() {
                for (let t = this.length - 1; t >= 0; --t)
                  if (
                    4194303 & this._data[3 * t + 0] ||
                    50331648 & this._data[3 * t + 2]
                  )
                    return t + (this._data[3 * t + 0] >> 22);
                return 0;
              }
              copyCellsFrom(t, i, e, s, a) {
                const v = t._data;
                if (a)
                  for (let g = s - 1; g >= 0; g--) {
                    for (let c = 0; c < 3; c++)
                      this._data[3 * (e + g) + c] = v[3 * (i + g) + c];
                    268435456 & v[3 * (i + g) + 2] &&
                      (this._extendedAttrs[e + g] = t._extendedAttrs[i + g]);
                  }
                else
                  for (let g = 0; g < s; g++) {
                    for (let c = 0; c < 3; c++)
                      this._data[3 * (e + g) + c] = v[3 * (i + g) + c];
                    268435456 & v[3 * (i + g) + 2] &&
                      (this._extendedAttrs[e + g] = t._extendedAttrs[i + g]);
                  }
                const _ = Object.keys(t._combined);
                for (let g = 0; g < _.length; g++) {
                  const c = parseInt(_[g], 10);
                  c >= i && (this._combined[c - i + e] = t._combined[c]);
                }
              }
              translateToString(t, i, e, s) {
                (i = i ?? 0),
                  (e = e ?? this.length),
                  t && (e = Math.min(e, this.getTrimmedLength())),
                  s && (s.length = 0);
                let a = "";
                for (; i < e; ) {
                  const v = this._data[3 * i + 0],
                    _ = 2097151 & v,
                    g =
                      2097152 & v
                        ? this._combined[i]
                        : _
                        ? (0, d.stringFromCodePoint)(_)
                        : n.WHITESPACE_CELL_CHAR;
                  if (((a += g), s))
                    for (let c = 0; c < g.length; ++c) s.push(i);
                  i += v >> 22 || 1;
                }
                return s && s.push(i), a;
              }
            }
            r.BufferLine = p;
          },
          4841: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.getRangeLength = void 0),
              (r.getRangeLength = function (o, h) {
                if (o.start.y > o.end.y)
                  throw new Error(
                    `Buffer range end (${o.end.x}, ${o.end.y}) cannot be before start (${o.start.x}, ${o.start.y})`
                  );
                return h * (o.end.y - o.start.y) + (o.end.x - o.start.x + 1);
              });
          },
          4634: (L, r) => {
            function o(h, u, n) {
              if (u === h.length - 1) return h[u].getTrimmedLength();
              const d = !h[u].hasContent(n - 1) && h[u].getWidth(n - 1) === 1,
                f = h[u + 1].getWidth(0) === 2;
              return d && f ? n - 1 : n;
            }
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.getWrappedLineTrimmedLength =
                r.reflowSmallerGetNewLineLengths =
                r.reflowLargerApplyNewLayout =
                r.reflowLargerCreateNewLayout =
                r.reflowLargerGetLinesToRemove =
                  void 0),
              (r.reflowLargerGetLinesToRemove = function (h, u, n, d, f) {
                const p = [];
                for (let l = 0; l < h.length - 1; l++) {
                  let t = l,
                    i = h.get(++t);
                  if (!i.isWrapped) continue;
                  const e = [h.get(l)];
                  for (; t < h.length && i.isWrapped; )
                    e.push(i), (i = h.get(++t));
                  if (d >= l && d < t) {
                    l += e.length - 1;
                    continue;
                  }
                  let s = 0,
                    a = o(e, s, u),
                    v = 1,
                    _ = 0;
                  for (; v < e.length; ) {
                    const c = o(e, v, u),
                      m = c - _,
                      R = n - a,
                      A = Math.min(m, R);
                    e[s].copyCellsFrom(e[v], _, a, A, !1),
                      (a += A),
                      a === n && (s++, (a = 0)),
                      (_ += A),
                      _ === c && (v++, (_ = 0)),
                      a === 0 &&
                        s !== 0 &&
                        e[s - 1].getWidth(n - 1) === 2 &&
                        (e[s].copyCellsFrom(e[s - 1], n - 1, a++, 1, !1),
                        e[s - 1].setCell(n - 1, f));
                  }
                  e[s].replaceCells(a, n, f);
                  let g = 0;
                  for (
                    let c = e.length - 1;
                    c > 0 && (c > s || e[c].getTrimmedLength() === 0);
                    c--
                  )
                    g++;
                  g > 0 && (p.push(l + e.length - g), p.push(g)),
                    (l += e.length - 1);
                }
                return p;
              }),
              (r.reflowLargerCreateNewLayout = function (h, u) {
                const n = [];
                let d = 0,
                  f = u[d],
                  p = 0;
                for (let l = 0; l < h.length; l++)
                  if (f === l) {
                    const t = u[++d];
                    h.onDeleteEmitter.fire({ index: l - p, amount: t }),
                      (l += t - 1),
                      (p += t),
                      (f = u[++d]);
                  } else n.push(l);
                return { layout: n, countRemoved: p };
              }),
              (r.reflowLargerApplyNewLayout = function (h, u) {
                const n = [];
                for (let d = 0; d < u.length; d++) n.push(h.get(u[d]));
                for (let d = 0; d < n.length; d++) h.set(d, n[d]);
                h.length = u.length;
              }),
              (r.reflowSmallerGetNewLineLengths = function (h, u, n) {
                const d = [],
                  f = h.map((i, e) => o(h, e, u)).reduce((i, e) => i + e);
                let p = 0,
                  l = 0,
                  t = 0;
                for (; t < f; ) {
                  if (f - t < n) {
                    d.push(f - t);
                    break;
                  }
                  p += n;
                  const i = o(h, l, u);
                  p > i && ((p -= i), l++);
                  const e = h[l].getWidth(p - 1) === 2;
                  e && p--;
                  const s = e ? n - 1 : n;
                  d.push(s), (t += s);
                }
                return d;
              }),
              (r.getWrappedLineTrimmedLength = o);
          },
          5295: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferSet = void 0);
            const h = o(8460),
              u = o(844),
              n = o(9092);
            class d extends u.Disposable {
              constructor(p, l) {
                super(),
                  (this._optionsService = p),
                  (this._bufferService = l),
                  (this._onBufferActivate = this.register(
                    new h.EventEmitter()
                  )),
                  (this.onBufferActivate = this._onBufferActivate.event),
                  this.reset(),
                  this.register(
                    this._optionsService.onSpecificOptionChange(
                      "scrollback",
                      () =>
                        this.resize(
                          this._bufferService.cols,
                          this._bufferService.rows
                        )
                    )
                  ),
                  this.register(
                    this._optionsService.onSpecificOptionChange(
                      "tabStopWidth",
                      () => this.setupTabStops()
                    )
                  );
              }
              reset() {
                (this._normal = new n.Buffer(
                  !0,
                  this._optionsService,
                  this._bufferService
                )),
                  this._normal.fillViewportRows(),
                  (this._alt = new n.Buffer(
                    !1,
                    this._optionsService,
                    this._bufferService
                  )),
                  (this._activeBuffer = this._normal),
                  this._onBufferActivate.fire({
                    activeBuffer: this._normal,
                    inactiveBuffer: this._alt,
                  }),
                  this.setupTabStops();
              }
              get alt() {
                return this._alt;
              }
              get active() {
                return this._activeBuffer;
              }
              get normal() {
                return this._normal;
              }
              activateNormalBuffer() {
                this._activeBuffer !== this._normal &&
                  ((this._normal.x = this._alt.x),
                  (this._normal.y = this._alt.y),
                  this._alt.clearAllMarkers(),
                  this._alt.clear(),
                  (this._activeBuffer = this._normal),
                  this._onBufferActivate.fire({
                    activeBuffer: this._normal,
                    inactiveBuffer: this._alt,
                  }));
              }
              activateAltBuffer(p) {
                this._activeBuffer !== this._alt &&
                  (this._alt.fillViewportRows(p),
                  (this._alt.x = this._normal.x),
                  (this._alt.y = this._normal.y),
                  (this._activeBuffer = this._alt),
                  this._onBufferActivate.fire({
                    activeBuffer: this._alt,
                    inactiveBuffer: this._normal,
                  }));
              }
              resize(p, l) {
                this._normal.resize(p, l),
                  this._alt.resize(p, l),
                  this.setupTabStops(p);
              }
              setupTabStops(p) {
                this._normal.setupTabStops(p), this._alt.setupTabStops(p);
              }
            }
            r.BufferSet = d;
          },
          511: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CellData = void 0);
            const h = o(482),
              u = o(643),
              n = o(3734);
            class d extends n.AttributeData {
              constructor() {
                super(...arguments),
                  (this.content = 0),
                  (this.fg = 0),
                  (this.bg = 0),
                  (this.extended = new n.ExtendedAttrs()),
                  (this.combinedData = "");
              }
              static fromCharData(p) {
                const l = new d();
                return l.setFromCharData(p), l;
              }
              isCombined() {
                return 2097152 & this.content;
              }
              getWidth() {
                return this.content >> 22;
              }
              getChars() {
                return 2097152 & this.content
                  ? this.combinedData
                  : 2097151 & this.content
                  ? (0, h.stringFromCodePoint)(2097151 & this.content)
                  : "";
              }
              getCode() {
                return this.isCombined()
                  ? this.combinedData.charCodeAt(this.combinedData.length - 1)
                  : 2097151 & this.content;
              }
              setFromCharData(p) {
                (this.fg = p[u.CHAR_DATA_ATTR_INDEX]), (this.bg = 0);
                let l = !1;
                if (p[u.CHAR_DATA_CHAR_INDEX].length > 2) l = !0;
                else if (p[u.CHAR_DATA_CHAR_INDEX].length === 2) {
                  const t = p[u.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
                  if (55296 <= t && t <= 56319) {
                    const i = p[u.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                    56320 <= i && i <= 57343
                      ? (this.content =
                          (1024 * (t - 55296) + i - 56320 + 65536) |
                          (p[u.CHAR_DATA_WIDTH_INDEX] << 22))
                      : (l = !0);
                  } else l = !0;
                } else
                  this.content =
                    p[u.CHAR_DATA_CHAR_INDEX].charCodeAt(0) |
                    (p[u.CHAR_DATA_WIDTH_INDEX] << 22);
                l &&
                  ((this.combinedData = p[u.CHAR_DATA_CHAR_INDEX]),
                  (this.content =
                    2097152 | (p[u.CHAR_DATA_WIDTH_INDEX] << 22)));
              }
              getAsCharData() {
                return [
                  this.fg,
                  this.getChars(),
                  this.getWidth(),
                  this.getCode(),
                ];
              }
            }
            r.CellData = d;
          },
          643: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.WHITESPACE_CELL_CODE =
                r.WHITESPACE_CELL_WIDTH =
                r.WHITESPACE_CELL_CHAR =
                r.NULL_CELL_CODE =
                r.NULL_CELL_WIDTH =
                r.NULL_CELL_CHAR =
                r.CHAR_DATA_CODE_INDEX =
                r.CHAR_DATA_WIDTH_INDEX =
                r.CHAR_DATA_CHAR_INDEX =
                r.CHAR_DATA_ATTR_INDEX =
                r.DEFAULT_EXT =
                r.DEFAULT_ATTR =
                r.DEFAULT_COLOR =
                  void 0),
              (r.DEFAULT_COLOR = 0),
              (r.DEFAULT_ATTR = 256 | (r.DEFAULT_COLOR << 9)),
              (r.DEFAULT_EXT = 0),
              (r.CHAR_DATA_ATTR_INDEX = 0),
              (r.CHAR_DATA_CHAR_INDEX = 1),
              (r.CHAR_DATA_WIDTH_INDEX = 2),
              (r.CHAR_DATA_CODE_INDEX = 3),
              (r.NULL_CELL_CHAR = ""),
              (r.NULL_CELL_WIDTH = 1),
              (r.NULL_CELL_CODE = 0),
              (r.WHITESPACE_CELL_CHAR = " "),
              (r.WHITESPACE_CELL_WIDTH = 1),
              (r.WHITESPACE_CELL_CODE = 32);
          },
          4863: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Marker = void 0);
            const h = o(8460),
              u = o(844);
            class n {
              get id() {
                return this._id;
              }
              constructor(f) {
                (this.line = f),
                  (this.isDisposed = !1),
                  (this._disposables = []),
                  (this._id = n._nextId++),
                  (this._onDispose = this.register(new h.EventEmitter())),
                  (this.onDispose = this._onDispose.event);
              }
              dispose() {
                this.isDisposed ||
                  ((this.isDisposed = !0),
                  (this.line = -1),
                  this._onDispose.fire(),
                  (0, u.disposeArray)(this._disposables),
                  (this._disposables.length = 0));
              }
              register(f) {
                return this._disposables.push(f), f;
              }
            }
            (r.Marker = n), (n._nextId = 1);
          },
          7116: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.DEFAULT_CHARSET = r.CHARSETS = void 0),
              (r.CHARSETS = {}),
              (r.DEFAULT_CHARSET = r.CHARSETS.B),
              (r.CHARSETS[0] = {
                "`": "◆",
                a: "▒",
                b: "␉",
                c: "␌",
                d: "␍",
                e: "␊",
                f: "°",
                g: "±",
                h: "␤",
                i: "␋",
                j: "┘",
                k: "┐",
                l: "┌",
                m: "└",
                n: "┼",
                o: "⎺",
                p: "⎻",
                q: "─",
                r: "⎼",
                s: "⎽",
                t: "├",
                u: "┤",
                v: "┴",
                w: "┬",
                x: "│",
                y: "≤",
                z: "≥",
                "{": "π",
                "|": "≠",
                "}": "£",
                "~": "·",
              }),
              (r.CHARSETS.A = { "#": "£" }),
              (r.CHARSETS.B = void 0),
              (r.CHARSETS[4] = {
                "#": "£",
                "@": "¾",
                "[": "ij",
                "\\": "½",
                "]": "|",
                "{": "¨",
                "|": "f",
                "}": "¼",
                "~": "´",
              }),
              (r.CHARSETS.C = r.CHARSETS[5] =
                {
                  "[": "Ä",
                  "\\": "Ö",
                  "]": "Å",
                  "^": "Ü",
                  "`": "é",
                  "{": "ä",
                  "|": "ö",
                  "}": "å",
                  "~": "ü",
                }),
              (r.CHARSETS.R = {
                "#": "£",
                "@": "à",
                "[": "°",
                "\\": "ç",
                "]": "§",
                "{": "é",
                "|": "ù",
                "}": "è",
                "~": "¨",
              }),
              (r.CHARSETS.Q = {
                "@": "à",
                "[": "â",
                "\\": "ç",
                "]": "ê",
                "^": "î",
                "`": "ô",
                "{": "é",
                "|": "ù",
                "}": "è",
                "~": "û",
              }),
              (r.CHARSETS.K = {
                "@": "§",
                "[": "Ä",
                "\\": "Ö",
                "]": "Ü",
                "{": "ä",
                "|": "ö",
                "}": "ü",
                "~": "ß",
              }),
              (r.CHARSETS.Y = {
                "#": "£",
                "@": "§",
                "[": "°",
                "\\": "ç",
                "]": "é",
                "`": "ù",
                "{": "à",
                "|": "ò",
                "}": "è",
                "~": "ì",
              }),
              (r.CHARSETS.E = r.CHARSETS[6] =
                {
                  "@": "Ä",
                  "[": "Æ",
                  "\\": "Ø",
                  "]": "Å",
                  "^": "Ü",
                  "`": "ä",
                  "{": "æ",
                  "|": "ø",
                  "}": "å",
                  "~": "ü",
                }),
              (r.CHARSETS.Z = {
                "#": "£",
                "@": "§",
                "[": "¡",
                "\\": "Ñ",
                "]": "¿",
                "{": "°",
                "|": "ñ",
                "}": "ç",
              }),
              (r.CHARSETS.H = r.CHARSETS[7] =
                {
                  "@": "É",
                  "[": "Ä",
                  "\\": "Ö",
                  "]": "Å",
                  "^": "Ü",
                  "`": "é",
                  "{": "ä",
                  "|": "ö",
                  "}": "å",
                  "~": "ü",
                }),
              (r.CHARSETS["="] = {
                "#": "ù",
                "@": "à",
                "[": "é",
                "\\": "ç",
                "]": "ê",
                "^": "î",
                _: "è",
                "`": "ô",
                "{": "ä",
                "|": "ö",
                "}": "ü",
                "~": "û",
              });
          },
          2584: (L, r) => {
            var o, h, u;
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.C1_ESCAPED = r.C1 = r.C0 = void 0),
              (function (n) {
                (n.NUL = "\0"),
                  (n.SOH = ""),
                  (n.STX = ""),
                  (n.ETX = ""),
                  (n.EOT = ""),
                  (n.ENQ = ""),
                  (n.ACK = ""),
                  (n.BEL = "\x07"),
                  (n.BS = "\b"),
                  (n.HT = "	"),
                  (n.LF = `
`),
                  (n.VT = "\v"),
                  (n.FF = "\f"),
                  (n.CR = "\r"),
                  (n.SO = ""),
                  (n.SI = ""),
                  (n.DLE = ""),
                  (n.DC1 = ""),
                  (n.DC2 = ""),
                  (n.DC3 = ""),
                  (n.DC4 = ""),
                  (n.NAK = ""),
                  (n.SYN = ""),
                  (n.ETB = ""),
                  (n.CAN = ""),
                  (n.EM = ""),
                  (n.SUB = ""),
                  (n.ESC = "\x1B"),
                  (n.FS = ""),
                  (n.GS = ""),
                  (n.RS = ""),
                  (n.US = ""),
                  (n.SP = " "),
                  (n.DEL = "");
              })(o || (r.C0 = o = {})),
              (function (n) {
                (n.PAD = ""),
                  (n.HOP = ""),
                  (n.BPH = ""),
                  (n.NBH = ""),
                  (n.IND = ""),
                  (n.NEL = ""),
                  (n.SSA = ""),
                  (n.ESA = ""),
                  (n.HTS = ""),
                  (n.HTJ = ""),
                  (n.VTS = ""),
                  (n.PLD = ""),
                  (n.PLU = ""),
                  (n.RI = ""),
                  (n.SS2 = ""),
                  (n.SS3 = ""),
                  (n.DCS = ""),
                  (n.PU1 = ""),
                  (n.PU2 = ""),
                  (n.STS = ""),
                  (n.CCH = ""),
                  (n.MW = ""),
                  (n.SPA = ""),
                  (n.EPA = ""),
                  (n.SOS = ""),
                  (n.SGCI = ""),
                  (n.SCI = ""),
                  (n.CSI = ""),
                  (n.ST = ""),
                  (n.OSC = ""),
                  (n.PM = ""),
                  (n.APC = "");
              })(h || (r.C1 = h = {})),
              (function (n) {
                n.ST = `${o.ESC}\\`;
              })(u || (r.C1_ESCAPED = u = {}));
          },
          7399: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.evaluateKeyboardEvent = void 0);
            const h = o(2584),
              u = {
                48: ["0", ")"],
                49: ["1", "!"],
                50: ["2", "@"],
                51: ["3", "#"],
                52: ["4", "$"],
                53: ["5", "%"],
                54: ["6", "^"],
                55: ["7", "&"],
                56: ["8", "*"],
                57: ["9", "("],
                186: [";", ":"],
                187: ["=", "+"],
                188: [",", "<"],
                189: ["-", "_"],
                190: [".", ">"],
                191: ["/", "?"],
                192: ["`", "~"],
                219: ["[", "{"],
                220: ["\\", "|"],
                221: ["]", "}"],
                222: ["'", '"'],
              };
            r.evaluateKeyboardEvent = function (n, d, f, p) {
              const l = { type: 0, cancel: !1, key: void 0 },
                t =
                  (n.shiftKey ? 1 : 0) |
                  (n.altKey ? 2 : 0) |
                  (n.ctrlKey ? 4 : 0) |
                  (n.metaKey ? 8 : 0);
              switch (n.keyCode) {
                case 0:
                  n.key === "UIKeyInputUpArrow"
                    ? (l.key = d ? h.C0.ESC + "OA" : h.C0.ESC + "[A")
                    : n.key === "UIKeyInputLeftArrow"
                    ? (l.key = d ? h.C0.ESC + "OD" : h.C0.ESC + "[D")
                    : n.key === "UIKeyInputRightArrow"
                    ? (l.key = d ? h.C0.ESC + "OC" : h.C0.ESC + "[C")
                    : n.key === "UIKeyInputDownArrow" &&
                      (l.key = d ? h.C0.ESC + "OB" : h.C0.ESC + "[B");
                  break;
                case 8:
                  (l.key = n.ctrlKey ? "\b" : h.C0.DEL),
                    n.altKey && (l.key = h.C0.ESC + l.key);
                  break;
                case 9:
                  if (n.shiftKey) {
                    l.key = h.C0.ESC + "[Z";
                    break;
                  }
                  (l.key = h.C0.HT), (l.cancel = !0);
                  break;
                case 13:
                  (l.key = n.altKey ? h.C0.ESC + h.C0.CR : h.C0.CR),
                    (l.cancel = !0);
                  break;
                case 27:
                  (l.key = h.C0.ESC),
                    n.altKey && (l.key = h.C0.ESC + h.C0.ESC),
                    (l.cancel = !0);
                  break;
                case 37:
                  if (n.metaKey) break;
                  t
                    ? ((l.key = h.C0.ESC + "[1;" + (t + 1) + "D"),
                      l.key === h.C0.ESC + "[1;3D" &&
                        (l.key = h.C0.ESC + (f ? "b" : "[1;5D")))
                    : (l.key = d ? h.C0.ESC + "OD" : h.C0.ESC + "[D");
                  break;
                case 39:
                  if (n.metaKey) break;
                  t
                    ? ((l.key = h.C0.ESC + "[1;" + (t + 1) + "C"),
                      l.key === h.C0.ESC + "[1;3C" &&
                        (l.key = h.C0.ESC + (f ? "f" : "[1;5C")))
                    : (l.key = d ? h.C0.ESC + "OC" : h.C0.ESC + "[C");
                  break;
                case 38:
                  if (n.metaKey) break;
                  t
                    ? ((l.key = h.C0.ESC + "[1;" + (t + 1) + "A"),
                      f ||
                        l.key !== h.C0.ESC + "[1;3A" ||
                        (l.key = h.C0.ESC + "[1;5A"))
                    : (l.key = d ? h.C0.ESC + "OA" : h.C0.ESC + "[A");
                  break;
                case 40:
                  if (n.metaKey) break;
                  t
                    ? ((l.key = h.C0.ESC + "[1;" + (t + 1) + "B"),
                      f ||
                        l.key !== h.C0.ESC + "[1;3B" ||
                        (l.key = h.C0.ESC + "[1;5B"))
                    : (l.key = d ? h.C0.ESC + "OB" : h.C0.ESC + "[B");
                  break;
                case 45:
                  n.shiftKey || n.ctrlKey || (l.key = h.C0.ESC + "[2~");
                  break;
                case 46:
                  l.key = t
                    ? h.C0.ESC + "[3;" + (t + 1) + "~"
                    : h.C0.ESC + "[3~";
                  break;
                case 36:
                  l.key = t
                    ? h.C0.ESC + "[1;" + (t + 1) + "H"
                    : d
                    ? h.C0.ESC + "OH"
                    : h.C0.ESC + "[H";
                  break;
                case 35:
                  l.key = t
                    ? h.C0.ESC + "[1;" + (t + 1) + "F"
                    : d
                    ? h.C0.ESC + "OF"
                    : h.C0.ESC + "[F";
                  break;
                case 33:
                  n.shiftKey
                    ? (l.type = 2)
                    : n.ctrlKey
                    ? (l.key = h.C0.ESC + "[5;" + (t + 1) + "~")
                    : (l.key = h.C0.ESC + "[5~");
                  break;
                case 34:
                  n.shiftKey
                    ? (l.type = 3)
                    : n.ctrlKey
                    ? (l.key = h.C0.ESC + "[6;" + (t + 1) + "~")
                    : (l.key = h.C0.ESC + "[6~");
                  break;
                case 112:
                  l.key = t
                    ? h.C0.ESC + "[1;" + (t + 1) + "P"
                    : h.C0.ESC + "OP";
                  break;
                case 113:
                  l.key = t
                    ? h.C0.ESC + "[1;" + (t + 1) + "Q"
                    : h.C0.ESC + "OQ";
                  break;
                case 114:
                  l.key = t
                    ? h.C0.ESC + "[1;" + (t + 1) + "R"
                    : h.C0.ESC + "OR";
                  break;
                case 115:
                  l.key = t
                    ? h.C0.ESC + "[1;" + (t + 1) + "S"
                    : h.C0.ESC + "OS";
                  break;
                case 116:
                  l.key = t
                    ? h.C0.ESC + "[15;" + (t + 1) + "~"
                    : h.C0.ESC + "[15~";
                  break;
                case 117:
                  l.key = t
                    ? h.C0.ESC + "[17;" + (t + 1) + "~"
                    : h.C0.ESC + "[17~";
                  break;
                case 118:
                  l.key = t
                    ? h.C0.ESC + "[18;" + (t + 1) + "~"
                    : h.C0.ESC + "[18~";
                  break;
                case 119:
                  l.key = t
                    ? h.C0.ESC + "[19;" + (t + 1) + "~"
                    : h.C0.ESC + "[19~";
                  break;
                case 120:
                  l.key = t
                    ? h.C0.ESC + "[20;" + (t + 1) + "~"
                    : h.C0.ESC + "[20~";
                  break;
                case 121:
                  l.key = t
                    ? h.C0.ESC + "[21;" + (t + 1) + "~"
                    : h.C0.ESC + "[21~";
                  break;
                case 122:
                  l.key = t
                    ? h.C0.ESC + "[23;" + (t + 1) + "~"
                    : h.C0.ESC + "[23~";
                  break;
                case 123:
                  l.key = t
                    ? h.C0.ESC + "[24;" + (t + 1) + "~"
                    : h.C0.ESC + "[24~";
                  break;
                default:
                  if (!n.ctrlKey || n.shiftKey || n.altKey || n.metaKey)
                    if ((f && !p) || !n.altKey || n.metaKey)
                      !f || n.altKey || n.ctrlKey || n.shiftKey || !n.metaKey
                        ? n.key &&
                          !n.ctrlKey &&
                          !n.altKey &&
                          !n.metaKey &&
                          n.keyCode >= 48 &&
                          n.key.length === 1
                          ? (l.key = n.key)
                          : n.key &&
                            n.ctrlKey &&
                            (n.key === "_" && (l.key = h.C0.US),
                            n.key === "@" && (l.key = h.C0.NUL))
                        : n.keyCode === 65 && (l.type = 1);
                    else {
                      const i = u[n.keyCode],
                        e = i?.[n.shiftKey ? 1 : 0];
                      if (e) l.key = h.C0.ESC + e;
                      else if (n.keyCode >= 65 && n.keyCode <= 90) {
                        const s = n.ctrlKey ? n.keyCode - 64 : n.keyCode + 32;
                        let a = String.fromCharCode(s);
                        n.shiftKey && (a = a.toUpperCase()),
                          (l.key = h.C0.ESC + a);
                      } else if (n.keyCode === 32)
                        l.key = h.C0.ESC + (n.ctrlKey ? h.C0.NUL : " ");
                      else if (n.key === "Dead" && n.code.startsWith("Key")) {
                        let s = n.code.slice(3, 4);
                        n.shiftKey || (s = s.toLowerCase()),
                          (l.key = h.C0.ESC + s),
                          (l.cancel = !0);
                      }
                    }
                  else
                    n.keyCode >= 65 && n.keyCode <= 90
                      ? (l.key = String.fromCharCode(n.keyCode - 64))
                      : n.keyCode === 32
                      ? (l.key = h.C0.NUL)
                      : n.keyCode >= 51 && n.keyCode <= 55
                      ? (l.key = String.fromCharCode(n.keyCode - 51 + 27))
                      : n.keyCode === 56
                      ? (l.key = h.C0.DEL)
                      : n.keyCode === 219
                      ? (l.key = h.C0.ESC)
                      : n.keyCode === 220
                      ? (l.key = h.C0.FS)
                      : n.keyCode === 221 && (l.key = h.C0.GS);
              }
              return l;
            };
          },
          482: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Utf8ToUtf32 =
                r.StringToUtf32 =
                r.utf32ToString =
                r.stringFromCodePoint =
                  void 0),
              (r.stringFromCodePoint = function (o) {
                return o > 65535
                  ? ((o -= 65536),
                    String.fromCharCode(55296 + (o >> 10)) +
                      String.fromCharCode((o % 1024) + 56320))
                  : String.fromCharCode(o);
              }),
              (r.utf32ToString = function (o, h = 0, u = o.length) {
                let n = "";
                for (let d = h; d < u; ++d) {
                  let f = o[d];
                  f > 65535
                    ? ((f -= 65536),
                      (n +=
                        String.fromCharCode(55296 + (f >> 10)) +
                        String.fromCharCode((f % 1024) + 56320)))
                    : (n += String.fromCharCode(f));
                }
                return n;
              }),
              (r.StringToUtf32 = class {
                constructor() {
                  this._interim = 0;
                }
                clear() {
                  this._interim = 0;
                }
                decode(o, h) {
                  const u = o.length;
                  if (!u) return 0;
                  let n = 0,
                    d = 0;
                  if (this._interim) {
                    const f = o.charCodeAt(d++);
                    56320 <= f && f <= 57343
                      ? (h[n++] =
                          1024 * (this._interim - 55296) + f - 56320 + 65536)
                      : ((h[n++] = this._interim), (h[n++] = f)),
                      (this._interim = 0);
                  }
                  for (let f = d; f < u; ++f) {
                    const p = o.charCodeAt(f);
                    if (55296 <= p && p <= 56319) {
                      if (++f >= u) return (this._interim = p), n;
                      const l = o.charCodeAt(f);
                      56320 <= l && l <= 57343
                        ? (h[n++] = 1024 * (p - 55296) + l - 56320 + 65536)
                        : ((h[n++] = p), (h[n++] = l));
                    } else p !== 65279 && (h[n++] = p);
                  }
                  return n;
                }
              }),
              (r.Utf8ToUtf32 = class {
                constructor() {
                  this.interim = new Uint8Array(3);
                }
                clear() {
                  this.interim.fill(0);
                }
                decode(o, h) {
                  const u = o.length;
                  if (!u) return 0;
                  let n,
                    d,
                    f,
                    p,
                    l = 0,
                    t = 0,
                    i = 0;
                  if (this.interim[0]) {
                    let a = !1,
                      v = this.interim[0];
                    v &= (224 & v) == 192 ? 31 : (240 & v) == 224 ? 15 : 7;
                    let _,
                      g = 0;
                    for (; (_ = 63 & this.interim[++g]) && g < 4; )
                      (v <<= 6), (v |= _);
                    const c =
                        (224 & this.interim[0]) == 192
                          ? 2
                          : (240 & this.interim[0]) == 224
                          ? 3
                          : 4,
                      m = c - g;
                    for (; i < m; ) {
                      if (i >= u) return 0;
                      if (((_ = o[i++]), (192 & _) != 128)) {
                        i--, (a = !0);
                        break;
                      }
                      (this.interim[g++] = _), (v <<= 6), (v |= 63 & _);
                    }
                    a ||
                      (c === 2
                        ? v < 128
                          ? i--
                          : (h[l++] = v)
                        : c === 3
                        ? v < 2048 ||
                          (v >= 55296 && v <= 57343) ||
                          v === 65279 ||
                          (h[l++] = v)
                        : v < 65536 || v > 1114111 || (h[l++] = v)),
                      this.interim.fill(0);
                  }
                  const e = u - 4;
                  let s = i;
                  for (; s < u; ) {
                    for (
                      ;
                      !(
                        !(s < e) ||
                        128 & (n = o[s]) ||
                        128 & (d = o[s + 1]) ||
                        128 & (f = o[s + 2]) ||
                        128 & (p = o[s + 3])
                      );

                    )
                      (h[l++] = n),
                        (h[l++] = d),
                        (h[l++] = f),
                        (h[l++] = p),
                        (s += 4);
                    if (((n = o[s++]), n < 128)) h[l++] = n;
                    else if ((224 & n) == 192) {
                      if (s >= u) return (this.interim[0] = n), l;
                      if (((d = o[s++]), (192 & d) != 128)) {
                        s--;
                        continue;
                      }
                      if (((t = ((31 & n) << 6) | (63 & d)), t < 128)) {
                        s--;
                        continue;
                      }
                      h[l++] = t;
                    } else if ((240 & n) == 224) {
                      if (s >= u) return (this.interim[0] = n), l;
                      if (((d = o[s++]), (192 & d) != 128)) {
                        s--;
                        continue;
                      }
                      if (s >= u)
                        return (this.interim[0] = n), (this.interim[1] = d), l;
                      if (((f = o[s++]), (192 & f) != 128)) {
                        s--;
                        continue;
                      }
                      if (
                        ((t = ((15 & n) << 12) | ((63 & d) << 6) | (63 & f)),
                        t < 2048 || (t >= 55296 && t <= 57343) || t === 65279)
                      )
                        continue;
                      h[l++] = t;
                    } else if ((248 & n) == 240) {
                      if (s >= u) return (this.interim[0] = n), l;
                      if (((d = o[s++]), (192 & d) != 128)) {
                        s--;
                        continue;
                      }
                      if (s >= u)
                        return (this.interim[0] = n), (this.interim[1] = d), l;
                      if (((f = o[s++]), (192 & f) != 128)) {
                        s--;
                        continue;
                      }
                      if (s >= u)
                        return (
                          (this.interim[0] = n),
                          (this.interim[1] = d),
                          (this.interim[2] = f),
                          l
                        );
                      if (((p = o[s++]), (192 & p) != 128)) {
                        s--;
                        continue;
                      }
                      if (
                        ((t =
                          ((7 & n) << 18) |
                          ((63 & d) << 12) |
                          ((63 & f) << 6) |
                          (63 & p)),
                        t < 65536 || t > 1114111)
                      )
                        continue;
                      h[l++] = t;
                    }
                  }
                  return l;
                }
              });
          },
          225: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.UnicodeV6 = void 0);
            const h = o(1480),
              u = [
                [768, 879],
                [1155, 1158],
                [1160, 1161],
                [1425, 1469],
                [1471, 1471],
                [1473, 1474],
                [1476, 1477],
                [1479, 1479],
                [1536, 1539],
                [1552, 1557],
                [1611, 1630],
                [1648, 1648],
                [1750, 1764],
                [1767, 1768],
                [1770, 1773],
                [1807, 1807],
                [1809, 1809],
                [1840, 1866],
                [1958, 1968],
                [2027, 2035],
                [2305, 2306],
                [2364, 2364],
                [2369, 2376],
                [2381, 2381],
                [2385, 2388],
                [2402, 2403],
                [2433, 2433],
                [2492, 2492],
                [2497, 2500],
                [2509, 2509],
                [2530, 2531],
                [2561, 2562],
                [2620, 2620],
                [2625, 2626],
                [2631, 2632],
                [2635, 2637],
                [2672, 2673],
                [2689, 2690],
                [2748, 2748],
                [2753, 2757],
                [2759, 2760],
                [2765, 2765],
                [2786, 2787],
                [2817, 2817],
                [2876, 2876],
                [2879, 2879],
                [2881, 2883],
                [2893, 2893],
                [2902, 2902],
                [2946, 2946],
                [3008, 3008],
                [3021, 3021],
                [3134, 3136],
                [3142, 3144],
                [3146, 3149],
                [3157, 3158],
                [3260, 3260],
                [3263, 3263],
                [3270, 3270],
                [3276, 3277],
                [3298, 3299],
                [3393, 3395],
                [3405, 3405],
                [3530, 3530],
                [3538, 3540],
                [3542, 3542],
                [3633, 3633],
                [3636, 3642],
                [3655, 3662],
                [3761, 3761],
                [3764, 3769],
                [3771, 3772],
                [3784, 3789],
                [3864, 3865],
                [3893, 3893],
                [3895, 3895],
                [3897, 3897],
                [3953, 3966],
                [3968, 3972],
                [3974, 3975],
                [3984, 3991],
                [3993, 4028],
                [4038, 4038],
                [4141, 4144],
                [4146, 4146],
                [4150, 4151],
                [4153, 4153],
                [4184, 4185],
                [4448, 4607],
                [4959, 4959],
                [5906, 5908],
                [5938, 5940],
                [5970, 5971],
                [6002, 6003],
                [6068, 6069],
                [6071, 6077],
                [6086, 6086],
                [6089, 6099],
                [6109, 6109],
                [6155, 6157],
                [6313, 6313],
                [6432, 6434],
                [6439, 6440],
                [6450, 6450],
                [6457, 6459],
                [6679, 6680],
                [6912, 6915],
                [6964, 6964],
                [6966, 6970],
                [6972, 6972],
                [6978, 6978],
                [7019, 7027],
                [7616, 7626],
                [7678, 7679],
                [8203, 8207],
                [8234, 8238],
                [8288, 8291],
                [8298, 8303],
                [8400, 8431],
                [12330, 12335],
                [12441, 12442],
                [43014, 43014],
                [43019, 43019],
                [43045, 43046],
                [64286, 64286],
                [65024, 65039],
                [65056, 65059],
                [65279, 65279],
                [65529, 65531],
              ],
              n = [
                [68097, 68099],
                [68101, 68102],
                [68108, 68111],
                [68152, 68154],
                [68159, 68159],
                [119143, 119145],
                [119155, 119170],
                [119173, 119179],
                [119210, 119213],
                [119362, 119364],
                [917505, 917505],
                [917536, 917631],
                [917760, 917999],
              ];
            let d;
            r.UnicodeV6 = class {
              constructor() {
                if (((this.version = "6"), !d)) {
                  (d = new Uint8Array(65536)),
                    d.fill(1),
                    (d[0] = 0),
                    d.fill(0, 1, 32),
                    d.fill(0, 127, 160),
                    d.fill(2, 4352, 4448),
                    (d[9001] = 2),
                    (d[9002] = 2),
                    d.fill(2, 11904, 42192),
                    (d[12351] = 1),
                    d.fill(2, 44032, 55204),
                    d.fill(2, 63744, 64256),
                    d.fill(2, 65040, 65050),
                    d.fill(2, 65072, 65136),
                    d.fill(2, 65280, 65377),
                    d.fill(2, 65504, 65511);
                  for (let f = 0; f < u.length; ++f)
                    d.fill(0, u[f][0], u[f][1] + 1);
                }
              }
              wcwidth(f) {
                return f < 32
                  ? 0
                  : f < 127
                  ? 1
                  : f < 65536
                  ? d[f]
                  : (function (p, l) {
                      let t,
                        i = 0,
                        e = l.length - 1;
                      if (p < l[0][0] || p > l[e][1]) return !1;
                      for (; e >= i; )
                        if (((t = (i + e) >> 1), p > l[t][1])) i = t + 1;
                        else {
                          if (!(p < l[t][0])) return !0;
                          e = t - 1;
                        }
                      return !1;
                    })(f, n)
                  ? 0
                  : (f >= 131072 && f <= 196605) || (f >= 196608 && f <= 262141)
                  ? 2
                  : 1;
              }
              charProperties(f, p) {
                let l = this.wcwidth(f),
                  t = l === 0 && p !== 0;
                if (t) {
                  const i = h.UnicodeService.extractWidth(p);
                  i === 0 ? (t = !1) : i > l && (l = i);
                }
                return h.UnicodeService.createPropertyValue(0, l, t);
              }
            };
          },
          5981: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.WriteBuffer = void 0);
            const h = o(8460),
              u = o(844);
            class n extends u.Disposable {
              constructor(f) {
                super(),
                  (this._action = f),
                  (this._writeBuffer = []),
                  (this._callbacks = []),
                  (this._pendingData = 0),
                  (this._bufferOffset = 0),
                  (this._isSyncWriting = !1),
                  (this._syncCalls = 0),
                  (this._didUserInput = !1),
                  (this._onWriteParsed = this.register(new h.EventEmitter())),
                  (this.onWriteParsed = this._onWriteParsed.event);
              }
              handleUserInput() {
                this._didUserInput = !0;
              }
              writeSync(f, p) {
                if (p !== void 0 && this._syncCalls > p)
                  return void (this._syncCalls = 0);
                if (
                  ((this._pendingData += f.length),
                  this._writeBuffer.push(f),
                  this._callbacks.push(void 0),
                  this._syncCalls++,
                  this._isSyncWriting)
                )
                  return;
                let l;
                for (
                  this._isSyncWriting = !0;
                  (l = this._writeBuffer.shift());

                ) {
                  this._action(l);
                  const t = this._callbacks.shift();
                  t && t();
                }
                (this._pendingData = 0),
                  (this._bufferOffset = 2147483647),
                  (this._isSyncWriting = !1),
                  (this._syncCalls = 0);
              }
              write(f, p) {
                if (this._pendingData > 5e7)
                  throw new Error(
                    "write data discarded, use flow control to avoid losing data"
                  );
                if (!this._writeBuffer.length) {
                  if (((this._bufferOffset = 0), this._didUserInput))
                    return (
                      (this._didUserInput = !1),
                      (this._pendingData += f.length),
                      this._writeBuffer.push(f),
                      this._callbacks.push(p),
                      void this._innerWrite()
                    );
                  setTimeout(() => this._innerWrite());
                }
                (this._pendingData += f.length),
                  this._writeBuffer.push(f),
                  this._callbacks.push(p);
              }
              _innerWrite(f = 0, p = !0) {
                const l = f || Date.now();
                for (; this._writeBuffer.length > this._bufferOffset; ) {
                  const t = this._writeBuffer[this._bufferOffset],
                    i = this._action(t, p);
                  if (i) {
                    const s = (a) =>
                      Date.now() - l >= 12
                        ? setTimeout(() => this._innerWrite(0, a))
                        : this._innerWrite(l, a);
                    return void i
                      .catch(
                        (a) => (
                          queueMicrotask(() => {
                            throw a;
                          }),
                          Promise.resolve(!1)
                        )
                      )
                      .then(s);
                  }
                  const e = this._callbacks[this._bufferOffset];
                  if (
                    (e && e(),
                    this._bufferOffset++,
                    (this._pendingData -= t.length),
                    Date.now() - l >= 12)
                  )
                    break;
                }
                this._writeBuffer.length > this._bufferOffset
                  ? (this._bufferOffset > 50 &&
                      ((this._writeBuffer = this._writeBuffer.slice(
                        this._bufferOffset
                      )),
                      (this._callbacks = this._callbacks.slice(
                        this._bufferOffset
                      )),
                      (this._bufferOffset = 0)),
                    setTimeout(() => this._innerWrite()))
                  : ((this._writeBuffer.length = 0),
                    (this._callbacks.length = 0),
                    (this._pendingData = 0),
                    (this._bufferOffset = 0)),
                  this._onWriteParsed.fire();
              }
            }
            r.WriteBuffer = n;
          },
          5941: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.toRgbString = r.parseColor = void 0);
            const o =
                /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/,
              h = /^[\da-f]+$/;
            function u(n, d) {
              const f = n.toString(16),
                p = f.length < 2 ? "0" + f : f;
              switch (d) {
                case 4:
                  return f[0];
                case 8:
                  return p;
                case 12:
                  return (p + p).slice(0, 3);
                default:
                  return p + p;
              }
            }
            (r.parseColor = function (n) {
              if (!n) return;
              let d = n.toLowerCase();
              if (d.indexOf("rgb:") === 0) {
                d = d.slice(4);
                const f = o.exec(d);
                if (f) {
                  const p = f[1] ? 15 : f[4] ? 255 : f[7] ? 4095 : 65535;
                  return [
                    Math.round(
                      (parseInt(f[1] || f[4] || f[7] || f[10], 16) / p) * 255
                    ),
                    Math.round(
                      (parseInt(f[2] || f[5] || f[8] || f[11], 16) / p) * 255
                    ),
                    Math.round(
                      (parseInt(f[3] || f[6] || f[9] || f[12], 16) / p) * 255
                    ),
                  ];
                }
              } else if (
                d.indexOf("#") === 0 &&
                ((d = d.slice(1)),
                h.exec(d) && [3, 6, 9, 12].includes(d.length))
              ) {
                const f = d.length / 3,
                  p = [0, 0, 0];
                for (let l = 0; l < 3; ++l) {
                  const t = parseInt(d.slice(f * l, f * l + f), 16);
                  p[l] =
                    f === 1 ? t << 4 : f === 2 ? t : f === 3 ? t >> 4 : t >> 8;
                }
                return p;
              }
            }),
              (r.toRgbString = function (n, d = 16) {
                const [f, p, l] = n;
                return `rgb:${u(f, d)}/${u(p, d)}/${u(l, d)}`;
              });
          },
          5770: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.PAYLOAD_LIMIT = void 0),
              (r.PAYLOAD_LIMIT = 1e7);
          },
          6351: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.DcsHandler = r.DcsParser = void 0);
            const h = o(482),
              u = o(8742),
              n = o(5770),
              d = [];
            r.DcsParser = class {
              constructor() {
                (this._handlers = Object.create(null)),
                  (this._active = d),
                  (this._ident = 0),
                  (this._handlerFb = () => {}),
                  (this._stack = {
                    paused: !1,
                    loopPosition: 0,
                    fallThrough: !1,
                  });
              }
              dispose() {
                (this._handlers = Object.create(null)),
                  (this._handlerFb = () => {}),
                  (this._active = d);
              }
              registerHandler(p, l) {
                this._handlers[p] === void 0 && (this._handlers[p] = []);
                const t = this._handlers[p];
                return (
                  t.push(l),
                  {
                    dispose: () => {
                      const i = t.indexOf(l);
                      i !== -1 && t.splice(i, 1);
                    },
                  }
                );
              }
              clearHandler(p) {
                this._handlers[p] && delete this._handlers[p];
              }
              setHandlerFallback(p) {
                this._handlerFb = p;
              }
              reset() {
                if (this._active.length)
                  for (
                    let p = this._stack.paused
                      ? this._stack.loopPosition - 1
                      : this._active.length - 1;
                    p >= 0;
                    --p
                  )
                    this._active[p].unhook(!1);
                (this._stack.paused = !1),
                  (this._active = d),
                  (this._ident = 0);
              }
              hook(p, l) {
                if (
                  (this.reset(),
                  (this._ident = p),
                  (this._active = this._handlers[p] || d),
                  this._active.length)
                )
                  for (let t = this._active.length - 1; t >= 0; t--)
                    this._active[t].hook(l);
                else this._handlerFb(this._ident, "HOOK", l);
              }
              put(p, l, t) {
                if (this._active.length)
                  for (let i = this._active.length - 1; i >= 0; i--)
                    this._active[i].put(p, l, t);
                else
                  this._handlerFb(
                    this._ident,
                    "PUT",
                    (0, h.utf32ToString)(p, l, t)
                  );
              }
              unhook(p, l = !0) {
                if (this._active.length) {
                  let t = !1,
                    i = this._active.length - 1,
                    e = !1;
                  if (
                    (this._stack.paused &&
                      ((i = this._stack.loopPosition - 1),
                      (t = l),
                      (e = this._stack.fallThrough),
                      (this._stack.paused = !1)),
                    !e && t === !1)
                  ) {
                    for (
                      ;
                      i >= 0 && ((t = this._active[i].unhook(p)), t !== !0);
                      i--
                    )
                      if (t instanceof Promise)
                        return (
                          (this._stack.paused = !0),
                          (this._stack.loopPosition = i),
                          (this._stack.fallThrough = !1),
                          t
                        );
                    i--;
                  }
                  for (; i >= 0; i--)
                    if (
                      ((t = this._active[i].unhook(!1)), t instanceof Promise)
                    )
                      return (
                        (this._stack.paused = !0),
                        (this._stack.loopPosition = i),
                        (this._stack.fallThrough = !0),
                        t
                      );
                } else this._handlerFb(this._ident, "UNHOOK", p);
                (this._active = d), (this._ident = 0);
              }
            };
            const f = new u.Params();
            f.addParam(0),
              (r.DcsHandler = class {
                constructor(p) {
                  (this._handler = p),
                    (this._data = ""),
                    (this._params = f),
                    (this._hitLimit = !1);
                }
                hook(p) {
                  (this._params = p.length > 1 || p.params[0] ? p.clone() : f),
                    (this._data = ""),
                    (this._hitLimit = !1);
                }
                put(p, l, t) {
                  this._hitLimit ||
                    ((this._data += (0, h.utf32ToString)(p, l, t)),
                    this._data.length > n.PAYLOAD_LIMIT &&
                      ((this._data = ""), (this._hitLimit = !0)));
                }
                unhook(p) {
                  let l = !1;
                  if (this._hitLimit) l = !1;
                  else if (
                    p &&
                    ((l = this._handler(this._data, this._params)),
                    l instanceof Promise)
                  )
                    return l.then(
                      (t) => (
                        (this._params = f),
                        (this._data = ""),
                        (this._hitLimit = !1),
                        t
                      )
                    );
                  return (
                    (this._params = f),
                    (this._data = ""),
                    (this._hitLimit = !1),
                    l
                  );
                }
              });
          },
          2015: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.EscapeSequenceParser =
                r.VT500_TRANSITION_TABLE =
                r.TransitionTable =
                  void 0);
            const h = o(844),
              u = o(8742),
              n = o(6242),
              d = o(6351);
            class f {
              constructor(i) {
                this.table = new Uint8Array(i);
              }
              setDefault(i, e) {
                this.table.fill((i << 4) | e);
              }
              add(i, e, s, a) {
                this.table[(e << 8) | i] = (s << 4) | a;
              }
              addMany(i, e, s, a) {
                for (let v = 0; v < i.length; v++)
                  this.table[(e << 8) | i[v]] = (s << 4) | a;
              }
            }
            r.TransitionTable = f;
            const p = 160;
            r.VT500_TRANSITION_TABLE = (function () {
              const t = new f(4095),
                i = Array.apply(null, Array(256)).map((g, c) => c),
                e = (g, c) => i.slice(g, c),
                s = e(32, 127),
                a = e(0, 24);
              a.push(25), a.push.apply(a, e(28, 32));
              const v = e(0, 14);
              let _;
              for (_ in (t.setDefault(1, 0), t.addMany(s, 0, 2, 0), v))
                t.addMany([24, 26, 153, 154], _, 3, 0),
                  t.addMany(e(128, 144), _, 3, 0),
                  t.addMany(e(144, 152), _, 3, 0),
                  t.add(156, _, 0, 0),
                  t.add(27, _, 11, 1),
                  t.add(157, _, 4, 8),
                  t.addMany([152, 158, 159], _, 0, 7),
                  t.add(155, _, 11, 3),
                  t.add(144, _, 11, 9);
              return (
                t.addMany(a, 0, 3, 0),
                t.addMany(a, 1, 3, 1),
                t.add(127, 1, 0, 1),
                t.addMany(a, 8, 0, 8),
                t.addMany(a, 3, 3, 3),
                t.add(127, 3, 0, 3),
                t.addMany(a, 4, 3, 4),
                t.add(127, 4, 0, 4),
                t.addMany(a, 6, 3, 6),
                t.addMany(a, 5, 3, 5),
                t.add(127, 5, 0, 5),
                t.addMany(a, 2, 3, 2),
                t.add(127, 2, 0, 2),
                t.add(93, 1, 4, 8),
                t.addMany(s, 8, 5, 8),
                t.add(127, 8, 5, 8),
                t.addMany([156, 27, 24, 26, 7], 8, 6, 0),
                t.addMany(e(28, 32), 8, 0, 8),
                t.addMany([88, 94, 95], 1, 0, 7),
                t.addMany(s, 7, 0, 7),
                t.addMany(a, 7, 0, 7),
                t.add(156, 7, 0, 0),
                t.add(127, 7, 0, 7),
                t.add(91, 1, 11, 3),
                t.addMany(e(64, 127), 3, 7, 0),
                t.addMany(e(48, 60), 3, 8, 4),
                t.addMany([60, 61, 62, 63], 3, 9, 4),
                t.addMany(e(48, 60), 4, 8, 4),
                t.addMany(e(64, 127), 4, 7, 0),
                t.addMany([60, 61, 62, 63], 4, 0, 6),
                t.addMany(e(32, 64), 6, 0, 6),
                t.add(127, 6, 0, 6),
                t.addMany(e(64, 127), 6, 0, 0),
                t.addMany(e(32, 48), 3, 9, 5),
                t.addMany(e(32, 48), 5, 9, 5),
                t.addMany(e(48, 64), 5, 0, 6),
                t.addMany(e(64, 127), 5, 7, 0),
                t.addMany(e(32, 48), 4, 9, 5),
                t.addMany(e(32, 48), 1, 9, 2),
                t.addMany(e(32, 48), 2, 9, 2),
                t.addMany(e(48, 127), 2, 10, 0),
                t.addMany(e(48, 80), 1, 10, 0),
                t.addMany(e(81, 88), 1, 10, 0),
                t.addMany([89, 90, 92], 1, 10, 0),
                t.addMany(e(96, 127), 1, 10, 0),
                t.add(80, 1, 11, 9),
                t.addMany(a, 9, 0, 9),
                t.add(127, 9, 0, 9),
                t.addMany(e(28, 32), 9, 0, 9),
                t.addMany(e(32, 48), 9, 9, 12),
                t.addMany(e(48, 60), 9, 8, 10),
                t.addMany([60, 61, 62, 63], 9, 9, 10),
                t.addMany(a, 11, 0, 11),
                t.addMany(e(32, 128), 11, 0, 11),
                t.addMany(e(28, 32), 11, 0, 11),
                t.addMany(a, 10, 0, 10),
                t.add(127, 10, 0, 10),
                t.addMany(e(28, 32), 10, 0, 10),
                t.addMany(e(48, 60), 10, 8, 10),
                t.addMany([60, 61, 62, 63], 10, 0, 11),
                t.addMany(e(32, 48), 10, 9, 12),
                t.addMany(a, 12, 0, 12),
                t.add(127, 12, 0, 12),
                t.addMany(e(28, 32), 12, 0, 12),
                t.addMany(e(32, 48), 12, 9, 12),
                t.addMany(e(48, 64), 12, 0, 11),
                t.addMany(e(64, 127), 12, 12, 13),
                t.addMany(e(64, 127), 10, 12, 13),
                t.addMany(e(64, 127), 9, 12, 13),
                t.addMany(a, 13, 13, 13),
                t.addMany(s, 13, 13, 13),
                t.add(127, 13, 0, 13),
                t.addMany([27, 156, 24, 26], 13, 14, 0),
                t.add(p, 0, 2, 0),
                t.add(p, 8, 5, 8),
                t.add(p, 6, 0, 6),
                t.add(p, 11, 0, 11),
                t.add(p, 13, 13, 13),
                t
              );
            })();
            class l extends h.Disposable {
              constructor(i = r.VT500_TRANSITION_TABLE) {
                super(),
                  (this._transitions = i),
                  (this._parseStack = {
                    state: 0,
                    handlers: [],
                    handlerPos: 0,
                    transition: 0,
                    chunkPos: 0,
                  }),
                  (this.initialState = 0),
                  (this.currentState = this.initialState),
                  (this._params = new u.Params()),
                  this._params.addParam(0),
                  (this._collect = 0),
                  (this.precedingJoinState = 0),
                  (this._printHandlerFb = (e, s, a) => {}),
                  (this._executeHandlerFb = (e) => {}),
                  (this._csiHandlerFb = (e, s) => {}),
                  (this._escHandlerFb = (e) => {}),
                  (this._errorHandlerFb = (e) => e),
                  (this._printHandler = this._printHandlerFb),
                  (this._executeHandlers = Object.create(null)),
                  (this._csiHandlers = Object.create(null)),
                  (this._escHandlers = Object.create(null)),
                  this.register(
                    (0, h.toDisposable)(() => {
                      (this._csiHandlers = Object.create(null)),
                        (this._executeHandlers = Object.create(null)),
                        (this._escHandlers = Object.create(null));
                    })
                  ),
                  (this._oscParser = this.register(new n.OscParser())),
                  (this._dcsParser = this.register(new d.DcsParser())),
                  (this._errorHandler = this._errorHandlerFb),
                  this.registerEscHandler({ final: "\\" }, () => !0);
              }
              _identifier(i, e = [64, 126]) {
                let s = 0;
                if (i.prefix) {
                  if (i.prefix.length > 1)
                    throw new Error("only one byte as prefix supported");
                  if (((s = i.prefix.charCodeAt(0)), (s && 60 > s) || s > 63))
                    throw new Error("prefix must be in range 0x3c .. 0x3f");
                }
                if (i.intermediates) {
                  if (i.intermediates.length > 2)
                    throw new Error(
                      "only two bytes as intermediates are supported"
                    );
                  for (let v = 0; v < i.intermediates.length; ++v) {
                    const _ = i.intermediates.charCodeAt(v);
                    if (32 > _ || _ > 47)
                      throw new Error(
                        "intermediate must be in range 0x20 .. 0x2f"
                      );
                    (s <<= 8), (s |= _);
                  }
                }
                if (i.final.length !== 1)
                  throw new Error("final must be a single byte");
                const a = i.final.charCodeAt(0);
                if (e[0] > a || a > e[1])
                  throw new Error(`final must be in range ${e[0]} .. ${e[1]}`);
                return (s <<= 8), (s |= a), s;
              }
              identToString(i) {
                const e = [];
                for (; i; ) e.push(String.fromCharCode(255 & i)), (i >>= 8);
                return e.reverse().join("");
              }
              setPrintHandler(i) {
                this._printHandler = i;
              }
              clearPrintHandler() {
                this._printHandler = this._printHandlerFb;
              }
              registerEscHandler(i, e) {
                const s = this._identifier(i, [48, 126]);
                this._escHandlers[s] === void 0 && (this._escHandlers[s] = []);
                const a = this._escHandlers[s];
                return (
                  a.push(e),
                  {
                    dispose: () => {
                      const v = a.indexOf(e);
                      v !== -1 && a.splice(v, 1);
                    },
                  }
                );
              }
              clearEscHandler(i) {
                this._escHandlers[this._identifier(i, [48, 126])] &&
                  delete this._escHandlers[this._identifier(i, [48, 126])];
              }
              setEscHandlerFallback(i) {
                this._escHandlerFb = i;
              }
              setExecuteHandler(i, e) {
                this._executeHandlers[i.charCodeAt(0)] = e;
              }
              clearExecuteHandler(i) {
                this._executeHandlers[i.charCodeAt(0)] &&
                  delete this._executeHandlers[i.charCodeAt(0)];
              }
              setExecuteHandlerFallback(i) {
                this._executeHandlerFb = i;
              }
              registerCsiHandler(i, e) {
                const s = this._identifier(i);
                this._csiHandlers[s] === void 0 && (this._csiHandlers[s] = []);
                const a = this._csiHandlers[s];
                return (
                  a.push(e),
                  {
                    dispose: () => {
                      const v = a.indexOf(e);
                      v !== -1 && a.splice(v, 1);
                    },
                  }
                );
              }
              clearCsiHandler(i) {
                this._csiHandlers[this._identifier(i)] &&
                  delete this._csiHandlers[this._identifier(i)];
              }
              setCsiHandlerFallback(i) {
                this._csiHandlerFb = i;
              }
              registerDcsHandler(i, e) {
                return this._dcsParser.registerHandler(this._identifier(i), e);
              }
              clearDcsHandler(i) {
                this._dcsParser.clearHandler(this._identifier(i));
              }
              setDcsHandlerFallback(i) {
                this._dcsParser.setHandlerFallback(i);
              }
              registerOscHandler(i, e) {
                return this._oscParser.registerHandler(i, e);
              }
              clearOscHandler(i) {
                this._oscParser.clearHandler(i);
              }
              setOscHandlerFallback(i) {
                this._oscParser.setHandlerFallback(i);
              }
              setErrorHandler(i) {
                this._errorHandler = i;
              }
              clearErrorHandler() {
                this._errorHandler = this._errorHandlerFb;
              }
              reset() {
                (this.currentState = this.initialState),
                  this._oscParser.reset(),
                  this._dcsParser.reset(),
                  this._params.reset(),
                  this._params.addParam(0),
                  (this._collect = 0),
                  (this.precedingJoinState = 0),
                  this._parseStack.state !== 0 &&
                    ((this._parseStack.state = 2),
                    (this._parseStack.handlers = []));
              }
              _preserveStack(i, e, s, a, v) {
                (this._parseStack.state = i),
                  (this._parseStack.handlers = e),
                  (this._parseStack.handlerPos = s),
                  (this._parseStack.transition = a),
                  (this._parseStack.chunkPos = v);
              }
              parse(i, e, s) {
                let a,
                  v = 0,
                  _ = 0,
                  g = 0;
                if (this._parseStack.state)
                  if (this._parseStack.state === 2)
                    (this._parseStack.state = 0),
                      (g = this._parseStack.chunkPos + 1);
                  else {
                    if (s === void 0 || this._parseStack.state === 1)
                      throw (
                        ((this._parseStack.state = 1),
                        new Error(
                          "improper continuation due to previous async handler, giving up parsing"
                        ))
                      );
                    const c = this._parseStack.handlers;
                    let m = this._parseStack.handlerPos - 1;
                    switch (this._parseStack.state) {
                      case 3:
                        if (s === !1 && m > -1) {
                          for (
                            ;
                            m >= 0 && ((a = c[m](this._params)), a !== !0);
                            m--
                          )
                            if (a instanceof Promise)
                              return (this._parseStack.handlerPos = m), a;
                        }
                        this._parseStack.handlers = [];
                        break;
                      case 4:
                        if (s === !1 && m > -1) {
                          for (; m >= 0 && ((a = c[m]()), a !== !0); m--)
                            if (a instanceof Promise)
                              return (this._parseStack.handlerPos = m), a;
                        }
                        this._parseStack.handlers = [];
                        break;
                      case 6:
                        if (
                          ((v = i[this._parseStack.chunkPos]),
                          (a = this._dcsParser.unhook(v !== 24 && v !== 26, s)),
                          a)
                        )
                          return a;
                        v === 27 && (this._parseStack.transition |= 1),
                          this._params.reset(),
                          this._params.addParam(0),
                          (this._collect = 0);
                        break;
                      case 5:
                        if (
                          ((v = i[this._parseStack.chunkPos]),
                          (a = this._oscParser.end(v !== 24 && v !== 26, s)),
                          a)
                        )
                          return a;
                        v === 27 && (this._parseStack.transition |= 1),
                          this._params.reset(),
                          this._params.addParam(0),
                          (this._collect = 0);
                    }
                    (this._parseStack.state = 0),
                      (g = this._parseStack.chunkPos + 1),
                      (this.precedingJoinState = 0),
                      (this.currentState = 15 & this._parseStack.transition);
                  }
                for (let c = g; c < e; ++c) {
                  switch (
                    ((v = i[c]),
                    (_ =
                      this._transitions.table[
                        (this.currentState << 8) | (v < 160 ? v : p)
                      ]),
                    _ >> 4)
                  ) {
                    case 2:
                      for (let k = c + 1; ; ++k) {
                        if (k >= e || (v = i[k]) < 32 || (v > 126 && v < p)) {
                          this._printHandler(i, c, k), (c = k - 1);
                          break;
                        }
                        if (++k >= e || (v = i[k]) < 32 || (v > 126 && v < p)) {
                          this._printHandler(i, c, k), (c = k - 1);
                          break;
                        }
                        if (++k >= e || (v = i[k]) < 32 || (v > 126 && v < p)) {
                          this._printHandler(i, c, k), (c = k - 1);
                          break;
                        }
                        if (++k >= e || (v = i[k]) < 32 || (v > 126 && v < p)) {
                          this._printHandler(i, c, k), (c = k - 1);
                          break;
                        }
                      }
                      break;
                    case 3:
                      this._executeHandlers[v]
                        ? this._executeHandlers[v]()
                        : this._executeHandlerFb(v),
                        (this.precedingJoinState = 0);
                      break;
                    case 0:
                      break;
                    case 1:
                      if (
                        this._errorHandler({
                          position: c,
                          code: v,
                          currentState: this.currentState,
                          collect: this._collect,
                          params: this._params,
                          abort: !1,
                        }).abort
                      )
                        return;
                      break;
                    case 7:
                      const m = this._csiHandlers[(this._collect << 8) | v];
                      let R = m ? m.length - 1 : -1;
                      for (
                        ;
                        R >= 0 && ((a = m[R](this._params)), a !== !0);
                        R--
                      )
                        if (a instanceof Promise)
                          return this._preserveStack(3, m, R, _, c), a;
                      R < 0 &&
                        this._csiHandlerFb(
                          (this._collect << 8) | v,
                          this._params
                        ),
                        (this.precedingJoinState = 0);
                      break;
                    case 8:
                      do
                        switch (v) {
                          case 59:
                            this._params.addParam(0);
                            break;
                          case 58:
                            this._params.addSubParam(-1);
                            break;
                          default:
                            this._params.addDigit(v - 48);
                        }
                      while (++c < e && (v = i[c]) > 47 && v < 60);
                      c--;
                      break;
                    case 9:
                      (this._collect <<= 8), (this._collect |= v);
                      break;
                    case 10:
                      const A = this._escHandlers[(this._collect << 8) | v];
                      let T = A ? A.length - 1 : -1;
                      for (; T >= 0 && ((a = A[T]()), a !== !0); T--)
                        if (a instanceof Promise)
                          return this._preserveStack(4, A, T, _, c), a;
                      T < 0 && this._escHandlerFb((this._collect << 8) | v),
                        (this.precedingJoinState = 0);
                      break;
                    case 11:
                      this._params.reset(),
                        this._params.addParam(0),
                        (this._collect = 0);
                      break;
                    case 12:
                      this._dcsParser.hook(
                        (this._collect << 8) | v,
                        this._params
                      );
                      break;
                    case 13:
                      for (let k = c + 1; ; ++k)
                        if (
                          k >= e ||
                          (v = i[k]) === 24 ||
                          v === 26 ||
                          v === 27 ||
                          (v > 127 && v < p)
                        ) {
                          this._dcsParser.put(i, c, k), (c = k - 1);
                          break;
                        }
                      break;
                    case 14:
                      if (
                        ((a = this._dcsParser.unhook(v !== 24 && v !== 26)), a)
                      )
                        return this._preserveStack(6, [], 0, _, c), a;
                      v === 27 && (_ |= 1),
                        this._params.reset(),
                        this._params.addParam(0),
                        (this._collect = 0),
                        (this.precedingJoinState = 0);
                      break;
                    case 4:
                      this._oscParser.start();
                      break;
                    case 5:
                      for (let k = c + 1; ; k++)
                        if (k >= e || (v = i[k]) < 32 || (v > 127 && v < p)) {
                          this._oscParser.put(i, c, k), (c = k - 1);
                          break;
                        }
                      break;
                    case 6:
                      if (((a = this._oscParser.end(v !== 24 && v !== 26)), a))
                        return this._preserveStack(5, [], 0, _, c), a;
                      v === 27 && (_ |= 1),
                        this._params.reset(),
                        this._params.addParam(0),
                        (this._collect = 0),
                        (this.precedingJoinState = 0);
                  }
                  this.currentState = 15 & _;
                }
              }
            }
            r.EscapeSequenceParser = l;
          },
          6242: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.OscHandler = r.OscParser = void 0);
            const h = o(5770),
              u = o(482),
              n = [];
            (r.OscParser = class {
              constructor() {
                (this._state = 0),
                  (this._active = n),
                  (this._id = -1),
                  (this._handlers = Object.create(null)),
                  (this._handlerFb = () => {}),
                  (this._stack = {
                    paused: !1,
                    loopPosition: 0,
                    fallThrough: !1,
                  });
              }
              registerHandler(d, f) {
                this._handlers[d] === void 0 && (this._handlers[d] = []);
                const p = this._handlers[d];
                return (
                  p.push(f),
                  {
                    dispose: () => {
                      const l = p.indexOf(f);
                      l !== -1 && p.splice(l, 1);
                    },
                  }
                );
              }
              clearHandler(d) {
                this._handlers[d] && delete this._handlers[d];
              }
              setHandlerFallback(d) {
                this._handlerFb = d;
              }
              dispose() {
                (this._handlers = Object.create(null)),
                  (this._handlerFb = () => {}),
                  (this._active = n);
              }
              reset() {
                if (this._state === 2)
                  for (
                    let d = this._stack.paused
                      ? this._stack.loopPosition - 1
                      : this._active.length - 1;
                    d >= 0;
                    --d
                  )
                    this._active[d].end(!1);
                (this._stack.paused = !1),
                  (this._active = n),
                  (this._id = -1),
                  (this._state = 0);
              }
              _start() {
                if (
                  ((this._active = this._handlers[this._id] || n),
                  this._active.length)
                )
                  for (let d = this._active.length - 1; d >= 0; d--)
                    this._active[d].start();
                else this._handlerFb(this._id, "START");
              }
              _put(d, f, p) {
                if (this._active.length)
                  for (let l = this._active.length - 1; l >= 0; l--)
                    this._active[l].put(d, f, p);
                else
                  this._handlerFb(
                    this._id,
                    "PUT",
                    (0, u.utf32ToString)(d, f, p)
                  );
              }
              start() {
                this.reset(), (this._state = 1);
              }
              put(d, f, p) {
                if (this._state !== 3) {
                  if (this._state === 1)
                    for (; f < p; ) {
                      const l = d[f++];
                      if (l === 59) {
                        (this._state = 2), this._start();
                        break;
                      }
                      if (l < 48 || 57 < l) return void (this._state = 3);
                      this._id === -1 && (this._id = 0),
                        (this._id = 10 * this._id + l - 48);
                    }
                  this._state === 2 && p - f > 0 && this._put(d, f, p);
                }
              }
              end(d, f = !0) {
                if (this._state !== 0) {
                  if (this._state !== 3)
                    if (
                      (this._state === 1 && this._start(), this._active.length)
                    ) {
                      let p = !1,
                        l = this._active.length - 1,
                        t = !1;
                      if (
                        (this._stack.paused &&
                          ((l = this._stack.loopPosition - 1),
                          (p = f),
                          (t = this._stack.fallThrough),
                          (this._stack.paused = !1)),
                        !t && p === !1)
                      ) {
                        for (
                          ;
                          l >= 0 && ((p = this._active[l].end(d)), p !== !0);
                          l--
                        )
                          if (p instanceof Promise)
                            return (
                              (this._stack.paused = !0),
                              (this._stack.loopPosition = l),
                              (this._stack.fallThrough = !1),
                              p
                            );
                        l--;
                      }
                      for (; l >= 0; l--)
                        if (
                          ((p = this._active[l].end(!1)), p instanceof Promise)
                        )
                          return (
                            (this._stack.paused = !0),
                            (this._stack.loopPosition = l),
                            (this._stack.fallThrough = !0),
                            p
                          );
                    } else this._handlerFb(this._id, "END", d);
                  (this._active = n), (this._id = -1), (this._state = 0);
                }
              }
            }),
              (r.OscHandler = class {
                constructor(d) {
                  (this._handler = d), (this._data = ""), (this._hitLimit = !1);
                }
                start() {
                  (this._data = ""), (this._hitLimit = !1);
                }
                put(d, f, p) {
                  this._hitLimit ||
                    ((this._data += (0, u.utf32ToString)(d, f, p)),
                    this._data.length > h.PAYLOAD_LIMIT &&
                      ((this._data = ""), (this._hitLimit = !0)));
                }
                end(d) {
                  let f = !1;
                  if (this._hitLimit) f = !1;
                  else if (
                    d &&
                    ((f = this._handler(this._data)), f instanceof Promise)
                  )
                    return f.then(
                      (p) => ((this._data = ""), (this._hitLimit = !1), p)
                    );
                  return (this._data = ""), (this._hitLimit = !1), f;
                }
              });
          },
          8742: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.Params = void 0);
            const o = 2147483647;
            class h {
              static fromArray(n) {
                const d = new h();
                if (!n.length) return d;
                for (let f = Array.isArray(n[0]) ? 1 : 0; f < n.length; ++f) {
                  const p = n[f];
                  if (Array.isArray(p))
                    for (let l = 0; l < p.length; ++l) d.addSubParam(p[l]);
                  else d.addParam(p);
                }
                return d;
              }
              constructor(n = 32, d = 32) {
                if (
                  ((this.maxLength = n), (this.maxSubParamsLength = d), d > 256)
                )
                  throw new Error(
                    "maxSubParamsLength must not be greater than 256"
                  );
                (this.params = new Int32Array(n)),
                  (this.length = 0),
                  (this._subParams = new Int32Array(d)),
                  (this._subParamsLength = 0),
                  (this._subParamsIdx = new Uint16Array(n)),
                  (this._rejectDigits = !1),
                  (this._rejectSubDigits = !1),
                  (this._digitIsSub = !1);
              }
              clone() {
                const n = new h(this.maxLength, this.maxSubParamsLength);
                return (
                  n.params.set(this.params),
                  (n.length = this.length),
                  n._subParams.set(this._subParams),
                  (n._subParamsLength = this._subParamsLength),
                  n._subParamsIdx.set(this._subParamsIdx),
                  (n._rejectDigits = this._rejectDigits),
                  (n._rejectSubDigits = this._rejectSubDigits),
                  (n._digitIsSub = this._digitIsSub),
                  n
                );
              }
              toArray() {
                const n = [];
                for (let d = 0; d < this.length; ++d) {
                  n.push(this.params[d]);
                  const f = this._subParamsIdx[d] >> 8,
                    p = 255 & this._subParamsIdx[d];
                  p - f > 0 &&
                    n.push(Array.prototype.slice.call(this._subParams, f, p));
                }
                return n;
              }
              reset() {
                (this.length = 0),
                  (this._subParamsLength = 0),
                  (this._rejectDigits = !1),
                  (this._rejectSubDigits = !1),
                  (this._digitIsSub = !1);
              }
              addParam(n) {
                if (((this._digitIsSub = !1), this.length >= this.maxLength))
                  this._rejectDigits = !0;
                else {
                  if (n < -1)
                    throw new Error("values lesser than -1 are not allowed");
                  (this._subParamsIdx[this.length] =
                    (this._subParamsLength << 8) | this._subParamsLength),
                    (this.params[this.length++] = n > o ? o : n);
                }
              }
              addSubParam(n) {
                if (((this._digitIsSub = !0), this.length))
                  if (
                    this._rejectDigits ||
                    this._subParamsLength >= this.maxSubParamsLength
                  )
                    this._rejectSubDigits = !0;
                  else {
                    if (n < -1)
                      throw new Error("values lesser than -1 are not allowed");
                    (this._subParams[this._subParamsLength++] = n > o ? o : n),
                      this._subParamsIdx[this.length - 1]++;
                  }
              }
              hasSubParams(n) {
                return (
                  (255 & this._subParamsIdx[n]) - (this._subParamsIdx[n] >> 8) >
                  0
                );
              }
              getSubParams(n) {
                const d = this._subParamsIdx[n] >> 8,
                  f = 255 & this._subParamsIdx[n];
                return f - d > 0 ? this._subParams.subarray(d, f) : null;
              }
              getSubParamsAll() {
                const n = {};
                for (let d = 0; d < this.length; ++d) {
                  const f = this._subParamsIdx[d] >> 8,
                    p = 255 & this._subParamsIdx[d];
                  p - f > 0 && (n[d] = this._subParams.slice(f, p));
                }
                return n;
              }
              addDigit(n) {
                let d;
                if (
                  this._rejectDigits ||
                  !(d = this._digitIsSub
                    ? this._subParamsLength
                    : this.length) ||
                  (this._digitIsSub && this._rejectSubDigits)
                )
                  return;
                const f = this._digitIsSub ? this._subParams : this.params,
                  p = f[d - 1];
                f[d - 1] = ~p ? Math.min(10 * p + n, o) : n;
              }
            }
            r.Params = h;
          },
          5741: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.AddonManager = void 0),
              (r.AddonManager = class {
                constructor() {
                  this._addons = [];
                }
                dispose() {
                  for (let o = this._addons.length - 1; o >= 0; o--)
                    this._addons[o].instance.dispose();
                }
                loadAddon(o, h) {
                  const u = { instance: h, dispose: h.dispose, isDisposed: !1 };
                  this._addons.push(u),
                    (h.dispose = () => this._wrappedAddonDispose(u)),
                    h.activate(o);
                }
                _wrappedAddonDispose(o) {
                  if (o.isDisposed) return;
                  let h = -1;
                  for (let u = 0; u < this._addons.length; u++)
                    if (this._addons[u] === o) {
                      h = u;
                      break;
                    }
                  if (h === -1)
                    throw new Error(
                      "Could not dispose an addon that has not been loaded"
                    );
                  (o.isDisposed = !0),
                    o.dispose.apply(o.instance),
                    this._addons.splice(h, 1);
                }
              });
          },
          8771: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferApiView = void 0);
            const h = o(3785),
              u = o(511);
            r.BufferApiView = class {
              constructor(n, d) {
                (this._buffer = n), (this.type = d);
              }
              init(n) {
                return (this._buffer = n), this;
              }
              get cursorY() {
                return this._buffer.y;
              }
              get cursorX() {
                return this._buffer.x;
              }
              get viewportY() {
                return this._buffer.ydisp;
              }
              get baseY() {
                return this._buffer.ybase;
              }
              get length() {
                return this._buffer.lines.length;
              }
              getLine(n) {
                const d = this._buffer.lines.get(n);
                if (d) return new h.BufferLineApiView(d);
              }
              getNullCell() {
                return new u.CellData();
              }
            };
          },
          3785: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferLineApiView = void 0);
            const h = o(511);
            r.BufferLineApiView = class {
              constructor(u) {
                this._line = u;
              }
              get isWrapped() {
                return this._line.isWrapped;
              }
              get length() {
                return this._line.length;
              }
              getCell(u, n) {
                if (!(u < 0 || u >= this._line.length))
                  return n
                    ? (this._line.loadCell(u, n), n)
                    : this._line.loadCell(u, new h.CellData());
              }
              translateToString(u, n, d) {
                return this._line.translateToString(u, n, d);
              }
            };
          },
          8285: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferNamespaceApi = void 0);
            const h = o(8771),
              u = o(8460),
              n = o(844);
            class d extends n.Disposable {
              constructor(p) {
                super(),
                  (this._core = p),
                  (this._onBufferChange = this.register(new u.EventEmitter())),
                  (this.onBufferChange = this._onBufferChange.event),
                  (this._normal = new h.BufferApiView(
                    this._core.buffers.normal,
                    "normal"
                  )),
                  (this._alternate = new h.BufferApiView(
                    this._core.buffers.alt,
                    "alternate"
                  )),
                  this._core.buffers.onBufferActivate(() =>
                    this._onBufferChange.fire(this.active)
                  );
              }
              get active() {
                if (this._core.buffers.active === this._core.buffers.normal)
                  return this.normal;
                if (this._core.buffers.active === this._core.buffers.alt)
                  return this.alternate;
                throw new Error(
                  "Active buffer is neither normal nor alternate"
                );
              }
              get normal() {
                return this._normal.init(this._core.buffers.normal);
              }
              get alternate() {
                return this._alternate.init(this._core.buffers.alt);
              }
            }
            r.BufferNamespaceApi = d;
          },
          7975: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.ParserApi = void 0),
              (r.ParserApi = class {
                constructor(o) {
                  this._core = o;
                }
                registerCsiHandler(o, h) {
                  return this._core.registerCsiHandler(o, (u) =>
                    h(u.toArray())
                  );
                }
                addCsiHandler(o, h) {
                  return this.registerCsiHandler(o, h);
                }
                registerDcsHandler(o, h) {
                  return this._core.registerDcsHandler(o, (u, n) =>
                    h(u, n.toArray())
                  );
                }
                addDcsHandler(o, h) {
                  return this.registerDcsHandler(o, h);
                }
                registerEscHandler(o, h) {
                  return this._core.registerEscHandler(o, h);
                }
                addEscHandler(o, h) {
                  return this.registerEscHandler(o, h);
                }
                registerOscHandler(o, h) {
                  return this._core.registerOscHandler(o, h);
                }
                addOscHandler(o, h) {
                  return this.registerOscHandler(o, h);
                }
              });
          },
          7090: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.UnicodeApi = void 0),
              (r.UnicodeApi = class {
                constructor(o) {
                  this._core = o;
                }
                register(o) {
                  this._core.unicodeService.register(o);
                }
                get versions() {
                  return this._core.unicodeService.versions;
                }
                get activeVersion() {
                  return this._core.unicodeService.activeVersion;
                }
                set activeVersion(o) {
                  this._core.unicodeService.activeVersion = o;
                }
              });
          },
          744: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (t, i, e, s) {
                  var a,
                    v = arguments.length,
                    _ =
                      v < 3
                        ? i
                        : s === null
                        ? (s = Object.getOwnPropertyDescriptor(i, e))
                        : s;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    _ = Reflect.decorate(t, i, e, s);
                  else
                    for (var g = t.length - 1; g >= 0; g--)
                      (a = t[g]) &&
                        (_ =
                          (v < 3 ? a(_) : v > 3 ? a(i, e, _) : a(i, e)) || _);
                  return v > 3 && _ && Object.defineProperty(i, e, _), _;
                },
              u =
                (this && this.__param) ||
                function (t, i) {
                  return function (e, s) {
                    i(e, s, t);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.BufferService = r.MINIMUM_ROWS = r.MINIMUM_COLS = void 0);
            const n = o(8460),
              d = o(844),
              f = o(5295),
              p = o(2585);
            (r.MINIMUM_COLS = 2), (r.MINIMUM_ROWS = 1);
            let l = (r.BufferService = class extends d.Disposable {
              get buffer() {
                return this.buffers.active;
              }
              constructor(t) {
                super(),
                  (this.isUserScrolling = !1),
                  (this._onResize = this.register(new n.EventEmitter())),
                  (this.onResize = this._onResize.event),
                  (this._onScroll = this.register(new n.EventEmitter())),
                  (this.onScroll = this._onScroll.event),
                  (this.cols = Math.max(
                    t.rawOptions.cols || 0,
                    r.MINIMUM_COLS
                  )),
                  (this.rows = Math.max(
                    t.rawOptions.rows || 0,
                    r.MINIMUM_ROWS
                  )),
                  (this.buffers = this.register(new f.BufferSet(t, this)));
              }
              resize(t, i) {
                (this.cols = t),
                  (this.rows = i),
                  this.buffers.resize(t, i),
                  this._onResize.fire({ cols: t, rows: i });
              }
              reset() {
                this.buffers.reset(), (this.isUserScrolling = !1);
              }
              scroll(t, i = !1) {
                const e = this.buffer;
                let s;
                (s = this._cachedBlankLine),
                  (s &&
                    s.length === this.cols &&
                    s.getFg(0) === t.fg &&
                    s.getBg(0) === t.bg) ||
                    ((s = e.getBlankLine(t, i)), (this._cachedBlankLine = s)),
                  (s.isWrapped = i);
                const a = e.ybase + e.scrollTop,
                  v = e.ybase + e.scrollBottom;
                if (e.scrollTop === 0) {
                  const _ = e.lines.isFull;
                  v === e.lines.length - 1
                    ? _
                      ? e.lines.recycle().copyFrom(s)
                      : e.lines.push(s.clone())
                    : e.lines.splice(v + 1, 0, s.clone()),
                    _
                      ? this.isUserScrolling &&
                        (e.ydisp = Math.max(e.ydisp - 1, 0))
                      : (e.ybase++, this.isUserScrolling || e.ydisp++);
                } else {
                  const _ = v - a + 1;
                  e.lines.shiftElements(a + 1, _ - 1, -1),
                    e.lines.set(v, s.clone());
                }
                this.isUserScrolling || (e.ydisp = e.ybase),
                  this._onScroll.fire(e.ydisp);
              }
              scrollLines(t, i, e) {
                const s = this.buffer;
                if (t < 0) {
                  if (s.ydisp === 0) return;
                  this.isUserScrolling = !0;
                } else t + s.ydisp >= s.ybase && (this.isUserScrolling = !1);
                const a = s.ydisp;
                (s.ydisp = Math.max(Math.min(s.ydisp + t, s.ybase), 0)),
                  a !== s.ydisp && (i || this._onScroll.fire(s.ydisp));
              }
            });
            r.BufferService = l = h([u(0, p.IOptionsService)], l);
          },
          7994: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CharsetService = void 0),
              (r.CharsetService = class {
                constructor() {
                  (this.glevel = 0), (this._charsets = []);
                }
                reset() {
                  (this.charset = void 0),
                    (this._charsets = []),
                    (this.glevel = 0);
                }
                setgLevel(o) {
                  (this.glevel = o), (this.charset = this._charsets[o]);
                }
                setgCharset(o, h) {
                  (this._charsets[o] = h),
                    this.glevel === o && (this.charset = h);
                }
              });
          },
          1753: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (s, a, v, _) {
                  var g,
                    c = arguments.length,
                    m =
                      c < 3
                        ? a
                        : _ === null
                        ? (_ = Object.getOwnPropertyDescriptor(a, v))
                        : _;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    m = Reflect.decorate(s, a, v, _);
                  else
                    for (var R = s.length - 1; R >= 0; R--)
                      (g = s[R]) &&
                        (m =
                          (c < 3 ? g(m) : c > 3 ? g(a, v, m) : g(a, v)) || m);
                  return c > 3 && m && Object.defineProperty(a, v, m), m;
                },
              u =
                (this && this.__param) ||
                function (s, a) {
                  return function (v, _) {
                    a(v, _, s);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CoreMouseService = void 0);
            const n = o(2585),
              d = o(8460),
              f = o(844),
              p = {
                NONE: { events: 0, restrict: () => !1 },
                X10: {
                  events: 1,
                  restrict: (s) =>
                    s.button !== 4 &&
                    s.action === 1 &&
                    ((s.ctrl = !1), (s.alt = !1), (s.shift = !1), !0),
                },
                VT200: { events: 19, restrict: (s) => s.action !== 32 },
                DRAG: {
                  events: 23,
                  restrict: (s) => s.action !== 32 || s.button !== 3,
                },
                ANY: { events: 31, restrict: (s) => !0 },
              };
            function l(s, a) {
              let v = (s.ctrl ? 16 : 0) | (s.shift ? 4 : 0) | (s.alt ? 8 : 0);
              return (
                s.button === 4
                  ? ((v |= 64), (v |= s.action))
                  : ((v |= 3 & s.button),
                    4 & s.button && (v |= 64),
                    8 & s.button && (v |= 128),
                    s.action === 32
                      ? (v |= 32)
                      : s.action !== 0 || a || (v |= 3)),
                v
              );
            }
            const t = String.fromCharCode,
              i = {
                DEFAULT: (s) => {
                  const a = [l(s, !1) + 32, s.col + 32, s.row + 32];
                  return a[0] > 255 || a[1] > 255 || a[2] > 255
                    ? ""
                    : `\x1B[M${t(a[0])}${t(a[1])}${t(a[2])}`;
                },
                SGR: (s) => {
                  const a = s.action === 0 && s.button !== 4 ? "m" : "M";
                  return `\x1B[<${l(s, !0)};${s.col};${s.row}${a}`;
                },
                SGR_PIXELS: (s) => {
                  const a = s.action === 0 && s.button !== 4 ? "m" : "M";
                  return `\x1B[<${l(s, !0)};${s.x};${s.y}${a}`;
                },
              };
            let e = (r.CoreMouseService = class extends f.Disposable {
              constructor(s, a) {
                super(),
                  (this._bufferService = s),
                  (this._coreService = a),
                  (this._protocols = {}),
                  (this._encodings = {}),
                  (this._activeProtocol = ""),
                  (this._activeEncoding = ""),
                  (this._lastEvent = null),
                  (this._onProtocolChange = this.register(
                    new d.EventEmitter()
                  )),
                  (this.onProtocolChange = this._onProtocolChange.event);
                for (const v of Object.keys(p)) this.addProtocol(v, p[v]);
                for (const v of Object.keys(i)) this.addEncoding(v, i[v]);
                this.reset();
              }
              addProtocol(s, a) {
                this._protocols[s] = a;
              }
              addEncoding(s, a) {
                this._encodings[s] = a;
              }
              get activeProtocol() {
                return this._activeProtocol;
              }
              get areMouseEventsActive() {
                return this._protocols[this._activeProtocol].events !== 0;
              }
              set activeProtocol(s) {
                if (!this._protocols[s])
                  throw new Error(`unknown protocol "${s}"`);
                (this._activeProtocol = s),
                  this._onProtocolChange.fire(this._protocols[s].events);
              }
              get activeEncoding() {
                return this._activeEncoding;
              }
              set activeEncoding(s) {
                if (!this._encodings[s])
                  throw new Error(`unknown encoding "${s}"`);
                this._activeEncoding = s;
              }
              reset() {
                (this.activeProtocol = "NONE"),
                  (this.activeEncoding = "DEFAULT"),
                  (this._lastEvent = null);
              }
              triggerMouseEvent(s) {
                if (
                  s.col < 0 ||
                  s.col >= this._bufferService.cols ||
                  s.row < 0 ||
                  s.row >= this._bufferService.rows ||
                  (s.button === 4 && s.action === 32) ||
                  (s.button === 3 && s.action !== 32) ||
                  (s.button !== 4 && (s.action === 2 || s.action === 3)) ||
                  (s.col++,
                  s.row++,
                  s.action === 32 &&
                    this._lastEvent &&
                    this._equalEvents(
                      this._lastEvent,
                      s,
                      this._activeEncoding === "SGR_PIXELS"
                    )) ||
                  !this._protocols[this._activeProtocol].restrict(s)
                )
                  return !1;
                const a = this._encodings[this._activeEncoding](s);
                return (
                  a &&
                    (this._activeEncoding === "DEFAULT"
                      ? this._coreService.triggerBinaryEvent(a)
                      : this._coreService.triggerDataEvent(a, !0)),
                  (this._lastEvent = s),
                  !0
                );
              }
              explainEvents(s) {
                return {
                  down: !!(1 & s),
                  up: !!(2 & s),
                  drag: !!(4 & s),
                  move: !!(8 & s),
                  wheel: !!(16 & s),
                };
              }
              _equalEvents(s, a, v) {
                if (v) {
                  if (s.x !== a.x || s.y !== a.y) return !1;
                } else if (s.col !== a.col || s.row !== a.row) return !1;
                return (
                  s.button === a.button &&
                  s.action === a.action &&
                  s.ctrl === a.ctrl &&
                  s.alt === a.alt &&
                  s.shift === a.shift
                );
              }
            });
            r.CoreMouseService = e = h(
              [u(0, n.IBufferService), u(1, n.ICoreService)],
              e
            );
          },
          6975: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (e, s, a, v) {
                  var _,
                    g = arguments.length,
                    c =
                      g < 3
                        ? s
                        : v === null
                        ? (v = Object.getOwnPropertyDescriptor(s, a))
                        : v;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    c = Reflect.decorate(e, s, a, v);
                  else
                    for (var m = e.length - 1; m >= 0; m--)
                      (_ = e[m]) &&
                        (c =
                          (g < 3 ? _(c) : g > 3 ? _(s, a, c) : _(s, a)) || c);
                  return g > 3 && c && Object.defineProperty(s, a, c), c;
                },
              u =
                (this && this.__param) ||
                function (e, s) {
                  return function (a, v) {
                    s(a, v, e);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.CoreService = void 0);
            const n = o(1439),
              d = o(8460),
              f = o(844),
              p = o(2585),
              l = Object.freeze({ insertMode: !1 }),
              t = Object.freeze({
                applicationCursorKeys: !1,
                applicationKeypad: !1,
                bracketedPasteMode: !1,
                origin: !1,
                reverseWraparound: !1,
                sendFocus: !1,
                wraparound: !0,
              });
            let i = (r.CoreService = class extends f.Disposable {
              constructor(e, s, a) {
                super(),
                  (this._bufferService = e),
                  (this._logService = s),
                  (this._optionsService = a),
                  (this.isCursorInitialized = !1),
                  (this.isCursorHidden = !1),
                  (this._onData = this.register(new d.EventEmitter())),
                  (this.onData = this._onData.event),
                  (this._onUserInput = this.register(new d.EventEmitter())),
                  (this.onUserInput = this._onUserInput.event),
                  (this._onBinary = this.register(new d.EventEmitter())),
                  (this.onBinary = this._onBinary.event),
                  (this._onRequestScrollToBottom = this.register(
                    new d.EventEmitter()
                  )),
                  (this.onRequestScrollToBottom =
                    this._onRequestScrollToBottom.event),
                  (this.modes = (0, n.clone)(l)),
                  (this.decPrivateModes = (0, n.clone)(t));
              }
              reset() {
                (this.modes = (0, n.clone)(l)),
                  (this.decPrivateModes = (0, n.clone)(t));
              }
              triggerDataEvent(e, s = !1) {
                if (this._optionsService.rawOptions.disableStdin) return;
                const a = this._bufferService.buffer;
                s &&
                  this._optionsService.rawOptions.scrollOnUserInput &&
                  a.ybase !== a.ydisp &&
                  this._onRequestScrollToBottom.fire(),
                  s && this._onUserInput.fire(),
                  this._logService.debug(`sending data "${e}"`, () =>
                    e.split("").map((v) => v.charCodeAt(0))
                  ),
                  this._onData.fire(e);
              }
              triggerBinaryEvent(e) {
                this._optionsService.rawOptions.disableStdin ||
                  (this._logService.debug(`sending binary "${e}"`, () =>
                    e.split("").map((s) => s.charCodeAt(0))
                  ),
                  this._onBinary.fire(e));
              }
            });
            r.CoreService = i = h(
              [
                u(0, p.IBufferService),
                u(1, p.ILogService),
                u(2, p.IOptionsService),
              ],
              i
            );
          },
          9074: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.DecorationService = void 0);
            const h = o(8055),
              u = o(8460),
              n = o(844),
              d = o(6106);
            let f = 0,
              p = 0;
            class l extends n.Disposable {
              get decorations() {
                return this._decorations.values();
              }
              constructor() {
                super(),
                  (this._decorations = new d.SortedList((e) => e?.marker.line)),
                  (this._onDecorationRegistered = this.register(
                    new u.EventEmitter()
                  )),
                  (this.onDecorationRegistered =
                    this._onDecorationRegistered.event),
                  (this._onDecorationRemoved = this.register(
                    new u.EventEmitter()
                  )),
                  (this.onDecorationRemoved = this._onDecorationRemoved.event),
                  this.register((0, n.toDisposable)(() => this.reset()));
              }
              registerDecoration(e) {
                if (e.marker.isDisposed) return;
                const s = new t(e);
                if (s) {
                  const a = s.marker.onDispose(() => s.dispose());
                  s.onDispose(() => {
                    s &&
                      (this._decorations.delete(s) &&
                        this._onDecorationRemoved.fire(s),
                      a.dispose());
                  }),
                    this._decorations.insert(s),
                    this._onDecorationRegistered.fire(s);
                }
                return s;
              }
              reset() {
                for (const e of this._decorations.values()) e.dispose();
                this._decorations.clear();
              }
              *getDecorationsAtCell(e, s, a) {
                let v = 0,
                  _ = 0;
                for (const g of this._decorations.getKeyIterator(s))
                  (v = g.options.x ?? 0),
                    (_ = v + (g.options.width ?? 1)),
                    e >= v &&
                      e < _ &&
                      (!a || (g.options.layer ?? "bottom") === a) &&
                      (yield g);
              }
              forEachDecorationAtCell(e, s, a, v) {
                this._decorations.forEachByKey(s, (_) => {
                  (f = _.options.x ?? 0),
                    (p = f + (_.options.width ?? 1)),
                    e >= f &&
                      e < p &&
                      (!a || (_.options.layer ?? "bottom") === a) &&
                      v(_);
                });
              }
            }
            r.DecorationService = l;
            class t extends n.Disposable {
              get isDisposed() {
                return this._isDisposed;
              }
              get backgroundColorRGB() {
                return (
                  this._cachedBg === null &&
                    (this.options.backgroundColor
                      ? (this._cachedBg = h.css.toColor(
                          this.options.backgroundColor
                        ))
                      : (this._cachedBg = void 0)),
                  this._cachedBg
                );
              }
              get foregroundColorRGB() {
                return (
                  this._cachedFg === null &&
                    (this.options.foregroundColor
                      ? (this._cachedFg = h.css.toColor(
                          this.options.foregroundColor
                        ))
                      : (this._cachedFg = void 0)),
                  this._cachedFg
                );
              }
              constructor(e) {
                super(),
                  (this.options = e),
                  (this.onRenderEmitter = this.register(new u.EventEmitter())),
                  (this.onRender = this.onRenderEmitter.event),
                  (this._onDispose = this.register(new u.EventEmitter())),
                  (this.onDispose = this._onDispose.event),
                  (this._cachedBg = null),
                  (this._cachedFg = null),
                  (this.marker = e.marker),
                  this.options.overviewRulerOptions &&
                    !this.options.overviewRulerOptions.position &&
                    (this.options.overviewRulerOptions.position = "full");
              }
              dispose() {
                this._onDispose.fire(), super.dispose();
              }
            }
          },
          4348: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.InstantiationService = r.ServiceCollection = void 0);
            const h = o(2585),
              u = o(8343);
            class n {
              constructor(...f) {
                this._entries = new Map();
                for (const [p, l] of f) this.set(p, l);
              }
              set(f, p) {
                const l = this._entries.get(f);
                return this._entries.set(f, p), l;
              }
              forEach(f) {
                for (const [p, l] of this._entries.entries()) f(p, l);
              }
              has(f) {
                return this._entries.has(f);
              }
              get(f) {
                return this._entries.get(f);
              }
            }
            (r.ServiceCollection = n),
              (r.InstantiationService = class {
                constructor() {
                  (this._services = new n()),
                    this._services.set(h.IInstantiationService, this);
                }
                setService(d, f) {
                  this._services.set(d, f);
                }
                getService(d) {
                  return this._services.get(d);
                }
                createInstance(d, ...f) {
                  const p = (0, u.getServiceDependencies)(d).sort(
                      (i, e) => i.index - e.index
                    ),
                    l = [];
                  for (const i of p) {
                    const e = this._services.get(i.id);
                    if (!e)
                      throw new Error(
                        `[createInstance] ${d.name} depends on UNKNOWN service ${i.id}.`
                      );
                    l.push(e);
                  }
                  const t = p.length > 0 ? p[0].index : f.length;
                  if (f.length !== t)
                    throw new Error(
                      `[createInstance] First service dependency of ${
                        d.name
                      } at position ${t + 1} conflicts with ${
                        f.length
                      } static arguments`
                    );
                  return new d(...f, ...l);
                }
              });
          },
          7866: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (t, i, e, s) {
                  var a,
                    v = arguments.length,
                    _ =
                      v < 3
                        ? i
                        : s === null
                        ? (s = Object.getOwnPropertyDescriptor(i, e))
                        : s;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    _ = Reflect.decorate(t, i, e, s);
                  else
                    for (var g = t.length - 1; g >= 0; g--)
                      (a = t[g]) &&
                        (_ =
                          (v < 3 ? a(_) : v > 3 ? a(i, e, _) : a(i, e)) || _);
                  return v > 3 && _ && Object.defineProperty(i, e, _), _;
                },
              u =
                (this && this.__param) ||
                function (t, i) {
                  return function (e, s) {
                    i(e, s, t);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.traceCall = r.setTraceLogger = r.LogService = void 0);
            const n = o(844),
              d = o(2585),
              f = {
                trace: d.LogLevelEnum.TRACE,
                debug: d.LogLevelEnum.DEBUG,
                info: d.LogLevelEnum.INFO,
                warn: d.LogLevelEnum.WARN,
                error: d.LogLevelEnum.ERROR,
                off: d.LogLevelEnum.OFF,
              };
            let p,
              l = (r.LogService = class extends n.Disposable {
                get logLevel() {
                  return this._logLevel;
                }
                constructor(t) {
                  super(),
                    (this._optionsService = t),
                    (this._logLevel = d.LogLevelEnum.OFF),
                    this._updateLogLevel(),
                    this.register(
                      this._optionsService.onSpecificOptionChange(
                        "logLevel",
                        () => this._updateLogLevel()
                      )
                    ),
                    (p = this);
                }
                _updateLogLevel() {
                  this._logLevel = f[this._optionsService.rawOptions.logLevel];
                }
                _evalLazyOptionalParams(t) {
                  for (let i = 0; i < t.length; i++)
                    typeof t[i] == "function" && (t[i] = t[i]());
                }
                _log(t, i, e) {
                  this._evalLazyOptionalParams(e),
                    t.call(
                      console,
                      (this._optionsService.options.logger
                        ? ""
                        : "xterm.js: ") + i,
                      ...e
                    );
                }
                trace(t, ...i) {
                  this._logLevel <= d.LogLevelEnum.TRACE &&
                    this._log(
                      this._optionsService.options.logger?.trace.bind(
                        this._optionsService.options.logger
                      ) ?? console.log,
                      t,
                      i
                    );
                }
                debug(t, ...i) {
                  this._logLevel <= d.LogLevelEnum.DEBUG &&
                    this._log(
                      this._optionsService.options.logger?.debug.bind(
                        this._optionsService.options.logger
                      ) ?? console.log,
                      t,
                      i
                    );
                }
                info(t, ...i) {
                  this._logLevel <= d.LogLevelEnum.INFO &&
                    this._log(
                      this._optionsService.options.logger?.info.bind(
                        this._optionsService.options.logger
                      ) ?? console.info,
                      t,
                      i
                    );
                }
                warn(t, ...i) {
                  this._logLevel <= d.LogLevelEnum.WARN &&
                    this._log(
                      this._optionsService.options.logger?.warn.bind(
                        this._optionsService.options.logger
                      ) ?? console.warn,
                      t,
                      i
                    );
                }
                error(t, ...i) {
                  this._logLevel <= d.LogLevelEnum.ERROR &&
                    this._log(
                      this._optionsService.options.logger?.error.bind(
                        this._optionsService.options.logger
                      ) ?? console.error,
                      t,
                      i
                    );
                }
              });
            (r.LogService = l = h([u(0, d.IOptionsService)], l)),
              (r.setTraceLogger = function (t) {
                p = t;
              }),
              (r.traceCall = function (t, i, e) {
                if (typeof e.value != "function")
                  throw new Error("not supported");
                const s = e.value;
                e.value = function (...a) {
                  if (p.logLevel !== d.LogLevelEnum.TRACE)
                    return s.apply(this, a);
                  p.trace(
                    `GlyphRenderer#${s.name}(${a
                      .map((_) => JSON.stringify(_))
                      .join(", ")})`
                  );
                  const v = s.apply(this, a);
                  return p.trace(`GlyphRenderer#${s.name} return`, v), v;
                };
              });
          },
          7302: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.OptionsService = r.DEFAULT_OPTIONS = void 0);
            const h = o(8460),
              u = o(844),
              n = o(6114);
            r.DEFAULT_OPTIONS = {
              cols: 80,
              rows: 24,
              cursorBlink: !1,
              cursorStyle: "block",
              cursorWidth: 1,
              cursorInactiveStyle: "outline",
              customGlyphs: !0,
              drawBoldTextInBrightColors: !0,
              documentOverride: null,
              fastScrollModifier: "alt",
              fastScrollSensitivity: 5,
              fontFamily: "courier-new, courier, monospace",
              fontSize: 15,
              fontWeight: "normal",
              fontWeightBold: "bold",
              ignoreBracketedPasteMode: !1,
              lineHeight: 1,
              letterSpacing: 0,
              linkHandler: null,
              logLevel: "info",
              logger: null,
              scrollback: 1e3,
              scrollOnUserInput: !0,
              scrollSensitivity: 1,
              screenReaderMode: !1,
              smoothScrollDuration: 0,
              macOptionIsMeta: !1,
              macOptionClickForcesSelection: !1,
              minimumContrastRatio: 1,
              disableStdin: !1,
              allowProposedApi: !1,
              allowTransparency: !1,
              tabStopWidth: 8,
              theme: {},
              rescaleOverlappingGlyphs: !1,
              rightClickSelectsWord: n.isMac,
              windowOptions: {},
              windowsMode: !1,
              windowsPty: {},
              wordSeparator: " ()[]{}',\"`",
              altClickMovesCursor: !0,
              convertEol: !1,
              termName: "xterm",
              cancelEvents: !1,
              overviewRulerWidth: 0,
            };
            const d = [
              "normal",
              "bold",
              "100",
              "200",
              "300",
              "400",
              "500",
              "600",
              "700",
              "800",
              "900",
            ];
            class f extends u.Disposable {
              constructor(l) {
                super(),
                  (this._onOptionChange = this.register(new h.EventEmitter())),
                  (this.onOptionChange = this._onOptionChange.event);
                const t = { ...r.DEFAULT_OPTIONS };
                for (const i in l)
                  if (i in t)
                    try {
                      const e = l[i];
                      t[i] = this._sanitizeAndValidateOption(i, e);
                    } catch (e) {
                      console.error(e);
                    }
                (this.rawOptions = t),
                  (this.options = { ...t }),
                  this._setupOptions(),
                  this.register(
                    (0, u.toDisposable)(() => {
                      (this.rawOptions.linkHandler = null),
                        (this.rawOptions.documentOverride = null);
                    })
                  );
              }
              onSpecificOptionChange(l, t) {
                return this.onOptionChange((i) => {
                  i === l && t(this.rawOptions[l]);
                });
              }
              onMultipleOptionChange(l, t) {
                return this.onOptionChange((i) => {
                  l.indexOf(i) !== -1 && t();
                });
              }
              _setupOptions() {
                const l = (i) => {
                    if (!(i in r.DEFAULT_OPTIONS))
                      throw new Error(`No option with key "${i}"`);
                    return this.rawOptions[i];
                  },
                  t = (i, e) => {
                    if (!(i in r.DEFAULT_OPTIONS))
                      throw new Error(`No option with key "${i}"`);
                    (e = this._sanitizeAndValidateOption(i, e)),
                      this.rawOptions[i] !== e &&
                        ((this.rawOptions[i] = e),
                        this._onOptionChange.fire(i));
                  };
                for (const i in this.rawOptions) {
                  const e = { get: l.bind(this, i), set: t.bind(this, i) };
                  Object.defineProperty(this.options, i, e);
                }
              }
              _sanitizeAndValidateOption(l, t) {
                switch (l) {
                  case "cursorStyle":
                    if (
                      (t || (t = r.DEFAULT_OPTIONS[l]),
                      !(function (i) {
                        return (
                          i === "block" || i === "underline" || i === "bar"
                        );
                      })(t))
                    )
                      throw new Error(`"${t}" is not a valid value for ${l}`);
                    break;
                  case "wordSeparator":
                    t || (t = r.DEFAULT_OPTIONS[l]);
                    break;
                  case "fontWeight":
                  case "fontWeightBold":
                    if (typeof t == "number" && 1 <= t && t <= 1e3) break;
                    t = d.includes(t) ? t : r.DEFAULT_OPTIONS[l];
                    break;
                  case "cursorWidth":
                    t = Math.floor(t);
                  case "lineHeight":
                  case "tabStopWidth":
                    if (t < 1)
                      throw new Error(
                        `${l} cannot be less than 1, value: ${t}`
                      );
                    break;
                  case "minimumContrastRatio":
                    t = Math.max(1, Math.min(21, Math.round(10 * t) / 10));
                    break;
                  case "scrollback":
                    if ((t = Math.min(t, 4294967295)) < 0)
                      throw new Error(
                        `${l} cannot be less than 0, value: ${t}`
                      );
                    break;
                  case "fastScrollSensitivity":
                  case "scrollSensitivity":
                    if (t <= 0)
                      throw new Error(
                        `${l} cannot be less than or equal to 0, value: ${t}`
                      );
                    break;
                  case "rows":
                  case "cols":
                    if (!t && t !== 0)
                      throw new Error(`${l} must be numeric, value: ${t}`);
                    break;
                  case "windowsPty":
                    t = t ?? {};
                }
                return t;
              }
            }
            r.OptionsService = f;
          },
          2660: function (L, r, o) {
            var h =
                (this && this.__decorate) ||
                function (f, p, l, t) {
                  var i,
                    e = arguments.length,
                    s =
                      e < 3
                        ? p
                        : t === null
                        ? (t = Object.getOwnPropertyDescriptor(p, l))
                        : t;
                  if (
                    typeof Reflect == "object" &&
                    typeof Reflect.decorate == "function"
                  )
                    s = Reflect.decorate(f, p, l, t);
                  else
                    for (var a = f.length - 1; a >= 0; a--)
                      (i = f[a]) &&
                        (s =
                          (e < 3 ? i(s) : e > 3 ? i(p, l, s) : i(p, l)) || s);
                  return e > 3 && s && Object.defineProperty(p, l, s), s;
                },
              u =
                (this && this.__param) ||
                function (f, p) {
                  return function (l, t) {
                    p(l, t, f);
                  };
                };
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.OscLinkService = void 0);
            const n = o(2585);
            let d = (r.OscLinkService = class {
              constructor(f) {
                (this._bufferService = f),
                  (this._nextId = 1),
                  (this._entriesWithId = new Map()),
                  (this._dataByLinkId = new Map());
              }
              registerLink(f) {
                const p = this._bufferService.buffer;
                if (f.id === void 0) {
                  const a = p.addMarker(p.ybase + p.y),
                    v = { data: f, id: this._nextId++, lines: [a] };
                  return (
                    a.onDispose(() => this._removeMarkerFromLink(v, a)),
                    this._dataByLinkId.set(v.id, v),
                    v.id
                  );
                }
                const l = f,
                  t = this._getEntryIdKey(l),
                  i = this._entriesWithId.get(t);
                if (i) return this.addLineToLink(i.id, p.ybase + p.y), i.id;
                const e = p.addMarker(p.ybase + p.y),
                  s = {
                    id: this._nextId++,
                    key: this._getEntryIdKey(l),
                    data: l,
                    lines: [e],
                  };
                return (
                  e.onDispose(() => this._removeMarkerFromLink(s, e)),
                  this._entriesWithId.set(s.key, s),
                  this._dataByLinkId.set(s.id, s),
                  s.id
                );
              }
              addLineToLink(f, p) {
                const l = this._dataByLinkId.get(f);
                if (l && l.lines.every((t) => t.line !== p)) {
                  const t = this._bufferService.buffer.addMarker(p);
                  l.lines.push(t),
                    t.onDispose(() => this._removeMarkerFromLink(l, t));
                }
              }
              getLinkData(f) {
                return this._dataByLinkId.get(f)?.data;
              }
              _getEntryIdKey(f) {
                return `${f.id};;${f.uri}`;
              }
              _removeMarkerFromLink(f, p) {
                const l = f.lines.indexOf(p);
                l !== -1 &&
                  (f.lines.splice(l, 1),
                  f.lines.length === 0 &&
                    (f.data.id !== void 0 && this._entriesWithId.delete(f.key),
                    this._dataByLinkId.delete(f.id)));
              }
            });
            r.OscLinkService = d = h([u(0, n.IBufferService)], d);
          },
          8343: (L, r) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.createDecorator =
                r.getServiceDependencies =
                r.serviceRegistry =
                  void 0);
            const o = "di$target",
              h = "di$dependencies";
            (r.serviceRegistry = new Map()),
              (r.getServiceDependencies = function (u) {
                return u[h] || [];
              }),
              (r.createDecorator = function (u) {
                if (r.serviceRegistry.has(u)) return r.serviceRegistry.get(u);
                const n = function (d, f, p) {
                  if (arguments.length !== 3)
                    throw new Error(
                      "@IServiceName-decorator can only be used to decorate a parameter"
                    );
                  (function (l, t, i) {
                    t[o] === t
                      ? t[h].push({ id: l, index: i })
                      : ((t[h] = [{ id: l, index: i }]), (t[o] = t));
                  })(n, d, p);
                };
                return (n.toString = () => u), r.serviceRegistry.set(u, n), n;
              });
          },
          2585: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.IDecorationService =
                r.IUnicodeService =
                r.IOscLinkService =
                r.IOptionsService =
                r.ILogService =
                r.LogLevelEnum =
                r.IInstantiationService =
                r.ICharsetService =
                r.ICoreService =
                r.ICoreMouseService =
                r.IBufferService =
                  void 0);
            const h = o(8343);
            var u;
            (r.IBufferService = (0, h.createDecorator)("BufferService")),
              (r.ICoreMouseService = (0, h.createDecorator)(
                "CoreMouseService"
              )),
              (r.ICoreService = (0, h.createDecorator)("CoreService")),
              (r.ICharsetService = (0, h.createDecorator)("CharsetService")),
              (r.IInstantiationService = (0, h.createDecorator)(
                "InstantiationService"
              )),
              (function (n) {
                (n[(n.TRACE = 0)] = "TRACE"),
                  (n[(n.DEBUG = 1)] = "DEBUG"),
                  (n[(n.INFO = 2)] = "INFO"),
                  (n[(n.WARN = 3)] = "WARN"),
                  (n[(n.ERROR = 4)] = "ERROR"),
                  (n[(n.OFF = 5)] = "OFF");
              })(u || (r.LogLevelEnum = u = {})),
              (r.ILogService = (0, h.createDecorator)("LogService")),
              (r.IOptionsService = (0, h.createDecorator)("OptionsService")),
              (r.IOscLinkService = (0, h.createDecorator)("OscLinkService")),
              (r.IUnicodeService = (0, h.createDecorator)("UnicodeService")),
              (r.IDecorationService = (0, h.createDecorator)(
                "DecorationService"
              ));
          },
          1480: (L, r, o) => {
            Object.defineProperty(r, "__esModule", { value: !0 }),
              (r.UnicodeService = void 0);
            const h = o(8460),
              u = o(225);
            class n {
              static extractShouldJoin(f) {
                return (1 & f) != 0;
              }
              static extractWidth(f) {
                return (f >> 1) & 3;
              }
              static extractCharKind(f) {
                return f >> 3;
              }
              static createPropertyValue(f, p, l = !1) {
                return ((16777215 & f) << 3) | ((3 & p) << 1) | (l ? 1 : 0);
              }
              constructor() {
                (this._providers = Object.create(null)),
                  (this._active = ""),
                  (this._onChange = new h.EventEmitter()),
                  (this.onChange = this._onChange.event);
                const f = new u.UnicodeV6();
                this.register(f),
                  (this._active = f.version),
                  (this._activeProvider = f);
              }
              dispose() {
                this._onChange.dispose();
              }
              get versions() {
                return Object.keys(this._providers);
              }
              get activeVersion() {
                return this._active;
              }
              set activeVersion(f) {
                if (!this._providers[f])
                  throw new Error(`unknown Unicode version "${f}"`);
                (this._active = f),
                  (this._activeProvider = this._providers[f]),
                  this._onChange.fire(f);
              }
              register(f) {
                this._providers[f.version] = f;
              }
              wcwidth(f) {
                return this._activeProvider.wcwidth(f);
              }
              getStringCellWidth(f) {
                let p = 0,
                  l = 0;
                const t = f.length;
                for (let i = 0; i < t; ++i) {
                  let e = f.charCodeAt(i);
                  if (55296 <= e && e <= 56319) {
                    if (++i >= t) return p + this.wcwidth(e);
                    const v = f.charCodeAt(i);
                    56320 <= v && v <= 57343
                      ? (e = 1024 * (e - 55296) + v - 56320 + 65536)
                      : (p += this.wcwidth(v));
                  }
                  const s = this.charProperties(e, l);
                  let a = n.extractWidth(s);
                  n.extractShouldJoin(s) && (a -= n.extractWidth(l)),
                    (p += a),
                    (l = s);
                }
                return p;
              }
              charProperties(f, p) {
                return this._activeProvider.charProperties(f, p);
              }
            }
            r.UnicodeService = n;
          },
        },
        C = {};
      function B(L) {
        var r = C[L];
        if (r !== void 0) return r.exports;
        var o = (C[L] = { exports: {} });
        return w[L].call(o.exports, o, o.exports, B), o.exports;
      }
      var H = {};
      return (
        (() => {
          var L = H;
          Object.defineProperty(L, "__esModule", { value: !0 }),
            (L.Terminal = void 0);
          const r = B(9042),
            o = B(3236),
            h = B(844),
            u = B(5741),
            n = B(8285),
            d = B(7975),
            f = B(7090),
            p = ["cols", "rows"];
          class l extends h.Disposable {
            constructor(i) {
              super(),
                (this._core = this.register(new o.Terminal(i))),
                (this._addonManager = this.register(new u.AddonManager())),
                (this._publicOptions = { ...this._core.options });
              const e = (a) => this._core.options[a],
                s = (a, v) => {
                  this._checkReadonlyOptions(a), (this._core.options[a] = v);
                };
              for (const a in this._core.options) {
                const v = { get: e.bind(this, a), set: s.bind(this, a) };
                Object.defineProperty(this._publicOptions, a, v);
              }
            }
            _checkReadonlyOptions(i) {
              if (p.includes(i))
                throw new Error(
                  `Option "${i}" can only be set in the constructor`
                );
            }
            _checkProposedApi() {
              if (!this._core.optionsService.rawOptions.allowProposedApi)
                throw new Error(
                  "You must set the allowProposedApi option to true to use proposed API"
                );
            }
            get onBell() {
              return this._core.onBell;
            }
            get onBinary() {
              return this._core.onBinary;
            }
            get onCursorMove() {
              return this._core.onCursorMove;
            }
            get onData() {
              return this._core.onData;
            }
            get onKey() {
              return this._core.onKey;
            }
            get onLineFeed() {
              return this._core.onLineFeed;
            }
            get onRender() {
              return this._core.onRender;
            }
            get onResize() {
              return this._core.onResize;
            }
            get onScroll() {
              return this._core.onScroll;
            }
            get onSelectionChange() {
              return this._core.onSelectionChange;
            }
            get onTitleChange() {
              return this._core.onTitleChange;
            }
            get onWriteParsed() {
              return this._core.onWriteParsed;
            }
            get element() {
              return this._core.element;
            }
            get parser() {
              return (
                this._parser || (this._parser = new d.ParserApi(this._core)),
                this._parser
              );
            }
            get unicode() {
              return this._checkProposedApi(), new f.UnicodeApi(this._core);
            }
            get textarea() {
              return this._core.textarea;
            }
            get rows() {
              return this._core.rows;
            }
            get cols() {
              return this._core.cols;
            }
            get buffer() {
              return (
                this._buffer ||
                  (this._buffer = this.register(
                    new n.BufferNamespaceApi(this._core)
                  )),
                this._buffer
              );
            }
            get markers() {
              return this._checkProposedApi(), this._core.markers;
            }
            get modes() {
              const i = this._core.coreService.decPrivateModes;
              let e = "none";
              switch (this._core.coreMouseService.activeProtocol) {
                case "X10":
                  e = "x10";
                  break;
                case "VT200":
                  e = "vt200";
                  break;
                case "DRAG":
                  e = "drag";
                  break;
                case "ANY":
                  e = "any";
              }
              return {
                applicationCursorKeysMode: i.applicationCursorKeys,
                applicationKeypadMode: i.applicationKeypad,
                bracketedPasteMode: i.bracketedPasteMode,
                insertMode: this._core.coreService.modes.insertMode,
                mouseTrackingMode: e,
                originMode: i.origin,
                reverseWraparoundMode: i.reverseWraparound,
                sendFocusMode: i.sendFocus,
                wraparoundMode: i.wraparound,
              };
            }
            get options() {
              return this._publicOptions;
            }
            set options(i) {
              for (const e in i) this._publicOptions[e] = i[e];
            }
            blur() {
              this._core.blur();
            }
            focus() {
              this._core.focus();
            }
            input(i, e = !0) {
              this._core.input(i, e);
            }
            resize(i, e) {
              this._verifyIntegers(i, e), this._core.resize(i, e);
            }
            open(i) {
              this._core.open(i);
            }
            attachCustomKeyEventHandler(i) {
              this._core.attachCustomKeyEventHandler(i);
            }
            attachCustomWheelEventHandler(i) {
              this._core.attachCustomWheelEventHandler(i);
            }
            registerLinkProvider(i) {
              return this._core.registerLinkProvider(i);
            }
            registerCharacterJoiner(i) {
              return (
                this._checkProposedApi(), this._core.registerCharacterJoiner(i)
              );
            }
            deregisterCharacterJoiner(i) {
              this._checkProposedApi(), this._core.deregisterCharacterJoiner(i);
            }
            registerMarker(i = 0) {
              return this._verifyIntegers(i), this._core.registerMarker(i);
            }
            registerDecoration(i) {
              return (
                this._checkProposedApi(),
                this._verifyPositiveIntegers(
                  i.x ?? 0,
                  i.width ?? 0,
                  i.height ?? 0
                ),
                this._core.registerDecoration(i)
              );
            }
            hasSelection() {
              return this._core.hasSelection();
            }
            select(i, e, s) {
              this._verifyIntegers(i, e, s), this._core.select(i, e, s);
            }
            getSelection() {
              return this._core.getSelection();
            }
            getSelectionPosition() {
              return this._core.getSelectionPosition();
            }
            clearSelection() {
              this._core.clearSelection();
            }
            selectAll() {
              this._core.selectAll();
            }
            selectLines(i, e) {
              this._verifyIntegers(i, e), this._core.selectLines(i, e);
            }
            dispose() {
              super.dispose();
            }
            scrollLines(i) {
              this._verifyIntegers(i), this._core.scrollLines(i);
            }
            scrollPages(i) {
              this._verifyIntegers(i), this._core.scrollPages(i);
            }
            scrollToTop() {
              this._core.scrollToTop();
            }
            scrollToBottom() {
              this._core.scrollToBottom();
            }
            scrollToLine(i) {
              this._verifyIntegers(i), this._core.scrollToLine(i);
            }
            clear() {
              this._core.clear();
            }
            write(i, e) {
              this._core.write(i, e);
            }
            writeln(i, e) {
              this._core.write(i),
                this._core.write(
                  `\r
`,
                  e
                );
            }
            paste(i) {
              this._core.paste(i);
            }
            refresh(i, e) {
              this._verifyIntegers(i, e), this._core.refresh(i, e);
            }
            reset() {
              this._core.reset();
            }
            clearTextureAtlas() {
              this._core.clearTextureAtlas();
            }
            loadAddon(i) {
              this._addonManager.loadAddon(this, i);
            }
            static get strings() {
              return r;
            }
            _verifyIntegers(...i) {
              for (const e of i)
                if (e === 1 / 0 || isNaN(e) || e % 1 != 0)
                  throw new Error("This API only accepts integers");
            }
            _verifyPositiveIntegers(...i) {
              for (const e of i)
                if (e && (e === 1 / 0 || isNaN(e) || e % 1 != 0 || e < 0))
                  throw new Error("This API only accepts positive integers");
            }
          }
          L.Terminal = l;
        })(),
        H
      );
    })()
  );
})(ft);
var Si = ft.exports,
  vt = { exports: {} };
(function (E, b) {
  (function (w, C) {
    E.exports = C();
  })(self, () =>
    (() => {
      var w = {};
      return (
        (() => {
          var C = w;
          Object.defineProperty(C, "__esModule", { value: !0 }),
            (C.FitAddon = void 0),
            (C.FitAddon = class {
              activate(B) {
                this._terminal = B;
              }
              dispose() {}
              fit() {
                const B = this.proposeDimensions();
                if (!B || !this._terminal || isNaN(B.cols) || isNaN(B.rows))
                  return;
                const H = this._terminal._core;
                (this._terminal.rows === B.rows &&
                  this._terminal.cols === B.cols) ||
                  (H._renderService.clear(),
                  this._terminal.resize(B.cols, B.rows));
              }
              proposeDimensions() {
                if (
                  !this._terminal ||
                  !this._terminal.element ||
                  !this._terminal.element.parentElement
                )
                  return;
                const B = this._terminal._core,
                  H = B._renderService.dimensions;
                if (H.css.cell.width === 0 || H.css.cell.height === 0) return;
                const L =
                    this._terminal.options.scrollback === 0
                      ? 0
                      : B.viewport.scrollBarWidth,
                  r = window.getComputedStyle(
                    this._terminal.element.parentElement
                  ),
                  o = parseInt(r.getPropertyValue("height")),
                  h = Math.max(0, parseInt(r.getPropertyValue("width"))),
                  u = window.getComputedStyle(this._terminal.element),
                  n =
                    o -
                    (parseInt(u.getPropertyValue("padding-top")) +
                      parseInt(u.getPropertyValue("padding-bottom"))),
                  d =
                    h -
                    (parseInt(u.getPropertyValue("padding-right")) +
                      parseInt(u.getPropertyValue("padding-left"))) -
                    L;
                return {
                  cols: Math.max(2, Math.floor(d / H.css.cell.width)),
                  rows: Math.max(1, Math.floor(n / H.css.cell.height)),
                };
              }
            });
        })(),
        w
      );
    })()
  );
})(vt);
var bi = vt.exports;
const Ci = { copy: "копировать", copied: "скопировано" },
  yi = {
    terminator: "виртуальная машина для чего угодно, когда угодно, бесплатно",
    aeza: {
      text: "проект создан и работает на мощностях aéza. у нас флагманское оборудование под бесплатной кастомной защитой. а проблемы решает классная поддержка 24/7.",
      button: "изучить сервера от €0.02/час",
    },
    free: "без регистрации и смс",
    os: "две ОС на выбор: Windows 10 и Debian 12",
    hardware:
      "мощнее мультиварки:<br />4 ядра 2.4+ ГГц, 4 ГБ, 40 ГБ SSD, 200 Мбит",
    timeLimit:
      "тайм-лимит — 15 минут, потом автоматическое удаление. новую сессию можно создать сразу",
    iframe: "встройте terminator by aéza<br /> на свой сайт",
  },
  wi = {
    success: "Рекомендуем использовать полноэкранный режим",
    disconnected: "Отключен",
    busy: "Все сервера заняты",
  },
  Ei = {
    creating: "Минутку. Сервер создаётся...",
    allBusy: "Все сервера заняты. Максимальное время ожидания %time% секунд",
  },
  ki = { delete: "закончить сессию" },
  Li = { common: Ci, cards: yi, toasts: wi, queue: Ei, actions: ki },
  xi = { copy: "copy", copied: "copied" },
  Di = {
    terminator: "",
    aeza: {
      text: "",
      button: "",
    },
    free: "",
    os: "",
    hardware: "",
    timeLimit: "",
    iframe: "",
  },
  Ri = {
    success: "Fullscreen is recommended",
    disconnected: "Disconnected",
    busy: "Server busy...",
  },
  Ai = {
    creating: "Server is creating...",
    allBusy: "All servers are busy. Wait time: %time%",
  },
  Oi = { delete: "End Session" },
  Ti = { common: xi, cards: Di, toasts: Ri, queue: Ai, actions: Oi },
  Bi = { copy: "копіювати", copied: "скопійовано" },
  Mi = {
    terminator:
      "віртуальна машина для чого завгодно, коли завгодно, безкоштовно",
    aeza: {
      text: "проект створений i працює на потужностях aéza. у нас флагманське обладнання під безкоштовним кастомним захистом. а проблеми вирішує класна підтримка 24/7.",
      button: "вивчити сервера від €0.02/година",
    },
    free: "без реєстрації та смс",
    hardware:
      "потужніший за мультиварку:<br />4 ядра 2.4+ ГГц, 4 ГБ, 40 ГБ SSD, 200 Мбіт",
    os: "Дві ОС на вибір: Windows 10 та Debian 12",
    timeLimit:
      "тайм-ліміт - 15 хвилин, потім автоматичне видалення. нову сесію можна створити відразу",
    iframe: "вбудуйте terminator by aéza<br />на свій сайт",
  },
  Pi = {
    success: "Рекомендуємо використовувати повноекранний режим",
    disconnected: "Відключено",
    busy: "Всі сервери зайняті",
  },
  Ii = {
    creating: "Хвилинку. Сервер створюється...",
    allBusy: "Всі сервери зайняті. Максимальний час очікування %time% секунд",
  },
  Hi = { delete: "видалити сервер" },
  Wi = { common: Bi, cards: Mi, toasts: Pi, queue: Ii, actions: Hi },
  Fi = { ru: Li, en: Ti, uk: Wi };
function Ni(E, b, w) {
  let C = b.split(".").reduce((B, H) => B?.[H], Fi[E]) ?? b;
  return (
    w &&
      Object.entries(w).map(([B, H]) => {
        C = C.replace(`%${B}%`, H);
      }),
    C
  );
}
let me = !1,
  ye = !1,
  ze,
  He = "";
const zi = document.documentElement.lang,
  Ue = (E, b) => Ni(zi, E, b),
  Ui = [
    atob("aHR0cHM6Ly9mYy50ZXJtaW5hdG9yLmFlemEubmV0L3Bpbmc="),
    atob("aHR0cHM6Ly9tYy50ZXJtaW5hdG9yLmFlemEubmV0L3Bpbmc="),
  ];
async function pt(E) {
  return fetch(E)
    .then((b) => b.text())
    .then((b) => parseInt(b, 10))
    .catch((b) => (console.error("Error", E, ":", b), -1));
}
async function $i() {
  const E = (
    await Promise.all(Ui.map(async (b) => ({ url: b, time: await pt(b) })))
  )
    .filter((b) => b.time !== -1)
    .sort((b, w) => b.time - w.time);
  ze = new URL(E[0].url).hostname;
}
function We(E, b) {
  const w = {
    success: "rgb(100,100,100)",
    error: "rgb(100,100,100)",
  };
  mi({
    text: Ue(`toasts.${E}`),
    duration: 3e3,
    newWindow: !0,
    gravity: "top",
    position: "right",
    stopOnFocus: !0,
    style: { background: w[b] },
    onClick: function () {},
  }).showToast();
}
async function ji() {
  await $i(),
    (() => {
      let E = 0,
        b;
      const w = document.querySelector(".stop-button"),
        C = document.getElementById("ping-text"),
        B = document.getElementById("timer"),
        H = document.querySelector(".queue");
      function L(f) {
        if (!ye) return;
        let p = Math.floor((E - f) / 1e3);
        if (p <= 0) return;
        let l = Math.floor((p / 60 / 60) % 60)
            .toString()
            .padStart(2, "0"),
          t = Math.floor((p / 60) % 60)
            .toString()
            .padStart(2, "0"),
          i = (p % 60).toString().padStart(2, "0");
        (B.innerText = l === "00" ? `${t}:${i}` : `${l}:${t}:${i}`),
          requestAnimationFrame(L);
      }
      w?.addEventListener("click", () => {
        b?.close();
      });
      class r {
        term;
        fitAddon;
        container;
        constructor() {
          (this.container = document.getElementById("terminal")),
            (this.fitAddon = new bi.FitAddon()),
            window.addEventListener("resize", () => this.fitAddon.fit()),
            (this.term = new Si.Terminal()),
            this.term.loadAddon(this.fitAddon),
            this.container && this.term.open(this.container),
            this.fitAddon.fit(),
            this.term.onData((p) => {
              b && b.readyState == WebSocket.OPEN && b.send(p);
            });
        }
        write(p) {
          this.fitAddon.fit(), this.term.write(p);
        }
      }
      const o = document.querySelector(".container"),
        h = new r(),
        u = document.querySelector(".buttons"),
        n = document.getElementById("captcha");
      u?.addEventListener("click", (f) => {
        const p = f.target;
        p?.hasAttribute("data-type") &&
          ((He = p.getAttribute("data-type") || "linux"),
          (u.style.display = "none"),
          (n.style.display = ""),
          window.hcaptcha.render("captcha", {
            theme: "dark",
            sitekey: "d5d06076-6ea0-46c2-a9d0-e14ca676d250",
            callback: function (l) {
              l.length !== 0 &&
                ((n.style.display = "none"),
                (b = new WebSocket(`wss://${ze}/ws/`)),
                b?.addEventListener("open", () => {
                  b?.send(JSON.stringify({ token: l, type: He, retry: !0 }));
                }),
                b?.addEventListener("message", (t) => {
                  if (t.data.startsWith("{")) {
                    const i = JSON.parse(t.data);
                    i.duration &&
                      ((E = performance.now() + 1e3 * Number(i.duration)),
                      requestAnimationFrame(L),
                      ye ||
                        ((ye = !0),
                        me && (H.classList.remove("visible"), (me = !1)),
                        We("success", "success"),
                        (w.style.display = "inline-block"))),
                      i.time !== void 0 &&
                        ((me = !0),
                        !H.classList.contains("visible") &&
                          H.classList.add("visible"),
                        i.time == null
                          ? (H.innerText = Ue("queue.creating"))
                          : (H.innerText = Ue("queue.allBusy", {
                              time: Math.floor(i.time / 1e3),
                            })));
                    return;
                  }
                  if (
                    (me && (H.classList.remove("visible"), (me = !1)),
                    (w.style.display = "inline-block"),
                    He === "linux")
                  ) {
                    const i = document.querySelector(".terminal");
                    (i.style.display = ""),
                      (i.style.visibility = "visible"),
                      h.write(t.data);
                  } else {
                    h.term.clear();
                    let i = document.createElement("iframe");
                    (i.id = "windows-iframe"),
                      (i.src = t.data),
                      i.setAttribute("allow", "fullscreen"),
                      (i.dataset.type = "windows"),
                      o.appendChild(i);
                  }
                }),
                b?.addEventListener("close", (t) => {
                  (ye = !1),
                    h.term.clear(),
                    (u.style.display = "block"),
                    window.hcaptcha.reset(),
                    (w.style.display = "none"),
                    (B.innerText = "");
                  const i = document.querySelector(".terminal");
                  (i.style.display = "none"),
                    (i.style.visibility = "hidden"),
                    document
                      .querySelectorAll("#windows-iframe")
                      .forEach((e) => e.remove()),
                    t.code == 1013
                      ? We("busy", "error")
                      : We("disconnected", "error");
                }));
            },
          }));
      });
      function d() {
        pt(`https://${ze}/ping`)
          .then((f) => {
            let p = Math.floor(Number(f) / 1e3);
            isNaN(p)
              ? C && (C.innerText = "?")
              : C && (C.innerText = p.toString());
          })
          .catch(() => {
            C && (C.innerText = "?");
          });
      }
      d(), setInterval(() => d(), 5e3);
    })();
}
ji();
document.querySelector(".fullscreen-button")?.addEventListener("click", () => {
  console.log("here"),
    document.fullscreenElement
      ? document.exitFullscreen && document.exitFullscreen()
      : document.getElementById("viewCont")?.requestFullscreen();
});
const Se = document.getElementById("copy-button");
Se?.addEventListener("click", () => {
  const b = document
    .getElementById("code-block")
    ?.getElementsByTagName("code")[0];
  navigator.clipboard.writeText(b?.innerText || ""),
    (Se.innerText = Se.dataset.copiedtext || ""),
    setTimeout(() => (Se.innerText = Se.dataset.copytext || ""), 1500);
});
document.querySelector(".hide-sidebar")?.addEventListener("click", () => {
  document.querySelector("aside")?.classList.toggle("closed");
});
document.querySelectorAll(".language-link")?.forEach((E) => {
  E?.addEventListener("click", () => {
    E instanceof HTMLElement &&
      localStorage.setItem("language", E.dataset.lang ?? "");
  });
});
function qi(E) {
  switch (E) {
    case "light":
      return "dark";
    case "dark":
      return "retro";
    default:
      return "light";
  }
}
const Ki = document.getElementById("theme-picker");
Ki?.addEventListener("click", function () {
  const E = localStorage.getItem("theme") || "light",
    b = qi(E);
  (document.documentElement.dataset.theme = b),
    localStorage.setItem("theme", b);
});
