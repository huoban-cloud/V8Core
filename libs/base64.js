var v8core;
!function(t) {
    var e = function() {
        function t() {}
        return t.encode = function(t) {
            for (var e = new Uint8Array(t), i = e.length, r = "", n = 0; i > n; n += 3)
                r += chars[e[n] >> 2],
                r += chars[(3 & e[n]) << 4 | e[n + 1] >> 4],
                r += chars[(15 & e[n + 1]) << 2 | e[n + 2] >> 6],
                r += chars[63 & e[n + 2]];
            return i % 3 === 2 ? r = r.substring(0, r.length - 1) + "=" : i % 3 === 1 && (r = r.substring(0, r.length - 2) + "=="),
            r
        }
        ,
        t.decode = function(t) {
            var e = .75 * t.length
                , i = t.length
                , r = 0
                , n = 0
                , a = 0
                , o = 0
                , s = 0;
            "=" === t[t.length - 1] && (e--,
            "=" === t[t.length - 2] && e--);
            for (var h = new ArrayBuffer(e), c = new Uint8Array(h), l = 0; i > l; l += 4)
                n = lookup[t.charCodeAt(l)],
                a = lookup[t.charCodeAt(l + 1)],
                o = lookup[t.charCodeAt(l + 2)],
                s = lookup[t.charCodeAt(l + 3)],
                c[r++] = n << 2 | a >> 4,
                c[r++] = (15 & a) << 4 | o >> 2,
                c[r++] = (3 & o) << 6 | 63 & s;
            return h
        }
        ,
        t
    }();
    t.Base64 = e,
    __reflect(e.prototype, "v8core.Base64")
}(v8core || (v8core = {}));
for (var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup = new Uint8Array(256), i = 0; i < chars.length; i++)
    lookup[chars.charCodeAt(i)] = i;
