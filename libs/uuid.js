var v8core;
!function(t) {
    var e = function() {
    }
    e.uuid = function() {
        var r = function() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        };
        return r() + r() + r() + r() + r() + r() + r() + r()
    }

    e.uuid_v4 = function() {
        var r = function() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        };
        return r() + r() + '-' + r() + '-' + r() + '-' + r() + '-' + r() + r() + r()
    }

    t.UUID = e,
    __reflect(e.prototype, "v8core.UUID", ["v8core.UUID"])
}(v8core || (v8core = {}));