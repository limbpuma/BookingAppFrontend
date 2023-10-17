"use strict";
(self.webpackChunkrestaurant_app = self.webpackChunkrestaurant_app || []).push([
  [179],
  {
    691: () => {
      function ne(e) {
        return "function" == typeof e;
      }
      function Qn(e) {
        const t = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        );
      }
      const yr = Qn(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = t);
          }
      );
      function vr(e, n) {
        if (e) {
          const t = e.indexOf(n);
          0 <= t && e.splice(t, 1);
        }
      }
      class Ue {
        constructor(n) {
          (this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: t } = this;
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const i of t) i.remove(this);
              else t.remove(this);
            const { initialTeardown: r } = this;
            if (ne(r))
              try {
                r();
              } catch (i) {
                n = i instanceof yr ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Sn(i);
                } catch (s) {
                  (n = n ?? []),
                    s instanceof yr ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new yr(n);
          }
        }
        add(n) {
          var t;
          if (n && n !== this)
            if (this.closed) Sn(n);
            else {
              if (n instanceof Ue) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n
              );
            }
        }
        _hasParent(n) {
          const { _parentage: t } = this;
          return t === n || (Array.isArray(t) && t.includes(n));
        }
        _addParent(n) {
          const { _parentage: t } = this;
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
        }
        _removeParent(n) {
          const { _parentage: t } = this;
          t === n ? (this._parentage = null) : Array.isArray(t) && vr(t, n);
        }
        remove(n) {
          const { _finalizers: t } = this;
          t && vr(t, n), n instanceof Ue && n._removeParent(this);
        }
      }
      Ue.EMPTY = (() => {
        const e = new Ue();
        return (e.closed = !0), e;
      })();
      const Zo = Ue.EMPTY;
      function Es(e) {
        return (
          e instanceof Ue ||
          (e && "closed" in e && ne(e.remove) && ne(e.add) && ne(e.unsubscribe))
        );
      }
      function Sn(e) {
        ne(e) ? e() : e.unsubscribe();
      }
      const Xn = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        jr = {
          setTimeout(e, n, ...t) {
            const { delegate: r } = jr;
            return r?.setTimeout
              ? r.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t);
          },
          clearTimeout(e) {
            const { delegate: n } = jr;
            return (n?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Kl(e) {
        jr.setTimeout(() => {
          const { onUnhandledError: n } = Xn;
          if (!n) throw e;
          n(e);
        });
      }
      function Ss() {}
      const Zl = Yo("C", void 0, void 0);
      function Yo(e, n, t) {
        return { kind: e, value: n, error: t };
      }
      let Mn = null;
      function sn(e) {
        if (Xn.useDeprecatedSynchronousErrorHandling) {
          const n = !Mn;
          if ((n && (Mn = { errorThrown: !1, error: null }), e(), n)) {
            const { errorThrown: t, error: r } = Mn;
            if (((Mn = null), t)) throw r;
          }
        } else e();
      }
      class $r extends Ue {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), Es(n) && n.add(this))
              : (this.destination = Xo);
        }
        static create(n, t, r) {
          return new Jn(n, t, r);
        }
        next(n) {
          this.isStopped
            ? Qo(
                (function Ql(e) {
                  return Yo("N", e, void 0);
                })(n),
                this
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? Qo(
                (function Yl(e) {
                  return Yo("E", void 0, e);
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped
            ? Qo(Zl, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Ms = Function.prototype.bind;
      function Hr(e, n) {
        return Ms.call(e, n);
      }
      class Is {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: t } = this;
          if (t.next)
            try {
              t.next(n);
            } catch (r) {
              bt(r);
            }
        }
        error(n) {
          const { partialObserver: t } = this;
          if (t.error)
            try {
              t.error(n);
            } catch (r) {
              bt(r);
            }
          else bt(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (t) {
              bt(t);
            }
        }
      }
      class Jn extends $r {
        constructor(n, t, r) {
          let o;
          if ((super(), ne(n) || !n))
            o = {
              next: n ?? void 0,
              error: t ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Xn.useDeprecatedNextContext
              ? ((i = Object.create(n)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: n.next && Hr(n.next, i),
                  error: n.error && Hr(n.error, i),
                  complete: n.complete && Hr(n.complete, i),
                }))
              : (o = n);
          }
          this.destination = new Is(o);
        }
      }
      function bt(e) {
        Xn.useDeprecatedSynchronousErrorHandling
          ? (function Xl(e) {
              Xn.useDeprecatedSynchronousErrorHandling &&
                Mn &&
                ((Mn.errorThrown = !0), (Mn.error = e));
            })(e)
          : Kl(e);
      }
      function Qo(e, n) {
        const { onStoppedNotification: t } = Xn;
        t && jr.setTimeout(() => t(e, n));
      }
      const Xo = {
          closed: !0,
          next: Ss,
          error: function As(e) {
            throw e;
          },
          complete: Ss,
        },
        Jo =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function In(e) {
        return e;
      }
      function xs(e) {
        return 0 === e.length
          ? In
          : 1 === e.length
          ? e[0]
          : function (t) {
              return e.reduce((r, o) => o(r), t);
            };
      }
      let De = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t);
          }
          lift(t) {
            const r = new e();
            return (r.source = this), (r.operator = t), r;
          }
          subscribe(t, r, o) {
            const i = (function eu(e) {
              return (
                (e && e instanceof $r) ||
                ((function Jl(e) {
                  return e && ne(e.next) && ne(e.error) && ne(e.complete);
                })(e) &&
                  Es(e))
              );
            })(t)
              ? t
              : new Jn(t, r, o);
            return (
              sn(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (r) {
              t.error(r);
            }
          }
          forEach(t, r) {
            return new (r = Rs(r))((o, i) => {
              const s = new Jn({
                next: (a) => {
                  try {
                    t(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(t) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(t);
          }
          [Jo]() {
            return this;
          }
          pipe(...t) {
            return xs(t)(this);
          }
          toPromise(t) {
            return new (t = Rs(t))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (n) => new e(n)), e;
      })();
      function Rs(e) {
        var n;
        return null !== (n = e ?? Xn.Promise) && void 0 !== n ? n : Promise;
      }
      const tu = Qn(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Et = (() => {
        class e extends De {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(t) {
            const r = new Ns(this, this);
            return (r.operator = t), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new tu();
          }
          next(t) {
            sn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(t);
              }
            });
          }
          error(t) {
            sn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = t);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(t);
              }
            });
          }
          complete() {
            sn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: t } = this;
                for (; t.length; ) t.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var t;
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            );
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t);
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            );
          }
          _innerSubscribe(t) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Zo
              : ((this.currentObservers = null),
                i.push(t),
                new Ue(() => {
                  (this.currentObservers = null), vr(i, t);
                }));
          }
          _checkFinalizedStatuses(t) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? t.error(o) : i && t.complete();
          }
          asObservable() {
            const t = new De();
            return (t.source = this), t;
          }
        }
        return (e.create = (n, t) => new Ns(n, t)), e;
      })();
      class Ns extends Et {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t);
        }
        next(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === r ||
            r.call(t, n);
        }
        error(n) {
          var t, r;
          null ===
            (r =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === r ||
            r.call(t, n);
        }
        complete() {
          var n, t;
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n);
        }
        _subscribe(n) {
          var t, r;
          return null !==
            (r =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== r
            ? r
            : Zo;
        }
      }
      function ei(e) {
        return ne(e?.lift);
      }
      function Oe(e) {
        return (n) => {
          if (ei(n))
            return n.lift(function (t) {
              try {
                return e(t, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Fe(e, n, t, r, o) {
        return new nu(e, n, t, r, o);
      }
      class nu extends $r {
        constructor(n, t, r, o, i, s) {
          super(n),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a);
                  } catch (l) {
                    n.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    n.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: t } = this;
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) ||
                  void 0 === n ||
                  n.call(this));
          }
        }
      }
      function z(e, n) {
        return Oe((t, r) => {
          let o = 0;
          t.subscribe(
            Fe(r, (i) => {
              r.next(e.call(n, i, o++));
            })
          );
        });
      }
      function at(e) {
        return this instanceof at ? ((this.v = e), this) : new at(e);
      }
      function Gr(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e = (function R(e) {
              var n = "function" == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                r = 0;
              if (t) return t.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                n
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(i) {
          t[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Th = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function xh(e) {
        return ne(e?.then);
      }
      function Rh(e) {
        return ne(e[Jo]);
      }
      function Nh(e) {
        return Symbol.asyncIterator && ne(e?.[Symbol.asyncIterator]);
      }
      function Oh(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Fh = (function yb() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ph(e) {
        return ne(e?.[Fh]);
      }
      function kh(e) {
        return (function er(e, n, t) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = t.apply(e, n || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, y) {
                  i.push([f, h, p, y]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof at
                  ? Promise.resolve(f.value.v).then(u, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function u(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const t = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield at(t.read());
              if (o) return yield at(void 0);
              yield yield at(r);
            }
          } finally {
            t.releaseLock();
          }
        });
      }
      function Lh(e) {
        return ne(e?.getReader);
      }
      function kt(e) {
        if (e instanceof De) return e;
        if (null != e) {
          if (Rh(e))
            return (function vb(e) {
              return new De((n) => {
                const t = e[Jo]();
                if (ne(t.subscribe)) return t.subscribe(n);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Th(e))
            return (function Db(e) {
              return new De((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                n.complete();
              });
            })(e);
          if (xh(e))
            return (function _b(e) {
              return new De((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete());
                  },
                  (t) => n.error(t)
                ).then(null, Kl);
              });
            })(e);
          if (Nh(e)) return Vh(e);
          if (Ph(e))
            return (function Cb(e) {
              return new De((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return;
                n.complete();
              });
            })(e);
          if (Lh(e))
            return (function wb(e) {
              return Vh(kh(e));
            })(e);
        }
        throw Oh(e);
      }
      function Vh(e) {
        return new De((n) => {
          (function bb(e, n) {
            var t, r, o, i;
            return (function g(e, n, t, r) {
              return new (t || (t = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof t
                          ? i
                          : new t(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (t = Gr(e); !(r = yield t.next()).done; )
                  if ((n.next(r.value), n.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = t.return) && (yield i.call(t));
                } finally {
                  if (o) throw o.error;
                }
              }
              n.complete();
            });
          })(e, n).catch((t) => n.error(t));
        });
      }
      function An(e, n, t, r = 0, o = !1) {
        const i = n.schedule(function () {
          t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function Ke(e, n, t = 1 / 0) {
        return ne(n)
          ? Ke((r, o) => z((i, s) => n(r, i, o, s))(kt(e(r, o))), t)
          : ("number" == typeof n && (t = n),
            Oe((r, o) =>
              (function Eb(e, n, t, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && n.complete();
                  },
                  h = (y) => (u < r ? p(y) : l.push(y)),
                  p = (y) => {
                    i && n.next(y), u++;
                    let D = !1;
                    kt(t(y, c++)).subscribe(
                      Fe(
                        n,
                        (b) => {
                          o?.(b), i ? h(b) : n.next(b);
                        },
                        () => {
                          D = !0;
                        },
                        void 0,
                        () => {
                          if (D)
                            try {
                              for (u--; l.length && u < r; ) {
                                const b = l.shift();
                                s ? An(n, s, () => p(b)) : p(b);
                              }
                              f();
                            } catch (b) {
                              n.error(b);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    Fe(n, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, t)
            ));
      }
      function qr(e = 1 / 0) {
        return Ke(In, e);
      }
      const an = new De((e) => e.complete());
      function lu(e) {
        return e[e.length - 1];
      }
      function Bh(e) {
        return ne(lu(e)) ? e.pop() : void 0;
      }
      function ti(e) {
        return (function Mb(e) {
          return e && ne(e.schedule);
        })(lu(e))
          ? e.pop()
          : void 0;
      }
      function jh(e, n = 0) {
        return Oe((t, r) => {
          t.subscribe(
            Fe(
              r,
              (o) => An(r, e, () => r.next(o), n),
              () => An(r, e, () => r.complete(), n),
              (o) => An(r, e, () => r.error(o), n)
            )
          );
        });
      }
      function $h(e, n = 0) {
        return Oe((t, r) => {
          r.add(e.schedule(() => t.subscribe(r), n));
        });
      }
      function Hh(e, n) {
        if (!e) throw new Error("Iterable cannot be null");
        return new De((t) => {
          An(t, n, () => {
            const r = e[Symbol.asyncIterator]();
            An(
              t,
              n,
              () => {
                r.next().then((o) => {
                  o.done ? t.complete() : t.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Le(e, n) {
        return n
          ? (function Ob(e, n) {
              if (null != e) {
                if (Rh(e))
                  return (function Ab(e, n) {
                    return kt(e).pipe($h(n), jh(n));
                  })(e, n);
                if (Th(e))
                  return (function xb(e, n) {
                    return new De((t) => {
                      let r = 0;
                      return n.schedule(function () {
                        r === e.length
                          ? t.complete()
                          : (t.next(e[r++]), t.closed || this.schedule());
                      });
                    });
                  })(e, n);
                if (xh(e))
                  return (function Tb(e, n) {
                    return kt(e).pipe($h(n), jh(n));
                  })(e, n);
                if (Nh(e)) return Hh(e, n);
                if (Ph(e))
                  return (function Rb(e, n) {
                    return new De((t) => {
                      let r;
                      return (
                        An(t, n, () => {
                          (r = e[Fh]()),
                            An(
                              t,
                              n,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void t.error(s);
                                }
                                i ? t.complete() : t.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => ne(r?.return) && r.return()
                      );
                    });
                  })(e, n);
                if (Lh(e))
                  return (function Nb(e, n) {
                    return Hh(kh(e), n);
                  })(e, n);
              }
              throw Oh(e);
            })(e, n)
          : kt(e);
      }
      function Uh(e = {}) {
        const {
          connector: n = () => new Et(),
          resetOnError: t = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (i) => {
          let s,
            a,
            l,
            u = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (c = d = !1);
            },
            p = () => {
              const y = s;
              h(), y?.unsubscribe();
            };
          return Oe((y, D) => {
            u++, !d && !c && f();
            const b = (l = l ?? n());
            D.add(() => {
              u--, 0 === u && !d && !c && (a = uu(p, o));
            }),
              b.subscribe(D),
              !s &&
                u > 0 &&
                ((s = new Jn({
                  next: (A) => b.next(A),
                  error: (A) => {
                    (d = !0), f(), (a = uu(h, t, A)), b.error(A);
                  },
                  complete: () => {
                    (c = !0), f(), (a = uu(h, r)), b.complete();
                  },
                })),
                kt(y).subscribe(s));
          })(i);
        };
      }
      function uu(e, n, ...t) {
        if (!0 === n) return void e();
        if (!1 === n) return;
        const r = new Jn({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return kt(n(...t)).subscribe(r);
      }
      function pe(e) {
        for (let n in e) if (e[n] === pe) return n;
        throw Error("Could not find renamed property on target object.");
      }
      function cu(e, n) {
        for (const t in n)
          n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t]);
      }
      function me(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(me).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const n = e.toString();
        if (null == n) return "" + n;
        const t = n.indexOf("\n");
        return -1 === t ? n : n.substring(0, t);
      }
      function du(e, n) {
        return null == e || "" === e
          ? null === n
            ? ""
            : n
          : null == n || "" === n
          ? e
          : e + " " + n;
      }
      const Pb = pe({ __forward_ref__: pe });
      function ye(e) {
        return (
          (e.__forward_ref__ = ye),
          (e.toString = function () {
            return me(this());
          }),
          e
        );
      }
      function j(e) {
        return fu(e) ? e() : e;
      }
      function fu(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(Pb) &&
          e.__forward_ref__ === ye
        );
      }
      function hu(e) {
        return e && !!e.ɵproviders;
      }
      const zh = "https://g.co/ng/security#xss";
      class S extends Error {
        constructor(n, t) {
          super(ks(n, t)), (this.code = n);
        }
      }
      function ks(e, n) {
        return `NG0${Math.abs(e)}${n ? ": " + n.trim() : ""}`;
      }
      function G(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Ls(e, n) {
        throw new S(-201, !1);
      }
      function Lt(e, n) {
        null == e &&
          (function ae(e, n, t, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${t} ${r} ${n} <=Actual]`)
            );
          })(n, e, null, "!=");
      }
      function k(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function mt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Vs(e) {
        return Gh(e, Bs) || Gh(e, qh);
      }
      function Gh(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null;
      }
      function Wh(e) {
        return e && (e.hasOwnProperty(pu) || e.hasOwnProperty(Ub))
          ? e[pu]
          : null;
      }
      const Bs = pe({ ɵprov: pe }),
        pu = pe({ ɵinj: pe }),
        qh = pe({ ngInjectableDef: pe }),
        Ub = pe({ ngInjectorDef: pe });
      var $ = (() => (
        (($ = $ || {})[($.Default = 0)] = "Default"),
        ($[($.Host = 1)] = "Host"),
        ($[($.Self = 2)] = "Self"),
        ($[($.SkipSelf = 4)] = "SkipSelf"),
        ($[($.Optional = 8)] = "Optional"),
        $
      ))();
      let gu;
      function Vt(e) {
        const n = gu;
        return (gu = e), n;
      }
      function Kh(e, n, t) {
        const r = Vs(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : t & $.Optional
          ? null
          : void 0 !== n
          ? n
          : void Ls(me(e));
      }
      const _e = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        ni = {},
        mu = "__NG_DI_FLAG__",
        js = "ngTempTokenPath",
        Gb = "ngTokenPath",
        Wb = /\n/gm,
        qb = "\u0275",
        Zh = "__source";
      let ri;
      function Kr(e) {
        const n = ri;
        return (ri = e), n;
      }
      function Kb(e, n = $.Default) {
        if (void 0 === ri) throw new S(-203, !1);
        return null === ri
          ? Kh(e, void 0, n)
          : ri.get(e, n & $.Optional ? null : void 0, n);
      }
      function N(e, n = $.Default) {
        return (
          (function zb() {
            return gu;
          })() || Kb
        )(j(e), n);
      }
      function Q(e, n = $.Default) {
        return N(e, $s(n));
      }
      function $s(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function yu(e) {
        const n = [];
        for (let t = 0; t < e.length; t++) {
          const r = j(e[t]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new S(900, !1);
            let o,
              i = $.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = Zb(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            n.push(N(o, i));
          } else n.push(N(r));
        }
        return n;
      }
      function oi(e, n) {
        return (e[mu] = n), (e.prototype[mu] = n), e;
      }
      function Zb(e) {
        return e[mu];
      }
      function Tn(e) {
        return { toString: e }.toString();
      }
      var ln = (() => (
          ((ln = ln || {})[(ln.OnPush = 0)] = "OnPush"),
          (ln[(ln.Default = 1)] = "Default"),
          ln
        ))(),
        un = (() => {
          return (
            ((e = un || (un = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            un
          );
          var e;
        })();
      const xn = {},
        re = [],
        Hs = pe({ ɵcmp: pe }),
        vu = pe({ ɵdir: pe }),
        Du = pe({ ɵpipe: pe }),
        Qh = pe({ ɵmod: pe }),
        Rn = pe({ ɵfac: pe }),
        ii = pe({ __NG_ELEMENT_ID__: pe });
      let Xb = 0;
      function It(e) {
        return Tn(() => {
          const n = Jh(e),
            t = {
              ...n,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === ln.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (n.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || un.Emulated,
              id: "c" + Xb++,
              styles: e.styles || re,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          ep(t);
          const r = e.dependencies;
          return (t.directiveDefs = Us(r, !1)), (t.pipeDefs = Us(r, !0)), t;
        });
      }
      function eE(e) {
        return le(e) || Xe(e);
      }
      function tE(e) {
        return null !== e;
      }
      function At(e) {
        return Tn(() => ({
          type: e.type,
          bootstrap: e.bootstrap || re,
          declarations: e.declarations || re,
          imports: e.imports || re,
          exports: e.exports || re,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Xh(e, n) {
        if (null == e) return xn;
        const t = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (t[o] = r),
              n && (n[o] = i);
          }
        return t;
      }
      function U(e) {
        return Tn(() => {
          const n = Jh(e);
          return ep(n), n;
        });
      }
      function lt(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function le(e) {
        return e[Hs] || null;
      }
      function Xe(e) {
        return e[vu] || null;
      }
      function yt(e) {
        return e[Du] || null;
      }
      function Tt(e, n) {
        const t = e[Qh] || null;
        if (!t && !0 === n)
          throw new Error(`Type ${me(e)} does not have '\u0275mod' property.`);
        return t;
      }
      function Jh(e) {
        const n = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: n,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || re,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Xh(e.inputs, n),
          outputs: Xh(e.outputs),
        };
      }
      function ep(e) {
        e.features?.forEach((n) => n(e));
      }
      function Us(e, n) {
        if (!e) return null;
        const t = n ? yt : eE;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => t(r)).filter(tE);
      }
      const Nn = 0,
        x = 1,
        Z = 2,
        Se = 3,
        Kt = 4,
        _r = 5,
        Je = 6,
        Yr = 7,
        Ie = 8,
        zs = 9,
        Gs = 10,
        X = 11,
        _u = 12,
        si = 13,
        tp = 14,
        Qr = 15,
        et = 16,
        ai = 17,
        Xr = 18,
        cn = 19,
        li = 20,
        np = 21,
        Ce = 22,
        Cu = 1,
        rp = 2,
        Ws = 7,
        qs = 8,
        Jr = 9,
        ut = 10;
      function xt(e) {
        return Array.isArray(e) && "object" == typeof e[Cu];
      }
      function Zt(e) {
        return Array.isArray(e) && !0 === e[Cu];
      }
      function wu(e) {
        return 0 != (4 & e.flags);
      }
      function ui(e) {
        return e.componentOffset > -1;
      }
      function Ks(e) {
        return 1 == (1 & e.flags);
      }
      function Yt(e) {
        return !!e.template;
      }
      function rE(e) {
        return 0 != (256 & e[Z]);
      }
      function Cr(e, n) {
        return e.hasOwnProperty(Rn) ? e[Rn] : null;
      }
      class sE {
        constructor(n, t, r) {
          (this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Bt() {
        return sp;
      }
      function sp(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = lE), aE;
      }
      function aE() {
        const e = lp(this),
          n = e?.current;
        if (n) {
          const t = e.previous;
          if (t === xn) e.previous = n;
          else for (let r in n) t[r] = n[r];
          (e.current = null), this.ngOnChanges(n);
        }
      }
      function lE(e, n, t, r) {
        const o = this.declaredInputs[t],
          i =
            lp(e) ||
            (function uE(e, n) {
              return (e[ap] = n);
            })(e, { previous: xn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new sE(l && l.currentValue, n, a === xn)), (e[r] = n);
      }
      Bt.ngInherit = !0;
      const ap = "__ngSimpleChanges__";
      function lp(e) {
        return e[ap] || null;
      }
      const jt = function (e, n, t) {};
      function Ze(e) {
        for (; Array.isArray(e); ) e = e[Nn];
        return e;
      }
      function Zs(e, n) {
        return Ze(n[e]);
      }
      function Rt(e, n) {
        return Ze(n[e.index]);
      }
      function dp(e, n) {
        return e.data[n];
      }
      function eo(e, n) {
        return e[n];
      }
      function vt(e, n) {
        const t = n[e];
        return xt(t) ? t : t[Nn];
      }
      function Ys(e) {
        return 64 == (64 & e[Z]);
      }
      function nr(e, n) {
        return null == n ? null : e[n];
      }
      function fp(e) {
        e[Xr] = 0;
      }
      function Eu(e, n) {
        e[_r] += n;
        let t = e,
          r = e[Se];
        for (
          ;
          null !== r && ((1 === n && 1 === t[_r]) || (-1 === n && 0 === t[_r]));

        )
          (r[_r] += n), (t = r), (r = r[Se]);
      }
      const W = { lFrame: wp(null), bindingsEnabled: !0 };
      function pp() {
        return W.bindingsEnabled;
      }
      function E() {
        return W.lFrame.lView;
      }
      function te() {
        return W.lFrame.tView;
      }
      function Su(e) {
        return (W.lFrame.contextLView = e), e[Ie];
      }
      function Mu(e) {
        return (W.lFrame.contextLView = null), e;
      }
      function Ye() {
        let e = gp();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function gp() {
        return W.lFrame.currentTNode;
      }
      function dn(e, n) {
        const t = W.lFrame;
        (t.currentTNode = e), (t.isParent = n);
      }
      function Iu() {
        return W.lFrame.isParent;
      }
      function ct() {
        const e = W.lFrame;
        let n = e.bindingRootIndex;
        return (
          -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
        );
      }
      function to() {
        return W.lFrame.bindingIndex++;
      }
      function wE(e, n) {
        const t = W.lFrame;
        (t.bindingIndex = t.bindingRootIndex = e), Tu(n);
      }
      function Tu(e) {
        W.lFrame.currentDirectiveIndex = e;
      }
      function Dp() {
        return W.lFrame.currentQueryIndex;
      }
      function Ru(e) {
        W.lFrame.currentQueryIndex = e;
      }
      function EE(e) {
        const n = e[x];
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[Je] : null;
      }
      function _p(e, n, t) {
        if (t & $.SkipSelf) {
          let o = n,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              t & $.Host ||
              ((o = EE(i)), null === o || ((i = i[Qr]), 10 & o.type)));

          );
          if (null === o) return !1;
          (n = o), (e = i);
        }
        const r = (W.lFrame = Cp());
        return (r.currentTNode = n), (r.lView = e), !0;
      }
      function Nu(e) {
        const n = Cp(),
          t = e[x];
        (W.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1);
      }
      function Cp() {
        const e = W.lFrame,
          n = null === e ? null : e.child;
        return null === n ? wp(e) : n;
      }
      function wp(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = n), n;
      }
      function bp() {
        const e = W.lFrame;
        return (
          (W.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Ep = bp;
      function Ou() {
        const e = bp();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function dt() {
        return W.lFrame.selectedIndex;
      }
      function wr(e) {
        W.lFrame.selectedIndex = e;
      }
      function be() {
        const e = W.lFrame;
        return dp(e.tView, e.selectedIndex);
      }
      function Qs(e, n) {
        for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
          const i = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-t, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(t, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(t, a)),
            l && (e.viewHooks ?? (e.viewHooks = [])).push(-t, l),
            u &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(t, u),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(t, u)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(t, c);
        }
      }
      function Xs(e, n, t) {
        Sp(e, n, 3, t);
      }
      function Js(e, n, t, r) {
        (3 & e[Z]) === t && Sp(e, n, t, r);
      }
      function Fu(e, n) {
        let t = e[Z];
        (3 & t) === n && ((t &= 2047), (t += 1), (e[Z] = t));
      }
      function Sp(e, n, t, r) {
        const i = r ?? -1,
          s = n.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[Xr] : 0; l < s; l++)
          if ("number" == typeof n[l + 1]) {
            if (((a = n[l]), null != r && a >= r)) break;
          } else
            n[l] < 0 && (e[Xr] += 65536),
              (a < i || -1 == i) &&
                (OE(e, t, n, l), (e[Xr] = (4294901760 & e[Xr]) + l + 2)),
              l++;
      }
      function OE(e, n, t, r) {
        const o = t[r] < 0,
          i = t[r + 1],
          a = e[o ? -t[r] : t[r]];
        if (o) {
          if (e[Z] >> 11 < e[Xr] >> 16 && (3 & e[Z]) === n) {
            (e[Z] += 2048), jt(4, a, i);
            try {
              i.call(a);
            } finally {
              jt(5, a, i);
            }
          }
        } else {
          jt(4, a, i);
          try {
            i.call(a);
          } finally {
            jt(5, a, i);
          }
        }
      }
      const no = -1;
      class di {
        constructor(n, t, r) {
          (this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = r);
        }
      }
      function ku(e, n, t) {
        let r = 0;
        for (; r < t.length; ) {
          const o = t[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = t[r++],
              s = t[r++],
              a = t[r++];
            e.setAttribute(n, s, a, i);
          } else {
            const i = o,
              s = t[++r];
            Ip(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++;
          }
        }
        return r;
      }
      function Mp(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Ip(e) {
        return 64 === e.charCodeAt(0);
      }
      function fi(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice();
          else {
            let t = -1;
            for (let r = 0; r < n.length; r++) {
              const o = n[r];
              "number" == typeof o
                ? (t = o)
                : 0 === t ||
                  Ap(e, t, o, null, -1 === t || 2 === t ? n[++r] : null);
            }
          }
        return e;
      }
      function Ap(e, n, t, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === n) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === n) {
                s = -1;
                break;
              }
              if (a > n) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === t) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, n), (i = s + 1)),
          e.splice(i++, 0, t),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Tp(e) {
        return e !== no;
      }
      function ea(e) {
        return 32767 & e;
      }
      function ta(e, n) {
        let t = (function LE(e) {
            return e >> 16;
          })(e),
          r = n;
        for (; t > 0; ) (r = r[Qr]), t--;
        return r;
      }
      let Lu = !0;
      function na(e) {
        const n = Lu;
        return (Lu = e), n;
      }
      const xp = 255,
        Rp = 5;
      let VE = 0;
      const fn = {};
      function ra(e, n) {
        const t = Np(e, n);
        if (-1 !== t) return t;
        const r = n[x];
        r.firstCreatePass &&
          ((e.injectorIndex = n.length),
          Vu(r.data, e),
          Vu(n, null),
          Vu(r.blueprint, null));
        const o = Bu(e, n),
          i = e.injectorIndex;
        if (Tp(o)) {
          const s = ea(o),
            a = ta(o, n),
            l = a[x].data;
          for (let u = 0; u < 8; u++) n[i + u] = a[s + u] | l[s + u];
        }
        return (n[i + 8] = o), i;
      }
      function Vu(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function Np(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Bu(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let t = 0,
          r = null,
          o = n;
        for (; null !== o; ) {
          if (((r = Bp(o)), null === r)) return no;
          if ((t++, (o = o[Qr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (t << 16);
        }
        return no;
      }
      function ju(e, n, t) {
        !(function BE(e, n, t) {
          let r;
          "string" == typeof t
            ? (r = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(ii) && (r = t[ii]),
            null == r && (r = t[ii] = VE++);
          const o = r & xp;
          n.data[e + (o >> Rp)] |= 1 << o;
        })(e, n, t);
      }
      function Op(e, n, t) {
        if (t & $.Optional || void 0 !== e) return e;
        Ls();
      }
      function Fp(e, n, t, r) {
        if (
          (t & $.Optional && void 0 === r && (r = null),
          !(t & ($.Self | $.Host)))
        ) {
          const o = e[zs],
            i = Vt(void 0);
          try {
            return o ? o.get(n, r, t & $.Optional) : Kh(n, r, t & $.Optional);
          } finally {
            Vt(i);
          }
        }
        return Op(r, 0, t);
      }
      function Pp(e, n, t, r = $.Default, o) {
        if (null !== e) {
          if (1024 & n[Z]) {
            const s = (function zE(e, n, t, r, o) {
              let i = e,
                s = n;
              for (
                ;
                null !== i && null !== s && 1024 & s[Z] && !(256 & s[Z]);

              ) {
                const a = kp(i, s, t, r | $.Self, fn);
                if (a !== fn) return a;
                let l = i.parent;
                if (!l) {
                  const u = s[np];
                  if (u) {
                    const c = u.get(t, fn, r);
                    if (c !== fn) return c;
                  }
                  (l = Bp(s)), (s = s[Qr]);
                }
                i = l;
              }
              return o;
            })(e, n, t, r, fn);
            if (s !== fn) return s;
          }
          const i = kp(e, n, t, r, fn);
          if (i !== fn) return i;
        }
        return Fp(n, t, r, o);
      }
      function kp(e, n, t, r, o) {
        const i = (function HE(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const n = e.hasOwnProperty(ii) ? e[ii] : void 0;
          return "number" == typeof n ? (n >= 0 ? n & xp : UE) : n;
        })(t);
        if ("function" == typeof i) {
          if (!_p(n, e, r)) return r & $.Host ? Op(o, 0, r) : Fp(n, t, r, o);
          try {
            const s = i(r);
            if (null != s || r & $.Optional) return s;
            Ls();
          } finally {
            Ep();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = Np(e, n),
            l = no,
            u = r & $.Host ? n[et][Je] : null;
          for (
            (-1 === a || r & $.SkipSelf) &&
            ((l = -1 === a ? Bu(e, n) : n[a + 8]),
            l !== no && Vp(r, !1)
              ? ((s = n[x]), (a = ea(l)), (n = ta(l, n)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = n[x];
            if (Lp(i, a, c.data)) {
              const d = $E(a, n, t, s, r, u);
              if (d !== fn) return d;
            }
            (l = n[a + 8]),
              l !== no && Vp(r, n[x].data[a + 8] === u) && Lp(i, a, n)
                ? ((s = c), (a = ea(l)), (n = ta(l, n)))
                : (a = -1);
          }
        }
        return o;
      }
      function $E(e, n, t, r, o, i) {
        const s = n[x],
          a = s.data[e + 8],
          c = oa(
            a,
            s,
            t,
            null == r ? ui(a) && Lu : r != s && 0 != (3 & a.type),
            o & $.Host && i === a
          );
        return null !== c ? br(n, s, c, a) : fn;
      }
      function oa(e, n, t, r, o) {
        const i = e.providerIndexes,
          s = n.data,
          a = 1048575 & i,
          l = e.directiveStart,
          c = i >> 20,
          f = o ? a + c : e.directiveEnd;
        for (let h = r ? a : a + c; h < f; h++) {
          const p = s[h];
          if ((h < l && t === p) || (h >= l && p.type === t)) return h;
        }
        if (o) {
          const h = s[l];
          if (h && Yt(h) && h.type === t) return l;
        }
        return null;
      }
      function br(e, n, t, r) {
        let o = e[t];
        const i = n.data;
        if (
          (function FE(e) {
            return e instanceof di;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function kb(e, n) {
              const t = n ? `. Dependency path: ${n.join(" > ")} > ${e}` : "";
              throw new S(
                -200,
                `Circular dependency in DI detected for ${e}${t}`
              );
            })(
              (function se(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : G(e);
              })(i[t])
            );
          const a = na(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Vt(s.injectImpl) : null;
          _p(e, r, $.Default);
          try {
            (o = e[t] = s.factory(void 0, i, e, r)),
              n.firstCreatePass &&
                t >= r.directiveStart &&
                (function NE(e, n, t) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = n.type.prototype;
                  if (r) {
                    const s = sp(n);
                    (t.preOrderHooks ?? (t.preOrderHooks = [])).push(e, s),
                      (
                        t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (t.preOrderHooks ?? (t.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((t.preOrderHooks ?? (t.preOrderHooks = [])).push(e, i),
                      (
                        t.preOrderCheckHooks ?? (t.preOrderCheckHooks = [])
                      ).push(e, i));
                })(t, i[t], n);
          } finally {
            null !== l && Vt(l), na(a), (s.resolving = !1), Ep();
          }
        }
        return o;
      }
      function Lp(e, n, t) {
        return !!(t[n + (e >> Rp)] & (1 << e));
      }
      function Vp(e, n) {
        return !(e & $.Self || (e & $.Host && n));
      }
      class ro {
        constructor(n, t) {
          (this._tNode = n), (this._lView = t);
        }
        get(n, t, r) {
          return Pp(this._tNode, this._lView, n, $s(r), t);
        }
      }
      function UE() {
        return new ro(Ye(), E());
      }
      function Ve(e) {
        return Tn(() => {
          const n = e.prototype.constructor,
            t = n[Rn] || $u(n),
            r = Object.prototype;
          let o = Object.getPrototypeOf(e.prototype).constructor;
          for (; o && o !== r; ) {
            const i = o[Rn] || $u(o);
            if (i && i !== t) return i;
            o = Object.getPrototypeOf(o);
          }
          return (i) => new i();
        });
      }
      function $u(e) {
        return fu(e)
          ? () => {
              const n = $u(j(e));
              return n && n();
            }
          : Cr(e);
      }
      function Bp(e) {
        const n = e[x],
          t = n.type;
        return 2 === t ? n.declTNode : 1 === t ? e[Je] : null;
      }
      const io = "__parameters__";
      function ao(e, n, t) {
        return Tn(() => {
          const r = (function Hu(e) {
            return function (...t) {
              if (e) {
                const r = e(...t);
                for (const o in r) this[o] = r[o];
              }
            };
          })(n);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(io)
                ? l[io]
                : Object.defineProperty(l, io, { value: [] })[io];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            t && (o.prototype = Object.create(t.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class F {
        constructor(n, t) {
          (this._desc = n),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = k({
                  token: this,
                  providedIn: t.providedIn || "root",
                  factory: t.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Er(e, n) {
        e.forEach((t) => (Array.isArray(t) ? Er(t, n) : n(t)));
      }
      function $p(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t);
      }
      function sa(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0];
      }
      function Nt(e, n, t) {
        let r = lo(e, n);
        return (
          r >= 0
            ? (e[1 | r] = t)
            : ((r = ~r),
              (function KE(e, n, t, r) {
                let o = e.length;
                if (o == n) e.push(t, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = t);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > n; )
                    (e[o] = e[o - 2]), o--;
                  (e[n] = t), (e[n + 1] = r);
                }
              })(e, r, n, t)),
          r
        );
      }
      function zu(e, n) {
        const t = lo(e, n);
        if (t >= 0) return e[1 | t];
      }
      function lo(e, n) {
        return (function Hp(e, n, t) {
          let r = 0,
            o = e.length >> t;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = e[i << t];
            if (n === s) return i << t;
            s > n ? (o = i) : (r = i + 1);
          }
          return ~(o << t);
        })(e, n, 1);
      }
      const mi = oi(ao("Optional"), 8),
        yi = oi(ao("SkipSelf"), 4);
      var Dt = (() => (
        ((Dt = Dt || {})[(Dt.Important = 1)] = "Important"),
        (Dt[(Dt.DashCase = 2)] = "DashCase"),
        Dt
      ))();
      const Yu = new Map();
      let mS = 0;
      const Xu = "__ngContext__";
      function tt(e, n) {
        xt(n)
          ? ((e[Xu] = n[li]),
            (function vS(e) {
              Yu.set(e[li], e);
            })(n))
          : (e[Xu] = n);
      }
      let Ju;
      function ec(e, n) {
        return Ju(e, n);
      }
      function Ci(e) {
        const n = e[Se];
        return Zt(n) ? n[Se] : n;
      }
      function tc(e) {
        return lg(e[si]);
      }
      function nc(e) {
        return lg(e[Kt]);
      }
      function lg(e) {
        for (; null !== e && !Zt(e); ) e = e[Kt];
        return e;
      }
      function co(e, n, t, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Zt(r) ? (i = r) : xt(r) && ((s = !0), (r = r[Nn]));
          const a = Ze(r);
          0 === e && null !== t
            ? null == o
              ? pg(n, t, a)
              : Sr(n, t, a, o || null, !0)
            : 1 === e && null !== t
            ? Sr(n, t, a, o || null, !0)
            : 2 === e
            ? (function uc(e, n, t) {
                const r = ca(e, n);
                r &&
                  (function VS(e, n, t, r) {
                    e.removeChild(n, t, r);
                  })(e, r, n, t);
              })(n, a, s)
            : 3 === e && n.destroyNode(a),
            null != i &&
              (function $S(e, n, t, r, o) {
                const i = t[Ws];
                i !== Ze(t) && co(n, e, r, i, o);
                for (let a = ut; a < t.length; a++) {
                  const l = t[a];
                  wi(l[x], l, e, n, r, i);
                }
              })(n, e, i, t, o);
        }
      }
      function oc(e, n, t) {
        return e.createElement(n, t);
      }
      function cg(e, n) {
        const t = e[Jr],
          r = t.indexOf(n),
          o = n[Se];
        512 & n[Z] && ((n[Z] &= -513), Eu(o, -1)), t.splice(r, 1);
      }
      function ic(e, n) {
        if (e.length <= ut) return;
        const t = ut + n,
          r = e[t];
        if (r) {
          const o = r[ai];
          null !== o && o !== e && cg(o, r), n > 0 && (e[t - 1][Kt] = r[Kt]);
          const i = sa(e, ut + n);
          !(function xS(e, n) {
            wi(e, n, n[X], 2, null, null), (n[Nn] = null), (n[Je] = null);
          })(r[x], r);
          const s = i[cn];
          null !== s && s.detachView(i[x]),
            (r[Se] = null),
            (r[Kt] = null),
            (r[Z] &= -65);
        }
        return r;
      }
      function dg(e, n) {
        if (!(128 & n[Z])) {
          const t = n[X];
          t.destroyNode && wi(e, n, t, 3, null, null),
            (function OS(e) {
              let n = e[si];
              if (!n) return sc(e[x], e);
              for (; n; ) {
                let t = null;
                if (xt(n)) t = n[si];
                else {
                  const r = n[ut];
                  r && (t = r);
                }
                if (!t) {
                  for (; n && !n[Kt] && n !== e; )
                    xt(n) && sc(n[x], n), (n = n[Se]);
                  null === n && (n = e), xt(n) && sc(n[x], n), (t = n && n[Kt]);
                }
                n = t;
              }
            })(n);
        }
      }
      function sc(e, n) {
        if (!(128 & n[Z])) {
          (n[Z] &= -65),
            (n[Z] |= 128),
            (function LS(e, n) {
              let t;
              if (null != e && null != (t = e.destroyHooks))
                for (let r = 0; r < t.length; r += 2) {
                  const o = n[t[r]];
                  if (!(o instanceof di)) {
                    const i = t[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        jt(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          jt(5, a, l);
                        }
                      }
                    else {
                      jt(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        jt(5, o, i);
                      }
                    }
                  }
                }
            })(e, n),
            (function kS(e, n) {
              const t = e.cleanup,
                r = n[Yr];
              let o = -1;
              if (null !== t)
                for (let i = 0; i < t.length - 1; i += 2)
                  if ("string" == typeof t[i]) {
                    const s = t[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = t[i + 1])];
                    t[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                n[Yr] = null;
              }
            })(e, n),
            1 === n[x].type && n[X].destroy();
          const t = n[ai];
          if (null !== t && Zt(n[Se])) {
            t !== n[Se] && cg(t, n);
            const r = n[cn];
            null !== r && r.detachView(e);
          }
          !(function DS(e) {
            Yu.delete(e[li]);
          })(n);
        }
      }
      function fg(e, n, t) {
        return (function hg(e, n, t) {
          let r = n;
          for (; null !== r && 40 & r.type; ) r = (n = r).parent;
          if (null === r) return t[Nn];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === un.None || i === un.Emulated) return null;
            }
            return Rt(r, t);
          }
        })(e, n.parent, t);
      }
      function Sr(e, n, t, r, o) {
        e.insertBefore(n, t, r, o);
      }
      function pg(e, n, t) {
        e.appendChild(n, t);
      }
      function gg(e, n, t, r, o) {
        null !== r ? Sr(e, n, t, r, o) : pg(e, n, t);
      }
      function ca(e, n) {
        return e.parentNode(n);
      }
      let ac,
        fc,
        pa,
        vg = function yg(e, n, t) {
          return 40 & e.type ? Rt(e, t) : null;
        };
      function da(e, n, t, r) {
        const o = fg(e, r, n),
          i = n[X],
          a = (function mg(e, n, t) {
            return vg(e, n, t);
          })(r.parent || n[Je], r, n);
        if (null != o)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) gg(i, o, t[l], a, !1);
          else gg(i, o, t, a, !1);
        void 0 !== ac && ac(i, r, n, t, o);
      }
      function fa(e, n) {
        if (null !== n) {
          const t = n.type;
          if (3 & t) return Rt(n, e);
          if (4 & t) return lc(-1, e[n.index]);
          if (8 & t) {
            const r = n.child;
            if (null !== r) return fa(e, r);
            {
              const o = e[n.index];
              return Zt(o) ? lc(-1, o) : Ze(o);
            }
          }
          if (32 & t) return ec(n, e)() || Ze(e[n.index]);
          {
            const r = _g(e, n);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : fa(Ci(e[et]), r)
              : fa(e, n.next);
          }
        }
        return null;
      }
      function _g(e, n) {
        return null !== n ? e[et][Je].projection[n.projection] : null;
      }
      function lc(e, n) {
        const t = ut + e + 1;
        if (t < n.length) {
          const r = n[t],
            o = r[x].firstChild;
          if (null !== o) return fa(r, o);
        }
        return n[Ws];
      }
      function cc(e, n, t, r, o, i, s) {
        for (; null != t; ) {
          const a = r[t.index],
            l = t.type;
          if (
            (s && 0 === n && (a && tt(Ze(a), r), (t.flags |= 2)),
            32 != (32 & t.flags))
          )
            if (8 & l) cc(e, n, t.child, r, o, i, !1), co(n, e, o, a, i);
            else if (32 & l) {
              const u = ec(t, r);
              let c;
              for (; (c = u()); ) co(n, e, o, c, i);
              co(n, e, o, a, i);
            } else 16 & l ? Cg(e, n, r, t, o, i) : co(n, e, o, a, i);
          t = s ? t.projectionNext : t.next;
        }
      }
      function wi(e, n, t, r, o, i) {
        cc(t, r, e.firstChild, n, o, i, !1);
      }
      function Cg(e, n, t, r, o, i) {
        const s = t[et],
          l = s[Je].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) co(n, e, o, l[u], i);
        else cc(e, n, l, s[Se], o, i, !0);
      }
      function wg(e, n, t) {
        "" === t
          ? e.removeAttribute(n, "class")
          : e.setAttribute(n, "class", t);
      }
      function bg(e, n, t) {
        const { mergedAttrs: r, classes: o, styles: i } = t;
        null !== r && ku(e, n, r),
          null !== o && wg(e, n, o),
          null !== i &&
            (function US(e, n, t) {
              e.setAttribute(n, "style", t);
            })(e, n, i);
      }
      function Ig(e) {
        return (
          (function hc() {
            if (void 0 === pa && ((pa = null), _e.trustedTypes))
              try {
                pa = _e.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return pa;
          })()?.createScriptURL(e) || e
        );
      }
      class Ag {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${zh})`;
        }
      }
      function rr(e) {
        return e instanceof Ag ? e.changingThisBreaksApplicationSecurity : e;
      }
      function bi(e, n) {
        const t = (function JS(e) {
          return (e instanceof Ag && e.getTypeName()) || null;
        })(e);
        if (null != t && t !== n) {
          if ("ResourceURL" === t && "URL" === n) return !0;
          throw new Error(`Required a safe ${n}, got a ${t} (see ${zh})`);
        }
        return t === n;
      }
      const r0 = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Be = (() => (
        ((Be = Be || {})[(Be.NONE = 0)] = "NONE"),
        (Be[(Be.HTML = 1)] = "HTML"),
        (Be[(Be.STYLE = 2)] = "STYLE"),
        (Be[(Be.SCRIPT = 3)] = "SCRIPT"),
        (Be[(Be.URL = 4)] = "URL"),
        (Be[(Be.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        Be
      ))();
      function Pg(e) {
        const n = Si();
        return n
          ? n.sanitize(Be.URL, e) || ""
          : bi(e, "URL")
          ? rr(e)
          : (function pc(e) {
              return (e = String(e)).match(r0) ? e : "unsafe:" + e;
            })(G(e));
      }
      function kg(e) {
        const n = Si();
        if (n) return Ig(n.sanitize(Be.RESOURCE_URL, e) || "");
        if (bi(e, "ResourceURL")) return Ig(rr(e));
        throw new S(904, !1);
      }
      function Si() {
        const e = E();
        return e && e[_u];
      }
      const ma = new F("ENVIRONMENT_INITIALIZER"),
        Vg = new F("INJECTOR", -1),
        Bg = new F("INJECTOR_DEF_TYPES");
      class jg {
        get(n, t = ni) {
          if (t === ni) {
            const r = new Error(`NullInjectorError: No provider for ${me(n)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return t;
        }
      }
      function v0(...e) {
        return { ɵproviders: $g(0, e), ɵfromNgModule: !0 };
      }
      function $g(e, ...n) {
        const t = [],
          r = new Set();
        let o;
        return (
          Er(n, (i) => {
            const s = i;
            vc(s, t, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && Hg(o, t),
          t
        );
      }
      function Hg(e, n) {
        for (let t = 0; t < e.length; t++) {
          const { providers: o } = e[t];
          Dc(o, (i) => {
            n.push(i);
          });
        }
      }
      function vc(e, n, t, r) {
        if (!(e = j(e))) return !1;
        let o = null,
          i = Wh(e);
        const s = !i && le(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = Wh(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) vc(u, n, t, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let u;
              r.add(o);
              try {
                Er(i.imports, (c) => {
                  vc(c, n, t, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && Hg(u, n);
            }
            if (!a) {
              const u = Cr(o) || (() => new o());
              n.push(
                { provide: o, useFactory: u, deps: re },
                { provide: Bg, useValue: o, multi: !0 },
                { provide: ma, useValue: () => N(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              Dc(l, (c) => {
                n.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Dc(e, n) {
        for (let t of e)
          hu(t) && (t = t.ɵproviders), Array.isArray(t) ? Dc(t, n) : n(t);
      }
      const D0 = pe({ provide: String, useValue: pe });
      function _c(e) {
        return null !== e && "object" == typeof e && D0 in e;
      }
      function Mr(e) {
        return "function" == typeof e;
      }
      const Cc = new F("Set Injector scope."),
        ya = {},
        C0 = {};
      let wc;
      function va() {
        return void 0 === wc && (wc = new jg()), wc;
      }
      class hn {}
      class Gg extends hn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(n, t, r, o) {
          super(),
            (this.parent = t),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Ec(n, (s) => this.processProvider(s)),
            this.records.set(Vg, ho(void 0, this)),
            o.has("environment") && this.records.set(hn, ho(void 0, this));
          const i = this.records.get(Cc);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Bg.multi, re, $.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            for (const n of this._onDestroyHooks) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(n) {
          this._onDestroyHooks.push(n);
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const t = Kr(this),
            r = Vt(void 0);
          try {
            return n();
          } finally {
            Kr(t), Vt(r);
          }
        }
        get(n, t = ni, r = $.Default) {
          this.assertNotDestroyed(), (r = $s(r));
          const o = Kr(this),
            i = Vt(void 0);
          try {
            if (!(r & $.SkipSelf)) {
              let a = this.records.get(n);
              if (void 0 === a) {
                const l =
                  (function M0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof F)
                    );
                  })(n) && Vs(n);
                (a = l && this.injectableDefInScope(l) ? ho(bc(n), ya) : null),
                  this.records.set(n, a);
              }
              if (null != a) return this.hydrate(n, a);
            }
            return (r & $.Self ? va() : this.parent).get(
              n,
              (t = r & $.Optional && t === ni ? null : t)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[js] = s[js] || []).unshift(me(n)), o)) throw s;
              return (function Yb(e, n, t, r) {
                const o = e[js];
                throw (
                  (n[Zh] && o.unshift(n[Zh]),
                  (e.message = (function Qb(e, n, t, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == qb
                        ? e.slice(2)
                        : e;
                    let o = me(n);
                    if (Array.isArray(n)) o = n.map(me).join(" -> ");
                    else if ("object" == typeof n) {
                      let i = [];
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : me(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${t}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Wb,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, t, r)),
                  (e[Gb] = o),
                  (e[js] = null),
                  e)
                );
              })(s, n, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Vt(i), Kr(o);
          }
        }
        resolveInjectorInitializers() {
          const n = Kr(this),
            t = Vt(void 0);
          try {
            const r = this.get(ma.multi, re, $.Self);
            for (const o of r) o();
          } finally {
            Kr(n), Vt(t);
          }
        }
        toString() {
          const n = [],
            t = this.records;
          for (const r of t.keys()) n.push(me(r));
          return `R3Injector[${n.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new S(205, !1);
        }
        processProvider(n) {
          let t = Mr((n = j(n))) ? n : j(n && n.provide);
          const r = (function b0(e) {
            return _c(e) ? ho(void 0, e.useValue) : ho(Wg(e), ya);
          })(n);
          if (Mr(n) || !0 !== n.multi) this.records.get(t);
          else {
            let o = this.records.get(t);
            o ||
              ((o = ho(void 0, ya, !0)),
              (o.factory = () => yu(o.multi)),
              this.records.set(t, o)),
              (t = n),
              o.multi.push(n);
          }
          this.records.set(t, r);
        }
        hydrate(n, t) {
          return (
            t.value === ya && ((t.value = C0), (t.value = t.factory())),
            "object" == typeof t.value &&
              t.value &&
              (function S0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(t.value) &&
              this._ngOnDestroyHooks.add(t.value),
            t.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const t = j(n.providedIn);
          return "string" == typeof t
            ? "any" === t || this.scopes.has(t)
            : this.injectorDefTypes.has(t);
        }
      }
      function bc(e) {
        const n = Vs(e),
          t = null !== n ? n.factory : Cr(e);
        if (null !== t) return t;
        if (e instanceof F) throw new S(204, !1);
        if (e instanceof Function)
          return (function w0(e) {
            const n = e.length;
            if (n > 0)
              throw (
                ((function gi(e, n) {
                  const t = [];
                  for (let r = 0; r < e; r++) t.push(n);
                  return t;
                })(n, "?"),
                new S(204, !1))
              );
            const t = (function Hb(e) {
              return (e && (e[Bs] || e[qh])) || null;
            })(e);
            return null !== t ? () => t.factory(e) : () => new e();
          })(e);
        throw new S(204, !1);
      }
      function Wg(e, n, t) {
        let r;
        if (Mr(e)) {
          const o = j(e);
          return Cr(o) || bc(o);
        }
        if (_c(e)) r = () => j(e.useValue);
        else if (
          (function zg(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...yu(e.deps || []));
        else if (
          (function Ug(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => N(j(e.useExisting));
        else {
          const o = j(e && (e.useClass || e.provide));
          if (
            !(function E0(e) {
              return !!e.deps;
            })(e)
          )
            return Cr(o) || bc(o);
          r = () => new o(...yu(e.deps));
        }
        return r;
      }
      function ho(e, n, t = !1) {
        return { factory: e, value: n, multi: t ? [] : void 0 };
      }
      function Ec(e, n) {
        for (const t of e)
          Array.isArray(t) ? Ec(t, n) : t && hu(t) ? Ec(t.ɵproviders, n) : n(t);
      }
      class I0 {}
      class qg {}
      class T0 {
        resolveComponentFactory(n) {
          throw (function A0(e) {
            const n = Error(
              `No component factory found for ${me(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (n.ngComponent = e), n;
          })(n);
        }
      }
      let Mi = (() => {
        class e {}
        return (e.NULL = new T0()), e;
      })();
      function x0() {
        return po(Ye(), E());
      }
      function po(e, n) {
        return new Ct(Rt(e, n));
      }
      let Ct = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (e.__NG_ELEMENT_ID__ = x0), e;
      })();
      function R0(e) {
        return e instanceof Ct ? e.nativeElement : e;
      }
      class Zg {}
      let kn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function N0() {
                const e = E(),
                  t = vt(Ye().index, e);
                return (xt(t) ? t : e)[X];
              })()),
            e
          );
        })(),
        O0 = (() => {
          class e {}
          return (
            (e.ɵprov = k({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Ii {
        constructor(n) {
          (this.full = n),
            (this.major = n.split(".")[0]),
            (this.minor = n.split(".")[1]),
            (this.patch = n.split(".").slice(2).join("."));
        }
      }
      const F0 = new Ii("15.2.10"),
        Sc = {},
        Mc = "ngOriginalError";
      function Ic(e) {
        return e[Mc];
      }
      class go {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const t = this._findOriginalError(n);
          this._console.error("ERROR", n),
            t && this._console.error("ORIGINAL ERROR", t);
        }
        _findOriginalError(n) {
          let t = n && Ic(n);
          for (; t && Ic(t); ) t = Ic(t);
          return t || null;
        }
      }
      function Ln(e) {
        return e instanceof Function ? e() : e;
      }
      function Qg(e, n, t) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(n, t);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = n.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          t = o + 1;
        }
      }
      const Xg = "ng-template";
      function G0(e, n, t) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (t && "class" === i && -1 !== Qg(s.toLowerCase(), n, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === n) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function Jg(e) {
        return 4 === e.type && e.value !== Xg;
      }
      function W0(e, n, t) {
        return n === (4 !== e.type || t ? e.value : Xg);
      }
      function q0(e, n, t) {
        let r = 4;
        const o = e.attrs || [],
          i = (function Y0(e) {
            for (let n = 0; n < e.length; n++) if (Mp(e[n])) return n;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < n.length; a++) {
          const l = n[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !W0(e, l, t)) || ("" === l && 1 === n.length))
                ) {
                  if (Qt(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : n[++a];
                if (8 & r && null !== e.attrs) {
                  if (!G0(e.attrs, u, t)) {
                    if (Qt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = K0(8 & r ? "class" : l, o, Jg(e), t);
                if (-1 === d) {
                  if (Qt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Qg(h, u, 0)) || (2 & r && u !== f)) {
                    if (Qt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Qt(r) && !Qt(l)) return !1;
            if (s && Qt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Qt(r) || s;
      }
      function Qt(e) {
        return 0 == (1 & e);
      }
      function K0(e, n, t, r) {
        if (null === n) return -1;
        let o = 0;
        if (r || !t) {
          let i = !1;
          for (; o < n.length; ) {
            const s = n[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = n[++o];
                for (; "string" == typeof a; ) a = n[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function Q0(e, n) {
          let t = e.indexOf(4);
          if (t > -1)
            for (t++; t < e.length; ) {
              const r = e[t];
              if ("number" == typeof r) return -1;
              if (r === n) return t;
              t++;
            }
          return -1;
        })(n, e);
      }
      function em(e, n, t = !1) {
        for (let r = 0; r < n.length; r++) if (q0(e, n[r], t)) return !0;
        return !1;
      }
      function tm(e, n) {
        return e ? ":not(" + n.trim() + ")" : n;
      }
      function J0(e) {
        let n = e[0],
          t = 1,
          r = 2,
          o = "",
          i = !1;
        for (; t < e.length; ) {
          let s = e[t];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++t];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Qt(s) && ((n += tm(i, o)), (o = "")),
              (r = s),
              (i = i || !Qt(r));
          t++;
        }
        return "" !== o && (n += tm(i, o)), n;
      }
      const q = {};
      function oe(e) {
        nm(te(), E(), dt() + e, !1);
      }
      function nm(e, n, t, r) {
        if (!r)
          if (3 == (3 & n[Z])) {
            const i = e.preOrderCheckHooks;
            null !== i && Xs(n, i, t);
          } else {
            const i = e.preOrderHooks;
            null !== i && Js(n, i, 0, t);
          }
        wr(t);
      }
      function sm(e, n = null, t = null, r) {
        const o = am(e, n, t, r);
        return o.resolveInjectorInitializers(), o;
      }
      function am(e, n = null, t = null, r, o = new Set()) {
        const i = [t || re, v0(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : me(e))),
          new Gg(i, n || va(), r || null, o)
        );
      }
      let pn = (() => {
        class e {
          static create(t, r) {
            if (Array.isArray(t)) return sm({ name: "" }, r, t, "");
            {
              const o = t.name ?? "";
              return sm({ name: o }, t.parent, t.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = ni),
          (e.NULL = new jg()),
          (e.ɵprov = k({ token: e, providedIn: "any", factory: () => N(Vg) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function C(e, n = $.Default) {
        const t = E();
        return null === t ? N(e, n) : Pp(Ye(), t, j(e), n);
      }
      function gm(e, n) {
        const t = e.contentQueries;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) {
            const i = t[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ru(t[r]), s.contentQueries(2, n[i], i);
            }
          }
      }
      function _a(e, n, t, r, o, i, s, a, l, u, c) {
        const d = n.blueprint.slice();
        return (
          (d[Nn] = o),
          (d[Z] = 76 | r),
          (null !== c || (e && 1024 & e[Z])) && (d[Z] |= 1024),
          fp(d),
          (d[Se] = d[Qr] = e),
          (d[Ie] = t),
          (d[Gs] = s || (e && e[Gs])),
          (d[X] = a || (e && e[X])),
          (d[_u] = l || (e && e[_u]) || null),
          (d[zs] = u || (e && e[zs]) || null),
          (d[Je] = i),
          (d[li] = (function yS() {
            return mS++;
          })()),
          (d[np] = c),
          (d[et] = 2 == n.type ? e[et] : d),
          d
        );
      }
      function vo(e, n, t, r, o) {
        let i = e.data[n];
        if (null === i)
          (i = (function Nc(e, n, t, r, o) {
            const i = gp(),
              s = Iu(),
              l = (e.data[n] = (function SM(e, n, t, r, o, i) {
                return {
                  type: t,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: n ? n.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: n,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, t, n, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && ((i.next = l), (l.prev = i))),
              l
            );
          })(e, n, t, r, o)),
            (function CE() {
              return W.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = t), (i.value = r), (i.attrs = o);
          const s = (function ci() {
            const e = W.lFrame,
              n = e.currentTNode;
            return e.isParent ? n : n.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return dn(i, !0), i;
      }
      function Ai(e, n, t, r) {
        if (0 === t) return -1;
        const o = n.length;
        for (let i = 0; i < t; i++)
          n.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Oc(e, n, t) {
        Nu(n);
        try {
          const r = e.viewQuery;
          null !== r && Hc(1, r, t);
          const o = e.template;
          null !== o && mm(e, n, o, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && gm(e, n),
            e.staticViewQueries && Hc(2, e.viewQuery, t);
          const i = e.components;
          null !== i &&
            (function wM(e, n) {
              for (let t = 0; t < n.length; t++) GM(e, n[t]);
            })(n, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (n[Z] &= -5), Ou();
        }
      }
      function Ca(e, n, t, r) {
        const o = n[Z];
        if (128 != (128 & o)) {
          Nu(n);
          try {
            fp(n),
              (function yp(e) {
                return (W.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== t && mm(e, n, t, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && Xs(n, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && Js(n, u, 0, null), Fu(n, 0);
            }
            if (
              ((function UM(e) {
                for (let n = tc(e); null !== n; n = nc(n)) {
                  if (!n[rp]) continue;
                  const t = n[Jr];
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    512 & o[Z] || Eu(o[Se], 1), (o[Z] |= 512);
                  }
                }
              })(n),
              (function HM(e) {
                for (let n = tc(e); null !== n; n = nc(n))
                  for (let t = ut; t < n.length; t++) {
                    const r = n[t],
                      o = r[x];
                    Ys(r) && Ca(o, r, o.template, r[Ie]);
                  }
              })(n),
              null !== e.contentQueries && gm(e, n),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && Xs(n, u);
            } else {
              const u = e.contentHooks;
              null !== u && Js(n, u, 1), Fu(n, 1);
            }
            !(function _M(e, n) {
              const t = e.hostBindingOpCodes;
              if (null !== t)
                try {
                  for (let r = 0; r < t.length; r++) {
                    const o = t[r];
                    if (o < 0) wr(~o);
                    else {
                      const i = o,
                        s = t[++r],
                        a = t[++r];
                      wE(s, i), a(2, n[i]);
                    }
                  }
                } finally {
                  wr(-1);
                }
            })(e, n);
            const a = e.components;
            null !== a &&
              (function CM(e, n) {
                for (let t = 0; t < n.length; t++) zM(e, n[t]);
              })(n, a);
            const l = e.viewQuery;
            if ((null !== l && Hc(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && Xs(n, u);
            } else {
              const u = e.viewHooks;
              null !== u && Js(n, u, 2), Fu(n, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[Z] &= -41),
              512 & n[Z] && ((n[Z] &= -513), Eu(n[Se], -1));
          } finally {
            Ou();
          }
        }
      }
      function mm(e, n, t, r, o) {
        const i = dt(),
          s = 2 & r;
        try {
          wr(-1),
            s && n.length > Ce && nm(e, n, Ce, !1),
            jt(s ? 2 : 0, o),
            t(r, o);
        } finally {
          wr(i), jt(s ? 3 : 1, o);
        }
      }
      function Fc(e, n, t) {
        if (wu(n)) {
          const o = n.directiveEnd;
          for (let i = n.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, t[i], i);
          }
        }
      }
      function Pc(e, n, t) {
        pp() &&
          ((function NM(e, n, t, r) {
            const o = t.directiveStart,
              i = t.directiveEnd;
            ui(t) &&
              (function BM(e, n, t) {
                const r = Rt(n, e),
                  o = ym(t),
                  i = e[Gs],
                  s = wa(
                    e,
                    _a(
                      e,
                      o,
                      null,
                      t.onPush ? 32 : 16,
                      r,
                      n,
                      i,
                      i.createRenderer(r, t),
                      null,
                      null,
                      null
                    )
                  );
                e[n.index] = s;
              })(n, t, e.data[o + t.componentOffset]),
              e.firstCreatePass || ra(t, n),
              tt(r, n);
            const s = t.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = br(n, e, a, t);
              tt(u, n),
                null !== s && jM(0, a - o, u, l, 0, s),
                Yt(l) && (vt(t.index, n)[Ie] = br(n, e, a, t));
            }
          })(e, n, t, Rt(t, n)),
          64 == (64 & t.flags) && wm(e, n, t));
      }
      function kc(e, n, t = Rt) {
        const r = n.localNames;
        if (null !== r) {
          let o = n.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? t(n, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function ym(e) {
        const n = e.tView;
        return null === n || n.incompleteFirstPass
          ? (e.tView = Lc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : n;
      }
      function Lc(e, n, t, r, o, i, s, a, l, u) {
        const c = Ce + r,
          d = c + o,
          f = (function bM(e, n) {
            const t = [];
            for (let r = 0; r < n; r++) t.push(r < e ? null : q);
            return t;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[x] = {
          type: e,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function vm(e, n, t, r) {
        const o = Em(n);
        null === t
          ? o.push(r)
          : (o.push(t), e.firstCreatePass && Sm(e).push(r, o.length - 1));
      }
      function Dm(e, n, t, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            t = null === t ? {} : t;
            const i = e[o];
            null === r
              ? _m(t, n, o, i)
              : r.hasOwnProperty(o) && _m(t, n, r[o], i);
          }
        return t;
      }
      function _m(e, n, t, r) {
        e.hasOwnProperty(t) ? e[t].push(n, r) : (e[t] = [n, r]);
      }
      function Vc(e, n, t, r) {
        if (pp()) {
          const o = null === r ? null : { "": -1 },
            i = (function FM(e, n) {
              const t = e.directiveRegistry;
              let r = null,
                o = null;
              if (t)
                for (let i = 0; i < t.length; i++) {
                  const s = t[i];
                  if (em(n, s.selectors, !1))
                    if ((r || (r = []), Yt(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          Bc(e, n, a.length);
                      } else r.unshift(s), Bc(e, n, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, t);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Cm(e, n, t, s, o, a),
            o &&
              (function PM(e, n, t) {
                if (n) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < n.length; o += 2) {
                    const i = t[n[o + 1]];
                    if (null == i) throw new S(-301, !1);
                    r.push(n[o], i);
                  }
                }
              })(t, r, o);
        }
        t.mergedAttrs = fi(t.mergedAttrs, t.attrs);
      }
      function Cm(e, n, t, r, o, i) {
        for (let u = 0; u < r.length; u++) ju(ra(t, n), e, r[u].type);
        !(function LM(e, n, t) {
          (e.flags |= 1),
            (e.directiveStart = n),
            (e.directiveEnd = n + t),
            (e.providerIndexes = n);
        })(t, e.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = Ai(e, n, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (t.mergedAttrs = fi(t.mergedAttrs, c.hostAttrs)),
            VM(e, t, n, l, c),
            kM(l, c, o),
            null !== c.contentQueries && (t.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (t.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(t.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                t.index
              ),
              (a = !0)),
            l++;
        }
        !(function MM(e, n, t) {
          const o = n.directiveEnd,
            i = e.data,
            s = n.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = n.directiveStart; c < o; c++) {
            const d = i[c],
              f = t ? t.get(d) : null,
              p = f ? f.outputs : null;
            (l = Dm(d.inputs, c, l, f ? f.inputs : null)),
              (u = Dm(d.outputs, c, u, p));
            const y = null === l || null === s || Jg(n) ? null : $M(l, c, s);
            a.push(y);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (n.flags |= 8),
            l.hasOwnProperty("style") && (n.flags |= 16)),
            (n.initialInputs = a),
            (n.inputs = l),
            (n.outputs = u);
        })(e, t, i);
      }
      function wm(e, n, t) {
        const r = t.directiveStart,
          o = t.directiveEnd,
          i = t.index,
          s = (function bE() {
            return W.lFrame.currentDirectiveIndex;
          })();
        try {
          wr(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              u = n[a];
            Tu(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                OM(l, u);
          }
        } finally {
          wr(-1), Tu(s);
        }
      }
      function OM(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n);
      }
      function Bc(e, n, t) {
        (n.componentOffset = t),
          (e.components ?? (e.components = [])).push(n.index);
      }
      function kM(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
          Yt(n) && (t[""] = e);
        }
      }
      function VM(e, n, t, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Cr(o.type)),
          s = new di(i, Yt(o), C);
        (e.blueprint[r] = s),
          (t[r] = s),
          (function xM(e, n, t, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~n.index;
              (function RM(e) {
                let n = e.length;
                for (; n > 0; ) {
                  const t = e[--n];
                  if ("number" == typeof t && t < 0) return t;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(t, r, i);
            }
          })(e, n, r, Ai(e, t, o.hostVars, q), o);
      }
      function gn(e, n, t, r, o, i) {
        const s = Rt(e, n);
        !(function jc(e, n, t, r, o, i, s) {
          if (null == i) e.removeAttribute(n, o, t);
          else {
            const a = null == s ? G(i) : s(i, r || "", o);
            e.setAttribute(n, o, a, t);
          }
        })(n[X], s, i, e.value, t, r, o);
      }
      function jM(e, n, t, r, o, i) {
        const s = i[n];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(t, d, u, c) : (t[c] = d);
          }
        }
      }
      function $M(e, n, t) {
        let r = null,
          o = 0;
        for (; o < t.length; ) {
          const i = t[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === n) {
                    r.push(i, s[a + 1], t[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function bm(e, n, t, r) {
        return [e, !0, !1, n, null, 0, r, t, null, null];
      }
      function zM(e, n) {
        const t = vt(n, e);
        if (Ys(t)) {
          const r = t[x];
          48 & t[Z] ? Ca(r, t, r.template, t[Ie]) : t[_r] > 0 && $c(t);
        }
      }
      function $c(e) {
        for (let r = tc(e); null !== r; r = nc(r))
          for (let o = ut; o < r.length; o++) {
            const i = r[o];
            if (Ys(i))
              if (512 & i[Z]) {
                const s = i[x];
                Ca(s, i, s.template, i[Ie]);
              } else i[_r] > 0 && $c(i);
          }
        const t = e[x].components;
        if (null !== t)
          for (let r = 0; r < t.length; r++) {
            const o = vt(t[r], e);
            Ys(o) && o[_r] > 0 && $c(o);
          }
      }
      function GM(e, n) {
        const t = vt(n, e),
          r = t[x];
        (function WM(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t]);
        })(r, t),
          Oc(r, t, t[Ie]);
      }
      function wa(e, n) {
        return e[si] ? (e[tp][Kt] = n) : (e[si] = n), (e[tp] = n), n;
      }
      function ba(e) {
        for (; e; ) {
          e[Z] |= 32;
          const n = Ci(e);
          if (rE(e) && !n) return e;
          e = n;
        }
        return null;
      }
      function Ea(e, n, t, r = !0) {
        const o = n[Gs];
        o.begin && o.begin();
        try {
          Ca(e, n, e.template, t);
        } catch (s) {
          throw (r && Im(n, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Hc(e, n, t) {
        Ru(0), n(e, t);
      }
      function Em(e) {
        return e[Yr] || (e[Yr] = []);
      }
      function Sm(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Im(e, n) {
        const t = e[zs],
          r = t ? t.get(go, null) : null;
        r && r.handleError(n);
      }
      function Uc(e, n, t, r, o) {
        for (let i = 0; i < t.length; ) {
          const s = t[i++],
            a = t[i++],
            l = n[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function Sa(e, n, t) {
        let r = t ? e.styles : null,
          o = t ? e.classes : null,
          i = 0;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = du(o, a))
              : 2 == i && (r = du(r, a + ": " + n[++s] + ";"));
          }
        t ? (e.styles = r) : (e.stylesWithoutHost = r),
          t ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Ma(e, n, t, r, o = !1) {
        for (; null !== t; ) {
          const i = n[t.index];
          if ((null !== i && r.push(Ze(i)), Zt(i)))
            for (let a = ut; a < i.length; a++) {
              const l = i[a],
                u = l[x].firstChild;
              null !== u && Ma(l[x], l, u, r);
            }
          const s = t.type;
          if (8 & s) Ma(e, n, t.child, r);
          else if (32 & s) {
            const a = ec(t, n);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = _g(n, t);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Ci(n[et]);
              Ma(l[x], l, a, r, !0);
            }
          }
          t = o ? t.projectionNext : t.next;
        }
        return r;
      }
      class Ti {
        get rootNodes() {
          const n = this._lView,
            t = n[x];
          return Ma(t, n, t.firstChild, []);
        }
        constructor(n, t) {
          (this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Ie];
        }
        set context(n) {
          this._lView[Ie] = n;
        }
        get destroyed() {
          return 128 == (128 & this._lView[Z]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[Se];
            if (Zt(n)) {
              const t = n[qs],
                r = t ? t.indexOf(this) : -1;
              r > -1 && (ic(n, r), sa(t, r));
            }
            this._attachedToViewContainer = !1;
          }
          dg(this._lView[x], this._lView);
        }
        onDestroy(n) {
          vm(this._lView[x], this._lView, null, n);
        }
        markForCheck() {
          ba(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[Z] &= -65;
        }
        reattach() {
          this._lView[Z] |= 64;
        }
        detectChanges() {
          Ea(this._lView[x], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new S(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function NS(e, n) {
              wi(e, n, n[X], 2, null, null);
            })(this._lView[x], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new S(902, !1);
          this._appRef = n;
        }
      }
      class qM extends Ti {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          Ea(n[x], n, n[Ie], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Am extends Mi {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const t = le(n);
          return new xi(t, this.ngModule);
        }
      }
      function Tm(e) {
        const n = [];
        for (let t in e)
          e.hasOwnProperty(t) && n.push({ propName: e[t], templateName: t });
        return n;
      }
      class ZM {
        constructor(n, t) {
          (this.injector = n), (this.parentInjector = t);
        }
        get(n, t, r) {
          r = $s(r);
          const o = this.injector.get(n, Sc, r);
          return o !== Sc || t === Sc ? o : this.parentInjector.get(n, t, r);
        }
      }
      class xi extends qg {
        get inputs() {
          return Tm(this.componentDef.inputs);
        }
        get outputs() {
          return Tm(this.componentDef.outputs);
        }
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function eM(e) {
              return e.map(J0).join(",");
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t);
        }
        create(n, t, r, o) {
          let i = (o = o || this.ngModule) instanceof hn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new ZM(n, i) : n,
            a = s.get(Zg, null);
          if (null === a) throw new S(407, !1);
          const l = s.get(O0, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function EM(e, n, t) {
                  return e.selectRootElement(n, t === un.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : oc(
                  u,
                  c,
                  (function KM(e) {
                    const n = e.toLowerCase();
                    return "svg" === n ? "svg" : "math" === n ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Lc(0, null, null, 1, 0, null, null, null, null, null),
            p = _a(null, h, null, f, null, null, a, u, l, s, null);
          let y, D;
          Nu(p);
          try {
            const b = this.componentDef;
            let A,
              _ = null;
            b.findHostDirectiveDefs
              ? ((A = []),
                (_ = new Map()),
                b.findHostDirectiveDefs(b, A, _),
                A.push(b))
              : (A = [b]);
            const V = (function QM(e, n) {
                const t = e[x],
                  r = Ce;
                return (e[r] = n), vo(t, r, 2, "#host", null);
              })(p, d),
              ie = (function XM(e, n, t, r, o, i, s, a) {
                const l = o[x];
                !(function JM(e, n, t, r) {
                  for (const o of e)
                    n.mergedAttrs = fi(n.mergedAttrs, o.hostAttrs);
                  null !== n.mergedAttrs &&
                    (Sa(n, n.mergedAttrs, !0), null !== t && bg(r, t, n));
                })(r, e, n, s);
                const u = i.createRenderer(n, t),
                  c = _a(
                    o,
                    ym(t),
                    null,
                    t.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    u,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && Bc(l, e, r.length - 1),
                  wa(o, c),
                  (o[e.index] = c)
                );
              })(V, d, b, A, p, a, u);
            (D = dp(h, Ce)),
              d &&
                (function tI(e, n, t, r) {
                  if (r) ku(e, t, ["ng-version", F0.full]);
                  else {
                    const { attrs: o, classes: i } = (function tM(e) {
                      const n = [],
                        t = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && n.push(i, e[++r])
                            : 8 === o && t.push(i);
                        else {
                          if (!Qt(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: n, classes: t };
                    })(n.selectors[0]);
                    o && ku(e, t, o),
                      i && i.length > 0 && wg(e, t, i.join(" "));
                  }
                })(u, b, d, r),
              void 0 !== t &&
                (function nI(e, n, t) {
                  const r = (e.projection = []);
                  for (let o = 0; o < n.length; o++) {
                    const i = t[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(D, this.ngContentSelectors, t),
              (y = (function eI(e, n, t, r, o, i) {
                const s = Ye(),
                  a = o[x],
                  l = Rt(s, o);
                Cm(a, o, s, t, null, r);
                for (let c = 0; c < t.length; c++)
                  tt(br(o, a, s.directiveStart + c, s), o);
                wm(a, o, s), l && tt(l, o);
                const u = br(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[Ie] = o[Ie] = u), null !== i))
                  for (const c of i) c(u, n);
                return Fc(a, s, e), u;
              })(ie, b, A, _, p, [rI])),
              Oc(h, p, null);
          } finally {
            Ou();
          }
          return new YM(this.componentType, y, po(D, p), p, D);
        }
      }
      class YM extends I0 {
        constructor(n, t, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new qM(o)),
            (this.componentType = n);
        }
        setInput(n, t) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[n])) {
            const i = this._rootLView;
            Uc(i[x], i, o, n, t), ba(vt(this._tNode.index, i));
          }
        }
        get injector() {
          return new ro(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function rI() {
        const e = Ye();
        Qs(E()[x], e);
      }
      function ce(e) {
        let n = (function xm(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          t = !0;
        const r = [e];
        for (; n; ) {
          let o;
          if (Yt(e)) o = n.ɵcmp || n.ɵdir;
          else {
            if (n.ɵcmp) throw new S(903, !1);
            o = n.ɵdir;
          }
          if (o) {
            if (t) {
              r.push(o);
              const s = e;
              (s.inputs = zc(e.inputs)),
                (s.declaredInputs = zc(e.declaredInputs)),
                (s.outputs = zc(e.outputs));
              const a = o.hostBindings;
              a && aI(e, a);
              const l = o.viewQuery,
                u = o.contentQueries;
              if (
                (l && iI(e, l),
                u && sI(e, u),
                cu(e.inputs, o.inputs),
                cu(e.declaredInputs, o.declaredInputs),
                cu(e.outputs, o.outputs),
                Yt(o) && o.data.animation)
              ) {
                const c = e.data;
                c.animation = (c.animation || []).concat(o.data.animation);
              }
            }
            const i = o.features;
            if (i)
              for (let s = 0; s < i.length; s++) {
                const a = i[s];
                a && a.ngInherit && a(e), a === ce && (t = !1);
              }
          }
          n = Object.getPrototypeOf(n);
        }
        !(function oI(e) {
          let n = 0,
            t = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const o = e[r];
            (o.hostVars = n += o.hostVars),
              (o.hostAttrs = fi(o.hostAttrs, (t = fi(t, o.hostAttrs))));
          }
        })(r);
      }
      function zc(e) {
        return e === xn ? {} : e === re ? [] : e;
      }
      function iI(e, n) {
        const t = e.viewQuery;
        e.viewQuery = t
          ? (r, o) => {
              n(r, o), t(r, o);
            }
          : n;
      }
      function sI(e, n) {
        const t = e.contentQueries;
        e.contentQueries = t
          ? (r, o, i) => {
              n(r, o, i), t(r, o, i);
            }
          : n;
      }
      function aI(e, n) {
        const t = e.hostBindings;
        e.hostBindings = t
          ? (r, o) => {
              n(r, o), t(r, o);
            }
          : n;
      }
      function Ia(e) {
        return (
          !!(function Gc(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function mn(e, n, t) {
        return (e[n] = t);
      }
      function nt(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0);
      }
      function yn(e, n, t, r) {
        const o = E();
        return nt(o, to(), n) && (te(), gn(be(), o, e, n, t, r)), yn;
      }
      function Wc(e, n, t, r, o, i, s, a) {
        const l = E(),
          u = te(),
          c = e + Ce,
          d = u.firstCreatePass
            ? (function yI(e, n, t, r, o, i, s, a, l) {
                const u = n.consts,
                  c = vo(n, e, 4, s || null, nr(u, a));
                Vc(n, t, c, nr(u, l)), Qs(n, c);
                const d = (c.tView = Lc(
                  2,
                  c,
                  r,
                  o,
                  i,
                  n.directiveRegistry,
                  n.pipeRegistry,
                  null,
                  n.schemas,
                  u
                ));
                return (
                  null !== n.queries &&
                    (n.queries.template(n, c),
                    (d.queries = n.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, n, t, r, o, i, s)
            : u.data[c];
        dn(d, !1);
        const f = l[X].createComment("");
        da(u, l, f, d),
          tt(f, l),
          wa(l, (l[c] = bm(f, l, f, d))),
          Ks(d) && Pc(u, l, d),
          null != s && kc(l, d, a);
      }
      function rt(e, n, t) {
        const r = E();
        return (
          nt(r, to(), n) &&
            (function Ot(e, n, t, r, o, i, s, a) {
              const l = Rt(n, t);
              let c,
                u = n.inputs;
              !a && null != u && (c = u[r])
                ? (Uc(e, t, c, r, o),
                  ui(n) &&
                    (function AM(e, n) {
                      const t = vt(n, e);
                      16 & t[Z] || (t[Z] |= 32);
                    })(t, n.index))
                : 3 & n.type &&
                  ((r = (function IM(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, n.value || "", r) : o),
                  i.setProperty(l, r, o));
            })(te(), be(), r, e, n, r[X], t, !1),
          rt
        );
      }
      function qc(e, n, t, r, o) {
        const s = o ? "class" : "style";
        Uc(e, t, n.inputs[s], s, r);
      }
      function M(e, n, t, r) {
        const o = E(),
          i = te(),
          s = Ce + e,
          a = o[X],
          l = i.firstCreatePass
            ? (function _I(e, n, t, r, o, i) {
                const s = n.consts,
                  l = vo(n, e, 2, r, nr(s, o));
                return (
                  Vc(n, t, l, nr(s, i)),
                  null !== l.attrs && Sa(l, l.attrs, !1),
                  null !== l.mergedAttrs && Sa(l, l.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, l),
                  l
                );
              })(s, i, o, n, t, r)
            : i.data[s],
          u = (o[s] = oc(
            a,
            n,
            (function RE() {
              return W.lFrame.currentNamespace;
            })()
          )),
          c = Ks(l);
        return (
          dn(l, !0),
          bg(a, u, l),
          32 != (32 & l.flags) && da(i, o, u, l),
          0 ===
            (function gE() {
              return W.lFrame.elementDepthCount;
            })() && tt(u, o),
          (function mE() {
            W.lFrame.elementDepthCount++;
          })(),
          c && (Pc(i, o, l), Fc(i, l, o)),
          null !== r && kc(o, l),
          M
        );
      }
      function O() {
        let e = Ye();
        Iu()
          ? (function Au() {
              W.lFrame.isParent = !1;
            })()
          : ((e = e.parent), dn(e, !1));
        const n = e;
        !(function yE() {
          W.lFrame.elementDepthCount--;
        })();
        const t = te();
        return (
          t.firstCreatePass && (Qs(t, e), wu(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function PE(e) {
              return 0 != (8 & e.flags);
            })(n) &&
            qc(t, n, E(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function kE(e) {
              return 0 != (16 & e.flags);
            })(n) &&
            qc(t, n, E(), n.stylesWithoutHost, !1),
          O
        );
      }
      function P(e, n, t, r) {
        return M(e, n, t, r), O(), P;
      }
      function Ni(e) {
        return !!e && "function" == typeof e.then;
      }
      const Yc = function Gm(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function de(e, n, t, r) {
        const o = E(),
          i = te(),
          s = Ye();
        return (
          (function qm(e, n, t, r, o, i, s) {
            const a = Ks(r),
              u = e.firstCreatePass && Sm(e),
              c = n[Ie],
              d = Em(n);
            let f = !0;
            if (3 & r.type || s) {
              const y = Rt(r, n),
                D = s ? s(y) : y,
                b = d.length,
                A = s ? (V) => s(Ze(V[r.index])) : r.index;
              let _ = null;
              if (
                (!s &&
                  a &&
                  (_ = (function wI(e, n, t, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === t && o[i + 1] === r) {
                          const a = n[Yr],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, n, o, r.index)),
                null !== _)
              )
                ((_.__ngLastListenerFn__ || _).__ngNextListenerFn__ = i),
                  (_.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = Zm(r, n, c, i, !1);
                const V = t.listen(D, o, i);
                d.push(i, V), u && u.push(o, A, b, b + 1);
              }
            } else i = Zm(r, n, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const y = p.length;
              if (y)
                for (let D = 0; D < y; D += 2) {
                  const ie = n[p[D]][p[D + 1]].subscribe(i),
                    Ne = d.length;
                  d.push(i, ie), u && u.push(o, r.index, Ne, -(Ne + 1));
                }
            }
          })(i, o, o[X], s, e, n, r),
          de
        );
      }
      function Km(e, n, t, r) {
        try {
          return jt(6, n, t), !1 !== t(r);
        } catch (o) {
          return Im(e, o), !1;
        } finally {
          jt(7, n, t);
        }
      }
      function Zm(e, n, t, r, o) {
        return function i(s) {
          if (s === Function) return r;
          ba(e.componentOffset > -1 ? vt(e.index, n) : n);
          let l = Km(n, t, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = Km(n, t, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Ta(e = 1) {
        return (function SE(e) {
          return (W.lFrame.contextLView = (function ME(e, n) {
            for (; e > 0; ) (n = n[Qr]), e--;
            return n;
          })(e, W.lFrame.contextLView))[Ie];
        })(e);
      }
      function xa(e, n) {
        return (e << 17) | (n << 2);
      }
      function or(e) {
        return (e >> 17) & 32767;
      }
      function Xc(e) {
        return 2 | e;
      }
      function Ar(e) {
        return (131068 & e) >> 2;
      }
      function Jc(e, n) {
        return (-131069 & e) | (n << 2);
      }
      function ed(e) {
        return 1 | e;
      }
      function iy(e, n, t, r, o) {
        const i = e[t + 1],
          s = null === n;
        let a = r ? or(i) : Ar(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = e[a + 1];
          RI(e[a], n) && ((l = !0), (e[a + 1] = r ? ed(c) : Xc(c))),
            (a = r ? or(c) : Ar(c));
        }
        l && (e[t + 1] = r ? Xc(i) : ed(i));
      }
      function RI(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || "string" != typeof n) && lo(e, n) >= 0)
        );
      }
      function Ra(e, n) {
        return (
          (function Xt(e, n, t, r) {
            const o = E(),
              i = te(),
              s = (function Fn(e) {
                const n = W.lFrame,
                  t = n.bindingIndex;
                return (n.bindingIndex = n.bindingIndex + e), t;
              })(2);
            i.firstUpdatePass &&
              (function py(e, n, t, r) {
                const o = e.data;
                if (null === o[t + 1]) {
                  const i = o[dt()],
                    s = (function hy(e, n) {
                      return n >= e.expandoStartIndex;
                    })(e, t);
                  (function vy(e, n) {
                    return 0 != (e.flags & (n ? 8 : 16));
                  })(i, r) &&
                    null === n &&
                    !s &&
                    (n = !1),
                    (n = (function jI(e, n, t, r) {
                      const o = (function xu(e) {
                        const n = W.lFrame.currentDirectiveIndex;
                        return -1 === n ? null : e[n];
                      })(e);
                      let i = r ? n.residualClasses : n.residualStyles;
                      if (null === o)
                        0 === (r ? n.classBindings : n.styleBindings) &&
                          ((t = Oi((t = td(null, e, n, t, r)), n.attrs, r)),
                          (i = null));
                      else {
                        const s = n.directiveStylingLast;
                        if (-1 === s || e[s] !== o)
                          if (((t = td(o, e, n, t, r)), null === i)) {
                            let l = (function $I(e, n, t) {
                              const r = t ? n.classBindings : n.styleBindings;
                              if (0 !== Ar(r)) return e[or(r)];
                            })(e, n, r);
                            void 0 !== l &&
                              Array.isArray(l) &&
                              ((l = td(null, e, n, l[1], r)),
                              (l = Oi(l, n.attrs, r)),
                              (function HI(e, n, t, r) {
                                e[or(t ? n.classBindings : n.styleBindings)] =
                                  r;
                              })(e, n, r, l));
                          } else
                            i = (function UI(e, n, t) {
                              let r;
                              const o = n.directiveEnd;
                              for (
                                let i = 1 + n.directiveStylingLast;
                                i < o;
                                i++
                              )
                                r = Oi(r, e[i].hostAttrs, t);
                              return Oi(r, n.attrs, t);
                            })(e, n, r);
                      }
                      return (
                        void 0 !== i &&
                          (r
                            ? (n.residualClasses = i)
                            : (n.residualStyles = i)),
                        t
                      );
                    })(o, i, n, r)),
                    (function TI(e, n, t, r, o, i) {
                      let s = i ? n.classBindings : n.styleBindings,
                        a = or(s),
                        l = Ar(s);
                      e[r] = t;
                      let c,
                        u = !1;
                      if (
                        (Array.isArray(t)
                          ? ((c = t[1]),
                            (null === c || lo(t, c) > 0) && (u = !0))
                          : (c = t),
                        o)
                      )
                        if (0 !== l) {
                          const f = or(e[a + 1]);
                          (e[r + 1] = xa(f, a)),
                            0 !== f && (e[f + 1] = Jc(e[f + 1], r)),
                            (e[a + 1] = (function II(e, n) {
                              return (131071 & e) | (n << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = xa(a, 0)),
                            0 !== a && (e[a + 1] = Jc(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = xa(l, 0)),
                          0 === a ? (a = r) : (e[l + 1] = Jc(e[l + 1], r)),
                          (l = r);
                      u && (e[r + 1] = Xc(e[r + 1])),
                        iy(e, c, r, !0),
                        iy(e, c, r, !1),
                        (function xI(e, n, t, r, o) {
                          const i = o ? e.residualClasses : e.residualStyles;
                          null != i &&
                            "string" == typeof n &&
                            lo(i, n) >= 0 &&
                            (t[r + 1] = ed(t[r + 1]));
                        })(n, c, e, r, i),
                        (s = xa(a, l)),
                        i ? (n.classBindings = s) : (n.styleBindings = s);
                    })(o, i, n, t, s, r);
                }
              })(i, e, s, r),
              n !== q &&
                nt(o, s, n) &&
                (function my(e, n, t, r, o, i, s, a) {
                  if (!(3 & n.type)) return;
                  const l = e.data,
                    u = l[a + 1],
                    c = (function AI(e) {
                      return 1 == (1 & e);
                    })(u)
                      ? yy(l, n, t, o, Ar(u), s)
                      : void 0;
                  Na(c) ||
                    (Na(i) ||
                      ((function MI(e) {
                        return 2 == (2 & e);
                      })(u) &&
                        (i = yy(l, null, t, o, a, s))),
                    (function HS(e, n, t, r, o) {
                      if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
                      else {
                        let i = -1 === r.indexOf("-") ? void 0 : Dt.DashCase;
                        null == o
                          ? e.removeStyle(t, r, i)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (i |= Dt.Important)),
                            e.setStyle(t, r, o, i));
                      }
                    })(r, s, Zs(dt(), t), o, i));
                })(
                  i,
                  i.data[dt()],
                  o,
                  o[X],
                  e,
                  (o[s + 1] = (function qI(e, n) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof n
                          ? (e += n)
                          : "object" == typeof e && (e = me(rr(e)))),
                      e
                    );
                  })(n, t)),
                  r,
                  s
                );
          })(e, n, null, !0),
          Ra
        );
      }
      function td(e, n, t, r, o) {
        let i = null;
        const s = t.directiveEnd;
        let a = t.directiveStylingLast;
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((i = n[a]), (r = Oi(r, i.hostAttrs, o)), i !== e);

        )
          a++;
        return null !== e && (t.directiveStylingLast = a), r;
      }
      function Oi(e, n, t) {
        const r = t ? 1 : 2;
        let o = -1;
        if (null !== n)
          for (let i = 0; i < n.length; i++) {
            const s = n[i];
            "number" == typeof s
              ? (o = s)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                Nt(e, s, !!t || n[++i]));
          }
        return void 0 === e ? null : e;
      }
      function yy(e, n, t, r, o, i) {
        const s = null === n;
        let a;
        for (; o > 0; ) {
          const l = e[o],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = t[o + 1];
          f === q && (f = d ? re : void 0);
          let h = d ? zu(f, r) : c === r ? f : void 0;
          if ((u && !Na(h) && (h = zu(l, r)), Na(h) && ((a = h), s))) return a;
          const p = e[o + 1];
          o = s ? or(p) : Ar(p);
        }
        if (null !== n) {
          let l = i ? n.residualClasses : n.residualStyles;
          null != l && (a = zu(l, r));
        }
        return a;
      }
      function Na(e) {
        return void 0 !== e;
      }
      function ge(e, n = "") {
        const t = E(),
          r = te(),
          o = e + Ce,
          i = r.firstCreatePass ? vo(r, o, 1, n, null) : r.data[o],
          s = (t[o] = (function rc(e, n) {
            return e.createText(n);
          })(t[X], n));
        da(r, t, s, i), dn(i, !1);
      }
      function Ut(e) {
        return Bn("", e, ""), Ut;
      }
      function Bn(e, n, t) {
        const r = E(),
          o = (function _o(e, n, t, r) {
            return nt(e, to(), t) ? n + G(t) + r : q;
          })(r, e, n, t);
        return (
          o !== q &&
            (function Vn(e, n, t) {
              const r = Zs(n, e);
              !(function ug(e, n, t) {
                e.setValue(n, t);
              })(e[X], r, t);
            })(r, dt(), o),
          Bn
        );
      }
      const Tr = void 0;
      var hA = [
        "en",
        [["a", "p"], ["AM", "PM"], Tr],
        [["AM", "PM"], Tr, Tr],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Tr,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Tr,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Tr, "{1} 'at' {0}", Tr],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function fA(e) {
          const t = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === t && 0 === r ? 1 : 5;
        },
      ];
      let To = {};
      function ft(e) {
        const n = (function pA(e) {
          return e.toLowerCase().replace(/_/g, "-");
        })(e);
        let t = By(n);
        if (t) return t;
        const r = n.split("-")[0];
        if (((t = By(r)), t)) return t;
        if ("en" === r) return hA;
        throw new S(701, !1);
      }
      function By(e) {
        return (
          e in To ||
            (To[e] =
              _e.ng &&
              _e.ng.common &&
              _e.ng.common.locales &&
              _e.ng.common.locales[e]),
          To[e]
        );
      }
      var T = (() => (
        ((T = T || {})[(T.LocaleId = 0)] = "LocaleId"),
        (T[(T.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (T[(T.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (T[(T.DaysFormat = 3)] = "DaysFormat"),
        (T[(T.DaysStandalone = 4)] = "DaysStandalone"),
        (T[(T.MonthsFormat = 5)] = "MonthsFormat"),
        (T[(T.MonthsStandalone = 6)] = "MonthsStandalone"),
        (T[(T.Eras = 7)] = "Eras"),
        (T[(T.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (T[(T.WeekendRange = 9)] = "WeekendRange"),
        (T[(T.DateFormat = 10)] = "DateFormat"),
        (T[(T.TimeFormat = 11)] = "TimeFormat"),
        (T[(T.DateTimeFormat = 12)] = "DateTimeFormat"),
        (T[(T.NumberSymbols = 13)] = "NumberSymbols"),
        (T[(T.NumberFormats = 14)] = "NumberFormats"),
        (T[(T.CurrencyCode = 15)] = "CurrencyCode"),
        (T[(T.CurrencySymbol = 16)] = "CurrencySymbol"),
        (T[(T.CurrencyName = 17)] = "CurrencyName"),
        (T[(T.Currencies = 18)] = "Currencies"),
        (T[(T.Directionality = 19)] = "Directionality"),
        (T[(T.PluralCase = 20)] = "PluralCase"),
        (T[(T.ExtraData = 21)] = "ExtraData"),
        T
      ))();
      const xo = "en-US";
      let jy = xo;
      function od(e, n, t, r, o) {
        if (((e = j(e)), Array.isArray(e)))
          for (let i = 0; i < e.length; i++) od(e[i], n, t, r, o);
        else {
          const i = te(),
            s = E();
          let a = Mr(e) ? e : j(e.provide),
            l = Wg(e);
          const u = Ye(),
            c = 1048575 & u.providerIndexes,
            d = u.directiveStart,
            f = u.providerIndexes >> 20;
          if (Mr(e) || !e.multi) {
            const h = new di(l, o, C),
              p = sd(a, n, o ? c : c + f, d);
            -1 === p
              ? (ju(ra(u, s), i, a),
                id(i, e, n.length),
                n.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                t.push(h),
                s.push(h))
              : ((t[p] = h), (s[p] = h));
          } else {
            const h = sd(a, n, c + f, d),
              p = sd(a, n, c, c + f),
              D = p >= 0 && t[p];
            if ((o && !D) || (!o && !(h >= 0 && t[h]))) {
              ju(ra(u, s), i, a);
              const b = (function dT(e, n, t, r, o) {
                const i = new di(e, t, C);
                return (
                  (i.multi = []),
                  (i.index = n),
                  (i.componentProviders = 0),
                  dv(i, o, r && !t),
                  i
                );
              })(o ? cT : uT, t.length, o, r, l);
              !o && D && (t[p].providerFactory = b),
                id(i, e, n.length, 0),
                n.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                o && (u.providerIndexes += 1048576),
                t.push(b),
                s.push(b);
            } else id(i, e, h > -1 ? h : p, dv(t[o ? p : h], l, !o && r));
            !o && r && D && t[p].componentProviders++;
          }
        }
      }
      function id(e, n, t, r) {
        const o = Mr(n),
          i = (function _0(e) {
            return !!e.useClass;
          })(n);
        if (o || i) {
          const l = (i ? j(n.useClass) : n).prototype.ngOnDestroy;
          if (l) {
            const u = e.destroyHooks || (e.destroyHooks = []);
            if (!o && n.multi) {
              const c = u.indexOf(t);
              -1 === c ? u.push(t, [r, l]) : u[c + 1].push(r, l);
            } else u.push(t, l);
          }
        }
      }
      function dv(e, n, t) {
        return t && e.componentProviders++, e.multi.push(n) - 1;
      }
      function sd(e, n, t, r) {
        for (let o = t; o < r; o++) if (n[o] === e) return o;
        return -1;
      }
      function uT(e, n, t, r) {
        return ad(this.multi, []);
      }
      function cT(e, n, t, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = br(t, t[x], this.providerFactory.index, r);
          (i = a.slice(0, s)), ad(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), ad(o, i);
        return i;
      }
      function ad(e, n) {
        for (let t = 0; t < e.length; t++) n.push((0, e[t])());
        return n;
      }
      function we(e, n = []) {
        return (t) => {
          t.providersResolver = (r, o) =>
            (function lT(e, n, t) {
              const r = te();
              if (r.firstCreatePass) {
                const o = Yt(e);
                od(t, r.data, r.blueprint, o, !0),
                  od(n, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(e) : e, n);
        };
      }
      class Ro {}
      class fv {}
      class hv extends Ro {
        constructor(n, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Am(this));
          const r = Tt(n);
          (this._bootstrapComponents = Ln(r.bootstrap)),
            (this._r3Injector = am(
              n,
              t,
              [
                { provide: Ro, useValue: this },
                { provide: Mi, useValue: this.componentFactoryResolver },
              ],
              me(n),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class ld extends fv {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new hv(this.moduleType, n);
        }
      }
      class hT extends Ro {
        constructor(n, t, r) {
          super(),
            (this.componentFactoryResolver = new Am(this)),
            (this.instance = null);
          const o = new Gg(
            [
              ...n,
              { provide: Ro, useValue: this },
              { provide: Mi, useValue: this.componentFactoryResolver },
            ],
            t || va(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      function La(e, n, t = null) {
        return new hT(e, n, t).injector;
      }
      let pT = (() => {
        class e {
          constructor(t) {
            (this._injector = t), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(t) {
            if (!t.standalone) return null;
            if (!this.cachedInjectors.has(t.id)) {
              const r = $g(0, t.type),
                o =
                  r.length > 0
                    ? La([r], this._injector, `Standalone[${t.type.name}]`)
                    : null;
              this.cachedInjectors.set(t.id, o);
            }
            return this.cachedInjectors.get(t.id);
          }
          ngOnDestroy() {
            try {
              for (const t of this.cachedInjectors.values())
                null !== t && t.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = k({
            token: e,
            providedIn: "environment",
            factory: () => new e(N(hn)),
          })),
          e
        );
      })();
      function pv(e) {
        e.getStandaloneInjector = (n) =>
          n.get(pT).getOrCreateStandaloneInjector(e);
      }
      function cd(e, n, t) {
        const r = ct() + e,
          o = E();
        return o[r] === q
          ? mn(o, r, t ? n.call(t) : n())
          : (function Ri(e, n) {
              return e[n];
            })(o, r);
      }
      function Bi(e, n) {
        const t = e[n];
        return t === q ? void 0 : t;
      }
      function wv(e, n, t, r, o, i, s) {
        const a = n + t;
        return (function Ir(e, n, t, r) {
          const o = nt(e, n, t);
          return nt(e, n + 1, r) || o;
        })(e, a, o, i)
          ? mn(e, a + 2, s ? r.call(s, o, i) : r(o, i))
          : Bi(e, a + 2);
      }
      function _n(e, n) {
        const t = te();
        let r;
        const o = e + Ce;
        t.firstCreatePass
          ? ((r = (function NT(e, n) {
              if (n)
                for (let t = n.length - 1; t >= 0; t--) {
                  const r = n[t];
                  if (e === r.name) return r;
                }
            })(n, t.pipeRegistry)),
            (t.data[o] = r),
            r.onDestroy &&
              (t.destroyHooks ?? (t.destroyHooks = [])).push(o, r.onDestroy))
          : (r = t.data[o]);
        const i = r.factory || (r.factory = Cr(r.type)),
          s = Vt(C);
        try {
          const a = na(!1),
            l = i();
          return (
            na(a),
            (function vI(e, n, t, r) {
              t >= e.data.length &&
                ((e.data[t] = null), (e.blueprint[t] = null)),
                (n[t] = r);
            })(t, E(), o, l),
            l
          );
        } finally {
          Vt(s);
        }
      }
      function jn(e, n, t) {
        const r = e + Ce,
          o = E(),
          i = eo(o, r);
        return ji(o, r)
          ? (function Cv(e, n, t, r, o, i) {
              const s = n + t;
              return nt(e, s, o)
                ? mn(e, s + 1, i ? r.call(i, o) : r(o))
                : Bi(e, s + 1);
            })(o, ct(), n, i.transform, t, i)
          : i.transform(t);
      }
      function ji(e, n) {
        return e[x].data[n].pure;
      }
      function dd(e) {
        return (n) => {
          setTimeout(e, void 0, n);
        };
      }
      const he = class kT extends Et {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, t, r) {
          let o = n,
            i = t || (() => null),
            s = r;
          if (n && "object" == typeof n) {
            const l = n;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = dd(i)), o && (o = dd(o)), s && (s = dd(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return n instanceof Ue && n.add(a), a;
        }
      };
      function LT() {
        return this._results[Symbol.iterator]();
      }
      class fd {
        get changes() {
          return this._changes || (this._changes = new he());
        }
        constructor(n = !1) {
          (this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const t = fd.prototype;
          t[Symbol.iterator] || (t[Symbol.iterator] = LT);
        }
        get(n) {
          return this._results[n];
        }
        map(n) {
          return this._results.map(n);
        }
        filter(n) {
          return this._results.filter(n);
        }
        find(n) {
          return this._results.find(n);
        }
        reduce(n, t) {
          return this._results.reduce(n, t);
        }
        forEach(n) {
          this._results.forEach(n);
        }
        some(n) {
          return this._results.some(n);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(n, t) {
          const r = this;
          r.dirty = !1;
          const o = (function $t(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(n);
          (this._changesDetected = !(function WE(e, n, t) {
            if (e.length !== n.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let o = e[r],
                i = n[r];
              if ((t && ((o = t(o)), (i = t(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, t)) &&
            ((r._results = o),
            (r.length = o.length),
            (r.last = o[this.length - 1]),
            (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let $n = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = jT), e;
      })();
      const VT = $n,
        BT = class extends VT {
          constructor(n, t, r) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = r);
          }
          createEmbeddedView(n, t) {
            const r = this._declarationTContainer.tView,
              o = _a(
                this._declarationLView,
                r,
                n,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                t || null
              );
            o[ai] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[cn];
            return (
              null !== s && (o[cn] = s.createEmbeddedView(r)),
              Oc(r, o, n),
              new Ti(o)
            );
          }
        };
      function jT() {
        return Va(Ye(), E());
      }
      function Va(e, n) {
        return 4 & e.type ? new BT(n, e, po(e, n)) : null;
      }
      let en = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = $T), e;
      })();
      function $T() {
        return Tv(Ye(), E());
      }
      const HT = en,
        Iv = class extends HT {
          constructor(n, t, r) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = r);
          }
          get element() {
            return po(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new ro(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = Bu(this._hostTNode, this._hostLView);
            if (Tp(n)) {
              const t = ta(n, this._hostLView),
                r = ea(n);
              return new ro(t[x].data[r + 8], t);
            }
            return new ro(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const t = Av(this._lContainer);
            return (null !== t && t[n]) || null;
          }
          get length() {
            return this._lContainer.length - ut;
          }
          createEmbeddedView(n, t, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = n.createEmbeddedView(t || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(n, t, r, o, i) {
            const s =
              n &&
              !(function pi(e) {
                return "function" == typeof e;
              })(n);
            let a;
            if (s) a = t;
            else {
              const d = t || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? n : new xi(le(n)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(hn, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(n, t) {
            const r = n._lView,
              o = r[x];
            if (
              (function pE(e) {
                return Zt(e[Se]);
              })(r)
            ) {
              const c = this.indexOf(n);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[Se],
                  f = new Iv(d, d[Je], d[Se]);
                f.detach(f.indexOf(n));
              }
            }
            const i = this._adjustIndex(t),
              s = this._lContainer;
            !(function FS(e, n, t, r) {
              const o = ut + r,
                i = t.length;
              r > 0 && (t[o - 1][Kt] = n),
                r < i - ut
                  ? ((n[Kt] = t[o]), $p(t, ut + r, n))
                  : (t.push(n), (n[Kt] = null)),
                (n[Se] = t);
              const s = n[ai];
              null !== s &&
                t !== s &&
                (function PS(e, n) {
                  const t = e[Jr];
                  n[et] !== n[Se][Se][et] && (e[rp] = !0),
                    null === t ? (e[Jr] = [n]) : t.push(n);
                })(s, n);
              const a = n[cn];
              null !== a && a.insertView(e), (n[Z] |= 64);
            })(o, r, s, i);
            const a = lc(i, s),
              l = r[X],
              u = ca(l, s[Ws]);
            return (
              null !== u &&
                (function RS(e, n, t, r, o, i) {
                  (r[Nn] = o), (r[Je] = n), wi(e, r, t, 1, o, i);
                })(o, s[Je], l, r, u, a),
              n.attachToViewContainerRef(),
              $p(hd(s), i, n),
              n
            );
          }
          move(n, t) {
            return this.insert(n, t);
          }
          indexOf(n) {
            const t = Av(this._lContainer);
            return null !== t ? t.indexOf(n) : -1;
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              r = ic(this._lContainer, t);
            r && (sa(hd(this._lContainer), t), dg(r[x], r));
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              r = ic(this._lContainer, t);
            return r && null != sa(hd(this._lContainer), t) ? new Ti(r) : null;
          }
          _adjustIndex(n, t = 0) {
            return n ?? this.length + t;
          }
        };
      function Av(e) {
        return e[qs];
      }
      function hd(e) {
        return e[qs] || (e[qs] = []);
      }
      function Tv(e, n) {
        let t;
        const r = n[e.index];
        if (Zt(r)) t = r;
        else {
          let o;
          if (8 & e.type) o = Ze(r);
          else {
            const i = n[X];
            o = i.createComment("");
            const s = Rt(e, n);
            Sr(
              i,
              ca(i, s),
              o,
              (function BS(e, n) {
                return e.nextSibling(n);
              })(i, s),
              !1
            );
          }
          (n[e.index] = t = bm(r, n, o, e)), wa(n, t);
        }
        return new Iv(t, e, n);
      }
      class pd {
        constructor(n) {
          (this.queryList = n), (this.matches = null);
        }
        clone() {
          return new pd(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class gd {
        constructor(n = []) {
          this.queries = n;
        }
        createEmbeddedView(n) {
          const t = n.queries;
          if (null !== t) {
            const r =
                null !== n.contentQueries ? n.contentQueries[0] : t.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = t.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new gd(o);
          }
          return null;
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        dirtyQueriesWithMatches(n) {
          for (let t = 0; t < this.queries.length; t++)
            null !== Lv(n, t).matches && this.queries[t].setDirty();
        }
      }
      class xv {
        constructor(n, t, r = null) {
          (this.predicate = n), (this.flags = t), (this.read = r);
        }
      }
      class md {
        constructor(n = []) {
          this.queries = n;
        }
        elementStart(n, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(n, t);
        }
        elementEnd(n) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(n);
        }
        embeddedTView(n) {
          let t = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== t ? t.length : 0,
              i = this.getByIndex(r).embeddedTView(n, o);
            i &&
              ((i.indexInDeclarationView = r),
              null !== t ? t.push(i) : (t = [i]));
          }
          return null !== t ? new md(t) : null;
        }
        template(n, t) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(n, t);
        }
        getByIndex(n) {
          return this.queries[n];
        }
        get length() {
          return this.queries.length;
        }
        track(n) {
          this.queries.push(n);
        }
      }
      class yd {
        constructor(n, t = -1) {
          (this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t);
        }
        elementStart(n, t) {
          this.isApplyingToNode(t) && this.matchTNode(n, t);
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index &&
            (this._appliesToNextNode = !1);
        }
        template(n, t) {
          this.elementStart(n, t);
        }
        embeddedTView(n, t) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-n.index, t),
              new yd(this.metadata))
            : null;
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex;
            let r = n.parent;
            for (; null !== r && 8 & r.type && r.index !== t; ) r = r.parent;
            return t === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(n, t) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(n, t, UT(t, i)),
                this.matchTNodeWithReadOption(n, t, oa(t, n, i, !1, !1));
            }
          else
            r === $n
              ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1)
              : this.matchTNodeWithReadOption(n, t, oa(t, n, r, !1, !1));
        }
        matchTNodeWithReadOption(n, t, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === Ct || o === en || (o === $n && 4 & t.type))
                this.addMatch(t.index, -2);
              else {
                const i = oa(t, n, o, !1, !1);
                null !== i && this.addMatch(t.index, i);
              }
            else this.addMatch(t.index, r);
          }
        }
        addMatch(n, t) {
          null === this.matches
            ? (this.matches = [n, t])
            : this.matches.push(n, t);
        }
      }
      function UT(e, n) {
        const t = e.localNames;
        if (null !== t)
          for (let r = 0; r < t.length; r += 2) if (t[r] === n) return t[r + 1];
        return null;
      }
      function GT(e, n, t, r) {
        return -1 === t
          ? (function zT(e, n) {
              return 11 & e.type ? po(e, n) : 4 & e.type ? Va(e, n) : null;
            })(n, e)
          : -2 === t
          ? (function WT(e, n, t) {
              return t === Ct
                ? po(n, e)
                : t === $n
                ? Va(n, e)
                : t === en
                ? Tv(n, e)
                : void 0;
            })(e, n, r)
          : br(e, e[x], t, n);
      }
      function Rv(e, n, t, r) {
        const o = n[cn].queries[r];
        if (null === o.matches) {
          const i = e.data,
            s = t.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const u = s[l];
            a.push(u < 0 ? null : GT(n, i[u], s[l + 1], t.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function vd(e, n, t, r) {
        const o = e.queries.getByIndex(t),
          i = o.matches;
        if (null !== i) {
          const s = Rv(e, n, o, t);
          for (let a = 0; a < i.length; a += 2) {
            const l = i[a];
            if (l > 0) r.push(s[a / 2]);
            else {
              const u = i[a + 1],
                c = n[-l];
              for (let d = ut; d < c.length; d++) {
                const f = c[d];
                f[ai] === f[Se] && vd(f[x], f, u, r);
              }
              if (null !== c[Jr]) {
                const d = c[Jr];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  vd(h[x], h, u, r);
                }
              }
            }
          }
        }
        return r;
      }
      function Nv(e) {
        const n = E(),
          t = te(),
          r = Dp();
        Ru(r + 1);
        const o = Lv(t, r);
        if (
          e.dirty &&
          (function hE(e) {
            return 4 == (4 & e[Z]);
          })(n) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) e.reset([]);
          else {
            const i = o.crossesNgTemplate ? vd(t, n, r, []) : Rv(t, n, o, r);
            e.reset(i, R0), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Ov(e, n, t, r) {
        const o = te();
        if (o.firstCreatePass) {
          const i = Ye();
          (function kv(e, n, t) {
            null === e.queries && (e.queries = new md()),
              e.queries.track(new yd(n, t));
          })(o, new xv(n, t, r), i.index),
            (function ZT(e, n) {
              const t = e.contentQueries || (e.contentQueries = []);
              n !== (t.length ? t[t.length - 1] : -1) &&
                t.push(e.queries.length - 1, n);
            })(o, e),
            2 == (2 & t) && (o.staticContentQueries = !0);
        }
        !(function Pv(e, n, t) {
          const r = new fd(4 == (4 & t));
          vm(e, n, r, r.destroy),
            null === n[cn] && (n[cn] = new gd()),
            n[cn].queries.push(new pd(r));
        })(o, E(), t);
      }
      function Lv(e, n) {
        return e.queries.getByIndex(n);
      }
      function ja(...e) {}
      const $a = new F("Application Initializer");
      let Ha = (() => {
        class e {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = ja),
              (this.reject = ja),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (Ni(i)) t.push(i);
                else if (Yc(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  t.push(s);
                }
              }
            Promise.all(t)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === t.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N($a, 8));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Hi = new F("AppId", {
        providedIn: "root",
        factory: function tD() {
          return `${Ed()}${Ed()}${Ed()}`;
        },
      });
      function Ed() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const nD = new F("Platform Initializer"),
        Sd = new F("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        });
      let m1 = (() => {
        class e {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Hn = new F("LocaleId", {
        providedIn: "root",
        factory: () =>
          Q(Hn, $.Optional | $.SkipSelf) ||
          (function y1() {
            return (typeof $localize < "u" && $localize.locale) || xo;
          })(),
      });
      class D1 {
        constructor(n, t) {
          (this.ngModuleFactory = n), (this.componentFactories = t);
        }
      }
      let rD = (() => {
        class e {
          compileModuleSync(t) {
            return new ld(t);
          }
          compileModuleAsync(t) {
            return Promise.resolve(this.compileModuleSync(t));
          }
          compileModuleAndAllComponentsSync(t) {
            const r = this.compileModuleSync(t),
              i = Ln(Tt(t).declarations).reduce((s, a) => {
                const l = le(a);
                return l && s.push(new xi(l)), s;
              }, []);
            return new D1(r, i);
          }
          compileModuleAndAllComponentsAsync(t) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(t));
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const w1 = (() => Promise.resolve(0))();
      function Md(e) {
        typeof Zone > "u"
          ? w1.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class Ae {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new he(!1)),
            (this.onMicrotaskEmpty = new he(!1)),
            (this.onStable = new he(!1)),
            (this.onError = new he(!1)),
            typeof Zone > "u")
          )
            throw new S(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && t),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function b1() {
              let e = _e.requestAnimationFrame,
                n = _e.cancelAnimationFrame;
              if (typeof Zone < "u" && e && n) {
                const t = e[Zone.__symbol__("OriginalDelegate")];
                t && (e = t);
                const r = n[Zone.__symbol__("OriginalDelegate")];
                r && (n = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function M1(e) {
              const n = () => {
                !(function S1(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(_e, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ad(e),
                                (e.isCheckStableRunning = !0),
                                Id(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ad(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (t, r, o, i, s, a) => {
                  try {
                    return sD(e), t.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      aD(e);
                  }
                },
                onInvoke: (t, r, o, i, s, a, l) => {
                  try {
                    return sD(e), t.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), aD(e);
                  }
                },
                onHasTask: (t, r, o, i) => {
                  t.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ad(e),
                          Id(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (t, r, o, i) => (
                  t.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Ae.isInAngularZone()) throw new S(909, !1);
        }
        static assertNotInAngularZone() {
          if (Ae.isInAngularZone()) throw new S(909, !1);
        }
        run(n, t, r) {
          return this._inner.run(n, t, r);
        }
        runTask(n, t, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, n, E1, ja, ja);
          try {
            return i.runTask(s, t, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(n, t, r) {
          return this._inner.runGuarded(n, t, r);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const E1 = {};
      function Id(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ad(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function sD(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function aD(e) {
        e._nesting--, Id(e);
      }
      class I1 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new he()),
            (this.onMicrotaskEmpty = new he()),
            (this.onStable = new he()),
            (this.onError = new he());
        }
        run(n, t, r) {
          return n.apply(t, r);
        }
        runGuarded(n, t, r) {
          return n.apply(t, r);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, t, r, o) {
          return n.apply(t, r);
        }
      }
      const lD = new F(""),
        Ua = new F("");
      let Rd,
        Td = (() => {
          class e {
            constructor(t, r, o) {
              (this._ngZone = t),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Rd ||
                  ((function A1(e) {
                    Rd = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ae.assertNotInAngularZone(),
                        Md(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Md(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(t) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: t, timeoutId: i, updateCb: o });
            }
            whenStable(t, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(t, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(t) {
              this.registry.registerApplication(t, this);
            }
            unregisterApplication(t) {
              this.registry.unregisterApplication(t);
            }
            findProviders(t, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(Ae), N(xd), N(Ua));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        xd = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(t, r) {
              this._applications.set(t, r);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, r = !0) {
              return Rd?.findTestabilityInTree(this, t, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const Un = !1;
      let ir = null;
      const uD = new F("AllowMultipleToken"),
        Nd = new F("PlatformDestroyListeners"),
        cD = new F("appBootstrapListener");
      class dD {
        constructor(n, t) {
          (this.name = n), (this.token = t);
        }
      }
      function hD(e, n, t = []) {
        const r = `Platform: ${n}`,
          o = new F(r);
        return (i = []) => {
          let s = Od();
          if (!s || s.injector.get(uD, !1)) {
            const a = [...t, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function R1(e) {
                  if (ir && !ir.get(uD, !1)) throw new S(400, !1);
                  ir = e;
                  const n = e.get(gD);
                  (function fD(e) {
                    const n = e.get(nD, null);
                    n && n.forEach((t) => t());
                  })(e);
                })(
                  (function pD(e = [], n) {
                    return pn.create({
                      name: n,
                      providers: [
                        { provide: Cc, useValue: "platform" },
                        { provide: Nd, useValue: new Set([() => (ir = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function O1(e) {
            const n = Od();
            if (!n) throw new S(401, !1);
            return n;
          })();
        };
      }
      function Od() {
        return ir?.get(gD) ?? null;
      }
      let gD = (() => {
        class e {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, r) {
            const o = (function yD(e, n) {
                let t;
                return (
                  (t =
                    "noop" === e
                      ? new I1()
                      : ("zone.js" === e ? void 0 : e) || new Ae(n)),
                  t
                );
              })(
                r?.ngZone,
                (function mD(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: Ae, useValue: o }];
            return o.run(() => {
              const s = pn.create({
                  providers: i,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                a = t.create(s),
                l = a.injector.get(go, null);
              if (!l) throw new S(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const u = o.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    Ga(this._modules, a), u.unsubscribe();
                  });
                }),
                (function vD(e, n, t) {
                  try {
                    const r = t();
                    return Ni(r)
                      ? r.catch((o) => {
                          throw (
                            (n.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (n.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const u = a.injector.get(Ha);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function $y(e) {
                          Lt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (jy = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Hn, xo) || xo),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, r = []) {
            const o = DD({}, r);
            return (function T1(e, n, t) {
              const r = new ld(t);
              return Promise.resolve(r);
            })(0, 0, t).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(t) {
            const r = t.injector.get(za);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!t.instance.ngDoBootstrap) throw new S(-403, !1);
              t.instance.ngDoBootstrap(r);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new S(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const t = this._injector.get(Nd, null);
            t && (t.forEach((r) => r()), t.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(pn));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function DD(e, n) {
        return Array.isArray(n) ? n.reduce(DD, e) : { ...e, ...n };
      }
      let za = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(t, r, o) {
            (this._zone = t),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new De((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new De((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Ae.assertNotInAngularZone(),
                      Md(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  Ae.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function Fb(...e) {
              const n = ti(e),
                t = (function Ib(e, n) {
                  return "number" == typeof lu(e) ? e.pop() : n;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? kt(r[0])
                  : qr(t)(Le(r, n))
                : an;
            })(i, s.pipe(Uh()));
          }
          bootstrap(t, r) {
            const o = t instanceof qg;
            if (!this._injector.get(Ha).done) {
              !o &&
                (function Zr(e) {
                  const n = le(e) || Xe(e) || yt(e);
                  return null !== n && n.standalone;
                })(t);
              throw new S(405, Un);
            }
            let s;
            (s = o ? t : this._injector.get(Mi).resolveComponentFactory(t)),
              this.componentTypes.push(s.componentType);
            const a = (function x1(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Ro),
              u = s.create(pn.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(lD, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Ga(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new S(101, !1);
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const r = t;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(t) {
            const r = t;
            Ga(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView), this.tick(), this.components.push(t);
            const r = this._injector.get(cD, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(t));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((t) => t()),
                  this._views.slice().forEach((t) => t.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(t) {
            return (
              this._destroyListeners.push(t),
              () => Ga(this._destroyListeners, t)
            );
          }
          destroy() {
            if (this._destroyed) throw new S(406, !1);
            const t = this._injector;
            t.destroy && !t.destroyed && t.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(Ae), N(hn), N(go));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Ga(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      let Fo = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = P1), e;
      })();
      function P1(e) {
        return (function k1(e, n, t) {
          if (ui(e) && !t) {
            const r = vt(e.index, n);
            return new Ti(r, r);
          }
          return 47 & e.type ? new Ti(n[et], n) : null;
        })(Ye(), E(), 16 == (16 & e));
      }
      class ED {
        constructor() {}
        supports(n) {
          return Ia(n);
        }
        create(n) {
          return new H1(n);
        }
      }
      const $1 = (e, n) => n;
      class H1 {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || $1);
        }
        forEachItem(n) {
          let t;
          for (t = this._itHead; null !== t; t = t._next) n(t);
        }
        forEachOperation(n) {
          let t = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; t || r; ) {
            const s = !r || (t && t.currentIndex < MD(r, o, i)) ? t : r,
              a = MD(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((t = t._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && n(s, a, l);
          }
        }
        forEachPreviousItem(n) {
          let t;
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t);
        }
        forEachAddedItem(n) {
          let t;
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t);
        }
        forEachMovedItem(n) {
          let t;
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t);
        }
        forEachRemovedItem(n) {
          let t;
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t);
        }
        forEachIdentityChange(n) {
          let t;
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t);
        }
        diff(n) {
          if ((null == n && (n = []), !Ia(n))) throw new S(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let o,
            i,
            s,
            t = this._itHead,
            r = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (i = n[a]),
                (s = this._trackByFn(a, i)),
                null !== t && Object.is(t.trackById, s)
                  ? (r && (t = this._verifyReinsertion(t, i, s, a)),
                    Object.is(t.item, i) || this._addIdentityChange(t, i))
                  : ((t = this._mismatch(t, i, s, a)), (r = !0)),
                (t = t._next);
          } else
            (o = 0),
              (function pI(e, n) {
                if (Array.isArray(e))
                  for (let t = 0; t < e.length; t++) n(e[t]);
                else {
                  const t = e[Symbol.iterator]();
                  let r;
                  for (; !(r = t.next()).done; ) n(r.value);
                }
              })(n, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (r && (t = this._verifyReinsertion(t, a, s, o)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, o)), (r = !0)),
                  (t = t._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(t), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, t, r, o) {
          let i;
          return (
            null === n ? (i = this._itTail) : ((i = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, i, o))
              : null !==
                (n =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, i, o))
              : (n = this._addAfter(new U1(t, r), i, o)),
            n
          );
        }
        _verifyReinsertion(n, t, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (n = this._reinsertAfter(i, n._prev, o))
              : n.currentIndex != o &&
                ((n.currentIndex = o), this._addToMoves(n, o)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next;
            this._addToRemovals(this._unlink(n)), (n = t);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, t, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const o = n._prevRemoved,
            i = n._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _moveAfter(n, t, r) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, r),
            this._addToMoves(n, r),
            n
          );
        }
        _addAfter(n, t, r) {
          return (
            this._insertAfter(n, t, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, t, r) {
          const o = null === t ? this._itHead : t._next;
          return (
            (n._next = o),
            (n._prev = t),
            null === o ? (this._itTail = n) : (o._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new SD()),
            this._linkedRecords.put(n),
            (n.currentIndex = r),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const t = n._prev,
            r = n._next;
          return (
            null === t ? (this._itHead = r) : (t._next = r),
            null === r ? (this._itTail = t) : (r._prev = t),
            n
          );
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new SD()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class U1 {
        constructor(n, t) {
          (this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class z1 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n));
        }
        get(n, t) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === t || t <= r.currentIndex) &&
              Object.is(r.trackById, n)
            )
              return r;
          return null;
        }
        remove(n) {
          const t = n._prevDup,
            r = n._nextDup;
          return (
            null === t ? (this._head = r) : (t._nextDup = r),
            null === r ? (this._tail = t) : (r._prevDup = t),
            null === this._head
          );
        }
      }
      class SD {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const t = n.trackById;
          let r = this.map.get(t);
          r || ((r = new z1()), this.map.set(t, r)), r.add(n);
        }
        get(n, t) {
          const o = this.map.get(n);
          return o ? o.get(n, t) : null;
        }
        remove(n) {
          const t = n.trackById;
          return this.map.get(t).remove(n) && this.map.delete(t), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function MD(e, n, t) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return t && r < t.length && (o = t[r]), r + n + o;
      }
      function AD() {
        return new Ka([new ED()]);
      }
      let Ka = (() => {
        class e {
          constructor(t) {
            this.factories = t;
          }
          static create(t, r) {
            if (null != r) {
              const o = r.factories.slice();
              t = t.concat(o);
            }
            return new e(t);
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (r) => e.create(t, r || AD()),
              deps: [[e, new yi(), new mi()]],
            };
          }
          find(t) {
            const r = this.factories.find((o) => o.supports(t));
            if (null != r) return r;
            throw new S(901, !1);
          }
        }
        return (e.ɵprov = k({ token: e, providedIn: "root", factory: AD })), e;
      })();
      const Z1 = hD(null, "core", []);
      let Y1 = (() => {
        class e {
          constructor(t) {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(za));
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = mt({})),
          e
        );
      })();
      function Po(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let Vd = null;
      function zn() {
        return Vd;
      }
      class J1 {}
      const pt = new F("DocumentToken");
      let Bd = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return (function ex() {
                return N(xD);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const tx = new F("Location Initialized");
      let xD = (() => {
        class e extends Bd {
          constructor(t) {
            super(),
              (this._doc = t),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return zn().getBaseHref(this._doc);
          }
          onPopState(t) {
            const r = zn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", t, !1),
              () => r.removeEventListener("popstate", t)
            );
          }
          onHashChange(t) {
            const r = zn().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", t, !1),
              () => r.removeEventListener("hashchange", t)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(t) {
            this._location.pathname = t;
          }
          pushState(t, r, o) {
            RD() ? this._history.pushState(t, r, o) : (this._location.hash = o);
          }
          replaceState(t, r, o) {
            RD()
              ? this._history.replaceState(t, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(t = 0) {
            this._history.go(t);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(pt));
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return (function nx() {
                return new xD(N(pt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function RD() {
        return !!window.history.pushState;
      }
      function jd(e, n) {
        if (0 == e.length) return n;
        if (0 == n.length) return e;
        let t = 0;
        return (
          e.endsWith("/") && t++,
          n.startsWith("/") && t++,
          2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
        );
      }
      function ND(e) {
        const n = e.match(/#|\?|$/),
          t = (n && n.index) || e.length;
        return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t);
      }
      function Gn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Rr = (() => {
        class e {
          historyGo(t) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return Q(FD);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const OD = new F("appBaseHref");
      let FD = (() => {
          class e extends Rr {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  Q(pt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return jd(this._baseHref, t);
            }
            path(t = !1) {
              const r =
                  this._platformLocation.pathname +
                  Gn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && t ? `${r}${o}` : r;
            }
            pushState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + Gn(i));
              this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, o, i) {
              const s = this.prepareExternalUrl(o + Gn(i));
              this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(Bd), N(OD, 8));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        rx = (() => {
          class e extends Rr {
            constructor(t, r) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(t) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(t) {
              const r = jd(this._baseHref, t);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + Gn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, r, s);
            }
            replaceState(t, r, o, i) {
              let s = this.prepareExternalUrl(o + Gn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(t = 0) {
              this._platformLocation.historyGo?.(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(Bd), N(OD, 8));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        $d = (() => {
          class e {
            constructor(t) {
              (this._subject = new he()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = t);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function sx(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, t] = e.split(/\/\/[^\/]+/);
                  return t;
                }
                return e;
              })(ND(PD(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(t = !1) {
              return this.normalize(this._locationStrategy.path(t));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(t, r = "") {
              return this.path() == this.normalize(t + Gn(r));
            }
            normalize(t) {
              return e.stripTrailingSlash(
                (function ix(e, n) {
                  if (!e || !n.startsWith(e)) return n;
                  const t = n.substring(e.length);
                  return "" === t || ["/", ";", "?", "#"].includes(t[0])
                    ? t
                    : n;
                })(this._basePath, PD(t))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._locationStrategy.prepareExternalUrl(t)
              );
            }
            go(t, r = "", o = null) {
              this._locationStrategy.pushState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Gn(r)),
                  o
                );
            }
            replaceState(t, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", t, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Gn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(t = 0) {
              this._locationStrategy.historyGo?.(t);
            }
            onUrlChange(t) {
              return (
                this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(t);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(t = "", r) {
              this._urlChangeListeners.forEach((o) => o(t, r));
            }
            subscribe(t, r, o) {
              return this._subject.subscribe({
                next: t,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Gn),
            (e.joinWithSlash = jd),
            (e.stripTrailingSlash = ND),
            (e.ɵfac = function (t) {
              return new (t || e)(N(Rr));
            }),
            (e.ɵprov = k({
              token: e,
              factory: function () {
                return (function ox() {
                  return new $d(N(Rr));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function PD(e) {
        return e.replace(/\/index.html$/, "");
      }
      var Te = (() => (
          ((Te = Te || {})[(Te.Format = 0)] = "Format"),
          (Te[(Te.Standalone = 1)] = "Standalone"),
          Te
        ))(),
        ee = (() => (
          ((ee = ee || {})[(ee.Narrow = 0)] = "Narrow"),
          (ee[(ee.Abbreviated = 1)] = "Abbreviated"),
          (ee[(ee.Wide = 2)] = "Wide"),
          (ee[(ee.Short = 3)] = "Short"),
          ee
        ))(),
        Ee = (() => (
          ((Ee = Ee || {})[(Ee.Short = 0)] = "Short"),
          (Ee[(Ee.Medium = 1)] = "Medium"),
          (Ee[(Ee.Long = 2)] = "Long"),
          (Ee[(Ee.Full = 3)] = "Full"),
          Ee
        ))(),
        B = (() => (
          ((B = B || {})[(B.Decimal = 0)] = "Decimal"),
          (B[(B.Group = 1)] = "Group"),
          (B[(B.List = 2)] = "List"),
          (B[(B.PercentSign = 3)] = "PercentSign"),
          (B[(B.PlusSign = 4)] = "PlusSign"),
          (B[(B.MinusSign = 5)] = "MinusSign"),
          (B[(B.Exponential = 6)] = "Exponential"),
          (B[(B.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
          (B[(B.PerMille = 8)] = "PerMille"),
          (B[(B.Infinity = 9)] = "Infinity"),
          (B[(B.NaN = 10)] = "NaN"),
          (B[(B.TimeSeparator = 11)] = "TimeSeparator"),
          (B[(B.CurrencyDecimal = 12)] = "CurrencyDecimal"),
          (B[(B.CurrencyGroup = 13)] = "CurrencyGroup"),
          B
        ))();
      function Za(e, n) {
        return Gt(ft(e)[T.DateFormat], n);
      }
      function Ya(e, n) {
        return Gt(ft(e)[T.TimeFormat], n);
      }
      function Qa(e, n) {
        return Gt(ft(e)[T.DateTimeFormat], n);
      }
      function zt(e, n) {
        const t = ft(e),
          r = t[T.NumberSymbols][n];
        if (typeof r > "u") {
          if (n === B.CurrencyDecimal) return t[T.NumberSymbols][B.Decimal];
          if (n === B.CurrencyGroup) return t[T.NumberSymbols][B.Group];
        }
        return r;
      }
      function LD(e) {
        if (!e[T.ExtraData])
          throw new Error(
            `Missing extra locale data for the locale "${
              e[T.LocaleId]
            }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
          );
      }
      function Gt(e, n) {
        for (let t = n; t > -1; t--) if (typeof e[t] < "u") return e[t];
        throw new Error("Locale data API: locale data undefined");
      }
      function Ud(e) {
        const [n, t] = e.split(":");
        return { hours: +n, minutes: +t };
      }
      const Dx =
          /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
        zi = {},
        _x =
          /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/;
      var We = (() => (
          ((We = We || {})[(We.Short = 0)] = "Short"),
          (We[(We.ShortGMT = 1)] = "ShortGMT"),
          (We[(We.Long = 2)] = "Long"),
          (We[(We.Extended = 3)] = "Extended"),
          We
        ))(),
        H = (() => (
          ((H = H || {})[(H.FullYear = 0)] = "FullYear"),
          (H[(H.Month = 1)] = "Month"),
          (H[(H.Date = 2)] = "Date"),
          (H[(H.Hours = 3)] = "Hours"),
          (H[(H.Minutes = 4)] = "Minutes"),
          (H[(H.Seconds = 5)] = "Seconds"),
          (H[(H.FractionalSeconds = 6)] = "FractionalSeconds"),
          (H[(H.Day = 7)] = "Day"),
          H
        ))(),
        Y = (() => (
          ((Y = Y || {})[(Y.DayPeriods = 0)] = "DayPeriods"),
          (Y[(Y.Days = 1)] = "Days"),
          (Y[(Y.Months = 2)] = "Months"),
          (Y[(Y.Eras = 3)] = "Eras"),
          Y
        ))();
      function Cx(e, n, t, r) {
        let o = (function xx(e) {
          if (jD(e)) return e;
          if ("number" == typeof e && !isNaN(e)) return new Date(e);
          if ("string" == typeof e) {
            if (((e = e.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e))) {
              const [o, i = 1, s = 1] = e.split("-").map((a) => +a);
              return Xa(o, i - 1, s);
            }
            const t = parseFloat(e);
            if (!isNaN(e - t)) return new Date(t);
            let r;
            if ((r = e.match(Dx)))
              return (function Rx(e) {
                const n = new Date(0);
                let t = 0,
                  r = 0;
                const o = e[8] ? n.setUTCFullYear : n.setFullYear,
                  i = e[8] ? n.setUTCHours : n.setHours;
                e[9] &&
                  ((t = Number(e[9] + e[10])), (r = Number(e[9] + e[11]))),
                  o.call(n, Number(e[1]), Number(e[2]) - 1, Number(e[3]));
                const s = Number(e[4] || 0) - t,
                  a = Number(e[5] || 0) - r,
                  l = Number(e[6] || 0),
                  u = Math.floor(1e3 * parseFloat("0." + (e[7] || 0)));
                return i.call(n, s, a, l, u), n;
              })(r);
          }
          const n = new Date(e);
          if (!jD(n)) throw new Error(`Unable to convert "${e}" into a date`);
          return n;
        })(e);
        n = Wn(t, n) || n;
        let a,
          s = [];
        for (; n; ) {
          if (((a = _x.exec(n)), !a)) {
            s.push(n);
            break;
          }
          {
            s = s.concat(a.slice(1));
            const c = s.pop();
            if (!c) break;
            n = c;
          }
        }
        let l = o.getTimezoneOffset();
        r &&
          ((l = BD(r, l)),
          (o = (function Tx(e, n, t) {
            const r = t ? -1 : 1,
              o = e.getTimezoneOffset();
            return (function Ax(e, n) {
              return (
                (e = new Date(e.getTime())).setMinutes(e.getMinutes() + n), e
              );
            })(e, r * (BD(n, o) - o));
          })(o, r, !0)));
        let u = "";
        return (
          s.forEach((c) => {
            const d = (function Ix(e) {
              if (Gd[e]) return Gd[e];
              let n;
              switch (e) {
                case "G":
                case "GG":
                case "GGG":
                  n = ve(Y.Eras, ee.Abbreviated);
                  break;
                case "GGGG":
                  n = ve(Y.Eras, ee.Wide);
                  break;
                case "GGGGG":
                  n = ve(Y.Eras, ee.Narrow);
                  break;
                case "y":
                  n = $e(H.FullYear, 1, 0, !1, !0);
                  break;
                case "yy":
                  n = $e(H.FullYear, 2, 0, !0, !0);
                  break;
                case "yyy":
                  n = $e(H.FullYear, 3, 0, !1, !0);
                  break;
                case "yyyy":
                  n = $e(H.FullYear, 4, 0, !1, !0);
                  break;
                case "Y":
                  n = nl(1);
                  break;
                case "YY":
                  n = nl(2, !0);
                  break;
                case "YYY":
                  n = nl(3);
                  break;
                case "YYYY":
                  n = nl(4);
                  break;
                case "M":
                case "L":
                  n = $e(H.Month, 1, 1);
                  break;
                case "MM":
                case "LL":
                  n = $e(H.Month, 2, 1);
                  break;
                case "MMM":
                  n = ve(Y.Months, ee.Abbreviated);
                  break;
                case "MMMM":
                  n = ve(Y.Months, ee.Wide);
                  break;
                case "MMMMM":
                  n = ve(Y.Months, ee.Narrow);
                  break;
                case "LLL":
                  n = ve(Y.Months, ee.Abbreviated, Te.Standalone);
                  break;
                case "LLLL":
                  n = ve(Y.Months, ee.Wide, Te.Standalone);
                  break;
                case "LLLLL":
                  n = ve(Y.Months, ee.Narrow, Te.Standalone);
                  break;
                case "w":
                  n = zd(1);
                  break;
                case "ww":
                  n = zd(2);
                  break;
                case "W":
                  n = zd(1, !0);
                  break;
                case "d":
                  n = $e(H.Date, 1);
                  break;
                case "dd":
                  n = $e(H.Date, 2);
                  break;
                case "c":
                case "cc":
                  n = $e(H.Day, 1);
                  break;
                case "ccc":
                  n = ve(Y.Days, ee.Abbreviated, Te.Standalone);
                  break;
                case "cccc":
                  n = ve(Y.Days, ee.Wide, Te.Standalone);
                  break;
                case "ccccc":
                  n = ve(Y.Days, ee.Narrow, Te.Standalone);
                  break;
                case "cccccc":
                  n = ve(Y.Days, ee.Short, Te.Standalone);
                  break;
                case "E":
                case "EE":
                case "EEE":
                  n = ve(Y.Days, ee.Abbreviated);
                  break;
                case "EEEE":
                  n = ve(Y.Days, ee.Wide);
                  break;
                case "EEEEE":
                  n = ve(Y.Days, ee.Narrow);
                  break;
                case "EEEEEE":
                  n = ve(Y.Days, ee.Short);
                  break;
                case "a":
                case "aa":
                case "aaa":
                  n = ve(Y.DayPeriods, ee.Abbreviated);
                  break;
                case "aaaa":
                  n = ve(Y.DayPeriods, ee.Wide);
                  break;
                case "aaaaa":
                  n = ve(Y.DayPeriods, ee.Narrow);
                  break;
                case "b":
                case "bb":
                case "bbb":
                  n = ve(Y.DayPeriods, ee.Abbreviated, Te.Standalone, !0);
                  break;
                case "bbbb":
                  n = ve(Y.DayPeriods, ee.Wide, Te.Standalone, !0);
                  break;
                case "bbbbb":
                  n = ve(Y.DayPeriods, ee.Narrow, Te.Standalone, !0);
                  break;
                case "B":
                case "BB":
                case "BBB":
                  n = ve(Y.DayPeriods, ee.Abbreviated, Te.Format, !0);
                  break;
                case "BBBB":
                  n = ve(Y.DayPeriods, ee.Wide, Te.Format, !0);
                  break;
                case "BBBBB":
                  n = ve(Y.DayPeriods, ee.Narrow, Te.Format, !0);
                  break;
                case "h":
                  n = $e(H.Hours, 1, -12);
                  break;
                case "hh":
                  n = $e(H.Hours, 2, -12);
                  break;
                case "H":
                  n = $e(H.Hours, 1);
                  break;
                case "HH":
                  n = $e(H.Hours, 2);
                  break;
                case "m":
                  n = $e(H.Minutes, 1);
                  break;
                case "mm":
                  n = $e(H.Minutes, 2);
                  break;
                case "s":
                  n = $e(H.Seconds, 1);
                  break;
                case "ss":
                  n = $e(H.Seconds, 2);
                  break;
                case "S":
                  n = $e(H.FractionalSeconds, 1);
                  break;
                case "SS":
                  n = $e(H.FractionalSeconds, 2);
                  break;
                case "SSS":
                  n = $e(H.FractionalSeconds, 3);
                  break;
                case "Z":
                case "ZZ":
                case "ZZZ":
                  n = el(We.Short);
                  break;
                case "ZZZZZ":
                  n = el(We.Extended);
                  break;
                case "O":
                case "OO":
                case "OOO":
                case "z":
                case "zz":
                case "zzz":
                  n = el(We.ShortGMT);
                  break;
                case "OOOO":
                case "ZZZZ":
                case "zzzz":
                  n = el(We.Long);
                  break;
                default:
                  return null;
              }
              return (Gd[e] = n), n;
            })(c);
            u += d
              ? d(o, t, l)
              : "''" === c
              ? "'"
              : c.replace(/(^'|'$)/g, "").replace(/''/g, "'");
          }),
          u
        );
      }
      function Xa(e, n, t) {
        const r = new Date(0);
        return r.setFullYear(e, n, t), r.setHours(0, 0, 0), r;
      }
      function Wn(e, n) {
        const t = (function ax(e) {
          return ft(e)[T.LocaleId];
        })(e);
        if (((zi[t] = zi[t] || {}), zi[t][n])) return zi[t][n];
        let r = "";
        switch (n) {
          case "shortDate":
            r = Za(e, Ee.Short);
            break;
          case "mediumDate":
            r = Za(e, Ee.Medium);
            break;
          case "longDate":
            r = Za(e, Ee.Long);
            break;
          case "fullDate":
            r = Za(e, Ee.Full);
            break;
          case "shortTime":
            r = Ya(e, Ee.Short);
            break;
          case "mediumTime":
            r = Ya(e, Ee.Medium);
            break;
          case "longTime":
            r = Ya(e, Ee.Long);
            break;
          case "fullTime":
            r = Ya(e, Ee.Full);
            break;
          case "short":
            const o = Wn(e, "shortTime"),
              i = Wn(e, "shortDate");
            r = Ja(Qa(e, Ee.Short), [o, i]);
            break;
          case "medium":
            const s = Wn(e, "mediumTime"),
              a = Wn(e, "mediumDate");
            r = Ja(Qa(e, Ee.Medium), [s, a]);
            break;
          case "long":
            const l = Wn(e, "longTime"),
              u = Wn(e, "longDate");
            r = Ja(Qa(e, Ee.Long), [l, u]);
            break;
          case "full":
            const c = Wn(e, "fullTime"),
              d = Wn(e, "fullDate");
            r = Ja(Qa(e, Ee.Full), [c, d]);
        }
        return r && (zi[t][n] = r), r;
      }
      function Ja(e, n) {
        return (
          n &&
            (e = e.replace(/\{([^}]+)}/g, function (t, r) {
              return null != n && r in n ? n[r] : t;
            })),
          e
        );
      }
      function nn(e, n, t = "-", r, o) {
        let i = "";
        (e < 0 || (o && e <= 0)) && (o ? (e = 1 - e) : ((e = -e), (i = t)));
        let s = String(e);
        for (; s.length < n; ) s = "0" + s;
        return r && (s = s.slice(s.length - n)), i + s;
      }
      function $e(e, n, t = 0, r = !1, o = !1) {
        return function (i, s) {
          let a = (function bx(e, n) {
            switch (e) {
              case H.FullYear:
                return n.getFullYear();
              case H.Month:
                return n.getMonth();
              case H.Date:
                return n.getDate();
              case H.Hours:
                return n.getHours();
              case H.Minutes:
                return n.getMinutes();
              case H.Seconds:
                return n.getSeconds();
              case H.FractionalSeconds:
                return n.getMilliseconds();
              case H.Day:
                return n.getDay();
              default:
                throw new Error(`Unknown DateType value "${e}".`);
            }
          })(e, i);
          if (((t > 0 || a > -t) && (a += t), e === H.Hours))
            0 === a && -12 === t && (a = 12);
          else if (e === H.FractionalSeconds)
            return (function wx(e, n) {
              return nn(e, 3).substring(0, n);
            })(a, n);
          const l = zt(s, B.MinusSign);
          return nn(a, n, l, r, o);
        };
      }
      function ve(e, n, t = Te.Format, r = !1) {
        return function (o, i) {
          return (function Ex(e, n, t, r, o, i) {
            switch (t) {
              case Y.Months:
                return (function cx(e, n, t) {
                  const r = ft(e),
                    i = Gt([r[T.MonthsFormat], r[T.MonthsStandalone]], n);
                  return Gt(i, t);
                })(n, o, r)[e.getMonth()];
              case Y.Days:
                return (function ux(e, n, t) {
                  const r = ft(e),
                    i = Gt([r[T.DaysFormat], r[T.DaysStandalone]], n);
                  return Gt(i, t);
                })(n, o, r)[e.getDay()];
              case Y.DayPeriods:
                const s = e.getHours(),
                  a = e.getMinutes();
                if (i) {
                  const u = (function px(e) {
                      const n = ft(e);
                      return (
                        LD(n),
                        (n[T.ExtraData][2] || []).map((r) =>
                          "string" == typeof r ? Ud(r) : [Ud(r[0]), Ud(r[1])]
                        )
                      );
                    })(n),
                    c = (function gx(e, n, t) {
                      const r = ft(e);
                      LD(r);
                      const i =
                        Gt([r[T.ExtraData][0], r[T.ExtraData][1]], n) || [];
                      return Gt(i, t) || [];
                    })(n, o, r),
                    d = u.findIndex((f) => {
                      if (Array.isArray(f)) {
                        const [h, p] = f,
                          y = s >= h.hours && a >= h.minutes,
                          D = s < p.hours || (s === p.hours && a < p.minutes);
                        if (h.hours < p.hours) {
                          if (y && D) return !0;
                        } else if (y || D) return !0;
                      } else if (f.hours === s && f.minutes === a) return !0;
                      return !1;
                    });
                  if (-1 !== d) return c[d];
                }
                return (function lx(e, n, t) {
                  const r = ft(e),
                    i = Gt(
                      [r[T.DayPeriodsFormat], r[T.DayPeriodsStandalone]],
                      n
                    );
                  return Gt(i, t);
                })(n, o, r)[s < 12 ? 0 : 1];
              case Y.Eras:
                return (function dx(e, n) {
                  return Gt(ft(e)[T.Eras], n);
                })(n, r)[e.getFullYear() <= 0 ? 0 : 1];
              default:
                throw new Error(`unexpected translation type ${t}`);
            }
          })(o, i, e, n, t, r);
        };
      }
      function el(e) {
        return function (n, t, r) {
          const o = -1 * r,
            i = zt(t, B.MinusSign),
            s = o > 0 ? Math.floor(o / 60) : Math.ceil(o / 60);
          switch (e) {
            case We.Short:
              return (
                (o >= 0 ? "+" : "") + nn(s, 2, i) + nn(Math.abs(o % 60), 2, i)
              );
            case We.ShortGMT:
              return "GMT" + (o >= 0 ? "+" : "") + nn(s, 1, i);
            case We.Long:
              return (
                "GMT" +
                (o >= 0 ? "+" : "") +
                nn(s, 2, i) +
                ":" +
                nn(Math.abs(o % 60), 2, i)
              );
            case We.Extended:
              return 0 === r
                ? "Z"
                : (o >= 0 ? "+" : "") +
                    nn(s, 2, i) +
                    ":" +
                    nn(Math.abs(o % 60), 2, i);
            default:
              throw new Error(`Unknown zone width "${e}"`);
          }
        };
      }
      const Sx = 0,
        tl = 4;
      function VD(e) {
        return Xa(
          e.getFullYear(),
          e.getMonth(),
          e.getDate() + (tl - e.getDay())
        );
      }
      function zd(e, n = !1) {
        return function (t, r) {
          let o;
          if (n) {
            const i = new Date(t.getFullYear(), t.getMonth(), 1).getDay() - 1,
              s = t.getDate();
            o = 1 + Math.floor((s + i) / 7);
          } else {
            const i = VD(t),
              s = (function Mx(e) {
                const n = Xa(e, Sx, 1).getDay();
                return Xa(e, 0, 1 + (n <= tl ? tl : tl + 7) - n);
              })(i.getFullYear()),
              a = i.getTime() - s.getTime();
            o = 1 + Math.round(a / 6048e5);
          }
          return nn(o, e, zt(r, B.MinusSign));
        };
      }
      function nl(e, n = !1) {
        return function (t, r) {
          return nn(VD(t).getFullYear(), e, zt(r, B.MinusSign), n);
        };
      }
      const Gd = {};
      function BD(e, n) {
        e = e.replace(/:/g, "");
        const t = Date.parse("Jan 01, 1970 00:00:00 " + e) / 6e4;
        return isNaN(t) ? n : t;
      }
      function jD(e) {
        return e instanceof Date && !isNaN(e.valueOf());
      }
      function zD(e, n) {
        n = encodeURIComponent(n);
        for (const t of e.split(";")) {
          const r = t.indexOf("="),
            [o, i] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
          if (o.trim() === n) return decodeURIComponent(i);
        }
        return null;
      }
      class Gx {
        constructor(n, t, r, o) {
          (this.$implicit = n),
            (this.ngForOf = t),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let KD = (() => {
        class e {
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(t, r, o) {
            (this._viewContainer = t),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const t = this._ngForOf;
              !this._differ &&
                t &&
                (this._differ = this._differs
                  .find(t)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const r = this._viewContainer;
            t.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new Gx(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), ZD(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((o) => {
              ZD(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(C(en), C($n), C(Ka));
          }),
          (e.ɵdir = U({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function ZD(e, n) {
        e.context.$implicit = n.item;
      }
      let YD = (() => {
        class e {
          constructor(t, r) {
            (this._viewContainer = t),
              (this._context = new qx()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            QD("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            QD("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(C(en), C($n));
          }),
          (e.ɵdir = U({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class qx {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function QD(e, n) {
        if (n && !n.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${me(n)}'.`
          );
      }
      const sR = new F("DATE_PIPE_DEFAULT_TIMEZONE"),
        aR = new F("DATE_PIPE_DEFAULT_OPTIONS");
      let JD = (() => {
          class e {
            constructor(t, r, o) {
              (this.locale = t),
                (this.defaultTimezone = r),
                (this.defaultOptions = o);
            }
            transform(t, r, o, i) {
              if (null == t || "" === t || t != t) return null;
              try {
                return Cx(
                  t,
                  r ?? this.defaultOptions?.dateFormat ?? "mediumDate",
                  i || this.locale,
                  o ??
                    this.defaultOptions?.timezone ??
                    this.defaultTimezone ??
                    void 0
                );
              } catch (s) {
                throw (function rn(e, n) {
                  return new S(2100, !1);
                })();
              }
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(Hn, 16), C(sR, 24), C(aR, 24));
            }),
            (e.ɵpipe = lt({ name: "date", type: e, pure: !0, standalone: !0 })),
            e
          );
        })(),
        yR = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({})),
            e
          );
        })();
      let CR = (() => {
        class e {}
        return (
          (e.ɵprov = k({
            token: e,
            providedIn: "root",
            factory: () => new wR(N(pt), window),
          })),
          e
        );
      })();
      class wR {
        constructor(n, t) {
          (this.document = n), (this.window = t), (this.offset = () => [0, 0]);
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1]);
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return;
          const t = (function bR(e, n) {
            const t = e.getElementById(n) || e.getElementsByName(n)[0];
            if (t) return t;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(n) || i.querySelector(`[name="${n}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, n);
          t && (this.scrollToElement(t), t.focus());
        }
        setHistoryScrollRestoration(n) {
          if (this.supportScrollRestoration()) {
            const t = this.window.history;
            t && t.scrollRestoration && (t.scrollRestoration = n);
          }
        }
        scrollToElement(n) {
          const t = n.getBoundingClientRect(),
            r = t.left + this.window.pageXOffset,
            o = t.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const n =
              n_(this.window.history) ||
              n_(Object.getPrototypeOf(this.window.history));
            return !(!n || (!n.writable && !n.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function n_(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class r_ {}
      class YR extends J1 {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class sf extends YR {
        static makeCurrent() {
          !(function X1(e) {
            Vd || (Vd = e);
          })(new sf());
        }
        onAndCancel(n, t, r) {
          return (
            n.addEventListener(t, r, !1),
            () => {
              n.removeEventListener(t, r, !1);
            }
          );
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, t) {
          return "window" === t
            ? window
            : "document" === t
            ? n
            : "body" === t
            ? n.body
            : null;
        }
        getBaseHref(n) {
          const t = (function QR() {
            return (
              (qi = qi || document.querySelector("base")),
              qi ? qi.getAttribute("href") : null
            );
          })();
          return null == t
            ? null
            : (function XR(e) {
                (sl = sl || document.createElement("a")),
                  sl.setAttribute("href", e);
                const n = sl.pathname;
                return "/" === n.charAt(0) ? n : `/${n}`;
              })(t);
        }
        resetBaseElement() {
          qi = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return zD(document.cookie, n);
        }
      }
      let sl,
        qi = null;
      const l_ = new F("TRANSITION_ID"),
        eN = [
          {
            provide: $a,
            useFactory: function JR(e, n, t) {
              return () => {
                t.get(Ha).donePromise.then(() => {
                  const r = zn(),
                    o = n.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [l_, pt, pn],
            multi: !0,
          },
        ];
      let nN = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const al = new F("EventManagerPlugins");
      let ll = (() => {
        class e {
          constructor(t, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              t.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, r, o) {
            return this._findPluginFor(r).addEventListener(t, r, o);
          }
          addGlobalEventListener(t, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(t, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const r = this._eventNameToPlugin.get(t);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s;
            }
            throw new Error(`No event manager plugin found for event ${t}`);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(al), N(Ae));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class u_ {
        constructor(n) {
          this._doc = n;
        }
        addGlobalEventListener(n, t, r) {
          const o = zn().getGlobalEventTarget(this._doc, n);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${t}`);
          return this.addEventListener(o, t, r);
        }
      }
      let c_ = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(t) {
              for (const r of t)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(t) {
              for (const r of t)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(t) {}
            onStyleAdded(t) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(t, r) {
              const o = this.usageCount;
              let i = o.get(t) ?? 0;
              return (i += r), i > 0 ? o.set(t, i) : o.delete(t), i;
            }
            ngOnDestroy() {
              for (const t of this.getAllStyles()) this.onStyleRemoved(t);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ki = (() => {
          class e extends c_ {
            constructor(t) {
              super(),
                (this.doc = t),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(t) {
              for (const r of this.hostNodes) this.addStyleToHost(r, t);
            }
            onStyleRemoved(t) {
              const r = this.styleRef;
              r.get(t)?.forEach((i) => i.remove()), r.delete(t);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(t) {
              this.hostNodes.add(t);
              for (const r of this.getAllStyles()) this.addStyleToHost(t, r);
            }
            removeHost(t) {
              this.hostNodes.delete(t);
            }
            addStyleToHost(t, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), t.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const t = this.hostNodes;
              t.clear(), t.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(pt));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const af = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        lf = /%COMP%/g,
        h_ = new F("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function p_(e, n) {
        return n.flat(100).map((t) => t.replace(lf, e));
      }
      function g_(e) {
        return (n) => {
          if ("__ngUnwrap__" === n) return e;
          !1 === e(n) && (n.preventDefault(), (n.returnValue = !1));
        };
      }
      let uf = (() => {
        class e {
          constructor(t, r, o, i) {
            (this.eventManager = t),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new cf(t));
          }
          createRenderer(t, r) {
            if (!t || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(t, r);
            return (
              o instanceof v_
                ? o.applyToHost(t)
                : o instanceof df && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(t, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                l = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case un.Emulated:
                  i = new v_(s, a, r, this.appId, l);
                  break;
                case un.ShadowDom:
                  return new uN(s, a, t, r);
                default:
                  i = new df(s, a, r, l);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(ll), N(Ki), N(Hi), N(h_));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class cf {
        constructor(n) {
          (this.eventManager = n),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? document.createElementNS(af[t] || t, n)
            : document.createElement(n);
        }
        createComment(n) {
          return document.createComment(n);
        }
        createText(n) {
          return document.createTextNode(n);
        }
        appendChild(n, t) {
          (y_(n) ? n.content : n).appendChild(t);
        }
        insertBefore(n, t, r) {
          n && (y_(n) ? n.content : n).insertBefore(t, r);
        }
        removeChild(n, t) {
          n && n.removeChild(t);
        }
        selectRootElement(n, t) {
          let r = "string" == typeof n ? document.querySelector(n) : n;
          if (!r)
            throw new Error(`The selector "${n}" did not match any elements`);
          return t || (r.textContent = ""), r;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, t, r, o) {
          if (o) {
            t = o + ":" + t;
            const i = af[o];
            i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r);
          } else n.setAttribute(t, r);
        }
        removeAttribute(n, t, r) {
          if (r) {
            const o = af[r];
            o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`);
          } else n.removeAttribute(t);
        }
        addClass(n, t) {
          n.classList.add(t);
        }
        removeClass(n, t) {
          n.classList.remove(t);
        }
        setStyle(n, t, r, o) {
          o & (Dt.DashCase | Dt.Important)
            ? n.style.setProperty(t, r, o & Dt.Important ? "important" : "")
            : (n.style[t] = r);
        }
        removeStyle(n, t, r) {
          r & Dt.DashCase ? n.style.removeProperty(t) : (n.style[t] = "");
        }
        setProperty(n, t, r) {
          n[t] = r;
        }
        setValue(n, t) {
          n.nodeValue = t;
        }
        listen(n, t, r) {
          return "string" == typeof n
            ? this.eventManager.addGlobalEventListener(n, t, g_(r))
            : this.eventManager.addEventListener(n, t, g_(r));
        }
      }
      function y_(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class uN extends cf {
        constructor(n, t, r, o) {
          super(n),
            (this.sharedStylesHost = t),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = p_(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t);
        }
        insertBefore(n, t, r) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, r);
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class df extends cf {
        constructor(n, t, r, o, i = r.id) {
          super(n),
            (this.sharedStylesHost = t),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = p_(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class v_ extends df {
        constructor(n, t, r, o, i) {
          const s = o + "-" + r.id;
          super(n, t, r, i, s),
            (this.contentAttr = (function sN(e) {
              return "_ngcontent-%COMP%".replace(lf, e);
            })(s)),
            (this.hostAttr = (function aN(e) {
              return "_nghost-%COMP%".replace(lf, e);
            })(s));
        }
        applyToHost(n) {
          this.applyStyles(), this.setAttribute(n, this.hostAttr, "");
        }
        createElement(n, t) {
          const r = super.createElement(n, t);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let cN = (() => {
        class e extends u_ {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, r, o) {
            return (
              t.addEventListener(r, o, !1),
              () => this.removeEventListener(t, r, o)
            );
          }
          removeEventListener(t, r, o) {
            return t.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(pt));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const D_ = ["alt", "control", "meta", "shift"],
        dN = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        fN = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let hN = (() => {
        class e extends u_ {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return null != e.parseEventName(t);
          }
          addEventListener(t, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => zn().onAndCancel(t, i.domEventName, s));
          }
          static parseEventName(t) {
            const r = t.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              D_.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(t, r) {
            let o = dN[t.key] || t.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = t.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                D_.forEach((s) => {
                  s !== o && (0, fN[s])(t) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(t, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(t) {
            return "esc" === t ? "escape" : t;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(pt));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const yN = hD(Z1, "browser", [
          { provide: Sd, useValue: "browser" },
          {
            provide: nD,
            useValue: function pN() {
              sf.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: pt,
            useFactory: function mN() {
              return (
                (function qS(e) {
                  fc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        w_ = new F(""),
        b_ = [
          {
            provide: Ua,
            useClass: class tN {
              addToWindow(n) {
                (_e.getAngularTestability = (r, o = !0) => {
                  const i = n.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (_e.getAllAngularTestabilities = () =>
                    n.getAllTestabilities()),
                  (_e.getAllAngularRootElements = () => n.getAllRootElements()),
                  _e.frameworkStabilizers || (_e.frameworkStabilizers = []),
                  _e.frameworkStabilizers.push((r) => {
                    const o = _e.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, t, r) {
                return null == t
                  ? null
                  : n.getTestability(t) ??
                      (r
                        ? zn().isShadowRoot(t)
                          ? this.findTestabilityInTree(n, t.host, !0)
                          : this.findTestabilityInTree(n, t.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: lD, useClass: Td, deps: [Ae, xd, Ua] },
          { provide: Td, useClass: Td, deps: [Ae, xd, Ua] },
        ],
        E_ = [
          { provide: Cc, useValue: "root" },
          {
            provide: go,
            useFactory: function gN() {
              return new go();
            },
            deps: [],
          },
          { provide: al, useClass: cN, multi: !0, deps: [pt, Ae, Sd] },
          { provide: al, useClass: hN, multi: !0, deps: [pt] },
          { provide: uf, useClass: uf, deps: [ll, Ki, Hi, h_] },
          { provide: Zg, useExisting: uf },
          { provide: c_, useExisting: Ki },
          { provide: Ki, useClass: Ki, deps: [pt] },
          { provide: ll, useClass: ll, deps: [al, Ae] },
          { provide: r_, useClass: nN, deps: [] },
          [],
        ];
      let vN = (() => {
          class e {
            constructor(t) {}
            static withServerTransition(t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Hi, useValue: t.appId },
                  { provide: l_, useExisting: Hi },
                  eN,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(w_, 12));
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({ providers: [...E_, ...b_], imports: [yR, Y1] })),
            e
          );
        })(),
        S_ = (() => {
          class e {
            constructor(t) {
              this._doc = t;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(t) {
              this._doc.title = t || "";
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(pt));
            }),
            (e.ɵprov = k({
              token: e,
              factory: function (t) {
                let r = null;
                return (
                  (r = t
                    ? new t()
                    : (function _N() {
                        return new S_(N(pt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function L(...e) {
        return Le(e, ti(e));
      }
      function qn(e, n) {
        return ne(n) ? Ke(e, n, 1) : Ke(e, 1);
      }
      function Kn(e, n) {
        return Oe((t, r) => {
          let o = 0;
          t.subscribe(Fe(r, (i) => e.call(n, i, o++) && r.next(i)));
        });
      }
      typeof window < "u" && window;
      class ul {}
      class pf {}
      class Zn {
        constructor(n) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            n
              ? (this.lazyInit =
                  "string" == typeof n
                    ? () => {
                        (this.headers = new Map()),
                          n.split("\n").forEach((t) => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                              const o = t.slice(0, r),
                                i = o.toLowerCase(),
                                s = t.slice(r + 1).trim();
                              this.maybeSetNormalizedName(o, i),
                                this.headers.has(i)
                                  ? this.headers.get(i).push(s)
                                  : this.headers.set(i, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.entries(n).forEach(([t, r]) => {
                            let o;
                            if (
                              ((o =
                                "string" == typeof r
                                  ? [r]
                                  : "number" == typeof r
                                  ? [r.toString()]
                                  : r.map((i) => i.toString())),
                              o.length > 0)
                            ) {
                              const i = t.toLowerCase();
                              this.headers.set(i, o),
                                this.maybeSetNormalizedName(t, i);
                            }
                          });
                      })
              : (this.headers = new Map());
        }
        has(n) {
          return this.init(), this.headers.has(n.toLowerCase());
        }
        get(n) {
          this.init();
          const t = this.headers.get(n.toLowerCase());
          return t && t.length > 0 ? t[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(n) {
          return this.init(), this.headers.get(n.toLowerCase()) || null;
        }
        append(n, t) {
          return this.clone({ name: n, value: t, op: "a" });
        }
        set(n, t) {
          return this.clone({ name: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ name: n, value: t, op: "d" });
        }
        maybeSetNormalizedName(n, t) {
          this.normalizedNames.has(t) || this.normalizedNames.set(t, n);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Zn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((n) => this.applyUpdate(n)),
              (this.lazyUpdate = null)));
        }
        copyFrom(n) {
          n.init(),
            Array.from(n.headers.keys()).forEach((t) => {
              this.headers.set(t, n.headers.get(t)),
                this.normalizedNames.set(t, n.normalizedNames.get(t));
            });
        }
        clone(n) {
          const t = new Zn();
          return (
            (t.lazyInit =
              this.lazyInit && this.lazyInit instanceof Zn
                ? this.lazyInit
                : this),
            (t.lazyUpdate = (this.lazyUpdate || []).concat([n])),
            t
          );
        }
        applyUpdate(n) {
          const t = n.name.toLowerCase();
          switch (n.op) {
            case "a":
            case "s":
              let r = n.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(n.name, t);
              const o = ("a" === n.op ? this.headers.get(t) : void 0) || [];
              o.push(...r), this.headers.set(t, o);
              break;
            case "d":
              const i = n.value;
              if (i) {
                let s = this.headers.get(t);
                if (!s) return;
                (s = s.filter((a) => -1 === i.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(t), this.normalizedNames.delete(t))
                    : this.headers.set(t, s);
              } else this.headers.delete(t), this.normalizedNames.delete(t);
          }
        }
        forEach(n) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((t) =>
              n(this.normalizedNames.get(t), this.headers.get(t))
            );
        }
      }
      class MN {
        encodeKey(n) {
          return A_(n);
        }
        encodeValue(n) {
          return A_(n);
        }
        decodeKey(n) {
          return decodeURIComponent(n);
        }
        decodeValue(n) {
          return decodeURIComponent(n);
        }
      }
      const AN = /%(\d[a-f0-9])/gi,
        TN = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function A_(e) {
        return encodeURIComponent(e).replace(AN, (n, t) => TN[t] ?? n);
      }
      function cl(e) {
        return `${e}`;
      }
      class ar {
        constructor(n = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = n.encoder || new MN()),
            n.fromString)
          ) {
            if (n.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function IN(e, n) {
              const t = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const i = o.indexOf("="),
                        [s, a] =
                          -1 == i
                            ? [n.decodeKey(o), ""]
                            : [
                                n.decodeKey(o.slice(0, i)),
                                n.decodeValue(o.slice(i + 1)),
                              ],
                        l = t.get(s) || [];
                      l.push(a), t.set(s, l);
                    }),
                t
              );
            })(n.fromString, this.encoder);
          } else
            n.fromObject
              ? ((this.map = new Map()),
                Object.keys(n.fromObject).forEach((t) => {
                  const r = n.fromObject[t],
                    o = Array.isArray(r) ? r.map(cl) : [cl(r)];
                  this.map.set(t, o);
                }))
              : (this.map = null);
        }
        has(n) {
          return this.init(), this.map.has(n);
        }
        get(n) {
          this.init();
          const t = this.map.get(n);
          return t ? t[0] : null;
        }
        getAll(n) {
          return this.init(), this.map.get(n) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(n, t) {
          return this.clone({ param: n, value: t, op: "a" });
        }
        appendAll(n) {
          const t = [];
          return (
            Object.keys(n).forEach((r) => {
              const o = n[r];
              Array.isArray(o)
                ? o.forEach((i) => {
                    t.push({ param: r, value: i, op: "a" });
                  })
                : t.push({ param: r, value: o, op: "a" });
            }),
            this.clone(t)
          );
        }
        set(n, t) {
          return this.clone({ param: n, value: t, op: "s" });
        }
        delete(n, t) {
          return this.clone({ param: n, value: t, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((n) => {
                const t = this.encoder.encodeKey(n);
                return this.map
                  .get(n)
                  .map((r) => t + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((n) => "" !== n)
              .join("&")
          );
        }
        clone(n) {
          const t = new ar({ encoder: this.encoder });
          return (
            (t.cloneFrom = this.cloneFrom || this),
            (t.updates = (this.updates || []).concat(n)),
            t
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((n) => this.map.set(n, this.cloneFrom.map.get(n))),
              this.updates.forEach((n) => {
                switch (n.op) {
                  case "a":
                  case "s":
                    const t =
                      ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                    t.push(cl(n.value)), this.map.set(n.param, t);
                    break;
                  case "d":
                    if (void 0 === n.value) {
                      this.map.delete(n.param);
                      break;
                    }
                    {
                      let r = this.map.get(n.param) || [];
                      const o = r.indexOf(cl(n.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(n.param, r)
                          : this.map.delete(n.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class xN {
        constructor() {
          this.map = new Map();
        }
        set(n, t) {
          return this.map.set(n, t), this;
        }
        get(n) {
          return (
            this.map.has(n) || this.map.set(n, n.defaultValue()),
            this.map.get(n)
          );
        }
        delete(n) {
          return this.map.delete(n), this;
        }
        has(n) {
          return this.map.has(n);
        }
        keys() {
          return this.map.keys();
        }
      }
      function T_(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function x_(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function R_(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class Zi {
        constructor(n, t, r, o) {
          let i;
          if (
            ((this.url = t),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = n.toUpperCase()),
            (function RN(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (i = o))
              : (i = r),
            i &&
              ((this.reportProgress = !!i.reportProgress),
              (this.withCredentials = !!i.withCredentials),
              i.responseType && (this.responseType = i.responseType),
              i.headers && (this.headers = i.headers),
              i.context && (this.context = i.context),
              i.params && (this.params = i.params)),
            this.headers || (this.headers = new Zn()),
            this.context || (this.context = new xN()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = t;
            else {
              const a = t.indexOf("?");
              this.urlWithParams =
                t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new ar()), (this.urlWithParams = t);
        }
        serializeBody() {
          return null === this.body
            ? null
            : T_(this.body) ||
              x_(this.body) ||
              R_(this.body) ||
              (function NN(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof ar
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || R_(this.body)
            ? null
            : x_(this.body)
            ? this.body.type || null
            : T_(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof ar
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(n = {}) {
          const t = n.method || this.method,
            r = n.url || this.url,
            o = n.responseType || this.responseType,
            i = void 0 !== n.body ? n.body : this.body,
            s =
              void 0 !== n.withCredentials
                ? n.withCredentials
                : this.withCredentials,
            a =
              void 0 !== n.reportProgress
                ? n.reportProgress
                : this.reportProgress;
          let l = n.headers || this.headers,
            u = n.params || this.params;
          const c = n.context ?? this.context;
          return (
            void 0 !== n.setHeaders &&
              (l = Object.keys(n.setHeaders).reduce(
                (d, f) => d.set(f, n.setHeaders[f]),
                l
              )),
            n.setParams &&
              (u = Object.keys(n.setParams).reduce(
                (d, f) => d.set(f, n.setParams[f]),
                u
              )),
            new Zi(t, r, i, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: o,
              withCredentials: s,
            })
          );
        }
      }
      var He = (() => (
        ((He = He || {})[(He.Sent = 0)] = "Sent"),
        (He[(He.UploadProgress = 1)] = "UploadProgress"),
        (He[(He.ResponseHeader = 2)] = "ResponseHeader"),
        (He[(He.DownloadProgress = 3)] = "DownloadProgress"),
        (He[(He.Response = 4)] = "Response"),
        (He[(He.User = 5)] = "User"),
        He
      ))();
      class gf {
        constructor(n, t = 200, r = "OK") {
          (this.headers = n.headers || new Zn()),
            (this.status = void 0 !== n.status ? n.status : t),
            (this.statusText = n.statusText || r),
            (this.url = n.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class mf extends gf {
        constructor(n = {}) {
          super(n), (this.type = He.ResponseHeader);
        }
        clone(n = {}) {
          return new mf({
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class dl extends gf {
        constructor(n = {}) {
          super(n),
            (this.type = He.Response),
            (this.body = void 0 !== n.body ? n.body : null);
        }
        clone(n = {}) {
          return new dl({
            body: void 0 !== n.body ? n.body : this.body,
            headers: n.headers || this.headers,
            status: void 0 !== n.status ? n.status : this.status,
            statusText: n.statusText || this.statusText,
            url: n.url || this.url || void 0,
          });
        }
      }
      class N_ extends gf {
        constructor(n) {
          super(n, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${n.url || "(unknown url)"}`
                : `Http failure response for ${n.url || "(unknown url)"}: ${
                    n.status
                  } ${n.statusText}`),
            (this.error = n.error || null);
        }
      }
      function yf(e, n) {
        return {
          body: n,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let vf = (() => {
        class e {
          constructor(t) {
            this.handler = t;
          }
          request(t, r, o = {}) {
            let i;
            if (t instanceof Zi) i = t;
            else {
              let l, u;
              (l = o.headers instanceof Zn ? o.headers : new Zn(o.headers)),
                o.params &&
                  (u =
                    o.params instanceof ar
                      ? o.params
                      : new ar({ fromObject: o.params })),
                (i = new Zi(t, r, void 0 !== o.body ? o.body : null, {
                  headers: l,
                  context: o.context,
                  params: u,
                  reportProgress: o.reportProgress,
                  responseType: o.responseType || "json",
                  withCredentials: o.withCredentials,
                }));
            }
            const s = L(i).pipe(qn((l) => this.handler.handle(l)));
            if (t instanceof Zi || "events" === o.observe) return s;
            const a = s.pipe(Kn((l) => l instanceof dl));
            switch (o.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      z((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(z((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${o.observe}}`
                );
            }
          }
          delete(t, r = {}) {
            return this.request("DELETE", t, r);
          }
          get(t, r = {}) {
            return this.request("GET", t, r);
          }
          head(t, r = {}) {
            return this.request("HEAD", t, r);
          }
          jsonp(t, r) {
            return this.request("JSONP", t, {
              params: new ar().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, r = {}) {
            return this.request("OPTIONS", t, r);
          }
          patch(t, r, o = {}) {
            return this.request("PATCH", t, yf(o, r));
          }
          post(t, r, o = {}) {
            return this.request("POST", t, yf(o, r));
          }
          put(t, r, o = {}) {
            return this.request("PUT", t, yf(o, r));
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(ul));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function O_(e, n) {
        return n(e);
      }
      function ON(e, n) {
        return (t, r) => n.intercept(t, { handle: (o) => e(o, r) });
      }
      const PN = new F("HTTP_INTERCEPTORS"),
        Yi = new F("HTTP_INTERCEPTOR_FNS");
      function kN() {
        let e = null;
        return (n, t) => (
          null === e &&
            (e = (Q(PN, { optional: !0 }) ?? []).reduceRight(ON, O_)),
          e(n, t)
        );
      }
      let F_ = (() => {
        class e extends ul {
          constructor(t, r) {
            super(),
              (this.backend = t),
              (this.injector = r),
              (this.chain = null);
          }
          handle(t) {
            if (null === this.chain) {
              const r = Array.from(new Set(this.injector.get(Yi)));
              this.chain = r.reduceRight(
                (o, i) =>
                  (function FN(e, n, t) {
                    return (r, o) => t.runInContext(() => n(r, (i) => e(i, o)));
                  })(o, i, this.injector),
                O_
              );
            }
            return this.chain(t, (r) => this.backend.handle(r));
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(pf), N(hn));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const jN = /^\)\]\}',?\n/;
      let k_ = (() => {
        class e {
          constructor(t) {
            this.xhrFactory = t;
          }
          handle(t) {
            if ("JSONP" === t.method)
              throw new Error(
                "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
              );
            return new De((r) => {
              const o = this.xhrFactory.build();
              if (
                (o.open(t.method, t.urlWithParams),
                t.withCredentials && (o.withCredentials = !0),
                t.headers.forEach((h, p) => o.setRequestHeader(h, p.join(","))),
                t.headers.has("Accept") ||
                  o.setRequestHeader(
                    "Accept",
                    "application/json, text/plain, */*"
                  ),
                !t.headers.has("Content-Type"))
              ) {
                const h = t.detectContentTypeHeader();
                null !== h && o.setRequestHeader("Content-Type", h);
              }
              if (t.responseType) {
                const h = t.responseType.toLowerCase();
                o.responseType = "json" !== h ? h : "text";
              }
              const i = t.serializeBody();
              let s = null;
              const a = () => {
                  if (null !== s) return s;
                  const h = o.statusText || "OK",
                    p = new Zn(o.getAllResponseHeaders()),
                    y =
                      (function $N(e) {
                        return "responseURL" in e && e.responseURL
                          ? e.responseURL
                          : /^X-Request-URL:/m.test(e.getAllResponseHeaders())
                          ? e.getResponseHeader("X-Request-URL")
                          : null;
                      })(o) || t.url;
                  return (
                    (s = new mf({
                      headers: p,
                      status: o.status,
                      statusText: h,
                      url: y,
                    })),
                    s
                  );
                },
                l = () => {
                  let { headers: h, status: p, statusText: y, url: D } = a(),
                    b = null;
                  204 !== p &&
                    (b = typeof o.response > "u" ? o.responseText : o.response),
                    0 === p && (p = b ? 200 : 0);
                  let A = p >= 200 && p < 300;
                  if ("json" === t.responseType && "string" == typeof b) {
                    const _ = b;
                    b = b.replace(jN, "");
                    try {
                      b = "" !== b ? JSON.parse(b) : null;
                    } catch (V) {
                      (b = _), A && ((A = !1), (b = { error: V, text: b }));
                    }
                  }
                  A
                    ? (r.next(
                        new dl({
                          body: b,
                          headers: h,
                          status: p,
                          statusText: y,
                          url: D || void 0,
                        })
                      ),
                      r.complete())
                    : r.error(
                        new N_({
                          error: b,
                          headers: h,
                          status: p,
                          statusText: y,
                          url: D || void 0,
                        })
                      );
                },
                u = (h) => {
                  const { url: p } = a(),
                    y = new N_({
                      error: h,
                      status: o.status || 0,
                      statusText: o.statusText || "Unknown Error",
                      url: p || void 0,
                    });
                  r.error(y);
                };
              let c = !1;
              const d = (h) => {
                  c || (r.next(a()), (c = !0));
                  let p = { type: He.DownloadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total),
                    "text" === t.responseType &&
                      o.responseText &&
                      (p.partialText = o.responseText),
                    r.next(p);
                },
                f = (h) => {
                  let p = { type: He.UploadProgress, loaded: h.loaded };
                  h.lengthComputable && (p.total = h.total), r.next(p);
                };
              return (
                o.addEventListener("load", l),
                o.addEventListener("error", u),
                o.addEventListener("timeout", u),
                o.addEventListener("abort", u),
                t.reportProgress &&
                  (o.addEventListener("progress", d),
                  null !== i &&
                    o.upload &&
                    o.upload.addEventListener("progress", f)),
                o.send(i),
                r.next({ type: He.Sent }),
                () => {
                  o.removeEventListener("error", u),
                    o.removeEventListener("abort", u),
                    o.removeEventListener("load", l),
                    o.removeEventListener("timeout", u),
                    t.reportProgress &&
                      (o.removeEventListener("progress", d),
                      null !== i &&
                        o.upload &&
                        o.upload.removeEventListener("progress", f)),
                    o.readyState !== o.DONE && o.abort();
                }
              );
            });
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(r_));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Df = new F("XSRF_ENABLED"),
        L_ = new F("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        V_ = new F("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class B_ {}
      let zN = (() => {
        class e {
          constructor(t, r, o) {
            (this.doc = t),
              (this.platform = r),
              (this.cookieName = o),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const t = this.doc.cookie || "";
            return (
              t !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = zD(t, this.cookieName)),
                (this.lastCookieString = t)),
              this.lastToken
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(pt), N(Sd), N(L_));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function GN(e, n) {
        const t = e.url.toLowerCase();
        if (
          !Q(Df) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          t.startsWith("http://") ||
          t.startsWith("https://")
        )
          return n(e);
        const r = Q(B_).getToken(),
          o = Q(V_);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          n(e)
        );
      }
      var Re = (() => (
        ((Re = Re || {})[(Re.Interceptors = 0)] = "Interceptors"),
        (Re[(Re.LegacyInterceptors = 1)] = "LegacyInterceptors"),
        (Re[(Re.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
        (Re[(Re.NoXsrfProtection = 3)] = "NoXsrfProtection"),
        (Re[(Re.JsonpSupport = 4)] = "JsonpSupport"),
        (Re[(Re.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
        Re
      ))();
      function ko(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      function WN(...e) {
        const n = [
          vf,
          k_,
          F_,
          { provide: ul, useExisting: F_ },
          { provide: pf, useExisting: k_ },
          { provide: Yi, useValue: GN, multi: !0 },
          { provide: Df, useValue: !0 },
          { provide: B_, useClass: zN },
        ];
        for (const t of e) n.push(...t.ɵproviders);
        return (function y0(e) {
          return { ɵproviders: e };
        })(n);
      }
      const j_ = new F("LEGACY_INTERCEPTOR_FN");
      let KN = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = mt({
            providers: [
              WN(
                ko(Re.LegacyInterceptors, [
                  { provide: j_, useFactory: kN },
                  { provide: Yi, useExisting: j_, multi: !0 },
                ])
              ),
            ],
          })),
          e
        );
      })();
      class on extends Et {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const t = super._subscribe(n);
          return !t.closed && n.next(this._value), t;
        }
        getValue() {
          const { hasError: n, thrownError: t, _value: r } = this;
          if (n) throw t;
          return this._throwIfClosed(), r;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      const fl = Qn(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: ZN } = Array,
        { getPrototypeOf: YN, prototype: QN, keys: XN } = Object;
      function $_(e) {
        if (1 === e.length) {
          const n = e[0];
          if (ZN(n)) return { args: n, keys: null };
          if (
            (function JN(e) {
              return e && "object" == typeof e && YN(e) === QN;
            })(n)
          ) {
            const t = XN(n);
            return { args: t.map((r) => n[r]), keys: t };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: eO } = Array;
      function H_(e) {
        return z((n) =>
          (function tO(e, n) {
            return eO(n) ? e(...n) : e(n);
          })(e, n)
        );
      }
      function U_(e, n) {
        return e.reduce((t, r, o) => ((t[r] = n[o]), t), {});
      }
      function z_(...e) {
        const n = ti(e),
          t = Bh(e),
          { args: r, keys: o } = $_(e);
        if (0 === r.length) return Le([], n);
        const i = new De(
          (function nO(e, n, t = In) {
            return (r) => {
              G_(
                n,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    G_(
                      n,
                      () => {
                        const u = Le(e[l], n);
                        let c = !1;
                        u.subscribe(
                          Fe(
                            r,
                            (d) => {
                              (i[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(t(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, n, o ? (s) => U_(o, s) : In)
        );
        return t ? i.pipe(H_(t)) : i;
      }
      function G_(e, n, t) {
        e ? An(t, e, n) : n();
      }
      function Qi(...e) {
        return (function rO() {
          return qr(1);
        })()(Le(e, ti(e)));
      }
      function hl(e) {
        return new De((n) => {
          kt(e()).subscribe(n);
        });
      }
      function Xi(e, n) {
        const t = ne(e) ? e : () => e,
          r = (o) => o.error(t());
        return new De(n ? (o) => n.schedule(r, 0, o) : r);
      }
      function _f() {
        return Oe((e, n) => {
          let t = null;
          e._refCount++;
          const r = Fe(n, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (t = null);
            const o = e._connection,
              i = t;
            (t = null),
              o && (!i || o === i) && o.unsubscribe(),
              n.unsubscribe();
          });
          e.subscribe(r), r.closed || (t = e.connect());
        });
      }
      class W_ extends De {
        constructor(n, t) {
          super(),
            (this.source = n),
            (this.subjectFactory = t),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            ei(n) && (this.lift = n.lift);
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n);
        }
        getSubject() {
          const n = this._subject;
          return (
            (!n || n.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: n } = this;
          (this._subject = this._connection = null), n?.unsubscribe();
        }
        connect() {
          let n = this._connection;
          if (!n) {
            n = this._connection = new Ue();
            const t = this.getSubject();
            n.add(
              this.source.subscribe(
                Fe(
                  t,
                  void 0,
                  () => {
                    this._teardown(), t.complete();
                  },
                  (r) => {
                    this._teardown(), t.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              n.closed && ((this._connection = null), (n = Ue.EMPTY));
          }
          return n;
        }
        refCount() {
          return _f()(this);
        }
      }
      function Wt(e, n) {
        return Oe((t, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          t.subscribe(
            Fe(
              r,
              (l) => {
                o?.unsubscribe();
                let u = 0;
                const c = i++;
                kt(e(l, c)).subscribe(
                  (o = Fe(
                    r,
                    (d) => r.next(n ? n(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Cn(e) {
        return e <= 0
          ? () => an
          : Oe((n, t) => {
              let r = 0;
              n.subscribe(
                Fe(t, (o) => {
                  ++r <= e && (t.next(o), e <= r && t.complete());
                })
              );
            });
      }
      function pl(e) {
        return Oe((n, t) => {
          let r = !1;
          n.subscribe(
            Fe(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => {
                r || t.next(e), t.complete();
              }
            )
          );
        });
      }
      function q_(e = iO) {
        return Oe((n, t) => {
          let r = !1;
          n.subscribe(
            Fe(
              t,
              (o) => {
                (r = !0), t.next(o);
              },
              () => (r ? t.complete() : t.error(e()))
            )
          );
        });
      }
      function iO() {
        return new fl();
      }
      function lr(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Kn((o, i) => e(o, i, r)) : In,
            Cn(1),
            t ? pl(n) : q_(() => new fl())
          );
      }
      function ot(e, n, t) {
        const r = ne(e) || n || t ? { next: e, error: n, complete: t } : e;
        return r
          ? Oe((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Fe(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : In;
      }
      function ur(e) {
        return Oe((n, t) => {
          let i,
            r = null,
            o = !1;
          (r = n.subscribe(
            Fe(t, void 0, void 0, (s) => {
              (i = kt(e(s, ur(e)(n)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(t)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(t));
        });
      }
      function K_(e, n) {
        return Oe(
          (function sO(e, n, t, r, o) {
            return (i, s) => {
              let a = t,
                l = n,
                u = 0;
              i.subscribe(
                Fe(
                  s,
                  (c) => {
                    const d = u++;
                    (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
                  },
                  o &&
                    (() => {
                      a && s.next(l), s.complete();
                    })
                )
              );
            };
          })(e, n, arguments.length >= 2, !0)
        );
      }
      function Cf(e) {
        return e <= 0
          ? () => an
          : Oe((n, t) => {
              let r = [];
              n.subscribe(
                Fe(
                  t,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) t.next(o);
                    t.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Z_(e, n) {
        const t = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? Kn((o, i) => e(o, i, r)) : In,
            Cf(1),
            t ? pl(n) : q_(() => new fl())
          );
      }
      function wf(e) {
        return Oe((n, t) => {
          try {
            n.subscribe(t);
          } finally {
            t.add(e);
          }
        });
      }
      const K = "primary",
        Ji = Symbol("RouteTitle");
      class uO {
        constructor(n) {
          this.params = n || {};
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t[0] : t;
          }
          return null;
        }
        getAll(n) {
          if (this.has(n)) {
            const t = this.params[n];
            return Array.isArray(t) ? t : [t];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Lo(e) {
        return new uO(e);
      }
      function cO(e, n, t) {
        const r = t.path.split("/");
        if (
          r.length > e.length ||
          ("full" === t.pathMatch && (n.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function wn(e, n) {
        const t = e ? Object.keys(e) : void 0,
          r = n ? Object.keys(n) : void 0;
        if (!t || !r || t.length != r.length) return !1;
        let o;
        for (let i = 0; i < t.length; i++)
          if (((o = t[i]), !Y_(e[o], n[o]))) return !1;
        return !0;
      }
      function Y_(e, n) {
        if (Array.isArray(e) && Array.isArray(n)) {
          if (e.length !== n.length) return !1;
          const t = [...e].sort(),
            r = [...n].sort();
          return t.every((o, i) => r[i] === o);
        }
        return e === n;
      }
      function Q_(e) {
        return Array.prototype.concat.apply([], e);
      }
      function X_(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Qe(e, n) {
        for (const t in e) e.hasOwnProperty(t) && n(e[t], t);
      }
      function cr(e) {
        return Yc(e) ? e : Ni(e) ? Le(Promise.resolve(e)) : L(e);
      }
      const gl = !1,
        fO = {
          exact: function tC(e, n, t) {
            if (
              !Nr(e.segments, n.segments) ||
              !ml(e.segments, n.segments, t) ||
              e.numberOfChildren !== n.numberOfChildren
            )
              return !1;
            for (const r in n.children)
              if (!e.children[r] || !tC(e.children[r], n.children[r], t))
                return !1;
            return !0;
          },
          subset: nC,
        },
        J_ = {
          exact: function hO(e, n) {
            return wn(e, n);
          },
          subset: function pO(e, n) {
            return (
              Object.keys(n).length <= Object.keys(e).length &&
              Object.keys(n).every((t) => Y_(e[t], n[t]))
            );
          },
          ignored: () => !0,
        };
      function eC(e, n, t) {
        return (
          fO[t.paths](e.root, n.root, t.matrixParams) &&
          J_[t.queryParams](e.queryParams, n.queryParams) &&
          !("exact" === t.fragment && e.fragment !== n.fragment)
        );
      }
      function nC(e, n, t) {
        return rC(e, n, n.segments, t);
      }
      function rC(e, n, t, r) {
        if (e.segments.length > t.length) {
          const o = e.segments.slice(0, t.length);
          return !(!Nr(o, t) || n.hasChildren() || !ml(o, t, r));
        }
        if (e.segments.length === t.length) {
          if (!Nr(e.segments, t) || !ml(e.segments, t, r)) return !1;
          for (const o in n.children)
            if (!e.children[o] || !nC(e.children[o], n.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = t.slice(0, e.segments.length),
            i = t.slice(e.segments.length);
          return (
            !!(Nr(e.segments, o) && ml(e.segments, o, r) && e.children[K]) &&
            rC(e.children[K], n, i, r)
          );
        }
      }
      function ml(e, n, t) {
        return n.every((r, o) => J_[t](e[o].parameters, r.parameters));
      }
      class dr {
        constructor(n = new J([], {}), t = {}, r = null) {
          (this.root = n), (this.queryParams = t), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Lo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return yO.serialize(this);
        }
      }
      class J {
        constructor(n, t) {
          (this.segments = n),
            (this.children = t),
            (this.parent = null),
            Qe(t, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return yl(this);
        }
      }
      class es {
        constructor(n, t) {
          (this.path = n), (this.parameters = t);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Lo(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return sC(this);
        }
      }
      function Nr(e, n) {
        return e.length === n.length && e.every((t, r) => t.path === n[r].path);
      }
      let ts = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({
            token: e,
            factory: function () {
              return new bf();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class bf {
        parse(n) {
          const t = new MO(n);
          return new dr(
            t.parseRootSegment(),
            t.parseQueryParams(),
            t.parseFragment()
          );
        }
        serialize(n) {
          const t = `/${ns(n.root, !0)}`,
            r = (function _O(e) {
              const n = Object.keys(e)
                .map((t) => {
                  const r = e[t];
                  return Array.isArray(r)
                    ? r.map((o) => `${vl(t)}=${vl(o)}`).join("&")
                    : `${vl(t)}=${vl(r)}`;
                })
                .filter((t) => !!t);
              return n.length ? `?${n.join("&")}` : "";
            })(n.queryParams);
          return `${t}${r}${
            "string" == typeof n.fragment
              ? `#${(function vO(e) {
                  return encodeURI(e);
                })(n.fragment)}`
              : ""
          }`;
        }
      }
      const yO = new bf();
      function yl(e) {
        return e.segments.map((n) => sC(n)).join("/");
      }
      function ns(e, n) {
        if (!e.hasChildren()) return yl(e);
        if (n) {
          const t = e.children[K] ? ns(e.children[K], !1) : "",
            r = [];
          return (
            Qe(e.children, (o, i) => {
              i !== K && r.push(`${i}:${ns(o, !1)}`);
            }),
            r.length > 0 ? `${t}(${r.join("//")})` : t
          );
        }
        {
          const t = (function mO(e, n) {
            let t = [];
            return (
              Qe(e.children, (r, o) => {
                o === K && (t = t.concat(n(r, o)));
              }),
              Qe(e.children, (r, o) => {
                o !== K && (t = t.concat(n(r, o)));
              }),
              t
            );
          })(e, (r, o) =>
            o === K ? [ns(e.children[K], !1)] : [`${o}:${ns(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[K]
            ? `${yl(e)}/${t[0]}`
            : `${yl(e)}/(${t.join("//")})`;
        }
      }
      function oC(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function vl(e) {
        return oC(e).replace(/%3B/gi, ";");
      }
      function Ef(e) {
        return oC(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Dl(e) {
        return decodeURIComponent(e);
      }
      function iC(e) {
        return Dl(e.replace(/\+/g, "%20"));
      }
      function sC(e) {
        return `${Ef(e.path)}${(function DO(e) {
          return Object.keys(e)
            .map((n) => `;${Ef(n)}=${Ef(e[n])}`)
            .join("");
        })(e.parameters)}`;
      }
      const CO = /^[^\/()?;=#]+/;
      function _l(e) {
        const n = e.match(CO);
        return n ? n[0] : "";
      }
      const wO = /^[^=?&#]+/,
        EO = /^[^&#]+/;
      class MO {
        constructor(n) {
          (this.url = n), (this.remaining = n);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new J([], {})
              : new J([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const n = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(n);
            } while (this.consumeOptional("&"));
          return n;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const n = [];
          for (
            this.peekStartsWith("(") || n.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), n.push(this.parseSegment());
          let t = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (t = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (n.length > 0 || Object.keys(t).length > 0) && (r[K] = new J(n, t)),
            r
          );
        }
        parseSegment() {
          const n = _l(this.remaining);
          if ("" === n && this.peekStartsWith(";")) throw new S(4009, gl);
          return this.capture(n), new es(Dl(n), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const n = {};
          for (; this.consumeOptional(";"); ) this.parseParam(n);
          return n;
        }
        parseParam(n) {
          const t = _l(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = _l(this.remaining);
            o && ((r = o), this.capture(r));
          }
          n[Dl(t)] = Dl(r);
        }
        parseQueryParam(n) {
          const t = (function bO(e) {
            const n = e.match(wO);
            return n ? n[0] : "";
          })(this.remaining);
          if (!t) return;
          this.capture(t);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function SO(e) {
              const n = e.match(EO);
              return n ? n[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = iC(t),
            i = iC(r);
          if (n.hasOwnProperty(o)) {
            let s = n[o];
            Array.isArray(s) || ((s = [s]), (n[o] = s)), s.push(i);
          } else n[o] = i;
        }
        parseParens(n) {
          const t = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = _l(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new S(4010, gl);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : n && (i = K);
            const s = this.parseChildren();
            (t[i] = 1 === Object.keys(s).length ? s[K] : new J([], s)),
              this.consumeOptional("//");
          }
          return t;
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n);
        }
        consumeOptional(n) {
          return (
            !!this.peekStartsWith(n) &&
            ((this.remaining = this.remaining.substring(n.length)), !0)
          );
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new S(4011, gl);
        }
      }
      function Sf(e) {
        return e.segments.length > 0 ? new J([], { [K]: e }) : e;
      }
      function Cl(e) {
        const n = {};
        for (const r of Object.keys(e.children)) {
          const i = Cl(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (n[r] = i);
        }
        return (function IO(e) {
          if (1 === e.numberOfChildren && e.children[K]) {
            const n = e.children[K];
            return new J(e.segments.concat(n.segments), n.children);
          }
          return e;
        })(new J(e.segments, n));
      }
      function Or(e) {
        return e instanceof dr;
      }
      const Mf = !1;
      function AO(e, n, t, r, o) {
        if (0 === t.length) return Vo(n.root, n.root, n.root, r, o);
        const i = (function dC(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new cC(!0, 0, e);
          let n = 0,
            t = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Qe(i.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (t = !0)
                      : ".." === a
                      ? n++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new cC(t, n, r);
        })(t);
        return i.toRoot()
          ? Vo(n.root, n.root, new J([], {}), r, o)
          : (function s(l) {
              const u = (function xO(e, n, t, r) {
                  if (e.isAbsolute) return new Bo(n.root, !0, 0);
                  if (-1 === r) return new Bo(t, t === n.root, 0);
                  return (function fC(e, n, t) {
                    let r = e,
                      o = n,
                      i = t;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r))
                        throw new S(4005, Mf && "Invalid number of '../'");
                      o = r.segments.length;
                    }
                    return new Bo(r, !1, o - i);
                  })(t, r + (rs(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, n, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? jo(u.segmentGroup, u.index, i.commands)
                  : If(u.segmentGroup, u.index, i.commands);
              return Vo(n.root, u.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function rs(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function os(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Vo(e, n, t, r, o) {
        let s,
          i = {};
        r &&
          Qe(r, (l, u) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === n ? t : uC(e, n, t));
        const a = Sf(Cl(s));
        return new dr(a, i, o);
      }
      function uC(e, n, t) {
        const r = {};
        return (
          Qe(e.children, (o, i) => {
            r[i] = o === n ? t : uC(o, n, t);
          }),
          new J(e.segments, r)
        );
      }
      class cC {
        constructor(n, t, r) {
          if (
            ((this.isAbsolute = n),
            (this.numberOfDoubleDots = t),
            (this.commands = r),
            n && r.length > 0 && rs(r[0]))
          )
            throw new S(
              4003,
              Mf && "Root segment cannot have matrix parameters"
            );
          const o = r.find(os);
          if (o && o !== X_(r))
            throw new S(4004, Mf && "{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Bo {
        constructor(n, t, r) {
          (this.segmentGroup = n), (this.processChildren = t), (this.index = r);
        }
      }
      function If(e, n, t) {
        if (
          (e || (e = new J([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return jo(e, n, t);
        const r = (function NO(e, n, t) {
            let r = 0,
              o = n;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= t.length) return i;
              const s = e.segments[o],
                a = t[r];
              if (os(a)) break;
              const l = `${a}`,
                u = r < t.length - 1 ? t[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!pC(l, u, s)) return i;
                r += 2;
              } else {
                if (!pC(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, n, t),
          o = t.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new J(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[K] = new J(e.segments.slice(r.pathIndex), e.children)),
            jo(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new J(e.segments, {})
          : r.match && !e.hasChildren()
          ? Af(e, n, t)
          : r.match
          ? jo(e, 0, o)
          : Af(e, n, t);
      }
      function jo(e, n, t) {
        if (0 === t.length) return new J(e.segments, {});
        {
          const r = (function RO(e) {
              return os(e[0]) ? e[0].outlets : { [K]: e };
            })(t),
            o = {};
          if (
            !r[K] &&
            e.children[K] &&
            1 === e.numberOfChildren &&
            0 === e.children[K].segments.length
          ) {
            const i = jo(e.children[K], n, t);
            return new J(e.segments, i.children);
          }
          return (
            Qe(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = If(e.children[s], n, i));
            }),
            Qe(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new J(e.segments, o)
          );
        }
      }
      function Af(e, n, t) {
        const r = e.segments.slice(0, n);
        let o = 0;
        for (; o < t.length; ) {
          const i = t[o];
          if (os(i)) {
            const l = OO(i.outlets);
            return new J(r, l);
          }
          if (0 === o && rs(t[0])) {
            r.push(new es(e.segments[n].path, hC(t[0]))), o++;
            continue;
          }
          const s = os(i) ? i.outlets[K] : `${i}`,
            a = o < t.length - 1 ? t[o + 1] : null;
          s && a && rs(a)
            ? (r.push(new es(s, hC(a))), (o += 2))
            : (r.push(new es(s, {})), o++);
        }
        return new J(r, {});
      }
      function OO(e) {
        const n = {};
        return (
          Qe(e, (t, r) => {
            "string" == typeof t && (t = [t]),
              null !== t && (n[r] = Af(new J([], {}), 0, t));
          }),
          n
        );
      }
      function hC(e) {
        const n = {};
        return Qe(e, (t, r) => (n[r] = `${t}`)), n;
      }
      function pC(e, n, t) {
        return e == t.path && wn(n, t.parameters);
      }
      const is = "imperative";
      class bn {
        constructor(n, t) {
          (this.id = n), (this.url = t);
        }
      }
      class Tf extends bn {
        constructor(n, t, r = "imperative", o = null) {
          super(n, t),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Fr extends bn {
        constructor(n, t, r) {
          super(n, t), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class wl extends bn {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class bl extends bn {
        constructor(n, t, r, o) {
          super(n, t), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class xf extends bn {
        constructor(n, t, r, o) {
          super(n, t), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class FO extends bn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class PO extends bn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class kO extends bn {
        constructor(n, t, r, o, i) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class LO extends bn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class VO extends bn {
        constructor(n, t, r, o) {
          super(n, t),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class BO {
        constructor(n) {
          (this.route = n), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class jO {
        constructor(n) {
          (this.route = n), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class $O {
        constructor(n) {
          (this.snapshot = n), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class HO {
        constructor(n) {
          (this.snapshot = n), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class UO {
        constructor(n) {
          (this.snapshot = n), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zO {
        constructor(n) {
          (this.snapshot = n), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class gC {
        constructor(n, t, r) {
          (this.routerEvent = n),
            (this.position = t),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let qO = (() => {
          class e {
            createUrlTree(t, r, o, i, s, a) {
              return AO(t || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        ZO = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: function (n) {
                return qO.ɵfac(n);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class mC {
        constructor(n) {
          this._root = n;
        }
        get root() {
          return this._root.value;
        }
        parent(n) {
          const t = this.pathFromRoot(n);
          return t.length > 1 ? t[t.length - 2] : null;
        }
        children(n) {
          const t = Rf(n, this._root);
          return t ? t.children.map((r) => r.value) : [];
        }
        firstChild(n) {
          const t = Rf(n, this._root);
          return t && t.children.length > 0 ? t.children[0].value : null;
        }
        siblings(n) {
          const t = Nf(n, this._root);
          return t.length < 2
            ? []
            : t[t.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== n);
        }
        pathFromRoot(n) {
          return Nf(n, this._root).map((t) => t.value);
        }
      }
      function Rf(e, n) {
        if (e === n.value) return n;
        for (const t of n.children) {
          const r = Rf(e, t);
          if (r) return r;
        }
        return null;
      }
      function Nf(e, n) {
        if (e === n.value) return [n];
        for (const t of n.children) {
          const r = Nf(e, t);
          if (r.length) return r.unshift(n), r;
        }
        return [];
      }
      class Yn {
        constructor(n, t) {
          (this.value = n), (this.children = t);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function $o(e) {
        const n = {};
        return e && e.children.forEach((t) => (n[t.value.outlet] = t)), n;
      }
      class yC extends mC {
        constructor(n, t) {
          super(n), (this.snapshot = t), Of(this, n);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function vC(e, n) {
        const t = (function YO(e, n) {
            const s = new El([], {}, {}, "", {}, K, n, null, e.root, -1, {});
            return new _C("", new Yn(s, []));
          })(e, n),
          r = new on([new es("", {})]),
          o = new on({}),
          i = new on({}),
          s = new on({}),
          a = new on(""),
          l = new Pr(r, o, s, a, i, K, n, t.root);
        return (l.snapshot = t.root), new yC(new Yn(l, []), t);
      }
      class Pr {
        constructor(n, t, r, o, i, s, a, l) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(z((u) => u[Ji])) ?? L(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(z((n) => Lo(n)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(z((n) => Lo(n)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function DC(e, n = "emptyOnly") {
        const t = e.pathFromRoot;
        let r = 0;
        if ("always" !== n)
          for (r = t.length - 1; r >= 1; ) {
            const o = t[r],
              i = t[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function QO(e) {
          return e.reduce(
            (n, t) => ({
              params: { ...n.params, ...t.params },
              data: { ...n.data, ...t.data },
              resolve: {
                ...t.data,
                ...n.resolve,
                ...t.routeConfig?.data,
                ...t._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(t.slice(r));
      }
      class El {
        get title() {
          return this.data?.[Ji];
        }
        constructor(n, t, r, o, i, s, a, l, u, c, d) {
          (this.url = n),
            (this.params = t),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Lo(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Lo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class _C extends mC {
        constructor(n, t) {
          super(t), (this.url = n), Of(this, t);
        }
        toString() {
          return CC(this._root);
        }
      }
      function Of(e, n) {
        (n.value._routerState = e), n.children.forEach((t) => Of(e, t));
      }
      function CC(e) {
        const n =
          e.children.length > 0 ? ` { ${e.children.map(CC).join(", ")} } ` : "";
        return `${e.value}${n}`;
      }
      function Ff(e) {
        if (e.snapshot) {
          const n = e.snapshot,
            t = e._futureSnapshot;
          (e.snapshot = t),
            wn(n.queryParams, t.queryParams) ||
              e.queryParams.next(t.queryParams),
            n.fragment !== t.fragment && e.fragment.next(t.fragment),
            wn(n.params, t.params) || e.params.next(t.params),
            (function dO(e, n) {
              if (e.length !== n.length) return !1;
              for (let t = 0; t < e.length; ++t) if (!wn(e[t], n[t])) return !1;
              return !0;
            })(n.url, t.url) || e.url.next(t.url),
            wn(n.data, t.data) || e.data.next(t.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Pf(e, n) {
        const t =
          wn(e.params, n.params) &&
          (function gO(e, n) {
            return (
              Nr(e, n) && e.every((t, r) => wn(t.parameters, n[r].parameters))
            );
          })(e.url, n.url);
        return (
          t &&
          !(!e.parent != !n.parent) &&
          (!e.parent || Pf(e.parent, n.parent))
        );
      }
      function ss(e, n, t) {
        if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
          const r = t.value;
          r._futureSnapshot = n.value;
          const o = (function JO(e, n, t) {
            return n.children.map((r) => {
              for (const o of t.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return ss(e, r, o);
              return ss(e, r);
            });
          })(e, n, t);
          return new Yn(r, o);
        }
        {
          if (e.shouldAttach(n.value)) {
            const i = e.retrieve(n.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = n.value),
                (s.children = n.children.map((a) => ss(e, a))),
                s
              );
            }
          }
          const r = (function eF(e) {
              return new Pr(
                new on(e.url),
                new on(e.params),
                new on(e.queryParams),
                new on(e.fragment),
                new on(e.data),
                e.outlet,
                e.component,
                e
              );
            })(n.value),
            o = n.children.map((i) => ss(e, i));
          return new Yn(r, o);
        }
      }
      const kf = "ngNavigationCancelingError";
      function wC(e, n) {
        const { redirectTo: t, navigationBehaviorOptions: r } = Or(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          o = bC(!1, 0, n);
        return (o.url = t), (o.navigationBehaviorOptions = r), o;
      }
      function bC(e, n, t) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[kf] = !0), (r.cancellationCode = n), t && (r.url = t), r;
      }
      function EC(e) {
        return SC(e) && Or(e.url);
      }
      function SC(e) {
        return e && e[kf];
      }
      class tF {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new as()),
            (this.attachRef = null);
        }
      }
      let as = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(t, r) {
            const o = this.getOrCreateContext(t);
            (o.outlet = r), this.contexts.set(t, o);
          }
          onChildOutletDestroyed(t) {
            const r = this.getContext(t);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const t = this.contexts;
            return (this.contexts = new Map()), t;
          }
          onOutletReAttached(t) {
            this.contexts = t;
          }
          getOrCreateContext(t) {
            let r = this.getContext(t);
            return r || ((r = new tF()), this.contexts.set(t, r)), r;
          }
          getContext(t) {
            return this.contexts.get(t) || null;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Sl = !1;
      let Lf = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = K),
              (this.activateEvents = new he()),
              (this.deactivateEvents = new he()),
              (this.attachEvents = new he()),
              (this.detachEvents = new he()),
              (this.parentContexts = Q(as)),
              (this.location = Q(en)),
              (this.changeDetector = Q(Fo)),
              (this.environmentInjector = Q(hn));
          }
          ngOnChanges(t) {
            if (t.name) {
              const { firstChange: r, previousValue: o } = t.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(t) {
            return this.parentContexts.getContext(t)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const t = this.parentContexts.getContext(this.name);
            t?.route &&
              (t.attachRef
                ? this.attach(t.attachRef, t.route)
                : this.activateWith(t.route, t.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new S(4012, Sl);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new S(4012, Sl);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new S(4012, Sl);
            this.location.detach();
            const t = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(t.instance),
              t
            );
          }
          attach(t, r) {
            (this.activated = t),
              (this._activatedRoute = r),
              this.location.insert(t.hostView),
              this.attachEvents.emit(t.instance);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, r) {
            if (this.isActivated) throw new S(4013, Sl);
            this._activatedRoute = t;
            const o = this.location,
              s = t.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new nF(t, a, o.injector);
            if (
              r &&
              (function rF(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = o.createComponent(u, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵdir = U({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Bt],
          })),
          e
        );
      })();
      class nF {
        constructor(n, t, r) {
          (this.route = n), (this.childContexts = t), (this.parent = r);
        }
        get(n, t) {
          return n === Pr
            ? this.route
            : n === as
            ? this.childContexts
            : this.parent.get(n, t);
        }
      }
      let Vf = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵcmp = It({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [pv],
            decls: 1,
            vars: 0,
            template: function (t, r) {
              1 & t && P(0, "router-outlet");
            },
            dependencies: [Lf],
            encapsulation: 2,
          })),
          e
        );
      })();
      function MC(e, n) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = La(e.providers, n, `Route: ${e.path}`)),
          e._injector ?? n
        );
      }
      function jf(e) {
        const n = e.children && e.children.map(jf),
          t = n ? { ...e, children: n } : { ...e };
        return (
          !t.component &&
            !t.loadComponent &&
            (n || t.loadChildren) &&
            t.outlet &&
            t.outlet !== K &&
            (t.component = Vf),
          t
        );
      }
      function qt(e) {
        return e.outlet || K;
      }
      function IC(e, n) {
        const t = e.filter((r) => qt(r) === n);
        return t.push(...e.filter((r) => qt(r) !== n)), t;
      }
      function ls(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let n = e.parent; n; n = n.parent) {
          const t = n.routeConfig;
          if (t?._loadedInjector) return t._loadedInjector;
          if (t?._injector) return t._injector;
        }
        return null;
      }
      class lF {
        constructor(n, t, r, o) {
          (this.routeReuseStrategy = n),
            (this.futureState = t),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(n) {
          const t = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(t, r, n),
            Ff(this.futureState.root),
            this.activateChildRoutes(t, r, n);
        }
        deactivateChildRoutes(n, t, r) {
          const o = $o(t);
          n.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Qe(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(n, t, r) {
          const o = n.value,
            i = t ? t.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(n, t, s.children);
            } else this.deactivateChildRoutes(n, t, r);
          else i && this.deactivateRouteAndItsChildren(t, r);
        }
        deactivateRouteAndItsChildren(n, t) {
          n.value.component &&
          this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, t)
            : this.deactivateRouteAndOutlet(n, t);
        }
        detachAndStoreRouteSubtree(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            i = $o(n);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(n.value.snapshot, {
              componentRef: s,
              route: n,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(n, t) {
          const r = t.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : t,
            i = $o(n);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(n, t, r) {
          const o = $o(t);
          n.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new zO(i.value.snapshot));
          }),
            n.children.length && this.forwardEvent(new HO(n.value.snapshot));
        }
        activateRoutes(n, t, r) {
          const o = n.value,
            i = t ? t.value : null;
          if ((Ff(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(n, t, s.children);
            } else this.activateChildRoutes(n, t, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Ff(a.route.value),
                this.activateChildRoutes(n, null, s.children);
            } else {
              const a = ls(o.snapshot),
                l = a?.get(Mi) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(n, null, s.children);
            }
          } else this.activateChildRoutes(n, null, r);
        }
      }
      class AC {
        constructor(n) {
          (this.path = n), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ml {
        constructor(n, t) {
          (this.component = n), (this.route = t);
        }
      }
      function uF(e, n, t) {
        const r = e._root;
        return us(r, n ? n._root : null, t, [r.value]);
      }
      function Ho(e, n) {
        const t = Symbol(),
          r = n.get(e, t);
        return r === t
          ? "function" != typeof e ||
            (function $b(e) {
              return null !== Vs(e);
            })(e)
            ? n.get(e)
            : e
          : r;
      }
      function us(
        e,
        n,
        t,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = $o(n);
        return (
          e.children.forEach((s) => {
            (function dF(
              e,
              n,
              t,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = n ? n.value : null,
                a = t ? t.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function fF(e, n, t) {
                  if ("function" == typeof t) return t(e, n);
                  switch (t) {
                    case "pathParamsChange":
                      return !Nr(e.url, n.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Nr(e.url, n.url) || !wn(e.queryParams, n.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Pf(e, n) || !wn(e.queryParams, n.queryParams);
                    default:
                      return !Pf(e, n);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new AC(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  us(e, n, i.component ? (a ? a.children : null) : t, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Ml(a.outlet.component, s));
              } else
                s && cs(n, a, o),
                  o.canActivateChecks.push(new AC(r)),
                  us(e, null, i.component ? (a ? a.children : null) : t, r, o);
            })(s, i[s.value.outlet], t, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Qe(i, (s, a) => cs(s, t.getContext(a), o)),
          o
        );
      }
      function cs(e, n, t) {
        const r = $o(e),
          o = e.value;
        Qe(r, (i, s) => {
          cs(i, o.component ? (n ? n.children.getContext(s) : null) : n, t);
        }),
          t.canDeactivateChecks.push(
            new Ml(
              o.component && n && n.outlet && n.outlet.isActivated
                ? n.outlet.component
                : null,
              o
            )
          );
      }
      function ds(e) {
        return "function" == typeof e;
      }
      function $f(e) {
        return e instanceof fl || "EmptyError" === e?.name;
      }
      const Il = Symbol("INITIAL_VALUE");
      function Uo() {
        return Wt((e) =>
          z_(
            e.map((n) =>
              n.pipe(
                Cn(1),
                (function oO(...e) {
                  const n = ti(e);
                  return Oe((t, r) => {
                    (n ? Qi(e, t, n) : Qi(e, t)).subscribe(r);
                  });
                })(Il)
              )
            )
          ).pipe(
            z((n) => {
              for (const t of n)
                if (!0 !== t) {
                  if (t === Il) return Il;
                  if (!1 === t || t instanceof dr) return t;
                }
              return !0;
            }),
            Kn((n) => n !== Il),
            Cn(1)
          )
        );
      }
      function TC(e) {
        return (function Ts(...e) {
          return xs(e);
        })(
          ot((n) => {
            if (Or(n)) throw wC(0, n);
          }),
          z((n) => !0 === n)
        );
      }
      const Hf = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function xC(e, n, t, r, o) {
        const i = Uf(e, n, t);
        return i.matched
          ? (function TF(e, n, t, r) {
              const o = n.canMatch;
              return o && 0 !== o.length
                ? L(
                    o.map((s) => {
                      const a = Ho(s, e);
                      return cr(
                        (function vF(e) {
                          return e && ds(e.canMatch);
                        })(a)
                          ? a.canMatch(n, t)
                          : e.runInContext(() => a(n, t))
                      );
                    })
                  ).pipe(Uo(), TC())
                : L(!0);
            })((r = MC(n, r)), n, t).pipe(z((s) => (!0 === s ? i : { ...Hf })))
          : L(i);
      }
      function Uf(e, n, t) {
        if ("" === n.path)
          return "full" === n.pathMatch && (e.hasChildren() || t.length > 0)
            ? { ...Hf }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: t,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (n.matcher || cO)(t, e, n);
        if (!o) return { ...Hf };
        const i = {};
        Qe(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: t.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Al(e, n, t, r) {
        if (
          t.length > 0 &&
          (function NF(e, n, t) {
            return t.some((r) => Tl(e, n, r) && qt(r) !== K);
          })(e, t, r)
        ) {
          const i = new J(
            n,
            (function RF(e, n, t, r) {
              const o = {};
              (o[K] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = n.length);
              for (const i of t)
                if ("" === i.path && qt(i) !== K) {
                  const s = new J([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = n.length),
                    (o[qt(i)] = s);
                }
              return o;
            })(e, n, r, new J(t, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = n.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === t.length &&
          (function OF(e, n, t) {
            return t.some((r) => Tl(e, n, r));
          })(e, t, r)
        ) {
          const i = new J(
            e.segments,
            (function xF(e, n, t, r, o) {
              const i = {};
              for (const s of r)
                if (Tl(e, t, s) && !o[qt(s)]) {
                  const a = new J([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = n.length),
                    (i[qt(s)] = a);
                }
              return { ...o, ...i };
            })(e, n, t, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = n.length),
            { segmentGroup: i, slicedSegments: t }
          );
        }
        const o = new J(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = n.length),
          { segmentGroup: o, slicedSegments: t }
        );
      }
      function Tl(e, n, t) {
        return (
          (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) &&
          "" === t.path
        );
      }
      function RC(e, n, t, r) {
        return (
          !!(qt(e) === r || (r !== K && Tl(n, t, e))) &&
          ("**" === e.path || Uf(n, e, t).matched)
        );
      }
      function NC(e, n, t) {
        return 0 === n.length && !e.children[t];
      }
      const xl = !1;
      class Rl {
        constructor(n) {
          this.segmentGroup = n || null;
        }
      }
      class OC {
        constructor(n) {
          this.urlTree = n;
        }
      }
      function fs(e) {
        return Xi(new Rl(e));
      }
      function FC(e) {
        return Xi(new OC(e));
      }
      class LF {
        constructor(n, t, r, o, i) {
          (this.injector = n),
            (this.configLoader = t),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const n = Al(this.urlTree.root, [], [], this.config).segmentGroup,
            t = new J(n.segments, n.children);
          return this.expandSegmentGroup(this.injector, this.config, t, K)
            .pipe(
              z((i) =>
                this.createUrlTree(
                  Cl(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              ur((i) => {
                if (i instanceof OC)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Rl ? this.noMatchError(i) : i;
              })
            );
        }
        match(n) {
          return this.expandSegmentGroup(this.injector, this.config, n.root, K)
            .pipe(
              z((o) => this.createUrlTree(Cl(o), n.queryParams, n.fragment))
            )
            .pipe(
              ur((o) => {
                throw o instanceof Rl ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(n) {
          return new S(4002, xl);
        }
        createUrlTree(n, t, r) {
          const o = Sf(n);
          return new dr(o, t, r);
        }
        expandSegmentGroup(n, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(n, t, r).pipe(z((i) => new J([], i)))
            : this.expandSegment(n, r, t, r.segments, o, !0);
        }
        expandChildren(n, t, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Le(o).pipe(
            qn((i) => {
              const s = r.children[i],
                a = IC(t, i);
              return this.expandSegmentGroup(n, a, s, i).pipe(
                z((l) => ({ segment: l, outlet: i }))
              );
            }),
            K_((i, s) => ((i[s.outlet] = s.segment), i), {}),
            Z_()
          );
        }
        expandSegment(n, t, r, o, i, s) {
          return Le(r).pipe(
            qn((a) =>
              this.expandSegmentAgainstRoute(n, t, r, a, o, i, s).pipe(
                ur((u) => {
                  if (u instanceof Rl) return L(null);
                  throw u;
                })
              )
            ),
            lr((a) => !!a),
            ur((a, l) => {
              if ($f(a)) return NC(t, o, i) ? L(new J([], {})) : fs(t);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(n, t, r, o, i, s, a) {
          return RC(o, t, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(n, t, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s)
              : fs(t)
            : fs(t);
        }
        expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                n,
                t,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, t, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? FC(i)
            : this.lineralizeSegments(r, i).pipe(
                Ke((s) => {
                  const a = new J(s, {});
                  return this.expandSegment(n, a, t, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = Uf(t, o, i);
          if (!a) return fs(t);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? FC(d)
            : this.lineralizeSegments(o, d).pipe(
                Ke((f) => this.expandSegment(n, t, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(n, t, r, o, i) {
          return "**" === r.path
            ? ((n = MC(r, n)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? L({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(n, r)
                  ).pipe(
                    z(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new J(o, {})
                      )
                    )
                  )
                : L(new J(o, {})))
            : xC(t, r, o, n).pipe(
                Wt(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((n = r._injector ?? n), r, o).pipe(
                          Ke((c) => {
                            const d = c.injector ?? n,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: p } = Al(
                                t,
                                a,
                                l,
                                f
                              ),
                              y = new J(h.segments, h.children);
                            if (0 === p.length && y.hasChildren())
                              return this.expandChildren(d, f, y).pipe(
                                z((_) => new J(a, _))
                              );
                            if (0 === f.length && 0 === p.length)
                              return L(new J(a, {}));
                            const D = qt(r) === i;
                            return this.expandSegment(
                              d,
                              y,
                              f,
                              p,
                              D ? K : i,
                              !0
                            ).pipe(
                              z((A) => new J(a.concat(A.segments), A.children))
                            );
                          })
                        )
                      : fs(t)
                )
              );
        }
        getChildConfig(n, t, r) {
          return t.children
            ? L({ routes: t.children, injector: n })
            : t.loadChildren
            ? void 0 !== t._loadedRoutes
              ? L({ routes: t._loadedRoutes, injector: t._loadedInjector })
              : (function AF(e, n, t, r) {
                  const o = n.canLoad;
                  return void 0 === o || 0 === o.length
                    ? L(!0)
                    : L(
                        o.map((s) => {
                          const a = Ho(s, e);
                          return cr(
                            (function pF(e) {
                              return e && ds(e.canLoad);
                            })(a)
                              ? a.canLoad(n, t)
                              : e.runInContext(() => a(n, t))
                          );
                        })
                      ).pipe(Uo(), TC());
                })(n, t, r).pipe(
                  Ke((o) =>
                    o
                      ? this.configLoader.loadChildren(n, t).pipe(
                          ot((i) => {
                            (t._loadedRoutes = i.routes),
                              (t._loadedInjector = i.injector);
                          })
                        )
                      : (function PF(e) {
                          return Xi(bC(xl, 3));
                        })()
                  )
                )
            : L({ routes: [], injector: n });
        }
        lineralizeSegments(n, t) {
          let r = [],
            o = t.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return L(r);
            if (o.numberOfChildren > 1 || !o.children[K])
              return n.redirectTo, Xi(new S(4e3, xl));
            o = o.children[K];
          }
        }
        applyRedirectCommands(n, t, r) {
          return this.applyRedirectCreateUrlTree(
            t,
            this.urlSerializer.parse(t),
            n,
            r
          );
        }
        applyRedirectCreateUrlTree(n, t, r, o) {
          const i = this.createSegmentGroup(n, t.root, r, o);
          return new dr(
            i,
            this.createQueryParams(t.queryParams, this.urlTree.queryParams),
            t.fragment
          );
        }
        createQueryParams(n, t) {
          const r = {};
          return (
            Qe(n, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = t[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(n, t, r, o) {
          const i = this.createSegments(n, t.segments, r, o);
          let s = {};
          return (
            Qe(t.children, (a, l) => {
              s[l] = this.createSegmentGroup(n, a, r, o);
            }),
            new J(i, s)
          );
        }
        createSegments(n, t, r, o) {
          return t.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(n, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(n, t, r) {
          const o = r[t.path.substring(1)];
          if (!o) throw new S(4001, xl);
          return o;
        }
        findOrReturn(n, t) {
          let r = 0;
          for (const o of t) {
            if (o.path === n.path) return t.splice(r), o;
            r++;
          }
          return n;
        }
      }
      class BF {}
      class HF {
        constructor(n, t, r, o, i, s, a) {
          (this.injector = n),
            (this.rootComponentType = t),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const n = Al(
            this.urlTree.root,
            [],
            [],
            this.config.filter((t) => void 0 === t.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            n,
            K
          ).pipe(
            z((t) => {
              if (null === t) return null;
              const r = new El(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  K,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new Yn(r, t),
                i = new _C(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(n) {
          const t = n.value,
            r = DC(t, this.paramsInheritanceStrategy);
          (t.params = Object.freeze(r.params)),
            (t.data = Object.freeze(r.data)),
            n.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(n, t, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(n, t, r)
            : this.processSegment(n, t, r, r.segments, o);
        }
        processChildren(n, t, r) {
          return Le(Object.keys(r.children)).pipe(
            qn((o) => {
              const i = r.children[o],
                s = IC(t, o);
              return this.processSegmentGroup(n, s, i, o);
            }),
            K_((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function aO(e, n = !1) {
              return Oe((t, r) => {
                let o = 0;
                t.subscribe(
                  Fe(r, (i) => {
                    const s = e(i, o++);
                    (s || n) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            pl(null),
            Z_(),
            z((o) => {
              if (null === o) return null;
              const i = kC(o);
              return (
                (function UF(e) {
                  e.sort((n, t) =>
                    n.value.outlet === K
                      ? -1
                      : t.value.outlet === K
                      ? 1
                      : n.value.outlet.localeCompare(t.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(n, t, r, o, i) {
          return Le(t).pipe(
            qn((s) =>
              this.processSegmentAgainstRoute(s._injector ?? n, s, r, o, i)
            ),
            lr((s) => !!s),
            ur((s) => {
              if ($f(s)) return NC(r, o, i) ? L([]) : L(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(n, t, r, o, i) {
          if (t.redirectTo || !RC(t, r, o, i)) return L(null);
          let s;
          if ("**" === t.path) {
            const a = o.length > 0 ? X_(o).parameters : {},
              l = VC(r) + o.length;
            s = L({
              snapshot: new El(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                BC(t),
                qt(t),
                t.component ?? t._loadedComponent ?? null,
                t,
                LC(r),
                l,
                jC(t)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = xC(r, t, o, n).pipe(
              z(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = VC(r) + l.length;
                  return {
                    snapshot: new El(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      BC(t),
                      qt(t),
                      t.component ?? t._loadedComponent ?? null,
                      t,
                      LC(r),
                      d,
                      jC(t)
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            Wt((a) => {
              if (null === a) return L(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              n = t._injector ?? n;
              const d = t._loadedInjector ?? n,
                f = (function zF(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(t),
                { segmentGroup: h, slicedSegments: p } = Al(
                  r,
                  u,
                  c,
                  f.filter((D) => void 0 === D.redirectTo)
                );
              if (0 === p.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  z((D) => (null === D ? null : [new Yn(l, D)]))
                );
              if (0 === f.length && 0 === p.length) return L([new Yn(l, [])]);
              const y = qt(t) === i;
              return this.processSegment(d, f, h, p, y ? K : i).pipe(
                z((D) => (null === D ? null : [new Yn(l, D)]))
              );
            })
          );
        }
      }
      function GF(e) {
        const n = e.value.routeConfig;
        return n && "" === n.path && void 0 === n.redirectTo;
      }
      function kC(e) {
        const n = [],
          t = new Set();
        for (const r of e) {
          if (!GF(r)) {
            n.push(r);
            continue;
          }
          const o = n.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r);
        }
        for (const r of t) {
          const o = kC(r.children);
          n.push(new Yn(r.value, o));
        }
        return n.filter((r) => !t.has(r));
      }
      function LC(e) {
        let n = e;
        for (; n._sourceSegment; ) n = n._sourceSegment;
        return n;
      }
      function VC(e) {
        let n = e,
          t = n._segmentIndexShift ?? 0;
        for (; n._sourceSegment; )
          (n = n._sourceSegment), (t += n._segmentIndexShift ?? 0);
        return t - 1;
      }
      function BC(e) {
        return e.data || {};
      }
      function jC(e) {
        return e.resolve || {};
      }
      function $C(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function zf(e) {
        return Wt((n) => {
          const t = e(n);
          return t ? Le(t).pipe(z(() => n)) : L(n);
        });
      }
      const zo = new F("ROUTES");
      let Gf = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = Q(rD));
          }
          loadComponent(t) {
            if (this.componentLoaders.get(t))
              return this.componentLoaders.get(t);
            if (t._loadedComponent) return L(t._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(t);
            const r = cr(t.loadComponent()).pipe(
                z(UC),
                ot((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(t),
                    (t._loadedComponent = i);
                }),
                wf(() => {
                  this.componentLoaders.delete(t);
                })
              ),
              o = new W_(r, () => new Et()).pipe(_f());
            return this.componentLoaders.set(t, o), o;
          }
          loadChildren(t, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return L({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                z((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(t).injector),
                      (u = Q_(l.get(zo, [], $.Self | $.Optional))));
                  return { routes: u.map(jf), injector: l };
                }),
                wf(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new W_(i, () => new Et()).pipe(_f());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(t) {
            return cr(t()).pipe(
              z(UC),
              Ke((r) =>
                r instanceof fv || Array.isArray(r)
                  ? L(r)
                  : Le(this.compiler.compileModuleAsync(r))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function UC(e) {
        return (function JF(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Ol = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Et()),
              (this.configLoader = Q(Gf)),
              (this.environmentInjector = Q(hn)),
              (this.urlSerializer = Q(ts)),
              (this.rootContexts = Q(as)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => L(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new jO(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new BO(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(t) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...t, id: r });
          }
          setupNavigations(t) {
            return (
              (this.transitions = new on({
                id: 0,
                targetPageId: 0,
                currentUrlTree: t.currentUrlTree,
                currentRawUrl: t.currentUrlTree,
                extractedUrl: t.urlHandlingStrategy.extract(t.currentUrlTree),
                urlAfterRedirects: t.urlHandlingStrategy.extract(
                  t.currentUrlTree
                ),
                rawUrl: t.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: is,
                restoredState: null,
                currentSnapshot: t.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: t.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                Kn((r) => 0 !== r.id),
                z((r) => ({
                  ...r,
                  extractedUrl: t.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Wt((r) => {
                  let o = !1,
                    i = !1;
                  return L(r).pipe(
                    ot((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Wt((s) => {
                      const a = t.browserUrlTree.toString(),
                        l =
                          !t.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== t.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            t.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new bl(s.id, t.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (t.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          an
                        );
                      }
                      if (t.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          zC(s.source) && (t.browserUrlTree = s.extractedUrl),
                          L(s).pipe(
                            Wt((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Tf(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? an
                                  : Promise.resolve(c)
                              );
                            }),
                            (function VF(e, n, t, r) {
                              return Wt((o) =>
                                (function kF(e, n, t, r, o) {
                                  return new LF(e, n, t, r, o).apply();
                                })(e, n, t, o.extractedUrl, r).pipe(
                                  z((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              t.config
                            ),
                            ot((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function qF(e, n, t, r, o) {
                              return Ke((i) =>
                                (function $F(
                                  e,
                                  n,
                                  t,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new HF(e, n, t, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Wt((a) =>
                                        null === a
                                          ? (function jF(e) {
                                              return new De((n) => n.error(e));
                                            })(new BF())
                                          : L(a)
                                      )
                                    );
                                })(
                                  e,
                                  n,
                                  t,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(z((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              t.config,
                              this.urlSerializer,
                              t.paramsInheritanceStrategy
                            ),
                            ot((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === t.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = t.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  t.setBrowserUrl(f, c);
                                }
                                t.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new FO(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        t.urlHandlingStrategy.shouldProcessUrl(t.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: p,
                          } = s,
                          y = new Tf(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(y);
                        const D = vC(d, this.rootComponentType).snapshot;
                        return L(
                          (r = {
                            ...s,
                            targetSnapshot: D,
                            urlAfterRedirects: d,
                            extras: {
                              ...p,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new bl(s.id, t.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (t.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          an
                        );
                      }
                    }),
                    ot((s) => {
                      const a = new PO(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    z(
                      (s) =>
                        (r = {
                          ...s,
                          guards: uF(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function _F(e, n) {
                      return Ke((t) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = t;
                        return 0 === s.length && 0 === i.length
                          ? L({ ...t, guardsResult: !0 })
                          : (function CF(e, n, t, r) {
                              return Le(e).pipe(
                                Ke((o) =>
                                  (function IF(e, n, t, r, o) {
                                    const i =
                                      n && n.routeConfig
                                        ? n.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? L(
                                          i.map((a) => {
                                            const l = ls(n) ?? o,
                                              u = Ho(a, l);
                                            return cr(
                                              (function yF(e) {
                                                return e && ds(e.canDeactivate);
                                              })(u)
                                                ? u.canDeactivate(e, n, t, r)
                                                : l.runInContext(() =>
                                                    u(e, n, t, r)
                                                  )
                                            ).pipe(lr());
                                          })
                                        ).pipe(Uo())
                                      : L(!0);
                                  })(o.component, o.route, t, n, r)
                                ),
                                lr((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              Ke((a) =>
                                a &&
                                (function hF(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function wF(e, n, t, r) {
                                      return Le(n).pipe(
                                        qn((o) =>
                                          Qi(
                                            (function EF(e, n) {
                                              return (
                                                null !== e && n && n(new $O(e)),
                                                L(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function bF(e, n) {
                                              return (
                                                null !== e && n && n(new UO(e)),
                                                L(!0)
                                              );
                                            })(o.route, r),
                                            (function MF(e, n, t) {
                                              const r = n[n.length - 1],
                                                i = n
                                                  .slice(0, n.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function cF(e) {
                                                      const n = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return n && 0 !== n.length
                                                        ? { node: e, guards: n }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    hl(() =>
                                                      L(
                                                        s.guards.map((l) => {
                                                          const u =
                                                              ls(s.node) ?? t,
                                                            c = Ho(l, u);
                                                          return cr(
                                                            (function mF(e) {
                                                              return (
                                                                e &&
                                                                ds(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : u.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(lr());
                                                        })
                                                      ).pipe(Uo())
                                                    )
                                                  );
                                              return L(i).pipe(Uo());
                                            })(e, o.path, t),
                                            (function SF(e, n, t) {
                                              const r = n.routeConfig
                                                ? n.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return L(!0);
                                              const o = r.map((i) =>
                                                hl(() => {
                                                  const s = ls(n) ?? t,
                                                    a = Ho(i, s);
                                                  return cr(
                                                    (function gF(e) {
                                                      return (
                                                        e && ds(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(n, e)
                                                      : s.runInContext(() =>
                                                          a(n, e)
                                                        )
                                                  ).pipe(lr());
                                                })
                                              );
                                              return L(o).pipe(Uo());
                                            })(e, o.route, t)
                                          )
                                        ),
                                        lr((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, n)
                                  : L(a)
                              ),
                              z((a) => ({ ...t, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    ot((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), Or(s.guardsResult))
                      )
                        throw wC(0, s.guardsResult);
                      const a = new kO(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    Kn(
                      (s) =>
                        !!s.guardsResult ||
                        (t.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    zf((s) => {
                      if (s.guards.canActivateChecks.length)
                        return L(s).pipe(
                          ot((a) => {
                            const l = new LO(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Wt((a) => {
                            let l = !1;
                            return L(a).pipe(
                              (function KF(e, n) {
                                return Ke((t) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = t;
                                  if (!o.length) return L(t);
                                  let i = 0;
                                  return Le(o).pipe(
                                    qn((s) =>
                                      (function ZF(e, n, t, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !$C(o) &&
                                            (i[Ji] = o.title),
                                          (function YF(e, n, t, r) {
                                            const o = (function QF(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return L({});
                                            const i = {};
                                            return Le(o).pipe(
                                              Ke((s) =>
                                                (function XF(e, n, t, r) {
                                                  const o = ls(n) ?? r,
                                                    i = Ho(e, o);
                                                  return cr(
                                                    i.resolve
                                                      ? i.resolve(n, t)
                                                      : o.runInContext(() =>
                                                          i(n, t)
                                                        )
                                                  );
                                                })(e[s], n, t, r).pipe(
                                                  lr(),
                                                  ot((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              Cf(1),
                                              (function lO(e) {
                                                return z(() => e);
                                              })(i),
                                              ur((s) => ($f(s) ? an : Xi(s)))
                                            );
                                          })(i, e, n, r).pipe(
                                            z(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = DC(e, t).resolve),
                                                o &&
                                                  $C(o) &&
                                                  (e.data[Ji] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, n)
                                    ),
                                    ot(() => i++),
                                    Cf(1),
                                    Ke((s) => (i === o.length ? L(t) : an))
                                  );
                                });
                              })(
                                t.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              ot({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (t.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          ot((a) => {
                            const l = new VO(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    zf((s) => {
                      const a = (l) => {
                        const u = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              ot((c) => {
                                l.component = c;
                              }),
                              z(() => {})
                            )
                          );
                        for (const c of l.children) u.push(...a(c));
                        return u;
                      };
                      return z_(a(s.targetSnapshot.root)).pipe(pl(), Cn(1));
                    }),
                    zf(() => this.afterPreactivation()),
                    z((s) => {
                      const a = (function XO(e, n, t) {
                        const r = ss(e, n._root, t ? t._root : void 0);
                        return new yC(r, n);
                      })(
                        t.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    ot((s) => {
                      (t.currentUrlTree = s.urlAfterRedirects),
                        (t.rawUrlTree = t.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (t.routerState = s.targetRouterState),
                        "deferred" === t.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            t.setBrowserUrl(t.rawUrlTree, s),
                          (t.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, n, t) =>
                      z(
                        (r) => (
                          new lF(
                            n,
                            r.targetRouterState,
                            r.currentRouterState,
                            t
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, t.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    Cn(1),
                    ot({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (t.navigated = !0),
                          this.events.next(
                            new Fr(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(t.currentUrlTree)
                            )
                          ),
                          t.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    wf(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    ur((s) => {
                      if (((i = !0), SC(s))) {
                        EC(s) || ((t.navigated = !0), t.restoreHistory(r, !0));
                        const a = new wl(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), EC(s))) {
                          const l = t.urlHandlingStrategy.merge(
                              s.url,
                              t.rawUrlTree
                            ),
                            u = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === t.urlUpdateStrategy || zC(r.source),
                            };
                          t.scheduleNavigation(l, is, null, u, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        t.restoreHistory(r, !0);
                        const a = new xf(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(t.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return an;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(t, r, o) {
            const i = new wl(
              t.id,
              this.urlSerializer.serialize(t.extractedUrl),
              r,
              o
            );
            this.events.next(i), t.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function zC(e) {
        return e !== is;
      }
      let GC = (() => {
          class e {
            buildTitle(t) {
              let r,
                o = t.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === K));
              return r;
            }
            getResolvedTitleForRoute(t) {
              return t.data[Ji];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: function () {
                return Q(eP);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        eP = (() => {
          class e extends GC {
            constructor(t) {
              super(), (this.title = t);
            }
            updateTitle(t) {
              const r = this.buildTitle(t);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(N(S_));
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        tP = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: function () {
                return Q(rP);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class nP {
        shouldDetach(n) {
          return !1;
        }
        store(n, t) {}
        shouldAttach(n) {
          return !1;
        }
        retrieve(n) {
          return null;
        }
        shouldReuseRoute(n, t) {
          return n.routeConfig === t.routeConfig;
        }
      }
      let rP = (() => {
        class e extends nP {}
        return (
          (e.ɵfac = (function () {
            let n;
            return function (r) {
              return (n || (n = Ve(e)))(r || e);
            };
          })()),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Fl = new F("", { providedIn: "root", factory: () => ({}) });
      let iP = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({
              token: e,
              factory: function () {
                return Q(sP);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        sP = (() => {
          class e {
            shouldProcessUrl(t) {
              return !0;
            }
            extract(t) {
              return t;
            }
            merge(t, r) {
              return t;
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function aP(e) {
        throw e;
      }
      function lP(e, n, t) {
        return n.parse("/");
      }
      const uP = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        cP = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let it = (() => {
          class e {
            get navigationId() {
              return this.navigationTransitions.navigationId;
            }
            get browserPageId() {
              if ("computed" === this.canceledNavigationResolution)
                return this.location.getState()?.ɵrouterPageId;
            }
            get events() {
              return this.navigationTransitions.events;
            }
            constructor() {
              (this.disposed = !1),
                (this.currentPageId = 0),
                (this.console = Q(m1)),
                (this.isNgZoneEnabled = !1),
                (this.options = Q(Fl, { optional: !0 }) || {}),
                (this.errorHandler = this.options.errorHandler || aP),
                (this.malformedUriErrorHandler =
                  this.options.malformedUriErrorHandler || lP),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.urlHandlingStrategy = Q(iP)),
                (this.routeReuseStrategy = Q(tP)),
                (this.urlCreationStrategy = Q(ZO)),
                (this.titleStrategy = Q(GC)),
                (this.onSameUrlNavigation =
                  this.options.onSameUrlNavigation || "ignore"),
                (this.paramsInheritanceStrategy =
                  this.options.paramsInheritanceStrategy || "emptyOnly"),
                (this.urlUpdateStrategy =
                  this.options.urlUpdateStrategy || "deferred"),
                (this.canceledNavigationResolution =
                  this.options.canceledNavigationResolution || "replace"),
                (this.config = Q_(Q(zo, { optional: !0 }) ?? [])),
                (this.navigationTransitions = Q(Ol)),
                (this.urlSerializer = Q(ts)),
                (this.location = Q($d)),
                (this.isNgZoneEnabled =
                  Q(Ae) instanceof Ae && Ae.isInAngularZone()),
                this.resetConfig(this.config),
                (this.currentUrlTree = new dr()),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.routerState = vC(this.currentUrlTree, null)),
                this.navigationTransitions.setupNavigations(this).subscribe(
                  (t) => {
                    (this.lastSuccessfulId = t.id),
                      (this.currentPageId = this.browserPageId ?? 0);
                  },
                  (t) => {
                    this.console.warn(`Unhandled Navigation Error: ${t}`);
                  }
                );
            }
            resetRootComponentType(t) {
              (this.routerState.root.component = t),
                (this.navigationTransitions.rootComponentType = t);
            }
            initialNavigation() {
              if (
                (this.setUpLocationChangeListener(),
                !this.navigationTransitions.hasRequestedNavigation)
              ) {
                const t = this.location.getState();
                this.navigateToSyncWithBrowser(this.location.path(!0), is, t);
              }
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  const r = "popstate" === t.type ? "popstate" : "hashchange";
                  "popstate" === r &&
                    setTimeout(() => {
                      this.navigateToSyncWithBrowser(t.url, r, t.state);
                    }, 0);
                }));
            }
            navigateToSyncWithBrowser(t, r, o) {
              const i = { replaceUrl: !0 },
                s = o?.navigationId ? o : null;
              if (o) {
                const l = { ...o };
                delete l.navigationId,
                  delete l.ɵrouterPageId,
                  0 !== Object.keys(l).length && (i.state = l);
              }
              const a = this.parseUrl(t);
              this.scheduleNavigation(a, r, s, i);
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.navigationTransitions.currentNavigation;
            }
            resetConfig(t) {
              (this.config = t.map(jf)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.navigationTransitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(),
                  (this.locationSubscription = void 0)),
                (this.disposed = !0);
            }
            createUrlTree(t, r = {}) {
              const {
                  relativeTo: o,
                  queryParams: i,
                  fragment: s,
                  queryParamsHandling: a,
                  preserveFragment: l,
                } = r,
                u = l ? this.currentUrlTree.fragment : s;
              let c = null;
              switch (a) {
                case "merge":
                  c = { ...this.currentUrlTree.queryParams, ...i };
                  break;
                case "preserve":
                  c = this.currentUrlTree.queryParams;
                  break;
                default:
                  c = i || null;
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                this.urlCreationStrategy.createUrlTree(
                  o,
                  this.routerState,
                  this.currentUrlTree,
                  t,
                  c,
                  u ?? null
                )
              );
            }
            navigateByUrl(t, r = { skipLocationChange: !1 }) {
              const o = Or(t) ? t : this.parseUrl(t),
                i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
              return this.scheduleNavigation(i, is, null, r);
            }
            navigate(t, r = { skipLocationChange: !1 }) {
              return (
                (function dP(e) {
                  for (let n = 0; n < e.length; n++) {
                    const t = e[n];
                    if (null == t) throw new S(4008, false);
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, r), r)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let r;
              try {
                r = this.urlSerializer.parse(t);
              } catch (o) {
                r = this.malformedUriErrorHandler(o, this.urlSerializer, t);
              }
              return r;
            }
            isActive(t, r) {
              let o;
              if (
                ((o = !0 === r ? { ...uP } : !1 === r ? { ...cP } : r), Or(t))
              )
                return eC(this.currentUrlTree, t, o);
              const i = this.parseUrl(t);
              return eC(this.currentUrlTree, i, o);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((r, o) => {
                const i = t[o];
                return null != i && (r[o] = i), r;
              }, {});
            }
            scheduleNavigation(t, r, o, i, s) {
              if (this.disposed) return Promise.resolve(!1);
              let a, l, u, c;
              return (
                s
                  ? ((a = s.resolve), (l = s.reject), (u = s.promise))
                  : (u = new Promise((d, f) => {
                      (a = d), (l = f);
                    })),
                (c =
                  "computed" === this.canceledNavigationResolution
                    ? o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : (this.browserPageId ?? 0) + 1
                    : 0),
                this.navigationTransitions.handleNavigationRequest({
                  targetPageId: c,
                  source: r,
                  restoredState: o,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  rawUrl: t,
                  extras: i,
                  resolve: a,
                  reject: l,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch((d) => Promise.reject(d))
              );
            }
            setBrowserUrl(t, r) {
              const o = this.urlSerializer.serialize(t);
              if (
                this.location.isCurrentPathEqualTo(o) ||
                r.extras.replaceUrl
              ) {
                const s = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, this.browserPageId),
                };
                this.location.replaceState(o, "", s);
              } else {
                const i = {
                  ...r.extras.state,
                  ...this.generateNgRouterState(r.id, r.targetPageId),
                };
                this.location.go(o, "", i);
              }
            }
            restoreHistory(t, r = !1) {
              if ("computed" === this.canceledNavigationResolution) {
                const i =
                  this.currentPageId -
                  (this.browserPageId ?? this.currentPageId);
                0 !== i
                  ? this.location.historyGo(i)
                  : this.currentUrlTree ===
                      this.getCurrentNavigation()?.finalUrl &&
                    0 === i &&
                    (this.resetState(t),
                    (this.browserUrlTree = t.currentUrlTree),
                    this.resetUrlToCurrentUrlTree());
              } else
                "replace" === this.canceledNavigationResolution &&
                  (r && this.resetState(t), this.resetUrlToCurrentUrlTree());
            }
            resetState(t) {
              (this.routerState = t.currentRouterState),
                (this.currentUrlTree = t.currentUrlTree),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  t.rawUrl
                ));
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                this.generateNgRouterState(
                  this.lastSuccessfulId,
                  this.currentPageId
                )
              );
            }
            generateNgRouterState(t, r) {
              return "computed" === this.canceledNavigationResolution
                ? { navigationId: t, ɵrouterPageId: r }
                : { navigationId: t };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Go = (() => {
          class e {
            constructor(t, r, o, i, s, a) {
              (this.router = t),
                (this.route = r),
                (this.tabIndexAttribute = o),
                (this.renderer = i),
                (this.el = s),
                (this.locationStrategy = a),
                (this._preserveFragment = !1),
                (this._skipLocationChange = !1),
                (this._replaceUrl = !1),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new Et());
              const l = s.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = "a" === l || "area" === l),
                this.isAnchorElement
                  ? (this.subscription = t.events.subscribe((u) => {
                      u instanceof Fr && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl("0");
            }
            set preserveFragment(t) {
              this._preserveFragment = Po(t);
            }
            get preserveFragment() {
              return this._preserveFragment;
            }
            set skipLocationChange(t) {
              this._skipLocationChange = Po(t);
            }
            get skipLocationChange() {
              return this._skipLocationChange;
            }
            set replaceUrl(t) {
              this._replaceUrl = Po(t);
            }
            get replaceUrl() {
              return this._replaceUrl;
            }
            setTabIndexIfNotOnNativeEl(t) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue("tabindex", t);
            }
            ngOnChanges(t) {
              this.isAnchorElement && this.updateHref(),
                this.onChanges.next(this);
            }
            set routerLink(t) {
              null != t
                ? ((this.commands = Array.isArray(t) ? t : [t]),
                  this.setTabIndexIfNotOnNativeEl("0"))
                : ((this.commands = null),
                  this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(t, r, o, i, s) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== t ||
                      r ||
                      o ||
                      i ||
                      s ||
                      ("string" == typeof this.target &&
                        "_self" != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const t =
                null === this.href
                  ? null
                  : (function Lg(e, n, t) {
                      return (function m0(e, n) {
                        return ("src" === n &&
                          ("embed" === e ||
                            "frame" === e ||
                            "iframe" === e ||
                            "media" === e ||
                            "script" === e)) ||
                          ("href" === n && ("base" === e || "link" === e))
                          ? kg
                          : Pg;
                      })(
                        n,
                        t
                      )(e);
                    })(
                      this.href,
                      this.el.nativeElement.tagName.toLowerCase(),
                      "href"
                    );
              this.applyAttributeValue("href", t);
            }
            applyAttributeValue(t, r) {
              const o = this.renderer,
                i = this.el.nativeElement;
              null !== r ? o.setAttribute(i, t, r) : o.removeAttribute(i, t);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo:
                      void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                C(it),
                C(Pr),
                (function ia(e) {
                  return (function jE(e, n) {
                    if ("class" === n) return e.classes;
                    if ("style" === n) return e.styles;
                    const t = e.attrs;
                    if (t) {
                      const r = t.length;
                      let o = 0;
                      for (; o < r; ) {
                        const i = t[o];
                        if (Mp(i)) break;
                        if (0 === i) o += 2;
                        else if ("number" == typeof i)
                          for (o++; o < r && "string" == typeof t[o]; ) o++;
                        else {
                          if (i === n) return t[o + 1];
                          o += 2;
                        }
                      }
                    }
                    return null;
                  })(Ye(), e);
                })("tabindex"),
                C(kn),
                C(Ct),
                C(Rr)
              );
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [["", "routerLink", ""]],
              hostVars: 1,
              hostBindings: function (t, r) {
                1 & t &&
                  de("click", function (i) {
                    return r.onClick(
                      i.button,
                      i.ctrlKey,
                      i.shiftKey,
                      i.altKey,
                      i.metaKey
                    );
                  }),
                  2 & t && yn("target", r.target);
              },
              inputs: {
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                state: "state",
                relativeTo: "relativeTo",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                routerLink: "routerLink",
              },
              standalone: !0,
              features: [Bt],
            })),
            e
          );
        })(),
        WC = (() => {
          class e {
            get isActive() {
              return this._isActive;
            }
            constructor(t, r, o, i, s) {
              (this.router = t),
                (this.element = r),
                (this.renderer = o),
                (this.cdr = i),
                (this.link = s),
                (this.classes = []),
                (this._isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new he()),
                (this.routerEventsSubscription = t.events.subscribe((a) => {
                  a instanceof Fr && this.update();
                }));
            }
            ngAfterContentInit() {
              L(this.links.changes, L(null))
                .pipe(qr())
                .subscribe((t) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const t = [...this.links.toArray(), this.link]
                .filter((r) => !!r)
                .map((r) => r.onChanges);
              this.linkInputChangesSubscription = Le(t)
                .pipe(qr())
                .subscribe((r) => {
                  this._isActive !== this.isLinkActive(this.router)(r) &&
                    this.update();
                });
            }
            set routerLinkActive(t) {
              const r = Array.isArray(t) ? t : t.split(" ");
              this.classes = r.filter((o) => !!o);
            }
            ngOnChanges(t) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.router.navigated ||
                Promise.resolve().then(() => {
                  const t = this.hasActiveLinks();
                  this._isActive !== t &&
                    ((this._isActive = t),
                    this.cdr.markForCheck(),
                    this.classes.forEach((r) => {
                      t
                        ? this.renderer.addClass(this.element.nativeElement, r)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            r
                          );
                    }),
                    t && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          "aria-current",
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(
                          this.element.nativeElement,
                          "aria-current"
                        ),
                    this.isActiveChange.emit(t));
                });
            }
            isLinkActive(t) {
              const r = (function fP(e) {
                return !!e.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return (o) => !!o.urlTree && t.isActive(o.urlTree, r);
            }
            hasActiveLinks() {
              const t = this.isLinkActive(this.router);
              return (this.link && t(this.link)) || this.links.some(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(it), C(Ct), C(kn), C(Fo), C(Go, 8));
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (t, r, o) {
                if ((1 & t && Ov(o, Go, 5), 2 & t)) {
                  let i;
                  Nv(
                    (i = (function Fv() {
                      return (function KT(e, n) {
                        return e[cn].queries[n].queryList;
                      })(E(), Dp());
                    })())
                  ) && (r.links = i);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                ariaCurrentWhenActive: "ariaCurrentWhenActive",
                routerLinkActive: "routerLinkActive",
              },
              outputs: { isActiveChange: "isActiveChange" },
              exportAs: ["routerLinkActive"],
              standalone: !0,
              features: [Bt],
            })),
            e
          );
        })();
      class qC {}
      let hP = (() => {
        class e {
          constructor(t, r, o, i, s) {
            (this.router = t),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                Kn((t) => t instanceof Fr),
                qn(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(t, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = La(i.providers, t, `Route: ${i.path}`));
              const s = i._injector ?? t,
                a = i._loadedInjector ?? s;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                o.push(this.preloadConfig(s, i)),
                (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Le(o).pipe(qr());
          }
          preloadConfig(t, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(t, r)
                  : L(null);
              const i = o.pipe(
                Ke((s) =>
                  null === s
                    ? L(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? t, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Le([i, this.loader.loadComponent(r)]).pipe(qr())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(it), N(rD), N(hn), N(qC), N(Gf));
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const qf = new F("");
      let KC = (() => {
        class e {
          constructor(t, r, o, i, s = {}) {
            (this.urlSerializer = t),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof Tf
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = t.navigationTrigger),
                  (this.restoredId = t.restoredState
                    ? t.restoredState.navigationId
                    : 0))
                : t instanceof Fr &&
                  ((this.lastId = t.id),
                  this.scheduleScrollEvent(
                    t,
                    this.urlSerializer.parse(t.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((t) => {
              t instanceof gC &&
                (t.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(t.position)
                  : t.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(t.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(t, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new gC(
                      t,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (t) {
            !(function pm() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      var Ft = (() => (
        ((Ft = Ft || {})[(Ft.COMPLETE = 0)] = "COMPLETE"),
        (Ft[(Ft.FAILED = 1)] = "FAILED"),
        (Ft[(Ft.REDIRECTING = 2)] = "REDIRECTING"),
        Ft
      ))();
      const Wo = !1;
      function fr(e, n) {
        return { ɵkind: e, ɵproviders: n };
      }
      const Kf = new F("", { providedIn: "root", factory: () => !1 });
      function YC() {
        const e = Q(pn);
        return (n) => {
          const t = e.get(za);
          if (n !== t.components[0]) return;
          const r = e.get(it),
            o = e.get(QC);
          1 === e.get(Zf) && r.initialNavigation(),
            e.get(XC, null, $.Optional)?.setUpPreloading(),
            e.get(qf, null, $.Optional)?.init(),
            r.resetRootComponentType(t.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const QC = new F(Wo ? "bootstrap done indicator" : "", {
          factory: () => new Et(),
        }),
        Zf = new F(Wo ? "initial navigation" : "", {
          providedIn: "root",
          factory: () => 1,
        });
      function vP() {
        let e = [];
        return (
          (e = Wo
            ? [
                {
                  provide: ma,
                  multi: !0,
                  useFactory: () => {
                    const n = Q(it);
                    return () =>
                      n.events.subscribe((t) => {
                        console.group?.(`Router Event: ${t.constructor.name}`),
                          console.log(
                            (function GO(e) {
                              if (!("type" in e))
                                return `Unknown Router Event: ${e.constructor.name}`;
                              switch (e.type) {
                                case 14:
                                  return `ActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 13:
                                  return `ActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 12:
                                  return `ChildActivationEnd(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 11:
                                  return `ChildActivationStart(path: '${
                                    e.snapshot.routeConfig?.path || ""
                                  }')`;
                                case 8:
                                  return `GuardsCheckEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state}, shouldActivate: ${e.shouldActivate})`;
                                case 7:
                                  return `GuardsCheckStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 2:
                                  return `NavigationCancel(id: ${e.id}, url: '${e.url}')`;
                                case 16:
                                  return `NavigationSkipped(id: ${e.id}, url: '${e.url}')`;
                                case 1:
                                  return `NavigationEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}')`;
                                case 3:
                                  return `NavigationError(id: ${e.id}, url: '${e.url}', error: ${e.error})`;
                                case 0:
                                  return `NavigationStart(id: ${e.id}, url: '${e.url}')`;
                                case 6:
                                  return `ResolveEnd(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 5:
                                  return `ResolveStart(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 10:
                                  return `RouteConfigLoadEnd(path: ${e.route.path})`;
                                case 9:
                                  return `RouteConfigLoadStart(path: ${e.route.path})`;
                                case 4:
                                  return `RoutesRecognized(id: ${e.id}, url: '${e.url}', urlAfterRedirects: '${e.urlAfterRedirects}', state: ${e.state})`;
                                case 15:
                                  return `Scroll(anchor: '${
                                    e.anchor
                                  }', position: '${
                                    e.position
                                      ? `${e.position[0]}, ${e.position[1]}`
                                      : null
                                  }')`;
                              }
                            })(t)
                          ),
                          console.log(t),
                          console.groupEnd?.();
                      });
                  },
                },
              ]
            : []),
          fr(1, e)
        );
      }
      const XC = new F(Wo ? "router preloader" : "");
      function DP(e) {
        return fr(0, [
          { provide: XC, useExisting: hP },
          { provide: qC, useExisting: e },
        ]);
      }
      const hs = !1,
        JC = new F(
          hs ? "router duplicate forRoot guard" : "ROUTER_FORROOT_GUARD"
        ),
        _P = [
          $d,
          { provide: ts, useClass: bf },
          it,
          as,
          {
            provide: Pr,
            useFactory: function ZC(e) {
              return e.routerState.root;
            },
            deps: [it],
          },
          Gf,
          hs ? { provide: Kf, useValue: !0 } : [],
        ];
      function CP() {
        return new dD("Router", it);
      }
      let ew = (() => {
        class e {
          constructor(t) {}
          static forRoot(t, r) {
            return {
              ngModule: e,
              providers: [
                _P,
                hs && r?.enableTracing ? vP().ɵproviders : [],
                { provide: zo, multi: !0, useValue: t },
                {
                  provide: JC,
                  useFactory: SP,
                  deps: [[it, new mi(), new yi()]],
                },
                { provide: Fl, useValue: r || {} },
                r?.useHash
                  ? { provide: Rr, useClass: rx }
                  : { provide: Rr, useClass: FD },
                {
                  provide: qf,
                  useFactory: () => {
                    const e = Q(CR),
                      n = Q(Ae),
                      t = Q(Fl),
                      r = Q(Ol),
                      o = Q(ts);
                    return (
                      t.scrollOffset && e.setOffset(t.scrollOffset),
                      new KC(o, r, e, n, t)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? DP(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: dD, multi: !0, useFactory: CP },
                r?.initialNavigation ? MP(r) : [],
                [
                  { provide: tw, useFactory: YC },
                  { provide: cD, multi: !0, useExisting: tw },
                ],
              ],
            };
          }
          static forChild(t) {
            return {
              ngModule: e,
              providers: [{ provide: zo, multi: !0, useValue: t }],
            };
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(N(JC, 8));
          }),
          (e.ɵmod = At({ type: e })),
          (e.ɵinj = mt({ imports: [Vf] })),
          e
        );
      })();
      function SP(e) {
        if (hs && e)
          throw new S(
            4007,
            "The Router was provided more than once. This can happen if 'forRoot' is used outside of the root injector. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function MP(e) {
        return [
          "disabled" === e.initialNavigation
            ? fr(3, [
                {
                  provide: $a,
                  multi: !0,
                  useFactory: () => {
                    const n = Q(it);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Zf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? fr(2, [
                { provide: Zf, useValue: 0 },
                {
                  provide: $a,
                  multi: !0,
                  deps: [pn],
                  useFactory: (n) => {
                    const t = n.get(tx, Promise.resolve());
                    return () =>
                      t.then(
                        () =>
                          new Promise((r) => {
                            const o = n.get(it),
                              i = n.get(QC);
                            (function pP(e, n) {
                              e.events
                                .pipe(
                                  Kn(
                                    (t) =>
                                      t instanceof Fr ||
                                      t instanceof wl ||
                                      t instanceof xf ||
                                      t instanceof bl
                                  ),
                                  z((t) =>
                                    t instanceof Fr || t instanceof bl
                                      ? Ft.COMPLETE
                                      : t instanceof wl &&
                                        (0 === t.code || 1 === t.code)
                                      ? Ft.REDIRECTING
                                      : Ft.FAILED
                                  ),
                                  Kn((t) => t !== Ft.REDIRECTING),
                                  Cn(1)
                                )
                                .subscribe(() => {
                                  n();
                                });
                            })(o, () => {
                              r(!0);
                            }),
                              (n.get(Ol).afterPreactivation = () => (
                                r(!0), i.closed ? L(void 0) : i
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const tw = new F(hs ? "Router Initializer" : "");
      let Yf = (() => {
        class e {
          constructor(t) {
            (this.clienteHttp = t),
              (this.urlBase = "https://bookingapp-46f62c89759f.Railwayapp.com");
          }
          getBookingList() {
            return this.clienteHttp.get(this.urlBase);
          }
          addBooking(t) {
            return this.clienteHttp.post(this.urlBase, t);
          }
          editBooking(t, r) {
            return this.clienteHttp.put(`${this.urlBase}/${t}`, r);
          }
          getBookingById(t) {
            return this.clienteHttp.get(`${this.urlBase}/${t}`);
          }
          deactivateBooking(t, r) {
            return (
              (r.active = !1),
              this.clienteHttp.put(`${this.urlBase}/deactivate/${t}`, r)
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(N(vf));
          });
          static #t = (this.ɵprov = k({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function hr(e) {
        return !!e && (e instanceof De || (ne(e.lift) && ne(e.subscribe)));
      }
      function nw(...e) {
        const n = Bh(e),
          { args: t, keys: r } = $_(e),
          o = new De((i) => {
            const { length: s } = t;
            if (!s) return void i.complete();
            const a = new Array(s);
            let l = s,
              u = s;
            for (let c = 0; c < s; c++) {
              let d = !1;
              kt(t[c]).subscribe(
                Fe(
                  i,
                  (f) => {
                    d || ((d = !0), u--), (a[c] = f);
                  },
                  () => l--,
                  void 0,
                  () => {
                    (!l || !d) && (u || i.next(r ? U_(r, a) : a), i.complete());
                  }
                )
              );
            }
          });
        return n ? o.pipe(H_(n)) : o;
      }
      const rw = { now: () => (rw.delegate || Date).now(), delegate: void 0 };
      class AP extends Et {
        constructor(n = 1 / 0, t = 1 / 0, r = rw) {
          super(),
            (this._bufferSize = n),
            (this._windowTime = t),
            (this._timestampProvider = r),
            (this._buffer = []),
            (this._infiniteTimeWindow = !0),
            (this._infiniteTimeWindow = t === 1 / 0),
            (this._bufferSize = Math.max(1, n)),
            (this._windowTime = Math.max(1, t));
        }
        next(n) {
          const {
            isStopped: t,
            _buffer: r,
            _infiniteTimeWindow: o,
            _timestampProvider: i,
            _windowTime: s,
          } = this;
          t || (r.push(n), !o && r.push(i.now() + s)),
            this._trimBuffer(),
            super.next(n);
        }
        _subscribe(n) {
          this._throwIfClosed(), this._trimBuffer();
          const t = this._innerSubscribe(n),
            { _infiniteTimeWindow: r, _buffer: o } = this,
            i = o.slice();
          for (let s = 0; s < i.length && !n.closed; s += r ? 1 : 2)
            n.next(i[s]);
          return this._checkFinalizedStatuses(n), t;
        }
        _trimBuffer() {
          const {
              _bufferSize: n,
              _timestampProvider: t,
              _buffer: r,
              _infiniteTimeWindow: o,
            } = this,
            i = (o ? 1 : 2) * n;
          if ((n < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
            const s = t.now();
            let a = 0;
            for (let l = 1; l < r.length && r[l] <= s; l += 2) a = l;
            a && r.splice(0, a + 1);
          }
        }
      }
      function ow(e, n, t) {
        let r,
          o = !1;
        return (
          e && "object" == typeof e
            ? ({
                bufferSize: r = 1 / 0,
                windowTime: n = 1 / 0,
                refCount: o = !1,
                scheduler: t,
              } = e)
            : (r = e ?? 1 / 0),
          Uh({
            connector: () => new AP(r, n, t),
            resetOnError: !0,
            resetOnComplete: !1,
            resetOnRefCountZero: o,
          })
        );
      }
      class ps {}
      let iw = (() => {
        class e extends ps {
          getTranslation(t) {
            return L({});
          }
        }
        return (
          (e.ɵfac = (function () {
            let n;
            return function (r) {
              return (n || (n = Ve(e)))(r || e);
            };
          })()),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Qf {}
      let sw = (() => {
        class e {
          handle(t) {
            return t.key;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function gs(e, n) {
        if (e === n) return !0;
        if (null === e || null === n) return !1;
        if (e != e && n != n) return !0;
        let o,
          i,
          s,
          t = typeof e;
        if (t == typeof n && "object" == t) {
          if (!Array.isArray(e)) {
            if (Array.isArray(n)) return !1;
            for (i in ((s = Object.create(null)), e)) {
              if (!gs(e[i], n[i])) return !1;
              s[i] = !0;
            }
            for (i in n) if (!(i in s) && typeof n[i] < "u") return !1;
            return !0;
          }
          if (!Array.isArray(n)) return !1;
          if ((o = e.length) == n.length) {
            for (i = 0; i < o; i++) if (!gs(e[i], n[i])) return !1;
            return !0;
          }
        }
        return !1;
      }
      function Pt(e) {
        return typeof e < "u" && null !== e;
      }
      function Xf(e) {
        return e && "object" == typeof e && !Array.isArray(e);
      }
      function aw(e, n) {
        let t = Object.assign({}, e);
        return (
          Xf(e) &&
            Xf(n) &&
            Object.keys(n).forEach((r) => {
              Xf(n[r])
                ? r in e
                  ? (t[r] = aw(e[r], n[r]))
                  : Object.assign(t, { [r]: n[r] })
                : Object.assign(t, { [r]: n[r] });
            }),
          t
        );
      }
      class Pl {}
      let lw = (() => {
        class e extends Pl {
          constructor() {
            super(...arguments),
              (this.templateMatcher = /{{\s?([^{}\s]*)\s?}}/g);
          }
          interpolate(t, r) {
            let o;
            return (
              (o =
                "string" == typeof t
                  ? this.interpolateString(t, r)
                  : "function" == typeof t
                  ? this.interpolateFunction(t, r)
                  : t),
              o
            );
          }
          getValue(t, r) {
            let o = "string" == typeof r ? r.split(".") : [r];
            r = "";
            do {
              (r += o.shift()),
                !Pt(t) || !Pt(t[r]) || ("object" != typeof t[r] && o.length)
                  ? o.length
                    ? (r += ".")
                    : (t = void 0)
                  : ((t = t[r]), (r = ""));
            } while (o.length);
            return t;
          }
          interpolateFunction(t, r) {
            return t(r);
          }
          interpolateString(t, r) {
            return r
              ? t.replace(this.templateMatcher, (o, i) => {
                  let s = this.getValue(r, i);
                  return Pt(s) ? s : o;
                })
              : t;
          }
        }
        return (
          (e.ɵfac = (function () {
            let n;
            return function (r) {
              return (n || (n = Ve(e)))(r || e);
            };
          })()),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class kl {}
      let uw = (() => {
        class e extends kl {
          compile(t, r) {
            return t;
          }
          compileTranslations(t, r) {
            return t;
          }
        }
        return (
          (e.ɵfac = (function () {
            let n;
            return function (r) {
              return (n || (n = Ve(e)))(r || e);
            };
          })()),
          (e.ɵprov = k({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class cw {
        constructor() {
          (this.currentLang = this.defaultLang),
            (this.translations = {}),
            (this.langs = []),
            (this.onTranslationChange = new he()),
            (this.onLangChange = new he()),
            (this.onDefaultLangChange = new he());
        }
      }
      const Jf = new F("USE_STORE"),
        eh = new F("USE_DEFAULT_LANG"),
        th = new F("DEFAULT_LANGUAGE"),
        nh = new F("USE_EXTEND");
      let kr = (() => {
          class e {
            constructor(t, r, o, i, s, a = !0, l = !1, u = !1, c) {
              (this.store = t),
                (this.currentLoader = r),
                (this.compiler = o),
                (this.parser = i),
                (this.missingTranslationHandler = s),
                (this.useDefaultLang = a),
                (this.isolate = l),
                (this.extend = u),
                (this.pending = !1),
                (this._onTranslationChange = new he()),
                (this._onLangChange = new he()),
                (this._onDefaultLangChange = new he()),
                (this._langs = []),
                (this._translations = {}),
                (this._translationRequests = {}),
                c && this.setDefaultLang(c);
            }
            get onTranslationChange() {
              return this.isolate
                ? this._onTranslationChange
                : this.store.onTranslationChange;
            }
            get onLangChange() {
              return this.isolate
                ? this._onLangChange
                : this.store.onLangChange;
            }
            get onDefaultLangChange() {
              return this.isolate
                ? this._onDefaultLangChange
                : this.store.onDefaultLangChange;
            }
            get defaultLang() {
              return this.isolate ? this._defaultLang : this.store.defaultLang;
            }
            set defaultLang(t) {
              this.isolate
                ? (this._defaultLang = t)
                : (this.store.defaultLang = t);
            }
            get currentLang() {
              return this.isolate ? this._currentLang : this.store.currentLang;
            }
            set currentLang(t) {
              this.isolate
                ? (this._currentLang = t)
                : (this.store.currentLang = t);
            }
            get langs() {
              return this.isolate ? this._langs : this.store.langs;
            }
            set langs(t) {
              this.isolate ? (this._langs = t) : (this.store.langs = t);
            }
            get translations() {
              return this.isolate
                ? this._translations
                : this.store.translations;
            }
            set translations(t) {
              this.isolate
                ? (this._translations = t)
                : (this.store.translations = t);
            }
            setDefaultLang(t) {
              if (t === this.defaultLang) return;
              let r = this.retrieveTranslations(t);
              typeof r < "u"
                ? (null == this.defaultLang && (this.defaultLang = t),
                  r.pipe(Cn(1)).subscribe((o) => {
                    this.changeDefaultLang(t);
                  }))
                : this.changeDefaultLang(t);
            }
            getDefaultLang() {
              return this.defaultLang;
            }
            use(t) {
              if (t === this.currentLang) return L(this.translations[t]);
              let r = this.retrieveTranslations(t);
              return typeof r < "u"
                ? (this.currentLang || (this.currentLang = t),
                  r.pipe(Cn(1)).subscribe((o) => {
                    this.changeLang(t);
                  }),
                  r)
                : (this.changeLang(t), L(this.translations[t]));
            }
            retrieveTranslations(t) {
              let r;
              return (
                (typeof this.translations[t] > "u" || this.extend) &&
                  ((this._translationRequests[t] =
                    this._translationRequests[t] || this.getTranslation(t)),
                  (r = this._translationRequests[t])),
                r
              );
            }
            getTranslation(t) {
              this.pending = !0;
              const r = this.currentLoader.getTranslation(t).pipe(ow(1), Cn(1));
              return (
                (this.loadingTranslations = r.pipe(
                  z((o) => this.compiler.compileTranslations(o, t)),
                  ow(1),
                  Cn(1)
                )),
                this.loadingTranslations.subscribe({
                  next: (o) => {
                    (this.translations[t] =
                      this.extend && this.translations[t]
                        ? Object.assign(
                            Object.assign({}, o),
                            this.translations[t]
                          )
                        : o),
                      this.updateLangs(),
                      (this.pending = !1);
                  },
                  error: (o) => {
                    this.pending = !1;
                  },
                }),
                r
              );
            }
            setTranslation(t, r, o = !1) {
              (r = this.compiler.compileTranslations(r, t)),
                (this.translations[t] =
                  (o || this.extend) && this.translations[t]
                    ? aw(this.translations[t], r)
                    : r),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: t,
                  translations: this.translations[t],
                });
            }
            getLangs() {
              return this.langs;
            }
            addLangs(t) {
              t.forEach((r) => {
                -1 === this.langs.indexOf(r) && this.langs.push(r);
              });
            }
            updateLangs() {
              this.addLangs(Object.keys(this.translations));
            }
            getParsedResult(t, r, o) {
              let i;
              if (r instanceof Array) {
                let s = {},
                  a = !1;
                for (let l of r)
                  (s[l] = this.getParsedResult(t, l, o)), hr(s[l]) && (a = !0);
                return a
                  ? nw(r.map((u) => (hr(s[u]) ? s[u] : L(s[u])))).pipe(
                      z((u) => {
                        let c = {};
                        return (
                          u.forEach((d, f) => {
                            c[r[f]] = d;
                          }),
                          c
                        );
                      })
                    )
                  : s;
              }
              if (
                (t &&
                  (i = this.parser.interpolate(this.parser.getValue(t, r), o)),
                typeof i > "u" &&
                  null != this.defaultLang &&
                  this.defaultLang !== this.currentLang &&
                  this.useDefaultLang &&
                  (i = this.parser.interpolate(
                    this.parser.getValue(
                      this.translations[this.defaultLang],
                      r
                    ),
                    o
                  )),
                typeof i > "u")
              ) {
                let s = { key: r, translateService: this };
                typeof o < "u" && (s.interpolateParams = o),
                  (i = this.missingTranslationHandler.handle(s));
              }
              return typeof i < "u" ? i : r;
            }
            get(t, r) {
              if (!Pt(t) || !t.length)
                throw new Error('Parameter "key" required');
              if (this.pending)
                return this.loadingTranslations.pipe(
                  qn((o) =>
                    hr((o = this.getParsedResult(o, t, r))) ? o : L(o)
                  )
                );
              {
                let o = this.getParsedResult(
                  this.translations[this.currentLang],
                  t,
                  r
                );
                return hr(o) ? o : L(o);
              }
            }
            getStreamOnTranslationChange(t, r) {
              if (!Pt(t) || !t.length)
                throw new Error('Parameter "key" required');
              return Qi(
                hl(() => this.get(t, r)),
                this.onTranslationChange.pipe(
                  Wt((o) => {
                    const i = this.getParsedResult(o.translations, t, r);
                    return "function" == typeof i.subscribe ? i : L(i);
                  })
                )
              );
            }
            stream(t, r) {
              if (!Pt(t) || !t.length)
                throw new Error('Parameter "key" required');
              return Qi(
                hl(() => this.get(t, r)),
                this.onLangChange.pipe(
                  Wt((o) => {
                    const i = this.getParsedResult(o.translations, t, r);
                    return hr(i) ? i : L(i);
                  })
                )
              );
            }
            instant(t, r) {
              if (!Pt(t) || !t.length)
                throw new Error('Parameter "key" required');
              let o = this.getParsedResult(
                this.translations[this.currentLang],
                t,
                r
              );
              if (hr(o)) {
                if (t instanceof Array) {
                  let i = {};
                  return (
                    t.forEach((s, a) => {
                      i[t[a]] = t[a];
                    }),
                    i
                  );
                }
                return t;
              }
              return o;
            }
            set(t, r, o = this.currentLang) {
              (this.translations[o][t] = this.compiler.compile(r, o)),
                this.updateLangs(),
                this.onTranslationChange.emit({
                  lang: o,
                  translations: this.translations[o],
                });
            }
            changeLang(t) {
              (this.currentLang = t),
                this.onLangChange.emit({
                  lang: t,
                  translations: this.translations[t],
                }),
                null == this.defaultLang && this.changeDefaultLang(t);
            }
            changeDefaultLang(t) {
              (this.defaultLang = t),
                this.onDefaultLangChange.emit({
                  lang: t,
                  translations: this.translations[t],
                });
            }
            reloadLang(t) {
              return this.resetLang(t), this.getTranslation(t);
            }
            resetLang(t) {
              (this._translationRequests[t] = void 0),
                (this.translations[t] = void 0);
            }
            getBrowserLang() {
              if (typeof window > "u" || typeof window.navigator > "u") return;
              let t = window.navigator.languages
                ? window.navigator.languages[0]
                : null;
              return (
                (t =
                  t ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                typeof t > "u"
                  ? void 0
                  : (-1 !== t.indexOf("-") && (t = t.split("-")[0]),
                    -1 !== t.indexOf("_") && (t = t.split("_")[0]),
                    t)
              );
            }
            getBrowserCultureLang() {
              if (typeof window > "u" || typeof window.navigator > "u") return;
              let t = window.navigator.languages
                ? window.navigator.languages[0]
                : null;
              return (
                (t =
                  t ||
                  window.navigator.language ||
                  window.navigator.browserLanguage ||
                  window.navigator.userLanguage),
                t
              );
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                N(cw),
                N(ps),
                N(kl),
                N(Pl),
                N(Qf),
                N(eh),
                N(Jf),
                N(nh),
                N(th)
              );
            }),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        qo = (() => {
          class e {
            constructor(t, r, o) {
              (this.translateService = t),
                (this.element = r),
                (this._ref = o),
                this.onTranslationChangeSub ||
                  (this.onTranslationChangeSub =
                    this.translateService.onTranslationChange.subscribe((i) => {
                      i.lang === this.translateService.currentLang &&
                        this.checkNodes(!0, i.translations);
                    })),
                this.onLangChangeSub ||
                  (this.onLangChangeSub =
                    this.translateService.onLangChange.subscribe((i) => {
                      this.checkNodes(!0, i.translations);
                    })),
                this.onDefaultLangChangeSub ||
                  (this.onDefaultLangChangeSub =
                    this.translateService.onDefaultLangChange.subscribe((i) => {
                      this.checkNodes(!0);
                    }));
            }
            set translate(t) {
              t && ((this.key = t), this.checkNodes());
            }
            set translateParams(t) {
              gs(this.currentParams, t) ||
                ((this.currentParams = t), this.checkNodes(!0));
            }
            ngAfterViewChecked() {
              this.checkNodes();
            }
            checkNodes(t = !1, r) {
              let o = this.element.nativeElement.childNodes;
              o.length ||
                (this.setContent(this.element.nativeElement, this.key),
                (o = this.element.nativeElement.childNodes));
              for (let i = 0; i < o.length; ++i) {
                let s = o[i];
                if (3 === s.nodeType) {
                  let a;
                  if ((t && (s.lastKey = null), Pt(s.lookupKey)))
                    a = s.lookupKey;
                  else if (this.key) a = this.key;
                  else {
                    let l = this.getContent(s),
                      u = l.trim();
                    u.length &&
                      ((s.lookupKey = u),
                      l !== s.currentValue
                        ? ((a = u),
                          (s.originalContent = l || s.originalContent))
                        : s.originalContent
                        ? (a = s.originalContent.trim())
                        : l !== s.currentValue &&
                          ((a = u),
                          (s.originalContent = l || s.originalContent)));
                  }
                  this.updateValue(a, s, r);
                }
              }
            }
            updateValue(t, r, o) {
              if (t) {
                if (r.lastKey === t && this.lastParams === this.currentParams)
                  return;
                this.lastParams = this.currentParams;
                let i = (s) => {
                  s !== t && (r.lastKey = t),
                    r.originalContent ||
                      (r.originalContent = this.getContent(r)),
                    (r.currentValue = Pt(s) ? s : r.originalContent || t),
                    this.setContent(
                      r,
                      this.key
                        ? r.currentValue
                        : r.originalContent.replace(t, r.currentValue)
                    ),
                    this._ref.markForCheck();
                };
                if (Pt(o)) {
                  let s = this.translateService.getParsedResult(
                    o,
                    t,
                    this.currentParams
                  );
                  hr(s) ? s.subscribe(i) : i(s);
                } else
                  this.translateService.get(t, this.currentParams).subscribe(i);
              }
            }
            getContent(t) {
              return Pt(t.textContent) ? t.textContent : t.data;
            }
            setContent(t, r) {
              Pt(t.textContent) ? (t.textContent = r) : (t.data = r);
            }
            ngOnDestroy() {
              this.onLangChangeSub && this.onLangChangeSub.unsubscribe(),
                this.onDefaultLangChangeSub &&
                  this.onDefaultLangChangeSub.unsubscribe(),
                this.onTranslationChangeSub &&
                  this.onTranslationChangeSub.unsubscribe();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(kr), C(Ct), C(Fo));
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [
                ["", "translate", ""],
                ["", "ngx-translate", ""],
              ],
              inputs: {
                translate: "translate",
                translateParams: "translateParams",
              },
            })),
            e
          );
        })(),
        TP = (() => {
          class e {
            constructor(t, r) {
              (this.translate = t), (this._ref = r), (this.value = "");
            }
            updateValue(t, r, o) {
              let i = (s) => {
                (this.value = void 0 !== s ? s : t),
                  (this.lastKey = t),
                  this._ref.markForCheck();
              };
              if (o) {
                let s = this.translate.getParsedResult(o, t, r);
                hr(s.subscribe) ? s.subscribe(i) : i(s);
              }
              this.translate.get(t, r).subscribe(i);
            }
            transform(t, ...r) {
              if (!t || !t.length) return t;
              if (gs(t, this.lastKey) && gs(r, this.lastParams))
                return this.value;
              let o;
              if (Pt(r[0]) && r.length)
                if ("string" == typeof r[0] && r[0].length) {
                  let i = r[0]
                    .replace(/(\')?([a-zA-Z0-9_]+)(\')?(\s)?:/g, '"$2":')
                    .replace(/:(\s)?(\')(.*?)(\')/g, ':"$3"');
                  try {
                    o = JSON.parse(i);
                  } catch {
                    throw new SyntaxError(
                      `Wrong parameter in TranslatePipe. Expected a valid Object, received: ${r[0]}`
                    );
                  }
                } else
                  "object" == typeof r[0] && !Array.isArray(r[0]) && (o = r[0]);
              return (
                (this.lastKey = t),
                (this.lastParams = r),
                this.updateValue(t, o),
                this._dispose(),
                this.onTranslationChange ||
                  (this.onTranslationChange =
                    this.translate.onTranslationChange.subscribe((i) => {
                      this.lastKey &&
                        i.lang === this.translate.currentLang &&
                        ((this.lastKey = null),
                        this.updateValue(t, o, i.translations));
                    })),
                this.onLangChange ||
                  (this.onLangChange = this.translate.onLangChange.subscribe(
                    (i) => {
                      this.lastKey &&
                        ((this.lastKey = null),
                        this.updateValue(t, o, i.translations));
                    }
                  )),
                this.onDefaultLangChange ||
                  (this.onDefaultLangChange =
                    this.translate.onDefaultLangChange.subscribe(() => {
                      this.lastKey &&
                        ((this.lastKey = null), this.updateValue(t, o));
                    })),
                this.value
              );
            }
            _dispose() {
              typeof this.onTranslationChange < "u" &&
                (this.onTranslationChange.unsubscribe(),
                (this.onTranslationChange = void 0)),
                typeof this.onLangChange < "u" &&
                  (this.onLangChange.unsubscribe(),
                  (this.onLangChange = void 0)),
                typeof this.onDefaultLangChange < "u" &&
                  (this.onDefaultLangChange.unsubscribe(),
                  (this.onDefaultLangChange = void 0));
            }
            ngOnDestroy() {
              this._dispose();
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(kr, 16), C(Fo, 16));
            }),
            (e.ɵpipe = lt({ name: "translate", type: e, pure: !1 })),
            (e.ɵprov = k({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        xP = (() => {
          class e {
            static forRoot(t = {}) {
              return {
                ngModule: e,
                providers: [
                  t.loader || { provide: ps, useClass: iw },
                  t.compiler || { provide: kl, useClass: uw },
                  t.parser || { provide: Pl, useClass: lw },
                  t.missingTranslationHandler || { provide: Qf, useClass: sw },
                  cw,
                  { provide: Jf, useValue: t.isolate },
                  { provide: eh, useValue: t.useDefaultLang },
                  { provide: nh, useValue: t.extend },
                  { provide: th, useValue: t.defaultLanguage },
                  kr,
                ],
              };
            }
            static forChild(t = {}) {
              return {
                ngModule: e,
                providers: [
                  t.loader || { provide: ps, useClass: iw },
                  t.compiler || { provide: kl, useClass: uw },
                  t.parser || { provide: Pl, useClass: lw },
                  t.missingTranslationHandler || { provide: Qf, useClass: sw },
                  { provide: Jf, useValue: t.isolate },
                  { provide: eh, useValue: t.useDefaultLang },
                  { provide: nh, useValue: t.extend },
                  { provide: th, useValue: t.defaultLanguage },
                  kr,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({})),
            e
          );
        })();
      function RP(e, n) {
        if (1 & e) {
          const t = (function zm() {
            return E();
          })();
          M(0, "tr")(1, "th", 16),
            ge(2),
            O(),
            M(3, "td"),
            ge(4),
            O(),
            M(5, "td"),
            ge(6),
            _n(7, "date"),
            O(),
            M(8, "td"),
            ge(9),
            O(),
            M(10, "td"),
            ge(11),
            O(),
            M(12, "td"),
            ge(13),
            O(),
            M(14, "td"),
            ge(15),
            O(),
            M(16, "td", 17)(17, "div")(18, "button", 18),
            de("click", function () {
              const i = Su(t).$implicit;
              return Mu(Ta().editBooking(i.idBooking));
            }),
            O(),
            M(19, "button", 19),
            de("click", function () {
              const i = Su(t).$implicit;
              return Mu(Ta().deactivateBooking(i.idBooking));
            }),
            O()()()();
        }
        if (2 & e) {
          const t = n.$implicit;
          oe(2),
            Ut(t.idBooking),
            oe(2),
            Ut(t.nameClient),
            oe(2),
            Ut(
              (function Mv(e, n, t, r) {
                const o = e + Ce,
                  i = E(),
                  s = eo(i, o);
                return ji(i, o)
                  ? wv(i, ct(), n, s.transform, t, r, s)
                  : s.transform(t, r);
              })(7, 7, t.dateTime, "medium")
            ),
            oe(3),
            Ut(t.numberOfPeople),
            oe(2),
            Ut(t.phoneNumber),
            oe(2),
            Ut(t.email),
            oe(2),
            Ut(t.active ? "S\xed" : "No");
        }
      }
      let NP = (() => {
          class e {
            constructor(t, r) {
              (this.bookingService = t),
                (this.enrutador = r),
                (this.bookings = []);
            }
            ngOnInit() {
              this.getBooking();
            }
            getBooking() {
              this.bookingService.getBookingList().subscribe((t) => {
                this.bookings = t;
              });
            }
            editBooking(t) {
              this.enrutador.navigate(["booking-edit", t]);
            }
            deactivateBooking(t) {
              let r = this.bookings.find((o) => o.idBooking === t);
              r &&
                this.bookingService
                  .deactivateBooking(t, r)
                  .subscribe({
                    next: (o) => this.getBooking(),
                    error: (o) => console.log(o),
                  });
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Yf), C(it));
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["booking-list"]],
              decls: 18,
              vars: 1,
              consts: [
                [1, "container", "my-5"],
                [1, "text-center", 2, "margin", "30px"],
                ["translate", "bookingList.title"],
                ["translate", "bookingList.info", 1, "alert", "alert-info"],
                [1, "table-responsive"],
                [
                  1,
                  "container",
                  "table",
                  "table-striped",
                  "table-hover",
                  "align-middle",
                ],
                [1, "table-dark"],
                ["scope", "col", "translate", "bookingList.tableHeaders.id"],
                [
                  "scope",
                  "col",
                  "translate",
                  "bookingList.tableHeaders.clientName",
                ],
                [
                  "scope",
                  "col",
                  "translate",
                  "bookingList.tableHeaders.dateTime",
                ],
                [
                  "scope",
                  "col",
                  "translate",
                  "bookingList.tableHeaders.numberOfPeople",
                ],
                [
                  "scope",
                  "col",
                  "translate",
                  "bookingList.tableHeaders.phoneNumber",
                ],
                ["scope", "col", "translate", "bookingList.tableHeaders.email"],
                [
                  "scope",
                  "col",
                  "translate",
                  "bookingList.tableHeaders.active",
                ],
                [
                  "scope",
                  "col",
                  "translate",
                  "bookingList.tableHeaders.actions",
                ],
                [4, "ngFor", "ngForOf"],
                ["scope", "row"],
                [1, "text-center"],
                [
                  "translate",
                  "bookingList.buttons.edit",
                  1,
                  "btn",
                  "btn-warning",
                  "btn-sm",
                  "me-3",
                  "my-1",
                  3,
                  "click",
                ],
                [
                  "translate",
                  "bookingList.buttons.delete",
                  1,
                  "btn",
                  "btn-danger",
                  "btn-sm",
                  "my-1",
                  3,
                  "click",
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0)(1, "div", 1),
                  P(2, "h3", 2),
                  O(),
                  P(3, "div", 3),
                  M(4, "div", 4)(5, "table", 5)(6, "thead", 6)(7, "tr"),
                  P(8, "th", 7)(9, "th", 8)(10, "th", 9)(11, "th", 10)(
                    12,
                    "th",
                    11
                  )(13, "th", 12)(14, "th", 13)(15, "th", 14),
                  O()(),
                  M(16, "tbody"),
                  Wc(17, RP, 20, 10, "tr", 15),
                  O()()()()),
                  2 & r && (oe(17), rt("ngForOf", o.bookings));
              },
              dependencies: [KD, qo, JD],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        OP = (() => {
          class e {
            constructor(t) {
              this.translate = t;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(kr));
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-card"]],
              decls: 27,
              vars: 0,
              consts: [
                [1, "my-5"],
                ["translate", "projectHeader", 1, "text-center"],
                [1, "row", "row-cols-1", "row-cols-md-2", "g-4"],
                [1, "col"],
                [1, "card", "h-100"],
                [
                  "src",
                  "./assets/img/responsive.webp",
                  "alt",
                  "responsive image",
                  1,
                  "card-img-top",
                ],
                [1, "card-body"],
                [
                  "translate",
                  "dynamicResponsive.title",
                  1,
                  "card-title",
                  "text-center",
                ],
                ["translate", "dynamicResponsive.description", 1, "card-text"],
                [
                  "src",
                  "./assets/img/booking.webp",
                  "alt",
                  "booking image",
                  1,
                  "card-img-top",
                ],
                [
                  "translate",
                  "uniqueBookings.title",
                  1,
                  "card-title",
                  "text-center",
                ],
                ["translate", "uniqueBookings.description", 1, "card-text"],
                [
                  "src",
                  "./assets/img/safe.webp",
                  "alt",
                  "safe image",
                  1,
                  "card-img-top",
                ],
                [
                  "translate",
                  "dataHandling.title",
                  1,
                  "card-title",
                  "text-center",
                ],
                ["translate", "dataHandling.description", 1, "card-text"],
                [
                  "src",
                  "./assets/img/secureaccess.webp",
                  "alt",
                  "secure access image",
                  1,
                  "card-img-top",
                ],
                [
                  "translate",
                  "secureAccess.title",
                  1,
                  "card-title",
                  "text-center",
                ],
                ["translate", "secureAccess.description", 1, "card-text"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0),
                  P(1, "h3", 1),
                  O(),
                  M(2, "div", 2)(3, "div", 3)(4, "div", 4),
                  P(5, "img", 5),
                  M(6, "div", 6),
                  P(7, "h5", 7)(8, "p", 8),
                  O()()(),
                  M(9, "div", 3)(10, "div", 4),
                  P(11, "img", 9),
                  M(12, "div", 6),
                  P(13, "h5", 10)(14, "p", 11),
                  O()()(),
                  M(15, "div", 3)(16, "div", 4),
                  P(17, "img", 12),
                  M(18, "div", 6),
                  P(19, "h5", 13)(20, "p", 14),
                  O()()(),
                  M(21, "div", 3)(22, "div", 4),
                  P(23, "img", 15),
                  M(24, "div", 6),
                  P(25, "h5", 16)(26, "p", 17),
                  O()()()());
              },
              dependencies: [qo],
              styles: [
                ".card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:200px;object-fit:cover}",
              ],
            }));
          }
          return e;
        })(),
        FP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-header"]],
              decls: 27,
              vars: 0,
              consts: [
                [
                  "id",
                  "carouselExampleDark",
                  1,
                  "carousel",
                  "carousel-dark",
                  "slide",
                ],
                [1, "carousel-indicators"],
                [
                  "type",
                  "button",
                  "data-bs-target",
                  "#carouselExampleDark",
                  "data-bs-slide-to",
                  "0",
                  "aria-current",
                  "true",
                  "aria-label",
                  "Slide 1",
                  1,
                  "active",
                ],
                [
                  "type",
                  "button",
                  "data-bs-target",
                  "#carouselExampleDark",
                  "data-bs-slide-to",
                  "1",
                  "aria-label",
                  "Slide 2",
                ],
                [
                  "type",
                  "button",
                  "data-bs-target",
                  "#carouselExampleDark",
                  "data-bs-slide-to",
                  "2",
                  "aria-label",
                  "Slide 3",
                ],
                [1, "carousel-inner"],
                ["data-bs-interval", "10000", 1, "carousel-item", "active"],
                [
                  "src",
                  "../assets/img/developer.webp",
                  "alt",
                  "developer siluet image",
                  1,
                  "d-block",
                  "w-100",
                ],
                [1, "carousel-caption", "d-none", "d-md-block", "text-light"],
                ["translate", "header.carousel.slide1.title"],
                ["translate", "header.carousel.slide1.description"],
                ["data-bs-interval", "2000", 1, "carousel-item"],
                [
                  "src",
                  "../assets/img/learn.webp",
                  "alt",
                  "keyboard learn image",
                  1,
                  "d-block",
                  "w-100",
                ],
                [1, "carousel-caption", "d-none", "d-md-block"],
                ["translate", "header.carousel.slide2.title"],
                ["translate", "header.carousel.slide2.description"],
                [1, "carousel-item"],
                [
                  "src",
                  "./assets/img/developer2.webp",
                  "alt",
                  "developer image",
                  1,
                  "d-block",
                  "w-100",
                ],
                ["translate", "header.carousel.slide3.title"],
                ["translate", "header.carousel.slide3.description"],
                [
                  "type",
                  "button",
                  "data-bs-target",
                  "#carouselExampleDark",
                  "data-bs-slide",
                  "prev",
                  1,
                  "carousel-control-prev",
                ],
                ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
                ["translate", "header.carousel.prev", 1, "visually-hidden"],
                [
                  "type",
                  "button",
                  "data-bs-target",
                  "#carouselExampleDark",
                  "data-bs-slide",
                  "next",
                  1,
                  "carousel-control-next",
                ],
                ["aria-hidden", "true", 1, "carousel-control-next-icon"],
                ["translate", "header.carousel.next", 1, "visually-hidden"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0)(1, "div", 1),
                  P(2, "button", 2)(3, "button", 3)(4, "button", 4),
                  O(),
                  M(5, "div", 5)(6, "div", 6),
                  P(7, "img", 7),
                  M(8, "div", 8),
                  P(9, "h5", 9)(10, "p", 10),
                  O()(),
                  M(11, "div", 11),
                  P(12, "img", 12),
                  M(13, "div", 13),
                  P(14, "h5", 14)(15, "p", 15),
                  O()(),
                  M(16, "div", 16),
                  P(17, "img", 17),
                  M(18, "div", 8),
                  P(19, "h5", 18)(20, "p", 19),
                  O()()(),
                  M(21, "button", 20),
                  P(22, "span", 21)(23, "span", 22),
                  O(),
                  M(24, "button", 23),
                  P(25, "span", 24)(26, "span", 25),
                  O()());
              },
              dependencies: [qo],
              styles: [
                ".carousel-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-fit:cover;height:70vh}",
              ],
            }));
          }
          return e;
        })(),
        PP = (() => {
          class e {
            constructor(t) {
              this.translate = t;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(kr));
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-accordion"]],
              decls: 21,
              vars: 0,
              consts: [
                [1, "my-5"],
                ["translate", "accordionHeader", 1, "text-center"],
                ["id", "accordionPanelsStayOpenExample", 1, "accordion"],
                [1, "accordion-item"],
                [1, "accordion-header"],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#panelsStayOpen-collapseOne",
                  "aria-expanded",
                  "true",
                  "aria-controls",
                  "panelsStayOpen-collapseOne",
                  1,
                  "accordion-button",
                ],
                [
                  "id",
                  "panelsStayOpen-collapseOne",
                  1,
                  "accordion-collapse",
                  "collapse",
                  "show",
                ],
                ["translate", "accordionDescription1", 1, "accordion-body"],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#panelsStayOpen-collapseTwo",
                  "aria-expanded",
                  "false",
                  "aria-controls",
                  "panelsStayOpen-collapseTwo",
                  1,
                  "accordion-button",
                  "collapsed",
                ],
                [
                  "id",
                  "panelsStayOpen-collapseTwo",
                  1,
                  "accordion-collapse",
                  "collapse",
                ],
                ["translate", "accordionDescription2", 1, "accordion-body"],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#panelsStayOpen-collapseThree",
                  "aria-expanded",
                  "false",
                  "aria-controls",
                  "panelsStayOpen-collapseThree",
                  1,
                  "accordion-button",
                  "collapsed",
                ],
                [
                  "id",
                  "panelsStayOpen-collapseThree",
                  1,
                  "accordion-collapse",
                  "collapse",
                ],
                ["translate", "accordionDescription3", 1, "accordion-body"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0),
                  P(1, "h3", 1),
                  O(),
                  M(2, "div", 2)(3, "div", 3)(4, "h2", 4)(5, "button", 5),
                  ge(6, " Workflow Design "),
                  O()(),
                  M(7, "div", 6),
                  P(8, "div", 7),
                  O()(),
                  M(9, "div", 3)(10, "h2", 4)(11, "button", 8),
                  ge(12, " Frontend and Backend "),
                  O()(),
                  M(13, "div", 9),
                  P(14, "div", 10),
                  O()(),
                  M(15, "div", 3)(16, "h2", 4)(17, "button", 11),
                  ge(18, " Development and Learning "),
                  O()(),
                  M(19, "div", 12),
                  P(20, "div", 13),
                  O()()());
              },
              dependencies: [qo],
            }));
          }
          return e;
        })(),
        kP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-techimages"]],
              decls: 26,
              vars: 0,
              consts: [
                [1, "container", "my-5"],
                [1, "row", "text-center"],
                [1, "col-md-2"],
                [1, "fab", "fa-bootstrap", "fa-3x"],
                [1, "fab", "fa-angular", "fa-3x"],
                [1, "fab", "fa-git", "fa-3x"],
                [1, "fab", "fa-github", "fa-3x"],
                [1, "fab", "fa-java", "fa-3x"],
                [1, "fas", "fa-database", "fa-3x"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "div", 0)(1, "div", 1)(2, "div", 2),
                  P(3, "i", 3),
                  M(4, "p"),
                  ge(5, "Bootstrap"),
                  O()(),
                  M(6, "div", 2),
                  P(7, "i", 4),
                  M(8, "p"),
                  ge(9, "Angular"),
                  O()(),
                  M(10, "div", 2),
                  P(11, "i", 5),
                  M(12, "p"),
                  ge(13, "Git"),
                  O()(),
                  M(14, "div", 2),
                  P(15, "i", 6),
                  M(16, "p"),
                  ge(17, "GitHub"),
                  O()(),
                  M(18, "div", 2),
                  P(19, "i", 7),
                  M(20, "p"),
                  ge(21, "Java"),
                  O()(),
                  M(22, "div", 2),
                  P(23, "i", 8),
                  M(24, "p"),
                  ge(25, "MySQL"),
                  O()()()());
              },
            }));
          }
          return e;
        })(),
        LP = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-homepage"]],
              decls: 5,
              vars: 0,
              consts: [[1, "container"]],
              template: function (r, o) {
                1 & r &&
                  (P(0, "app-header"),
                  M(1, "div", 0),
                  P(2, "app-card")(3, "app-techimages")(4, "app-accordion"),
                  O());
              },
              dependencies: [OP, FP, PP, kP],
              encapsulation: 2,
            }));
          }
          return e;
        })();
      class dw {}
      let fw = (() => {
          class e {
            constructor(t, r) {
              (this._renderer = t),
                (this._elementRef = r),
                (this.onChange = (o) => {}),
                (this.onTouched = () => {});
            }
            setProperty(t, r) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, r);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            setDisabledState(t) {
              this.setProperty("disabled", t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(kn), C(Ct));
            }),
            (e.ɵdir = U({ type: e })),
            e
          );
        })(),
        Lr = (() => {
          class e extends fw {}
          return (
            (e.ɵfac = (function () {
              let n;
              return function (r) {
                return (n || (n = Ve(e)))(r || e);
              };
            })()),
            (e.ɵdir = U({ type: e, features: [ce] })),
            e
          );
        })();
      const En = new F("NgValueAccessor"),
        BP = { provide: En, useExisting: ye(() => ms), multi: !0 },
        $P = new F("CompositionEventMode");
      let ms = (() => {
        class e extends fw {
          constructor(t, r, o) {
            super(t, r),
              (this._compositionMode = o),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function jP() {
                  const e = zn() ? zn().getUserAgent() : "";
                  return /android (\d+)/.test(e.toLowerCase());
                })());
          }
          writeValue(t) {
            this.setProperty("value", t ?? "");
          }
          _handleInput(t) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(C(kn), C(Ct), C($P, 8));
          }),
          (e.ɵdir = U({
            type: e,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (t, r) {
              1 & t &&
                de("input", function (i) {
                  return r._handleInput(i.target.value);
                })("blur", function () {
                  return r.onTouched();
                })("compositionstart", function () {
                  return r._compositionStart();
                })("compositionend", function (i) {
                  return r._compositionEnd(i.target.value);
                });
            },
            features: [we([BP]), ce],
          })),
          e
        );
      })();
      const HP = !1;
      const st = new F("NgValidators"),
        gr = new F("NgAsyncValidators");
      function yw(e) {
        return (function pr(e) {
          return (
            null == e ||
            (("string" == typeof e || Array.isArray(e)) && 0 === e.length)
          );
        })(e.value)
          ? { required: !0 }
          : null;
      }
      function Ll(e) {
        return null;
      }
      function bw(e) {
        return null != e;
      }
      function Ew(e) {
        const n = Ni(e) ? Le(e) : e;
        if (HP && !Yc(n)) {
          let t = "Expected async validator to return Promise or Observable.";
          throw (
            ("object" == typeof e &&
              (t +=
                " Are you using a synchronous validator where an async validator is expected?"),
            new S(-1101, t))
          );
        }
        return n;
      }
      function Sw(e) {
        let n = {};
        return (
          e.forEach((t) => {
            n = null != t ? { ...n, ...t } : n;
          }),
          0 === Object.keys(n).length ? null : n
        );
      }
      function Mw(e, n) {
        return n.map((t) => t(e));
      }
      function Iw(e) {
        return e.map((n) =>
          (function zP(e) {
            return !e.validate;
          })(n)
            ? n
            : (t) => n.validate(t)
        );
      }
      function rh(e) {
        return null != e
          ? (function Aw(e) {
              if (!e) return null;
              const n = e.filter(bw);
              return 0 == n.length
                ? null
                : function (t) {
                    return Sw(Mw(t, n));
                  };
            })(Iw(e))
          : null;
      }
      function oh(e) {
        return null != e
          ? (function Tw(e) {
              if (!e) return null;
              const n = e.filter(bw);
              return 0 == n.length
                ? null
                : function (t) {
                    return nw(Mw(t, n).map(Ew)).pipe(z(Sw));
                  };
            })(Iw(e))
          : null;
      }
      function xw(e, n) {
        return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n];
      }
      function ih(e) {
        return e ? (Array.isArray(e) ? e : [e]) : [];
      }
      function Vl(e, n) {
        return Array.isArray(e) ? e.includes(n) : e === n;
      }
      function Ow(e, n) {
        const t = ih(n);
        return (
          ih(e).forEach((o) => {
            Vl(t, o) || t.push(o);
          }),
          t
        );
      }
      function Fw(e, n) {
        return ih(n).filter((t) => !Vl(e, t));
      }
      class Pw {
        constructor() {
          (this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = []);
        }
        get value() {
          return this.control ? this.control.value : null;
        }
        get valid() {
          return this.control ? this.control.valid : null;
        }
        get invalid() {
          return this.control ? this.control.invalid : null;
        }
        get pending() {
          return this.control ? this.control.pending : null;
        }
        get disabled() {
          return this.control ? this.control.disabled : null;
        }
        get enabled() {
          return this.control ? this.control.enabled : null;
        }
        get errors() {
          return this.control ? this.control.errors : null;
        }
        get pristine() {
          return this.control ? this.control.pristine : null;
        }
        get dirty() {
          return this.control ? this.control.dirty : null;
        }
        get touched() {
          return this.control ? this.control.touched : null;
        }
        get status() {
          return this.control ? this.control.status : null;
        }
        get untouched() {
          return this.control ? this.control.untouched : null;
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null;
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null;
        }
        get path() {
          return null;
        }
        _setValidators(n) {
          (this._rawValidators = n || []),
            (this._composedValidatorFn = rh(this._rawValidators));
        }
        _setAsyncValidators(n) {
          (this._rawAsyncValidators = n || []),
            (this._composedAsyncValidatorFn = oh(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn || null;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null;
        }
        _registerOnDestroy(n) {
          this._onDestroyCallbacks.push(n);
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((n) => n()),
            (this._onDestroyCallbacks = []);
        }
        reset(n) {
          this.control && this.control.reset(n);
        }
        hasError(n, t) {
          return !!this.control && this.control.hasError(n, t);
        }
        getError(n, t) {
          return this.control ? this.control.getError(n, t) : null;
        }
      }
      class gt extends Pw {
        get formDirective() {
          return null;
        }
        get path() {
          return null;
        }
      }
      class mr extends Pw {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class kw {
        constructor(n) {
          this._cd = n;
        }
        get isTouched() {
          return !!this._cd?.control?.touched;
        }
        get isUntouched() {
          return !!this._cd?.control?.untouched;
        }
        get isPristine() {
          return !!this._cd?.control?.pristine;
        }
        get isDirty() {
          return !!this._cd?.control?.dirty;
        }
        get isValid() {
          return !!this._cd?.control?.valid;
        }
        get isInvalid() {
          return !!this._cd?.control?.invalid;
        }
        get isPending() {
          return !!this._cd?.control?.pending;
        }
        get isSubmitted() {
          return !!this._cd?.submitted;
        }
      }
      let sh = (() => {
          class e extends kw {
            constructor(t) {
              super(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(mr, 2));
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, r) {
                2 & t &&
                  Ra("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending);
              },
              features: [ce],
            })),
            e
          );
        })(),
        ah = (() => {
          class e extends kw {
            constructor(t) {
              super(t);
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(C(gt, 10));
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 16,
              hostBindings: function (t, r) {
                2 & t &&
                  Ra("ng-untouched", r.isUntouched)("ng-touched", r.isTouched)(
                    "ng-pristine",
                    r.isPristine
                  )("ng-dirty", r.isDirty)("ng-valid", r.isValid)(
                    "ng-invalid",
                    r.isInvalid
                  )("ng-pending", r.isPending)("ng-submitted", r.isSubmitted);
              },
              features: [ce],
            })),
            e
          );
        })();
      function Lw(e, n) {
        return e ? `with name: '${n}'` : `at index: ${n}`;
      }
      const ch = !1,
        ys = "VALID",
        jl = "INVALID",
        Ko = "PENDING",
        vs = "DISABLED";
      function dh(e) {
        return ($l(e) ? e.validators : e) || null;
      }
      function fh(e, n) {
        return ($l(n) ? n.asyncValidators : e) || null;
      }
      function $l(e) {
        return null != e && !Array.isArray(e) && "object" == typeof e;
      }
      class jw {
        constructor(n, t) {
          (this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            this._assignValidators(n),
            this._assignAsyncValidators(t);
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(n) {
          this._rawValidators = this._composedValidatorFn = n;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(n) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = n;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === ys;
        }
        get invalid() {
          return this.status === jl;
        }
        get pending() {
          return this.status == Ko;
        }
        get disabled() {
          return this.status === vs;
        }
        get enabled() {
          return this.status !== vs;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(n) {
          this._assignValidators(n);
        }
        setAsyncValidators(n) {
          this._assignAsyncValidators(n);
        }
        addValidators(n) {
          this.setValidators(Ow(n, this._rawValidators));
        }
        addAsyncValidators(n) {
          this.setAsyncValidators(Ow(n, this._rawAsyncValidators));
        }
        removeValidators(n) {
          this.setValidators(Fw(n, this._rawValidators));
        }
        removeAsyncValidators(n) {
          this.setAsyncValidators(Fw(n, this._rawAsyncValidators));
        }
        hasValidator(n) {
          return Vl(this._rawValidators, n);
        }
        hasAsyncValidator(n) {
          return Vl(this._rawAsyncValidators, n);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(n = {}) {
          (this.touched = !0),
            this._parent && !n.onlySelf && this._parent.markAsTouched(n);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((n) => n.markAllAsTouched());
        }
        markAsUntouched(n = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !n.onlySelf && this._parent._updateTouched(n);
        }
        markAsDirty(n = {}) {
          (this.pristine = !1),
            this._parent && !n.onlySelf && this._parent.markAsDirty(n);
        }
        markAsPristine(n = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !n.onlySelf && this._parent._updatePristine(n);
        }
        markAsPending(n = {}) {
          (this.status = Ko),
            !1 !== n.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !n.onlySelf && this._parent.markAsPending(n);
        }
        disable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf);
          (this.status = vs),
            (this.errors = null),
            this._forEachChild((r) => {
              r.disable({ ...n, onlySelf: !0 });
            }),
            this._updateValue(),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!0));
        }
        enable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf);
          (this.status = ys),
            this._forEachChild((r) => {
              r.enable({ ...n, onlySelf: !0 });
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            }),
            this._updateAncestors({ ...n, skipPristineCheck: t }),
            this._onDisabledChange.forEach((r) => r(!1));
        }
        _updateAncestors(n) {
          this._parent &&
            !n.onlySelf &&
            (this._parent.updateValueAndValidity(n),
            n.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(n) {
          this._parent = n;
        }
        getRawValue() {
          return this.value;
        }
        updateValueAndValidity(n = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === ys || this.status === Ko) &&
                this._runAsyncValidator(n.emitEvent)),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !n.onlySelf &&
              this._parent.updateValueAndValidity(n);
        }
        _updateTreeValidity(n = { emitEvent: !0 }) {
          this._forEachChild((t) => t._updateTreeValidity(n)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? vs : ys;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(n) {
          if (this.asyncValidator) {
            (this.status = Ko), (this._hasOwnPendingAsyncValidator = !0);
            const t = Ew(this.asyncValidator(this));
            this._asyncValidationSubscription = t.subscribe((r) => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(r, { emitEvent: n });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(n, t = {}) {
          (this.errors = n), this._updateControlsErrors(!1 !== t.emitEvent);
        }
        get(n) {
          let t = n;
          return null == t ||
            (Array.isArray(t) || (t = t.split(".")), 0 === t.length)
            ? null
            : t.reduce((r, o) => r && r._find(o), this);
        }
        getError(n, t) {
          const r = t ? this.get(t) : this;
          return r && r.errors ? r.errors[n] : null;
        }
        hasError(n, t) {
          return !!this.getError(n, t);
        }
        get root() {
          let n = this;
          for (; n._parent; ) n = n._parent;
          return n;
        }
        _updateControlsErrors(n) {
          (this.status = this._calculateStatus()),
            n && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(n);
        }
        _initObservables() {
          (this.valueChanges = new he()), (this.statusChanges = new he());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? vs
            : this.errors
            ? jl
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Ko)
            ? Ko
            : this._anyControlsHaveStatus(jl)
            ? jl
            : ys;
        }
        _anyControlsHaveStatus(n) {
          return this._anyControls((t) => t.status === n);
        }
        _anyControlsDirty() {
          return this._anyControls((n) => n.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((n) => n.touched);
        }
        _updatePristine(n = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !n.onlySelf && this._parent._updatePristine(n);
        }
        _updateTouched(n = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !n.onlySelf && this._parent._updateTouched(n);
        }
        _registerOnCollectionChange(n) {
          this._onCollectionChange = n;
        }
        _setUpdateStrategy(n) {
          $l(n) && null != n.updateOn && (this._updateOn = n.updateOn);
        }
        _parentMarkedDirty(n) {
          return (
            !n &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
        _find(n) {
          return null;
        }
        _assignValidators(n) {
          (this._rawValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedValidatorFn = (function QP(e) {
              return Array.isArray(e) ? rh(e) : e || null;
            })(this._rawValidators));
        }
        _assignAsyncValidators(n) {
          (this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n),
            (this._composedAsyncValidatorFn = (function XP(e) {
              return Array.isArray(e) ? oh(e) : e || null;
            })(this._rawAsyncValidators));
        }
      }
      class hh extends jw {
        constructor(n, t, r) {
          super(dh(t), fh(r, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            });
        }
        registerControl(n, t) {
          return this.controls[n]
            ? this.controls[n]
            : ((this.controls[n] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t);
        }
        addControl(n, t, r = {}) {
          this.registerControl(n, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        removeControl(n, t = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            this.updateValueAndValidity({ emitEvent: t.emitEvent }),
            this._onCollectionChange();
        }
        setControl(n, t, r = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            t && this.registerControl(n, t),
            this.updateValueAndValidity({ emitEvent: r.emitEvent }),
            this._onCollectionChange();
        }
        contains(n) {
          return this.controls.hasOwnProperty(n) && this.controls[n].enabled;
        }
        setValue(n, t = {}) {
          (function Bw(e, n, t) {
            e._forEachChild((r, o) => {
              if (void 0 === t[o])
                throw new S(
                  1002,
                  ch
                    ? (function YP(e, n) {
                        return `Must supply a value for form control ${Lw(
                          e,
                          n
                        )}`;
                      })(n, o)
                    : ""
                );
            });
          })(this, !0, n),
            Object.keys(n).forEach((r) => {
              (function Vw(e, n, t) {
                const r = e.controls;
                if (!(n ? Object.keys(r) : r).length)
                  throw new S(
                    1e3,
                    ch
                      ? (function KP(e) {
                          return `\n    There are no form controls registered with this ${
                            e ? "group" : "array"
                          } yet. If you're using ngModel,\n    you may want to check next tick (e.g. use setTimeout).\n  `;
                        })(n)
                      : ""
                  );
                if (!r[t])
                  throw new S(
                    1001,
                    ch
                      ? (function ZP(e, n) {
                          return `Cannot find form control ${Lw(e, n)}`;
                        })(n, t)
                      : ""
                  );
              })(this, !0, r),
                this.controls[r].setValue(n[r], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                });
            }),
            this.updateValueAndValidity(t);
        }
        patchValue(n, t = {}) {
          null != n &&
            (Object.keys(n).forEach((r) => {
              const o = this.controls[r];
              o && o.patchValue(n[r], { onlySelf: !0, emitEvent: t.emitEvent });
            }),
            this.updateValueAndValidity(t));
        }
        reset(n = {}, t = {}) {
          this._forEachChild((r, o) => {
            r.reset(n[o], { onlySelf: !0, emitEvent: t.emitEvent });
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (n, t, r) => ((n[r] = t.getRawValue()), n)
          );
        }
        _syncPendingControls() {
          let n = this._reduceChildren(
            !1,
            (t, r) => !!r._syncPendingControls() || t
          );
          return n && this.updateValueAndValidity({ onlySelf: !0 }), n;
        }
        _forEachChild(n) {
          Object.keys(this.controls).forEach((t) => {
            const r = this.controls[t];
            r && n(r, t);
          });
        }
        _setUpControls() {
          this._forEachChild((n) => {
            n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(n) {
          for (const [t, r] of Object.entries(this.controls))
            if (this.contains(t) && n(r)) return !0;
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, r, o) => ((r.enabled || this.disabled) && (t[o] = r.value), t)
          );
        }
        _reduceChildren(n, t) {
          let r = n;
          return (
            this._forEachChild((o, i) => {
              r = t(r, o, i);
            }),
            r
          );
        }
        _allControlsDisabled() {
          for (const n of Object.keys(this.controls))
            if (this.controls[n].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _find(n) {
          return this.controls.hasOwnProperty(n) ? this.controls[n] : null;
        }
      }
      const Vr = new F("CallSetDisabledState", {
          providedIn: "root",
          factory: () => Ds,
        }),
        Ds = "always";
      function _s(e, n, t = Ds) {
        ph(e, n),
          n.valueAccessor.writeValue(e.value),
          (e.disabled || "always" === t) &&
            n.valueAccessor.setDisabledState?.(e.disabled),
          (function tk(e, n) {
            n.valueAccessor.registerOnChange((t) => {
              (e._pendingValue = t),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                "change" === e.updateOn && $w(e, n);
            });
          })(e, n),
          (function rk(e, n) {
            const t = (r, o) => {
              n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r);
            };
            e.registerOnChange(t),
              n._registerOnDestroy(() => {
                e._unregisterOnChange(t);
              });
          })(e, n),
          (function nk(e, n) {
            n.valueAccessor.registerOnTouched(() => {
              (e._pendingTouched = !0),
                "blur" === e.updateOn && e._pendingChange && $w(e, n),
                "submit" !== e.updateOn && e.markAsTouched();
            });
          })(e, n),
          (function ek(e, n) {
            if (n.valueAccessor.setDisabledState) {
              const t = (r) => {
                n.valueAccessor.setDisabledState(r);
              };
              e.registerOnDisabledChange(t),
                n._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(t);
                });
            }
          })(e, n);
      }
      function zl(e, n) {
        e.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(n);
        });
      }
      function ph(e, n) {
        const t = (function Rw(e) {
          return e._rawValidators;
        })(e);
        null !== n.validator
          ? e.setValidators(xw(t, n.validator))
          : "function" == typeof t && e.setValidators([t]);
        const r = (function Nw(e) {
          return e._rawAsyncValidators;
        })(e);
        null !== n.asyncValidator
          ? e.setAsyncValidators(xw(r, n.asyncValidator))
          : "function" == typeof r && e.setAsyncValidators([r]);
        const o = () => e.updateValueAndValidity();
        zl(n._rawValidators, o), zl(n._rawAsyncValidators, o);
      }
      function $w(e, n) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, { emitModelToViewChange: !1 }),
          n.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1);
      }
      const lk = { provide: gt, useExisting: ye(() => ws) },
        Cs = (() => Promise.resolve())();
      let ws = (() => {
        class e extends gt {
          constructor(t, r, o) {
            super(),
              (this.callSetDisabledState = o),
              (this.submitted = !1),
              (this._directives = new Set()),
              (this.ngSubmit = new he()),
              (this.form = new hh({}, rh(t), oh(r)));
          }
          ngAfterViewInit() {
            this._setUpdateStrategy();
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          get controls() {
            return this.form.controls;
          }
          addControl(t) {
            Cs.then(() => {
              const r = this._findContainer(t.path);
              (t.control = r.registerControl(t.name, t.control)),
                _s(t.control, t, this.callSetDisabledState),
                t.control.updateValueAndValidity({ emitEvent: !1 }),
                this._directives.add(t);
            });
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            Cs.then(() => {
              const r = this._findContainer(t.path);
              r && r.removeControl(t.name), this._directives.delete(t);
            });
          }
          addFormGroup(t) {
            Cs.then(() => {
              const r = this._findContainer(t.path),
                o = new hh({});
              (function Hw(e, n) {
                ph(e, n);
              })(o, t),
                r.registerControl(t.name, o),
                o.updateValueAndValidity({ emitEvent: !1 });
            });
          }
          removeFormGroup(t) {
            Cs.then(() => {
              const r = this._findContainer(t.path);
              r && r.removeControl(t.name);
            });
          }
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          updateModel(t, r) {
            Cs.then(() => {
              this.form.get(t.path).setValue(r);
            });
          }
          setValue(t) {
            this.control.setValue(t);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              (function Uw(e, n) {
                e._syncPendingControls(),
                  n.forEach((t) => {
                    const r = t.control;
                    "submit" === r.updateOn &&
                      r._pendingChange &&
                      (t.viewToModelUpdate(r._pendingValue),
                      (r._pendingChange = !1));
                  });
              })(this.form, this._directives),
              this.ngSubmit.emit(t),
              "dialog" === t?.target?.method
            );
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _setUpdateStrategy() {
            this.options &&
              null != this.options.updateOn &&
              (this.form._updateOn = this.options.updateOn);
          }
          _findContainer(t) {
            return t.pop(), t.length ? this.form.get(t) : this.form;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(C(st, 10), C(gr, 10), C(Vr, 8));
          }),
          (e.ɵdir = U({
            type: e,
            selectors: [
              ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
              ["ng-form"],
              ["", "ngForm", ""],
            ],
            hostBindings: function (t, r) {
              1 & t &&
                de("submit", function (i) {
                  return r.onSubmit(i);
                })("reset", function () {
                  return r.onReset();
                });
            },
            inputs: { options: ["ngFormOptions", "options"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [we([lk]), ce],
          })),
          e
        );
      })();
      function zw(e, n) {
        const t = e.indexOf(n);
        t > -1 && e.splice(t, 1);
      }
      function Gw(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          2 === Object.keys(e).length &&
          "value" in e &&
          "disabled" in e
        );
      }
      const Ww = class extends jw {
          constructor(n = null, t, r) {
            super(dh(t), fh(r, t)),
              (this.defaultValue = null),
              (this._onChange = []),
              (this._pendingChange = !1),
              this._applyFormState(n),
              this._setUpdateStrategy(t),
              this._initObservables(),
              this.updateValueAndValidity({
                onlySelf: !0,
                emitEvent: !!this.asyncValidator,
              }),
              $l(t) &&
                (t.nonNullable || t.initialValueIsDefault) &&
                (this.defaultValue = Gw(n) ? n.value : n);
          }
          setValue(n, t = {}) {
            (this.value = this._pendingValue = n),
              this._onChange.length &&
                !1 !== t.emitModelToViewChange &&
                this._onChange.forEach((r) =>
                  r(this.value, !1 !== t.emitViewToModelChange)
                ),
              this.updateValueAndValidity(t);
          }
          patchValue(n, t = {}) {
            this.setValue(n, t);
          }
          reset(n = this.defaultValue, t = {}) {
            this._applyFormState(n),
              this.markAsPristine(t),
              this.markAsUntouched(t),
              this.setValue(this.value, t),
              (this._pendingChange = !1);
          }
          _updateValue() {}
          _anyControls(n) {
            return !1;
          }
          _allControlsDisabled() {
            return this.disabled;
          }
          registerOnChange(n) {
            this._onChange.push(n);
          }
          _unregisterOnChange(n) {
            zw(this._onChange, n);
          }
          registerOnDisabledChange(n) {
            this._onDisabledChange.push(n);
          }
          _unregisterOnDisabledChange(n) {
            zw(this._onDisabledChange, n);
          }
          _forEachChild(n) {}
          _syncPendingControls() {
            return !(
              "submit" !== this.updateOn ||
              (this._pendingDirty && this.markAsDirty(),
              this._pendingTouched && this.markAsTouched(),
              !this._pendingChange) ||
              (this.setValue(this._pendingValue, {
                onlySelf: !0,
                emitModelToViewChange: !1,
              }),
              0)
            );
          }
          _applyFormState(n) {
            Gw(n)
              ? ((this.value = this._pendingValue = n.value),
                n.disabled
                  ? this.disable({ onlySelf: !0, emitEvent: !1 })
                  : this.enable({ onlySelf: !0, emitEvent: !1 }))
              : (this.value = this._pendingValue = n);
          }
        },
        dk = { provide: mr, useExisting: ye(() => Wl) },
        Zw = (() => Promise.resolve())();
      let Wl = (() => {
          class e extends mr {
            constructor(t, r, o, i, s, a) {
              super(),
                (this._changeDetectorRef = s),
                (this.callSetDisabledState = a),
                (this.control = new Ww()),
                (this._registered = !1),
                (this.update = new he()),
                (this._parent = t),
                this._setValidators(r),
                this._setAsyncValidators(o),
                (this.valueAccessor = (function yh(e, n) {
                  if (!n) return null;
                  let t, r, o;
                  return (
                    Array.isArray(n),
                    n.forEach((i) => {
                      i.constructor === ms
                        ? (t = i)
                        : (function sk(e) {
                            return Object.getPrototypeOf(e.constructor) === Lr;
                          })(i)
                        ? (r = i)
                        : (o = i);
                    }),
                    o || r || t || null
                  );
                })(0, i));
            }
            ngOnChanges(t) {
              if ((this._checkForErrors(), !this._registered || "name" in t)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const r = t.name.previousValue;
                  this.formDirective.removeControl({
                    name: r,
                    path: this._getPath(r),
                  });
                }
                this._setUpControl();
              }
              "isDisabled" in t && this._updateDisabled(t),
                (function mh(e, n) {
                  if (!e.hasOwnProperty("model")) return !1;
                  const t = e.model;
                  return !!t.isFirstChange() || !Object.is(n, t.currentValue);
                })(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._getPath(this.name);
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              _s(this.control, this, this.callSetDisabledState),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone();
            }
            _updateValue(t) {
              Zw.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 }),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _updateDisabled(t) {
              const r = t.isDisabled.currentValue,
                o = 0 !== r && Po(r);
              Zw.then(() => {
                o && !this.control.disabled
                  ? this.control.disable()
                  : !o && this.control.disabled && this.control.enable(),
                  this._changeDetectorRef?.markForCheck();
              });
            }
            _getPath(t) {
              return this._parent
                ? (function Hl(e, n) {
                    return [...n.path, e];
                  })(t, this._parent)
                : [t];
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                C(gt, 9),
                C(st, 10),
                C(gr, 10),
                C(En, 10),
                C(Fo, 8),
                C(Vr, 8)
              );
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [we([dk]), ce, Bt],
            })),
            e
          );
        })(),
        vh = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵdir = U({
              type: e,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            e
          );
        })();
      const fk = { provide: En, useExisting: ye(() => ql), multi: !0 };
      let ql = (() => {
          class e extends Lr {
            writeValue(t) {
              this.setProperty("value", t ?? "");
            }
            registerOnChange(t) {
              this.onChange = (r) => {
                t("" == r ? null : parseFloat(r));
              };
            }
          }
          return (
            (e.ɵfac = (function () {
              let n;
              return function (r) {
                return (n || (n = Ve(e)))(r || e);
              };
            })()),
            (e.ɵdir = U({
              type: e,
              selectors: [
                ["input", "type", "number", "formControlName", ""],
                ["input", "type", "number", "formControl", ""],
                ["input", "type", "number", "ngModel", ""],
              ],
              hostBindings: function (t, r) {
                1 & t &&
                  de("input", function (i) {
                    return r.onChange(i.target.value);
                  })("blur", function () {
                    return r.onTouched();
                  });
              },
              features: [we([fk]), ce],
            })),
            e
          );
        })(),
        Yw = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({})),
            e
          );
        })();
      const Dh = new F("NgModelWithFormControlWarning");
      let Br = (() => {
        class e {
          constructor() {
            this._validator = Ll;
          }
          ngOnChanges(t) {
            if (this.inputName in t) {
              const r = this.normalizeInput(t[this.inputName].currentValue);
              (this._enabled = this.enabled(r)),
                (this._validator = this._enabled
                  ? this.createValidator(r)
                  : Ll),
                this._onChange && this._onChange();
            }
          }
          validate(t) {
            return this._validator(t);
          }
          registerOnValidatorChange(t) {
            this._onChange = t;
          }
          enabled(t) {
            return null != t;
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)();
          }),
          (e.ɵdir = U({ type: e, features: [Bt] })),
          e
        );
      })();
      const Tk = { provide: st, useExisting: ye(() => bs), multi: !0 };
      let bs = (() => {
          class e extends Br {
            constructor() {
              super(...arguments),
                (this.inputName = "required"),
                (this.normalizeInput = Po),
                (this.createValidator = (t) => yw);
            }
            enabled(t) {
              return t;
            }
          }
          return (
            (e.ɵfac = (function () {
              let n;
              return function (r) {
                return (n || (n = Ve(e)))(r || e);
              };
            })()),
            (e.ɵdir = U({
              type: e,
              selectors: [
                [
                  "",
                  "required",
                  "",
                  "formControlName",
                  "",
                  3,
                  "type",
                  "checkbox",
                ],
                ["", "required", "", "formControl", "", 3, "type", "checkbox"],
                ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
              ],
              hostVars: 1,
              hostBindings: function (t, r) {
                2 & t && yn("required", r._enabled ? "" : null);
              },
              inputs: { required: "required" },
              features: [we([Tk]), ce],
            })),
            e
          );
        })(),
        hb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({ imports: [Yw] })),
            e
          );
        })(),
        kk = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  { provide: Vr, useValue: t.callSetDisabledState ?? Ds },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({ imports: [hb] })),
            e
          );
        })(),
        Lk = (() => {
          class e {
            static withConfig(t) {
              return {
                ngModule: e,
                providers: [
                  {
                    provide: Dh,
                    useValue: t.warnOnNgModelWithFormControl ?? "always",
                  },
                  { provide: Vr, useValue: t.callSetDisabledState ?? Ds },
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)();
            }),
            (e.ɵmod = At({ type: e })),
            (e.ɵinj = mt({ imports: [hb] })),
            e
          );
        })();
      const Vk = function () {
        return ["/"];
      };
      let Bk = (() => {
        class e {
          constructor(t, r, o) {
            (this.bookingService = t),
              (this.route = r),
              (this.enrutador = o),
              (this.booking = new dw());
          }
          ngOnInit() {
            (this.id = this.route.snapshot.params.id),
              this.bookingService.getBookingById(this.id).subscribe({
                next: (t) => (this.booking = t),
                error: (t) => {
                  console.log(t);
                },
              });
          }
          onSubmit() {
            this.saveBooking();
          }
          saveBooking() {
            this.bookingService
              .editBooking(this.booking.idBooking, this.booking)
              .subscribe({
                next: (t) => this.getBookingList(),
                error: (t) => console.log(t),
              });
          }
          getBookingList() {
            this.enrutador.navigate(["/booking-list"]);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Yf), C(Pr), C(it));
          });
          static #t = (this.ɵcmp = It({
            type: e,
            selectors: [["app-booking-edit"]],
            decls: 23,
            vars: 7,
            consts: [
              [1, "container", "my-5"],
              [1, "container", "text-center"],
              ["translate", "bookingEdit.title"],
              ["translate", "booking-Edit.info", 1, "alert", "alert-info"],
              [3, "ngSubmit"],
              [1, "mb-3"],
              [
                "for",
                "nameClient",
                "translate",
                "bookingEdit.labels.clientName",
                1,
                "form-label",
              ],
              [
                "type",
                "text",
                "id",
                "nameClient",
                "name",
                "nameClient",
                "required",
                "true",
                1,
                "form-control",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "for",
                "dateTime",
                "translate",
                "bookingEdit.labels.dateTime",
                1,
                "form-label",
              ],
              [
                "type",
                "datetime-local",
                "id",
                "dateTime",
                "name",
                "dateTime",
                1,
                "form-control",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "for",
                "numberOfPeople",
                "translate",
                "bookingEdit.labels.numberOfPeople",
                1,
                "form-label",
              ],
              [
                "type",
                "number",
                "id",
                "numberOfPeople",
                "name",
                "numberOfPeople",
                1,
                "form-control",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "for",
                "phoneNumber",
                "translate",
                "bookingEdit.labels.phoneNumber",
                1,
                "form-label",
              ],
              [
                "type",
                "tel",
                "id",
                "phoneNumber",
                "name",
                "phoneNumber",
                1,
                "form-control",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [
                "for",
                "email",
                "translate",
                "bookingEdit.labels.email",
                1,
                "form-label",
              ],
              [
                "type",
                "email",
                "id",
                "email",
                "name",
                "email",
                1,
                "form-control",
                3,
                "ngModel",
                "ngModelChange",
              ],
              [1, "text-center"],
              [
                "type",
                "submit",
                "translate",
                "bookingEdit.buttons.save",
                1,
                "btn",
                "btn-warning",
                "btn-sm",
                "me-3",
              ],
              [
                "translate",
                "bookingEdit.buttons.back",
                1,
                "btn",
                "btn-danger",
                "btn-sm",
                3,
                "routerLink",
              ],
            ],
            template: function (r, o) {
              1 & r &&
                (M(0, "div", 0)(1, "div", 1),
                P(2, "h3", 2),
                O(),
                P(3, "div", 3),
                M(4, "form", 4),
                de("ngSubmit", function () {
                  return o.onSubmit();
                }),
                M(5, "div", 5),
                P(6, "label", 6),
                M(7, "input", 7),
                de("ngModelChange", function (s) {
                  return (o.booking.nameClient = s);
                }),
                O()(),
                M(8, "div", 5),
                P(9, "label", 8),
                M(10, "input", 9),
                de("ngModelChange", function (s) {
                  return (o.booking.dateTime = s);
                }),
                O()(),
                M(11, "div", 5),
                P(12, "label", 10),
                M(13, "input", 11),
                de("ngModelChange", function (s) {
                  return (o.booking.numberOfPeople = s);
                }),
                O()(),
                M(14, "div", 5),
                P(15, "label", 12),
                M(16, "input", 13),
                de("ngModelChange", function (s) {
                  return (o.booking.phoneNumber = s);
                }),
                O()(),
                M(17, "div", 5),
                P(18, "label", 14),
                M(19, "input", 15),
                de("ngModelChange", function (s) {
                  return (o.booking.email = s);
                }),
                O()(),
                M(20, "div", 16),
                P(21, "button", 17)(22, "a", 18),
                O()()()),
                2 & r &&
                  (oe(7),
                  rt("ngModel", o.booking.nameClient),
                  oe(3),
                  rt("ngModel", o.booking.dateTime),
                  oe(3),
                  rt("ngModel", o.booking.numberOfPeople),
                  oe(3),
                  rt("ngModel", o.booking.phoneNumber),
                  oe(3),
                  rt("ngModel", o.booking.email),
                  oe(3),
                  rt("routerLink", cd(6, Vk)));
            },
            dependencies: [Go, vh, ms, ql, sh, ah, bs, Wl, ws, qo],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function jk(e, n) {
        if ((1 & e && (M(0, "div", 20), ge(1), O()), 2 & e)) {
          const t = Ta();
          oe(1), Bn(" ", t.errorMessage, " ");
        }
      }
      const $k = function () {
          return ["/booking-list"];
        },
        Hk = [
          { path: "home", component: LP },
          { path: "booking-list", component: NP },
          {
            path: "booking-add",
            component: (() => {
              class e {
                constructor(t, r) {
                  (this.bookingService = t),
                    (this.router = r),
                    (this.booking = new dw()),
                    (this.errorMessage = null);
                }
                onSubmit() {
                  this.saveBooking();
                }
                saveBooking() {
                  this.bookingService.addBooking(this.booking).subscribe({
                    next: () => {
                      this.goToBookingList();
                    },
                    error: (t) => {
                      console.log(t),
                        (this.errorMessage =
                          "Ya existe una reserva activa con este n\xfamero de tel\xe9fono.");
                    },
                  });
                }
                goToBookingList() {
                  this.router.navigate(["/home"]);
                }
                static #e = (this.ɵfac = function (r) {
                  return new (r || e)(C(Yf), C(it));
                });
                static #t = (this.ɵcmp = It({
                  type: e,
                  selectors: [["app-booking-add"]],
                  decls: 24,
                  vars: 8,
                  consts: [
                    [1, "container", "my-5"],
                    [1, "container", "text-center", 2, "margin", "30px"],
                    ["translate", "addBooking.title"],
                    ["translate", "addBooking.info", 1, "alert", "alert-info"],
                    [3, "ngSubmit"],
                    [1, "mb-3"],
                    [
                      "for",
                      "nameClient",
                      "translate",
                      "addBooking.labels.clientName",
                      1,
                      "form-label",
                    ],
                    [
                      "type",
                      "text",
                      "id",
                      "nameClient",
                      "name",
                      "nameClient",
                      "required",
                      "",
                      1,
                      "form-control",
                      3,
                      "ngModel",
                      "ngModelChange",
                    ],
                    [
                      "for",
                      "dateTime",
                      "translate",
                      "addBooking.labels.dateTime",
                      1,
                      "form-label",
                    ],
                    [
                      "type",
                      "datetime-local",
                      "id",
                      "dateTime",
                      "name",
                      "dateTime",
                      "required",
                      "",
                      1,
                      "form-control",
                      3,
                      "ngModel",
                      "ngModelChange",
                    ],
                    [
                      "for",
                      "numberOfPeople",
                      "translate",
                      "addBooking.labels.numberOfPeople",
                      1,
                      "form-label",
                    ],
                    [
                      "type",
                      "number",
                      "id",
                      "numberOfPeople",
                      "name",
                      "numberOfPeople",
                      "required",
                      "",
                      1,
                      "form-control",
                      3,
                      "ngModel",
                      "ngModelChange",
                    ],
                    [
                      "for",
                      "phoneNumber",
                      "translate",
                      "addBooking.labels.phoneNumber",
                      1,
                      "form-label",
                    ],
                    [
                      "type",
                      "text",
                      "id",
                      "phoneNumber",
                      "name",
                      "phoneNumber",
                      1,
                      "form-control",
                      3,
                      "ngModel",
                      "ngModelChange",
                    ],
                    [
                      "for",
                      "email",
                      "translate",
                      "addBooking.labels.email",
                      1,
                      "form-label",
                    ],
                    [
                      "type",
                      "email",
                      "id",
                      "email",
                      "name",
                      "email",
                      "required",
                      "",
                      1,
                      "form-control",
                      3,
                      "ngModel",
                      "ngModelChange",
                    ],
                    ["class", "alert alert-danger", 4, "ngIf"],
                    [1, "text-center"],
                    [
                      "type",
                      "submit",
                      "translate",
                      "addBooking.buttons.saveBooking",
                      1,
                      "btn",
                      "btn-success",
                      "btn-sm",
                      "me-3",
                    ],
                    [
                      "translate",
                      "addBooking.buttons.cancel",
                      1,
                      "btn",
                      "btn-danger",
                      "btn-sm",
                      3,
                      "routerLink",
                    ],
                    [1, "alert", "alert-danger"],
                  ],
                  template: function (r, o) {
                    1 & r &&
                      (M(0, "div", 0)(1, "div", 1),
                      P(2, "h3", 2),
                      O(),
                      P(3, "div", 3),
                      M(4, "form", 4),
                      de("ngSubmit", function () {
                        return o.onSubmit();
                      }),
                      M(5, "div", 5),
                      P(6, "label", 6),
                      M(7, "input", 7),
                      de("ngModelChange", function (s) {
                        return (o.booking.nameClient = s);
                      }),
                      O()(),
                      M(8, "div", 5),
                      P(9, "label", 8),
                      M(10, "input", 9),
                      de("ngModelChange", function (s) {
                        return (o.booking.dateTime = s);
                      }),
                      O()(),
                      M(11, "div", 5),
                      P(12, "label", 10),
                      M(13, "input", 11),
                      de("ngModelChange", function (s) {
                        return (o.booking.numberOfPeople = s);
                      }),
                      O()(),
                      M(14, "div", 5),
                      P(15, "label", 12),
                      M(16, "input", 13),
                      de("ngModelChange", function (s) {
                        return (o.booking.phoneNumber = s);
                      }),
                      O()(),
                      M(17, "div", 5),
                      P(18, "label", 14),
                      M(19, "input", 15),
                      de("ngModelChange", function (s) {
                        return (o.booking.email = s);
                      }),
                      O()(),
                      Wc(20, jk, 2, 1, "div", 16),
                      M(21, "div", 17),
                      P(22, "button", 18)(23, "a", 19),
                      O()()()),
                      2 & r &&
                        (oe(7),
                        rt("ngModel", o.booking.nameClient),
                        oe(3),
                        rt("ngModel", o.booking.dateTime),
                        oe(3),
                        rt("ngModel", o.booking.numberOfPeople),
                        oe(3),
                        rt("ngModel", o.booking.phoneNumber),
                        oe(3),
                        rt("ngModel", o.booking.email),
                        oe(1),
                        rt("ngIf", o.errorMessage),
                        oe(3),
                        rt("routerLink", cd(7, $k)));
                  },
                  dependencies: [YD, Go, vh, ms, ql, sh, ah, bs, Wl, ws, qo],
                  encapsulation: 2,
                }));
              }
              return e;
            })(),
          },
          { path: "", redirectTo: "home", pathMatch: "full" },
          { path: "booking-edit/:id", component: Bk },
        ];
      let Uk = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = At({ type: e }));
            static #n = (this.ɵinj = mt({ imports: [ew.forRoot(Hk), ew] }));
          }
          return e;
        })(),
        zk = (() => {
          class e {
            constructor(t) {
              this.translate = t;
              const r = localStorage.getItem("selectedLanguage");
              t.setDefaultLang(r || "es");
            }
            useLanguage(t) {
              this.translate.use(t),
                localStorage.setItem("selectedLanguage", t);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(kr));
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-navbar"]],
              decls: 43,
              vars: 24,
              consts: [
                [1, "navbar", "navbar-expand-lg", "bg-body-tertiary", "d-flex"],
                [1, "container-fluid"],
                [
                  "href",
                  "#",
                  1,
                  "navbar-brand",
                  "justify-content-center",
                  "d-flex",
                  "align-items-center",
                ],
                [
                  "src",
                  "../assets/img/logoappbooking.webp",
                  "alt",
                  "Logo",
                  1,
                  "d-inline-block",
                  "align-text-top",
                  "rounded-circle",
                  "me-2",
                  2,
                  "height",
                  "3rem",
                ],
                [
                  "type",
                  "button",
                  "data-bs-toggle",
                  "collapse",
                  "data-bs-target",
                  "#navbarNavDropdown",
                  "aria-controls",
                  "navbarNavDropdown",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                ],
                [1, "navbar-toggler-icon"],
                ["id", "navbarNavDropdown", 1, "collapse", "navbar-collapse"],
                [1, "navbar-nav"],
                [1, "nav-item"],
                [
                  "routerLink",
                  "/home",
                  "routerLinkActive",
                  "active",
                  1,
                  "nav-link",
                ],
                [
                  "routerLink",
                  "/booking-list",
                  "routerLinkActive",
                  "active",
                  1,
                  "nav-link",
                ],
                [
                  "routerLink",
                  "booking-add",
                  "routerLinkActive",
                  "active",
                  1,
                  "nav-link",
                ],
                [1, "nav-item", "dropdown"],
                [
                  "href",
                  "#",
                  "id",
                  "languageDropdown",
                  "role",
                  "button",
                  "data-bs-toggle",
                  "dropdown",
                  "aria-expanded",
                  "false",
                  1,
                  "nav-link",
                  "dropdown-toggle",
                ],
                [1, "fa", "fa-globe"],
                [
                  "aria-labelledby",
                  "languageDropdown",
                  1,
                  "dropdown-menu",
                  "dropdown-menu-end",
                ],
                [
                  "href",
                  "#",
                  1,
                  "dropdown-item",
                  "d-flex",
                  "align-items-center",
                  3,
                  "click",
                ],
                [
                  "src",
                  "../assets/img/en.webp",
                  "alt",
                  "English",
                  "width",
                  "20",
                  "height",
                  "15",
                  1,
                  "me-2",
                ],
                [
                  "src",
                  "../assets/img/es.webp",
                  "alt",
                  "Spanish",
                  "width",
                  "20",
                  "height",
                  "15",
                  1,
                  "me-2",
                ],
                [
                  "src",
                  "../assets/img/de.webp",
                  "alt",
                  "Deutsch",
                  "width",
                  "20",
                  "height",
                  "15",
                  1,
                  "me-2",
                ],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "nav", 0)(1, "div", 1)(2, "a", 2),
                  P(3, "img", 3),
                  ge(4),
                  _n(5, "translate"),
                  O(),
                  M(6, "button", 4),
                  P(7, "span", 5),
                  O(),
                  M(8, "div", 6)(9, "ul", 7)(10, "li", 8)(11, "a", 9),
                  ge(12),
                  _n(13, "translate"),
                  O()(),
                  M(14, "li", 8)(15, "a", 10),
                  ge(16),
                  _n(17, "translate"),
                  O()(),
                  M(18, "li", 8)(19, "a", 11),
                  ge(20),
                  _n(21, "translate"),
                  O()(),
                  M(22, "li", 12)(23, "a", 13),
                  ge(24),
                  _n(25, "translate"),
                  P(26, "i", 14),
                  O(),
                  M(27, "ul", 15)(28, "li")(29, "a", 16),
                  de("click", function (s) {
                    return o.useLanguage("en"), s.preventDefault();
                  }),
                  P(30, "img", 17),
                  ge(31),
                  _n(32, "translate"),
                  O()(),
                  M(33, "li")(34, "a", 16),
                  de("click", function (s) {
                    return o.useLanguage("es"), s.preventDefault();
                  }),
                  P(35, "img", 18),
                  ge(36),
                  _n(37, "translate"),
                  O()(),
                  M(38, "li")(39, "a", 16),
                  de("click", function (s) {
                    return o.useLanguage("de"), s.preventDefault();
                  }),
                  P(40, "img", 19),
                  ge(41),
                  _n(42, "translate"),
                  O()()()()()()()()),
                  2 & r &&
                    (oe(4),
                    Bn(" ", jn(5, 8, "nav.brand"), " "),
                    oe(8),
                    Ut(jn(13, 10, "nav.home")),
                    oe(4),
                    Ut(jn(17, 12, "nav.bookingList")),
                    oe(4),
                    Ut(jn(21, 14, "nav.bookingAdd")),
                    oe(4),
                    Bn(" ", jn(25, 16, "nav.language"), " "),
                    oe(7),
                    Bn(" ", jn(32, 18, "nav.english"), " "),
                    oe(5),
                    Bn(" ", jn(37, 20, "nav.spanish"), " "),
                    oe(5),
                    Bn(" ", jn(42, 22, "nav.spanish"), " "));
              },
              dependencies: [Go, WC, TP],
              encapsulation: 2,
            }));
          }
          return e;
        })(),
        Gk = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-footer"]],
              decls: 8,
              vars: 0,
              consts: [
                [1, "bg-dark", "text-white", "py-4", "mb-0", "mt-5"],
                [1, "container", "text-center"],
                [
                  "href",
                  "https://www.linkedin.com/in/limber-martinez-developer/",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "text-white",
                  "mx-2",
                ],
                [1, "fab", "fa-linkedin", "fa-2x"],
                [
                  "href",
                  "https://github.com/limbpuma/BookingAppFrontend",
                  "target",
                  "_blank",
                  "rel",
                  "noopener",
                  1,
                  "text-white",
                  "mx-2",
                ],
                [1, "fab", "fa-github", "fa-2x"],
              ],
              template: function (r, o) {
                1 & r &&
                  (M(0, "footer", 0)(1, "div", 1)(2, "p"),
                  ge(3, "\xa9 2023 - Limber Martinez Jr Developer"),
                  O(),
                  M(4, "a", 2),
                  P(5, "i", 3),
                  O(),
                  M(6, "a", 4),
                  P(7, "i", 5),
                  O()()());
              },
              styles: [
                "footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}",
              ],
            }));
          }
          return e;
        })(),
        Wk = (() => {
          class e {
            constructor() {
              this.title = "restaurant-app";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = It({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              template: function (r, o) {
                1 & r &&
                  P(0, "app-navbar")(1, "router-outlet")(2, "app-footer");
              },
              dependencies: [Lf, zk, Gk],
              encapsulation: 2,
            }));
          }
          return e;
        })();
      class qk {
        constructor(n, t = "/assets/i18n/", r = ".json") {
          (this.http = n), (this.prefix = t), (this.suffix = r);
        }
        getTranslation(n) {
          return this.http.get(`${this.prefix}${n}${this.suffix}`);
        }
      }
      let Kk = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = At({ type: e, bootstrap: [Wk] }));
          static #n = (this.ɵinj = mt({
            imports: [
              vN,
              KN,
              Uk,
              kk,
              Lk,
              xP.forRoot({
                loader: { provide: ps, useFactory: Zk, deps: [vf] },
              }),
            ],
          }));
        }
        return e;
      })();
      function Zk(e) {
        return new qk(e, "./assets/i18n/", ".json");
      }
      yN()
        .bootstrapModule(Kk)
        .catch((e) => console.error(e));
    },
    321: () => {
      const ne = ":";
      class Oe extends Error {
        constructor(g) {
          super(`No translation found for ${Ur(g)}.`),
            (this.parsedMessage = g),
            (this.type = "MissingTranslationError");
        }
      }
      const Ps = function (m, ...g) {
          if (Ps.translate) {
            const w = Ps.translate(m, g);
            (m = w[0]), (g = w[1]);
          }
          let v = ou(m[0], m.raw[0]);
          for (let w = 1; w < m.length; w++) v += g[w - 1] + ou(m[w], m.raw[w]);
          return v;
        },
        Ah = ":";
      function ou(m, g) {
        return g.charAt(0) === Ah
          ? m.substring(
              (function ei(m, g) {
                for (let v = 1, w = 1; v < m.length; v++, w++)
                  if ("\\" === g[w]) w++;
                  else if (m[v] === ne) return v;
                throw new Error(
                  `Unterminated $localize metadata block in "${g}".`
                );
              })(m, g) + 1
            )
          : m;
      }
      (() =>
        (typeof globalThis < "u" && globalThis) ||
        (typeof global < "u" && global) ||
        (typeof window < "u" && window) ||
        (typeof self < "u" &&
          typeof WorkerGlobalScope < "u" &&
          self instanceof WorkerGlobalScope &&
          self))().$localize = Ps;
    },
  },
  (ne) => {
    var Qn = (vr) => ne((ne.s = vr));
    Qn(321), Qn(691);
  },
]);
