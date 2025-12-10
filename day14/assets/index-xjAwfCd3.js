(function () {
  const c = document.createElement("link").relList;
  if (c && c.supports && c.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) f(s);
  new MutationObserver((s) => {
    for (const d of s)
      if (d.type === "childList")
        for (const h of d.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && f(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(s) {
    const d = {};
    return (
      s.integrity && (d.integrity = s.integrity),
      s.referrerPolicy && (d.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function f(s) {
    if (s.ep) return;
    s.ep = !0;
    const d = r(s);
    fetch(s.href, d);
  }
})();
function kv(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var or = { exports: {} },
  Ka = {};
var Fh;
function Fv() {
  if (Fh) return Ka;
  Fh = 1;
  var a = Symbol.for("react.transitional.element"),
    c = Symbol.for("react.fragment");
  function r(f, s, d) {
    var h = null;
    if (
      (d !== void 0 && (h = "" + d),
      s.key !== void 0 && (h = "" + s.key),
      "key" in s)
    ) {
      d = {};
      for (var p in s) p !== "key" && (d[p] = s[p]);
    } else d = s;
    return (
      (s = d.ref),
      { $$typeof: a, type: f, key: h, ref: s !== void 0 ? s : null, props: d }
    );
  }
  return (Ka.Fragment = c), (Ka.jsx = r), (Ka.jsxs = r), Ka;
}
var $h;
function $v() {
  return $h || (($h = 1), (or.exports = Fv())), or.exports;
}
var U = $v(),
  dr = { exports: {} },
  et = {};
var Wh;
function Wv() {
  if (Wh) return et;
  Wh = 1;
  var a = Symbol.for("react.transitional.element"),
    c = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    f = Symbol.for("react.strict_mode"),
    s = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    v = Symbol.for("react.suspense"),
    y = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    b = Symbol.for("react.activity"),
    D = Symbol.iterator;
  function Y(E) {
    return E === null || typeof E != "object"
      ? null
      : ((E = (D && E[D]) || E["@@iterator"]),
        typeof E == "function" ? E : null);
  }
  var R = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    L = Object.assign,
    _ = {};
  function G(E, B, V) {
    (this.props = E),
      (this.context = B),
      (this.refs = _),
      (this.updater = V || R);
  }
  (G.prototype.isReactComponent = {}),
    (G.prototype.setState = function (E, B) {
      if (typeof E != "object" && typeof E != "function" && E != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, E, B, "setState");
    }),
    (G.prototype.forceUpdate = function (E) {
      this.updater.enqueueForceUpdate(this, E, "forceUpdate");
    });
  function X() {}
  X.prototype = G.prototype;
  function Z(E, B, V) {
    (this.props = E),
      (this.context = B),
      (this.refs = _),
      (this.updater = V || R);
  }
  var I = (Z.prototype = new X());
  (I.constructor = Z), L(I, G.prototype), (I.isPureReactComponent = !0);
  var it = Array.isArray;
  function St() {}
  var F = { H: null, A: null, T: null, S: null },
    lt = Object.prototype.hasOwnProperty;
  function ht(E, B, V) {
    var K = V.ref;
    return {
      $$typeof: a,
      type: E,
      key: B,
      ref: K !== void 0 ? K : null,
      props: V,
    };
  }
  function Bt(E, B) {
    return ht(E.type, B, E.props);
  }
  function Xt(E) {
    return typeof E == "object" && E !== null && E.$$typeof === a;
  }
  function Qt(E) {
    var B = { "=": "=0", ":": "=2" };
    return (
      "$" +
      E.replace(/[=:]/g, function (V) {
        return B[V];
      })
    );
  }
  var me = /\/+/g;
  function Jt(E, B) {
    return typeof E == "object" && E !== null && E.key != null
      ? Qt("" + E.key)
      : B.toString(36);
  }
  function ae(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (
          (typeof E.status == "string"
            ? E.then(St, St)
            : ((E.status = "pending"),
              E.then(
                function (B) {
                  E.status === "pending" &&
                    ((E.status = "fulfilled"), (E.value = B));
                },
                function (B) {
                  E.status === "pending" &&
                    ((E.status = "rejected"), (E.reason = B));
                }
              )),
          E.status)
        ) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function M(E, B, V, K, tt) {
    var ct = typeof E;
    (ct === "undefined" || ct === "boolean") && (E = null);
    var gt = !1;
    if (E === null) gt = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          gt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case a:
            case c:
              gt = !0;
              break;
            case g:
              return (gt = E._init), M(gt(E._payload), B, V, K, tt);
          }
      }
    if (gt)
      return (
        (tt = tt(E)),
        (gt = K === "" ? "." + Jt(E, 0) : K),
        it(tt)
          ? ((V = ""),
            gt != null && (V = gt.replace(me, "$&/") + "/"),
            M(tt, B, V, "", function (In) {
              return In;
            }))
          : tt != null &&
            (Xt(tt) &&
              (tt = Bt(
                tt,
                V +
                  (tt.key == null || (E && E.key === tt.key)
                    ? ""
                    : ("" + tt.key).replace(me, "$&/") + "/") +
                  gt
              )),
            B.push(tt)),
        1
      );
    gt = 0;
    var le = K === "" ? "." : K + ":";
    if (it(E))
      for (var Ut = 0; Ut < E.length; Ut++)
        (K = E[Ut]), (ct = le + Jt(K, Ut)), (gt += M(K, B, V, ct, tt));
    else if (((Ut = Y(E)), typeof Ut == "function"))
      for (E = Ut.call(E), Ut = 0; !(K = E.next()).done; )
        (K = K.value), (ct = le + Jt(K, Ut++)), (gt += M(K, B, V, ct, tt));
    else if (ct === "object") {
      if (typeof E.then == "function") return M(ae(E), B, V, K, tt);
      throw (
        ((B = String(E)),
        Error(
          "Objects are not valid as a React child (found: " +
            (B === "[object Object]"
              ? "object with keys {" + Object.keys(E).join(", ") + "}"
              : B) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return gt;
  }
  function Q(E, B, V) {
    if (E == null) return E;
    var K = [],
      tt = 0;
    return (
      M(E, K, "", "", function (ct) {
        return B.call(V, ct, tt++);
      }),
      K
    );
  }
  function $(E) {
    if (E._status === -1) {
      var B = E._result;
      (B = B()),
        B.then(
          function (V) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 1), (E._result = V));
          },
          function (V) {
            (E._status === 0 || E._status === -1) &&
              ((E._status = 2), (E._result = V));
          }
        ),
        E._status === -1 && ((E._status = 0), (E._result = B));
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var vt =
      typeof reportError == "function"
        ? reportError
        : function (E) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var B = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof E == "object" &&
                  E !== null &&
                  typeof E.message == "string"
                    ? String(E.message)
                    : String(E),
                error: E,
              });
              if (!window.dispatchEvent(B)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", E);
              return;
            }
            console.error(E);
          },
    bt = {
      map: Q,
      forEach: function (E, B, V) {
        Q(
          E,
          function () {
            B.apply(this, arguments);
          },
          V
        );
      },
      count: function (E) {
        var B = 0;
        return (
          Q(E, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (E) {
        return (
          Q(E, function (B) {
            return B;
          }) || []
        );
      },
      only: function (E) {
        if (!Xt(E))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return E;
      },
    };
  return (
    (et.Activity = b),
    (et.Children = bt),
    (et.Component = G),
    (et.Fragment = r),
    (et.Profiler = s),
    (et.PureComponent = Z),
    (et.StrictMode = f),
    (et.Suspense = v),
    (et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F),
    (et.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (E) {
        return F.H.useMemoCache(E);
      },
    }),
    (et.cache = function (E) {
      return function () {
        return E.apply(null, arguments);
      };
    }),
    (et.cacheSignal = function () {
      return null;
    }),
    (et.cloneElement = function (E, B, V) {
      if (E == null)
        throw Error(
          "The argument must be a React element, but you passed " + E + "."
        );
      var K = L({}, E.props),
        tt = E.key;
      if (B != null)
        for (ct in (B.key !== void 0 && (tt = "" + B.key), B))
          !lt.call(B, ct) ||
            ct === "key" ||
            ct === "__self" ||
            ct === "__source" ||
            (ct === "ref" && B.ref === void 0) ||
            (K[ct] = B[ct]);
      var ct = arguments.length - 2;
      if (ct === 1) K.children = V;
      else if (1 < ct) {
        for (var gt = Array(ct), le = 0; le < ct; le++)
          gt[le] = arguments[le + 2];
        K.children = gt;
      }
      return ht(E.type, tt, K);
    }),
    (et.createContext = function (E) {
      return (
        (E = {
          $$typeof: h,
          _currentValue: E,
          _currentValue2: E,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (E.Provider = E),
        (E.Consumer = { $$typeof: d, _context: E }),
        E
      );
    }),
    (et.createElement = function (E, B, V) {
      var K,
        tt = {},
        ct = null;
      if (B != null)
        for (K in (B.key !== void 0 && (ct = "" + B.key), B))
          lt.call(B, K) &&
            K !== "key" &&
            K !== "__self" &&
            K !== "__source" &&
            (tt[K] = B[K]);
      var gt = arguments.length - 2;
      if (gt === 1) tt.children = V;
      else if (1 < gt) {
        for (var le = Array(gt), Ut = 0; Ut < gt; Ut++)
          le[Ut] = arguments[Ut + 2];
        tt.children = le;
      }
      if (E && E.defaultProps)
        for (K in ((gt = E.defaultProps), gt))
          tt[K] === void 0 && (tt[K] = gt[K]);
      return ht(E, ct, tt);
    }),
    (et.createRef = function () {
      return { current: null };
    }),
    (et.forwardRef = function (E) {
      return { $$typeof: p, render: E };
    }),
    (et.isValidElement = Xt),
    (et.lazy = function (E) {
      return { $$typeof: g, _payload: { _status: -1, _result: E }, _init: $ };
    }),
    (et.memo = function (E, B) {
      return { $$typeof: y, type: E, compare: B === void 0 ? null : B };
    }),
    (et.startTransition = function (E) {
      var B = F.T,
        V = {};
      F.T = V;
      try {
        var K = E(),
          tt = F.S;
        tt !== null && tt(V, K),
          typeof K == "object" &&
            K !== null &&
            typeof K.then == "function" &&
            K.then(St, vt);
      } catch (ct) {
        vt(ct);
      } finally {
        B !== null && V.types !== null && (B.types = V.types), (F.T = B);
      }
    }),
    (et.unstable_useCacheRefresh = function () {
      return F.H.useCacheRefresh();
    }),
    (et.use = function (E) {
      return F.H.use(E);
    }),
    (et.useActionState = function (E, B, V) {
      return F.H.useActionState(E, B, V);
    }),
    (et.useCallback = function (E, B) {
      return F.H.useCallback(E, B);
    }),
    (et.useContext = function (E) {
      return F.H.useContext(E);
    }),
    (et.useDebugValue = function () {}),
    (et.useDeferredValue = function (E, B) {
      return F.H.useDeferredValue(E, B);
    }),
    (et.useEffect = function (E, B) {
      return F.H.useEffect(E, B);
    }),
    (et.useEffectEvent = function (E) {
      return F.H.useEffectEvent(E);
    }),
    (et.useId = function () {
      return F.H.useId();
    }),
    (et.useImperativeHandle = function (E, B, V) {
      return F.H.useImperativeHandle(E, B, V);
    }),
    (et.useInsertionEffect = function (E, B) {
      return F.H.useInsertionEffect(E, B);
    }),
    (et.useLayoutEffect = function (E, B) {
      return F.H.useLayoutEffect(E, B);
    }),
    (et.useMemo = function (E, B) {
      return F.H.useMemo(E, B);
    }),
    (et.useOptimistic = function (E, B) {
      return F.H.useOptimistic(E, B);
    }),
    (et.useReducer = function (E, B, V) {
      return F.H.useReducer(E, B, V);
    }),
    (et.useRef = function (E) {
      return F.H.useRef(E);
    }),
    (et.useState = function (E) {
      return F.H.useState(E);
    }),
    (et.useSyncExternalStore = function (E, B, V) {
      return F.H.useSyncExternalStore(E, B, V);
    }),
    (et.useTransition = function () {
      return F.H.useTransition();
    }),
    (et.version = "19.2.0"),
    et
  );
}
var Ph;
function jr() {
  return Ph || ((Ph = 1), (dr.exports = Wv())), dr.exports;
}
var j = jr();
const xm = kv(j);
var hr = { exports: {} },
  Ja = {},
  mr = { exports: {} },
  yr = {};
var Ih;
function Pv() {
  return (
    Ih ||
      ((Ih = 1),
      (function (a) {
        function c(M, Q) {
          var $ = M.length;
          M.push(Q);
          t: for (; 0 < $; ) {
            var vt = ($ - 1) >>> 1,
              bt = M[vt];
            if (0 < s(bt, Q)) (M[vt] = Q), (M[$] = bt), ($ = vt);
            else break t;
          }
        }
        function r(M) {
          return M.length === 0 ? null : M[0];
        }
        function f(M) {
          if (M.length === 0) return null;
          var Q = M[0],
            $ = M.pop();
          if ($ !== Q) {
            M[0] = $;
            t: for (var vt = 0, bt = M.length, E = bt >>> 1; vt < E; ) {
              var B = 2 * (vt + 1) - 1,
                V = M[B],
                K = B + 1,
                tt = M[K];
              if (0 > s(V, $))
                K < bt && 0 > s(tt, V)
                  ? ((M[vt] = tt), (M[K] = $), (vt = K))
                  : ((M[vt] = V), (M[B] = $), (vt = B));
              else if (K < bt && 0 > s(tt, $))
                (M[vt] = tt), (M[K] = $), (vt = K);
              else break t;
            }
          }
          return Q;
        }
        function s(M, Q) {
          var $ = M.sortIndex - Q.sortIndex;
          return $ !== 0 ? $ : M.id - Q.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          a.unstable_now = function () {
            return d.now();
          };
        } else {
          var h = Date,
            p = h.now();
          a.unstable_now = function () {
            return h.now() - p;
          };
        }
        var v = [],
          y = [],
          g = 1,
          b = null,
          D = 3,
          Y = !1,
          R = !1,
          L = !1,
          _ = !1,
          G = typeof setTimeout == "function" ? setTimeout : null,
          X = typeof clearTimeout == "function" ? clearTimeout : null,
          Z = typeof setImmediate < "u" ? setImmediate : null;
        function I(M) {
          for (var Q = r(y); Q !== null; ) {
            if (Q.callback === null) f(y);
            else if (Q.startTime <= M)
              f(y), (Q.sortIndex = Q.expirationTime), c(v, Q);
            else break;
            Q = r(y);
          }
        }
        function it(M) {
          if (((L = !1), I(M), !R))
            if (r(v) !== null) (R = !0), St || ((St = !0), Qt());
            else {
              var Q = r(y);
              Q !== null && ae(it, Q.startTime - M);
            }
        }
        var St = !1,
          F = -1,
          lt = 5,
          ht = -1;
        function Bt() {
          return _ ? !0 : !(a.unstable_now() - ht < lt);
        }
        function Xt() {
          if (((_ = !1), St)) {
            var M = a.unstable_now();
            ht = M;
            var Q = !0;
            try {
              t: {
                (R = !1), L && ((L = !1), X(F), (F = -1)), (Y = !0);
                var $ = D;
                try {
                  e: {
                    for (
                      I(M), b = r(v);
                      b !== null && !(b.expirationTime > M && Bt());

                    ) {
                      var vt = b.callback;
                      if (typeof vt == "function") {
                        (b.callback = null), (D = b.priorityLevel);
                        var bt = vt(b.expirationTime <= M);
                        if (((M = a.unstable_now()), typeof bt == "function")) {
                          (b.callback = bt), I(M), (Q = !0);
                          break e;
                        }
                        b === r(v) && f(v), I(M);
                      } else f(v);
                      b = r(v);
                    }
                    if (b !== null) Q = !0;
                    else {
                      var E = r(y);
                      E !== null && ae(it, E.startTime - M), (Q = !1);
                    }
                  }
                  break t;
                } finally {
                  (b = null), (D = $), (Y = !1);
                }
                Q = void 0;
              }
            } finally {
              Q ? Qt() : (St = !1);
            }
          }
        }
        var Qt;
        if (typeof Z == "function")
          Qt = function () {
            Z(Xt);
          };
        else if (typeof MessageChannel < "u") {
          var me = new MessageChannel(),
            Jt = me.port2;
          (me.port1.onmessage = Xt),
            (Qt = function () {
              Jt.postMessage(null);
            });
        } else
          Qt = function () {
            G(Xt, 0);
          };
        function ae(M, Q) {
          F = G(function () {
            M(a.unstable_now());
          }, Q);
        }
        (a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (M) {
            M.callback = null;
          }),
          (a.unstable_forceFrameRate = function (M) {
            0 > M || 125 < M
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (lt = 0 < M ? Math.floor(1e3 / M) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return D;
          }),
          (a.unstable_next = function (M) {
            switch (D) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = D;
            }
            var $ = D;
            D = Q;
            try {
              return M();
            } finally {
              D = $;
            }
          }),
          (a.unstable_requestPaint = function () {
            _ = !0;
          }),
          (a.unstable_runWithPriority = function (M, Q) {
            switch (M) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                M = 3;
            }
            var $ = D;
            D = M;
            try {
              return Q();
            } finally {
              D = $;
            }
          }),
          (a.unstable_scheduleCallback = function (M, Q, $) {
            var vt = a.unstable_now();
            switch (
              (typeof $ == "object" && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == "number" && 0 < $ ? vt + $ : vt))
                : ($ = vt),
              M)
            ) {
              case 1:
                var bt = -1;
                break;
              case 2:
                bt = 250;
                break;
              case 5:
                bt = 1073741823;
                break;
              case 4:
                bt = 1e4;
                break;
              default:
                bt = 5e3;
            }
            return (
              (bt = $ + bt),
              (M = {
                id: g++,
                callback: Q,
                priorityLevel: M,
                startTime: $,
                expirationTime: bt,
                sortIndex: -1,
              }),
              $ > vt
                ? ((M.sortIndex = $),
                  c(y, M),
                  r(v) === null &&
                    M === r(y) &&
                    (L ? (X(F), (F = -1)) : (L = !0), ae(it, $ - vt)))
                : ((M.sortIndex = bt),
                  c(v, M),
                  R || Y || ((R = !0), St || ((St = !0), Qt()))),
              M
            );
          }),
          (a.unstable_shouldYield = Bt),
          (a.unstable_wrapCallback = function (M) {
            var Q = D;
            return function () {
              var $ = D;
              D = Q;
              try {
                return M.apply(this, arguments);
              } finally {
                D = $;
              }
            };
          });
      })(yr)),
    yr
  );
}
var tm;
function Iv() {
  return tm || ((tm = 1), (mr.exports = Pv())), mr.exports;
}
var vr = { exports: {} },
  It = {};
var em;
function tp() {
  if (em) return It;
  em = 1;
  var a = jr();
  function c(v) {
    var y = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        y += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      v +
      "; visit " +
      y +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var f = {
      d: {
        f: r,
        r: function () {
          throw Error(c(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r,
      },
      p: 0,
      findDOMNode: null,
    },
    s = Symbol.for("react.portal");
  function d(v, y, g) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: b == null ? null : "" + b,
      children: v,
      containerInfo: y,
      implementation: g,
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(v, y) {
    if (v === "font") return "";
    if (typeof y == "string") return y === "use-credentials" ? y : "";
  }
  return (
    (It.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f),
    (It.createPortal = function (v, y) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11))
        throw Error(c(299));
      return d(v, y, null, g);
    }),
    (It.flushSync = function (v) {
      var y = h.T,
        g = f.p;
      try {
        if (((h.T = null), (f.p = 2), v)) return v();
      } finally {
        (h.T = y), (f.p = g), f.d.f();
      }
    }),
    (It.preconnect = function (v, y) {
      typeof v == "string" &&
        (y
          ? ((y = y.crossOrigin),
            (y =
              typeof y == "string"
                ? y === "use-credentials"
                  ? y
                  : ""
                : void 0))
          : (y = null),
        f.d.C(v, y));
    }),
    (It.prefetchDNS = function (v) {
      typeof v == "string" && f.d.D(v);
    }),
    (It.preinit = function (v, y) {
      if (typeof v == "string" && y && typeof y.as == "string") {
        var g = y.as,
          b = p(g, y.crossOrigin),
          D = typeof y.integrity == "string" ? y.integrity : void 0,
          Y = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        g === "style"
          ? f.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: D,
              fetchPriority: Y,
            })
          : g === "script" &&
            f.d.X(v, {
              crossOrigin: b,
              integrity: D,
              fetchPriority: Y,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
      }
    }),
    (It.preinitModule = function (v, y) {
      if (typeof v == "string")
        if (typeof y == "object" && y !== null) {
          if (y.as == null || y.as === "script") {
            var g = p(y.as, y.crossOrigin);
            f.d.M(v, {
              crossOrigin: g,
              integrity: typeof y.integrity == "string" ? y.integrity : void 0,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
          }
        } else y == null && f.d.M(v);
    }),
    (It.preload = function (v, y) {
      if (
        typeof v == "string" &&
        typeof y == "object" &&
        y !== null &&
        typeof y.as == "string"
      ) {
        var g = y.as,
          b = p(g, y.crossOrigin);
        f.d.L(v, g, {
          crossOrigin: b,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority:
            typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy:
            typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet:
            typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0,
        });
      }
    }),
    (It.preloadModule = function (v, y) {
      if (typeof v == "string")
        if (y) {
          var g = p(y.as, y.crossOrigin);
          f.d.m(v, {
            as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
            crossOrigin: g,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          });
        } else f.d.m(v);
    }),
    (It.requestFormReset = function (v) {
      f.d.r(v);
    }),
    (It.unstable_batchedUpdates = function (v, y) {
      return v(y);
    }),
    (It.useFormState = function (v, y, g) {
      return h.H.useFormState(v, y, g);
    }),
    (It.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (It.version = "19.2.0"),
    It
  );
}
var lm;
function ep() {
  if (lm) return vr.exports;
  lm = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), (vr.exports = tp()), vr.exports;
}
var nm;
function lp() {
  if (nm) return Ja;
  nm = 1;
  var a = Iv(),
    c = jr(),
    r = ep();
  function f(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        e += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function d(t) {
    var e = t,
      l = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do (e = t), (e.flags & 4098) !== 0 && (l = e.return), (t = e.return);
      while (t);
    }
    return e.tag === 3 ? l : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function v(t) {
    if (d(t) !== t) throw Error(f(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(f(188));
      return e !== t ? null : t;
    }
    for (var l = t, n = e; ; ) {
      var u = l.return;
      if (u === null) break;
      var i = u.alternate;
      if (i === null) {
        if (((n = u.return), n !== null)) {
          l = n;
          continue;
        }
        break;
      }
      if (u.child === i.child) {
        for (i = u.child; i; ) {
          if (i === l) return v(u), t;
          if (i === n) return v(u), e;
          i = i.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== n.return) (l = u), (n = i);
      else {
        for (var o = !1, m = u.child; m; ) {
          if (m === l) {
            (o = !0), (l = u), (n = i);
            break;
          }
          if (m === n) {
            (o = !0), (n = u), (l = i);
            break;
          }
          m = m.sibling;
        }
        if (!o) {
          for (m = i.child; m; ) {
            if (m === l) {
              (o = !0), (l = i), (n = u);
              break;
            }
            if (m === n) {
              (o = !0), (n = i), (l = u);
              break;
            }
            m = m.sibling;
          }
          if (!o) throw Error(f(189));
        }
      }
      if (l.alternate !== n) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? t : e;
  }
  function g(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = g(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var b = Object.assign,
    D = Symbol.for("react.element"),
    Y = Symbol.for("react.transitional.element"),
    R = Symbol.for("react.portal"),
    L = Symbol.for("react.fragment"),
    _ = Symbol.for("react.strict_mode"),
    G = Symbol.for("react.profiler"),
    X = Symbol.for("react.consumer"),
    Z = Symbol.for("react.context"),
    I = Symbol.for("react.forward_ref"),
    it = Symbol.for("react.suspense"),
    St = Symbol.for("react.suspense_list"),
    F = Symbol.for("react.memo"),
    lt = Symbol.for("react.lazy"),
    ht = Symbol.for("react.activity"),
    Bt = Symbol.for("react.memo_cache_sentinel"),
    Xt = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (Xt && t[Xt]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var me = Symbol.for("react.client.reference");
  function Jt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === me ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case L:
        return "Fragment";
      case G:
        return "Profiler";
      case _:
        return "StrictMode";
      case it:
        return "Suspense";
      case St:
        return "SuspenseList";
      case ht:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case R:
          return "Portal";
        case Z:
          return t.displayName || "Context";
        case X:
          return (t._context.displayName || "Context") + ".Consumer";
        case I:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case F:
          return (
            (e = t.displayName || null), e !== null ? e : Jt(t.type) || "Memo"
          );
        case lt:
          (e = t._payload), (t = t._init);
          try {
            return Jt(t(e));
          } catch {}
      }
    return null;
  }
  var ae = Array.isArray,
    M = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    vt = [],
    bt = -1;
  function E(t) {
    return { current: t };
  }
  function B(t) {
    0 > bt || ((t.current = vt[bt]), (vt[bt] = null), bt--);
  }
  function V(t, e) {
    bt++, (vt[bt] = t.current), (t.current = e);
  }
  var K = E(null),
    tt = E(null),
    ct = E(null),
    gt = E(null);
  function le(t, e) {
    switch ((V(ct, e), V(tt, t), V(K, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? gh(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          (e = gh(e)), (t = Sh(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    B(K), V(K, t);
  }
  function Ut() {
    B(K), B(tt), B(ct);
  }
  function In(t) {
    t.memoizedState !== null && V(gt, t);
    var e = K.current,
      l = Sh(e, t.type);
    e !== l && (V(tt, t), V(K, l));
  }
  function iu(t) {
    tt.current === t && (B(K), B(tt)),
      gt.current === t && (B(gt), (Xa._currentValue = $));
  }
  var Ki, Jr;
  function Ll(t) {
    if (Ki === void 0)
      try {
        throw Error();
      } catch (l) {
        var e = l.stack.trim().match(/\n( *(at )?)/);
        (Ki = (e && e[1]) || ""),
          (Jr =
            -1 <
            l.stack.indexOf(`
at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Ki +
      t +
      Jr
    );
  }
  var Ji = !1;
  function ki(t, e) {
    if (!t || Ji) return "";
    Ji = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(q.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(q, []);
                } catch (N) {
                  var C = N;
                }
                Reflect.construct(t, [], q);
              } else {
                try {
                  q.call();
                } catch (N) {
                  C = N;
                }
                t.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                C = N;
              }
              (q = t()) &&
                typeof q.catch == "function" &&
                q.catch(function () {});
            }
          } catch (N) {
            if (N && C && typeof N.stack == "string") return [N.stack, C.stack];
          }
          return [null, null];
        },
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(n.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var i = n.DetermineComponentFrameRoot(),
        o = i[0],
        m = i[1];
      if (o && m) {
        var S = o.split(`
`),
          z = m.split(`
`);
        for (
          u = n = 0;
          n < S.length && !S[n].includes("DetermineComponentFrameRoot");

        )
          n++;
        for (; u < z.length && !z[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (n === S.length || u === z.length)
          for (
            n = S.length - 1, u = z.length - 1;
            1 <= n && 0 <= u && S[n] !== z[u];

          )
            u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (S[n] !== z[u]) {
            if (n !== 1 || u !== 1)
              do
                if ((n--, u--, 0 > u || S[n] !== z[u])) {
                  var w =
                    `
` + S[n].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      w.includes("<anonymous>") &&
                      (w = w.replace("<anonymous>", t.displayName)),
                    w
                  );
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      (Ji = !1), (Error.prepareStackTrace = l);
    }
    return (l = t ? t.displayName || t.name : "") ? Ll(l) : "";
  }
  function Ry(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ll(t.type);
      case 16:
        return Ll("Lazy");
      case 13:
        return t.child !== e && e !== null
          ? Ll("Suspense Fallback")
          : Ll("Suspense");
      case 19:
        return Ll("SuspenseList");
      case 0:
      case 15:
        return ki(t.type, !1);
      case 11:
        return ki(t.type.render, !1);
      case 1:
        return ki(t.type, !0);
      case 31:
        return Ll("Activity");
      default:
        return "";
    }
  }
  function kr(t) {
    try {
      var e = "",
        l = null;
      do (e += Ry(t, l)), (l = t), (t = t.return);
      while (t);
      return e;
    } catch (n) {
      return (
        `
Error generating stack: ` +
        n.message +
        `
` +
        n.stack
      );
    }
  }
  var Fi = Object.prototype.hasOwnProperty,
    $i = a.unstable_scheduleCallback,
    Wi = a.unstable_cancelCallback,
    _y = a.unstable_shouldYield,
    zy = a.unstable_requestPaint,
    ye = a.unstable_now,
    Cy = a.unstable_getCurrentPriorityLevel,
    Fr = a.unstable_ImmediatePriority,
    $r = a.unstable_UserBlockingPriority,
    cu = a.unstable_NormalPriority,
    xy = a.unstable_LowPriority,
    Wr = a.unstable_IdlePriority,
    Ny = a.log,
    My = a.unstable_setDisableYieldValue,
    ta = null,
    ve = null;
  function hl(t) {
    if (
      (typeof Ny == "function" && My(t),
      ve && typeof ve.setStrictMode == "function")
    )
      try {
        ve.setStrictMode(ta, t);
      } catch {}
  }
  var pe = Math.clz32 ? Math.clz32 : jy,
    Dy = Math.log,
    Uy = Math.LN2;
  function jy(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((Dy(t) / Uy) | 0)) | 0;
  }
  var fu = 256,
    ru = 262144,
    su = 4194304;
  function Yl(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ou(t, e, l) {
    var n = t.pendingLanes;
    if (n === 0) return 0;
    var u = 0,
      i = t.suspendedLanes,
      o = t.pingedLanes;
    t = t.warmLanes;
    var m = n & 134217727;
    return (
      m !== 0
        ? ((n = m & ~i),
          n !== 0
            ? (u = Yl(n))
            : ((o &= m),
              o !== 0
                ? (u = Yl(o))
                : l || ((l = m & ~t), l !== 0 && (u = Yl(l)))))
        : ((m = n & ~i),
          m !== 0
            ? (u = Yl(m))
            : o !== 0
            ? (u = Yl(o))
            : l || ((l = n & ~t), l !== 0 && (u = Yl(l)))),
      u === 0
        ? 0
        : e !== 0 &&
          e !== u &&
          (e & i) === 0 &&
          ((i = u & -u),
          (l = e & -e),
          i >= l || (i === 32 && (l & 4194048) !== 0))
        ? e
        : u
    );
  }
  function ea(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function wy(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Pr() {
    var t = su;
    return (su <<= 1), (su & 62914560) === 0 && (su = 4194304), t;
  }
  function Pi(t) {
    for (var e = [], l = 0; 31 > l; l++) e.push(t);
    return e;
  }
  function la(t, e) {
    (t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function Hy(t, e, l, n, u, i) {
    var o = t.pendingLanes;
    (t.pendingLanes = l),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= l),
      (t.entangledLanes &= l),
      (t.errorRecoveryDisabledLanes &= l),
      (t.shellSuspendCounter = 0);
    var m = t.entanglements,
      S = t.expirationTimes,
      z = t.hiddenUpdates;
    for (l = o & ~l; 0 < l; ) {
      var w = 31 - pe(l),
        q = 1 << w;
      (m[w] = 0), (S[w] = -1);
      var C = z[w];
      if (C !== null)
        for (z[w] = null, w = 0; w < C.length; w++) {
          var N = C[w];
          N !== null && (N.lane &= -536870913);
        }
      l &= ~q;
    }
    n !== 0 && Ir(t, n, 0),
      i !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(o & ~e));
  }
  function Ir(t, e, l) {
    (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
    var n = 31 - pe(e);
    (t.entangledLanes |= e),
      (t.entanglements[n] = t.entanglements[n] | 1073741824 | (l & 261930));
  }
  function ts(t, e) {
    var l = (t.entangledLanes |= e);
    for (t = t.entanglements; l; ) {
      var n = 31 - pe(l),
        u = 1 << n;
      (u & e) | (t[n] & e) && (t[n] |= e), (l &= ~u);
    }
  }
  function es(t, e) {
    var l = e & -e;
    return (
      (l = (l & 42) !== 0 ? 1 : Ii(l)),
      (l & (t.suspendedLanes | e)) !== 0 ? 0 : l
    );
  }
  function Ii(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function tc(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function ls() {
    var t = Q.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : Xh(t.type));
  }
  function ns(t, e) {
    var l = Q.p;
    try {
      return (Q.p = t), e();
    } finally {
      Q.p = l;
    }
  }
  var ml = Math.random().toString(36).slice(2),
    kt = "__reactFiber$" + ml,
    ue = "__reactProps$" + ml,
    fn = "__reactContainer$" + ml,
    ec = "__reactEvents$" + ml,
    By = "__reactListeners$" + ml,
    qy = "__reactHandles$" + ml,
    as = "__reactResources$" + ml,
    na = "__reactMarker$" + ml;
  function lc(t) {
    delete t[kt], delete t[ue], delete t[ec], delete t[By], delete t[qy];
  }
  function rn(t) {
    var e = t[kt];
    if (e) return e;
    for (var l = t.parentNode; l; ) {
      if ((e = l[fn] || l[kt])) {
        if (
          ((l = e.alternate),
          e.child !== null || (l !== null && l.child !== null))
        )
          for (t = _h(t); t !== null; ) {
            if ((l = t[kt])) return l;
            t = _h(t);
          }
        return e;
      }
      (t = l), (l = t.parentNode);
    }
    return null;
  }
  function sn(t) {
    if ((t = t[kt] || t[fn])) {
      var e = t.tag;
      if (
        e === 5 ||
        e === 6 ||
        e === 13 ||
        e === 31 ||
        e === 26 ||
        e === 27 ||
        e === 3
      )
        return t;
    }
    return null;
  }
  function aa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(f(33));
  }
  function on(t) {
    var e = t[as];
    return (
      e ||
        (e = t[as] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function Zt(t) {
    t[na] = !0;
  }
  var us = new Set(),
    is = {};
  function Gl(t, e) {
    dn(t, e), dn(t + "Capture", e);
  }
  function dn(t, e) {
    for (is[t] = e, t = 0; t < e.length; t++) us.add(e[t]);
  }
  var Ly = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    cs = {},
    fs = {};
  function Yy(t) {
    return Fi.call(fs, t)
      ? !0
      : Fi.call(cs, t)
      ? !1
      : Ly.test(t)
      ? (fs[t] = !0)
      : ((cs[t] = !0), !1);
  }
  function du(t, e, l) {
    if (Yy(e))
      if (l === null) t.removeAttribute(e);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var n = e.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + l);
      }
  }
  function hu(t, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + l);
    }
  }
  function Je(t, e, l, n) {
    if (n === null) t.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(e, l, "" + n);
    }
  }
  function Re(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function rs(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function Gy(t, e, l) {
    var n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof n < "u" &&
      typeof n.get == "function" &&
      typeof n.set == "function"
    ) {
      var u = n.get,
        i = n.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (o) {
            (l = "" + o), i.call(this, o);
          },
        }),
        Object.defineProperty(t, e, { enumerable: n.enumerable }),
        {
          getValue: function () {
            return l;
          },
          setValue: function (o) {
            l = "" + o;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[e];
          },
        }
      );
    }
  }
  function nc(t) {
    if (!t._valueTracker) {
      var e = rs(t) ? "checked" : "value";
      t._valueTracker = Gy(t, e, "" + t[e]);
    }
  }
  function ss(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var l = e.getValue(),
      n = "";
    return (
      t && (n = rs(t) ? (t.checked ? "true" : "false") : t.value),
      (t = n),
      t !== l ? (e.setValue(t), !0) : !1
    );
  }
  function mu(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Xy = /[\n"\\]/g;
  function _e(t) {
    return t.replace(Xy, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function ac(t, e, l, n, u, i, o, m) {
    (t.name = ""),
      o != null &&
      typeof o != "function" &&
      typeof o != "symbol" &&
      typeof o != "boolean"
        ? (t.type = o)
        : t.removeAttribute("type"),
      e != null
        ? o === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + Re(e))
          : t.value !== "" + Re(e) && (t.value = "" + Re(e))
        : (o !== "submit" && o !== "reset") || t.removeAttribute("value"),
      e != null
        ? uc(t, o, Re(e))
        : l != null
        ? uc(t, o, Re(l))
        : n != null && t.removeAttribute("value"),
      u == null && i != null && (t.defaultChecked = !!i),
      u != null &&
        (t.checked = u && typeof u != "function" && typeof u != "symbol"),
      m != null &&
      typeof m != "function" &&
      typeof m != "symbol" &&
      typeof m != "boolean"
        ? (t.name = "" + Re(m))
        : t.removeAttribute("name");
  }
  function os(t, e, l, n, u, i, o, m) {
    if (
      (i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (t.type = i),
      e != null || l != null)
    ) {
      if (!((i !== "submit" && i !== "reset") || e != null)) {
        nc(t);
        return;
      }
      (l = l != null ? "" + Re(l) : ""),
        (e = e != null ? "" + Re(e) : l),
        m || e === t.value || (t.value = e),
        (t.defaultValue = e);
    }
    (n = n ?? u),
      (n = typeof n != "function" && typeof n != "symbol" && !!n),
      (t.checked = m ? t.checked : !!n),
      (t.defaultChecked = !!n),
      o != null &&
        typeof o != "function" &&
        typeof o != "symbol" &&
        typeof o != "boolean" &&
        (t.name = o),
      nc(t);
  }
  function uc(t, e, l) {
    (e === "number" && mu(t.ownerDocument) === t) ||
      t.defaultValue === "" + l ||
      (t.defaultValue = "" + l);
  }
  function hn(t, e, l, n) {
    if (((t = t.options), e)) {
      e = {};
      for (var u = 0; u < l.length; u++) e["$" + l[u]] = !0;
      for (l = 0; l < t.length; l++)
        (u = e.hasOwnProperty("$" + t[l].value)),
          t[l].selected !== u && (t[l].selected = u),
          u && n && (t[l].defaultSelected = !0);
    } else {
      for (l = "" + Re(l), e = null, u = 0; u < t.length; u++) {
        if (t[u].value === l) {
          (t[u].selected = !0), n && (t[u].defaultSelected = !0);
          return;
        }
        e !== null || t[u].disabled || (e = t[u]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function ds(t, e, l) {
    if (
      e != null &&
      ((e = "" + Re(e)), e !== t.value && (t.value = e), l == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = l != null ? "" + Re(l) : "";
  }
  function hs(t, e, l, n) {
    if (e == null) {
      if (n != null) {
        if (l != null) throw Error(f(92));
        if (ae(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), (e = l);
    }
    (l = Re(e)),
      (t.defaultValue = l),
      (n = t.textContent),
      n === l && n !== "" && n !== null && (t.value = n),
      nc(t);
  }
  function mn(t, e) {
    if (e) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Qy = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ms(t, e, l) {
    var n = e.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? n
        ? t.setProperty(e, "")
        : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
      : n
      ? t.setProperty(e, l)
      : typeof l != "number" || l === 0 || Qy.has(e)
      ? e === "float"
        ? (t.cssFloat = l)
        : (t[e] = ("" + l).trim())
      : (t[e] = l + "px");
  }
  function ys(t, e, l) {
    if (e != null && typeof e != "object") throw Error(f(62));
    if (((t = t.style), l != null)) {
      for (var n in l)
        !l.hasOwnProperty(n) ||
          (e != null && e.hasOwnProperty(n)) ||
          (n.indexOf("--") === 0
            ? t.setProperty(n, "")
            : n === "float"
            ? (t.cssFloat = "")
            : (t[n] = ""));
      for (var u in e)
        (n = e[u]), e.hasOwnProperty(u) && l[u] !== n && ms(t, u, n);
    } else for (var i in e) e.hasOwnProperty(i) && ms(t, i, e[i]);
  }
  function ic(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Vy = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Zy =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yu(t) {
    return Zy.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function ke() {}
  var cc = null;
  function fc(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var yn = null,
    vn = null;
  function vs(t) {
    var e = sn(t);
    if (e && (t = e.stateNode)) {
      var l = t[ue] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (ac(
              t,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name
            ),
            (e = l.name),
            l.type === "radio" && e != null)
          ) {
            for (l = t; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + _e("" + e) + '"][type="radio"]'
              ),
                e = 0;
              e < l.length;
              e++
            ) {
              var n = l[e];
              if (n !== t && n.form === t.form) {
                var u = n[ue] || null;
                if (!u) throw Error(f(90));
                ac(
                  n,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (e = 0; e < l.length; e++)
              (n = l[e]), n.form === t.form && ss(n);
          }
          break t;
        case "textarea":
          ds(t, l.value, l.defaultValue);
          break t;
        case "select":
          (e = l.value), e != null && hn(t, !!l.multiple, e, !1);
      }
    }
  }
  var rc = !1;
  function ps(t, e, l) {
    if (rc) return t(e, l);
    rc = !0;
    try {
      var n = t(e);
      return n;
    } finally {
      if (
        ((rc = !1),
        (yn !== null || vn !== null) &&
          (li(), yn && ((e = yn), (t = vn), (vn = yn = null), vs(e), t)))
      )
        for (e = 0; e < t.length; e++) vs(t[e]);
    }
  }
  function ua(t, e) {
    var l = t.stateNode;
    if (l === null) return null;
    var n = l[ue] || null;
    if (n === null) return null;
    l = n[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (n = !n.disabled) ||
          ((t = t.type),
          (n = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !n);
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (l && typeof l != "function") throw Error(f(231, e, typeof l));
    return l;
  }
  var Fe = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    sc = !1;
  if (Fe)
    try {
      var ia = {};
      Object.defineProperty(ia, "passive", {
        get: function () {
          sc = !0;
        },
      }),
        window.addEventListener("test", ia, ia),
        window.removeEventListener("test", ia, ia);
    } catch {
      sc = !1;
    }
  var yl = null,
    oc = null,
    vu = null;
  function gs() {
    if (vu) return vu;
    var t,
      e = oc,
      l = e.length,
      n,
      u = "value" in yl ? yl.value : yl.textContent,
      i = u.length;
    for (t = 0; t < l && e[t] === u[t]; t++);
    var o = l - t;
    for (n = 1; n <= o && e[l - n] === u[i - n]; n++);
    return (vu = u.slice(t, 1 < n ? 1 - n : void 0));
  }
  function pu(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function gu() {
    return !0;
  }
  function Ss() {
    return !1;
  }
  function ie(t) {
    function e(l, n, u, i, o) {
      (this._reactName = l),
        (this._targetInst = u),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = o),
        (this.currentTarget = null);
      for (var m in t)
        t.hasOwnProperty(m) && ((l = t[m]), (this[m] = l ? l(i) : i[m]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? gu
          : Ss),
        (this.isPropagationStopped = Ss),
        this
      );
    }
    return (
      b(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = gu));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = gu));
        },
        persist: function () {},
        isPersistent: gu,
      }),
      e
    );
  }
  var Xl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Su = ie(Xl),
    ca = b({}, Xl, { view: 0, detail: 0 }),
    Ky = ie(ca),
    dc,
    hc,
    fa,
    bu = b({}, ca, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: yc,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== fa &&
              (fa && t.type === "mousemove"
                ? ((dc = t.screenX - fa.screenX), (hc = t.screenY - fa.screenY))
                : (hc = dc = 0),
              (fa = t)),
            dc);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : hc;
      },
    }),
    bs = ie(bu),
    Jy = b({}, bu, { dataTransfer: 0 }),
    ky = ie(Jy),
    Fy = b({}, ca, { relatedTarget: 0 }),
    mc = ie(Fy),
    $y = b({}, Xl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Wy = ie($y),
    Py = b({}, Xl, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    Iy = ie(Py),
    t0 = b({}, Xl, { data: 0 }),
    Es = ie(t0),
    e0 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    l0 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    n0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function a0(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = n0[t])
      ? !!e[t]
      : !1;
  }
  function yc() {
    return a0;
  }
  var u0 = b({}, ca, {
      key: function (t) {
        if (t.key) {
          var e = e0[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = pu(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
          ? l0[t.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: yc,
      charCode: function (t) {
        return t.type === "keypress" ? pu(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? pu(t)
          : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
      },
    }),
    i0 = ie(u0),
    c0 = b({}, bu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    As = ie(c0),
    f0 = b({}, ca, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yc,
    }),
    r0 = ie(f0),
    s0 = b({}, Xl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    o0 = ie(s0),
    d0 = b({}, bu, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
          ? -t.wheelDeltaX
          : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
          ? -t.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    h0 = ie(d0),
    m0 = b({}, Xl, { newState: 0, oldState: 0 }),
    y0 = ie(m0),
    v0 = [9, 13, 27, 32],
    vc = Fe && "CompositionEvent" in window,
    ra = null;
  Fe && "documentMode" in document && (ra = document.documentMode);
  var p0 = Fe && "TextEvent" in window && !ra,
    Ts = Fe && (!vc || (ra && 8 < ra && 11 >= ra)),
    Os = " ",
    Rs = !1;
  function _s(t, e) {
    switch (t) {
      case "keyup":
        return v0.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function zs(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var pn = !1;
  function g0(t, e) {
    switch (t) {
      case "compositionend":
        return zs(e);
      case "keypress":
        return e.which !== 32 ? null : ((Rs = !0), Os);
      case "textInput":
        return (t = e.data), t === Os && Rs ? null : t;
      default:
        return null;
    }
  }
  function S0(t, e) {
    if (pn)
      return t === "compositionend" || (!vc && _s(t, e))
        ? ((t = gs()), (vu = oc = yl = null), (pn = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Ts && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var b0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Cs(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!b0[t.type] : e === "textarea";
  }
  function xs(t, e, l, n) {
    yn ? (vn ? vn.push(n) : (vn = [n])) : (yn = n),
      (e = ri(e, "onChange")),
      0 < e.length &&
        ((l = new Su("onChange", "change", null, l, n)),
        t.push({ event: l, listeners: e }));
  }
  var sa = null,
    oa = null;
  function E0(t) {
    dh(t, 0);
  }
  function Eu(t) {
    var e = aa(t);
    if (ss(e)) return t;
  }
  function Ns(t, e) {
    if (t === "change") return e;
  }
  var Ms = !1;
  if (Fe) {
    var pc;
    if (Fe) {
      var gc = "oninput" in document;
      if (!gc) {
        var Ds = document.createElement("div");
        Ds.setAttribute("oninput", "return;"),
          (gc = typeof Ds.oninput == "function");
      }
      pc = gc;
    } else pc = !1;
    Ms = pc && (!document.documentMode || 9 < document.documentMode);
  }
  function Us() {
    sa && (sa.detachEvent("onpropertychange", js), (oa = sa = null));
  }
  function js(t) {
    if (t.propertyName === "value" && Eu(oa)) {
      var e = [];
      xs(e, oa, t, fc(t)), ps(E0, e);
    }
  }
  function A0(t, e, l) {
    t === "focusin"
      ? (Us(), (sa = e), (oa = l), sa.attachEvent("onpropertychange", js))
      : t === "focusout" && Us();
  }
  function T0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Eu(oa);
  }
  function O0(t, e) {
    if (t === "click") return Eu(e);
  }
  function R0(t, e) {
    if (t === "input" || t === "change") return Eu(e);
  }
  function _0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var ge = typeof Object.is == "function" ? Object.is : _0;
  function da(t, e) {
    if (ge(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var l = Object.keys(t),
      n = Object.keys(e);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!Fi.call(e, u) || !ge(t[u], e[u])) return !1;
    }
    return !0;
  }
  function ws(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Hs(t, e) {
    var l = ws(t);
    t = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (((n = t + l.textContent.length), t <= e && n >= e))
          return { node: l, offset: e - t };
        t = n;
      }
      t: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break t;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = ws(l);
    }
  }
  function Bs(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
        ? Bs(t, e.parentNode)
        : "contains" in t
        ? t.contains(e)
        : t.compareDocumentPosition
        ? !!(t.compareDocumentPosition(e) & 16)
        : !1
      : !1;
  }
  function qs(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = mu(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var l = typeof e.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) t = e.contentWindow;
      else break;
      e = mu(t.document);
    }
    return e;
  }
  function Sc(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var z0 = Fe && "documentMode" in document && 11 >= document.documentMode,
    gn = null,
    bc = null,
    ha = null,
    Ec = !1;
  function Ls(t, e, l) {
    var n =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Ec ||
      gn == null ||
      gn !== mu(n) ||
      ((n = gn),
      "selectionStart" in n && Sc(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = (
            (n.ownerDocument && n.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (ha && da(ha, n)) ||
        ((ha = n),
        (n = ri(bc, "onSelect")),
        0 < n.length &&
          ((e = new Su("onSelect", "select", null, e, l)),
          t.push({ event: e, listeners: n }),
          (e.target = gn))));
  }
  function Ql(t, e) {
    var l = {};
    return (
      (l[t.toLowerCase()] = e.toLowerCase()),
      (l["Webkit" + t] = "webkit" + e),
      (l["Moz" + t] = "moz" + e),
      l
    );
  }
  var Sn = {
      animationend: Ql("Animation", "AnimationEnd"),
      animationiteration: Ql("Animation", "AnimationIteration"),
      animationstart: Ql("Animation", "AnimationStart"),
      transitionrun: Ql("Transition", "TransitionRun"),
      transitionstart: Ql("Transition", "TransitionStart"),
      transitioncancel: Ql("Transition", "TransitionCancel"),
      transitionend: Ql("Transition", "TransitionEnd"),
    },
    Ac = {},
    Ys = {};
  Fe &&
    ((Ys = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Sn.animationend.animation,
      delete Sn.animationiteration.animation,
      delete Sn.animationstart.animation),
    "TransitionEvent" in window || delete Sn.transitionend.transition);
  function Vl(t) {
    if (Ac[t]) return Ac[t];
    if (!Sn[t]) return t;
    var e = Sn[t],
      l;
    for (l in e) if (e.hasOwnProperty(l) && l in Ys) return (Ac[t] = e[l]);
    return t;
  }
  var Gs = Vl("animationend"),
    Xs = Vl("animationiteration"),
    Qs = Vl("animationstart"),
    C0 = Vl("transitionrun"),
    x0 = Vl("transitionstart"),
    N0 = Vl("transitioncancel"),
    Vs = Vl("transitionend"),
    Zs = new Map(),
    Tc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  Tc.push("scrollEnd");
  function He(t, e) {
    Zs.set(t, e), Gl(e, [t]);
  }
  var Au =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    ze = [],
    bn = 0,
    Oc = 0;
  function Tu() {
    for (var t = bn, e = (Oc = bn = 0); e < t; ) {
      var l = ze[e];
      ze[e++] = null;
      var n = ze[e];
      ze[e++] = null;
      var u = ze[e];
      ze[e++] = null;
      var i = ze[e];
      if (((ze[e++] = null), n !== null && u !== null)) {
        var o = n.pending;
        o === null ? (u.next = u) : ((u.next = o.next), (o.next = u)),
          (n.pending = u);
      }
      i !== 0 && Ks(l, u, i);
    }
  }
  function Ou(t, e, l, n) {
    (ze[bn++] = t),
      (ze[bn++] = e),
      (ze[bn++] = l),
      (ze[bn++] = n),
      (Oc |= n),
      (t.lanes |= n),
      (t = t.alternate),
      t !== null && (t.lanes |= n);
  }
  function Rc(t, e, l, n) {
    return Ou(t, e, l, n), Ru(t);
  }
  function Zl(t, e) {
    return Ou(t, null, null, e), Ru(t);
  }
  function Ks(t, e, l) {
    t.lanes |= l;
    var n = t.alternate;
    n !== null && (n.lanes |= l);
    for (var u = !1, i = t.return; i !== null; )
      (i.childLanes |= l),
        (n = i.alternate),
        n !== null && (n.childLanes |= l),
        i.tag === 22 &&
          ((t = i.stateNode), t === null || t._visibility & 1 || (u = !0)),
        (t = i),
        (i = i.return);
    return t.tag === 3
      ? ((i = t.stateNode),
        u &&
          e !== null &&
          ((u = 31 - pe(l)),
          (t = i.hiddenUpdates),
          (n = t[u]),
          n === null ? (t[u] = [e]) : n.push(e),
          (e.lane = l | 536870912)),
        i)
      : null;
  }
  function Ru(t) {
    if (50 < wa) throw ((wa = 0), (wf = null), Error(f(185)));
    for (var e = t.return; e !== null; ) (t = e), (e = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var En = {};
  function M0(t, e, l, n) {
    (this.tag = t),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function Se(t, e, l, n) {
    return new M0(t, e, l, n);
  }
  function _c(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function $e(t, e) {
    var l = t.alternate;
    return (
      l === null
        ? ((l = Se(t.tag, e, t.key, t.mode)),
          (l.elementType = t.elementType),
          (l.type = t.type),
          (l.stateNode = t.stateNode),
          (l.alternate = t),
          (t.alternate = l))
        : ((l.pendingProps = e),
          (l.type = t.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = t.flags & 65011712),
      (l.childLanes = t.childLanes),
      (l.lanes = t.lanes),
      (l.child = t.child),
      (l.memoizedProps = t.memoizedProps),
      (l.memoizedState = t.memoizedState),
      (l.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (l.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (l.sibling = t.sibling),
      (l.index = t.index),
      (l.ref = t.ref),
      (l.refCleanup = t.refCleanup),
      l
    );
  }
  function Js(t, e) {
    t.flags &= 65011714;
    var l = t.alternate;
    return (
      l === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = l.childLanes),
          (t.lanes = l.lanes),
          (t.child = l.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = l.memoizedProps),
          (t.memoizedState = l.memoizedState),
          (t.updateQueue = l.updateQueue),
          (t.type = l.type),
          (e = l.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function _u(t, e, l, n, u, i) {
    var o = 0;
    if (((n = t), typeof t == "function")) _c(t) && (o = 1);
    else if (typeof t == "string")
      o = Hv(t, l, K.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
        ? 27
        : 5;
    else
      t: switch (t) {
        case ht:
          return (t = Se(31, l, e, u)), (t.elementType = ht), (t.lanes = i), t;
        case L:
          return Kl(l.children, u, i, e);
        case _:
          (o = 8), (u |= 24);
          break;
        case G:
          return (
            (t = Se(12, l, e, u | 2)), (t.elementType = G), (t.lanes = i), t
          );
        case it:
          return (t = Se(13, l, e, u)), (t.elementType = it), (t.lanes = i), t;
        case St:
          return (t = Se(19, l, e, u)), (t.elementType = St), (t.lanes = i), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case Z:
                o = 10;
                break t;
              case X:
                o = 9;
                break t;
              case I:
                o = 11;
                break t;
              case F:
                o = 14;
                break t;
              case lt:
                (o = 16), (n = null);
                break t;
            }
          (o = 29),
            (l = Error(f(130, t === null ? "null" : typeof t, ""))),
            (n = null);
      }
    return (
      (e = Se(o, l, e, u)), (e.elementType = t), (e.type = n), (e.lanes = i), e
    );
  }
  function Kl(t, e, l, n) {
    return (t = Se(7, t, n, e)), (t.lanes = l), t;
  }
  function zc(t, e, l) {
    return (t = Se(6, t, null, e)), (t.lanes = l), t;
  }
  function ks(t) {
    var e = Se(18, null, null, 0);
    return (e.stateNode = t), e;
  }
  function Cc(t, e, l) {
    return (
      (e = Se(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = l),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Fs = new WeakMap();
  function Ce(t, e) {
    if (typeof t == "object" && t !== null) {
      var l = Fs.get(t);
      return l !== void 0
        ? l
        : ((e = { value: t, source: e, stack: kr(e) }), Fs.set(t, e), e);
    }
    return { value: t, source: e, stack: kr(e) };
  }
  var An = [],
    Tn = 0,
    zu = null,
    ma = 0,
    xe = [],
    Ne = 0,
    vl = null,
    Ge = 1,
    Xe = "";
  function We(t, e) {
    (An[Tn++] = ma), (An[Tn++] = zu), (zu = t), (ma = e);
  }
  function $s(t, e, l) {
    (xe[Ne++] = Ge), (xe[Ne++] = Xe), (xe[Ne++] = vl), (vl = t);
    var n = Ge;
    t = Xe;
    var u = 32 - pe(n) - 1;
    (n &= ~(1 << u)), (l += 1);
    var i = 32 - pe(e) + u;
    if (30 < i) {
      var o = u - (u % 5);
      (i = (n & ((1 << o) - 1)).toString(32)),
        (n >>= o),
        (u -= o),
        (Ge = (1 << (32 - pe(e) + u)) | (l << u) | n),
        (Xe = i + t);
    } else (Ge = (1 << i) | (l << u) | n), (Xe = t);
  }
  function xc(t) {
    t.return !== null && (We(t, 1), $s(t, 1, 0));
  }
  function Nc(t) {
    for (; t === zu; )
      (zu = An[--Tn]), (An[Tn] = null), (ma = An[--Tn]), (An[Tn] = null);
    for (; t === vl; )
      (vl = xe[--Ne]),
        (xe[Ne] = null),
        (Xe = xe[--Ne]),
        (xe[Ne] = null),
        (Ge = xe[--Ne]),
        (xe[Ne] = null);
  }
  function Ws(t, e) {
    (xe[Ne++] = Ge),
      (xe[Ne++] = Xe),
      (xe[Ne++] = vl),
      (Ge = e.id),
      (Xe = e.overflow),
      (vl = t);
  }
  var Ft = null,
    zt = null,
    dt = !1,
    pl = null,
    Me = !1,
    Mc = Error(f(519));
  function gl(t) {
    var e = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (ya(Ce(e, t)), Mc);
  }
  function Ps(t) {
    var e = t.stateNode,
      l = t.type,
      n = t.memoizedProps;
    switch (((e[kt] = t), (e[ue] = n), l)) {
      case "dialog":
        rt("cancel", e), rt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        rt("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ba.length; l++) rt(Ba[l], e);
        break;
      case "source":
        rt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        rt("error", e), rt("load", e);
        break;
      case "details":
        rt("toggle", e);
        break;
      case "input":
        rt("invalid", e),
          os(
            e,
            n.value,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name,
            !0
          );
        break;
      case "select":
        rt("invalid", e);
        break;
      case "textarea":
        rt("invalid", e), hs(e, n.value, n.defaultValue, n.children);
    }
    (l = n.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      e.textContent === "" + l ||
      n.suppressHydrationWarning === !0 ||
      vh(e.textContent, l)
        ? (n.popover != null && (rt("beforetoggle", e), rt("toggle", e)),
          n.onScroll != null && rt("scroll", e),
          n.onScrollEnd != null && rt("scrollend", e),
          n.onClick != null && (e.onclick = ke),
          (e = !0))
        : (e = !1),
      e || gl(t, !0);
  }
  function Is(t) {
    for (Ft = t.return; Ft; )
      switch (Ft.tag) {
        case 5:
        case 31:
        case 13:
          Me = !1;
          return;
        case 27:
        case 3:
          Me = !0;
          return;
        default:
          Ft = Ft.return;
      }
  }
  function On(t) {
    if (t !== Ft) return !1;
    if (!dt) return Is(t), (dt = !0), !1;
    var e = t.tag,
      l;
    if (
      ((l = e !== 3 && e !== 27) &&
        ((l = e === 5) &&
          ((l = t.type),
          (l =
            !(l !== "form" && l !== "button") || $f(t.type, t.memoizedProps))),
        (l = !l)),
      l && zt && gl(t),
      Is(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(f(317));
      zt = Rh(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(f(317));
      zt = Rh(t);
    } else
      e === 27
        ? ((e = zt), Dl(t.type) ? ((t = er), (er = null), (zt = t)) : (zt = e))
        : (zt = Ft ? Ue(t.stateNode.nextSibling) : null);
    return !0;
  }
  function Jl() {
    (zt = Ft = null), (dt = !1);
  }
  function Dc() {
    var t = pl;
    return (
      t !== null &&
        (se === null ? (se = t) : se.push.apply(se, t), (pl = null)),
      t
    );
  }
  function ya(t) {
    pl === null ? (pl = [t]) : pl.push(t);
  }
  var Uc = E(null),
    kl = null,
    Pe = null;
  function Sl(t, e, l) {
    V(Uc, e._currentValue), (e._currentValue = l);
  }
  function Ie(t) {
    (t._currentValue = Uc.current), B(Uc);
  }
  function jc(t, e, l) {
    for (; t !== null; ) {
      var n = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), n !== null && (n.childLanes |= e))
          : n !== null && (n.childLanes & e) !== e && (n.childLanes |= e),
        t === l)
      )
        break;
      t = t.return;
    }
  }
  function wc(t, e, l, n) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var i = u.dependencies;
      if (i !== null) {
        var o = u.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var m = i;
          i = u;
          for (var S = 0; S < e.length; S++)
            if (m.context === e[S]) {
              (i.lanes |= l),
                (m = i.alternate),
                m !== null && (m.lanes |= l),
                jc(i.return, l, t),
                n || (o = null);
              break t;
            }
          i = m.next;
        }
      } else if (u.tag === 18) {
        if (((o = u.return), o === null)) throw Error(f(341));
        (o.lanes |= l),
          (i = o.alternate),
          i !== null && (i.lanes |= l),
          jc(o, l, t),
          (o = null);
      } else o = u.child;
      if (o !== null) o.return = u;
      else
        for (o = u; o !== null; ) {
          if (o === t) {
            o = null;
            break;
          }
          if (((u = o.sibling), u !== null)) {
            (u.return = o.return), (o = u);
            break;
          }
          o = o.return;
        }
      u = o;
    }
  }
  function Rn(t, e, l, n) {
    t = null;
    for (var u = e, i = !1; u !== null; ) {
      if (!i) {
        if ((u.flags & 524288) !== 0) i = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var o = u.alternate;
        if (o === null) throw Error(f(387));
        if (((o = o.memoizedProps), o !== null)) {
          var m = u.type;
          ge(u.pendingProps.value, o.value) ||
            (t !== null ? t.push(m) : (t = [m]));
        }
      } else if (u === gt.current) {
        if (((o = u.alternate), o === null)) throw Error(f(387));
        o.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (t !== null ? t.push(Xa) : (t = [Xa]));
      }
      u = u.return;
    }
    t !== null && wc(e, t, l, n), (e.flags |= 262144);
  }
  function Cu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ge(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Fl(t) {
    (kl = t),
      (Pe = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function $t(t) {
    return to(kl, t);
  }
  function xu(t, e) {
    return kl === null && Fl(t), to(t, e);
  }
  function to(t, e) {
    var l = e._currentValue;
    if (((e = { context: e, memoizedValue: l, next: null }), Pe === null)) {
      if (t === null) throw Error(f(308));
      (Pe = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288);
    } else Pe = Pe.next = e;
    return l;
  }
  var D0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (l, n) {
                  t.push(n);
                },
              });
            this.abort = function () {
              (e.aborted = !0),
                t.forEach(function (l) {
                  return l();
                });
            };
          },
    U0 = a.unstable_scheduleCallback,
    j0 = a.unstable_NormalPriority,
    qt = {
      $$typeof: Z,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Hc() {
    return { controller: new D0(), data: new Map(), refCount: 0 };
  }
  function va(t) {
    t.refCount--,
      t.refCount === 0 &&
        U0(j0, function () {
          t.controller.abort();
        });
  }
  var pa = null,
    Bc = 0,
    _n = 0,
    zn = null;
  function w0(t, e) {
    if (pa === null) {
      var l = (pa = []);
      (Bc = 0),
        (_n = Gf()),
        (zn = {
          status: "pending",
          value: void 0,
          then: function (n) {
            l.push(n);
          },
        });
    }
    return Bc++, e.then(eo, eo), e;
  }
  function eo() {
    if (--Bc === 0 && pa !== null) {
      zn !== null && (zn.status = "fulfilled");
      var t = pa;
      (pa = null), (_n = 0), (zn = null);
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function H0(t, e) {
    var l = [],
      n = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          l.push(u);
        },
      };
    return (
      t.then(
        function () {
          (n.status = "fulfilled"), (n.value = e);
          for (var u = 0; u < l.length; u++) (0, l[u])(e);
        },
        function (u) {
          for (n.status = "rejected", n.reason = u, u = 0; u < l.length; u++)
            (0, l[u])(void 0);
        }
      ),
      n
    );
  }
  var lo = M.S;
  M.S = function (t, e) {
    (Yd = ye()),
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        w0(t, e),
      lo !== null && lo(t, e);
  };
  var $l = E(null);
  function qc() {
    var t = $l.current;
    return t !== null ? t : _t.pooledCache;
  }
  function Nu(t, e) {
    e === null ? V($l, $l.current) : V($l, e.pool);
  }
  function no() {
    var t = qc();
    return t === null ? null : { parent: qt._currentValue, pool: t };
  }
  var Cn = Error(f(460)),
    Lc = Error(f(474)),
    Mu = Error(f(542)),
    Du = { then: function () {} };
  function ao(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function uo(t, e, l) {
    switch (
      ((l = t[l]),
      l === void 0 ? t.push(e) : l !== e && (e.then(ke, ke), (e = l)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), co(t), t);
      default:
        if (typeof e.status == "string") e.then(ke, ke);
        else {
          if (((t = _t), t !== null && 100 < t.shellSuspendCounter))
            throw Error(f(482));
          (t = e),
            (t.status = "pending"),
            t.then(
              function (n) {
                if (e.status === "pending") {
                  var u = e;
                  (u.status = "fulfilled"), (u.value = n);
                }
              },
              function (n) {
                if (e.status === "pending") {
                  var u = e;
                  (u.status = "rejected"), (u.reason = n);
                }
              }
            );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), co(t), t);
        }
        throw ((Pl = e), Cn);
    }
  }
  function Wl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function"
        ? ((Pl = l), Cn)
        : l;
    }
  }
  var Pl = null;
  function io() {
    if (Pl === null) throw Error(f(459));
    var t = Pl;
    return (Pl = null), t;
  }
  function co(t) {
    if (t === Cn || t === Mu) throw Error(f(483));
  }
  var xn = null,
    ga = 0;
  function Uu(t) {
    var e = ga;
    return (ga += 1), xn === null && (xn = []), uo(xn, t, e);
  }
  function Sa(t, e) {
    (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
  }
  function ju(t, e) {
    throw e.$$typeof === D
      ? Error(f(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          f(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t
          )
        ));
  }
  function fo(t) {
    function e(T, A) {
      if (t) {
        var O = T.deletions;
        O === null ? ((T.deletions = [A]), (T.flags |= 16)) : O.push(A);
      }
    }
    function l(T, A) {
      if (!t) return null;
      for (; A !== null; ) e(T, A), (A = A.sibling);
      return null;
    }
    function n(T) {
      for (var A = new Map(); T !== null; )
        T.key !== null ? A.set(T.key, T) : A.set(T.index, T), (T = T.sibling);
      return A;
    }
    function u(T, A) {
      return (T = $e(T, A)), (T.index = 0), (T.sibling = null), T;
    }
    function i(T, A, O) {
      return (
        (T.index = O),
        t
          ? ((O = T.alternate),
            O !== null
              ? ((O = O.index), O < A ? ((T.flags |= 67108866), A) : O)
              : ((T.flags |= 67108866), A))
          : ((T.flags |= 1048576), A)
      );
    }
    function o(T) {
      return t && T.alternate === null && (T.flags |= 67108866), T;
    }
    function m(T, A, O, H) {
      return A === null || A.tag !== 6
        ? ((A = zc(O, T.mode, H)), (A.return = T), A)
        : ((A = u(A, O)), (A.return = T), A);
    }
    function S(T, A, O, H) {
      var W = O.type;
      return W === L
        ? w(T, A, O.props.children, H, O.key)
        : A !== null &&
          (A.elementType === W ||
            (typeof W == "object" &&
              W !== null &&
              W.$$typeof === lt &&
              Wl(W) === A.type))
        ? ((A = u(A, O.props)), Sa(A, O), (A.return = T), A)
        : ((A = _u(O.type, O.key, O.props, null, T.mode, H)),
          Sa(A, O),
          (A.return = T),
          A);
    }
    function z(T, A, O, H) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== O.containerInfo ||
        A.stateNode.implementation !== O.implementation
        ? ((A = Cc(O, T.mode, H)), (A.return = T), A)
        : ((A = u(A, O.children || [])), (A.return = T), A);
    }
    function w(T, A, O, H, W) {
      return A === null || A.tag !== 7
        ? ((A = Kl(O, T.mode, H, W)), (A.return = T), A)
        : ((A = u(A, O)), (A.return = T), A);
    }
    function q(T, A, O) {
      if (
        (typeof A == "string" && A !== "") ||
        typeof A == "number" ||
        typeof A == "bigint"
      )
        return (A = zc("" + A, T.mode, O)), (A.return = T), A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case Y:
            return (
              (O = _u(A.type, A.key, A.props, null, T.mode, O)),
              Sa(O, A),
              (O.return = T),
              O
            );
          case R:
            return (A = Cc(A, T.mode, O)), (A.return = T), A;
          case lt:
            return (A = Wl(A)), q(T, A, O);
        }
        if (ae(A) || Qt(A))
          return (A = Kl(A, T.mode, O, null)), (A.return = T), A;
        if (typeof A.then == "function") return q(T, Uu(A), O);
        if (A.$$typeof === Z) return q(T, xu(T, A), O);
        ju(T, A);
      }
      return null;
    }
    function C(T, A, O, H) {
      var W = A !== null ? A.key : null;
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return W !== null ? null : m(T, A, "" + O, H);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case Y:
            return O.key === W ? S(T, A, O, H) : null;
          case R:
            return O.key === W ? z(T, A, O, H) : null;
          case lt:
            return (O = Wl(O)), C(T, A, O, H);
        }
        if (ae(O) || Qt(O)) return W !== null ? null : w(T, A, O, H, null);
        if (typeof O.then == "function") return C(T, A, Uu(O), H);
        if (O.$$typeof === Z) return C(T, A, xu(T, O), H);
        ju(T, O);
      }
      return null;
    }
    function N(T, A, O, H, W) {
      if (
        (typeof H == "string" && H !== "") ||
        typeof H == "number" ||
        typeof H == "bigint"
      )
        return (T = T.get(O) || null), m(A, T, "" + H, W);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case Y:
            return (
              (T = T.get(H.key === null ? O : H.key) || null), S(A, T, H, W)
            );
          case R:
            return (
              (T = T.get(H.key === null ? O : H.key) || null), z(A, T, H, W)
            );
          case lt:
            return (H = Wl(H)), N(T, A, O, H, W);
        }
        if (ae(H) || Qt(H)) return (T = T.get(O) || null), w(A, T, H, W, null);
        if (typeof H.then == "function") return N(T, A, O, Uu(H), W);
        if (H.$$typeof === Z) return N(T, A, O, xu(A, H), W);
        ju(A, H);
      }
      return null;
    }
    function J(T, A, O, H) {
      for (
        var W = null, mt = null, k = A, ut = (A = 0), ot = null;
        k !== null && ut < O.length;
        ut++
      ) {
        k.index > ut ? ((ot = k), (k = null)) : (ot = k.sibling);
        var yt = C(T, k, O[ut], H);
        if (yt === null) {
          k === null && (k = ot);
          break;
        }
        t && k && yt.alternate === null && e(T, k),
          (A = i(yt, A, ut)),
          mt === null ? (W = yt) : (mt.sibling = yt),
          (mt = yt),
          (k = ot);
      }
      if (ut === O.length) return l(T, k), dt && We(T, ut), W;
      if (k === null) {
        for (; ut < O.length; ut++)
          (k = q(T, O[ut], H)),
            k !== null &&
              ((A = i(k, A, ut)),
              mt === null ? (W = k) : (mt.sibling = k),
              (mt = k));
        return dt && We(T, ut), W;
      }
      for (k = n(k); ut < O.length; ut++)
        (ot = N(k, T, ut, O[ut], H)),
          ot !== null &&
            (t &&
              ot.alternate !== null &&
              k.delete(ot.key === null ? ut : ot.key),
            (A = i(ot, A, ut)),
            mt === null ? (W = ot) : (mt.sibling = ot),
            (mt = ot));
      return (
        t &&
          k.forEach(function (Bl) {
            return e(T, Bl);
          }),
        dt && We(T, ut),
        W
      );
    }
    function P(T, A, O, H) {
      if (O == null) throw Error(f(151));
      for (
        var W = null, mt = null, k = A, ut = (A = 0), ot = null, yt = O.next();
        k !== null && !yt.done;
        ut++, yt = O.next()
      ) {
        k.index > ut ? ((ot = k), (k = null)) : (ot = k.sibling);
        var Bl = C(T, k, yt.value, H);
        if (Bl === null) {
          k === null && (k = ot);
          break;
        }
        t && k && Bl.alternate === null && e(T, k),
          (A = i(Bl, A, ut)),
          mt === null ? (W = Bl) : (mt.sibling = Bl),
          (mt = Bl),
          (k = ot);
      }
      if (yt.done) return l(T, k), dt && We(T, ut), W;
      if (k === null) {
        for (; !yt.done; ut++, yt = O.next())
          (yt = q(T, yt.value, H)),
            yt !== null &&
              ((A = i(yt, A, ut)),
              mt === null ? (W = yt) : (mt.sibling = yt),
              (mt = yt));
        return dt && We(T, ut), W;
      }
      for (k = n(k); !yt.done; ut++, yt = O.next())
        (yt = N(k, T, ut, yt.value, H)),
          yt !== null &&
            (t &&
              yt.alternate !== null &&
              k.delete(yt.key === null ? ut : yt.key),
            (A = i(yt, A, ut)),
            mt === null ? (W = yt) : (mt.sibling = yt),
            (mt = yt));
      return (
        t &&
          k.forEach(function (Jv) {
            return e(T, Jv);
          }),
        dt && We(T, ut),
        W
      );
    }
    function Rt(T, A, O, H) {
      if (
        (typeof O == "object" &&
          O !== null &&
          O.type === L &&
          O.key === null &&
          (O = O.props.children),
        typeof O == "object" && O !== null)
      ) {
        switch (O.$$typeof) {
          case Y:
            t: {
              for (var W = O.key; A !== null; ) {
                if (A.key === W) {
                  if (((W = O.type), W === L)) {
                    if (A.tag === 7) {
                      l(T, A.sibling),
                        (H = u(A, O.props.children)),
                        (H.return = T),
                        (T = H);
                      break t;
                    }
                  } else if (
                    A.elementType === W ||
                    (typeof W == "object" &&
                      W !== null &&
                      W.$$typeof === lt &&
                      Wl(W) === A.type)
                  ) {
                    l(T, A.sibling),
                      (H = u(A, O.props)),
                      Sa(H, O),
                      (H.return = T),
                      (T = H);
                    break t;
                  }
                  l(T, A);
                  break;
                } else e(T, A);
                A = A.sibling;
              }
              O.type === L
                ? ((H = Kl(O.props.children, T.mode, H, O.key)),
                  (H.return = T),
                  (T = H))
                : ((H = _u(O.type, O.key, O.props, null, T.mode, H)),
                  Sa(H, O),
                  (H.return = T),
                  (T = H));
            }
            return o(T);
          case R:
            t: {
              for (W = O.key; A !== null; ) {
                if (A.key === W)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === O.containerInfo &&
                    A.stateNode.implementation === O.implementation
                  ) {
                    l(T, A.sibling),
                      (H = u(A, O.children || [])),
                      (H.return = T),
                      (T = H);
                    break t;
                  } else {
                    l(T, A);
                    break;
                  }
                else e(T, A);
                A = A.sibling;
              }
              (H = Cc(O, T.mode, H)), (H.return = T), (T = H);
            }
            return o(T);
          case lt:
            return (O = Wl(O)), Rt(T, A, O, H);
        }
        if (ae(O)) return J(T, A, O, H);
        if (Qt(O)) {
          if (((W = Qt(O)), typeof W != "function")) throw Error(f(150));
          return (O = W.call(O)), P(T, A, O, H);
        }
        if (typeof O.then == "function") return Rt(T, A, Uu(O), H);
        if (O.$$typeof === Z) return Rt(T, A, xu(T, O), H);
        ju(T, O);
      }
      return (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
        ? ((O = "" + O),
          A !== null && A.tag === 6
            ? (l(T, A.sibling), (H = u(A, O)), (H.return = T), (T = H))
            : (l(T, A), (H = zc(O, T.mode, H)), (H.return = T), (T = H)),
          o(T))
        : l(T, A);
    }
    return function (T, A, O, H) {
      try {
        ga = 0;
        var W = Rt(T, A, O, H);
        return (xn = null), W;
      } catch (k) {
        if (k === Cn || k === Mu) throw k;
        var mt = Se(29, k, null, T.mode);
        return (mt.lanes = H), (mt.return = T), mt;
      } finally {
      }
    };
  }
  var Il = fo(!0),
    ro = fo(!1),
    bl = !1;
  function Yc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Gc(t, e) {
    (t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function El(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Al(t, e, l) {
    var n = t.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (pt & 2) !== 0)) {
      var u = n.pending;
      return (
        u === null ? (e.next = e) : ((e.next = u.next), (u.next = e)),
        (n.pending = e),
        (e = Ru(t)),
        Ks(t, null, l),
        e
      );
    }
    return Ou(t, n, e, l), Ru(t);
  }
  function ba(t, e, l) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (l & 4194048) !== 0))
    ) {
      var n = e.lanes;
      (n &= t.pendingLanes), (l |= n), (e.lanes = l), ts(t, l);
    }
  }
  function Xc(t, e) {
    var l = t.updateQueue,
      n = t.alternate;
    if (n !== null && ((n = n.updateQueue), l === n)) {
      var u = null,
        i = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var o = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          i === null ? (u = i = o) : (i = i.next = o), (l = l.next);
        } while (l !== null);
        i === null ? (u = i = e) : (i = i.next = e);
      } else u = i = e;
      (l = {
        baseState: n.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks,
      }),
        (t.updateQueue = l);
      return;
    }
    (t = l.lastBaseUpdate),
      t === null ? (l.firstBaseUpdate = e) : (t.next = e),
      (l.lastBaseUpdate = e);
  }
  var Qc = !1;
  function Ea() {
    if (Qc) {
      var t = zn;
      if (t !== null) throw t;
    }
  }
  function Aa(t, e, l, n) {
    Qc = !1;
    var u = t.updateQueue;
    bl = !1;
    var i = u.firstBaseUpdate,
      o = u.lastBaseUpdate,
      m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var S = m,
        z = S.next;
      (S.next = null), o === null ? (i = z) : (o.next = z), (o = S);
      var w = t.alternate;
      w !== null &&
        ((w = w.updateQueue),
        (m = w.lastBaseUpdate),
        m !== o &&
          (m === null ? (w.firstBaseUpdate = z) : (m.next = z),
          (w.lastBaseUpdate = S)));
    }
    if (i !== null) {
      var q = u.baseState;
      (o = 0), (w = z = S = null), (m = i);
      do {
        var C = m.lane & -536870913,
          N = C !== m.lane;
        if (N ? (st & C) === C : (n & C) === C) {
          C !== 0 && C === _n && (Qc = !0),
            w !== null &&
              (w = w.next =
                {
                  lane: 0,
                  tag: m.tag,
                  payload: m.payload,
                  callback: null,
                  next: null,
                });
          t: {
            var J = t,
              P = m;
            C = e;
            var Rt = l;
            switch (P.tag) {
              case 1:
                if (((J = P.payload), typeof J == "function")) {
                  q = J.call(Rt, q, C);
                  break t;
                }
                q = J;
                break t;
              case 3:
                J.flags = (J.flags & -65537) | 128;
              case 0:
                if (
                  ((J = P.payload),
                  (C = typeof J == "function" ? J.call(Rt, q, C) : J),
                  C == null)
                )
                  break t;
                q = b({}, q, C);
                break t;
              case 2:
                bl = !0;
            }
          }
          (C = m.callback),
            C !== null &&
              ((t.flags |= 64),
              N && (t.flags |= 8192),
              (N = u.callbacks),
              N === null ? (u.callbacks = [C]) : N.push(C));
        } else
          (N = {
            lane: C,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null,
          }),
            w === null ? ((z = w = N), (S = q)) : (w = w.next = N),
            (o |= C);
        if (((m = m.next), m === null)) {
          if (((m = u.shared.pending), m === null)) break;
          (N = m),
            (m = N.next),
            (N.next = null),
            (u.lastBaseUpdate = N),
            (u.shared.pending = null);
        }
      } while (!0);
      w === null && (S = q),
        (u.baseState = S),
        (u.firstBaseUpdate = z),
        (u.lastBaseUpdate = w),
        i === null && (u.shared.lanes = 0),
        (zl |= o),
        (t.lanes = o),
        (t.memoizedState = q);
    }
  }
  function so(t, e) {
    if (typeof t != "function") throw Error(f(191, t));
    t.call(e);
  }
  function oo(t, e) {
    var l = t.callbacks;
    if (l !== null)
      for (t.callbacks = null, t = 0; t < l.length; t++) so(l[t], e);
  }
  var Nn = E(null),
    wu = E(0);
  function ho(t, e) {
    (t = fl), V(wu, t), V(Nn, e), (fl = t | e.baseLanes);
  }
  function Vc() {
    V(wu, fl), V(Nn, Nn.current);
  }
  function Zc() {
    (fl = wu.current), B(Nn), B(wu);
  }
  var be = E(null),
    De = null;
  function Tl(t) {
    var e = t.alternate;
    V(jt, jt.current & 1),
      V(be, t),
      De === null &&
        (e === null || Nn.current !== null || e.memoizedState !== null) &&
        (De = t);
  }
  function Kc(t) {
    V(jt, jt.current), V(be, t), De === null && (De = t);
  }
  function mo(t) {
    t.tag === 22
      ? (V(jt, jt.current), V(be, t), De === null && (De = t))
      : Ol();
  }
  function Ol() {
    V(jt, jt.current), V(be, be.current);
  }
  function Ee(t) {
    B(be), De === t && (De = null), B(jt);
  }
  var jt = E(0);
  function Hu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var l = e.memoizedState;
        if (l !== null && ((l = l.dehydrated), l === null || If(l) || tr(l)))
          return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        (e.child.return = e), (e = e.child);
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      (e.sibling.return = e.return), (e = e.sibling);
    }
    return null;
  }
  var tl = 0,
    nt = null,
    Tt = null,
    Lt = null,
    Bu = !1,
    Mn = !1,
    tn = !1,
    qu = 0,
    Ta = 0,
    Dn = null,
    B0 = 0;
  function Mt() {
    throw Error(f(321));
  }
  function Jc(t, e) {
    if (e === null) return !1;
    for (var l = 0; l < e.length && l < t.length; l++)
      if (!ge(t[l], e[l])) return !1;
    return !0;
  }
  function kc(t, e, l, n, u, i) {
    return (
      (tl = i),
      (nt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (M.H = t === null || t.memoizedState === null ? Wo : sf),
      (tn = !1),
      (i = l(n, u)),
      (tn = !1),
      Mn && (i = vo(e, l, n, u)),
      yo(t),
      i
    );
  }
  function yo(t) {
    M.H = _a;
    var e = Tt !== null && Tt.next !== null;
    if (((tl = 0), (Lt = Tt = nt = null), (Bu = !1), (Ta = 0), (Dn = null), e))
      throw Error(f(300));
    t === null ||
      Yt ||
      ((t = t.dependencies), t !== null && Cu(t) && (Yt = !0));
  }
  function vo(t, e, l, n) {
    nt = t;
    var u = 0;
    do {
      if ((Mn && (Dn = null), (Ta = 0), (Mn = !1), 25 <= u))
        throw Error(f(301));
      if (((u += 1), (Lt = Tt = null), t.updateQueue != null)) {
        var i = t.updateQueue;
        (i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0);
      }
      (M.H = Po), (i = e(l, n));
    } while (Mn);
    return i;
  }
  function q0() {
    var t = M.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? Oa(e) : e),
      (t = t.useState()[0]),
      (Tt !== null ? Tt.memoizedState : null) !== t && (nt.flags |= 1024),
      e
    );
  }
  function Fc() {
    var t = qu !== 0;
    return (qu = 0), t;
  }
  function $c(t, e, l) {
    (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~l);
  }
  function Wc(t) {
    if (Bu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), (t = t.next);
      }
      Bu = !1;
    }
    (tl = 0), (Lt = Tt = nt = null), (Mn = !1), (Ta = qu = 0), (Dn = null);
  }
  function ne() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return Lt === null ? (nt.memoizedState = Lt = t) : (Lt = Lt.next = t), Lt;
  }
  function wt() {
    if (Tt === null) {
      var t = nt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Tt.next;
    var e = Lt === null ? nt.memoizedState : Lt.next;
    if (e !== null) (Lt = e), (Tt = t);
    else {
      if (t === null)
        throw nt.alternate === null ? Error(f(467)) : Error(f(310));
      (Tt = t),
        (t = {
          memoizedState: Tt.memoizedState,
          baseState: Tt.baseState,
          baseQueue: Tt.baseQueue,
          queue: Tt.queue,
          next: null,
        }),
        Lt === null ? (nt.memoizedState = Lt = t) : (Lt = Lt.next = t);
    }
    return Lt;
  }
  function Lu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Oa(t) {
    var e = Ta;
    return (
      (Ta += 1),
      Dn === null && (Dn = []),
      (t = uo(Dn, t, e)),
      (e = nt),
      (Lt === null ? e.memoizedState : Lt.next) === null &&
        ((e = e.alternate),
        (M.H = e === null || e.memoizedState === null ? Wo : sf)),
      t
    );
  }
  function Yu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Oa(t);
      if (t.$$typeof === Z) return $t(t);
    }
    throw Error(f(438, String(t)));
  }
  function Pc(t) {
    var e = null,
      l = nt.updateQueue;
    if ((l !== null && (e = l.memoCache), e == null)) {
      var n = nt.alternate;
      n !== null &&
        ((n = n.updateQueue),
        n !== null &&
          ((n = n.memoCache),
          n != null &&
            (e = {
              data: n.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      l === null && ((l = Lu()), (nt.updateQueue = l)),
      (l.memoCache = e),
      (l = e.data[e.index]),
      l === void 0)
    )
      for (l = e.data[e.index] = Array(t), n = 0; n < t; n++) l[n] = Bt;
    return e.index++, l;
  }
  function el(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Gu(t) {
    var e = wt();
    return Ic(e, Tt, t);
  }
  function Ic(t, e, l) {
    var n = t.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = l;
    var u = t.baseQueue,
      i = n.pending;
    if (i !== null) {
      if (u !== null) {
        var o = u.next;
        (u.next = i.next), (i.next = o);
      }
      (e.baseQueue = u = i), (n.pending = null);
    }
    if (((i = t.baseState), u === null)) t.memoizedState = i;
    else {
      e = u.next;
      var m = (o = null),
        S = null,
        z = e,
        w = !1;
      do {
        var q = z.lane & -536870913;
        if (q !== z.lane ? (st & q) === q : (tl & q) === q) {
          var C = z.revertLane;
          if (C === 0)
            S !== null &&
              (S = S.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              q === _n && (w = !0);
          else if ((tl & C) === C) {
            (z = z.next), C === _n && (w = !0);
            continue;
          } else
            (q = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              S === null ? ((m = S = q), (o = i)) : (S = S.next = q),
              (nt.lanes |= C),
              (zl |= C);
          (q = z.action),
            tn && l(i, q),
            (i = z.hasEagerState ? z.eagerState : l(i, q));
        } else
          (C = {
            lane: q,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            S === null ? ((m = S = C), (o = i)) : (S = S.next = C),
            (nt.lanes |= q),
            (zl |= q);
        z = z.next;
      } while (z !== null && z !== e);
      if (
        (S === null ? (o = i) : (S.next = m),
        !ge(i, t.memoizedState) && ((Yt = !0), w && ((l = zn), l !== null)))
      )
        throw l;
      (t.memoizedState = i),
        (t.baseState = o),
        (t.baseQueue = S),
        (n.lastRenderedState = i);
    }
    return u === null && (n.lanes = 0), [t.memoizedState, n.dispatch];
  }
  function tf(t) {
    var e = wt(),
      l = e.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = t;
    var n = l.dispatch,
      u = l.pending,
      i = e.memoizedState;
    if (u !== null) {
      l.pending = null;
      var o = (u = u.next);
      do (i = t(i, o.action)), (o = o.next);
      while (o !== u);
      ge(i, e.memoizedState) || (Yt = !0),
        (e.memoizedState = i),
        e.baseQueue === null && (e.baseState = i),
        (l.lastRenderedState = i);
    }
    return [i, n];
  }
  function po(t, e, l) {
    var n = nt,
      u = wt(),
      i = dt;
    if (i) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else l = e();
    var o = !ge((Tt || u).memoizedState, l);
    if (
      (o && ((u.memoizedState = l), (Yt = !0)),
      (u = u.queue),
      nf(bo.bind(null, n, u, t), [t]),
      u.getSnapshot !== e || o || (Lt !== null && Lt.memoizedState.tag & 1))
    ) {
      if (
        ((n.flags |= 2048),
        Un(9, { destroy: void 0 }, So.bind(null, n, u, l, e), null),
        _t === null)
      )
        throw Error(f(349));
      i || (tl & 127) !== 0 || go(n, e, l);
    }
    return l;
  }
  function go(t, e, l) {
    (t.flags |= 16384),
      (t = { getSnapshot: e, value: l }),
      (e = nt.updateQueue),
      e === null
        ? ((e = Lu()), (nt.updateQueue = e), (e.stores = [t]))
        : ((l = e.stores), l === null ? (e.stores = [t]) : l.push(t));
  }
  function So(t, e, l, n) {
    (e.value = l), (e.getSnapshot = n), Eo(e) && Ao(t);
  }
  function bo(t, e, l) {
    return l(function () {
      Eo(e) && Ao(t);
    });
  }
  function Eo(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var l = e();
      return !ge(t, l);
    } catch {
      return !0;
    }
  }
  function Ao(t) {
    var e = Zl(t, 2);
    e !== null && oe(e, t, 2);
  }
  function ef(t) {
    var e = ne();
    if (typeof t == "function") {
      var l = t;
      if (((t = l()), tn)) {
        hl(!0);
        try {
          l();
        } finally {
          hl(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: t,
      }),
      e
    );
  }
  function To(t, e, l, n) {
    return (t.baseState = l), Ic(t, Tt, typeof n == "function" ? n : el);
  }
  function L0(t, e, l, n, u) {
    if (Vu(t)) throw Error(f(485));
    if (((t = e.action), t !== null)) {
      var i = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (o) {
          i.listeners.push(o);
        },
      };
      M.T !== null ? l(!0) : (i.isTransition = !1),
        n(i),
        (l = e.pending),
        l === null
          ? ((i.next = e.pending = i), Oo(e, i))
          : ((i.next = l.next), (e.pending = l.next = i));
    }
  }
  function Oo(t, e) {
    var l = e.action,
      n = e.payload,
      u = t.state;
    if (e.isTransition) {
      var i = M.T,
        o = {};
      M.T = o;
      try {
        var m = l(u, n),
          S = M.S;
        S !== null && S(o, m), Ro(t, e, m);
      } catch (z) {
        lf(t, e, z);
      } finally {
        i !== null && o.types !== null && (i.types = o.types), (M.T = i);
      }
    } else
      try {
        (i = l(u, n)), Ro(t, e, i);
      } catch (z) {
        lf(t, e, z);
      }
  }
  function Ro(t, e, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (n) {
            _o(t, e, n);
          },
          function (n) {
            return lf(t, e, n);
          }
        )
      : _o(t, e, l);
  }
  function _o(t, e, l) {
    (e.status = "fulfilled"),
      (e.value = l),
      zo(e),
      (t.state = l),
      (e = t.pending),
      e !== null &&
        ((l = e.next),
        l === e ? (t.pending = null) : ((l = l.next), (e.next = l), Oo(t, l)));
  }
  function lf(t, e, l) {
    var n = t.pending;
    if (((t.pending = null), n !== null)) {
      n = n.next;
      do (e.status = "rejected"), (e.reason = l), zo(e), (e = e.next);
      while (e !== n);
    }
    t.action = null;
  }
  function zo(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Co(t, e) {
    return e;
  }
  function xo(t, e) {
    if (dt) {
      var l = _t.formState;
      if (l !== null) {
        t: {
          var n = nt;
          if (dt) {
            if (zt) {
              e: {
                for (var u = zt, i = Me; u.nodeType !== 8; ) {
                  if (!i) {
                    u = null;
                    break e;
                  }
                  if (((u = Ue(u.nextSibling)), u === null)) {
                    u = null;
                    break e;
                  }
                }
                (i = u.data), (u = i === "F!" || i === "F" ? u : null);
              }
              if (u) {
                (zt = Ue(u.nextSibling)), (n = u.data === "F!");
                break t;
              }
            }
            gl(n);
          }
          n = !1;
        }
        n && (e = l[0]);
      }
    }
    return (
      (l = ne()),
      (l.memoizedState = l.baseState = e),
      (n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Co,
        lastRenderedState: e,
      }),
      (l.queue = n),
      (l = ko.bind(null, nt, n)),
      (n.dispatch = l),
      (n = ef(!1)),
      (i = rf.bind(null, nt, !1, n.queue)),
      (n = ne()),
      (u = { state: e, dispatch: null, action: t, pending: null }),
      (n.queue = u),
      (l = L0.bind(null, nt, u, i, l)),
      (u.dispatch = l),
      (n.memoizedState = t),
      [e, l, !1]
    );
  }
  function No(t) {
    var e = wt();
    return Mo(e, Tt, t);
  }
  function Mo(t, e, l) {
    if (
      ((e = Ic(t, e, Co)[0]),
      (t = Gu(el)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var n = Oa(e);
      } catch (o) {
        throw o === Cn ? Mu : o;
      }
    else n = e;
    e = wt();
    var u = e.queue,
      i = u.dispatch;
    return (
      l !== e.memoizedState &&
        ((nt.flags |= 2048),
        Un(9, { destroy: void 0 }, Y0.bind(null, u, l), null)),
      [n, i, t]
    );
  }
  function Y0(t, e) {
    t.action = e;
  }
  function Do(t) {
    var e = wt(),
      l = Tt;
    if (l !== null) return Mo(e, l, t);
    wt(), (e = e.memoizedState), (l = wt());
    var n = l.queue.dispatch;
    return (l.memoizedState = t), [e, n, !1];
  }
  function Un(t, e, l, n) {
    return (
      (t = { tag: t, create: l, deps: n, inst: e, next: null }),
      (e = nt.updateQueue),
      e === null && ((e = Lu()), (nt.updateQueue = e)),
      (l = e.lastEffect),
      l === null
        ? (e.lastEffect = t.next = t)
        : ((n = l.next), (l.next = t), (t.next = n), (e.lastEffect = t)),
      t
    );
  }
  function Uo() {
    return wt().memoizedState;
  }
  function Xu(t, e, l, n) {
    var u = ne();
    (nt.flags |= t),
      (u.memoizedState = Un(
        1 | e,
        { destroy: void 0 },
        l,
        n === void 0 ? null : n
      ));
  }
  function Qu(t, e, l, n) {
    var u = wt();
    n = n === void 0 ? null : n;
    var i = u.memoizedState.inst;
    Tt !== null && n !== null && Jc(n, Tt.memoizedState.deps)
      ? (u.memoizedState = Un(e, i, l, n))
      : ((nt.flags |= t), (u.memoizedState = Un(1 | e, i, l, n)));
  }
  function jo(t, e) {
    Xu(8390656, 8, t, e);
  }
  function nf(t, e) {
    Qu(2048, 8, t, e);
  }
  function G0(t) {
    nt.flags |= 4;
    var e = nt.updateQueue;
    if (e === null) (e = Lu()), (nt.updateQueue = e), (e.events = [t]);
    else {
      var l = e.events;
      l === null ? (e.events = [t]) : l.push(t);
    }
  }
  function wo(t) {
    var e = wt().memoizedState;
    return (
      G0({ ref: e, nextImpl: t }),
      function () {
        if ((pt & 2) !== 0) throw Error(f(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Ho(t, e) {
    return Qu(4, 2, t, e);
  }
  function Bo(t, e) {
    return Qu(4, 4, t, e);
  }
  function qo(t, e) {
    if (typeof e == "function") {
      t = t();
      var l = e(t);
      return function () {
        typeof l == "function" ? l() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Lo(t, e, l) {
    (l = l != null ? l.concat([t]) : null), Qu(4, 4, qo.bind(null, e, t), l);
  }
  function af() {}
  function Yo(t, e) {
    var l = wt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    return e !== null && Jc(e, n[1]) ? n[0] : ((l.memoizedState = [t, e]), t);
  }
  function Go(t, e) {
    var l = wt();
    e = e === void 0 ? null : e;
    var n = l.memoizedState;
    if (e !== null && Jc(e, n[1])) return n[0];
    if (((n = t()), tn)) {
      hl(!0);
      try {
        t();
      } finally {
        hl(!1);
      }
    }
    return (l.memoizedState = [n, e]), n;
  }
  function uf(t, e, l) {
    return l === void 0 || ((tl & 1073741824) !== 0 && (st & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = l), (t = Xd()), (nt.lanes |= t), (zl |= t), l);
  }
  function Xo(t, e, l, n) {
    return ge(l, e)
      ? l
      : Nn.current !== null
      ? ((t = uf(t, l, n)), ge(t, e) || (Yt = !0), t)
      : (tl & 42) === 0 || ((tl & 1073741824) !== 0 && (st & 261930) === 0)
      ? ((Yt = !0), (t.memoizedState = l))
      : ((t = Xd()), (nt.lanes |= t), (zl |= t), e);
  }
  function Qo(t, e, l, n, u) {
    var i = Q.p;
    Q.p = i !== 0 && 8 > i ? i : 8;
    var o = M.T,
      m = {};
    (M.T = m), rf(t, !1, e, l);
    try {
      var S = u(),
        z = M.S;
      if (
        (z !== null && z(m, S),
        S !== null && typeof S == "object" && typeof S.then == "function")
      ) {
        var w = H0(S, n);
        Ra(t, e, w, Oe(t));
      } else Ra(t, e, n, Oe(t));
    } catch (q) {
      Ra(t, e, { then: function () {}, status: "rejected", reason: q }, Oe());
    } finally {
      (Q.p = i),
        o !== null && m.types !== null && (o.types = m.types),
        (M.T = o);
    }
  }
  function X0() {}
  function cf(t, e, l, n) {
    if (t.tag !== 5) throw Error(f(476));
    var u = Vo(t).queue;
    Qo(
      t,
      u,
      e,
      $,
      l === null
        ? X0
        : function () {
            return Zo(t), l(n);
          }
    );
  }
  function Vo(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: $,
      },
      next: null,
    };
    var l = {};
    return (
      (e.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: el,
          lastRenderedState: l,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Zo(t) {
    var e = Vo(t);
    e.next === null && (e = t.alternate.memoizedState),
      Ra(t, e.next.queue, {}, Oe());
  }
  function ff() {
    return $t(Xa);
  }
  function Ko() {
    return wt().memoizedState;
  }
  function Jo() {
    return wt().memoizedState;
  }
  function Q0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var l = Oe();
          t = El(l);
          var n = Al(e, t, l);
          n !== null && (oe(n, e, l), ba(n, e, l)),
            (e = { cache: Hc() }),
            (t.payload = e);
          return;
      }
      e = e.return;
    }
  }
  function V0(t, e, l) {
    var n = Oe();
    (l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Vu(t)
        ? Fo(e, l)
        : ((l = Rc(t, e, l, n)), l !== null && (oe(l, t, n), $o(l, e, n)));
  }
  function ko(t, e, l) {
    var n = Oe();
    Ra(t, e, l, n);
  }
  function Ra(t, e, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Vu(t)) Fo(e, u);
    else {
      var i = t.alternate;
      if (
        t.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = e.lastRenderedReducer), i !== null)
      )
        try {
          var o = e.lastRenderedState,
            m = i(o, l);
          if (((u.hasEagerState = !0), (u.eagerState = m), ge(m, o)))
            return Ou(t, e, u, 0), _t === null && Tu(), !1;
        } catch {
        } finally {
        }
      if (((l = Rc(t, e, u, n)), l !== null))
        return oe(l, t, n), $o(l, e, n), !0;
    }
    return !1;
  }
  function rf(t, e, l, n) {
    if (
      ((n = {
        lane: 2,
        revertLane: Gf(),
        gesture: null,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Vu(t))
    ) {
      if (e) throw Error(f(479));
    } else (e = Rc(t, l, n, 2)), e !== null && oe(e, t, 2);
  }
  function Vu(t) {
    var e = t.alternate;
    return t === nt || (e !== null && e === nt);
  }
  function Fo(t, e) {
    Mn = Bu = !0;
    var l = t.pending;
    l === null ? (e.next = e) : ((e.next = l.next), (l.next = e)),
      (t.pending = e);
  }
  function $o(t, e, l) {
    if ((l & 4194048) !== 0) {
      var n = e.lanes;
      (n &= t.pendingLanes), (l |= n), (e.lanes = l), ts(t, l);
    }
  }
  var _a = {
    readContext: $t,
    use: Yu,
    useCallback: Mt,
    useContext: Mt,
    useEffect: Mt,
    useImperativeHandle: Mt,
    useLayoutEffect: Mt,
    useInsertionEffect: Mt,
    useMemo: Mt,
    useReducer: Mt,
    useRef: Mt,
    useState: Mt,
    useDebugValue: Mt,
    useDeferredValue: Mt,
    useTransition: Mt,
    useSyncExternalStore: Mt,
    useId: Mt,
    useHostTransitionStatus: Mt,
    useFormState: Mt,
    useActionState: Mt,
    useOptimistic: Mt,
    useMemoCache: Mt,
    useCacheRefresh: Mt,
  };
  _a.useEffectEvent = Mt;
  var Wo = {
      readContext: $t,
      use: Yu,
      useCallback: function (t, e) {
        return (ne().memoizedState = [t, e === void 0 ? null : e]), t;
      },
      useContext: $t,
      useEffect: jo,
      useImperativeHandle: function (t, e, l) {
        (l = l != null ? l.concat([t]) : null),
          Xu(4194308, 4, qo.bind(null, e, t), l);
      },
      useLayoutEffect: function (t, e) {
        return Xu(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        Xu(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var l = ne();
        e = e === void 0 ? null : e;
        var n = t();
        if (tn) {
          hl(!0);
          try {
            t();
          } finally {
            hl(!1);
          }
        }
        return (l.memoizedState = [n, e]), n;
      },
      useReducer: function (t, e, l) {
        var n = ne();
        if (l !== void 0) {
          var u = l(e);
          if (tn) {
            hl(!0);
            try {
              l(e);
            } finally {
              hl(!1);
            }
          }
        } else u = e;
        return (
          (n.memoizedState = n.baseState = u),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: u,
          }),
          (n.queue = t),
          (t = t.dispatch = V0.bind(null, nt, t)),
          [n.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = ne();
        return (t = { current: t }), (e.memoizedState = t);
      },
      useState: function (t) {
        t = ef(t);
        var e = t.queue,
          l = ko.bind(null, nt, e);
        return (e.dispatch = l), [t.memoizedState, l];
      },
      useDebugValue: af,
      useDeferredValue: function (t, e) {
        var l = ne();
        return uf(l, t, e);
      },
      useTransition: function () {
        var t = ef(!1);
        return (
          (t = Qo.bind(null, nt, t.queue, !0, !1)),
          (ne().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, l) {
        var n = nt,
          u = ne();
        if (dt) {
          if (l === void 0) throw Error(f(407));
          l = l();
        } else {
          if (((l = e()), _t === null)) throw Error(f(349));
          (st & 127) !== 0 || go(n, e, l);
        }
        u.memoizedState = l;
        var i = { value: l, getSnapshot: e };
        return (
          (u.queue = i),
          jo(bo.bind(null, n, i, t), [t]),
          (n.flags |= 2048),
          Un(9, { destroy: void 0 }, So.bind(null, n, i, l, e), null),
          l
        );
      },
      useId: function () {
        var t = ne(),
          e = _t.identifierPrefix;
        if (dt) {
          var l = Xe,
            n = Ge;
          (l = (n & ~(1 << (32 - pe(n) - 1))).toString(32) + l),
            (e = "_" + e + "R_" + l),
            (l = qu++),
            0 < l && (e += "H" + l.toString(32)),
            (e += "_");
        } else (l = B0++), (e = "_" + e + "r_" + l.toString(32) + "_");
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: ff,
      useFormState: xo,
      useActionState: xo,
      useOptimistic: function (t) {
        var e = ne();
        e.memoizedState = e.baseState = t;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = l),
          (e = rf.bind(null, nt, !0, l)),
          (l.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: Pc,
      useCacheRefresh: function () {
        return (ne().memoizedState = Q0.bind(null, nt));
      },
      useEffectEvent: function (t) {
        var e = ne(),
          l = { impl: t };
        return (
          (e.memoizedState = l),
          function () {
            if ((pt & 2) !== 0) throw Error(f(440));
            return l.impl.apply(void 0, arguments);
          }
        );
      },
    },
    sf = {
      readContext: $t,
      use: Yu,
      useCallback: Yo,
      useContext: $t,
      useEffect: nf,
      useImperativeHandle: Lo,
      useInsertionEffect: Ho,
      useLayoutEffect: Bo,
      useMemo: Go,
      useReducer: Gu,
      useRef: Uo,
      useState: function () {
        return Gu(el);
      },
      useDebugValue: af,
      useDeferredValue: function (t, e) {
        var l = wt();
        return Xo(l, Tt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = Gu(el)[0],
          e = wt().memoizedState;
        return [typeof t == "boolean" ? t : Oa(t), e];
      },
      useSyncExternalStore: po,
      useId: Ko,
      useHostTransitionStatus: ff,
      useFormState: No,
      useActionState: No,
      useOptimistic: function (t, e) {
        var l = wt();
        return To(l, Tt, t, e);
      },
      useMemoCache: Pc,
      useCacheRefresh: Jo,
    };
  sf.useEffectEvent = wo;
  var Po = {
    readContext: $t,
    use: Yu,
    useCallback: Yo,
    useContext: $t,
    useEffect: nf,
    useImperativeHandle: Lo,
    useInsertionEffect: Ho,
    useLayoutEffect: Bo,
    useMemo: Go,
    useReducer: tf,
    useRef: Uo,
    useState: function () {
      return tf(el);
    },
    useDebugValue: af,
    useDeferredValue: function (t, e) {
      var l = wt();
      return Tt === null ? uf(l, t, e) : Xo(l, Tt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = tf(el)[0],
        e = wt().memoizedState;
      return [typeof t == "boolean" ? t : Oa(t), e];
    },
    useSyncExternalStore: po,
    useId: Ko,
    useHostTransitionStatus: ff,
    useFormState: Do,
    useActionState: Do,
    useOptimistic: function (t, e) {
      var l = wt();
      return Tt !== null
        ? To(l, Tt, t, e)
        : ((l.baseState = t), [t, l.queue.dispatch]);
    },
    useMemoCache: Pc,
    useCacheRefresh: Jo,
  };
  Po.useEffectEvent = wo;
  function of(t, e, l, n) {
    (e = t.memoizedState),
      (l = l(n, e)),
      (l = l == null ? e : b({}, e, l)),
      (t.memoizedState = l),
      t.lanes === 0 && (t.updateQueue.baseState = l);
  }
  var df = {
    enqueueSetState: function (t, e, l) {
      t = t._reactInternals;
      var n = Oe(),
        u = El(n);
      (u.payload = e),
        l != null && (u.callback = l),
        (e = Al(t, u, n)),
        e !== null && (oe(e, t, n), ba(e, t, n));
    },
    enqueueReplaceState: function (t, e, l) {
      t = t._reactInternals;
      var n = Oe(),
        u = El(n);
      (u.tag = 1),
        (u.payload = e),
        l != null && (u.callback = l),
        (e = Al(t, u, n)),
        e !== null && (oe(e, t, n), ba(e, t, n));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var l = Oe(),
        n = El(l);
      (n.tag = 2),
        e != null && (n.callback = e),
        (e = Al(t, n, l)),
        e !== null && (oe(e, t, l), ba(e, t, l));
    },
  };
  function Io(t, e, l, n, u, i, o) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(n, i, o)
        : e.prototype && e.prototype.isPureReactComponent
        ? !da(l, n) || !da(u, i)
        : !0
    );
  }
  function td(t, e, l, n) {
    (t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(l, n),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(l, n),
      e.state !== t && df.enqueueReplaceState(e, e.state, null);
  }
  function en(t, e) {
    var l = e;
    if ("ref" in e) {
      l = {};
      for (var n in e) n !== "ref" && (l[n] = e[n]);
    }
    if ((t = t.defaultProps)) {
      l === e && (l = b({}, l));
      for (var u in t) l[u] === void 0 && (l[u] = t[u]);
    }
    return l;
  }
  function ed(t) {
    Au(t);
  }
  function ld(t) {
    console.error(t);
  }
  function nd(t) {
    Au(t);
  }
  function Zu(t, e) {
    try {
      var l = t.onUncaughtError;
      l(e.value, { componentStack: e.stack });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function ad(t, e, l) {
    try {
      var n = t.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function hf(t, e, l) {
    return (
      (l = El(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        Zu(t, e);
      }),
      l
    );
  }
  function ud(t) {
    return (t = El(t)), (t.tag = 3), t;
  }
  function id(t, e, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var i = n.value;
      (t.payload = function () {
        return u(i);
      }),
        (t.callback = function () {
          ad(e, l, n);
        });
    }
    var o = l.stateNode;
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (t.callback = function () {
        ad(e, l, n),
          typeof u != "function" &&
            (Cl === null ? (Cl = new Set([this])) : Cl.add(this));
        var m = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: m !== null ? m : "",
        });
      });
  }
  function Z0(t, e, l, n, u) {
    if (
      ((l.flags |= 32768),
      n !== null && typeof n == "object" && typeof n.then == "function")
    ) {
      if (
        ((e = l.alternate),
        e !== null && Rn(e, l, u, !0),
        (l = be.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 31:
          case 13:
            return (
              De === null ? ni() : l.alternate === null && Dt === 0 && (Dt = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = u),
              n === Du
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null ? (l.updateQueue = new Set([n])) : e.add(n),
                  qf(t, n, u)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              n === Du
                ? (l.flags |= 16384)
                : ((e = l.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([n]),
                      }),
                      (l.updateQueue = e))
                    : ((l = e.retryQueue),
                      l === null ? (e.retryQueue = new Set([n])) : l.add(n)),
                  qf(t, n, u)),
              !1
            );
        }
        throw Error(f(435, l.tag));
      }
      return qf(t, n, u), ni(), !1;
    }
    if (dt)
      return (
        (e = be.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = u),
            n !== Mc && ((t = Error(f(422), { cause: n })), ya(Ce(t, l))))
          : (n !== Mc && ((e = Error(f(423), { cause: n })), ya(Ce(e, l))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (u &= -u),
            (t.lanes |= u),
            (n = Ce(n, l)),
            (u = hf(t.stateNode, n, u)),
            Xc(t, u),
            Dt !== 4 && (Dt = 2)),
        !1
      );
    var i = Error(f(520), { cause: n });
    if (
      ((i = Ce(i, l)),
      ja === null ? (ja = [i]) : ja.push(i),
      Dt !== 4 && (Dt = 2),
      e === null)
    )
      return !0;
    (n = Ce(n, l)), (l = e);
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (t = u & -u),
            (l.lanes |= t),
            (t = hf(l.stateNode, n, t)),
            Xc(l, t),
            !1
          );
        case 1:
          if (
            ((e = l.type),
            (i = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (i !== null &&
                  typeof i.componentDidCatch == "function" &&
                  (Cl === null || !Cl.has(i)))))
          )
            return (
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (u = ud(u)),
              id(u, t, l, n),
              Xc(l, u),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var mf = Error(f(461)),
    Yt = !1;
  function Wt(t, e, l, n) {
    e.child = t === null ? ro(e, null, l, n) : Il(e, t.child, l, n);
  }
  function cd(t, e, l, n, u) {
    l = l.render;
    var i = e.ref;
    if ("ref" in n) {
      var o = {};
      for (var m in n) m !== "ref" && (o[m] = n[m]);
    } else o = n;
    return (
      Fl(e),
      (n = kc(t, e, l, o, i, u)),
      (m = Fc()),
      t !== null && !Yt
        ? ($c(t, e, u), ll(t, e, u))
        : (dt && m && xc(e), (e.flags |= 1), Wt(t, e, n, u), e.child)
    );
  }
  function fd(t, e, l, n, u) {
    if (t === null) {
      var i = l.type;
      return typeof i == "function" &&
        !_c(i) &&
        i.defaultProps === void 0 &&
        l.compare === null
        ? ((e.tag = 15), (e.type = i), rd(t, e, i, n, u))
        : ((t = _u(l.type, null, n, e, e.mode, u)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((i = t.child), !Af(t, u))) {
      var o = i.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : da), l(o, n) && t.ref === e.ref)
      )
        return ll(t, e, u);
    }
    return (
      (e.flags |= 1),
      (t = $e(i, n)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function rd(t, e, l, n, u) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (da(i, n) && t.ref === e.ref)
        if (((Yt = !1), (e.pendingProps = n = i), Af(t, u)))
          (t.flags & 131072) !== 0 && (Yt = !0);
        else return (e.lanes = t.lanes), ll(t, e, u);
    }
    return yf(t, e, l, n, u);
  }
  function sd(t, e, l, n) {
    var u = n.children,
      i = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      n.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((i = i !== null ? i.baseLanes | l : l), t !== null)) {
          for (n = e.child = t.child, u = 0; n !== null; )
            (u = u | n.lanes | n.childLanes), (n = n.sibling);
          n = u & ~i;
        } else (n = 0), (e.child = null);
        return od(t, e, i, l, n);
      }
      if ((l & 536870912) !== 0)
        (e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && Nu(e, i !== null ? i.cachePool : null),
          i !== null ? ho(e, i) : Vc(),
          mo(e);
      else
        return (
          (n = e.lanes = 536870912),
          od(t, e, i !== null ? i.baseLanes | l : l, l, n)
        );
    } else
      i !== null
        ? (Nu(e, i.cachePool), ho(e, i), Ol(), (e.memoizedState = null))
        : (t !== null && Nu(e, null), Vc(), Ol());
    return Wt(t, e, u, l), e.child;
  }
  function za(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function od(t, e, l, n, u) {
    var i = qc();
    return (
      (i = i === null ? null : { parent: qt._currentValue, pool: i }),
      (e.memoizedState = { baseLanes: l, cachePool: i }),
      t !== null && Nu(e, null),
      Vc(),
      mo(e),
      t !== null && Rn(t, e, n, !0),
      (e.childLanes = u),
      null
    );
  }
  function Ku(t, e) {
    return (
      (e = ku({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function dd(t, e, l) {
    return (
      Il(e, t.child, null, l),
      (t = Ku(e, e.pendingProps)),
      (t.flags |= 2),
      Ee(e),
      (e.memoizedState = null),
      t
    );
  }
  function K0(t, e, l) {
    var n = e.pendingProps,
      u = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (dt) {
        if (n.mode === "hidden")
          return (t = Ku(e, n)), (e.lanes = 536870912), za(null, t);
        if (
          (Kc(e),
          (t = zt)
            ? ((t = Oh(t, Me)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: vl !== null ? { id: Ge, overflow: Xe } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = ks(t)),
                (l.return = e),
                (e.child = l),
                (Ft = e),
                (zt = null)))
            : (t = null),
          t === null)
        )
          throw gl(e);
        return (e.lanes = 536870912), null;
      }
      return Ku(e, n);
    }
    var i = t.memoizedState;
    if (i !== null) {
      var o = i.dehydrated;
      if ((Kc(e), u))
        if (e.flags & 256) (e.flags &= -257), (e = dd(t, e, l));
        else if (e.memoizedState !== null)
          (e.child = t.child), (e.flags |= 128), (e = null);
        else throw Error(f(558));
      else if (
        (Yt || Rn(t, e, l, !1), (u = (l & t.childLanes) !== 0), Yt || u)
      ) {
        if (
          ((n = _t),
          n !== null && ((o = es(n, l)), o !== 0 && o !== i.retryLane))
        )
          throw ((i.retryLane = o), Zl(t, o), oe(n, t, o), mf);
        ni(), (e = dd(t, e, l));
      } else
        (t = i.treeContext),
          (zt = Ue(o.nextSibling)),
          (Ft = e),
          (dt = !0),
          (pl = null),
          (Me = !1),
          t !== null && Ws(e, t),
          (e = Ku(e, n)),
          (e.flags |= 4096);
      return e;
    }
    return (
      (t = $e(t.child, { mode: n.mode, children: n.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Ju(t, e) {
    var l = e.ref;
    if (l === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(f(284));
      (t === null || t.ref !== l) && (e.flags |= 4194816);
    }
  }
  function yf(t, e, l, n, u) {
    return (
      Fl(e),
      (l = kc(t, e, l, n, void 0, u)),
      (n = Fc()),
      t !== null && !Yt
        ? ($c(t, e, u), ll(t, e, u))
        : (dt && n && xc(e), (e.flags |= 1), Wt(t, e, l, u), e.child)
    );
  }
  function hd(t, e, l, n, u, i) {
    return (
      Fl(e),
      (e.updateQueue = null),
      (l = vo(e, n, l, u)),
      yo(t),
      (n = Fc()),
      t !== null && !Yt
        ? ($c(t, e, i), ll(t, e, i))
        : (dt && n && xc(e), (e.flags |= 1), Wt(t, e, l, i), e.child)
    );
  }
  function md(t, e, l, n, u) {
    if ((Fl(e), e.stateNode === null)) {
      var i = En,
        o = l.contextType;
      typeof o == "object" && o !== null && (i = $t(o)),
        (i = new l(n, i)),
        (e.memoizedState =
          i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = df),
        (e.stateNode = i),
        (i._reactInternals = e),
        (i = e.stateNode),
        (i.props = n),
        (i.state = e.memoizedState),
        (i.refs = {}),
        Yc(e),
        (o = l.contextType),
        (i.context = typeof o == "object" && o !== null ? $t(o) : En),
        (i.state = e.memoizedState),
        (o = l.getDerivedStateFromProps),
        typeof o == "function" && (of(e, l, o, n), (i.state = e.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function" ||
          (typeof i.UNSAFE_componentWillMount != "function" &&
            typeof i.componentWillMount != "function") ||
          ((o = i.state),
          typeof i.componentWillMount == "function" && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == "function" &&
            i.UNSAFE_componentWillMount(),
          o !== i.state && df.enqueueReplaceState(i, i.state, null),
          Aa(e, n, i, u),
          Ea(),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == "function" && (e.flags |= 4194308),
        (n = !0);
    } else if (t === null) {
      i = e.stateNode;
      var m = e.memoizedProps,
        S = en(l, m);
      i.props = S;
      var z = i.context,
        w = l.contextType;
      (o = En), typeof w == "object" && w !== null && (o = $t(w));
      var q = l.getDerivedStateFromProps;
      (w =
        typeof q == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function"),
        (m = e.pendingProps !== m),
        w ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((m || z !== o) && td(e, i, n, o)),
        (bl = !1);
      var C = e.memoizedState;
      (i.state = C),
        Aa(e, n, i, u),
        Ea(),
        (z = e.memoizedState),
        m || C !== z || bl
          ? (typeof q == "function" && (of(e, l, q, n), (z = e.memoizedState)),
            (S = bl || Io(e, l, S, n, C, z, o))
              ? (w ||
                  (typeof i.UNSAFE_componentWillMount != "function" &&
                    typeof i.componentWillMount != "function") ||
                  (typeof i.componentWillMount == "function" &&
                    i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == "function" &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof i.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = n),
                (e.memoizedState = z)),
            (i.props = n),
            (i.state = z),
            (i.context = o),
            (n = S))
          : (typeof i.componentDidMount == "function" && (e.flags |= 4194308),
            (n = !1));
    } else {
      (i = e.stateNode),
        Gc(t, e),
        (o = e.memoizedProps),
        (w = en(l, o)),
        (i.props = w),
        (q = e.pendingProps),
        (C = i.context),
        (z = l.contextType),
        (S = En),
        typeof z == "object" && z !== null && (S = $t(z)),
        (m = l.getDerivedStateFromProps),
        (z =
          typeof m == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function") ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((o !== q || C !== S) && td(e, i, n, S)),
        (bl = !1),
        (C = e.memoizedState),
        (i.state = C),
        Aa(e, n, i, u),
        Ea();
      var N = e.memoizedState;
      o !== q ||
      C !== N ||
      bl ||
      (t !== null && t.dependencies !== null && Cu(t.dependencies))
        ? (typeof m == "function" && (of(e, l, m, n), (N = e.memoizedState)),
          (w =
            bl ||
            Io(e, l, w, n, C, N, S) ||
            (t !== null && t.dependencies !== null && Cu(t.dependencies)))
            ? (z ||
                (typeof i.UNSAFE_componentWillUpdate != "function" &&
                  typeof i.componentWillUpdate != "function") ||
                (typeof i.componentWillUpdate == "function" &&
                  i.componentWillUpdate(n, N, S),
                typeof i.UNSAFE_componentWillUpdate == "function" &&
                  i.UNSAFE_componentWillUpdate(n, N, S)),
              typeof i.componentDidUpdate == "function" && (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof i.componentDidUpdate != "function" ||
                (o === t.memoizedProps && C === t.memoizedState) ||
                (e.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                (o === t.memoizedProps && C === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = n),
              (e.memoizedState = N)),
          (i.props = n),
          (i.state = N),
          (i.context = S),
          (n = w))
        : (typeof i.componentDidUpdate != "function" ||
            (o === t.memoizedProps && C === t.memoizedState) ||
            (e.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != "function" ||
            (o === t.memoizedProps && C === t.memoizedState) ||
            (e.flags |= 1024),
          (n = !1));
    }
    return (
      (i = n),
      Ju(t, e),
      (n = (e.flags & 128) !== 0),
      i || n
        ? ((i = e.stateNode),
          (l =
            n && typeof l.getDerivedStateFromError != "function"
              ? null
              : i.render()),
          (e.flags |= 1),
          t !== null && n
            ? ((e.child = Il(e, t.child, null, u)),
              (e.child = Il(e, null, l, u)))
            : Wt(t, e, l, u),
          (e.memoizedState = i.state),
          (t = e.child))
        : (t = ll(t, e, u)),
      t
    );
  }
  function yd(t, e, l, n) {
    return Jl(), (e.flags |= 256), Wt(t, e, l, n), e.child;
  }
  var vf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function pf(t) {
    return { baseLanes: t, cachePool: no() };
  }
  function gf(t, e, l) {
    return (t = t !== null ? t.childLanes & ~l : 0), e && (t |= Te), t;
  }
  function vd(t, e, l) {
    var n = e.pendingProps,
      u = !1,
      i = (e.flags & 128) !== 0,
      o;
    if (
      ((o = i) ||
        (o =
          t !== null && t.memoizedState === null ? !1 : (jt.current & 2) !== 0),
      o && ((u = !0), (e.flags &= -129)),
      (o = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (dt) {
        if (
          (u ? Tl(e) : Ol(),
          (t = zt)
            ? ((t = Oh(t, Me)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: vl !== null ? { id: Ge, overflow: Xe } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (l = ks(t)),
                (l.return = e),
                (e.child = l),
                (Ft = e),
                (zt = null)))
            : (t = null),
          t === null)
        )
          throw gl(e);
        return tr(t) ? (e.lanes = 32) : (e.lanes = 536870912), null;
      }
      var m = n.children;
      return (
        (n = n.fallback),
        u
          ? (Ol(),
            (u = e.mode),
            (m = ku({ mode: "hidden", children: m }, u)),
            (n = Kl(n, u, l, null)),
            (m.return = e),
            (n.return = e),
            (m.sibling = n),
            (e.child = m),
            (n = e.child),
            (n.memoizedState = pf(l)),
            (n.childLanes = gf(t, o, l)),
            (e.memoizedState = vf),
            za(null, n))
          : (Tl(e), Sf(e, m))
      );
    }
    var S = t.memoizedState;
    if (S !== null && ((m = S.dehydrated), m !== null)) {
      if (i)
        e.flags & 256
          ? (Tl(e), (e.flags &= -257), (e = bf(t, e, l)))
          : e.memoizedState !== null
          ? (Ol(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (Ol(),
            (m = n.fallback),
            (u = e.mode),
            (n = ku({ mode: "visible", children: n.children }, u)),
            (m = Kl(m, u, l, null)),
            (m.flags |= 2),
            (n.return = e),
            (m.return = e),
            (n.sibling = m),
            (e.child = n),
            Il(e, t.child, null, l),
            (n = e.child),
            (n.memoizedState = pf(l)),
            (n.childLanes = gf(t, o, l)),
            (e.memoizedState = vf),
            (e = za(null, n)));
      else if ((Tl(e), tr(m))) {
        if (((o = m.nextSibling && m.nextSibling.dataset), o)) var z = o.dgst;
        (o = z),
          (n = Error(f(419))),
          (n.stack = ""),
          (n.digest = o),
          ya({ value: n, source: null, stack: null }),
          (e = bf(t, e, l));
      } else if (
        (Yt || Rn(t, e, l, !1), (o = (l & t.childLanes) !== 0), Yt || o)
      ) {
        if (
          ((o = _t),
          o !== null && ((n = es(o, l)), n !== 0 && n !== S.retryLane))
        )
          throw ((S.retryLane = n), Zl(t, n), oe(o, t, n), mf);
        If(m) || ni(), (e = bf(t, e, l));
      } else
        If(m)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = S.treeContext),
            (zt = Ue(m.nextSibling)),
            (Ft = e),
            (dt = !0),
            (pl = null),
            (Me = !1),
            t !== null && Ws(e, t),
            (e = Sf(e, n.children)),
            (e.flags |= 4096));
      return e;
    }
    return u
      ? (Ol(),
        (m = n.fallback),
        (u = e.mode),
        (S = t.child),
        (z = S.sibling),
        (n = $e(S, { mode: "hidden", children: n.children })),
        (n.subtreeFlags = S.subtreeFlags & 65011712),
        z !== null ? (m = $e(z, m)) : ((m = Kl(m, u, l, null)), (m.flags |= 2)),
        (m.return = e),
        (n.return = e),
        (n.sibling = m),
        (e.child = n),
        za(null, n),
        (n = e.child),
        (m = t.child.memoizedState),
        m === null
          ? (m = pf(l))
          : ((u = m.cachePool),
            u !== null
              ? ((S = qt._currentValue),
                (u = u.parent !== S ? { parent: S, pool: S } : u))
              : (u = no()),
            (m = { baseLanes: m.baseLanes | l, cachePool: u })),
        (n.memoizedState = m),
        (n.childLanes = gf(t, o, l)),
        (e.memoizedState = vf),
        za(t.child, n))
      : (Tl(e),
        (l = t.child),
        (t = l.sibling),
        (l = $e(l, { mode: "visible", children: n.children })),
        (l.return = e),
        (l.sibling = null),
        t !== null &&
          ((o = e.deletions),
          o === null ? ((e.deletions = [t]), (e.flags |= 16)) : o.push(t)),
        (e.child = l),
        (e.memoizedState = null),
        l);
  }
  function Sf(t, e) {
    return (
      (e = ku({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function ku(t, e) {
    return (t = Se(22, t, null, e)), (t.lanes = 0), t;
  }
  function bf(t, e, l) {
    return (
      Il(e, t.child, null, l),
      (t = Sf(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function pd(t, e, l) {
    t.lanes |= e;
    var n = t.alternate;
    n !== null && (n.lanes |= e), jc(t.return, e, l);
  }
  function Ef(t, e, l, n, u, i) {
    var o = t.memoizedState;
    o === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: l,
          tailMode: u,
          treeForkCount: i,
        })
      : ((o.isBackwards = e),
        (o.rendering = null),
        (o.renderingStartTime = 0),
        (o.last = n),
        (o.tail = l),
        (o.tailMode = u),
        (o.treeForkCount = i));
  }
  function gd(t, e, l) {
    var n = e.pendingProps,
      u = n.revealOrder,
      i = n.tail;
    n = n.children;
    var o = jt.current,
      m = (o & 2) !== 0;
    if (
      (m ? ((o = (o & 1) | 2), (e.flags |= 128)) : (o &= 1),
      V(jt, o),
      Wt(t, e, n, l),
      (n = dt ? ma : 0),
      !m && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && pd(t, l, e);
        else if (t.tag === 19) pd(t, l, e);
        else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    switch (u) {
      case "forwards":
        for (l = e.child, u = null; l !== null; )
          (t = l.alternate),
            t !== null && Hu(t) === null && (u = l),
            (l = l.sibling);
        (l = u),
          l === null
            ? ((u = e.child), (e.child = null))
            : ((u = l.sibling), (l.sibling = null)),
          Ef(e, !1, u, l, i, n);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, u = e.child, e.child = null; u !== null; ) {
          if (((t = u.alternate), t !== null && Hu(t) === null)) {
            e.child = u;
            break;
          }
          (t = u.sibling), (u.sibling = l), (l = u), (u = t);
        }
        Ef(e, !0, l, null, i, n);
        break;
      case "together":
        Ef(e, !1, null, null, void 0, n);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function ll(t, e, l) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (zl |= e.lanes),
      (l & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Rn(t, e, l, !1), (l & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(f(153));
    if (e.child !== null) {
      for (
        t = e.child, l = $e(t, t.pendingProps), e.child = l, l.return = e;
        t.sibling !== null;

      )
        (t = t.sibling),
          (l = l.sibling = $e(t, t.pendingProps)),
          (l.return = e);
      l.sibling = null;
    }
    return e.child;
  }
  function Af(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && Cu(t)));
  }
  function J0(t, e, l) {
    switch (e.tag) {
      case 3:
        le(e, e.stateNode.containerInfo),
          Sl(e, qt, t.memoizedState.cache),
          Jl();
        break;
      case 27:
      case 5:
        In(e);
        break;
      case 4:
        le(e, e.stateNode.containerInfo);
        break;
      case 10:
        Sl(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return (e.flags |= 128), Kc(e), null;
        break;
      case 13:
        var n = e.memoizedState;
        if (n !== null)
          return n.dehydrated !== null
            ? (Tl(e), (e.flags |= 128), null)
            : (l & e.child.childLanes) !== 0
            ? vd(t, e, l)
            : (Tl(e), (t = ll(t, e, l)), t !== null ? t.sibling : null);
        Tl(e);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (
          ((n = (l & e.childLanes) !== 0),
          n || (Rn(t, e, l, !1), (n = (l & e.childLanes) !== 0)),
          u)
        ) {
          if (n) return gd(t, e, l);
          e.flags |= 128;
        }
        if (
          ((u = e.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          V(jt, jt.current),
          n)
        )
          break;
        return null;
      case 22:
        return (e.lanes = 0), sd(t, e, l, e.pendingProps);
      case 24:
        Sl(e, qt, t.memoizedState.cache);
    }
    return ll(t, e, l);
  }
  function Sd(t, e, l) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Yt = !0;
      else {
        if (!Af(t, l) && (e.flags & 128) === 0) return (Yt = !1), J0(t, e, l);
        Yt = (t.flags & 131072) !== 0;
      }
    else (Yt = !1), dt && (e.flags & 1048576) !== 0 && $s(e, ma, e.index);
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var n = e.pendingProps;
          if (((t = Wl(e.elementType)), (e.type = t), typeof t == "function"))
            _c(t)
              ? ((n = en(t, n)), (e.tag = 1), (e = md(null, e, t, n, l)))
              : ((e.tag = 0), (e = yf(null, e, t, n, l)));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === I) {
                (e.tag = 11), (e = cd(null, e, t, n, l));
                break t;
              } else if (u === F) {
                (e.tag = 14), (e = fd(null, e, t, n, l));
                break t;
              }
            }
            throw ((e = Jt(t) || t), Error(f(306, e, "")));
          }
        }
        return e;
      case 0:
        return yf(t, e, e.type, e.pendingProps, l);
      case 1:
        return (n = e.type), (u = en(n, e.pendingProps)), md(t, e, n, u, l);
      case 3:
        t: {
          if ((le(e, e.stateNode.containerInfo), t === null))
            throw Error(f(387));
          n = e.pendingProps;
          var i = e.memoizedState;
          (u = i.element), Gc(t, e), Aa(e, n, null, l);
          var o = e.memoizedState;
          if (
            ((n = o.cache),
            Sl(e, qt, n),
            n !== i.cache && wc(e, [qt], l, !0),
            Ea(),
            (n = o.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: n, isDehydrated: !1, cache: o.cache }),
              (e.updateQueue.baseState = i),
              (e.memoizedState = i),
              e.flags & 256)
            ) {
              e = yd(t, e, n, l);
              break t;
            } else if (n !== u) {
              (u = Ce(Error(f(424)), e)), ya(u), (e = yd(t, e, n, l));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                zt = Ue(t.firstChild),
                  Ft = e,
                  dt = !0,
                  pl = null,
                  Me = !0,
                  l = ro(e, null, n, l),
                  e.child = l;
                l;

              )
                (l.flags = (l.flags & -3) | 4096), (l = l.sibling);
            }
          else {
            if ((Jl(), n === u)) {
              e = ll(t, e, l);
              break t;
            }
            Wt(t, e, n, l);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Ju(t, e),
          t === null
            ? (l = Nh(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = l)
              : dt ||
                ((l = e.type),
                (t = e.pendingProps),
                (n = si(ct.current).createElement(l)),
                (n[kt] = e),
                (n[ue] = t),
                Pt(n, l, t),
                Zt(n),
                (e.stateNode = n))
            : (e.memoizedState = Nh(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState
              )),
          null
        );
      case 27:
        return (
          In(e),
          t === null &&
            dt &&
            ((n = e.stateNode = zh(e.type, e.pendingProps, ct.current)),
            (Ft = e),
            (Me = !0),
            (u = zt),
            Dl(e.type) ? ((er = u), (zt = Ue(n.firstChild))) : (zt = u)),
          Wt(t, e, e.pendingProps.children, l),
          Ju(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            dt &&
            ((u = n = zt) &&
              ((n = Tv(n, e.type, e.pendingProps, Me)),
              n !== null
                ? ((e.stateNode = n),
                  (Ft = e),
                  (zt = Ue(n.firstChild)),
                  (Me = !1),
                  (u = !0))
                : (u = !1)),
            u || gl(e)),
          In(e),
          (u = e.type),
          (i = e.pendingProps),
          (o = t !== null ? t.memoizedProps : null),
          (n = i.children),
          $f(u, i) ? (n = null) : o !== null && $f(u, o) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((u = kc(t, e, q0, null, null, l)), (Xa._currentValue = u)),
          Ju(t, e),
          Wt(t, e, n, l),
          e.child
        );
      case 6:
        return (
          t === null &&
            dt &&
            ((t = l = zt) &&
              ((l = Ov(l, e.pendingProps, Me)),
              l !== null
                ? ((e.stateNode = l), (Ft = e), (zt = null), (t = !0))
                : (t = !1)),
            t || gl(e)),
          null
        );
      case 13:
        return vd(t, e, l);
      case 4:
        return (
          le(e, e.stateNode.containerInfo),
          (n = e.pendingProps),
          t === null ? (e.child = Il(e, null, n, l)) : Wt(t, e, n, l),
          e.child
        );
      case 11:
        return cd(t, e, e.type, e.pendingProps, l);
      case 7:
        return Wt(t, e, e.pendingProps, l), e.child;
      case 8:
        return Wt(t, e, e.pendingProps.children, l), e.child;
      case 12:
        return Wt(t, e, e.pendingProps.children, l), e.child;
      case 10:
        return (
          (n = e.pendingProps),
          Sl(e, e.type, n.value),
          Wt(t, e, n.children, l),
          e.child
        );
      case 9:
        return (
          (u = e.type._context),
          (n = e.pendingProps.children),
          Fl(e),
          (u = $t(u)),
          (n = n(u)),
          (e.flags |= 1),
          Wt(t, e, n, l),
          e.child
        );
      case 14:
        return fd(t, e, e.type, e.pendingProps, l);
      case 15:
        return rd(t, e, e.type, e.pendingProps, l);
      case 19:
        return gd(t, e, l);
      case 31:
        return K0(t, e, l);
      case 22:
        return sd(t, e, l, e.pendingProps);
      case 24:
        return (
          Fl(e),
          (n = $t(qt)),
          t === null
            ? ((u = qc()),
              u === null &&
                ((u = _t),
                (i = Hc()),
                (u.pooledCache = i),
                i.refCount++,
                i !== null && (u.pooledCacheLanes |= l),
                (u = i)),
              (e.memoizedState = { parent: n, cache: u }),
              Yc(e),
              Sl(e, qt, u))
            : ((t.lanes & l) !== 0 && (Gc(t, e), Aa(e, null, null, l), Ea()),
              (u = t.memoizedState),
              (i = e.memoizedState),
              u.parent !== n
                ? ((u = { parent: n, cache: n }),
                  (e.memoizedState = u),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = u),
                  Sl(e, qt, n))
                : ((n = i.cache),
                  Sl(e, qt, n),
                  n !== u.cache && wc(e, [qt], l, !0))),
          Wt(t, e, e.pendingProps.children, l),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(f(156, e.tag));
  }
  function nl(t) {
    t.flags |= 4;
  }
  function Tf(t, e, l, n, u) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (u & 335544128) === u))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Kd()) t.flags |= 8192;
        else throw ((Pl = Du), Lc);
    } else t.flags &= -16777217;
  }
  function bd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !wh(e)))
      if (Kd()) t.flags |= 8192;
      else throw ((Pl = Du), Lc);
  }
  function Fu(t, e) {
    e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? Pr() : 536870912), (t.lanes |= e), (Bn |= e));
  }
  function Ca(t, e) {
    if (!dt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), (e = e.sibling);
          l === null ? (t.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = t.tail;
          for (var n = null; l !== null; )
            l.alternate !== null && (n = l), (l = l.sibling);
          n === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Ct(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      l = 0,
      n = 0;
    if (e)
      for (var u = t.child; u !== null; )
        (l |= u.lanes | u.childLanes),
          (n |= u.subtreeFlags & 65011712),
          (n |= u.flags & 65011712),
          (u.return = t),
          (u = u.sibling);
    else
      for (u = t.child; u !== null; )
        (l |= u.lanes | u.childLanes),
          (n |= u.subtreeFlags),
          (n |= u.flags),
          (u.return = t),
          (u = u.sibling);
    return (t.subtreeFlags |= n), (t.childLanes = l), e;
  }
  function k0(t, e, l) {
    var n = e.pendingProps;
    switch ((Nc(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ct(e), null;
      case 1:
        return Ct(e), null;
      case 3:
        return (
          (l = e.stateNode),
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          Ie(qt),
          Ut(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (t === null || t.child === null) &&
            (On(e)
              ? nl(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Dc())),
          Ct(e),
          null
        );
      case 26:
        var u = e.type,
          i = e.memoizedState;
        return (
          t === null
            ? (nl(e),
              i !== null ? (Ct(e), bd(e, i)) : (Ct(e), Tf(e, u, null, n, l)))
            : i
            ? i !== t.memoizedState
              ? (nl(e), Ct(e), bd(e, i))
              : (Ct(e), (e.flags &= -16777217))
            : ((t = t.memoizedProps),
              t !== n && nl(e),
              Ct(e),
              Tf(e, u, t, n, l)),
          null
        );
      case 27:
        if (
          (iu(e),
          (l = ct.current),
          (u = e.type),
          t !== null && e.stateNode != null)
        )
          t.memoizedProps !== n && nl(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(f(166));
            return Ct(e), null;
          }
          (t = K.current),
            On(e) ? Ps(e) : ((t = zh(u, n, l)), (e.stateNode = t), nl(e));
        }
        return Ct(e), null;
      case 5:
        if ((iu(e), (u = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== n && nl(e);
        else {
          if (!n) {
            if (e.stateNode === null) throw Error(f(166));
            return Ct(e), null;
          }
          if (((i = K.current), On(e))) Ps(e);
          else {
            var o = si(ct.current);
            switch (i) {
              case 1:
                i = o.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                i = o.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    i = o.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    i = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    (i = o.createElement("div")),
                      (i.innerHTML = "<script></script>"),
                      (i = i.removeChild(i.firstChild));
                    break;
                  case "select":
                    (i =
                      typeof n.is == "string"
                        ? o.createElement("select", { is: n.is })
                        : o.createElement("select")),
                      n.multiple
                        ? (i.multiple = !0)
                        : n.size && (i.size = n.size);
                    break;
                  default:
                    i =
                      typeof n.is == "string"
                        ? o.createElement(u, { is: n.is })
                        : o.createElement(u);
                }
            }
            (i[kt] = e), (i[ue] = n);
            t: for (o = e.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6) i.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                (o.child.return = o), (o = o.child);
                continue;
              }
              if (o === e) break t;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === e) break t;
                o = o.return;
              }
              (o.sibling.return = o.return), (o = o.sibling);
            }
            e.stateNode = i;
            t: switch ((Pt(i, u, n), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break t;
              case "img":
                n = !0;
                break t;
              default:
                n = !1;
            }
            n && nl(e);
          }
        }
        return (
          Ct(e),
          Tf(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, l),
          null
        );
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== n && nl(e);
        else {
          if (typeof n != "string" && e.stateNode === null) throw Error(f(166));
          if (((t = ct.current), On(e))) {
            if (
              ((t = e.stateNode),
              (l = e.memoizedProps),
              (n = null),
              (u = Ft),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            (t[kt] = e),
              (t = !!(
                t.nodeValue === l ||
                (n !== null && n.suppressHydrationWarning === !0) ||
                vh(t.nodeValue, l)
              )),
              t || gl(e, !0);
          } else (t = si(t).createTextNode(n)), (t[kt] = e), (e.stateNode = t);
        }
        return Ct(e), null;
      case 31:
        if (((l = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((n = On(e)), l !== null)) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(f(557));
              t[kt] = e;
            } else
              Jl(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ct(e), (t = !1);
          } else
            (l = Dc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = l),
              (t = !0);
          if (!t) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null);
          if ((e.flags & 128) !== 0) throw Error(f(558));
        }
        return Ct(e), null;
      case 13:
        if (
          ((n = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((u = On(e)), n !== null && n.dehydrated !== null)) {
            if (t === null) {
              if (!u) throw Error(f(318));
              if (
                ((u = e.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(f(317));
              u[kt] = e;
            } else
              Jl(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ct(e), (u = !1);
          } else
            (u = Dc()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = u),
              (u = !0);
          if (!u) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null);
        }
        return (
          Ee(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = l), e)
            : ((l = n !== null),
              (t = t !== null && t.memoizedState !== null),
              l &&
                ((n = e.child),
                (u = null),
                n.alternate !== null &&
                  n.alternate.memoizedState !== null &&
                  n.alternate.memoizedState.cachePool !== null &&
                  (u = n.alternate.memoizedState.cachePool.pool),
                (i = null),
                n.memoizedState !== null &&
                  n.memoizedState.cachePool !== null &&
                  (i = n.memoizedState.cachePool.pool),
                i !== u && (n.flags |= 2048)),
              l !== t && l && (e.child.flags |= 8192),
              Fu(e, e.updateQueue),
              Ct(e),
              null)
        );
      case 4:
        return Ut(), t === null && Zf(e.stateNode.containerInfo), Ct(e), null;
      case 10:
        return Ie(e.type), Ct(e), null;
      case 19:
        if ((B(jt), (n = e.memoizedState), n === null)) return Ct(e), null;
        if (((u = (e.flags & 128) !== 0), (i = n.rendering), i === null))
          if (u) Ca(n, !1);
          else {
            if (Dt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((i = Hu(t)), i !== null)) {
                  for (
                    e.flags |= 128,
                      Ca(n, !1),
                      t = i.updateQueue,
                      e.updateQueue = t,
                      Fu(e, t),
                      e.subtreeFlags = 0,
                      t = l,
                      l = e.child;
                    l !== null;

                  )
                    Js(l, t), (l = l.sibling);
                  return (
                    V(jt, (jt.current & 1) | 2),
                    dt && We(e, n.treeForkCount),
                    e.child
                  );
                }
                t = t.sibling;
              }
            n.tail !== null &&
              ye() > ti &&
              ((e.flags |= 128), (u = !0), Ca(n, !1), (e.lanes = 4194304));
          }
        else {
          if (!u)
            if (((t = Hu(i)), t !== null)) {
              if (
                ((e.flags |= 128),
                (u = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Fu(e, t),
                Ca(n, !0),
                n.tail === null &&
                  n.tailMode === "hidden" &&
                  !i.alternate &&
                  !dt)
              )
                return Ct(e), null;
            } else
              2 * ye() - n.renderingStartTime > ti &&
                l !== 536870912 &&
                ((e.flags |= 128), (u = !0), Ca(n, !1), (e.lanes = 4194304));
          n.isBackwards
            ? ((i.sibling = e.child), (e.child = i))
            : ((t = n.last),
              t !== null ? (t.sibling = i) : (e.child = i),
              (n.last = i));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = ye()),
            (t.sibling = null),
            (l = jt.current),
            V(jt, u ? (l & 1) | 2 : l & 1),
            dt && We(e, n.treeForkCount),
            t)
          : (Ct(e), null);
      case 22:
      case 23:
        return (
          Ee(e),
          Zc(),
          (n = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== n && (e.flags |= 8192)
            : n && (e.flags |= 8192),
          n
            ? (l & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Ct(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Ct(e),
          (l = e.updateQueue),
          l !== null && Fu(e, l.retryQueue),
          (l = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (l = t.memoizedState.cachePool.pool),
          (n = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          n !== l && (e.flags |= 2048),
          t !== null && B($l),
          null
        );
      case 24:
        return (
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          Ie(qt),
          Ct(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, e.tag));
  }
  function F0(t, e) {
    switch ((Nc(e), e.tag)) {
      case 1:
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          Ie(qt),
          Ut(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return iu(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if ((Ee(e), e.alternate === null)) throw Error(f(340));
          Jl();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 13:
        if (
          (Ee(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(f(340));
          Jl();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return B(jt), null;
      case 4:
        return Ut(), null;
      case 10:
        return Ie(e.type), null;
      case 22:
      case 23:
        return (
          Ee(e),
          Zc(),
          t !== null && B($l),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return Ie(qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ed(t, e) {
    switch ((Nc(e), e.tag)) {
      case 3:
        Ie(qt), Ut();
        break;
      case 26:
      case 27:
      case 5:
        iu(e);
        break;
      case 4:
        Ut();
        break;
      case 31:
        e.memoizedState !== null && Ee(e);
        break;
      case 13:
        Ee(e);
        break;
      case 19:
        B(jt);
        break;
      case 10:
        Ie(e.type);
        break;
      case 22:
      case 23:
        Ee(e), Zc(), t !== null && B($l);
        break;
      case 24:
        Ie(qt);
    }
  }
  function xa(t, e) {
    try {
      var l = e.updateQueue,
        n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            n = void 0;
            var i = l.create,
              o = l.inst;
            (n = i()), (o.destroy = n);
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (m) {
      At(e, e.return, m);
    }
  }
  function Rl(t, e, l) {
    try {
      var n = e.updateQueue,
        u = n !== null ? n.lastEffect : null;
      if (u !== null) {
        var i = u.next;
        n = i;
        do {
          if ((n.tag & t) === t) {
            var o = n.inst,
              m = o.destroy;
            if (m !== void 0) {
              (o.destroy = void 0), (u = e);
              var S = l,
                z = m;
              try {
                z();
              } catch (w) {
                At(u, S, w);
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (w) {
      At(e, e.return, w);
    }
  }
  function Ad(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var l = t.stateNode;
      try {
        oo(e, l);
      } catch (n) {
        At(t, t.return, n);
      }
    }
  }
  function Td(t, e, l) {
    (l.props = en(t.type, t.memoizedProps)), (l.state = t.memoizedState);
    try {
      l.componentWillUnmount();
    } catch (n) {
      At(t, e, n);
    }
  }
  function Na(t, e) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var n = t.stateNode;
            break;
          case 30:
            n = t.stateNode;
            break;
          default:
            n = t.stateNode;
        }
        typeof l == "function" ? (t.refCleanup = l(n)) : (l.current = n);
      }
    } catch (u) {
      At(t, e, u);
    }
  }
  function Qe(t, e) {
    var l = t.ref,
      n = t.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (u) {
          At(t, e, u);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (u) {
          At(t, e, u);
        }
      else l.current = null;
  }
  function Od(t) {
    var e = t.type,
      l = t.memoizedProps,
      n = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break t;
        case "img":
          l.src ? (n.src = l.src) : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (u) {
      At(t, t.return, u);
    }
  }
  function Of(t, e, l) {
    try {
      var n = t.stateNode;
      pv(n, t.type, l, e), (n[ue] = e);
    } catch (u) {
      At(t, t.return, u);
    }
  }
  function Rd(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && Dl(t.type)) ||
      t.tag === 4
    );
  }
  function Rf(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || Rd(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && Dl(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function _f(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      (t = t.stateNode),
        e
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
              ? l.ownerDocument.body
              : l
            ).insertBefore(t, e)
          : ((e =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l),
            e.appendChild(t),
            (l = l._reactRootContainer),
            l != null || e.onclick !== null || (e.onclick = ke));
    else if (
      n !== 4 &&
      (n === 27 && Dl(t.type) && ((l = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (_f(t, e, l), t = t.sibling; t !== null; )
        _f(t, e, l), (t = t.sibling);
  }
  function $u(t, e, l) {
    var n = t.tag;
    if (n === 5 || n === 6)
      (t = t.stateNode), e ? l.insertBefore(t, e) : l.appendChild(t);
    else if (
      n !== 4 &&
      (n === 27 && Dl(t.type) && (l = t.stateNode), (t = t.child), t !== null)
    )
      for ($u(t, e, l), t = t.sibling; t !== null; )
        $u(t, e, l), (t = t.sibling);
  }
  function _d(t) {
    var e = t.stateNode,
      l = t.memoizedProps;
    try {
      for (var n = t.type, u = e.attributes; u.length; )
        e.removeAttributeNode(u[0]);
      Pt(e, n, l), (e[kt] = t), (e[ue] = l);
    } catch (i) {
      At(t, t.return, i);
    }
  }
  var al = !1,
    Gt = !1,
    zf = !1,
    zd = typeof WeakSet == "function" ? WeakSet : Set,
    Kt = null;
  function $0(t, e) {
    if (((t = t.containerInfo), (kf = pi), (t = qs(t)), Sc(t))) {
      if ("selectionStart" in t)
        var l = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          l = ((l = t.ownerDocument) && l.defaultView) || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var u = n.anchorOffset,
              i = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, i.nodeType;
            } catch {
              l = null;
              break t;
            }
            var o = 0,
              m = -1,
              S = -1,
              z = 0,
              w = 0,
              q = t,
              C = null;
            e: for (;;) {
              for (
                var N;
                q !== l || (u !== 0 && q.nodeType !== 3) || (m = o + u),
                  q !== i || (n !== 0 && q.nodeType !== 3) || (S = o + n),
                  q.nodeType === 3 && (o += q.nodeValue.length),
                  (N = q.firstChild) !== null;

              )
                (C = q), (q = N);
              for (;;) {
                if (q === t) break e;
                if (
                  (C === l && ++z === u && (m = o),
                  C === i && ++w === n && (S = o),
                  (N = q.nextSibling) !== null)
                )
                  break;
                (q = C), (C = q.parentNode);
              }
              q = N;
            }
            l = m === -1 || S === -1 ? null : { start: m, end: S };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      Ff = { focusedElem: t, selectionRange: l }, pi = !1, Kt = e;
      Kt !== null;

    )
      if (
        ((e = Kt), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)
      )
        (t.return = e), (Kt = t);
      else
        for (; Kt !== null; ) {
          switch (((e = Kt), (i = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (l = 0; l < t.length; l++)
                  (u = t[l]), (u.ref.impl = u.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                (t = void 0),
                  (l = e),
                  (u = i.memoizedProps),
                  (i = i.memoizedState),
                  (n = l.stateNode);
                try {
                  var J = en(l.type, u);
                  (t = n.getSnapshotBeforeUpdate(J, i)),
                    (n.__reactInternalSnapshotBeforeUpdate = t);
                } catch (P) {
                  At(l, l.return, P);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (l = t.nodeType), l === 9)
                )
                  Pf(t);
                else if (l === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Pf(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(f(163));
          }
          if (((t = e.sibling), t !== null)) {
            (t.return = e.return), (Kt = t);
            break;
          }
          Kt = e.return;
        }
  }
  function Cd(t, e, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        il(t, l), n & 4 && xa(5, l);
        break;
      case 1:
        if ((il(t, l), n & 4))
          if (((t = l.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (o) {
              At(l, l.return, o);
            }
          else {
            var u = en(l.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(u, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (o) {
              At(l, l.return, o);
            }
          }
        n & 64 && Ad(l), n & 512 && Na(l, l.return);
        break;
      case 3:
        if ((il(t, l), n & 64 && ((t = l.updateQueue), t !== null))) {
          if (((e = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                e = l.child.stateNode;
                break;
              case 1:
                e = l.child.stateNode;
            }
          try {
            oo(t, e);
          } catch (o) {
            At(l, l.return, o);
          }
        }
        break;
      case 27:
        e === null && n & 4 && _d(l);
      case 26:
      case 5:
        il(t, l), e === null && n & 4 && Od(l), n & 512 && Na(l, l.return);
        break;
      case 12:
        il(t, l);
        break;
      case 31:
        il(t, l), n & 4 && Md(t, l);
        break;
      case 13:
        il(t, l),
          n & 4 && Dd(t, l),
          n & 64 &&
            ((t = l.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((l = uv.bind(null, l)), Rv(t, l))));
        break;
      case 22:
        if (((n = l.memoizedState !== null || al), !n)) {
          (e = (e !== null && e.memoizedState !== null) || Gt), (u = al);
          var i = Gt;
          (al = n),
            (Gt = e) && !i ? cl(t, l, (l.subtreeFlags & 8772) !== 0) : il(t, l),
            (al = u),
            (Gt = i);
        }
        break;
      case 30:
        break;
      default:
        il(t, l);
    }
  }
  function xd(t) {
    var e = t.alternate;
    e !== null && ((t.alternate = null), xd(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && lc(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var xt = null,
    ce = !1;
  function ul(t, e, l) {
    for (l = l.child; l !== null; ) Nd(t, e, l), (l = l.sibling);
  }
  function Nd(t, e, l) {
    if (ve && typeof ve.onCommitFiberUnmount == "function")
      try {
        ve.onCommitFiberUnmount(ta, l);
      } catch {}
    switch (l.tag) {
      case 26:
        Gt || Qe(l, e),
          ul(t, e, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l));
        break;
      case 27:
        Gt || Qe(l, e);
        var n = xt,
          u = ce;
        Dl(l.type) && ((xt = l.stateNode), (ce = !1)),
          ul(t, e, l),
          La(l.stateNode),
          (xt = n),
          (ce = u);
        break;
      case 5:
        Gt || Qe(l, e);
      case 6:
        if (
          ((n = xt),
          (u = ce),
          (xt = null),
          ul(t, e, l),
          (xt = n),
          (ce = u),
          xt !== null)
        )
          if (ce)
            try {
              (xt.nodeType === 9
                ? xt.body
                : xt.nodeName === "HTML"
                ? xt.ownerDocument.body
                : xt
              ).removeChild(l.stateNode);
            } catch (i) {
              At(l, e, i);
            }
          else
            try {
              xt.removeChild(l.stateNode);
            } catch (i) {
              At(l, e, i);
            }
        break;
      case 18:
        xt !== null &&
          (ce
            ? ((t = xt),
              Ah(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t,
                l.stateNode
              ),
              Zn(t))
            : Ah(xt, l.stateNode));
        break;
      case 4:
        (n = xt),
          (u = ce),
          (xt = l.stateNode.containerInfo),
          (ce = !0),
          ul(t, e, l),
          (xt = n),
          (ce = u);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Rl(2, l, e), Gt || Rl(4, l, e), ul(t, e, l);
        break;
      case 1:
        Gt ||
          (Qe(l, e),
          (n = l.stateNode),
          typeof n.componentWillUnmount == "function" && Td(l, e, n)),
          ul(t, e, l);
        break;
      case 21:
        ul(t, e, l);
        break;
      case 22:
        (Gt = (n = Gt) || l.memoizedState !== null), ul(t, e, l), (Gt = n);
        break;
      default:
        ul(t, e, l);
    }
  }
  function Md(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        Zn(t);
      } catch (l) {
        At(e, e.return, l);
      }
    }
  }
  function Dd(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        Zn(t);
      } catch (l) {
        At(e, e.return, l);
      }
  }
  function W0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new zd()), e;
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new zd()),
          e
        );
      default:
        throw Error(f(435, t.tag));
    }
  }
  function Wu(t, e) {
    var l = W0(t);
    e.forEach(function (n) {
      if (!l.has(n)) {
        l.add(n);
        var u = iv.bind(null, t, n);
        n.then(u, u);
      }
    });
  }
  function fe(t, e) {
    var l = e.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n],
          i = t,
          o = e,
          m = o;
        t: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Dl(m.type)) {
                (xt = m.stateNode), (ce = !1);
                break t;
              }
              break;
            case 5:
              (xt = m.stateNode), (ce = !1);
              break t;
            case 3:
            case 4:
              (xt = m.stateNode.containerInfo), (ce = !0);
              break t;
          }
          m = m.return;
        }
        if (xt === null) throw Error(f(160));
        Nd(i, o, u),
          (xt = null),
          (ce = !1),
          (i = u.alternate),
          i !== null && (i.return = null),
          (u.return = null);
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; ) Ud(e, t), (e = e.sibling);
  }
  var Be = null;
  function Ud(t, e) {
    var l = t.alternate,
      n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        fe(e, t),
          re(t),
          n & 4 && (Rl(3, t, t.return), xa(3, t), Rl(5, t, t.return));
        break;
      case 1:
        fe(e, t),
          re(t),
          n & 512 && (Gt || l === null || Qe(l, l.return)),
          n & 64 &&
            al &&
            ((t = t.updateQueue),
            t !== null &&
              ((n = t.callbacks),
              n !== null &&
                ((l = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = l === null ? n : l.concat(n)))));
        break;
      case 26:
        var u = Be;
        if (
          (fe(e, t),
          re(t),
          n & 512 && (Gt || l === null || Qe(l, l.return)),
          n & 4)
        ) {
          var i = l !== null ? l.memoizedState : null;
          if (((n = t.memoizedState), l === null))
            if (n === null)
              if (t.stateNode === null) {
                t: {
                  (n = t.type),
                    (l = t.memoizedProps),
                    (u = u.ownerDocument || u);
                  e: switch (n) {
                    case "title":
                      (i = u.getElementsByTagName("title")[0]),
                        (!i ||
                          i[na] ||
                          i[kt] ||
                          i.namespaceURI === "http://www.w3.org/2000/svg" ||
                          i.hasAttribute("itemprop")) &&
                          ((i = u.createElement(n)),
                          u.head.insertBefore(
                            i,
                            u.querySelector("head > title")
                          )),
                        Pt(i, n, l),
                        (i[kt] = t),
                        Zt(i),
                        (n = i);
                      break t;
                    case "link":
                      var o = Uh("link", "href", u).get(n + (l.href || ""));
                      if (o) {
                        for (var m = 0; m < o.length; m++)
                          if (
                            ((i = o[m]),
                            i.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              i.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              i.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              i.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            o.splice(m, 1);
                            break e;
                          }
                      }
                      (i = u.createElement(n)),
                        Pt(i, n, l),
                        u.head.appendChild(i);
                      break;
                    case "meta":
                      if (
                        (o = Uh("meta", "content", u).get(
                          n + (l.content || "")
                        ))
                      ) {
                        for (m = 0; m < o.length; m++)
                          if (
                            ((i = o[m]),
                            i.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              i.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              i.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              i.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              i.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            o.splice(m, 1);
                            break e;
                          }
                      }
                      (i = u.createElement(n)),
                        Pt(i, n, l),
                        u.head.appendChild(i);
                      break;
                    default:
                      throw Error(f(468, n));
                  }
                  (i[kt] = t), Zt(i), (n = i);
                }
                t.stateNode = n;
              } else jh(u, t.type, t.stateNode);
            else t.stateNode = Dh(u, n, t.memoizedProps);
          else
            i !== n
              ? (i === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : i.count--,
                n === null
                  ? jh(u, t.type, t.stateNode)
                  : Dh(u, n, t.memoizedProps))
              : n === null &&
                t.stateNode !== null &&
                Of(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        fe(e, t),
          re(t),
          n & 512 && (Gt || l === null || Qe(l, l.return)),
          l !== null && n & 4 && Of(t, t.memoizedProps, l.memoizedProps);
        break;
      case 5:
        if (
          (fe(e, t),
          re(t),
          n & 512 && (Gt || l === null || Qe(l, l.return)),
          t.flags & 32)
        ) {
          u = t.stateNode;
          try {
            mn(u, "");
          } catch (J) {
            At(t, t.return, J);
          }
        }
        n & 4 &&
          t.stateNode != null &&
          ((u = t.memoizedProps), Of(t, u, l !== null ? l.memoizedProps : u)),
          n & 1024 && (zf = !0);
        break;
      case 6:
        if ((fe(e, t), re(t), n & 4)) {
          if (t.stateNode === null) throw Error(f(162));
          (n = t.memoizedProps), (l = t.stateNode);
          try {
            l.nodeValue = n;
          } catch (J) {
            At(t, t.return, J);
          }
        }
        break;
      case 3:
        if (
          ((hi = null),
          (u = Be),
          (Be = oi(e.containerInfo)),
          fe(e, t),
          (Be = u),
          re(t),
          n & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            Zn(e.containerInfo);
          } catch (J) {
            At(t, t.return, J);
          }
        zf && ((zf = !1), jd(t));
        break;
      case 4:
        (n = Be),
          (Be = oi(t.stateNode.containerInfo)),
          fe(e, t),
          re(t),
          (Be = n);
        break;
      case 12:
        fe(e, t), re(t);
        break;
      case 31:
        fe(e, t),
          re(t),
          n & 4 &&
            ((n = t.updateQueue),
            n !== null && ((t.updateQueue = null), Wu(t, n)));
        break;
      case 13:
        fe(e, t),
          re(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (Iu = ye()),
          n & 4 &&
            ((n = t.updateQueue),
            n !== null && ((t.updateQueue = null), Wu(t, n)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var S = l !== null && l.memoizedState !== null,
          z = al,
          w = Gt;
        if (
          ((al = z || u),
          (Gt = w || S),
          fe(e, t),
          (Gt = w),
          (al = z),
          re(t),
          n & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = u ? e._visibility & -2 : e._visibility | 1,
              u && (l === null || S || al || Gt || ln(t)),
              l = null,
              e = t;
            ;

          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (l === null) {
                S = l = e;
                try {
                  if (((i = S.stateNode), u))
                    (o = i.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none");
                  else {
                    m = S.stateNode;
                    var q = S.memoizedProps.style,
                      C =
                        q != null && q.hasOwnProperty("display")
                          ? q.display
                          : null;
                    m.style.display =
                      C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (J) {
                  At(S, S.return, J);
                }
              }
            } else if (e.tag === 6) {
              if (l === null) {
                S = e;
                try {
                  S.stateNode.nodeValue = u ? "" : S.memoizedProps;
                } catch (J) {
                  At(S, S.return, J);
                }
              }
            } else if (e.tag === 18) {
              if (l === null) {
                S = e;
                try {
                  var N = S.stateNode;
                  u ? Th(N, !0) : Th(S.stateNode, !1);
                } catch (J) {
                  At(S, S.return, J);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              l === e && (l = null), (e = e.return);
            }
            l === e && (l = null),
              (e.sibling.return = e.return),
              (e = e.sibling);
          }
        n & 4 &&
          ((n = t.updateQueue),
          n !== null &&
            ((l = n.retryQueue),
            l !== null && ((n.retryQueue = null), Wu(t, l))));
        break;
      case 19:
        fe(e, t),
          re(t),
          n & 4 &&
            ((n = t.updateQueue),
            n !== null && ((t.updateQueue = null), Wu(t, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        fe(e, t), re(t);
    }
  }
  function re(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var l, n = t.return; n !== null; ) {
          if (Rd(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(f(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode,
              i = Rf(t);
            $u(t, i, u);
            break;
          case 5:
            var o = l.stateNode;
            l.flags & 32 && (mn(o, ""), (l.flags &= -33));
            var m = Rf(t);
            $u(t, m, o);
            break;
          case 3:
          case 4:
            var S = l.stateNode.containerInfo,
              z = Rf(t);
            _f(t, z, S);
            break;
          default:
            throw Error(f(161));
        }
      } catch (w) {
        At(t, t.return, w);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function jd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        jd(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function il(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) Cd(t, e.alternate, e), (e = e.sibling);
  }
  function ln(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Rl(4, e, e.return), ln(e);
          break;
        case 1:
          Qe(e, e.return);
          var l = e.stateNode;
          typeof l.componentWillUnmount == "function" && Td(e, e.return, l),
            ln(e);
          break;
        case 27:
          La(e.stateNode);
        case 26:
        case 5:
          Qe(e, e.return), ln(e);
          break;
        case 22:
          e.memoizedState === null && ln(e);
          break;
        case 30:
          ln(e);
          break;
        default:
          ln(e);
      }
      t = t.sibling;
    }
  }
  function cl(t, e, l) {
    for (l = l && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var n = e.alternate,
        u = t,
        i = e,
        o = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          cl(u, i, l), xa(4, i);
          break;
        case 1:
          if (
            (cl(u, i, l),
            (n = i),
            (u = n.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (z) {
              At(n, n.return, z);
            }
          if (((n = i), (u = n.updateQueue), u !== null)) {
            var m = n.stateNode;
            try {
              var S = u.shared.hiddenCallbacks;
              if (S !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < S.length; u++)
                  so(S[u], m);
            } catch (z) {
              At(n, n.return, z);
            }
          }
          l && o & 64 && Ad(i), Na(i, i.return);
          break;
        case 27:
          _d(i);
        case 26:
        case 5:
          cl(u, i, l), l && n === null && o & 4 && Od(i), Na(i, i.return);
          break;
        case 12:
          cl(u, i, l);
          break;
        case 31:
          cl(u, i, l), l && o & 4 && Md(u, i);
          break;
        case 13:
          cl(u, i, l), l && o & 4 && Dd(u, i);
          break;
        case 22:
          i.memoizedState === null && cl(u, i, l), Na(i, i.return);
          break;
        case 30:
          break;
        default:
          cl(u, i, l);
      }
      e = e.sibling;
    }
  }
  function Cf(t, e) {
    var l = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (l = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== l && (t != null && t.refCount++, l != null && va(l));
  }
  function xf(t, e) {
    (t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && va(t));
  }
  function qe(t, e, l, n) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) wd(t, e, l, n), (e = e.sibling);
  }
  function wd(t, e, l, n) {
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        qe(t, e, l, n), u & 2048 && xa(9, e);
        break;
      case 1:
        qe(t, e, l, n);
        break;
      case 3:
        qe(t, e, l, n),
          u & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && va(t)));
        break;
      case 12:
        if (u & 2048) {
          qe(t, e, l, n), (t = e.stateNode);
          try {
            var i = e.memoizedProps,
              o = i.id,
              m = i.onPostCommit;
            typeof m == "function" &&
              m(
                o,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0
              );
          } catch (S) {
            At(e, e.return, S);
          }
        } else qe(t, e, l, n);
        break;
      case 31:
        qe(t, e, l, n);
        break;
      case 13:
        qe(t, e, l, n);
        break;
      case 23:
        break;
      case 22:
        (i = e.stateNode),
          (o = e.alternate),
          e.memoizedState !== null
            ? i._visibility & 2
              ? qe(t, e, l, n)
              : Ma(t, e)
            : i._visibility & 2
            ? qe(t, e, l, n)
            : ((i._visibility |= 2),
              jn(t, e, l, n, (e.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Cf(o, e);
        break;
      case 24:
        qe(t, e, l, n), u & 2048 && xf(e.alternate, e);
        break;
      default:
        qe(t, e, l, n);
    }
  }
  function jn(t, e, l, n, u) {
    for (
      u = u && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
      e !== null;

    ) {
      var i = t,
        o = e,
        m = l,
        S = n,
        z = o.flags;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          jn(i, o, m, S, u), xa(8, o);
          break;
        case 23:
          break;
        case 22:
          var w = o.stateNode;
          o.memoizedState !== null
            ? w._visibility & 2
              ? jn(i, o, m, S, u)
              : Ma(i, o)
            : ((w._visibility |= 2), jn(i, o, m, S, u)),
            u && z & 2048 && Cf(o.alternate, o);
          break;
        case 24:
          jn(i, o, m, S, u), u && z & 2048 && xf(o.alternate, o);
          break;
        default:
          jn(i, o, m, S, u);
      }
      e = e.sibling;
    }
  }
  function Ma(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var l = t,
          n = e,
          u = n.flags;
        switch (n.tag) {
          case 22:
            Ma(l, n), u & 2048 && Cf(n.alternate, n);
            break;
          case 24:
            Ma(l, n), u & 2048 && xf(n.alternate, n);
            break;
          default:
            Ma(l, n);
        }
        e = e.sibling;
      }
  }
  var Da = 8192;
  function wn(t, e, l) {
    if (t.subtreeFlags & Da)
      for (t = t.child; t !== null; ) Hd(t, e, l), (t = t.sibling);
  }
  function Hd(t, e, l) {
    switch (t.tag) {
      case 26:
        wn(t, e, l),
          t.flags & Da &&
            t.memoizedState !== null &&
            Bv(l, Be, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        wn(t, e, l);
        break;
      case 3:
      case 4:
        var n = Be;
        (Be = oi(t.stateNode.containerInfo)), wn(t, e, l), (Be = n);
        break;
      case 22:
        t.memoizedState === null &&
          ((n = t.alternate),
          n !== null && n.memoizedState !== null
            ? ((n = Da), (Da = 16777216), wn(t, e, l), (Da = n))
            : wn(t, e, l));
        break;
      default:
        wn(t, e, l);
    }
  }
  function Bd(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do (e = t.sibling), (t.sibling = null), (t = e);
      while (t !== null);
    }
  }
  function Ua(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          (Kt = n), Ld(n, t);
        }
      Bd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) qd(t), (t = t.sibling);
  }
  function qd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ua(t), t.flags & 2048 && Rl(9, t, t.return);
        break;
      case 3:
        Ua(t);
        break;
      case 12:
        Ua(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Pu(t))
          : Ua(t);
        break;
      default:
        Ua(t);
    }
  }
  function Pu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var l = 0; l < e.length; l++) {
          var n = e[l];
          (Kt = n), Ld(n, t);
        }
      Bd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          Rl(8, e, e.return), Pu(e);
          break;
        case 22:
          (l = e.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), Pu(e));
          break;
        default:
          Pu(e);
      }
      t = t.sibling;
    }
  }
  function Ld(t, e) {
    for (; Kt !== null; ) {
      var l = Kt;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Rl(8, l, e);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          va(l.memoizedState.cache);
      }
      if (((n = l.child), n !== null)) (n.return = l), (Kt = n);
      else
        t: for (l = t; Kt !== null; ) {
          n = Kt;
          var u = n.sibling,
            i = n.return;
          if ((xd(n), n === l)) {
            Kt = null;
            break t;
          }
          if (u !== null) {
            (u.return = i), (Kt = u);
            break t;
          }
          Kt = i;
        }
    }
  }
  var P0 = {
      getCacheForType: function (t) {
        var e = $t(qt),
          l = e.data.get(t);
        return l === void 0 && ((l = t()), e.data.set(t, l)), l;
      },
      cacheSignal: function () {
        return $t(qt).controller.signal;
      },
    },
    I0 = typeof WeakMap == "function" ? WeakMap : Map,
    pt = 0,
    _t = null,
    ft = null,
    st = 0,
    Et = 0,
    Ae = null,
    _l = !1,
    Hn = !1,
    Nf = !1,
    fl = 0,
    Dt = 0,
    zl = 0,
    nn = 0,
    Mf = 0,
    Te = 0,
    Bn = 0,
    ja = null,
    se = null,
    Df = !1,
    Iu = 0,
    Yd = 0,
    ti = 1 / 0,
    ei = null,
    Cl = null,
    Vt = 0,
    xl = null,
    qn = null,
    rl = 0,
    Uf = 0,
    jf = null,
    Gd = null,
    wa = 0,
    wf = null;
  function Oe() {
    return (pt & 2) !== 0 && st !== 0 ? st & -st : M.T !== null ? Gf() : ls();
  }
  function Xd() {
    if (Te === 0)
      if ((st & 536870912) === 0 || dt) {
        var t = ru;
        (ru <<= 1), (ru & 3932160) === 0 && (ru = 262144), (Te = t);
      } else Te = 536870912;
    return (t = be.current), t !== null && (t.flags |= 32), Te;
  }
  function oe(t, e, l) {
    ((t === _t && (Et === 2 || Et === 9)) || t.cancelPendingCommit !== null) &&
      (Ln(t, 0), Nl(t, st, Te, !1)),
      la(t, l),
      ((pt & 2) === 0 || t !== _t) &&
        (t === _t &&
          ((pt & 2) === 0 && (nn |= l), Dt === 4 && Nl(t, st, Te, !1)),
        Ve(t));
  }
  function Qd(t, e, l) {
    if ((pt & 6) !== 0) throw Error(f(327));
    var n = (!l && (e & 127) === 0 && (e & t.expiredLanes) === 0) || ea(t, e),
      u = n ? lv(t, e) : Bf(t, e, !0),
      i = n;
    do {
      if (u === 0) {
        Hn && !n && Nl(t, e, 0, !1);
        break;
      } else {
        if (((l = t.current.alternate), i && !tv(l))) {
          (u = Bf(t, e, !1)), (i = !1);
          continue;
        }
        if (u === 2) {
          if (((i = e), t.errorRecoveryDisabledLanes & i)) var o = 0;
          else
            (o = t.pendingLanes & -536870913),
              (o = o !== 0 ? o : o & 536870912 ? 536870912 : 0);
          if (o !== 0) {
            e = o;
            t: {
              var m = t;
              u = ja;
              var S = m.current.memoizedState.isDehydrated;
              if ((S && (Ln(m, o).flags |= 256), (o = Bf(m, o, !1)), o !== 2)) {
                if (Nf && !S) {
                  (m.errorRecoveryDisabledLanes |= i), (nn |= i), (u = 4);
                  break t;
                }
                (i = se),
                  (se = u),
                  i !== null && (se === null ? (se = i) : se.push.apply(se, i));
              }
              u = o;
            }
            if (((i = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          Ln(t, 0), Nl(t, e, 0, !0);
          break;
        }
        t: {
          switch (((n = t), (i = u), i)) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Nl(n, e, Te, !_l);
              break t;
            case 2:
              se = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((e & 62914560) === e && ((u = Iu + 300 - ye()), 10 < u)) {
            if ((Nl(n, e, Te, !_l), ou(n, 0, !0) !== 0)) break t;
            (rl = e),
              (n.timeoutHandle = bh(
                Vd.bind(
                  null,
                  n,
                  l,
                  se,
                  ei,
                  Df,
                  e,
                  Te,
                  nn,
                  Bn,
                  _l,
                  i,
                  "Throttled",
                  -0,
                  0
                ),
                u
              ));
            break t;
          }
          Vd(n, l, se, ei, Df, e, Te, nn, Bn, _l, i, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ve(t);
  }
  function Vd(t, e, l, n, u, i, o, m, S, z, w, q, C, N) {
    if (
      ((t.timeoutHandle = -1),
      (q = e.subtreeFlags),
      q & 8192 || (q & 16785408) === 16785408)
    ) {
      (q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: ke,
      }),
        Hd(e, i, q);
      var J =
        (i & 62914560) === i ? Iu - ye() : (i & 4194048) === i ? Yd - ye() : 0;
      if (((J = qv(q, J)), J !== null)) {
        (rl = i),
          (t.cancelPendingCommit = J(
            Pd.bind(null, t, e, i, l, n, u, o, m, S, w, q, null, C, N)
          )),
          Nl(t, i, o, !z);
        return;
      }
    }
    Pd(t, e, i, l, n, u, o, m, S);
  }
  function tv(t) {
    for (var e = t; ; ) {
      var l = e.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        e.flags & 16384 &&
        ((l = e.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var n = 0; n < l.length; n++) {
          var u = l[n],
            i = u.getSnapshot;
          u = u.value;
          try {
            if (!ge(i(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = e.child), e.subtreeFlags & 16384 && l !== null))
        (l.return = e), (e = l);
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    }
    return !0;
  }
  function Nl(t, e, l, n) {
    (e &= ~Mf),
      (e &= ~nn),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      n && (t.warmLanes |= e),
      (n = t.expirationTimes);
    for (var u = e; 0 < u; ) {
      var i = 31 - pe(u),
        o = 1 << i;
      (n[i] = -1), (u &= ~o);
    }
    l !== 0 && Ir(t, l, e);
  }
  function li() {
    return (pt & 6) === 0 ? (Ha(0), !1) : !0;
  }
  function Hf() {
    if (ft !== null) {
      if (Et === 0) var t = ft.return;
      else (t = ft), (Pe = kl = null), Wc(t), (xn = null), (ga = 0), (t = ft);
      for (; t !== null; ) Ed(t.alternate, t), (t = t.return);
      ft = null;
    }
  }
  function Ln(t, e) {
    var l = t.timeoutHandle;
    l !== -1 && ((t.timeoutHandle = -1), bv(l)),
      (l = t.cancelPendingCommit),
      l !== null && ((t.cancelPendingCommit = null), l()),
      (rl = 0),
      Hf(),
      (_t = t),
      (ft = l = $e(t.current, null)),
      (st = e),
      (Et = 0),
      (Ae = null),
      (_l = !1),
      (Hn = ea(t, e)),
      (Nf = !1),
      (Bn = Te = Mf = nn = zl = Dt = 0),
      (se = ja = null),
      (Df = !1),
      (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var u = 31 - pe(n),
          i = 1 << u;
        (e |= t[u]), (n &= ~i);
      }
    return (fl = e), Tu(), l;
  }
  function Zd(t, e) {
    (nt = null),
      (M.H = _a),
      e === Cn || e === Mu
        ? ((e = io()), (Et = 3))
        : e === Lc
        ? ((e = io()), (Et = 4))
        : (Et =
            e === mf
              ? 8
              : e !== null &&
                typeof e == "object" &&
                typeof e.then == "function"
              ? 6
              : 1),
      (Ae = e),
      ft === null && ((Dt = 1), Zu(t, Ce(e, t.current)));
  }
  function Kd() {
    var t = be.current;
    return t === null
      ? !0
      : (st & 4194048) === st
      ? De === null
      : (st & 62914560) === st || (st & 536870912) !== 0
      ? t === De
      : !1;
  }
  function Jd() {
    var t = M.H;
    return (M.H = _a), t === null ? _a : t;
  }
  function kd() {
    var t = M.A;
    return (M.A = P0), t;
  }
  function ni() {
    (Dt = 4),
      _l || ((st & 4194048) !== st && be.current !== null) || (Hn = !0),
      ((zl & 134217727) === 0 && (nn & 134217727) === 0) ||
        _t === null ||
        Nl(_t, st, Te, !1);
  }
  function Bf(t, e, l) {
    var n = pt;
    pt |= 2;
    var u = Jd(),
      i = kd();
    (_t !== t || st !== e) && ((ei = null), Ln(t, e)), (e = !1);
    var o = Dt;
    t: do
      try {
        if (Et !== 0 && ft !== null) {
          var m = ft,
            S = Ae;
          switch (Et) {
            case 8:
              Hf(), (o = 6);
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              be.current === null && (e = !0);
              var z = Et;
              if (((Et = 0), (Ae = null), Yn(t, m, S, z), l && Hn)) {
                o = 0;
                break t;
              }
              break;
            default:
              (z = Et), (Et = 0), (Ae = null), Yn(t, m, S, z);
          }
        }
        ev(), (o = Dt);
        break;
      } catch (w) {
        Zd(t, w);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (Pe = kl = null),
      (pt = n),
      (M.H = u),
      (M.A = i),
      ft === null && ((_t = null), (st = 0), Tu()),
      o
    );
  }
  function ev() {
    for (; ft !== null; ) Fd(ft);
  }
  function lv(t, e) {
    var l = pt;
    pt |= 2;
    var n = Jd(),
      u = kd();
    _t !== t || st !== e
      ? ((ei = null), (ti = ye() + 500), Ln(t, e))
      : (Hn = ea(t, e));
    t: do
      try {
        if (Et !== 0 && ft !== null) {
          e = ft;
          var i = Ae;
          e: switch (Et) {
            case 1:
              (Et = 0), (Ae = null), Yn(t, e, i, 1);
              break;
            case 2:
            case 9:
              if (ao(i)) {
                (Et = 0), (Ae = null), $d(e);
                break;
              }
              (e = function () {
                (Et !== 2 && Et !== 9) || _t !== t || (Et = 7), Ve(t);
              }),
                i.then(e, e);
              break t;
            case 3:
              Et = 7;
              break t;
            case 4:
              Et = 5;
              break t;
            case 7:
              ao(i)
                ? ((Et = 0), (Ae = null), $d(e))
                : ((Et = 0), (Ae = null), Yn(t, e, i, 7));
              break;
            case 5:
              var o = null;
              switch (ft.tag) {
                case 26:
                  o = ft.memoizedState;
                case 5:
                case 27:
                  var m = ft;
                  if (o ? wh(o) : m.stateNode.complete) {
                    (Et = 0), (Ae = null);
                    var S = m.sibling;
                    if (S !== null) ft = S;
                    else {
                      var z = m.return;
                      z !== null ? ((ft = z), ai(z)) : (ft = null);
                    }
                    break e;
                  }
              }
              (Et = 0), (Ae = null), Yn(t, e, i, 5);
              break;
            case 6:
              (Et = 0), (Ae = null), Yn(t, e, i, 6);
              break;
            case 8:
              Hf(), (Dt = 6);
              break t;
            default:
              throw Error(f(462));
          }
        }
        nv();
        break;
      } catch (w) {
        Zd(t, w);
      }
    while (!0);
    return (
      (Pe = kl = null),
      (M.H = n),
      (M.A = u),
      (pt = l),
      ft !== null ? 0 : ((_t = null), (st = 0), Tu(), Dt)
    );
  }
  function nv() {
    for (; ft !== null && !_y(); ) Fd(ft);
  }
  function Fd(t) {
    var e = Sd(t.alternate, t, fl);
    (t.memoizedProps = t.pendingProps), e === null ? ai(t) : (ft = e);
  }
  function $d(t) {
    var e = t,
      l = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = hd(l, e, e.pendingProps, e.type, void 0, st);
        break;
      case 11:
        e = hd(l, e, e.pendingProps, e.type.render, e.ref, st);
        break;
      case 5:
        Wc(e);
      default:
        Ed(l, e), (e = ft = Js(e, fl)), (e = Sd(l, e, fl));
    }
    (t.memoizedProps = t.pendingProps), e === null ? ai(t) : (ft = e);
  }
  function Yn(t, e, l, n) {
    (Pe = kl = null), Wc(e), (xn = null), (ga = 0);
    var u = e.return;
    try {
      if (Z0(t, u, e, l, st)) {
        (Dt = 1), Zu(t, Ce(l, t.current)), (ft = null);
        return;
      }
    } catch (i) {
      if (u !== null) throw ((ft = u), i);
      (Dt = 1), Zu(t, Ce(l, t.current)), (ft = null);
      return;
    }
    e.flags & 32768
      ? (dt || n === 1
          ? (t = !0)
          : Hn || (st & 536870912) !== 0
          ? (t = !1)
          : ((_l = t = !0),
            (n === 2 || n === 9 || n === 3 || n === 6) &&
              ((n = be.current),
              n !== null && n.tag === 13 && (n.flags |= 16384))),
        Wd(e, t))
      : ai(e);
  }
  function ai(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Wd(e, _l);
        return;
      }
      t = e.return;
      var l = k0(e.alternate, e, fl);
      if (l !== null) {
        ft = l;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        ft = e;
        return;
      }
      ft = e = t;
    } while (e !== null);
    Dt === 0 && (Dt = 5);
  }
  function Wd(t, e) {
    do {
      var l = F0(t.alternate, t);
      if (l !== null) {
        (l.flags &= 32767), (ft = l);
        return;
      }
      if (
        ((l = t.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        ft = t;
        return;
      }
      ft = t = l;
    } while (t !== null);
    (Dt = 6), (ft = null);
  }
  function Pd(t, e, l, n, u, i, o, m, S) {
    t.cancelPendingCommit = null;
    do ui();
    while (Vt !== 0);
    if ((pt & 6) !== 0) throw Error(f(327));
    if (e !== null) {
      if (e === t.current) throw Error(f(177));
      if (
        ((i = e.lanes | e.childLanes),
        (i |= Oc),
        Hy(t, l, i, o, m, S),
        t === _t && ((ft = _t = null), (st = 0)),
        (qn = e),
        (xl = t),
        (rl = l),
        (Uf = i),
        (jf = u),
        (Gd = n),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            cv(cu, function () {
              return nh(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (n = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || n)
      ) {
        (n = M.T), (M.T = null), (u = Q.p), (Q.p = 2), (o = pt), (pt |= 4);
        try {
          $0(t, e, l);
        } finally {
          (pt = o), (Q.p = u), (M.T = n);
        }
      }
      (Vt = 1), Id(), th(), eh();
    }
  }
  function Id() {
    if (Vt === 1) {
      Vt = 0;
      var t = xl,
        e = qn,
        l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        (l = M.T), (M.T = null);
        var n = Q.p;
        Q.p = 2;
        var u = pt;
        pt |= 4;
        try {
          Ud(e, t);
          var i = Ff,
            o = qs(t.containerInfo),
            m = i.focusedElem,
            S = i.selectionRange;
          if (
            o !== m &&
            m &&
            m.ownerDocument &&
            Bs(m.ownerDocument.documentElement, m)
          ) {
            if (S !== null && Sc(m)) {
              var z = S.start,
                w = S.end;
              if ((w === void 0 && (w = z), "selectionStart" in m))
                (m.selectionStart = z),
                  (m.selectionEnd = Math.min(w, m.value.length));
              else {
                var q = m.ownerDocument || document,
                  C = (q && q.defaultView) || window;
                if (C.getSelection) {
                  var N = C.getSelection(),
                    J = m.textContent.length,
                    P = Math.min(S.start, J),
                    Rt = S.end === void 0 ? P : Math.min(S.end, J);
                  !N.extend && P > Rt && ((o = Rt), (Rt = P), (P = o));
                  var T = Hs(m, P),
                    A = Hs(m, Rt);
                  if (
                    T &&
                    A &&
                    (N.rangeCount !== 1 ||
                      N.anchorNode !== T.node ||
                      N.anchorOffset !== T.offset ||
                      N.focusNode !== A.node ||
                      N.focusOffset !== A.offset)
                  ) {
                    var O = q.createRange();
                    O.setStart(T.node, T.offset),
                      N.removeAllRanges(),
                      P > Rt
                        ? (N.addRange(O), N.extend(A.node, A.offset))
                        : (O.setEnd(A.node, A.offset), N.addRange(O));
                  }
                }
              }
            }
            for (q = [], N = m; (N = N.parentNode); )
              N.nodeType === 1 &&
                q.push({ element: N, left: N.scrollLeft, top: N.scrollTop });
            for (
              typeof m.focus == "function" && m.focus(), m = 0;
              m < q.length;
              m++
            ) {
              var H = q[m];
              (H.element.scrollLeft = H.left), (H.element.scrollTop = H.top);
            }
          }
          (pi = !!kf), (Ff = kf = null);
        } finally {
          (pt = u), (Q.p = n), (M.T = l);
        }
      }
      (t.current = e), (Vt = 2);
    }
  }
  function th() {
    if (Vt === 2) {
      Vt = 0;
      var t = xl,
        e = qn,
        l = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || l) {
        (l = M.T), (M.T = null);
        var n = Q.p;
        Q.p = 2;
        var u = pt;
        pt |= 4;
        try {
          Cd(t, e.alternate, e);
        } finally {
          (pt = u), (Q.p = n), (M.T = l);
        }
      }
      Vt = 3;
    }
  }
  function eh() {
    if (Vt === 4 || Vt === 3) {
      (Vt = 0), zy();
      var t = xl,
        e = qn,
        l = rl,
        n = Gd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Vt = 5)
        : ((Vt = 0), (qn = xl = null), lh(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (
        (u === 0 && (Cl = null),
        tc(l),
        (e = e.stateNode),
        ve && typeof ve.onCommitFiberRoot == "function")
      )
        try {
          ve.onCommitFiberRoot(ta, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        (e = M.T), (u = Q.p), (Q.p = 2), (M.T = null);
        try {
          for (var i = t.onRecoverableError, o = 0; o < n.length; o++) {
            var m = n[o];
            i(m.value, { componentStack: m.stack });
          }
        } finally {
          (M.T = e), (Q.p = u);
        }
      }
      (rl & 3) !== 0 && ui(),
        Ve(t),
        (u = t.pendingLanes),
        (l & 261930) !== 0 && (u & 42) !== 0
          ? t === wf
            ? wa++
            : ((wa = 0), (wf = t))
          : (wa = 0),
        Ha(0);
    }
  }
  function lh(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), va(e)));
  }
  function ui() {
    return Id(), th(), eh(), nh();
  }
  function nh() {
    if (Vt !== 5) return !1;
    var t = xl,
      e = Uf;
    Uf = 0;
    var l = tc(rl),
      n = M.T,
      u = Q.p;
    try {
      (Q.p = 32 > l ? 32 : l), (M.T = null), (l = jf), (jf = null);
      var i = xl,
        o = rl;
      if (((Vt = 0), (qn = xl = null), (rl = 0), (pt & 6) !== 0))
        throw Error(f(331));
      var m = pt;
      if (
        ((pt |= 4),
        qd(i.current),
        wd(i, i.current, o, l),
        (pt = m),
        Ha(0, !1),
        ve && typeof ve.onPostCommitFiberRoot == "function")
      )
        try {
          ve.onPostCommitFiberRoot(ta, i);
        } catch {}
      return !0;
    } finally {
      (Q.p = u), (M.T = n), lh(t, e);
    }
  }
  function ah(t, e, l) {
    (e = Ce(l, e)),
      (e = hf(t.stateNode, e, 2)),
      (t = Al(t, e, 2)),
      t !== null && (la(t, 2), Ve(t));
  }
  function At(t, e, l) {
    if (t.tag === 3) ah(t, t, l);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          ah(e, t, l);
          break;
        } else if (e.tag === 1) {
          var n = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof n.componentDidCatch == "function" &&
              (Cl === null || !Cl.has(n)))
          ) {
            (t = Ce(l, t)),
              (l = ud(2)),
              (n = Al(e, l, 2)),
              n !== null && (id(l, n, e, t), la(n, 2), Ve(n));
            break;
          }
        }
        e = e.return;
      }
  }
  function qf(t, e, l) {
    var n = t.pingCache;
    if (n === null) {
      n = t.pingCache = new I0();
      var u = new Set();
      n.set(e, u);
    } else (u = n.get(e)), u === void 0 && ((u = new Set()), n.set(e, u));
    u.has(l) ||
      ((Nf = !0), u.add(l), (t = av.bind(null, t, e, l)), e.then(t, t));
  }
  function av(t, e, l) {
    var n = t.pingCache;
    n !== null && n.delete(e),
      (t.pingedLanes |= t.suspendedLanes & l),
      (t.warmLanes &= ~l),
      _t === t &&
        (st & l) === l &&
        (Dt === 4 || (Dt === 3 && (st & 62914560) === st && 300 > ye() - Iu)
          ? (pt & 2) === 0 && Ln(t, 0)
          : (Mf |= l),
        Bn === st && (Bn = 0)),
      Ve(t);
  }
  function uh(t, e) {
    e === 0 && (e = Pr()), (t = Zl(t, e)), t !== null && (la(t, e), Ve(t));
  }
  function uv(t) {
    var e = t.memoizedState,
      l = 0;
    e !== null && (l = e.retryLane), uh(t, l);
  }
  function iv(t, e) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var n = t.stateNode,
          u = t.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        n = t.stateNode;
        break;
      case 22:
        n = t.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    n !== null && n.delete(e), uh(t, l);
  }
  function cv(t, e) {
    return $i(t, e);
  }
  var ii = null,
    Gn = null,
    Lf = !1,
    ci = !1,
    Yf = !1,
    Ml = 0;
  function Ve(t) {
    t !== Gn &&
      t.next === null &&
      (Gn === null ? (ii = Gn = t) : (Gn = Gn.next = t)),
      (ci = !0),
      Lf || ((Lf = !0), rv());
  }
  function Ha(t, e) {
    if (!Yf && ci) {
      Yf = !0;
      do
        for (var l = !1, n = ii; n !== null; ) {
          if (t !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var i = 0;
            else {
              var o = n.suspendedLanes,
                m = n.pingedLanes;
              (i = (1 << (31 - pe(42 | t) + 1)) - 1),
                (i &= u & ~(o & ~m)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0);
            }
            i !== 0 && ((l = !0), rh(n, i));
          } else
            (i = st),
              (i = ou(
                n,
                n === _t ? i : 0,
                n.cancelPendingCommit !== null || n.timeoutHandle !== -1
              )),
              (i & 3) === 0 || ea(n, i) || ((l = !0), rh(n, i));
          n = n.next;
        }
      while (l);
      Yf = !1;
    }
  }
  function fv() {
    ih();
  }
  function ih() {
    ci = Lf = !1;
    var t = 0;
    Ml !== 0 && Sv() && (t = Ml);
    for (var e = ye(), l = null, n = ii; n !== null; ) {
      var u = n.next,
        i = ch(n, e);
      i === 0
        ? ((n.next = null),
          l === null ? (ii = u) : (l.next = u),
          u === null && (Gn = l))
        : ((l = n), (t !== 0 || (i & 3) !== 0) && (ci = !0)),
        (n = u);
    }
    (Vt !== 0 && Vt !== 5) || Ha(t), Ml !== 0 && (Ml = 0);
  }
  function ch(t, e) {
    for (
      var l = t.suspendedLanes,
        n = t.pingedLanes,
        u = t.expirationTimes,
        i = t.pendingLanes & -62914561;
      0 < i;

    ) {
      var o = 31 - pe(i),
        m = 1 << o,
        S = u[o];
      S === -1
        ? ((m & l) === 0 || (m & n) !== 0) && (u[o] = wy(m, e))
        : S <= e && (t.expiredLanes |= m),
        (i &= ~m);
    }
    if (
      ((e = _t),
      (l = st),
      (l = ou(
        t,
        t === e ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      (n = t.callbackNode),
      l === 0 ||
        (t === e && (Et === 2 || Et === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        n !== null && n !== null && Wi(n),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((l & 3) === 0 || ea(t, l)) {
      if (((e = l & -l), e === t.callbackPriority)) return e;
      switch ((n !== null && Wi(n), tc(l))) {
        case 2:
        case 8:
          l = $r;
          break;
        case 32:
          l = cu;
          break;
        case 268435456:
          l = Wr;
          break;
        default:
          l = cu;
      }
      return (
        (n = fh.bind(null, t)),
        (l = $i(l, n)),
        (t.callbackPriority = e),
        (t.callbackNode = l),
        e
      );
    }
    return (
      n !== null && n !== null && Wi(n),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function fh(t, e) {
    if (Vt !== 0 && Vt !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var l = t.callbackNode;
    if (ui() && t.callbackNode !== l) return null;
    var n = st;
    return (
      (n = ou(
        t,
        t === _t ? n : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      n === 0
        ? null
        : (Qd(t, n, e),
          ch(t, ye()),
          t.callbackNode != null && t.callbackNode === l
            ? fh.bind(null, t)
            : null)
    );
  }
  function rh(t, e) {
    if (ui()) return null;
    Qd(t, e, !0);
  }
  function rv() {
    Ev(function () {
      (pt & 6) !== 0 ? $i(Fr, fv) : ih();
    });
  }
  function Gf() {
    if (Ml === 0) {
      var t = _n;
      t === 0 && ((t = fu), (fu <<= 1), (fu & 261888) === 0 && (fu = 256)),
        (Ml = t);
    }
    return Ml;
  }
  function sh(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
      ? t
      : yu("" + t);
  }
  function oh(t, e) {
    var l = e.ownerDocument.createElement("input");
    return (
      (l.name = e.name),
      (l.value = e.value),
      t.id && l.setAttribute("form", t.id),
      e.parentNode.insertBefore(l, e),
      (t = new FormData(t)),
      l.parentNode.removeChild(l),
      t
    );
  }
  function sv(t, e, l, n, u) {
    if (e === "submit" && l && l.stateNode === u) {
      var i = sh((u[ue] || null).action),
        o = n.submitter;
      o &&
        ((e = (e = o[ue] || null)
          ? sh(e.formAction)
          : o.getAttribute("formAction")),
        e !== null && ((i = e), (o = null)));
      var m = new Su("action", "action", null, n, u);
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (n.defaultPrevented) {
                if (Ml !== 0) {
                  var S = o ? oh(u, o) : new FormData(u);
                  cf(
                    l,
                    { pending: !0, data: S, method: u.method, action: i },
                    null,
                    S
                  );
                }
              } else
                typeof i == "function" &&
                  (m.preventDefault(),
                  (S = o ? oh(u, o) : new FormData(u)),
                  cf(
                    l,
                    { pending: !0, data: S, method: u.method, action: i },
                    i,
                    S
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Xf = 0; Xf < Tc.length; Xf++) {
    var Qf = Tc[Xf],
      ov = Qf.toLowerCase(),
      dv = Qf[0].toUpperCase() + Qf.slice(1);
    He(ov, "on" + dv);
  }
  He(Gs, "onAnimationEnd"),
    He(Xs, "onAnimationIteration"),
    He(Qs, "onAnimationStart"),
    He("dblclick", "onDoubleClick"),
    He("focusin", "onFocus"),
    He("focusout", "onBlur"),
    He(C0, "onTransitionRun"),
    He(x0, "onTransitionStart"),
    He(N0, "onTransitionCancel"),
    He(Vs, "onTransitionEnd"),
    dn("onMouseEnter", ["mouseout", "mouseover"]),
    dn("onMouseLeave", ["mouseout", "mouseover"]),
    dn("onPointerEnter", ["pointerout", "pointerover"]),
    dn("onPointerLeave", ["pointerout", "pointerover"]),
    Gl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Gl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Gl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Gl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Gl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Gl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var Ba =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    hv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ba)
    );
  function dh(t, e) {
    e = (e & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var n = t[l],
        u = n.event;
      n = n.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var o = n.length - 1; 0 <= o; o--) {
            var m = n[o],
              S = m.instance,
              z = m.currentTarget;
            if (((m = m.listener), S !== i && u.isPropagationStopped()))
              break t;
            (i = m), (u.currentTarget = z);
            try {
              i(u);
            } catch (w) {
              Au(w);
            }
            (u.currentTarget = null), (i = S);
          }
        else
          for (o = 0; o < n.length; o++) {
            if (
              ((m = n[o]),
              (S = m.instance),
              (z = m.currentTarget),
              (m = m.listener),
              S !== i && u.isPropagationStopped())
            )
              break t;
            (i = m), (u.currentTarget = z);
            try {
              i(u);
            } catch (w) {
              Au(w);
            }
            (u.currentTarget = null), (i = S);
          }
      }
    }
  }
  function rt(t, e) {
    var l = e[ec];
    l === void 0 && (l = e[ec] = new Set());
    var n = t + "__bubble";
    l.has(n) || (hh(e, t, 2, !1), l.add(n));
  }
  function Vf(t, e, l) {
    var n = 0;
    e && (n |= 4), hh(l, t, n, e);
  }
  var fi = "_reactListening" + Math.random().toString(36).slice(2);
  function Zf(t) {
    if (!t[fi]) {
      (t[fi] = !0),
        us.forEach(function (l) {
          l !== "selectionchange" && (hv.has(l) || Vf(l, !1, t), Vf(l, !0, t));
        });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[fi] || ((e[fi] = !0), Vf("selectionchange", !1, e));
    }
  }
  function hh(t, e, l, n) {
    switch (Xh(e)) {
      case 2:
        var u = Gv;
        break;
      case 8:
        u = Xv;
        break;
      default:
        u = ir;
    }
    (l = u.bind(null, e, l, t)),
      (u = void 0),
      !sc ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (u = !0),
      n
        ? u !== void 0
          ? t.addEventListener(e, l, { capture: !0, passive: u })
          : t.addEventListener(e, l, !0)
        : u !== void 0
        ? t.addEventListener(e, l, { passive: u })
        : t.addEventListener(e, l, !1);
  }
  function Kf(t, e, l, n, u) {
    var i = n;
    if ((e & 1) === 0 && (e & 2) === 0 && n !== null)
      t: for (;;) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var m = n.stateNode.containerInfo;
          if (m === u) break;
          if (o === 4)
            for (o = n.return; o !== null; ) {
              var S = o.tag;
              if ((S === 3 || S === 4) && o.stateNode.containerInfo === u)
                return;
              o = o.return;
            }
          for (; m !== null; ) {
            if (((o = rn(m)), o === null)) return;
            if (((S = o.tag), S === 5 || S === 6 || S === 26 || S === 27)) {
              n = i = o;
              continue t;
            }
            m = m.parentNode;
          }
        }
        n = n.return;
      }
    ps(function () {
      var z = i,
        w = fc(l),
        q = [];
      t: {
        var C = Zs.get(t);
        if (C !== void 0) {
          var N = Su,
            J = t;
          switch (t) {
            case "keypress":
              if (pu(l) === 0) break t;
            case "keydown":
            case "keyup":
              N = i0;
              break;
            case "focusin":
              (J = "focus"), (N = mc);
              break;
            case "focusout":
              (J = "blur"), (N = mc);
              break;
            case "beforeblur":
            case "afterblur":
              N = mc;
              break;
            case "click":
              if (l.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = bs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = ky;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = r0;
              break;
            case Gs:
            case Xs:
            case Qs:
              N = Wy;
              break;
            case Vs:
              N = o0;
              break;
            case "scroll":
            case "scrollend":
              N = Ky;
              break;
            case "wheel":
              N = h0;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = Iy;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = As;
              break;
            case "toggle":
            case "beforetoggle":
              N = y0;
          }
          var P = (e & 4) !== 0,
            Rt = !P && (t === "scroll" || t === "scrollend"),
            T = P ? (C !== null ? C + "Capture" : null) : C;
          P = [];
          for (var A = z, O; A !== null; ) {
            var H = A;
            if (
              ((O = H.stateNode),
              (H = H.tag),
              (H !== 5 && H !== 26 && H !== 27) ||
                O === null ||
                T === null ||
                ((H = ua(A, T)), H != null && P.push(qa(A, H, O))),
              Rt)
            )
              break;
            A = A.return;
          }
          0 < P.length &&
            ((C = new N(C, J, null, l, w)), q.push({ event: C, listeners: P }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((C = t === "mouseover" || t === "pointerover"),
            (N = t === "mouseout" || t === "pointerout"),
            C &&
              l !== cc &&
              (J = l.relatedTarget || l.fromElement) &&
              (rn(J) || J[fn]))
          )
            break t;
          if (
            (N || C) &&
            ((C =
              w.window === w
                ? w
                : (C = w.ownerDocument)
                ? C.defaultView || C.parentWindow
                : window),
            N
              ? ((J = l.relatedTarget || l.toElement),
                (N = z),
                (J = J ? rn(J) : null),
                J !== null &&
                  ((Rt = d(J)),
                  (P = J.tag),
                  J !== Rt || (P !== 5 && P !== 27 && P !== 6)) &&
                  (J = null))
              : ((N = null), (J = z)),
            N !== J)
          ) {
            if (
              ((P = bs),
              (H = "onMouseLeave"),
              (T = "onMouseEnter"),
              (A = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((P = As),
                (H = "onPointerLeave"),
                (T = "onPointerEnter"),
                (A = "pointer")),
              (Rt = N == null ? C : aa(N)),
              (O = J == null ? C : aa(J)),
              (C = new P(H, A + "leave", N, l, w)),
              (C.target = Rt),
              (C.relatedTarget = O),
              (H = null),
              rn(w) === z &&
                ((P = new P(T, A + "enter", J, l, w)),
                (P.target = O),
                (P.relatedTarget = Rt),
                (H = P)),
              (Rt = H),
              N && J)
            )
              e: {
                for (P = mv, T = N, A = J, O = 0, H = T; H; H = P(H)) O++;
                H = 0;
                for (var W = A; W; W = P(W)) H++;
                for (; 0 < O - H; ) (T = P(T)), O--;
                for (; 0 < H - O; ) (A = P(A)), H--;
                for (; O--; ) {
                  if (T === A || (A !== null && T === A.alternate)) {
                    P = T;
                    break e;
                  }
                  (T = P(T)), (A = P(A));
                }
                P = null;
              }
            else P = null;
            N !== null && mh(q, C, N, P, !1),
              J !== null && Rt !== null && mh(q, Rt, J, P, !0);
          }
        }
        t: {
          if (
            ((C = z ? aa(z) : window),
            (N = C.nodeName && C.nodeName.toLowerCase()),
            N === "select" || (N === "input" && C.type === "file"))
          )
            var mt = Ns;
          else if (Cs(C))
            if (Ms) mt = R0;
            else {
              mt = T0;
              var k = A0;
            }
          else
            (N = C.nodeName),
              !N ||
              N.toLowerCase() !== "input" ||
              (C.type !== "checkbox" && C.type !== "radio")
                ? z && ic(z.elementType) && (mt = Ns)
                : (mt = O0);
          if (mt && (mt = mt(t, z))) {
            xs(q, mt, l, w);
            break t;
          }
          k && k(t, C, z),
            t === "focusout" &&
              z &&
              C.type === "number" &&
              z.memoizedProps.value != null &&
              uc(C, "number", C.value);
        }
        switch (((k = z ? aa(z) : window), t)) {
          case "focusin":
            (Cs(k) || k.contentEditable === "true") &&
              ((gn = k), (bc = z), (ha = null));
            break;
          case "focusout":
            ha = bc = gn = null;
            break;
          case "mousedown":
            Ec = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Ec = !1), Ls(q, l, w);
            break;
          case "selectionchange":
            if (z0) break;
          case "keydown":
          case "keyup":
            Ls(q, l, w);
        }
        var ut;
        if (vc)
          t: {
            switch (t) {
              case "compositionstart":
                var ot = "onCompositionStart";
                break t;
              case "compositionend":
                ot = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ot = "onCompositionUpdate";
                break t;
            }
            ot = void 0;
          }
        else
          pn
            ? _s(t, l) && (ot = "onCompositionEnd")
            : t === "keydown" &&
              l.keyCode === 229 &&
              (ot = "onCompositionStart");
        ot &&
          (Ts &&
            l.locale !== "ko" &&
            (pn || ot !== "onCompositionStart"
              ? ot === "onCompositionEnd" && pn && (ut = gs())
              : ((yl = w),
                (oc = "value" in yl ? yl.value : yl.textContent),
                (pn = !0))),
          (k = ri(z, ot)),
          0 < k.length &&
            ((ot = new Es(ot, t, null, l, w)),
            q.push({ event: ot, listeners: k }),
            ut
              ? (ot.data = ut)
              : ((ut = zs(l)), ut !== null && (ot.data = ut)))),
          (ut = p0 ? g0(t, l) : S0(t, l)) &&
            ((ot = ri(z, "onBeforeInput")),
            0 < ot.length &&
              ((k = new Es("onBeforeInput", "beforeinput", null, l, w)),
              q.push({ event: k, listeners: ot }),
              (k.data = ut))),
          sv(q, t, z, l, w);
      }
      dh(q, e);
    });
  }
  function qa(t, e, l) {
    return { instance: t, listener: e, currentTarget: l };
  }
  function ri(t, e) {
    for (var l = e + "Capture", n = []; t !== null; ) {
      var u = t,
        i = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          i === null ||
          ((u = ua(t, l)),
          u != null && n.unshift(qa(t, u, i)),
          (u = ua(t, e)),
          u != null && n.push(qa(t, u, i))),
        t.tag === 3)
      )
        return n;
      t = t.return;
    }
    return [];
  }
  function mv(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function mh(t, e, l, n, u) {
    for (var i = e._reactName, o = []; l !== null && l !== n; ) {
      var m = l,
        S = m.alternate,
        z = m.stateNode;
      if (((m = m.tag), S !== null && S === n)) break;
      (m !== 5 && m !== 26 && m !== 27) ||
        z === null ||
        ((S = z),
        u
          ? ((z = ua(l, i)), z != null && o.unshift(qa(l, z, S)))
          : u || ((z = ua(l, i)), z != null && o.push(qa(l, z, S)))),
        (l = l.return);
    }
    o.length !== 0 && t.push({ event: e, listeners: o });
  }
  var yv = /\r\n?/g,
    vv = /\u0000|\uFFFD/g;
  function yh(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        yv,
        `
`
      )
      .replace(vv, "");
  }
  function vh(t, e) {
    return (e = yh(e)), yh(t) === e;
  }
  function Ot(t, e, l, n, u, i) {
    switch (l) {
      case "children":
        typeof n == "string"
          ? e === "body" || (e === "textarea" && n === "") || mn(t, n)
          : (typeof n == "number" || typeof n == "bigint") &&
            e !== "body" &&
            mn(t, "" + n);
        break;
      case "className":
        hu(t, "class", n);
        break;
      case "tabIndex":
        hu(t, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hu(t, l, n);
        break;
      case "style":
        ys(t, n, i);
        break;
      case "data":
        if (e !== "object") {
          hu(t, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (e !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (
          n == null ||
          typeof n == "function" ||
          typeof n == "symbol" ||
          typeof n == "boolean"
        ) {
          t.removeAttribute(l);
          break;
        }
        (n = yu("" + n)), t.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          t.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" &&
            (l === "formAction"
              ? (e !== "input" && Ot(t, e, "name", u.name, u, null),
                Ot(t, e, "formEncType", u.formEncType, u, null),
                Ot(t, e, "formMethod", u.formMethod, u, null),
                Ot(t, e, "formTarget", u.formTarget, u, null))
              : (Ot(t, e, "encType", u.encType, u, null),
                Ot(t, e, "method", u.method, u, null),
                Ot(t, e, "target", u.target, u, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          t.removeAttribute(l);
          break;
        }
        (n = yu("" + n)), t.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (t.onclick = ke);
        break;
      case "onScroll":
        n != null && rt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && rt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n)) throw Error(f(61));
          if (((l = n.__html), l != null)) {
            if (u.children != null) throw Error(f(60));
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        t.muted = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          n == null ||
          typeof n == "function" ||
          typeof n == "boolean" ||
          typeof n == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (l = yu("" + n)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        n != null && typeof n != "function" && typeof n != "symbol"
          ? t.setAttribute(l, "" + n)
          : t.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        n && typeof n != "function" && typeof n != "symbol"
          ? t.setAttribute(l, "")
          : t.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0
          ? t.setAttribute(l, "")
          : n !== !1 &&
            n != null &&
            typeof n != "function" &&
            typeof n != "symbol"
          ? t.setAttribute(l, n)
          : t.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        !isNaN(n) &&
        1 <= n
          ? t.setAttribute(l, n)
          : t.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n)
          ? t.removeAttribute(l)
          : t.setAttribute(l, n);
        break;
      case "popover":
        rt("beforetoggle", t), rt("toggle", t), du(t, "popover", n);
        break;
      case "xlinkActuate":
        Je(t, "http://www.w3.org/1999/xlink", "xlink:actuate", n);
        break;
      case "xlinkArcrole":
        Je(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", n);
        break;
      case "xlinkRole":
        Je(t, "http://www.w3.org/1999/xlink", "xlink:role", n);
        break;
      case "xlinkShow":
        Je(t, "http://www.w3.org/1999/xlink", "xlink:show", n);
        break;
      case "xlinkTitle":
        Je(t, "http://www.w3.org/1999/xlink", "xlink:title", n);
        break;
      case "xlinkType":
        Je(t, "http://www.w3.org/1999/xlink", "xlink:type", n);
        break;
      case "xmlBase":
        Je(t, "http://www.w3.org/XML/1998/namespace", "xml:base", n);
        break;
      case "xmlLang":
        Je(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", n);
        break;
      case "xmlSpace":
        Je(t, "http://www.w3.org/XML/1998/namespace", "xml:space", n);
        break;
      case "is":
        du(t, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = Vy.get(l) || l), du(t, l, n));
    }
  }
  function Jf(t, e, l, n, u, i) {
    switch (l) {
      case "style":
        ys(t, n, i);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n)) throw Error(f(61));
          if (((l = n.__html), l != null)) {
            if (u.children != null) throw Error(f(60));
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string"
          ? mn(t, n)
          : (typeof n == "number" || typeof n == "bigint") && mn(t, "" + n);
        break;
      case "onScroll":
        n != null && rt("scroll", t);
        break;
      case "onScrollEnd":
        n != null && rt("scrollend", t);
        break;
      case "onClick":
        n != null && (t.onclick = ke);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!is.hasOwnProperty(l))
          t: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((u = l.endsWith("Capture")),
              (e = l.slice(2, u ? l.length - 7 : void 0)),
              (i = t[ue] || null),
              (i = i != null ? i[l] : null),
              typeof i == "function" && t.removeEventListener(e, i, u),
              typeof n == "function")
            ) {
              typeof i != "function" &&
                i !== null &&
                (l in t
                  ? (t[l] = null)
                  : t.hasAttribute(l) && t.removeAttribute(l)),
                t.addEventListener(e, n, u);
              break t;
            }
            l in t
              ? (t[l] = n)
              : n === !0
              ? t.setAttribute(l, "")
              : du(t, l, n);
          }
    }
  }
  function Pt(t, e, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        rt("error", t), rt("load", t);
        var n = !1,
          u = !1,
          i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var o = l[i];
            if (o != null)
              switch (i) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(f(137, e));
                default:
                  Ot(t, e, i, o, l, null);
              }
          }
        u && Ot(t, e, "srcSet", l.srcSet, l, null),
          n && Ot(t, e, "src", l.src, l, null);
        return;
      case "input":
        rt("invalid", t);
        var m = (i = o = u = null),
          S = null,
          z = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var w = l[n];
            if (w != null)
              switch (n) {
                case "name":
                  u = w;
                  break;
                case "type":
                  o = w;
                  break;
                case "checked":
                  S = w;
                  break;
                case "defaultChecked":
                  z = w;
                  break;
                case "value":
                  i = w;
                  break;
                case "defaultValue":
                  m = w;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (w != null) throw Error(f(137, e));
                  break;
                default:
                  Ot(t, e, n, w, l, null);
              }
          }
        os(t, i, m, S, z, o, u, !1);
        return;
      case "select":
        rt("invalid", t), (n = o = i = null);
        for (u in l)
          if (l.hasOwnProperty(u) && ((m = l[u]), m != null))
            switch (u) {
              case "value":
                i = m;
                break;
              case "defaultValue":
                o = m;
                break;
              case "multiple":
                n = m;
              default:
                Ot(t, e, u, m, l, null);
            }
        (e = i),
          (l = o),
          (t.multiple = !!n),
          e != null ? hn(t, !!n, e, !1) : l != null && hn(t, !!n, l, !0);
        return;
      case "textarea":
        rt("invalid", t), (i = u = n = null);
        for (o in l)
          if (l.hasOwnProperty(o) && ((m = l[o]), m != null))
            switch (o) {
              case "value":
                n = m;
                break;
              case "defaultValue":
                u = m;
                break;
              case "children":
                i = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(f(91));
                break;
              default:
                Ot(t, e, o, m, l, null);
            }
        hs(t, n, u, i);
        return;
      case "option":
        for (S in l)
          if (l.hasOwnProperty(S) && ((n = l[S]), n != null))
            switch (S) {
              case "selected":
                t.selected =
                  n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                Ot(t, e, S, n, l, null);
            }
        return;
      case "dialog":
        rt("beforetoggle", t), rt("toggle", t), rt("cancel", t), rt("close", t);
        break;
      case "iframe":
      case "object":
        rt("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ba.length; n++) rt(Ba[n], t);
        break;
      case "image":
        rt("error", t), rt("load", t);
        break;
      case "details":
        rt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        rt("error", t), rt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in l)
          if (l.hasOwnProperty(z) && ((n = l[z]), n != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, e));
              default:
                Ot(t, e, z, n, l, null);
            }
        return;
      default:
        if (ic(e)) {
          for (w in l)
            l.hasOwnProperty(w) &&
              ((n = l[w]), n !== void 0 && Jf(t, e, w, n, l, void 0));
          return;
        }
    }
    for (m in l)
      l.hasOwnProperty(m) && ((n = l[m]), n != null && Ot(t, e, m, n, l, null));
  }
  function pv(t, e, l, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          i = null,
          o = null,
          m = null,
          S = null,
          z = null,
          w = null;
        for (N in l) {
          var q = l[N];
          if (l.hasOwnProperty(N) && q != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = q;
              default:
                n.hasOwnProperty(N) || Ot(t, e, N, null, n, q);
            }
        }
        for (var C in n) {
          var N = n[C];
          if (((q = l[C]), n.hasOwnProperty(C) && (N != null || q != null)))
            switch (C) {
              case "type":
                i = N;
                break;
              case "name":
                u = N;
                break;
              case "checked":
                z = N;
                break;
              case "defaultChecked":
                w = N;
                break;
              case "value":
                o = N;
                break;
              case "defaultValue":
                m = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null) throw Error(f(137, e));
                break;
              default:
                N !== q && Ot(t, e, C, N, n, q);
            }
        }
        ac(t, o, m, S, z, w, i, u);
        return;
      case "select":
        N = o = m = C = null;
        for (i in l)
          if (((S = l[i]), l.hasOwnProperty(i) && S != null))
            switch (i) {
              case "value":
                break;
              case "multiple":
                N = S;
              default:
                n.hasOwnProperty(i) || Ot(t, e, i, null, n, S);
            }
        for (u in n)
          if (
            ((i = n[u]),
            (S = l[u]),
            n.hasOwnProperty(u) && (i != null || S != null))
          )
            switch (u) {
              case "value":
                C = i;
                break;
              case "defaultValue":
                m = i;
                break;
              case "multiple":
                o = i;
              default:
                i !== S && Ot(t, e, u, i, n, S);
            }
        (e = m),
          (l = o),
          (n = N),
          C != null
            ? hn(t, !!l, C, !1)
            : !!n != !!l &&
              (e != null ? hn(t, !!l, e, !0) : hn(t, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        N = C = null;
        for (m in l)
          if (
            ((u = l[m]),
            l.hasOwnProperty(m) && u != null && !n.hasOwnProperty(m))
          )
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ot(t, e, m, null, n, u);
            }
        for (o in n)
          if (
            ((u = n[o]),
            (i = l[o]),
            n.hasOwnProperty(o) && (u != null || i != null))
          )
            switch (o) {
              case "value":
                C = u;
                break;
              case "defaultValue":
                N = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(f(91));
                break;
              default:
                u !== i && Ot(t, e, o, u, n, i);
            }
        ds(t, C, N);
        return;
      case "option":
        for (var J in l)
          if (
            ((C = l[J]),
            l.hasOwnProperty(J) && C != null && !n.hasOwnProperty(J))
          )
            switch (J) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ot(t, e, J, null, n, C);
            }
        for (S in n)
          if (
            ((C = n[S]),
            (N = l[S]),
            n.hasOwnProperty(S) && C !== N && (C != null || N != null))
          )
            switch (S) {
              case "selected":
                t.selected =
                  C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Ot(t, e, S, C, n, N);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var P in l)
          (C = l[P]),
            l.hasOwnProperty(P) &&
              C != null &&
              !n.hasOwnProperty(P) &&
              Ot(t, e, P, null, n, C);
        for (z in n)
          if (
            ((C = n[z]),
            (N = l[z]),
            n.hasOwnProperty(z) && C !== N && (C != null || N != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(f(137, e));
                break;
              default:
                Ot(t, e, z, C, n, N);
            }
        return;
      default:
        if (ic(e)) {
          for (var Rt in l)
            (C = l[Rt]),
              l.hasOwnProperty(Rt) &&
                C !== void 0 &&
                !n.hasOwnProperty(Rt) &&
                Jf(t, e, Rt, void 0, n, C);
          for (w in n)
            (C = n[w]),
              (N = l[w]),
              !n.hasOwnProperty(w) ||
                C === N ||
                (C === void 0 && N === void 0) ||
                Jf(t, e, w, C, n, N);
          return;
        }
    }
    for (var T in l)
      (C = l[T]),
        l.hasOwnProperty(T) &&
          C != null &&
          !n.hasOwnProperty(T) &&
          Ot(t, e, T, null, n, C);
    for (q in n)
      (C = n[q]),
        (N = l[q]),
        !n.hasOwnProperty(q) ||
          C === N ||
          (C == null && N == null) ||
          Ot(t, e, q, C, n, N);
  }
  function ph(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function gv() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, e = 0, l = performance.getEntriesByType("resource"), n = 0;
        n < l.length;
        n++
      ) {
        var u = l[n],
          i = u.transferSize,
          o = u.initiatorType,
          m = u.duration;
        if (i && m && ph(o)) {
          for (o = 0, m = u.responseEnd, n += 1; n < l.length; n++) {
            var S = l[n],
              z = S.startTime;
            if (z > m) break;
            var w = S.transferSize,
              q = S.initiatorType;
            w &&
              ph(q) &&
              ((S = S.responseEnd), (o += w * (S < m ? 1 : (m - z) / (S - z))));
          }
          if ((--n, (e += (8 * (i + o)) / (u.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var kf = null,
    Ff = null;
  function si(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function gh(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Sh(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function $f(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Wf = null;
  function Sv() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === Wf
        ? !1
        : ((Wf = t), !0)
      : ((Wf = null), !1);
  }
  var bh = typeof setTimeout == "function" ? setTimeout : void 0,
    bv = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Eh = typeof Promise == "function" ? Promise : void 0,
    Ev =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Eh < "u"
        ? function (t) {
            return Eh.resolve(null).then(t).catch(Av);
          }
        : bh;
  function Av(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function Dl(t) {
    return t === "head";
  }
  function Ah(t, e) {
    var l = e,
      n = 0;
    do {
      var u = l.nextSibling;
      if ((t.removeChild(l), u && u.nodeType === 8))
        if (((l = u.data), l === "/$" || l === "/&")) {
          if (n === 0) {
            t.removeChild(u), Zn(e);
            return;
          }
          n--;
        } else if (
          l === "$" ||
          l === "$?" ||
          l === "$~" ||
          l === "$!" ||
          l === "&"
        )
          n++;
        else if (l === "html") La(t.ownerDocument.documentElement);
        else if (l === "head") {
          (l = t.ownerDocument.head), La(l);
          for (var i = l.firstChild; i; ) {
            var o = i.nextSibling,
              m = i.nodeName;
            i[na] ||
              m === "SCRIPT" ||
              m === "STYLE" ||
              (m === "LINK" && i.rel.toLowerCase() === "stylesheet") ||
              l.removeChild(i),
              (i = o);
          }
        } else l === "body" && La(t.ownerDocument.body);
      l = u;
    } while (l);
    Zn(e);
  }
  function Th(t, e) {
    var l = t;
    t = 0;
    do {
      var n = l.nextSibling;
      if (
        (l.nodeType === 1
          ? e
            ? ((l._stashedDisplay = l.style.display),
              (l.style.display = "none"))
            : ((l.style.display = l._stashedDisplay || ""),
              l.getAttribute("style") === "" && l.removeAttribute("style"))
          : l.nodeType === 3 &&
            (e
              ? ((l._stashedText = l.nodeValue), (l.nodeValue = ""))
              : (l.nodeValue = l._stashedText || "")),
        n && n.nodeType === 8)
      )
        if (((l = n.data), l === "/$")) {
          if (t === 0) break;
          t--;
        } else (l !== "$" && l !== "$?" && l !== "$~" && l !== "$!") || t++;
      l = n;
    } while (l);
  }
  function Pf(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var l = e;
      switch (((e = e.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Pf(l), lc(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(l);
    }
  }
  function Tv(t, e, l, n) {
    for (; t.nodeType === 1; ) {
      var u = l;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!n && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (n) {
        if (!t[na])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((i = t.getAttribute("rel")),
                i === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                i !== u.rel ||
                t.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                t.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                t.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((i = t.getAttribute("src")),
                (i !== (u.src == null ? null : u.src) ||
                  t.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  t.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  i &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var i = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === i) return t;
      } else return t;
      if (((t = Ue(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Ov(t, e, l) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !l) ||
        ((t = Ue(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Oh(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !e) ||
        ((t = Ue(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function If(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function tr(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function Rv(t, e) {
    var l = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || l.readyState !== "loading") e();
    else {
      var n = function () {
        e(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), (t._reactRetry = n);
    }
  }
  function Ue(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&" ||
            e === "F!" ||
            e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var er = null;
  function Rh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (e === 0) return Ue(t.nextSibling);
          e--;
        } else
          (l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&") ||
            e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function _h(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (e === 0) return t;
          e--;
        } else (l !== "/$" && l !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function zh(t, e, l) {
    switch (((e = si(l)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(f(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(f(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function La(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    lc(t);
  }
  var je = new Map(),
    Ch = new Set();
  function oi(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
      ? t
      : t.ownerDocument;
  }
  var sl = Q.d;
  Q.d = { f: _v, r: zv, D: Cv, C: xv, L: Nv, m: Mv, X: Uv, S: Dv, M: jv };
  function _v() {
    var t = sl.f(),
      e = li();
    return t || e;
  }
  function zv(t) {
    var e = sn(t);
    e !== null && e.tag === 5 && e.type === "form" ? Zo(e) : sl.r(t);
  }
  var Xn = typeof document > "u" ? null : document;
  function xh(t, e, l) {
    var n = Xn;
    if (n && typeof e == "string" && e) {
      var u = _e(e);
      (u = 'link[rel="' + t + '"][href="' + u + '"]'),
        typeof l == "string" && (u += '[crossorigin="' + l + '"]'),
        Ch.has(u) ||
          (Ch.add(u),
          (t = { rel: t, crossOrigin: l, href: e }),
          n.querySelector(u) === null &&
            ((e = n.createElement("link")),
            Pt(e, "link", t),
            Zt(e),
            n.head.appendChild(e)));
    }
  }
  function Cv(t) {
    sl.D(t), xh("dns-prefetch", t, null);
  }
  function xv(t, e) {
    sl.C(t, e), xh("preconnect", t, e);
  }
  function Nv(t, e, l) {
    sl.L(t, e, l);
    var n = Xn;
    if (n && t && e) {
      var u = 'link[rel="preload"][as="' + _e(e) + '"]';
      e === "image" && l && l.imageSrcSet
        ? ((u += '[imagesrcset="' + _e(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (u += '[imagesizes="' + _e(l.imageSizes) + '"]'))
        : (u += '[href="' + _e(t) + '"]');
      var i = u;
      switch (e) {
        case "style":
          i = Qn(t);
          break;
        case "script":
          i = Vn(t);
      }
      je.has(i) ||
        ((t = b(
          {
            rel: "preload",
            href: e === "image" && l && l.imageSrcSet ? void 0 : t,
            as: e,
          },
          l
        )),
        je.set(i, t),
        n.querySelector(u) !== null ||
          (e === "style" && n.querySelector(Ya(i))) ||
          (e === "script" && n.querySelector(Ga(i))) ||
          ((e = n.createElement("link")),
          Pt(e, "link", t),
          Zt(e),
          n.head.appendChild(e)));
    }
  }
  function Mv(t, e) {
    sl.m(t, e);
    var l = Xn;
    if (l && t) {
      var n = e && typeof e.as == "string" ? e.as : "script",
        u =
          'link[rel="modulepreload"][as="' + _e(n) + '"][href="' + _e(t) + '"]',
        i = u;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Vn(t);
      }
      if (
        !je.has(i) &&
        ((t = b({ rel: "modulepreload", href: t }, e)),
        je.set(i, t),
        l.querySelector(u) === null)
      ) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Ga(i))) return;
        }
        (n = l.createElement("link")),
          Pt(n, "link", t),
          Zt(n),
          l.head.appendChild(n);
      }
    }
  }
  function Dv(t, e, l) {
    sl.S(t, e, l);
    var n = Xn;
    if (n && t) {
      var u = on(n).hoistableStyles,
        i = Qn(t);
      e = e || "default";
      var o = u.get(i);
      if (!o) {
        var m = { loading: 0, preload: null };
        if ((o = n.querySelector(Ya(i)))) m.loading = 5;
        else {
          (t = b({ rel: "stylesheet", href: t, "data-precedence": e }, l)),
            (l = je.get(i)) && lr(t, l);
          var S = (o = n.createElement("link"));
          Zt(S),
            Pt(S, "link", t),
            (S._p = new Promise(function (z, w) {
              (S.onload = z), (S.onerror = w);
            })),
            S.addEventListener("load", function () {
              m.loading |= 1;
            }),
            S.addEventListener("error", function () {
              m.loading |= 2;
            }),
            (m.loading |= 4),
            di(o, e, n);
        }
        (o = { type: "stylesheet", instance: o, count: 1, state: m }),
          u.set(i, o);
      }
    }
  }
  function Uv(t, e) {
    sl.X(t, e);
    var l = Xn;
    if (l && t) {
      var n = on(l).hoistableScripts,
        u = Vn(t),
        i = n.get(u);
      i ||
        ((i = l.querySelector(Ga(u))),
        i ||
          ((t = b({ src: t, async: !0 }, e)),
          (e = je.get(u)) && nr(t, e),
          (i = l.createElement("script")),
          Zt(i),
          Pt(i, "link", t),
          l.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        n.set(u, i));
    }
  }
  function jv(t, e) {
    sl.M(t, e);
    var l = Xn;
    if (l && t) {
      var n = on(l).hoistableScripts,
        u = Vn(t),
        i = n.get(u);
      i ||
        ((i = l.querySelector(Ga(u))),
        i ||
          ((t = b({ src: t, async: !0, type: "module" }, e)),
          (e = je.get(u)) && nr(t, e),
          (i = l.createElement("script")),
          Zt(i),
          Pt(i, "link", t),
          l.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        n.set(u, i));
    }
  }
  function Nh(t, e, l, n) {
    var u = (u = ct.current) ? oi(u) : null;
    if (!u) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((e = Qn(l.href)),
            (l = on(u).hoistableStyles),
            (n = l.get(e)),
            n ||
              ((n = { type: "style", instance: null, count: 0, state: null }),
              l.set(e, n)),
            n)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          t = Qn(l.href);
          var i = on(u).hoistableStyles,
            o = i.get(t);
          if (
            (o ||
              ((u = u.ownerDocument || u),
              (o = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(t, o),
              (i = u.querySelector(Ya(t))) &&
                !i._p &&
                ((o.instance = i), (o.state.loading = 5)),
              je.has(t) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                je.set(t, l),
                i || wv(u, t, l, o.state))),
            e && n === null)
          )
            throw Error(f(528, ""));
          return o;
        }
        if (e && n !== null) throw Error(f(529, ""));
        return null;
      case "script":
        return (
          (e = l.async),
          (l = l.src),
          typeof l == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = Vn(l)),
              (l = on(u).hoistableScripts),
              (n = l.get(e)),
              n ||
                ((n = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(e, n)),
              n)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(f(444, t));
    }
  }
  function Qn(t) {
    return 'href="' + _e(t) + '"';
  }
  function Ya(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Mh(t) {
    return b({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function wv(t, e, l, n) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (n.loading = 1)
      : ((e = t.createElement("link")),
        (n.preload = e),
        e.addEventListener("load", function () {
          return (n.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (n.loading |= 2);
        }),
        Pt(e, "link", l),
        Zt(e),
        t.head.appendChild(e));
  }
  function Vn(t) {
    return '[src="' + _e(t) + '"]';
  }
  function Ga(t) {
    return "script[async]" + t;
  }
  function Dh(t, e, l) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var n = t.querySelector('style[data-href~="' + _e(l.href) + '"]');
          if (n) return (e.instance = n), Zt(n), n;
          var u = b({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (n = (t.ownerDocument || t).createElement("style")),
            Zt(n),
            Pt(n, "style", u),
            di(n, l.precedence, t),
            (e.instance = n)
          );
        case "stylesheet":
          u = Qn(l.href);
          var i = t.querySelector(Ya(u));
          if (i) return (e.state.loading |= 4), (e.instance = i), Zt(i), i;
          (n = Mh(l)),
            (u = je.get(u)) && lr(n, u),
            (i = (t.ownerDocument || t).createElement("link")),
            Zt(i);
          var o = i;
          return (
            (o._p = new Promise(function (m, S) {
              (o.onload = m), (o.onerror = S);
            })),
            Pt(i, "link", n),
            (e.state.loading |= 4),
            di(i, l.precedence, t),
            (e.instance = i)
          );
        case "script":
          return (
            (i = Vn(l.src)),
            (u = t.querySelector(Ga(i)))
              ? ((e.instance = u), Zt(u), u)
              : ((n = l),
                (u = je.get(i)) && ((n = b({}, l)), nr(n, u)),
                (t = t.ownerDocument || t),
                (u = t.createElement("script")),
                Zt(u),
                Pt(u, "link", n),
                t.head.appendChild(u),
                (e.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(f(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((n = e.instance), (e.state.loading |= 4), di(n, l.precedence, t));
    return e.instance;
  }
  function di(t, e, l) {
    for (
      var n = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = n.length ? n[n.length - 1] : null,
        i = u,
        o = 0;
      o < n.length;
      o++
    ) {
      var m = n[o];
      if (m.dataset.precedence === e) i = m;
      else if (i !== u) break;
    }
    i
      ? i.parentNode.insertBefore(t, i.nextSibling)
      : ((e = l.nodeType === 9 ? l.head : l), e.insertBefore(t, e.firstChild));
  }
  function lr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title);
  }
  function nr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity);
  }
  var hi = null;
  function Uh(t, e, l) {
    if (hi === null) {
      var n = new Map(),
        u = (hi = new Map());
      u.set(l, n);
    } else (u = hi), (n = u.get(l)), n || ((n = new Map()), u.set(l, n));
    if (n.has(t)) return n;
    for (
      n.set(t, null), l = l.getElementsByTagName(t), u = 0;
      u < l.length;
      u++
    ) {
      var i = l[u];
      if (
        !(
          i[na] ||
          i[kt] ||
          (t === "link" && i.getAttribute("rel") === "stylesheet")
        ) &&
        i.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var o = i.getAttribute(e) || "";
        o = t + o;
        var m = n.get(o);
        m ? m.push(i) : n.set(o, [i]);
      }
    }
    return n;
  }
  function jh(t, e, l) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        l,
        e === "title" ? t.querySelector("head > title") : null
      );
  }
  function Hv(t, e, l) {
    if (l === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case "stylesheet":
            return (
              (t = e.disabled), typeof e.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function wh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Bv(t, e, l, n) {
    if (
      l.type === "stylesheet" &&
      (typeof n.media != "string" || matchMedia(n.media).matches !== !1) &&
      (l.state.loading & 4) === 0
    ) {
      if (l.instance === null) {
        var u = Qn(n.href),
          i = e.querySelector(Ya(u));
        if (i) {
          (e = i._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = mi.bind(t)), e.then(t, t)),
            (l.state.loading |= 4),
            (l.instance = i),
            Zt(i);
          return;
        }
        (i = e.ownerDocument || e),
          (n = Mh(n)),
          (u = je.get(u)) && lr(n, u),
          (i = i.createElement("link")),
          Zt(i);
        var o = i;
        (o._p = new Promise(function (m, S) {
          (o.onload = m), (o.onerror = S);
        })),
          Pt(i, "link", n),
          (l.instance = i);
      }
      t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(l, e),
        (e = l.state.preload) &&
          (l.state.loading & 3) === 0 &&
          (t.count++,
          (l = mi.bind(t)),
          e.addEventListener("load", l),
          e.addEventListener("error", l));
    }
  }
  var ar = 0;
  function qv(t, e) {
    return (
      t.stylesheets && t.count === 0 && vi(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (l) {
            var n = setTimeout(function () {
              if ((t.stylesheets && vi(t, t.stylesheets), t.unsuspend)) {
                var i = t.unsuspend;
                (t.unsuspend = null), i();
              }
            }, 6e4 + e);
            0 < t.imgBytes && ar === 0 && (ar = 62500 * gv());
            var u = setTimeout(function () {
              if (
                ((t.waitingForImages = !1),
                t.count === 0 &&
                  (t.stylesheets && vi(t, t.stylesheets), t.unsuspend))
              ) {
                var i = t.unsuspend;
                (t.unsuspend = null), i();
              }
            }, (t.imgBytes > ar ? 50 : 800) + e);
            return (
              (t.unsuspend = l),
              function () {
                (t.unsuspend = null), clearTimeout(n), clearTimeout(u);
              }
            );
          }
        : null
    );
  }
  function mi() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) vi(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var yi = null;
  function vi(t, e) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (yi = new Map()),
        e.forEach(Lv, t),
        (yi = null),
        mi.call(t));
  }
  function Lv(t, e) {
    if (!(e.state.loading & 4)) {
      var l = yi.get(t);
      if (l) var n = l.get(null);
      else {
        (l = new Map()), yi.set(t, l);
        for (
          var u = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            i = 0;
          i < u.length;
          i++
        ) {
          var o = u[i];
          (o.nodeName === "LINK" || o.getAttribute("media") !== "not all") &&
            (l.set(o.dataset.precedence, o), (n = o));
        }
        n && l.set(null, n);
      }
      (u = e.instance),
        (o = u.getAttribute("data-precedence")),
        (i = l.get(o) || n),
        i === n && l.set(null, u),
        l.set(o, u),
        this.count++,
        (n = mi.bind(this)),
        u.addEventListener("load", n),
        u.addEventListener("error", n),
        i
          ? i.parentNode.insertBefore(u, i.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(u, t.firstChild)),
        (e.state.loading |= 4);
    }
  }
  var Xa = {
    $$typeof: Z,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function Yv(t, e, l, n, u, i, o, m, S) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Pi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Pi(0)),
      (this.hiddenUpdates = Pi(null)),
      (this.identifierPrefix = n),
      (this.onUncaughtError = u),
      (this.onCaughtError = i),
      (this.onRecoverableError = o),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = S),
      (this.incompleteTransitions = new Map());
  }
  function Hh(t, e, l, n, u, i, o, m, S, z, w, q) {
    return (
      (t = new Yv(t, e, l, o, S, z, w, q, m)),
      (e = 1),
      i === !0 && (e |= 24),
      (i = Se(3, null, null, e)),
      (t.current = i),
      (i.stateNode = t),
      (e = Hc()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (i.memoizedState = { element: n, isDehydrated: l, cache: e }),
      Yc(i),
      t
    );
  }
  function Bh(t) {
    return t ? ((t = En), t) : En;
  }
  function qh(t, e, l, n, u, i) {
    (u = Bh(u)),
      n.context === null ? (n.context = u) : (n.pendingContext = u),
      (n = El(e)),
      (n.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (n.callback = i),
      (l = Al(t, n, e)),
      l !== null && (oe(l, t, e), ba(l, t, e));
  }
  function Lh(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < e ? l : e;
    }
  }
  function ur(t, e) {
    Lh(t, e), (t = t.alternate) && Lh(t, e);
  }
  function Yh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Zl(t, 67108864);
      e !== null && oe(e, t, 67108864), ur(t, 67108864);
    }
  }
  function Gh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Oe();
      e = Ii(e);
      var l = Zl(t, e);
      l !== null && oe(l, t, e), ur(t, e);
    }
  }
  var pi = !0;
  function Gv(t, e, l, n) {
    var u = M.T;
    M.T = null;
    var i = Q.p;
    try {
      (Q.p = 2), ir(t, e, l, n);
    } finally {
      (Q.p = i), (M.T = u);
    }
  }
  function Xv(t, e, l, n) {
    var u = M.T;
    M.T = null;
    var i = Q.p;
    try {
      (Q.p = 8), ir(t, e, l, n);
    } finally {
      (Q.p = i), (M.T = u);
    }
  }
  function ir(t, e, l, n) {
    if (pi) {
      var u = cr(n);
      if (u === null) Kf(t, e, n, gi, l), Qh(t, n);
      else if (Vv(u, t, e, l, n)) n.stopPropagation();
      else if ((Qh(t, n), e & 4 && -1 < Qv.indexOf(t))) {
        for (; u !== null; ) {
          var i = sn(u);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var o = Yl(i.pendingLanes);
                  if (o !== 0) {
                    var m = i;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; o; ) {
                      var S = 1 << (31 - pe(o));
                      (m.entanglements[1] |= S), (o &= ~S);
                    }
                    Ve(i), (pt & 6) === 0 && ((ti = ye() + 500), Ha(0));
                  }
                }
                break;
              case 31:
              case 13:
                (m = Zl(i, 2)), m !== null && oe(m, i, 2), li(), ur(i, 2);
            }
          if (((i = cr(n)), i === null && Kf(t, e, n, gi, l), i === u)) break;
          u = i;
        }
        u !== null && n.stopPropagation();
      } else Kf(t, e, n, null, l);
    }
  }
  function cr(t) {
    return (t = fc(t)), fr(t);
  }
  var gi = null;
  function fr(t) {
    if (((gi = null), (t = rn(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var l = e.tag;
        if (l === 13) {
          if (((t = h(e)), t !== null)) return t;
          t = null;
        } else if (l === 31) {
          if (((t = p(e)), t !== null)) return t;
          t = null;
        } else if (l === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return (gi = t), null;
  }
  function Xh(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Cy()) {
          case Fr:
            return 2;
          case $r:
            return 8;
          case cu:
          case xy:
            return 32;
          case Wr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var rr = !1,
    Ul = null,
    jl = null,
    wl = null,
    Qa = new Map(),
    Va = new Map(),
    Hl = [],
    Qv =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Qh(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ul = null;
        break;
      case "dragenter":
      case "dragleave":
        jl = null;
        break;
      case "mouseover":
      case "mouseout":
        wl = null;
        break;
      case "pointerover":
      case "pointerout":
        Qa.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Va.delete(e.pointerId);
    }
  }
  function Za(t, e, l, n, u, i) {
    return t === null || t.nativeEvent !== i
      ? ((t = {
          blockedOn: e,
          domEventName: l,
          eventSystemFlags: n,
          nativeEvent: i,
          targetContainers: [u],
        }),
        e !== null && ((e = sn(e)), e !== null && Yh(e)),
        t)
      : ((t.eventSystemFlags |= n),
        (e = t.targetContainers),
        u !== null && e.indexOf(u) === -1 && e.push(u),
        t);
  }
  function Vv(t, e, l, n, u) {
    switch (e) {
      case "focusin":
        return (Ul = Za(Ul, t, e, l, n, u)), !0;
      case "dragenter":
        return (jl = Za(jl, t, e, l, n, u)), !0;
      case "mouseover":
        return (wl = Za(wl, t, e, l, n, u)), !0;
      case "pointerover":
        var i = u.pointerId;
        return Qa.set(i, Za(Qa.get(i) || null, t, e, l, n, u)), !0;
      case "gotpointercapture":
        return (
          (i = u.pointerId), Va.set(i, Za(Va.get(i) || null, t, e, l, n, u)), !0
        );
    }
    return !1;
  }
  function Vh(t) {
    var e = rn(t.target);
    if (e !== null) {
      var l = d(e);
      if (l !== null) {
        if (((e = l.tag), e === 13)) {
          if (((e = h(l)), e !== null)) {
            (t.blockedOn = e),
              ns(t.priority, function () {
                Gh(l);
              });
            return;
          }
        } else if (e === 31) {
          if (((e = p(l)), e !== null)) {
            (t.blockedOn = e),
              ns(t.priority, function () {
                Gh(l);
              });
            return;
          }
        } else if (e === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Si(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var l = cr(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var n = new l.constructor(l.type, l);
        (cc = n), l.target.dispatchEvent(n), (cc = null);
      } else return (e = sn(l)), e !== null && Yh(e), (t.blockedOn = l), !1;
      e.shift();
    }
    return !0;
  }
  function Zh(t, e, l) {
    Si(t) && l.delete(e);
  }
  function Zv() {
    (rr = !1),
      Ul !== null && Si(Ul) && (Ul = null),
      jl !== null && Si(jl) && (jl = null),
      wl !== null && Si(wl) && (wl = null),
      Qa.forEach(Zh),
      Va.forEach(Zh);
  }
  function bi(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      rr ||
        ((rr = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, Zv)));
  }
  var Ei = null;
  function Kh(t) {
    Ei !== t &&
      ((Ei = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Ei === t && (Ei = null);
        for (var e = 0; e < t.length; e += 3) {
          var l = t[e],
            n = t[e + 1],
            u = t[e + 2];
          if (typeof n != "function") {
            if (fr(n || l) === null) continue;
            break;
          }
          var i = sn(l);
          i !== null &&
            (t.splice(e, 3),
            (e -= 3),
            cf(i, { pending: !0, data: u, method: l.method, action: n }, n, u));
        }
      }));
  }
  function Zn(t) {
    function e(S) {
      return bi(S, t);
    }
    Ul !== null && bi(Ul, t),
      jl !== null && bi(jl, t),
      wl !== null && bi(wl, t),
      Qa.forEach(e),
      Va.forEach(e);
    for (var l = 0; l < Hl.length; l++) {
      var n = Hl[l];
      n.blockedOn === t && (n.blockedOn = null);
    }
    for (; 0 < Hl.length && ((l = Hl[0]), l.blockedOn === null); )
      Vh(l), l.blockedOn === null && Hl.shift();
    if (((l = (t.ownerDocument || t).$$reactFormReplay), l != null))
      for (n = 0; n < l.length; n += 3) {
        var u = l[n],
          i = l[n + 1],
          o = u[ue] || null;
        if (typeof i == "function") o || Kh(l);
        else if (o) {
          var m = null;
          if (i && i.hasAttribute("formAction")) {
            if (((u = i), (o = i[ue] || null))) m = o.formAction;
            else if (fr(u) !== null) continue;
          } else m = o.action;
          typeof m == "function" ? (l[n + 1] = m) : (l.splice(n, 3), (n -= 3)),
            Kh(l);
        }
      }
  }
  function Jh() {
    function t(i) {
      i.canIntercept &&
        i.info === "react-transition" &&
        i.intercept({
          handler: function () {
            return new Promise(function (o) {
              return (u = o);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      u !== null && (u(), (u = null)), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var i = navigation.currentEntry;
        i &&
          i.url != null &&
          navigation.navigate(i.url, {
            state: i.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var n = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(l, 100),
        function () {
          (n = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            u !== null && (u(), (u = null));
        }
      );
    }
  }
  function sr(t) {
    this._internalRoot = t;
  }
  (Ai.prototype.render = sr.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(f(409));
      var l = e.current,
        n = Oe();
      qh(l, n, t, e, null, null);
    }),
    (Ai.prototype.unmount = sr.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          qh(t.current, 2, null, t, null, null), li(), (e[fn] = null);
        }
      });
  function Ai(t) {
    this._internalRoot = t;
  }
  Ai.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = ls();
      t = { blockedOn: null, target: t, priority: e };
      for (var l = 0; l < Hl.length && e !== 0 && e < Hl[l].priority; l++);
      Hl.splice(l, 0, t), l === 0 && Vh(t);
    }
  };
  var kh = c.version;
  if (kh !== "19.2.0") throw Error(f(527, kh, "19.2.0"));
  Q.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(f(188))
        : ((t = Object.keys(t).join(",")), Error(f(268, t)));
    return (
      (t = y(e)),
      (t = t !== null ? g(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var Kv = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ti = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ti.isDisabled && Ti.supportsFiber)
      try {
        (ta = Ti.inject(Kv)), (ve = Ti);
      } catch {}
  }
  return (
    (Ja.createRoot = function (t, e) {
      if (!s(t)) throw Error(f(299));
      var l = !1,
        n = "",
        u = ed,
        i = ld,
        o = nd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (l = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (o = e.onRecoverableError)),
        (e = Hh(t, 1, !1, null, null, l, n, null, u, i, o, Jh)),
        (t[fn] = e.current),
        Zf(t),
        new sr(e)
      );
    }),
    (Ja.hydrateRoot = function (t, e, l) {
      if (!s(t)) throw Error(f(299));
      var n = !1,
        u = "",
        i = ed,
        o = ld,
        m = nd,
        S = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (n = !0),
          l.identifierPrefix !== void 0 && (u = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (o = l.onCaughtError),
          l.onRecoverableError !== void 0 && (m = l.onRecoverableError),
          l.formState !== void 0 && (S = l.formState)),
        (e = Hh(t, 1, !0, e, l ?? null, n, u, S, i, o, m, Jh)),
        (e.context = Bh(null)),
        (l = e.current),
        (n = Oe()),
        (n = Ii(n)),
        (u = El(n)),
        (u.callback = null),
        Al(l, u, n),
        (l = n),
        (e.current.lanes = l),
        la(e, l),
        Ve(e),
        (t[fn] = e.current),
        Zf(t),
        new Ai(e)
      );
    }),
    (Ja.version = "19.2.0"),
    Ja
  );
}
var am;
function np() {
  if (am) return hr.exports;
  am = 1;
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), (hr.exports = lp()), hr.exports;
}
var ap = np();
var um = "popstate";
function up(a = {}) {
  function c(f, s) {
    let { pathname: d, search: h, hash: p } = f.location;
    return Or(
      "",
      { pathname: d, search: h, hash: p },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default"
    );
  }
  function r(f, s) {
    return typeof s == "string" ? s : Ia(s);
  }
  return cp(c, r, null, a);
}
function Nt(a, c) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(c);
}
function we(a, c) {
  if (!a) {
    typeof console < "u" && console.warn(c);
    try {
      throw new Error(c);
    } catch {}
  }
}
function ip() {
  return Math.random().toString(36).substring(2, 10);
}
function im(a, c) {
  return { usr: a.state, key: a.key, idx: c };
}
function Or(a, c, r = null, f) {
  return {
    pathname: typeof a == "string" ? a : a.pathname,
    search: "",
    hash: "",
    ...(typeof c == "string" ? kn(c) : c),
    state: r,
    key: (c && c.key) || f || ip(),
  };
}
function Ia({ pathname: a = "/", search: c = "", hash: r = "" }) {
  return (
    c && c !== "?" && (a += c.charAt(0) === "?" ? c : "?" + c),
    r && r !== "#" && (a += r.charAt(0) === "#" ? r : "#" + r),
    a
  );
}
function kn(a) {
  let c = {};
  if (a) {
    let r = a.indexOf("#");
    r >= 0 && ((c.hash = a.substring(r)), (a = a.substring(0, r)));
    let f = a.indexOf("?");
    f >= 0 && ((c.search = a.substring(f)), (a = a.substring(0, f))),
      a && (c.pathname = a);
  }
  return c;
}
function cp(a, c, r, f = {}) {
  let { window: s = document.defaultView, v5Compat: d = !1 } = f,
    h = s.history,
    p = "POP",
    v = null,
    y = g();
  y == null && ((y = 0), h.replaceState({ ...h.state, idx: y }, ""));
  function g() {
    return (h.state || { idx: null }).idx;
  }
  function b() {
    p = "POP";
    let _ = g(),
      G = _ == null ? null : _ - y;
    (y = _), v && v({ action: p, location: L.location, delta: G });
  }
  function D(_, G) {
    p = "PUSH";
    let X = Or(L.location, _, G);
    y = g() + 1;
    let Z = im(X, y),
      I = L.createHref(X);
    try {
      h.pushState(Z, "", I);
    } catch (it) {
      if (it instanceof DOMException && it.name === "DataCloneError") throw it;
      s.location.assign(I);
    }
    d && v && v({ action: p, location: L.location, delta: 1 });
  }
  function Y(_, G) {
    p = "REPLACE";
    let X = Or(L.location, _, G);
    y = g();
    let Z = im(X, y),
      I = L.createHref(X);
    h.replaceState(Z, "", I),
      d && v && v({ action: p, location: L.location, delta: 0 });
  }
  function R(_) {
    return fp(_);
  }
  let L = {
    get action() {
      return p;
    },
    get location() {
      return a(s, h);
    },
    listen(_) {
      if (v) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(um, b),
        (v = _),
        () => {
          s.removeEventListener(um, b), (v = null);
        }
      );
    },
    createHref(_) {
      return c(s, _);
    },
    createURL: R,
    encodeLocation(_) {
      let G = R(_);
      return { pathname: G.pathname, search: G.search, hash: G.hash };
    },
    push: D,
    replace: Y,
    go(_) {
      return h.go(_);
    },
  };
  return L;
}
function fp(a, c = !1) {
  let r = "http://localhost";
  typeof window < "u" &&
    (r =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Nt(r, "No window.location.(origin|href) available to create URL");
  let f = typeof a == "string" ? a : Ia(a);
  return (
    (f = f.replace(/ $/, "%20")),
    !c && f.startsWith("//") && (f = r + f),
    new URL(f, r)
  );
}
function Nm(a, c, r = "/") {
  return rp(a, c, r, !1);
}
function rp(a, c, r, f) {
  let s = typeof c == "string" ? kn(c) : c,
    d = dl(s.pathname || "/", r);
  if (d == null) return null;
  let h = Mm(a);
  sp(h);
  let p = null;
  for (let v = 0; p == null && v < h.length; ++v) {
    let y = Ep(d);
    p = Sp(h[v], y, f);
  }
  return p;
}
function Mm(a, c = [], r = [], f = "", s = !1) {
  let d = (h, p, v = s, y) => {
    let g = {
      relativePath: y === void 0 ? h.path || "" : y,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: p,
      route: h,
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(f) && v) return;
      Nt(
        g.relativePath.startsWith(f),
        `Absolute route path "${g.relativePath}" nested under path "${f}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (g.relativePath = g.relativePath.slice(f.length));
    }
    let b = ol([f, g.relativePath]),
      D = r.concat(g);
    h.children &&
      h.children.length > 0 &&
      (Nt(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      Mm(h.children, c, D, b, v)),
      !(h.path == null && !h.index) &&
        c.push({ path: b, score: pp(b, h.index), routesMeta: D });
  };
  return (
    a.forEach((h, p) => {
      if (h.path === "" || !h.path?.includes("?")) d(h, p);
      else for (let v of Dm(h.path)) d(h, p, !0, v);
    }),
    c
  );
}
function Dm(a) {
  let c = a.split("/");
  if (c.length === 0) return [];
  let [r, ...f] = c,
    s = r.endsWith("?"),
    d = r.replace(/\?$/, "");
  if (f.length === 0) return s ? [d, ""] : [d];
  let h = Dm(f.join("/")),
    p = [];
  return (
    p.push(...h.map((v) => (v === "" ? d : [d, v].join("/")))),
    s && p.push(...h),
    p.map((v) => (a.startsWith("/") && v === "" ? "/" : v))
  );
}
function sp(a) {
  a.sort((c, r) =>
    c.score !== r.score
      ? r.score - c.score
      : gp(
          c.routesMeta.map((f) => f.childrenIndex),
          r.routesMeta.map((f) => f.childrenIndex)
        )
  );
}
var op = /^:[\w-]+$/,
  dp = 3,
  hp = 2,
  mp = 1,
  yp = 10,
  vp = -2,
  cm = (a) => a === "*";
function pp(a, c) {
  let r = a.split("/"),
    f = r.length;
  return (
    r.some(cm) && (f += vp),
    c && (f += hp),
    r
      .filter((s) => !cm(s))
      .reduce((s, d) => s + (op.test(d) ? dp : d === "" ? mp : yp), f)
  );
}
function gp(a, c) {
  return a.length === c.length && a.slice(0, -1).every((f, s) => f === c[s])
    ? a[a.length - 1] - c[c.length - 1]
    : 0;
}
function Sp(a, c, r = !1) {
  let { routesMeta: f } = a,
    s = {},
    d = "/",
    h = [];
  for (let p = 0; p < f.length; ++p) {
    let v = f[p],
      y = p === f.length - 1,
      g = d === "/" ? c : c.slice(d.length) || "/",
      b = Mi(
        { path: v.relativePath, caseSensitive: v.caseSensitive, end: y },
        g
      ),
      D = v.route;
    if (
      (!b &&
        y &&
        r &&
        !f[f.length - 1].route.index &&
        (b = Mi(
          { path: v.relativePath, caseSensitive: v.caseSensitive, end: !1 },
          g
        )),
      !b)
    )
      return null;
    Object.assign(s, b.params),
      h.push({
        params: s,
        pathname: ol([d, b.pathname]),
        pathnameBase: _p(ol([d, b.pathnameBase])),
        route: D,
      }),
      b.pathnameBase !== "/" && (d = ol([d, b.pathnameBase]));
  }
  return h;
}
function Mi(a, c) {
  typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
  let [r, f] = bp(a.path, a.caseSensitive, a.end),
    s = c.match(r);
  if (!s) return null;
  let d = s[0],
    h = d.replace(/(.)\/+$/, "$1"),
    p = s.slice(1);
  return {
    params: f.reduce((y, { paramName: g, isOptional: b }, D) => {
      if (g === "*") {
        let R = p[D] || "";
        h = d.slice(0, d.length - R.length).replace(/(.)\/+$/, "$1");
      }
      const Y = p[D];
      return (
        b && !Y ? (y[g] = void 0) : (y[g] = (Y || "").replace(/%2F/g, "/")), y
      );
    }, {}),
    pathname: d,
    pathnameBase: h,
    pattern: a,
  };
}
function bp(a, c = !1, r = !0) {
  we(
    a === "*" || !a.endsWith("*") || a.endsWith("/*"),
    `Route path "${a}" will be treated as if it were "${a.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let f = [],
    s =
      "^" +
      a
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (h, p, v) => (
            f.push({ paramName: p, isOptional: v != null }),
            v ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    a.endsWith("*")
      ? (f.push({ paramName: "*" }),
        (s += a === "*" || a === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
      ? (s += "\\/*$")
      : a !== "" && a !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, c ? void 0 : "i"), f]
  );
}
function Ep(a) {
  try {
    return a
      .split("/")
      .map((c) => decodeURIComponent(c).replace(/\//g, "%2F"))
      .join("/");
  } catch (c) {
    return (
      we(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${c}).`
      ),
      a
    );
  }
}
function dl(a, c) {
  if (c === "/") return a;
  if (!a.toLowerCase().startsWith(c.toLowerCase())) return null;
  let r = c.endsWith("/") ? c.length - 1 : c.length,
    f = a.charAt(r);
  return f && f !== "/" ? null : a.slice(r) || "/";
}
var Ap = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Tp = (a) => Ap.test(a);
function Op(a, c = "/") {
  let {
      pathname: r,
      search: f = "",
      hash: s = "",
    } = typeof a == "string" ? kn(a) : a,
    d;
  if (r)
    if (Tp(r)) d = r;
    else {
      if (r.includes("//")) {
        let h = r;
        (r = r.replace(/\/\/+/g, "/")),
          we(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ${h} -> ${r}`
          );
      }
      r.startsWith("/") ? (d = fm(r.substring(1), "/")) : (d = fm(r, c));
    }
  else d = c;
  return { pathname: d, search: zp(f), hash: Cp(s) };
}
function fm(a, c) {
  let r = c.replace(/\/+$/, "").split("/");
  return (
    a.split("/").forEach((s) => {
      s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function pr(a, c, r, f) {
  return `Cannot include a '${a}' character in a manually specified \`to.${c}\` field [${JSON.stringify(
    f
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Rp(a) {
  return a.filter(
    (c, r) => r === 0 || (c.route.path && c.route.path.length > 0)
  );
}
function wr(a) {
  let c = Rp(a);
  return c.map((r, f) => (f === c.length - 1 ? r.pathname : r.pathnameBase));
}
function Hr(a, c, r, f = !1) {
  let s;
  typeof a == "string"
    ? (s = kn(a))
    : ((s = { ...a }),
      Nt(
        !s.pathname || !s.pathname.includes("?"),
        pr("?", "pathname", "search", s)
      ),
      Nt(
        !s.pathname || !s.pathname.includes("#"),
        pr("#", "pathname", "hash", s)
      ),
      Nt(!s.search || !s.search.includes("#"), pr("#", "search", "hash", s)));
  let d = a === "" || s.pathname === "",
    h = d ? "/" : s.pathname,
    p;
  if (h == null) p = r;
  else {
    let b = c.length - 1;
    if (!f && h.startsWith("..")) {
      let D = h.split("/");
      for (; D[0] === ".."; ) D.shift(), (b -= 1);
      s.pathname = D.join("/");
    }
    p = b >= 0 ? c[b] : "/";
  }
  let v = Op(s, p),
    y = h && h !== "/" && h.endsWith("/"),
    g = (d || h === ".") && r.endsWith("/");
  return !v.pathname.endsWith("/") && (y || g) && (v.pathname += "/"), v;
}
var ol = (a) => a.join("/").replace(/\/\/+/g, "/"),
  _p = (a) => a.replace(/\/+$/, "").replace(/^\/*/, "/"),
  zp = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
  Cp = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a);
function xp(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.internal == "boolean" &&
    "data" in a
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Um = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Um);
var Np = ["GET", ...Um];
new Set(Np);
var Fn = j.createContext(null);
Fn.displayName = "DataRouter";
var Bi = j.createContext(null);
Bi.displayName = "DataRouterState";
j.createContext(!1);
var jm = j.createContext({ isTransitioning: !1 });
jm.displayName = "ViewTransition";
var Mp = j.createContext(new Map());
Mp.displayName = "Fetchers";
var Dp = j.createContext(null);
Dp.displayName = "Await";
var Le = j.createContext(null);
Le.displayName = "Navigation";
var tu = j.createContext(null);
tu.displayName = "Location";
var Ke = j.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Ke.displayName = "Route";
var Br = j.createContext(null);
Br.displayName = "RouteError";
function Up(a, { relative: c } = {}) {
  Nt(
    $n(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: f } = j.useContext(Le),
    { hash: s, pathname: d, search: h } = eu(a, { relative: c }),
    p = d;
  return (
    r !== "/" && (p = d === "/" ? r : ol([r, d])),
    f.createHref({ pathname: p, search: h, hash: s })
  );
}
function $n() {
  return j.useContext(tu) != null;
}
function ql() {
  return (
    Nt(
      $n(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    j.useContext(tu).location
  );
}
var wm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Hm(a) {
  j.useContext(Le).static || j.useLayoutEffect(a);
}
function Bm() {
  let { isDataRoute: a } = j.useContext(Ke);
  return a ? Kp() : jp();
}
function jp() {
  Nt(
    $n(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let a = j.useContext(Fn),
    { basename: c, navigator: r } = j.useContext(Le),
    { matches: f } = j.useContext(Ke),
    { pathname: s } = ql(),
    d = JSON.stringify(wr(f)),
    h = j.useRef(!1);
  return (
    Hm(() => {
      h.current = !0;
    }),
    j.useCallback(
      (v, y = {}) => {
        if ((we(h.current, wm), !h.current)) return;
        if (typeof v == "number") {
          r.go(v);
          return;
        }
        let g = Hr(v, JSON.parse(d), s, y.relative === "path");
        a == null &&
          c !== "/" &&
          (g.pathname = g.pathname === "/" ? c : ol([c, g.pathname])),
          (y.replace ? r.replace : r.push)(g, y.state, y);
      },
      [c, r, d, s, a]
    )
  );
}
j.createContext(null);
function eu(a, { relative: c } = {}) {
  let { matches: r } = j.useContext(Ke),
    { pathname: f } = ql(),
    s = JSON.stringify(wr(r));
  return j.useMemo(() => Hr(a, JSON.parse(s), f, c === "path"), [a, s, f, c]);
}
function wp(a, c) {
  return qm(a, c);
}
function qm(a, c, r, f, s) {
  Nt(
    $n(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: d } = j.useContext(Le),
    { matches: h } = j.useContext(Ke),
    p = h[h.length - 1],
    v = p ? p.params : {},
    y = p ? p.pathname : "/",
    g = p ? p.pathnameBase : "/",
    b = p && p.route;
  {
    let X = (b && b.path) || "";
    Lm(
      y,
      !b || X.endsWith("*") || X.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${y}" (under <Route path="${X}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${X}"> to <Route path="${
        X === "/" ? "*" : `${X}/*`
      }">.`
    );
  }
  let D = ql(),
    Y;
  if (c) {
    let X = typeof c == "string" ? kn(c) : c;
    Nt(
      g === "/" || X.pathname?.startsWith(g),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${X.pathname}" was given in the \`location\` prop.`
    ),
      (Y = X);
  } else Y = D;
  let R = Y.pathname || "/",
    L = R;
  if (g !== "/") {
    let X = g.replace(/^\//, "").split("/");
    L = "/" + R.replace(/^\//, "").split("/").slice(X.length).join("/");
  }
  let _ = Nm(a, { pathname: L });
  we(
    b || _ != null,
    `No routes matched location "${Y.pathname}${Y.search}${Y.hash}" `
  ),
    we(
      _ == null ||
        _[_.length - 1].route.element !== void 0 ||
        _[_.length - 1].route.Component !== void 0 ||
        _[_.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${Y.pathname}${Y.search}${Y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let G = Yp(
    _ &&
      _.map((X) =>
        Object.assign({}, X, {
          params: Object.assign({}, v, X.params),
          pathname: ol([
            g,
            d.encodeLocation
              ? d.encodeLocation(
                  X.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                ).pathname
              : X.pathname,
          ]),
          pathnameBase:
            X.pathnameBase === "/"
              ? g
              : ol([
                  g,
                  d.encodeLocation
                    ? d.encodeLocation(
                        X.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : X.pathnameBase,
                ]),
        })
      ),
    h,
    r,
    f,
    s
  );
  return c && G
    ? j.createElement(
        tu.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...Y,
            },
            navigationType: "POP",
          },
        },
        G
      )
    : G;
}
function Hp() {
  let a = Zp(),
    c = xp(a)
      ? `${a.status} ${a.statusText}`
      : a instanceof Error
      ? a.message
      : JSON.stringify(a),
    r = a instanceof Error ? a.stack : null,
    f = "rgba(200,200,200, 0.5)",
    s = { padding: "0.5rem", backgroundColor: f },
    d = { padding: "2px 4px", backgroundColor: f },
    h = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", a),
    (h = j.createElement(
      j.Fragment,
      null,
      j.createElement("p", null, "💿 Hey developer 👋"),
      j.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        j.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        j.createElement("code", { style: d }, "errorElement"),
        " prop on your route."
      )
    )),
    j.createElement(
      j.Fragment,
      null,
      j.createElement("h2", null, "Unexpected Application Error!"),
      j.createElement("h3", { style: { fontStyle: "italic" } }, c),
      r ? j.createElement("pre", { style: s }, r) : null,
      h
    )
  );
}
var Bp = j.createElement(Hp, null),
  qp = class extends j.Component {
    constructor(a) {
      super(a),
        (this.state = {
          location: a.location,
          revalidation: a.revalidation,
          error: a.error,
        });
    }
    static getDerivedStateFromError(a) {
      return { error: a };
    }
    static getDerivedStateFromProps(a, c) {
      return c.location !== a.location ||
        (c.revalidation !== "idle" && a.revalidation === "idle")
        ? { error: a.error, location: a.location, revalidation: a.revalidation }
        : {
            error: a.error !== void 0 ? a.error : c.error,
            location: c.location,
            revalidation: a.revalidation || c.revalidation,
          };
    }
    componentDidCatch(a, c) {
      this.props.onError
        ? this.props.onError(a, c)
        : console.error(
            "React Router caught the following error during render",
            a
          );
    }
    render() {
      return this.state.error !== void 0
        ? j.createElement(
            Ke.Provider,
            { value: this.props.routeContext },
            j.createElement(Br.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function Lp({ routeContext: a, match: c, children: r }) {
  let f = j.useContext(Fn);
  return (
    f &&
      f.static &&
      f.staticContext &&
      (c.route.errorElement || c.route.ErrorBoundary) &&
      (f.staticContext._deepestRenderedBoundaryId = c.route.id),
    j.createElement(Ke.Provider, { value: a }, r)
  );
}
function Yp(a, c = [], r = null, f = null, s = null) {
  if (a == null) {
    if (!r) return null;
    if (r.errors) a = r.matches;
    else if (c.length === 0 && !r.initialized && r.matches.length > 0)
      a = r.matches;
    else return null;
  }
  let d = a,
    h = r?.errors;
  if (h != null) {
    let g = d.findIndex((b) => b.route.id && h?.[b.route.id] !== void 0);
    Nt(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        h
      ).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, g + 1)));
  }
  let p = !1,
    v = -1;
  if (r)
    for (let g = 0; g < d.length; g++) {
      let b = d[g];
      if (
        ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (v = g),
        b.route.id)
      ) {
        let { loaderData: D, errors: Y } = r,
          R =
            b.route.loader &&
            !D.hasOwnProperty(b.route.id) &&
            (!Y || Y[b.route.id] === void 0);
        if (b.route.lazy || R) {
          (p = !0), v >= 0 ? (d = d.slice(0, v + 1)) : (d = [d[0]]);
          break;
        }
      }
    }
  let y =
    r && f
      ? (g, b) => {
          f(g, {
            location: r.location,
            params: r.matches?.[0]?.params ?? {},
            errorInfo: b,
          });
        }
      : void 0;
  return d.reduceRight((g, b, D) => {
    let Y,
      R = !1,
      L = null,
      _ = null;
    r &&
      ((Y = h && b.route.id ? h[b.route.id] : void 0),
      (L = b.route.errorElement || Bp),
      p &&
        (v < 0 && D === 0
          ? (Lm(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (R = !0),
            (_ = null))
          : v === D &&
            ((R = !0), (_ = b.route.hydrateFallbackElement || null))));
    let G = c.concat(d.slice(0, D + 1)),
      X = () => {
        let Z;
        return (
          Y
            ? (Z = L)
            : R
            ? (Z = _)
            : b.route.Component
            ? (Z = j.createElement(b.route.Component, null))
            : b.route.element
            ? (Z = b.route.element)
            : (Z = g),
          j.createElement(Lp, {
            match: b,
            routeContext: { outlet: g, matches: G, isDataRoute: r != null },
            children: Z,
          })
        );
      };
    return r && (b.route.ErrorBoundary || b.route.errorElement || D === 0)
      ? j.createElement(qp, {
          location: r.location,
          revalidation: r.revalidation,
          component: L,
          error: Y,
          children: X(),
          routeContext: { outlet: null, matches: G, isDataRoute: !0 },
          onError: y,
        })
      : X();
  }, null);
}
function qr(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Gp(a) {
  let c = j.useContext(Fn);
  return Nt(c, qr(a)), c;
}
function Xp(a) {
  let c = j.useContext(Bi);
  return Nt(c, qr(a)), c;
}
function Qp(a) {
  let c = j.useContext(Ke);
  return Nt(c, qr(a)), c;
}
function Lr(a) {
  let c = Qp(a),
    r = c.matches[c.matches.length - 1];
  return (
    Nt(
      r.route.id,
      `${a} can only be used on routes that contain a unique "id"`
    ),
    r.route.id
  );
}
function Vp() {
  return Lr("useRouteId");
}
function Zp() {
  let a = j.useContext(Br),
    c = Xp("useRouteError"),
    r = Lr("useRouteError");
  return a !== void 0 ? a : c.errors?.[r];
}
function Kp() {
  let { router: a } = Gp("useNavigate"),
    c = Lr("useNavigate"),
    r = j.useRef(!1);
  return (
    Hm(() => {
      r.current = !0;
    }),
    j.useCallback(
      async (s, d = {}) => {
        we(r.current, wm),
          r.current &&
            (typeof s == "number"
              ? a.navigate(s)
              : await a.navigate(s, { fromRouteId: c, ...d }));
      },
      [a, c]
    )
  );
}
var rm = {};
function Lm(a, c, r) {
  !c && !rm[a] && ((rm[a] = !0), we(!1, r));
}
j.memo(Jp);
function Jp({ routes: a, future: c, state: r, unstable_onError: f }) {
  return qm(a, void 0, r, f, c);
}
function Ym({ to: a, replace: c, state: r, relative: f }) {
  Nt(
    $n(),
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let { static: s } = j.useContext(Le);
  we(
    !s,
    "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change."
  );
  let { matches: d } = j.useContext(Ke),
    { pathname: h } = ql(),
    p = Bm(),
    v = Hr(a, wr(d), h, f === "path"),
    y = JSON.stringify(v);
  return (
    j.useEffect(() => {
      p(JSON.parse(y), { replace: c, state: r, relative: f });
    }, [p, y, f, c, r]),
    null
  );
}
function Wa(a) {
  Nt(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function kp({
  basename: a = "/",
  children: c = null,
  location: r,
  navigationType: f = "POP",
  navigator: s,
  static: d = !1,
}) {
  Nt(
    !$n(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let h = a.replace(/^\/*/, "/"),
    p = j.useMemo(
      () => ({ basename: h, navigator: s, static: d, future: {} }),
      [h, s, d]
    );
  typeof r == "string" && (r = kn(r));
  let {
      pathname: v = "/",
      search: y = "",
      hash: g = "",
      state: b = null,
      key: D = "default",
    } = r,
    Y = j.useMemo(() => {
      let R = dl(v, h);
      return R == null
        ? null
        : {
            location: { pathname: R, search: y, hash: g, state: b, key: D },
            navigationType: f,
          };
    }, [h, v, y, g, b, D, f]);
  return (
    we(
      Y != null,
      `<Router basename="${h}"> is not able to match the URL "${v}${y}${g}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    Y == null
      ? null
      : j.createElement(
          Le.Provider,
          { value: p },
          j.createElement(tu.Provider, { children: c, value: Y })
        )
  );
}
function Fp({ children: a, location: c }) {
  return wp(Rr(a), c);
}
function Rr(a, c = []) {
  let r = [];
  return (
    j.Children.forEach(a, (f, s) => {
      if (!j.isValidElement(f)) return;
      let d = [...c, s];
      if (f.type === j.Fragment) {
        r.push.apply(r, Rr(f.props.children, d));
        return;
      }
      Nt(
        f.type === Wa,
        `[${
          typeof f.type == "string" ? f.type : f.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Nt(
          !f.props.index || !f.props.children,
          "An index route cannot have child routes."
        );
      let h = {
        id: f.props.id || d.join("-"),
        caseSensitive: f.props.caseSensitive,
        element: f.props.element,
        Component: f.props.Component,
        index: f.props.index,
        path: f.props.path,
        middleware: f.props.middleware,
        loader: f.props.loader,
        action: f.props.action,
        hydrateFallbackElement: f.props.hydrateFallbackElement,
        HydrateFallback: f.props.HydrateFallback,
        errorElement: f.props.errorElement,
        ErrorBoundary: f.props.ErrorBoundary,
        hasErrorBoundary:
          f.props.hasErrorBoundary === !0 ||
          f.props.ErrorBoundary != null ||
          f.props.errorElement != null,
        shouldRevalidate: f.props.shouldRevalidate,
        handle: f.props.handle,
        lazy: f.props.lazy,
      };
      f.props.children && (h.children = Rr(f.props.children, d)), r.push(h);
    }),
    r
  );
}
var _i = "get",
  zi = "application/x-www-form-urlencoded";
function qi(a) {
  return a != null && typeof a.tagName == "string";
}
function $p(a) {
  return qi(a) && a.tagName.toLowerCase() === "button";
}
function Wp(a) {
  return qi(a) && a.tagName.toLowerCase() === "form";
}
function Pp(a) {
  return qi(a) && a.tagName.toLowerCase() === "input";
}
function Ip(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function tg(a, c) {
  return a.button === 0 && (!c || c === "_self") && !Ip(a);
}
var Oi = null;
function eg() {
  if (Oi === null)
    try {
      new FormData(document.createElement("form"), 0), (Oi = !1);
    } catch {
      Oi = !0;
    }
  return Oi;
}
var lg = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function gr(a) {
  return a != null && !lg.has(a)
    ? (we(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${zi}"`
      ),
      null)
    : a;
}
function ng(a, c) {
  let r, f, s, d, h;
  if (Wp(a)) {
    let p = a.getAttribute("action");
    (f = p ? dl(p, c) : null),
      (r = a.getAttribute("method") || _i),
      (s = gr(a.getAttribute("enctype")) || zi),
      (d = new FormData(a));
  } else if ($p(a) || (Pp(a) && (a.type === "submit" || a.type === "image"))) {
    let p = a.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = a.getAttribute("formaction") || p.getAttribute("action");
    if (
      ((f = v ? dl(v, c) : null),
      (r = a.getAttribute("formmethod") || p.getAttribute("method") || _i),
      (s =
        gr(a.getAttribute("formenctype")) ||
        gr(p.getAttribute("enctype")) ||
        zi),
      (d = new FormData(p, a)),
      !eg())
    ) {
      let { name: y, type: g, value: b } = a;
      if (g === "image") {
        let D = y ? `${y}.` : "";
        d.append(`${D}x`, "0"), d.append(`${D}y`, "0");
      } else y && d.append(y, b);
    }
  } else {
    if (qi(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (r = _i), (f = null), (s = zi), (h = a);
  }
  return (
    d && s === "text/plain" && ((h = d), (d = void 0)),
    { action: f, method: r.toLowerCase(), encType: s, formData: d, body: h }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Yr(a, c) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(c);
}
function ag(a, c, r) {
  let f =
    typeof a == "string"
      ? new URL(
          a,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : a;
  return (
    f.pathname === "/"
      ? (f.pathname = `_root.${r}`)
      : c && dl(f.pathname, c) === "/"
      ? (f.pathname = `${c.replace(/\/$/, "")}/_root.${r}`)
      : (f.pathname = `${f.pathname.replace(/\/$/, "")}.${r}`),
    f
  );
}
async function ug(a, c) {
  if (a.id in c) return c[a.id];
  try {
    let r = await import(a.module);
    return (c[a.id] = r), r;
  } catch (r) {
    return (
      console.error(
        `Error loading route module \`${a.module}\`, reloading page...`
      ),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function ig(a) {
  return a == null
    ? !1
    : a.href == null
    ? a.rel === "preload" &&
      typeof a.imageSrcSet == "string" &&
      typeof a.imageSizes == "string"
    : typeof a.rel == "string" && typeof a.href == "string";
}
async function cg(a, c, r) {
  let f = await Promise.all(
    a.map(async (s) => {
      let d = c.routes[s.route.id];
      if (d) {
        let h = await ug(d, r);
        return h.links ? h.links() : [];
      }
      return [];
    })
  );
  return og(
    f
      .flat(1)
      .filter(ig)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" }
      )
  );
}
function sm(a, c, r, f, s, d) {
  let h = (v, y) => (r[y] ? v.route.id !== r[y].route.id : !0),
    p = (v, y) =>
      r[y].pathname !== v.pathname ||
      (r[y].route.path?.endsWith("*") && r[y].params["*"] !== v.params["*"]);
  return d === "assets"
    ? c.filter((v, y) => h(v, y) || p(v, y))
    : d === "data"
    ? c.filter((v, y) => {
        let g = f.routes[v.route.id];
        if (!g || !g.hasLoader) return !1;
        if (h(v, y) || p(v, y)) return !0;
        if (v.route.shouldRevalidate) {
          let b = v.route.shouldRevalidate({
            currentUrl: new URL(s.pathname + s.search + s.hash, window.origin),
            currentParams: r[0]?.params || {},
            nextUrl: new URL(a, window.origin),
            nextParams: v.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof b == "boolean") return b;
        }
        return !0;
      })
    : [];
}
function fg(a, c, { includeHydrateFallback: r } = {}) {
  return rg(
    a
      .map((f) => {
        let s = c.routes[f.route.id];
        if (!s) return [];
        let d = [s.module];
        return (
          s.clientActionModule && (d = d.concat(s.clientActionModule)),
          s.clientLoaderModule && (d = d.concat(s.clientLoaderModule)),
          r &&
            s.hydrateFallbackModule &&
            (d = d.concat(s.hydrateFallbackModule)),
          s.imports && (d = d.concat(s.imports)),
          d
        );
      })
      .flat(1)
  );
}
function rg(a) {
  return [...new Set(a)];
}
function sg(a) {
  let c = {},
    r = Object.keys(a).sort();
  for (let f of r) c[f] = a[f];
  return c;
}
function og(a, c) {
  let r = new Set();
  return (
    new Set(c),
    a.reduce((f, s) => {
      let d = JSON.stringify(sg(s));
      return r.has(d) || (r.add(d), f.push({ key: d, link: s })), f;
    }, [])
  );
}
function Gm() {
  let a = j.useContext(Fn);
  return (
    Yr(
      a,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    a
  );
}
function dg() {
  let a = j.useContext(Bi);
  return (
    Yr(
      a,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    a
  );
}
var Gr = j.createContext(void 0);
Gr.displayName = "FrameworkContext";
function Xm() {
  let a = j.useContext(Gr);
  return (
    Yr(a, "You must render this element inside a <HydratedRouter> element"), a
  );
}
function hg(a, c) {
  let r = j.useContext(Gr),
    [f, s] = j.useState(!1),
    [d, h] = j.useState(!1),
    {
      onFocus: p,
      onBlur: v,
      onMouseEnter: y,
      onMouseLeave: g,
      onTouchStart: b,
    } = c,
    D = j.useRef(null);
  j.useEffect(() => {
    if ((a === "render" && h(!0), a === "viewport")) {
      let L = (G) => {
          G.forEach((X) => {
            h(X.isIntersecting);
          });
        },
        _ = new IntersectionObserver(L, { threshold: 0.5 });
      return (
        D.current && _.observe(D.current),
        () => {
          _.disconnect();
        }
      );
    }
  }, [a]),
    j.useEffect(() => {
      if (f) {
        let L = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(L);
        };
      }
    }, [f]);
  let Y = () => {
      s(!0);
    },
    R = () => {
      s(!1), h(!1);
    };
  return r
    ? a !== "intent"
      ? [d, D, {}]
      : [
          d,
          D,
          {
            onFocus: ka(p, Y),
            onBlur: ka(v, R),
            onMouseEnter: ka(y, Y),
            onMouseLeave: ka(g, R),
            onTouchStart: ka(b, Y),
          },
        ]
    : [!1, D, {}];
}
function ka(a, c) {
  return (r) => {
    a && a(r), r.defaultPrevented || c(r);
  };
}
function mg({ page: a, ...c }) {
  let { router: r } = Gm(),
    f = j.useMemo(() => Nm(r.routes, a, r.basename), [r.routes, a, r.basename]);
  return f ? j.createElement(vg, { page: a, matches: f, ...c }) : null;
}
function yg(a) {
  let { manifest: c, routeModules: r } = Xm(),
    [f, s] = j.useState([]);
  return (
    j.useEffect(() => {
      let d = !1;
      return (
        cg(a, c, r).then((h) => {
          d || s(h);
        }),
        () => {
          d = !0;
        }
      );
    }, [a, c, r]),
    f
  );
}
function vg({ page: a, matches: c, ...r }) {
  let f = ql(),
    { manifest: s, routeModules: d } = Xm(),
    { basename: h } = Gm(),
    { loaderData: p, matches: v } = dg(),
    y = j.useMemo(() => sm(a, c, v, s, f, "data"), [a, c, v, s, f]),
    g = j.useMemo(() => sm(a, c, v, s, f, "assets"), [a, c, v, s, f]),
    b = j.useMemo(() => {
      if (a === f.pathname + f.search + f.hash) return [];
      let R = new Set(),
        L = !1;
      if (
        (c.forEach((G) => {
          let X = s.routes[G.route.id];
          !X ||
            !X.hasLoader ||
            ((!y.some((Z) => Z.route.id === G.route.id) &&
              G.route.id in p &&
              d[G.route.id]?.shouldRevalidate) ||
            X.hasClientLoader
              ? (L = !0)
              : R.add(G.route.id));
        }),
        R.size === 0)
      )
        return [];
      let _ = ag(a, h, "data");
      return (
        L &&
          R.size > 0 &&
          _.searchParams.set(
            "_routes",
            c
              .filter((G) => R.has(G.route.id))
              .map((G) => G.route.id)
              .join(",")
          ),
        [_.pathname + _.search]
      );
    }, [h, p, f, s, y, c, a, d]),
    D = j.useMemo(() => fg(g, s), [g, s]),
    Y = yg(g);
  return j.createElement(
    j.Fragment,
    null,
    b.map((R) =>
      j.createElement("link", {
        key: R,
        rel: "prefetch",
        as: "fetch",
        href: R,
        ...r,
      })
    ),
    D.map((R) =>
      j.createElement("link", { key: R, rel: "modulepreload", href: R, ...r })
    ),
    Y.map(({ key: R, link: L }) =>
      j.createElement("link", { key: R, nonce: r.nonce, ...L })
    )
  );
}
function pg(...a) {
  return (c) => {
    a.forEach((r) => {
      typeof r == "function" ? r(c) : r != null && (r.current = c);
    });
  };
}
var Qm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Qm && (window.__reactRouterVersion = "7.9.6");
} catch {}
function gg({ basename: a, children: c, window: r }) {
  let f = j.useRef();
  f.current == null && (f.current = up({ window: r, v5Compat: !0 }));
  let s = f.current,
    [d, h] = j.useState({ action: s.action, location: s.location }),
    p = j.useCallback(
      (v) => {
        j.startTransition(() => h(v));
      },
      [h]
    );
  return (
    j.useLayoutEffect(() => s.listen(p), [s, p]),
    j.createElement(kp, {
      basename: a,
      children: c,
      location: d.location,
      navigationType: d.action,
      navigator: s,
    })
  );
}
var Vm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Li = j.forwardRef(function (
    {
      onClick: c,
      discover: r = "render",
      prefetch: f = "none",
      relative: s,
      reloadDocument: d,
      replace: h,
      state: p,
      target: v,
      to: y,
      preventScrollReset: g,
      viewTransition: b,
      ...D
    },
    Y
  ) {
    let { basename: R } = j.useContext(Le),
      L = typeof y == "string" && Vm.test(y),
      _,
      G = !1;
    if (typeof y == "string" && L && ((_ = y), Qm))
      try {
        let ht = new URL(window.location.href),
          Bt = y.startsWith("//") ? new URL(ht.protocol + y) : new URL(y),
          Xt = dl(Bt.pathname, R);
        Bt.origin === ht.origin && Xt != null
          ? (y = Xt + Bt.search + Bt.hash)
          : (G = !0);
      } catch {
        we(
          !1,
          `<Link to="${y}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let X = Up(y, { relative: s }),
      [Z, I, it] = hg(f, D),
      St = Ag(y, {
        replace: h,
        state: p,
        target: v,
        preventScrollReset: g,
        relative: s,
        viewTransition: b,
      });
    function F(ht) {
      c && c(ht), ht.defaultPrevented || St(ht);
    }
    let lt = j.createElement("a", {
      ...D,
      ...it,
      href: _ || X,
      onClick: G || d ? c : F,
      ref: pg(Y, I),
      target: v,
      "data-discover": !L && r === "render" ? "true" : void 0,
    });
    return Z && !L
      ? j.createElement(j.Fragment, null, lt, j.createElement(mg, { page: X }))
      : lt;
  });
Li.displayName = "Link";
var Sg = j.forwardRef(function (
  {
    "aria-current": c = "page",
    caseSensitive: r = !1,
    className: f = "",
    end: s = !1,
    style: d,
    to: h,
    viewTransition: p,
    children: v,
    ...y
  },
  g
) {
  let b = eu(h, { relative: y.relative }),
    D = ql(),
    Y = j.useContext(Bi),
    { navigator: R, basename: L } = j.useContext(Le),
    _ = Y != null && zg(b) && p === !0,
    G = R.encodeLocation ? R.encodeLocation(b).pathname : b.pathname,
    X = D.pathname,
    Z =
      Y && Y.navigation && Y.navigation.location
        ? Y.navigation.location.pathname
        : null;
  r ||
    ((X = X.toLowerCase()),
    (Z = Z ? Z.toLowerCase() : null),
    (G = G.toLowerCase())),
    Z && L && (Z = dl(Z, L) || Z);
  const I = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let it = X === G || (!s && X.startsWith(G) && X.charAt(I) === "/"),
    St =
      Z != null &&
      (Z === G || (!s && Z.startsWith(G) && Z.charAt(G.length) === "/")),
    F = { isActive: it, isPending: St, isTransitioning: _ },
    lt = it ? c : void 0,
    ht;
  typeof f == "function"
    ? (ht = f(F))
    : (ht = [
        f,
        it ? "active" : null,
        St ? "pending" : null,
        _ ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let Bt = typeof d == "function" ? d(F) : d;
  return j.createElement(
    Li,
    {
      ...y,
      "aria-current": lt,
      className: ht,
      ref: g,
      style: Bt,
      to: h,
      viewTransition: p,
    },
    typeof v == "function" ? v(F) : v
  );
});
Sg.displayName = "NavLink";
var bg = j.forwardRef(
  (
    {
      discover: a = "render",
      fetcherKey: c,
      navigate: r,
      reloadDocument: f,
      replace: s,
      state: d,
      method: h = _i,
      action: p,
      onSubmit: v,
      relative: y,
      preventScrollReset: g,
      viewTransition: b,
      ...D
    },
    Y
  ) => {
    let R = Rg(),
      L = _g(p, { relative: y }),
      _ = h.toLowerCase() === "get" ? "get" : "post",
      G = typeof p == "string" && Vm.test(p),
      X = (Z) => {
        if ((v && v(Z), Z.defaultPrevented)) return;
        Z.preventDefault();
        let I = Z.nativeEvent.submitter,
          it = I?.getAttribute("formmethod") || h;
        R(I || Z.currentTarget, {
          fetcherKey: c,
          method: it,
          navigate: r,
          replace: s,
          state: d,
          relative: y,
          preventScrollReset: g,
          viewTransition: b,
        });
      };
    return j.createElement("form", {
      ref: Y,
      method: _,
      action: L,
      onSubmit: f ? v : X,
      ...D,
      "data-discover": !G && a === "render" ? "true" : void 0,
    });
  }
);
bg.displayName = "Form";
function Eg(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Zm(a) {
  let c = j.useContext(Fn);
  return Nt(c, Eg(a)), c;
}
function Ag(
  a,
  {
    target: c,
    replace: r,
    state: f,
    preventScrollReset: s,
    relative: d,
    viewTransition: h,
  } = {}
) {
  let p = Bm(),
    v = ql(),
    y = eu(a, { relative: d });
  return j.useCallback(
    (g) => {
      if (tg(g, c)) {
        g.preventDefault();
        let b = r !== void 0 ? r : Ia(v) === Ia(y);
        p(a, {
          replace: b,
          state: f,
          preventScrollReset: s,
          relative: d,
          viewTransition: h,
        });
      }
    },
    [v, p, y, r, f, c, a, s, d, h]
  );
}
var Tg = 0,
  Og = () => `__${String(++Tg)}__`;
function Rg() {
  let { router: a } = Zm("useSubmit"),
    { basename: c } = j.useContext(Le),
    r = Vp();
  return j.useCallback(
    async (f, s = {}) => {
      let { action: d, method: h, encType: p, formData: v, body: y } = ng(f, c);
      if (s.navigate === !1) {
        let g = s.fetcherKey || Og();
        await a.fetch(g, r, s.action || d, {
          preventScrollReset: s.preventScrollReset,
          formData: v,
          body: y,
          formMethod: s.method || h,
          formEncType: s.encType || p,
          flushSync: s.flushSync,
        });
      } else
        await a.navigate(s.action || d, {
          preventScrollReset: s.preventScrollReset,
          formData: v,
          body: y,
          formMethod: s.method || h,
          formEncType: s.encType || p,
          replace: s.replace,
          state: s.state,
          fromRouteId: r,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition,
        });
    },
    [a, c, r]
  );
}
function _g(a, { relative: c } = {}) {
  let { basename: r } = j.useContext(Le),
    f = j.useContext(Ke);
  Nt(f, "useFormAction must be used inside a RouteContext");
  let [s] = f.matches.slice(-1),
    d = { ...eu(a || ".", { relative: c }) },
    h = ql();
  if (a == null) {
    d.search = h.search;
    let p = new URLSearchParams(d.search),
      v = p.getAll("index");
    if (v.some((g) => g === "")) {
      p.delete("index"),
        v.filter((b) => b).forEach((b) => p.append("index", b));
      let g = p.toString();
      d.search = g ? `?${g}` : "";
    }
  }
  return (
    (!a || a === ".") &&
      s.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (d.pathname = d.pathname === "/" ? r : ol([r, d.pathname])),
    Ia(d)
  );
}
function zg(a, { relative: c } = {}) {
  let r = j.useContext(jm);
  Nt(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: f } = Zm("useViewTransitionState"),
    s = eu(a, { relative: c });
  if (!r.isTransitioning) return !1;
  let d = dl(r.currentLocation.pathname, f) || r.currentLocation.pathname,
    h = dl(r.nextLocation.pathname, f) || r.nextLocation.pathname;
  return Mi(s.pathname, h) != null || Mi(s.pathname, d) != null;
}
function Km(a, c) {
  return function () {
    return a.apply(c, arguments);
  };
}
const { toString: Cg } = Object.prototype,
  { getPrototypeOf: Xr } = Object,
  { iterator: Yi, toStringTag: Jm } = Symbol,
  Gi = ((a) => (c) => {
    const r = Cg.call(c);
    return a[r] || (a[r] = r.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Ye = (a) => ((a = a.toLowerCase()), (c) => Gi(c) === a),
  Xi = (a) => (c) => typeof c === a,
  { isArray: Wn } = Array,
  Kn = Xi("undefined");
function lu(a) {
  return (
    a !== null &&
    !Kn(a) &&
    a.constructor !== null &&
    !Kn(a.constructor) &&
    de(a.constructor.isBuffer) &&
    a.constructor.isBuffer(a)
  );
}
const km = Ye("ArrayBuffer");
function xg(a) {
  let c;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (c = ArrayBuffer.isView(a))
      : (c = a && a.buffer && km(a.buffer)),
    c
  );
}
const Ng = Xi("string"),
  de = Xi("function"),
  Fm = Xi("number"),
  nu = (a) => a !== null && typeof a == "object",
  Mg = (a) => a === !0 || a === !1,
  Ci = (a) => {
    if (Gi(a) !== "object") return !1;
    const c = Xr(a);
    return (
      (c === null ||
        c === Object.prototype ||
        Object.getPrototypeOf(c) === null) &&
      !(Jm in a) &&
      !(Yi in a)
    );
  },
  Dg = (a) => {
    if (!nu(a) || lu(a)) return !1;
    try {
      return (
        Object.keys(a).length === 0 &&
        Object.getPrototypeOf(a) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  Ug = Ye("Date"),
  jg = Ye("File"),
  wg = Ye("Blob"),
  Hg = Ye("FileList"),
  Bg = (a) => nu(a) && de(a.pipe),
  qg = (a) => {
    let c;
    return (
      a &&
      ((typeof FormData == "function" && a instanceof FormData) ||
        (de(a.append) &&
          ((c = Gi(a)) === "formdata" ||
            (c === "object" &&
              de(a.toString) &&
              a.toString() === "[object FormData]"))))
    );
  },
  Lg = Ye("URLSearchParams"),
  [Yg, Gg, Xg, Qg] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Ye
  ),
  Vg = (a) =>
    a.trim ? a.trim() : a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function au(a, c, { allOwnKeys: r = !1 } = {}) {
  if (a === null || typeof a > "u") return;
  let f, s;
  if ((typeof a != "object" && (a = [a]), Wn(a)))
    for (f = 0, s = a.length; f < s; f++) c.call(null, a[f], f, a);
  else {
    if (lu(a)) return;
    const d = r ? Object.getOwnPropertyNames(a) : Object.keys(a),
      h = d.length;
    let p;
    for (f = 0; f < h; f++) (p = d[f]), c.call(null, a[p], p, a);
  }
}
function $m(a, c) {
  if (lu(a)) return null;
  c = c.toLowerCase();
  const r = Object.keys(a);
  let f = r.length,
    s;
  for (; f-- > 0; ) if (((s = r[f]), c === s.toLowerCase())) return s;
  return null;
}
const an =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Wm = (a) => !Kn(a) && a !== an;
function _r() {
  const { caseless: a, skipUndefined: c } = (Wm(this) && this) || {},
    r = {},
    f = (s, d) => {
      const h = (a && $m(r, d)) || d;
      Ci(r[h]) && Ci(s)
        ? (r[h] = _r(r[h], s))
        : Ci(s)
        ? (r[h] = _r({}, s))
        : Wn(s)
        ? (r[h] = s.slice())
        : (!c || !Kn(s)) && (r[h] = s);
    };
  for (let s = 0, d = arguments.length; s < d; s++)
    arguments[s] && au(arguments[s], f);
  return r;
}
const Zg = (a, c, r, { allOwnKeys: f } = {}) => (
    au(
      c,
      (s, d) => {
        r && de(s) ? (a[d] = Km(s, r)) : (a[d] = s);
      },
      { allOwnKeys: f }
    ),
    a
  ),
  Kg = (a) => (a.charCodeAt(0) === 65279 && (a = a.slice(1)), a),
  Jg = (a, c, r, f) => {
    (a.prototype = Object.create(c.prototype, f)),
      (a.prototype.constructor = a),
      Object.defineProperty(a, "super", { value: c.prototype }),
      r && Object.assign(a.prototype, r);
  },
  kg = (a, c, r, f) => {
    let s, d, h;
    const p = {};
    if (((c = c || {}), a == null)) return c;
    do {
      for (s = Object.getOwnPropertyNames(a), d = s.length; d-- > 0; )
        (h = s[d]), (!f || f(h, a, c)) && !p[h] && ((c[h] = a[h]), (p[h] = !0));
      a = r !== !1 && Xr(a);
    } while (a && (!r || r(a, c)) && a !== Object.prototype);
    return c;
  },
  Fg = (a, c, r) => {
    (a = String(a)),
      (r === void 0 || r > a.length) && (r = a.length),
      (r -= c.length);
    const f = a.indexOf(c, r);
    return f !== -1 && f === r;
  },
  $g = (a) => {
    if (!a) return null;
    if (Wn(a)) return a;
    let c = a.length;
    if (!Fm(c)) return null;
    const r = new Array(c);
    for (; c-- > 0; ) r[c] = a[c];
    return r;
  },
  Wg = (
    (a) => (c) =>
      a && c instanceof a
  )(typeof Uint8Array < "u" && Xr(Uint8Array)),
  Pg = (a, c) => {
    const f = (a && a[Yi]).call(a);
    let s;
    for (; (s = f.next()) && !s.done; ) {
      const d = s.value;
      c.call(a, d[0], d[1]);
    }
  },
  Ig = (a, c) => {
    let r;
    const f = [];
    for (; (r = a.exec(c)) !== null; ) f.push(r);
    return f;
  },
  t1 = Ye("HTMLFormElement"),
  e1 = (a) =>
    a.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (r, f, s) {
      return f.toUpperCase() + s;
    }),
  om = (
    ({ hasOwnProperty: a }) =>
    (c, r) =>
      a.call(c, r)
  )(Object.prototype),
  l1 = Ye("RegExp"),
  Pm = (a, c) => {
    const r = Object.getOwnPropertyDescriptors(a),
      f = {};
    au(r, (s, d) => {
      let h;
      (h = c(s, d, a)) !== !1 && (f[d] = h || s);
    }),
      Object.defineProperties(a, f);
  },
  n1 = (a) => {
    Pm(a, (c, r) => {
      if (de(a) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
        return !1;
      const f = a[r];
      if (de(f)) {
        if (((c.enumerable = !1), "writable" in c)) {
          c.writable = !1;
          return;
        }
        c.set ||
          (c.set = () => {
            throw Error("Can not rewrite read-only method '" + r + "'");
          });
      }
    });
  },
  a1 = (a, c) => {
    const r = {},
      f = (s) => {
        s.forEach((d) => {
          r[d] = !0;
        });
      };
    return Wn(a) ? f(a) : f(String(a).split(c)), r;
  },
  u1 = () => {},
  i1 = (a, c) => (a != null && Number.isFinite((a = +a)) ? a : c);
function c1(a) {
  return !!(a && de(a.append) && a[Jm] === "FormData" && a[Yi]);
}
const f1 = (a) => {
    const c = new Array(10),
      r = (f, s) => {
        if (nu(f)) {
          if (c.indexOf(f) >= 0) return;
          if (lu(f)) return f;
          if (!("toJSON" in f)) {
            c[s] = f;
            const d = Wn(f) ? [] : {};
            return (
              au(f, (h, p) => {
                const v = r(h, s + 1);
                !Kn(v) && (d[p] = v);
              }),
              (c[s] = void 0),
              d
            );
          }
        }
        return f;
      };
    return r(a, 0);
  },
  r1 = Ye("AsyncFunction"),
  s1 = (a) => a && (nu(a) || de(a)) && de(a.then) && de(a.catch),
  Im = ((a, c) =>
    a
      ? setImmediate
      : c
      ? ((r, f) => (
          an.addEventListener(
            "message",
            ({ source: s, data: d }) => {
              s === an && d === r && f.length && f.shift()();
            },
            !1
          ),
          (s) => {
            f.push(s), an.postMessage(r, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (r) => setTimeout(r))(
    typeof setImmediate == "function",
    de(an.postMessage)
  ),
  o1 =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(an)
      : (typeof process < "u" && process.nextTick) || Im,
  d1 = (a) => a != null && de(a[Yi]),
  x = {
    isArray: Wn,
    isArrayBuffer: km,
    isBuffer: lu,
    isFormData: qg,
    isArrayBufferView: xg,
    isString: Ng,
    isNumber: Fm,
    isBoolean: Mg,
    isObject: nu,
    isPlainObject: Ci,
    isEmptyObject: Dg,
    isReadableStream: Yg,
    isRequest: Gg,
    isResponse: Xg,
    isHeaders: Qg,
    isUndefined: Kn,
    isDate: Ug,
    isFile: jg,
    isBlob: wg,
    isRegExp: l1,
    isFunction: de,
    isStream: Bg,
    isURLSearchParams: Lg,
    isTypedArray: Wg,
    isFileList: Hg,
    forEach: au,
    merge: _r,
    extend: Zg,
    trim: Vg,
    stripBOM: Kg,
    inherits: Jg,
    toFlatObject: kg,
    kindOf: Gi,
    kindOfTest: Ye,
    endsWith: Fg,
    toArray: $g,
    forEachEntry: Pg,
    matchAll: Ig,
    isHTMLForm: t1,
    hasOwnProperty: om,
    hasOwnProp: om,
    reduceDescriptors: Pm,
    freezeMethods: n1,
    toObjectSet: a1,
    toCamelCase: e1,
    noop: u1,
    toFiniteNumber: i1,
    findKey: $m,
    global: an,
    isContextDefined: Wm,
    isSpecCompliantForm: c1,
    toJSONObject: f1,
    isAsyncFn: r1,
    isThenable: s1,
    setImmediate: Im,
    asap: o1,
    isIterable: d1,
  };
function at(a, c, r, f, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = a),
    (this.name = "AxiosError"),
    c && (this.code = c),
    r && (this.config = r),
    f && (this.request = f),
    s && ((this.response = s), (this.status = s.status ? s.status : null));
}
x.inherits(at, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const ty = at.prototype,
  ey = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((a) => {
  ey[a] = { value: a };
});
Object.defineProperties(at, ey);
Object.defineProperty(ty, "isAxiosError", { value: !0 });
at.from = (a, c, r, f, s, d) => {
  const h = Object.create(ty);
  x.toFlatObject(
    a,
    h,
    function (g) {
      return g !== Error.prototype;
    },
    (y) => y !== "isAxiosError"
  );
  const p = a && a.message ? a.message : "Error",
    v = c == null && a ? a.code : c;
  return (
    at.call(h, p, v, r, f, s),
    a &&
      h.cause == null &&
      Object.defineProperty(h, "cause", { value: a, configurable: !0 }),
    (h.name = (a && a.name) || "Error"),
    d && Object.assign(h, d),
    h
  );
};
const h1 = null;
function zr(a) {
  return x.isPlainObject(a) || x.isArray(a);
}
function ly(a) {
  return x.endsWith(a, "[]") ? a.slice(0, -2) : a;
}
function dm(a, c, r) {
  return a
    ? a
        .concat(c)
        .map(function (s, d) {
          return (s = ly(s)), !r && d ? "[" + s + "]" : s;
        })
        .join(r ? "." : "")
    : c;
}
function m1(a) {
  return x.isArray(a) && !a.some(zr);
}
const y1 = x.toFlatObject(x, {}, null, function (c) {
  return /^is[A-Z]/.test(c);
});
function Qi(a, c, r) {
  if (!x.isObject(a)) throw new TypeError("target must be an object");
  (c = c || new FormData()),
    (r = x.toFlatObject(
      r,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (L, _) {
        return !x.isUndefined(_[L]);
      }
    ));
  const f = r.metaTokens,
    s = r.visitor || g,
    d = r.dots,
    h = r.indexes,
    v = (r.Blob || (typeof Blob < "u" && Blob)) && x.isSpecCompliantForm(c);
  if (!x.isFunction(s)) throw new TypeError("visitor must be a function");
  function y(R) {
    if (R === null) return "";
    if (x.isDate(R)) return R.toISOString();
    if (x.isBoolean(R)) return R.toString();
    if (!v && x.isBlob(R))
      throw new at("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(R) || x.isTypedArray(R)
      ? v && typeof Blob == "function"
        ? new Blob([R])
        : Buffer.from(R)
      : R;
  }
  function g(R, L, _) {
    let G = R;
    if (R && !_ && typeof R == "object") {
      if (x.endsWith(L, "{}"))
        (L = f ? L : L.slice(0, -2)), (R = JSON.stringify(R));
      else if (
        (x.isArray(R) && m1(R)) ||
        ((x.isFileList(R) || x.endsWith(L, "[]")) && (G = x.toArray(R)))
      )
        return (
          (L = ly(L)),
          G.forEach(function (Z, I) {
            !(x.isUndefined(Z) || Z === null) &&
              c.append(
                h === !0 ? dm([L], I, d) : h === null ? L : L + "[]",
                y(Z)
              );
          }),
          !1
        );
    }
    return zr(R) ? !0 : (c.append(dm(_, L, d), y(R)), !1);
  }
  const b = [],
    D = Object.assign(y1, {
      defaultVisitor: g,
      convertValue: y,
      isVisitable: zr,
    });
  function Y(R, L) {
    if (!x.isUndefined(R)) {
      if (b.indexOf(R) !== -1)
        throw Error("Circular reference detected in " + L.join("."));
      b.push(R),
        x.forEach(R, function (G, X) {
          (!(x.isUndefined(G) || G === null) &&
            s.call(c, G, x.isString(X) ? X.trim() : X, L, D)) === !0 &&
            Y(G, L ? L.concat(X) : [X]);
        }),
        b.pop();
    }
  }
  if (!x.isObject(a)) throw new TypeError("data must be an object");
  return Y(a), c;
}
function hm(a) {
  const c = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(a).replace(/[!'()~]|%20|%00/g, function (f) {
    return c[f];
  });
}
function Qr(a, c) {
  (this._pairs = []), a && Qi(a, this, c);
}
const ny = Qr.prototype;
ny.append = function (c, r) {
  this._pairs.push([c, r]);
};
ny.toString = function (c) {
  const r = c
    ? function (f) {
        return c.call(this, f, hm);
      }
    : hm;
  return this._pairs
    .map(function (s) {
      return r(s[0]) + "=" + r(s[1]);
    }, "")
    .join("&");
};
function v1(a) {
  return encodeURIComponent(a)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function ay(a, c, r) {
  if (!c) return a;
  const f = (r && r.encode) || v1;
  x.isFunction(r) && (r = { serialize: r });
  const s = r && r.serialize;
  let d;
  if (
    (s
      ? (d = s(c, r))
      : (d = x.isURLSearchParams(c) ? c.toString() : new Qr(c, r).toString(f)),
    d)
  ) {
    const h = a.indexOf("#");
    h !== -1 && (a = a.slice(0, h)),
      (a += (a.indexOf("?") === -1 ? "?" : "&") + d);
  }
  return a;
}
class mm {
  constructor() {
    this.handlers = [];
  }
  use(c, r, f) {
    return (
      this.handlers.push({
        fulfilled: c,
        rejected: r,
        synchronous: f ? f.synchronous : !1,
        runWhen: f ? f.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(c) {
    this.handlers[c] && (this.handlers[c] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(c) {
    x.forEach(this.handlers, function (f) {
      f !== null && c(f);
    });
  }
}
const uy = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  p1 = typeof URLSearchParams < "u" ? URLSearchParams : Qr,
  g1 = typeof FormData < "u" ? FormData : null,
  S1 = typeof Blob < "u" ? Blob : null,
  b1 = {
    isBrowser: !0,
    classes: { URLSearchParams: p1, FormData: g1, Blob: S1 },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Vr = typeof window < "u" && typeof document < "u",
  Cr = (typeof navigator == "object" && navigator) || void 0,
  E1 =
    Vr &&
    (!Cr || ["ReactNative", "NativeScript", "NS"].indexOf(Cr.product) < 0),
  A1 =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  T1 = (Vr && window.location.href) || "http://localhost",
  O1 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Vr,
        hasStandardBrowserEnv: E1,
        hasStandardBrowserWebWorkerEnv: A1,
        navigator: Cr,
        origin: T1,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  te = { ...O1, ...b1 };
function R1(a, c) {
  return Qi(a, new te.classes.URLSearchParams(), {
    visitor: function (r, f, s, d) {
      return te.isNode && x.isBuffer(r)
        ? (this.append(f, r.toString("base64")), !1)
        : d.defaultVisitor.apply(this, arguments);
    },
    ...c,
  });
}
function _1(a) {
  return x
    .matchAll(/\w+|\[(\w*)]/g, a)
    .map((c) => (c[0] === "[]" ? "" : c[1] || c[0]));
}
function z1(a) {
  const c = {},
    r = Object.keys(a);
  let f;
  const s = r.length;
  let d;
  for (f = 0; f < s; f++) (d = r[f]), (c[d] = a[d]);
  return c;
}
function iy(a) {
  function c(r, f, s, d) {
    let h = r[d++];
    if (h === "__proto__") return !0;
    const p = Number.isFinite(+h),
      v = d >= r.length;
    return (
      (h = !h && x.isArray(s) ? s.length : h),
      v
        ? (x.hasOwnProp(s, h) ? (s[h] = [s[h], f]) : (s[h] = f), !p)
        : ((!s[h] || !x.isObject(s[h])) && (s[h] = []),
          c(r, f, s[h], d) && x.isArray(s[h]) && (s[h] = z1(s[h])),
          !p)
    );
  }
  if (x.isFormData(a) && x.isFunction(a.entries)) {
    const r = {};
    return (
      x.forEachEntry(a, (f, s) => {
        c(_1(f), s, r, 0);
      }),
      r
    );
  }
  return null;
}
function C1(a, c, r) {
  if (x.isString(a))
    try {
      return (c || JSON.parse)(a), x.trim(a);
    } catch (f) {
      if (f.name !== "SyntaxError") throw f;
    }
  return (r || JSON.stringify)(a);
}
const uu = {
  transitional: uy,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (c, r) {
      const f = r.getContentType() || "",
        s = f.indexOf("application/json") > -1,
        d = x.isObject(c);
      if ((d && x.isHTMLForm(c) && (c = new FormData(c)), x.isFormData(c)))
        return s ? JSON.stringify(iy(c)) : c;
      if (
        x.isArrayBuffer(c) ||
        x.isBuffer(c) ||
        x.isStream(c) ||
        x.isFile(c) ||
        x.isBlob(c) ||
        x.isReadableStream(c)
      )
        return c;
      if (x.isArrayBufferView(c)) return c.buffer;
      if (x.isURLSearchParams(c))
        return (
          r.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          c.toString()
        );
      let p;
      if (d) {
        if (f.indexOf("application/x-www-form-urlencoded") > -1)
          return R1(c, this.formSerializer).toString();
        if ((p = x.isFileList(c)) || f.indexOf("multipart/form-data") > -1) {
          const v = this.env && this.env.FormData;
          return Qi(
            p ? { "files[]": c } : c,
            v && new v(),
            this.formSerializer
          );
        }
      }
      return d || s ? (r.setContentType("application/json", !1), C1(c)) : c;
    },
  ],
  transformResponse: [
    function (c) {
      const r = this.transitional || uu.transitional,
        f = r && r.forcedJSONParsing,
        s = this.responseType === "json";
      if (x.isResponse(c) || x.isReadableStream(c)) return c;
      if (c && x.isString(c) && ((f && !this.responseType) || s)) {
        const h = !(r && r.silentJSONParsing) && s;
        try {
          return JSON.parse(c, this.parseReviver);
        } catch (p) {
          if (h)
            throw p.name === "SyntaxError"
              ? at.from(p, at.ERR_BAD_RESPONSE, this, null, this.response)
              : p;
        }
      }
      return c;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: te.classes.FormData, Blob: te.classes.Blob },
  validateStatus: function (c) {
    return c >= 200 && c < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
x.forEach(["delete", "get", "head", "post", "put", "patch"], (a) => {
  uu.headers[a] = {};
});
const x1 = x.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  N1 = (a) => {
    const c = {};
    let r, f, s;
    return (
      a &&
        a
          .split(
            `
`
          )
          .forEach(function (h) {
            (s = h.indexOf(":")),
              (r = h.substring(0, s).trim().toLowerCase()),
              (f = h.substring(s + 1).trim()),
              !(!r || (c[r] && x1[r])) &&
                (r === "set-cookie"
                  ? c[r]
                    ? c[r].push(f)
                    : (c[r] = [f])
                  : (c[r] = c[r] ? c[r] + ", " + f : f));
          }),
      c
    );
  },
  ym = Symbol("internals");
function Fa(a) {
  return a && String(a).trim().toLowerCase();
}
function xi(a) {
  return a === !1 || a == null ? a : x.isArray(a) ? a.map(xi) : String(a);
}
function M1(a) {
  const c = Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let f;
  for (; (f = r.exec(a)); ) c[f[1]] = f[2];
  return c;
}
const D1 = (a) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(a.trim());
function Sr(a, c, r, f, s) {
  if (x.isFunction(f)) return f.call(this, c, r);
  if ((s && (c = r), !!x.isString(c))) {
    if (x.isString(f)) return c.indexOf(f) !== -1;
    if (x.isRegExp(f)) return f.test(c);
  }
}
function U1(a) {
  return a
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (c, r, f) => r.toUpperCase() + f);
}
function j1(a, c) {
  const r = x.toCamelCase(" " + c);
  ["get", "set", "has"].forEach((f) => {
    Object.defineProperty(a, f + r, {
      value: function (s, d, h) {
        return this[f].call(this, c, s, d, h);
      },
      configurable: !0,
    });
  });
}
let he = class {
  constructor(c) {
    c && this.set(c);
  }
  set(c, r, f) {
    const s = this;
    function d(p, v, y) {
      const g = Fa(v);
      if (!g) throw new Error("header name must be a non-empty string");
      const b = x.findKey(s, g);
      (!b || s[b] === void 0 || y === !0 || (y === void 0 && s[b] !== !1)) &&
        (s[b || v] = xi(p));
    }
    const h = (p, v) => x.forEach(p, (y, g) => d(y, g, v));
    if (x.isPlainObject(c) || c instanceof this.constructor) h(c, r);
    else if (x.isString(c) && (c = c.trim()) && !D1(c)) h(N1(c), r);
    else if (x.isObject(c) && x.isIterable(c)) {
      let p = {},
        v,
        y;
      for (const g of c) {
        if (!x.isArray(g))
          throw TypeError("Object iterator must return a key-value pair");
        p[(y = g[0])] = (v = p[y])
          ? x.isArray(v)
            ? [...v, g[1]]
            : [v, g[1]]
          : g[1];
      }
      h(p, r);
    } else c != null && d(r, c, f);
    return this;
  }
  get(c, r) {
    if (((c = Fa(c)), c)) {
      const f = x.findKey(this, c);
      if (f) {
        const s = this[f];
        if (!r) return s;
        if (r === !0) return M1(s);
        if (x.isFunction(r)) return r.call(this, s, f);
        if (x.isRegExp(r)) return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(c, r) {
    if (((c = Fa(c)), c)) {
      const f = x.findKey(this, c);
      return !!(f && this[f] !== void 0 && (!r || Sr(this, this[f], f, r)));
    }
    return !1;
  }
  delete(c, r) {
    const f = this;
    let s = !1;
    function d(h) {
      if (((h = Fa(h)), h)) {
        const p = x.findKey(f, h);
        p && (!r || Sr(f, f[p], p, r)) && (delete f[p], (s = !0));
      }
    }
    return x.isArray(c) ? c.forEach(d) : d(c), s;
  }
  clear(c) {
    const r = Object.keys(this);
    let f = r.length,
      s = !1;
    for (; f--; ) {
      const d = r[f];
      (!c || Sr(this, this[d], d, c, !0)) && (delete this[d], (s = !0));
    }
    return s;
  }
  normalize(c) {
    const r = this,
      f = {};
    return (
      x.forEach(this, (s, d) => {
        const h = x.findKey(f, d);
        if (h) {
          (r[h] = xi(s)), delete r[d];
          return;
        }
        const p = c ? U1(d) : String(d).trim();
        p !== d && delete r[d], (r[p] = xi(s)), (f[p] = !0);
      }),
      this
    );
  }
  concat(...c) {
    return this.constructor.concat(this, ...c);
  }
  toJSON(c) {
    const r = Object.create(null);
    return (
      x.forEach(this, (f, s) => {
        f != null && f !== !1 && (r[s] = c && x.isArray(f) ? f.join(", ") : f);
      }),
      r
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([c, r]) => c + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(c) {
    return c instanceof this ? c : new this(c);
  }
  static concat(c, ...r) {
    const f = new this(c);
    return r.forEach((s) => f.set(s)), f;
  }
  static accessor(c) {
    const f = (this[ym] = this[ym] = { accessors: {} }).accessors,
      s = this.prototype;
    function d(h) {
      const p = Fa(h);
      f[p] || (j1(s, h), (f[p] = !0));
    }
    return x.isArray(c) ? c.forEach(d) : d(c), this;
  }
};
he.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
x.reduceDescriptors(he.prototype, ({ value: a }, c) => {
  let r = c[0].toUpperCase() + c.slice(1);
  return {
    get: () => a,
    set(f) {
      this[r] = f;
    },
  };
});
x.freezeMethods(he);
function br(a, c) {
  const r = this || uu,
    f = c || r,
    s = he.from(f.headers);
  let d = f.data;
  return (
    x.forEach(a, function (p) {
      d = p.call(r, d, s.normalize(), c ? c.status : void 0);
    }),
    s.normalize(),
    d
  );
}
function cy(a) {
  return !!(a && a.__CANCEL__);
}
function Pn(a, c, r) {
  at.call(this, a ?? "canceled", at.ERR_CANCELED, c, r),
    (this.name = "CanceledError");
}
x.inherits(Pn, at, { __CANCEL__: !0 });
function fy(a, c, r) {
  const f = r.config.validateStatus;
  !r.status || !f || f(r.status)
    ? a(r)
    : c(
        new at(
          "Request failed with status code " + r.status,
          [at.ERR_BAD_REQUEST, at.ERR_BAD_RESPONSE][
            Math.floor(r.status / 100) - 4
          ],
          r.config,
          r.request,
          r
        )
      );
}
function w1(a) {
  const c = /^([-+\w]{1,25})(:?\/\/|:)/.exec(a);
  return (c && c[1]) || "";
}
function H1(a, c) {
  a = a || 10;
  const r = new Array(a),
    f = new Array(a);
  let s = 0,
    d = 0,
    h;
  return (
    (c = c !== void 0 ? c : 1e3),
    function (v) {
      const y = Date.now(),
        g = f[d];
      h || (h = y), (r[s] = v), (f[s] = y);
      let b = d,
        D = 0;
      for (; b !== s; ) (D += r[b++]), (b = b % a);
      if (((s = (s + 1) % a), s === d && (d = (d + 1) % a), y - h < c)) return;
      const Y = g && y - g;
      return Y ? Math.round((D * 1e3) / Y) : void 0;
    }
  );
}
function B1(a, c) {
  let r = 0,
    f = 1e3 / c,
    s,
    d;
  const h = (y, g = Date.now()) => {
    (r = g), (s = null), d && (clearTimeout(d), (d = null)), a(...y);
  };
  return [
    (...y) => {
      const g = Date.now(),
        b = g - r;
      b >= f
        ? h(y, g)
        : ((s = y),
          d ||
            (d = setTimeout(() => {
              (d = null), h(s);
            }, f - b)));
    },
    () => s && h(s),
  ];
}
const Di = (a, c, r = 3) => {
    let f = 0;
    const s = H1(50, 250);
    return B1((d) => {
      const h = d.loaded,
        p = d.lengthComputable ? d.total : void 0,
        v = h - f,
        y = s(v),
        g = h <= p;
      f = h;
      const b = {
        loaded: h,
        total: p,
        progress: p ? h / p : void 0,
        bytes: v,
        rate: y || void 0,
        estimated: y && p && g ? (p - h) / y : void 0,
        event: d,
        lengthComputable: p != null,
        [c ? "download" : "upload"]: !0,
      };
      a(b);
    }, r);
  },
  vm = (a, c) => {
    const r = a != null;
    return [(f) => c[0]({ lengthComputable: r, total: a, loaded: f }), c[1]];
  },
  pm =
    (a) =>
    (...c) =>
      x.asap(() => a(...c)),
  q1 = te.hasStandardBrowserEnv
    ? ((a, c) => (r) => (
        (r = new URL(r, te.origin)),
        a.protocol === r.protocol &&
          a.host === r.host &&
          (c || a.port === r.port)
      ))(
        new URL(te.origin),
        te.navigator && /(msie|trident)/i.test(te.navigator.userAgent)
      )
    : () => !0,
  L1 = te.hasStandardBrowserEnv
    ? {
        write(a, c, r, f, s, d, h) {
          if (typeof document > "u") return;
          const p = [`${a}=${encodeURIComponent(c)}`];
          x.isNumber(r) && p.push(`expires=${new Date(r).toUTCString()}`),
            x.isString(f) && p.push(`path=${f}`),
            x.isString(s) && p.push(`domain=${s}`),
            d === !0 && p.push("secure"),
            x.isString(h) && p.push(`SameSite=${h}`),
            (document.cookie = p.join("; "));
        },
        read(a) {
          if (typeof document > "u") return null;
          const c = document.cookie.match(
            new RegExp("(?:^|; )" + a + "=([^;]*)")
          );
          return c ? decodeURIComponent(c[1]) : null;
        },
        remove(a) {
          this.write(a, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function Y1(a) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(a);
}
function G1(a, c) {
  return c ? a.replace(/\/?\/$/, "") + "/" + c.replace(/^\/+/, "") : a;
}
function ry(a, c, r) {
  let f = !Y1(c);
  return a && (f || r == !1) ? G1(a, c) : c;
}
const gm = (a) => (a instanceof he ? { ...a } : a);
function cn(a, c) {
  c = c || {};
  const r = {};
  function f(y, g, b, D) {
    return x.isPlainObject(y) && x.isPlainObject(g)
      ? x.merge.call({ caseless: D }, y, g)
      : x.isPlainObject(g)
      ? x.merge({}, g)
      : x.isArray(g)
      ? g.slice()
      : g;
  }
  function s(y, g, b, D) {
    if (x.isUndefined(g)) {
      if (!x.isUndefined(y)) return f(void 0, y, b, D);
    } else return f(y, g, b, D);
  }
  function d(y, g) {
    if (!x.isUndefined(g)) return f(void 0, g);
  }
  function h(y, g) {
    if (x.isUndefined(g)) {
      if (!x.isUndefined(y)) return f(void 0, y);
    } else return f(void 0, g);
  }
  function p(y, g, b) {
    if (b in c) return f(y, g);
    if (b in a) return f(void 0, y);
  }
  const v = {
    url: d,
    method: d,
    data: d,
    baseURL: h,
    transformRequest: h,
    transformResponse: h,
    paramsSerializer: h,
    timeout: h,
    timeoutMessage: h,
    withCredentials: h,
    withXSRFToken: h,
    adapter: h,
    responseType: h,
    xsrfCookieName: h,
    xsrfHeaderName: h,
    onUploadProgress: h,
    onDownloadProgress: h,
    decompress: h,
    maxContentLength: h,
    maxBodyLength: h,
    beforeRedirect: h,
    transport: h,
    httpAgent: h,
    httpsAgent: h,
    cancelToken: h,
    socketPath: h,
    responseEncoding: h,
    validateStatus: p,
    headers: (y, g, b) => s(gm(y), gm(g), b, !0),
  };
  return (
    x.forEach(Object.keys({ ...a, ...c }), function (g) {
      const b = v[g] || s,
        D = b(a[g], c[g], g);
      (x.isUndefined(D) && b !== p) || (r[g] = D);
    }),
    r
  );
}
const sy = (a) => {
    const c = cn({}, a);
    let {
      data: r,
      withXSRFToken: f,
      xsrfHeaderName: s,
      xsrfCookieName: d,
      headers: h,
      auth: p,
    } = c;
    if (
      ((c.headers = h = he.from(h)),
      (c.url = ay(
        ry(c.baseURL, c.url, c.allowAbsoluteUrls),
        a.params,
        a.paramsSerializer
      )),
      p &&
        h.set(
          "Authorization",
          "Basic " +
            btoa(
              (p.username || "") +
                ":" +
                (p.password ? unescape(encodeURIComponent(p.password)) : "")
            )
        ),
      x.isFormData(r))
    ) {
      if (te.hasStandardBrowserEnv || te.hasStandardBrowserWebWorkerEnv)
        h.setContentType(void 0);
      else if (x.isFunction(r.getHeaders)) {
        const v = r.getHeaders(),
          y = ["content-type", "content-length"];
        Object.entries(v).forEach(([g, b]) => {
          y.includes(g.toLowerCase()) && h.set(g, b);
        });
      }
    }
    if (
      te.hasStandardBrowserEnv &&
      (f && x.isFunction(f) && (f = f(c)), f || (f !== !1 && q1(c.url)))
    ) {
      const v = s && d && L1.read(d);
      v && h.set(s, v);
    }
    return c;
  },
  X1 = typeof XMLHttpRequest < "u",
  Q1 =
    X1 &&
    function (a) {
      return new Promise(function (r, f) {
        const s = sy(a);
        let d = s.data;
        const h = he.from(s.headers).normalize();
        let { responseType: p, onUploadProgress: v, onDownloadProgress: y } = s,
          g,
          b,
          D,
          Y,
          R;
        function L() {
          Y && Y(),
            R && R(),
            s.cancelToken && s.cancelToken.unsubscribe(g),
            s.signal && s.signal.removeEventListener("abort", g);
        }
        let _ = new XMLHttpRequest();
        _.open(s.method.toUpperCase(), s.url, !0), (_.timeout = s.timeout);
        function G() {
          if (!_) return;
          const Z = he.from(
              "getAllResponseHeaders" in _ && _.getAllResponseHeaders()
            ),
            it = {
              data:
                !p || p === "text" || p === "json"
                  ? _.responseText
                  : _.response,
              status: _.status,
              statusText: _.statusText,
              headers: Z,
              config: a,
              request: _,
            };
          fy(
            function (F) {
              r(F), L();
            },
            function (F) {
              f(F), L();
            },
            it
          ),
            (_ = null);
        }
        "onloadend" in _
          ? (_.onloadend = G)
          : (_.onreadystatechange = function () {
              !_ ||
                _.readyState !== 4 ||
                (_.status === 0 &&
                  !(_.responseURL && _.responseURL.indexOf("file:") === 0)) ||
                setTimeout(G);
            }),
          (_.onabort = function () {
            _ &&
              (f(new at("Request aborted", at.ECONNABORTED, a, _)), (_ = null));
          }),
          (_.onerror = function (I) {
            const it = I && I.message ? I.message : "Network Error",
              St = new at(it, at.ERR_NETWORK, a, _);
            (St.event = I || null), f(St), (_ = null);
          }),
          (_.ontimeout = function () {
            let I = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const it = s.transitional || uy;
            s.timeoutErrorMessage && (I = s.timeoutErrorMessage),
              f(
                new at(
                  I,
                  it.clarifyTimeoutError ? at.ETIMEDOUT : at.ECONNABORTED,
                  a,
                  _
                )
              ),
              (_ = null);
          }),
          d === void 0 && h.setContentType(null),
          "setRequestHeader" in _ &&
            x.forEach(h.toJSON(), function (I, it) {
              _.setRequestHeader(it, I);
            }),
          x.isUndefined(s.withCredentials) ||
            (_.withCredentials = !!s.withCredentials),
          p && p !== "json" && (_.responseType = s.responseType),
          y && (([D, R] = Di(y, !0)), _.addEventListener("progress", D)),
          v &&
            _.upload &&
            (([b, Y] = Di(v)),
            _.upload.addEventListener("progress", b),
            _.upload.addEventListener("loadend", Y)),
          (s.cancelToken || s.signal) &&
            ((g = (Z) => {
              _ &&
                (f(!Z || Z.type ? new Pn(null, a, _) : Z),
                _.abort(),
                (_ = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(g),
            s.signal &&
              (s.signal.aborted ? g() : s.signal.addEventListener("abort", g)));
        const X = w1(s.url);
        if (X && te.protocols.indexOf(X) === -1) {
          f(new at("Unsupported protocol " + X + ":", at.ERR_BAD_REQUEST, a));
          return;
        }
        _.send(d || null);
      });
    },
  V1 = (a, c) => {
    const { length: r } = (a = a ? a.filter(Boolean) : []);
    if (c || r) {
      let f = new AbortController(),
        s;
      const d = function (y) {
        if (!s) {
          (s = !0), p();
          const g = y instanceof Error ? y : this.reason;
          f.abort(
            g instanceof at ? g : new Pn(g instanceof Error ? g.message : g)
          );
        }
      };
      let h =
        c &&
        setTimeout(() => {
          (h = null), d(new at(`timeout ${c} of ms exceeded`, at.ETIMEDOUT));
        }, c);
      const p = () => {
        a &&
          (h && clearTimeout(h),
          (h = null),
          a.forEach((y) => {
            y.unsubscribe
              ? y.unsubscribe(d)
              : y.removeEventListener("abort", d);
          }),
          (a = null));
      };
      a.forEach((y) => y.addEventListener("abort", d));
      const { signal: v } = f;
      return (v.unsubscribe = () => x.asap(p)), v;
    }
  },
  Z1 = function* (a, c) {
    let r = a.byteLength;
    if (r < c) {
      yield a;
      return;
    }
    let f = 0,
      s;
    for (; f < r; ) (s = f + c), yield a.slice(f, s), (f = s);
  },
  K1 = async function* (a, c) {
    for await (const r of J1(a)) yield* Z1(r, c);
  },
  J1 = async function* (a) {
    if (a[Symbol.asyncIterator]) {
      yield* a;
      return;
    }
    const c = a.getReader();
    try {
      for (;;) {
        const { done: r, value: f } = await c.read();
        if (r) break;
        yield f;
      }
    } finally {
      await c.cancel();
    }
  },
  Sm = (a, c, r, f) => {
    const s = K1(a, c);
    let d = 0,
      h,
      p = (v) => {
        h || ((h = !0), f && f(v));
      };
    return new ReadableStream(
      {
        async pull(v) {
          try {
            const { done: y, value: g } = await s.next();
            if (y) {
              p(), v.close();
              return;
            }
            let b = g.byteLength;
            if (r) {
              let D = (d += b);
              r(D);
            }
            v.enqueue(new Uint8Array(g));
          } catch (y) {
            throw (p(y), y);
          }
        },
        cancel(v) {
          return p(v), s.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  bm = 64 * 1024,
  { isFunction: Ri } = x,
  k1 = (({ Request: a, Response: c }) => ({ Request: a, Response: c }))(
    x.global
  ),
  { ReadableStream: Em, TextEncoder: Am } = x.global,
  Tm = (a, ...c) => {
    try {
      return !!a(...c);
    } catch {
      return !1;
    }
  },
  F1 = (a) => {
    a = x.merge.call({ skipUndefined: !0 }, k1, a);
    const { fetch: c, Request: r, Response: f } = a,
      s = c ? Ri(c) : typeof fetch == "function",
      d = Ri(r),
      h = Ri(f);
    if (!s) return !1;
    const p = s && Ri(Em),
      v =
        s &&
        (typeof Am == "function"
          ? (
              (R) => (L) =>
                R.encode(L)
            )(new Am())
          : async (R) => new Uint8Array(await new r(R).arrayBuffer())),
      y =
        d &&
        p &&
        Tm(() => {
          let R = !1;
          const L = new r(te.origin, {
            body: new Em(),
            method: "POST",
            get duplex() {
              return (R = !0), "half";
            },
          }).headers.has("Content-Type");
          return R && !L;
        }),
      g = h && p && Tm(() => x.isReadableStream(new f("").body)),
      b = { stream: g && ((R) => R.body) };
    s &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((R) => {
        !b[R] &&
          (b[R] = (L, _) => {
            let G = L && L[R];
            if (G) return G.call(L);
            throw new at(
              `Response type '${R}' is not supported`,
              at.ERR_NOT_SUPPORT,
              _
            );
          });
      });
    const D = async (R) => {
        if (R == null) return 0;
        if (x.isBlob(R)) return R.size;
        if (x.isSpecCompliantForm(R))
          return (
            await new r(te.origin, { method: "POST", body: R }).arrayBuffer()
          ).byteLength;
        if (x.isArrayBufferView(R) || x.isArrayBuffer(R)) return R.byteLength;
        if ((x.isURLSearchParams(R) && (R = R + ""), x.isString(R)))
          return (await v(R)).byteLength;
      },
      Y = async (R, L) => {
        const _ = x.toFiniteNumber(R.getContentLength());
        return _ ?? D(L);
      };
    return async (R) => {
      let {
          url: L,
          method: _,
          data: G,
          signal: X,
          cancelToken: Z,
          timeout: I,
          onDownloadProgress: it,
          onUploadProgress: St,
          responseType: F,
          headers: lt,
          withCredentials: ht = "same-origin",
          fetchOptions: Bt,
        } = sy(R),
        Xt = c || fetch;
      F = F ? (F + "").toLowerCase() : "text";
      let Qt = V1([X, Z && Z.toAbortSignal()], I),
        me = null;
      const Jt =
        Qt &&
        Qt.unsubscribe &&
        (() => {
          Qt.unsubscribe();
        });
      let ae;
      try {
        if (
          St &&
          y &&
          _ !== "get" &&
          _ !== "head" &&
          (ae = await Y(lt, G)) !== 0
        ) {
          let E = new r(L, { method: "POST", body: G, duplex: "half" }),
            B;
          if (
            (x.isFormData(G) &&
              (B = E.headers.get("content-type")) &&
              lt.setContentType(B),
            E.body)
          ) {
            const [V, K] = vm(ae, Di(pm(St)));
            G = Sm(E.body, bm, V, K);
          }
        }
        x.isString(ht) || (ht = ht ? "include" : "omit");
        const M = d && "credentials" in r.prototype,
          Q = {
            ...Bt,
            signal: Qt,
            method: _.toUpperCase(),
            headers: lt.normalize().toJSON(),
            body: G,
            duplex: "half",
            credentials: M ? ht : void 0,
          };
        me = d && new r(L, Q);
        let $ = await (d ? Xt(me, Bt) : Xt(L, Q));
        const vt = g && (F === "stream" || F === "response");
        if (g && (it || (vt && Jt))) {
          const E = {};
          ["status", "statusText", "headers"].forEach((tt) => {
            E[tt] = $[tt];
          });
          const B = x.toFiniteNumber($.headers.get("content-length")),
            [V, K] = (it && vm(B, Di(pm(it), !0))) || [];
          $ = new f(
            Sm($.body, bm, V, () => {
              K && K(), Jt && Jt();
            }),
            E
          );
        }
        F = F || "text";
        let bt = await b[x.findKey(b, F) || "text"]($, R);
        return (
          !vt && Jt && Jt(),
          await new Promise((E, B) => {
            fy(E, B, {
              data: bt,
              headers: he.from($.headers),
              status: $.status,
              statusText: $.statusText,
              config: R,
              request: me,
            });
          })
        );
      } catch (M) {
        throw (
          (Jt && Jt(),
          M && M.name === "TypeError" && /Load failed|fetch/i.test(M.message)
            ? Object.assign(new at("Network Error", at.ERR_NETWORK, R, me), {
                cause: M.cause || M,
              })
            : at.from(M, M && M.code, R, me))
        );
      }
    };
  },
  $1 = new Map(),
  oy = (a) => {
    let c = (a && a.env) || {};
    const { fetch: r, Request: f, Response: s } = c,
      d = [f, s, r];
    let h = d.length,
      p = h,
      v,
      y,
      g = $1;
    for (; p--; )
      (v = d[p]),
        (y = g.get(v)),
        y === void 0 && g.set(v, (y = p ? new Map() : F1(c))),
        (g = y);
    return y;
  };
oy();
const Zr = { http: h1, xhr: Q1, fetch: { get: oy } };
x.forEach(Zr, (a, c) => {
  if (a) {
    try {
      Object.defineProperty(a, "name", { value: c });
    } catch {}
    Object.defineProperty(a, "adapterName", { value: c });
  }
});
const Om = (a) => `- ${a}`,
  W1 = (a) => x.isFunction(a) || a === null || a === !1;
function P1(a, c) {
  a = x.isArray(a) ? a : [a];
  const { length: r } = a;
  let f, s;
  const d = {};
  for (let h = 0; h < r; h++) {
    f = a[h];
    let p;
    if (
      ((s = f),
      !W1(f) && ((s = Zr[(p = String(f)).toLowerCase()]), s === void 0))
    )
      throw new at(`Unknown adapter '${p}'`);
    if (s && (x.isFunction(s) || (s = s.get(c)))) break;
    d[p || "#" + h] = s;
  }
  if (!s) {
    const h = Object.entries(d).map(
      ([v, y]) =>
        `adapter ${v} ` +
        (y === !1
          ? "is not supported by the environment"
          : "is not available in the build")
    );
    let p = r
      ? h.length > 1
        ? `since :
` +
          h.map(Om).join(`
`)
        : " " + Om(h[0])
      : "as no adapter specified";
    throw new at(
      "There is no suitable adapter to dispatch the request " + p,
      "ERR_NOT_SUPPORT"
    );
  }
  return s;
}
const dy = { getAdapter: P1, adapters: Zr };
function Er(a) {
  if (
    (a.cancelToken && a.cancelToken.throwIfRequested(),
    a.signal && a.signal.aborted)
  )
    throw new Pn(null, a);
}
function Rm(a) {
  return (
    Er(a),
    (a.headers = he.from(a.headers)),
    (a.data = br.call(a, a.transformRequest)),
    ["post", "put", "patch"].indexOf(a.method) !== -1 &&
      a.headers.setContentType("application/x-www-form-urlencoded", !1),
    dy
      .getAdapter(
        a.adapter || uu.adapter,
        a
      )(a)
      .then(
        function (f) {
          return (
            Er(a),
            (f.data = br.call(a, a.transformResponse, f)),
            (f.headers = he.from(f.headers)),
            f
          );
        },
        function (f) {
          return (
            cy(f) ||
              (Er(a),
              f &&
                f.response &&
                ((f.response.data = br.call(
                  a,
                  a.transformResponse,
                  f.response
                )),
                (f.response.headers = he.from(f.response.headers)))),
            Promise.reject(f)
          );
        }
      )
  );
}
const hy = "1.13.2",
  Vi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (a, c) => {
    Vi[a] = function (f) {
      return typeof f === a || "a" + (c < 1 ? "n " : " ") + a;
    };
  }
);
const _m = {};
Vi.transitional = function (c, r, f) {
  function s(d, h) {
    return (
      "[Axios v" +
      hy +
      "] Transitional option '" +
      d +
      "'" +
      h +
      (f ? ". " + f : "")
    );
  }
  return (d, h, p) => {
    if (c === !1)
      throw new at(
        s(h, " has been removed" + (r ? " in " + r : "")),
        at.ERR_DEPRECATED
      );
    return (
      r &&
        !_m[h] &&
        ((_m[h] = !0),
        console.warn(
          s(
            h,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future"
          )
        )),
      c ? c(d, h, p) : !0
    );
  };
};
Vi.spelling = function (c) {
  return (r, f) => (console.warn(`${f} is likely a misspelling of ${c}`), !0);
};
function I1(a, c, r) {
  if (typeof a != "object")
    throw new at("options must be an object", at.ERR_BAD_OPTION_VALUE);
  const f = Object.keys(a);
  let s = f.length;
  for (; s-- > 0; ) {
    const d = f[s],
      h = c[d];
    if (h) {
      const p = a[d],
        v = p === void 0 || h(p, d, a);
      if (v !== !0)
        throw new at("option " + d + " must be " + v, at.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new at("Unknown option " + d, at.ERR_BAD_OPTION);
  }
}
const Ni = { assertOptions: I1, validators: Vi },
  Ze = Ni.validators;
let un = class {
  constructor(c) {
    (this.defaults = c || {}),
      (this.interceptors = { request: new mm(), response: new mm() });
  }
  async request(c, r) {
    try {
      return await this._request(c, r);
    } catch (f) {
      if (f instanceof Error) {
        let s = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(s)
          : (s = new Error());
        const d = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          f.stack
            ? d &&
              !String(f.stack).endsWith(d.replace(/^.+\n.+\n/, "")) &&
              (f.stack +=
                `
` + d)
            : (f.stack = d);
        } catch {}
      }
      throw f;
    }
  }
  _request(c, r) {
    typeof c == "string" ? ((r = r || {}), (r.url = c)) : (r = c || {}),
      (r = cn(this.defaults, r));
    const { transitional: f, paramsSerializer: s, headers: d } = r;
    f !== void 0 &&
      Ni.assertOptions(
        f,
        {
          silentJSONParsing: Ze.transitional(Ze.boolean),
          forcedJSONParsing: Ze.transitional(Ze.boolean),
          clarifyTimeoutError: Ze.transitional(Ze.boolean),
        },
        !1
      ),
      s != null &&
        (x.isFunction(s)
          ? (r.paramsSerializer = { serialize: s })
          : Ni.assertOptions(
              s,
              { encode: Ze.function, serialize: Ze.function },
              !0
            )),
      r.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (r.allowAbsoluteUrls = !0)),
      Ni.assertOptions(
        r,
        {
          baseUrl: Ze.spelling("baseURL"),
          withXsrfToken: Ze.spelling("withXSRFToken"),
        },
        !0
      ),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase());
    let h = d && x.merge(d.common, d[r.method]);
    d &&
      x.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (R) => {
          delete d[R];
        }
      ),
      (r.headers = he.concat(h, d));
    const p = [];
    let v = !0;
    this.interceptors.request.forEach(function (L) {
      (typeof L.runWhen == "function" && L.runWhen(r) === !1) ||
        ((v = v && L.synchronous), p.unshift(L.fulfilled, L.rejected));
    });
    const y = [];
    this.interceptors.response.forEach(function (L) {
      y.push(L.fulfilled, L.rejected);
    });
    let g,
      b = 0,
      D;
    if (!v) {
      const R = [Rm.bind(this), void 0];
      for (
        R.unshift(...p), R.push(...y), D = R.length, g = Promise.resolve(r);
        b < D;

      )
        g = g.then(R[b++], R[b++]);
      return g;
    }
    D = p.length;
    let Y = r;
    for (; b < D; ) {
      const R = p[b++],
        L = p[b++];
      try {
        Y = R(Y);
      } catch (_) {
        L.call(this, _);
        break;
      }
    }
    try {
      g = Rm.call(this, Y);
    } catch (R) {
      return Promise.reject(R);
    }
    for (b = 0, D = y.length; b < D; ) g = g.then(y[b++], y[b++]);
    return g;
  }
  getUri(c) {
    c = cn(this.defaults, c);
    const r = ry(c.baseURL, c.url, c.allowAbsoluteUrls);
    return ay(r, c.params, c.paramsSerializer);
  }
};
x.forEach(["delete", "get", "head", "options"], function (c) {
  un.prototype[c] = function (r, f) {
    return this.request(
      cn(f || {}, { method: c, url: r, data: (f || {}).data })
    );
  };
});
x.forEach(["post", "put", "patch"], function (c) {
  function r(f) {
    return function (d, h, p) {
      return this.request(
        cn(p || {}, {
          method: c,
          headers: f ? { "Content-Type": "multipart/form-data" } : {},
          url: d,
          data: h,
        })
      );
    };
  }
  (un.prototype[c] = r()), (un.prototype[c + "Form"] = r(!0));
});
let tS = class my {
  constructor(c) {
    if (typeof c != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (d) {
      r = d;
    });
    const f = this;
    this.promise.then((s) => {
      if (!f._listeners) return;
      let d = f._listeners.length;
      for (; d-- > 0; ) f._listeners[d](s);
      f._listeners = null;
    }),
      (this.promise.then = (s) => {
        let d;
        const h = new Promise((p) => {
          f.subscribe(p), (d = p);
        }).then(s);
        return (
          (h.cancel = function () {
            f.unsubscribe(d);
          }),
          h
        );
      }),
      c(function (d, h, p) {
        f.reason || ((f.reason = new Pn(d, h, p)), r(f.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(c) {
    if (this.reason) {
      c(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(c) : (this._listeners = [c]);
  }
  unsubscribe(c) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(c);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const c = new AbortController(),
      r = (f) => {
        c.abort(f);
      };
    return (
      this.subscribe(r),
      (c.signal.unsubscribe = () => this.unsubscribe(r)),
      c.signal
    );
  }
  static source() {
    let c;
    return {
      token: new my(function (s) {
        c = s;
      }),
      cancel: c,
    };
  }
};
function eS(a) {
  return function (r) {
    return a.apply(null, r);
  };
}
function lS(a) {
  return x.isObject(a) && a.isAxiosError === !0;
}
const xr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(xr).forEach(([a, c]) => {
  xr[c] = a;
});
function yy(a) {
  const c = new un(a),
    r = Km(un.prototype.request, c);
  return (
    x.extend(r, un.prototype, c, { allOwnKeys: !0 }),
    x.extend(r, c, null, { allOwnKeys: !0 }),
    (r.create = function (s) {
      return yy(cn(a, s));
    }),
    r
  );
}
const Ht = yy(uu);
Ht.Axios = un;
Ht.CanceledError = Pn;
Ht.CancelToken = tS;
Ht.isCancel = cy;
Ht.VERSION = hy;
Ht.toFormData = Qi;
Ht.AxiosError = at;
Ht.Cancel = Ht.CanceledError;
Ht.all = function (c) {
  return Promise.all(c);
};
Ht.spread = eS;
Ht.isAxiosError = lS;
Ht.mergeConfig = cn;
Ht.AxiosHeaders = he;
Ht.formToJSON = (a) => iy(x.isHTMLForm(a) ? new FormData(a) : a);
Ht.getAdapter = dy.getAdapter;
Ht.HttpStatusCode = xr;
Ht.default = Ht;
const {
    Axios: ZS,
    AxiosError: KS,
    CanceledError: JS,
    isCancel: kS,
    CancelToken: FS,
    VERSION: $S,
    all: WS,
    Cancel: PS,
    isAxiosError: IS,
    spread: tb,
    toFormData: eb,
    AxiosHeaders: lb,
    HttpStatusCode: nb,
    formToJSON: ab,
    getAdapter: ub,
    mergeConfig: ib,
  } = Ht,
  nS = (a) => {
    const c = localStorage.getItem("token");
    return c === null || (a.headers.Authorization = `Bearer ${c}`), a;
  },
  aS = void 0,
  Pa = Ht.create({ baseURL: aS });
Pa.defaults.headers.common["Content-Type"] = "application/json";
Pa.interceptors.request.use(nS);
class Ar {
  id;
  name;
  email;
  thumbnailUrl;
  constructor(c) {
    Object.assign(this, c);
  }
}
const Kr = {
    async signup(a, c, r) {
      const f = await Pa.post("/auth/signup", {
          name: a,
          email: c,
          password: r,
        }),
        { user: s, token: d } = f.data;
      return { user: new Ar(s), token: d };
    },
    async signin(a, c) {
      const r = await Pa.post("/auth/signin", { email: a, password: c }),
        { user: f, token: s } = r.data;
      return { user: new Ar(f), token: s };
    },
    async getCurrentUser() {
      const a = await Pa.get("/auth/me");
      if (a.data != null) return new Ar(a.data);
    },
  },
  Jn = {};
function vy(a) {
  return "init" in a;
}
function Nr(a) {
  return !!a.write;
}
function zm(a) {
  return "v" in a || "e" in a;
}
function Ui(a) {
  if ("e" in a) throw a.e;
  if ((Jn ? "production" : void 0) !== "production" && !("v" in a))
    throw new Error("[Bug] atom state is not initialized");
  return a.v;
}
const ji = new WeakMap();
function py(a) {
  var c;
  return wi(a) && !!((c = ji.get(a)) != null && c[0]);
}
function uS(a) {
  const c = ji.get(a);
  c?.[0] && ((c[0] = !1), c[1].forEach((r) => r()));
}
function Mr(a, c) {
  let r = ji.get(a);
  if (!r) {
    (r = [!0, new Set()]), ji.set(a, r);
    const f = () => {
      r[0] = !1;
    };
    a.then(f, f);
  }
  r[1].add(c);
}
function wi(a) {
  return typeof a?.then == "function";
}
function gy(a, c, r) {
  if (!r.p.has(a)) {
    r.p.add(a);
    const f = () => r.p.delete(a);
    c.then(f, f);
  }
}
function Sy(a, c, r) {
  var f;
  const s = new Set();
  for (const d of ((f = r.get(a)) == null ? void 0 : f.t) || [])
    r.has(d) && s.add(d);
  for (const d of c.p) s.add(d);
  return s;
}
const iS = (a, c, ...r) => c.read(...r),
  cS = (a, c, ...r) => c.write(...r),
  fS = (a, c) => {
    var r;
    return (r = c.unstable_onInit) == null ? void 0 : r.call(c, a);
  },
  rS = (a, c, r) => {
    var f;
    return (f = c.onMount) == null ? void 0 : f.call(c, r);
  },
  sS = (a, c) => {
    const r = ee(a),
      f = r[0],
      s = r[9];
    if ((Jn ? "production" : void 0) !== "production" && !c)
      throw new Error("Atom is undefined or null");
    let d = f.get(c);
    return (
      d || ((d = { d: new Map(), p: new Set(), n: 0 }), f.set(c, d), s?.(a, c)),
      d
    );
  },
  oS = (a) => {
    const c = ee(a),
      r = c[1],
      f = c[3],
      s = c[4],
      d = c[5],
      h = c[6],
      p = c[13],
      v = [],
      y = (g) => {
        try {
          g();
        } catch (b) {
          v.push(b);
        }
      };
    do {
      h.f && y(h.f);
      const g = new Set(),
        b = g.add.bind(g);
      f.forEach((D) => {
        var Y;
        return (Y = r.get(D)) == null ? void 0 : Y.l.forEach(b);
      }),
        f.clear(),
        d.forEach(b),
        d.clear(),
        s.forEach(b),
        s.clear(),
        g.forEach(y),
        f.size && p(a);
    } while (f.size || d.size || s.size);
    if (v.length) throw new AggregateError(v);
  },
  dS = (a) => {
    const c = ee(a),
      r = c[1],
      f = c[2],
      s = c[3],
      d = c[11],
      h = c[14],
      p = c[17],
      v = [],
      y = new WeakSet(),
      g = new WeakSet(),
      b = Array.from(s);
    for (; b.length; ) {
      const D = b[b.length - 1],
        Y = d(a, D);
      if (g.has(D)) {
        b.pop();
        continue;
      }
      if (y.has(D)) {
        if (f.get(D) === Y.n) v.push([D, Y]);
        else if ((Jn ? "production" : void 0) !== "production" && f.has(D))
          throw new Error("[Bug] invalidated atom exists");
        g.add(D), b.pop();
        continue;
      }
      y.add(D);
      for (const R of Sy(D, Y, r)) y.has(R) || b.push(R);
    }
    for (let D = v.length - 1; D >= 0; --D) {
      const [Y, R] = v[D];
      let L = !1;
      for (const _ of R.d.keys())
        if (_ !== Y && s.has(_)) {
          L = !0;
          break;
        }
      L && (h(a, Y), p(a, Y)), f.delete(Y);
    }
  },
  hS = (a, c) => {
    var r, f;
    const s = ee(a),
      d = s[1],
      h = s[2],
      p = s[3],
      v = s[6],
      y = s[7],
      g = s[11],
      b = s[12],
      D = s[13],
      Y = s[14],
      R = s[16],
      L = s[17],
      _ = g(a, c);
    if (
      zm(_) &&
      ((d.has(c) && h.get(c) !== _.n) ||
        Array.from(_.d).every(([lt, ht]) => Y(a, lt).n === ht))
    )
      return _;
    _.d.clear();
    let G = !0;
    function X() {
      d.has(c) && (L(a, c), D(a), b(a));
    }
    function Z(lt) {
      var ht;
      if (lt === c) {
        const Xt = g(a, lt);
        if (!zm(Xt))
          if (vy(lt)) Hi(a, lt, lt.init);
          else throw new Error("no atom init");
        return Ui(Xt);
      }
      const Bt = Y(a, lt);
      try {
        return Ui(Bt);
      } finally {
        _.d.set(lt, Bt.n),
          py(_.v) && gy(c, _.v, Bt),
          (ht = d.get(lt)) == null || ht.t.add(c),
          G || X();
      }
    }
    let I, it;
    const St = {
        get signal() {
          return I || (I = new AbortController()), I.signal;
        },
        get setSelf() {
          return (
            (Jn ? "production" : void 0) !== "production" &&
              !Nr(c) &&
              console.warn(
                "setSelf function cannot be used with read-only atom"
              ),
            !it &&
              Nr(c) &&
              (it = (...lt) => {
                if (
                  ((Jn ? "production" : void 0) !== "production" &&
                    G &&
                    console.warn("setSelf function cannot be called in sync"),
                  !G)
                )
                  try {
                    return R(a, c, ...lt);
                  } finally {
                    D(a), b(a);
                  }
              }),
            it
          );
        },
      },
      F = _.n;
    try {
      const lt = y(a, c, Z, St);
      return (
        Hi(a, c, lt),
        wi(lt) && (Mr(lt, () => I?.abort()), lt.then(X, X)),
        (r = v.r) == null || r.call(v, c),
        _
      );
    } catch (lt) {
      return delete _.v, (_.e = lt), ++_.n, _;
    } finally {
      (G = !1),
        F !== _.n &&
          h.get(c) === F &&
          (h.set(c, _.n), p.add(c), (f = v.c) == null || f.call(v, c));
    }
  },
  mS = (a, c) => {
    const r = ee(a),
      f = r[1],
      s = r[2],
      d = r[11],
      h = [c];
    for (; h.length; ) {
      const p = h.pop(),
        v = d(a, p);
      for (const y of Sy(p, v, f)) {
        const g = d(a, y);
        s.set(y, g.n), h.push(y);
      }
    }
  },
  by = (a, c, ...r) => {
    const f = ee(a),
      s = f[3],
      d = f[6],
      h = f[8],
      p = f[11],
      v = f[12],
      y = f[13],
      g = f[14],
      b = f[15],
      D = f[17];
    let Y = !0;
    const R = (_) => Ui(g(a, _)),
      L = (_, ...G) => {
        var X;
        const Z = p(a, _);
        try {
          if (_ === c) {
            if (!vy(_)) throw new Error("atom not writable");
            const I = Z.n,
              it = G[0];
            Hi(a, _, it),
              D(a, _),
              I !== Z.n &&
                (s.add(_), (X = d.c) == null || X.call(d, _), b(a, _));
            return;
          } else return by(a, _, ...G);
        } finally {
          Y || (y(a), v(a));
        }
      };
    try {
      return h(a, c, R, L, ...r);
    } finally {
      Y = !1;
    }
  },
  yS = (a, c) => {
    var r;
    const f = ee(a),
      s = f[1],
      d = f[3],
      h = f[6],
      p = f[11],
      v = f[15],
      y = f[18],
      g = f[19],
      b = p(a, c),
      D = s.get(c);
    if (D && !py(b.v)) {
      for (const [Y, R] of b.d)
        if (!D.d.has(Y)) {
          const L = p(a, Y);
          y(a, Y).t.add(c),
            D.d.add(Y),
            R !== L.n && (d.add(Y), (r = h.c) == null || r.call(h, Y), v(a, Y));
        }
      for (const Y of D.d || [])
        if (!b.d.has(Y)) {
          D.d.delete(Y);
          const R = g(a, Y);
          R?.t.delete(c);
        }
    }
  },
  Ey = (a, c) => {
    var r;
    const f = ee(a),
      s = f[1],
      d = f[4],
      h = f[6],
      p = f[10],
      v = f[11],
      y = f[12],
      g = f[13],
      b = f[14],
      D = f[16],
      Y = v(a, c);
    let R = s.get(c);
    if (!R) {
      b(a, c);
      for (const L of Y.d.keys()) Ey(a, L).t.add(c);
      if (
        ((R = { l: new Set(), d: new Set(Y.d.keys()), t: new Set() }),
        s.set(c, R),
        (r = h.m) == null || r.call(h, c),
        Nr(c))
      ) {
        const L = () => {
          let _ = !0;
          const G = (...X) => {
            try {
              return D(a, c, ...X);
            } finally {
              _ || (g(a), y(a));
            }
          };
          try {
            const X = p(a, c, G);
            X &&
              (R.u = () => {
                _ = !0;
                try {
                  X();
                } finally {
                  _ = !1;
                }
              });
          } finally {
            _ = !1;
          }
        };
        d.add(L);
      }
    }
    return R;
  },
  vS = (a, c) => {
    var r;
    const f = ee(a),
      s = f[1],
      d = f[5],
      h = f[6],
      p = f[11],
      v = f[19],
      y = p(a, c);
    let g = s.get(c);
    if (
      g &&
      !g.l.size &&
      !Array.from(g.t).some((b) => {
        var D;
        return (D = s.get(b)) == null ? void 0 : D.d.has(c);
      })
    ) {
      g.u && d.add(g.u),
        (g = void 0),
        s.delete(c),
        (r = h.u) == null || r.call(h, c);
      for (const b of y.d.keys()) {
        const D = v(a, b);
        D?.t.delete(c);
      }
      return;
    }
    return g;
  },
  Hi = (a, c, r) => {
    const f = ee(a)[11],
      s = f(a, c),
      d = "v" in s,
      h = s.v;
    if (wi(r)) for (const p of s.d.keys()) gy(c, r, f(a, p));
    (s.v = r),
      delete s.e,
      (!d || !Object.is(h, s.v)) && (++s.n, wi(h) && uS(h));
  },
  pS = (a, c) => {
    const r = ee(a)[14];
    return Ui(r(a, c));
  },
  gS = (a, c, ...r) => {
    const f = ee(a),
      s = f[12],
      d = f[13],
      h = f[16];
    try {
      return h(a, c, ...r);
    } finally {
      d(a), s(a);
    }
  },
  SS = (a, c, r) => {
    const f = ee(a),
      s = f[12],
      d = f[18],
      h = f[19],
      v = d(a, c).l;
    return (
      v.add(r),
      s(a),
      () => {
        v.delete(r), h(a, c), s(a);
      }
    );
  },
  Ay = new WeakMap(),
  ee = (a) => {
    const c = Ay.get(a);
    if ((Jn ? "production" : void 0) !== "production" && !c)
      throw new Error(
        "Store must be created by buildStore to read its building blocks"
      );
    return c;
  };
function bS(...a) {
  const c = {
      get(f) {
        const s = ee(c)[21];
        return s(c, f);
      },
      set(f, ...s) {
        const d = ee(c)[22];
        return d(c, f, ...s);
      },
      sub(f, s) {
        const d = ee(c)[23];
        return d(c, f, s);
      },
    },
    r = [
      new WeakMap(),
      new WeakMap(),
      new WeakMap(),
      new Set(),
      new Set(),
      new Set(),
      {},
      iS,
      cS,
      fS,
      rS,
      sS,
      oS,
      dS,
      hS,
      mS,
      by,
      yS,
      Ey,
      vS,
      Hi,
      pS,
      gS,
      SS,
      void 0,
    ].map((f, s) => a[s] || f);
  return Ay.set(c, Object.freeze(r)), c;
}
const Ty = {};
let ES = 0;
function AS(a, c) {
  const r = `atom${++ES}`,
    f = {
      toString() {
        return (Ty ? "production" : void 0) !== "production" && this.debugLabel
          ? r + ":" + this.debugLabel
          : r;
      },
    };
  return (f.init = a), (f.read = TS), (f.write = OS), f;
}
function TS(a) {
  return a(this);
}
function OS(a, c, r) {
  return c(this, typeof r == "function" ? r(a(this)) : r);
}
function RS() {
  return bS();
}
let $a;
function _S() {
  return (
    $a ||
      (($a = RS()),
      (Ty ? "production" : void 0) !== "production" &&
        (globalThis.__JOTAI_DEFAULT_STORE__ ||
          (globalThis.__JOTAI_DEFAULT_STORE__ = $a),
        globalThis.__JOTAI_DEFAULT_STORE__ !== $a &&
          console.warn(
            "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
          ))),
    $a
  );
}
const zS = {},
  CS = j.createContext(void 0);
function Oy(a) {
  return j.useContext(CS) || _S();
}
const Dr = (a) => typeof a?.then == "function",
  Ur = (a) => {
    a.status ||
      ((a.status = "pending"),
      a.then(
        (c) => {
          (a.status = "fulfilled"), (a.value = c);
        },
        (c) => {
          (a.status = "rejected"), (a.reason = c);
        }
      ));
  },
  xS =
    xm.use ||
    ((a) => {
      if (a.status === "pending") throw a;
      if (a.status === "fulfilled") return a.value;
      throw a.status === "rejected" ? a.reason : (Ur(a), a);
    }),
  Tr = new WeakMap(),
  Cm = (a, c) => {
    let r = Tr.get(a);
    return (
      r ||
        ((r = new Promise((f, s) => {
          let d = a;
          const h = (y) => (g) => {
              d === y && f(g);
            },
            p = (y) => (g) => {
              d === y && s(g);
            },
            v = () => {
              try {
                const y = c();
                Dr(y)
                  ? (Tr.set(y, r), (d = y), y.then(h(y), p(y)), Mr(y, v))
                  : f(y);
              } catch (y) {
                s(y);
              }
            };
          a.then(h(a), p(a)), Mr(a, v);
        })),
        Tr.set(a, r)),
      r
    );
  };
function NS(a, c) {
  const { delay: r, unstable_promiseStatus: f = !xm.use } = {},
    s = Oy(),
    [[d, h, p], v] = j.useReducer(
      (g) => {
        const b = s.get(a);
        return Object.is(g[0], b) && g[1] === s && g[2] === a ? g : [b, s, a];
      },
      void 0,
      () => [s.get(a), s, a]
    );
  let y = d;
  if (
    ((h !== s || p !== a) && (v(), (y = s.get(a))),
    j.useEffect(() => {
      const g = s.sub(a, () => {
        if (f)
          try {
            const b = s.get(a);
            Dr(b) && Ur(Cm(b, () => s.get(a)));
          } catch {}
        if (typeof r == "number") {
          setTimeout(v, r);
          return;
        }
        v();
      });
      return v(), g;
    }, [s, a, r, f]),
    j.useDebugValue(y),
    Dr(y))
  ) {
    const g = Cm(y, () => s.get(a));
    return f && Ur(g), xS(g);
  }
  return y;
}
function MS(a, c) {
  const r = Oy();
  return j.useCallback(
    (...s) => {
      if ((zS ? "production" : void 0) !== "production" && !("write" in a))
        throw new Error("not writable atom");
      return r.set(a, ...s);
    },
    [r, a]
  );
}
function DS(a, c) {
  return [NS(a), MS(a)];
}
const US = AS(),
  Zi = () => {
    const [a, c] = DS(US);
    return { currentUser: a, setCurrentUser: c };
  };
function jS(a) {
  const [c, r] = j.useState("");
  return U.jsx("div", {
    className: "profile-modal-overlay",
    children: U.jsxs("div", {
      className: "profile-modal",
      onClick: (f) => f.stopPropagation(),
      children: [
        U.jsx("div", {
          className: "profile-modal-header",
          children: U.jsx("h2", { children: "新しいワークスペースを作成" }),
        }),
        U.jsx("div", {
          className: "profile-modal-content",
          children: U.jsx("div", {
            className: "profile-form",
            children: U.jsxs("div", {
              className: "form-group",
              children: [
                U.jsx("label", {
                  htmlFor: "workspaceName",
                  children: "ワークスペース名",
                }),
                U.jsx("input", {
                  type: "text",
                  id: "workspaceName",
                  name: "workspaceName",
                  className: "profile-input",
                  placeholder: "新しいワークスペース名を入力してください",
                  autoFocus: !0,
                  value: c,
                  onChange: (f) => r(f.target.value),
                }),
                U.jsx("div", {
                  className: "help-text",
                  children:
                    "チームやプロジェクトの名前など、ワークスペースの用途がわかりやすい名前を設定してください。",
                }),
              ],
            }),
          }),
        }),
        U.jsxs("div", {
          className: "profile-modal-footer",
          children: [
            a.allowCancel &&
              U.jsx("button", {
                className: "cancel-button",
                children: "キャンセル",
              }),
            U.jsx("button", {
              className: "save-button",
              onClick: () => a.onSubmit(c),
              children: "作成",
            }),
          ],
        }),
      ],
    }),
  });
}
function wS() {
  const { currentUser: a } = Zi();
  if (a == null) return U.jsx(Ym, { to: "/signin" });
  const c = (r) => {
    console.log("作成されたワークスペース名:", r);
  };
  return U.jsx("div", { children: U.jsx(jS, { onSubmit: c }) });
}
function HS() {
  return U.jsxs("div", {
    className: "workspace-selector",
    children: [
      U.jsxs("div", {
        className: "workspaces",
        children: [
          U.jsx("div", { className: "workspace-icon", children: "A" }, 1),
          U.jsx("div", { className: "workspace-icon", children: "B" }, 2),
          U.jsx("div", { className: "workspace-icon add", children: "+" }),
        ],
      }),
      U.jsxs("div", {
        className: "user-profile",
        children: [
          U.jsx("div", {
            className: "avatar-img ",
            children: U.jsx("img", {
              src: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
              alt: "Posted image",
              className: "message-image",
            }),
          }),
          U.jsx("div", {
            className: "logout-button",
            title: "ログアウト",
            children: U.jsxs("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                U.jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
                U.jsx("polyline", { points: "16 17 21 12 16 7" }),
                U.jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function BS() {
  return U.jsxs("div", {
    className: "sidebar",
    children: [
      U.jsx("div", {
        className: "workspace-header",
        children: U.jsx("h2", { children: "test" }),
      }),
      U.jsxs("div", {
        className: "sidebar-section",
        children: [
          U.jsxs("div", {
            className: "section-header channels-header",
            children: [
              U.jsx("svg", {
                viewBox: "0 0 20 20",
                width: "10",
                height: "10",
                fill: "currentColor",
                children: U.jsx("path", {
                  fillRule: "evenodd",
                  d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                  clipRule: "evenodd",
                }),
              }),
              U.jsx("h3", { children: "Channels" }),
            ],
          }),
          U.jsxs("ul", {
            className: "channels-list expanded",
            children: [
              U.jsxs(
                "li",
                {
                  className: "active",
                  children: [
                    U.jsx("span", { className: "channel-icon", children: "#" }),
                    " ",
                    "test",
                  ],
                },
                1
              ),
              U.jsxs("li", {
                children: [
                  U.jsx("span", {
                    className: "channel-icon add",
                    children: "+",
                  }),
                  " Add channels",
                ],
              }),
            ],
          }),
          U.jsxs("div", {
            className: "section-header channels-header",
            children: [
              U.jsx("span", { className: "channel-icon add", children: "+" }),
              " Invite Pepole",
            ],
          }),
        ],
      }),
    ],
  });
}
function qS() {
  return U.jsxs("div", {
    className: "main-content",
    children: [
      U.jsxs("header", {
        className: "channel-header",
        children: [
          U.jsx("div", {
            className: "channel-info",
            children: U.jsxs("h2", { children: ["# ", "test"] }),
          }),
          U.jsx("div", {
            className: "channel-actions",
            children: U.jsx("button", {
              className: "delete-channel-button",
              onClick: () => {},
              title: "チャンネルを削除",
              children: U.jsx("svg", {
                viewBox: "0 0 24 24",
                width: "16",
                height: "16",
                fill: "currentColor",
                children: U.jsx("path", {
                  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
                }),
              }),
            }),
          }),
        ],
      }),
      U.jsx("div", {
        className: "messages-container",
        style: { overflowY: "auto", maxHeight: "calc(100vh - 150px)" },
        children: U.jsxs(
          "div",
          {
            style: { display: "flex", flexDirection: "column-reverse" },
            children: [
              U.jsxs(
                "div",
                {
                  className: "message",
                  children: [
                    U.jsx("div", {
                      className: "avatar",
                      children: U.jsx("div", {
                        className: "avatar-img ",
                        children: U.jsx("img", {
                          src: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
                          alt: "Posted image",
                          className: "message-image",
                        }),
                      }),
                    }),
                    U.jsxs("div", {
                      className: "message-content",
                      children: [
                        U.jsxs("div", {
                          className: "message-header",
                          children: [
                            U.jsx("span", {
                              className: "username",
                              children: "test",
                            }),
                            U.jsx("span", {
                              className: "timestamp",
                              children: "2025/05/11 12:23",
                            }),
                            U.jsx("button", {
                              className: "message-delete-button",
                              title: "メッセージを削除",
                              children: U.jsx("svg", {
                                viewBox: "0 0 24 24",
                                width: "16",
                                height: "16",
                                fill: "currentColor",
                                children: U.jsx("path", {
                                  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
                                }),
                              }),
                            }),
                          ],
                        }),
                        U.jsx("div", {
                          className: "message-text",
                          children: "test",
                        }),
                      ],
                    }),
                  ],
                },
                1
              ),
              U.jsx("div", {
                className: "date-divider",
                children: U.jsx("span", { children: "2025/05/11" }),
              }),
            ],
          },
          1
        ),
      }),
      U.jsx("div", {
        className: "message-input-container",
        children: U.jsxs("div", {
          className: "message-input-wrapper",
          children: [
            U.jsx("textarea", {
              className: "message-input",
              placeholder: "Message",
            }),
            U.jsxs("div", {
              className: "image-upload",
              children: [
                U.jsx("input", {
                  type: "file",
                  style: { display: "none" },
                  accept: "image/*",
                }),
                U.jsx("button", {
                  className: "action-button",
                  children: U.jsx("svg", {
                    viewBox: "0 0 20 20",
                    width: "18",
                    height: "18",
                    fill: "currentColor",
                    children: U.jsx("path", {
                      fillRule: "evenodd",
                      d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z",
                      clipRule: "evenodd",
                    }),
                  }),
                }),
                U.jsx("button", {
                  className: "action-button",
                  children: U.jsx("svg", {
                    viewBox: "0 0 20 20",
                    width: "18",
                    height: "18",
                    fill: "currentColor",
                    children: U.jsx("path", {
                      fillRule: "evenodd",
                      d: "M17.447 9.106a1 1 0 000 1.788l-14 7a1 1 0 01-1.409-1.169l1.429-5A1 1 0 014.429 11H9a1 1 0 100-2H4.429a1 1 0 01-.962-.725l-1.428-5a1 1 0 011.408-1.17l14 7z",
                      clipRule: "evenodd",
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function LS() {
  return U.jsxs("div", {
    className: "slack-container",
    children: [
      U.jsx(HS, {}),
      U.jsxs(U.Fragment, { children: [U.jsx(BS, {}), U.jsx(qS, {})] }),
    ],
  });
}
function YS() {
  const [a, c] = j.useState(""),
    [r, f] = j.useState(""),
    { currentUser: s, setCurrentUser: d } = Zi(),
    h = async () => {
      if (a === "" || r === "") return;
      const { user: p, token: v } = await Kr.signin(a, r);
      d(p), localStorage.setItem("token", v);
    };
  return s != null
    ? U.jsx(Ym, { to: "/" })
    : U.jsx("div", {
        className: "signup-container",
        children: U.jsxs("div", {
          className: "signup-form-container",
          children: [
            U.jsx("h1", { className: "signup-title", children: "Sign in" }),
            U.jsx("p", {
              className: "signup-subtitle",
              children: "メールアドレスでログインしてください",
            }),
            U.jsxs("div", {
              children: [
                U.jsx("div", {
                  className: "form-group",
                  children: U.jsx("input", {
                    type: "email",
                    placeholder: "Email",
                    value: a,
                    onChange: (p) => c(p.target.value),
                    required: !0,
                  }),
                }),
                U.jsx("div", {
                  className: "form-group",
                  children: U.jsx("input", {
                    type: "password",
                    placeholder: "Password",
                    value: r,
                    onChange: (p) => f(p.target.value),
                    required: !0,
                  }),
                }),
                U.jsx("button", {
                  type: "submit",
                  className: "continue-button",
                  onClick: h,
                  disabled: a === "" || r === "",
                  children: "Continue",
                }),
              ],
            }),
            U.jsxs("p", {
              className: "signin-link",
              children: [
                "ユーザー登録は",
                U.jsx(Li, { to: "/signup", children: "こちら" }),
              ],
            }),
          ],
        }),
      });
}
function GS() {
  const [a, c] = j.useState(""),
    [r, f] = j.useState(""),
    [s, d] = j.useState(""),
    { setCurrentUser: h } = Zi(),
    p = async () => {
      if (a === "" || r === "" || s === "") return;
      const { user: v, token: y } = await Kr.signup(a, r, s);
      localStorage.setItem("token", y), h(v);
    };
  return U.jsx("div", {
    className: "signup-container",
    children: U.jsxs("div", {
      className: "signup-form-container",
      children: [
        U.jsx("h1", {
          className: "signup-title",
          children: "Sign up to continue",
        }),
        U.jsx("p", {
          className: "signup-subtitle",
          children: "Use your email or another service to continue",
        }),
        U.jsxs("div", {
          children: [
            U.jsx("div", {
              className: "form-group",
              children: U.jsx("input", {
                type: "text",
                placeholder: "Full name",
                value: a,
                onChange: (v) => c(v.target.value),
                required: !0,
              }),
            }),
            U.jsx("div", {
              className: "form-group",
              children: U.jsx("input", {
                type: "email",
                placeholder: "Email",
                value: r,
                onChange: (v) => f(v.target.value),
                required: !0,
              }),
            }),
            U.jsx("div", {
              className: "form-group",
              children: U.jsx("input", {
                type: "password",
                placeholder: "Password",
                value: s,
                onChange: (v) => d(v.target.value),
                required: !0,
              }),
            }),
            U.jsx("button", {
              type: "submit",
              className: "continue-button",
              onClick: p,
              disabled: a === "" || r === "" || s === "",
              children: "Continue",
            }),
          ],
        }),
        U.jsxs("p", {
          className: "signin-link",
          children: [
            "ログインは ",
            U.jsx(Li, { to: "/signin", children: "こちら" }),
          ],
        }),
      ],
    }),
  });
}
function XS() {
  const [a, c] = j.useState(!0),
    { setCurrentUser: r } = Zi(),
    f = async () => {
      try {
        const s = await Kr.getCurrentUser();
        r(s);
      } catch (s) {
        console.error("Failed to fetch current user:", s);
      } finally {
        c(!1);
      }
    };
  return (
    j.useEffect(() => {
      f();
    }, []),
    a
      ? U.jsx("div", {})
      : U.jsx(U.Fragment, {
          children: U.jsx(gg, {
            basename: "/day14/",
            children: U.jsx("div", {
              children: U.jsxs(Fp, {
                children: [
                  U.jsx(Wa, { path: "/signup", element: U.jsx(GS, {}) }),
                  U.jsx(Wa, { path: "/signin", element: U.jsx(YS, {}) }),
                  U.jsx(Wa, { path: "/", element: U.jsx(wS, {}) }),
                  U.jsx(Wa, {
                    path: "/workspace/:workspaceId",
                    element: U.jsx(LS, {}),
                  }),
                ],
              }),
            }),
          }),
        })
  );
}
ap.createRoot(document.getElementById("root")).render(
  U.jsx(j.StrictMode, { children: U.jsx(XS, {}) })
);
