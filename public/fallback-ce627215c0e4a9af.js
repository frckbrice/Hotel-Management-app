(() => {
  var e = {
      606: e => {
        var t,
          r,
          n,
          o = (e.exports = {});
        function i() {
          throw Error('setTimeout has not been defined');
        }
        function c() {
          throw Error('clearTimeout has not been defined');
        }
        try {
          t = 'function' == typeof setTimeout ? setTimeout : i;
        } catch (e) {
          t = i;
        }
        try {
          r = 'function' == typeof clearTimeout ? clearTimeout : c;
        } catch (e) {
          r = c;
        }
        function u(e) {
          if (t === setTimeout) return setTimeout(e, 0);
          if ((t === i || !t) && setTimeout)
            return ((t = setTimeout), setTimeout(e, 0));
          try {
            return t(e, 0);
          } catch (r) {
            try {
              return t.call(null, e, 0);
            } catch (r) {
              return t.call(this, e, 0);
            }
          }
        }
        var a = [],
          s = !1,
          l = -1;
        function f() {
          s &&
            n &&
            ((s = !1),
            n.length ? (a = n.concat(a)) : (l = -1),
            a.length && _());
        }
        function _() {
          if (!s) {
            var e = u(f);
            s = !0;
            for (var t = a.length; t; ) {
              for (n = a, a = []; ++l < t; ) n && n[l].run();
              ((l = -1), (t = a.length));
            }
            ((n = null),
              (s = !1),
              (function (e) {
                if (r === clearTimeout) return clearTimeout(e);
                if ((r === c || !r) && clearTimeout)
                  return ((r = clearTimeout), clearTimeout(e));
                try {
                  r(e);
                } catch (t) {
                  try {
                    return r.call(null, e);
                  } catch (t) {
                    return r.call(this, e);
                  }
                }
              })(e));
          }
        }
        function h(e, t) {
          ((this.fun = e), (this.array = t));
        }
        function A() {}
        ((o.nextTick = function (e) {
          var t = Array(arguments.length - 1);
          if (arguments.length > 1)
            for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
          (a.push(new h(e, t)), 1 !== a.length || s || u(_));
        }),
          (h.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (o.title = 'browser'),
          (o.browser = !0),
          (o.env = {}),
          (o.argv = []),
          (o.version = ''),
          (o.versions = {}),
          (o.on = A),
          (o.addListener = A),
          (o.once = A),
          (o.off = A),
          (o.removeListener = A),
          (o.removeAllListeners = A),
          (o.emit = A),
          (o.prependListener = A),
          (o.prependOnceListener = A),
          (o.listeners = function (e) {
            return [];
          }),
          (o.binding = function (e) {
            throw Error('process.binding is not supported');
          }),
          (o.cwd = function () {
            return '/';
          }),
          (o.chdir = function (e) {
            throw Error('process.chdir is not supported');
          }),
          (o.umask = function () {
            return 0;
          }));
      },
    },
    t = {};
  (() => {
    'use strict';
    var r = (function r(n) {
      var o = t[n];
      if (void 0 !== o) return o.exports;
      var i = (t[n] = { exports: {} }),
        c = !0;
      try {
        (e[n](i, i.exports, r), (c = !1));
      } finally {
        c && delete t[n];
      }
      return i.exports;
    })(606);
    self.fallback = async e => {
      let { destination: t, url: n } = e,
        o = {
          document: '/~offline',
          image: r.env.__PWA_FALLBACK_IMAGE__,
          audio: r.env.__PWA_FALLBACK_AUDIO__,
          video: r.env.__PWA_FALLBACK_VIDEO__,
          font: r.env.__PWA_FALLBACK_FONT__,
        }[t];
      return o
        ? caches.match(o, { ignoreSearch: !0 })
        : '' === t &&
            r.env.__PWA_FALLBACK_DATA__ &&
            n.match(/\/_next\/data\/.+\/.+\.json$/i)
          ? caches.match(r.env.__PWA_FALLBACK_DATA__, { ignoreSearch: !0 })
          : Response.error();
    };
  })();
})();
