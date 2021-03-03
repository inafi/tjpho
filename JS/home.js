! function () {
    function t(t) {
        t || (t = Math.random), this.p = new Uint8Array(256), this.perm = new Uint8Array(512), this.permMod12 = new Uint8Array(512);
        for (var e = 0; e < 256; e++) this.p[e] = 256 * t();
        for (e = 0; e < 512; e++) this.perm[e] = this.p[255 & e], this.permMod12[e] = this.perm[e] % 12
    }
    var e = .5 * (Math.sqrt(3) - 1),
        n = (3 - Math.sqrt(3)) / 6,
        r = 1 / 6,
        i = (Math.sqrt(5) - 1) / 4,
        o = (5 - Math.sqrt(5)) / 20;
    t.prototype = {
        grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
        grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
        noise2D: function (t, r) {
            var i, o, a, s, u, h = this.permMod12,
                c = this.perm,
                f = this.grad3,
                l = (t + r) * e,
                d = Math.floor(t + l),
                p = Math.floor(r + l),
                m = (d + p) * n,
                v = t - (d - m),
                y = r - (p - m);
            v > y ? (s = 1, u = 0) : (s = 0, u = 1);
            var b = v - s + n,
                w = y - u + n,
                g = v - 1 + 2 * n,
                M = y - 1 + 2 * n,
                x = 255 & d,
                j = 255 & p,
                C = .5 - v * v - y * y;
            if (C < 0) i = 0;
            else {
                var q = 3 * h[x + c[j]];
                i = (C *= C) * C * (f[q] * v + f[q + 1] * y)
            }
            var S = .5 - b * b - w * w;
            if (S < 0) o = 0;
            else {
                var E = 3 * h[x + s + c[j + u]];
                o = (S *= S) * S * (f[E] * b + f[E + 1] * w)
            }
            var k = .5 - g * g - M * M;
            if (k < 0) a = 0;
            else {
                var O = 3 * h[x + 1 + c[j + 1]];
                a = (k *= k) * k * (f[O] * g + f[O + 1] * M)
            }
            return 70 * (i + o + a)
        },
        noise3D: function (t, e, n) {
            var i, o, a, s, u, h, c, f, l, d, p = this.permMod12,
                m = this.perm,
                v = this.grad3,
                y = (t + e + n) * (1 / 3),
                b = Math.floor(t + y),
                w = Math.floor(e + y),
                g = Math.floor(n + y),
                M = (b + w + g) * r,
                x = t - (b - M),
                j = e - (w - M),
                C = n - (g - M);
            x < j ? j < C ? (u = 0, h = 0, c = 1, f = 0, l = 1, d = 1) : x < C ? (u = 0, h = 1, c = 0, f = 0, l = 1, d = 1) : (u = 0, h = 1, c = 0, f = 1, l = 1, d = 0) : j < C ? x < C ? (u = 0, h = 0, c = 1, f = 1, l = 0, d = 1) : (u = 1, h = 0, c = 0, f = 1, l = 0, d = 1) : (u = 1, h = 0, c = 0, f = 1, l = 1, d = 0);
            var q = x - u + r,
                S = j - h + r,
                E = C - c + r,
                k = x - f + 2 * r,
                O = j - l + 2 * r,
                R = C - d + 2 * r,
                A = x - 1 + .5,
                D = j - 1 + .5,
                L = C - 1 + .5,
                T = 255 & b,
                P = 255 & w,
                X = 255 & g,
                B = .6 - x * x - j * j - C * C;
            if (B < 0) i = 0;
            else {
                var F = 3 * p[T + m[P + m[X]]];
                i = (B *= B) * B * (v[F] * x + v[F + 1] * j + v[F + 2] * C)
            }
            var I = .6 - q * q - S * S - E * E;
            if (I < 0) o = 0;
            else {
                var N = 3 * p[T + u + m[P + h + m[X + c]]];
                o = (I *= I) * I * (v[N] * q + v[N + 1] * S + v[N + 2] * E)
            }
            var H = .6 - k * k - O * O - R * R;
            if (H < 0) a = 0;
            else {
                var U = 3 * p[T + f + m[P + l + m[X + d]]];
                a = (H *= H) * H * (v[U] * k + v[U + 1] * O + v[U + 2] * R)
            }
            var Y = .6 - A * A - D * D - L * L;
            if (Y < 0) s = 0;
            else {
                var $ = 3 * p[T + 1 + m[P + 1 + m[X + 1]]];
                s = (Y *= Y) * Y * (v[$] * A + v[$ + 1] * D + v[$ + 2] * L)
            }
            return 32 * (i + o + a + s)
        },
        noise4D: function (t, e, n, r) {
            this.permMod12;
            var a, s, u, h, c, f, l, d, p, m, v, y, b, w, g, M, x, j = this.perm,
                C = this.grad4,
                q = (t + e + n + r) * i,
                S = Math.floor(t + q),
                E = Math.floor(e + q),
                k = Math.floor(n + q),
                O = Math.floor(r + q),
                R = (S + E + k + O) * o,
                A = t - (S - R),
                D = e - (E - R),
                L = n - (k - R),
                T = r - (O - R),
                P = 0,
                X = 0,
                B = 0,
                F = 0;
            A > D ? P++ : X++, A > L ? P++ : B++, A > T ? P++ : F++, D > L ? X++ : B++, D > T ? X++ : F++, L > T ? B++ : F++;
            var I = A - (f = P < 3 ? 0 : 1) + o,
                N = D - (l = X < 3 ? 0 : 1) + o,
                H = L - (d = B < 3 ? 0 : 1) + o,
                U = T - (p = F < 3 ? 0 : 1) + o,
                Y = A - (m = P < 2 ? 0 : 1) + 2 * o,
                $ = D - (v = X < 2 ? 0 : 1) + 2 * o,
                z = L - (y = B < 2 ? 0 : 1) + 2 * o,
                G = T - (b = F < 2 ? 0 : 1) + 2 * o,
                W = A - (w = P < 1 ? 0 : 1) + 3 * o,
                _ = D - (g = X < 1 ? 0 : 1) + 3 * o,
                J = L - (M = B < 1 ? 0 : 1) + 3 * o,
                K = T - (x = F < 1 ? 0 : 1) + 3 * o,
                Q = A - 1 + 4 * o,
                V = D - 1 + 4 * o,
                Z = L - 1 + 4 * o,
                tt = T - 1 + 4 * o,
                et = 255 & S,
                nt = 255 & E,
                rt = 255 & k,
                it = 255 & O,
                ot = .6 - A * A - D * D - L * L - T * T;
            if (ot < 0) a = 0;
            else {
                var at = j[et + j[nt + j[rt + j[it]]]] % 32 * 4;
                a = (ot *= ot) * ot * (C[at] * A + C[at + 1] * D + C[at + 2] * L + C[at + 3] * T)
            }
            var st = .6 - I * I - N * N - H * H - U * U;
            if (st < 0) s = 0;
            else {
                var ut = j[et + f + j[nt + l + j[rt + d + j[it + p]]]] % 32 * 4;
                s = (st *= st) * st * (C[ut] * I + C[ut + 1] * N + C[ut + 2] * H + C[ut + 3] * U)
            }
            var ht = .6 - Y * Y - $ * $ - z * z - G * G;
            if (ht < 0) u = 0;
            else {
                var ct = j[et + m + j[nt + v + j[rt + y + j[it + b]]]] % 32 * 4;
                u = (ht *= ht) * ht * (C[ct] * Y + C[ct + 1] * $ + C[ct + 2] * z + C[ct + 3] * G)
            }
            var ft = .6 - W * W - _ * _ - J * J - K * K;
            if (ft < 0) h = 0;
            else {
                var lt = j[et + w + j[nt + g + j[rt + M + j[it + x]]]] % 32 * 4;
                h = (ft *= ft) * ft * (C[lt] * W + C[lt + 1] * _ + C[lt + 2] * J + C[lt + 3] * K)
            }
            var dt = .6 - Q * Q - V * V - Z * Z - tt * tt;
            if (dt < 0) c = 0;
            else {
                var pt = j[et + 1 + j[nt + 1 + j[rt + 1 + j[it + 1]]]] % 32 * 4;
                c = (dt *= dt) * dt * (C[pt] * Q + C[pt + 1] * V + C[pt + 2] * Z + C[pt + 3] * tt)
            }
            return 27 * (a + s + u + h + c)
        }
    }, "undefined" != typeof define && define.amd ? define(function () {
        return t
    }) : "undefined" != typeof window && (window.SimplexNoise = t), "undefined" != typeof exports && (exports.SimplexNoise = t), "undefined" != typeof module && (module.exports = t)
}(),
function (t, e, n) {
    try {
        return module.exports = n()
    } catch (t) {}
    try {
        return define(n)
    } catch (t) {}
    try {
        t.util = n()
    } catch (t) {}
}(this, 0, function () {
    "use strict";
    return {
        each: function (t, e) {
            if ("[object Array]" === Object.prototype.toString.call(t))
                for (var n = 0, r = t.length; n < r; n++) e(t[n], n, t);
            else
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e(t[n], n, t)
        },
        extend: function () {
            for (var t, e, n = 1, r = arguments, i = r[0]; t = r[n++];)
                for (e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
            return i
        },
        inherits: function (t, e) {
            return t.prototype = new e, t.prototype.constructor = t, t._super_ = e.prototype, t
        },
        format: function (t, e) {
            var n = "object" == typeof e ? e : arguments;
            return t.replace(/{(.*?)}/g, function (t, e) {
                return void 0 !== n[e] ? n[e] : t
            })
        },
        rand: {
            float: function (t, e) {
                return Math.random() * (e - t) + t
            },
            int: function (t, e) {
                return Math.random() * (e - t + 1) + t | 0
            },
            item: function (t) {
                return t[Math.random() * t.length | 0]
            },
            hash: function (t) {
                for (var e, n = "", r = t || 1; r--;) n += (e = 62 * Math.random() | 0) < 10 ? e : String.fromCharCode(e + (e < 36 ? 87 : 29));
                return n
            }
        },
        math: {
            clamp: function (t, e, n) {
                return t < e ? e : t > n ? n : t
            },
            mod: function (t, e, n) {
                return (t -= e) % (n - e) + (t < 0 ? n : e)
            },
            map: function (t, e, n, r, i) {
                return (t - e) * (i - r) / (n - e) + r
            },
            lerp: function (t, e, n) {
                return e + t * (n - e)
            },
            angle: function (t, e, n) {
                return 2 * (t = (t < e ? e - t : t - e) % n) > n ? n - t : t
            }
        },
        str: {
            pad: function (t, e, n) {
                var r = String(t),
                    i = Math.max(0, Math.abs(e) - r.length),
                    o = new Array(++i).join(null != n ? n : " ");
                return e < 0 ? r + o : o + r
            }
        },
        array: {
            cross: function (t, e) {
                var n, r, i = t.length;
                for (n = 0; n < i; n++)
                    for (r = n + 1; r < i;) e(t[n], t[r], n, r++);
                return t
            }
        },
        fn: {
            wrap: function (t, e) {
                return function () {
                    return e.call(this, arguments, t)
                }
            },
            log: function (t, e) {
                return function () {
                    return e.call(this, arguments, t), t.apply(this, arguments)
                }
            }
        },
        color: {
            rgba: function (t) {
                return "object" != typeof t && (t = arguments), "rgba(" + (255 * t[0] + .5 | 0) + "," + (255 * t[1] + .5 | 0) + "," + (255 * t[2] + .5 | 0) + "," + (null != t[3] ? t[3] : 1).toFixed(3) + ")"
            },
            hsla: function (t) {
                return "object" != typeof t && (t = arguments), "hsla(" + (360 * t[0] + .5 | 0) + "," + (100 * t[1] + .5 | 0) + "%," + (100 * t[2] + .5 | 0) + "%," + (null != t[3] ? t[3] : 1).toFixed(3) + ")"
            }
        },
        gradient: function (t, e) {
            var n, r, i, o, a, s = e;
            for (o = 0; i = t[o++];) s - i[0] >= 0 && (!n || s - i[0] < s - n[0]) && (n = i), s - i[0] <= 0 && (!r || s - i[0] > s - r[0]) && (r = i);
            for (s = (s - n[0]) / (r[0] - n[0]) || 0, i = [], o = 0, a = n[1].length; o < a;) i[o] = n[1][o] + (r[1][o] - n[1][o++]) * s;
            return i
        },
        loop: function (t, e) {
            var n = Date.now(),
                r = n,
                i = n,
                o = 0,
                a = function () {
                    !t(o++, (n = Date.now()) - r, n - i, i = n) && s()
                },
                s = null == e ? requestAnimationFrame.bind(null, a) : setTimeout.bind(null, a, e);
            return a()
        },
        perf: function (t) {
            for (var e, n, r, i = 1, o = []; n = arguments[i++];) {
                for (e = Date.now(), r = 0; r < t; n(r++));
                o.push((Date.now() - e) / 1e3)
            }
            return o
        },
        fps: (e = [], function (t) {
            return n = e.push(Date.now()) - 1, r = n / (e[n] - e[0]) * 1e3 || 0, n > r && e.splice(0, ++n - r | 0), t ? r + .5 | 0 : r
        }),
        bind: (t = function (t, e, n, r) {
            for (var i, o, a = [].concat(t), s = [].concat(e), u = [].concat(n), h = 0; a[h]; h++)
                for (o = 0; s[o]; o++)
                    for (i = 0; u[i]; i++) a[h][this + "EventListener"](s[o], u[i], r)
        }, {
            on: t.bind("add"),
            off: t.bind("remove")
        }),
        ajax: function (t) {
            return {
                get: t.bind(0),
                post: t.bind(1)
            }
        }(function (t, e, n, r) {
            var i, o = "",
                a = new XMLHttpRequest;
            for (i in e) e.hasOwnProperty(i) && (o += "&" + [i, e[i]].map(encodeURIComponent).join("="));
            return o && !this && (t += ~t.indexOf("?") ? o : o.replace("&", "?")), a.open(this ? "POST" : "GET", t, !0), a.timeout = r ? 1e3 * r : 0, a.onreadystatechange = function () {
                4 === this.readyState && n(this.response, this)
            }, t.match(/^(https?:)?\/\//i) || (a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest")), a.send(this && o ? o.substr(1) : null), a
        }),
        load: {
            docs: function (t, e, n) {
                var r, i, o = 0,
                    a = function () {
                        4 === this.readyState && (t[t.indexOf(this)] = this.response, o++, n && n(o, t.length), o === t.length && e(t))
                    };
                for (n && n(0, t.length), i = 0; i < t.length; i++)(r = new XMLHttpRequest).onreadystatechange = a, r.open("GET", t[i], !0), r.send(null), t[i] = r;
                return t
            },
            imgs: function (t, e, n) {
                var r, i, o = 0,
                    a = function () {
                        o++, n && n(o, t.length), o === t.length && e(t)
                    };
                for (n && n(0, t.length), i = 0; i < t.length; i++)(r = new Image).onload = a, r.src = t[i], t[i] = r;
                return t
            }
        },
        select: function (t, e) {
            if (!(t = /(^[.#]?)([\w-]+$)/.exec(t))) return (e || document).querySelectorAll(t);
            switch (t[1]) {
                case "#":
                    return (e || document).getElementById(t[2]);
                case ".":
                    return (e || document).getElementsByClassName(t[2]);
                default:
                    return (e || document).getElementsByTagName(t[2])
            }
        },
        tag: function (t, e, n, r) {
            var i, o = t,
                a = e,
                s = o || "";
            if (null != o && null != o.nodeType || (o = document.createElement(String(s.match(/^[^#.]+/) || "div")), (i = s.match(/#([^#.]+)/)) && (o.id = i[1]), (i = s.match(/\.[^#.]+/g)) && (o.className = i.join(" ").replace(/\./g, ""))), null != a)
                if (null != a.nodeType) o.appendChild(a);
                else if ("object" != typeof a) o.textContent = a;
            else if (a[s = 0])
                for (; a[s];) o.appendChild(a[s++]);
            else
                for (s in a) a.hasOwnProperty(s) && (o[s] = a[s]);
            return n && (r ? n.insertBefore(o, n.firstChild) : n.appendChild(o)), o
        },
        breadcrump: function (t, e, n, r, i) {
            e = (e = decodeURI(e || location.href)).match(/[^?#]+/)[0].split("/"), n = /^[\d.]+$/.test(e[2]) ? 0 : n;
            for (var o, a, s = e[2].split("."); s.length;)(o = document.createElement("a")).href = e[0] + "//" + s.join(".") + "/", o.textContent = n && s.length > n && "www" !== s[0] ? s.splice(0, 1) + "." : s.splice(0).join("."), t.appendChild(o);
            for (a = 3; e[a]; a++) t.appendChild(document.createTextNode(i || " › ")), "href" in (o = document.createElement(e[a + 1] || r ? "a" : "span")) && (o.href = encodeURI(e.slice(0, a + 1).join("/"))), "href" in o && null != e[a + 1] && (o.href += "/"), o.textContent = e[a], t.appendChild(o);
            return t
        },
        form: function (t) {
            var e, n, r = {},
                i = t.querySelectorAll("*");
            for (e = 0; n = i[e]; e++)
                if (n.name) switch (n.type) {
                    case "radio":
                        n.checked && (r[n.name] = n.value);
                        break;
                    case "checkbox":
                        r[n.name] = n.checked ? 1 : 0;
                        break;
                    default:
                        r[n.name] = n.value
                }
            return r
        },
        favicon: function (t) {
            var e = document.head.querySelector("link[rel*=icon]");
            e && document.head.removeChild(e), (e = document.createElement("link")).rel = "shortcut icon", e.href = t, document.head.appendChild(e)
        }
    };
    var t, e, n, r
}),
function (t, e, n) {
    try {
        return module.exports = n()
    } catch (t) {}
    try {
        return define(n)
    } catch (t) {}
    try {
        t.vec4 = n()
    } catch (t) {}
}(this, 0, function () {
    "use strict";
    var t = {};
    return t.array = Float32Array || Array, t.buffer = new t.array(4), t.get = function (e, n, r, i) {
        return t.set(new t.array(4), e, n, r, i)
    }, t.set = function (e, n, r, i, o) {
        return e || (e = new t.array(4)), "object" == typeof n ? (e[0] = -1 / 0 < n[0] && n[0] < 1 / 0 ? n[0] : 0, e[1] = -1 / 0 < n[1] && n[1] < 1 / 0 ? n[1] : 0, e[2] = -1 / 0 < n[2] && n[2] < 1 / 0 ? n[2] : 0, e[3] = -1 / 0 < n[3] && n[3] < 1 / 0 ? n[3] : 1) : (e[0] = -1 / 0 < n && n < 1 / 0 ? n : 0, e[1] = -1 / 0 < r && r < 1 / 0 ? r : 0, e[2] = -1 / 0 < i && i < 1 / 0 ? i : 0, e[3] = -1 / 0 < o && o < 1 / 0 ? o : 1), e
    }, t.equals = function (t, e) {
        return t === e || ("object" == typeof e ? t[0] === e[0] && t[1] === e[1] && t[2] === e[2] : t[0] === e && t[1] === e && t[2] === e)
    }, t.add = function (e, n, r) {
        return r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] + n[0], r[1] = e[1] + n[1], r[2] = e[2] + n[2]) : (r[0] = e[0] + n, r[1] = e[1] + n, r[2] = e[2] + n), r[3] = e[3], r
    }, t.sub = function (e, n, r) {
        return r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] - n[0], r[1] = e[1] - n[1], r[2] = e[2] - n[2]) : (r[0] = e[0] - n, r[1] = e[1] - n, r[2] = e[2] - n), r[3] = e[3], r
    }, t.mul = function (e, n, r) {
        return r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] * n[0], r[1] = e[1] * n[1], r[2] = e[2] * n[2]) : (r[0] = e[0] * n, r[1] = e[1] * n, r[2] = e[2] * n), r[3] = e[3], r
    }, t.div = function (e, n, r) {
        return r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] / n[0], r[1] = e[1] / n[1], r[2] = e[2] / n[2]) : (r[0] = e[0] / n, r[1] = e[1] / n, r[2] = e[2] / n), r[3] = e[3], r
    }, t.mod = function (e, n, r) {
        return r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] % n[0], r[1] = e[1] % n[1], r[2] = e[2] % n[2]) : (r[0] = e[0] % n, r[1] = e[1] % n, r[2] = e[2] % n), r[3] = e[3], r
    }, t.min = function (e, n, r) {
        return void 0 === n ? Math.min(e[0], e[1], e[2]) : (r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] < n[0] ? n[0] : e[0], r[1] = e[1] < n[1] ? n[1] : e[1], r[2] = e[2] < n[2] ? n[2] : e[2]) : (r[0] = e[0] < n ? n : e[0], r[1] = e[1] < n ? n : e[1], r[2] = e[2] < n ? n : e[2]), r[3] = e[3], r)
    }, t.max = function (e, n, r) {
        return void 0 === n ? Math.max(e[0], e[1], e[2]) : (r || (r = new t.array(4)), "object" == typeof n ? (r[0] = e[0] > n[0] ? n[0] : e[0], r[1] = e[1] > n[1] ? n[1] : e[1], r[2] = e[2] > n[2] ? n[2] : e[2]) : (r[0] = e[0] > n ? n : e[0], r[1] = e[1] > n ? n : e[1], r[2] = e[2] > n ? n : e[2]), r[3] = e[3], r)
    }, t.clamp = function (e, n, r, i) {
        return t.max(t.min(e, n, t.buffer), r, i)
    }, t.sum = function (t) {
        return t[0] + t[1] + t[2]
    }, t.dot = function (t, e) {
        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
    }, t.cross = function (e, n, r) {
        return r || (r = new t.array(4)), r[0] = e[1] * n[2] - e[2] * n[1], r[1] = e[2] * n[0] - e[0] * n[2], r[2] = e[0] * n[1] - e[1] * n[0], r[3] = 1, r
    }, t.unit = function (e, n) {
        var r = Math.sqrt(t.dot(e, e));
        return t.mul(e, r ? 1 / r : 0, n)
    }, t.length = function (e, n, r) {
        var i = Math.sqrt(t.dot(e, e));
        return void 0 === n ? i : t.mul(e, i ? n / i : 0, r)
    }, t.length2 = function (e, n, r) {
        var i = t.dot(e, e);
        return void 0 === n ? i : t.mul(e, i ? n / i : 0, r)
    }, t.distance = function (e, n) {
        return t.length(t.sub(n, e, t.buffer))
    }, t.distance2 = function (e, n) {
        return t.dot(t.sub(n, e, t.buffer), t.buffer)
    }, t.lerp = function (e, n, r, i) {
        return t.sub(n, e, t.buffer), t.mul(t.buffer, r, t.buffer), t.add(e, t.buffer, i)
    }, t.project = function (e, n, r) {
        return t.mul(n, t.dot(e, n) / t.dot(n, n), r)
    }, t.mirror = function (e, n, r) {
        return t.mul(n, 2 * t.dot(e, n), t.buffer), t.sub(t.buffer, e, r)
    }, t.reflect = function (e, n, r) {
        return t.mul(n, 2 * t.dot(e, n), t.buffer), t.sub(e, t.buffer, r)
    }, t.random = function (e, n) {
        n || (n = new t.array(4)), void 0 === e && (e = 1);
        var r = Math.acos(2 * Math.random() - 1),
            i = Math.random() * Math.PI * 2;
        return n[0] = e * Math.sin(r) * Math.cos(i), n[1] = e * Math.sin(r) * Math.sin(i), n[2] = e * Math.cos(r), n[3] = 1, n
    }, t.each = function (e, n, r) {
        return r || (r = new t.array(4)), r[0] = n(e[0], 0), r[1] = n(e[1], 1), r[2] = n(e[2], 2), r[3] = e[3], r
    }, t.transform = function (e, n, r) {
        r || (r = new t.array(4));
        var i = e[0],
            o = e[1],
            a = e[2],
            s = e[3];
        return r[0] = i * n[0] + o * n[1] + a * n[2] + s * n[3], r[1] = i * n[4] + o * n[5] + a * n[6] + s * n[7], r[2] = i * n[8] + o * n[9] + a * n[10] + s * n[11], r[3] = i * n[12] + o * n[13] + a * n[14] + s * n[15], r
    }, t
}),
function () {
    "use strict";

    function t(t, e) {
        this.callback = e, this.element = t, this.handler = this.handler.bind(this), this.L = this.M = this.R = this.X = this.Y = 0, t.addEventListener("contextmenu", this.handler), t.addEventListener("mousedown", this.handler), window.addEventListener("mouseup", this.handler), window.addEventListener("mousemove", this.handler)
    }

    function e(t, e, n) {
        this.field = t, this.l = vec4.get(e, n), this.p = vec4.get(e, n), this.v = vec4.get()
    }

    function n(e) {
        this.loop = this.loop.bind(this), this.canvas = util.tag("canvas", null, e), this.info = util.tag("code", null, e), this.context = this.canvas.getContext("2d"), this.mouse = new t(this.canvas), this.noise = new SimplexNoise, this.particles = [], this.loop()
    }
    t.prototype.map = {
        0: "L",
        1: "M",
        2: "R"
    }, t.prototype.handler = function (t) {
        var e = this.element.getBoundingClientRect();
        switch (this.X = t.clientX - e.left, this.Y = t.clientY - e.top, t.type) {
            case "contextmenu":
                t.preventDefault();
                break;
            case "mousedown":
                this[this.map[t.button]] = 1;
                break;
            case "mouseup":
                this[this.map[t.button]] = 0
        }
        this.callback && this.callback(t)
    }, e.prototype.reset = function (t, e) {
        void 0 !== t && void 0 !== e || (Math.random() < .5 ? (t = this.field.width * Math.random(), e = this.field.height * (Math.random() + .5 | 0)) : (t = this.field.width * (Math.random() + .5 | 0), e = this.field.height * Math.random())), vec4.set(this.l, t, e), vec4.set(this.p, t, e), vec4.set(this.v)
    }, e.prototype.outOfBounds = function () {
        return this.p[0] < 0 || this.p[0] > this.field.width || this.p[1] < 0 || this.p[1] > this.field.height
    }, e.prototype.update = function () {
        if (!this.outOfBounds()) {
            var t = .005 * this.p[0],
                e = .005 * this.p[1],
                n = 1e-4 * this.field.now,
                r = .25 * Math.random(),
                i = Math.random() * Math.PI * 2;
            return vec4.set(vec4.buffer, r * Math.sin(i) + this.field.noise.noise3D(t, e, +n), r * Math.cos(i) + this.field.noise.noise3D(t, e, -n)), vec4.add(this.v, vec4.buffer, this.v), this.field.mouse.L && (vec4.set(vec4.buffer, this.field.mouse.X, this.field.mouse.Y), vec4.sub(vec4.buffer, this.p, vec4.buffer), vec4.mul(vec4.buffer, .001, vec4.buffer), vec4.add(this.v, vec4.buffer, this.v)), vec4.mul(this.v, .95, this.v), vec4.set(this.l, this.p, this.l), vec4.add(this.p, this.v, this.p), !0
        }
    }, n.prototype.spawn = function () {
        for (var t = 1e4 - this.particles.length; t--;) this.particles.push(new e(this))
    }, n.prototype.resize = function () {
        var t = this.canvas.clientWidth,
            e = this.canvas.clientHeight;
        this.canvas.width === t && this.canvas.height === e || (this.width = this.canvas.width = t, this.height = this.canvas.height = e, this.clear())
    }, n.prototype.clear = function () {
        this.context.fillStyle = util.color.rgba(1, 1, 1), this.context.fillRect(0, 0, this.width, this.height)
    }, n.prototype.render = function () {
        this.context.beginPath();
        for (var t, e = 0; t = this.particles[e++];) t.update() ? (this.context.moveTo(t.l[0], t.l[1]), this.context.lineTo(t.p[0], t.p[1])) : t.reset();
        this.context.globalCompositeOperation = "lighter", this.context.strokeStyle = util.color.rgba(.25, .1, .75, .25), this.context.stroke(), this.context.globalCompositeOperation = "source-over", this.context.fillStyle = util.color.rgba(0, 0, 0, .05), this.context.fillRect(0, 0, this.width, this.height)
    }, n.prototype.update = function () {
        this.info.textContent = util.fps(1), this.now = Date.now(), this.resize(), this.spawn(), this.render()
    }, n.prototype.loop = function () {
        requestAnimationFrame(this.loop), this.update()
    }, window.addEventListener("load", function () {
        new n(document.body)
    }, !1)
}.call(this), $(window).bind("orientationchange", function (t) {
    window.location.reload()
});

setInterval(() => {
    if ($(".info .row.short").height() < $(".info .row.short div").height() * 2) {
        var width = $(".info .row.short div").width() * 2 + $(".info .row.short").width() * 0.06;
        $(".info .row.long div").width(width)
    } else {
        var width = $(".info .row.short div").width();
    }
    $(".info .row.long div").width(width)
}, 100);
