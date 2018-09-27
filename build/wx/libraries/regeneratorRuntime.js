/* eslint-disable */
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function (k) {
  function B(a, b, c, e) {
    b = Object.create((b && b.prototype instanceof v ? b : v).prototype);e = new w(e || []);b._invoke = I(a, c, e);return b;
  }function x(a, b, c) {
    try {
      return { type: "normal", arg: a.call(b, c) };
    } catch (e) {
      return { type: "throw", arg: e };
    }
  }function v() {}function p() {}function m() {}function C(a) {
    ["next", "throw", "return"].forEach(function (b) {
      a[b] = function (a) {
        return this._invoke(b, a);
      };
    });
  }function q(a) {
    function b(c, d, y, f) {
      c = x(a[c], a, d);if ("throw" === c.type) f(c.arg);else {
        var e = c.arg;return (c = e.value) && "object" === typeof c && l.call(c, "__await") ? Promise.resolve(c.__await).then(function (a) {
          b("next", a, y, f);
        }, function (a) {
          b("throw", a, y, f);
        }) : Promise.resolve(c).then(function (a) {
          e.value = a;y(e);
        }, f);
      }
    }var c;this._invoke = function (a, d) {
      function e() {
        return new Promise(function (c, e) {
          b(a, d, c, e);
        });
      }return c = c ? c.then(e, e) : e();
    };
  }function I(a, b, c) {
    var e = D;return function (d, f) {
      if (e === E) throw Error("Generator is already running");if (e === r) {
        if ("throw" === d) throw f;return F();
      }c.method = d;for (c.arg = f;;) {
        if (d = c.delegate) if (d = G(d, c)) {
          if (d === h) continue;return d;
        }if ("next" === c.method) c.sent = c._sent = c.arg;else if ("throw" === c.method) {
          if (e === D) throw e = r, c.arg;c.dispatchException(c.arg);
        } else "return" === c.method && c.abrupt("return", c.arg);e = E;d = x(a, b, c);if ("normal" === d.type) {
          e = c.done ? r : J;if (d.arg === h) continue;return { value: d.arg, done: c.done };
        }"throw" === d.type && (e = r, c.method = "throw", c.arg = d.arg);
      }
    };
  }function G(a, b) {
    var c = a.iterator[b.method];if (void 0 === c) {
      b.delegate = null;if ("throw" === b.method) {
        if (a.iterator.return && (b.method = "return", b.arg = void 0, G(a, b), "throw" === b.method)) return h;b.method = "throw";b.arg = new TypeError("The iterator does not provide a 'throw' method");
      }return h;
    }c = x(c, a.iterator, b.arg);if ("throw" === c.type) return b.method = "throw", b.arg = c.arg, b.delegate = null, h;c = c.arg;if (!c) return b.method = "throw", b.arg = new TypeError("iterator result is not an object"), b.delegate = null, h;if (c.done) b[a.resultName] = c.value, b.next = a.nextLoc, "return" !== b.method && (b.method = "next", b.arg = void 0);else return c;b.delegate = null;return h;
  }function K(a) {
    var b = { tryLoc: a[0] };1 in a && (b.catchLoc = a[1]);2 in a && (b.finallyLoc = a[2], b.afterLoc = a[3]);this.tryEntries.push(b);
  }function z(a) {
    var b = a.completion || {};b.type = "normal";delete b.arg;a.completion = b;
  }function w(a) {
    this.tryEntries = [{ tryLoc: "root" }];a.forEach(K, this);this.reset(!0);
  }function A(a) {
    if (a) {
      var b = a[t];if (b) return b.call(a);if ("function" === typeof a.next) return a;if (!isNaN(a.length)) {
        var c = -1;b = function d() {
          for (; ++c < a.length;) if (l.call(a, c)) return d.value = a[c], d.done = !1, d;d.value = void 0;d.done = !0;return d;
        };
        return b.next = b;
      }
    }return { next: F };
  }function F() {
    return { value: void 0, done: !0 };
  }var H = Object.prototype,
      l = H.hasOwnProperty,
      f = "function" === typeof Symbol ? Symbol : {},
      t = f.iterator || "@@iterator",
      L = f.asyncIterator || "@@asyncIterator",
      u = f.toStringTag || "@@toStringTag";f = "object" === typeof module;var g = k.regeneratorRuntime;if (g) f && (module.exports = g);else {
    g = k.regeneratorRuntime = f ? module.exports : {};g.wrap = B;var D = "suspendedStart",
        J = "suspendedYield",
        E = "executing",
        r = "completed",
        h = {};k = {};k[t] = function () {
      return this;
    };(f = (f = Object.getPrototypeOf) && f(f(A([])))) && f !== H && l.call(f, t) && (k = f);var n = m.prototype = v.prototype = Object.create(k);p.prototype = n.constructor = m;m.constructor = p;m[u] = p.displayName = "GeneratorFunction";g.isGeneratorFunction = function (a) {
      return (a = "function" === typeof a && a.constructor) ? a === p || "GeneratorFunction" === (a.displayName || a.name) : !1;
    };g.mark = function (a) {
      Object.setPrototypeOf ? Object.setPrototypeOf(a, m) : (a.__proto__ = m, u in a || (a[u] = "GeneratorFunction"));a.prototype = Object.create(n);return a;
    };g.awrap = function (a) {
      return { __await: a };
    };C(q.prototype);q.prototype[L] = function () {
      return this;
    };g.AsyncIterator = q;g.async = function (a, b, c, e) {
      var d = new q(B(a, b, c, e));return g.isGeneratorFunction(b) ? d : d.next().then(function (a) {
        return a.done ? a.value : d.next();
      });
    };C(n);n[u] = "Generator";n[t] = function () {
      return this;
    };n.toString = function () {
      return "[object Generator]";
    };g.keys = function (a) {
      var b = [],
          c;for (c in a) b.push(c);b.reverse();return function d() {
        for (; b.length;) {
          var c = b.pop();if (c in a) return d.value = c, d.done = !1, d;
        }d.done = !0;return d;
      };
    };g.values = A;w.prototype = { constructor: w, reset: function (a) {
        this.next = this.prev = 0;this.sent = this._sent = void 0;this.done = !1;this.delegate = null;this.method = "next";this.arg = void 0;this.tryEntries.forEach(z);if (!a) for (var b in this) "t" === b.charAt(0) && l.call(this, b) && !isNaN(+b.slice(1)) && (this[b] = void 0);
      }, stop: function () {
        this.done = !0;var a = this.tryEntries[0].completion;if ("throw" === a.type) throw a.arg;return this.rval;
      }, dispatchException: function (a) {
        function b(b, d) {
          f.type = "throw";f.arg = a;c.next = b;d && (c.method = "next", c.arg = void 0);return !!d;
        }if (this.done) throw a;for (var c = this, e = this.tryEntries.length - 1; 0 <= e; --e) {
          var d = this.tryEntries[e],
              f = d.completion;if ("root" === d.tryLoc) return b("end");if (d.tryLoc <= this.prev) {
            var g = l.call(d, "catchLoc"),
                h = l.call(d, "finallyLoc");if (g && h) {
              if (this.prev < d.catchLoc) return b(d.catchLoc, !0);if (this.prev < d.finallyLoc) return b(d.finallyLoc);
            } else if (g) {
              if (this.prev < d.catchLoc) return b(d.catchLoc, !0);
            } else if (h) {
              if (this.prev < d.finallyLoc) return b(d.finallyLoc);
            } else throw Error("try statement without catch or finally");
          }
        }
      }, abrupt: function (a, b) {
        for (var c = this.tryEntries.length - 1; 0 <= c; --c) {
          var e = this.tryEntries[c];if (e.tryLoc <= this.prev && l.call(e, "finallyLoc") && this.prev < e.finallyLoc) {
            var d = e;break;
          }
        }d && ("break" === a || "continue" === a) && d.tryLoc <= b && b <= d.finallyLoc && (d = null);c = d ? d.completion : {};c.type = a;c.arg = b;return d ? (this.method = "next", this.next = d.finallyLoc, h) : this.complete(c);
      }, complete: function (a, b) {
        if ("throw" === a.type) throw a.arg;"break" === a.type || "continue" === a.type ? this.next = a.arg : "return" === a.type ? (this.rval = this.arg = a.arg, this.method = "return", this.next = "end") : "normal" === a.type && b && (this.next = b);return h;
      }, finish: function (a) {
        for (var b = this.tryEntries.length - 1; 0 <= b; --b) {
          var c = this.tryEntries[b];if (c.finallyLoc === a) return this.complete(c.completion, c.afterLoc), z(c), h;
        }
      }, "catch": function (a) {
        for (var b = this.tryEntries.length - 1; 0 <= b; --b) {
          var c = this.tryEntries[b];if (c.tryLoc === a) {
            a = c.completion;if ("throw" === a.type) {
              var e = a.arg;z(c);
            }return e;
          }
        }throw Error("illegal catch attempt");
      }, delegateYield: function (a, b, c) {
        this.delegate = { iterator: A(a), resultName: b, nextLoc: c };"next" === this.method && (this.arg = void 0);return h;
      } };
  }
}(function () {
  return this;
}() || Function("return this")());var Inote = { JSTool: function (k) {
    this.options = k || {};
  } };
