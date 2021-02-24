(function (root, name, factory) {
    try {
        return module.exports = factory();
    } catch (e) {}
    try {
        return define(factory);
    } catch (e) {}
    try {
        return root[name] = factory();
    } catch (e) {}
})(this, 'util', function () {
    'use strict';
    return {
        each: function (object, callback) {
            if (Object.prototype.toString.call(object) === '[object Array]')
                for (var i = 0, l = object.length; i < l; i++)
                    callback(object[i], i, object);
            else
                for (var i in object)
                    if (Object.prototype.hasOwnProperty.call(object, i))
                        callback(object[i], i, object);
        },
        extend: function () {
            for (var i = 1, a = arguments, o = a[0], s, p; s = a[i++];)
                for (p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p)) o[p] = s[p];
            return o;
        },
        inherits: function (child, parent) {
            child.prototype = new parent();
            child.prototype.constructor = child;
            child._super_ = parent.prototype;
            return child;
        },
        format: function (string, object) {
            var o = typeof object === 'object' ? object : arguments;
            return string.replace(/{(.*?)}/g, function (m, n) {
                return typeof o[n] !== 'undefined' ? o[n] : m;
            });
        },
        rand: {
            float: function (min, max) {
                return Math.random() * (max - min) + min;
            },
            int: function (min, max) {
                return Math.random() * (max - min + 1) + min | 0;
            },
            item: function (array) {
                return array[Math.random() * array.length | 0];
            },
            hash: function (length) {
                for (var r, s = '', l = length || 1; l--;)
                    s += (r = Math.random() * 62 | 0) < 10 ? r :
                    String.fromCharCode(r + (r < 36 ? 87 : 29));
                return s;
            }
        },
        math: {
            clamp: function (value, min, max) {
                return value < min ? min : value > max ? max : value;
            },
            mod: function (value, min, max) {
                return (value -= min) % (max - min) + (value < 0 ? max : min);
            },
            map: function (value, min1, max1, min2, max2) {
                return (value - min1) * (max2 - min2) / (max1 - min1) + min2;
            },
            lerp: function (value, min, max) {
                return min + value * (max - min);
            },
            angle: function (a, b, full) {
                return 2 * (a = (a < b ? b - a : a - b) % full) > full ? full - a : a;
            }
        },
        str: {
            pad: function (string, length, pad) {
                var s = String(string);
                var l = Math.max(0, Math.abs(length) - s.length);
                var p = new Array(++l).join(pad != null ? pad : ' ');
                return length < 0 ? s + p : p + s;
            }
        },
        array: {
            cross: function (array, callback) {
                var i, j, l = array.length;
                for (i = 0; i < l; i++)
                    for (j = i + 1; j < l;)
                        callback(array[i], array[j], i, j++);
                return array;
            }
        },
        fn: {
            wrap: function (fn, wrapper) {
                return function () {
                    return wrapper.call(this, arguments, fn);
                };
            },
            log: function (fn, logger) {
                return function () {
                    logger.call(this, arguments, fn);
                    return fn.apply(this, arguments);
                };
            }
        },
        color: {
            rgba: function (rgba) {
                if (typeof rgba !== 'object') rgba = arguments;
                return 'rgba(' +
                    (rgba[0] * 255 + 0.5 | 0) + ',' +
                    (rgba[1] * 255 + 0.5 | 0) + ',' +
                    (rgba[2] * 255 + 0.5 | 0) + ',' +
                    (rgba[3] != null ? rgba[3] : 1).toFixed(3) + ')';
            },
            hsla: function (hsla) {
                if (typeof hsla !== 'object') hsla = arguments;
                return 'hsla(' +
                    (hsla[0] * 360 + 0.5 | 0) + ',' +
                    (hsla[1] * 100 + 0.5 | 0) + '%,' +
                    (hsla[2] * 100 + 0.5 | 0) + '%,' +
                    (hsla[3] != null ? hsla[3] : 1).toFixed(3) + ')';
            }
        },
        gradient: function (colors, position) {
            var a, b, c, i, l, t = position;
            for (i = 0; c = colors[i++];) {
                if (t - c[0] >= 0 && (!a || t - c[0] < t - a[0])) a = c;
                if (t - c[0] <= 0 && (!b || t - c[0] > t - b[0])) b = c;
            }
            t = (t - a[0]) / (b[0] - a[0]) || 0;
            for (c = [], i = 0, l = a[1].length; i < l;)
                c[i] = a[1][i] + (b[1][i] - a[1][i++]) * t;
            return c;
        },
        loop: function (callback, interval) {
            var n = Date.now(),
                s = n,
                l = n,
                i = 0;
            var loop = function () {
                !callback(i++, (n = Date.now()) - s, n - l, l = n) && next();
            };
            var next = interval == null ?
                requestAnimationFrame.bind(null, loop) :
                setTimeout.bind(null, loop, interval);
            return loop();
        },
        perf: function (times) {
            for (var t, f, j, i = 1, r = []; f = arguments[i++];) {
                t = Date.now();
                for (j = 0; j < times; f(j++));
                r.push((Date.now() - t) / 1000);
            }
            return r;
        },
        fps: (function (h, l, s) {
            return function (int) {
                l = h.push(Date.now()) - 1;
                s = l / (h[l] - h[0]) * 1000 || 0;
                l > s && h.splice(0, ++l - s | 0);
                return int ? s + 0.5 | 0 : s;
            };
        })([]),
        bind: (function (fn) {
            return {
                on: fn.bind('add'),
                off: fn.bind('remove')
            };
        })(function (elements, events, listeners, capture) {
            var a = [].concat(elements),
                b = [].concat(events),
                c = [].concat(listeners);
            for (var k, j, i = 0; a[i]; i++)
                for (j = 0; b[j]; j++)
                    for (k = 0; c[k]; k++)
                        a[i][this + 'EventListener'](b[j], c[k], capture);
        }),
        ajax: (function (fn) {
            return {
                get: fn.bind(0),
                post: fn.bind(1)
            };
        })(function (url, data, callback, timeout) {
            var p, q = '',
                xhr = new XMLHttpRequest();
            for (p in data)
                if (data.hasOwnProperty(p))
                    q += '&' + [p, data[p]].map(encodeURIComponent).join('=');
            if (q && !this) url += ~url.indexOf('?') ? q : q.replace('&', '?');
            xhr.open(this ? 'POST' : 'GET', url, true);
            xhr.timeout = timeout ? timeout * 1000 : 0;
            xhr.onreadystatechange = function () {
                this.readyState === 4 && callback(this.response, this);
            };
            if (!url.match(/^(https?:)?\/\//i)) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
            xhr.send(this && q ? q.substr(1) : null);
            return xhr;
        }),
        load: {
            docs: function (list, callback, progress) {
                var item, i, j = 0,
                    e = function () {
                        if (this.readyState !== 4) return;
                        list[list.indexOf(this)] = this.response;
                        j++;
                        progress && progress(j, list.length);
                        j === list.length && callback(list);
                    }
                progress && progress(0, list.length);
                for (i = 0; i < list.length; i++) {
                    item = new XMLHttpRequest();
                    item.onreadystatechange = e;
                    item.open('GET', list[i], true);
                    item.send(null);
                    list[i] = item;
                }
                return list;
            },
            imgs: function (list, callback, progress) {
                var item, i, j = 0,
                    e = function () {
                        j++;
                        progress && progress(j, list.length);
                        j === list.length && callback(list);
                    }
                progress && progress(0, list.length);
                for (i = 0; i < list.length; i++) {
                    item = new Image();
                    item.onload = e;
                    item.src = list[i];
                    list[i] = item;
                }
                return list;
            }
        },
        select: function (selector, where) {
            if (selector = /(^[.#]?)([\w-]+$)/.exec(selector)) switch (selector[1]) {
                case '#':
                    return (where || document).getElementById(selector[2]);
                case '.':
                    return (where || document).getElementsByClassName(selector[2]);
                default:
                    return (where || document).getElementsByTagName(selector[2]);
            } else return (where || document).querySelectorAll(selector);
        },
        tag: function (element, options, target, prepend) {
            var e = element,
                o = options,
                i = e || '',
                j;
            if (e == null || e.nodeType == null) {
                e = document.createElement(String(i.match(/^[^#.]+/) || 'div'));
                if (j = i.match(/#([^#.]+)/)) e.id = j[1];
                if (j = i.match(/\.[^#.]+/g)) e.className = j.join(' ').replace(/\./g, '');
            }
            if (o != null)
                if (o.nodeType != null) e.appendChild(o);
                else if (typeof o !== 'object') e.textContent = o;
            else if (o[i = 0])
                while (o[i]) e.appendChild(o[i++]);
            else
                for (i in o)
                    if (o.hasOwnProperty(i)) e[i] = o[i];
            if (target)
                if (!prepend) target.appendChild(e);
                else target.insertBefore(e, target.firstChild);
            return e;
        },
        breadcrump: function (element, url, sub, last, separator) {
            url = decodeURI(url || location.href);
            url = url.match(/[^?#]+/)[0].split('/');
            sub = /^[\d.]+$/.test(url[2]) ? 0 : sub;
            var e, i, host = url[2].split('.');
            while (host.length) {
                e = document.createElement('a');
                e.href = url[0] + '//' + host.join('.') + '/';
                e.textContent = sub && host.length > sub && host[0] !== 'www' ?
                    host.splice(0, 1) + '.' : host.splice(0).join('.');
                element.appendChild(e);
            }
            for (i = 3; url[i]; i++) {
                element.appendChild(document.createTextNode(separator || ' › '));
                e = document.createElement(!url[i + 1] && !last ? 'span' : 'a');
                if ('href' in e) e.href = encodeURI(url.slice(0, i + 1).join('/'));
                if ('href' in e && url[i + 1] != null) e.href += '/';
                e.textContent = url[i];
                element.appendChild(e);
            }
            return element;
        },
        form: function (form) {
            var i, e, o = {},
                c = form.querySelectorAll('*');
            for (i = 0; e = c[i]; i++)
                if (e.name) switch (e.type) {
                    case 'radio':
                        if (e.checked) o[e.name] = e.value;
                        break;
                    case 'checkbox':
                        o[e.name] = e.checked ? 1 : 0;
                        break;
                    default:
                        o[e.name] = e.value;
                        break;
                }
            return o;
        },
        favicon: function (url) {
            var e = document.head.querySelector('link[rel*=icon]');
            e && document.head.removeChild(e);
            e = document.createElement('link');
            e.rel = 'shortcut icon';
            e.href = url;
            document.head.appendChild(e);
        }
    };
});

(function (root, name, factory) {
    try {
        return module.exports = factory();
    } catch (e) {}
    try {
        return define(factory);
    } catch (e) {}
    try {
        return root[name] = factory();
    } catch (e) {}
})(this, 'vec4', function () {
    'use strict';
    var vec4 = {};

    vec4.array = Float32Array || Array;
    vec4.buffer = new vec4.array(4);

    vec4.get = function (a, b, c, d) {
        return vec4.set(new vec4.array(4), a, b, c, d);
    };

    vec4.set = function (out, a, b, c, d) {
        if (!out) out = new vec4.array(4);
        if (typeof a === 'object') {
            out[0] = -Infinity < a[0] && a[0] < Infinity ? a[0] : 0;
            out[1] = -Infinity < a[1] && a[1] < Infinity ? a[1] : 0;
            out[2] = -Infinity < a[2] && a[2] < Infinity ? a[2] : 0;
            out[3] = -Infinity < a[3] && a[3] < Infinity ? a[3] : 1;
        } else {
            out[0] = -Infinity < a && a < Infinity ? a : 0;
            out[1] = -Infinity < b && b < Infinity ? b : 0;
            out[2] = -Infinity < c && c < Infinity ? c : 0;
            out[3] = -Infinity < d && d < Infinity ? d : 1;
        }
        return out;
    };

    vec4.equals = function (a, b) {
        if (a === b) return true;
        return typeof b === 'object' ?
            a[0] === b[0] && a[1] === b[1] && a[2] === b[2] :
            a[0] === b && a[1] === b && a[2] === b;
    };

    vec4.add = function (a, b, out) {
        if (!out) out = new vec4.array(4);
        if (typeof b === 'object') {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
        } else {
            out[0] = a[0] + b;
            out[1] = a[1] + b;
            out[2] = a[2] + b;
        }
        return out[3] = a[3], out;
    };

    vec4.sub = function (a, b, out) {
        if (!out) out = new vec4.array(4);
        if (typeof b === 'object') {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
        } else {
            out[0] = a[0] - b;
            out[1] = a[1] - b;
            out[2] = a[2] - b;
        }
        return out[3] = a[3], out;
    };

    vec4.mul = function (a, b, out) {
        if (!out) out = new vec4.array(4);
        if (typeof b === 'object') {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
        } else {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
        }
        return out[3] = a[3], out;
    };

    vec4.div = function (a, b, out) {
        if (!out) out = new vec4.array(4);
        if (typeof b === 'object') {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
        } else {
            out[0] = a[0] / b;
            out[1] = a[1] / b;
            out[2] = a[2] / b;
        }
        return out[3] = a[3], out;
    };

    vec4.mod = function (a, b, out) {
        if (!out) out = new vec4.array(4);
        if (typeof b === 'object') {
            out[0] = a[0] % b[0];
            out[1] = a[1] % b[1];
            out[2] = a[2] % b[2];
        } else {
            out[0] = a[0] % b;
            out[1] = a[1] % b;
            out[2] = a[2] % b;
        }
        return out[3] = a[3], out;
    };

    vec4.min = function (a, min, out) {
        if (typeof min === 'undefined')
            return Math.min(a[0], a[1], a[2]);
        if (!out) out = new vec4.array(4);
        if (typeof min === 'object') {
            out[0] = a[0] < min[0] ? min[0] : a[0];
            out[1] = a[1] < min[1] ? min[1] : a[1];
            out[2] = a[2] < min[2] ? min[2] : a[2];
        } else {
            out[0] = a[0] < min ? min : a[0];
            out[1] = a[1] < min ? min : a[1];
            out[2] = a[2] < min ? min : a[2];
        }
        return out[3] = a[3], out;
    };

    vec4.max = function (a, max, out) {
        if (typeof max === 'undefined')
            return Math.max(a[0], a[1], a[2]);
        if (!out) out = new vec4.array(4);
        if (typeof max === 'object') {
            out[0] = a[0] > max[0] ? max[0] : a[0];
            out[1] = a[1] > max[1] ? max[1] : a[1];
            out[2] = a[2] > max[2] ? max[2] : a[2];
        } else {
            out[0] = a[0] > max ? max : a[0];
            out[1] = a[1] > max ? max : a[1];
            out[2] = a[2] > max ? max : a[2];
        }
        return out[3] = a[3], out;
    };

    vec4.clamp = function (a, min, max, out) {
        return vec4.max(vec4.min(a, min, vec4.buffer), max, out);
    };

    vec4.sum = function (a) {
        return a[0] + a[1] + a[2];
    };

    vec4.dot = function (a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    };

    vec4.cross = function (a, b, out) {
        if (!out) out = new vec4.array(4);
        out[0] = a[1] * b[2] - a[2] * b[1];
        out[1] = a[2] * b[0] - a[0] * b[2];
        out[2] = a[0] * b[1] - a[1] * b[0];
        return out[3] = 1, out;
    };

    vec4.unit = function (a, out) {
        var l = Math.sqrt(vec4.dot(a, a));
        return vec4.mul(a, l ? 1 / l : 0, out);
    };

    vec4.length = function (a, length, out) {
        var l = Math.sqrt(vec4.dot(a, a));
        if (typeof length === 'undefined') return l;
        return vec4.mul(a, l ? length / l : 0, out);
    };

    vec4.length2 = function (a, length, out) {
        var l = vec4.dot(a, a);
        if (typeof length === 'undefined') return l;
        return vec4.mul(a, l ? length / l : 0, out);
    };

    vec4.distance = function (a, b) {
        return vec4.length(vec4.sub(b, a, vec4.buffer));
    };

    vec4.distance2 = function (a, b) {
        return vec4.dot(vec4.sub(b, a, vec4.buffer), vec4.buffer);
    };

    vec4.lerp = function (a, b, t, out) {
        vec4.sub(b, a, vec4.buffer);
        vec4.mul(vec4.buffer, t, vec4.buffer);
        return vec4.add(a, vec4.buffer, out);
    };

    vec4.project = function (a, b, out) {
        return vec4.mul(b, vec4.dot(a, b) / vec4.dot(b, b), out);
    };

    vec4.mirror = function (a, normal, out) {
        vec4.mul(normal, 2 * vec4.dot(a, normal), vec4.buffer);
        return vec4.sub(vec4.buffer, a, out);
    };

    vec4.reflect = function (a, normal, out) {
        vec4.mul(normal, 2 * vec4.dot(a, normal), vec4.buffer);
        return vec4.sub(a, vec4.buffer, out);
    };

    vec4.random = function (radius, out) {
        if (!out) out = new vec4.array(4);
        if (typeof radius === 'undefined') radius = 1;
        var t = Math.acos(Math.random() * 2 - 1);
        var p = Math.random() * Math.PI * 2;
        out[0] = radius * Math.sin(t) * Math.cos(p);
        out[1] = radius * Math.sin(t) * Math.sin(p);
        out[2] = radius * Math.cos(t);
        return out[3] = 1, out;
    };

    vec4.each = function (a, callback, out) {
        if (!out) out = new vec4.array(4);
        out[0] = callback(a[0], 0);
        out[1] = callback(a[1], 1);
        out[2] = callback(a[2], 2);
        return out[3] = a[3], out;
    };

    vec4.transform = function (v, m, out) {
        if (!out) out = new vec4.array(4);
        var a = v[0],
            b = v[1],
            c = v[2],
            d = v[3];
        out[0] = a * m[0] + b * m[1] + c * m[2] + d * m[3];
        out[1] = a * m[4] + b * m[5] + c * m[6] + d * m[7];
        out[2] = a * m[8] + b * m[9] + c * m[10] + d * m[11];
        out[3] = a * m[12] + b * m[13] + c * m[14] + d * m[15];
        return out;
    };

    return vec4;
});

(function () {
    'use strict';

    function Mouse(element, callback) {
        this.callback = callback;
        this.element = element;
        this.handler = this.handler.bind(this);
        this.L = this.M = this.R = this.X = this.Y = 0;
        element.addEventListener('contextmenu', this.handler);
        element.addEventListener('mousedown', this.handler);
        window.addEventListener('mouseup', this.handler);
        window.addEventListener('mousemove', this.handler);
    }

    Mouse.prototype.map = {
        0: 'L',
        1: 'M',
        2: 'R'
    };

    Mouse.prototype.handler = function (e) {
        var b = this.element.getBoundingClientRect();
        this.X = e.clientX - b.left;
        this.Y = e.clientY - b.top;
        switch (e.type) {
            case 'contextmenu':
                e.preventDefault();
                break;
            case 'mousedown':
                this[this.map[e.button]] = 1;
                break;
            case 'mouseup':
                this[this.map[e.button]] = 0;
                break;
        }
        this.callback && this.callback(e);
    };

    function Particle(field, x, y) {
        this.field = field;
        this.l = vec4.get(x, y);
        this.p = vec4.get(x, y);
        this.v = vec4.get();
    }

    Particle.prototype.reset = function (x, y) {
        if (x === undefined || y === undefined) {
            if (Math.random() < 0.5) {
                x = this.field.width * (Math.random());
                y = this.field.height * (Math.random() + 0.5 | 0);
            } else {
                x = this.field.width * (Math.random() + 0.5 | 0);
                y = this.field.height * (Math.random());
            }
        }

        vec4.set(this.l, x, y);
        vec4.set(this.p, x, y);
        vec4.set(this.v);
    };

    Particle.prototype.outOfBounds = function () {
        return this.p[0] < 0 || this.p[0] > this.field.width ||
            this.p[1] < 0 || this.p[1] > this.field.height;
    };

    Particle.prototype.update = function () {
        if (this.outOfBounds()) return;

        var x = 0.0050 * this.p[0];
        var y = 0.0050 * this.p[1];
        var z = 0.0001 * this.field.now;
        var r = Math.random() * 0.25;
        var t = Math.random() * Math.PI * 2;

        vec4.set(vec4.buffer,
            r * Math.sin(t) + this.field.noise.noise3D(x, y, +z),
            r * Math.cos(t) + this.field.noise.noise3D(x, y, -z)
        );
        vec4.add(this.v, vec4.buffer, this.v);

        if (this.field.mouse.L) {
            vec4.set(vec4.buffer, this.field.mouse.X, this.field.mouse.Y);
            vec4.sub(vec4.buffer, this.p, vec4.buffer);
            vec4.mul(vec4.buffer, 0.0010, vec4.buffer);
            vec4.add(this.v, vec4.buffer, this.v);
        }

        vec4.mul(this.v, 0.9500, this.v);
        vec4.set(this.l, this.p, this.l);
        vec4.add(this.p, this.v, this.p);

        return true;
    };

    function Field(container) {
        this.loop = this.loop.bind(this);
        this.canvas = util.tag('canvas', null, container);
        this.info = util.tag('code', null, container);
        this.context = this.canvas.getContext('2d');
        this.mouse = new Mouse(this.canvas);
        this.noise = new SimplexNoise();
        this.particles = [];
        this.loop();
    }

    Field.prototype.spawn = function () {
        for (var i = 1e4 - this.particles.length; i--;)
            this.particles.push(new Particle(this));
    };

    Field.prototype.resize = function () {
        var w = this.canvas.clientWidth;
        var h = this.canvas.clientHeight;
        if (this.canvas.width !== w ||
            this.canvas.height !== h) {
            this.width = this.canvas.width = w;
            this.height = this.canvas.height = h;
            this.clear();
        }
    };

    Field.prototype.clear = function () {
        this.context.fillStyle = util.color.rgba(1, 1, 1);
        this.context.fillRect(0, 0, this.width, this.height);
    };

    Field.prototype.render = function () {
        this.context.beginPath();

        for (var p, i = 0; p = this.particles[i++];)
            if (p.update()) {
                this.context.moveTo(p.l[0], p.l[1]);
                this.context.lineTo(p.p[0], p.p[1]);
            } else p.reset(); // this.particles.splice(--i, 1);

        this.context.globalCompositeOperation = 'lighter';
        this.context.strokeStyle = util.color.rgba(0.25, 0.10, 0.75, 0.25);
        this.context.stroke();

        this.context.globalCompositeOperation = 'source-over';
        this.context.fillStyle = util.color.rgba(0, 0, 0, 0.05);
        this.context.fillRect(0, 0, this.width, this.height);
    };

    Field.prototype.update = function () {
        this.info.textContent = util.fps(1);
        this.now = Date.now();
        this.resize();
        this.spawn();
        this.render();
    };

    Field.prototype.loop = function () {
        requestAnimationFrame(this.loop);
        this.update();
    };

    window.addEventListener('load', function () {
        new Field(document.body);
    }, false);
}).call(this);

$(window).bind('orientationchange', function(e) {
    window.location.reload();
});