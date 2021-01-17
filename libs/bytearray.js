var v8core;
!function(t) {
    var e = function() {
        function t() {}
        return t.LITTLE_ENDIAN = "littleEndian",
        t.BIG_ENDIAN = "bigEndian",
        t
    }();
    t.Endian = e,
    __reflect(e.prototype, "v8core.Endian");
    var i = function() {
        function i(t, i) {
            void 0 === i && (i = 0),
            this.bufferExtSize = 0,
            this.EOF_byte = -1,
            this.EOF_code_point = -1,
            0 > i && (i = 0),
            this.bufferExtSize = i;
            var r, n = 0;
            if (t) {
                var a = void 0;
                if (t instanceof Uint8Array ? (a = t,
                n = t.length) : (n = t.byteLength,
                a = new Uint8Array(t)),
                0 == i)
                    r = new Uint8Array(n);
                else {
                    var o = (n / i | 0) + 1;
                    r = new Uint8Array(o * i)
                }
                r.set(a)
            } else
                r = new Uint8Array(i);
            this.write_position = n,
            this._position = 0,
            this._bytes = r,
            this.data = new DataView(r.buffer),
            this.endian = e.BIG_ENDIAN
        }
        return Object.defineProperty(i.prototype, "endian", {
            get: function() {
                return 0 == this.$endian ? e.LITTLE_ENDIAN : e.BIG_ENDIAN
            },
            set: function(t) {
                this.$endian = t == e.LITTLE_ENDIAN ? 0 : 1
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.setArrayBuffer = function(t) {}
        ,
        Object.defineProperty(i.prototype, "readAvailable", {
            get: function() {
                return this.write_position - this._position
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "buffer", {
            get: function() {
                return this.data.buffer.slice(0, this.write_position)
            },
            set: function(t) {
                var e, i = t.byteLength, r = new Uint8Array(t), n = this.bufferExtSize;
                if (0 == n)
                    e = new Uint8Array(i);
                else {
                    var a = (i / n | 0) + 1;
                    e = new Uint8Array(a * n)
                }
                e.set(r),
                this.write_position = i,
                this._bytes = e,
                this.data = new DataView(e.buffer)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "rawBuffer", {
            get: function() {
                return this.data.buffer
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "bytes", {
            get: function() {
                return this._bytes
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "dataView", {
            get: function() {
                return this.data
            },
            set: function(t) {
                this.buffer = t.buffer
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "bufferOffset", {
            get: function() {
                return this.data.byteOffset
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "position", {
            get: function() {
                return this._position
            },
            set: function(t) {
                this._position = t,
                t > this.write_position && (this.write_position = t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(i.prototype, "length", {
            get: function() {
                return this.write_position
            },
            set: function(t) {
                this.write_position = t,
                this.data.byteLength > t && (this._position = t),
                this._validateBuffer(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype._validateBuffer = function(t) {
            if (this.data.byteLength < t) {
                var e = this.bufferExtSize
                    , i = void 0;
                if (0 == e)
                    i = new Uint8Array(t);
                else {
                    var r = ((t / e >> 0) + 1) * e;
                    i = new Uint8Array(r)
                }
                i.set(this._bytes),
                this._bytes = i,
                this.data = new DataView(i.buffer)
            }
        }
        ,
        Object.defineProperty(i.prototype, "bytesAvailable", {
            get: function() {
                return this.data.byteLength - this._position
            },
            enumerable: !0,
            configurable: !0
        }),
        i.prototype.clear = function() {
            var t = new ArrayBuffer(this.bufferExtSize);
            this.data = new DataView(t),
            this._bytes = new Uint8Array(t),
            this._position = 0,
            this.write_position = 0
        }
        ,
        i.prototype.readBoolean = function() {
            return this.validate(1) ? !!this._bytes[this.position++] : void 0
        }
        ,
        i.prototype.readByte = function() {
            return this.validate(1) ? this.data.getInt8(this.position++) : void 0
        }
        ,
        i.prototype.readBytes = function(e, i, r) {
            if (void 0 === i && (i = 0),
            void 0 === r && (r = 0),
            e) {
                var n = this._position
                    , a = this.write_position - n;
                if (0 > a)
                    return void t.$error(1025);
                if (0 == r)
                    r = a;
                else if (r > a)
                    return void t.$error(1025);
                var o = e._position;
                e._position = 0,
                e.validateBuffer(i + r),
                e._position = o,
                e._bytes.set(this._bytes.subarray(n, n + r), i),
                this.position += r
            }
        }
        ,
        i.prototype.readDouble = function() {
            if (this.validate(8)) {
                var t = this.data.getFloat64(this._position, 0 == this.$endian);
                return this.position += 8,
                t
            }
        }
        ,
        i.prototype.readFloat = function() {
            if (this.validate(4)) {
                var t = this.data.getFloat32(this._position, 0 == this.$endian);
                return this.position += 4,
                t
            }
        }
        ,
        i.prototype.readInt = function() {
            if (this.validate(4)) {
                var t = this.data.getInt32(this._position, 0 == this.$endian);
                return this.position += 4,
                t
            }
        }
        ,
        i.prototype.readShort = function() {
            if (this.validate(2)) {
                var t = this.data.getInt16(this._position, 0 == this.$endian);
                return this.position += 2,
                t
            }
        }
        ,
        i.prototype.readUnsignedByte = function() {
            return this.validate(1) ? this._bytes[this.position++] : void 0
        }
        ,
        i.prototype.readUnsignedInt = function() {
            if (this.validate(4)) {
                var t = this.data.getUint32(this._position, 0 == this.$endian);
                return this.position += 4,
                t
            }
        }
        ,
        i.prototype.readUnsignedShort = function() {
            if (this.validate(2)) {
                var t = this.data.getUint16(this._position, 0 == this.$endian);
                return this.position += 2,
                t
            }
        }
        ,
        i.prototype.readUTF = function() {
            var t = this.readUnsignedShort();
            return t > 0 ? this.readUTFBytes(t) : ""
        }
        ,
        i.prototype.readUTFBytes = function(t) {
            if (this.validate(t)) {
                var e = this.data
                    , i = new Uint8Array(e.buffer,e.byteOffset + this._position,t);
                return this.position += t,
                this.decodeUTF8(i)
            }
        }
        ,
        i.prototype.writeBoolean = function(t) {
            this.validateBuffer(1),
            this._bytes[this.position++] = +t
        }
        ,
        i.prototype.writeByte = function(t) {
            this.validateBuffer(1),
            this._bytes[this.position++] = 255 & t
        }
        ,
        i.prototype.writeBytes = function(t, e, i) {
            void 0 === e && (e = 0),
            void 0 === i && (i = 0);
            var r;
            0 > e || 0 > i || (r = 0 == i ? t.length - e : Math.min(t.length - e, i),
            r > 0 && (this.validateBuffer(r),
            this._bytes.set(t._bytes.subarray(e, e + r), this._position),
            this.position = this._position + r))
        }
        ,
        i.prototype.writeDouble = function(t) {
            this.validateBuffer(8),
            this.data.setFloat64(this._position, t, 0 == this.$endian),
            this.position += 8
        }
        ,
        i.prototype.writeFloat = function(t) {
            this.validateBuffer(4),
            this.data.setFloat32(this._position, t, 0 == this.$endian),
            this.position += 4
        }
        ,
        i.prototype.writeInt = function(t) {
            this.validateBuffer(4),
            this.data.setInt32(this._position, t, 0 == this.$endian),
            this.position += 4
        }
        ,
        i.prototype.writeShort = function(t) {
            this.validateBuffer(2),
            this.data.setInt16(this._position, t, 0 == this.$endian),
            this.position += 2
        }
        ,
        i.prototype.writeUnsignedInt = function(t) {
            this.validateBuffer(4),
            this.data.setUint32(this._position, t, 0 == this.$endian),
            this.position += 4
        }
        ,
        i.prototype.writeUnsignedShort = function(t) {
            this.validateBuffer(2),
            this.data.setUint16(this._position, t, 0 == this.$endian),
            this.position += 2
        }
        ,
        i.prototype.writeUTF = function(t) {
            var e = this.encodeUTF8(t)
                , i = e.length;
            this.validateBuffer(2 + i),
            this.data.setUint16(this._position, i, 0 == this.$endian),
            this.position += 2,
            this._writeUint8Array(e, !1)
        }
        ,
        i.prototype.writeUTFBytes = function(t) {
            this._writeUint8Array(this.encodeUTF8(t))
        }
        ,
        i.prototype.toString = function() {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable
        }
        ,
        i.prototype._writeUint8Array = function(t, e) {
            void 0 === e && (e = !0);
            var i = this._position
                , r = i + t.length;
            e && this.validateBuffer(r),
            this.bytes.set(t, i),
            this.position = r
        }
        ,
        i.prototype.validate = function(e) {
            var i = this._bytes.length;
            return i > 0 && this._position + e <= i ? !0 : void t.$error(1025)
        }
        ,
        i.prototype.validateBuffer = function(t) {
            this.write_position = t > this.write_position ? t : this.write_position,
            t += this._position,
            this._validateBuffer(t)
        }
        ,
        i.prototype.encodeUTF8 = function(t) {
            for (var e = 0, i = this.stringToCodePoints(t), r = []; i.length > e; ) {
                var n = i[e++];
                if (this.inRange(n, 55296, 57343))
                    this.encoderError(n);
                else if (this.inRange(n, 0, 127))
                    r.push(n);
                else {
                    var a = void 0
                        , o = void 0;
                    for (this.inRange(n, 128, 2047) ? (a = 1,
                    o = 192) : this.inRange(n, 2048, 65535) ? (a = 2,
                    o = 224) : this.inRange(n, 65536, 1114111) && (a = 3,
                    o = 240),
                    r.push(this.div(n, Math.pow(64, a)) + o); a > 0; ) {
                        var s = this.div(n, Math.pow(64, a - 1));
                        r.push(128 + s % 64),
                        a -= 1
                    }
                }
            }
            return new Uint8Array(r)
        }
        ,
        i.prototype.decodeUTF8 = function(t) {
            for (var e, i = !1, r = 0, n = "", a = 0, o = 0, s = 0, h = 0; t.length > r; ) {
                var c = t[r++];
                if (c == this.EOF_byte)
                    e = 0 != o ? this.decoderError(i) : this.EOF_code_point;
                else if (0 == o)
                    this.inRange(c, 0, 127) ? e = c : (this.inRange(c, 194, 223) ? (o = 1,
                    h = 128,
                    a = c - 192) : this.inRange(c, 224, 239) ? (o = 2,
                    h = 2048,
                    a = c - 224) : this.inRange(c, 240, 244) ? (o = 3,
                    h = 65536,
                    a = c - 240) : this.decoderError(i),
                    a *= Math.pow(64, o),
                    e = null);
                else if (this.inRange(c, 128, 191))
                    if (s += 1,
                    a += (c - 128) * Math.pow(64, o - s),
                    s !== o)
                        e = null;
                    else {
                        var l = a
                            , u = h;
                        a = 0,
                        o = 0,
                        s = 0,
                        h = 0,
                        e = this.inRange(l, u, 1114111) && !this.inRange(l, 55296, 57343) ? l : this.decoderError(i, c)
                    }
                else
                    a = 0,
                    o = 0,
                    s = 0,
                    h = 0,
                    r--,
                    e = this.decoderError(i, c);
                null !== e && e !== this.EOF_code_point && (65535 >= e ? e > 0 && (n += String.fromCharCode(e)) : (e -= 65536,
                n += String.fromCharCode(55296 + (e >> 10 & 1023)),
                n += String.fromCharCode(56320 + (1023 & e))))
            }
            return n
        }
        ,
        i.prototype.encoderError = function(e) {
            t.$error(1026, e)
        }
        ,
        i.prototype.decoderError = function(e, i) {
            return e && t.$error(1027),
            i || 65533
        }
        ,
        i.prototype.inRange = function(t, e, i) {
            return t >= e && i >= t
        }
        ,
        i.prototype.div = function(t, e) {
            return Math.floor(t / e)
        }
        ,
        i.prototype.stringToCodePoints = function(t) {
            for (var e = [], i = 0, r = t.length; i < t.length; ) {
                var n = t.charCodeAt(i);
                if (this.inRange(n, 55296, 57343))
                    if (this.inRange(n, 56320, 57343))
                        e.push(65533);
                    else if (i == r - 1)
                        e.push(65533);
                    else {
                        var a = t.charCodeAt(i + 1);
                        if (this.inRange(a, 56320, 57343)) {
                            var o = 1023 & n
                                , s = 1023 & a;
                            i += 1,
                            e.push(65536 + (o << 10) + s)
                        } else
                            e.push(65533)
                    }
                else
                    e.push(n);
                i += 1
            }
            return e
        }
        ,
        i
    }();
    t.ByteArray = i,
    __reflect(i.prototype, "v8core.ByteArray")
}(v8core || (v8core = {}));