Inote.JSTool.prototype = { _name: "Javascript\u5de5\u5177", _history: { "v1.0": ["2011-01-18", "javascript\u5de5\u5177\u4e0a\u7ebf"], "v1.1": ["2012-03-23", "\u589e\u52a0\u6df7\u6dc6\u529f\u80fd"], "v1.2": ["2012-07-21", "\u5347\u7ea7\u7f8e\u5316\u529f\u80fd\u5f15\u64ce"], "v1.3": ["2014-03-01", '\u5347\u7ea7\u89e3\u5bc6\u529f\u80fd\uff0c\u652f\u6301eval,window.eval,window["eval"]\u7b49\u7684\u89e3\u5bc6'], "v1.4": ["2014-08-05", "\u5347\u7ea7\u6df7\u6dc6\u529f\u80fd\u5f15\u64ce"], "v1.5": ["2014-08-09", "\u5347\u7ea7js\u538b\u7f29\u5f15\u64ce"],
    "v1.6": ["2015-04-11", "\u5347\u7ea7js\u6df7\u6dc6\u5f15\u64ce"], "v1.7": ["2017-02-12", "\u5347\u7ea7js\u6df7\u6dc6\u5f15\u64ce"] }, options: {}, getName: function () {
    return this._name;
  }, getHistory: function () {
    return this._history;
  } };var jstool = new Inote.JSTool();