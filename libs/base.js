var __reflect = this && this.__reflect || function(t, e, i) {
    t.__class__ = e,
    i ? i.push(e) : i = [e],
    t.__types__ = t.__types__ ? i.concat(t.__types__) : i
}
    , __extends = this && this.__extends || function(t, e) {
    function i() {
        this.constructor = t
    }
    for (var r in e)
        e.hasOwnProperty(r) && (t[r] = e[r]);
    i.prototype = e.prototype,
    t.prototype = new i
}, v8core;;

var __define = this && this.__define || function(t, e, i, r) {
    Object.defineProperty(t, e, {
        configurable: !0,
        enumerable: !0,
        get: i,
        set: r
    })
};


var v8core;
!function(t) {
    t.$hashCount = 1;
    var e = function() {
        function e() {
            this.$hashCode = t.$hashCount++
        }
        return Object.defineProperty(e.prototype, "hashCode", {
            get: function() {
                return this.$hashCode
            },
            enumerable: !0,
            configurable: !0
        }),
        e
    }();
    t.HashObject = e,
    __reflect(e.prototype, "v8core.HashObject", ["v8core.IHashObject"])
}(v8core || (v8core = {}));