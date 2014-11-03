var JellyScore = {
  loglevel: 0,
  log: function() {
    if (JellyScore.loglevel > 2 && (typeof window !== "undefined" || typeof module !== "undefined") && console !== null && typeof console.log !== "undefined" && console !== null ) {
      return console.log.apply(console, arguments);
    }
  },
  warn: function() {
    if (JellyScore.loglevel > 1 && (typeof window !== "undefined" || typeof module !== "undefined") && console !== null && typeof console.warn !== "undefined" && console !== null) {
      return console.warn.apply(console, arguments);
    }
  },
  error: function() {
    if (JellyScore.loglevel > 0 && (typeof window !== "undefined" || typeof module !== "undefined") && console !== null && typeof console.error !== "undefined" && console !== null) {
      return console.warn.apply(console, arguments);
    }
  },
  gcd: function() {
    if(!arguments.length) {
      return 0;
    }
    var GCDNum;
    for(var r, a, i = arguments.length - 1, GCDNum = arguments[i]; i;) {
      for(a = arguments[--i]; r = a % GCDNum; a = GCDNum, GCDNum = r);
    }
    return GCDNum;
  },
  _id: 0,
  getId: function() {
    return JellyScore._id++;
  },
  Drawings: {}
};
var JS = JellyScore;

if (typeof window !== "undefined" && window !== null) {
  window.JellyScore = JellyScore;
  window.JS = JS;
} 
else {
  if (typeof module !== "undefined" && module !== null) {
    module.exports = JellyScore;
  }
  else if (typeof self !== "undefined" && self !== null) {
    self.JellyScore = JellyScore;
    self.JS = JS;
  }
  var jQuery = {};
  $ = jQuery;
  jQuery.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
      target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {
      target = this;
      --i;
    }

    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) != null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];

            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = jQuery.extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };

  var class2type = {},
  core_push = Array.prototype.push,
  core_slice = Array.prototype.slice,
  core_indexOf = Array.prototype.indexOf,
  core_toString = Object.prototype.toString,
  core_hasOwn = Object.prototype.hasOwnProperty,
  core_trim = String.prototype.trim;

  jQuery.extend({
    noConflict: function( deep ) {
      if ( window.$ === jQuery ) {
        window.$ = _$;
      }

      if ( deep && window.jQuery === jQuery ) {
        window.jQuery = _jQuery;
      }

      return jQuery;
    },

    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,

    // A counter to track how many items to wait for before
    // the ready event fires. See #6781
    readyWait: 1,

    // Hold (or release) the ready event
    holdReady: function( hold ) {
      if ( hold ) {
        jQuery.readyWait++;
      } else {
        jQuery.ready( true );
      }
    },

    // Handle when the DOM is ready
    ready: function( wait ) {

      // Abort if there are pending holds or we're already ready
      if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
        return;
      }

      // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
      if ( !document.body ) {
        return setTimeout( jQuery.ready, 1 );
      }

      // Remember that the DOM is ready
      jQuery.isReady = true;

      // If a normal DOM Ready event fired, decrement, and wait if need be
      if ( wait !== true && --jQuery.readyWait > 0 ) {
        return;
      }

      // If there are functions bound, to execute
      readyList.resolveWith( document, [ jQuery ] );

      // Trigger any bound ready events
      if ( jQuery.fn.trigger ) {
        jQuery( document ).trigger("ready").off("ready");
      }
    },

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function( obj ) {
      return jQuery.type(obj) === "function";
    },

    isArray: Array.isArray || function( obj ) {
      return jQuery.type(obj) === "array";
    },

    isWindow: function( obj ) {
      return obj != null && obj == obj.window;
    },

    isNumeric: function( obj ) {
      return !isNaN( parseFloat(obj) ) && isFinite( obj );
    },

    type: function( obj ) {
      return obj == null ?
        String( obj ) :
        class2type[ core_toString.call(obj) ] || "object";
    },

    isPlainObject: function( obj ) {
      // Must be an Object.
      // Because of IE, we also have to check the presence of the constructor property.
      // Make sure that DOM nodes and window objects don't pass through, as well
      if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
        return false;
      }

      try {
        // Not own constructor property must be Object
        if ( obj.constructor &&
          !core_hasOwn.call(obj, "constructor") &&
          !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
          return false;
        }
      } catch ( e ) {
        // IE8,9 Will throw exceptions on certain host objects #9897
        return false;
      }

      // Own properties are enumerated firstly, so to speed up,
      // if last one is own, then all properties are own.

      var key;
      for ( key in obj ) {}

      return key === undefined || core_hasOwn.call( obj, key );
    },

    isEmptyObject: function( obj ) {
      var name;
      for ( name in obj ) {
        return false;
      }
      return true;
    },

    error: function( msg ) {
      throw new Error( msg );
    },

    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // scripts (optional): If true, will include scripts passed in the html string
    parseHTML: function( data, context, scripts ) {
      var parsed;
      if ( !data || typeof data !== "string" ) {
        return null;
      }
      if ( typeof context === "boolean" ) {
        scripts = context;
        context = 0;
      }
      context = context || document;

      // Single tag
      if ( (parsed = rsingleTag.exec( data )) ) {
        return [ context.createElement( parsed[1] ) ];
      }

      parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
      return jQuery.merge( [],
        (parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
    },

    parseJSON: function( data ) {
      if ( !data || typeof data !== "string") {
        return null;
      }

      // Make sure leading/trailing whitespace is removed (IE can't handle it)
      data = jQuery.trim( data );

      // Attempt to parse using the native JSON parser first
      if ( window.JSON && window.JSON.parse ) {
        return window.JSON.parse( data );
      }

      // Make sure the incoming data is actual JSON
      // Logic borrowed from http://json.org/json2.js
      if ( rvalidchars.test( data.replace( rvalidescape, "@" )
        .replace( rvalidtokens, "]" )
        .replace( rvalidbraces, "")) ) {

        return ( new Function( "return " + data ) )();

      }
      jQuery.error( "Invalid JSON: " + data );
    },

    // Cross-browser xml parsing
    parseXML: function( data ) {
      var xml, tmp;
      if ( !data || typeof data !== "string" ) {
        return null;
      }
      try {
        if ( window.DOMParser ) { // Standard
          tmp = new DOMParser();
          xml = tmp.parseFromString( data , "text/xml" );
        } else { // IE
          xml = new ActiveXObject( "Microsoft.XMLDOM" );
          xml.async = "false";
          xml.loadXML( data );
        }
      } catch( e ) {
        xml = undefined;
      }
      if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
        jQuery.error( "Invalid XML: " + data );
      }
      return xml;
    },

    noop: function() {},

    // Evaluates a script in a global context
    // Workarounds based on findings by Jim Driscoll
    // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
    globalEval: function( data ) {
      if ( data && core_rnotwhite.test( data ) ) {
        // We use execScript on Internet Explorer
        // We use an anonymous function so that context is window
        // rather than jQuery in Firefox
        ( window.execScript || function( data ) {
          window[ "eval" ].call( window, data );
        } )( data );
      }
    },

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function( string ) {
      return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    },

    nodeName: function( elem, name ) {
      return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    },

    // args is for internal usage only
    each: function( obj, callback, args ) {
      var name,
        i = 0,
        length = obj.length,
        isObj = length === undefined || jQuery.isFunction( obj );

      if ( args ) {
        if ( isObj ) {
          for ( name in obj ) {
            if ( callback.apply( obj[ name ], args ) === false ) {
              break;
            }
          }
        } else {
          for ( ; i < length; ) {
            if ( callback.apply( obj[ i++ ], args ) === false ) {
              break;
            }
          }
        }

      // A special, fast, case for the most common use of each
      } else {
        if ( isObj ) {
          for ( name in obj ) {
            if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
              break;
            }
          }
        } else {
          for ( ; i < length; ) {
            if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
              break;
            }
          }
        }
      }

      return obj;
    },

    // Use native String.trim function wherever possible
    trim: function( text ) {
        return text == null ?
          "" :
          text.toString().replace( rtrim, "" );
      },

    // results is for internal usage only
    makeArray: function( arr, results ) {
      var type,
        ret = results || [];

      if ( arr != null ) {
        // The window, strings (and functions) also have 'length'
        // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
        type = jQuery.type( arr );

        if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
          core_push.call( ret, arr );
        } else {
          jQuery.merge( ret, arr );
        }
      }

      return ret;
    },

    inArray: function( elem, arr, i ) {
      var len;

      if ( arr ) {
        if ( core_indexOf ) {
          return core_indexOf.call( arr, elem, i );
        }

        len = arr.length;
        i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

        for ( ; i < len; i++ ) {
          // Skip accessing in sparse arrays
          if ( i in arr && arr[ i ] === elem ) {
            return i;
          }
        }
      }

      return -1;
    },

    merge: function( first, second ) {
      var l = second.length,
        i = first.length,
        j = 0;

      if ( typeof l === "number" ) {
        for ( ; j < l; j++ ) {
          first[ i++ ] = second[ j ];
        }

      } else {
        while ( second[j] !== undefined ) {
          first[ i++ ] = second[ j++ ];
        }
      }

      first.length = i;

      return first;
    },

    grep: function( elems, callback, inv ) {
      var retVal,
        ret = [],
        i = 0,
        length = elems.length;
      inv = !!inv;

      // Go through the array, only saving the items
      // that pass the validator function
      for ( ; i < length; i++ ) {
        retVal = !!callback( elems[ i ], i );
        if ( inv !== retVal ) {
          ret.push( elems[ i ] );
        }
      }

      return ret;
    },

    // arg is for internal usage only
    map: function( elems, callback, arg ) {
      var value, key,
        ret = [],
        i = 0,
        length = elems.length,
        // jquery objects are treated as arrays
        isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

      // Go through the array, translating each of the items to their
      if ( isArray ) {
        for ( ; i < length; i++ ) {
          value = callback( elems[ i ], i, arg );

          if ( value != null ) {
            ret[ ret.length ] = value;
          }
        }

      // Go through every key on the object,
      } else {
        for ( key in elems ) {
          value = callback( elems[ key ], key, arg );

          if ( value != null ) {
            ret[ ret.length ] = value;
          }
        }
      }

      // Flatten any nested arrays
      return ret.concat.apply( [], ret );
    },

    // A global GUID counter for objects
    guid: 1,

    // Bind a function to a context, optionally partially applying any
    // arguments.
    proxy: function( fn, context ) {
      var tmp, args, proxy;

      if ( typeof context === "string" ) {
        tmp = fn[ context ];
        context = fn;
        fn = tmp;
      }

      // Quick check to determine if target is callable, in the spec
      // this throws a TypeError, but we will just return undefined.
      if ( !jQuery.isFunction( fn ) ) {
        return undefined;
      }

      // Simulated bind
      args = core_slice.call( arguments, 2 );
      proxy = function() {
        return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
      };

      // Set the guid of unique handler to the same of original handler, so it can be removed
      proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

      return proxy;
    },

    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
      var exec,
        bulk = key == null,
        i = 0,
        length = elems.length;

      // Sets many values
      if ( key && typeof key === "object" ) {
        for ( i in key ) {
          jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
        }
        chainable = 1;

      // Sets one value
      } else if ( value !== undefined ) {
        // Optionally, function values get executed if exec is true
        exec = pass === undefined && jQuery.isFunction( value );

        if ( bulk ) {
          // Bulk operations only iterate when executing function values
          if ( exec ) {
            exec = fn;
            fn = function( elem, key, value ) {
              return exec.call( jQuery( elem ), value );
            };

          // Otherwise they run against the entire set
          } else {
            fn.call( elems, value );
            fn = null;
          }
        }

        if ( fn ) {
          for (; i < length; i++ ) {
            fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
          }
        }

        chainable = 1;
      }

      return chainable ?
        elems :

        // Gets
        bulk ?
          fn.call( elems ) :
          length ? fn( elems[0], key ) : emptyGet;
    },

    now: function() {
      return ( new Date() ).getTime();
    }
  });
}
(function() {
  var Bzip2;

  JellyScore.Utils = {
    base64: {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      decodeArrayBuffer: function(input) {
        var ab;
        ab = new ArrayBuffer(Math.ceil((3 * input.length) / 4.0));
        this.decode(input, ab);
        return ab;
      },
      decode: function(input, arrayBuffer) {
        var bytes, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i, j, lkey1, lkey2, uarray;
        lkey1 = this._keyStr.indexOf(input.charAt(input.length - 1));
        lkey2 = this._keyStr.indexOf(input.charAt(input.length - 1));
        bytes = Math.ceil((3 * input.length) / 4.0);
        if (lkey1 === 64) {
          --bytes;
        }
        if (lkey2 === 64) {
          --bytes;
        }
        uarray = new Uint8Array(arrayBuffer != null ? arrayBuffer : bytes);
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        i = 0;
        j = 0;
        while (i < bytes) {
          enc1 = this._keyStr.indexOf(input.charAt(j++));
          enc2 = this._keyStr.indexOf(input.charAt(j++));
          enc3 = this._keyStr.indexOf(input.charAt(j++));
          enc4 = this._keyStr.indexOf(input.charAt(j++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          uarray[i] = chr1;
          if (enc3 !== 64) {
            uarray[i + 1] = chr2;
          }
          if (enc4 !== 64) {
            uarray[i + 2] = chr3;
          }
          i += 3;
        }
        return uarray;
      }
    }
  };

  Bzip2 = (function() {
    var OrderedHuffmanTable, RBitfield, bwt_reverse, move_to_front_and_store;

    function Bzip2() {}

    RBitfield = (function() {

      function RBitfield(x) {
        var i;
        this.masks = [];
        i = -1;
        while (++i < 31) {
          this.masks[i] = (1 << i) - 1;
        }
        this.masks[31] = -0x80000000;
        this.f = x;
        this.bits = 0;
        this.bitfield = 0x0;
        this.count = 0;
      }

      RBitfield.prototype.readbits2 = function(n) {
        var n2;
        n2 = n >> 1;
        return this.readbits(n2) * (1 << n2) + this.readbits(n - n2);
      };

      RBitfield.prototype.readbits = function(n) {
        var m, r;
        while (this.bits < n) {
          this.bitfield = (this.bitfield << 8) + this.f[this.count++];
          this.bits += 8;
        }
        m = this.masks[n];
        r = (this.bitfield >> (this.bits - n)) & m;
        this.bits -= n;
        this.bitfield &= ~(m << this.bits);
        return r;
      };

      return RBitfield;

    })();

    OrderedHuffmanTable = (function() {
      var HuffmanLength;

      function OrderedHuffmanTable() {}

      HuffmanLength = function(code, bits) {
        this.code = code;
        this.bits = bits;
        return this.symbol = void 0;
      };

      OrderedHuffmanTable.prototype.process = function(lengths) {
        var b, bits, cb, code, endbits, finish, i, l, len, p, start, symbol, temp_bits, x, z, _i, _len, _ref,
          _this = this;
        len = lengths.length;
        z = [];
        i = 0;
        while (i < len) {
          z.push([i, lengths[i]]);
          ++i;
        }
        z.push([len, -1]);
        l = [];
        b = z[0];
        start = b[0];
        bits = b[1];
        p = 0;
        while (++p < z.length) {
          finish = z[p][0];
          endbits = z[p][1];
          if (bits) {
            code = start;
            while (code < finish) {
              l.push(new HuffmanLength(code, bits));
              ++code;
            }
          }
          start = finish;
          bits = endbits;
          if (endbits === -1) {
            break;
          }
        }
        l.sort(function(a, b) {
          return (a.bits - b.bits) || (a.code - b.code);
        });
        this.table = l;
        temp_bits = 0;
        symbol = -1;
        this.faht = [];
        cb = null;
        _ref = this.table;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          x = _ref[_i];
          symbol += 1;
          if (x.bits !== temp_bits) {
            symbol <<= x.bits - temp_bits;
            cb = this.faht[temp_bits = x.bits] = {};
          }
          cb[x.symbol = symbol] = x;
        }
        this.min_bits = 16;
        this.max_bits = -1;
        return this.table.forEach((function(x) {
          if (x.bits < _this.min_bits) {
            _this.min_bits = x.bits;
          }
          if (x.bits > _this.max_bits) {
            return _this.max_bits = x.bits;
          }
        }), this);
      };

      return OrderedHuffmanTable;

    })();

    move_to_front_and_store = function(a, c, buff) {
      var v;
      v = a[c];
      for (var i = c; i > 0; a[i] = a[--i]);;

      return buff.push(a[0] = v);
    };

    bwt_reverse = function(src, primary) {
      var A, first, i, len, links, ret, start;
      len = src.length;
      if (primary < 0 || primary >= len) {
        throw RangeError("Out of bound");
      }
      A = src;
      src = src.join('');
      A.sort();
      start = {};
      for (var i = len-1; i >= 0; i--) start[A[i]] = i;;

      links = [];
      for (i = 0; i < len; i++) links.push(start[src[i]]++);;

      i = primary;
      first = A[i];
      ret = [];
      for (var j = 1; j < len; j++) {
            ret.push(A[i = links[i]]);
        };

      return first + ret.reverse().join('');
    };

    Bzip2.prototype.decode = function(input) {
      var b, blocksize, getUsedCharTable, main, method, out, zeroSix;
      b = new RBitfield(input);
      b.readbits(16);
      method = b.readbits(8);
      if (method !== 104) {
        throw "Unknown (not type 'h'uffman Bzip2) compression method";
      }
      blocksize = b.readbits(8);
      if ((49 <= blocksize && blocksize <= 57)) {
        blocksize -= 48;
      } else {
        throw "Unknown (not size '1'-'9') Bzip2 blocksize";
      }
      getUsedCharTable = function(b) {
        var a = [];
            var used_groups = b.readbits(16);
            for (var m1 = 1 << 15; m1 > 0; m1 >>= 1) {
                if (!(used_groups & m1)) {
                    for (var i = 0; i < 16; i++) a.push(false);
                    continue;
                }
                var used_chars = b.readbits(16);
                for (var m2 = 1 << 15; m2 > 0; m2 >>= 1) {
                    a.push( Boolean(used_chars & m2) );
                }
            };
        return a;
      };
      out = [];
      zeroSix = [0, 1, 2, 3, 4, 5, 6];
      main = function() {
        var bb, blocktype, buffer, c, codes, crc, decoded, done, favourites, groups_lengths, huffman_groups, i, j, len, length, lengths, mtf, nt, pointer, r, rep, repeat, repeat_power, selector_pointer, selectors_list, selectors_used, symbols_in_use, t, tables, used, v, _i, _j, _k, _l, _len, _len1, _m, _ref, _results;
        _results = [];
        while (true) {
          blocktype = b.readbits2(48);
          crc = b.readbits2(32);
          if (blocktype === 0x314159265359) {
            if (b.readbits(1)) {
              throw "Bzip2 randomised support not implemented";
            }
            pointer = b.readbits(24);
            used = getUsedCharTable(b);
            huffman_groups = b.readbits(3);
            if (2 > huffman_groups || huffman_groups > 6) {
              throw RangeError("Bzip2: Number of Huffman groups not in range 2..6");
            }
            mtf = zeroSix.slice(0, huffman_groups);
            selectors_list = [];
            i = 0;
            selectors_used = b.readbits(15);
            while (i++ < selectors_used) {
              c = 0;
              while (b.readbits(1)) {
                if (c++ >= huffman_groups) {
                  throw RangeError("More than max (" + huffman_groups + ") groups");
                }
              }
              move_to_front_and_store(mtf, c, selectors_list);
            }
            groups_lengths = [];
            symbols_in_use = 2;
            if (typeof used.reduce === "function") {
              symbols_in_use += used.reduce((function(a, b) {
                return a + b;
              }), 0);
            } else {
              for (_i = 0, _len = used.length; _i < _len; _i++) {
                i = used[_i];
                if (i) {
                  ++symbols_in_use;
                }
              }
            }
            for (j = _j = 0; 0 <= huffman_groups ? _j < huffman_groups : _j > huffman_groups; j = 0 <= huffman_groups ? ++_j : --_j) {
              length = b.readbits(5);
              lengths = [];
              for (i = _k = 0; 0 <= symbols_in_use ? _k < symbols_in_use : _k > symbols_in_use; i = 0 <= symbols_in_use ? ++_k : --_k) {
                if (length < 0 || length > 20) {
                  throw RangeError("Bzip2 Huffman length code outside range 0..20");
                }
                while (b.readbits(1)) {
                  length -= (b.readbits(1) * 2) - 1;
                }
                lengths.push(length);
              }
              groups_lengths.push(lengths);
            }
            tables = [];
            for (_l = 0, _len1 = groups_lengths.length; _l < _len1; _l++) {
              lengths = groups_lengths[_l];
              codes = new OrderedHuffmanTable();
              codes.process(lengths);
              tables.push(codes);
            }
            favourites = [];
            for (c = _m = _ref = used.length - 1; _ref <= 0 ? _m <= 0 : _m >= 0; c = _ref <= 0 ? ++_m : --_m) {
              if (used[c]) {
                favourites.push(String.fromCharCode(c));
              }
            }
            favourites.reverse();
            selector_pointer = 0;
            decoded = 0;
            repeat = 0;
            repeat_power = 0;
            buffer = [];
            t = null;
            r = null;
            while (true) {
              if (--decoded <= 0) {
                decoded = 50;
                if (selector_pointer <= selectors_list.length) {
                  t = tables[selectors_list[selector_pointer++]];
                }
              }
              for (bb in t.faht) {
                if (b.bits < bb) {
                  b.bitfield = (b.bitfield << 8) + b.f[b.count++];
                  b.bits += 8;
                }
                if (r = t.faht[bb][b.bitfield >> (b.bits - bb)]) {
                  b.bitfield &= b.masks[b.bits -= bb];
                  r = r.code;
                  break;
                }
              }
              if ((0 <= r && r <= 1)) {
                if (repeat === 0) {
                  repeat_power = 1;
                }
                repeat += repeat_power << r;
                repeat_power <<= 1;
                continue;
              } else {
                v = favourites[0];
                while (repeat > 0) {
                  buffer.push(v);
                  --repeat;
                }
              }
              if (r === symbols_in_use - 1) {
                break;
              } else {
                move_to_front_and_store(favourites, r - 1, buffer);
              }
            }
            nt = bwt_reverse(buffer, pointer);
            done = [];
            i = 0;
            len = nt.length;
            while (i < len) {
              c = nt.charCodeAt(i);
              if (i < len - 4 && nt.charCodeAt(i + 1) === c && nt.charCodeAt(i + 2) === c && nt.charCodeAt(i + 3) === c) {
                c = nt.charAt(i);
                rep = nt.charCodeAt(i + 4) + 4;
                while (rep > 0) {
                  done.push(c);
                  --rep;
                }
                i += 5;
              } else {
                done.push(nt[i++]);
              }
            }
            _results.push(out.push(done.join('')));
          } else if (blocktype === 0x177245385090) {
            b.readbits(b.bits & 0x7);
            break;
          } else {
            throw "Illegal Bzip2 blocktype = 0x" + blocktype.toString(16);
          }
        }
        return _results;
      };
      main();
      return out.join('');
    };

    return Bzip2;

  })();

  JellyScore.Utils.bzip2 = new Bzip2();

}).call(this);

JS.Drawings.isPosition = function(pos) {
    return typeof pos === "object" && typeof pos.x === "number" && typeof pos.y === "number";
}

JS.Drawings.drawPaths = function(paths, ctx, pos, settings) {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    for (var i = 0, l = paths.length ; i < l ; ++i) {
        var path = paths[i];
        switch (path.length) {
            case 2:
                ctx.moveTo(path[0] * settings.scale + pos.x, path[1] * settings.scale + pos.y);
                break;
            case 3:
                ctx.lineTo(path[0] * settings.scale + pos.x, path[1] * settings.scale + pos.y);
                break;
            case 6:
                ctx.bezierCurveTo(path[0] * settings.scale + pos.x, path[1] * settings.scale + pos.y, 
                                  path[2] * settings.scale + pos.x, path[3] * settings.scale + pos.y, 
                                  path[4] * settings.scale + pos.x, path[5] * settings.scale + pos.y);
                break;
        }
    }
    ctx.fill();
}

JS.Drawings.strokePaths = function(paths, ctx, pos, settings) {
    ctx.save();
    ctx.lineWidth *= 1 + Math.floor(settings.scale / 2) * 2;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    for (var i = 0, l = paths.length ; i < l ; ++i) {
        var path = paths[i];
        switch (path.length) {
            case 2:
                ctx.moveTo(path[0] * settings.scale + pos.x, path[1] * settings.scale + pos.y);
                break;
            case 3:
                ctx.lineTo(path[0] * settings.scale + pos.x, path[1] * settings.scale + pos.y);
                break;
            case 6:
                ctx.bezierCurveTo(path[0] * settings.scale + pos.x, path[1] * settings.scale + pos.y, 
                                  path[2] * settings.scale + pos.x, path[3] * settings.scale + pos.y, 
                                  path[4] * settings.scale + pos.x, path[5] * settings.scale + pos.y);
                break;
        }
    }
    ctx.stroke();
    ctx.restore();
}

JS.Drawings.drawStaff = function(ctx, pos, opt) {
    if (ctx !== null && JS.Drawings.isPosition(pos)){
        // Staff default settings
        var settings = {
            'width': 200,
            'height': 50,
            'scale': 1.0,
            'lineCap': 'round'
        };

        // Overing default settings with options
        jQuery.extend(settings, opt);
        settings.paddingTop = 15.5
        // Scalling settings
        ctx.save();
        ctx.lineWidth *= 1 + Math.floor(settings.scale / 2) * 2;
        ctx.lineCap = settings.lineCap;
        //settings.width *= settings.scale;
        settings.height *= settings.scale;
        settings.paddingTop *= settings.scale;
        
        var space = settings.height / 6.8;
        
        // Start drawing
        ctx.beginPath();
        for (var i = 0 ; i < 5 ; i++) {
            ctx.moveTo(pos.x + ctx.lineWidth / 2, 0.5 + Math.round(settings.paddingTop + pos.y + i * space - ctx.lineWidth / 2));
            ctx.lineTo(pos.x + settings.width, 0.5 + Math.round(settings.paddingTop + pos.y + i * space - ctx.lineWidth / 2));
        }
        ctx.stroke();
        ctx.restore();
    }
};

JS.Drawings.drawTabStaff = function(ctx, pos, opt) {
    if (ctx !== null && JS.Drawings.isPosition(pos)){
        // Staff default settings
        var settings = {
            'width': 200,
            'height': 80,
            'scale': 1.0,
            'lineCap': 'round',
            'lines': 6
        };
        // Overing default settings with options
        jQuery.extend(settings, opt);
        settings.paddingTop = 15.5
        
        // Scalling settings
        ctx.save();
        ctx.lineWidth *= 1 + Math.floor(settings.scale / 2) * 2;
        ctx.lineCap = settings.lineCap;
        settings.height *= settings.scale;
        settings.paddingTop *= settings.scale;
        
        var space = settings.height / 6.8;
        
        // Start drawing
        ctx.beginPath();
        for (var i = 0 ; i < settings.lines ; i++){
            ctx.moveTo(pos.x + ctx.lineWidth / 2, 0.5 + Math.round(settings.paddingTop + pos.y + i * space - ctx.lineWidth / 2));
            ctx.lineTo(pos.x + settings.width, 0.5 + Math.round(settings.paddingTop + pos.y + i * space - ctx.lineWidth / 2));
        }
        ctx.stroke();
        ctx.restore();
    }
};

JS.Drawings.drawBarSeparator = function() {
    // Bar separator default settings
    var settings = {
        'scale': 1.0,
        'lines': 5,
        'paddingTop': 15
    };
    var space = 7.353;

    return function(ctx, pos, opt) {
        if (ctx !== null && JS.Drawings.isPosition(pos)){
            // Overing default settings with options
            jQuery.extend(settings, opt);
            var yMax = settings.paddingTop + space * (settings.lines - 1);

            var paths = [
                [ 0.00, yMax],
                [ 1.38, yMax, 'L'],
                [ 1.38, settings.paddingTop, 'L'],
                [ 0.00, settings.paddingTop, 'L'],
                [ 0.00, yMax, 'L']
            ];
            // Start drawing
            JS.Drawings.drawPaths(paths, ctx, pos, settings);
        }
    };
}();

JS.Drawings.drawSeparatorFromTo = function() {
    // Bar separator default settings
    var settings = {
        'scale': 1.0,
        'yMin': 0,
        'height': 60,
        'paddingTop': 15,
        'lines': 5,
        'paddingBottom': 7.700
    };
    return function(ctx, pos, opt) {
        if (ctx !== null && JS.Drawings.isPosition(pos)){
            // Overing default settings with options
            jQuery.extend(settings, opt);

            var yMin = settings.paddingTop * settings.scale - settings.yMin;
            var yMax = yMin + settings.height;

            var paths = [
                [ 0.00, yMax],
                [ 1.11 * settings.scale, yMax, 'L'],
                [ 1.11 * settings.scale, yMin, 'L'],
                [ 0.00, yMin, 'L'],
                [ 0.00, yMax, 'L']
            ];

            settings.scale = 1.0;
            // Start drawing
             
            ctx.save();
            ctx.lineCap = "butt";
            JS.Drawings.drawPaths(paths, ctx, pos, settings);
            ctx.restore();
        }
    };
}();

JS.Drawings.drawLargeSeparatorFromTo = function() {
    // Bar separator default settings
    var settings = {
        'scale': 1.0,
        'yMin': 0,
        'height': 60,
        'paddingTop': 15,
        'lines': 5,
        'paddingBottom': 7.700
    };

    return function(ctx, pos, opt) {
        if (ctx !== null && JS.Drawings.isPosition(pos)){
            
            // Overing default settings with options
            jQuery.extend(settings, opt);

            var yMin = settings.paddingTop * settings.scale - settings.yMin;
            var yMax = yMin + settings.height;

            var paths = [
                [ 0.00, yMax],
                [ 4.44 * settings.scale, yMax, 'L'],
                [ 4.44 * settings.scale, yMin, 'L'],
                [ 0.00, yMin, 'L'],
                [ 0.00, yMax, 'L']
            ];

            settings.scale = 1.0;
            // Start drawing
             
            ctx.save();
            ctx.lineCap = "butt";
            JS.Drawings.drawPaths(paths, ctx, pos, settings);
            ctx.restore();
        }
    };
}();

JS.Drawings.drawAlternative = function() {
    var settings = {
        'scale': 1.0
    };
    return function(ctx, from, to, opt) {
        if (ctx !== null && JS.Drawings.isPosition(from) && JS.Drawings.isPosition(to)){
            // Overing default settings with options
            jQuery.extend(settings, opt);

            var w  = (ctx.lineWidth * (1 + Math.floor(settings.scale / 2) * 2)) / (settings.scale * 2);

            var paths = [
                [((from.x - to.x) / settings.scale) + w, 10 + w], 
                [((from.x - to.x) / settings.scale) + w,+w, 'L'], 
                [-w,  +w, 'L']
            ];

            // Start drawing
            JS.Drawings.strokePaths(paths, ctx, to, settings);
        }
    };
}();


JS.Drawings.functionBuilder = function(paths) {
    var settings = {
        'scale': 1.0,
        'color': "black"
    };
    var cache = {};
    var p = {x: 0, y: 0};
    var maxX = 0, maxY = 0;
    for (var i = 0, l = paths.length, path = null ; i < l && (path = paths[i]) ; ++i) {
        if (path[0] < p.x) {
            p.x = path[0];
        }
        else if (path[0] > maxX) {
            maxX = path[0];
        }
        if (path[1] < p.y) {
            p.y = path[1];
        }
        else if (path[1] > maxY) {
            maxY = path[1];
        }
    }
    p.x = -p.x;
    p.y = -p.y;
    maxX += p.x;
    maxY += p.y;
    return function(ctx, pos, opt) {
        if (ctx !== null && JS.Drawings.isPosition(pos)) {
            // Overing default settings with options
            jQuery.extend(settings, opt);
            var pScale = {
                x: p.x * settings.scale,
                y: p.y * settings.scale
            };

            var h = "" + settings.scale + settings.color;
            if (typeof cache[h] === "undefined") {
                if (ctx.I_AM_NOT_REAL === true) {
                    cache[h] = ctx.startCaching();
                    ctx.strokeStyle = ctx.strokeStyle;
                    ctx.fillStyle = ctx.fillStyle;
                    JS.Drawings.drawPaths(paths, ctx, pScale, settings);
                    ctx.stopCaching(cache[h]);
                }
                else if (typeof document !== "undefined" && document !== null) {
                    var canvas, ctxCache;
                    canvas = document.createElement("canvas");
                    canvas.setAttribute('width', 2 * maxX * settings.scale);
                    canvas.setAttribute('height', 2 * maxY * settings.scale);
                    ctxCache = canvas.getContext('2d');
                    ctxCache.strokeStyle = ctx.strokeStyle;
                    ctxCache.fillStyle = ctx.fillStyle;
                    cache[h] = canvas;
                    JS.Drawings.drawPaths(paths, ctxCache, pScale, settings);
                }
            }
            if (ctx.I_AM_NOT_REAL === true || (typeof document !== "undefined" && document !== null)) {
                ctx.drawImage(cache[h], pos.x - pScale.x, pos.y - pScale.y);
            }
            else {
                JS.Drawings.drawPaths(paths, ctx, pos, settings);
            }
        }
    };
};
/**********************************/
/*  Accidental drawing functions  */
/*								  */
/*   space between 2 lines 14.9   */
/**********************************/

function drawCommonTime(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Common time default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 3.98, 29.77],
			[ 3.98, 31.25, 'L'],
			[ 3.98, 34.54,  4.19, 36.66,  7.27, 36.69],
			[ 9.60, 36.69, 11.31, 34.65, 11.86, 32.30],
			[11.92, 32.10, 12.07, 32.01, 12.21, 32.01],
			[12.38, 32.01, 12.59, 32.15, 12.59, 32.36],
			[12.59, 32.94, 11.16, 37.42,  7.27, 37.42],
			[ 3.81, 37.42,  0.00, 35.56,  0.00, 29.77],
			[ 0.00, 25.41,  2.35, 22.15,  7.27, 22.15],
			[10.67, 22.15, 12.39, 25.26, 12.39, 26.89],
			[12.39, 28.02, 11.49, 28.98, 10.44, 28.98],
			[ 9.68, 28.98,  8.26, 28.40,  8.26, 26.80],
			[ 8.26, 25.70,  9.04, 24.56, 10.35, 24.56],
			[10.50, 24.56, 10.61, 24.59, 10.76, 24.59],
			[ 9.94, 23.55,  8.66, 22.88,  7.27, 22.88],
			[ 4.19, 22.88,  3.98, 25.00,  3.98, 28.29],
			[ 3.98, 29.77, 'L']
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawCutCommonTime(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Cut common time default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 8.26, 26.80],
			[ 8.26, 25.70,  9.04, 24.56, 10.35, 24.56],
			[10.50, 24.56, 10.61, 24.59, 10.76, 24.59],
			[ 9.94, 23.55,  8.66, 22.88,  7.27, 22.88],
			[ 6.89, 22.88, 'L'],
			[ 6.89, 36.66, 'L'],
			[ 7.04, 36.66,  7.15, 36.69,  7.27, 36.69],
			[ 9.60, 36.69, 11.31, 34.65, 11.86, 32.30],
			[11.92, 32.10, 12.07, 32.01, 12.21, 32.01],
			[12.39, 32.01, 12.59, 32.15, 12.59, 32.36],
			[12.59, 32.94, 11.17, 37.42,  7.27, 37.42],
			[ 7.15, 37.42,  7.04, 37.39,  6.89, 37.39],
			[ 6.89, 39.66, 'L'],
			[ 6.89, 39.83,  6.77, 39.95,  6.60, 39.95],
			[ 6.11, 39.95, 'L'],
			[ 5.93, 39.95,  5.81, 39.83,  5.81, 39.66],
			[ 5.81, 37.30, 'L'],
			[ 1.63, 36.63,  0.00, 33.40,  0.00, 29.77],
			[ 0.00, 26.13,  1.60, 22.91,  5.81, 22.24],
			[ 5.81, 19.88, 'L'],
			[ 5.81, 19.71,  5.93, 19.59,  6.11, 19.59],
			[ 6.60, 19.59, 'L'],
			[ 6.77, 19.59,  6.89, 19.71,  6.89, 19.88],
			[ 6.89, 22.15, 'L'],
			[ 7.27, 22.15, 'L'],
			[10.67, 22.15, 12.39, 25.26, 12.39, 26.89],
			[12.39, 28.02, 11.49, 28.98, 10.44, 28.98],
			[ 9.68, 28.98,  8.26, 28.40,  8.26, 26.80],
			[ 5.81, 23.08],
			[ 4.13, 23.72,  3.98, 25.64,  3.98, 28.29],
			[ 3.98, 29.77, 'L'],
			[ 3.98, 31.25, 'L'],
			[ 3.98, 33.90,  4.13, 35.82,  5.81, 36.46],
			[ 5.81, 23.08, 'L']
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawZero(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Zero default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 5.23, 15.08],
			[ 6.28, 14.94,  7.25, 15.21,  8.14, 15.89],
			[ 9.03, 16.57,  9.70, 17.43, 10.15, 18.48],
			[10.71, 19.74, 10.98, 21.10, 10.95, 22.56],
			[10.92, 24.03, 10.59, 25.37,  9.97, 26.59],
			[ 9.08, 28.37,  7.82, 29.37,  6.19, 29.59],
			[ 4.99, 29.74,  3.91, 29.45,  2.97, 28.71],
			[ 2.02, 27.98,  1.32, 27.01,  0.87, 25.81],
			[ 0.00, 23.54,  0.00, 21.22,  0.87, 18.86],
			[ 1.24, 17.83,  1.80, 16.98,  2.56, 16.30],
			[ 3.31, 15.62,  4.21, 15.21,  5.23, 15.08],
			[ 5.41, 15.92],
			[ 4.59, 16.02,  4.05, 16.81,  3.78, 18.31],
			[ 3.70, 18.71,  3.65, 19.12,  3.63, 19.53],
			[ 3.61, 19.93,  3.61, 20.47,  3.63, 21.12],
			[ 3.65, 21.78,  3.66, 22.19,  3.66, 22.35],
			[ 3.66, 22.58,  3.66, 22.91,  3.65, 23.34],
			[ 3.64, 23.76,  3.63, 24.11,  3.63, 24.37],
			[ 3.63, 24.63,  3.64, 24.94,  3.66, 25.31],
			[ 3.68, 25.68,  3.72, 26.02,  3.78, 26.33],
			[ 3.90, 27.07,  4.10, 27.67,  4.39, 28.15],
			[ 4.68, 28.62,  5.14, 28.83,  5.76, 28.77],
			[ 6.59, 28.69,  7.14, 27.90,  7.41, 26.39],
			[ 7.49, 25.98,  7.54, 25.57,  7.56, 25.17],
			[ 7.58, 24.76,  7.58, 24.23,  7.56, 23.57],
			[ 7.54, 22.91,  7.53, 22.50,  7.53, 22.35],
			[ 7.53, 22.11,  7.53, 21.78,  7.54, 21.36],
			[ 7.55, 20.93,  7.56, 20.58,  7.56, 20.31],
			[ 7.56, 20.04,  7.55, 19.72,  7.53, 19.35],
			[ 7.51, 18.98,  7.47, 18.64,  7.41, 18.33],
			[ 7.12, 16.59,  6.45, 15.79,  5.41, 15.92]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawOne(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// One default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 3.57, 14.98],
			[ 3.66, 14.94,  3.78, 14.95,  3.93, 15.00],
			[ 4.07, 15.04,  4.23, 15.11,  4.41, 15.20],
			[ 4.58, 15.29,  4.71, 15.34,  4.79, 15.36],
			[ 5.12, 15.44,  5.62, 15.34,  6.30, 15.07],
			[ 6.49, 14.97,  6.65, 15.01,  6.76, 15.18],
			[ 6.82, 15.28,  6.85, 15.58,  6.85, 16.09],
			[ 6.85, 18.18, 'L'],
			[ 6.85, 26.09, 'L'],
			[ 6.85, 27.37,  7.29, 28.24,  8.16, 28.70],
			[ 8.37, 28.80,  8.59, 28.86,  8.80, 28.88],
			[ 8.97, 28.88, 'L'],
			[ 9.07, 28.90,  9.14, 28.93,  9.18, 28.97],
			[ 9.27, 29.02,  9.32, 29.12,  9.31, 29.26],
			[ 9.30, 29.39,  9.24, 29.49,  9.15, 29.55],
			[ 9.07, 29.59,  8.71, 29.58,  8.07, 29.52],
			[ 7.86, 29.50,  7.46, 29.44,  6.88, 29.36],
			[ 6.30, 29.27,  5.84, 29.22,  5.51, 29.20],
			[ 5.09, 29.18,  4.48, 29.22,  3.70, 29.33],
			[ 2.91, 29.44,  2.44, 29.50,  2.29, 29.52],
			[ 1.59, 29.60,  1.19, 29.59,  1.09, 29.49],
			[ 0.90, 29.26,  0.93, 29.07,  1.18, 28.94],
			[ 1.26, 28.90,  1.38, 28.87,  1.56, 28.85],
			[ 1.73, 28.83,  1.86, 28.81,  1.94, 28.79],
			[ 2.52, 28.60,  2.96, 28.13,  3.25, 27.40],
			[ 3.40, 26.95,  3.48, 26.09,  3.48, 24.81],
			[ 3.48, 20.86, 'L'],
			[ 3.48, 19.40, 'L'],
			[ 3.48, 19.03,  3.43, 18.79,  3.33, 18.67],
			[ 3.04, 18.34,  2.76, 18.50,  2.49, 19.14],
			[ 2.39, 19.35,  1.93, 20.35,  1.09, 22.13],
			[ 0.67, 22.93,  0.33, 23.12,  0.08, 22.71],
			[ 0.00, 22.58,  0.03, 22.38,  0.16, 22.10],
			[ 0.69, 20.94, 'L'],
			[ 2.81, 16.46, 'L'],
			[ 3.00, 16.10,  3.17, 15.74,  3.30, 15.39],
			[ 3.44, 15.14,  3.53, 15.00,  3.57, 14.98]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawTwo(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// One default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 3.05, 25.71],
			[ 4.14, 25.55,  5.16, 25.74,  6.11, 26.26],
			[ 6.24, 26.34,  6.48, 26.48,  6.82, 26.68],
			[ 7.16, 26.89,  7.40, 27.02,  7.54, 27.09],
			[ 7.69, 27.16,  7.95, 27.24,  8.32, 27.34],
			[ 8.68, 27.43,  8.96, 27.43,  9.16, 27.31],
			[ 9.47, 27.25,  9.71, 27.09,  9.89, 26.81],
			[ 9.90, 26.80,  9.94, 26.72,  9.99, 26.58],
			[10.04, 26.45, 10.09, 26.36, 10.15, 26.32],
			[10.28, 26.24, 10.41, 26.24, 10.52, 26.32],
			[10.64, 26.40, 10.69, 26.51, 10.67, 26.67],
			[10.59, 27.04, 10.41, 27.44, 10.12, 27.89],
			[ 9.59, 28.67,  8.85, 29.20,  7.89, 29.49],
			[ 6.93, 29.78,  6.02, 29.74,  5.15, 29.37],
			[ 4.72, 29.16,  4.40, 28.96,  4.19, 28.76],
			[ 4.13, 28.72,  4.04, 28.64,  3.92, 28.51],
			[ 3.81, 28.39,  3.72, 28.30,  3.65, 28.24],
			[ 3.58, 28.18,  3.49, 28.11,  3.39, 28.04],
			[ 3.28, 27.96,  3.17, 27.90,  3.07, 27.86],
			[ 2.96, 27.82,  2.84, 27.79,  2.70, 27.77],
			[ 2.34, 27.72,  1.98, 27.78,  1.63, 27.96],
			[ 1.28, 28.15,  1.02, 28.40,  0.84, 28.73],
			[ 0.80, 28.81,  0.77, 28.94,  0.74, 29.13],
			[ 0.71, 29.31,  0.67, 29.44,  0.61, 29.52],
			[ 0.55, 29.61,  0.46, 29.66,  0.32, 29.65],
			[ 0.18, 29.64,  0.09, 29.59,  0.03, 29.49],
			[ 0.01, 29.37,  0.00, 29.29,  0.00, 29.23],
			[ 0.00, 29.17,  0.01, 29.07,  0.04, 28.92],
			[ 0.07, 28.78,  0.09, 28.68,  0.09, 28.65],
			[ 0.24, 27.85,  0.62, 27.09,  1.22, 26.38],
			[ 1.63, 25.89,  2.31, 25.31,  3.26, 24.63],
			[ 4.21, 23.95,  5.00, 23.28,  5.63, 22.60],
			[ 6.26, 21.92,  6.65, 21.13,  6.80, 20.22],
			[ 7.04, 18.70,  6.83, 17.49,  6.19, 16.58],
			[ 5.88, 16.13,  5.46, 15.87,  4.93, 15.80],
			[ 4.39, 15.72,  3.93, 15.88,  3.55, 16.29],
			[ 3.31, 16.68,  3.26, 16.98,  3.39, 17.19],
			[ 3.51, 17.40,  3.71, 17.69,  3.97, 18.06],
			[ 4.23, 18.43,  4.35, 18.74,  4.33, 18.99],
			[ 4.29, 19.65,  4.00, 20.16,  3.45, 20.51],
			[ 2.89, 20.85,  2.31, 20.94,  1.70, 20.75],
			[ 1.09, 20.57,  0.68, 20.16,  0.47, 19.52],
			[ 0.15, 18.61,  0.31, 17.75,  0.93, 16.96],
			[ 1.55, 16.16,  2.34, 15.62,  3.31, 15.33],
			[ 4.55, 14.94,  5.88, 15.02,  7.28, 15.55],
			[ 8.69, 16.08,  9.60, 16.94, 10.03, 18.12],
			[10.30, 18.88, 10.30, 19.80, 10.03, 20.88],
			[ 9.80, 21.72,  9.27, 22.43,  8.46, 23.03],
			[ 8.19, 23.23,  7.88, 23.42,  7.54, 23.62],
			[ 7.21, 23.81,  6.92, 23.95,  6.69, 24.05],
			[ 6.45, 24.15,  6.11, 24.29,  5.67, 24.47],
			[ 5.22, 24.66,  4.91, 24.79,  4.74, 24.87],
			[ 3.92, 25.20,  3.36, 25.48,  3.05, 25.71]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawThree(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Three default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 4.04, 14.96],
			[ 4.29, 14.94,  4.65, 14.95,  5.11, 14.99],
			[ 7.11, 15.11,  8.41, 15.74,  9.01, 16.88],
			[ 9.41, 17.64,  9.48, 18.58,  9.21, 19.70],
			[ 9.11, 20.20,  8.90, 20.60,  8.57, 20.89],
			[ 8.53, 20.93,  8.42, 21.01,  8.22, 21.11],
			[ 8.03, 21.22,  7.89, 21.32,  7.82, 21.43],
			[ 7.74, 21.54,  7.70, 21.68,  7.70, 21.85],
			[ 7.72, 22.01,  7.78, 22.14,  7.87, 22.25],
			[ 7.97, 22.35,  8.11, 22.45,  8.30, 22.55],
			[ 8.48, 22.65,  8.60, 22.72,  8.66, 22.75],
			[ 9.07, 23.04,  9.37, 23.47,  9.56, 24.03],
			[ 9.70, 24.42,  9.76, 24.86,  9.76, 25.34],
			[ 9.76, 25.86,  9.70, 26.33,  9.56, 26.74],
			[ 9.25, 27.63,  8.66, 28.30,  7.80, 28.74],
			[ 6.94, 29.19,  5.98, 29.44,  4.94, 29.50],
			[ 3.15, 29.57,  1.80, 29.12,  0.87, 28.13],
			[ 0.50, 27.75,  0.25, 27.28,  0.13, 26.75],
			[ 0.00, 26.22,  0.07, 25.71,  0.34, 25.22],
			[ 0.75, 24.57,  1.36, 24.27,  2.18, 24.32],
			[ 2.99, 24.38,  3.52, 24.79,  3.77, 25.55],
			[ 3.93, 26.07,  3.90, 26.46,  3.69, 26.71],
			[ 3.63, 26.76,  3.51, 26.86,  3.32, 26.98],
			[ 3.14, 27.11,  2.99, 27.24,  2.89, 27.36],
			[ 2.78, 27.49,  2.73, 27.63,  2.73, 27.78],
			[ 2.73, 28.17,  2.98, 28.46,  3.48, 28.66],
			[ 4.43, 29.00,  5.15, 28.90,  5.63, 28.34],
			[ 6.04, 27.85,  6.28, 27.16,  6.36, 26.27],
			[ 6.44, 25.38,  6.43, 24.63,  6.33, 24.03],
			[ 6.29, 23.12,  6.03, 22.56,  5.55, 22.35],
			[ 5.37, 22.27,  5.04, 22.23,  4.56, 22.23],
			[ 3.08, 22.23, 'L'],
			[ 2.55, 22.23,  2.26, 22.11,  2.20, 21.88],
			[ 2.19, 21.76,  2.19, 21.67,  2.23, 21.59],
			[ 2.27, 21.51,  2.34, 21.46,  2.45, 21.43],
			[ 2.56, 21.40,  2.64, 21.39,  2.70, 21.39],
			[ 2.76, 21.39,  2.85, 21.39,  2.99, 21.39],
			[ 4.59, 21.39, 'L'],
			[ 5.09, 21.39,  5.45, 21.33,  5.66, 21.21],
			[ 5.99, 21.00,  6.20, 20.62,  6.27, 20.08],
			[ 6.49, 18.97,  6.48, 17.98,  6.25, 17.08],
			[ 6.07, 16.44,  5.70, 16.00,  5.13, 15.76],
			[ 4.55, 15.52,  3.97, 15.53,  3.37, 15.81],
			[ 3.21, 15.88,  3.10, 15.95,  3.02, 16.01],
			[ 2.92, 16.11,  2.85, 16.18,  2.81, 16.24],
			[ 2.72, 16.53,  2.71, 16.73,  2.79, 16.84],
			[ 2.86, 16.94,  3.02, 17.09,  3.27, 17.27],
			[ 3.51, 17.46,  3.66, 17.61,  3.72, 17.72],
			[ 3.89, 18.07,  3.84, 18.44,  3.56, 18.83],
			[ 3.28, 19.22,  2.94, 19.47,  2.55, 19.58],
			[ 2.11, 19.72,  1.68, 19.67,  1.27, 19.42],
			[ 0.87, 19.18,  0.61, 18.84,  0.49, 18.39],
			[ 0.35, 17.97,  0.41, 17.47,  0.66, 16.91],
			[ 1.13, 15.84,  2.25, 15.19,  4.04, 14.96]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawFour(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Four default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 5.80, 25.88],
			[ 1.67, 25.88, 'L'],
			[ 1.63, 25.88,  1.53, 25.89,  1.38, 25.90],
			[ 1.22, 25.91,  1.10, 25.91,  1.01, 25.90],
			[ 0.93, 25.89,  0.82, 25.88,  0.69, 25.87],
			[ 0.57, 25.86,  0.46, 25.83,  0.37, 25.77],
			[ 0.29, 25.71,  0.21, 25.64,  0.16, 25.56],
			[ 0.00, 25.33,  0.07, 25.05,  0.36, 24.72],
			[ 0.82, 24.12,  1.14, 23.69,  1.32, 23.44],
			[ 2.60, 21.64,  3.44, 19.79,  3.85, 17.89],
			[ 4.00, 17.21,  4.08, 16.55,  4.08, 15.91],
			[ 4.08, 15.45,  4.15, 15.17,  4.28, 15.07],
			[ 4.38, 14.99,  4.55, 14.99,  4.81, 15.07],
			[ 5.19, 15.18,  5.53, 15.26,  5.82, 15.30],
			[ 5.90, 15.38,  6.15, 15.39,  6.58, 15.34],
			[ 7.01, 15.30,  7.25, 15.27,  7.31, 15.27],
			[ 7.37, 15.27,  7.60, 15.23,  8.01, 15.14],
			[ 8.41, 15.05,  8.65, 15.00,  8.73, 14.98],
			[ 8.87, 14.94,  8.99, 14.96,  9.11, 15.02],
			[ 9.23, 15.09,  9.27, 15.19,  9.25, 15.33],
			[ 9.24, 15.43,  9.12, 15.58,  8.91, 15.80],
			[ 8.01, 16.84, 'L'],
			[ 4.55, 20.88, 'L'],
			[ 2.36, 23.41, 'L'],
			[ 1.57, 24.32,  1.10, 24.87,  0.97, 25.04],
			[ 5.80, 25.04, 'L'],
			[ 5.80, 22.02, 'L'],
			[ 5.80, 21.98,  5.79, 21.85,  5.77, 21.62],
			[ 5.75, 21.40,  5.75, 21.22,  5.77, 21.09],
			[ 5.79, 20.95,  5.82, 20.84,  5.88, 20.74],
			[ 5.92, 20.66,  5.98, 20.60,  6.06, 20.55],
			[ 6.13, 20.50,  6.23, 20.45,  6.33, 20.39],
			[ 6.44, 20.33,  6.51, 20.28,  6.55, 20.24],
			[ 7.05, 19.89,  7.43, 19.56,  7.69, 19.26],
			[ 7.82, 19.08,  7.98, 18.80,  8.15, 18.43],
			[ 8.33, 18.05,  8.47, 17.78,  8.59, 17.63],
			[ 8.72, 17.47,  8.88, 17.46,  9.05, 17.60],
			[ 9.15, 17.66,  9.20, 17.83,  9.20, 18.12],
			[ 9.20, 19.46, 'L'],
			[ 9.20, 25.04, 'L'],
			[11.17, 25.04, 'L'],
			[11.54, 25.04, 11.73, 25.18, 11.73, 25.45],
			[11.73, 25.74, 11.58, 25.88, 11.29, 25.88],
			[11.29, 25.90, 10.94, 25.91, 10.24, 25.91],
			[ 9.20, 25.88, 'L'],
			[ 9.20, 27.26,  9.62, 28.18, 10.48, 28.65],
			[10.59, 28.70, 10.76, 28.75, 10.97, 28.78],
			[11.18, 28.80, 11.33, 28.83, 11.41, 28.85],
			[11.50, 28.87, 11.57, 28.94, 11.61, 29.07],
			[11.65, 29.19, 11.64, 29.29, 11.58, 29.37],
			[11.50, 29.47, 11.35, 29.52, 11.12, 29.52],
			[10.84, 29.52, 10.46, 29.48,  9.95, 29.40],
			[ 8.46, 29.21,  7.54, 29.12,  7.19, 29.14],
			[ 7.15, 29.14,  6.44, 29.23,  5.07, 29.40],
			[ 4.53, 29.48,  4.11, 29.52,  3.82, 29.52],
			[ 3.55, 29.52,  3.39, 29.44,  3.35, 29.29],
			[ 3.28, 29.11,  3.32, 28.98,  3.50, 28.88],
			[ 3.56, 28.86,  3.65, 28.84,  3.77, 28.83],
			[ 3.90, 28.82,  3.98, 28.82,  4.02, 28.82],
			[ 4.29, 28.76,  4.55, 28.63,  4.81, 28.41],
			[ 5.47, 27.89,  5.80, 27.05,  5.80, 25.88]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawFive(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Five default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 1.87, 21.40],
			[ 2.92, 20.39,  4.37, 20.00,  6.23, 20.23],
			[ 7.49, 20.37,  8.50, 20.83,  9.25, 21.60],
			[10.05, 22.47, 10.41, 23.63, 10.33, 25.06],
			[10.25, 26.67,  9.45, 27.88,  7.93, 28.68],
			[ 6.41, 29.48,  4.86, 29.69,  3.29, 29.30],
			[ 2.33, 29.07,  1.51, 28.63,  0.85, 27.97],
			[ 0.19, 27.31,  0.00, 26.53,  0.27, 25.64],
			[ 0.50, 24.85,  1.05, 24.41,  1.91, 24.32],
			[ 2.78, 24.23,  3.40, 24.56,  3.79, 25.29],
			[ 4.10, 25.89,  4.10, 26.36,  3.79, 26.69],
			[ 3.73, 26.77,  3.59, 26.88,  3.38, 27.02],
			[ 3.17, 27.17,  3.02, 27.31,  2.93, 27.44],
			[ 2.84, 27.58,  2.82, 27.73,  2.86, 27.91],
			[ 2.96, 28.36,  3.35, 28.64,  4.05, 28.75],
			[ 5.31, 28.95,  6.13, 28.55,  6.52, 27.56],
			[ 6.95, 26.47,  7.05, 25.13,  6.84, 23.52],
			[ 6.74, 22.74,  6.53, 22.12,  6.20, 21.66],
			[ 5.72, 21.15,  5.12, 20.93,  4.41, 20.97],
			[ 3.71, 21.02,  3.07, 21.24,  2.51, 21.63],
			[ 2.39, 21.71,  2.25, 21.84,  2.09, 22.02],
			[ 1.92, 22.21,  1.81, 22.32,  1.75, 22.36],
			[ 1.64, 22.45,  1.50, 22.48,  1.35, 22.44],
			[ 1.19, 22.41,  1.09, 22.32,  1.06, 22.18],
			[ 1.02, 22.03,  0.99, 21.85,  0.98, 21.66],
			[ 0.97, 21.46,  0.98, 21.24,  1.00, 20.99],
			[ 1.02, 20.74,  1.03, 20.56,  1.03, 20.47],
			[ 1.03, 16.72, 'L'],
			[ 1.03, 16.66,  1.02, 16.52,  1.00, 16.31],
			[ 0.98, 16.10,  0.97, 15.92,  0.97, 15.77],
			[ 0.97, 15.63,  0.99, 15.48,  1.04, 15.32],
			[ 1.09, 15.17,  1.16, 15.06,  1.26, 15.00],
			[ 1.32, 14.96,  1.41, 14.94,  1.54, 14.94],
			[ 1.66, 14.94,  1.78, 14.95,  1.88, 14.97],
			[ 1.99, 14.99,  2.12, 15.02,  2.28, 15.06],
			[ 2.43, 15.10,  2.53, 15.12,  2.57, 15.12],
			[ 3.54, 15.25,  4.58, 15.32,  5.71, 15.32],
			[ 6.54, 15.32,  7.59, 15.23,  8.85, 15.06],
			[ 9.47, 14.94,  9.84, 14.95,  9.95, 15.09],
			[10.07, 15.22, 10.01, 15.41,  9.78, 15.64],
			[ 9.41, 15.99,  8.99, 16.30,  8.53, 16.57],
			[ 7.25, 17.35,  5.88, 17.82,  4.43, 18.00],
			[ 4.29, 18.01,  4.02, 18.03,  3.61, 18.05],
			[ 3.21, 18.07,  2.90, 18.10,  2.68, 18.14],
			[ 2.61, 18.16,  2.53, 18.16,  2.45, 18.15],
			[ 2.37, 18.15,  2.30, 18.15,  2.23, 18.15],
			[ 2.17, 18.16,  2.10, 18.20,  2.04, 18.26],
			[ 1.93, 18.37,  1.87, 18.67,  1.87, 19.16],
			[ 1.87, 21.40, 'L']
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawSix(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Six default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 3.54, 21.83],
			[ 4.39, 21.46,  5.37, 21.36,  6.48, 21.52],
			[ 7.58, 21.69,  8.46, 22.12,  9.10, 22.82],
			[ 9.99, 23.77, 10.28, 24.93,  9.98, 26.31],
			[ 9.68, 27.68,  8.93, 28.61,  7.73, 29.10],
			[ 7.13, 29.35,  6.48, 29.49,  5.78, 29.53],
			[ 4.97, 29.57,  4.32, 29.51,  3.83, 29.36],
			[ 2.30, 28.87,  1.22, 27.55,  0.58, 25.37],
			[ 0.09, 23.96,  0.00, 22.35,  0.30, 20.55],
			[ 0.60, 18.75,  1.32, 17.33,  2.47, 16.30],
			[ 3.24, 15.61,  4.14, 15.19,  5.16, 15.07],
			[ 6.17, 14.94,  7.15, 15.11,  8.08, 15.58],
			[ 8.81, 15.95,  9.32, 16.52,  9.59, 17.31],
			[ 9.86, 18.09,  9.70, 18.80,  9.10, 19.44],
			[ 8.49, 19.99,  7.79, 20.08,  6.99, 19.73],
			[ 6.18, 19.39,  5.82, 18.79,  5.90, 17.96],
			[ 5.92, 17.75,  6.08, 17.54,  6.38, 17.34],
			[ 6.68, 17.13,  6.86, 16.99,  6.91, 16.91],
			[ 7.11, 16.62,  7.06, 16.33,  6.77, 16.04],
			[ 6.32, 15.67,  5.81, 15.57,  5.24, 15.72],
			[ 4.67, 15.88,  4.25, 16.20,  3.98, 16.68],
			[ 3.73, 17.15,  3.58, 17.86,  3.54, 18.83],
			[ 3.52, 19.12,  3.51, 19.44,  3.51, 19.78],
			[ 3.51, 20.12,  3.52, 20.49,  3.53, 20.90],
			[ 3.54, 21.30,  3.54, 21.62,  3.54, 21.83],
			[ 4.91, 22.12],
			[ 4.29, 22.22,  3.89, 22.56,  3.72, 23.17],
			[ 3.62, 23.53,  3.57, 24.00,  3.57, 24.56],
			[ 3.57, 25.40, 'L'],
			[ 3.57, 25.46,  3.57, 25.66,  3.56, 26.01],
			[ 3.55, 26.36,  3.55, 26.61,  3.56, 26.76],
			[ 3.57, 26.90,  3.59, 27.12,  3.63, 27.42],
			[ 3.67, 27.73,  3.73, 27.95,  3.82, 28.11],
			[ 3.91, 28.26,  4.03, 28.42,  4.20, 28.57],
			[ 4.36, 28.73,  4.56, 28.83,  4.79, 28.86],
			[ 4.91, 28.88,  5.09, 28.89,  5.34, 28.89],
			[ 6.02, 28.83,  6.46, 28.48,  6.65, 27.82],
			[ 6.75, 27.55,  6.82, 27.12,  6.86, 26.54],
			[ 6.86, 26.44,  6.86, 26.30,  6.87, 26.12],
			[ 6.88, 25.93,  6.89, 25.79,  6.89, 25.69],
			[ 6.89, 25.64,  6.89, 25.50,  6.89, 25.27],
			[ 6.89, 25.05,  6.89, 24.89,  6.89, 24.79],
			[ 6.89, 24.70,  6.88, 24.54,  6.87, 24.31],
			[ 6.86, 24.09,  6.84, 23.92,  6.81, 23.80],
			[ 6.78, 23.69,  6.75, 23.54,  6.71, 23.35],
			[ 6.67, 23.17,  6.62, 23.02,  6.55, 22.92],
			[ 6.48, 22.81,  6.40, 22.70,  6.30, 22.57],
			[ 6.21, 22.44,  6.09, 22.35,  5.96, 22.28],
			[ 5.82, 22.21,  5.66, 22.17,  5.49, 22.15],
			[ 5.26, 22.11,  5.06, 22.10,  4.91, 22.12]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawSeven(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Seven default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 7.09, 18.83],
			[ 5.97, 19.47,  4.95, 19.49,  4.04, 18.89],
			[ 3.92, 18.81,  3.74, 18.65,  3.47, 18.41],
			[ 3.21, 18.16,  2.97, 17.98,  2.73, 17.84],
			[ 2.50, 17.70,  2.26, 17.64,  2.01, 17.64],
			[ 1.62, 17.64,  1.31, 17.90,  1.08, 18.42],
			[ 1.00, 18.62,  0.94, 18.84,  0.90, 19.09],
			[ 0.86, 19.34,  0.84, 19.55,  0.84, 19.72],
			[ 0.84, 19.88,  0.85, 20.12,  0.86, 20.44],
			[ 0.87, 20.76,  0.87, 20.98,  0.87, 21.10],
			[ 0.87, 21.13,  0.88, 21.22,  0.89, 21.34],
			[ 0.90, 21.47,  0.90, 21.57,  0.89, 21.65],
			[ 0.88, 21.73,  0.87, 21.82,  0.86, 21.92],
			[ 0.85, 22.03,  0.81, 22.11,  0.76, 22.17],
			[ 0.70, 22.23,  0.62, 22.27,  0.52, 22.29],
			[ 0.39, 22.31,  0.28, 22.29,  0.20, 22.23],
			[ 0.13, 22.17,  0.07, 22.07,  0.04, 21.92],
			[ 0.02, 21.78,  0.00, 21.65,  0.00, 21.55],
			[ 0.00, 21.44,  0.00, 21.30,  0.02, 21.13],
			[ 0.02, 20.95,  0.03, 20.84,  0.03, 20.81],
			[ 0.03, 16.74, 'L'],
			[ 0.03, 15.69, 'L'],
			[ 0.03, 15.44,  0.06, 15.27,  0.12, 15.19],
			[ 0.19, 15.08,  0.31, 15.02,  0.47, 15.02],
			[ 0.62, 15.02,  0.74, 15.09,  0.81, 15.22],
			[ 0.85, 15.28,  0.87, 15.40,  0.86, 15.59],
			[ 0.85, 15.77,  0.86, 15.93,  0.90, 16.07],
			[ 0.94, 16.20,  1.04, 16.28,  1.19, 16.30],
			[ 1.27, 16.30,  1.34, 16.24,  1.40, 16.12],
			[ 1.57, 15.93,  1.75, 15.75,  1.95, 15.57],
			[ 2.49, 15.16,  3.09, 14.98,  3.75, 15.02],
			[ 4.35, 15.04,  4.97, 15.28,  5.61, 15.75],
			[ 5.67, 15.79,  5.78, 15.87,  5.93, 16.01],
			[ 6.09, 16.14,  6.20, 16.24,  6.28, 16.30],
			[ 6.36, 16.36,  6.46, 16.43,  6.60, 16.50],
			[ 6.74, 16.58,  6.87, 16.63,  7.01, 16.65],
			[ 7.14, 16.67,  7.29, 16.67,  7.44, 16.65],
			[ 7.77, 16.61,  8.09, 16.50,  8.39, 16.33],
			[ 8.69, 16.15,  8.91, 16.00,  9.04, 15.88],
			[ 9.18, 15.75,  9.41, 15.51,  9.74, 15.16],
			[ 9.97, 14.95, 10.19, 14.94, 10.38, 15.14],
			[10.53, 15.31, 10.49, 15.59, 10.23, 15.98],
			[ 8.90, 17.99, 'L'],
			[ 7.19, 20.70,  6.18, 23.28,  5.87, 25.72],
			[ 5.78, 26.71,  5.80, 27.62,  5.93, 28.45],
			[ 5.93, 28.49,  5.96, 28.60,  6.00, 28.79],
			[ 6.05, 28.97,  6.07, 29.13,  6.06, 29.25],
			[ 6.05, 29.38,  6.01, 29.48,  5.93, 29.56],
			[ 5.74, 29.62,  5.59, 29.64,  5.50, 29.63],
			[ 5.40, 29.62,  5.21, 29.57,  4.94, 29.47],
			[ 4.67, 29.37,  4.52, 29.32,  4.48, 29.32],
			[ 3.68, 29.13,  2.68, 29.22,  1.48, 29.59],
			[ 1.06, 29.68,  0.82, 29.60,  0.79, 29.32],
			[ 0.77, 29.26,  0.81, 29.10,  0.93, 28.83],
			[ 1.16, 28.36,  1.33, 28.02,  1.42, 27.78],
			[ 1.97, 26.60,  2.81, 25.13,  3.95, 23.36],
			[ 4.24, 22.90,  4.75, 22.17,  5.48, 21.17],
			[ 6.21, 20.17,  6.75, 19.39,  7.09, 18.83]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawEight(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Eight default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 2.34, 22.07],
			[ 2.03, 21.91,  1.73, 21.65,  1.44, 21.28],
			[ 0.86, 20.58,  0.58, 19.79,  0.60, 18.90],
			[ 0.62, 18.01,  0.94, 17.23,  1.56, 16.57],
			[ 2.32, 15.78,  3.35, 15.29,  4.66, 15.12],
			[ 5.96, 14.94,  7.11, 15.07,  8.10, 15.49],
			[ 9.01, 15.84,  9.67, 16.40, 10.06, 17.17],
			[10.46, 17.93, 10.48, 18.75, 10.11, 19.62],
			[ 9.84, 20.26,  9.31, 20.97,  8.54, 21.75],
			[ 9.29, 22.07,  9.92, 22.67, 10.43, 23.52],
			[10.85, 24.24, 11.02, 25.00, 10.94, 25.80],
			[10.85, 26.61, 10.52, 27.32,  9.96, 27.94],
			[ 9.54, 28.38,  8.98, 28.77,  8.31, 29.10],
			[ 7.41, 29.51,  6.43, 29.69,  5.37, 29.65],
			[ 4.30, 29.62,  3.32, 29.37,  2.43, 28.93],
			[ 1.54, 28.48,  0.88, 27.82,  0.44, 26.95],
			[ 0.00, 26.08,  0.00, 25.21,  0.43, 24.33],
			[ 0.52, 24.12,  0.66, 23.90,  0.83, 23.67],
			[ 1.01, 23.43,  1.15, 23.26,  1.25, 23.14],
			[ 1.36, 23.03,  1.56, 22.83,  1.84, 22.56],
			[ 2.12, 22.29,  2.29, 22.12,  2.34, 22.07],
			[ 3.22, 22.65],
			[ 3.14, 22.67,  3.06, 22.72,  2.97, 22.79],
			[ 2.88, 22.87,  2.78, 22.97,  2.66, 23.10],
			[ 2.55, 23.22,  2.48, 23.30,  2.46, 23.32],
			[ 1.47, 24.36,  1.18, 25.45,  1.59, 26.57],
			[ 1.88, 27.41,  2.48, 28.05,  3.39, 28.49],
			[ 4.30, 28.94,  5.20, 29.07,  6.10, 28.90],
			[ 6.89, 28.72,  7.45, 28.24,  7.78, 27.46],
			[ 8.11, 26.67,  8.03, 25.94,  7.55, 25.26],
			[ 7.39, 25.05,  7.04, 24.79,  6.47, 24.48],
			[ 6.30, 24.38,  6.04, 24.23,  5.70, 24.03],
			[ 5.36, 23.82,  5.11, 23.67,  4.93, 23.58],
			[ 3.68, 22.85, 'L'],
			[ 3.39, 22.72,  3.24, 22.65,  3.22, 22.65],
			[ 5.46, 15.76],
			[ 4.72, 15.85,  4.16, 16.22,  3.77, 16.86],
			[ 3.38, 17.50,  3.39, 18.15,  3.80, 18.81],
			[ 3.95, 19.04,  4.29, 19.30,  4.82, 19.59],
			[ 6.15, 20.38, 'L'],
			[ 7.23, 20.99, 'L'],
			[ 7.50, 21.13,  7.65, 21.19,  7.67, 21.19],
			[ 7.74, 21.19,  7.82, 21.15,  7.90, 21.06],
			[ 7.98, 20.97,  8.06, 20.86,  8.15, 20.73],
			[ 8.23, 20.59,  8.29, 20.52,  8.31, 20.50],
			[ 9.08, 19.47,  9.31, 18.50,  9.00, 17.59],
			[ 8.79, 16.95,  8.32, 16.46,  7.61, 16.13],
			[ 6.89, 15.81,  6.17, 15.68,  5.46, 15.76]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}

function drawNine(ctx, position, options)
{
	if (ctx != null && JS.Drawings.isPosition(position))
	{
		// Nine default settings
		var settings = {
			'scale': 1.0
		};
		var paths = [
			[ 6.74, 22.69],
			[ 5.89, 23.05,  4.91, 23.16,  3.80, 22.99],
			[ 2.70, 22.83,  1.83, 22.39,  1.19, 21.70],
			[ 0.29, 20.75,  0.00, 19.58,  0.30, 18.21],
			[ 0.60, 16.83,  1.35, 15.90,  2.55, 15.42],
			[ 3.15, 15.17,  3.80, 15.02,  4.50, 14.98],
			[ 5.31, 14.94,  5.96, 15.00,  6.45, 15.16],
			[ 7.98, 15.64,  9.07, 16.97,  9.70, 19.14],
			[10.19, 20.55, 10.28, 22.16,  9.98, 23.97],
			[ 9.68, 25.77,  8.96, 27.18,  7.82, 28.21],
			[ 7.04, 28.91,  6.14, 29.32,  5.13, 29.45],
			[ 4.11, 29.57,  3.13, 29.40,  2.20, 28.94],
			[ 1.47, 28.57,  0.96, 27.99,  0.69, 27.21],
			[ 0.42, 26.42,  0.59, 25.71,  1.19, 25.07],
			[ 1.79, 24.53,  2.49, 24.43,  3.29, 24.78],
			[ 4.10, 25.13,  4.46, 25.72,  4.38, 26.55],
			[ 4.37, 26.77,  4.21, 26.97,  3.90, 27.18],
			[ 3.60, 27.38,  3.43, 27.52,  3.37, 27.60],
			[ 3.17, 27.89,  3.22, 28.18,  3.51, 28.47],
			[ 3.96, 28.84,  4.47, 28.95,  5.04, 28.79],
			[ 5.61, 28.64,  6.03, 28.32,  6.30, 27.83],
			[ 6.56, 27.37,  6.70, 26.65,  6.74, 25.68],
			[ 6.74, 22.69, 'L'],
			[ 4.91, 15.62],
			[ 4.23, 15.72,  3.80, 16.08,  3.63, 16.70],
			[ 3.53, 16.97,  3.46, 17.39,  3.43, 17.98],
			[ 3.43, 18.07,  3.42, 18.21,  3.41, 18.40],
			[ 3.40, 18.58,  3.40, 18.72,  3.40, 18.82],
			[ 3.40, 18.88,  3.40, 19.02,  3.40, 19.24],
			[ 3.40, 19.46,  3.40, 19.62,  3.40, 19.72],
			[ 3.40, 19.82,  3.40, 19.98,  3.41, 20.20],
			[ 3.42, 20.42,  3.44, 20.59,  3.47, 20.71],
			[ 3.50, 20.82,  3.53, 20.98,  3.57, 21.16],
			[ 3.61, 21.34,  3.66, 21.49,  3.73, 21.60],
			[ 3.80, 21.70,  3.88, 21.82,  3.98, 21.94],
			[ 4.07, 22.07,  4.19, 22.17,  4.33, 22.24],
			[ 4.46, 22.30,  4.62, 22.35,  4.79, 22.37],
			[ 5.02, 22.40,  5.22, 22.41,  5.37, 22.39],
			[ 5.99, 22.30,  6.39, 21.96,  6.57, 21.38],
			[ 6.66, 21.01,  6.71, 20.54,  6.71, 19.98],
			[ 6.71, 19.14, 'L'],
			[ 6.71, 19.06,  6.71, 18.89,  6.73, 18.62],
			[ 6.73, 18.34,  6.73, 18.13,  6.73, 17.98],
			[ 6.71, 17.82,  6.71, 17.62,  6.70, 17.36],
			[ 6.69, 17.11,  6.65, 16.91,  6.59, 16.75],
			[ 6.54, 16.60,  6.46, 16.43,  6.38, 16.26],
			[ 6.29, 16.09,  6.17, 15.95,  6.01, 15.85],
			[ 5.86, 15.76,  5.67, 15.69,  5.46, 15.65],
			[ 5.34, 15.63,  5.16, 15.62,  4.91, 15.62]
		];
		
		// Overing default settings with options
		jQuery.extend(settings, options);
		// Start drawing
		JS.Drawings.drawPaths(paths, ctx, position, settings);
	}
}
/**********************************/
/*  Accidental drawing functions  */
/*								  */
/*  space between 2 notes: 3.625  */
/**********************************/

JS.Drawings.drawSharp = JS.Drawings.functionBuilder([
	[ 5.76, 13.84], 
	[ 5.44, 13.84,  5.21, 13.61,  5.21, 13.29], 
	[ 5.21,  9.07, 'L'], 
	[ 2.79,  9.97, 'L'], 
	[ 2.79, 14.57, 'L'], 
	[ 2.79, 14.89,  2.56, 15.12,  2.24, 15.12], 
	[ 1.95, 15.12,  1.72, 14.89,  1.72, 14.57], 
	[ 1.72, 10.35, 'L'], 
	[ 0.79, 10.70, 'L'], 
	[ 0.73, 10.73,  0.64, 10.73,  0.58, 10.73], 
	[ 0.26, 10.73,  0.00, 10.47,  0.00, 10.15], 
	[ 0.00,  8.40, 'L'], 
	[ 0.00,  8.17,  0.15,  7.94,  0.38,  7.85], 
	[ 1.72,  7.38, 'L'], 
	[ 1.72,  2.73, 'L'], 
	[ 0.79,  3.05, 'L'], 
	[ 0.73,  3.08,  0.64,  3.08,  0.58,  3.08], 
	[ 0.26,  3.08,  0.00,  2.85,  0.00,  2.50], 
	[ 0.00,  0.75, 'L'], 
	[ 0.00,  0.52,  0.15,  0.32,  0.38,  0.23], 
	[ 1.72,  -0.26, 'L'], 
	[ 1.72,  -4.86, 'L'], 
	[ 1.72,  -5.18,  1.95,  -5.41,  2.24,  -5.41], 
	[ 2.56,  -5.41,  2.79,  -5.18,  2.79,  -4.86], 
	[ 2.79,  -0.64, 'L'], 
	[ 5.21,  -1.54, 'L'], 
	[ 5.21,  -6.14, 'L'], 
	[ 5.21,  -6.46,  5.44,  -6.69,  5.76,  -6.69], 
	[ 6.05,  -6.69,  6.28,  -6.46,  6.28,  -6.14], 
	[ 6.28,  -1.92, 'L'], 
	[ 7.21,  -2.27, 'L'], 
	[ 7.27,  -2.30,  7.36,  -2.30,  7.41,  -2.30], 
	[ 7.74,  -2.30,  8.00,  -2.04,  8.00,  -1.72], 
	[ 8.00,  0.03, 'L'], 
	[ 8.00,  0.26,  7.85,  0.49,  7.62,  0.58], 
	[ 6.28,  1.04, 'L'], 
	[ 6.28,  5.70, 'L'], 
	[ 7.21,  5.38, 'L'], 
	[ 7.27,  5.35,  7.36,  5.35,  7.41,  5.35], 
	[ 7.74,  5.35,  8.00,  5.58,  8.00,  5.93], 
	[ 8.00,  7.67, 'L'], 
	[ 8.00,  7.91,  7.85,  8.11,  7.62,  8.20], 
	[ 6.28,  8.69, 'L'], 
	[ 6.28, 13.29, 'L'], 
	[ 6.28, 13.61,  6.05, 13.84,  5.76, 13.84], 
	[ 2.79,  2.32], 
	[ 2.79,  6.98, 'L'], 
	[ 5.21,  6.10, 'L'], 
	[ 5.21,  1.45, 'L'], 
	[ 2.79,  2.32, 'L']
]);

JS.Drawings.drawFlat = JS.Drawings.functionBuilder([
	[ 0.00,  -9.60], 
	[ 0.24,  -9.75,  0.54,  -9.84,  0.81,  -9.84], 
	[ 1.08,  -9.84,  1.38,  -9.75,  1.62,  -9.60], 
	[ 1.41,  0.78, 'L'], 
	[ 2.17,  0.12,  3.16,  -0.24,  4.15,  -0.24], 
	[ 5.71,  -0.24,  6.83,  1.20,  6.83,  2.83], 
	[ 6.83,  5.23,  4.21,  6.34,  2.41,  7.91], 
	[ 1.93,  8.30,  1.69,  9.05,  1.05,  9.05], 
	[ 0.66,  9.05,  0.36,  8.69,  0.36,  8.30], 
	[ 0.00,  -9.60, 'L'], 
	[ 1.59,  4.90], 
	[ 1.59,  5.23, 'L'], 
	[ 1.59,  5.89,  1.62,  6.56,  1.71,  7.22], 
	[ 3.07,  6.04,  4.51,  4.78,  4.51,  3.04], 
	[ 4.51,  2.01,  4.09,  1.02,  3.22,  1.02], 
	[ 2.29,  1.02,  1.65,  1.92,  1.62,  2.92], 
	[ 1.59,  4.90, 'L']
]);

JS.Drawings.drawNatural = JS.Drawings.functionBuilder([
	[ 0.78,  -7.84], 
	[ 1.02,  -7.84,  1.29,  -7.75,  1.53,  -7.63], 
	[ 1.44,  -2.12, 'L'], 
	[ 4.63,  -2.73, 'L'], 
	[ 4.72,  -2.73, 'L'], 
	[ 5.02,  -2.73,  5.27,  -2.52,  5.27,  -2.21], 
	[ 5.47, 14.93, 'L'], 
	[ 5.24, 15.05,  4.99, 15.14,  4.72, 15.14], 
	[ 4.48, 15.14,  4.21, 15.05,  3.97, 14.93], 
	[ 4.06,  9.43, 'L'], 
	[ 0.87, 10.03, 'L'], 
	[ 0.78, 10.03, 'L'], 
	[ 0.48, 10.03,  0.24,  9.82,  0.24,  9.52], 
	[ 0.00,  -7.63, 'L'], 
	[ 0.24,  -7.75,  0.51,  -7.84,  0.78,  -7.84], 
	[ 4.18,  0.28], 
	[ 1.41,  0.79, 'L'], 
	[ 1.32,  7.02, 'L'], 
	[ 4.09,  6.51, 'L'], 
	[ 4.18,  0.28, 'L']
]);

JS.Drawings.drawWholeNote = JS.Drawings.functionBuilder([
    [12.30,  4.12], 
    [12.30,  6.55,  8.77,  8.25,  4.91,  8.25], 
    [ 0.67,  8.25,  -2.50,  6.34,  -2.50,  4.12], 
    [ -2.50,  1.70,  1.03,  0.00,  4.91,  0.00], 
    [ 9.13,  0.00, 12.30,  1.91, 12.30,  4.12], 
    [ 1.86,  3.41], 
    [ 1.86,  6.37,  4.43,  7.47,  5.87,  7.47], 
    [ 7.30,  7.47,  7.93,  6.37,  7.93,  4.84], 
    [ 7.93,  1.88,  5.36,  0.78,  3.93,  0.78], 
    [ 2.49,  0.78,  1.86,  1.88,  1.86,  3.41]
]);

JS.Drawings.drawHalfNoteHead = JS.Drawings.functionBuilder([
    [ 9.87,  2.15], 
    [ 9.87,  3.26,  9.19,  5.65,  7.63,  6.70], 
    [ 5.81,  7.92,  3.54,  8.22,  2.01,  8.22], 
    [ 0.04,  8.22,  -0.50,  7.17,  -0.50,  6.04], 
    [ -0.50,  4.93,  0.19,  2.54,  1.74,  1.49], 
    [ 3.56,  0.27,  5.84,  0.00,  7.39,  0.00], 
    [ 9.36,  0.00,  9.87,  1.02,  9.87,  2.15], 
    [ 7.66,  0.93], 
    [ 6.47,  0.93,  1.53,  4.30,  0.79,  5.20], 
    [ 0.58,  5.44,  0.46,  5.74,  0.46,  6.04], 
    [ 0.46,  6.75,  1.02,  7.26,  1.71,  7.26], 
    [ 2.91,  7.26,  7.84,  3.89,  8.62,  2.99], 
    [ 8.83,  2.75,  8.92,  2.45,  8.92,  2.15], 
    [ 8.92,  1.43,  8.38,  0.93,  7.66,  0.93]
]);

JS.Drawings.drawNoteHead = JS.Drawings.functionBuilder([
    [ 9.83,  2.72], 
    [ 9.83,  4.87,  8.16,  6.34,  6.76,  7.17], 
    [ 5.68,  7.80,  4.48,  8.25,  3.26,  8.25], 
    [ 1.58,  8.25,  0.00,  7.38,  0.00,  5.53], 
    [ 0.00,  3.38,  1.67,  1.91,  3.08,  1.08], 
    [ 4.16,  0.45,  5.35,  0.00,  6.58,  0.00], 
    [ 8.25,  0.00,  9.83,  0.87,  9.83,  2.72]
]);

JS.Drawings.drawDeadNote = JS.Drawings.functionBuilder([
    [ 8.17,  0.11], 
    [ 8.25,  0.05,  8.33,  0.00,  8.41,  0.00], 
    [ 8.49,  0.00,  8.60,  0.05,  8.68,  0.11], 
    [ 9.22,  0.54, 'L'], 
    [ 9.30,  0.62,  9.35,  0.75,  9.35,  0.86], 
    [ 9.35,  0.97,  9.30,  1.08,  9.22,  1.16], 
    [ 6.10,  3.71, 'L'], 
    [ 9.22,  6.27, 'L'], 
    [ 9.30,  6.35,  9.35,  6.46,  9.35,  6.56], 
    [ 9.35,  6.67,  9.30,  6.81,  9.22,  6.89], 
    [ 8.68,  7.32, 'L'], 
    [ 8.60,  7.37,  8.49,  7.43,  8.41,  7.43], 
    [ 8.33,  7.43,  8.25,  7.37,  8.17,  7.32], 
    [ 4.94,  4.68, 'L'], 
    [ 1.68,  7.32, 'L'], 
    [ 1.60,  7.37,  1.52,  7.43,  1.44,  7.43], 
    [ 1.36,  7.43,  1.25,  7.37,  1.17,  7.32], 
    [ 0.63,  6.89, 'L'], 
    [ 0.55,  6.81,  0.50,  6.67,  0.50,  6.56], 
    [ 0.50,  6.46,  0.55,  6.35,  0.63,  6.27], 
    [ 3.75,  3.71, 'L'], 
    [ 0.63,  1.16, 'L'], 
    [ 0.55,  1.08,  0.50,  0.97,  0.50,  0.86], 
    [ 0.50,  0.75,  0.55,  0.62,  0.63,  0.54], 
    [ 1.17,  0.11, 'L'], 
    [ 1.25,  0.05,  1.36,  0.00,  1.44,  0.00], 
    [ 1.52,  0.00,  1.60,  0.05,  1.68,  0.11], 
    [ 4.94,  2.74, 'L'], 
    [ 8.17,  0.11, 'L']
]);


JS.Drawings.drawLeftStem = function(ctx, position, options)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        // Right stem default settings
        var settings = {
            'scale': 1.0,
            'lineJoin': 'round',
            'height': 0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);

        var paths = [
            [ 0.50, 29.07 + settings.height],
            [ 0.86, 29.07 + settings.height, 'L'],
            [ 0.86,  7.98, 'L'],
            [ 0.50,  7.98, 'L'],
            [ 0.50,  5.58, 'L'],
            [ 0.50, 29.07 + settings.height, 'L'],
            [ 0.86, 29.07 + settings.height, 'L']
        ];
        ctx.lineJoin = settings.lineJoin;
        // Start drawing
        JS.Drawings.strokePaths(paths, ctx, position, settings);
    }
}

JS.Drawings.drawRightStem = function(ctx, position, options)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        // Left stem default settings
        var settings = {
            'scale': 1.0,
            'lineJoin': 'round',
            'height': 0
        };

        // Overing default settings with options
        jQuery.extend(settings, options);
        var paths = [
            [ 9.20,   2.41],
            [ 9.25,   2.41, 'L'],
            [ 9.25, -21.65 - settings.height, 'L'],
            [ 9.20, -21.65 - settings.height , 'L'],
            [ 9.20,   0, 'L'],
            [ 9.25,   2.41, 'L']
        ];
        
        ctx.lineJoin = settings.lineJoin;
        // Start drawing
        ctx.save();
        //ctx.strokeStyle = "red";
        JS.Drawings.strokePaths(paths, ctx, position, settings);
        ctx.restore();
    }
}

JS.Drawings.drawNoteNeck = function(ctx, position, options)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        // Note neck default settings
        var settings = {
            'scale': 1.0,
            'lineJoin': 'round'
        };
        var paths = [
            [ -1.75,  4.08],
            [ 11.15,  4.08, 'L'],
            [ -1.75,  4.08, 'L']
        ];
        
        // Overing default settings with options
        jQuery.extend(settings, options);
        ctx.lineJoin = settings.lineJoin;
        // Start drawing
        JS.Drawings.strokePaths(paths, ctx, position, settings);
    }
}

JS.Drawings.drawSingleFlagDown = JS.Drawings.functionBuilder([
    [ 9.15,  -21.23],
    [ 9.62,  -21.23, 'L'],
    [ 9.62,  -15.47, 15.69,  -11.49, 15.69,  -5.73],
    [15.69,  -3.67, 15.23,  -1.63, 14.47,  0.29],
    [14.35,  0.52, 14.12,  0.64, 13.92,  0.64],
    [13.54,  0.64, 13.16,  0.32, 13.25,  -0.15],
    [14.01,  -1.92, 14.47,  -3.81, 14.47,  -5.73],
    [14.47,  -8.76, 11.71,  -11.78,  9.62,  -13.96],
    [ 9.15,  -13.96, 'L'],
    [ 9.15,  -21.23, 'L']
]);

JS.Drawings.drawSingleFlagUp = JS.Drawings.functionBuilder([
    [ 9.19, 14.41],
    [ 9.19, 20.37,  1.37, 23.36,  1.37, 29.32],
    [ 0.90, 29.32, 'L'],
    [ 0.90, 22.05, 'L'],
    [ 1.37, 22.05, 'L'],
    [ 4.21, 20.31,  7.96, 17.66,  7.96, 14.41],
    [ 7.96, 12.52,  7.35, 10.68,  6.39,  9.05],
    [ 6.31,  8.59,  6.69,  8.27,  7.06,  8.27],
    [ 7.99,  8.27,  9.19, 11.99,  9.19, 14.41]
]);

JS.Drawings.drawDoubleFlagDown = JS.Drawings.functionBuilder([
    [16.11,  -8.01], 
    [16.11,  -7.02, 15.84,  -6.07, 15.42,  -5.17], 
    [15.96,  -4.06, 16.29,  -2.93, 16.29,  -1.67], 
    [16.29,  0.21, 15.81,  2.06, 15.03,  3.80], 
    [14.88,  4.04, 14.67,  4.16, 14.46,  4.16], 
    [14.07,  4.16, 13.69,  3.83, 13.78,  3.35], 
    [14.55,  1.80, 15.03,  0.06, 15.03,  -1.67], 
    [15.03,  -4.57, 12.19,  -7.38, 10.04,  -9.35], 
    [10.04,  -7.11, 'L'], 
    [ 9.56,  -7.11, 'L'], 
    [ 9.56,  -22.06, 'L'], 
    [10.04,  -22.06, 'L'], 
    [10.04,  -16.74, 16.11,  -13.33, 16.11,  -8.01], 
    [14.82,  -8.01], 
    [14.82,  -10.88, 12.10,  -13.69, 10.04,  -15.69], 
    [10.04,  -12.16, 12.76,  -9.53, 14.61,  -6.60], 
    [14.76,  -7.05, 14.82,  -7.53, 14.82,  -8.01]
]);
JS.Drawings.drawDoubleFlagUp = JS.Drawings.functionBuilder([
    [ 7.88, 12.93], 
    [ 8.36, 13.94,  8.63, 15.05,  8.63, 16.19], 
    [ 8.63, 24.81,  0.98, 20.66,  0.98, 29.28], 
    [ 0.50, 29.28, 'L'], 
    [ 0.50, 14.33, 'L'], 
    [ 0.98, 14.33, 'L'], 
    [ 0.98, 16.43, 'L'], 
    [ 3.91, 14.96,  7.76, 12.63,  7.76,  9.46], 
    [ 7.76,  8.83,  7.58,  8.20,  7.35,  7.61], 
    [ 7.26,  7.13,  7.64,  6.80,  8.03,  6.80], 
    [ 8.93,  6.80,  9.02,  8.68,  9.02,  9.46], 
    [ 9.02, 10.78,  8.57, 11.91,  7.88, 12.93], 
    [ 7.38, 16.19], 
    [ 7.38, 15.47,  7.23, 14.75,  6.96, 14.09], 
    [ 4.57, 16.75,  0.98, 18.88,  0.98, 22.55], 
    [ 0.98, 23.15, 'L'], 
    [ 3.73, 21.63,  7.38, 19.24,  7.38, 16.19]
]);

JS.Drawings.drawBottomFlag = function(ctx, positions, options)
{
    if (ctx != null && typeof positions == 'object' && positions.length == 2 && JS.Drawings.isPosition(positions[0]) && JS.Drawings.isPosition(positions[1]))
    {
        // Bottom Flag default settings
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);
        
        var paths = [
            [ positions[0].x, positions[0].y + 28 * settings.scale],
            [ positions[0].x, positions[0].y + 30.91 * settings.scale, 'L'],
            [ positions[1].x + 1.37 * settings.scale, positions[1].y + 30.91 * settings.scale, 'L'],
            [ positions[1].x + 1.37 * settings.scale, positions[1].y + 28 * settings.scale, 'L']
        ];
        
        settings.scale = 1.0;
        // Start drawing
        JS.Drawings.drawPaths(paths, ctx, {'x': 0, 'y': 0}, settings);
    }
}

JS.Drawings.drawTopFlag = function(ctx, positions, options)
{
    if (ctx != null && typeof positions == 'object' && positions.length == 2 && JS.Drawings.isPosition(positions[0]) && JS.Drawings.isPosition(positions[1]))
    {
        // Top Flag default settings
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);
        var paddingLeft = 8.24;
        var paddingTop = -22.75;
        var paths = [
            [ positions[0].x + paddingLeft * settings.scale, positions[0].y + paddingTop * settings.scale],
            [ positions[0].x + paddingLeft * settings.scale, positions[0].y + (paddingTop + 2.91) * settings.scale, 'L'],
            [ positions[1].x + paddingLeft * settings.scale + 1.37 * settings.scale, positions[1].y + (paddingTop + 2.91) * settings.scale, 'L'],
            [ positions[1].x + paddingLeft * settings.scale + 1.37 * settings.scale, positions[1].y + paddingTop * settings.scale, 'L']
        ];
        
        settings.scale = 1.0;
        // Start drawing
        JS.Drawings.drawPaths(paths, ctx, {'x': 0, 'y': 0}, settings);
    }
}

JS.Drawings.drawDot = JS.Drawings.functionBuilder([
    [14.13,  2.50],
    [15.03,  2.50, 15.76,  3.23, 15.76,  4.13],
    [15.76,  5.03, 15.03,  5.76, 14.13,  5.76],
    [13.23,  5.76, 12.50,  5.03, 12.50,  4.13],
    [12.50,  3.23, 13.23,  2.50, 14.13,  2.50]
]);

JS.Drawings.drawStaffExtender = function(ctx, position, options)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        // Dot default settings
        var settings = {
            'scale': 1.0,
            'lineCap': 'round'
        };

        var paths = [
            [ -2.0,  0.00],
            [11.93,  0.00, 'L']
        ];
        
        // Overing default settings with options
        jQuery.extend(settings, options);

        // Scalling settings
        ctx.save();
        ctx.lineWidth *= 1.35;
        ctx.lineCap = settings.lineCap;

        // Start drawing
        JS.Drawings.strokePaths(paths, ctx, position, settings);

        ctx.restore();
    }
}

JS.Drawings.drawTabZero = JS.Drawings.functionBuilder([
    [ 5.65,  0.63], 
    [ 6.42,  1.60,  6.77,  2.74,  6.77,  4.27], 
    [ 6.77,  6.92,  5.31,  8.92,  3.39,  8.92], 
    [ 1.43,  8.92,  0.00,  6.92,  0.00,  4.21], 
    [ 0.00,  1.50,  1.43,  -0.50,  3.39,  -0.50], 
    [ 4.27,  -0.50,  5.04,  -0.11,  5.65,  0.63], 
    [ 2.47,  0.97], 
    [ 2.35,  1.42,  2.24,  2.88,  2.24,  4.21], 
    [ 2.24,  5.75,  2.36,  7.16,  2.52,  7.59], 
    [ 2.67,  8.01,  2.97,  8.24,  3.38,  8.24], 
    [ 3.82,  8.24,  4.14,  7.97,  4.28,  7.45], 
    [ 4.40,  7.00,  4.50,  5.57,  4.50,  4.24], 
    [ 4.50,  2.67,  4.40,  1.26,  4.23,  0.83], 
    [ 4.08,  0.41,  3.77,  0.18,  3.38,  0.18], 
    [ 2.92,  0.18,  2.61,  0.45,  2.47,  0.97]
]);

JS.Drawings.drawTabOne = JS.Drawings.functionBuilder([
    [ 3.76,  6.86], 
    [ 3.76,  7.68,  3.76,  7.73,  3.85,  7.84], 
    [ 3.95,  7.98,  4.24,  8.03,  4.91,  8.03], 
    [ 5.32,  8.03, 'L'], 
    [ 5.32,  8.74, 'L'], 
    [ 0.12,  8.74, 'L'], 
    [ 0.12,  8.03, 'L'], 
    [ 0.54,  8.03, 'L'], 
    [ 1.23,  8.03,  1.50,  7.98,  1.62,  7.84], 
    [ 1.71,  7.73,  1.71,  7.67,  1.71,  6.86], 
    [ 1.71,  2.23, 'L'], 
    [ 1.71,  1.14,  1.71,  1.14,  0.55,  1.13], 
    [ 0.00,  1.13, 'L'], 
    [ 0.00,  0.40, 'L'], 
    [ 1.54,  0.37,  2.49,  0.11,  3.30,  -0.50], 
    [ 3.76,  -0.50, 'L'], 
    [ 3.76,  6.86, 'L']
]);

JS.Drawings.drawTabTwo = JS.Drawings.functionBuilder([
    [ 6.68,  5.27], 
    [ 6.38,  8.79, 'L'], 
    [ 5.99,  8.75,  5.81,  8.74,  5.58,  8.74], 
    [ 0.68,  8.74, 'L'], 
    [ 0.50,  8.74,  0.34,  8.75,  0.00,  8.79], 
    [ 0.00,  8.18, 'L'], 
    [ 0.65,  7.24,  1.16,  6.64,  2.62,  5.10], 
    [ 4.01,  3.62,  4.42,  2.85,  4.42,  1.77], 
    [ 4.42,  0.80,  3.90,  0.24,  2.99,  0.24], 
    [ 2.34,  0.24,  1.63,  0.69,  1.63,  1.10], 
    [ 1.63,  1.21,  1.70,  1.29,  1.84,  1.35], 
    [ 2.44,  1.64,  2.69,  1.97,  2.69,  2.53], 
    [ 2.69,  3.21,  2.26,  3.64,  1.58,  3.64], 
    [ 0.80,  3.64,  0.29,  3.05,  0.29,  2.14], 
    [ 0.29,  0.65,  1.66,  -0.50,  3.43,  -0.50], 
    [ 5.27,  -0.50,  6.64,  0.56,  6.64,  1.95], 
    [ 6.64,  2.57,  6.38,  3.26,  5.94,  3.84], 
    [ 5.56,  4.33,  5.15,  4.63,  3.34,  5.80], 
    [ 2.83,  6.14,  2.49,  6.39,  2.04,  6.78], 
    [ 4.55,  6.78, 'L'], 
    [ 5.38,  6.77,  5.40,  6.77,  5.53,  6.68], 
    [ 5.64,  6.61,  5.71,  6.44,  5.83,  5.92], 
    [ 5.98,  5.27, 'L'], 
    [ 6.68,  5.27, 'L']
]);

JS.Drawings.drawTabThree = JS.Drawings.functionBuilder([
    [ 5.64,  4.33], 
    [ 6.24,  4.68,  6.60,  5.40,  6.60,  6.22], 
    [ 6.60,  7.05,  6.21,  7.85,  5.61,  8.27], 
    [ 5.01,  8.68,  4.11,  8.92,  3.16,  8.92], 
    [ 1.28,  8.92,  0.00,  8.02,  0.00,  6.70], 
    [ 0.00,  5.97,  0.48,  5.46,  1.17,  5.46], 
    [ 1.83,  5.46,  2.31,  5.93,  2.31,  6.54], 
    [ 2.31,  6.91,  2.22,  7.08,  1.83,  7.46], 
    [ 1.74,  7.54,  1.70,  7.62,  1.70,  7.69], 
    [ 1.70,  7.97,  2.27,  8.24,  2.82,  8.24], 
    [ 3.78,  8.24,  4.33,  7.48,  4.33,  6.18], 
    [ 4.33,  4.95,  3.93,  4.33,  3.12,  4.33], 
    [ 3.07,  4.33,  2.86,  4.35,  2.47,  4.39], 
    [ 2.39,  4.41,  2.31,  4.41,  2.26,  4.41], 
    [ 1.98,  4.41,  1.79,  4.20,  1.79,  3.91], 
    [ 1.79,  3.64,  1.96,  3.48,  2.26,  3.48], 
    [ 2.41,  3.48,  2.49,  3.49,  2.79,  3.56], 
    [ 3.00,  3.60,  3.14,  3.62,  3.25,  3.62], 
    [ 3.86,  3.62,  4.25,  2.92,  4.25,  1.80], 
    [ 4.25,  0.78,  3.77,  0.18,  2.95,  0.18], 
    [ 2.45,  0.18,  1.96,  0.43,  1.96,  0.67], 
    [ 1.96,  0.73,  1.98,  0.77,  2.05,  0.83], 
    [ 2.43,  1.18,  2.57,  1.46,  2.57,  1.81], 
    [ 2.57,  2.42,  2.14,  2.84,  1.51,  2.84], 
    [ 0.84,  2.84,  0.33,  2.33,  0.33,  1.65], 
    [ 0.33,  1.16,  0.60,  0.61,  1.02,  0.23], 
    [ 1.57,  -0.25,  2.35,  -0.50,  3.29,  -0.50], 
    [ 5.14,  -0.50,  6.37,  0.43,  6.37,  1.81], 
    [ 6.37,  2.81,  5.75,  3.52,  4.61,  3.84], 
    [ 4.51,  3.87,  4.42,  3.90,  4.27,  3.94], 
    [ 4.96,  4.03,  5.27,  4.12,  5.64,  4.33]
]);

JS.Drawings.drawTabFour = JS.Drawings.functionBuilder([
    [ 6.88,  5.50], 
    [ 6.88,  6.38, 'L'], 
    [ 5.57,  6.38, 'L'], 
    [ 5.57,  6.86, 'L'], 
    [ 5.57,  7.68,  5.57,  7.73,  5.66,  7.85], 
    [ 5.77,  7.97,  6.07,  8.03,  6.60,  8.03], 
    [ 6.74,  8.03, 'L'], 
    [ 6.74,  8.74, 'L'], 
    [ 2.30,  8.74, 'L'], 
    [ 2.30,  8.03, 'L'], 
    [ 2.44,  8.03, 'L'], 
    [ 3.03,  8.03,  3.33,  7.98,  3.43,  7.85], 
    [ 3.52,  7.73,  3.52,  7.68,  3.52,  6.86], 
    [ 3.52,  6.38, 'L'], 
    [ 0.00,  6.38, 'L'], 
    [ 0.00,  5.41, 'L'], 
    [ 4.75,  -0.50, 'L'], 
    [ 5.65,  -0.50, 'L'], 
    [ 5.60,  0.47,  5.57,  1.20,  5.57,  1.48], 
    [ 5.57,  5.50, 'L'], 
    [ 6.88,  5.50, 'L'], 
    [ 3.52,  2.24], 
    [ 0.95,  5.50, 'L'], 
    [ 3.52,  5.50, 'L'], 
    [ 3.52,  2.24, 'L']
]);

JS.Drawings.drawTabFive = JS.Drawings.functionBuilder([
    [ 1.45,  3.23], 
    [ 2.31,  2.84,  2.71,  2.74,  3.33,  2.74], 
    [ 5.21,  2.74,  6.58,  3.99,  6.58,  5.68], 
    [ 6.58,  7.60,  5.11,  8.92,  2.97,  8.92], 
    [ 1.17,  8.92,  0.00,  8.07,  0.00,  6.77], 
    [ 0.00,  5.96,  0.50,  5.44,  1.25,  5.44], 
    [ 1.92,  5.44,  2.36,  5.87,  2.36,  6.51], 
    [ 2.36,  6.95,  2.17,  7.20,  1.66,  7.45], 
    [ 1.54,  7.51,  1.50,  7.55,  1.50,  7.63], 
    [ 1.50,  7.90,  2.06,  8.18,  2.65,  8.18], 
    [ 3.69,  8.18,  4.25,  7.33,  4.25,  5.75], 
    [ 4.25,  4.34,  3.76,  3.62,  2.78,  3.62], 
    [ 2.24,  3.62,  1.72,  3.79,  1.33,  4.12], 
    [ 1.34,  4.20,  1.36,  4.27,  1.36,  4.33], 
    [ 1.36,  4.61,  1.11,  4.85,  0.82,  4.85], 
    [ 0.55,  4.85,  0.34,  4.64,  0.34,  4.37], 
    [ 0.34,  4.16,  0.39,  4.07,  0.68,  3.78], 
    [ 0.85,  1.52,  0.93,  0.54,  0.98,  -0.50], 
    [ 1.79,  -0.33,  2.44,  -0.28,  3.52,  -0.28], 
    [ 4.54,  -0.28,  5.45,  -0.36,  5.88,  -0.46], 
    [ 5.96,  -0.49,  6.04,  -0.50,  6.09,  -0.50], 
    [ 6.16,  -0.50,  6.20,  -0.43,  6.20,  -0.36], 
    [ 6.20,  -0.07,  6.00,  0.41,  5.75,  0.74], 
    [ 5.26,  1.38,  4.37,  1.74,  3.29,  1.74], 
    [ 2.78,  1.74,  2.26,  1.68,  1.64,  1.55], 
    [ 1.45,  3.23, 'L']
]);

JS.Drawings.drawTabSix = JS.Drawings.functionBuilder([
    [ 4.16,  3.17], 
    [ 5.70,  3.17,  6.78,  4.26,  6.78,  5.83], 
    [ 6.78,  7.61,  5.39,  8.92,  3.47,  8.92], 
    [ 2.40,  8.92,  1.53,  8.52,  0.89,  7.73], 
    [ 0.27,  6.97,  0.00,  6.05,  0.00,  4.74], 
    [ 0.00,  3.19,  0.35,  1.99,  1.12,  0.99], 
    [ 1.88,  -0.02,  2.84,  -0.50,  4.08,  -0.50], 
    [ 5.58,  -0.50,  6.54,  0.20,  6.54,  1.33], 
    [ 6.54,  2.04,  6.07,  2.50,  5.32,  2.50], 
    [ 4.64,  2.50,  4.17,  2.08,  4.17,  1.50], 
    [ 4.17,  1.24,  4.27,  0.95,  4.44,  0.73], 
    [ 4.53,  0.61,  4.54,  0.56,  4.54,  0.48], 
    [ 4.54,  0.30,  4.31,  0.18,  3.98,  0.18], 
    [ 3.09,  0.18,  2.51,  1.18,  2.32,  3.04], 
    [ 2.30,  3.28,  2.26,  3.87,  2.26,  4.03], 
    [ 2.80,  3.40,  3.33,  3.17,  4.16,  3.17], 
    [ 2.44,  5.03], 
    [ 2.37,  5.33,  2.34,  5.75,  2.34,  6.21], 
    [ 2.34,  7.55,  2.74,  8.31,  3.44,  8.31], 
    [ 4.14,  8.31,  4.51,  7.48,  4.51,  5.97], 
    [ 4.51,  4.80,  4.16,  4.17,  3.48,  4.14], 
    [ 2.99,  4.12,  2.58,  4.47,  2.44,  5.03]
]);

JS.Drawings.drawTabSeven = JS.Drawings.functionBuilder([
    [ 6.54,  0.05], 
    [ 4.59,  4.18,  4.34,  5.07,  4.34,  7.47], 
    [ 4.34,  8.41,  3.87,  8.92,  3.05,  8.92], 
    [ 2.32,  8.92,  1.85,  8.41,  1.85,  7.64], 
    [ 1.85,  7.11,  2.06,  6.47,  2.54,  5.53], 
    [ 2.61,  5.40,  3.16,  4.52,  4.20,  2.91], 
    [ 5.09,  1.59, 'L'], 
    [ 3.99,  1.61,  3.42,  1.63,  3.37,  1.63], 
    [ 2.97,  1.63,  2.31,  1.60,  1.88,  1.59], 
    [ 1.79,  1.57,  1.71,  1.57,  1.64,  1.57], 
    [ 1.19,  1.57,  1.10,  1.74,  0.85,  2.89], 
    [ 0.72,  3.48, 'L'], 
    [ 0.00,  3.40, 'L'], 
    [ 0.44,  -0.50, 'L'], 
    [ 1.74,  -0.36,  2.36,  -0.32,  3.56,  -0.32], 
    [ 4.91,  -0.32,  5.71,  -0.37,  6.54,  -0.50], 
    [ 6.54,  0.05, 'L']
]);

JS.Drawings.drawTabEight = JS.Drawings.functionBuilder([
    [ 6.77,  5.93], 
    [ 6.77,  7.72,  5.35,  8.92,  3.25,  8.92], 
    [ 1.27,  8.92,  0.00,  8.02,  0.00,  6.61], 
    [ 0.00,  5.85,  0.35,  5.25,  1.00,  4.91], 
    [ 1.23,  4.80,  1.40,  4.74,  1.80,  4.61], 
    [ 0.77,  4.07,  0.29,  3.31,  0.29,  2.28], 
    [ 0.29,  0.60,  1.59,  -0.50,  3.61,  -0.50], 
    [ 5.30,  -0.50,  6.44,  0.32,  6.44,  1.52], 
    [ 6.44,  2.12,  6.16,  2.66,  5.65,  3.01], 
    [ 5.47,  3.14,  5.27,  3.23,  4.91,  3.37], 
    [ 6.17,  3.88,  6.77,  4.71,  6.77,  5.93], 
    [ 1.70,  6.57], 
    [ 1.70,  7.61,  2.33,  8.24,  3.39,  8.24], 
    [ 4.41,  8.24,  5.15,  7.60,  5.15,  6.71], 
    [ 5.15,  6.05,  4.84,  5.70,  4.02,  5.41], 
    [ 3.69,  5.31,  3.05,  5.12,  2.50,  4.97], 
    [ 1.89,  5.48,  1.70,  5.87,  1.70,  6.57], 
    [ 4.27,  3.02], 
    [ 4.61,  2.72,  4.81,  2.20,  4.81,  1.67], 
    [ 4.81,  0.75,  4.27,  0.18,  3.39,  0.18], 
    [ 2.58,  0.18,  1.98,  0.71,  1.98,  1.43], 
    [ 1.98,  2.01,  2.39,  2.54,  2.97,  2.76], 
    [ 3.22,  2.85,  3.64,  2.97,  4.17,  3.10], 
    [ 4.20,  3.09,  4.20,  3.09,  4.21,  3.06], 
    [ 4.24,  3.05, 'L'], 
    [ 4.27,  3.02, 'L']
]);

JS.Drawings.drawTabNine = JS.Drawings.functionBuilder([
    [ 2.58,  5.31], 
    [ 1.10,  5.31,  0.00,  4.17,  0.00,  2.63], 
    [ 0.00,  0.82,  1.37,  -0.50,  3.26,  -0.50], 
    [ 4.36,  -0.50,  5.31,  -0.02,  5.98,  0.87], 
    [ 6.52,  1.61,  6.78,  2.51,  6.78,  3.70], 
    [ 6.78,  5.12,  6.44,  6.38,  5.79,  7.34], 
    [ 5.11,  8.37,  4.03,  8.92,  2.69,  8.92], 
    [ 1.21,  8.92,  0.26,  8.27,  0.26,  7.25], 
    [ 0.26,  6.49,  0.78,  5.94,  1.50,  5.94], 
    [ 2.15,  5.94,  2.60,  6.38,  2.60,  7.00], 
    [ 2.60,  7.29,  2.57,  7.37,  2.34,  7.74], 
    [ 2.28,  7.82,  2.26,  7.90,  2.26,  7.98], 
    [ 2.26,  8.14,  2.41,  8.24,  2.70,  8.24], 
    [ 3.74,  8.24,  4.32,  7.33,  4.46,  5.46], 
    [ 4.49,  5.15,  4.49,  5.02,  4.49,  4.44], 
    [ 3.94,  5.06,  3.39,  5.31,  2.58,  5.31], 
    [ 2.26,  2.33], 
    [ 2.26,  2.98,  2.34,  3.45,  2.48,  3.77], 
    [ 2.64,  4.09,  2.99,  4.33,  3.35,  4.33], 
    [ 4.02,  4.33,  4.44,  3.60,  4.44,  2.45], 
    [ 4.44,  1.85,  4.32,  1.14,  4.15,  0.77], 
    [ 3.99,  0.39,  3.70,  0.18,  3.36,  0.18], 
    [ 2.64,  0.18,  2.26,  0.91,  2.26,  2.33]
]);

JS.Drawings.drawTie = function(ctx, fromPosition, position, options)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);
        var length = (fromPosition.x - position.x + 6) / settings.scale;
        var paths = [
            [0,  7.5], 
            // [-9.5,  12.5,  17.5 + (fromPosition.x - position.x) / settings.scale,  12.5,  7.5 + (fromPosition.x - position.x) / settings.scale,  7.5], 
            // [ 17.5 + (fromPosition.x - position.x) / settings.scale,  10.5, -7.5,  10.5, 0,  7.5]
            [length * 0.25, 12.5, length * 0.75, 12.5, length, 7.5]
        ];

        // Start drawing
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "black"
        JS.Drawings.strokePaths(paths, ctx, position, settings);
        ctx.restore();
    }
}

JS.Drawings.drawHammer = function(ctx, fromPosition, position, options, hammerOn)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);
        var length = (fromPosition.x - position.x ) / settings.scale;
        var height = (position.x - fromPosition.x) *  0.20;
        height += 1.5;
        var yDiff = (position.y - fromPosition.y) / settings.scale;
        var yDiffNorm = Math.sqrt (yDiff * yDiff);
        var leftMargin = 4 * settings.scale
        var paths = [
            [leftMargin, -1.5], 
            // [-9.5,  - height,  17.5 + (fromPosition.x - position.x - 2) / settings.scale,  - height - yDiff,  8.5 + (fromPosition.x - position.x - 2) / settings.scale,  -2.5 - yDiff], 
            // [-9.5, - height - yDiff, 17.5 + (fromPosition.x - position.x - 2), - height - yDiff,  8.5 + (fromPosition.x - position.x - 2) / settings.scale, -2.5 - yDiff]
            [leftMargin + length * 0.25, - height - yDiffNorm, leftMargin + length * 0.75, - height - yDiffNorm, leftMargin + length, -1.5 - yDiff]
        ];

        // ctx.save();
        // ctx.beginPath();
        // ctx.font = "bold 16px Calibri"
        // if (hammerOn)
        // {
        //     ctx.fillText("h", @position.x + (options.width / 2) , @position.y)
        // }
        // else
        // {
        //     ctx.fillText(@chordName, @position.x + (options.width / 2) , @position.y)
        // }
        // ctx.stroke()
        // ctx.restore()
        // Start drawing
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "black"
        JS.Drawings.strokePaths(paths, ctx, position, settings);
        ctx.restore();
    }
}

JS.Drawings.drawSlide = function(ctx, fromPosition, position, options, slideup)
{
    if (ctx != null && JS.Drawings.isPosition(position))
    {
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);
        if (slideup)
            var paths = [
                [ 0,  1],
                [ 3.5 + (fromPosition.x - position.x)  / settings.scale,  7, 'L']
            ];
        else
            var paths = [
                [ 0,  7],
                [ 3.5 + (fromPosition.x - position.x)  / settings.scale,  1, 'L']
            ];            
        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "black"
        JS.Drawings.strokePaths(paths, ctx, position, settings);
        ctx.restore();
    }
}

JS.Drawings.drawVerticalBend = function(ctx, bendPosition, length, options, bendValue)
{
    if (ctx != null && JS.Drawings.isPosition(bendPosition))
    {
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);


        var paths = [
            [ 0.5 ,  5],
            [ 0.5,  5,  0.90 * length / settings.scale, 0, (length + 0.5) / settings.scale, -15]
        ];

        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black"
        JS.Drawings.strokePaths(paths, ctx, bendPosition, settings);
        ctx.restore();

        ctx.save();
        var side = 7 * settings.scale;
        var h = side * (Math.sqrt(3)/2);
        var x = bendPosition.x + length;
        var y = bendPosition.y;

        ctx.translate(x + 1, y - 15 * settings.scale);
        ctx.beginPath();
        ctx.moveTo(0, -h / 2);
        ctx.lineTo( -side / 2, h / 2);
        ctx.lineTo(side / 2, h / 2);
        ctx.lineTo(0, -h / 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        bendValue = bendValue / 4;
        font_size = 13 * settings.scale;
        ctx.font= font_size + "px Calibri";
        var text = bendValue == 1 ? "full" : bendValue;
        var textWidth = ctx.measureText(text).width;
        x = x - (textWidth / 2);
        ctx.fillText(text, x , y - 20 * settings.scale);
    }

}

JS.Drawings.drawUpBend = function(ctx, bendPosition, length, options, bendValue)
{
    if (ctx != null && JS.Drawings.isPosition(bendPosition))
    {
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);

        var paths = [
            [ 0,  5],
            [ 0,  5,  0.90 * length / settings.scale, 0, length / settings.scale, -15]
        ];


        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black"
        JS.Drawings.strokePaths(paths, ctx, bendPosition, settings);
        ctx.restore();

        ctx.save();
        var side = 7 * settings.scale;
        var h = side * (Math.sqrt(3)/2);
        var x = (bendPosition.x + length);
        var y = bendPosition.y;

        ctx.translate(x - 0.5 * settings.scale, y - 15 * settings.scale);
        ctx.beginPath();
        ctx.moveTo(0, -h / 2);
        ctx.lineTo( -side / 2, h / 2);
        ctx.lineTo(side / 2, h / 2);
        ctx.lineTo(0, -h / 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        var bendValue = bendValue / 4
        var font_size = 13 * settings.scale
        ctx.font= font_size + "px Calibri";
        var text = bendValue == 1 ? "full" : bendValue;
        var textWidth = ctx.measureText(text).width;
        if (options.isEol)
            x = x - textWidth;
        else
            x = x - (textWidth / 2); 
        ctx.fillText(text, x , y - 20 * settings.scale);
    }
}

JS.Drawings.drawDownBend = function(ctx, bendPosition, length, options)
{
    if (ctx != null && JS.Drawings.isPosition(bendPosition))
    {
        var settings = {
            'scale': 1.0
        };
        
        // Overing default settings with options
        jQuery.extend(settings, options);


        var paths = [
            [ 0,  -18],
            [ 0,  -18,  0.90 * length / settings.scale, -18, length / settings.scale, 0]
        ];

        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black"
        JS.Drawings.strokePaths(paths, ctx, bendPosition, settings);
        ctx.restore();

        ctx.save();
        var side = 7 * settings.scale;
        var h = side * (Math.sqrt(3)/2);
        var x = bendPosition.x + length;
        var y = bendPosition.y;

        ctx.translate(x, y + 2);

        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo( -side / 2, -h / 2);
        ctx.lineTo(side / 2, -h / 2);
        ctx.lineTo(0, h / 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}


JS.Drawings.drawVibrato = function(ctx, startPosition, endPosition, options)
{
    if (ctx != null && JS.Drawings.isPosition(startPosition) && JS.Drawings.isPosition(endPosition))
    {
        var settings = {
            'scale': 1.0
        };

        
        if (typeof (options.vibStart) != 'undefined' || options.vibStart != null)
        {
            // Overing default settings with options
            jQuery.extend(settings, options);

            var paths = [
                [14.91,  8.89], 
                [15.24,  8.89, 15.50,  9.16, 15.50,  9.49], 
                [15.50,  9.61, 15.48,  9.73, 15.42,  9.82], 
                [14.49, 11.22, 13.56, 12.60, 12.64, 14.00], 
                [12.52, 14.18, 12.34, 14.27, 12.13, 14.27], 
                [11.95, 14.27, 11.80, 14.21, 11.68, 14.06], 
                [ 8.75, 10.51, 'L'], 
                [ 6.42, 14.00, 'L'], 
                [ 6.30, 14.18,  6.12, 14.27,  5.91, 14.27], 
                [ 5.73, 14.27,  5.58, 14.21,  5.46, 14.06], 
                [ 2.50, 10.51, 'L'], 
                [ 2.20, 10.99,  1.87, 11.43,  1.58, 11.91], 
                [ 1.46, 12.09,  1.31, 12.18,  1.10, 12.18], 
                [ 0.77, 12.18,  0.50, 11.91,  0.50, 11.58], 
                [ 0.50, 11.46,  0.53, 11.34,  0.59, 11.25], 
                [ 1.52,  9.85,  2.44,  8.47,  3.37,  7.07], 
                [ 3.49,  6.89,  3.67,  6.80,  3.88,  6.80], 
                [ 4.06,  6.80,  4.21,  6.86,  4.33,  7.01], 
                [ 7.26, 10.57, 'L'], 
                [ 9.59,  7.07, 'L'], 
                [ 9.71,  6.89,  9.89,  6.80, 10.09,  6.80], 
                [10.27,  6.80, 10.42,  6.86, 10.54,  7.01], 
                [13.50, 10.57, 'L'], 
                [13.80, 10.09, 14.13,  9.64, 14.43,  9.16], 
                [14.55,  8.98, 14.70,  8.89, 14.91,  8.89] 
            ]

            var length = options.paddingRight;

            var y = (startPosition.y - 5 * settings.scale);
            var x = startPosition.x
            y = Math.round(y)

            ctx.save();
            while (x < endPosition.x - 13)
            {
                JS.Drawings.drawPaths(paths, ctx, {'x': x,'y': y }, settings);
                x += 13 * settings.scale
            }
            // ctx.strokeStyle = "red"
            // ctx.beginPath();
            // ctx.moveTo(startPosition.x, y - 3.5 * settings.scale);
            // ctx.lineTo(endPosition.x, y - 3.5 * settings.scale);
            // ctx.stroke();
            // ctx.closePath();

            ctx.restore();

        }
    }
}

JS.Drawings.drawLetRing = function(ctx, startPosition, endPosition, options)
{
    if (ctx != null && JS.Drawings.isPosition(startPosition) && JS.Drawings.isPosition(endPosition))
    {
        var settings = {
            'scale': 1.0
        };
        

        if (typeof (options.lrStart) != 'undefined' || options.lrStart != null)
        {
            // Overing default settings with options
            jQuery.extend(settings, options);

            var length = options.paddingRight;

            var x = startPosition.x;
            var y = (startPosition.y - 5 * settings.scale);
            var font_size = Math.round (11 * settings.scale)
            ctx.font= font_size + "px Calibri";
            var text = "let ring"
            var textWidth = ctx.measureText(text).width;
            var textWidth = 33 * options.scale
            x = x - (textWidth / 2);
            ctx.fillText(text, x , y);
            x += 4 * settings.scale + textWidth

            y = Math.round(y)
            var extendLR = false;
            while (x < (endPosition.x - 4 * settings.scale)) {
                ctx.beginPath();
                ctx.moveTo(x, y - 3.5 * settings.scale);
                ctx.lineTo(x + 4 * settings.scale, y - 3.5 * settings.scale);
                ctx.stroke();
                ctx.closePath();
                x += 8 * settings.scale;
                extendLR = true;
            }
            if (extendLR)
            {
                x = Math.round(x)
                ctx.beginPath();
                ctx.moveTo(x + 0.5, y - 6.5 * settings.scale);
                ctx.lineTo(x + 0.5, y);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    }
}

JS.Drawings.drawPalmMute = function(ctx, startPosition, endPosition, options)
{
    if (ctx != null && JS.Drawings.isPosition(startPosition) && JS.Drawings.isPosition(endPosition))
    {
        var settings = {
            'scale': 1.0
        };
        

        if (typeof (options.pmStart) != 'undefined' || options.pmStart != null)
        {
            // Overing default settings with options
            jQuery.extend(settings, options);

            var length = options.paddingRight;

            var x = startPosition.x;
            var y = (startPosition.y - 5 * settings.scale);
            var font_size = 11 * settings.scale
            ctx.font= font_size + "px Calibri";
            var text = "P.M."
            var textWidth = ctx.measureText(text).width;
            var textWidth = 28 * options.scale
            x = x - (textWidth / 2);
            ctx.fillText(text, x , y);
            x += 4 * settings.scale + textWidth

            y = Math.round(y)
            var extendLR = false;
            while (x < (endPosition.x - 4 * settings.scale)) {
                ctx.beginPath();
                ctx.moveTo(x, y - 3.5 * settings.scale);
                ctx.lineTo(x + 4 * settings.scale, y - 3.5 * settings.scale);
                ctx.stroke();
                ctx.closePath();
                x += 8 * settings.scale;
                extendLR = true;
            }
            if (extendLR)
            {
                x = Math.round(x)
                ctx.beginPath();
                ctx.moveTo(x + 0.5, y - 6.5 * settings.scale);
                ctx.lineTo(x + 0.5, y);
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    }
}


JS.Drawings.drawTopBeam = function() {
    
    return function(ctx, p1, p2, opt) {
        if (ctx !== null && JS.Drawings.isPosition(p1) && JS.Drawings.isPosition(p2)){

            var settings = {
                scale: 1.0,
                xPadding: 9.20,
                yPadding: -21.7,
                gap: 0
            }
            // Overing default settings with options
            jQuery.extend(settings, opt);

            settings.yPadding += settings.gap;

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth *= Math.round(settings.lineWidth * settings.scale);
            ctx.lineCap = "butt";
            //[ 9.20, -21.65 - settings.height , 'L'],
            ctx.moveTo(p1.x + settings.xPadding * settings.scale, p1.y + settings.yPadding * settings.scale);
            ctx.lineTo(p2.x + settings.xPadding * settings.scale, p2.y + settings.yPadding * settings.scale);
            ctx.lineTo(p2.x + settings.xPadding * settings.scale, p2.y + (settings.yPadding + 3) * settings.scale);
            ctx.lineTo(p1.x + settings.xPadding * settings.scale, p1.y + (settings.yPadding + 3) * settings.scale);
            ctx.fill();
            ctx.restore();
        }
    };
}();

JS.Drawings.drawBottomBeam = function() {
    
    return function(ctx, p1, p2, opt) {
        if (ctx !== null && JS.Drawings.isPosition(p1) && JS.Drawings.isPosition(p2)){

            var settings = {
                scale: 1.0,
                xPadding: 0.50,
                yPadding: 26.57,
                gap: 0
            }
            // Overing default settings with options
            jQuery.extend(settings, opt);

            settings.yPadding -= settings.gap;

            ctx.save();
            ctx.beginPath();
            ctx.lineWidth *= Math.round(settings.lineWidth * settings.scale);
            ctx.lineCap = "butt";
            // 0.50, 29.07
            ctx.moveTo(p1.x + settings.xPadding * settings.scale, p1.y + settings.yPadding * settings.scale);
            ctx.lineTo(p2.x + settings.xPadding * settings.scale, p2.y + settings.yPadding * settings.scale);
            ctx.lineTo(p2.x + settings.xPadding * settings.scale, p2.y + (settings.yPadding + 3) * settings.scale);
            ctx.lineTo(p1.x + settings.xPadding * settings.scale, p1.y + (settings.yPadding + 3) * settings.scale);
            ctx.fill();
            ctx.restore();
        }
    };
}();

JS.Drawings.drawWholeRest = JS.Drawings.functionBuilder([
    [ 0.29, 19.54],
    [ 0.12, 19.54,  0.00, 19.42,  0.00, 19.25],
    [ 0.00, 15.29, 'L'],
    [ 0.00, 15.12,  0.12, 15.00,  0.29, 15.00],
    [10.61, 15.00, 'L'],
    [10.79, 15.00, 10.90, 15.12, 10.90, 15.29],
    [10.90, 19.25, 'L'],
    [10.90, 19.42, 10.79, 19.54, 10.61, 19.54],
    [ 0.29, 19.54, 'L']
]);

JS.Drawings.drawHalfRest = function(ctx, pos, opt) {
    var settings = jQuery.extend({scale: 1.0}, opt);
    JS.Drawings.drawWholeRest(ctx, {x: pos.x, y: pos.y + 2.9 * settings.scale}, opt);
};

JS.Drawings.drawQuarterRest = JS.Drawings.functionBuilder([
    [ 4.10, 22.45],
    [ 4.10, 21.73,  3.87, 21.03,  3.37, 20.45],
    [ 2.36, 19.23, 'L'],
    [ 2.30, 19.14,  2.24, 19.05,  2.24, 18.94],
    [ 2.24, 18.70,  2.47, 18.50,  2.73, 18.50],
    [ 2.85, 18.50,  2.97, 18.53,  3.05, 18.65],
    [ 7.44, 23.88, 'L'],
    [ 7.65, 24.14,  7.74, 24.37,  7.74, 24.61],
    [ 7.74, 26.35,  4.13, 27.05,  4.13, 29.90],
    [ 4.13, 30.63,  4.36, 31.32,  4.83, 31.91],
    [ 7.27, 34.78, 'L'],
    [ 7.36, 34.87,  7.39, 34.99,  7.39, 35.07],
    [ 7.39, 35.34,  7.15, 35.54,  6.92, 35.54],
    [ 6.69, 35.54,  5.64, 34.26,  3.75, 34.26],
    [ 2.94, 34.26,  2.21, 34.58,  2.21, 36.21],
    [ 2.21, 37.23,  2.53, 38.36,  3.02, 38.94],
    [ 3.17, 39.12,  3.02, 39.32,  2.85, 39.32],
    [ 2.47, 39.32,  0.00, 35.51,  0.00, 33.39],
    [ 0.00, 32.34,  0.55, 32.17,  1.16, 32.17],
    [ 2.12, 32.17,  3.43, 32.54,  4.62, 33.07],
    [ 0.79, 28.47, 'L'],
    [ 0.58, 28.24,  0.49, 27.98,  0.49, 27.75],
    [ 0.49, 26.03,  4.10, 25.30,  4.10, 22.45]
]);

JS.Drawings.drawEighthRest = JS.Drawings.functionBuilder([
    [ 4.77, 26.85],
    [ 5.20, 26.85,  6.34, 25.45,  6.54, 25.02],
    [ 6.72, 24.64,  7.21, 24.67,  7.36, 25.02],
    [ 3.78, 37.23, 'L'],
    [ 3.55, 37.43,  3.26, 37.52,  3.00, 37.52],
    [ 2.70, 37.52,  2.41, 37.43,  2.18, 37.23],
    [ 5.58, 27.75, 'L'],
    [ 4.59, 28.10,  3.58, 28.39,  2.53, 28.39],
    [ 1.19, 28.39,  0.00, 27.43,  0.00, 26.09],
    [ 0.00, 24.93,  0.96, 24.00,  2.12, 24.00],
    [ 4.51, 24.00,  3.43, 26.85,  4.77, 26.85]
]);

JS.Drawings.drawSixteenthRest = JS.Drawings.functionBuilder([
    [ 7.01, 26.85],
    [ 7.47, 26.85,  8.46, 25.42,  8.67, 25.02],
    [ 8.84, 24.64,  9.33, 24.67,  9.48, 25.02],
    [ 4.27, 44.50, 'L'],
    [ 4.04, 44.70,  3.78, 44.79,  3.49, 44.79],
    [ 3.20, 44.79,  2.91, 44.70,  2.67, 44.50],
    [ 5.61, 34.99, 'L'],
    [ 4.62, 35.37,  3.58, 35.66,  2.53, 35.66],
    [ 1.19, 35.66,  0.00, 34.70,  0.00, 33.36],
    [ 0.00, 32.20,  0.96, 31.27,  2.09, 31.27],
    [ 4.51, 31.27,  3.40, 34.12,  4.74, 34.12],
    [ 5.23, 34.12,  6.34, 32.64,  6.48, 32.14],
    [ 7.82, 27.75, 'L'],
    [ 6.86, 28.10,  5.84, 28.39,  4.80, 28.39],
    [ 3.46, 28.39,  2.27, 27.43,  2.27, 26.09],
    [ 2.27, 24.93,  3.23, 24.00,  4.39, 24.00],
    [ 6.78, 24.00,  5.70, 26.85,  7.01, 26.85]
]);

JS.Drawings.drawThirtySecondRest = JS.Drawings.functionBuilder([
    [ 8.72, 19.55],
    [ 9.16, 19.55, 10.06, 18.12, 10.24, 17.72],
    [10.41, 17.34, 10.90, 17.37, 11.05, 17.72],
    [ 4.77, 44.47, 'L'],
    [ 4.54, 44.67,  4.24, 44.76,  3.95, 44.76],
    [ 3.69, 44.76,  3.40, 44.67,  3.17, 44.47],
    [ 5.67, 34.96, 'L'],
    [ 4.65, 35.31,  3.61, 35.63,  2.53, 35.63],
    [ 1.16, 35.63,  0.00, 34.67,  0.00, 33.33],
    [ 0.00, 32.17,  0.93, 31.24,  2.09, 31.24],
    [ 4.48, 31.24,  3.40, 34.09,  4.74, 34.09],
    [ 5.20, 34.09,  6.31, 32.55,  6.45, 32.02],
    [ 7.59, 27.69, 'L'],
    [ 6.60, 28.04,  5.58, 28.36,  4.51, 28.36],
    [ 3.17, 28.36,  1.98, 27.40,  1.98, 26.06],
    [ 1.98, 24.90,  2.94, 23.97,  4.10, 23.97],
    [ 6.48, 23.97,  5.41, 26.82,  6.72, 26.82],
    [ 7.18, 26.82,  8.23, 25.34,  8.34, 24.84],
    [ 9.51, 20.45, 'L'],
    [ 8.55, 20.80,  7.53, 21.09,  6.51, 21.09],
    [ 5.18, 21.09,  3.98, 20.13,  3.98, 18.79],
    [ 3.98, 17.63,  4.91, 16.70,  6.08, 16.70],
    [ 8.49, 16.70,  7.39, 19.55,  8.72, 19.55]
]);

JS.Drawings.drawSixtyFourthRest = JS.Drawings.functionBuilder([
    [ 9.94, 19.55],
    [10.35, 19.55, 11.14, 18.10, 11.31, 17.72],
    [11.46, 17.34, 11.98, 17.37, 12.12, 17.72],
    [ 5.29, 51.74, 'L'],
    [ 5.06, 51.94,  4.77, 52.03,  4.48, 52.03],
    [ 4.19, 52.03,  3.93, 51.94,  3.69, 51.74],
    [ 5.82, 42.20, 'L'],
    [ 4.77, 42.58,  3.66, 42.90,  2.53, 42.90],
    [ 1.19, 42.90,  0.00, 41.94,  0.00, 40.60],
    [ 0.00, 39.44,  0.96, 38.51,  2.12, 38.51],
    [ 4.51, 38.51,  3.43, 41.36,  4.74, 41.36],
    [ 5.26, 41.36,  6.37, 39.76,  6.48, 39.23],
    [ 7.44, 34.96, 'L'],
    [ 6.43, 35.31,  5.35, 35.63,  4.27, 35.63],
    [ 2.91, 35.63,  1.74, 34.67,  1.74, 33.33],
    [ 1.74, 32.17,  2.67, 31.24,  3.84, 31.24],
    [ 6.22, 31.24,  5.15, 34.09,  6.48, 34.09],
    [ 6.95, 34.09,  7.97, 32.55,  8.08, 32.02],
    [ 9.07, 27.69, 'L'],
    [ 8.08, 28.07,  7.04, 28.36,  5.99, 28.36],
    [ 4.65, 28.36,  3.46, 27.40,  3.46, 26.06],
    [ 3.46, 24.90,  4.42, 23.97,  5.58, 23.97],
    [ 7.97, 23.97,  6.89, 26.82,  8.20, 26.82],
    [ 8.66, 26.82,  9.60, 25.31,  9.71, 24.84],
    [10.70, 20.45, 'L'],
    [ 9.74, 20.80,  8.75, 21.09,  7.74, 21.09],
    [ 6.37, 21.09,  5.21, 20.13,  5.21, 18.79],
    [ 5.21, 17.63,  6.14, 16.70,  7.30, 16.70],
    [ 9.68, 16.70,  8.61, 19.55,  9.94, 19.55]
]);

JS.Drawings.drawHundredTwentyEighthRest = JS.Drawings.functionBuilder([
    [10.61, 12.25],
    [11.02, 12.25, 11.66, 10.80, 11.84, 10.42],
    [11.98, 10.04, 12.50, 10.07, 12.65, 10.42],
    [ 5.76, 51.71, 'L'],
    [ 5.53, 51.91,  5.23, 52.00,  4.94, 52.00],
    [ 4.68, 52.00,  4.39, 51.91,  4.16, 51.71],
    [ 5.93, 42.14, 'L'],
    [ 4.83, 42.52,  3.69, 42.87,  2.53, 42.87],
    [ 1.16, 42.87,  0.00, 41.91,  0.00, 40.57],
    [ 0.00, 39.41,  0.93, 38.48,  2.09, 38.48],
    [ 4.48, 38.48,  3.40, 41.33,  4.74, 41.33],
    [ 5.23, 41.33,  6.40, 39.67,  6.48, 39.12],
    [ 7.27, 34.90, 'L'],
    [ 6.22, 35.28,  5.12, 35.60,  3.98, 35.60],
    [ 2.65, 35.60,  1.45, 34.64,  1.45, 33.30],
    [ 1.45, 32.14,  2.39, 31.21,  3.55, 31.21],
    [ 5.96, 31.21,  4.86, 34.06,  6.19, 34.06],
    [ 6.69, 34.06,  7.74, 32.46,  7.82, 31.94],
    [ 8.61, 27.66, 'L'],
    [ 7.59, 28.01,  6.54, 28.33,  5.47, 28.33],
    [ 4.10, 28.33,  2.94, 27.37,  2.94, 26.03],
    [ 2.94, 24.87,  3.87, 23.94,  5.03, 23.94],
    [ 7.42, 23.94,  6.34, 26.79,  7.68, 26.79],
    [ 8.14, 26.79,  9.07, 25.25,  9.16, 24.72],
    [ 9.98, 20.42, 'L'],
    [ 8.99, 20.77,  7.97, 21.06,  6.92, 21.06],
    [ 5.58, 21.06,  4.39, 20.10,  4.39, 18.76],
    [ 4.39, 17.60,  5.32, 16.67,  6.48, 16.67],
    [ 8.90, 16.67,  7.79, 19.52,  9.13, 19.52],
    [ 9.57, 19.52, 10.41, 18.01, 10.50, 17.54],
    [11.31, 13.15, 'L'],
    [10.35, 13.50,  9.39, 13.79,  8.40, 13.79],
    [ 7.04, 13.79,  5.87, 12.83,  5.87, 11.49],
    [ 5.87, 10.33,  6.80,  9.40,  7.97,  9.40],
    [10.35,  9.40,  9.28, 12.25, 10.61, 12.25]
]);
JS.Drawings.drawTrebleClef = JS.Drawings.functionBuilder([
	[13.55, 44.09],
	[13.58, 44.67, 13.58, 45.22, 13.58, 45.81],
	[13.58, 46.94, 13.52, 48.10, 13.43, 49.24],
	[13.11, 52.82, 10.85, 56.01,  7.47, 56.01],
	[ 4.13, 56.01,  1.31, 53.48,  1.31, 50.23],
	[ 1.31, 48.54,  2.85, 47.20,  4.57, 47.20],
	[ 6.13, 47.20,  7.33, 48.60,  7.33, 50.23],
	[ 7.33, 51.74,  6.11, 52.99,  4.57, 52.99],
	[ 4.27, 52.99,  3.98, 52.93,  3.69, 52.82],
	[ 4.54, 54.01,  5.93, 54.79,  7.47, 54.79],
	[10.24, 54.79, 11.95, 52.03, 12.21, 49.09],
	[12.30, 47.99, 12.36, 46.88, 12.36, 45.78],
	[12.36, 45.31, 12.33, 44.88, 12.33, 44.41],
	[11.63, 44.56, 10.90, 44.61, 10.18, 44.61],
	[ 4.54, 44.61,  0.00, 39.96,  0.00, 34.29],
	[ 0.00, 28.91,  3.63, 24.81,  6.95, 20.60],
	[ 5.70, 16.85,  4.97, 14.08,  4.97,  9.95],
	[ 4.97,  4.34,  8.93,  0.65,  9.39,  0.65],
	[10.29,  0.65, 14.19,  6.67, 14.19, 11.52],
	[14.19, 15.94, 11.72, 19.49,  9.01, 22.95],
	[ 9.71, 25.08, 10.38, 27.20, 10.99, 29.35],
	[15.59, 29.38, 18.55, 33.16, 18.55, 37.05],
	[18.55, 40.60, 16.17, 43.22, 13.55, 44.09],
	[ 4.74, 35.19],
	[ 4.74, 32.55,  6.54, 29.96,  9.71, 29.44],
	[ 9.22, 27.63,  8.66, 25.89,  8.08, 24.12],
	[ 5.09, 27.92,  2.09, 31.73,  2.09, 36.59],
	[ 2.09, 40.34,  6.22, 43.36, 10.18, 43.36],
	[10.87, 43.36, 11.57, 43.34, 12.27, 43.19],
	[12.04, 39.53, 11.34, 35.75, 10.53, 32.46],
	[ 8.03, 32.64,  6.63, 34.26,  6.63, 36.01],
	[ 6.63, 37.34,  7.44, 38.77,  9.19, 39.64],
	[ 9.33, 39.79,  9.42, 39.93,  9.42, 40.11],
	[ 9.42, 40.43,  9.13, 40.75,  8.78, 40.75],
	[ 8.32, 40.75,  4.74, 39.06,  4.74, 35.19],
	[ 6.45, 13.10],
	[ 6.45, 14.35,  6.86, 16.35,  7.85, 19.40],
	[10.15, 16.32, 12.10, 13.10, 12.10,  9.20],
	[12.10,  7.31, 11.89,  6.52, 10.96,  4.87],
	[ 8.14,  6.67,  6.45,  9.75,  6.45, 13.10],
	[16.66, 38.10],
	[16.66, 35.51, 14.80, 32.95, 11.81, 32.52],
	[12.59, 35.72, 13.26, 39.35, 13.49, 42.87],
	[15.15, 42.23, 16.66, 40.49, 16.66, 38.10]
]);

JS.Drawings.drawBassClef = JS.Drawings.functionBuilder([
	[15.43, 22.20],
	[15.43, 29.74,  7.89, 34.07,  0.63, 37.14],
	[ 0.54, 37.23,  0.46, 37.26,  0.37, 37.26],
	[ 0.17, 37.26,  0.00, 37.08,  0.00, 36.88],
	[ 0.00, 36.80,  0.03, 36.71,  0.11, 36.63],
	[ 5.91, 33.27, 11.93, 29.02, 11.93, 22.49],
	[11.93, 19.04, 10.13, 15.75,  7.03, 15.75],
	[ 4.90, 15.75,  3.33, 17.29,  2.61, 19.36],
	[ 2.93, 19.22,  3.27, 19.13,  3.58, 19.13],
	[ 5.19, 19.13,  6.45, 20.42,  6.45, 22.00],
	[ 6.45, 23.66,  5.22, 25.04,  3.58, 25.04],
	[ 1.89, 25.04,  0.37, 23.69,  0.37, 22.00],
	[ 0.37, 18.21,  3.30, 15.00,  7.03, 15.00],
	[11.96, 15.00, 15.43, 17.52, 15.43, 22.20],
	[17.81, 17.49],
	[18.64, 17.49, 19.27, 18.15, 19.27, 18.96],
	[19.27, 19.76, 18.64, 20.42, 17.81, 20.42],
	[17.01, 20.42, 16.35, 19.76, 16.35, 18.96],
	[16.35, 18.15, 17.01, 17.49, 17.81, 17.49],
	[17.81, 24.67],
	[18.64, 24.67, 19.27, 25.33, 19.27, 26.13],
	[19.27, 26.93, 18.64, 27.59, 17.81, 27.59],
	[17.01, 27.59, 16.35, 26.93, 16.35, 26.13],
	[16.35, 25.33, 17.01, 24.67, 17.81, 24.67],
]);

JS.Drawings.drawAltoClef = JS.Drawings.functionBuilder([
	[ 0.37, 44.26],
	[ 0.15, 44.26,  0.00, 44.11,  0.00, 43.89],
	[ 0.00, 15.32, 'L'],
	[ 0.00, 15.10,  0.15, 14.95,  0.37, 14.95],
	[ 3.74, 14.95, 'L'],
	[ 3.96, 14.95,  4.10, 15.10,  4.10, 15.32],
	[ 4.10, 43.89, 'L'],
	[ 4.10, 44.11,  3.96, 44.26,  3.74, 44.26],
	[ 0.37, 44.26, 'L'],
	[10.92, 31.69],
	[11.80, 31.69, 12.53, 30.70, 13.44, 30.70],
	[17.07, 30.70, 20.11, 33.42, 20.11, 36.93],
	[20.11, 41.84, 17.55, 44.26, 12.60, 44.26],
	[10.19, 44.26,  8.17, 42.46,  8.17, 40.12],
	[ 8.17, 38.91,  9.16, 37.92, 10.37, 37.92],
	[11.58, 37.92, 12.60, 38.91, 12.60, 40.12],
	[12.60, 41.26, 11.28, 41.26, 11.28, 42.35],
	[11.28, 42.98, 11.91, 43.38, 12.60, 43.38],
	[15.94, 43.38, 16.56, 40.74, 16.56, 36.93],
	[16.56, 33.78, 16.19, 31.58, 13.44, 31.58],
	[11.43, 31.58, 10.15, 33.64, 10.15, 35.83],
	[10.15, 36.13,  9.93, 36.27,  9.71, 36.27],
	[ 9.49, 36.27,  9.23, 36.13,  9.23, 35.83],
	[ 9.23, 33.67,  8.35, 31.62,  6.81, 30.16],
	[ 6.81, 43.89, 'L'],
	[ 6.81, 44.11,  6.63, 44.26,  6.45, 44.26],
	[ 5.83, 44.26, 'L'],
	[ 5.61, 44.26,  5.46, 44.11,  5.46, 43.89],
	[ 5.46, 15.32, 'L'],
	[ 5.46, 15.10,  5.61, 14.95,  5.83, 14.95],
	[ 6.45, 14.95, 'L'],
	[ 6.63, 14.95,  6.81, 15.10,  6.81, 15.32],
	[ 6.81, 29.06, 'L'],
	[ 8.35, 27.59,  9.23, 25.54,  9.23, 23.38],
	[ 9.23, 23.08,  9.49, 22.94,  9.71, 22.94],
	[ 9.93, 22.94, 10.15, 23.08, 10.15, 23.38],
	[10.15, 25.58, 11.43, 27.63, 13.44, 27.63],
	[16.19, 27.63, 16.56, 25.43, 16.56, 22.28],
	[16.56, 18.47, 15.94, 15.87, 12.60, 15.87],
	[11.91, 15.87, 11.28, 16.23, 11.28, 16.85],
	[11.28, 17.95, 12.60, 17.95, 12.60, 19.09],
	[12.60, 20.30, 11.58, 21.29, 10.37, 21.29],
	[ 9.16, 21.29,  8.17, 20.30,  8.17, 19.09],
	[ 8.17, 16.75, 10.19, 14.95, 12.60, 14.95],
	[17.55, 14.95, 20.11, 17.37, 20.11, 22.28],
	[20.11, 25.79, 17.07, 28.51, 13.44, 28.51],
	[12.53, 28.51, 11.80, 27.52, 10.92, 27.52],
	[ 9.89, 27.52,  9.71, 28.54,  9.71, 29.60],
	[ 9.71, 30.52,  9.82, 31.69, 10.92, 31.69]
]);

JS.Drawings.drawTabClef = JS.Drawings.functionBuilder([
	[ 2.43, 33.83],
	[ 4.46, 33.83,  9.55, 27.93, 11.39, 22.33],
	[11.69, 21.51, 12.39, 21.26, 13.09, 21.26],
	[13.94, 21.26, 14.75, 21.66, 14.75, 22.14],
	[14.23, 33.39, 14.34, 33.83, 14.86, 33.83],
	[15.34, 33.83, 16.23, 33.24, 16.48, 33.24],
	[16.63, 33.24, 16.74, 33.46, 16.74, 33.72],
	[16.74, 33.94, 16.67, 34.20, 16.41, 34.27],
	[15.49, 34.57, 14.71, 35.31, 13.83, 35.31],
	[12.87, 35.31, 11.84, 34.27, 11.36, 27.93],
	[10.58, 28.96,  9.74, 29.96,  8.81, 30.92],
	[ 9.40, 31.99, 10.55, 31.88, 11.03, 31.88],
	[11.17, 31.88, 11.25, 32.10, 11.25, 32.32],
	[11.25, 33.06, 10.14, 33.17,  9.59, 33.17],
	[ 8.67, 33.17,  7.97, 32.80,  7.56, 32.17],
	[ 6.42, 33.20, 'L'],
	[ 5.16, 34.27,  3.76, 35.27,  2.43, 35.27],
	[ 1.55, 35.27,  0.00, 34.31,  0.00, 34.09],
	[ 0.00, 33.76,  0.33, 33.24,  0.74, 33.24],
	[ 1.07, 33.24,  1.77, 33.83,  2.43, 33.83],
	[ 5.31, 43.05],
	[ 4.02, 43.05,  2.80, 42.20,  2.80, 40.87],
	[ 2.80, 38.44,  6.31, 37.04,  9.70, 37.04],
	[12.72, 37.04, 16.08, 37.67, 16.08, 40.06],
	[16.08, 41.35, 15.19, 42.57, 14.01, 43.31],
	[15.71, 43.64, 17.04, 44.38, 17.04, 46.00],
	[17.04, 48.36, 14.49, 50.64, 11.73, 50.64],
	[ 9.66, 50.64,  8.48, 49.24,  8.48, 48.88],
	[ 8.48, 48.54,  8.96, 48.14,  9.29, 48.14],
	[ 9.74, 48.14,  9.74, 48.88, 10.92, 48.88],
	[12.17, 48.88, 13.72, 47.73, 13.72, 46.15],
	[13.72, 44.78, 12.24, 44.26, 10.73, 44.26],
	[10.55, 44.26, 10.47, 44.04, 10.47, 43.82],
	[10.47, 43.49, 10.62, 43.09, 11.03, 43.09],
	[12.09, 43.09, 13.05, 41.94, 13.05, 40.80],
	[13.05, 40.25, 12.83, 38.99, 10.69, 38.59],
	[ 9.51, 45.08, 'L'],
	[ 8.92, 48.10,  7.01, 51.01,  4.83, 51.01],
	[ 3.58, 51.01,  2.84, 50.05,  1.99, 49.46],
	[ 1.88, 49.39,  1.85, 49.32,  1.85, 49.21],
	[ 1.85, 48.88,  2.21, 48.43,  2.54, 48.43],
	[ 3.03, 48.43,  3.61, 49.54,  4.72, 49.54],
	[ 6.64, 49.54,  7.34, 46.59,  7.34, 43.79],
	[ 7.34, 43.53, 'L'],
	[ 7.34, 42.50,  7.56, 40.32,  7.86, 38.73],
	[ 6.67, 39.14,  5.79, 39.91,  5.79, 40.80],
	[ 5.79, 41.72,  6.53, 41.61,  6.53, 42.27],
	[ 6.53, 42.57,  6.53, 43.05,  5.31, 43.05],
	[ 5.94, 14.51],
	[ 4.50, 14.51,  3.25, 13.44,  3.25, 12.04],
	[ 3.25,  9.20,  7.12,  8.50, 10.10,  8.50],
	[11.47,  8.50, 13.61,  9.72, 15.12,  9.72],
	[17.22,  9.72, 18.29,  8.42, 18.62,  8.42],
	[18.95,  8.42, 19.32,  8.76, 19.32,  8.98],
	[19.32,  9.20, 17.44, 11.19, 14.90, 11.19],
	[14.38, 11.19, 13.97, 11.12, 13.61, 11.01],
	[13.35, 12.74, 12.87, 15.50, 12.57, 16.72],
	[11.95, 19.52,  9.96, 22.18,  7.78, 22.18],
	[ 6.31, 22.18,  5.57, 21.04,  4.39, 20.26],
	[ 4.28, 20.19,  4.24, 20.11,  4.24, 20.00],
	[ 4.24, 19.67,  4.57, 19.23,  4.90, 19.23],
	[ 5.42, 19.23,  6.23, 20.67,  7.34, 20.67],
	[10.22, 20.67,  9.74, 15.14, 10.51, 10.08],
	[10.14, 10.01,  9.81,  9.94,  9.55,  9.94],
	[ 7.74,  9.94,  6.23, 10.78,  6.23, 12.00],
	[ 6.23, 13.18,  7.15, 13.03,  7.15, 13.81],
	[ 7.15, 14.21,  6.90, 14.51,  5.94, 14.51]
]);

JS.Drawings.drawPercussionsClef = JS.Drawings.functionBuilder([
	[ 2.79, 36.99],
	[ 2.65, 36.99,  2.50, 36.87,  2.50, 36.70],
	[ 2.50, 22.74, 'L'],
	[ 2.50, 22.57,  2.65, 22.45,  2.79, 22.45],
	[ 5.50, 22.45, 'L'],
	[ 5.67, 22.45,  5.79, 22.57,  5.79, 22.74],
	[ 5.79, 36.70, 'L'],
	[ 5.79, 36.87,  5.67, 36.99,  5.50, 36.99],
	[ 2.79, 36.99, 'L'],
	[ 9.22, 36.99],
	[ 9.04, 36.99,  8.93, 36.87,  8.93, 36.70],
	[ 8.93, 22.74, 'L'],
	[ 8.93, 22.57,  9.04, 22.45,  9.22, 22.45],
	[11.89, 22.45, 'L'],
	[12.07, 22.45, 12.18, 22.57, 12.18, 22.74],
	[12.18, 36.70, 'L'],
	[12.18, 36.87, 12.07, 36.99, 11.89, 36.99],
	[ 9.22, 36.99, 'L']
]);
(function() {
  var Duration, DurationBuilder;

  Duration = (function() {

    function Duration(base, dots) {
      this.dots = dots != null ? dots : 0;
      if (typeof base === "number" && this.isPowerOfTwo(base)) {
        this.base = base;
      } else {
        throw "'" + base + " is not a valid duration. Must be a number, power of two.";
      }
    }

    Duration.prototype.isPowerOfTwo = function(n) {
      return (n !== 0) && ((n & (n - 1)) === 0);
    };

    Duration.prototype.getBase = function() {
      return this.base;
    };

    Duration.prototype.addDot = function() {
      return this.dots++;
    };

    Duration.prototype.setDots = function(dots) {
      this.dots = dots;
    };

    Duration.prototype.getDots = function() {
      return this.dots;
    };

    Duration.prototype.removeDot = function() {
      if (this.dots > 0) {
        return this.dots--;
      }
    };

    Duration.prototype.getTicks = function(resolution) {
      var ticks, tmpBase, tmpDots;
      ticks = resolution / this.base;
      if (this.dots > 0) {
        tmpDots = this.dots;
        tmpBase = ticks;
        while (tmpDots-- > 0) {
          tmpBase = tmpBase / 2;
          ticks += tmpBase;
        }
      }
      if (this.times) {
        ticks *= this.times.n;
        ticks /= this.times.d;
      }
      return ticks;
    };

    Duration.prototype.getTicks = function(resolution) {
      var ticks;
      ticks = this.getBaseTicks(resolution);
      ticks += this.getDotsTicks(resolution);
      if (this.times) {
        ticks *= this.times.n;
        ticks /= this.times.d;
      }
      return ticks;
    };

    Duration.prototype.getBaseTicks = function(resolution) {
      var ticks;
      return ticks = resolution / this.base;
    };

    Duration.prototype.getDotsTicks = function(resolution) {
      var dotsTicks, ticks, tmpBase, tmpDots;
      ticks = resolution / this.base;
      dotsTicks = 0;
      if (this.dots > 0) {
        tmpDots = this.dots;
        tmpBase = ticks;
        while (tmpDots-- > 0) {
          tmpBase = tmpBase / 2;
          dotsTicks += tmpBase;
        }
      }
      return dotsTicks;
    };

    Duration.tickDurationToDuration = function(resolution, tickDuration) {
      var b, base, duration, durationRef, durationRefList, rest, resttime, t, tickDurationDots, tickDurationRef, totalTickDurationDots, _i, _len;
      if (tickDuration <= 0) {
        return [];
      }
      if (tickDuration > resolution) {
        return (this.tickDurationToDuration(resolution, resolution)).concat(this.tickDurationToDuration(resolution, tickDuration - resolution));
      }
      t = tickDuration;
      b = 0;
      while (t < resolution) {
        t = t << 1;
        ++b;
      }
      base = 1 << b;
      duration = new JellyScore.Duration(base);
      rest = tickDuration - resolution / base;
      if (rest > 0) {
        base = base << 1;
        resttime = resolution / base;
        if (rest >= resttime) {
          ++duration.dots;
          rest -= resttime;
          if (rest > 0) {
            base = base << 1;
            resttime = resolution / base;
            if (rest >= resttime) {
              ++duration.dots;
              rest -= resttime;
            }
          }
        }
      }
      if (rest > 0) {
        return [duration].concat(this.tickDurationToDuration(resolution, rest));
      }
      return [duration];
      duration = {
        base: 0,
        dots: 0
      };
      durationRefList = [64, 32, 16, 8, 4, 2, 1];
      for (_i = 0, _len = durationRefList.length; _i < _len; _i++) {
        durationRef = durationRefList[_i];
        tickDurationRef = resolution / durationRef;
        if (tickDurationRef * 2 > tickDuration) {
          duration.base = durationRef;
          tickDurationDots = totalTickDurationDots = tickDurationRef;
          while (totalTickDurationDots < tickDuration) {
            tickDurationDots = tickDurationDots / 2;
            totalTickDurationDots += tickDurationDots;
            duration.dots++;
          }
          return new JellyScore.Duration(duration.base, duration.dots);
        }
      }
    };

    Duration.tickDurationToDuration2 = function(resolution, tickDuration) {
      console.log(resolution, tickDuration);
      return new JellyScore.Duration(Math.floor(resolution / tickDuration));
    };

    Duration.prototype.getMinResolution = function() {
      if (this.times) {
        return (this.base * (Math.pow(2, this.dots)) * this.times.d) / this.times.n;
      } else {
        return this.base * Math.pow(2, this.dots);
      }
    };

    Duration.prototype.setTimes = function(times) {
      this.times = times;
    };

    Duration.prototype.clone = function() {
      return new Duration(this.base, this.dots);
    };

    Duration.prototype.getLilyString = function() {
      var dot, string, _i, _ref;
      string = this.base;
      for (dot = _i = 0, _ref = this.dots; 0 <= _ref ? _i <= _ref : _i >= _ref; dot = 0 <= _ref ? ++_i : --_i) {
        if (dot > 0) {
          string += '.';
        }
      }
      return string;
    };

    return Duration;

  })();

  DurationBuilder = (function() {

    function DurationBuilder(previousDuration) {
      this.previousDuration = previousDuration;
      this.duration = 0;
      this.dots = 0;
    }

    DurationBuilder.prototype.addChar = function(c) {
      if (('0' <= c && c <= '9')) {
        return this.duration = 10 * this.duration + parseInt(c);
      } else if (c === '.') {
        return this.dots += 1;
      }
    };

    DurationBuilder.prototype.getDuration = function() {
      if (this.duration === 0) {
        return this.previousDuration;
      } else {
        return new Duration(this.duration, this.dots);
      }
    };

    return DurationBuilder;

  })();

  JellyScore.Duration = Duration;

  JellyScore.DurationBuilder = DurationBuilder;

}).call(this);

(function() {

  JellyScore.Context = (function() {
    var QUEUE_SIZE, cacheId;

    QUEUE_SIZE = 127;

    cacheId = 0;

    Context.prototype.I_AM_NOT_REAL = true;

    function Context(id, width, height, contextId) {
      var key, _i, _len, _ref;
      this.id = id;
      this.contextId = contextId;
      this.canvas = {
        width: width,
        height: height
      };
      this.statesStack = [];
      this.messagesQueue = [];
      this._globalAlpha = 1.0;
      this._globalCompositeOperation = "source-over";
      this._lineWidth = 1.0;
      this._lineCap = "butt";
      this._lineJoin = "mitter";
      this._mitterLimit = 10;
      this._strokeStyle = "black";
      this._fillStyle = "black";
      this.shadowOffsetX = 0.0;
      this.shadowOffsetY = 0.0;
      this.shadowBlur = 0.0;
      this.shadowColor = "transparent black";
      this._font = "10px sans-serif";
      this._textAlign = "start";
      this._textBaseline = "alphabetic";
      _ref = ['globalAlpha', 'globalCompositeOperation', 'lineWidth', 'lineCap', 'lineJoin', 'mitterLimit', 'strokeStyle', 'fillStyle', 'font', 'textAlign', 'textBaseline'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.defSetter(key);
      }
    }

    Context.prototype.defSetter = function(key) {
      var _this = this;
      if (this.__defineGetter__ != null) {
        this.__defineGetter__(key, function() {
          return _this['_' + key];
        });
        return this.__defineSetter__(key, function(val) {
          var data;
          _this['_' + key] = val;
          data = {};
          data[key] = val;
          return _this.postMessage({
            set: data,
            id: _this.id,
            contextId: _this.contextId
          });
        });
      } else if (Object.defineProperty != null) {
        return Object.defineProperty(this, key, {
          get: function() {
            return _this['_' + key];
          },
          set: function(val) {
            var data;
            _this['_' + key] = val;
            data = {};
            data[key] = val;
            return _this.postMessage({
              set: data,
              id: _this.id,
              contextId: _this.contextId
            });
          }
        });
      }
    };

    Context.prototype.startCaching = function() {
      this.postMessage({
        startCaching: ++cacheId,
        id: this.id
      });
      return cacheId;
    };

    Context.prototype.stopCaching = function(id) {
      this.postMessage({
        stopCaching: id,
        id: this.id
      });
      return this.postMessages();
    };

    Context.prototype.getState = function() {
      return {
        _globalAlpha: this._globalAlpha,
        _globalCompositeOperation: this._globalCompositeOperation,
        _lineWidth: this._lineWidth,
        _lineCap: this._lineCap,
        _lineJoin: this._lineJoin,
        _mitterLimit: this._mitterLimit,
        _strokeStyle: this._strokeStyle,
        _fillStyle: this._fillStyle,
        shadowOffsetX: this.shadowOffsetX,
        shadowOffsetY: this.shadowOffsetY,
        shadowBlur: this.shadowBlur,
        shadowColor: this.shadowColor,
        font: this.font,
        textAlign: this.textAlign,
        textBaseline: this.textBaseline
      };
    };

    Context.prototype.save = function() {
      var state;
      state = this.getState();
      this.statesStack.push(state);
      return this.postMessage({
        ctx: 'save',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.restore = function() {
      $.extend(this, this.statesStack.pop());
      return this.postMessage({
        ctx: 'restore',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.beginPath = function() {
      return this.postMessage({
        ctx: 'beginPath',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.closePath = function() {
      return this.postMessage({
        ctx: 'closePath',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.fill = function() {
      return this.postMessage({
        ctx: 'fill',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.stroke = function() {
      return this.postMessage({
        ctx: 'stroke',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.clip = function() {
      return this.postMessage({
        ctx: 'clip',
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.moveTo = function() {
      return this.postMessage({
        ctx: 'moveTo',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.lineTo = function() {
      return this.postMessage({
        ctx: 'lineTo',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.quadraticCurveTo = function() {
      return this.postMessage({
        ctx: 'quadraticCurveTo',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.bezierCurveTo = function() {
      return this.postMessage({
        ctx: 'bezierCurveTo',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.arcTo = function() {
      return this.postMessage({
        ctx: 'arcTo',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.arc = function() {
      return this.postMessage({
        ctx: 'arc',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.clearRect = function() {
      return this.postMessage({
        ctx: 'clearRect',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.fillRect = function() {
      return this.postMessage({
        ctx: 'fillRect',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.strokeRect = function() {
      return this.postMessage({
        ctx: 'strokeRect',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.drawImage = function() {
      return this.postMessage({
        ctx: 'drawImage',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.translate = function() {
      return this.postMessage({
        ctx: 'translate',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.fillText = function() {
      return this.postMessage({
        ctx: 'fillText',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.strokeText = function() {
      return this.postMessage({
        ctx: 'strokeText',
        args: $.extend({}, arguments),
        id: this.id,
        contextId: this.contextId
      });
    };

    Context.prototype.measureText = function(text) {
      return {
        width: ("" + text).length * 5
      };
    };

    Context.prototype.postMessage = function(message) {
      this.messagesQueue.push(message);
      if (this.messagesQueue.length > QUEUE_SIZE) {
        return this.postMessages();
      }
    };

    Context.prototype.postMessages = function() {
      var messages;
      messages = $.extend({}, this.messagesQueue.splice(0));
      return self.postMessage(messages);
    };

    return Context;

  })();

}).call(this);

(function() {
  var Score;

  Score = (function() {

    function Score(options, contextOptions) {
      this.options = options != null ? options : {};
      this.contextOptions = contextOptions != null ? contextOptions : {};
      this.staffs = [];
      this.tickables = {};
      this.ticks = {};
      this.sortedTicks = [];
      this.canvases = {};
      this.contexts = {};
      this.contextOptions.scale = 1.0;
      this.contextOptions.color = "black";
      this.contextOptions.staffColor = "black";
      this.alreadyInit = false;
      this.checkWidgets();
      this.editMode = true;
      this.TickSelection = [];
      this.selectedNote;
      this.undoStack = [];
      this.undoIndex = 0;
    }

    Score.prototype.clean = function() {
      var i, _results;
      i = this.staffs.length - 1;
      _results = [];
      while (i >= 0) {
        if (this.staffs[i].isEmpty()) {
          this.staffs.splice(i, 1);
        } else if (!this.staffs[i].isValid()) {
          this.staffs.splice(i, 1);
        }
        _results.push(i--);
      }
      return _results;
    };

    Score.prototype.checkWidgets = function() {
      var i, widget, _ref, _results;
      if (this.contextOptions.widgets != null) {
        _ref = this.contextOptions.widgets;
        _results = [];
        for (i in _ref) {
          widget = _ref[i];
          if ((typeof widget) === "object" && !(widget instanceof JellyScore.Widget)) {
            _results.push(this.contextOptions.widgets[parseInt(i)] = new JellyScore.Widget(widget));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };

    Score.prototype.addStaff = function(staff) {
      this.staffs.push(staff);
      return staff.setParent(this);
    };

    Score.prototype.buildContext = function(canvas, options) {
      var ctx;
      ctx = null;
      if ((canvas != null ? canvas.getContext : void 0) != null) {
        ctx = canvas.getContext('2d');
        $.extend(ctx, options);
      }
      return ctx;
    };

    Score.prototype.init = function(force) {
      if (force == null) {
        force = false;
      }
      if (force || !this.alreadyInit) {
        this.alreadyInit = true;
        if (!(this.resolution != null)) {
          this.resolution = this.getResolution();
        }
        this.initTicks(this.resolution);
        this.getLength(this.resolution);
        return this.getTickables(this.resolution);
      }
    };

    Score.prototype.draw = function($container, options) {
      var t1, t2;
      if (options == null) {
        options = {};
      }
      this.container = $container;
      this.container.css('position', 'relative');
      t1 = new Date();
      this._draw({
        paddingLeft: parseInt(this.container.css('padding-left')),
        width: $container.width()
      }, options);
      t2 = new Date();
      return JellyScore.log("total", t2 - t1);
    };

    Score.prototype.prepareDrawing = function(options, contextOptions) {
      var bars, containerWidth, force, paddingLeft, staff, t1, t2, t3, t4, t5, tickToBar, _i, _len, _ref, _ref1, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      paddingLeft = (_ref = options.paddingLeft) != null ? _ref : 0;
      containerWidth = (_ref1 = options.width) != null ? _ref1 : 0;
      $.extend(this.contextOptions, contextOptions);
      this.checkWidgets();
      _ref2 = this.staffs;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        staff = _ref2[_i];
        staff.setContextOptions(this.contextOptions);
      }
      this.width = (this.contextOptions.containerWidth != null) && this.contextOptions.containerWidth !== 'auto' ? this.contextOptions.containerWidth : containerWidth;
      this.containerHeight = (this.contextOptions.containerHeight != null) && this.contextOptions.containerHeight !== 'auto' ? this.contextOptions.containerHeight : 0;
      t1 = new Date();
      force = this.editMode;
      this.init(force);
      t2 = new Date();
      this.ticksDimensions = this.getDimensionsPerTick(this.resolution);
      t3 = new Date();
      _ref3 = this.getBars(this.resolution, this.ticksDimensions), bars = _ref3[0], tickToBar = _ref3[1];
      t4 = new Date();
      this.lines = this.contextOptions.inline ? this.getLine(bars) : this.getLines(bars, this.width, this.containerHeight);
      t5 = new Date();
      this.containerHeight = (this.contextOptions.containerHeight != null) && this.contextOptions.containerHeight !== 'auto' ? this.contextOptions.containerHeight : this.getHeight(this.lines);
      JellyScore.log("init", t2 - t1);
      JellyScore.log("dim", t3 - t2);
      JellyScore.log("bars", t4 - t3);
      JellyScore.log("lines", t5 - t4);
      return JellyScore.log("total computing", t5 - t1);
    };

    Score.prototype._draw = function(options, contextOptions) {
      var bar, barIndex, barNbr, capo, chord, ctx, font_size, i, line, lineNbr, pos, previousBar, previousCtx, previousLine, previousLineY, previousX, savedPosY, savedY, savedYLine, staff, staffLine, startX, t4, t5, t6, totalY, tuning, tuningStr, widget, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      if (options == null) {
        options = {};
      }
      if (!(contextOptions.scale != null)) {
        contextOptions.scale = 1.0;
      }
      t4 = new Date();
      this.prepareDrawing(options, contextOptions);
      t5 = new Date();
      JellyScore.log("prepareDrawing", t5 - t4);
      tuning = "standard tuning";
      capo = "";
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.tuning != null) {
          tuning = staff.tuning;
        }
        if ((staff.capo != null) && staff.capo > 0) {
          capo = "" + staff.capo;
        }
      }
      this.clearContainer();
      this.headerHeight = 20 * contextOptions.scale;
      ctx = this.addCanvas(this.width, this.headerHeight, 'tuning');
      ctx.save();
      font_size = 16 * contextOptions.scale;
      ctx.font = font_size + "px Calibri";
      tuningStr = "";
      for (_j = 0, _len1 = tuning.length; _j < _len1; _j++) {
        chord = tuning[_j];
        tuningStr = this.chordDict.getStrNote(chord % 12) + " " + tuningStr;
      }
      if (capo.length !== 0) {
        tuningStr += "(capo " + capo + ")";
      }
      ctx.fillText("Tuning : " + tuningStr, 0, font_size);
      ctx.restore();
      this.drawLines(this.lines);
      pos = {
        x: 0,
        y: 0
      };
      previousX = 0;
      barIndex = 0;
      lineNbr = 0;
      totalY = this.headerHeight;
      _ref1 = this.lines;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        line = _ref1[_k];
        previousBar = null;
        if (pos.y > this.containerHeight) {
          break;
        }
        pos.x = 0;
        pos.y = 0;
        _ref2 = line.widgets;
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          widget = _ref2[_l];
          pos.x += widget.getTotalWidth(this.contextOptions);
        }
        savedYLine = pos.y;
        if (line.bars.length > 0) {
          barNbr = 0;
          ctx = this.contexts[line.id];
          _ref3 = line.bars;
          for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
            bar = _ref3[_m];
            savedPosY = pos.y;
            savedY = pos.y;
            pos.y += line.paddingTop;
            if (previousBar != null) {
              this.drawEndBarSeparator(line, bar, pos, ctx);
            } else if (typeof previousLine !== "undefined" && previousLine !== null) {
              this.drawEndBarSeparator(previousLine, bar, {
                x: previousX,
                y: previousLineY
              }, previousCtx);
            }
            barNbr++;
            barIndex++;
            if (barNbr === line.bars.length && lineNbr === this.lines.length - 1) {
              barIndex = null;
            }
            this.drawStartBarSeparator(line, bar, pos, barIndex, ctx);
            i = 0;
            startX = pos.x;
            bar.x = pos.x;
            bar.y = pos.y;
            _ref4 = this.staffs;
            for (_n = 0, _len5 = _ref4.length; _n < _len5; _n++) {
              staff = _ref4[_n];
              if (staff.active) {
                if (staff.whoAmI() === JellyScore.TabStaff) {
                  pos.y += line.paddingTopTab;
                }
                staffLine = line.staffs[i];
                if (staffLine != null) {
                  pos.x = startX;
                  staffLine.realWidth = line.realWidth;
                  staffLine.bars = line.bars;
                  pos.y -= staffLine.minY;
                  ctx.save();
                  ctx.fillStyle = this.contextOptions.color;
                  ctx.strokeStyle = this.contextOptions.color;
                  staff.drawBar(bar, this.ticksDimensions, pos, ctx, this.resolution);
                  ctx.restore();
                  pos.y += staffLine.height + staffLine.minY;
                }
              }
              ++i;
            }
            savedYLine = pos.y;
            pos.y = savedY;
            previousBar = bar;
          }
        }
        previousLineY = pos.y + line.paddingTop;
        previousX = pos.x;
        previousCtx = ctx;
        if (line.height > savedYLine - savedY) {
          pos.y = savedY + line.height;
        } else {
          pos.y = savedYLine;
        }
        pos.y += line.paddingBottom;
        previousLine = line;
        lineNbr++;
      }
      t6 = new Date();
      if (!(((_ref5 = options.canvas) != null ? _ref5.getContext : void 0) != null)) {
        this.displayCanvas();
      }
      return JellyScore.log("drawing", t6 - t5);
    };

    Score.prototype.highlightTick = function(tick, options) {
      var animationLoop, bar, beatValue, cancelAnimationFrame, duration, factor, firstFlag, i, lastTick, line, margin, nextTick, oldLeft, oldWidth, pos, previousBar, realMangin, realW, repeatCount, repeatTick, reqAnimationFrame, savedY, savedYLine, separator, staff, staffLine, startTime, startWidth, startX, startX2, stepWidth, t, tickDuration, tickRest, timechange, w, widget, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
        _this = this;
      options = $.extend({
        tickDuration: 0,
        repeatCount: 0,
        factor: 1,
        duration: null
      }, options);
      tickDuration = options.tickDuration;
      repeatCount = options.repeatCount;
      factor = options.factor;
      firstFlag = false;
      if (tick < 0) {
        firstFlag = true;
        tick = 0;
      }
      repeatTick = null;
      for (i = _i = _ref = tick + 1, _ref1 = tick + factor; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        _ref2 = this.getBarsSeparator(i, JellyScore.BAR_TYPE.END_BAR);
        for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
          separator = _ref2[_j];
          if (separator.startRepeat != null) {
            repeatTick = separator.getNextTick(repeatCount, tick, factor);
            break;
          }
        }
      }
      if (!this.hasTickOn(tick)) {
        if (tick < this.length) {
          return [
            (_ref3 = this.highlighterPos) != null ? _ref3 : {
              top: 0,
              left: 0
            }, repeatTick
          ];
        }
        return [null, repeatTick];
      }
      pos = {
        x: this.contextOptions.scale,
        y: this.headerHeight
      };
      if (!this.container) {
        return [
          {
            top: 0,
            left: 0
          }, repeatTick
        ];
      }
      timechange = this.getLastTimeChange(tick);
      _ref4 = this.lines;
      for (_k = 0, _len1 = _ref4.length; _k < _len1; _k++) {
        line = _ref4[_k];
        pos.x = 0;
        savedYLine = pos.y;
        savedY = savedYLine;
        previousBar = null;
        _ref5 = line.widgets;
        for (_l = 0, _len2 = _ref5.length; _l < _len2; _l++) {
          widget = _ref5[_l];
          pos.x += widget.getTotalWidth(this.contextOptions);
        }
        _ref6 = line.bars;
        for (_m = 0, _len3 = _ref6.length; _m < _len3; _m++) {
          bar = _ref6[_m];
          if (previousBar != null) {
            pos.x += bar.staff.coef * this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.END_BAR);
          }
          previousBar = bar;
          i = 0;
          startX = pos.x;
          pos.x += bar.staff.coef * this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.START_BAR);
          startX2 = pos.x;
          savedY = pos.y;
          pos.y += line.paddingTop + line.paddingTopTab;
          _ref7 = this.staffs;
          for (_n = 0, _len4 = _ref7.length; _n < _len4; _n++) {
            staff = _ref7[_n];
            if (staff.active) {
              staffLine = line.staffs[i];
              if (staffLine != null) {
                pos.x = startX2;
                staffLine.realWidth = line.realWidth;
                staffLine.bars = line.bars;
                pos.y -= staffLine.minY;
                staff.simulateDraw(bar, this.ticksDimensions, pos);
                pos.y += staffLine.height + staffLine.minY;
              }
            }
            ++i;
          }
          savedYLine = pos.y;
          pos.y = savedY;
          if ((bar.firstTick <= tick && tick < bar.firstTick + bar.duration)) {
            oldLeft = ((_ref8 = this.highlighterPos) != null ? _ref8.left : void 0) != null ? this.highlighterPos.left : -1;
            oldWidth = ((_ref9 = this.highlighterPos) != null ? _ref9.width : void 0) != null ? this.highlighterPos.width : -1;
            this.highlighterPos = {
              top: savedY,
              left: startX,
              width: bar.width * bar.staff.coef,
              height: savedYLine - savedY
            };
            if (!(this.highlighter != null)) {
              this.highlighter = $('<div>');
              this.highlighter.addClass("highlighter");
              this.highlighter.addClass("animated");
              this.highlighter.css({
                position: "absolute"
              });
              this.highlighter.css(this.highlighterPos);
              this.container.append(this.highlighter);
            } else if (!jQuery.contains(document.documentElement, this.highlighter[0])) {
              this.container.append(this.highlighter);
            }
            width = 0;
            tickRest = 0;
            if (bar.marginLeft != null) {
              margin = bar.marginLeft * bar.staff.coef;
              realMangin = Math.floor(margin);
              tickRest = margin - realMangin;
              width += realMangin;
            }
            width += bar.staff.coef * this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.START_BAR);
            t = bar.firstTick;
            beatValue = this.resolution / timechange.beatValue;
            lastTick = tick;
            if (!firstFlag) {
              lastTick += 1;
            }
            while (t < lastTick) {
              if (this.ticksDimensions[t] != null) {
                w = (this.ticksDimensions[t].totalWidth * bar.staff.coef) + tickRest;
                realW = Math.floor(w);
                tickRest = w - realW;
                width += realW;
              }
              ++t;
            }
            if (this.highlighterPos.left < oldLeft) {
              this.highlighterPos.width = width;
              this.highlighter.css(this.highlighterPos);
            } else if (oldLeft === -1 || (this.highlighterPos.left === oldLeft && oldWidth > width)) {
              this.highlighterPos.width = width;
              this.highlighter.css(this.highlighterPos);
            } else if (this.highlighterPos.left > oldLeft) {
              if (oldWidth !== -1) {
                this.highlighterPos.width = oldLeft + oldWidth - this.highlighterPos.left;
              }
              if (this.highlighterPos.width < 0) {
                this.highlighterPos.width = 0;
              }
              this.highlighter.css(this.highlighterPos);
            }
            nextTick = this.getNextTickable(tick);
            while (t <= nextTick) {
              if (this.ticksDimensions[t] != null) {
                w = ((this.ticksDimensions[t].paddingLeft + this.ticksDimensions[t].marginLeft) * bar.staff.coef) + tickRest;
                realW = Math.floor(w);
                tickRest = w - realW;
                width += realW;
              }
              ++t;
            }
            this.highlighterPos.width = width;
            reqAnimationFrame = (function() {
              return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
                return window.setTimeout(callback, 1000 / 60);
              };
            })();
            startTime = new Date();
            duration = options.duration;
            if (!(duration != null)) {
              duration = (nextTick - tick) * tickDuration;
            }
            startWidth = this.highlighter.width();
            stepWidth = this.highlighterPos.width - startWidth;
            this.highlighter.css({
              top: this.highlighterPos.top,
              left: this.highlighterPos.left,
              height: this.highlighterPos.height
            });
            animationLoop = function() {
              t = new Date() - startTime;
              if (_this.highlighter != null) {
                if (t < duration) {
                  _this.currentAmimation = reqAnimationFrame(animationLoop);
                  return _this.highlighter.css('width', startWidth + stepWidth * t / duration);
                } else {
                  return _this.highlighter.css('width', _this.highlighterPos.width);
                }
              }
            };
            if (this.currentAmimation != null) {
              cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFram || window.webkitCancelRequestAnimationFrame || window.clearTimeout;
              cancelAnimationFrame(this.currentAmimation);
            }
            this.currentAmimation = reqAnimationFrame(animationLoop);
            return [this.highlighterPos, repeatTick];
          }
        }
        if (line.height > savedYLine - savedY) {
          pos.y = savedY + line.height;
        } else {
          pos.y = savedYLine;
        }
        pos.x = this.contextOptions.scale;
        pos.y += line.paddingBottom;
      }
    };

    Score.prototype.selectTick = function(tick, options) {
      while (--tick > 0 && !this.hasTickOn(tick)) {
        true;
      }
      return this.highlightTick(tick, options);
    };

    Score.prototype.drawTick = function(tick, options) {
      var b, bar, color, ctx, i, l, line, pos, previousBar, staff, staffLine, startX, timechange, widget, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      if (!(this.lines != null)) {
        return;
      }
      color = (_ref = options != null ? options.color : void 0) != null ? _ref : this.contextOptions.color;
      if (options.resolution != null) {
        tick = Math.floor(tick * this.resolution / options.resolution);
      }
      timechange = this.getLastTimeChange(tick);
      _ref1 = this.lines;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        l = line.bars.length;
        if (l > 0) {
          b = line.bars[l - 1];
          if ((line.bars[0].firstTick <= tick && tick < b.firstTick + b.duration)) {
            ctx = this.contexts["" + line.id + "_h"];
            pos = {
              x: 0,
              y: 0
            };
            _ref2 = line.widgets;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              widget = _ref2[_j];
              pos.x += widget.getTotalWidth(this.contextOptions);
            }
            _ref3 = line.bars;
            for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
              bar = _ref3[_k];
              if (typeof previousBar !== "undefined" && previousBar !== null) {
                pos.x += bar.staff.coef * this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.END_BAR);
              }
              previousBar = bar;
              pos.x += bar.staff.coef * this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.START_BAR);
              if ((bar.firstTick <= tick && tick < bar.firstTick + bar.duration)) {
                i = 0;
                pos.y += line.paddingTop;
                startX = pos.x;
                _ref4 = this.staffs;
                for (_l = 0, _len3 = _ref4.length; _l < _len3; _l++) {
                  staff = _ref4[_l];
                  pos.x = startX;
                  staff.prepareBar(bar, this.resolution);
                  if (staff.whoAmI() === JellyScore.TabStaff) {
                    pos.y += line.paddingTopTab;
                  }
                  if (staff.active) {
                    staffLine = line.staffs[i];
                    if (staffLine != null) {
                      staffLine.realWidth = line.realWidth;
                      staffLine.bars = line.bars;
                      pos.y -= staffLine.minY;
                      ctx.save();
                      ctx.fillStyle = color;
                      ctx.strokeStyle = color;
                      staff.drawTick(tick, bar, this.ticksDimensions, pos, ctx, this.resolution, color);
                      ctx.restore();
                      pos.y += staffLine.height + staffLine.minY;
                    }
                  }
                  ++i;
                }
                return;
              } else {
                startX = pos.x;
                _ref5 = this.staffs;
                for (_m = 0, _len4 = _ref5.length; _m < _len4; _m++) {
                  staff = _ref5[_m];
                  pos.x = startX;
                  staff.simulateDraw(bar, this.ticksDimensions, pos);
                }
              }
            }
          }
        }
      }
    };

    Score.prototype.clearTick = function(tick, options) {
      var bar, canvas, ctx, line, _i, _j, _len, _len1, _ref, _ref1;
      if (!(this.lines != null)) {
        return;
      }
      if (options.resolution != null) {
        tick = Math.floor(tick * this.resolution / options.resolution);
      }
      _ref = this.lines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line.bars.length > 0) {
          _ref1 = line.bars;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            bar = _ref1[_j];
            if ((bar.firstTick <= tick && tick < bar.firstTick + bar.duration)) {
              canvas = this.canvases["" + line.id + "_h"];
              if (canvas != null) {
                canvas[0].width = canvas[0].width;
              } else {
                ctx = this.contexts["" + line.id + "_h"];
                if (ctx != null) {
                  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                }
              }
              return;
            }
          }
        }
      }
    };

    Score.prototype.clearHighlight = function() {
      var canvas, ctx, line, _i, _len, _ref, _results;
      if (!(this.lines != null)) {
        return;
      }
      _ref = this.lines;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line.bars.length > 0) {
          canvas = this.canvases["" + line.id + "_h"];
          if (canvas != null) {
            _results.push(canvas[0].width = canvas[0].width);
          } else {
            ctx = this.contexts["" + line.id + "_h"];
            if (ctx != null) {
              _results.push(ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height));
            } else {
              _results.push(void 0);
            }
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Score.prototype.getLineFromPos = function(y) {
      var i, line, lineIndex, posY, previousY, staff, staffLine, _i, _j, _len, _len1, _ref, _ref1;
      posY = this.headerHeight;
      previousY = this.headerHeight;
      lineIndex = 0;
      _ref = this.lines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        i = 0;
        previousY = posY;
        posY += line.paddingTop;
        _ref1 = this.staffs;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          staff = _ref1[_j];
          if (staff.active) {
            if (staff.whoAmI() === JellyScore.TabStaff) {
              posY += line.paddingTopTab;
            }
            staffLine = line.staffs[i];
            if (staffLine != null) {
              posY += staffLine.height;
            }
          }
          ++i;
        }
        posY += line.paddingBottom;
        if (posY > y) {
          return [
            line, {
              y: previousY,
              height: posY - previousY
            }
          ];
        }
        ++lineIndex;
      }
      return [
        line, {
          y: previousY,
          height: posY - previousY
        }
      ];
    };

    Score.prototype.getLineFromTick = function(tick) {
      var bar, line, lineHeight, posY, previousLine, previousY, staff, _i, _j, _len, _len1, _ref, _ref1;
      previousY = 0;
      posY = 0;
      _ref = this.lines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        bar = line.bars[0];
        if ((bar != null) && bar.firstTick > tick) {
          return [previousLine, previousY];
        }
        previousY = posY;
        lineHeight = 0;
        _ref1 = line.staffs;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          staff = _ref1[_j];
          lineHeight += staff.height;
        }
        posY += lineHeight;
        previousLine = line;
      }
    };

    Score.prototype.getBarFromPos = function(x, y) {
      var bar, first, i, line, pos, posX, previousX, staff, staffLine, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      posX = 0;
      previousX = 0;
      _ref = this.getLineFromPos(y), line = _ref[0], pos = _ref[1];
      _ref1 = line.bars;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        bar = _ref1[_i];
        i = 0;
        first = true;
        _ref2 = this.staffs;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          staff = _ref2[_j];
          if (staff.active) {
            staffLine = line.staffs[i];
            if (staffLine != null) {
              if (first) {
                previousX = posX;
                posX += line.coef * bar.width;
                first = false;
              }
              if (posX > x) {
                return [
                  bar, {
                    x: previousX,
                    y: pos.y,
                    width: posX - previousX,
                    height: pos.height
                  }
                ];
              }
            }
          }
          ++i;
        }
      }
      return [null, null];
    };

    Score.prototype.getTickFromPos = function(x, y, bar, pos) {
      var dim, lastTick, posX, previousTick, previousTickPosX, realW, t, tickRest, w, _i, _ref, _ref1, _ref2;
      if (!(bar != null) || !(pos != null)) {
        _ref = this.getBarFromPos(x, y), bar = _ref[0], pos = _ref[1];
      }
      console.log("COEF =", bar.staff.coef);
      posX = pos.x;
      previousTickPosX = posX;
      tickRest = 0;
      if (bar.marginLeft != null) {
        w = bar.marginLeft * bar.staff.coef + tickRest;
        realW = Math.floor(w);
        tickRest = w - realW;
        posX += realW;
      }
      w = tickRest + bar.staff.coef * this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.START_BAR);
      realW = Math.floor(w);
      tickRest = w - realW;
      posX += realW;
      previousTick = bar.firstTick;
      lastTick = null;
      for (t = _i = _ref1 = bar.firstTick, _ref2 = bar.firstTick + bar.duration; _ref1 <= _ref2 ? _i < _ref2 : _i > _ref2; t = _ref1 <= _ref2 ? ++_i : --_i) {
        dim = this.ticksDimensions[t];
        if (dim != null) {
          lastTick = t;
          w = ((dim.marginLeft + dim.paddingLeft + dim.width) * bar.staff.coef) - dim.width + tickRest;
          realW = Math.floor(w);
          tickRest = w - realW;
          posX += realW;
          if (posX > x) {
            if (Math.abs(previousTickPosX - bar.x) < 0.1) {
              previousTickPosX = posX;
            }
            return [
              previousTick, {
                x: previousTickPosX,
                width: Math.floor((dim.width * bar.staff.coef) + tickRest),
                height: pos.height,
                y: pos.y
              }
            ];
          }
          previousTick = t;
          previousTickPosX = posX;
          w = (dim.width + dim.paddingRight * bar.staff.coef) + tickRest;
          realW = Math.floor(w);
          tickRest = w - realW;
          posX += realW;
        }
      }
      if (lastTick != null) {
        dim = this.ticksDimensions[lastTick];
        return [
          lastTick, {
            x: previousTickPosX,
            width: Math.floor((dim.width * bar.staff.coef) + tickRest),
            height: pos.height,
            y: pos.y
          }
        ];
      } else {
        return [null, null];
      }
    };

    Score.prototype.getBarFromTick = function(tick) {
      var bar, line, previousBar, x, _i, _j, _len, _len1, _ref, _ref1;
      previousBar = null;
      _ref = this.lines;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        x = 0;
        _ref1 = line.bars;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          bar = _ref1[_j];
          if (bar.firstTick > tick) {
            return [previousBar, x];
          }
          if (previousBar != null) {
            x += previousBar.width;
          }
          previousBar = bar;
        }
      }
    };

    Score.prototype.getLastTickOfBar = function(bar) {
      return bar.ticks[bar.ticks.length - 1];
    };

    Score.prototype.saveAction = function() {
      console.log("action saved");
      if (this.undoIndex !== this.undoStack.length - 1) {
        this.undoStack = this.undoStack.slice(0, this.undoIndex);
      }
      this.undoStack.push(this.staffs[0].voices[0].tickables);
      return this.undoIndex = this.undoStack.length - 1;
    };

    Score.prototype.undoEditor = function($container, contextOptions) {
      console.log("undo");
      if (this.undoIndex.length !== 0) {
        if (this.undoIndex > 0) {
          this.undoIndex--;
        }
        this.staffs[0].voices[0].tickables = this.undoStack[this.undoIndex];
        return this.draw($container, contextOptions);
      }
    };

    Score.prototype.redoEditor = function($container, contextOptions) {
      return console.log("redo");
    };

    Score.prototype.completeBar = function(bar, voice) {
      return voice.completeBar(bar, this.resolution);
    };

    Score.prototype.divideDurationByTwo = function() {
      var bar, newDuration, staff, tickable, x, _ref;
      tickable = this.getSelectedTickable();
      _ref = this.getBarFromTick(this.selectedNote.tick), bar = _ref[0], x = _ref[1];
      newDuration = tickable.duration.base * 2;
      if (newDuration <= 64) {
        tickable.duration.base = newDuration;
        staff = this.staffs[this.selectedNote.staffNbr];
        this.completeBar(bar, staff.voices[0]);
        return this.refreshEditor();
      }
    };

    Score.prototype.multiplyDurationByTwo = function() {
      var bar, newDuration, staff, tickable, x, _ref;
      tickable = this.getSelectedTickable();
      _ref = this.getBarFromTick(this.selectedNote.tick), bar = _ref[0], x = _ref[1];
      newDuration = tickable.duration.base / 2;
      if (newDuration >= 1) {
        tickable.duration.base = newDuration;
        staff = this.staffs[this.selectedNote.staffNbr];
        this.completeBar(bar, staff.voices[0]);
        return this.refreshEditor();
      }
    };

    Score.prototype.toggleDottedNote = function() {
      var bar, selectedTickable, staff, x, _ref;
      selectedTickable = this.selectedNote.tickable;
      if (selectedTickable.duration.dots === 0) {
        selectedTickable.duration.dots = 1;
      } else {
        selectedTickable.duration.dots = 0;
      }
      _ref = this.getBarFromTick(this.selectedNote.tick), bar = _ref[0], x = _ref[1];
      staff = this.staffs[this.selectedNote.staffNbr];
      this.completeBar(bar, staff.voices[0]);
      return this.refreshEditor();
    };

    Score.prototype.selectNoteFromTick = function(tick) {
      var bar, line, previousY, x, y, _ref, _ref1;
      _ref = this.getBarFromTick(tick), bar = _ref[0], x = _ref[1];
      console.log(bar);
      _ref1 = this.getLineFromTick(tick), line = _ref1[0], previousY = _ref1[1];
      x = this.getXPosFromTick(tick, line);
      return y = this.getYPosFromString(this.selectedNote.staffNbr, line, this.selectedNote.string);
    };

    Score.prototype.getXPosFromTick = function(refTick, line) {
      var bar, dim, tick, x, _i, _j, _len, _len1, _ref, _ref1;
      x = 0;
      if (!(line != null)) {
        line = this.getLineFromTick(tick);
      }
      _ref = line.bars;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bar = _ref[_i];
        _ref1 = bar.ticks;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          tick = _ref1[_j];
          dim = this.ticksDimensions[tick];
          if (tick === refTick) {
            return x + dim.totalWidth;
          }
          if (dim != null) {
            x += dim.totalWidth;
          }
        }
      }
      return x;
    };

    Score.prototype.clearLayers = function() {
      var canvas, ctx, layerName, value, _ref, _results;
      _ref = this.canvases;
      _results = [];
      for (layerName in _ref) {
        value = _ref[layerName];
        if (layerName.length > 2) {
          canvas = value[0];
          ctx = canvas.getContext("2d");
          _results.push(ctx.clearRect(0, 0, canvas.width, canvas.height));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Score.prototype.refreshEditor = function() {
      var line, pos, previousY, x, y, _ref;
      this.draw(this.container, this.contextOptions);
      if (this.selectedNote != null) {
        pos = this.selectedNote.tickable.pos;
        _ref = this.getLineFromTick(this.selectedNote.tick), line = _ref[0], previousY = _ref[1];
        y = previousY + this.getYPosFromString(this.selectedNote.staffNbr, line, this.selectedNote.string);
        y += this.canvases["tuning"].height();
        x = pos.x + this.ticksDimensions[this.selectedNote.tick].width;
        return this.selectNoteFromPos(x, y);
      }
    };

    Score.prototype.selectNoteFromPos = function(x, y) {
      var bar, canvas, dimStaff, layer, line, note, noteDim, posBar, posTick, posYline, previous, staffNumber, string, tick, tickable, voice, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      console.log("click at", x, " : ", y);
      this.clearLayers();
      _ref = this.getLineFromPos(y), line = _ref[0], previous = _ref[1];
      _ref1 = this.getBarFromPos(x, y), bar = _ref1[0], posBar = _ref1[1];
      _ref2 = this.getTickFromPos(x, y, bar, posBar), tick = _ref2[0], posTick = _ref2[1];
      posYline = y - previous.y;
      _ref3 = this.getStaffFromPos(line, posYline), staffNumber = _ref3[0], dimStaff = _ref3[1];
      voice = this.staffs[staffNumber].voices[0];
      canvas = this.canvases["" + line.id + "_h"];
      if (this.staffs[staffNumber].whoAmI() === JellyScore.TabStaff) {
        _ref4 = this.getStringFromPos(staffNumber, dimStaff, posYline), string = _ref4[0], noteDim = _ref4[1];
        this.drawNoteSelector(canvas.get(0), posTick.x, noteDim.minY, posTick.width, noteDim.height);
        return this.selectedNote = {
          tick: tick,
          string: string,
          staffNbr: staffNumber,
          tickable: voice.tickablesDict[tick][0]
        };
      } else {
        tickable = voice.tickablesDict[tick][0];
        if (tickable.whoAmI() === JellyScore.Rest) {
          layer = tickable.getLayer(this.contextOptions.scale, posTick.x, dimStaff.y);
        }
        if (tickable.whoAmI() === JellyScore.Chord) {
          _ref5 = tickable.notes;
          for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
            note = _ref5[_i];
            layer = this.getLayerNote(tick, note, posYline, this.staffs[staffNumber], dimStaff, posTick.x);
            if (layer != null) {
              tickable = note;
              break;
            }
          }
        } else if (tickable.whoAmI() === JellyScore.Note) {
          layer = this.getLayerNote(tick, tickable, posYline, this.staffs[staffNumber], dimStaff, posTick.x);
        }
        if (layer != null) {
          this.drawNoteSelector(canvas.get(0), layer.x, layer.y, layer.width, layer.height);
          return this.selectedNote = {
            tick: tick,
            staffNbr: staffNumber,
            tickable: tickable
          };
        }
      }
    };

    Score.prototype.getLayerNote = function(tick, note, y, staff, dimStaff, x) {
      var key, layer, yPos;
      key = staff.getLastKeyChange(tick).key;
      yPos = note.getPosition(key, this.contextOptions.scale);
      layer = {
        x: x,
        y: yPos - dimStaff.minY,
        width: 7 * this.contextOptions.scale,
        height: 8 * this.contextOptions.scale
      };
      console.log("layer:", layer);
      console.log("Y = ", y);
      console.log("dimStaff", dimStaff);
      if (this.isInLayer(layer, y)) {
        console.log("isInLayer");
        return layer;
      }
      return null;
    };

    Score.prototype.isInLayer = function(layer, y, x) {
      if (x != null) {
        if (x < layer.x || x > layer.x + layer.width) {
          return false;
        }
      }
      if (y < layer.y || y > layer.y + layer.height) {
        return false;
      }
      return true;
    };

    Score.prototype.getPitchFromPos2 = function(y, staffNumber, dimStaff, tick, tickable) {
      var firstLinePos, firstPitch, key, lineWidth, note, pitchFirstLine, scale, spaceLine, string, _i, _len, _ref;
      scale = this.contextOptions.scale;
      key = this.staffs[staffNumber].getLastKeyChange(tick).key;
      pitchFirstLine = key.getPitchFirstLine();
      lineWidth = 1 + Math.floor(scale / 2) * 2;
      spaceLine = 50 / 6.8 * scale / 2;
      firstLinePos = (15.5 * scale) - dimStaff.minY;
      string = (y - firstLinePos) / spaceLine;
      console.log("string", string);
      firstPitch = pitchFirstLine - Math.round(string);
      console.log("firstPitch", firstPitch);
      if (tickable.whoAmI() === JellyScore.Chord) {
        _ref = tickable.notes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          note = _ref[_i];
          console.log(note.getPitch());
          if (note.getPitch() === firstPitch) {
            console.log("y", y);
            console.log("layeer", note.layer);
            return note.layer;
          }
        }
      } else if (tickable.whoAmI() === JellyScore.Note) {
        return console.log(tickable.getPitch());
      }
    };

    Score.prototype.getPitchFromPos = function(y, staffNumber, dimStaff, tick, tickable) {
      var note, _i, _len, _ref;
      if (tickable.whoAmI() === JellyScore.Chord) {
        _ref = tickable.notes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          note = _ref[_i];
          if (y >= note.layer.y && y <= note.layer.y + note.layer.height) {
            return note.layer;
          }
        }
      }
      if (tickable.whoAmI() === JellyScore.Rest) {
        return tickable.layer;
      }
      return null;
    };

    Score.prototype.highlightLines = function(canvas, staffNumber, dimStaff, x, width) {
      var context, firstStringY, lineWidth, nbrLines, scale, spaceLine, yLine;
      scale = this.contextOptions.scale;
      firstStringY = dimStaff.y - (15.5 * scale);
      nbrLines = this.staffs[staffNumber].contextOptions.lines;
      +(lineWidth = 1 + Math.floor(scale / 2) * 2);
      spaceLine = 50 / 6.8 * scale / 2;
      context = canvas.getContext('2d');
      context.beginPath();
      context.strokeStyle = "red";
      context.lineWidth = lineWidth;
      yLine = firstStringY - lineWidth;
      while (yLine < dimStaff.height) {
        context.moveTo(x, yLine);
        context.lineTo(x + width, yLine);
        yLine += spaceLine;
      }
      return context.stroke();
    };

    Score.prototype.getSelectedNoteInChord = function(chord) {
      var note, _i, _len, _ref;
      if (chord.whoAmI() === JellyScore.Chord) {
        _ref = chord.notes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          note = _ref[_i];
          if (note.stringNbr === this.selectedNote.string) {
            return note;
          }
        }
      }
      return null;
    };

    Score.prototype.getSelectedTickable = function() {
      var staff, tickable, tickablesList, tuning, voice, _i, _j, _len, _len1, _ref;
      if (this.selectedNote != null) {
        staff = this.staffs[this.selectedNote.staffNbr];
        tuning = staff.tuning;
        _ref = staff.voices;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          voice = _ref[_i];
          tickablesList = voice.tickablesDict[this.selectedNote.tick];
          for (_j = 0, _len1 = tickablesList.length; _j < _len1; _j++) {
            tickable = tickablesList[_j];
            if (tickable.whoAmI() === JellyScore.Rest || tickable.whoAmI() === JellyScore.Chord || tickable.whoAmI() === JellyScore.Note) {
              return tickable;
            }
          }
        }
      }
    };

    Score.prototype.getSelectedNote = function() {
      var addNewNote, chord, chordList, note, staff, tuning, voice, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      if (this.selectedNote != null) {
        staff = this.staffs[this.selectedNote.staffNbr];
        tuning = staff.tuning;
        _ref = staff.voices;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          voice = _ref[_i];
          chordList = voice.tickablesDict[this.selectedNote.tick];
          for (_j = 0, _len1 = chordList.length; _j < _len1; _j++) {
            chord = chordList[_j];
            if (staff.whoAmI() === JellyScore.TabStaff) {
              if (chord.whoAmI() === JellyScore.Chord) {
                _ref1 = chord.notes;
                for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                  note = _ref1[_k];
                  addNewNote = true;
                  if (note.stringNbr === this.selectedNote.string) {
                    return [note, chord];
                  }
                }
                if (addNewNote === true) {
                  return [null, chord];
                }
              } else if (chord.whoAmI() === JellyScore.Note) {
                note = chord;
                if (note.stringNbr === this.selectedNote.string) {
                  return [note, null];
                }
                return [null, null];
              }
            }
          }
        }
      }
    };

    Score.prototype.getStaffFromPos = function(line, posY) {
      var staff, staffNumber, staffs, y, _i, _len;
      staffs = line.staffs;
      staffNumber = 0;
      y = line.paddingTop;
      for (_i = 0, _len = staffs.length; _i < _len; _i++) {
        staff = staffs[_i];
        y -= staff.minY;
        if (posY < y + staff.maxY) {
          if (staff.type === JellyScore.TabStaff) {
            y += line.paddingTopTab + (15.5 * this.contextOptions.scale);
          }
          return [
            staffNumber, {
              y: y,
              minY: staff.minY,
              paddingTop: line.paddingTop,
              height: staff.maxY - staff.minY,
              type: this.staffs[staffNumber].whoAmI()
            }
          ];
        }
        staffNumber++;
        y += staff.maxY;
      }
    };

    Score.prototype.getStringFromPos = function(staffNumber, dimStaff, y) {
      var firstStringY, lineWidth, nbrLines, scale, spaceLine, string, stringY, _i;
      scale = this.contextOptions.scale;
      firstStringY = dimStaff.y;
      nbrLines = this.staffs[staffNumber].contextOptions.lines;
      lineWidth = 1 + Math.floor(scale / 2) * 2;
      spaceLine = 80 * scale / 6.8;
      stringY = firstStringY;
      for (string = _i = 1; 1 <= nbrLines ? _i <= nbrLines : _i >= nbrLines; string = 1 <= nbrLines ? ++_i : --_i) {
        stringY = firstStringY + (string - 1) * spaceLine + lineWidth;
        if (y < stringY + (spaceLine / 2)) {
          return [
            string, {
              minY: stringY - (spaceLine / 2),
              height: spaceLine
            }
          ];
        }
      }
      return [
        nbrLines, {
          minY: stringY - (spaceLine / 2),
          height: spaceLine
        }
      ];
    };

    Score.prototype.getYPosFromString = function(staffNumber, line, string) {
      var i, lineWidth, scale, spaceLine, staff, staffHeight, y, _i, _len, _ref;
      y = line.paddingTop;
      scale = this.contextOptions.scale;
      spaceLine = 80 * scale / 6.8;
      lineWidth = 1 + Math.floor(scale / 2) * 2;
      _ref = line.staffs;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        staff = _ref[i];
        staffHeight = staff.maxY - staff.minY;
        if (staff.type === JellyScore.TabStaff) {
          y += line.paddingTopTab + (15.5 * scale);
        }
        if (i === staffNumber) {
          break;
        }
        y += staffHeight;
        y += (string - 1) * (spaceLine + lineWidth);
      }
      return y;
    };

    Score.prototype.addNewNoteInChord = function(chord, string, midiNote) {
      var newNote;
      newNote = new JellyScore.Note(0);
      newNote.setMidiNote(midiNote);
      newNote.setStringNbr(string);
      newNote.setDuration(chord.getDuration());
      return chord.addTickable(newNote);
    };

    Score.prototype.requestNewNote = function(fret) {
      var d1, d2, newNote, note, staff, tickable, tuning;
      if (this.selectedNote != null) {
        staff = this.staffs[this.selectedNote.staffNbr];
        tuning = staff.tuning;
        tickable = this.getSelectedTickable();
        this.saveAction();
        if (tickable.whoAmI() === JellyScore.Chord) {
          note = this.getSelectedNoteInChord(tickable);
          if (note != null) {
            note.setMidiNote(tuning[note.stringNbr - 1] + parseInt(fret));
          } else {
            this.addNewNoteInChord(tickable, this.selectedNote.string, tuning[this.selectedNote.string - 1] + parseInt(fret));
          }
        } else if (tickable.whoAmI() === JellyScore.Note) {
          if (tickable.stringNbr === this.selectedNote.string) {
            tickable.setMidiNote(tuning[tickable.stringNbr - 1] + parseInt(fret));
          } else {
            newNote = new JellyScore.Note(0);
            newNote.setMidiNote(tuning[this.selectedNote.string - 1] + parseInt(fret));
            newNote.setStringNbr(this.selectedNote.string);
            this.replaceTickableByChord(staff.voices[0], tickable, [tickable, newNote]);
          }
        } else if (tickable.whoAmI() === JellyScore.Rest) {
          newNote = new JellyScore.Note(0);
          newNote.setMidiNote(tuning[this.selectedNote.string - 1] + parseInt(fret));
          newNote.setStringNbr(this.selectedNote.string);
          this.replaceTickableByChord(staff.voices[0], tickable, [newNote]);
        }
        d1 = new Date();
        this.refreshEditor();
        d2 = new Date();
        return console.log("DRAW TIME?", d2 - d1);
      }
    };

    Score.prototype.addNote = function(tick, midiNote, tickDuration, resolution) {
      var actualTickable, bar, d, duration, newNote, stringNbr, tuning, voice, x, _i, _len, _ref, _ref1;
      this.resolution = resolution;
      if (tickDuration <= 0) {
        return;
      }
      tuning = this.staffs[0].tuning;
      voice = this.staffs[0].voices[0];
      if (!(voice != null)) {
        voice = this.staffs[0].voices[0] = this.resetVoice();
      }
      stringNbr = this.findBestStringNbr(midiNote, tuning);
      while (tickDuration > 0) {
        _ref = this.getBarFromTick(tick), bar = _ref[0], x = _ref[1];
        if (tick + tickDuration > bar.firstTick + bar.duration) {
          duration = bar.firstTick + bar.duration - tick;
          tickDuration -= duration;
        } else {
          duration = tickDuration;
          tickDuration = 0;
        }
        _ref1 = JellyScore.Duration.tickDurationToDuration(this.resolution, duration);
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          d = _ref1[_i];
          actualTickable = this.getSelectableAtTick(tick, voice, bar);
          if (!(actualTickable != null)) {
            console.error("no tick at " + tick);
            return;
          }
          if (typeof newNote !== "undefined" && newNote !== null) {
            newNote = new JellyScore.Tie(0, newNote);
          } else {
            newNote = new JellyScore.Note(0);
          }
          newNote.setMidiNote(midiNote);
          newNote.setDuration(d);
          if (!(stringNbr != null)) {
            stringNbr = newNote.getStringNbr(tuning);
          }
          newNote.setStringNbr(stringNbr);
          console.log("replaceTickableByTickable");
          this.replaceTickableByTickable(actualTickable, newNote, voice, tick);
          this.completeBar(bar, voice);
          console.log("done");
          this.init(true);
          tick += d.getTicks(this.resolution);
        }
      }
    };

    Score.prototype.changeNote = function(tick, midiNote, tickDuration, resolution) {
      var actualTickable, b, bar, d, duration, i, newNote, note, previousNote, rest, t, tickable, tickableIndex, voice, x, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
      this.resolution = resolution;
      voice = this.staffs[0].voices[0];
      if (!(voice != null)) {
        voice = this.staffs[0].voices[0] = this.resetVoice();
      }
      while (tickDuration > 0) {
        _ref = this.getBarFromTick(tick), bar = _ref[0], x = _ref[1];
        if (tick + tickDuration > bar.firstTick + bar.duration) {
          duration = bar.firstTick + bar.duration - tick;
          tickDuration -= duration;
        } else {
          duration = tickDuration;
          tickDuration = 0;
        }
        _ref1 = JellyScore.Duration.tickDurationToDuration(this.resolution, duration);
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          d = _ref1[_i];
          console.log("addTie", duration, d);
          actualTickable = this.getSelectableAtTick(tick, voice, bar);
          if (!(actualTickable != null)) {
            console.error("no tick at " + tick);
            return;
          }
          if (actualTickable.constructor === JellyScore.Note) {
            t = tick + actualTickable.getTicks(this.resolution);
            actualTickable.setDuration(d);
            note = actualTickable.noteTieTo;
            while (note != null) {
              tickableIndex = voice.tickables.indexOf(note);
              _ref2 = this.getBarFromTick(t), b = _ref2[0], x = _ref2[1];
              if (tickableIndex >= 0) {
                rest = new JellyScore.Rest(note.duration);
                voice.tickables.splice(tickableIndex, 1, rest);
                i = 0;
                _ref3 = voice.tickablesDict[t];
                for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                  tickable = _ref3[_j];
                  if (tickable === note) {
                    voice.tickablesDict[t].splice(i, 1, rest);
                    break;
                  }
                  ++i;
                }
              }
              t += note.getTicks(this.resolution);
              note = note.noteTieTo;
            }
          } else if (typeof previousNote !== "undefined" && previousNote !== null) {
            newNote = new JellyScore.Tie(0, previousNote);
            newNote.setMidiNote(midiNote);
            newNote.setDuration(d);
            newNote.setStringNbr(previousNote.stringNbr + 1);
            this.replaceTickableByTickable(actualTickable, newNote, voice, tick);
            actualTickable = newNote;
          }
          console.log("completebar");
          this.completeBar(bar, voice);
          this.init(true);
          previousNote = actualTickable;
          tick += d.getTicks(this.resolution);
          console.log("done");
        }
      }
    };

    Score.prototype.getSelectableAtTick = function(tick, voice, bar) {
      return voice.getSelectableAtTick(tick, bar, this.resolution);
    };

    Score.prototype.replaceTickableByTickable = function(actualTickable, newTickable, voice, tick) {
      var tickableAtTickArr, tickableIndex;
      tickableIndex = voice.tickables.indexOf(actualTickable);
      voice.tickables[tickableIndex] = newTickable;
      tickableAtTickArr = voice.tickablesDict[tick];
      tickableIndex = tickableAtTickArr.indexOf(actualTickable);
      return tickableAtTickArr[tickableIndex] = newTickable;
    };

    Score.prototype.findBestStringNbr = function(midiNote, tuning) {
      var bestStringNbr, fret, fretDistance, i, lastNoteFret, lastNoteStrNbr, lastTickable, minDistance, stringMidiValue, _i, _len;
      lastTickable = this.tickables[this.tickables.length - 1];
      if ((lastTickable != null) && lastTickable.whoAmI() === JellyScore.Chord) {
        lastTickable = notes[0];
      }
      if ((lastTickable != null) && lastTickable.whoAmI() === JellyScore.Note) {
        lastNoteStrNbr = lastTickable.getStringNbr(tuning);
        lastNoteFret = tuning[lastNoteStrNbr(-1)] - getValue();
        bestStringNbr = 0;
        minDistance = 100;
        for (i = _i = 0, _len = tuning.length; _i < _len; i = ++_i) {
          stringMidiValue = tuning[i];
          fret = midiNote - stringMidiValue;
          fretDistance = Math.abs(fret - lastNoteFret);
          if (fretDistance > 0) {
            if (fretDistance < minDistance) {
              bestStringNbr = i;
              minDistance = fretDistance;
            }
          }
        }
        return bestStringNbr;
      }
      return null;
    };

    Score.prototype.requestDeleteNote = function() {
      var bar, note, staff, tickable, x, _ref;
      if (this.selectedNote != null) {
        tickable = this.selectedNote.tickable;
        if (tickable.parent.whoAmI() === JellyScore.Chord) {
          tickable = tickable.parent;
        }
        if (tickable.whoAmI() === JellyScore.Chord) {
          if (tickable.notes.length === 1) {
            this.replaceTickableByRest(this.selectedNote.tick, this.selectedNote.staffNbr, tickable);
          } else if (tickable !== this.selectedNote.tickable) {
            this.deleteNote(this.selectedNote.tickable, tickable);
          } else {
            note = this.getSelectedNoteInChord(tickable);
            this.deleteNote(note, tickable);
          }
        } else if (tickable.whoAmI() === JellyScore.Note) {
          this.replaceTickableByRest(this.selectedNote.tick, this.selectedNote.staffNbr, tickable);
        } else if (tickable.whoAmI() === JellyScore.Rest) {
          staff = this.staffs[this.selectedNote.staffNbr];
          _ref = this.getBarFromTick(this.selectedNote.tick), bar = _ref[0], x = _ref[1];
          this.deleteRest(this.selectedNote.tick, tickable, staff.voices[0]);
          this.completeBar(bar, staff.voices[0]);
        }
        return this.refreshEditor();
      }
    };

    Score.prototype.replaceTickableByTickable2 = function(tick, staffNbr, tickable, newTickable) {
      var staff, tickableIndex, voice, _i, _len, _ref;
      console.log(tickable.whoAmI());
      staff = this.staffs[0];
      if ((this.selectedNote != null) && this.selectedNote.tickable === tickable) {
        this.selectedNote.tickable = newTickable;
      }
      _ref = staff.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        tickableIndex = voice.tickables.indexOf(tickable);
        voice.tickables[tickableIndex] = newTickable;
      }
      return console.log("init");
    };

    Score.prototype.replaceTickableByChord = function(voice, tickable, notesList) {
      var duration, newChord, note, _i, _len;
      duration = tickable.duration;
      newChord = new JellyScore.Chord;
      for (_i = 0, _len = notesList.length; _i < _len; _i++) {
        note = notesList[_i];
        newChord.addTickable(note);
      }
      newChord.setDuration(duration);
      newChord.setParent(voice);
      return this.replaceTickableByTickable2(this.selectedNote.tick, this.selectedNote.staffNbr, tickable, newChord);
    };

    Score.prototype.replaceTickableByRest = function(tick, staffNumber, tickable) {
      var duration, rest, staff;
      duration = tickable.getDuration();
      rest = new JellyScore.Rest(duration);
      tickable.deleteBeam();
      this.replaceTickableByTickable2(tick, staffNumber, tickable, rest);
      return staff = this.staffs[staffNumber];
    };

    Score.prototype.deleteNote = function(noteToDelete, chord) {
      var index;
      index = chord.notes.indexOf(noteToDelete);
      if (index !== -1) {
        return chord.notes.splice(index, 1);
      }
    };

    Score.prototype.deleteRest = function(tick, restToDelete, voice) {
      var bar, barTick, i, tickableIndex, x, _i, _len, _ref, _ref1;
      tickableIndex = voice.tickablesDict[tick].indexOf(restToDelete);
      voice.tickablesDict[tick].splice(tickableIndex, 1);
      tickableIndex = voice.tickables.indexOf(restToDelete);
      voice.tickables.splice(tickableIndex, 1);
      _ref = this.getBarFromTick(tick), bar = _ref[0], x = _ref[1];
      _ref1 = bar.ticks;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        barTick = _ref1[i];
        if (barTick === tick) {
          bar.ticks.splice(i, 1);
          return;
        }
      }
    };

    Score.prototype.drawNoteSelector = function(canvas, x, y, width, height) {
      var ctx;
      width += 5;
      ctx = canvas.getContext("2d");
      ctx.strokeStyle = "red";
      return ctx.strokeRect(x, y, width, height);
    };

    Score.prototype.drawThumbnail = function(canvas, options) {
      if (options == null) {
        options = {};
      }
      return this._draw({
        canvas: canvas,
        width: canvas.width
      }, options);
    };

    Score.prototype.getNextTickable = function(tick) {
      var nextTick, staff, t, _i, _len, _ref;
      nextTick = null;
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.active) {
          t = staff.getNextTickable(tick);
          if (nextTick === null || t < nextTick) {
            nextTick = t;
          }
        }
      }
      return nextTick;
    };

    Score.prototype.hasTickOn = function(tick) {
      var staff, _i, _len, _ref;
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.active && staff.hasTickOn(tick)) {
          return true;
        }
      }
      return false;
    };

    Score.prototype.getTicksAt = function(tick) {
      var staff, _i, _len, _ref, _results;
      _ref = this.staffs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        _results.push(staff.getTicksAt(tick));
      }
      return _results;
    };

    Score.prototype.getFretDiagramAt = function(tick) {
      var staff, tickable, _i, _j, _len, _len1, _ref;
      _ref = this.getTicksAt(tick);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        for (_j = 0, _len1 = staff.length; _j < _len1; _j++) {
          tickable = staff[_j];
          if (tickable.whoAmI() === JellyScore.FretDiagram) {
            return tickable;
          }
        }
      }
      return null;
    };

    Score.prototype.removeHighlight = function() {
      if (this.highlighter != null) {
        this.highlighter.remove();
        return this.highlighter = null;
      }
    };

    Score.prototype.getLineHeight = function(line) {
      var height, i, lastLineLines, lastStaff, lineCount, staff, _ref;
      if (!(line.height != null) || !(line.lastLineLines != null)) {
        height = 0;
        lineCount = 0;
        lastStaff = -1;
        lastLineLines;

        _ref = line.staffs;
        for (i in _ref) {
          staff = _ref[i];
          if (staff != null) {
            if (height === 0) {
              height += staff.minY;
            }
            height += staff.height;
            i = parseInt(i);
            if (i > lastStaff) {
              lastStaff = i;
            }
            lineCount++;
          }
        }
        staff = this.staffs[lastStaff];
        if (staff != null) {
          lastLineLines = staff.contextOptions.lines;
          if (lineCount === 1) {
            height = staff.getHeight(this.contextOptions);
          } else {
            height -= line.staffs[lastStaff].height;
            height += staff.getHeight(this.contextOptions);
            height -= line.staffs[lastStaff].minY;
          }
        }
        line.height = 1 + Math.floor(height);
        line.lastLineLines = lastLineLines;
      }
      return [line.height, line.lastLineLines];
    };

    Score.prototype.drawStartBarSeparator = function(line, bar, pos, barNumber, ctx) {
      var font_size, i, minY, options, scale, staff, x, y, _i, _len, _ref, _ref1, _ref2;
      if (barNumber == null) {
        barNumber = "";
      }
      options = this.contextOptions;
      barNumber = "" + barNumber;
      scale = (_ref = this.contextOptions.scale) != null ? _ref : 1.0;
      minY = null;
      i = 0;
      _ref1 = line.staffs;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        staff = _ref1[_i];
        if (((staff != null ? staff.minY : void 0) != null) && ((_ref2 = this.staffs[i]) != null ? _ref2.active : void 0)) {
          minY = staff.minY;
          break;
        }
        ++i;
      }
      if (minY != null) {
        x = pos.x;
        y = 13 * scale + pos.y - minY;
        ctx.save();
        font_size = 12 * scale;
        ctx.font = font_size + "px Calibri";
        ctx.fillStyle = 'rgb(167, 0, 0)';
        ctx.fillText(barNumber, x, y);
        ctx.restore();
      }
      return this.drawBarSeparator(line, bar, pos, JellyScore.BAR_TYPE.START_BAR, ctx);
    };

    Score.prototype.drawEndBarSeparator = function(line, bar, pos, ctx) {
      return this.drawBarSeparator(line, bar, pos, JellyScore.BAR_TYPE.END_BAR, ctx);
    };

    Score.prototype.drawBarSeparator = function(line, bar, pos, type, ctx) {
      var barSeparator, barsSeparator, firstStaff, height, lastLineLines, rw, staff, tabstaffFlag, w, x, _i, _len, _ref;
      if (type == null) {
        type = JellyScore.BAR_TYPE.END_BAR;
      }
      if (line.staffs.length > 0) {
        _ref = this.getLineHeight(line), height = _ref[0], lastLineLines = _ref[1];
        firstStaff = 0;
        while (!(line.staffs[firstStaff] != null)) {
          firstStaff++;
        }
        staff = line.staffs[firstStaff];
        tabstaffFlag = this.staffs[firstStaff].whoAmI() === JellyScore.TabStaff;
        barsSeparator = this.getBarsSeparator(bar, type);
        w = this.getBarSeparatorWidth(bar, type);
        rw = w * bar.staff.coef;
        x = type === JellyScore.BAR_TYPE.END_BAR ? Math.round(pos.x + rw - w) : Math.round(pos.x);
        for (_i = 0, _len = barsSeparator.length; _i < _len; _i++) {
          barSeparator = barsSeparator[_i];
          barSeparator.drawAt(ctx, {
            x: x,
            y: Math.floor(pos.y)
          }, $.extend({}, this.contextOptions, {
            yMin: Math.floor(staff.minY - (tabstaffFlag ? line.paddingTopTab : 0)),
            height: height + (tabstaffFlag ? 0 : line.paddingTopTab),
            lines: lastLineLines,
            staffs: line.staffs
          }));
        }
        return pos.x += rw;
      }
    };

    Score.prototype.getBarSeparatorWidth = function(bar, type) {
      var separator, sw, w, _i, _len, _ref;
      if (type == null) {
        type = JellyScore.BAR_TYPE.END_BAR;
      }
      w = 0;
      _ref = this.getBarsSeparator(bar, type);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        separator = _ref[_i];
        sw = separator.getTotalWidth(this.contextOptions);
        if (sw > w) {
          w = sw;
        }
      }
      return w;
    };

    Score.prototype.getEndBarSeparatorWidth = function(bar) {
      var separators;
      return separators = this.getBarsSeparator(bar, JellyScore.BAR_TYPE.START_BAR);
    };

    Score.prototype.getBarsSeparator = function(bar, type) {
      var barSeparator, barSeparators, hasSpecial, tick, tickable, tickables, _i, _len, _ref;
      barSeparators = [];
      tick = typeof bar === "number" ? bar : bar.firstTick;
      tickables = this.tickables[tick];
      if (tickables != null) {
        hasSpecial = false;
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if ((_ref = tickable.whoAmI()) === JellyScore.Bar || _ref === JellyScore.StartRepeat || _ref === JellyScore.EndRepeat || _ref === JellyScore.StartAlternative || _ref === JellyScore.EndAlternative) {
            if (tickable.getType() === type) {
              if (tickable.setTick != null) {
                tickable.setTick(tick);
              }
              if (tickable.whoAmI() !== JellyScore.Bar) {
                if (!hasSpecial) {
                  barSeparators = [];
                  hasSpecial = true;
                }
                barSeparators.push(tickable);
              }
              if (!hasSpecial) {
                barSeparators.push(tickable);
              }
            }
          }
        }
      }
      if (barSeparators.length === 0 && type === JellyScore.BAR_TYPE.END_BAR) {
        barSeparator = new JellyScore.Bar();
        barSeparators.push(barSeparator);
        if (typeof bar === "object") {
          if (tickables != null) {
            tickables.push(barSeparator);
          } else {
            this.tickables[tick] = [barSeparator];
          }
        }
      }
      return barSeparators;
    };

    Score.prototype.hasBarSeparator = function(tick) {
      var tickable, tickables, _i, _len, _ref;
      tickables = this.tickables[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if ((_ref = tickable.whoAmI()) === JellyScore.Bar || _ref === JellyScore.StartRepeat || _ref === JellyScore.EndRepeat || _ref === JellyScore.StartAlternative || _ref === JellyScore.EndAlternative) {
            return true;
          }
        }
      }
      return false;
    };

    Score.prototype.drawLines = function(lines) {
      var ctx, i, line, pos, savedX, savedY, staff, staffLine, widget, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
      pos = {
        x: 0,
        y: 0
      };
      _results = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        i = 0;
        pos.x = 0;
        pos.y = 0;
        _ref = line.widgets;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          widget = _ref[_j];
          pos.x += widget.getTotalWidth(this.contextOptions);
        }
        savedX = pos.x;
        savedY = pos.y;
        if (line.bars.length > 0) {
          ctx = this.addCanvas(line.realWidth, line.height, line.id);
          this.addCanvas(line.realWidth, line.height, "" + line.id + "_h", "highlight");
          pos.y += line.paddingTop;
          _ref1 = this.staffs;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            staff = _ref1[_k];
            if (staff.active) {
              staffLine = line.staffs[i];
              if (staffLine != null) {
                staffLine.paddingTopTab = line.paddingTopTab;
                staffLine.realWidth = line.realWidth;
                pos.y -= staffLine.minY;
                staff.drawLine(staffLine, pos, ctx);
                pos.y += staffLine.height + staffLine.minY;
              }
              pos.x = savedX;
            }
            ++i;
          }
          pos.y += line.paddingBottom;
        }
        if (line.height > pos.y - savedY) {
          _results.push(pos.y = savedY + line.height);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Score.prototype.getResolution = function() {
      var res, resolution, staff, _i, _len, _ref;
      if (!(this.resolution != null)) {
        resolution = 1;
        _ref = this.staffs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          staff = _ref[_i];
          res = staff.getResolution();
          if (res > resolution) {
            if (res % resolution !== 0) {
              resolution = (res * resolution) / JellyScore.gcd(res, resolution);
            } else {
              resolution = res;
            }
          } else if (res < resolution && res > 0) {
            if (resolution % res !== 0) {
              resolution = (res * resolution) / JellyScore.gcd(res, resolution);
            }
          }
        }
        this.resolution = resolution;
        JellyScore.log("getResolution", this.resolution);
      }
      return this.resolution;
    };

    Score.prototype.getLocalResolution = function(t1, t2, resolution) {
      var staff, _i, _len, _ref;
      if (resolution == null) {
        resolution = 1;
      }
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        resolution = staff.getLocalResolution(t1, t2, resolution);
      }
      return resolution;
    };

    Score.prototype.setResolution = function(resolution) {
      this.resolution = resolution;
      return this.getLength(this.resolution, true);
    };

    Score.prototype.getTickables = function(resolution) {
      var staff, tick, tickables, _i, _len, _ref, _ref1;
      this.tickables = {};
      this.sortedTicks = [];
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.active) {
          staff.getTickables(resolution);
          _ref1 = staff.getTickablesForTarget(Score, resolution);
          for (tick in _ref1) {
            tickables = _ref1[tick];
            tick = parseInt(tick);
            if (this.tickables[tick] != null) {
              this.tickables[tick] = this.tickables[tick].concat(tickables);
            } else {
              this.tickables[tick] = tickables;
            }
          }
          this.ticks = $.extend(this.ticks, staff.getTicks(resolution));
        }
      }
      for (tick in this.ticks) {
        this.sortedTicks.push(parseInt(tick));
      }
      this.sortedTicks.sort(function(a, b) {
        return a - b;
      });
      return this.checkTickables();
    };

    Score.prototype.checkTickables = function() {
      var hasTempoChange, hasTimeSignature, tickable, _i, _len, _ref;
      hasTimeSignature = false;
      hasTempoChange = false;
      if (!(this.tickables[0] != null)) {
        this.tickables[0] = [];
      }
      _ref = this.tickables[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        switch (tickable.whoAmI()) {
          case JellyScore.TimeChange:
            hasTimeSignature = true;
            break;
          case JellyScore.TempoChange:
            hasTempoChange = true;
        }
      }
      if (!hasTimeSignature) {
        JellyScore.log("add default time signature");
        this.tickables[0].splice(0, 0, new JellyScore.TimeChange());
      }
      if (!hasTempoChange) {
        JellyScore.log("add default tempo");
        return this.tickables[0].splice(0, 0, new JellyScore.TempoChange(4, 120));
      }
    };

    Score.prototype.getDimensionsPerTick = function(resolution) {
      var current, dimensions, hasDiagram, i, lineWidth, staff, tick, ticksDimensions, _i, _len, _ref, _ref1;
      ticksDimensions = {};
      i = 0;
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.active) {
          lineWidth = 0;
          _ref1 = staff.getDimensionsPerTick(resolution, (this.contextOptions.inline && this.width > 0 ? this.width : null));
          for (tick in _ref1) {
            dimensions = _ref1[tick];
            tick = parseInt(tick);
            current = ticksDimensions[tick];
            if (this.contextOptions.inline) {
              lineWidth += dimensions.totalWidth * this.contextOptions.scale;
              if (this.width > 0 && lineWidth > this.width) {
                break;
              }
            }
            if (current != null) {
              current.paddingLeft = Math.max(current.paddingLeft, dimensions.paddingLeft);
              current.width = Math.max(current.width, dimensions.width);
              current.paddingRight = Math.max(current.paddingRight, dimensions.paddingRight);
              current.marginLeft = Math.max(current.marginLeft, dimensions.marginLeft);
              current.paddingBottom = Math.max(current.paddingBottom, dimensions.paddingBottom);
              current.paddingTop = Math.max(current.paddingTop, dimensions.paddingTop);
              current.paddingTopTab = Math.max(current.paddingTopTab, dimensions.paddingTopTab);
              current.staffs[i] = {
                minY: dimensions.minY,
                maxY: dimensions.maxY,
                lines: staff.contextOptions.lines,
                type: staff.whoAmI()
              };
              current.totalWidth = current.paddingLeft + current.width + current.paddingRight + current.marginLeft;
            } else {
              hasDiagram = false;
              ticksDimensions[tick] = {
                paddingTopTab: dimensions.paddingTopTab,
                paddingTop: dimensions.paddingTop,
                paddingBottom: dimensions.paddingBottom,
                paddingLeft: dimensions.paddingLeft,
                width: dimensions.width,
                paddingRight: dimensions.paddingRight,
                marginLeft: dimensions.marginLeft,
                staffs: [],
                totalWidth: dimensions.totalWidth
              };
              ticksDimensions[tick].staffs[i] = {
                minY: dimensions.minY,
                maxY: dimensions.maxY,
                lines: staff.contextOptions.lines,
                type: staff.whoAmI()
              };
            }
          }
        }
        ++i;
      }
      return ticksDimensions;
    };

    Score.prototype.getBarDuration = function(tick, resolution) {
      var tc;
      tc = this.getLastTimeChange(tick);
      return tc.getBarDuration(resolution);
    };

    Score.prototype.getBars = function(resolution, ticksDimensions) {
      var bar, barCount, bars, d, dim, endTick, i, previousBar, s, staff, tick, tickToBar, _i, _len, _ref, _ref1;
      tickToBar = {};
      bars = [];
      barCount = 0;
      endTick = -1;
      bar;

      previousBar;

      _ref = this.sortedTicks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        if (tick <= endTick && !this.hasBarSeparator(tick)) {
          dim = ticksDimensions[tick];
          if (dim != null) {
            if (dim.paddingTop > bar.paddingTop) {
              bar.paddingTop = dim.paddingTop;
            }
            if (dim.paddingTopTab > bar.paddingTopTab) {
              bar.paddingTopTab = dim.paddingTopTab;
            }
            if (dim.paddingBottom > bar.paddingBottom) {
              bar.paddingBottom = dim.paddingBottom;
            }
            bar.width += dim.totalWidth;
            bar.ticks.push(tick);
            _ref1 = bar.staffs;
            for (i in _ref1) {
              staff = _ref1[i];
              s = dim.staffs[parseInt(i)];
              if (s != null) {
                staff.minY = Math.min(staff.minY, s.minY);
                staff.maxY = Math.max(staff.maxY, s.maxY);
              }
            }
            tickToBar[tick] = bar;
          }
        } else {
          if (typeof bar !== "undefined" && bar !== null) {
            bar.duration = tick - bar.firstTick;
          }
          d = this.getBarDuration(tick, resolution);
          endTick = tick + d - 1;
          dim = ticksDimensions[tick];
          bar = {
            paddingTop: dim != null ? dim.paddingTop : 0,
            paddingTopTab: dim != null ? dim.paddingTopTab : 0,
            paddingBottom: dim != null ? dim.paddingBottom : 0,
            width: dim != null ? dim.totalWidth : 0,
            staffs: $.extend(true, [], dim != null ? dim.staffs : []),
            firstTick: tick,
            ticks: [tick],
            duration: d,
            isEolBar: false,
            id: barCount++
          };
          if (typeof previousBar !== "undefined" && previousBar !== null) {
            previousBar.width += this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.END_BAR);
          }
          previousBar = bar;
          bar.width += this.getBarSeparatorWidth(bar, JellyScore.BAR_TYPE.START_BAR);
          tickToBar[tick] = bar;
          bars.push(bar);
        }
      }
      return [bars, tickToBar];
    };

    Score.prototype.getWidgetsAt = function(line, previousLine) {
      var widget, widgets, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      widgets = [];
      if (previousLine != null) {
        _ref = previousLine.widgets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          widget = _ref[_i];
          if (widget.getMaxY() > previousLine.height) {
            widgets.push(new JellyScore.Widget({
              width: widget.getWidth(),
              height: widget.getMaxY() - previousLine.height
            }));
          }
        }
      }
      if (((_ref1 = this.contextOptions.widgets) != null ? _ref1.length : void 0) != null) {
        _ref2 = this.contextOptions.widgets;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          widget = _ref2[_j];
          if (widget.getLine() === line) {
            widgets.push(widget);
          }
        }
      }
      return widgets;
    };

    Score.prototype.newLine = function(line, bar, lines, width) {
      var barLine, currentLine, firstTick, i, staff, w, widget, _i, _len, _ref, _ref1;
      bar.marginLeft = this.getMarginLeftAt(bar.firstTick);
      bar.width += bar.marginLeft;
      firstTick = this.ticksDimensions[bar.firstTick];
      if (firstTick != null) {
        bar.width -= firstTick.marginLeft;
        firstTick.marginLeft = 0;
        firstTick.totalWidth = firstTick.paddingLeft + firstTick.width + firstTick.paddingRight;
      }
      barLine = {
        width: bar.width,
        staffs: [],
        coef: 1,
        bars: [bar],
        minY: 0,
        maxY: 0,
        marginLeft: 0,
        widgets: []
      };
      currentLine = barLine;
      _ref = this.getWidgetsAt(line, (lines.length > 0 ? lines[lines.length - 1] : null));
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        widget = _ref[_i];
        w = widget.getTotalWidth(this.contextOptions);
        if (currentLine.marginLeft + currentLine.width + w > width) {
          if (currentLine !== barLine) {
            currentLine.height = currentLine.maxY - currentLine.minY;
            lines.push(currentLine);
            currentLine = barLine;
            if (currentLine.marginLeft + currentLine.width + w > width) {
              currentLine = {
                width: 0,
                staffs: [],
                coef: 1,
                bars: [],
                minY: 0,
                maxY: 0,
                widgets: [],
                marginLeft: 0
              };
            }
          } else {
            currentLine = {
              width: 0,
              staffs: [],
              coef: 1,
              bars: [],
              minY: barLine.minY,
              maxY: barLine.maxY,
              widgets: barLine.widgets,
              marginLeft: barLine.marginLeft
            };
            barLine.widgets = [];
            barLine.marginLeft = 0;
            barLine.minY = 0;
            barLine.maxY = 0;
            if (currentLine.marginLeft + currentLine.width + w > width) {
              currentLine.height = currentLine.maxY - currentLine.minY;
              lines.push(currentLine);
              currentLine = barLine;
            }
          }
        }
        currentLine.marginLeft += w;
        currentLine.widgets.push(widget);
      }
      if (currentLine !== barLine) {
        currentLine.height = currentLine.maxY - currentLine.minY;
        lines.push(currentLine);
      }
      _ref1 = bar.staffs;
      for (i in _ref1) {
        staff = _ref1[i];
        if (staff != null) {
          i = parseInt(i);
          barLine.staffs[i] = {
            minY: staff.minY,
            maxY: staff.maxY,
            lines: staff.lines,
            type: staff.type
          };
        }
      }
      barLine.paddingTop = 0;
      barLine.paddingBottom = 0;
      barLine.paddingTopTab = 0;
      barLine.id = line;
      return barLine;
    };

    Score.prototype.getLines = function(bars, width, containerHeight) {
      var bar, currentLine, height, i, lineId, lines, staff, totalHeight, _i, _len, _ref, _ref1, _ref2;
      if (containerHeight == null) {
        containerHeight = 0;
      }
      lineId = 0;
      lines = [];
      currentLine = null;
      totalHeight = 0;
      for (_i = 0, _len = bars.length; _i < _len; _i++) {
        bar = bars[_i];
        if (currentLine === null) {
          currentLine = this.newLine(lineId, bar, lines, width);
        } else if (currentLine.marginLeft + currentLine.width + bar.width <= width) {
          currentLine.bars.push(bar);
          currentLine.width += bar.width;
          _ref = bar.staffs;
          for (i in _ref) {
            staff = _ref[i];
            if (staff != null) {
              i = parseInt(i);
              if (currentLine.staffs[i] != null) {
                currentLine.staffs[i].minY = Math.min(currentLine.staffs[i].minY, staff.minY);
                currentLine.staffs[i].maxY = Math.max(currentLine.staffs[i].maxY, staff.maxY);
              } else {
                currentLine.staffs[i] = {
                  minY: staff.minY,
                  maxY: staff.maxY
                };
              }
            }
          }
        } else {
          if (currentLine.width > 0) {
            currentLine.realWidth = width - currentLine.marginLeft;
            currentLine.coef = currentLine.realWidth / currentLine.width;
            height = 0;
            _ref1 = currentLine.staffs;
            for (i in _ref1) {
              staff = _ref1[i];
              if (staff != null) {
                staff.height = Math.round(0.5 + staff.maxY - staff.minY);
                height += staff.height;
              }
            }
            height += currentLine.paddingTop;
            height += currentLine.paddingTopTab;
            height += currentLine.paddingBottom;
            currentLine.height = Math.max(height, currentLine.maxY - currentLine.minY);
            currentLine.bars[currentLine.bars.length - 1].isEolBar = true;
            lines.push(currentLine);
            if (containerHeight > 0) {
              totalHeight += height;
              if (totalHeight >= containerHeight) {
                JellyScore.error("Stoooooooooop", totalHeight);
                return lines;
              }
            }
          }
          currentLine = this.newLine(++lineId, bar, lines, width);
        }
        bar.staff = currentLine;
        if (currentLine.paddingTop < bar.paddingTop) {
          currentLine.paddingTop = bar.paddingTop;
        }
        if (currentLine.paddingTopTab < bar.paddingTopTab) {
          currentLine.paddingTopTab = bar.paddingTopTab;
        }
        if (currentLine.paddingBottom < bar.paddingBottom) {
          currentLine.paddingBottom = bar.paddingBottom;
        }
      }
      if ((currentLine != null) && currentLine.width > 0) {
        height = 0;
        _ref2 = currentLine.staffs;
        for (i in _ref2) {
          staff = _ref2[i];
          staff.height = Math.round(0.5 + staff.maxY - staff.minY);
          height += staff.height;
        }
        height += currentLine.paddingTop + currentLine.paddingTopTab + currentLine.paddingBottom;
        currentLine.realWidth = currentLine.width;
        currentLine.height = Math.max(height, currentLine.maxY - currentLine.minY);
        currentLine.bars[currentLine.bars.length - 1].isEolBar = true;
        lines.push(currentLine);
        if (containerHeight > 0) {
          totalHeight += height;
          if (totalHeight >= containerHeight) {
            JellyScore.error("Stoooooooooop", totalHeight);
            return lines;
          }
        }
      }
      return lines;
    };

    Score.prototype.getLine = function(bars) {
      var bar, currentLine, i, lines, staff, _i, _len, _ref, _ref1;
      lines = [];
      currentLine = {
        width: 0,
        staffs: [],
        coef: 1,
        bars: [],
        minY: 20,
        maxY: 20,
        marginLeft: 0,
        widgets: [],
        paddingTop: 0,
        paddingBottom: 0,
        paddingTopTab: 0
      };
      for (_i = 0, _len = bars.length; _i < _len; _i++) {
        bar = bars[_i];
        if (currentLine.bars.length === 0) {
          bar.marginLeft = this.getMarginLeftAt(bar.firstTick);
          bar.width += bar.marginLeft;
        }
        currentLine.bars.push(bar);
        currentLine.width += bar.width;
        currentLine.minY = Math.min(currentLine.minY, bar.minY);
        currentLine.maxY = Math.max(currentLine.maxY, bar.maxY);
        _ref = bar.staffs;
        for (i in _ref) {
          staff = _ref[i];
          if (staff != null) {
            i = parseInt(i);
            if (currentLine.staffs[i] != null) {
              currentLine.staffs[i].minY = Math.min(currentLine.staffs[i].minY, staff.minY);
              currentLine.staffs[i].maxY = Math.max(currentLine.staffs[i].maxY, staff.maxY);
            } else {
              currentLine.staffs[i] = {
                minY: staff.minY,
                maxY: staff.maxY
              };
            }
          }
        }
        bar.staff = currentLine;
        if (currentLine.paddingTop < bar.paddingTop) {
          currentLine.paddingTop = bar.paddingTop;
        }
        if (currentLine.paddingTopTab < bar.paddingTopTab) {
          currentLine.paddingTopTab = bar.paddingTopTab;
        }
        if (currentLine.paddingBottom < bar.paddingBottom) {
          currentLine.paddingBottom = bar.paddingBottom;
        }
        if (this.width > 0 && currentLine.width > this.width) {
          break;
        }
      }
      if (currentLine.width > 0) {
        _ref1 = currentLine.staffs;
        for (i in _ref1) {
          staff = _ref1[i];
          staff.height = Math.round(0.5 + staff.maxY - staff.minY);
        }
        currentLine.realWidth = currentLine.width;
        if (this.width === 0) {
          this.width = currentLine.width + 2;
        }
        lines.push(currentLine);
      }
      return lines;
    };

    Score.prototype.getMarginLeftAt = function(tick) {
      var keyChangeWidth, keySignatureChangeWidth, marginLeft;
      marginLeft = (this.getLastTimeChange(tick)).getTotalWidth(this.contextOptions);
      keySignatureChangeWidth = this.getKeySignatureChangeDimensionsAt(tick);
      marginLeft += keySignatureChangeWidth.paddingLeft + keySignatureChangeWidth.width + keySignatureChangeWidth.paddingRight;
      keyChangeWidth = this.getKeyChangeDimensionsAt(tick);
      marginLeft += keyChangeWidth.paddingLeft + keyChangeWidth.width + keyChangeWidth.paddingRight;
      return marginLeft;
    };

    Score.prototype.getKeyChangeDimensionsAt = function(tick) {
      var keyChange, keyChangeWidth, staff, _i, _len, _ref;
      keyChangeWidth = {
        paddingLeft: 0,
        width: 0,
        paddingRight: 0
      };
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.active) {
          keyChange = staff.getLastKeyChange(tick);
          keyChangeWidth.paddingLeft = Math.max(keyChangeWidth.paddingLeft, keyChange.getLeftPadding(this.contextOptions));
          keyChangeWidth.width = Math.max(keyChangeWidth.width, keyChange.getWidth(this.contextOptions));
          keyChangeWidth.paddingRight = Math.max(keyChangeWidth.paddingRight, keyChange.getRightPadding(this.contextOptions));
        }
      }
      return keyChangeWidth;
    };

    Score.prototype.getLastTimeChange = function(tick) {
      var t, tickable, tickables, timeChange, _i, _len, _ref;
      this.init();
      timeChange = null;
      _ref = this.tickables;
      for (t in _ref) {
        tickables = _ref[t];
        t = parseInt(t);
        if (t > tick) {
          break;
        }
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if (tickable.whoAmI() === JellyScore.TimeChange) {
            timeChange = tickable;
          }
        }
      }
      return timeChange;
    };

    Score.prototype.getLastTempoChange = function(tick) {
      var t, tempoChange, tickable, tickables, _i, _len, _ref;
      this.init();
      tempoChange = null;
      _ref = this.tickables;
      for (t in _ref) {
        tickables = _ref[t];
        t = parseInt(t);
        if (t > tick) {
          break;
        }
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if (tickable.whoAmI() === JellyScore.TempoChange) {
            tempoChange = tickable;
          }
        }
      }
      return tempoChange;
    };

    Score.prototype.getKeySignatureChangeDimensionsAt = function(tick) {
      var keyChangeSignature, keyChangeSignatureWidth, staff, _i, _len, _ref;
      keyChangeSignatureWidth = {
        paddingLeft: 0,
        width: 0,
        paddingRight: 0
      };
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.active) {
          keyChangeSignature = staff.getLastKeySignatureChange(tick);
          if (keyChangeSignature != null) {
            keyChangeSignatureWidth.paddingLeft = Math.max(keyChangeSignatureWidth.paddingLeft, keyChangeSignature.getLeftPadding(this.contextOptions));
            keyChangeSignatureWidth.width = Math.max(keyChangeSignatureWidth.width, keyChangeSignature.getWidth(this.contextOptions));
            keyChangeSignatureWidth.paddingRight = Math.max(keyChangeSignatureWidth.paddingRight, keyChangeSignature.getRightPadding(this.contextOptions));
          }
        }
      }
      return keyChangeSignatureWidth;
    };

    Score.prototype.getHeight = function(lines) {
      var height, line, staff, staffHeight, _i, _j, _len, _len1, _ref;
      height = 20;
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        staffHeight = 0;
        _ref = line.staffs;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          staff = _ref[_j];
          if (staff != null) {
            staffHeight += staff.height;
          }
        }
        if (line.height > staffHeight) {
          height += line.height + line.paddingBottom;
        } else {
          height += staffHeight;
          height += line.paddingTop + line.paddingTopTab + line.paddingBottom;
        }
      }
      return height;
    };

    Score.prototype.createCanvas = function(width, height) {
      if (this.container != null) {
        this.removeHighlight();
        this.container.empty();
        this.container.css('position', 'relative');
        this.canvas = $("<canvas width=\"" + width + "\" height=\"" + height + "\"></canvas>");
        this.ctx = this.buildContext(this.canvas[0]);
      } else {
        this.ctx = new JellyScore.Context(this.id, width, height);
        this.postMessage({
          createCanvas: {
            width: width,
            height: height
          }
        });
      }
      return this.ctx;
    };

    Score.prototype.addCanvas = function(width, height, id, highlight) {
      var canvas;
      if (highlight == null) {
        highlight = false;
      }
      if (this.container != null) {
        if (this.canvases[id] != null) {
          this.canvases[id].remove();
        }
        this.canvases[id] = canvas = $("<canvas width=\"" + width + "\" height=\"" + height + "\"></canvas>");
        if (highlight) {
          canvas.addClass("highlight");
          canvas.css('margin-top', "-" + height + "px");
        }
        this.container.append(canvas);
        this.contexts[id] = this.buildContext(canvas[0]);
      } else {
        this.contexts[id] = new JellyScore.Context(this.id, width, height, "" + id);
        this.postMessage({
          addCanvas: {
            width: width,
            height: height,
            contextId: "" + id,
            highlight: highlight
          }
        });
      }
      return this.contexts[id];
    };

    Score.prototype.clearContainer = function() {
      if (this.container != null) {
        return this.container.empty();
      } else {
        return this.postMessage({
          clearContainer: true
        });
      }
    };

    Score.prototype.displayCanvas = function() {
      if (this.container != null) {
        return this.container.append(this.canvas);
      } else {
        return this.postMessage({
          displayCanvas: true
        });
      }
    };

    Score.prototype.getDurationOn = function(tick) {
      var d, duration, note, staff, _i, _j, _len, _len1, _ref;
      duration = null;
      _ref = this.getTicksAt(tick);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        for (_j = 0, _len1 = staff.length; _j < _len1; _j++) {
          note = staff[_j];
          d = note.getTicks(this.resolution);
          if (!(duration != null) || d < duration) {
            duration = d;
          }
        }
      }
      return duration;
    };

    Score.prototype.initTicks = function() {};

    Score.prototype.getLength = function(resolution, force) {
      var staff, _i, _len, _ref;
      if (force == null) {
        force = false;
      }
      if (!(this.length != null) || force) {
        this.length = 0;
        _ref = this.staffs;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          staff = _ref[_i];
          this.length = Math.max(this.length, staff.getLength(resolution, force));
        }
      }
      return this.length;
    };

    Score.prototype.activeTabs = function() {
      var i, l, staff, tabStaff, _results;
      l = this.staffs.length;
      i = 0;
      _results = [];
      while (i < l) {
        staff = this.staffs[i];
        if (staff.constructor === JellyScore.Staff && (i + 1 === l || this.staffs[i + 1].constructor !== JellyScore.TabStaff)) {
          tabStaff = staff.getTabStaff();
          tabStaff.setParent(this);
          this.staffs.splice(++i, 0, tabStaff);
          ++l;
        } else if (staff.constructor === JellyScore.TabStaff) {
          staff.active = true;
        }
        _results.push(++i);
      }
      return _results;
    };

    Score.prototype.inactiveTabs = function() {
      var staff, _i, _len, _ref, _results;
      _ref = this.staffs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.constructor === JellyScore.TabStaff) {
          _results.push(staff.active = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Score.prototype.activeStaffs = function() {
      var staff, _i, _len, _ref, _results;
      _ref = this.staffs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.constructor === JellyScore.Staff) {
          _results.push(staff.active = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Score.prototype.inactiveStaffs = function() {
      var staff, _i, _len, _ref, _results;
      _ref = this.staffs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.constructor === JellyScore.Staff) {
          _results.push(staff.active = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Score.prototype.areStaffsActive = function() {
      var response, staff, _i, _len, _ref;
      response = false;
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.constructor === JellyScore.Staff) {
          response |= staff.active;
        }
      }
      return response;
    };

    Score.prototype.areTabsActive = function() {
      var response, staff, _i, _len, _ref;
      response = false;
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if (staff.constructor === JellyScore.TabStaff) {
          response |= staff.active;
        }
      }
      return response;
    };

    Score.prototype.setInstrument = function(instrument) {
      this.instrument = instrument;
    };

    Score.prototype.getInstrument = function() {
      return this.instrument;
    };

    Score.prototype.getAllNotes = function(notes) {
      var staff, _i, _len, _ref;
      if (notes == null) {
        notes = {};
      }
      _ref = this.staffs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        staff.getAllNotes(notes);
      }
      return notes;
    };

    Score.prototype.setId = function(id) {
      this.id = id;
    };

    Score.prototype.getId = function() {
      return this.id;
    };

    Score.prototype.postMessage = function(obj) {
      if (typeof self !== "undefined" && self !== null) {
        return self.postMessage($.extend(obj, {
          id: this.id
        }));
      }
    };

    Score.prototype.whoAmI = function() {
      return this.constructor;
    };

    return Score;

  })();

  JellyScore.Score = Score;

}).call(this);

(function() {
  var Staff, TabStaff,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Staff = (function() {

    function Staff(options, contextOptions) {
      this.options = options != null ? options : {};
      this.contextOptions = contextOptions != null ? contextOptions : {};
      this.voices = [];
      this.tickables = {};
      this.ticks = {};
      this.sortedTicks = [];
      this.reverseSortedTicks = [];
      this.contextOptions.lines = 5;
      this.tuning = [64, 59, 55, 50, 45, 40];
      this.capo = 0;
      this.active = true;
    }

    Staff.prototype.setParent = function(parent) {
      this.parent = parent;
    };

    Staff.prototype.addVoice = function(voice) {
      this.voices.push(voice);
      return voice.setParent(this);
    };

    Staff.prototype.isEmpty = function() {
      var empty, i;
      empty = true;
      i = this.voices.length - 1;
      while (i >= 0) {
        if (this.voices[i].isEmpty()) {
          this.voices.splice(i, 1);
        } else {
          empty = false;
        }
        i--;
      }
      return empty;
    };

    Staff.prototype.isValid = function() {
      return true;
    };

    Staff.prototype.setContextOptions = function(contextOptions) {
      return $.extend(this.contextOptions, contextOptions);
    };

    Staff.prototype.setTuning = function(tuning) {
      this.tuning = tuning;
      return this.contextOptions.lines = this.tuning.length;
    };

    Staff.prototype.setCapo = function(capo) {
      this.capo = capo;
    };

    Staff.prototype.drawLine = function(line, pos, ctx) {
      var options;
      options = $.extend({}, this.contextOptions, {
        'width': line.realWidth
      });
      if (this.whoAmI() === JellyScore.TabStaff) {
        pos.y += line.paddingTopTab;
      }
      return this.drawStaff({
        'x': pos.x,
        'y': pos.y
      }, options, ctx);
    };

    Staff.prototype.drawStaff = function(pos, options, ctx) {
      return JS.Drawings.drawStaff(ctx, pos, options);
    };

    Staff.prototype.drawTickable = function(tickable, ctx, pos, coef) {
      if (tickable != null) {
        this.contextOptions.width = Math.round(tickable.getWidth(this.contextOptions) * coef);
        this.contextOptions.paddingLeft = Math.round(tickable.getLeftPadding(this.contextOptions) * coef);
        tickable.drawAt(ctx, pos, this.contextOptions);
        return pos.x += Math.round(tickable.getTotalWidth(this.contextOptions) * coef);
      }
    };

    Staff.prototype.getHeight = function(options) {
      var key;
      key = this.whoAmI() === TabStaff ? new JellyScore.Clefs.Tab() : this.getLastKeyChange(0);
      return key.getHeight($.extend({}, options, this.contextOptions));
    };

    Staff.prototype.drawBar = function(bar, ticksDimensions, pos, ctx, resolution) {
      var barRest, coef, dim, i, keychange, keysignaturechange, lastTick, margin, marginLeft, newkeysignaturechange, realMangin, realW, tick, tickRest, timechange, voice, w, x, _i, _j, _len, _len1, _ref, _ref1;
      barRest = 0.0;
      tick = bar.firstTick;
      lastTick = tick + bar.duration;
      coef = bar.staff.coef;
      realW = Math.floor(pos.x);
      tickRest = pos.x - realW;
      pos.x = realW;
      keychange = this.getLastKeyChange(tick - 1);
      keysignaturechange = this.getLastKeySignatureChange(tick - 1);
      timechange = this.getLastTimeChange(tick - 1);
      this.contextOptions.clef = keychange.getClef();
      this.contextOptions.keysignature = keysignaturechange.getSignature();
      if (this.whoAmI() === JellyScore.TabStaff) {
        this.contextOptions.isTabStaff = true;
      } else {
        this.contextOptions.isTabStaff = null;
      }
      if (bar === bar.staff.bars[0]) {
        keychange = this.getLastKeyChange(tick);
        keysignaturechange = this.getLastKeySignatureChange(tick);
        timechange = this.getLastTimeChange(tick);
        this.contextOptions.clef = keychange.getClef();
        this.contextOptions.keysignature = keysignaturechange.getSignature();
        x = pos.x;
        this.drawTickable(keychange, ctx, pos, coef);
        if (keysignaturechange != null) {
          this.drawTickable(keysignaturechange, ctx, pos, coef);
        }
        this.drawTickable(timechange, ctx, pos, coef);
        pos.x = x;
      }
      if (bar.marginLeft != null) {
        margin = bar.marginLeft * coef + tickRest;
        realMangin = Math.floor(margin);
        tickRest = margin - realMangin;
        pos.x += realMangin;
      }
      this.prepareBar(bar, resolution);
      i = 1;
      _ref = bar.ticks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        keychange = this.getLastKeyChange(tick, keychange);
        newkeysignaturechange = this.getLastKeySignatureChange(tick);
        if (this.contextOptions.clef.whoAmI() !== keychange.getClef().whoAmI()) {
          this.contextOptions.clef = keychange.getClef();
          if (bar !== bar.staff.bars[0] || tick !== bar.firstTick) {
            x = pos.x;
            marginLeft = Math.floor((ticksDimensions[tick].marginLeft * coef) + tickRest);
            this.drawTickable(keychange, ctx, pos, coef);
            pos.x = x;
          }
        }
        if (newkeysignaturechange.hash() !== keysignaturechange.hash()) {
          keysignaturechange = newkeysignaturechange;
          this.contextOptions.keysignature = keysignaturechange.getSignature();
          if (bar !== bar.staff.bars[0] || tick !== bar.firstTick) {
            x = pos.x;
            marginLeft = Math.floor((ticksDimensions[tick].marginLeft * coef) + tickRest);
            this.drawTickable(keysignaturechange, ctx, pos, coef);
            pos.x = x;
          }
        }
        dim = ticksDimensions[tick];
        if (dim != null) {
          marginLeft = Math.floor((dim.marginLeft * coef) + tickRest);
          pos.x += marginLeft;
          w = (dim.totalWidth * coef) + tickRest;
          realW = Math.floor(w);
          this.contextOptions.width = Math.round(dim.width * coef);
          this.contextOptions.paddingLeft = Math.round(dim.paddingLeft * coef);
          this.contextOptions.paddingRight = Math.round(dim.paddingRight * coef);
          tickRest = w - realW;
          this.contextOptions.paddingTop = dim.paddingTop;
          this.contextOptions.paddingBottom = dim.paddingBottom;
          this.contextOptions.paddingTopTab = dim.paddingTopTab;
          if (bar.isEolBar && i === bar.ticks.length) {
            this.contextOptions.isEol = true;
          }
          if (this.whoAmI() === JellyScore.TabStaff) {
            this.contextOptions.isTabStaff = true;
          } else {
            this.contextOptions.isTabStaff = false;
          }
          _ref1 = this.voices;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            voice = _ref1[_j];
            voice.drawAt(ctx, tick, resolution, pos, this.contextOptions);
          }
          this.contextOptions.isTabStaff = null;
          pos.x += realW - marginLeft;
          if (this.contextOptions.isEol != null) {
            delete this.contextOptions.isEol;
          }
        }
        i++;
      }
      return pos.x += tickRest;
    };

    Staff.prototype.drawTick = function(tick, bar, ticksDimensions, pos, ctx, resolution, color) {
      var barRest, coef, keychange, keysignaturechange, lastTick, margin, marginLeft, newkeysignaturechange, options, realMangin, realW, t, tickRest, timechange, voice, w, _i, _j, _len, _len1, _ref, _ref1;
      barRest = 0.0;
      t = bar.firstTick;
      lastTick = t + bar.duration;
      coef = bar.staff.coef;
      realW = Math.floor(pos.x);
      tickRest = pos.x - realW;
      pos.x = realW;
      keychange = this.getLastKeyChange(t - 1);
      keysignaturechange = this.getLastKeySignatureChange(t - 1);
      timechange = this.getLastTimeChange(t - 1);
      this.contextOptions.clef = keychange.getClef();
      this.contextOptions.keysignature = keysignaturechange.getSignature();
      if (bar.marginLeft != null) {
        margin = bar.marginLeft * coef + tickRest;
        realMangin = Math.floor(margin);
        tickRest = margin - realMangin;
        pos.x += realMangin;
      }
      _ref = bar.ticks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        keychange = this.getLastKeyChange(t, keychange);
        newkeysignaturechange = this.getLastKeySignatureChange(t);
        if (this.contextOptions.clef.whoAmI() !== keychange.getClef().whoAmI()) {
          this.contextOptions.clef = keychange.getClef();
        }
        if (newkeysignaturechange.hash() !== keysignaturechange.hash()) {
          keysignaturechange = newkeysignaturechange;
          this.contextOptions.keysignature = keysignaturechange.getSignature();
        }
        if (ticksDimensions[t] != null) {
          marginLeft = Math.floor((ticksDimensions[t].marginLeft * coef) + tickRest);
          pos.x += marginLeft;
          w = (ticksDimensions[t].totalWidth * coef) + tickRest;
          realW = Math.floor(w);
          tickRest = w - realW;
          if (t === tick) {
            this.contextOptions.width = Math.round(ticksDimensions[t].width * coef);
            this.contextOptions.paddingLeft = Math.round(ticksDimensions[t].paddingLeft * coef);
            options = $.extend({}, this.contextOptions);
            options.color = color;
            options.highlight = true;
            _ref1 = this.voices;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              voice = _ref1[_j];
              voice.drawAt(ctx, t, resolution, pos, options);
            }
          }
          pos.x += realW - marginLeft;
        }
      }
      return pos.x += tickRest;
    };

    Staff.prototype.prepareBar = function(bar, resolution) {
      var voice, _i, _len, _ref, _results;
      _ref = this.voices;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        _results.push(voice.prepareBar(bar, resolution));
      }
      return _results;
    };

    Staff.prototype.simulateDraw = function(bar, ticksDimensions, pos) {
      var barRest, coef, lastTick, margin, realMangin, realW, tick, tickRest, w, _i, _len, _ref;
      barRest = 0.0;
      tick = bar.firstTick;
      lastTick = tick + bar.duration;
      coef = bar.staff.coef;
      realW = Math.floor(pos.x);
      tickRest = pos.x - realW;
      pos.x = realW;
      if (bar.marginLeft != null) {
        margin = bar.marginLeft * coef + tickRest;
        realMangin = Math.floor(margin);
        tickRest = margin - realMangin;
        pos.x += realMangin;
      }
      _ref = bar.ticks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        if (ticksDimensions[tick] != null) {
          w = (ticksDimensions[tick].totalWidth * coef) + tickRest;
          realW = Math.floor(w);
          tickRest = w - realW;
          pos.x += realW;
        }
        tick++;
      }
      return pos.x += tickRest;
    };

    Staff.prototype.getNextTickable = function(tick) {
      var nextTick, t, voice, _i, _len, _ref;
      nextTick = null;
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        t = voice.getNextTickable(tick);
        if (nextTick === null || t < nextTick) {
          nextTick = t;
        }
      }
      return nextTick;
    };

    Staff.prototype.hasTickOn = function(tick) {
      var voice, _i, _len, _ref;
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        if (voice.hasTickOn(tick)) {
          return true;
        }
      }
      return false;
    };

    Staff.prototype.getTicksAt = function(tick) {
      var ticks, voice, _i, _len, _ref;
      ticks = [];
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        ticks.push.apply(ticks, voice.getTicksAt(tick));
      }
      return ticks;
    };

    Staff.prototype.getTicks = function(resolution) {
      var i, tick, voice, _i, _len, _ref;
      this.sortedTicks = [];
      this.reverseSortedTicks = [];
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        this.ticks = voice.getTicks(resolution);
      }
      for (tick in this.ticks) {
        i = parseInt(tick);
        this.sortedTicks.push(i);
        this.reverseSortedTicks.push(i);
      }
      this.sortedTicks.sort(function(a, b) {
        return a - b;
      });
      this.reverseSortedTicks.sort(function(a, b) {
        return a - b;
      }).reverse();
      return this.ticks;
    };

    Staff.prototype.hasKeyChangeAt = function(tick) {
      var tickable, _i, _len, _ref;
      if (this.tickables[tick] != null) {
        _ref = this.tickables[tick];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tickable = _ref[_i];
          if (tickable.whoAmI() === JellyScore.KeyChange) {
            return tickable;
          }
        }
      }
      return false;
    };

    Staff.prototype.hasKeySignatureChangeAt = function(tick) {
      var tickable, _i, _len, _ref;
      if (this.tickables[tick] != null) {
        _ref = this.tickables[tick];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tickable = _ref[_i];
          if (tickable.whoAmI() === JellyScore.KeySignatureChange) {
            return tickable;
          }
        }
      }
      return false;
    };

    Staff.prototype.hasFretDiagram = function(tick) {
      var tickable, _i, _len, _ref;
      if (this.tickables[tick] != null) {
        _ref = this.tickables[tick];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tickable = _ref[_i];
          if (tickable.whoAmI() === JellyScore.FretDiagram) {
            return tickable;
          }
        }
      }
      return false;
    };

    Staff.prototype.getResolution = function() {
      var res, resolution, voice, _i, _len, _ref;
      resolution = 1;
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        res = voice.getResolution();
        if (res > resolution) {
          if (res % resolution !== 0) {
            resolution = (res * resolution) / JellyScore.gcd(res, resolution);
          } else {
            resolution = res;
          }
        } else if (res < resolution && res > 0) {
          if (resolution % res !== 0) {
            resolution = (res * resolution) / JellyScore.gcd(res, resolution);
          }
        }
      }
      return resolution;
    };

    Staff.prototype.getLocalResolution = function(t1, t2, resolution) {
      var voice, _i, _len, _ref;
      if (resolution == null) {
        resolution = 1;
      }
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        resolution = voice.getLocalResolution(t1, t2, resolution);
      }
      return resolution;
    };

    Staff.prototype.getTickablesForTarget = function(target, resolution) {
      var tick, tickables, voice, voiceTickables, _i, _len, _ref, _ref1;
      tickables = {};
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        _ref1 = voice.getTickablesForTarget(target, resolution);
        for (tick in _ref1) {
          voiceTickables = _ref1[tick];
          tick = parseInt(tick);
          if (tickables[tick] != null) {
            tickables[tick] = tickables[tick].concat(voiceTickables);
          } else {
            tickables[tick] = voiceTickables;
          }
        }
      }
      return tickables;
    };

    Staff.prototype.getTickables = function(resolution) {
      var voice, _i, _len, _ref;
      this.tickables = this.getTickablesForTarget(Staff, resolution);
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        voice.mapTickables(resolution);
      }
      return this.checkTickables();
    };

    Staff.prototype.checkTickables = function() {
      var hasClef, hasKeySignature, tickable, voice, _i, _j, _len, _len1, _ref, _ref1, _results;
      hasClef = false;
      hasKeySignature = false;
      if (!(this.tickables[0] != null)) {
        this.tickables[0] = [];
      }
      JellyScore.log("checkTickables for staff", this);
      _ref = this.tickables[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        JellyScore.log(tickable);
        switch (tickable.whoAmI()) {
          case JellyScore.KeyChange:
            hasClef = true;
            break;
          case JellyScore.KeySignatureChange:
            hasKeySignature = true;
        }
      }
      if (!hasKeySignature) {
        JellyScore.log("add default key signature");
        this.tickables[0].splice(0, 0, this.getDefaultKeySignatureChange());
      }
      if (!hasClef) {
        JellyScore.log("add default clef");
        this.tickables[0].splice(0, 0, this.getDefaultKeyChange());
      }
      if ((this.capo != null) && this.capo > 0) {
        _ref1 = this.voices;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          voice = _ref1[_j];
          _results.push(voice.setCapo(this.capo));
        }
        return _results;
      }
    };

    Staff.prototype.getLast = function(whatClass, tick, getDefault, previous) {
      var t, tickable, tickables, _i, _j, _k, _len, _len1, _len2, _ref;
      if (getDefault == null) {
        getDefault = null;
      }
      if (previous == null) {
        previous = null;
      }
      if (previous != null) {
        tickables = this.tickables[tick];
        if (tickables != null) {
          for (_i = 0, _len = tickables.length; _i < _len; _i++) {
            tickable = tickables[_i];
            if (tickable.whoAmI() === whatClass) {
              return tickable;
            }
          }
        }
        return previous;
      } else {
        _ref = this.reverseSortedTicks;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          t = _ref[_j];
          if (t <= tick) {
            tickables = this.tickables[t];
            if (tickables != null) {
              for (_k = 0, _len2 = tickables.length; _k < _len2; _k++) {
                tickable = tickables[_k];
                if (tickable.whoAmI() === whatClass) {
                  return tickable;
                }
              }
            }
          }
        }
      }
      return getDefault();
    };

    Staff.prototype.getLastKeyChange = function(tick, previous) {
      if (previous == null) {
        previous = null;
      }
      return this.getLast(JellyScore.KeyChange, tick, this.getDefaultKeyChange, previous);
    };

    Staff.prototype.getLastKeySignatureChange = function(tick, previous) {
      if (previous == null) {
        previous = null;
      }
      return this.getLast(JellyScore.KeySignatureChange, tick, this.getDefaultKeySignatureChange, previous);
    };

    Staff.prototype.getLastTimeChange = function(tick) {
      var score, timeChange;
      timeChange = null;
      score = this.parent;
      while (score.whoAmI() !== JellyScore.Score && score !== null) {
        score = score.parent;
      }
      if (score.whoAmI() === JellyScore.Score) {
        return score.getLastTimeChange(tick);
      } else {
        throw "The staff must be added to a Score";
      }
    };

    Staff.prototype.getClefAt = function(tick) {
      return this.getLastKeyChange(tick).getClef();
    };

    Staff.prototype.getKeySignatureAt = function(tick) {
      return this.getLastKeySignatureChange(tick).getSignature();
    };

    Staff.prototype.getDefaultKeyChange = function() {
      return new JellyScore.KeyChange();
    };

    Staff.prototype.getDefaultKeySignatureChange = function() {
      return new JellyScore.KeySignatureChange("c", true);
    };

    Staff.prototype.getMarginLeftAt = function(tick, contextOptions) {
      var keySignature, keychange, mLeft;
      this.contextOptions = contextOptions;
      mLeft = 0;
      keychange = this.hasKeyChangeAt(tick);
      if (keychange) {
        mLeft += keychange.getTotalWidth(this.contextOptions);
      }
      keySignature = this.hasKeySignatureChangeAt(tick);
      if (keySignature) {
        mLeft += keySignature.getTotalWidth(this.contextOptions);
      }
      return mLeft;
    };

    Staff.prototype.getStaffMaxY = function() {
      return 60 * this.contextOptions.scale;
    };

    Staff.prototype.getDimensionsPerTick = function(resolution, limit) {
      var b, l, length, mLeft, maxY, minY, r, staffMaxY, t, tWidth, tick, ticksDimensions, totalWidth, tt, voice, w, whoAmI, _i, _j, _len, _len1, _ref, _ref1;
      ticksDimensions = {};
      length = this.getLength(resolution);
      totalWidth = 0;
      this.contextOptions.clef = this.getClefAt(0);
      this.contextOptions.keysignature = this.getKeySignatureAt(0);
      if (this.whoAmI() === JellyScore.TabStaff) {
        this.contextOptions.isTabStaff = true;
      } else {
        this.contextOptions.isTabStaff = false;
      }
      staffMaxY = this.getStaffMaxY();
      whoAmI = this.whoAmI();
      _ref = this.sortedTicks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        minY = 0;
        maxY = staffMaxY;
        w = 0;
        l = 0;
        r = 0;
        t = 0;
        b = 0;
        tt = 0;
        mLeft = this.getMarginLeftAt(tick, this.contextOptions);
        _ref1 = this.voices;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          voice = _ref1[_j];
          w = Math.max(w, voice.getWidth(tick, resolution, this.contextOptions));
          l = Math.max(l, voice.getLeftPadding(tick, resolution, this.contextOptions));
          r = Math.max(r, voice.getRightPadding(tick, resolution, this.contextOptions));
          minY = Math.min(minY, voice.getMinY(tick, resolution, this.contextOptions));
          maxY = Math.max(maxY, voice.getMaxY(tick, resolution, this.contextOptions));
          t = Math.max(t, voice.getTopPadding(tick, resolution, this.contextOptions));
          b = Math.max(b, voice.getBottomPadding(tick, resolution, this.contextOptions));
          tt = Math.max(tt, voice.getTabTopPadding(tick, resolution, this.contextOptions));
        }
        tWidth = w + l + r + mLeft;
        ticksDimensions[tick] = {
          width: w,
          paddingLeft: l,
          paddingRight: r,
          paddingTop: t,
          paddingTopTab: this.whoAmI() === JellyScore.TabStaff ? tt : 0,
          paddingBottom: b,
          totalWidth: w + l + r + mLeft,
          minY: minY,
          maxY: maxY,
          marginLeft: mLeft
        };
        if (limit != null) {
          totalWidth += tWidth * this.contextOptions.scale;
          if (totalWidth > limit) {
            break;
          }
        }
      }
      this.contextOptions.isTabStaff = null;
      return ticksDimensions;
    };

    Staff.prototype.getBarDuration = function(tick, resolution) {
      return resolution;
    };

    Staff.prototype.getBars = function(resolution, ticksDimensions) {
      var bar, barCount, bars, d, endTick, tick, tickToBar, _i, _len, _ref;
      tick = 0;
      tickToBar = {};
      bars = [];
      barCount = 0;
      endTick = -1;
      bar;

      _ref = this.sortedTicks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        if ((tick <= endTick) && (tick < this.getLength(resolution))) {
          bar.width += ticksDimensions[tick].totalWidth;
          tickToBar[tick++] = bar;
        } else {
          d = this.getBarDuration(tick, resolution);
          endTick = tick + d - 1;
          bar = {
            width: ticksDimensions[tick].totalWidth,
            height: 75 * this.contextOptions.scale,
            duration: d,
            id: barCount++
          };
          tickToBar[tick++] = bar;
          bars.push(bar);
        }
      }
      return [bars, tickToBar];
    };

    Staff.prototype.getStaffs = function(bars, width) {
      var bar, currentStaff, staffs, _i, _len;
      staffs = [];
      currentStaff = {
        width: 0,
        height: 75 * this.contextOptions.scale,
        coef: 1
      };
      for (_i = 0, _len = bars.length; _i < _len; _i++) {
        bar = bars[_i];
        if (currentStaff.width + bar.width <= width) {
          currentStaff.width += bar.width;
        } else {
          if (currentStaff.width > 0) {
            currentStaff.coef = width / currentStaff.width;
            currentStaff.realWidth = width;
            staffs.push(currentStaff);
          }
          currentStaff = {
            width: bar.width,
            height: 75 * this.contextOptions.scale,
            coef: 1
          };
        }
        bar.staff = currentStaff;
      }
      if (currentStaff.width > 0) {
        staffs.push(currentStaff);
      }
      return staffs;
    };

    Staff.prototype.createCanvas = function($container, width, height) {
      $container.empty();
      this.canvas = $("<canvas width=\"" + width + "\" height=\"" + height + "\"></canvas>");
      $container.append(this.canvas);
      this.ctx = this.buildContext(this.canvas[0]);
      return this.ctx;
    };

    Staff.prototype.drawStaffs = function(staffs, width) {
      var i, options, staffNumber, _i, _results;
      staffNumber = staffs.length;
      options = $.extend({}, this.contextOptions, {
        'width': width
      });
      _results = [];
      for (i = _i = 0; 0 <= staffNumber ? _i < staffNumber : _i > staffNumber; i = 0 <= staffNumber ? ++_i : --_i) {
        if (i === staffNumber - 1) {
          options = $.extend(options, {
            'width': staffs[i].width
          });
        }
        _results.push(this.drawStaff({
          'x': 0,
          'y': 75 * options.scale * i
        }, options));
      }
      return _results;
    };

    Staff.prototype.getLength = function(resolution, force) {
      var voice, _i, _len, _ref;
      if (force == null) {
        force = false;
      }
      if (!(this.length != null) || force) {
        this.length = 0;
        _ref = this.voices;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          voice = _ref[_i];
          this.length = Math.max(this.length, voice.getLength(resolution));
        }
      }
      return this.length;
    };

    Staff.prototype.getAllNotes = function(notes) {
      var voice, _i, _len, _ref, _results;
      if (notes == null) {
        notes = {};
      }
      _ref = this.voices;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        _results.push(voice.getAllNotes(notes));
      }
      return _results;
    };

    Staff.prototype.getTabStaff = function() {
      var tabStaff, voice, _i, _len, _ref;
      tabStaff = new TabStaff(this.options, this.contextOptions);
      tabStaff.setTuning(this.tuning);
      tabStaff.setCapo(this.capo);
      _ref = this.voices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        voice = _ref[_i];
        tabStaff.addVoice(voice);
      }
      return tabStaff;
    };

    Staff.prototype.whoAmI = function() {
      return this.constructor;
    };

    return Staff;

  })();

  TabStaff = (function(_super) {

    __extends(TabStaff, _super);

    function TabStaff(options, contextOptions) {
      TabStaff.__super__.constructor.call(this, options, contextOptions);
      this.contextOptions.lines = 6;
      this.contextOptions.scale *= 1.5;
    }

    TabStaff.prototype.getDefaultKeyChange = function() {
      return new JellyScore.KeyChange("tab");
    };

    TabStaff.prototype.drawStaff = function(pos, options, ctx) {
      return JS.Drawings.drawTabStaff(ctx, pos, options);
    };

    TabStaff.prototype.getStaffMaxY = function() {
      return 16 * this.contextOptions.lines * this.contextOptions.scale;
    };

    TabStaff.prototype.isValid = function() {
      return true;
    };

    return TabStaff;

  })(Staff);

  JellyScore.Staff = Staff;

  JellyScore.TabStaff = TabStaff;

}).call(this);

(function() {
  var Voice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Voice = (function() {

    function Voice(voice) {
      var endRepeat, newTickable, references, startAlternative, tickable, _i, _len, _ref, _ref1;
      this.tickables = [];
      this.tickablesDict = {};
      this.ticks = {};
      this.parent = null;
      if (voice != null) {
        references = {};
        _ref = voice.tickables;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tickable = _ref[_i];
          if ((tickable.getType != null) && ((_ref1 = tickable.getType()) === JellyScore.BAR_TYPE.START_BAR || _ref1 === JellyScore.BAR_TYPE.END_BAR)) {
            switch (tickable.constructor) {
              case JellyScore.StartRepeat:
                tickable._id = JellyScore.getId();
                newTickable = new tickable.constructor(tickable);
                references[tickable._id] = newTickable;
                this.addTickable(newTickable);
                break;
              case JellyScore.StartAlternative:
                if (references[tickable.startRepeat._id] != null) {
                  tickable._id = JellyScore.getId();
                  newTickable = new tickable.constructor(tickable);
                  newTickable.startRepeat = references[tickable.startRepeat._id];
                  references[tickable._id] = newTickable;
                  this.addTickable(newTickable);
                } else {
                  JellyScore.warn("StartAlternative can't find its StartRepeat bar");
                }
                break;
              case JellyScore.EndRepeat:
                if (references[tickable.startRepeat._id] != null) {
                  tickable._id = JellyScore.getId();
                  newTickable = new tickable.constructor(tickable);
                  newTickable.startRepeat = references[tickable.startRepeat._id];
                  references[tickable._id] = newTickable;
                  this.addTickable(newTickable);
                } else {
                  JellyScore.warn("EndRepeat can't find its StartRepeat bar");
                }
                break;
              case JellyScore.EndAlternative:
                if ((references[tickable.startRepeat._id] != null) && (references[tickable.startAlternative._id] != null) && (references[tickable.endRepeat._id] != null)) {
                  newTickable = new tickable.constructor(tickable);
                  newTickable.startRepeat = references[tickable.startRepeat._id];
                  startAlternative = references[tickable.startAlternative._id];
                  newTickable.startAlternative = startAlternative;
                  endRepeat = references[tickable.endRepeat._id];
                  newTickable.endRepeat = endRepeat;
                  endRepeat.addAlternative(startAlternative);
                  endRepeat.addEndAlternative(newTickable);
                  this.addTickable(newTickable);
                } else {
                  JellyScore.warn("EndAlternative can't find its StartRepeat, startAlternative or EndREpeat bar");
                }
            }
          } else if (tickable.noteTieFrom != null) {
            newTickable = new tickable.constructor(tickable);
            tickable._id = JellyScore.getId();
            references[tickable._id] = newTickable;
            if (references[tickable.noteTieFrom._id] != null) {
              references[tickable.noteTieFrom._id].tieTo(newTickable);
              tickable.noteTieFrom = references[tickable.noteTieFrom._id];
            }
            this.addTickable(newTickable);
          } else if (tickable.noteTieTo != null) {
            newTickable = new tickable.constructor(tickable);
            tickable._id = JellyScore.getId();
            references[tickable._id] = newTickable;
            this.addTickable(newTickable);
          } else if (tickable.whoAmI() === JellyScore.Chord || tickable.whoAmI() === JellyScore.Note) {
            this.addTickable(tickable);
          } else {
            this.addTickable(new tickable.constructor(tickable));
          }
        }
      }
    }

    Voice.prototype.setParent = function(parent) {
      this.parent = parent;
    };

    Voice.prototype.whoAmI = function() {
      return this.constructor;
    };

    Voice.prototype.isEmpty = function() {
      return this.tickables.length === 0;
    };

    Voice.prototype.addTickable = function(tickable) {
      tickable.setParent(this);
      return this.tickables.push(tickable);
    };

    Voice.prototype.addTickableBefore = function(tickable) {
      tickable.setParent(this);
      return this.tickables.splice(this.tickables.length - 1, 0, tickable);
    };

    Voice.prototype.addTickableAt = function(tickable, index, tick) {
      var ticks;
      this.tickables.splice(++index, 0, tickable);
      tickable.setParent(this);
      if (this.tickablesDict != null) {
        ticks = this.tickablesDict[tick];
        if (!(ticks != null)) {
          ticks = this.tickablesDict[tick] = [];
        }
        return ticks.push(tickable);
      }
    };

    Voice.prototype.mapTickables = function(resolution) {
      return this.tickablesDict = this.getTickablesForTarget(this.whoAmI(), resolution);
    };

    Voice.prototype.getTickablesForTarget = function(target, resolution) {
      var t, tickable, tickables, _i, _len, _ref;
      tickables = {};
      t = 0;
      _ref = this.tickables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        if (tickable.getTarget() === target) {
          if (!(tickables[t] != null)) {
            tickables[t] = [];
          }
          tickables[t].push(tickable);
        }
        t += tickable.getTicks(resolution);
      }
      return tickables;
    };

    Voice.prototype.getResolution = function() {
      var res, resolution, tickable, _i, _len, _ref;
      resolution = 1;
      _ref = this.tickables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        res = tickable.getMinResolution();
        if (res > resolution) {
          if (res % resolution !== 0) {
            resolution = (res * resolution) / JellyScore.gcd(res, resolution);
          } else {
            resolution = res;
          }
        } else if (res < resolution && res > 0) {
          if (resolution % res !== 0) {
            resolution = (res * resolution) / JellyScore.gcd(res, resolution);
          }
        }
      }
      return resolution;
    };

    Voice.prototype.getLocalResolution = function(t1, t2, resolution) {
      var firstTick, res, tickable, tickables, _i, _len;
      if (resolution == null) {
        resolution = 1;
      }
      firstTick = t1;
      while (t1 <= t2) {
        tickables = this.tickablesDict[t1++];
        if (tickables != null) {
          for (_i = 0, _len = tickables.length; _i < _len; _i++) {
            tickable = tickables[_i];
            res = tickable.getMinResolution();
            if (res > resolution) {
              if (res % resolution !== 0) {
                resolution = (res * resolution) / JellyScore.gcd(res, resolution);
              } else {
                resolution = res;
              }
            } else if (res < resolution && res > 0) {
              if (resolution % res !== 0) {
                resolution = (res * resolution) / JellyScore.gcd(res, resolution);
              }
            }
          }
        }
      }
      return resolution;
    };

    Voice.prototype.getLength = function(resolution) {
      var tickable, _i, _len, _ref;
      this.length = 0;
      _ref = this.tickables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        this.length += tickable.getTicks(resolution);
      }
      return this.length;
    };

    Voice.prototype.getWidth = function(tick, resolution, options) {
      var tickable, tickables, w, _i, _len;
      w = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          w = Math.max(w, tickable.getWidth(options));
        }
      }
      return w;
    };

    Voice.prototype.getLeftPadding = function(tick, resolution, options) {
      var tickable, tickables, w, _i, _len;
      w = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          w = Math.max(w, tickable.getLeftPadding(options));
        }
      }
      return w;
    };

    Voice.prototype.getRightPadding = function(tick, resolution, options) {
      var tickable, tickables, w, _i, _len;
      w = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          w = Math.max(w, tickable.getRightPadding(options));
        }
      }
      return w;
    };

    Voice.prototype.getTopPadding = function(tick, resolution, options) {
      var tChord, tSection, tickable, tickables, _i, _len;
      tChord = 0;
      tSection = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if (tickable.whoAmI() === JellyScore.FretDiagram) {
            tChord = 30 * options.scale;
          } else if (tickable.whoAmI() === JellyScore.Section) {
            tSection = 30 * options.scale;
          }
        }
      }
      return tChord + tSection;
    };

    Voice.prototype.getTabTopPadding = function(tick, resolution, options) {
      var note, t, tbend, tickable, tickables, tpm, _i, _j, _len, _len1, _ref;
      t = 0;
      tpm = 0;
      tbend = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if (tickable.whoAmI() === JellyScore.TabChord) {
            _ref = tickable.notes;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              note = _ref[_j];
              if (note.bendPitchArr != null) {
                tbend = 15.5 * options.scale;
              }
              if (note.palmMute || note.letRing || tickable.vibrato) {
                tpm = 20 * options.scale;
              }
            }
          } else if (tickable.whoAmI() === JellyScore.TabNote) {
            if (tickable.bendPitchArr != null) {
              tbend = 15.5 * options.scale;
            }
            if (tickable.palmMute || tickable.letRing || tickable.vibrato) {
              tpm = 20 * options.scale;
            }
          }
        }
      }
      t += tbend + tpm;
      return t;
    };

    Voice.prototype.getBottomPadding = function(tick, resolution, options) {
      var b, tickable, tickables, _i, _len;
      b = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          if (tickable.constructor === JellyScore.Lyrics) {
            b = Math.max(b, tickable.getBottomPadding(options));
          }
        }
      }
      return b;
    };

    Voice.prototype.getMinY = function(tick, resolution, options) {
      var minY, tickable, tickables, _i, _len;
      minY = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          minY = Math.min(minY, tickable.getMinY(options));
        }
      }
      return minY;
    };

    Voice.prototype.getMaxY = function(tick, resolution, options) {
      var maxY, tickable, tickables, _i, _len;
      maxY = 0;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          maxY = Math.max(maxY, tickable.getMaxY(options));
        }
      }
      return maxY;
    };

    Voice.prototype.prepareBar = function(bar, resolution) {
      var autoStem, b, currentBase, l, lastNote, localT, maxTicks, stemDirection, t, tick, tickables, ticks, _i, _len, _ref, _results;
      lastNote = null;
      currentBase = 0;
      l = 0;
      ticks = 0;
      maxTicks = resolution >> 2;
      autoStem = true;
      stemDirection = null;
      _ref = bar.ticks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        tickables = this.tickablesDict[t];
        if (tickables != null) {
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = tickables.length; _j < _len1; _j++) {
              tick = tickables[_j];
              if (tick.prepareTick != null) {
                tick.prepareTick();
              }
              if (tick.getTicks(resolution) > 0) {
                if ((tick.beamTo != null) && tick.autoBeam === true && (tick.autoStem === true || autoStem || (tick.stemDirection === stemDirection))) {
                  if (!tick.autoStem) {
                    autoStem = false;
                    stemDirection = tick.stemDirection;
                  }
                  b = tick.getDuration().getBase();
                  if (b >= 8) {
                    localT = t - bar.firstTick;
                    t = tick.getDuration().getTicks(resolution);
                    if ((lastNote != null) || (localT % (resolution / 4)) === 0) {
                      if (ticks + t <= maxTicks && l < 8) {
                        ticks += t;
                        ++l;
                        tick.beamFrom(lastNote);
                      } else {
                        tick.beamFrom(null);
                        ticks = t;
                        l = 1;
                        autoStem = tick.autoStem;
                        stemDirection = tick.stemDirection;
                      }
                      _results1.push(lastNote = tick);
                    } else {
                      _results1.push(lastNote = null);
                    }
                  } else {
                    _results1.push(lastNote = null);
                  }
                } else {
                  lastNote = null;
                  l = 0;
                  ticks = 0;
                  _results1.push(autoStem = true);
                }
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          })());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Voice.prototype.removeTick = function(tick, tickable) {
      var i, tickables;
      i = this.tickables.indexOf(tickable);
      if (i >= 0) {
        console.log("removeTick", tickable, tick);
        this.tickables.splice(i, 1);
        tickables = this.tickablesDict[tick];
        i = this.tickables.indexOf(tickable);
        if (i >= 0) {
          tickables.splice(i, 1);
        }
        return true;
      }
      return false;
    };

    Voice.prototype.changeTickableDuration = function(tickable, newTickDuration, tick, resolution, bar) {
      var d, i, myDurations, newNote, t, _i, _j, _len, _len1, _ref, _ref1;
      myDurations = JellyScore.Duration.tickDurationToDuration(resolution, newTickDuration);
      tickable.setDuration(myDurations[0]);
      tick += tickable.getTicks(resolution);
      if (myDurations.length > 1) {
        _ref = myDurations.slice(1);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          d = _ref[_i];
          if (tickable.constructor === JellyScore.Rest || tickable.constructor === JellyScore.InvisibleRest) {
            newNote = new tickable.constructor(d);
          } else {
            if (tickable.constructor === JellyScore.TabNote || tickable.constructor === JellyScore.TabTie) {
              newNote = new JellyScore.TabTie(tickable.note, tickable);
            } else {
              newNote = new JellyScore.Tie(tickable.note, tickable);
            }
            newNote.setMidiNote(tickable.getValue());
            newNote.setDuration(d);
            newNote.setStringNbr(tickable.stringNbr + 1);
          }
          this.addTickableAt(newNote, this.tickables.indexOf(tickable), tick);
          console.log("addTickableAt", tick);
          if (__indexOf.call(bar.ticks, tick) < 0) {
            console.log("was not tick there!");
            i = 0;
            _ref1 = bar.ticks;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              t = _ref1[_j];
              if (t > tick) {
                bar.ticks.splice(i, 0, tick);
                break;
              }
              ++i;
            }
          }
          tick += newNote.getTicks(resolution);
          tickable = newNote;
        }
      }
      return tickable;
    };

    Voice.prototype.completeBar = function(bar, resolution) {
      var currentBarDuration, myDuration, newTickDuration, restTickable, tick, tickDuration, tickable, tickableIndex, tickables, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
      console.log("completeBar", bar);
      currentBarDuration = 0;
      tickable = null;
      _ref = bar.ticks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tick = _ref[_i];
        console.log("tick", tick);
        tickables = this.tickablesDict[tick];
        if (!(tickables != null)) {
          continue;
        }
        for (_j = 0, _len1 = tickables.length; _j < _len1; _j++) {
          tickable = tickables[_j];
          tickDuration = tickable.getTicks(resolution);
          console.log(tickable, tickDuration, resolution);
          if (tickDuration > 0) {
            if (currentBarDuration >= bar.duration) {
              this.removeTick(tick, tickable);
              continue;
            }
            console.log(currentBarDuration, currentBarDuration >= bar.duration);
            if (currentBarDuration + tickDuration > bar.duration) {
              newTickDuration = bar.duration - currentBarDuration;
              console.log("newTickDuration", newTickDuration);
              if (newTickDuration <= 0) {
                this.removeTick(tick, tickable);
                continue;
              }
              this.changeTickableDuration(tickable, newTickDuration, tick, resolution);
              tickDuration = newTickDuration;
            }
            currentBarDuration += tickDuration;
          }
        }
      }
      if (currentBarDuration < bar.duration) {
        tick = bar.firstTick + currentBarDuration;
        _ref1 = JellyScore.Duration.tickDurationToDuration(resolution, bar.duration - currentBarDuration);
        _results = [];
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          myDuration = _ref1[_k];
          restTickable = new JellyScore.Rest(new JellyScore.Duration(myDuration.base));
          tickableIndex = this.tickables.indexOf(tickable);
          this.addTickableAt(restTickable, tickableIndex, tick);
          tick += restTickable.getTicks(resolution);
          _results.push((function() {
            var _results1;
            _results1 = [];
            while (myDuration.dots-- > 0) {
              myDuration.base = myDuration.base << 1;
              restTickable = new JellyScore.Rest(new JellyScore.Duration(myDuration.base));
              this.addTickableAt(restTickable, ++tickableIndex, tick);
              _results1.push(tick += restTickable.getTicks(resolution));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }
    };

    Voice.prototype.getSelectableAtTick = function(tick, bar, resolution) {
      var actualTickable, d, durations, i, newNote, rest, t, tickable, tickableIndex, tickablesList, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
      tickablesList = this.tickablesDict[tick];
      if (tickablesList != null) {
        for (_i = 0, _len = tickablesList.length; _i < _len; _i++) {
          tickable = tickablesList[_i];
          if (tickable.isSelectable() === true) {
            return tickable;
          }
        }
      } else {
        t = tick;
        while (--t >= 0) {
          tickablesList = this.tickablesDict[t];
          if (tickablesList != null) {
            console.log("yes");
            actualTickable = null;
            for (_j = 0, _len1 = tickablesList.length; _j < _len1; _j++) {
              tickable = tickablesList[_j];
              if (tickable.isSelectable() === true) {
                actualTickable = tickable;
                break;
              }
            }
            if (actualTickable != null) {
              console.log("yes again");
              rest = (actualTickable.getTicks(resolution)) - (tick - t);
              console.log("rest", rest);
              actualTickable = this.changeTickableDuration(actualTickable, tick - t, t, resolution, bar);
              durations = JellyScore.Duration.tickDurationToDuration(resolution, rest);
              newNote = new JellyScore.Rest(durations[0]);
              tickableIndex = this.tickables.indexOf(actualTickable);
              this.addTickableAt(newNote, tickableIndex, tick);
              console.log("addTickableAt", tick, newNote);
              if (__indexOf.call(bar.ticks, tick) < 0) {
                i = 0;
                _ref = bar.ticks;
                for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                  t = _ref[_k];
                  if (t > tick) {
                    console.log("addTickounet");
                    bar.ticks.splice(i, 0, tick);
                    break;
                  }
                  ++i;
                }
              }
              actualTickable = newNote;
              if (durations.length > 1) {
                tick += newNote.getTicks(resolution);
                _ref1 = durations.slice(1);
                for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
                  d = _ref1[_l];
                  console.log("rest d", d);
                  newNote = new JellyScore.Rest(d);
                  this.addTickableAt(newNote, ++tickableIndex, tick);
                  console.log("addTickableAt", tick, newNote);
                  if (__indexOf.call(bar.ticks, tick) < 0) {
                    i = 0;
                    _ref2 = bar.ticks;
                    for (_m = 0, _len4 = _ref2.length; _m < _len4; _m++) {
                      t = _ref2[_m];
                      if (t > tick) {
                        bar.ticks.splice(i, 0, tick);
                        break;
                      }
                      ++i;
                    }
                  }
                  tick += newNote.getTicks(resolution);
                }
              }
              console.log("okay!");
              return actualTickable;
            }
          }
        }
        return console.log("COUCOU");
      }
    };

    Voice.prototype.drawAt = function(ctx, tick, resolution, pos, options) {
      var tickable, tickables, _i, _len, _results;
      tickables = this.tickablesDict[tick];
      if (tickables != null) {
        _results = [];
        for (_i = 0, _len = tickables.length; _i < _len; _i++) {
          tickable = tickables[_i];
          _results.push(tickable.drawAt(ctx, pos, options));
        }
        return _results;
      }
    };

    Voice.prototype.getNextTickable = function(tick) {
      while (++tick < this.length && !(this.tickablesDict[tick] != null)) {
        true;
      }
      return tick;
    };

    Voice.prototype.hasTickOn = function(tick) {
      return this.tickablesDict[tick] != null;
    };

    Voice.prototype.getTicksAt = function(tick) {
      return this.tickablesDict[tick];
    };

    Voice.prototype.getTicks = function(resolution) {
      var t, tickable, _i, _len, _ref;
      t = 0;
      this.ticks = {};
      _ref = this.tickables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        this.ticks[t] = true;
        t += tickable.getTicks(resolution);
      }
      return this.ticks;
    };

    Voice.prototype.setCapo = function(capo) {
      var tickable, _i, _len, _ref, _results;
      _ref = this.tickables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        if (tickable.setCapo != null) {
          _results.push(tickable.setCapo(capo));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Voice.prototype.getAllNotes = function(notes) {
      var note, tickable, _i, _j, _len, _len1, _ref, _ref1;
      if (notes == null) {
        notes = {};
      }
      _ref = this.tickables;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        if (tickable.isPlayable()) {
          notes[tickable.getValue()] = true;
        } else if (tickable.whoAmI() === JellyScore.Chord || tickable.whoAmI() === JellyScore.TabChord) {
          _ref1 = tickable.notes;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            note = _ref1[_j];
            if (note.isPlayable()) {
              notes[note.getValue()] = true;
            }
          }
        }
      }
      return notes;
    };

    Voice.prototype.convertToTab = function() {
      var tickable, _i, _len, _ref, _results;
      _ref = this.tickables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tickable = _ref[_i];
        if (tickable.whoAmI() !== JellyScore.Chord && tickable.whoAmI() !== JellyScore.Note && (tickable.convertToTab != null)) {
          _results.push(tickable.convertToTab());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Voice;

  })();

  JellyScore.Voice = Voice;

}).call(this);

(function() {
  var Bass, Bass8, BassP8, Clef, Percussion, Tab, Treble, Treble8, TrebleP8,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Clef = (function() {

    function Clef() {
      this.drawingFunction = JS.Drawings.drawTrebleClef;
    }

    Clef.prototype.getWidth = function(options) {
      return 15 * options.scale;
    };

    Clef.prototype.getLeftPadding = function(options) {
      return 8 * options.scale;
    };

    Clef.prototype.getRightPadding = function(options) {
      return 8 * options.scale;
    };

    Clef.prototype.getMinY = function() {
      return 0;
    };

    Clef.prototype.getMaxY = function(options) {
      return 50 * options.scale;
    };

    Clef.prototype.getHeight = function(options) {
      return 200 * options.scale / 6.8;
    };

    Clef.prototype.drawAt = function(ctx, pos, options) {
      return this.drawingFunction(ctx, {
        x: options.paddingLeft + pos.x,
        y: pos.y
      }, options);
    };

    Clef.prototype.whoAmI = function() {
      return this.constructor;
    };

    Clef.prototype.getPosition = function() {
      throw "getPosition has not been implemented for " + this.constructor;
    };

    Clef.prototype.getSharpPosition = function() {
      throw "getSharpPosition has not been implemented for " + this.constructor;
    };

    Clef.prototype.getFlatPosition = function() {
      throw "getFlatPosition has not been implemented for " + this.constructor;
    };

    Clef.prototype.getStemDirection = function() {
      throw "getStemDirection has not been implemented for " + this.constructor;
    };

    Clef.prototype.getPitchFirstLine = function() {
      throw "getPitchFirstLined has not been implemented for " + this.constructor;
    };

    return Clef;

  })();

  Treble = (function(_super) {

    __extends(Treble, _super);

    function Treble() {
      this.lilyValue = "treble";
      this.drawingFunction = JS.Drawings.drawTrebleClef;
    }

    Treble.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (48 - note.getPitch()) * 3.67 * scale;
    };

    Treble.prototype.getSharpPosition = function(pitch, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (7.78 - (pitch + 2) % 7) * 3.67 * scale;
    };

    Treble.prototype.getFlatPosition = function(pitch, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (9.78 - (pitch + 4) % 7) * 3.67 * scale;
    };

    Treble.prototype.getStemDirection = function(pitch) {
      return pitch < 42;
    };

    Treble.prototype.getPitchFirstLine = function() {
      return 45;
    };

    return Treble;

  })(Clef);

  Treble8 = (function(_super) {

    __extends(Treble8, _super);

    function Treble8() {
      this.lilyValue = "treble_8";
      this.drawingFunction = JS.Drawings.drawTrebleClef;
    }

    Treble8.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (41 - note.getPitch()) * 3.67 * scale;
    };

    Treble8.prototype.getStemDirection = function(pitch) {
      return pitch < 35;
    };

    Treble8.prototype.getPitchFirstLine = function() {
      return 38;
    };

    return Treble8;

  })(Treble);

  TrebleP8 = (function(_super) {

    __extends(TrebleP8, _super);

    function TrebleP8() {
      this.lilyValue = "treble^8";
      this.drawingFunction = JS.Drawings.drawTrebleClef;
    }

    TrebleP8.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (55 - note.getPitch()) * 3.67 * scale;
    };

    TrebleP8.prototype.getStemDirection = function(pitch) {
      return pitch < 49;
    };

    TrebleP8.prototype.getPitchFirstLine = function() {
      return 52;
    };

    return TrebleP8;

  })(Treble);

  Bass = (function(_super) {

    __extends(Bass, _super);

    function Bass() {
      this.lilyValue = "bass";
      this.drawingFunction = JS.Drawings.drawBassClef;
    }

    Bass.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (36 - note.getPitch()) * 3.67 * scale;
    };

    Bass.prototype.getSharpPosition = function(pitch, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (9.78 - (pitch + 2) % 7) * 3.67 * scale;
    };

    Bass.prototype.getFlatPosition = function(pitch, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (11.78 - (pitch + 4) % 7) * 3.67 * scale;
    };

    Bass.prototype.getStemDirection = function(pitch) {
      return pitch < 30;
    };

    Bass.prototype.getPitchFirstLine = function() {
      return 33;
    };

    return Bass;

  })(Clef);

  Bass8 = (function(_super) {

    __extends(Bass8, _super);

    function Bass8() {
      this.lilyValue = "bass_8";
      this.drawingFunction = JS.Drawings.drawBassClef;
    }

    Bass8.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (29 - note.getPitch()) * 3.67 * scale;
    };

    Bass8.prototype.getStemDirection = function(pitch) {
      return pitch < 23;
    };

    return Bass8;

  })(Bass);

  BassP8 = (function(_super) {

    __extends(BassP8, _super);

    function BassP8() {
      this.lilyValue = "bass^8";
      this.drawingFunction = JS.Drawings.drawBassClef;
    }

    BassP8.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (43 - note.getPitch()) * 3.67 * scale;
    };

    BassP8.prototype.getStemDirection = function(pitch) {
      return pitch < 37;
    };

    return BassP8;

  })(Bass);

  Tab = (function(_super) {

    __extends(Tab, _super);

    function Tab() {
      this.lilyValue = "tab";
      this.drawingFunction = JS.Drawings.drawTabClef;
    }

    Tab.prototype.getHeight = function(options) {
      var _ref;
      return 80 * (((_ref = options.lines) != null ? _ref : 6) - 1) * options.scale / 6.8;
    };

    Tab.prototype.drawAt = function(ctx, pos, options) {
      var _ref;
      return this.drawingFunction(ctx, {
        x: options.paddingLeft + pos.x,
        y: pos.y + 40 * (((_ref = options.lines) != null ? _ref : 6) - 4) * options.scale / 6.8
      }, options);
    };

    return Tab;

  })(Clef);

  Percussion = (function(_super) {

    __extends(Percussion, _super);

    function Percussion() {
      this.lilyValue = "percussion";
      this.drawingFunction = JS.Drawings.drawPercussionsClef;
    }

    Percussion.prototype.getPosition = function(note, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (48 - note.getPitch()) * 3.67 * scale;
    };

    Percussion.prototype.getSharpPosition = function(pitch, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (7.78 - (pitch + 2) % 7) * 3.67 * scale;
    };

    Percussion.prototype.getFlatPosition = function(pitch, scale) {
      if (scale == null) {
        scale = 1.0;
      }
      return (9.78 - (pitch + 4) % 7) * 3.67 * scale;
    };

    Percussion.prototype.getStemDirection = function(pitch) {
      return pitch < 42;
    };

    return Percussion;

  })(Clef);

  JellyScore.Clefs = {
    Treble: Treble,
    Treble8: Treble8,
    TrebleP8: TrebleP8,
    Bass: Bass,
    Bass8: Bass8,
    BassP8: BassP8,
    Tab: Tab,
    Percussion: Percussion
  };

}).call(this);

(function() {

  JellyScore.Beam = (function() {

    function Beam(lastNote) {
      this.lastNote = lastNote;
      this.notes = [];
      while (lastNote != null) {
        this.notes.push(lastNote);
        this.firstNote = lastNote;
        lastNote = lastNote.noteBeamFrom;
      }
      this.notes.reverse();
      this.init();
    }

    Beam.prototype.init = function() {
      return this.getExtrema();
    };

    Beam.prototype.getExtrema = function() {
      var count, note, p, pitch, _i, _len, _ref;
      this.min = null;
      this.max = null;
      this.minNote = null;
      this.maxNote = null;
      this.autoStem = true;
      this.stemDirection = null;
      pitch = 0;
      count = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        if (!note.autoStem) {
          if (!this.autoStem) {
            if (note.stemDirection !== this.stemDirection) {
              JellyScore.error("This should never happen (different stem direction in beam).");
            }
          }
          this.stemDirection = note.stemDirection;
          this.autoStem = false;
        }
        p = note.pos;
        if (p.yMin != null) {
          if (this.min === null || p.yMin < this.min) {
            this.min = p.yMin;
            this.minNote = note;
          }
        } else if (this.min === null || p.y < this.min) {
          this.min = p.y;
          this.minNote = note;
        }
        if (p.yMax != null) {
          if (this.max === null || p.yMax > this.max) {
            this.max = p.yMax;
            this.maxNote = note;
          }
        } else if (this.max === null || p.y > this.max) {
          this.max = p.y;
          this.maxNote = note;
        }
        pitch += note.getPitch();
        ++count;
      }
      if (this.autoStem) {
        return this.averagePitch = pitch / count;
      }
    };

    Beam.prototype.getAngle = function() {
      var note, oldP, p, sumX, sumY, _i, _len, _ref;
      sumX = 0;
      sumY = 0;
      oldP = null;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        p = note.pos;
        if (this.stemDirection) {
          if (p.yMin != null) {
            p.realY = p.yMin;
          } else {
            p.realY = p.y;
          }
        } else {
          if (p.yMax != null) {
            p.realY = p.yMax;
          } else {
            p.realY = p.y;
          }
          p.realY = p.y;
        }
        if (oldP != null) {
          sumX += p.x - oldP.x;
          sumY += p.realY - oldP.realY;
        }
        oldP = p;
      }
      if (sumX > 0) {
        this.angle = sumY / sumX;
        if (Math.abs(this.angle) < 0.025) {
          return this.angle = 0;
        } else if (this.angle > 0.5) {
          return this.angle = 0.5;
        } else if (this.angle < -0.5) {
          return this.angle = -0.5;
        }
      }
    };

    Beam.prototype.draw = function(ctx, options) {
      if (this.autoStem) {
        this.stemDirection = options.clef.getStemDirection(this.averagePitch);
      }
      this.getAngle();
      this.drawStems(ctx, options);
      return this.drawBeam(ctx, options);
    };

    Beam.prototype.drawBeam = function(ctx, options, firstNote, lastNote) {
      var p1, p2;
      if (firstNote == null) {
        firstNote = this.firstNote;
      }
      if (lastNote == null) {
        lastNote = this.lastNote;
      }
      p1 = firstNote.pos;
      p2 = lastNote.pos;
      if (this.stemDirection) {
        p1 = {
          x: p1.x,
          y: this.getY(p1.x)
        };
        p2 = {
          x: p2.x,
          y: this.getY(p2.x)
        };
        return JS.Drawings.drawTopBeam(ctx, p1, p2, options);
      } else {
        p1 = {
          x: p1.x,
          y: this.getY(p1.x)
        };
        p2 = {
          x: p2.x,
          y: this.getY(p2.x)
        };
        return JS.Drawings.drawBottomBeam(ctx, p1, p2, options);
      }
    };

    Beam.prototype.drawLeftBeam = function(ctx, options, firstNote, lastNote) {
      var p1, p2;
      p1 = firstNote.pos;
      p2 = lastNote.pos;
      p1 = {
        x: p1.x,
        y: this.getY(p1.x)
      };
      p2 = {
        x: p1.x + (p2.x - p1.x) / 3
      };
      p2.y = this.getY(p2.x);
      if (this.stemDirection) {
        return JS.Drawings.drawTopBeam(ctx, p1, p2, options);
      } else {
        return JS.Drawings.drawBottomBeam(ctx, p1, p2, options);
      }
    };

    Beam.prototype.drawRightBeam = function(ctx, options, firstNote, lastNote) {
      var p1, p2;
      p1 = firstNote.pos;
      p2 = lastNote.pos;
      p1 = {
        x: p2.x - (p2.x - p1.x) / 3
      };
      p1.y = this.getY(p1.x);
      p2 = {
        x: p2.x,
        y: this.getY(p2.x)
      };
      if (this.stemDirection) {
        return JS.Drawings.drawTopBeam(ctx, p1, p2, options);
      } else {
        return JS.Drawings.drawBottomBeam(ctx, p1, p2, options);
      }
    };

    Beam.prototype.getY = function(x) {
      if (this.stemDirection) {
        if (x === this.minNote.pos.x || !(this.angle != null) && this.angle === 0) {
          return this.min;
        } else if (x < this.minNote.pos.x) {
          return this.min - this.angle * (this.minNote.pos.x - x);
        } else {
          return this.min + (x - this.minNote.pos.x) * this.angle;
        }
      } else {
        if (x === this.maxNote.pos.x || !(this.angle != null) && this.angle === 0) {
          return this.max;
        } else if (x < this.maxNote.pos.x) {
          return this.max - this.angle * (this.maxNote.pos.x - x);
        } else {
          return this.max + (x - this.maxNote.pos.x) * this.angle;
        }
      }
    };

    Beam.prototype.drawStems = function(ctx, options) {
      var firstNote, note, pos, prevNote, _i, _len, _ref;
      prevNote = null;
      firstNote = null;
      options = $.extend({}, options);
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        pos = note.pos;
        if (this.stemDirection) {
          if (note.pos.yMax != null) {
            pos = {
              x: pos.x,
              y: pos.yMax
            };
          }
          options.height = (pos.y - this.getY(pos.x)) / options.scale;
          JS.Drawings.drawRightStem(ctx, pos, options);
        } else {
          if (note.pos.yMin != null) {
            pos = {
              x: pos.x,
              y: pos.yMin
            };
          }
          options.height = ((this.getY(pos.x)) - pos.y) / options.scale;
          JS.Drawings.drawLeftStem(ctx, pos, options);
        }
        if (firstNote != null) {
          if (firstNote.getDuration().getBase() !== note.getDuration().getBase()) {
            if (firstNote !== prevNote) {
              if (firstNote.getDuration().getBase() > 8) {
                options.gap = 5;
                this.drawBeam(ctx, options, firstNote, prevNote);
                if (firstNote.getDuration().getBase() > 16) {
                  options.gap = 10;
                  this.drawBeam(ctx, options, firstNote, prevNote);
                }
              }
              firstNote = prevNote;
            } else if (note !== this.lastNote) {
              if (firstNote.getDuration().getBase() > 8) {
                options.gap = 5;
                this.drawBeam(ctx, options, firstNote, note);
                if (firstNote.getDuration().getBase() > 16) {
                  options.gap = 10;
                  this.drawBeam(ctx, options, firstNote, note);
                }
              }
              firstNote = note;
            } else {
              options.gap = 5;
              if (firstNote.getDuration().getBase() > note.getDuration().getBase()) {
                if (firstNote.getDuration().getBase() > 8) {
                  if (note.getDuration().getBase() > 8) {
                    this.drawBeam(ctx, options, firstNote, note);
                  } else {
                    this.drawLeftBeam(ctx, options, firstNote, note);
                  }
                  if (firstNote.getDuration().getBase() > 16) {
                    options.gap = 10;
                    if (note.getDuration().getBase() > 16) {
                      this.drawBeam(ctx, options, firstNote, note);
                    } else {
                      this.drawLeftBeam(ctx, options, firstNote, note);
                    }
                  }
                }
              } else {
                if (note.getDuration().getBase() > 8) {
                  if (firstNote.getDuration().getBase() > 8) {
                    this.drawBeam(ctx, options, firstNote, note);
                  } else {
                    this.drawRightBeam(ctx, options, firstNote, note);
                  }
                  if (note.getDuration().getBase() > 16) {
                    options.gap = 10;
                    if (firstNote.getDuration().getBase() > 16) {
                      this.drawBeam(ctx, options, firstNote, note);
                    } else {
                      this.drawRightBeam(ctx, options, firstNote, note);
                    }
                  }
                }
              }
              firstNote = null;
            }
          }
        } else {
          firstNote = note;
        }
        prevNote = note;
      }
      if (firstNote !== prevNote && (firstNote != null) && (prevNote != null) && prevNote.getDuration().getBase() > 8) {
        options.gap = 5;
        this.drawBeam(ctx, options, firstNote, prevNote);
        if (firstNote.getDuration().getBase() > 16) {
          options.gap = 10;
          return this.drawBeam(ctx, options, firstNote, prevNote);
        }
      }
    };

    return Beam;

  })();

}).call(this);

(function() {
  var ChordsDict;

  ChordsDict = (function() {

    function ChordsDict() {
      this.set_chords_dic();
      this.inverse_chords_dic();
    }

    ChordsDict.prototype.get_all_finger_pos = function(chord) {
      chord = chord.split("♯").join("#");
      chord = chord.split("♭").join("b");
      if (chord.length === 0) {
        return;
      }
      return this.chords[chord].slice(0, 15);
    };

    ChordsDict.prototype.get_first_finger_pos = function(chord) {
      var chordTab;
      if (chord.length === 0) {
        return;
      }
      chordTab = this.get_all_finger_pos(chord);
      if (chordTab != null) {
        return chordTab[0];
      } else {
        return null;
      }
    };

    ChordsDict.prototype.test2 = function() {
      var chord, demitondown, fret, fretNbr, i, noteArr, posStr, standardtuning, tondown, _i, _len, _ref;
      chord = "A#";
      chord = "Am";
      chord = "Adim";
      chord = "Caug";
      chord = "Csus2";
      chord = "Csus4";
      chord = "B7";
      chord = "Dmaj7";
      chord = "Fm7";
      chord = "G#dim7";
      chord = "E6";
      chord = "Bm6";
      chord = "F9";
      chord = "Emaj9";
      chord = "Bm9";
      chord = "C11";
      chord = "G11";
      chord = "A2";
      standardtuning = [64, 59, 55, 50, 45, 40];
      demitondown = [63, 58, 54, 49, 44, 39];
      tondown = [62, 57, 53, 48, 43, 38];
      posStr = this.get_first_finger_pos(chord);
      noteArr = [];
      i = 0;
      _ref = posStr.split("-")[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fret = _ref[_i];
        fretNbr = parseInt(this.letterToInt(fret));
        if ((fretNbr != null) && !isNaN(fretNbr)) {
          noteArr.push(this.getNoteFromFret(i, fretNbr, standardtuning));
        }
        i++;
      }
      return chord = this.getChordFromNotes(noteArr);
    };

    ChordsDict.prototype.test = function() {
      var ValidArr, chord, failArr, fret, fretNbr, i, noteArr, posStr, res, standardtuning, undefinedArr, _i, _len, _ref, _results;
      ValidArr = {};
      failArr = {};
      undefinedArr = {};
      standardtuning = [64, 59, 55, 50, 45, 40];
      _results = [];
      for (chord in this.chords) {
        noteArr = [];
        posStr = this.get_first_finger_pos(chord);
        i = 0;
        _ref = posStr.split("-")[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          fret = _ref[_i];
          fretNbr = parseInt(this.letterToInt(fret));
          if ((fretNbr != null) && !isNaN(fretNbr)) {
            noteArr.push(this.getNoteFromFret(i, fretNbr, standardtuning));
          }
          i++;
        }
        res = this.getChordFromNotes(noteArr);
        if (!(res != null)) {
          if (!(undefinedArr[chord] != null)) {
            undefinedArr[chord] = [];
          }
          _results.push(undefinedArr[chord].push(chord));
        } else {
          if (chord === res) {
            if (!(ValidArr[chord] != null)) {
              ValidArr[chord] = [];
            }
            _results.push(ValidArr[chord].push(res));
          } else {
            if (!(failArr[chord] != null)) {
              failArr[chord] = [];
            }
            _results.push(failArr[chord].push(res));
          }
        }
      }
      return _results;
    };

    ChordsDict.prototype.getNoteFromFret = function(string, fret, tuning) {
      var i, note;
      note = tuning[tuning.length - 1 - string];
      i = 0;
      while (i < fret) {
        note++;
        i++;
      }
      return note;
    };

    ChordsDict.prototype.getStrNote = function(noteNbr) {
      var chordName;
      chordName = "";
      switch (noteNbr) {
        case 0:
          chordName = "C";
          break;
        case 1:
          chordName = "C#";
          break;
        case 2:
          chordName = "D";
          break;
        case 3:
          chordName = "D#";
          break;
        case 4:
          chordName = "E";
          break;
        case 5:
          chordName = "F";
          break;
        case 6:
          chordName = "F#";
          break;
        case 7:
          chordName = "G";
          break;
        case 8:
          chordName = "G#";
          break;
        case 9:
          chordName = "A";
          break;
        case 10:
          chordName = "A#";
          break;
        case 11:
          chordName = "B";
      }
      return chordName;
    };

    ChordsDict.prototype.getChordFromNotes = function(notesWithOctavesArr) {
      var i, index, note, notesArr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n;
      notesArr = [];
      for (_i = 0, _len = notesWithOctavesArr.length; _i < _len; _i++) {
        note = notesWithOctavesArr[_i];
        index = notesArr.indexOf(note % 12);
        if (index === -1) {
          notesArr.push(note % 12);
        }
      }
      if (notesArr.length === 7) {
        for (_j = 0, _len1 = notesArr.length; _j < _len1; _j++) {
          i = notesArr[_j];
          if (this.isMajorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i) && this.isInChord(notesArr, (i + 20) % 12)) {
            return this.getStrNote(i) + "13.11";
          }
          if (this.isMajorChord(notesArr, i) && this.is7MajorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i) && this.isInChord(notesArr, (i + 20) % 12)) {
            return this.getStrNote(i) + "maj13.11";
          } else if (this.isMinorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i) && this.isInChord(notesArr, (i + 20) % 12)) {
            return this.getStrNote(i) + "m13.11";
          }
        }
      } else if (notesArr.length === 6) {
        for (_k = 0, _len2 = notesArr.length; _k < _len2; _k++) {
          i = notesArr[_k];
          if (this.isMajorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "11";
          }
          if (this.isMajorChord(notesArr, i) && this.is7MajorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "maj11";
          } else if (this.isMinorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "m11";
          } else if (this.isMinorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.isInChord(notesArr, (i + 20) % 12)) {
            return this.getStrNote(i) + "13";
          }
        }
      } else if (notesArr.length === 5) {
        for (_l = 0, _len3 = notesArr.length; _l < _len3; _l++) {
          i = notesArr[_l];
          if (this.isMajorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "9";
          }
          if (this.isMajorChord(notesArr, i) && this.is7MajorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "maj9";
          } else if (this.isMinorChord(notesArr, i) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "m9";
          } else if (this.isInChord(notesArr, i) && this.isInChord(notesArr, (note + 7) % 12) && this.is7MinorDominant(notesArr, i) && this.is9MajorDominant(notesArr, i) && this.is11MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "11";
          }
        }
      } else if (notesArr.length === 4) {
        for (_m = 0, _len4 = notesArr.length; _m < _len4; _m++) {
          i = notesArr[_m];
          if (this.isMajorChord(notesArr, i) && this.is7MinorDominant(notesArr, i)) {
            return this.getStrNote(i) + "7";
          }
          if (this.isMajorChord(notesArr, i) && this.is7MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "maj7";
          } else if (this.isMinorChord(notesArr, i) && this.is7MinorDominant(notesArr, i)) {
            return this.getStrNote(i) + "m7";
          } else if (this.isDimChord(notesArr, i) && this.isInChord(notesArr, (note + 9) % 12)) {
            return this.getStrNote(i) + "dim7";
          } else if (this.isAugChord(notesArr, i) && this.is7MinorDominant(notesArr, i)) {
            return this.getStrNote(i) + "aug7";
          } else if (this.isDimChord(notesArr, i) && this.is7MinorDominant(notesArr, i)) {
            return this.getStrNote(i) + "m7.5-";
          } else if (this.isMinorChord(notesArr, i) && this.is7MajorDominant(notesArr, i)) {
            return this.getStrNote(i) + "maj7.5-";
          } else if (this.isMajorChord(notesArr, i) && this.isInChord(notesArr, (i + 9) % 12)) {
            return this.getStrNote(i) + "6";
          } else if (this.isMinorChord(notesArr, i) && this.isInChord(notesArr, (i + 9) % 12)) {
            return this.getStrNote(i) + "m6";
          }
        }
      } else if (notesArr.length === 3) {
        for (_n = 0, _len5 = notesArr.length; _n < _len5; _n++) {
          i = notesArr[_n];
          if (this.isMajorChord(notesArr, i)) {
            return this.getStrNote(i);
          } else if (this.isMinorChord(notesArr, i)) {
            return this.getStrNote(i) + "m";
          } else if (this.isDimChord(notesArr, i)) {
            return this.getStrNote(i) + "dim";
          } else if (this.isAugChord(notesArr, i)) {
            return this.getStrNote(i) + "aug";
          } else if (this.isSus2Chord(notesArr, i)) {
            return this.getStrNote(i) + "sus2";
          } else if (this.isSus4Chord(notesArr, i)) {
            return this.getStrNote(i) + "sus4";
          }
        }
      }
    };

    ChordsDict.prototype.isInChord = function(notesArr, note) {
      if ((notesArr.indexOf(note)) !== -1) {
        return true;
      }
      return false;
    };

    ChordsDict.prototype.isMinorChord = function(notesArr, note) {
      return this.isInChord(notesArr, note) && this.isInChord(notesArr, (note + 3) % 12) && this.isInChord(notesArr, (note + 7) % 12);
    };

    ChordsDict.prototype.isMajorChord = function(notesArr, note) {
      return this.isInChord(notesArr, note) && this.isInChord(notesArr, (note + 4) % 12) && this.isInChord(notesArr, (note + 7) % 12);
    };

    ChordsDict.prototype.isDimChord = function(notesArr, note) {
      return this.isInChord(notesArr, note) && this.isInChord(notesArr, (note + 3) % 12) && this.isInChord(notesArr, (note + 6) % 12);
    };

    ChordsDict.prototype.isAugChord = function(notesArr, note) {
      return this.isInChord(notesArr, note) && this.isInChord(notesArr, (note + 4) % 12) && this.isInChord(notesArr, (note + 8) % 12);
    };

    ChordsDict.prototype.isSus2Chord = function(notesArr, note) {
      return this.isInChord(notesArr, note) && this.isInChord(notesArr, (note + 2) % 12) && this.isInChord(notesArr, (note + 7) % 12);
    };

    ChordsDict.prototype.isSus4Chord = function(notesArr, note) {
      return this.isInChord(notesArr, note) && this.isInChord(notesArr, (note + 5) % 12) && this.isInChord(notesArr, (note + 7) % 12);
    };

    ChordsDict.prototype.is7MinorDominant = function(notesArr, note) {
      if (this.isInChord(notesArr, (note + 10) % 12)) {
        return true;
      }
      return false;
    };

    ChordsDict.prototype.is7MajorDominant = function(notesArr, note) {
      if (this.isInChord(notesArr, (note + 11) % 12)) {
        return true;
      }
      return false;
    };

    ChordsDict.prototype.is9MajorDominant = function(notesArr, note) {
      if (this.isInChord(notesArr, (note + 14) % 12)) {
        return true;
      }
      return false;
    };

    ChordsDict.prototype.is11MajorDominant = function(notesArr, note) {
      if (this.isInChord(notesArr, (note + 17) % 12)) {
        return true;
      }
      return false;
    };

    ChordsDict.prototype.letterToInt = function(letter) {
      if (letter === "x") {
        return "x";
      }
      if (parseInt(letter) < 10) {
        return parseInt(letter);
      } else {
        return 10 + (letter.charCodeAt(0) - 97);
      }
    };

    ChordsDict.prototype.isValidChord = function(chord) {
      var resultChord;
      resultChord = this.get_first_finger_pos(chord);
      if (!(resultChord != null) || resultChord.length === 0) {
        return false;
      }
      return true;
    };

    ChordsDict.prototype.inverse_chords_dic = function() {
      var chordFret, chordInfo, chordInfoArr, chordInfoStr, chordOtherInfoStr, chordVariation, i, key, _results;
      this.inverseChords = {};
      _results = [];
      for (key in this.chords) {
        _results.push((function() {
          var _i, _j, _len, _len1, _ref, _results1;
          _ref = this.chords[key];
          _results1 = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            chordVariation = _ref[_i];
            chordInfoArr = chordVariation.split("-");
            chordFret = chordInfoArr[0];
            chordOtherInfoStr = "";
            i = 0;
            for (_j = 0, _len1 = chordInfoArr.length; _j < _len1; _j++) {
              chordInfo = chordInfoArr[_j];
              if (i !== 0) {
                chordOtherInfoStr += "-" + chordInfo;
              }
              i++;
            }
            if (!(this.inverseChords[chordFret] != null)) {
              this.inverseChords[chordFret] = [];
            }
            chordInfoStr = key + chordOtherInfoStr;
            _results1.push(this.inverseChords[chordFret].push(chordInfoStr));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ChordsDict.prototype.set_chords_dic = function() {
      return this.chords = {
        "A": ["x02220-x01230", "577655-134211-600000", "542225-321114-003000", "xceeec-x13331-053000", "xcb9a9-x43121-000300", "xx79a9-xx1343-000300", "xx2225-xx1114-003000", "54222x-43111x-003000", "002220", "14x251", "x47xx5"],
        "A#": ["xx0331-xx0341", "688766-134211-600000", "653336-321114-003000", "x13331-x13331-053000", "xdcaba-x43121-000300", "xx8aba-xx1343-000300", "xx3336-xx1114-003000", "65333x-43111x-003000", "113331"],
        "A#+": ["xx0332-xx0231", "xx8776-xx4231", "65433x-43211x-000200", "xdcbbe-x32114-000200"],
        "A#7": ["x02120"],
        "A#dim": ["x12320-x12430", "6786xx-1342xx", "xx89b9-xx1243"],
        "A#dim7": ["x12020-x12030", "xx2323-xx1324", "3423xx-2413xx", "x45353-x23141-000300", "xx5656-xx1324", "6756xx-2413xx", "x78686-x23141-000300", "xx8989-xx1324", "9a89xx-2413xx", "xab9b9-x23141-000300", "xxbcbc-xx1324", "xdbcbc-x41213-003000", "cdbcxx-2413xx"],
        "A#m": ["x13321-x13421-050000", "688666-134111-600000", "xx8ab9-xx1342"],
        "A#m7": ["x1312x-x1312x-030000", "686666-131111-600000", "68x696-13x141-600000", "xx8a99-xx1423"],
        "A#m7b5": ["x12120-x13240", "xx6656-xx2314", "676696-121141-600000", "xx8999-xx1333-000300", "xdbdbc-x31412-003000"],
        "A+": ["x03221-x04231", "xx7665-xx4231", "54322x-43211x-000200", "xcbaad-x32114-000200"],
        "A+5": ["x03221-x04231", "xx7665-xx4231", "xcbaax-x3211x-000200"],
        "A/Ab": ["40222x-30111x-003000", "x02120"],
        "A/B": ["002420", "x57655"],
        "A/C#": ["x4222x-x3111x-003000"],
        "A/D": ["x00220", "xx0220", "xx4655", "xx89a9"],
        "A/E": ["002220-001230"],
        "A/F": ["102220-102340"],
        "A/F#": ["202220-001230"],
        "A/G": ["30222x-20111x-003000", "3x2220", "x02020", "x02223"],
        "A11": ["x00000", "x25433-x03211-000020", "xx7787-xx1121-004000"],
        "A13": ["x15422-x04311-000020", "x45677-x01234", "xcbcce-x21334-000200"],
        "A2": ["x02420-x01420", "xx7657-xx3214", "xc99a9-x41121-004000", "xc99c9-x31141-004000", "xcb9c9-x32141-000300", "002420", "x57655"],
        "A3": ["xxx22x-xxx11x-000200", "54xxxx-21xxxx", "xx76xx-xx21xx", "xcbxxx-x21xxx"],
        "A5": ["x022xx-x012xx", "577xxx-134xxx", "xx79ax-xx134x", "577xx5", "x022x0", "577xx4"],
        "A6": ["x02222-x01111-004000", "x04xxx-x04xxx", "542222-431111-004000", "xx7675-xx3241", "xcbbax-x4231x", "xcbbec-x21143-002000", "002222", "0x4220", "2x2220", "x04220", "xx2222"],
        "A7": ["x02020-x01030", "x02223-x01112-003000", "575685-131241-600000", "542223-431112-003000", "xceeef-x13334-003000", "xcbcax-x3241x", "xx7989-xx1324", "5756x5-1312x1-600000", "xcbca9-x32410", "3x2220"],
        "A7+5": ["x03021-x03021", "5x5665-1x1231-600000", "xabaax-x1211x-040000"],
        "A7+9": ["x12523-x01412-003000", "575658-131214-500000", "xcbcdx-x2134x"],
        "A7sus4": ["x0203x-x0103x", "575755-131411-600000", "x6778a-x01124-002000", "x02030", "x02033", "x02233", "5x2232", "x000x0"],
        "A9": ["x02423-x01312-003000", "54545x-21314x-030000", "575657-131214-500000", "xx7687-xx2132-004000", "xcbccx-x2134x"],
        "Aadd9": ["x02420-x01420", "xx7657-xx3214", "xx79a7-xx1341-004000", "xc99a9-x41121-004000", "xc99c9-x31141-004000", "xc99ac-x31124-002000", "xcb9c9-x32141-000300", "xc99cc-x21134-002000", "xceecc-x13411-050000", "002420", "x57655"],
        "Aaug": ["x03221-x04231", "54322x-43211x-000200", "5432xx-4321xx", "xx7665-xx4231", "x8766x-x3211x-000200", "9876xx-4321xx", "xxbaa9-xx4231", "xcbaax-x3211x-000200", "dcbaxx-4321xx", "x0x221"],
        "Ab": ["466544-134211-600000", "431114-321114-003000", "xbdddb-x13331-053000", "xba898-x43121-000300", "xx6898-xx1343-000300", "xx1114-xx1114-003000", "xbdddx-x1234x"],
        "Ab+5": ["43211x-43211x-000200", "xx6554-xx4231", "xba99x-x3211x-000200"],
        "Ab11": ["4x4322-3x4211-000020", "xx6676-xx1121-004000", "xbbbbb-x11111-050000"],
        "Ab13": ["4x4311-4x3211-000020", "4x4566-1x1234-300000", "xbabbd-x21334-000200"],
        "Ab2": ["43131x-42131x-003000", "xx6546-xx3214", "xb8898-x41121-004000", "xb88b8-x31141-004000", "xba8b8-x32141-000300"],
        "Ab3": ["xxx11x-xxx11x-000200", "43xxxx-21xxxx", "xx65xx-xx21xx", "xbaxxx-x21xxx"],
        "Ab5": ["466xxx-134xxx", "xx689x-xx134x", "xbddxx-x134xx", "466xx4"],
        "Ab6": ["431111-431111-004000", "4x6564-1x3241-600000", "xbaa9x-x4231x", "x8a898", "xx1111"],
        "Ab7": ["464574-131241-600000", "431112-431112-003000", "xbddde-x13334-003000", "xbab9x-x3241x", "xx6878-xx1324", "xx1112-xx1112-003000", "4645x4-1312x1-600000", "xbdbdb-x13141-050000", "xx4544"],
        "Ab7+5": ["032112-042113-000200", "4x4554-1x1231-600000", "x9a99x-x1211x-040000", "xbebdc-x14132-030000"],
        "Ab7sus4": ["xx1122-xx1123-002000", "464644-131411-600000", "xx6879-xx1324"],
        "Ab9": ["4x431x-3x421x", "43434x-21314x-030000", "464546-131214-500000", "xx6576-xx2143", "xbabbx-x2134x"],
        "Abadd9": ["43131x-42131x-003000", "xx6546-xx3214", "xx6896-xx1341-004000", "xb8898-x41121-004000", "xb88b8-x31141-004000", "xb889b-x31124-002000", "xba8b8-x32141-000300", "xb88bb-x21134-002000", "xbddbb-x13411-050000"],
        "Abaug": ["032110-043120", "43211x-43211x-000200", "3x6554-0x4231", "47655x-03211x-000200", "8765xx-4321xx", "7xa998-0x4231", "8ba99x-03211x-000200", "cba9xx-4321xx", "xxxddc-xxx231", "x32110"],
        "Abdim": ["x20134-x20134", "4564xx-1342xx", "xx6797-xx1243", "xbcdcx-x1243x"],
        "Abdim7": ["xx0101-xx0102", "1201xx-2403xx", "x2313x-x2314x", "xx3434-xx1324", "4534xx-2413xx", "x56464-x23141-000300", "xx6767-xx1324", "7867xx-2413xx", "x89797-x23141-000300", "xx9a9a-xx1324", "xb9a9a-x41213-003000", "ab9axx-2413xx", "xbcaca-x23141-000300", "x20101"],
        "Abm": ["xx1444-xx1444-000300", "466444-134111-600000", "xx6897-xx1342", "xbddcb-x13421-050000", "xx6444"],
        "Abm6": ["xx1101-xx1203", "466464-123141-600000", "xb9a9b-x31214-003000"],
        "Abm7": ["465544-142311-600000", "xba88x-x4311x-000200", "xx6888-xx1333-000300", "464444-131111-600000", "46x474-13x141-600000", "xx6877-xx1423", "xb9b9b-x21314-003000", "xbdbcx-x1312x-030000", "xx4444"],
        "Abm9": ["464446-131114-500000", "xx6476-xx2143", "xb9bbx-x2134x"],
        "Abmaj": ["466544-134211-600000", "431114-321114-003000", "xbdddb-x13331-053000", "xba898-x43121-000300", "xx6898-xx1343-000300"],
        "Abmaj7": ["465544-142311-600000", "xba88x-x4311x-000200", "xx6888-xx1333-000300", "46554x-14231x-500000", "xx6543-xx4321", "xba888-x43111-000300"],
        "Abmaj9": ["411313-411213-040000", "43534x-21413x-030000", "xbacbx-x2143x"],
        "Absus": ["466644-133311-630000", "xbddeb-x13341-052000", "xxb89b-xx3124", "xx6899-xx1344-000020", "xx6644"],
        "Absus2": ["4111xx-4111xx-030000", "xx6896-xx1341-004000", "xb889b-x31124-002000", "xb88bb-x21134-002000", "xbddbb-x13411-050000"],
        "Absus4": ["466644-133311-630000", "xbddeb-x13341-052000", "xxb89b-xx3124", "xx6899-xx1344-000020", "xx1124-xx1124-002000", "4x6644-1x3411-600000", "xbb89x-x3412x", "xx6644"],
        "Adim": ["x0121x-x0132x", "5675xx-1342xx", "xx78a8-xx1243", "xcdedx-x1243x"],
        "Adim7": ["x01212-x01324", "2312xx-2413xx", "x3424x-x2314x", "xx4545-xx1324", "5645xx-2413xx", "x67575-x23141-000300", "xx7878-xx1324", "8978xx-2413xx", "x9a8a8-x23141-000300", "xxabab-xx1324", "xcabab-x41213-003000", "bcabxx-2413xx", "xcdbdb-x23141-000300", "xx1212"],
        "Am": ["x02210-x02310", "577555-134111-600000", "xceedc-x13421-050000", "xca9ax-x4312x", "xx79a8-xx1342", "x12555-x01444-000300", "x679a8-x01342", "x47555", "x32210"],
        "Am/B": ["x22210-x23410", "447544", "x32200"],
        "Am/C": ["x32210-x42310"],
        "Am/D": ["xx0210", "xx4555"],
        "Am/E": ["002210-002310"],
        "Am/F": ["003210", "133210", "1x2210", "xx2211", "xx3210"],
        "Am/G": ["002013", "x02010", "x02213", "x45558"],
        "Am3": ["xxx21x-xxx21x", "53xxxx-31xxxx", "xx75xx-xx31xx", "xcaxxx-x31xxx"],
        "Am6": ["x02212-x02314", "577575-123141-600000", "xx7978-xx1312-003000", "xcabac-x31214-003000", "xx2212"],
        "Am7": ["x02010-x02010", "x02120-x02130", "575585-131141-600000", "x02224-x01113-003000", "xcecdf-x13124-030000", "576655-142311-600000", "xcacac-x21314-003000", "xx7988-xx1322-000020", "xcb99x-x4311x-000200", "xx7999-xx1333-000300", "x0201x-x0201x", "x0221x-x0231x", "575555-131111-600000", "57x585-13x141-600000", "x67988-x01423", "002013", "x02213", "x45558"],
        "Am7b5": ["x0101x-x0102x", "x01213-x01214-003000", "xx5545-xx2314", "565585-121141-600000", "xx7888-xx1333-000300", "xcacab-x31412-003000"],
        "Am9": ["532111-421000", "x02413-x02413", "575557-131114-500000", "xx7587-xx2143", "xcaccx-x2134x"],
        "Amaj": ["x02220-x01230", "x02220-x01120-002000", "577655-134211-600000", "542225-321114-003000", "xceeec-x13331-053000", "xcb9a9-x43121-000300", "xx79a9-xx1343-000300", "002220", "14x251", "x47xx5"],
        "Amaj7": ["x02120-x02130", "x02224-x01113-003000", "576655-142311-600000", "xcb99x-x4311x-000200", "xx7999-xx1333-000300", "x37654-x04321", "xcb999-x43111-000300"],
        "Amaj7b5": ["x01124-x01124-002000", "x01224-x01224-000200", "xx7644-xx4311-000020", "5x664x-2x341x", "xx7899-xx1234"],
        "Amaj9": ["x02424-x01314-003000", "54645x-21413x-030000", "xc9999-x41111-004000", "xcbdcx-x2143x"],
        "Ami": ["x02210-x02310", "577555-134111-600000", "xceedc-x13421-050000", "xca9ax-x4312x", "xx79a8-xx1342"],
        "Ami7": ["x02010-x02010", "575585-131141-600000", "xcecdf-x13124-030000", "xcacac-x21314-003000", "xx7988-xx1322-000020"],
        "Asus": ["x02230-x01240", "577755-133311-630000", "xceefc-x13341-052000", "xxc9ac-xx3124", "xx79aa-xx1344-000020", "002230", "5577x4", "x00230"],
        "Asus2": ["x02200-x02300", "5222xx-4111xx-030000", "xx79a7-xx1341-004000", "xc99ac-x31124-002000", "xc99cc-x21134-002000", "xceecc-x13411-050000", "002200", "002400", "022200", "xx2200"],
        "Asus2/G": ["3x2200", "x02000", "x35453"],
        "Asus4": ["x02230-x01240", "577755-133311-630000", "xceefc-x13341-052000", "xxc9ac-xx3124", "xx79aa-xx1344-000020", "x12235-x01124-002000", "5x7755-1x3411-600000", "x679aa-x01234", "xcc9ax-x3412x", "002230", "5577x4", "x00230"],
        "Asus4/F": ["xx7765"],
        "Asus4/G": ["x02030", "x02033", "x02233", "x000x0"],
        "B": ["x24442-x13331-053000", "x21x02-x21x03", "799877-134211-600000", "764447-321114-003000", "xedbcb-x43121-000300", "xx9bcb-xx1343-000300", "x2444x-x1333x-003000", "xx4447-xx1114-003000", "76444x-43111x-003000"],
        "B+": ["x21003-x21004", "xx9887-xx4231", "76544x-43211x-000200", "xedccf-x32114-000200"],
        "B+5": ["x21003-x21004", "76544x-43211x-000200", "xx9887-xx4231"],
        "B/A": ["2x1202", "x01202", "x21202", "x24242"],
        "B/E": ["x22442", "xx4440"],
        "B11": ["x22222-x11111-050000", "7x7655-3x4211-000020", "xx99a9-xx1121-004000"],
        "B13": ["x21224-x21334-000200", "7x7644-4x3211-000020", "7x7899-1x1234-300000"],
        "B2": ["xx9879-xx3214", "xebbcb-x41121-004000", "xebbeb-x31141-004000", "xedbeb-x32141-000300"],
        "B3": ["x21xxx-x21xxx", "xxx44x-xxx11x-000200", "76xxxx-21xxxx", "xx98xx-xx21xx"],
        "B5": ["x244xx-x134xx", "799xxx-134xxx", "xx9bcx-xx134x", "x244x2"],
        "B6": ["x21102-x31204", "x24444-x13333-004000", "764444-431111-004000", "7x9897-1x3241-600000", "xx9b9b-xx1314-003000", "xx4444"],
        "B7": ["x21202-x21304", "7978a7-131241-600000", "764445-431112-003000", "x24445-x13334-003000", "xedecx-x3241x", "xx9bab-xx1324", "x24242-x13141-050000", "xx4445-xx1112-003000", "7978x7-1312x1-600000", "2x1202", "x01202"],
        "B7+5": ["x21203-x21304", "x25243-x14132-030000", "7x7887-1x1231-600000", "7a78xx-1412xx-300000", "xx9cab-xx1423"],
        "B7+9": ["x2123x-x2134x", "7677xx-2134xx", "79787a-131214-500000", "xx98aa-xx2134"],
        "B7sus4": ["x22200-x12300", "x22202-x12304", "x24252-x13141-050000", "797977-131411-600000", "xx9bac-xx1324", "x04400"],
        "B9": ["x2122x-x2134x", "76767x-21314x-030000", "797879-131214-500000", "xx98a9-xx2143"],
        "Badd9": ["7444xx-4111xx-030000", "xx9879-xx3214", "xx9bc9-xx1341-004000", "xebbcb-x41121-004000", "xebbeb-x31141-004000", "xebbce-x31124-002000", "xedbeb-x32141-000300", "xebbee-x21134-002000"],
        "Baug": ["32100x-43200x", "x21003-x21004", "x2544x-x1423x", "xx5443-xx4231", "76544x-43211x-000200", "7654xx-4321xx", "xx9887-xx4231", "xa988x-x3211x-000200", "ba98xx-4321xx", "xxdccb-xx4231", "321003", "3x1003"],
        "Bb": ["xx0331-xx0341", "688766-134211-600000", "653336-321114-003000", "x13331-x13331-053000", "xdcaba-x43121-000300", "xx8aba-xx1343-000300", "xx3336-xx1114-003000", "65333x-43111x-003000", "113331"],
        "Bb#7": ["113231"],
        "Bb+": ["xx0332-xx0231", "xx8776-xx4231", "65433x-43211x-000200", "xdcbbe-x32114-000200"],
        "Bb+5": ["65433x-43211x-000200", "xx8776-xx4231", "xdcbbx-x3211x-000200"],
        "Bb/A": ["113231"],
        "Bb/G": ["353333", "xx3333"],
        "Bb11": ["x11111-x11111-050000", "6x6544-3x4211-000020", "xx8898-xx1121-004000"],
        "Bb13": ["x10113-x10234", "6x6533-4x3211-000020", "6x6788-1x1234-300000"],
        "Bb2": ["633336-311114-040000", "xx8768-xx3214", "xdaaba-x41121-004000", "xdaada-x31141-004000", "xdcada-x32141-000300"],
        "Bb3": ["x10xxx-x20xxx", "xxx33x-xxx11x-000200", "65xxxx-21xxxx", "xx87xx-xx21xx"],
        "Bb5": ["x133xx-x134xx", "688xxx-134xxx", "xx8abx-xx134x", "688xx6"],
        "Bb6": ["x13333-x13333-004000", "6x8786-1x3241-600000", "xx8a8a-xx1314-003000", "353333", "xx3333"],
        "Bb7": ["686796-131241-600000", "653334-431112-003000", "x13334-x13334-003000", "xdcdbx-x3242x", "xx8a9a-xx1324", "x13131-x13141-050000", "xx3334-xx1112-003000", "6867x6-1312x1-600000"],
        "Bb7+5": ["x14132-x14132-030000", "6x6776-1x1231-600000", "xbcbbx-x1211x-040000"],
        "Bb7+9": ["x10121-x10243", "65666x-21333x-003000", "686769-131214-500000"],
        "Bb7sus4": ["x13141-x13141-050000", "686866-131411-600000", "xx8a9b-xx1324"],
        "Bb9": ["x1011x-x1023x", "65656x-21314x-030000", "686768-131214-500000", "xx8798-xx2143"],
        "Bbadd#11": ["x13330"],
        "Bbadd9": ["6333xx-4111xx-030000", "xx8768-xx3214", "xx8ab8-xx1341-004000", "xdaaba-x41121-004000", "xdaada-x31141-004000", "xdaabd-x31124-002000", "xdcada-x32141-000300", "xdaadd-x21134-002000"],
        "Bbaug": ["x10332-x10342", "xxx332-xxx231", "6543xx-4321xx", "xx8776-xx4231", "x9877x-x3211x-000200", "a987xx-4321xx", "xxcbba-xx4231", "xdcbbx-x3211x-000200", "edcbxx-4321xx", "xx0332"],
        "Bbdim": ["x12320-x12430", "6786xx-1342xx", "xx89b9-xx1243"],
        "Bbdim7": ["x12020-x12030", "xx2323-xx1324", "3423xx-2413xx", "x45353-x23141-000300", "xx5656-xx1324", "6756xx-2413xx", "x78686-x23141-000300", "xx8989-xx1324", "9a89xx-2413xx", "xab9b9-x23141-000300", "xxbcbc-xx1324", "xdbcbc-x41213-003000", "cdbcxx-2413xx"],
        "Bbm": ["688666-134111-600000", "x13321-x13421-050000", "xdbabx-x4312x", "xx8ab9-xx1342", "113321"],
        "Bbm/Ab": ["x13121"],
        "Bbm6": ["x13023-x13024", "688686-123141-600000", "xx8a89-xx1312-003000"],
        "Bbm7": ["686696-131141-600000", "x23335-x01113-003000", "687766-142311-600000", "x13124-x13124-030000", "xdbdbd-x21314-003000", "xdcaax-x4311x-000200", "xx8a99-xx1322-000020", "xx8aaa-xx1333-000300", "x1312x-x1312x-030000", "686666-131111-600000", "68x696-13x141-600000", "x13121"],
        "Bbm7b5": ["x12120-x13240", "xx6656-xx2314", "676696-121141-600000", "xx8999-xx1333-000300", "xdbdbc-x31412-003000"],
        "Bbm9": ["6465xx-3142xx", "686668-131114-500000", "xdbddx-x2134x"],
        "Bbmaj": ["xx0331-xx0341", "688766-134211-600000", "653336-321114-003000", "x13331-x13331-053000", "xdcaba-x43121-000300", "xx8aba-xx1343-000300", "113331"],
        "Bbmaj7": ["x23335-x01113-003000", "687766-142311-600000", "xdcaax-x4311x-000200", "xx8aaa-xx1333-000300", "x13231-x13241-050000", "68776x-14231x-500000", "xx8765-xx4321", "xdcaaa-x43111-000300", "113231"],
        "Bbmaj7b5": ["x1223x-x1223x-002000", "657755-213411-050000", "xx8755-xx4311-000020", "xx89aa-xx1234"],
        "Bbmaj9": ["x10211-x10423", "657565-214131-050000", "65756x-21413x-030000", "x33335"],
        "Bbmi7": ["686696-131141-600000", "x13124-x13124-030000", "xdbdbd-x21314-003000", "xx8a99-xx1322-000020"],
        "Bbsus": ["688866-133311-630000", "x13341-x13341-052000", "xxdabd-xx3124", "xx8abb-xx1344-000020"],
        "Bbsus2": ["x13311-x13411-050000", "6333xx-4111xx-030000", "xx8ab8-xx1341-004000", "xdaabd-x31124-002000", "xdaadd-x21134-002000", "xx3311"],
        "Bbsus4": ["688866-133311-630000", "x13341-x13341-052000", "xxdabd-xx3124", "xx8abb-xx1344-000020", "xx3346-xx1124-002000", "6x8866-1x3411-600000", "xddabx-x3412x"],
        "Bdim": ["x20431-x20431", "x2343x-x1243x", "7897xx-1342xx", "xx9aca-xx1243"],
        "Bdim7": ["x20101-x30102", "xx0101-xx0102", "x23131-x23141-000300", "xx3434-xx1324", "4534xx-2413xx", "x56464-x23141-000300", "xx6767-xx1324", "7867xx-2413xx", "x89797-x23141-000300", "xx9a9a-xx1324", "ab9axx-2413xx", "xbcaca-x23141-000300"],
        "Bm": ["xx0432-xx0321", "799777-134111-600000", "x24432-x13421-050000", "xecbcx-x4312x", "xx9bca-xx1342", "224432"],
        "Bm/A": ["x04432", "x20202", "x20232", "x24232", "xx0202"],
        "Bm3": ["x20xxx-x10xxx", "xxx43x-xxx21x", "75xxxx-31xxxx", "xx97xx-xx31xx"],
        "Bm6": ["x20102-x20103", "x20132-x20143", "x2x434-x1x324", "799797-123141-600000", "xx9b9a-xx1312-003000"],
        "Bm7": ["x20202-x10203", "x21302-x21403", "7977a7-131141-600000", "798877-142311-600000", "x24235-x13124-030000", "xecece-x21314-003000", "xedbbx-x4311x-000200", "xx9baa-xx1322-000020", "xx9bbb-xx1333-000300", "x2423x-x1312x-030000", "797777-131111-600000", "79x7a7-13x141-600000", "x04432", "x20232", "x24232", "xx0202"],
        "Bm7b5": ["x20201-x20301", "x2323x-x1324x", "xx7767-xx2314", "7877a7-121141-600000", "xx9aaa-xx1333-000300"],
        "Bm9": ["x20222-x10234", "7576xx-3142xx", "797779-131114-500000", "xx97a9-xx2143"],
        "Bmaj": ["x21x02-x21x03", "799877-134211-600000", "764447-321114-003000", "x24442-x13331-053000", "xedbcb-x43121-000300", "xx9bcb-xx1343-000300"],
        "Bmaj7": ["x21302-x21403", "798877-142311-600000", "xedbbx-x4311x-000200", "xx9bbb-xx1333-000300", "x24342-x13241-050000", "xx4446-xx1113-003000", "79887x-14231x-500000", "xx9876-xx4321"],
        "Bmaj7b5": ["x2334x-x1223x-002000", "768866-213411-050000", "xx9866-xx4311-000020", "xx9abb-xx1234"],
        "Bmaj9": ["x2132x-x2143x", "768676-214131-050000", "7686xx-2131xx-030000", "xx98b9-xx2143"],
        "Bmi": ["xx0432-xx0321", "799777-134111-600000", "x24432-x13421-050000", "xecbcx-x4312x", "xx9bca-xx1342"],
        "Bmi7": ["x20202-x10203", "7977a7-131141-600000", "x24235-x13124-030000", "xecece-x21314-003000", "xx9baa-xx1322-000020"],
        "Bsus": ["x24400-x13400", "799977-133311-630000", "x24452-x13341-052000", "xxebce-xx3124", "xx9bcc-xx1344-000020", "799xx6", "x244x0"],
        "Bsus2": ["x24422-x13411-050000", "7444xx-4111xx-030000", "xx9bc9-xx1341-004000", "xebbce-x31124-002000", "xebbee-x21134-002000", "x444x2", "xx4422"],
        "Bsus4": ["x24400-x13400", "799977-133311-630000", "x24452-x13341-052000", "xxebce-xx3124", "xx9bcc-xx1344-000020", "xx4457-xx1124-002000", "7x9977-1x3411-600000", "xeebcx-x3412x", "799xx6", "x244x0"],
        "C": ["x32010-x32010", "8aa988-134211-600000", "875558-321114-003000", "x35553-x13331-053000", "xfecdc-x43121-000300", "xxacdc-xx1343-000300", "xx5558-xx1114-003000", "87555x-43111x-003000", "032010", "235553", "332010", "3x2010", "x35552"],
        "C#": ["x43121-x43121-000300", "x46664-x12341-050000", "xx6669-xx1114-003000", "98666x-43111x-003000", "986669-321114-003000", "9bba99-134211-600000", "xxbded-xx1243"],
        "C#+5": ["x4322x-x3211x-000200", "98766x-43211x-000200", "xxbaa9-xx4231"],
        "C#11": ["x44444-x11111-050000", "9x9877-3x4211-000020", "xxbbcb-xx1121-004000"],
        "C#13": ["x43446-x21334-000200", "9x9866-3x4211-000020", "9x9abb-1x1234-300000"],
        "C#2": ["x41121-x41121-004000", "x41141-x31141-004000", "x43141-x32141-000300", "xxba9b-xx3214"],
        "C#3": ["x43xxx-x21xxx", "xxx66x-xxx11x-000200", "98xxxx-21xxxx", "xxbaxx-xx21xx"],
        "C#5": ["x466xx-x134xx", "9bbxxx-134xxx", "xxbdex-xx134x"],
        "C#6": ["x4332x-x4231x", "x46666-x13333-004000", "986666-431111-004000", "xxbab9-xx3241", "xxbdbd-xx1314-003000"],
        "C#7": ["x4342x-x3241x", "x46464-x13141-050000", "xx6667-xx1112-003000", "986667-431112-003000", "9b9ax9-1312x1-600000", "xxbdcd-xx1324", "032000", "x22010", "x35453"],
        "C#7+5": ["x43201-x43201", "x2322x-x1211x-040000", "xx3425-xx2314", "x47465-x14132-030000", "9x9aa9-1x1231-600000", "9c9axx-1412xx-300000", "xxbecd-xx1423"],
        "C#7+9": ["x43100-x43100", "x4345x-x2134x", "98999x-21344x-000200", "9b9a9c-131214-500000", "xxbacc-xx2134"],
        "C#7sus4": ["x44422-x23411-000020", "xx4424-xx2314", "x46474-x13141-050000", "xx6677-xx1122-002020", "9b9b99-131411-600000", "xxbdce-xx1324"],
        "C#9": ["x4344x-x2134x", "98989x-21314x-030000", "9b9a9b-131214-500000", "xxbacb-xx2143"],
        "C#add9": ["x41121-x41121-004000", "x41141-x31141-004000", "x43141-x32141-000300", "x46644-x13411-050000", "9666xx-4111xx-030000", "xxb89b-xx3124", "xxba9b-xx3214", "xxbdeb-xx1341-004000"],
        "C#aug": ["xx3221-xx4231", "x43225-x32115-000200", "5432xx-4321xx", "x4766x-x1423x", "xx7665-xx4231", "98766x-43211x-000200", "9876xx-4321xx", "xxbaa9-xx4231", "xcbaax-x3211x-000200", "dcbaxx-4321xx"],
        "C#dim": ["x42020-x41020", "xxx653-xxx431", "x4565x-x1243x", "xxb989-xx4213", "xxb98x-xx421x", "9ab9xx-1342xx", "xxbcec-xx1243"],
        "C#dim7": ["x1202x-x2304x", "x42323-x41213-003000", "xx2323-xx1324", "x45353-x23141-000300", "xx5656-xx1324", "6756xx-2413xx", "x78686-x23141-000300", "xx8989-xx1324", "9a89xx-2413xx", "xab9b9-x23141-000300", "xxbcbc-xx1324", "cdbcxx-2413xx"],
        "C#m": ["xx2120-xx2130", "9bb999-134111-600000", "x46654-x13421-050000", "x4212x-x4312x", "xxbdec-xx1342"],
        "C#m3": ["x42xxx-x31xxx", "xxx65x-xxx21x", "97xxxx-31xxxx", "xxb9xx-xx31xx"],
        "C#m6": ["x42324-x31214-003000", "x46x56-x13x24", "xx6656-xx2314", "9bb9b9-123141-600000", "xxbdbc-xx1312-003000"],
        "C#m7": ["x22120-x23130-003000", "9b99c9-131141-600000", "x46457-x13124-030000", "x42424-x21314-003000", "xxbdcc-xx1322-000020", "x42100-x42100", "x4645x-x1312x-030000", "9b9999-131111-600000", "9bx9c9-13x141-600000"],
        "C#m7b5": ["x42000-x31000", "xx2423-xx1312-003000", "x4545x-x1324x", "xx9989-xx2314", "9a99c9-121141-600000", "xxbccc-xx1222-000300"],
        "C#m9": ["x4244x-x2134x", "9798xx-3142xx", "9b999b-131114-500000", "xxb9cb-xx2143"],
        "C#maj7": ["x43111-x43111-000300", "x46564-x13241-050000", "xx6668-xx1113-003000", "xxba98-xx4321", "xxbddd-xx1333-000300"],
        "C#maj9": ["x41111-x41111-004000", "x4354x-x2143x", "98a898-214131-050000", "98a8xx-2131xx-030000", "xxbadb-xx2143"],
        "C#mi": ["xx2120-xx2130", "9bb999-134111-600000", "x46654-x13421-050000", "x4212x-x4312x", "xxbdec-xx1342"],
        "C#sus2": ["x41124-x31124-002000", "x41144-x21134-002000", "x46644-x13411-050000", "9666xx-4111xx-030000", "xxb89b-xx3124", "xxbdeb-xx1341-004000"],
        "C#sus4": ["x4412x-x3412x", "x44674-x11341-050000", "x46674-x12341-050000", "xx6679-xx1124-002000", "99bb99-113411-600000", "xxbdee-xx1344-000020"],
        "C+": ["x32110-x43120", "xxa998-xx4231", "87655x-43211x-000200", "x32114-x32114-000200"],
        "C+5": ["x3211x-x3211x-000200", "87655x-43211x-000200", "xxa998-xx4231"],
        "C/A": ["x02010-x02010", "002013", "x02213", "x45558"],
        "C/Ab": ["432010-432010"],
        "C/B": ["x22010-x23010", "x2555x-x1234x", "032000", "x35453"],
        "C/Bb": ["x12010-x13020", "6x555x-2x111x-003000", "x35353"],
        "C/C#": ["x42010-x42010", "x4555x-x1222x-003000"],
        "C/D": ["xx0010-xx0010", "x5555x-x1111x-040000", "3x0010", "x30010", "x32030", "x32033", "xx2553", "xaccd9", "x555x4"],
        "C/E": ["032010-032010", "x7555x-x3111x-003000"],
        "C/F": ["132010-032010", "x8555x-x4111x-003000", "x33010", "xx3010"],
        "C/F#": ["232010-032010"],
        "C/G": ["332010-342010", "335553-112341-600000"],
        "C11": ["x33333-x11111-050000", "8x8766-3x4211-000020"],
        "C13": ["x32335-x21334-000200", "8x8755-3x4211-000020", "8x89aa-1x1234-300000"],
        "C2": ["x30010-x30010", "x30030-x20030", "x3203x-x2103x", "xxa98a-xx3214", "3x0010", "x32033", "xx0010", "xx2553", "xaccd9", "x32030", "x555x4"],
        "C3": ["xxxx10-xxxx10", "x32xxx-x21xxx", "xxx55x-xxx11x-000200", "87xxxx-21xxxx", "xxa9xx-xx21xx"],
        "C5": ["x355xx-x134xx", "8aaxxx-134xxx", "xxacdx-xx134x", "x355x3"],
        "C6": ["x32210-x42310", "xx2213-xx2314", "x35555-x13333-004000", "875555-431111-004000", "xxa9a8-xx3241", "xxacac-xx1314-003000", "002013", "x02010", "x02213", "x45558"],
        "C7": ["x32310-x32410", "8a89b8-131241-600000", "875556-431112-003000", "x35556-x13334-003000", "xfefdx-x3241x", "xxacbc-xx1324", "x35353-x13141-050000", "xx5556-xx1112-003000", "8a89x8-1312x1-600000"],
        "C7+5": ["x1211x-x1211x-040000", "xx2314-xx2314", "x36354-x14132-030000", "8x8998-1x1231-600000", "8b89xx-1412xx-300000", "xxadbc-xx1423"],
        "C7+9": ["x32340-x21340", "8788xx-2134xx", "8a898b-131214-500000", "xxa9bb-xx2134"],
        "C7sus4": ["x33311-x23411-000020", "xx3313-xx2314", "x35363-x13141-050000", "xx5566-xx1122-002020", "8a8a88-131411-600000", "xxacbd-xx1324"],
        "C9": ["x3233x-x2134x", "87878x-21314x-030000", "8a898a-131214-500000", "xxa9ba-xx2143"],
        "C9sus4": ["xxaaba-xx1121-004000"],
        "Cadd9": ["x30010-x30010", "x30030-x20030", "x3203x-x2103x", "x35533-x13411-050000", "8555xx-4111xx-030000", "xxa78a-xx3124", "xxa98a-xx3214", "xxacda-xx1341-004000", "3x0010", "x32033", "xx0010", "xx2553", "xaccd9", "x32030", "x555x4"],
        "Caug": ["x32110-x43120", "x32114-x32114-000200", "4321xx-4321xx", "x3655x-x1423x", "xx6554-xx4231", "87655x-43211x-000200", "8765xx-4321xx", "xxa998-xx4231", "xba99x-x3211x-000200", "cba9xx-4321xx", "xxeddc-xx4231"],
        "Cdim": ["xxx542-xxx431", "x3454x-x1243x", "xxa878-xx4213", "xxa87x-xx421x", "89a8xx-1342xx", "xxabdb-xx1243"],
        "Cdim7": ["xx1212-xx1324", "x31212-x41213-003000", "x34242-x23141-000300", "xx4545-xx1324", "5645xx-2413xx", "x67575-x23141-000300", "xx7878-xx1324", "8978xx-2413xx", "x9a8a8-x23141-000300", "xxabab-xx1324", "bcabxx-2413xx", "xcdbdb-x23141-000300"],
        "Cm": ["x3101x-x3201x", "8aa888-134111-600000", "x35543-x13421-050000", "xfdcdx-x4312x", "xxacdb-xx1342", "xx5543"],
        "Cm/A": ["xx1213"],
        "Cm3": ["x31xxx-x31xxx", "xxx54x-xxx21x", "86xxxx-31xxxx", "xxa8xx-xx31xx"],
        "Cm6": ["x31213-x31214-003000", "x35x45-x13x24", "xx5545-xx2314", "8aa8a8-123141-600000", "xxacab-xx1312-003000", "xx1213"],
        "Cm7": ["x32000-x32000", "x1101x-x1203x", "8a88b8-131141-600000", "8a9988-142311-600000", "x35346-x13124-030000", "x31313-x21314-003000", "xfeccx-x4311x-000200", "xxacbb-xx1322-000020", "xxaccc-xx1333-000300", "x3534x-x1312x-030000", "8a8888-131111-600000", "8ax8b8-13x141-600000", "x35343"],
        "Cm7b5": ["x31312-x31412-003000", "x3434x-x1324x", "xx8878-xx2314", "8988b8-121141-600000", "xxabbb-xx1222-000300"],
        "Cm9": ["x3133x-x2134x", "8687xx-3142xx", "8a888a-131114-500000", "xxa8ba-xx2143"],
        "Cmaj": ["x32010-x32010", "8aa988-134211-600000", "875558-321114-003000", "x35553-x13331-053000", "xfecdc-x43121-000300", "xxacdc-xx1343-000300", "032010", "235553", "332010", "3x2010", "x35552"],
        "Cmaj7": ["x32000-x32000", "8a9988-142311-600000", "xfeccx-x4311x-000200", "xxaccc-xx1333-000300", "x35453-x13241-050000", "xx5557-xx1113-003000", "8a998x-14231x-500000", "xxa987-xx4321", "032000", "x22010"],
        "Cmaj7b5": ["x3445x-x1234x", "879977-213411-050000", "xxa977-xx4311-000020", "xxabcc-xx1234"],
        "Cmaj9": ["x30000-x30000", "x32430-x21430", "879787-214131-050000", "8797xx-2131xx-030000", "xxa9ca-xx2143"],
        "Cmi7": ["x1101x-x1203x", "8a88b8-131141-600000", "x35346-x13124-030000", "x31313-x21314-003000", "xxacbb-xx1322-000020"],
        "Csus": ["x33011-x34011-000020", "8aaa88-133311-630000", "x35563-x13341-052000", "xxfcdf-xx3124", "xxacdd-xx1344-000020", "xx3011"],
        "Csus2": ["x30013-x30014", "x30033-x20034", "x35533-x13411-050000", "8555xx-4111xx-030000", "xxa78a-xx3124", "xxacda-xx1341-004000", "x555x3"],
        "Csus4": ["x33011-x34011-000020", "8aaa88-133311-630000", "x35563-x13341-052000", "xxfcdf-xx3124", "xxacdd-xx1344-000020", "x3301x-x3401x", "x33563-x11341-050000", "xx5568-xx1124-002000", "88aa88-113411-600000", "xx3011"],
        "D": ["xx0232-xx0132", "accbaa-134211-600000", "a9777a-321114-003000", "x57775-x13331-053000", "x54232-x43121-000300", "xxcefe-xx1343-000300", "xx777a-xx1114-003000", "a9777x-43111x-003000", "200232", "x00232", "x04232", "xx4775"],
        "D#": ["bddcbb-134211-600000", "ba888b-321114-003000", "x68886-x13331-053000", "x65343-x43121-000300", "xx1343-xx1343-000300", "xx888b-xx1114-003000", "ba888x-43111x-003000", "x11343", "xx5343"],
        "D#+": ["xx1003-xx1003", "xxdccb-xx4231", "ba988x-43211x-000200", "x65447-x32114-000200"],
        "D#7": ["xxdeee", "xx0222"],
        "D#dim": ["xx4242-xx3141-000300", "xxx875-xxx431", "x6787x-x1243x", "xxdbab-xx4213", "xxdbax-xx421x", "bcdbxx-1342xx"],
        "D#dim7": ["xx1212-xx1324", "2312xx-2413xx", "x3424x-x2314x", "x64545-x41213-003000", "xx4545-xx1324", "5645xx-2413xx", "x67575-x23141-000300", "xx7878-xx1324", "8978xx-2413xx", "x9a8a8-x23141-000300", "xxabab-xx1324", "bcabxx-2413xx", "xcdbdx-x2314x"],
        "D#m": ["xx1342-xx1342", "x68876-x13421-050000", "bddbbb-134111-600000"],
        "D#m6": ["xx1312-xx1312-003000", "x64546-x31214-003000", "x6x878-x1x324", "xx8878-xx2314", "bddbdb-123141-600000"],
        "D#m7": ["xx1322-xx1423", "x64646-x21314-003000", "x6867x-x1312x-030000", "bdbbbb-131111-600000", "bdxbeb-13x141-600000"],
        "D#m7b5": ["xx1222-xx1333-000300", "x64645-x31412-003000", "x6767x-x1324x", "xxbbab-xx2314", "bcbbeb-121141-600000"],
        "D+": ["xx0332-xx0231", "xxcbba-xx4231", "a9877x-43211x-000200", "x54336-x32114-000200"],
        "D+5": ["x5433x-x3211x-000200", "a9877x-43211x-000200", "xxcbba-xx4231"],
        "D/A": ["x00232-x00132", "x47775-x02341"],
        "D/Ab": ["400232-400132"],
        "D/B": ["x20232-x10243", "x04432", "x20202", "x24232", "xx0202"],
        "D/Bb": ["x10232-x10243"],
        "D/C": ["x30232-x30142", "x00212", "x3x232", "x57575"],
        "D/C#": ["x40232-x30121-000300"],
        "D/Db": ["xxdeee", "xx0222"],
        "D/E": ["000232-000132", "004230", "2x0230", "x02232", "xx2232", "x54231", "x977x6"],
        "D/F": ["100232-100243"],
        "D/F#": ["200232-000132", "xx4232-xx4132", "254232-143121-600000"],
        "D/G": ["300232-200131-000300", "5x4235", "3x0232"],
        "D11": ["xx0010-xx0010", "x55555-x11111-050000", "axa988-4x3211-000020"],
        "D13": ["x54557-x21334-000200", "axa977-3x4211-000020", "axabcc-1x1234-300000"],
        "D2": ["x54231-x43120", "x52232-x41121-004000", "x52252-x31141-004000", "x54252-x32141-000300", "xxcbac-xx3214", "000232", "004230", "2x0230", "x02232", "xx2232", "x977x6"],
        "D3": ["x54xxx-x21xxx", "xxx77x-xxx11x-000200", "a9xxxx-21xxxx", "xxcbxx-xx21xx"],
        "D5": ["xx023x-xx012x", "x577xx-x134xx", "accxxx-134xxx", "5577x5", "x11235"],
        "D5dim": ["xx01xx-xx01xx", "x56xxx-x12xxx", "abxxxx-12xxxx"],
        "D6": ["xx0202-xx0102", "xx04xx-xx04xx", "x54475-x21143-002000", "x57777-x13333-004000", "a97777-431111-004000", "xxcbca-xx3241", "x04432", "x20202", "x20232", "x24232"],
        "D7": ["xx0212-xx0213", "acabda-131241-600000", "a97778-431112-003000", "x57778-x13334-003000", "x5453x-x3241x", "xxcede-xx1324", "x57575-x13141-050000", "xx7778-xx1112-003000", "acabxa-1312x1-600000", "x00212", "x3x232"],
        "D7+5": ["xx0312-xx0312", "x3433x-x1211x-040000", "xx4536-xx2314", "x58576-x14132-030000", "axabba-1x1231-600000", "adabxx-1412xx-300000"],
        "D7+9": ["x5456x-x2134x", "a9aaxx-2134xx", "acabad-131214-500000", "xxcbdd-xx2134"],
        "D7sus4": ["xx0213-xx0213", "x55533-x23411-000020", "xx5535-xx2314", "x57585-x13141-050000", "xx7788-xx1122-002020", "acacxa-1213x1-600000"],
        "D9": ["200210-200310", "x5455x-x2134x", "a9a9ax-21314x-030000", "acabac-131214-500000", "000212", "2x0210", "x57574"],
        "Dadd9": ["x52232-x41121-004000", "x54231-x43120", "x52235-x31124-002000", "x54252-x32141-000300", "x52255-x21134-002000", "x57755-x13411-050000", "a777xx-4111xx-030000", "xxc9ac-xx3124", "xxcbac-xx3214", "000232", "004230", "2x0230", "x02232", "xx2232", "x977x6"],
        "Daug": ["xx0332-xx0231", "xx4332-xx4231", "x5433x-x3211x-000200", "x54336-x32114-000200", "6543xx-4321xx", "x5877x-x1423x", "xx8776-xx4231", "a9877x-43211x-000200", "a987xx-4321xx", "xxcbba-xx4231", "xdcbbx-x3211x-000200", "edcbxx-4321xx"],
        "Db": ["9bba99-134211-600000", "986669-321114-003000", "x46664-x13331-053000", "x43121-x43121-000300", "xxbded-xx1343-000300", "xx6669-xx1114-003000", "98666x-43111x-003000", "446664", "xx3121", "xx6664"],
        "Db+": ["x03221-x04321", "xxbaa9-xx4231", "98766x-43211x-000200", "x43225-x32114-000200"],
        "Db/C": ["x33121", "x46564"],
        "Db13": ["x43446-x21334-000200", "9x9866-3x4211-000020", "9x9abb-1x1234-300000"],
        "Db5": ["x466x4"],
        "Db6": ["x4332x-x4231x", "x46666-x13333-004000", "986666-431111-004000", "xxbab9-xx3241", "xxbdbd-xx1314-003000", "x13121"],
        "Db7": ["9b9ac9-131241-600000", "986667-431112-003000", "x46667-x13334-003000", "x4342x-x3241x", "xxbdcd-xx1324", "x46464-x13141-050000", "xx6667-xx1112-003000", "9b9ax9-1312x1-600000", "x43404"],
        "Db7+9": ["x43100-x43100", "x4345x-x2134x", "98999x-21344x-000200", "9b9a9c-131214-500000", "xxbacc-xx2134"],
        "Db7sus4": ["x44422-x23411-000020", "xx4424-xx2314", "x46474-x13141-050000", "xx6677-xx1122-002020", "9b9b99-131411-600000", "xxbdce-xx1324"],
        "Db9": ["x4344x-x2134x", "98989x-21314x-030000", "9b9a9b-131214-500000", "xxbacb-xx2143"],
        "Dbadd9": ["x41121-x41121-004000", "x41141-x31141-004000", "x43141-x32141-000300", "x46644-x13411-050000", "9666xx-4111xx-030000", "xxb89b-xx3124", "xxba9b-xx3214", "xxbdeb-xx1341-004000"],
        "Dbdim7": ["x12020", "xx2323"],
        "Dbm": ["x46654", "xx2120", "x466x3"],
        "Dbm7": ["9baa99-142311-600000", "x4311x-x4311x-000200", "xxbddd-xx1333-000300", "022120", "x46454"],
        "Dbmaj": ["9bba99-134211-600000", "986669-321114-003000", "x46664-x13331-053000", "x43121-x43121-000300", "xxbded-xx1343-000300", "446664", "xx3121", "xx6664"],
        "Dbmaj7": ["9baa99-142311-600000", "x4311x-x4311x-000200", "xxbddd-xx1333-000300", "x43111-x43111-000300", "x46564-x13241-050000", "xx6668-xx1113-003000", "xxba98-xx4321", "x33121"],
        "Dbmaj9": ["x41111-x41111-004000", "x4354x-x2143x", "98a898-214131-050000", "98a8xx-2131xx-030000", "xxbadb-xx2143"],
        "Dbsus": ["9bbb99-133311-630000", "x46674-x13341-052000", "xx4124-xx3124", "xxbdee-xx1344-000020"],
        "Dbsus2": ["x41124-x31124-002000", "x41144-x21134-002000", "x46644-x13411-050000", "9666xx-4111xx-030000", "xxb89b-xx3124", "xxbdeb-xx1341-004000", "xx6644"],
        "Dbsus4": ["9bbb99-133311-630000", "x46674-x13341-052000", "xx4124-xx3124", "xxbdee-xx1344-000020", "x4412x-x3412x", "x44674-x11341-050000", "xx6679-xx1124-002000", "99bb99-113411-600000"],
        "Ddim": ["xx0131-xx0131-000300", "xxx764-xxx431", "x5676x-x1243x", "xxca9a-xx4213", "xxca9x-xx421x", "abcaxx-1342xx"],
        "Ddim7": ["xx0101-xx0102", "1201xx-2403xx", "x2313x-x2314x", "x53434-x41213-003000", "xx3434-xx1324", "4534xx-2413xx", "x56464-x23141-000300", "xx6767-xx1324", "7867xx-2413xx", "x89797-x23141-000300", "xx9a9a-xx1324", "ab9axx-2413xx", "xbcaca-x23141-000300", "x20101"],
        "Dm": ["xx0231-xx0231", "accaaa-134111-600000", "x57765-x13421-050000", "x5323x-x4312x", "xxcefd-xx1342", "x00231"],
        "Dm/A": ["x00231-x00231"],
        "Dm/B": ["123231", "x20201", "xx0201"],
        "Dm/Bb": ["113231"],
        "Dm/C": ["x57565", "xx0211", "xx4565"],
        "Dm/E": ["xx7765"],
        "Dm/F": ["100231-000231", "xx3231-xx3241"],
        "Dm3": ["x53xxx-x31xxx", "xxx76x-xxx21x", "a8xxxx-31xxxx", "xxcaxx-xx31xx"],
        "Dm6": ["xx0201-xx0201", "x53435-x31214-003000", "x5x767-x1x324", "xx7767-xx2314", "accaca-123141-600000", "123231", "x20201"],
        "Dm7": ["xx0211-xx0211-000020", "xx0222-xx0111-000300", "acbbaa-142311-600000", "acaada-131141-600000", "x57568-x13124-030000", "x5422x-x3211x-000200", "x53535-x21314-003000", "xxceee-xx1333-000300", "xxcedd-xx1322-000020", "x5756x-x1312x-030000", "acaaaa-131111-600000", "acxada-13x141-600000", "x57565", "xx4565"],
        "Dm7b5": ["xx0111-xx0111-000300", "x53534-x31412-003000", "x5656x-x1324x", "xxaa9a-xx2314", "abaada-121141-600000"],
        "Dm9": ["100210-100320", "x5355x-x2134x", "a8a9xx-3142xx", "acaaac-131114-500000", "xxcadc-xx2143"],
        "Dmaj": ["xx0232-xx0132", "accbaa-134211-600000", "a9777a-321114-003000", "x57775-x13331-053000", "x54232-x43121-000300", "xxcefe-xx1343-000300", "200232", "x00232", "x04232", "xx4775"],
        "Dmaj7": ["xx0222-xx0111-000300", "acbbaa-142311-600000", "x5422x-x3211x-000200", "xxceee-xx1333-000300", "x54222-x43111-000300", "x57675-x13241-050000", "xx7779-xx1113-003000", "xxcba9-xx4321", "xxdeee"],
        "Dmaj7b5": ["xx0122-xx0123", "x5667x-x1223x-002000", "a9bb99-213411-050000", "xxcb99-xx4311-000020"],
        "Dmaj9": ["x52222-x41111-004000", "x5465x-x2143x", "a9b9a9-214131-050000", "a9b9xx-2131xx-030000", "xxcbec-xx2143"],
        "Dmi": ["xx0231-xx0231", "accaaa-134111-600000", "x57765-x13421-050000", "x5323x-x4312x", "xxcefd-xx1342"],
        "Dmi7": ["xx0211-xx0211-000020", "acaada-131141-600000", "x57568-x13124-030000", "x53535-x21314-003000", "xxcedd-xx1322-000020"],
        "Dsus": ["xx0233-xx0134", "acccaa-133311-630000", "x57785-x13341-052000", "xx5235-xx3124", "xxceff-xx1344-000020", "5x2235", "300033", "x00033"],
        "Dsus2": ["xx0230-xx0130", "x52235-x31124-002000", "x52255-x21134-002000", "x57755-x13411-050000", "a777xx-4111xx-030000", "xxc9ac-xx3124", "5577x4", "x00230", "002230", "x02230"],
        "Dsus4": ["xx0233-xx0134", "acccaa-133311-630000", "x57785-x13341-052000", "xx5235-xx3124", "xxceff-xx1344-000020", "x5523x-x3412x", "x55785-x11341-050000", "xx778a-xx1124-002000", "aaccaa-113411-600000", "5x2235", "300033", "x00033"],
        "E": ["022100-023100", "ceedcc-134211-600000", "cb999c-321114-003000", "x79997-x13331-053000", "x76454-x43121-000300", "xx2454-xx1343-000300", "376454-043121-000300", "xx999c-xx1114-003000", "cb999x-43111x-003000", "x76453"],
        "E#7": ["021100", "3x6443", "xx1100"],
        "E+": ["xx2110-xx3120", "xxeddc-xx4231", "cba99x-43211x-000200", "x76558-x32114-000200"],
        "E+5": ["032110-043120", "x7655x-x3211x-000200", "cba99x-43211x-000200"],
        "E/A": ["x02100"],
        "E/B": ["x22100-x23100", "776454-443121-200300", "779997-112341-600000"],
        "E/C": ["x32100-x32100"],
        "E/C#": ["x42100-x42100"],
        "E/D": ["xx0100-xx0100", "020100", "022130", "x20130"],
        "E/D#": ["xx1100-xx1200"],
        "E/Eb": ["021100", "3x6443", "xx1100"],
        "E/F#": ["222100-234100"],
        "E/G": ["322100-423100"],
        "E/G#": ["422100-423100", "476454-143121-600000"],
        "E11": ["022232-011121-050000", "x77777-x11111-050000", "cxcbaa-4x3211-000020"],
        "E13": ["020122-020134", "x76779-x21334-000200", "cxcb99-3x4211-000020"],
        "E2": ["022102-023104", "024100-024100", "xx2102-xx2103", "x74454-x41121-004000", "x74474-x31141-004000", "x76474-x32141-000300", "c9999x-41111x-040000", "0x4100", "222100"],
        "E3": ["xx21xx-xx21xx", "x76xxx-x21xxx", "xxx99x-xxx11x-000200", "cbxxxx-21xxxx"],
        "E5": ["022xxx-011xxx-020000", "xx245x-xx134x", "x799xx-x134xx", "02xxx0", "x799x6"],
        "E6": ["022120-023140", "04xxxx-04xxxx", "x7665x-x4231x", "x76697-x21143-002000", "x79999-x13333-004000", "cb9999-431111-004000", "x46454"],
        "E7": ["020100-020100", "022140-023140", "cecdfc-131241-600000", "cb999a-431112-003000", "x7999a-x13334-003000", "x7675x-x3241x", "020130-020140", "xx2434-xx1324", "476754-032410", "x79797-x13141-050000", "xx999a-xx1112-003000", "022130", "x20130", "xx0100"],
        "E7+5": ["0x0110-0x0120", "030110-030120", "45655x-01211x-040000", "x7a798-x14132-030000"],
        "E7+9": ["020103-020104", "0x0133-0x0134", "xx2133-xx2134", "x7678x-x2134x", "cbccxx-2134xx"],
        "E7sus4": ["020200-020300", "1x2435-0x1324", "x797a7-x13141-050000"],
        "E9": ["0201x2-0201x3", "x7677x-x2134x", "cbcbcx-21314x-030000", "020102", "220100"],
        "Eadd9": ["024100-024100", "022102-023104", "xx2102-xx2103", "x74454-x41121-004000", "x74474-x31141-004000", "x74457-x31124-002000", "x76474-x32141-000300", "x74477-x21134-002000", "x79977-x13411-050000", "c9999x-41111x-040000", "c999xx-4111xx-030000", "xxebce-xx3124", "0x4100", "222100"],
        "Eaug": ["032110-043120", "xx2110-xx3120", "3x6554-0x4231", "x7655x-x3211x-000200", "x76558-x32114-000200", "8765xx-4321xx", "xxa998-xx4231", "cba99x-43211x-000200", "cba9xx-4321xx", "xxeddc-xx4231", "x32110"],
        "Eb": ["bddcbb-134211-600000", "ba888b-321114-003000", "x68886-x13331-053000", "x65343-x43121-000300", "xx1343-xx1343-000300", "xx888b-xx1114-003000", "ba888x-43111x-003000", "x11343", "xx5343"],
        "Eb+5": ["x6544x-x3211x-000200", "ba988x-43211x-000200", "xxdccb-xx4231"],
        "Eb/C": ["x35343"],
        "Eb11": ["xx1121-xx1121-004000", "x66666-x11111-050000", "bxba99-4x3211-000020"],
        "Eb13": ["x65668-x21334-000200", "bxba88-3x4211-000020", "bxbcdd-1x1234-300000"],
        "Eb2": ["x63343-x41121-004000", "x63363-x31141-004000", "x65363-x32141-000300", "xxdcbd-xx3214"],
        "Eb3": ["xx10xx-xx10xx", "x65xxx-x21xxx", "xxx88x-xxx11x-000200", "baxxxx-21xxxx"],
        "Eb5": ["xx134x-xx134x", "x688xx-x134xx", "bddxxx-134xxx", "x688x6"],
        "Eb6": ["xx1313-xx1314-003000", "x6554x-x4231x", "x65586-x21143-002000", "x68888-x13333-004000", "ba8888-431111-004000", "xxdcdb-xx3241", "x35343"],
        "Eb7": ["x11023-x12034", "bdbceb-131241-600000", "ba8889-431112-003000", "x68889-x13334-003000", "x6564x-x3241x", "xx1323-xx1324", "x68686-x13141-050000", "xx8889-xx1112-003000", "bdbcxb-1312x1-600000", "x11323"],
        "Eb7+9": ["xx1022-xx1034", "x6567x-x2134x", "babbxx-2134xx", "bdbcbe-131214-500000"],
        "Eb7sus4": ["xx1324-xx1324", "x66644-x23411-000020", "xx6646-xx2314", "x68696-x13141-050000", "xx8899-xx1122-002020", "bdbdxb-1213x1-600000"],
        "Eb9": ["xx1021-xx1032", "x6566x-x2134x", "bababx-21314x-030000", "bdbcbd-131214-500000"],
        "Ebadd9": ["x63343-x41121-004000", "x63346-x31124-002000", "x65363-x32141-000300", "x63366-x21134-002000", "x68866-x13411-050000", "b888xx-4111xx-030000", "xxdabd-xx3124", "xxdcbd-xx3214"],
        "Ebaug": ["x2100x-x2100x", "xx1003-xx1003", "3210xx-4320xx", "xx5443-xx4231", "x6544x-x3211x-000200", "x65447-x32114-000200", "7654xx-4321xx", "x6988x-x1423x", "xx9887-xx4231", "ba988x-43211x-000200", "ba98xx-4321xx", "xxdccb-xx4231", "321003", "3x1003"],
        "Ebdim": ["xx4242-xx3141-000300", "xxx875-xxx431", "x6787x-x1243x", "xxdbab-xx4213", "xxdbax-xx421x", "bcdbxx-1342xx"],
        "Ebdim7": ["xx1212-xx1324", "2312xx-2413xx", "x3424x-x2314x", "xx4545-xx1324", "x64545-x41213-003000", "5645xx-2413xx", "x67575-x23141-000300", "xx7878-xx1324", "8978xx-2413xx", "x9a8a8-x23141-000300", "xxabab-xx1324", "bcabxx-2413xx", "xcdbdx-x2314x"],
        "Ebm": ["bddbbb-134111-600000", "x68876-x13421-050000", "x6434x-x4312x", "xx1342-xx1342", "xx4342"],
        "Ebm6": ["xx1312-xx1312-003000", "x64546-x31214-003000", "x6x878-x1x324", "xx8878-xx2314", "bddbdb-123141-600000"],
        "Ebm7": ["xx0343-xx0132", "bdbbeb-131141-600000", "x68679-x13124-030000", "bdccbb-142311-600000", "x64646-x21314-003000", "x6533x-x4311x-000200", "xx1322-xx1322-000020", "xx1333-xx1333-000300", "x6867x-x1312x-030000", "bdbbbb-131111-600000", "bdxbeb-13x141-600000"],
        "Ebm7b5": ["xx1222-xx1333-000300", "x64645-x31412-003000", "x6767x-x1324x", "xxbbab-xx2314", "bcbbeb-121141-600000"],
        "Ebm9": ["x6466x-x2134x", "b9baxx-3142xx", "bdbbbd-131114-500000", "xxdbed-xx2143"],
        "Ebmaj": ["bddcbb-134211-600000", "ba888b-321114-003000", "x68886-x13331-053000", "x65343-x43121-000300", "xx1343-xx1343-000300", "x11343", "xx5343"],
        "Ebmaj7": ["xx0343-xx0132", "bdccbb-142311-600000", "x6533x-x4311x-000200", "xx1333-xx1333-000300", "x65333-x43111-000300", "x68786-x13241-050000", "xx888a-xx1113-003000", "xxdcba-xx4321"],
        "Ebmaj9": ["xx1031-xx1042", "x63333-x41111-004000", "x6576x-x2143x", "bacaba-214131-050000", "bacaxx-2131xx-030000"],
        "Ebsus": ["bdddbb-133311-630000", "x68896-x13341-052000", "xx6346-xx3124", "xx1344-xx1344-000020"],
        "Ebsus2": ["xx1341-xx1341-004000", "x63346-x31124-002000", "x63366-x21134-002000", "x68866-x13411-050000", "b888xx-4111xx-030000", "xxdabd-xx3124"],
        "Ebsus4": ["bdddbb-133311-630000", "x68896-x13341-052000", "xx6346-xx3124", "xx1344-xx1344-000020", "x6634x-x3412x", "x66896-x11341-050000", "xx889b-xx1124-002000", "bbddbb-113411-600000"],
        "Edim": ["0120xx-0120xx", "xx2353-xx1243", "x7898x-x1243x", "xxecbc-xx4213"],
        "Edim7": ["012020-012030", "xx2323-xx1324", "3423xx-2413xx", "24535x-02314x", "xx5656-xx1324", "x75656-x41213-003000", "6756xx-2413xx", "x78686-x23141-000300", "xx8989-xx1324", "9a89xx-2413xx", "xab9b9-x23141-000300", "xxbcbc-xx1324", "cdbcxx-2413xx", "x12020"],
        "Em": ["022000-023000", "ceeccc-134111-600000", "x79987-x13421-050000", "x7545x-x4312x", "xx2453-xx1342", "2x5453-0x3241", "3x2000", "x25xx1"],
        "Em/A": ["3x2200", "x02000", "x35453"],
        "Em/B": ["x22000-x23000"],
        "Em/C": ["x32000-x21000", "032000", "x22010", "x35453"],
        "Em/C#": ["x42000-x31000"],
        "Em/D": ["xx0000", "020000", "020030", "022030", "022033-012034", "xxbccc", "xx6987", "xx2433", "0x0000", "xaccc9"],
        "Em/D#": ["xx1000-xx1000"],
        "Em/Db": ["022020"],
        "Em/F#": ["222000-123000"],
        "Em/G": ["322000-423000"],
        "Em3": ["xx20xx-xx10xx", "x75xxx-x31xxx", "xxx98x-xxx21x", "caxxxx-31xxxx"],
        "Em6": ["022020-023040", "x75657-x31214-003000", "x7x989-x1x324"],
        "Em7": ["022030-023040", "021100-031200", "ceddcc-142311-600000", "ceccfc-131141-600000", "020000-020000", "x7978a-x13124-030000", "x75757-x21314-003000", "x7644x-x4311x-000200", "xx2433-xx1322-000020", "xx2444-xx1333-000300", "020030-020040", "2x5432-0x3210", "x7978x-x1312x-030000", "022033-012034", "xx0000", "xxbccc", "xx6987", "0x0000", "xaccc9"],
        "Em7b5": ["010030-010040", "xx2333-xx1333-000300", "x75756-x31412-003000", "x7878x-x1324x", "cxccbx-2x341x"],
        "Em9": ["020002-020003", "022032-012043", "x7577x-x2134x", "cacbxx-3142xx", "020032", "220000"],
        "Emaj": ["022100-023100", "ceedcc-134211-600000", "cb999c-321114-003000", "x79997-x13331-053000", "x76454-x43121-000300", "xx2454-xx1343-000300", "x76453"],
        "Emaj7": ["021100-031200", "ceddcc-142311-600000", "x7644x-x4311x-000200", "xx2444-xx1333-000300", "x76444-x43111-000300", "x79897-x13241-050000", "xx999b-xx1113-003000", "xxedcb-xx4321", "3x6443", "xx1100"],
        "Emaj7b5": ["0111xx-0123xx", "01214x-01214x-030000", "xx2344-xx1234", "x7889x-x1223x-002000", "cxddbx-2x341x", "xxedbb-xx4311-000020"],
        "Emaj9": ["021102-031204", "x74444-x41111-004000", "x7687x-x2143x", "cbdbcb-214131-050000", "cbdbxx-2131xx-030000", "4x4440"],
        "Emi": ["022000-023000", "ceeccc-134111-600000", "x79987-x13421-050000", "x7545x-x4312x", "xx2453-xx1342"],
        "Emi7": ["022030-023040", "ceccfc-131141-600000", "x7978a-x13124-030000", "x75757-x21314-003000", "xx2433-xx1322-000020"],
        "Esus": ["022200-023400", "ceeecc-133311-630000", "x799a7-x13341-052000", "xx7457-xx3124", "xx2455-xx1344-000020", "002200", "002400", "x02200", "xx2200"],
        "Esus2": ["xx2452-xx1341-004000", "x74457-x31124-002000", "x74477-x21134-002000", "x79977-x13411-050000", "c999xx-4111xx-030000", "xxebce-xx3124", "799xx6", "x244x0"],
        "Esus4": ["022200-023400", "ceeecc-133311-630000", "x799a7-x13341-052000", "xx7457-xx3124", "xx2455-xx1344-000020", "112455-001234", "377453-034120", "x779a7-x11341-050000", "xx99ac-xx1124-002000", "002200", "002400", "x02200", "xx2200"],
        "F": ["133211-134211-600000", "x03211-x03211-000020", "dcaaad-321114-003000", "x8aaa8-x13331-053000", "x87565-x43121-000300", "xx3565-xx1343-000300", "xxaaad-xx1114-003000", "dcaaax-43111x-003000", "x33211", "xx3211"],
        "F#": ["244322-134211-600000", "edbbbe-321114-003000", "x9bbb9-x13331-053000", "x98676-x43121-000300", "xx4676-xx1343-000300", "xxbbbe-xx1114-003000", "edbbbx-43111x-003000"],
        "F#+5": ["xx4332-xx4231", "x9877x-x3211x-000200", "edcbbx-43211x-000200"],
        "F#11": ["2x2100-2x3100", "242424-121314-500000", "xx4454-xx1121-004000", "x99999-x11111-050000"],
        "F#13": ["2x2344-1x1234-300000", "x9899b-x21334-000200", "x9b99b-x13114-040000"],
        "F#2": ["xx4324-xx3214", "x96676-x41121-004000", "x96696-x31141-004000", "x98696-x32141-000300", "ebbbbx-41111x-040000"],
        "F#3": ["21xxxx-21xxxx", "xx43xx-xx21xx", "x98xxx-x21xxx", "xxxbbx-xxx11x-000200"],
        "F#5": ["244xxx-134xxx", "xx467x-xx134x", "x9bbxx-x134xx"],
        "F#6": ["2x4342-1x3241-600000", "x9887x-x4231x", "x9bbbb-x13333-004000"],
        "F#7": ["xx4320-xx3210", "242352-131241-600000", "edbbbc-431112-003000", "x9bbbc-x13334-003000", "x9897x-x3241x", "xx4656-xx1324", "2423x2-1312x1-600000", "x9b9b9-x13141-050000", "xxbbbc-xx1112-003000", "003210", "133210", "1x2210", "xx2211", "xx3210"],
        "F#7+5": ["2x2332-1x1231-600000", "xx4330-xx3120", "x7877x-x1211x-040000", "x9c9ba-x14132-030000"],
        "F#7+9": ["21222x-21333x-003000", "242325-131214-500000", "x989ax-x2134x"],
        "F#7sus4": ["242422-131411-600000", "xx4420-xx3410", "x9997x-x2341x", "x9b9c9-x13141-050000"],
        "F#9": ["21212x-21314x-030000", "242324-131214-500000", "xx4354-xx2143", "x9899x-x2134x"],
        "F#add9": ["xx4324-xx3214", "xx4674-xx1341-004000", "x96676-x41121-004000", "x96696-x31141-004000", "x96679-x31124-002000", "x98696-x32141-000300", "x96699-x21134-002000", "x9bb99-x13411-050000", "ebbbxx-4111xx-030000"],
        "F#aug": ["xx4332-xx4231", "x5433x-x3211x-000200", "6543xx-4321xx", "xx8776-xx4231", "x9877x-x3211x-000200", "a987xx-4321xx", "xxcbba-xx4231", "edcbbx-43211x-000200", "edcbxx-4321xx"],
        "F#dim": ["2342xx-1342xx", "xx4575-xx1243", "x9abax-x1243x"],
        "F#dim7": ["xx1212-xx1324", "2312xx-2413xx", "x3424x-x2314x", "xx4545-xx1324", "5645xx-2413xx", "x6757x-x2314x", "xx7878-xx1324", "x97878-x41213-003000", "8978xx-2413xx", "x9a8a8-x23141-000300", "xxabab-xx1324", "bcabxx-2413xx", "xcdbdb-x23141-000300"],
        "F#m": ["x04222-x03111-000300", "244222-134111-600000", "x9bba9-x13421-050000", "x9767x-x4312x", "xx4675-xx1342"],
        "F#m6": ["244242-123141-600000", "x9787x-x3121x-003000", "x9xbab-x1x324"],
        "F#m7": ["243322-142311-600000", "xx4220-xx4120", "242252-131141-600000", "x9b9ac-x13124-030000", "x9866x-x4311x-000200", "xx4666-xx1333-000300", "x97979-x21314-003000", "xx4655-xx1322-000020", "242222-131111-600000", "24x252-13x141-600000", "x9b9ax-x1312x-030000"],
        "F#m7b5": ["20221x-20341x", "232252-121141-600000", "xx4555-xx1333-000300", "x97978-x31412-003000", "x9a9ax-x1324x"],
        "F#m9": ["242224-131114-500000", "xx4254-xx2143", "x9799x-x2134x"],
        "F#maj": ["244322-134211-600000", "edbbbe-321114-003000", "x9bbb9-x13331-053000", "x98676-x43121-000300", "xx4676-xx1343-000300"],
        "F#maj7": ["243322-142311-600000", "x9866x-x4311x-000200", "xx4666-xx1333-000300", "xx4321-xx4321", "24332x-14231x-500000", "x98666-x43111-000300", "x9bab9-x13241-050000"],
        "F#maj7b5": ["2x331x-2x341x", "xx4311-xx4311-000020", "xx4566-xx1234", "x9aabx-x1223x-002000"],
        "F#maj9": ["213121-214131-050000", "xx4364-xx2143", "x96666-x41111-004000", "x98a9x-x2143x"],
        "F#mi": ["x04222-x03111-000300", "244222-134111-600000", "x9bba9-x13421-050000", "x9767x-x4312x", "xx4675-xx1342"],
        "F#mi7": ["xx4220-xx4120", "242252-131141-600000", "x9b9ac-x13124-030000", "x97979-x21314-003000", "xx4655-xx1322-000020"],
        "F#sus": ["x44x01-x34x01", "244422-133311-630000", "x9bbc9-x13341-052000", "xx9679-xx3124", "xx4677-xx1344-000020"],
        "F#sus2": ["xx4124-xx3124", "xx4674-xx1341-004000", "x96679-x31124-002000", "x96699-x21134-002000", "x9bb99-x13411-050000", "ebbbxx-4111xx-030000"],
        "F#sus4": ["x44x01-x34x01", "244422-133311-630000", "x9bbc9-x13341-052000", "xx9679-xx3124", "xx4677-xx1344-000020", "2x4422-1x3411-600000", "x9967x-x3412x"],
        "F+": ["x03221-x04231", "xx3221-xx4231", "dcbaax-43211x-000200", "x87669-x32114-000200"],
        "F+5": ["xx3221-xx4231", "x8766x-x3211x-000200", "dcbaax-43211x-000200"],
        "F/A": ["x03211-x03211-000020"],
        "F/C": ["x33211-x34211-000020"],
        "F/D": ["x57565", "xx0211", "xx4565"],
        "F/E": ["033211-034211-000020", "003210", "133210", "1x2210", "xx2211", "xx3210"],
        "F/G": ["303211-304211-000020", "3x3211", "xx3213"],
        "F11": ["xx3343-xx1121-004000", "x88888-x11111-050000", "dxdcbb-3x4211-000020"],
        "F13": ["1x1233-1x1234-300000", "x8788a-x21334-000200", "dxdcaa-3x4211-000020"],
        "F2": ["xx3213-xx3214", "x85565-x41121-004000", "x85585-x31141-004000", "x87585-x32141-000300", "daaaax-41111x-040000", "3x3211"],
        "F3": ["10xxxx-10xxxx", "xx32xx-xx21xx", "x87xxx-x21xxx", "xxxaax-xxx11x-000200"],
        "F5": ["133xxx-134xxx", "xx356x-xx134x", "x8aaxx-x134xx", "133xx1"],
        "F6": ["1302xx-1302xx", "1x3231-1x3241-600000", "xx3535-xx1314-003000", "x8776x-x4231x", "x877a8-x21143-002000", "x8aaaa-x13333-004000", "dcaaaa-431111-004000", "x57565", "xx0211", "xx4565"],
        "F7": ["x01211-x01211-004000", "131241-131241-600000", "dcaaab-431112-003000", "x8aaab-x13334-003000", "x8786x-x3241x", "xx3545-xx1324", "1312x1-1312x1-600000", "x8a8a8-x13141-050000", "xxaaab-xx1112-003000", "xx1211"],
        "F7+5": ["1x1221-1x1231-600000", "xx3645-xx1423", "x6766x-x1211x-040000", "x8b8a9-x14132-030000"],
        "F7+9": ["131214-131214-500000", "xx3244-xx2134", "x8789x-x2134x"],
        "F7sus4": ["131311-131411-600000", "xx3546-xx1324", "x88866-x23411-000020", "xx8868-xx2314", "x8a8b8-x13141-050000"],
        "F9": ["101011-102034", "131213-131214-500000", "xx3243-xx2143", "x8788x-x2134x"],
        "Fadd9": ["xx3213-xx3214", "xx3563-xx1341-004000", "x85565-x41121-004000", "x85585-x31141-004000", "x85568-x31124-002000", "x87585-x32141-000300", "x85588-x21134-002000", "x8aa88-x13411-050000", "daaaax-41111x-040000", "daaaxx-4111xx-030000", "3x3211"],
        "Faug": ["xx3221-xx4231", "x4322x-x3211x-000200", "5432xx-4321xx", "xx7665-xx4231", "x8766x-x3211x-000200", "9876xx-4321xx", "xxbaa9-xx4231", "dcbaax-43211x-000200", "dcbaxx-4321xx", "x03221", "x0x221"],
        "Fdim": ["xx3101-xx4102", "1231xx-1342xx", "xx3464-xx1243", "x89a9x-x1243x"],
        "Fdim7": ["xx0101-xx0102", "1201xx-2403xx", "x2313x-x2314x", "xx3434-xx1324", "4534xx-2413xx", "x5646x-x2314x", "xx6767-xx1324", "x86767-x41213-003000", "7867xx-2413xx", "x89797-x23141-000300", "xx9a9a-xx1324", "ab9axx-2413xx", "xbcaca-x23141-000300", "x20101"],
        "Fm": ["133111-134111-600000", "x8aa98-x13421-050000", "x8656x-x4312x", "xx3564-xx1342", "x33111", "xx3111"],
        "Fm/Ab": ["433111-423111-000300"],
        "Fm/C": ["x33111-x34111-000300"],
        "Fm6": ["133131-123141-600000", "xx3534-xx1312-003000", "x86768-x31214-003000", "x8xa9a-x1x324", "xx0111"],
        "Fm7": ["131141-131141-600000", "xx3210-xx3210", "132211-142311-600000", "x8a89b-x13124-030000", "x86868-x21314-003000", "xx3544-xx1322-000020", "x8755x-x4311x-000200", "xx3555-xx1333-000300", "131111-131111-600000", "13x141-13x141-600000", "x8a89x-x1312x-030000", "x8a898", "xx1111"],
        "Fm7b5": ["xx1101-xx1203", "121141-121141-600000", "xx3444-xx1333-000300", "x86867-x31412-003000", "x8989x-x1324x"],
        "Fm9": ["131113-131114-500000", "xx3143-xx2143", "4x3543-2x1431-004000", "x8688x-x2134x", "dbdcxx-3142xx"],
        "Fmaj": ["x03211-x03211-000020", "133211-134211-600000", "dcaaad-321114-003000", "x8aaa8-x13331-053000", "x87565-x43121-000300", "xx3565-xx1343-000300", "x33211", "xx3211"],
        "Fmaj7": ["xx3210-xx3210", "132211-142311-600000", "x8755x-x4311x-000200", "xx3555-xx1333-000300", "103210-104320", "x87555-x43111-000300", "x8a9a8-x13241-050000", "xxaaac-xx1113-003000", "003210", "133210", "1x2210", "xx2211"],
        "Fmaj7b5": ["xx3200-xx3200", "xx3455-xx1234", "x899ax-x1223x-002000", "dxeecx-2x341x"],
        "Fmaj9": ["102010-103020", "103010-104020", "x85555-x41111-004000", "x8798x-x2143x", "003013"],
        "Fmi7": ["131141-131141-600000", "x8a89b-x13124-030000", "x86868-x21314-003000", "xx3544-xx1322-000020"],
        "Fsus": ["133311-133311-630000", "x8aab8-x13341-052000", "xx8568-xx3124", "xx3566-xx1344-000020", "xx3311"],
        "Fsus2": ["xx3011-xx3011-000020", "xx3013-xx3014", "xx3563-xx1341-004000", "x85568-x31124-002000", "x85588-x21134-002000", "x8aa88-x13411-050000", "daaaxx-4111xx-030000", "x33011"],
        "Fsus4": ["133311-133311-630000", "x8aab8-x13341-052000", "xx8568-xx3124", "xx3566-xx1344-000020", "1x3311-1x3411-600000", "x8856x-x3412x", "x88ab8-x11341-050000", "xx3311"],
        "G": ["320003-210003", "355433-134211-600000", "fecccf-321114-003000", "xaccca-x13331-053000", "xa9787-x43121-000300", "xx5787-xx1343-000300", "xacccx-x1234x", "320033-210034", "3x0003", "x55433", "xx0433", "xx6787"],
        "G#": ["466544-134211-600000", "431114-321114-003000", "xbdddb-x13331-053000", "xba898-x43121-000300", "xx6898-xx1343-000300", "xx1114-xx1114-003000", "xbdddx-x1234x"],
        "G#+": ["xx2110-xx3120", "xx6554-xx4231", "43211x-43211x-000200", "xba998-x32110-000200"],
        "G#7": ["220003", "220033", "320002", "xx4433"],
        "G#dim": ["x20134-x20134", "4564xx-1342xx", "xx6797-xx1243", "xbcdcx-x1243x"],
        "G#dim7": ["xx0101-xx0102", "1201xx-2403xx", "x2313x-x2314x", "xx3434-xx1324", "4534xx-2413xx", "x56464-x23141-000300", "xx6767-xx1324", "7867xx-2413xx", "x89797-x23141-000300", "xb9a9a-x41213-003000", "xx9a9a-xx1324", "ab9axx-2413xx", "xbcaca-x23141-000300"],
        "G#m": ["466444-134111-600000", "xbddcb-x13421-050000", "xb989x-x4312x", "xx6897-xx1342", "xx1444-xx1444-000300"],
        "G#m6": ["xx1101-xx1203", "466464-123141-600000", "xb9a9b-x31214-003000"],
        "G#m7": ["xx1102-xx1204", "464474-131141-600000", "xbdbce-x13124-030000", "xb9b9b-x21314-003000", "xx6877-xx1322-000020", "464444-131111-600000", "46x474-13x141-600000", "xbdbcx-x1312x-030000"],
        "G#m7b5": ["4x443x-2x341x", "454474-121141-600000", "xx6777-xx1333-000300", "xb9b9a-x31412-003000", "xbcbcx-x1324x"],
        "G#m9": ["464446-131114-500000", "xx6476-xx2143", "xb9bbx-x2134x"],
        "G#mi": ["466444-134111-600000", "xbddcb-x13421-050000", "xb989x-x4312x", "xx6897-xx1342"],
        "G+": ["xx1003-xx1003", "xx5443-xx4231", "fedccx-43211x-000200", "xa988b-x32114-000200"],
        "G+5": ["321003-321004", "xx5443-xx4231", "xa988x-x3211x-000200"],
        "G/A": ["300003", "320203"],
        "G/B": ["x20003-x10003", "x20033-x10034", "7a9787-143121-600000"],
        "G/C": ["x30003-x20003", "8a97xx-2431xx", "330003"],
        "G/C#": ["x40003-x20003", "9ax787-34x121-000300"],
        "G/D": ["xx0003-xx0003", "x55433-x34211-000020", "ax9787-4x3121-000300"],
        "G/E": ["020003-010003", "020000", "020030", "022030", "022033-012034", "xxbccc", "xx6987", "xx2433", "0x0000", "xaccc9"],
        "G/F": ["120003-120003", "1x0003", "320001", "xx0001"],
        "G/F#": ["220003-120003"],
        "G11": ["3x3211-3x4211-000020", "xx5565-xx1121-004000", "xaaaaa-x11111-050000"],
        "G13": ["3x3200-3x4200", "3x3455-1x1234-300000", "xa9aac-x21334-000200"],
        "G2": ["300003-200003", "300203-200103", "xx5435-xx3214", "xa7787-x41121-004000", "xa77a7-x31141-004000", "xa97a7-x32141-000300", "320203"],
        "G3": ["xxx00x", "32xxxx-21xxxx", "xx54xx-xx21xx", "xa9xxx-x21xxx"],
        "G5": ["355xxx-134xxx", "xx578x-xx134x", "xaccxx-x134xx", "355xx3", "3x0033"],
        "G6": ["320000-320000", "xx5453-xx3241", "xx5757-xx1314-003000", "xa998x-x4231x", "020000", "020030", "022030", "022033-012034", "xxbccc", "xx6987", "xx2433", "0x0000", "xaccc9"],
        "G7": ["320001-320001", "353463-131241-600000", "fecccd-431112-003000", "xacccd-x13334-003000", "xa9a8x-x3241x", "xx5767-xx1324", "3534x3-1312x1-600000", "xacaca-x13141-050000", "1x0003", "xx0001"],
        "G7+5": ["3x3443-1x1231-600000", "3634xx-1412xx-300000", "x8988x-x1211x-040000", "xadacb-x14132-030000"],
        "G7sus4": ["330011-340011-000020", "353533-131411-600000", "xaaa88-x23411-000020"],
        "G9": ["300201-300201", "303203-203104", "32323x-21314x-030000", "353435-131214-500000", "xx5465-xx2143", "xa9aax-x2134x", "x00001", "x23233"],
        "Gadd9": ["300203-200103", "xx5435-xx3214", "xx5785-xx1341-004000", "xa7787-x41121-004000", "xa77a7-x31141-004000", "xa778a-x31124-002000", "xa97a7-x32141-000300", "xa77aa-x21134-002000", "xaccaa-x13411-050000", "fcccxx-4111xx-030000", "300003", "320203"],
        "Gaug": ["321003-321004", "3210xx-3210xx", "xx5443-xx4231", "x6544x-x3211x-000200", "7654xx-4321xx", "xx9887-xx4231", "xa988x-x3211x-000200", "ba98xx-4321xx", "xxdccb-xx4231", "3x1003"],
        "Gb": ["244322-134211-600000", "xx4676-xx1243", "x98676-x43121-000300", "x9bbb9-x12341-050000", "xxbbbe-xx1114-003000", "edbbbx-43111x-003000", "edbbbe-321114-003000", "x44322", "xx4322"],
        "Gb/Ab": ["xx4324"],
        "Gb/Eb": ["xx1322"],
        "Gb/F": ["xx3322"],
        "Gb13": ["2x2344-1x1234-300000", "x9899b-x21334-000200", "x9b99b-x13114-040000"],
        "Gb2": ["xx4324-xx3214", "x96676-x41121-004000", "x96696-x31141-004000", "x98696-x32141-000300", "ebbbbx-41111x-040000"],
        "Gb6": ["2x4342-1x3241-600000", "x9887x-x4231x", "x9bbbb-x13333-004000", "xx1322"],
        "Gb7": ["xx4320-xx3210", "2423x2-1312x1-600000", "xx4656-xx1324", "x9897x-x3241x", "x9b9b9-x13141-050000", "xxbbbc-xx1112-003000", "edbbbc-431112-003000", "242322"],
        "Gb7+9": ["21222x-21333x-003000", "242325-131214-500000", "x989ax-x2134x"],
        "Gb9": ["21212x-21314x-030000", "242324-131214-500000", "xx4354-xx2143", "x9899x-x2134x"],
        "Gbdim7": ["xx1212"],
        "Gbm": ["244222", "x44222", "xx4222"],
        "Gbm7": ["002222", "0x4220", "2x2220", "x04220", "xx2222"],
        "Gbmaj": ["244322", "x44322", "xx4322"],
        "Gbmaj7": ["xx4321-xx4321", "24332x-14231x-500000", "x98666-x43111-000300", "x9bab9-x13241-050000", "xx3322"],
        "Gbmaj9": ["213121-214131-050000", "xx4364-xx2143", "x96666-x41111-004000", "x98a9x-x2143x"],
        "Gbsus": ["x44422"],
        "Gbsus2": ["xx4124-xx3124", "xx4674-xx1341-004000", "x96679-x31124-002000", "x96699-x21134-002000", "x9bb99-x13411-050000", "ebbbxx-4111xx-030000"],
        "Gbsus4": ["2x4422-1x3411-600000", "xx4677-xx1234", "x9967x-x3412x", "x9bbc9-x12341-050000", "x44422"],
        "Gdim": ["3453xx-1342xx", "xx5686-xx1243", "xabcbx-x1243x"],
        "Gdim7": ["x12020-x23040", "xx2323-xx1324", "3423xx-2413xx", "x4535x-x2314x", "xx5656-xx1324", "6756xx-2413xx", "x7868x-x2314x", "xx8989-xx1324", "xa8989-x41213-003000", "9a89xx-2413xx", "xab9bx-x2314x", "xxbcbc-xx1324", "cdbcxx-2413xx"],
        "Gm": ["3x0333-1x0234", "355333-134111-600000", "xaccba-x13421-050000", "xa878x-x4312x", "xx5786-xx1342", "310033-210034", "xx0333"],
        "Gm/D": ["xx0333-xx0111-000300", "x55333-x34111-000300"],
        "Gm/E": ["3x0330"],
        "Gm/F": ["353333", "xx3333"],
        "Gm13": ["003333"],
        "Gm3": ["31xxxx-31xxxx", "xx53xx-xx31xx", "xa8xxx-x31xxx", "xxxcbx-xxx21x"],
        "Gm6": ["310330-210340", "355353-123141-600000", "xa898a-x31214-003000", "xaxcbc-x1x324", "3x0330"],
        "Gm7": ["353363-131141-600000", "3x0002-3x0001", "354433-142311-600000", "xacabd-x13124-030000", "xa8a8a-x21314-003000", "xa977x-x4311x-000200", "xx5766-xx1322-000020", "xx5777-xx1333-000300", "353333-131111-600000", "35x363-13x141-600000", "xacabx-x1312x-030000", "xx3333"],
        "Gm7b5": ["31302x-31402x", "343363-121141-600000", "xx5666-xx1333-000300", "xa8a89-x31412-003000", "xababx-x1324x"],
        "Gm9": ["3132xx-3142xx", "353335-131114-500000", "xa8aax-x2134x"],
        "Gmaj": ["320003-210003", "355433-134211-600000", "fecccf-321114-003000", "xaccca-x13331-053000", "xa9787-x43121-000300", "xx5787-xx1343-000300", "320033", "3x0003", "x55433", "xx0433", "xx6787"],
        "Gmaj7": ["3x0002-3x0001", "354433-142311-600000", "xa977x-x4311x-000200", "xx5777-xx1333-000300", "320002-320001", "35443x-14231x-500000", "xx5432-xx4321", "xa9777-x43111-000300", "220003", "220033", "xx4433"],
        "Gmaj9": ["300202-300201", "32423x-21413x-030000", "xa9bax-x2143x"],
        "Gmi": ["3x0333-1x0234", "355333-134111-600000", "xaccba-x13421-050000", "xa878x-x4312x", "xx5786-xx1342"],
        "Gsus": ["330013-230014", "355533-133311-630000", "xaccda-x13341-052000", "xxa78a-xx3124", "xx5788-xx1344-000020", "x30033", "x35533", "x55533"],
        "Gsus2": ["3000xx-4000xx", "300233-200134", "xx5785-xx1341-004000", "xa778a-x31124-002000", "xa77aa-x21134-002000", "xaccaa-x13411-050000", "fcccxx-4111xx-030000", "5x2235", "300033", "x00033", "xx0233"],
        "Gsus2/E": ["x02030", "x02033", "x02233", "522232"],
        "Gsus4": ["330013-230014", "355533-133311-630000", "xaccda-x13341-052000", "xxa78a-xx3124", "xx5788-xx1344-000020", "3x5533-1x3411-600000", "xaa78x-x3412x", "x30033", "x35533", "x55533"]
      };
    };

    return ChordsDict;

  })();

  JellyScore.ChordsDict = ChordsDict;

}).call(this);

(function() {
  var Drawable, Tickable, UnaryDrawable,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Drawable = (function() {

    function Drawable() {}

    Drawable.prototype.drawAt = function(ctx, pos, options) {
      return JellyScore.error("Should draw something at (" + pos.x + ", " + pos.y + ") but I don't know what");
    };

    return Drawable;

  })();

  UnaryDrawable = (function(_super) {

    __extends(UnaryDrawable, _super);

    function UnaryDrawable(drawAtFunction) {
      this.drawAtFunction = drawAtFunction;
    }

    UnaryDrawable.prototype.drawAt = function(ctx, pos, options) {
      return this.drawAtFunction(ctx, pos, options);
    };

    return UnaryDrawable;

  })(Drawable);

  Tickable = (function(_super) {

    __extends(Tickable, _super);

    function Tickable() {
      this.parent = null;
    }

    Tickable.prototype.setParent = function(parent) {
      this.parent = parent;
    };

    Tickable.prototype.getTicks = function() {
      throw "getTicks has not been implemented in this class";
    };

    Tickable.prototype.getWidth = function() {
      throw "getWidth has not been implemented in this class";
    };

    Tickable.prototype.getLeftPadding = function() {
      throw "getLeftPadding has not been implemented in this class";
    };

    Tickable.prototype.getRightPadding = function() {
      throw "getRightPadding has not been implemented in this class";
    };

    Tickable.prototype.getTotalWidth = function(options) {
      return (this.getLeftPadding(options)) + (this.getWidth(options)) + (this.getRightPadding(options));
    };

    Tickable.prototype.getMinY = function() {
      throw "getRightPadding has not been implemented in this class";
    };

    Tickable.prototype.getMaxY = function() {
      throw "getRightPadding has not been implemented in this class";
    };

    Tickable.prototype.getMinResolution = function() {
      throw "getMinResolution has not been implemented in this class";
    };

    Tickable.prototype.getTarget = function() {
      return null;
    };

    Tickable.prototype.isPlayable = function() {
      return false;
    };

    Tickable.prototype.whoAmI = function() {
      return this.constructor;
    };

    Tickable.prototype.getVoice = function() {
      var parent;
      parent = this.parent;
      while ((parent != null) && !(parent instanceof JellyScore.Voice)) {
        parent = parent.parent;
      }
      return parent;
    };

    Tickable.prototype.getStaff = function() {
      var parent;
      parent = this.parent;
      while ((parent != null) && !(parent instanceof JellyScore.Staff)) {
        parent = parent.parent;
      }
      return parent;
    };

    Tickable.prototype.isSelectable = function() {
      return false;
    };

    Tickable.prototype.getLilyString = function() {
      return "";
    };

    return Tickable;

  })(Drawable);

  JellyScore.Drawable = Drawable;

  JellyScore.UnaryDrawable = UnaryDrawable;

  JellyScore.Tickable = Tickable;

}).call(this);

(function() {
  var KeyChange,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  KeyChange = (function(_super) {

    __extends(KeyChange, _super);

    function KeyChange(key) {
      if (key == null) {
        key = "treble";
      }
      KeyChange.__super__.constructor.call(this);
      if (typeof key === "object" && key.constructor === KeyChange) {
        this.key = key.key;
      } else {
        if (__indexOf.call(this.getValidKeys(), key) < 0) {
          throw "'" + key + "' is not a valid clef. The valid clefs are: " + (this.getValidKeys().join(', ')) + ".";
        }
        this.key = this.getClefObject(key);
      }
    }

    KeyChange.prototype.getTicks = function() {
      return 0;
    };

    KeyChange.prototype.getWidth = function(options) {
      return this.key.getWidth(options);
    };

    KeyChange.prototype.getLeftPadding = function(options) {
      return this.key.getLeftPadding(options);
    };

    KeyChange.prototype.getRightPadding = function(options) {
      return this.key.getRightPadding(options);
    };

    KeyChange.prototype.getMinY = function(options) {
      return this.key.getMinY(options);
    };

    KeyChange.prototype.getMaxY = function(options) {
      return this.key.getMaxY(options);
    };

    KeyChange.prototype.getHeight = function(options) {
      return this.key.getHeight(options);
    };

    KeyChange.prototype.getMinResolution = function() {
      return 0;
    };

    KeyChange.prototype.getValidKeys = function() {
      return ["treble", "violin", "G", "G2", "treble_8", "G_8", "treble^8", "G^8", "alto", "C", "tenor", "bass", "F", "bass_8", "F_8", "F^8", "bass^8", "french", "soprano", "mezzosoprano", "baritone", "varbaritone", "subbass", "percussion", "tab"];
    };

    KeyChange.prototype.getClef = function() {
      return this.key;
    };

    KeyChange.prototype.getClefObject = function(key) {
      switch (key) {
        case "treble":
        case "violin":
        case "G":
        case "G2":
          return new JellyScore.Clefs.Treble();
        case "treble_8":
        case "G_8":
          return new JellyScore.Clefs.Treble8();
        case "treble^8":
        case "G^8":
          return new JellyScore.Clefs.TrebleP8();
        case "bass":
        case "F":
          return new JellyScore.Clefs.Bass();
        case "bass_8":
        case "F_8":
          return new JellyScore.Clefs.Bass8();
        case "bass^8":
        case "F^8":
          return new JellyScore.Clefs.BassP8();
        case "percussion":
          return new JellyScore.Clefs.Percussion();
        case "tab":
          return new JellyScore.Clefs.Tab();
        default:
          return new JellyScore.Clefs.Treble();
      }
    };

    KeyChange.prototype.drawAt = function(ctx, pos, options) {
      var tabKey;
      if (options.isTabStaff === true) {
        tabKey = this.getClefObject('tab');
        return tabKey.drawAt(ctx, pos, options);
      } else {
        return this.key.drawAt(ctx, pos, options);
      }
    };

    KeyChange.prototype.getTarget = function() {
      return JellyScore.Staff;
    };

    KeyChange.prototype.convertToTab = function() {
      return this.key = this.getClefObject('tab');
    };

    KeyChange.prototype.getLilyString = function() {
      return "\\clef \"" + this.key.lilyValue + "\"";
    };

    return KeyChange;

  })(JellyScore.Tickable);

  JellyScore.KeyChange = KeyChange;

}).call(this);

(function() {
  var TimeChange,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TimeChange = (function(_super) {

    __extends(TimeChange, _super);

    function TimeChange(numBeats, beatValue) {
      if (numBeats == null) {
        numBeats = 4;
      }
      if (beatValue == null) {
        beatValue = 4;
      }
      TimeChange.__super__.constructor.call(this);
      if (typeof numBeats === "object") {
        this.numBeats = numBeats.numBeats;
        this.beatValue = numBeats.beatValue;
      } else {
        this.numBeats = numBeats;
        this.beatValue = beatValue;
      }
    }

    TimeChange.prototype.getTicks = function() {
      return 0;
    };

    TimeChange.prototype.getWidth = function(options) {
      if (this.numBeats < 10 && this.beatValue < 10) {
        return 14 * options.scale;
      } else {
        return ("" + (Math.max(this.numBeats, this.beatValue))).length * this.getStep(options);
      }
    };

    TimeChange.prototype.getLeftPadding = function(options) {
      return 12 * options.scale;
    };

    TimeChange.prototype.getRightPadding = function(options) {
      return 12 * options.scale;
    };

    TimeChange.prototype.getStep = function(options) {
      return 11 * options.scale;
    };

    TimeChange.prototype.getMinY = function() {
      return 0;
    };

    TimeChange.prototype.getMaxY = function(options) {
      return 30 * options.scale;
    };

    TimeChange.prototype.getMinResolution = function() {
      return 0;
    };

    TimeChange.prototype.getNumBeatsWidth = function(options) {
      return ("" + this.numBeats).length * this.getStep(options);
    };

    TimeChange.prototype.getBeatValueWidth = function(options) {
      return ("" + this.beatValue).length * this.getStep(options);
    };

    TimeChange.prototype.getBarDuration = function(resolution) {
      return resolution * this.numBeats / this.beatValue;
    };

    TimeChange.prototype.drawNumBeats = function(ctx, pos, options) {
      var number, p, _i, _len, _ref, _results;
      p = {
        x: pos.x + options.paddingLeft + (options.width - this.getNumBeatsWidth(options)) / 2,
        y: pos.y + (options.clef.getHeight(options)) / 2 - 14.9 * options.scale
      };
      _ref = "" + this.numBeats;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        number = _ref[_i];
        switch (number) {
          case '0':
            drawZero(ctx, p, options);
            break;
          case '1':
            drawOne(ctx, p, options);
            break;
          case '2':
            drawTwo(ctx, p, options);
            break;
          case '3':
            drawThree(ctx, p, options);
            break;
          case '4':
            drawFour(ctx, p, options);
            break;
          case '5':
            drawFive(ctx, p, options);
            break;
          case '6':
            drawSix(ctx, p, options);
            break;
          case '7':
            drawSeven(ctx, p, options);
            break;
          case '8':
            drawEight(ctx, p, options);
            break;
          case '9':
            drawNine(ctx, p, options);
        }
        _results.push(p.x += this.getStep(options));
      }
      return _results;
    };

    TimeChange.prototype.drawBeatValue = function(ctx, pos, options) {
      var number, p, _i, _len, _ref, _results;
      p = {
        x: pos.x + options.paddingLeft + (options.width - this.getBeatValueWidth(options)) / 2,
        y: pos.y + (options.clef.getHeight(options)) / 2
      };
      _ref = "" + this.beatValue;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        number = _ref[_i];
        switch (number) {
          case '0':
            drawZero(ctx, p, options);
            break;
          case '1':
            drawOne(ctx, p, options);
            break;
          case '2':
            drawTwo(ctx, p, options);
            break;
          case '3':
            drawThree(ctx, p, options);
            break;
          case '4':
            drawFour(ctx, p, options);
            break;
          case '5':
            drawFive(ctx, p, options);
            break;
          case '6':
            drawSix(ctx, p, options);
            break;
          case '7':
            drawSeven(ctx, p, options);
            break;
          case '8':
            drawEight(ctx, p, options);
            break;
          case '9':
            drawNine(ctx, p, options);
        }
        _results.push(p.x += this.getStep(options));
      }
      return _results;
    };

    TimeChange.prototype.drawAt = function(ctx, pos, options) {
      var keyHeight, p, tabKey;
      if (options.isTabStaff === true) {
        tabKey = new JellyScore.Clefs.Tab();
        keyHeight = tabKey.getHeight(options);
      } else {
        keyHeight = options.clef.getHeight(options);
      }
      p = {
        x: pos.x + options.paddingLeft + (options.width - this.getWidth(options)) / 2,
        y: pos.y + keyHeight / 2 - 14.7059 * options.scale
      };
      if (this.numBeats === 4 && this.beatValue === 4) {
        return drawCommonTime(ctx, p, options);
      } else if (this.numBeats === 2 && this.beatValue === 4) {
        return drawCutCommonTime(ctx, p, options);
      } else {
        this.drawNumBeats(ctx, pos, options);
        return this.drawBeatValue(ctx, pos, options);
      }
    };

    TimeChange.prototype.getTarget = function() {
      return JellyScore.Score;
    };

    TimeChange.prototype.getLilyString = function() {
      return "\\time " + this.numBeats + "/" + this.beatValue;
    };

    return TimeChange;

  })(JellyScore.Tickable);

  JellyScore.TimeChange = TimeChange;

}).call(this);

(function() {
  var TempoChange,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TempoChange = (function(_super) {

    __extends(TempoChange, _super);

    function TempoChange(reference, tempo) {
      if (typeof reference === "object" && reference.constructor === TempoChange) {
        this.reference = reference.reference;
        this.tempo = reference.tempo;
      } else {
        this.reference = reference;
        this.tempo = tempo;
      }
      TempoChange.__super__.constructor.call(this);
    }

    TempoChange.prototype.getTicks = function() {
      return 0;
    };

    TempoChange.prototype.getWidth = function() {
      return 0;
    };

    TempoChange.prototype.getLeftPadding = function() {
      return 0;
    };

    TempoChange.prototype.getRightPadding = function() {
      return 0;
    };

    TempoChange.prototype.getMinY = function() {
      return 0;
    };

    TempoChange.prototype.getMaxY = function() {
      return 0;
    };

    TempoChange.prototype.getMinResolution = function() {
      return 0;
    };

    TempoChange.prototype.getTarget = function() {
      return JellyScore.Score;
    };

    TempoChange.prototype.getLilyString = function() {
      return "\\tempo " + this.reference + "=" + this.tempo;
    };

    return TempoChange;

  })(JellyScore.Tickable);

  JellyScore.TempoChange = TempoChange;

}).call(this);

(function() {
  var KeySignatureChange,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  KeySignatureChange = (function(_super) {

    __extends(KeySignatureChange, _super);

    function KeySignatureChange(key, major) {
      KeySignatureChange.__super__.constructor.call(this);
      if (typeof key === "object" && key.constructor === KeySignatureChange) {
        this.key = key.key;
        this.major = key.major;
      } else {
        this.key = key;
        this.major = major;
      }
      this.accidentals = this.getAccidental(this.key, this.major);
      this.sharp = false;
    }

    KeySignatureChange.prototype.getTicks = function() {
      return 0;
    };

    KeySignatureChange.prototype.getWidth = function(options) {
      if (this.accidentals.length > 0) {
        return (this.getStep(options)) * this.accidentals.length;
      } else {
        return 0;
      }
    };

    KeySignatureChange.prototype.getLeftPadding = function(options) {
      if (this.accidentals.length > 0) {
        return 8 * options.scale;
      } else {
        return 0;
      }
    };

    KeySignatureChange.prototype.getRightPadding = function(options) {
      if (this.accidentals.length > 0) {
        return 8 * options.scale;
      } else {
        return 0;
      }
    };

    KeySignatureChange.prototype.getStep = function(options) {
      return 8 * options.scale;
    };

    KeySignatureChange.prototype.getMinY = function(options) {
      return 0;
    };

    KeySignatureChange.prototype.getMaxY = function(options) {
      return 0;
    };

    KeySignatureChange.prototype.getMinResolution = function() {
      return 0;
    };

    KeySignatureChange.prototype.getTarget = function() {
      return JellyScore.Staff;
    };

    KeySignatureChange.prototype.getPosition = function(clef, scale) {
      if (scale == null) {
        scale = 1;
      }
      return clef.getKeySignaturePosition(this, scale);
    };

    KeySignatureChange.prototype.drawAt = function(ctx, pos, options) {
      var accidental, positionFunction, x, y, _i, _len, _ref, _results;
      if (options.isTabStaff !== true) {
        positionFunction = this.drawingFunction === JellyScore.Sharp ? options.clef.getSharpPosition : options.clef.getFlatPosition;
        x = pos.x + options.paddingLeft;
        _ref = this.accidentals;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          accidental = _ref[_i];
          y = pos.y + positionFunction(accidental, options.scale);
          this.drawingFunction.drawAt(ctx, {
            x: x,
            y: y
          }, options);
          _results.push(x += this.getStep(options));
        }
        return _results;
      }
    };

    KeySignatureChange.prototype.getAccidental = function(key, major) {
      if (major) {
        switch (key) {
          case "g":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3];
          case "d":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0];
          case "a":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4];
          case "e":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1];
          case "b":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1, 5];
          case "fis":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1, 5, 2];
          case "cis":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1, 5, 2, 6];
          case "f":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6];
          case "bes":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2];
          case "ees":
          case "es":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5];
          case "aes":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1];
          case "des":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1, 4];
          case "ges":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1, 4, 0];
          case "ces":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1, 4, 0, 3];
          default:
            return this.accidentals = [];
        }
      } else {
        switch (key) {
          case "e":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3];
          case "b":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0];
          case "fis":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4];
          case "cis":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1];
          case "gis":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1, 5];
          case "dis":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1, 5, 2];
          case "ais":
            this.drawingFunction = JellyScore.Sharp;
            return this.accidentals = [3, 0, 4, 1, 5, 2, 6];
          case "d":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6];
          case "g":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2];
          case "c":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5];
          case "f":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1];
          case "bes":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1, 4];
          case "ees":
          case "es":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1, 4, 0];
          case "aes":
            this.drawingFunction = JellyScore.Flat;
            return this.accidentals = [6, 2, 5, 1, 4, 0, 3];
          default:
            return this.accidentals = [];
        }
      }
    };

    KeySignatureChange.prototype.getSignature = function() {
      var i, signature;
      signature = {};
      i = 0;
      while (i < 7) {
        signature[i] = __indexOf.call(this.accidentals, i) >= 0 ? this.drawingFunction === JellyScore.Sharp ? 1 : -1 : 0;
        i++;
      }
      return signature;
    };

    KeySignatureChange.prototype.hash = function() {
      return this.key + this.major;
    };

    KeySignatureChange.prototype.getLilyString = function() {
      var string;
      string = "\\key " + this.key;
      if (this.major) {
        return string += "\\major ";
      }
    };

    return KeySignatureChange;

  })(JellyScore.Tickable);

  JellyScore.KeySignatureChange = KeySignatureChange;

}).call(this);

(function() {
  var Flat, Natural, Note, Sharp, TabNote, TabTie, Tie,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Sharp = new JellyScore.UnaryDrawable(function(ctx, pos, options) {
    return JS.Drawings.drawSharp(ctx, pos, options);
  });

  Flat = new JellyScore.UnaryDrawable(function(ctx, pos, options) {
    return JS.Drawings.drawFlat(ctx, pos, options);
  });

  Natural = new JellyScore.UnaryDrawable(function(ctx, pos, options) {
    return JS.Drawings.drawNatural(ctx, pos, options);
  });

  Note = (function(_super) {

    __extends(Note, _super);

    function Note(note) {
      Note.__super__.constructor.call(this);
      this.accidentals = 0;
      this.options = {};
      this.autoBeam = true;
      this.autoStem = true;
      if (typeof note === "number") {
        this.note = note;
        this.hammer = false;
        this.letring = false;
        this.slideType = null;
        this.palmMute = false;
      } else {
        this.note = note.getNote();
        this.setOctave(note.getOctave());
        this.accidentals = note.accidentals;
        this.setDuration(note.getDuration());
        this.setTransposition(note.getTransposition());
        this.stringNbr = note.stringNbr;
        this.palmMute = note.palmMute;
        this.letRing = note.letRing;
        this.vibrato = note.vibrato;
        this.options = note.options;
        if ((note.hammerFrom != null) && (note.hammerFrom.tabNote != null)) {
          this.hammerFrom = note.hammerFrom.tabNote;
          note.hammerFrom.tabNote.hammerRef = this;
        }
        if ((note.slideFrom != null) && (note.slideFrom.tabNote != null)) {
          this.slideFrom = note.slideFrom.tabNote;
          note.slideFrom.tabNote.slideRef = this;
        }
        if (note.hammer === true || (note.slideType != null) || (note.tieTo != null)) {
          note.tabNote = this;
        }
        if (note.bendPitchArr != null) {
          this.bendPitchArr = note.bendPitchArr;
        }
        if (note.bendTimeArr != null) {
          this.bendTimeArr = note.bendTimeArr;
        }
        if (note.slideType != null) {
          this.slideType = note.slideType;
        }
      }
    }

    Note.prototype.getTicks = function(resolution) {
      if (!this.grace) {
        return this.duration.getTicks(resolution);
      } else {
        return 0;
      }
    };

    Note.prototype.getTicksDuration = function(resolution) {
      if (this.noteTieTo != null) {
        return (this.duration.getTicks(resolution)) + this.noteTieTo.getTicksDuration(resolution);
      } else {
        return this.duration.getTicks(resolution);
      }
    };

    Note.prototype.getWidth = function(options) {
      return 9.5 * options.scale;
    };

    Note.prototype.getLeftPadding = function(options) {
      return (6 + 12 * (this.getAccidentals(options)).length) * options.scale;
    };

    Note.prototype.getRightPadding = function(options) {
      return 2 + 9 * options.scale * this.duration.getTicks(8);
    };

    Note.prototype.getMinY = function(options) {
      var minY;
      if ((options.isTabStaff != null) && options.isTabStaff === true) {
        return 0;
      }
      minY = (this.getPosition(options.clef, options.scale)) - 22 * options.scale;
      if (this.duration.base >= 16) {
        minY -= 7.5 * options.scale;
      }
      return minY;
    };

    Note.prototype.getMaxY = function(options) {
      if ((options.isTabStaff != null) && options.isTabStaff === true) {
        return this.getStringNbr() * 16 * options.scale;
      } else {
        return 20 * options.scale + this.getPosition(options.clef, options.scale);
      }
    };

    Note.prototype.getMinResolution = function() {
      if (!this.grace) {
        return this.duration.getMinResolution();
      } else {
        return 1;
      }
    };

    Note.prototype.getTarget = function() {
      return JellyScore.Voice;
    };

    Note.prototype.setOptions = function(options) {
      if (options != null) {
        return $.extend(this.options, options);
      }
    };

    Note.prototype.addAccidental = function(accidental) {
      return this.accidentals += accidental;
    };

    Note.prototype.getNote = function() {
      return this.note;
    };

    Note.prototype.getOctave = function() {
      return this.octave;
    };

    Note.prototype.setOctave = function(octave) {
      return this.octave = octave;
    };

    Note.prototype.getPitch = function() {
      return this.getNote() + this.getOctave() * 7;
    };

    Note.prototype.getValue = function() {
      var pitch;
      pitch = this.accidentals + this.getOctave() * 12 + (function() {
        switch (this.getNote()) {
          case 0:
            return 0;
          case 1:
            return 2;
          case 2:
            return 4;
          case 3:
            return 5;
          case 4:
            return 7;
          case 5:
            return 9;
          case 6:
            return 11;
          default:
            throw this.ERRORS.NOTE_ERROR(this.getNote());
        }
      }).call(this);
      if (this.transposition != null) {
        pitch += this.transposition;
      }
      if (this.capo != null) {
        JellyScore.log("YES CAPO", this.capo);
        pitch += this.capo;
      }
      return pitch;
    };

    Note.prototype.setMidiNote = function(midiNote) {
      var midiNoteMod12;
      this.setOctave(Math.floor(midiNote / 12));
      midiNoteMod12 = midiNote % 12;
      this.note = (function() {
        switch (midiNoteMod12) {
          case 0:
            return 0;
          case 1:
            return 0;
          case 2:
            return 1;
          case 3:
            return 1;
          case 4:
            return 2;
          case 5:
            return 3;
          case 6:
            return 3;
          case 7:
            return 4;
          case 8:
            return 4;
          case 9:
            return 5;
          case 10:
            return 5;
          case 11:
            return 6;
        }
      })();
      return this.accidentals = (function() {
        switch (midiNoteMod12) {
          case 1:
            return 1;
          case 3:
            return 1;
          case 6:
            return 1;
          case 8:
            return 1;
          case 10:
            return 1;
          default:
            return 0;
        }
      })();
    };

    Note.prototype.setTransposition = function(transposition) {
      this.transposition = transposition;
    };

    Note.prototype.getTransposition = function() {
      return this.transposition;
    };

    Note.prototype.setCapo = function(capo) {
      this.capo = capo;
    };

    Note.prototype.setDuration = function(duration) {
      this.duration = duration;
    };

    Note.prototype.getDuration = function() {
      return this.duration;
    };

    Note.prototype.getPosition = function(clef, scale) {
      if (scale == null) {
        scale = 1;
      }
      return clef.getPosition(this, scale);
    };

    Note.prototype.tieTo = function(noteTieTo) {
      this.noteTieTo = noteTieTo;
    };

    Note.prototype.tieFrom = function(noteTieFrom) {
      this.noteTieFrom = noteTieFrom;
    };

    Note.prototype.beamTo = function(noteBeamTo) {
      this.noteBeamTo = noteBeamTo;
    };

    Note.prototype.beamFrom = function(noteBeamFrom) {
      this.noteBeamFrom = noteBeamFrom;
      if (this.noteBeamFrom != null) {
        return this.noteBeamFrom.beamTo(this);
      }
    };

    Note.prototype.setStringNbr = function(string) {
      return this.stringNbr = string;
    };

    Note.prototype.getStringNbr = function(tuning) {
      var l, v;
      if (this.stringNbr != null) {
        return this.stringNbr - 1;
      } else {
        if (tuning != null) {
          l = 0;
          v = this.getValue();
          while (l < tuning.length && v - tuning[l] < 0) {
            ++l;
          }
          this.stringNbr = l + 1;
          return l;
        } else {
          return 0;
        }
      }
    };

    Note.prototype.toGrace = function() {
      return this.grace = true;
    };

    Note.prototype.setStemDirection = function(stemDirection) {
      this.stemDirection = stemDirection === true;
      return this.autoStem = false;
    };

    Note.prototype.setInverse = function(inverse) {
      this.inverse = inverse;
    };

    Note.prototype.getAccidentals = function(options) {
      var accidentals, tmp;
      accidentals = [];
      if (this.accidentals - options.keysignature[this.note] !== 0) {
        if (this.accidentals === 0) {
          accidentals.push(JellyScore.Natural);
        } else {
          tmp = this.accidentals;
          while (tmp < 0) {
            accidentals.push(JellyScore.Flat);
            tmp++;
          }
          while (tmp > 0) {
            accidentals.push(JellyScore.Sharp);
            tmp--;
          }
        }
      }
      return accidentals;
    };

    Note.prototype.drawAccidentals = function(ctx, pos, options) {
      var accidental, accidentals, p, _i, _len;
      if (this.accidentals - options.keysignature[this.note] !== 0) {
        accidentals = this.getAccidentals(options);
        p = {
          x: pos.x + options.paddingLeft - 10 * options.scale,
          y: pos.y
        };
        for (_i = 0, _len = accidentals.length; _i < _len; _i++) {
          accidental = accidentals[_i];
          accidental.drawAt(ctx, p, options);
          p.x -= 4.5 * options.scale;
        }
        return options.keysignature[this.note] = this.accidentals;
      }
    };

    Note.prototype.getNoteHead = function(defaultHead) {
      var _ref;
      if (defaultHead == null) {
        defaultHead = JS.Drawings.drawNoteHead;
      }
      if (((_ref = this.options.NoteHead) != null ? _ref.style : void 0) === "cross") {
        return JS.Drawings.drawDeadNote;
      } else {
        return defaultHead;
      }
    };

    Note.prototype.deleteBeam = function() {
      if (this.noteBeamFrom != null) {
        this.noteBeamFrom.noteBeamTo = null;
        this.noteBeamFrom = null;
      }
      if (this.noteBeamTo != null) {
        this.noteBeamTo.noteBeamFrom = null;
        return this.noteBeamTo = null;
      }
    };

    Note.prototype.drawAt = function(ctx, pos, options) {
      var i, noteHeadFunction, position, tmpPosition, x, y, _i, _ref, _results;
      if (options.isTabStaff === true) {
        return this.drawTabAt(ctx, pos, options);
      }
      position = this.getPosition(options.clef, options.scale);
      y = pos.y + position;
      x = pos.x + options.paddingLeft + (options.width - this.getWidth(options));
      if (this.inverse) {
        if (this.duration.base === 1) {
          x += 11.5 * options.scale;
        } else if ((!this.autoStem && this.stemDirection) || (this.autoStem && options.clef.getStemDirection(this.getPitch()))) {
          x += 9.5 * options.scale;
        } else {
          x -= 9.5 * options.scale;
        }
      }
      this.drawAccidentals(ctx, {
        x: pos.x,
        y: y
      }, options);
      this.ctx = ctx;
      this.pos = {
        x: x,
        y: y,
        initialY: pos.y
      };
      this.layer = {
        x: x,
        y: y,
        width: 7 * options.scale,
        height: 8 * options.scale
      };
      switch (this.duration.base) {
        case 1:
          noteHeadFunction = this.getNoteHead(JS.Drawings.drawWholeNote);
          noteHeadFunction(ctx, {
            x: x,
            y: y
          }, options);
          break;
        case 2:
          noteHeadFunction = this.getNoteHead(JS.Drawings.drawHalfNoteHead);
          noteHeadFunction(ctx, {
            x: x,
            y: y
          }, options);
          this.drawStem(ctx, this.pos, options);
          break;
        default:
          noteHeadFunction = this.getNoteHead(JS.Drawings.drawNoteHead);
          noteHeadFunction(ctx, {
            x: x,
            y: y
          }, options);
          if (options.stem !== false) {
            if (this.duration.base === 4) {
              this.drawStem(ctx, this.pos, options);
            } else {
              this.drawBeam(ctx, this.pos, options);
            }
          }
      }
      tmpPosition = Math.round(((this.getPosition(options.clef, 1)) - 47.71) / 3.67);
      while (tmpPosition >= 0) {
        if (tmpPosition % 2 === 0) {
          JS.Drawings.drawStaffExtender(ctx, {
            x: x,
            y: pos.y + ((350 + 25 * tmpPosition) / 6.8) * options.scale
          }, options);
        }
        tmpPosition--;
      }
      while (tmpPosition <= -12) {
        if (tmpPosition % 2 === 0) {
          JS.Drawings.drawStaffExtender(ctx, {
            x: x,
            y: pos.y + ((350 + 25 * tmpPosition) / 6.8) * options.scale
          }, options);
        }
        tmpPosition++;
      }
      _results = [];
      for (i = _i = 0, _ref = this.duration.dots; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(JS.Drawings.drawDot(ctx, {
          x: x + 10 * i * options.scale,
          y: y
        }, options));
      }
      return _results;
    };

    Note.prototype.drawStem = function(ctx, pos, options) {
      if (options.stem !== false && this.duration.base > 1) {
        if (!(this.noteBeamFrom != null) && !(this.noteBeamTo != null)) {
          if ((!this.autoStem && this.stemDirection) || (this.autoStem && options.clef.getStemDirection(this.getPitch()))) {
            JS.Drawings.drawRightStem(ctx, pos, options);
            if (this.duration.base === 8) {
              return JS.Drawings.drawSingleFlagDown(ctx, pos, options);
            } else if (this.duration.base >= 16) {
              return JS.Drawings.drawDoubleFlagDown(ctx, pos, options);
            }
          } else {
            JS.Drawings.drawLeftStem(ctx, pos, options);
            if (this.duration.base === 8) {
              return JS.Drawings.drawSingleFlagUp(ctx, pos, options);
            } else if (this.duration.base >= 16) {
              return JS.Drawings.drawDoubleFlagUp(ctx, pos, options);
            }
          }
        }
      }
    };

    Note.prototype.drawBeam = function(ctx, pos, options) {
      var beam;
      if ((this.noteBeamFrom != null) || (this.noteBeamTo != null)) {
        if (!(this.noteBeamTo != null) && (this.noteBeamFrom != null) && !options.highlight) {
          beam = new JellyScore.Beam(this);
          return beam.draw(ctx, options);
        }
      } else {
        return this.drawStem(ctx, pos, options);
      }
    };

    Note.prototype.isPlayable = function() {
      return true;
    };

    Note.prototype.isMute = function() {
      return this.getNoteHead() === JS.Drawings.drawDeadNote;
    };

    Note.prototype.convertToTab = function() {
      return this.__proto__ = TabNote.prototype;
    };

    Note.prototype.getPositionOnFret = function(fret) {
      var tab, value;
      value = this.getValue();
      if (this.capo != null) {
        value -= this.capo;
      }
      tab = this.parent;
      while ((tab != null) && tab.whoAmI() !== JellyScore.TabStaff) {
        tab = tab.parent;
      }
      if (tab != null) {
        return value - tab.tuning[this.getStringNbr(tab.tuning)];
      } else {
        return 0;
      }
    };

    Note.prototype.isSelectable = function() {
      return true;
    };

    Note.prototype.drawTabAt = function(ctx, pos, options) {
      var MarginPrebend, bendLength, bendNbr, bendPitch, bendPosition, cleanedBendPitchArr, hammerOn, i, lastVariation, noteHead, number, numberWidth, paddingRight, slideup, string, value, widthNumber, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
      string = this.getStringNbr();
      y = pos.y + options.scale * 75 / 6.8 + string * 80 / 6.8 * options.scale;
      x = pos.x + options.paddingLeft + (options.width - this.getWidth(options)) / 2;
      noteHead = this.getNoteHead(0);
      this.pos = {
        x: x,
        y: y
      };
      if (noteHead !== 0) {
        noteHead(ctx, {
          x: x,
          y: y
        }, options);
      } else {
        value = this.getPositionOnFret(string);
        if (value >= 0) {
          value = "" + value;
          ctx.clearRect(x, y, (8.81 + 6 * (value.length - 1)) * options.scale, 10.05 * options.scale);
          x += options.scale;
          if (value === "1") {
            x += options.scale;
          }
          numberWidth = 0;
          for (_i = 0, _len = value.length; _i < _len; _i++) {
            number = value[_i];
            JellyScore.getDrawingNumber(number)(ctx, {
              x: x,
              y: y
            }, options);
            numberWidth += 6 * options.scale;
            x += 6 * options.scale;
          }
          numberWidth += 2 * options.scale;
        }
        if (!(options.inChord != null) || options.inChord === false) {
          /*if @letRing and !options.lrStart?
              options.lrStart = 
                  x: pos.x + options.paddingLeft + options.width - ((@getWidth options) / 2)
                  y: pos.y
          else if (!@letRing or options.isEol) and options.lrStart?
              startPos = options.lrStart
              endPos = 
                  x: pos.x
                  y: pos.y
              if options.isEol then endPos.x += options.paddingRight + options.width
              JS.Drawings.drawLetRing ctx, startPos, endPos, options
              delete options.lrStart
          
          #palm mute
          if @palmMute and !options.pmStart?
              options.pmStart = 
                  x: pos.x + options.paddingLeft + options.width - ((@getWidth options) / 2)
                  y: pos.y
          else if (@palmMute == false or options.isEol) and options.pmStart?
              startPos = options.pmStart
              endPos = 
                  x: pos.x
                  y: pos.y
              if options.isEol then endPos.x += options.paddingRight + options.width
              JS.Drawings.drawPalmMute ctx, startPos, endPos, options              
              delete options.pmStart
          
          #vibrato
          if @vibrato and !options.vibStart?
              options.vibStart = 
                  x: pos.x + options.paddingLeft + options.width - ((@getWidth options) / 2)
                  y: pos.y
          else if (@vibrato == false or options.isEol) and options.vibStart?
              startPos = options.vibStart
              endPos = 
                  x: pos.x
                  y: pos.y
              if options.isEol then endPos.x += options.paddingRight + options.width
              JS.Drawings.drawVibrato ctx, startPos, endPos, options              
              delete options.vibStart
          */

        }
        if (this.bendPitchArr != null) {
          lastVariation = null;
          cleanedBendPitchArr = [];
          _ref = this.bendPitchArr;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            bendPitch = _ref[_j];
            bendPitch = parseInt(bendPitch);
            if (!(lastVariation != null) || bendPitch !== lastVariation) {
              cleanedBendPitchArr.push(bendPitch);
              lastVariation = bendPitch;
            }
          }
          bendPosition = {
            x: x + (2 * options.scale),
            y: y
          };
          i = 0;
          lastVariation = 0;
          MarginPrebend = 0;
          bendNbr = cleanedBendPitchArr.length - 1;
          paddingRight = options.paddingRight;
          if ((options.isEol != null) && options.isEol === true) {
            paddingRight -= 6 * options.scale;
          }
          for (_k = 0, _len2 = cleanedBendPitchArr.length; _k < _len2; _k++) {
            bendPitch = cleanedBendPitchArr[_k];
            if (value.length === 1) {
              bendLength = (paddingRight + 5.5) / bendNbr;
            } else {
              bendLength = (paddingRight - 0.5) / bendNbr;
            }
            if (i === 0 && bendPitch !== 0) {
              JS.Drawings.drawVerticalBend(ctx, bendPosition, 0, options, bendPitch);
              MarginPrebend = -7;
            } else if (lastVariation < bendPitch) {
              bendPosition.y += MarginPrebend;
              JS.Drawings.drawUpBend(ctx, bendPosition, bendLength, options, bendPitch);
              bendPosition.x += bendLength;
              MarginPrebend = 0;
            } else if (lastVariation > bendPitch) {
              JS.Drawings.drawDownBend(ctx, bendPosition, bendLength, options);
              bendPosition.x += bendLength;
              MarginPrebend = 0;
            }
            lastVariation = bendPitch;
            i++;
          }
        }
      }
      if (this.hammerFrom != null) {
        hammerOn = this.hammerFrom.getValue() < this.getValue() ? true : false;
        if (this.hammerFrom.pos.y < this.pos.y) {
          JS.Drawings.drawHammer(ctx, {
            x: this.pos.x - 40 * options.scale,
            y: this.pos.y
          }, this.pos, options, hammerOn);
          JS.Drawings.drawHammer(ctx, this.hammerFrom.pos, {
            x: this.hammerFrom.pos.x + 40 * options.scale,
            y: this.hammerFrom.pos.y
          }, options, hammerOn);
        } else {
          JS.Drawings.drawHammer(ctx, this.hammerFrom.pos, this.pos, options, hammerOn);
        }
      }
      if (this.slideType != null) {
        if (this.slideType === 3) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x + numberWidth + (10 * options.scale),
            y: this.pos.y
          }, {
            x: this.pos.x + numberWidth,
            y: this.pos.y
          }, options, true);
        } else if (this.slideType === 4) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x + numberWidth + (10 * options.scale),
            y: this.pos.y
          }, {
            x: this.pos.x + numberWidth,
            y: this.pos.y
          }, options, false);
        } else if (this.slideType === 5) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x - (16 * options.scale),
            y: this.pos.y
          }, this.pos, options, true);
        } else if (this.slideType === 6) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x - (16 * options.scale),
            y: this.pos.y
          }, this.pos, options, false);
        }
      }
      if ((this.slideFrom != null) && (this.slideFrom.slideType === 0 || this.slideFrom.slideType === 1 || this.slideFrom.slideType === 2)) {
        JellyScore.log("slideType: ", this.slideFrom.slideType);
        widthNumber = 0;
        if (this.slideFrom.whoAmI() !== JellyScore.Tie) {
          string = this.slideFrom.getStringNbr();
          value = this.slideFrom.getPositionOnFret(string);
          _ref1 = value.toString();
          for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
            number = _ref1[_l];
            widthNumber += 6 * options.scale;
          }
        }
        slideup = this.slideFrom.getValue() < this.getValue() ? true : false;
        if (this.slideFrom.pos.y < this.pos.y) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x - 40 * options.scale,
            y: this.pos.y
          }, this.pos, options, slideup);
          return JS.Drawings.drawSlide(ctx, {
            x: this.slideFrom.pos.x + widthNumber,
            y: this.slideFrom.pos.y
          }, {
            x: this.slideFrom.pos.x + 40 * options.scale,
            y: this.slideFrom.pos.y
          }, options, slideup);
        } else {
          return JS.Drawings.drawSlide(ctx, {
            x: this.slideFrom.pos.x + widthNumber,
            y: this.slideFrom.pos.y
          }, this.pos, options, slideup);
        }
      }
    };

    Note.prototype.getLilyString = function() {
      var i, notes, octave, pitch, string, time, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2;
      notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
      string = "";
      if ((this.bendPitchArr != null) && (this.bendTimeArr != null)) {
        string += "\\bendAfter #";
        _ref = this.bendPitchArr;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          pitch = _ref[i];
          if (i > 0) {
            string += "-";
          }
          string += pitch;
        }
        string += "#";
        _ref1 = this.bendTimeArr;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          time = _ref1[i];
          if (i > 0) {
            string += "-";
          }
          string += time;
        }
        string += " ";
      }
      if (this.hammer) {
        string += "\\hammer ";
      }
      if (this.letring) {
        string += "\\letring ";
      }
      if (this.palmMute) {
        string += "\\palmMute ";
      }
      string += notes[this.note];
      if (this.accidentals > 0) {
        string += "is";
      }
      for (octave = _k = 0, _ref2 = this.octave - 4; 0 <= _ref2 ? _k <= _ref2 : _k >= _ref2; octave = 0 <= _ref2 ? ++_k : --_k) {
        if (octave > 0) {
          string += "'";
        }
        if (octave < 0) {
          string += ",";
        }
      }
      if (this.noteTieTo != null) {
        string += '~';
      }
      return string += "\\" + this.stringNbr + " ";
    };

    return Note;

  })(JellyScore.Tickable);

  JellyScore.getDrawingNumber = function(number) {
    switch (number) {
      case '0':
      case 0:
        return JS.Drawings.drawTabZero;
      case '1':
      case 1:
        return JS.Drawings.drawTabOne;
      case '2':
      case 2:
        return JS.Drawings.drawTabTwo;
      case '3':
      case 3:
        return JS.Drawings.drawTabThree;
      case '4':
      case 4:
        return JS.Drawings.drawTabFour;
      case '5':
      case 5:
        return JS.Drawings.drawTabFive;
      case '6':
      case 6:
        return JS.Drawings.drawTabSix;
      case '7':
      case 7:
        return JS.Drawings.drawTabSeven;
      case '8':
      case 8:
        return JS.Drawings.drawTabEight;
      case '9':
      case 9:
        return JS.Drawings.drawTabNine;
    }
  };

  TabNote = (function(_super) {

    __extends(TabNote, _super);

    function TabNote(note) {
      TabNote.__super__.constructor.call(this, note);
    }

    TabNote.prototype.getWidth = function(options) {
      return ("" + (this.getPositionOnFret(this.getStringNbr()))).length * 5 * options.scale;
    };

    TabNote.prototype.getMinY = function(options) {
      return 0;
    };

    TabNote.prototype.getMaxY = function(options) {
      return this.getStringNbr() * 16 * options.scale;
    };

    TabNote.prototype.getPositionOnFret = function(fret) {
      var tab, value;
      value = this.getValue();
      if (this.capo != null) {
        value -= this.capo;
      }
      tab = this.parent;
      while ((tab != null) && tab.whoAmI() !== JellyScore.TabStaff) {
        tab = tab.parent;
      }
      if (tab != null) {
        return value - tab.tuning[this.getStringNbr(tab.tuning)];
      } else {
        return 0;
      }
    };

    TabNote.prototype.drawAt = function(ctx, pos, options) {
      var MarginPrebend, bendLength, bendNbr, bendPitch, bendPosition, cleanedBendPitchArr, hammerOn, i, lastVariation, noteHead, number, numberWidth, paddingRight, slideup, string, value, widthNumber, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
      string = this.getStringNbr();
      y = pos.y + options.scale * 75 / 6.8 + string * 80 / 6.8 * options.scale;
      x = pos.x + options.paddingLeft + (options.width - this.getWidth(options)) / 2;
      noteHead = this.getNoteHead(0);
      this.pos = {
        x: x,
        y: y
      };
      this.ctx = ctx;
      if (noteHead !== 0) {
        noteHead(ctx, {
          x: x,
          y: y
        }, options);
      } else {
        value = this.getPositionOnFret(string);
        if (value >= 0) {
          value = "" + value;
          ctx.clearRect(x, y, (8.81 + 6 * (value.length - 1)) * options.scale, 10.05 * options.scale);
          x += options.scale;
          if (value === "1") {
            x += options.scale;
          }
          numberWidth = 0;
          for (_i = 0, _len = value.length; _i < _len; _i++) {
            number = value[_i];
            JellyScore.getDrawingNumber(number)(ctx, {
              x: x,
              y: y
            }, options);
            numberWidth += 6 * options.scale;
            x += 6 * options.scale;
          }
          numberWidth += 2 * options.scale;
        }
        if (!(options.inChord != null) || options.inChord === false) {
          /*if @letRing and !options.lrStart?
              options.lrStart = 
                  x: pos.x + options.paddingLeft + options.width - ((@getWidth options) / 2)
                  y: pos.y
          else if (!@letRing or options.isEol) and options.lrStart?
              startPos = options.lrStart
              endPos = 
                  x: pos.x
                  y: pos.y
              if options.isEol then endPos.x += options.paddingRight + options.width
              JS.Drawings.drawLetRing ctx, startPos, endPos, options
              delete options.lrStart
          
          #palm mute
          if @palmMute and !options.pmStart?
              options.pmStart = 
                  x: pos.x + options.paddingLeft + options.width - ((@getWidth options) / 2)
                  y: pos.y
          else if (@palmMute == false or options.isEol) and options.pmStart?
              startPos = options.pmStart
              endPos = 
                  x: pos.x
                  y: pos.y
              if options.isEol then endPos.x += options.paddingRight + options.width
              JS.Drawings.drawPalmMute ctx, startPos, endPos, options              
              delete options.pmStart
          
          #vibrato
          if @vibrato and !options.vibStart?
              options.vibStart = 
                  x: pos.x + options.paddingLeft + options.width - ((@getWidth options) / 2)
                  y: pos.y
          else if (@vibrato == false or options.isEol) and options.vibStart?
              startPos = options.vibStart
              endPos = 
                  x: pos.x
                  y: pos.y
              if options.isEol then endPos.x += options.paddingRight + options.width
              JS.Drawings.drawVibrato ctx, startPos, endPos, options              
              delete options.vibStart
          */

        }
        if (this.bendPitchArr != null) {
          lastVariation = null;
          cleanedBendPitchArr = [];
          _ref = this.bendPitchArr;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            bendPitch = _ref[_j];
            bendPitch = parseInt(bendPitch);
            if (!(lastVariation != null) || bendPitch !== lastVariation) {
              cleanedBendPitchArr.push(bendPitch);
              lastVariation = bendPitch;
            }
          }
          bendPosition = {
            x: x + (2 * options.scale),
            y: y
          };
          i = 0;
          lastVariation = 0;
          MarginPrebend = 0;
          bendNbr = cleanedBendPitchArr.length - 1;
          paddingRight = options.paddingRight;
          if ((options.isEol != null) && options.isEol === true) {
            paddingRight -= 6 * options.scale;
          }
          for (_k = 0, _len2 = cleanedBendPitchArr.length; _k < _len2; _k++) {
            bendPitch = cleanedBendPitchArr[_k];
            if (value.length === 1) {
              bendLength = (paddingRight + 5.5) / bendNbr;
            } else {
              bendLength = (paddingRight - 0.5) / bendNbr;
            }
            if (i === 0 && bendPitch !== 0) {
              JS.Drawings.drawVerticalBend(ctx, bendPosition, 0, options, bendPitch);
              MarginPrebend = -7;
            } else if (lastVariation < bendPitch) {
              bendPosition.y += MarginPrebend;
              JS.Drawings.drawUpBend(ctx, bendPosition, bendLength, options, bendPitch);
              bendPosition.x += bendLength;
              MarginPrebend = 0;
            } else if (lastVariation > bendPitch) {
              JS.Drawings.drawDownBend(ctx, bendPosition, bendLength, options);
              bendPosition.x += bendLength;
              MarginPrebend = 0;
            }
            lastVariation = bendPitch;
            i++;
          }
        }
      }
      if (this.hammerFrom != null) {
        hammerOn = this.hammerFrom.getValue() < this.getValue() ? true : false;
        if (this.hammerFrom.pos.x > this.pos.x) {
          JS.Drawings.drawHammer(ctx, {
            x: this.pos.x - 40 * options.scale,
            y: this.pos.y
          }, this.pos, options, hammerOn);
          JS.Drawings.drawHammer(this.hammerFrom.ctx, this.hammerFrom.pos, {
            x: this.hammerFrom.pos.x + 40 * options.scale,
            y: this.hammerFrom.pos.y
          }, options, hammerOn);
        } else {
          JS.Drawings.drawHammer(ctx, this.hammerFrom.pos, this.pos, options, hammerOn);
        }
      }
      if (this.slideType != null) {
        if (this.slideType === 3) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x + numberWidth + (10 * options.scale),
            y: this.pos.y
          }, {
            x: this.pos.x + numberWidth,
            y: this.pos.y
          }, options, true);
        } else if (this.slideType === 4) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x + numberWidth + (10 * options.scale),
            y: this.pos.y
          }, {
            x: this.pos.x + numberWidth,
            y: this.pos.y
          }, options, false);
        } else if (this.slideType === 5) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x - (16 * options.scale),
            y: this.pos.y
          }, this.pos, options, true);
        } else if (this.slideType === 6) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x - (16 * options.scale),
            y: this.pos.y
          }, this.pos, options, false);
        }
      }
      if ((this.slideFrom != null) && (this.slideFrom.slideType === 0 || this.slideFrom.slideType === 1 || this.slideFrom.slideType === 2)) {
        JellyScore.log("slideType: ", this.slideFrom.slideType);
        widthNumber = 0;
        if (this.slideFrom.whoAmI() !== JellyScore.Tie) {
          string = this.slideFrom.getStringNbr();
          value = this.slideFrom.getPositionOnFret(string);
          _ref1 = value.toString();
          for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
            number = _ref1[_l];
            widthNumber += 6 * options.scale;
          }
        }
        slideup = this.slideFrom.getValue() < this.getValue() ? true : false;
        if (this.slideFrom.pos.x > this.pos.x) {
          JS.Drawings.drawSlide(ctx, {
            x: this.pos.x - 40 * options.scale,
            y: this.pos.y
          }, this.pos, options, slideup);
          return JS.Drawings.drawSlide(this.slideFrom.ctx, {
            x: this.slideFrom.pos.x + widthNumber,
            y: this.slideFrom.pos.y
          }, {
            x: this.slideFrom.pos.x + 40 * options.scale,
            y: this.slideFrom.pos.y
          }, options, slideup);
        } else {
          return JS.Drawings.drawSlide(ctx, {
            x: this.slideFrom.pos.x + widthNumber,
            y: this.slideFrom.pos.y
          }, this.pos, options, slideup);
        }
      }
    };

    return TabNote;

  })(Note);

  Tie = (function(_super) {

    __extends(Tie, _super);

    function Tie(noteObj, noteTieFrom) {
      this.noteObj = noteObj;
      if (this.noteObj.hammer != null) {
        this.hammer = this.noteObj.hammer;
      }
      Tie.__super__.constructor.call(this, this.noteObj);
      if (noteTieFrom != null) {
        this.noteTieFrom = noteTieFrom;
        this.noteTieFrom.tieTo(this);
      } else if (this.noteObj.noteObj.tabNote != null) {
        this.noteTieFrom = this.noteObj.noteTieFrom.tabNote;
      } else {
        this.noteTieFrom = this.noteObj.noteTieFrom;
      }
      if ((this.noteObj.noteObj != null) && (this.noteObj.noteObj.tabNote != null)) {
        this.noteObj.noteObj.tabNote = this;
      }
    }

    Tie.prototype.drawAt = function(ctx, pos, options) {
      Tie.__super__.drawAt.call(this, ctx, pos, options);
      if (this.noteTieFrom.pos != null) {
        if (this.noteTieFrom.pos.x < this.pos.x) {
          return JS.Drawings.drawTie(ctx, this.noteTieFrom.pos, this.pos, options);
        } else {
          JS.Drawings.drawTie(ctx, {
            x: this.pos.x - 25 * options.scale,
            y: this.pos.y
          }, this.pos, options);
          return JS.Drawings.drawTie(this.noteTieFrom.ctx, this.noteTieFrom.pos, {
            x: this.noteTieFrom.pos.x + 40 * options.scale,
            y: this.noteTieFrom.pos.y
          }, options);
        }
      }
    };

    Tie.prototype.isPlayable = function() {
      return false;
    };

    Tie.prototype.isSelectable = function() {
      return true;
    };

    Tie.prototype.convertToTab = function() {
      return this.__proto__ = TabTie.prototype;
    };

    return Tie;

  })(Note);

  TabTie = (function(_super) {

    __extends(TabTie, _super);

    function TabTie(noteObj, noteTieFrom) {
      this.noteObj = noteObj;
      TabTie.__super__.constructor.call(this, this.noteObj);
      if (noteTieFrom != null) {
        this.noteTieFrom = noteTieFrom;
      } else {
        this.noteTieFrom = this.noteObj.noteTieFrom;
      }
      this.noteTieFrom.tieTo(this);
    }

    TabTie.prototype.drawAt = function(ctx, pos, options) {
      var MarginPrebend, bendLength, bendNbr, bendPitch, bendPosition, cleanedBendPitchArr, i, lastVariation, paddingRight, _i, _j, _len, _len1, _ref, _results;
      this.pos = {
        x: pos.x,
        y: this.noteTieFrom.pos.y
      };
      if (this.bendPitchArr != null) {
        lastVariation = null;
        cleanedBendPitchArr = [];
        _ref = this.bendPitchArr;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bendPitch = _ref[_i];
          bendPitch = parseInt(bendPitch);
          if (!(lastVariation != null) || bendPitch !== lastVariation) {
            cleanedBendPitchArr.push(bendPitch);
            lastVariation = bendPitch;
          }
        }
        bendPosition = {
          x: pos.x + (2 * options.scale),
          y: this.pos.y
        };
        i = 0;
        lastVariation = 0;
        MarginPrebend = 0;
        bendNbr = cleanedBendPitchArr.length - 1;
        paddingRight = options.paddingRight;
        if ((options.isEol != null) && options.isEol === true) {
          paddingRight -= 6 * options.scale;
        }
        _results = [];
        for (_j = 0, _len1 = cleanedBendPitchArr.length; _j < _len1; _j++) {
          bendPitch = cleanedBendPitchArr[_j];
          bendLength = (paddingRight + 5.5) / bendNbr;
          if ((lastVariation > bendPitch) && !(i === 0 && bendPitch !== 0)) {
            JS.Drawings.drawDownBend(ctx, bendPosition, bendLength, options);
            bendPosition.x += bendLength;
            MarginPrebend = 0;
          } else if ((lastVariation < bendPitch) && !(i === 0 && bendPitch !== 0)) {
            bendPosition.y += MarginPrebend;
            JS.Drawings.drawUpBend(ctx, bendPosition, bendLength, options, bendPitch);
            bendPosition.x += bendLength;
            MarginPrebend = 0;
          }
          lastVariation = bendPitch;
          _results.push(i++);
        }
        return _results;
      }
    };

    TabTie.prototype.isPlayable = function() {
      return false;
    };

    return TabTie;

  })(TabNote);

  JellyScore.Sharp = Sharp;

  JellyScore.Flat = Flat;

  JellyScore.Natural = Natural;

  JellyScore.Note = Note;

  JellyScore.TabNote = TabNote;

  JellyScore.Tie = Tie;

  JellyScore.TabTie = TabTie;

}).call(this);

(function() {
  var Chord, TabChord,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chord = (function(_super) {

    __extends(Chord, _super);

    function Chord(chord) {
      var newTickable, note, references, _i, _len, _ref;
      Chord.__super__.constructor.call(this);
      this.notes = [];
      this.autoBeam = true;
      this.autoStem = true;
      this.stemDirection = true;
      if (chord != null) {
        references = {};
        if (chord.vibrato != null) {
          this.vibrato = chord.vibrato;
        }
        _ref = chord.notes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          note = _ref[_i];
          if (note.noteTieFrom != null) {
            newTickable = new note.constructor(note);
            note._id = JellyScore.getId();
            references[note._id] = newTickable;
            if (references[note.noteTieFrom._id] != null) {
              references[note.noteTieFrom._id].tieTo(newTickable);
              note.noteTieFrom = references[note.noteTieFrom._id];
            }
            this.addTickable(newTickable);
          } else if (note.noteTieTo != null) {
            newTickable = new note.constructor(note);
            note._id = JellyScore.getId();
            references[note._id] = newTickable;
            this.addTickable(newTickable);
          } else {
            this.addTickable(new note.constructor(note));
          }
        }
        this.setDuration(chord.getDuration());
      }
    }

    Chord.prototype.getTicks = function(resolution) {
      var note, t, ticks, _i, _len, _ref;
      ticks = 0;
      if (!this.grace) {
        _ref = this.notes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          note = _ref[_i];
          t = note.getTicks(resolution);
          if (t > ticks) {
            ticks = t;
          }
        }
      }
      return ticks;
    };

    Chord.prototype.getWidth = function(options) {
      var note, w, width, _i, _len, _ref;
      width = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        w = note.getWidth(options);
        if (w > width) {
          width = w;
        }
      }
      return width;
    };

    Chord.prototype.getLeftPadding = function(options) {
      var note, w, width, _i, _len, _ref;
      width = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        w = note.getLeftPadding(options);
        if (w > width) {
          width = w;
        }
      }
      return width;
    };

    Chord.prototype.getRightPadding = function(options) {
      var note, w, width, _i, _len, _ref;
      width = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        w = note.getRightPadding(options);
        if (w > width) {
          width = w;
        }
      }
      return width;
    };

    Chord.prototype.getMinY = function(options) {
      var mY, minY, note, _i, _len, _ref;
      minY = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        mY = note.getMinY(options);
        if (mY < minY) {
          minY = mY;
        }
      }
      return minY;
    };

    Chord.prototype.getMaxY = function(options) {
      var mY, maxY, note, _i, _len, _ref;
      maxY = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        mY = note.getMaxY(options);
        if (mY > maxY) {
          maxY = mY;
        }
      }
      return maxY;
    };

    Chord.prototype.getMinResolution = function() {
      var minR, minResolution, note, _i, _len, _ref;
      minResolution = 1;
      if (!this.grace) {
        _ref = this.notes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          note = _ref[_i];
          minR = note.getMinResolution();
          if (minR > minResolution) {
            minResolution = minR;
          }
        }
      }
      return minResolution;
    };

    Chord.prototype.getTarget = function() {
      return JellyScore.Voice;
    };

    Chord.prototype.setCapo = function(capo) {
      var note, _i, _len, _ref, _results;
      _ref = this.notes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        _results.push(note.setCapo(capo));
      }
      return _results;
    };

    Chord.prototype.setDuration = function(duration) {
      var note, _i, _len, _ref, _results;
      this.duration = duration;
      _ref = this.notes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        _results.push(note.setDuration(this.duration));
      }
      return _results;
    };

    Chord.prototype.getDuration = function() {
      return this.duration;
    };

    Chord.prototype.beamTo = function(noteBeamTo) {
      this.noteBeamTo = noteBeamTo;
    };

    Chord.prototype.beamFrom = function(noteBeamFrom) {
      this.noteBeamFrom = noteBeamFrom;
      if (this.noteBeamFrom != null) {
        return this.noteBeamFrom.beamTo(this);
      }
    };

    Chord.prototype.toGrace = function() {
      var note, _i, _len, _ref, _results;
      this.grace = true;
      _ref = this.notes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        _results.push(note.toGrace());
      }
      return _results;
    };

    Chord.prototype.setStemDirection = function(stemDirection) {
      this.stemDirection = stemDirection === true;
      return this.autoStem = false;
    };

    Chord.prototype.getPitch = function() {
      var l, note, p, _i, _len, _ref;
      p = 0;
      l = 0;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        p += note.getPitch();
        ++l;
      }
      return p / l;
    };

    Chord.prototype.getMinPosition = function(clef, scale) {
      var minPos, note, pos, _i, _len, _ref;
      if (scale == null) {
        scale = 1;
      }
      minPos = null;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        pos = note.getPosition(clef, scale);
        if (minPos === null || pos < minPos) {
          minPos = pos;
        }
      }
      return minPos;
    };

    Chord.prototype.getMaxPosition = function(clef, scale) {
      var maxPos, note, pos, _i, _len, _ref;
      if (scale == null) {
        scale = 1;
      }
      maxPos = null;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        pos = note.getPosition(clef, scale);
        if (maxPos === null || pos > maxPos) {
          maxPos = pos;
        }
      }
      return maxPos;
    };

    Chord.prototype.addTickable = function(tickable) {
      this.notes.push(tickable);
      if (!tickable.autoStem) {
        this.autoStem = false;
      }
      return tickable.setParent(this);
    };

    Chord.prototype.getStemDirection = function(options) {
      if (this.autoStem) {
        return options.clef.getStemDirection(this.getPitch());
      } else {
        return this.stemDirection;
      }
    };

    Chord.prototype.deleteBeam = function() {
      if (this.noteBeamFrom != null) {
        this.noteBeamFrom.noteBeamTo = null;
        this.noteBeamFrom = null;
      }
      if (this.noteBeamTo != null) {
        this.noteBeamTo.noteBeamFrom = null;
        return this.noteBeamTo = null;
      }
    };

    Chord.prototype.prepareTick = function() {
      var isInverse, lastPitch, note, pitch, _i, _len, _ref, _results;
      this.notes.sort(function(n1, n2) {
        return n1.getPitch() > n2.getPitch();
      });
      lastPitch = null;
      isInverse = false;
      _ref = this.notes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        pitch = note.getPitch();
        if ((lastPitch != null) && pitch - lastPitch === 1) {
          isInverse = !isInverse;
        } else {
          isInverse = false;
        }
        lastPitch = pitch;
        _results.push(note.setInverse(isInverse));
      }
      return _results;
    };

    Chord.prototype.drawAt = function(ctx, pos, options) {
      var endPos, lrPos, note, pmInChord, pmPos, startPos, vibPos, x, _i, _len, _ref;
      this.drawBeam(ctx, pos, options);
      pmInChord = false;
      pmPos = null;
      lrPos = null;
      vibPos = null;
      options.inChord = true;
      _ref = this.notes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        x = pos.x + options.paddingLeft + options.width - ((note.getWidth(options)) / 2);
        if (pmPos === null && this.whoAmI() === JellyScore.TabChord && this.vibrato) {
          vibPos = {
            x: x,
            y: pos.y
          };
        }
        if (pmPos === null && this.whoAmI() === JellyScore.TabChord && note.palmMute) {
          pmPos = {
            x: x,
            y: pos.y
          };
        }
        if (lrPos === null && this.whoAmI() === JellyScore.TabChord && note.letRing) {
          lrPos = {
            x: x,
            y: pos.y
          };
        }
        note.drawAt(ctx, pos, $.extend({}, options, {
          stem: false
        }));
      }
      options.inChord = false;
      if (this.whoAmI() === JellyScore.TabChord) {
        if ((options.lrStart != null) && (lrPos === null || options.isEol)) {
          startPos = options.lrStart;
          endPos = {
            x: pos.x,
            y: pos.y
          };
          if (options.isEol) {
            endPos.x += options.paddingRight + options.width;
          }
          JS.Drawings.drawLetRing(ctx, startPos, endPos, options);
          delete options.lrStart;
        } else if (!(options.lrStart != null)) {
          options.lrStart = lrPos;
        }
        if ((options.pmStart != null) && (pmPos === null || options.isEol)) {
          startPos = options.pmStart;
          endPos = {
            x: pos.x,
            y: pos.y
          };
          if (options.isEol) {
            endPos.x += options.paddingRight + options.width;
          }
          JS.Drawings.drawPalmMute(ctx, startPos, endPos, options);
          delete options.pmStart;
        } else if (!(options.pmStart != null)) {
          options.pmStart = pmPos;
        }
        if (options.isEol && !(typeof vibStart !== "undefined" && vibStart !== null) && (vibPos != null)) {
          startPos = vibPos;
          endPos = {
            x: pos.x + options.paddingRight + options.width,
            y: pos.y
          };
          JS.Drawings.drawVibrato(ctx, startPos, endPos, options);
          return delete options.vibStart;
        } else if ((options.vibStart != null) && (vibPos === null || options.isEol)) {
          startPos = options.vibStart;
          endPos = {
            x: pos.x,
            y: pos.y
          };
          if (options.isEol) {
            endPos.x += options.paddingRight + options.width;
          }
          JS.Drawings.drawVibrato(ctx, startPos, endPos, options);
          return delete options.vibStart;
        } else if (!(options.vibStart != null)) {
          return options.vibStart = vibPos;
        }
      }
    };

    Chord.prototype.drawStemAt = function(ctx, pos, options) {
      var p, p1, p2;
      if ((options.isTabStaff != null) && options.isTabStaff === true) {
        return;
      }
      if (this.duration.base > 1) {
        p1 = this.getMaxPosition(options.clef, options.scale);
        p2 = this.getMinPosition(options.clef, options.scale);
        if (this.getStemDirection(options)) {
          p = {
            y: pos.y + p1,
            x: pos.x + options.paddingLeft + (options.width - this.getWidth(options))
          };
          JS.Drawings.drawRightStem(ctx, p, $.extend({}, options, {
            height: (p1 - p2) / options.scale
          }));
          if (this.duration.base === 8) {
            p.y = pos.y + p2;
            return JS.Drawings.drawSingleFlagDown(ctx, p, options);
          } else if (this.duration.base >= 16) {
            p.y = pos.y + p2;
            return JS.Drawings.drawDoubleFlagDown(ctx, p, options);
          }
        } else {
          p = {
            y: pos.y + p2,
            x: pos.x + options.paddingLeft + (options.width - this.getWidth(options))
          };
          JS.Drawings.drawLeftStem(ctx, p, $.extend({}, options, {
            height: (p1 - p2) / options.scale
          }));
          if (this.duration.base === 8) {
            p.y = pos.y + p1;
            return JS.Drawings.drawSingleFlagUp(ctx, p, options);
          } else if (this.duration.base >= 16) {
            p.y = pos.y + p1;
            return JS.Drawings.drawDoubleFlagUp(ctx, p, options);
          }
        }
      }
    };

    Chord.prototype.drawBeam = function(ctx, pos, options) {
      var beam, maxPos, minPos;
      if ((options.isTabStaff != null) && options.isTabStaff === true) {
        return;
      }
      minPos = this.getMinPosition(options.clef, options.scale);
      maxPos = this.getMaxPosition(options.clef, options.scale);
      this.pos = {
        x: pos.x + options.paddingLeft + (options.width - this.getWidth(options)),
        y: pos.y + (this.getStemDirection(options) ? maxPos : minPos),
        yMin: pos.y + minPos,
        yMax: pos.y + maxPos,
        initialY: pos.y
      };
      if ((this.noteBeamFrom != null) || (this.noteBeamTo != null)) {
        if (!(this.noteBeamTo != null) && (this.noteBeamFrom != null) && !options.highlight) {
          beam = new JellyScore.Beam(this);
          return beam.draw(ctx, options);
        }
      } else {
        return this.drawStemAt(ctx, pos, options);
      }
    };

    Chord.prototype.convertToTab = function() {
      var note, _i, _len, _ref, _results;
      this.__proto__ = TabChord.prototype;
      _ref = this.notes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        _results.push(note.convertToTab());
      }
      return _results;
    };

    Chord.prototype.isSelectable = function() {
      return true;
    };

    Chord.prototype.getLilyString = function() {
      var note, string, _i, _len, _ref;
      string = "<";
      _ref = this.notes.reverse();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        note = _ref[_i];
        string += note.getLilyString();
      }
      string += ">" + this.duration.getLilyString();
      if (this.grace) {
        string += " \\grace";
      }
      return string;
    };

    return Chord;

  })(JellyScore.Tickable);

  TabChord = (function(_super) {

    __extends(TabChord, _super);

    function TabChord() {
      TabChord.__super__.constructor.call(this);
    }

    TabChord.prototype.drawStemAt = function(ctx, pos, options) {};

    TabChord.prototype.drawBeam = function(ctx, pos, options) {};

    return TabChord;

  })(Chord);

  JellyScore.Chord = Chord;

  JellyScore.TabChord = TabChord;

}).call(this);

(function() {
  var InvisibleRest, Rest,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Rest = (function(_super) {

    __extends(Rest, _super);

    function Rest(duration) {
      if (duration.constructor === Rest) {
        this.duration = duration.duration;
      } else {
        this.duration = duration;
      }
      Rest.__super__.constructor.call(this);
    }

    Rest.prototype.getTicks = function(resolution) {
      return this.duration.getTicks(resolution);
    };

    Rest.prototype.getWidth = function(options) {
      return 5 * options.scale;
    };

    Rest.prototype.getLeftPadding = function(options) {
      return 10 * options.scale;
    };

    Rest.prototype.getRightPadding = function(options) {
      return 20 * options.scale * Math.sqrt(this.duration.getTicks(4));
    };

    Rest.prototype.getMinY = function() {
      return 0;
    };

    Rest.prototype.getMaxY = function(options) {
      return options.clef.getMaxY(options);
    };

    Rest.prototype.getMinResolution = function() {
      return this.duration.getMinResolution();
    };

    Rest.prototype.getTarget = function() {
      return JellyScore.Voice;
    };

    Rest.prototype.isSelectable = function() {
      return true;
    };

    Rest.prototype.setDuration = function(duration) {
      this.duration = duration;
    };

    Rest.prototype.getDuration = function() {
      return this.duration;
    };

    Rest.prototype.getLayer = function(scale, x, y) {
      var layer;
      layer = {
        x: x,
        y: y,
        height: 0,
        width: 0
      };
      switch (this.duration.base) {
        case 1:
          layer.y += 6 * 3.67 + 2.5 * scale;
          layer.x -= 2 * scale;
          layer.height = 10 * scale;
          layer.width = 12 * scale;
          break;
        case 2:
          layer.y += 6 * 3.67 * scale;
          layer.x -= 2 * scale;
          layer.height = 10 * scale;
          layer.width = 12 * scale;
          break;
        case 4:
          layer.y += 5 * 3.67 * scale;
          layer.height = 22 * scale;
          layer.width = 5 * scale;
          break;
        case 8:
          layer.y += 6 * 3.67 * scale;
          layer.height = 15 * scale;
          layer.width = 5 * scale;
          break;
        case 16:
          layer.y += 6 * 3.67 * scale;
          layer.height = 22 * scale;
          layer.width = 7 * scale;
          break;
        case 32:
          layer.y += 4 * 3.67 * scale;
          layer.height = 30 * scale;
          layer.width = 8 * scale;
          break;
        case 64:
          layer.y += 4 * 3.67 * scale;
          layer.height = 37 * scale;
          layer.width = 10 * scale;
          break;
        case 128:
          layer.y += 4 * 3.67 * scale;
          layer.height = 10 * scale;
          layer.width = 9 * scale;
      }
      return layer;
    };

    Rest.prototype.drawAt = function(ctx, pos, options) {
      var endPos, startPos, x, y;
      if (options.isTabStaff !== true) {
        y = pos.y;
        x = pos.x + options.paddingLeft + (options.width - this.getWidth(options));
        this.pos = {
          x: x,
          y: y
        };
        switch (this.duration.base) {
          case 1:
            return JS.Drawings.drawWholeRest(ctx, {
              x: x,
              y: y + 2 * 3.67 * options.scale
            }, options);
          case 2:
            return JS.Drawings.drawHalfRest(ctx, {
              x: x,
              y: y + 2 * 3.67 * options.scale
            }, options);
          case 4:
            return JS.Drawings.drawQuarterRest(ctx, {
              x: x,
              y: y
            }, options);
          case 8:
            return JS.Drawings.drawEighthRest(ctx, {
              x: x,
              y: y
            }, options);
          case 16:
            return JS.Drawings.drawSixteenthRest(ctx, {
              x: x,
              y: y
            }, options);
          case 32:
            return JS.Drawings.drawThirtySecondRest(ctx, {
              x: x,
              y: y
            }, options);
          case 64:
            return JS.Drawings.drawSixtyFourthRest(ctx, {
              x: x,
              y: y
            }, options);
          case 128:
            return JS.Drawings.drawHundredTwentyEighthRest(ctx, {
              x: x,
              y: y
            }, options);
        }
      } else {
        if (options.pmStart != null) {
          startPos = options.pmStart;
          endPos = {
            x: pos.x,
            y: pos.y
          };
          JS.Drawings.drawPalmMute(ctx, startPos, endPos, options);
          delete options.pmStart;
        }
        if (options.lrStart != null) {
          startPos = options.lrStart;
          endPos = {
            x: pos.x,
            y: pos.y
          };
          JS.Drawings.drawLetRing(ctx, startPos, endPos, options);
          delete options.lrStart;
        }
        if (options.vibStart != null) {
          startPos = options.vibStart;
          endPos = {
            x: pos.x,
            y: pos.y
          };
          JS.Drawings.drawVibrato(ctx, startPos, endPos, options);
          return delete options.vibStart;
        }
      }
    };

    Rest.prototype.getLilyString = function() {
      return "r" + this.duration.getLilyString();
    };

    return Rest;

  })(JellyScore.Tickable);

  InvisibleRest = (function(_super) {

    __extends(InvisibleRest, _super);

    function InvisibleRest() {
      return InvisibleRest.__super__.constructor.apply(this, arguments);
    }

    InvisibleRest.prototype.drawAt = function(ctx, pos, options) {};

    InvisibleRest.prototype.getLeftPadding = function(options) {
      return 0;
    };

    InvisibleRest.prototype.getRightPadding = function(options) {
      return 0;
    };

    return InvisibleRest;

  })(Rest);

  JellyScore.Rest = Rest;

  JellyScore.InvisibleRest = InvisibleRest;

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  JellyScore.BAR_TYPE = {
    END_BAR: 0,
    START_BAR: 1
  };

  JellyScore.Bar = (function(_super) {

    __extends(Bar, _super);

    Bar.prototype.BAR_TYPE = {
      END_BAR: 0,
      START_BAR: 1
    };

    function Bar() {
      this.type = this.BAR_TYPE.END_BAR;
    }

    Bar.prototype.getTicks = function() {
      return 0;
    };

    Bar.prototype.getWidth = function(options) {
      return 0;
    };

    Bar.prototype.getLeftPadding = function() {
      return 0;
    };

    Bar.prototype.getRightPadding = function() {
      return 0;
    };

    Bar.prototype.getMinY = function() {
      return 0;
    };

    Bar.prototype.getMaxY = function() {
      return 0;
    };

    Bar.prototype.getMinResolution = function() {
      return 0;
    };

    Bar.prototype.getTarget = function() {
      return JellyScore.Score;
    };

    Bar.prototype.drawAt = function(ctx, pos, options, indexNumber) {
      return JS.Drawings.drawSeparatorFromTo(ctx, {
        x: pos.x - 1.1 * options.scale,
        y: pos.y
      }, options);
    };

    Bar.prototype.drawDots = function(ctx, pos, options) {
      var paddingTop, staff, step, y, _i, _len, _ref, _results;
      y = 0;
      _ref = options.staffs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        staff = _ref[_i];
        if ((staff != null ? staff.type : void 0) != null) {
          step = staff.type === JellyScore.Staff ? options.scale * 50 / 6.8 : options.scale * 74 / 6.8;
          paddingTop = staff.lines * step / 2 + 8.1 * options.scale;
          JS.Drawings.drawDot(ctx, {
            x: pos.x - 3 * options.scale,
            y: pos.y + y + paddingTop - (staff.minY + step / 2)
          }, options);
          JS.Drawings.drawDot(ctx, {
            x: pos.x - 3 * options.scale,
            y: pos.y + y + paddingTop + step / 2 - staff.minY
          }, options);
          _results.push(y += staff.height);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Bar.prototype.getType = function() {
      return this.type;
    };

    return Bar;

  })(JellyScore.Tickable);

  JellyScore.StartRepeat = (function(_super) {

    __extends(StartRepeat, _super);

    function StartRepeat(repeatCount) {
      StartRepeat.__super__.constructor.call(this);
      if (typeof repeatCount === "object" && repeatCount.constructor === JellyScore.StartRepeat) {
        this.repeatCount = repeatCount.repeatCount;
      } else {
        this.repeatCount = repeatCount;
      }
      this.type = this.BAR_TYPE.START_BAR;
      this.tick = 0;
    }

    StartRepeat.prototype.getNextTick = function(repeatCount) {
      if (repeatCount < this.repeatCount - 1) {
        return this.tick;
      } else {
        return null;
      }
    };

    StartRepeat.prototype.setTick = function(tick) {
      this.tick = tick;
    };

    StartRepeat.prototype.getWidth = function(options) {
      return 17.77 * options.scale;
    };

    StartRepeat.prototype.drawAt = function(ctx, pos, options) {
      JS.Drawings.drawLargeSeparatorFromTo(ctx, {
        x: Math.round(pos.x - options.scale),
        y: pos.y
      }, options);
      JS.Drawings.drawSeparatorFromTo(ctx, {
        x: Math.round(pos.x + 5.55 * options.scale),
        y: pos.y
      }, options);
      return this.drawDots(ctx, pos, options);
    };

    StartRepeat.prototype.getLilyString = function() {
      return "\\repeat volta " + this.repeatCount + " {";
    };

    return StartRepeat;

  })(JellyScore.Bar);

  JellyScore.EndRepeat = (function(_super) {

    __extends(EndRepeat, _super);

    function EndRepeat(startRepeat) {
      EndRepeat.__super__.constructor.call(this);
      this.alternatives = [];
      this.endAlternatives = [];
      if (startRepeat.constructor === JellyScore.StartRepeat) {
        this.startRepeat = startRepeat;
      }
    }

    EndRepeat.prototype.addAlternative = function(alternative) {
      return this.alternatives.push(alternative);
    };

    EndRepeat.prototype.addEndAlternative = function(alternative) {
      return this.endAlternatives.push(alternative);
    };

    EndRepeat.prototype.hasAlternative = function() {
      return this.alternatives.length > 0;
    };

    EndRepeat.prototype.hasInsideAlternative = function() {
      return this.alternatives.length > 1;
    };

    EndRepeat.prototype.getWidth = function(options) {
      if (this.hasAlternative()) {
        return 0;
      } else {
        return 15.44 * options.scale;
      }
    };

    EndRepeat.prototype.getNextTick = function(repeatCount, tick, factor) {
      var i, next;
      if (repeatCount >= this.startRepeat.repeatCount) {
        repeatCount = repeatCount % this.startRepeat.repeatCount;
      }
      if (this.hasAlternative()) {
        i = this.alternatives.length + repeatCount - this.startRepeat.repeatCount;
        if (i < 0) {
          i = 0;
        }
        next = this.alternatives[i];
        if (next != null) {
          return next.tick;
        } else {
          return tick + factor;
        }
      } else if (repeatCount < this.startRepeat.repeatCount - 1) {
        return this.startRepeat.tick;
      } else {
        return tick + factor;
      }
    };

    EndRepeat.prototype.getPosition = function(alternative) {
      var i;
      i = this.endAlternatives.indexOf(alternative);
      if (i === 0) {
        i = 1 + i + this.startRepeat.repeatCount - this.alternatives.length;
        if (alternative.isLast()) {
          return 1;
        } else if (i > 1) {
          return [1, i];
        } else {
          return i;
        }
      } else {
        i = 1 + i + this.startRepeat.repeatCount - this.alternatives.length;
        return i;
      }
    };

    EndRepeat.prototype.drawAt = function(ctx, pos, options) {
      if (!this.hasAlternative()) {
        JS.Drawings.drawLargeSeparatorFromTo(ctx, {
          x: Math.round(pos.x + 12 * options.scale),
          y: pos.y
        }, options);
        JS.Drawings.drawSeparatorFromTo(ctx, {
          x: Math.round(pos.x + 9 * options.scale),
          y: pos.y
        }, options);
        return this.drawDots(ctx, {
          x: pos.x - 7 * options.scale,
          y: pos.y
        }, options);
      } else {
        return EndRepeat.__super__.drawAt.call(this, ctx, pos, options);
      }
    };

    EndRepeat.prototype.getLilyString = function() {
      return "}";
    };

    return EndRepeat;

  })(JellyScore.Bar);

  JellyScore.StartAlternative = (function(_super) {

    __extends(StartAlternative, _super);

    function StartAlternative(startRepeat) {
      StartAlternative.__super__.constructor.call(this);
      this.range = 1;
      this.type = this.BAR_TYPE.START_BAR;
      this.tick = 0;
      if (startRepeat.constructor === JellyScore.StartRepeat) {
        this.startRepeat = startRepeat;
      } else {
        this.range = startRepeat.range;
        this.tick = startRepeat.tick;
      }
    }

    StartAlternative.prototype.setTick = function(tick) {
      this.tick = tick;
    };

    StartAlternative.prototype.setRange = function(range) {
      this.range = range;
    };

    StartAlternative.prototype.getWidth = function() {
      return 0;
    };

    StartAlternative.prototype.drawAt = function(ctx, pos, options) {
      return this.pos = {
        x: pos.x,
        y: pos.y
      };
    };

    return StartAlternative;

  })(JellyScore.Bar);

  JellyScore.EndAlternative = (function(_super) {

    __extends(EndAlternative, _super);

    function EndAlternative(startRepeat, startAlternative, endRepeat) {
      this.startAlternative = startAlternative;
      this.endRepeat = endRepeat;
      EndAlternative.__super__.constructor.call(this);
      this.last = false;
      this.first = false;
      if (startRepeat.constructor === JellyScore.StartRepeat) {
        this.startRepeat = startRepeat;
      } else {
        this.last = startRepeat.last;
        this.first = startRepeat.first;
      }
    }

    EndAlternative.prototype.getNextTick = function(repeatCount, tick, factor) {
      if (this.isLast()) {
        return tick + factor;
      } else {
        return this.startRepeat.tick;
      }
    };

    EndAlternative.prototype.getWidth = function(options) {
      if (this.isLast() && !this.isFirst()) {
        return 0;
      } else {
        return 15.44 * options.scale;
      }
    };

    EndAlternative.prototype.setLast = function(last) {
      this.last = last;
    };

    EndAlternative.prototype.isLast = function() {
      return this.last;
    };

    EndAlternative.prototype.setFirst = function(first) {
      this.first = first;
    };

    EndAlternative.prototype.isFirst = function() {
      return this.first;
    };

    EndAlternative.prototype.drawAt = function(ctx, pos, options) {
      var number, padding, positions, scale, _i, _len;
      if (this.isLast() && !this.isFirst()) {
        EndAlternative.__super__.drawAt.call(this, ctx, pos, options);
      } else {
        JS.Drawings.drawLargeSeparatorFromTo(ctx, {
          x: Math.round(pos.x + 12 * options.scale),
          y: pos.y
        }, options);
        JS.Drawings.drawSeparatorFromTo(ctx, {
          x: Math.round(pos.x + 9 * options.scale),
          y: pos.y
        }, options);
        this.drawDots(ctx, {
          x: pos.x - 7 * options.scale,
          y: pos.y
        }, options);
      }
      positions = this.endRepeat.getPosition(this);
      scale = options.scale;
      options.scale *= 0.8;
      if (typeof positions === "number") {
        (JellyScore.getDrawingNumber(positions))(ctx, {
          x: this.startAlternative.pos.x + 4,
          y: this.startAlternative.pos.y + 2
        }, options);
      } else {
        padding = 0;
        for (_i = 0, _len = positions.length; _i < _len; _i++) {
          number = positions[_i];
          (JellyScore.getDrawingNumber(number))(ctx, {
            x: this.startAlternative.pos.x + 4 + padding,
            y: this.startAlternative.pos.y + 2
          }, options);
          padding += 10 * options.scale;
        }
      }
      options.scale = scale;
      if (this.startAlternative.pos.y < pos.y) {
        JS.Drawings.drawAlternative(ctx, this.startAlternative.pos, {
          x: ctx.canvas.width,
          y: this.startAlternative.pos.y
        }, options);
        return JS.Drawings.drawAlternative(ctx, {
          x: -1,
          y: pos.y
        }, pos, options);
      } else {
        return JS.Drawings.drawAlternative(ctx, this.startAlternative.pos, pos, options);
      }
    };

    return EndAlternative;

  })(JellyScore.Bar);

}).call(this);

(function() {
  var FretDiagram,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FretDiagram = (function(_super) {

    __extends(FretDiagram, _super);

    function FretDiagram(reference, diagram_str, dict, chordName) {
      var fret, fretNbr, i, matched, noteArr, splitArr, standardtuning, string, stringArr, _i, _j, _len, _len1, _ref;
      this.diagram_str = diagram_str;
      this.dict = dict;
      FretDiagram.__super__.constructor.call(this);
      if ((reference != null) && typeof reference === "object") {
        this.diagram = reference.diagram;
        this.fingersPos = reference.fingersPos;
        this.barre = reference.barre;
        this.diagramContainer = reference.diagramContainer;
        this.diagram_str = reference.diagram_str;
        this.dict = reference.dict;
        this.chordName = reference.chordName;
        this.position = reference.position;
        return;
      }
      this.diagram = "";
      this.fingersPos = "";
      this.barre = "";
      this.position = {
        x: 0,
        y: 0
      };
      this.diagramContainer = null;
      if (!(this.diagram_str != null)) {
        this.diagram_str = "";
      }
      stringArr = this.diagram_str.split("-");
      for (_i = 0, _len = stringArr.length; _i < _len; _i++) {
        string = stringArr[_i];
        if ((string != null) && string.length !== 0) {
          this.diagram = string + this.diagram;
        }
      }
      standardtuning = [64, 59, 55, 50, 45, 40];
      noteArr = [];
      i = 0;
      _ref = this.diagram;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        fret = _ref[_j];
        fretNbr = parseInt(this.dict.letterToInt(fret));
        if ((fretNbr != null) && !isNaN(fretNbr)) {
          noteArr.push(this.dict.getNoteFromFret(i, fretNbr, standardtuning));
        }
        i++;
      }
      matched = this.dict.inverseChords[this.diagram];
      if ((matched != null) && matched.length > 0) {
        splitArr = matched[0].split("-");
        if (splitArr.length > 1) {
          this.fingersPos = splitArr[1];
        }
        if (splitArr.length === 3) {
          this.barre = splitArr[2];
        }
      }
      if ((chordName != null) && chordName.length > 0) {
        this.chordName = chordName;
      } else {
        if ((matched != null) && matched.length > 0) {
          this.chordName = matched[0].split("-")[0];
        } else {
          matched = this.dict.getChordFromNotes(noteArr);
          if ((matched != null) && matched.length > 0) {
            this.chordName = matched;
          } else {
            this.chordName = "";
          }
        }
      }
    }

    FretDiagram.prototype.getTicks = function() {
      return 0;
    };

    FretDiagram.prototype.getWidth = function() {
      return 0;
    };

    FretDiagram.prototype.getLeftPadding = function() {
      return 0;
    };

    FretDiagram.prototype.getRightPadding = function() {
      return 0;
    };

    FretDiagram.prototype.getMinY = function() {
      return 0;
    };

    FretDiagram.prototype.getMaxY = function() {
      return 0;
    };

    FretDiagram.prototype.getMinResolution = function() {
      return 0;
    };

    FretDiagram.prototype.getTarget = function() {
      return JellyScore.Voice;
    };

    FretDiagram.prototype.drawAt = function(ctx, pos, options) {
      this.position.x = pos.x + options.paddingLeft;
      this.position.y = options.paddingTop - 10 * options.scale;
      if (ctx !== null && JS.Drawings.isPosition(pos) && this.chordName.length > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgb(51, 51, 51)";
        ctx.font = 16 * options.scale + "px Calibri bold";
        ctx.fillText(this.chordName, this.position.x + (options.width / 2), this.position.y);
        ctx.stroke();
        this.textWidth = ctx.measureText(this.chordName).width + 10;
        return ctx.restore();
      }
    };

    FretDiagram.prototype.buildBarreArray = function(chord_representation) {
      var barreArray, barrestr, fret, i, j, strCovered, _i, _j;
      barreArray = [];
      for (i = _i = 0; _i <= 5; i = ++_i) {
        if (parseInt(chord_representation[2][i]) !== 0) {
          fret = parseInt(chord_representation[0][i]);
          strCovered = parseInt(chord_representation[2][i]);
          barrestr = "";
          for (j = _j = 0; _j <= 5; j = ++_j) {
            if (j >= i && (parseInt(chord_representation[0][j]) === fret) && (j <= (i + strCovered - 1))) {
              barrestr += "x";
            } else {
              barrestr += "o";
            }
          }
          barreArray[fret] = barrestr;
        }
      }
      return barreArray;
    };

    FretDiagram.prototype.drawChordDiagram = function($diagramContainer) {
      var barreArray, bottomMargin, canvas, chordFingers, chordPos, chordPosTab, chord_representation, ctx, fret, fretNumber, i, leftMargin, letter, maxfret, minfret, oneFretheight, oneStringWidth, originalfont, rightMargin, str, strCovered, stringNbr, topMargin, _i, _j, _k, _l, _len, _len1, _m, _results;
      this.diagramContainer = $diagramContainer;
      canvas = this.diagramContainer.find("canvas").get(0);
      chord_representation = [];
      chord_representation.push(this.diagram);
      if ((this.fingersPos != null) && this.fingersPos.length !== 0) {
        chord_representation.push(this.fingersPos);
        if ((this.barre != null) && this.barre.length !== 0) {
          chord_representation.push(this.barre);
        }
      }
      if (chord_representation.length === 3) {
        barreArray = this.buildBarreArray(chord_representation);
      }
      if (chord_representation.length >= 2) {
        chordFingers = chord_representation[1];
      }
      chordPos = chord_representation[0];
      chordPosTab = [];
      minfret = 50;
      maxfret = 0;
      for (_i = 0, _len = chordPos.length; _i < _len; _i++) {
        letter = chordPos[_i];
        if (letter !== "x") {
          fret = this.dict.letterToInt(letter);
          if (fret < minfret && fret !== 0) {
            minfret = fret;
          }
          if (fret > maxfret) {
            maxfret = fret;
          }
          letter = "" + fret;
        }
        chordPosTab.push(letter);
      }
      canvas.width = canvas.width;
      oneStringWidth = 13;
      oneFretheight = 19;
      topMargin = 10;
      bottomMargin = 9;
      leftMargin = 7;
      rightMargin = 7;
      if (maxfret - minfret >= 4) {
        fretNumber = 5;
        oneFretheight = 15;
        bottomMargin = 10;
      } else {
        fretNumber = 4;
      }
      if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(leftMargin + oneStringWidth, topMargin + 0.5);
        ctx.lineTo(canvas.width - oneStringWidth - rightMargin, topMargin + 0.5);
        for (i = _j = 1; _j <= 6; i = ++_j) {
          ctx.moveTo(leftMargin + (oneStringWidth * i) + 0.5, topMargin);
          ctx.lineTo(leftMargin + (oneStringWidth * i) + 0.5, topMargin + fretNumber * oneFretheight);
        }
        for (i = _k = 1; 1 <= fretNumber ? _k <= fretNumber : _k >= fretNumber; i = 1 <= fretNumber ? ++_k : --_k) {
          ctx.moveTo(leftMargin + oneStringWidth, topMargin + (oneFretheight * i));
          ctx.lineTo(canvas.width - oneStringWidth - rightMargin, topMargin + (oneFretheight * i));
        }
        ctx.stroke();
        originalfont = ctx.font;
        if (maxfret > 4 && minfret !== 0) {
          ctx.font = "12px Calibri";
          ctx.beginPath();
          if (minfret > 9) {
            ctx.fillText(minfret, 0, topMargin + oneFretheight - 2);
          } else {
            ctx.fillText(minfret, 4, topMargin + oneFretheight - 2);
          }
          ctx.closePath();
        }
        for (str = _l = 0; _l <= 5; str = ++_l) {
          if ((chord_representation[2] != null) && parseInt(chord_representation[2][str]) !== 0) {
            fret = parseInt(chordPos[str]);
            strCovered = parseInt(chord_representation[2][str]);
            if (maxfret > 4 && fret !== 0) {
              fret = fret - minfret + 1;
            }
            ctx.beginPath();
            ctx.fillStyle = 'rgb(77, 77, 77)';
            ctx.arc(leftMargin + ((str + 1) * oneStringWidth), topMargin + (oneFretheight * fret) - oneFretheight / 2, 6, -Math.PI / 2, Math.PI / 2, true);
            ctx.arc(leftMargin + ((str + strCovered) * oneStringWidth), topMargin + (oneFretheight * fret) - oneFretheight / 2, 6, Math.PI / 2, -Math.PI / 2, true);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = "9px monospace";
            ctx.fillText(chordFingers[str], leftMargin + (str + 1 + (strCovered - 1) / 2) * oneStringWidth - 3, 3 + topMargin + (oneFretheight * fret) - oneFretheight / 2);
            ctx.closePath();
          }
        }
        ctx.font = originalfont;
        stringNbr = 1;
        _results = [];
        for (_m = 0, _len1 = chordPosTab.length; _m < _len1; _m++) {
          fret = chordPosTab[_m];
          ctx.fillStyle = 'rgb(77, 77, 77)';
          ctx.font = "12px Calibri";
          ctx.beginPath();
          if (fret === "x") {
            ctx.strokeText("x", leftMargin + (stringNbr * oneStringWidth) - 2, 6);
          } else {
            fret = parseInt(fret);
            if (!(barreArray != null) || !(barreArray[fret] != null)) {
              if (maxfret > 4 && fret !== 0) {
                fret = fret - minfret + 1;
              }
              if (fret !== 0) {
                ctx.arc(leftMargin + (stringNbr * oneStringWidth), topMargin + (oneFretheight * fret) - oneFretheight / 2, 6, 0, Math.PI * 2, true);
                ctx.fill();
                if (chordFingers != null) {
                  ctx.fillStyle = 'white';
                  ctx.font = "9px monospace";
                  ctx.fillText(chordFingers[stringNbr - 1], leftMargin + (stringNbr * oneStringWidth) - 3, 3 + topMargin + (oneFretheight * fret) - oneFretheight / 2);
                }
              } else {
                ctx.strokeText("o", leftMargin + (stringNbr * oneStringWidth) - 2, 6);
              }
            }
          }
          ctx.stroke();
          ctx.closePath();
          _results.push(stringNbr++);
        }
        return _results;
      }
    };

    FretDiagram.prototype.getLilyString = function() {
      return "-\\fret-diagram " + this.chordName + ";" + this.diagram_str;
    };

    return FretDiagram;

  })(JellyScore.Tickable);

  JellyScore.FretDiagram = FretDiagram;

}).call(this);

(function() {
  var Section,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Section = (function(_super) {

    __extends(Section, _super);

    function Section(section, title) {
      this.title = title;
      Section.__super__.constructor.call(this);
    }

    Section.prototype.getTicks = function() {
      return 0;
    };

    Section.prototype.getWidth = function(options) {
      return 0;
    };

    Section.prototype.getLeftPadding = function(options) {
      return 0;
    };

    Section.prototype.getRightPadding = function(options) {
      return 0;
    };

    Section.prototype.getStep = function(options) {
      return 0;
    };

    Section.prototype.getMinY = function() {
      return 0;
    };

    Section.prototype.getMaxY = function(options) {
      return 0;
    };

    Section.prototype.getMinResolution = function() {
      return 0;
    };

    Section.prototype.getBarDuration = function(resolution) {
      return resolution * this.numBeats / this.beatValue;
    };

    Section.prototype.drawAt = function(ctx, pos, options) {
      var settings;
      if (this.title != null) {
        settings = {
          'scale': 1.0
        };
        jQuery.extend(settings, options);
        this.pos = {
          x: pos.x,
          y: 20 * options.scale
        };
        ctx.save();
        ctx.font = "bold " + (16 * settings.scale) + "px Calibri";
        ctx.fillText(this.title, this.pos.x, this.pos.y);
        return ctx.restore();
      }
    };

    Section.prototype.getTarget = function() {
      return JellyScore.Voice;
    };

    return Section;

  })(JellyScore.Tickable);

  JellyScore.Section = Section;

}).call(this);

(function() {
  var Lyrics,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Lyrics = (function(_super) {

    __extends(Lyrics, _super);

    function Lyrics(section, text) {
      this.text = text;
      Lyrics.__super__.constructor.call(this);
    }

    Lyrics.prototype.getTicks = function() {
      return 0;
    };

    Lyrics.prototype.getWidth = function(options) {
      if (this.numBeats < 10 && this.beatValue < 10) {
        return 14 * options.scale;
      } else {
        return ("" + (Math.max(this.numBeats, this.beatValue))).length * this.getStep(options);
      }
    };

    Lyrics.prototype.getLeftPadding = function(options) {
      return 0;
    };

    Lyrics.prototype.getRightPadding = function(options) {
      return 0;
    };

    Lyrics.prototype.getStep = function(options) {
      return 0;
    };

    Lyrics.prototype.getMinY = function() {
      return 0;
    };

    Lyrics.prototype.getMaxY = function(options) {
      return 0;
    };

    Lyrics.prototype.getBottomPadding = function(options) {
      return 10 * options.scale;
    };

    Lyrics.prototype.getMinResolution = function() {
      return 0;
    };

    Lyrics.prototype.getBarDuration = function(resolution) {
      return resolution * this.numBeats / this.beatValue;
    };

    Lyrics.prototype.drawAt = function(ctx, pos, options) {
      var settings, x, y;
      if (this.text != null) {
        settings = {
          'scale': 1.0
        };
        jQuery.extend(settings, options);
        x = pos.x;
        y = options.linePosY + options.lineHeight;
        y = ctx.canvas.height - (this.getBottomPadding(options)) / 2;
        ctx.save();
        ctx.font = "italic " + (13 * settings.scale) + "px Calibri";
        ctx.fillStyle = "rgb(51, 51, 51)";
        ctx.fillText(this.text, x, y);
        return ctx.restore();
      }
    };

    Lyrics.prototype.getTarget = function() {
      return JellyScore.Voice;
    };

    Lyrics.prototype.getLilyString = function() {
      return "-\\tag #'texts ^\\markup {\"" + this.text + "\"}";
    };

    return Lyrics;

  })(JellyScore.Tickable);

  JellyScore.Lyrics = Lyrics;

}).call(this);

(function() {
  var TestWidget, Widget,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Widget = (function() {

    function Widget(options) {
      var _ref, _ref1, _ref2, _ref3, _ref4;
      this.width = (_ref = options.width) != null ? _ref : 0;
      this.height = (_ref1 = options.height) != null ? _ref1 : 0;
      this.leftPadding = (_ref2 = options.leftPadding) != null ? _ref2 : 0;
      this.rightPadding = (_ref3 = options.rightPadding) != null ? _ref3 : 0;
      this.line = (_ref4 = options.line) != null ? _ref4 : 0;
    }

    Widget.prototype.getWidth = function() {
      return this.width;
    };

    Widget.prototype.getLeftPadding = function() {
      return this.leftPadding;
    };

    Widget.prototype.getRightPadding = function() {
      return this.rightPadding;
    };

    Widget.prototype.getTotalWidth = function(options) {
      return (this.getLeftPadding(options)) + (this.getWidth(options)) + (this.getRightPadding(options));
    };

    Widget.prototype.getMinY = function() {
      return 0;
    };

    Widget.prototype.getMaxY = function() {
      return this.height;
    };

    Widget.prototype.getLine = function() {
      return 0;
    };

    return Widget;

  })();

  TestWidget = (function(_super) {

    __extends(TestWidget, _super);

    function TestWidget(line) {
      this.line = line != null ? line : 0;
      TestWidget.__super__.constructor.call(this);
    }

    TestWidget.prototype.getWidth = function(options) {
      return 230;
    };

    TestWidget.prototype.getRightPadding = function() {
      return 10;
    };

    TestWidget.prototype.getMaxY = function(options) {
      return 60 * options.scale;
    };

    TestWidget.prototype.getLine = function() {
      return this.line;
    };

    return TestWidget;

  })(Widget);

  JellyScore.Widget = Widget;

  JellyScore.TestWidget = TestWidget;

}).call(this);

(function() {
  var Parser,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Parser = (function() {

    function Parser(text) {
      this.text = text;
      this.relative = false;
      if (!(Parser.chordDict != null)) {
        Parser.chordDict = new JellyScore.ChordsDict();
      }
      this.Dict = Parser.chordDict;
    }

    Parser.prototype.ERRORS = {
      NOTE_ERROR: function(note) {
        return note + " is not a note. Must be a letter between 'a' and 'g'.";
      }
    };

    Parser.prototype.REGEXP = {
      NOTE: new RegExp("^([a-g][ei]?s?[ei]?s?[',]*)~?(\\d{0,2}\\.*)(\\\\\\d{0,2})?(-\\d{0,2})?")
    };

    Parser.prototype.SEPARATORS = [' ', '\n', '\r', '\t', ':'];

    Parser.prototype.charDifferentAt = function(i, value) {
      return i < this.length && this.text[i] !== value;
    };

    Parser.prototype.stemDifferentAt = function(i, value) {
      return this.text.substr(i, value.length) !== value;
    };

    Parser.prototype.isNote = function(note) {
      return this.REGEXP.NOTE.test(note);
    };

    Parser.prototype.isRest = function(rest) {
      var base;
      base = rest.charCodeAt(0);
      if (base === 82 || base === 114) {
        return true;
      }
      if (base === 83 || base === 115) {
        return true;
      }
      return false;
    };

    Parser.prototype.getInteger = function(i) {
      var strInt, _ref;
      strInt = "";
      while (++i < this.length && (48 <= (_ref = this.text.charCodeAt(i)) && _ref <= 57)) {
        strInt += this.text[i];
      }
      return [i, parseInt(strInt)];
    };

    Parser.prototype.getChar = function(i) {
      var char, _ref;
      char = "";
      while (i + 1 < this.length && (_ref = this.text[i + 1], __indexOf.call(this.SEPARATORS, _ref) >= 0)) {
        ++i;
      }
      if (++i < this.length) {
        char = this.text[i];
      }
      return [i, char];
    };

    Parser.prototype.getStem = function(i) {
      var c, escaped, stem, _ref;
      stem = "";
      while (i + 1 < this.length && (_ref = this.text[i + 1], __indexOf.call(this.SEPARATORS, _ref) >= 0)) {
        ++i;
      }
      if (this.text[i + 1] === '"') {
        i++;
        escaped = false;
        while (++i < this.length && (c = this.text[i]) && (c !== '"' || escaped)) {
          if (c === "\\") {
            escaped = !escaped;
          } else {
            escaped = false;
          }
          if (!escaped) {
            stem += c;
          }
        }
      } else if (this.text.slice(i + 1, i + 4) === '#\'(') {
        i += 3;
        while (++i < this.length && (c = this.text[i]) && c !== ')') {
          stem += c;
        }
      } else {
        while (++i < this.length && (c = this.text[i]) && (c !== ' ' && c !== '\n' && c !== '\r' && c !== '\t' && c !== '>' && c !== ':' && c !== '}' && c !== '=')) {
          stem += this.text[i];
        }
      }
      return [i, stem];
    };

    Parser.prototype.getBlock = function(i) {
      var block, countBrackets, _ref;
      _ref = this.getStem(i), i = _ref[0], block = _ref[1];
      if (block[0] === "{") {
        i = i - (block.length - 1);
        block = "";
        countBrackets = 0;
        while ((this.charDifferentAt(++i, '}')) || countBrackets > 0) {
          if (this.text[i] === '}') {
            countBrackets--;
          } else if (this.text[i] === '{') {
            countBrackets++;
          }
          block += this.text[i];
        }
      }
      return [i, block];
    };

    Parser.prototype.getPitch = function(pitch, relative) {
      var c, note, octave, pos, type;
      if (relative == null) {
        relative = false;
      }
      type = JellyScore.Note;
      if (this.staff.whoAmI() === JellyScore.TabStaff) {
        type = JellyScore.TabNote;
      }
      note = new type((function() {
        switch (pitch.charCodeAt(0)) {
          case 97:
            return 5;
          case 98:
            return 6;
          case 99:
            return 0;
          case 100:
            return 1;
          case 101:
            return 2;
          case 102:
            return 3;
          case 103:
            return 4;
          default:
            throw this.ERRORS.NOTE_ERROR(pitch);
        }
      }).call(this));
      pos = 1;
      octave = this.currentBase.getOctave();
      while (pos < pitch.length) {
        c = pitch.charCodeAt(pos);
        if (c === 39) {
          octave++;
        } else if (c === 44) {
          octave--;
        } else if (c === 101) {
          if (pitch.length > pos + 1 && (pitch.charCodeAt(pos + 1)) === 115) {
            pos += 1;
            note.addAccidental(-1);
          }
        } else if (c === 105) {
          if (pitch.length > pos + 1 && (pitch.charCodeAt(pos + 1)) === 115) {
            pos += 1;
            note.addAccidental(1);
          }
        } else if (c === 115) {
          note.addAccidental(-1);
        }
        pos += 1;
      }
      note.setOctave(octave);
      if (this.relative) {
        if ((note.getValue() % 12) >= ((this.currentBase.getValue() % 12) + 6)) {
          note.setOctave(octave - 1);
        } else if ((note.getValue() % 12) <= ((this.currentBase.getValue() % 12) - 6)) {
          note.setOctave(octave + 1);
        }
        this.currentBase = note;
      }
      return note;
    };

    Parser.prototype.getDuration = function(duration) {
      var char, durationBuilder, _i, _len;
      durationBuilder = new JellyScore.DurationBuilder(this.currentDuration);
      if (duration != null) {
        for (_i = 0, _len = duration.length; _i < _len; _i++) {
          char = duration[_i];
          if (('0' <= char && char <= '9') || char === ".") {
            durationBuilder.addChar(char);
          }
        }
      }
      this.currentDuration = durationBuilder.getDuration();
      if (this.currentTimes != null) {
        this.currentDuration.setTimes(this.currentTimes);
      }
      return this.currentDuration;
    };

    Parser.prototype.getFret = function(fret) {
      if (fret != null) {
        return parseInt(fret.substring(1));
      } else {
        return null;
      }
    };

    Parser.prototype.parseCommand = function(i) {
      var block, commandName, j, _ref, _ref1;
      _ref = this.getStem(i), i = _ref[0], commandName = _ref[1];
      switch (commandName) {
        case "relative":
          i = this.parseRelative(i);
          break;
        case "new":
          i = this.parseNewStaff(i);
          break;
        case "time":
        case "numericTimeSignature\\time":
          i = this.parseTime(i);
          break;
        case "tempo":
          i = this.parseTempo(i);
          break;
        case "key":
          i = this.parseKey(i);
          break;
        case "clef":
          i = this.parseClef(i);
          break;
        case "set":
          i = this.parseSet(i);
          break;
        case "capo":
          i = this.parseCapo(i);
          break;
        case "context":
          i = this.parseContext(i);
          break;
        case "deadNote":
          i = this.parseDeadNote(i);
          break;
        case "markup":
          i = this.parseMarkup(i);
          break;
        case "markup{":
          i = this.parseMarkupBlock(i);
          break;
        case "fret-diagram":
          i = this.parseFretDiagram(i);
          break;
        case "skip":
          i = this.parseSkip(i);
          break;
        case "repeat":
          i = this.parseRepeat(i);
          break;
        case "transposition":
          i = this.parseTransposition(i);
          break;
        case "override":
          i = this.parseOverride(i);
          break;
        case "acciaccatura":
          i = this.parseMarkup(i);
          break;
        case "times":
          i = this.parseTimes(i);
          break;
        case "once":
          i = this.parseOnce(i);
          break;
        case "change":
          i = this.parseChange(i);
          break;
        case "hammer":
          this.hammer = true;
          break;
        case "slide":
          _ref1 = this.getStem(i), i = _ref1[0], this.slide = _ref1[1];
          break;
        case "bendAfter":
          i = this.parseBend(i);
          break;
        case "letring":
          this.letRing = true;
          break;
        case "prall":
          this.vibrato = true;
          break;
        case "palmMute":
          this.palmMute = true;
          break;
        case "section":
          i = this.parseSection(i);
          break;
        case "grace":
        case "appoggiatura":
        case "acciaccatura":
          i = this.parseGrace(i);
          break;
        default:
          block = this.vars[commandName];
          if (block != null) {
            j = i - (commandName.length + 1);
            this.text = (this.text.substring(0, j)) + block + this.text.substring(i);
            this.length = this.text.length;
            i = j - 1;
            this.ties = {};
          } else {
            JellyScore.warn("Unknown command '" + commandName + "'");
          }
      }
      return i;
    };

    Parser.prototype.parseText = function(i) {
      var text, _ref;
      _ref = this.getStem(i), i = _ref[0], text = _ref[1];
      if (text[0] === "\\") {
        i = this.parseCommand(i - text.length);
      }
      return i;
    };

    Parser.prototype.ignoreComment = function(i) {
      var _ref;
      while (++i < this.length && ((_ref = this.text[i]) !== '\n' && _ref !== '\r')) {
        true;
      }
      return i;
    };

    Parser.prototype.getBase = function(i) {
      var base, _ref, _ref1;
      base = "";
      while (i + 1 < this.length && ((_ref = this.text[i + 1]) === ' ' || _ref === '\n' || _ref === '\r' || _ref === '\t')) {
        ++i;
      }
      while (++i < this.length && ((_ref1 = this.text[i]) !== ' ' && _ref1 !== '\n' && _ref1 !== '\r' && _ref1 !== '\t' && _ref1 !== '{')) {
        base += this.text[i];
      }
      return [i - 1, base];
    };

    Parser.prototype.parseRelative = function(i) {
      var base, _ref;
      _ref = this.getBase(i), i = _ref[0], base = _ref[1];
      if (!this.isNote(base)) {
        throw this.ERRORS.NOTE_ERROR(base);
      }
      this.staff = new JellyScore.Staff();
      this.voice = new JellyScore.Voice();
      this.staff.addVoice(this.voice);
      this.score.addStaff(this.staff);
      this.currentOctave = 4;
      this.currentBase = new JellyScore.Note(0);
      this.currentBase.setOctave(4);
      this.currentBase = this.getPitch(base);
      this.currentDuration = new JellyScore.Duration(1);
      this.relative = true;
      return this.parseBlock(i);
    };

    Parser.prototype.parseNewStaff = function(i) {
      var staffType, _ref;
      _ref = this.getStem(i), i = _ref[0], staffType = _ref[1];
      this.voice = new JellyScore.Voice();
      switch (staffType.toLowerCase()) {
        case "tabstaff":
          this.staff = new JellyScore.TabStaff();
          break;
        case "staff":
          this.staff = new JellyScore.Staff();
          break;
        case "pianostaff":
          this.staff = new JellyScore.Staff();
          break;
        case "rhythmicstaff":
          this.staff = new JellyScore.Staff();
          break;
        default:
          return i;
      }
      this.staff.addVoice(this.voice);
      this.score.addStaff(this.staff);
      this.currentBase = new JellyScore.Note(0);
      this.currentBase.setOctave(4);
      this.currentDuration = new JellyScore.Duration(1);
      this.relative = false;
      return this.parseBlock(i);
    };

    Parser.prototype.parseBlock = function(i) {
      var c, countBrackets, endBlock, stem, _ref;
      this.transposition = 0;
      _ref = this.getStem(i), i = _ref[0], stem = _ref[1];
      endBlock = (function() {
        switch (stem) {
          case "{":
            return "}";
          case "<<":
            return ">>";
          default:
            if (stem[0] === "{") {
              i -= stem.length;
              stem = "{";
              return "}";
            }
        }
      })();
      if (endBlock != null) {
        countBrackets = 0;
        while (++i < this.length && ((this.stemDifferentAt(i, endBlock)) || countBrackets > 0)) {
          if (this.text.substr(i, endBlock.length) === endBlock) {
            countBrackets--;
          } else if (this.text.substr(i, stem.length) === stem) {
            countBrackets++;
            i += stem.length - 1;
            continue;
          }
          c = this.text[i];
          switch (c) {
            case '\\':
              i = this.parseCommand(i);
              break;
            case '#':
              i = this.parseCommand(i);
              break;
            case '%':
              i = this.ignoreComment(i);
              break;
            case '<':
              i = this.parseChord(i);
              break;
            case '~':
              i = this.parseTie(i);
              break;
            case '-':
              i = this.parseText(i);
              break;
            case '|':
              i = this.parseBar(i);
              break;
            default:
              if (this.isNote(c)) {
                i = this.parseNote(i - 1);
                this.onceOptions = {};
              } else if (this.isRest(c)) {
                i = this.parseRest(i - 1);
                this.onceOptions = {};
              }
          }
        }
      }
      return i;
    };

    Parser.prototype.parseMarkup = function(i) {
      var lyrics, markupText, stem, _ref;
      stem = this.text[i];
      markupText = "";
      while ((_ref = this.text[i++]) === ' ' || _ref === '\n' || _ref === ' \r' || _ref === '\t') {
        stem = this.text[i];
      }
      if (stem === '{') {
        while (this.charDifferentAt(i, '}')) {
          if (this.charDifferentAt(i, '\"')) {
            markupText += this.text[i];
          }
          i++;
        }
      } else if (stem === '\\') {
        i = this.parseCommand(i - 1);
      }
      lyrics = new JellyScore.Lyrics(null, markupText);
      this.voice.addTickableBefore(lyrics);
      return i;
    };

    Parser.prototype.parseMarkupBlock = function(i) {
      var block, _ref;
      _ref = this.getBlock(i - 2), i = _ref[0], block = _ref[1];
      return i;
    };

    Parser.prototype.parseFretDiagram = function(i) {
      var chordName, chordStr, diagramObj, fretDiagram, _ref, _ref1;
      _ref = this.getStem(i), i = _ref[0], chordStr = _ref[1];
      chordStr = chordStr.replace(/o/g, "0");
      _ref1 = chordStr.split(";"), chordName = _ref1[0], fretDiagram = _ref1[1];
      diagramObj = new JellyScore.FretDiagram(null, fretDiagram, this.Dict, chordName);
      this.voice.addTickableBefore(diagramObj);
      return i;
    };

    Parser.prototype.parseSection = function(i) {
      var section, sectionName, stem, _ref;
      stem = this.text[i];
      sectionName = "";
      while ((_ref = this.text[i++]) === ' ' || _ref === '\n' || _ref === ' \r' || _ref === '\t') {
        stem = this.text[i];
      }
      if (stem === '{') {
        while (this.charDifferentAt(i, '}')) {
          if (this.charDifferentAt(i, '\"')) {
            sectionName += this.text[i];
          }
          i++;
        }
      } else if (stem === '\\') {
        i = this.parseCommand(i - 1);
      }
      section = new JellyScore.Section(null, sectionName);
      this.voice.addTickable(section);
      return i;
    };

    Parser.prototype.parseBend = function(i) {
      var bendInfo, tmp, _ref;
      _ref = this.getStem(i), i = _ref[0], bendInfo = _ref[1];
      tmp = bendInfo.split("#");
      this.bendPitch = tmp[1];
      this.bendTime = tmp[2];
      return i;
    };

    Parser.prototype.parseSkip = function(i) {
      var d1, d2, duration, rest, times, _ref, _ref1, _ref2;
      _ref = this.getInteger(i), i = _ref[0], d1 = _ref[1];
      _ref1 = this.getChar(i - 1), i = _ref1[0], times = _ref1[1];
      if (typeof d1 === "number" && times === "*") {
        _ref2 = this.getInteger(i), i = _ref2[0], d2 = _ref2[1];
        if (typeof d2 === "number") {
          while (--d2 >= 0) {
            duration = new JellyScore.Duration(d1);
            rest = new JellyScore.InvisibleRest(duration);
            this.voice.addTickable(rest);
          }
        }
      }
      return i;
    };

    Parser.prototype.parseTime = function(i) {
      var t1, t2, _ref, _ref1;
      _ref = this.getInteger(i), i = _ref[0], t1 = _ref[1];
      if (this.text[i] === '/') {
        _ref1 = this.getInteger(i), i = _ref1[0], t2 = _ref1[1];
        this.voice.addTickable(new JellyScore.TimeChange(t1, t2));
      }
      return i;
    };

    Parser.prototype.parseTimes = function(i) {
      var oldTimes, t1, t2, _ref, _ref1;
      _ref = this.getInteger(i), i = _ref[0], t1 = _ref[1];
      if (this.text[i] === '/') {
        _ref1 = this.getInteger(i), i = _ref1[0], t2 = _ref1[1];
        this.currentDuration = this.currentDuration.clone();
        oldTimes = this.currentTimes;
        this.currentTimes = {
          n: t1,
          d: t2
        };
        i = this.parseBlock(i);
        this.currentTimes = oldTimes;
        this.currentDuration = this.currentDuration.clone();
      }
      return i;
    };

    Parser.prototype.parseTempo = function(i) {
      var equal, reference, tempo, _ref, _ref1, _ref2;
      _ref = this.getInteger(i), i = _ref[0], reference = _ref[1];
      _ref1 = this.getChar(i - 1), i = _ref1[0], equal = _ref1[1];
      if (equal === '=') {
        _ref2 = this.getInteger(i), i = _ref2[0], tempo = _ref2[1];
        this.voice.addTickable(new JellyScore.TempoChange(reference, tempo));
      }
      return i;
    };

    Parser.prototype.parseKey = function(i) {
      var key, majorFlag, _ref, _ref1;
      _ref = this.getStem(i), i = _ref[0], key = _ref[1];
      if (!this.isNote(key)) {
        throw this.ERRORS.NOTE_ERROR(key);
      }
      _ref1 = this.getStem(i), i = _ref1[0], majorFlag = _ref1[1];
      this.voice.addTickable(new JellyScore.KeySignatureChange(key, majorFlag === "\\major"));
      return i;
    };

    Parser.prototype.parseClef = function(i) {
      var clef, _ref;
      _ref = this.getStem(i), i = _ref[0], clef = _ref[1];
      this.voice.addTickable(new JellyScore.KeyChange(clef));
      return i;
    };

    Parser.prototype.parseSet = function(i) {
      var equal, tuning, value, variable, _ref, _ref1, _ref2;
      _ref = this.getStem(i), i = _ref[0], variable = _ref[1];
      _ref1 = this.getChar(i - 1), i = _ref1[0], equal = _ref1[1];
      if (equal === "=") {
        _ref2 = this.getStem(i), i = _ref2[0], value = _ref2[1];
        if (variable === "TabStaff.stringTunings") {
          tuning = (value.trim().split(' ')).map(function(i) {
            return 60 + parseInt(i);
          });
          this.staff.setTuning(tuning);
        }
      }
      return i;
    };

    Parser.prototype.parseCapo = function(i) {
      var capo, _ref;
      _ref = this.getStem(i), i = _ref[0], capo = _ref[1];
      capo = parseInt(capo);
      if (!isNaN(capo)) {
        this.staff.setCapo(capo);
      }
      return i;
    };

    Parser.prototype.parseOverride = function(i, once) {
      var attribute, equal, obj, object, options, value, _ref, _ref1, _ref2, _ref3;
      if (once == null) {
        once = false;
      }
      _ref = this.getStem(i), i = _ref[0], object = _ref[1];
      _ref1 = this.getStem(i), i = _ref1[0], attribute = _ref1[1];
      _ref2 = this.getChar(i - 1), i = _ref2[0], equal = _ref2[1];
      if (equal === "=") {
        _ref3 = this.getStem(i), i = _ref3[0], value = _ref3[1];
        if (attribute.slice(0, 2) === "#'") {
          attribute = attribute.slice(2);
        }
        if (value.slice(0, 2) === "#'") {
          value = value.slice(2);
        }
        options = once ? this.onceOptions : this.options;
        obj = options[object];
        if (!(obj != null)) {
          obj = options[object] = {};
        }
        obj[attribute] = value;
      }
      return i;
    };

    Parser.prototype.parseContext = function(i) {
      var context, equal, name, _ref, _ref1, _ref2;
      _ref = this.getStem(i), i = _ref[0], context = _ref[1];
      _ref1 = this.getChar(i - 1), i = _ref1[0], equal = _ref1[1];
      if (equal === "=") {
        _ref2 = this.getStem(i), i = _ref2[0], name = _ref2[1];
        switch (context) {
          case "Staff":
          case "RhythmicStaff":
          case "PianoStaff":
          case "DrumStaff":
            if (this.staffs[name] != null) {
              this.staff = this.staffs[name];
            } else {
              this.staff = new JellyScore.Staff();
              this.voice = new JellyScore.Voice();
              this.staff.addVoice(this.voice);
              this.score.addStaff(this.staff);
              this.currentBase = new JellyScore.Note(0);
              this.currentBase.setOctave(4);
              this.currentDuration = new JellyScore.Duration(1);
              i = this.parseBlock(i);
            }
            break;
          case "Voice":
          case "DrumVoice":
            if (this.voices[name] != null) {
              this.voice = this.voices[name];
              this.staff = this.voice.parent;
            } else {
              if (!(this.staff != null)) {
                this.staff = new JellyScore.Staff();
                this.score.addStaff(this.staff);
              }
              this.voice = new JellyScore.Voice();
              this.staff.addVoice(this.voice);
              i = this.parseBlock(i);
            }
        }
      } else if (equal === "<") {
        switch (context) {
          case "Staff":
          case "RhythmicStaff":
          case "PianoStaff":
          case "DrumStaff":
            this.staff = new JellyScore.Staff();
            this.voice = new JellyScore.Voice();
            this.staff.addVoice(this.voice);
            this.score.addStaff(this.staff);
            this.currentBase = new JellyScore.Note(0);
            this.currentBase.setOctave(4);
            this.currentDuration = new JellyScore.Duration(1);
            i = this.parseBlock(i - 1);
            break;
          case "Voice":
          case "DrumVoice":
            if (!(this.staff != null)) {
              this.staff = new JellyScore.Staff();
              this.score.addStaff(this.staff);
            }
            this.voice = new JellyScore.Voice();
            this.staff.addVoice(this.voice);
            i = this.parseBlock(i - 1);
        }
      }
      return i;
    };

    Parser.prototype.parseBar = function(i) {
      this.voice.addTickable(new JellyScore.Bar);
      return i;
    };

    Parser.prototype.parseRepeat = function(i) {
      var char, endRepeat, first, j, number, previousAlternative, start, startAlternative, stem, type, _ref, _ref1, _ref2, _ref3;
      _ref = this.getStem(i), i = _ref[0], type = _ref[1];
      _ref1 = this.getInteger(i), i = _ref1[0], number = _ref1[1];
      start = new JellyScore.StartRepeat(number);
      this.voice.addTickable(start);
      i = this.parseBlock(i);
      _ref2 = this.getStem(i), j = _ref2[0], stem = _ref2[1];
      _ref3 = this.getChar(j), j = _ref3[0], char = _ref3[1];
      endRepeat = new JellyScore.EndRepeat(start);
      this.voice.addTickable(endRepeat);
      if (stem === "\\alternative" && char === '{') {
        previousAlternative = null;
        i = j;
        first = true;
        while (++i < this.length && this.stemDifferentAt(i, '}')) {
          if (!this.stemDifferentAt(i, '{')) {
            startAlternative = new JellyScore.StartAlternative(start);
            endRepeat.addAlternative(startAlternative);
            this.voice.addTickable(startAlternative);
            i = this.parseBlock(i - 1);
            previousAlternative = new JellyScore.EndAlternative(start, startAlternative, endRepeat);
            this.voice.addTickable(previousAlternative);
            endRepeat.addEndAlternative(previousAlternative);
            if (first) {
              previousAlternative.setFirst(true);
              first = false;
            }
          }
        }
        if (previousAlternative != null) {
          previousAlternative.setLast(true);
        }
      }
      return i;
    };

    Parser.prototype.parseTransposition = function(i) {
      var note, stem, _ref;
      _ref = this.getStem(i), i = _ref[0], stem = _ref[1];
      note = this.getPitch(stem);
      this.transposition = ((note.getValue() - this.currentBase.getValue()) % 12) - 12;
      return i;
    };

    Parser.prototype.parseDeadNote = function(i) {
      return this.parseNote(i, {
        NoteHead: {
          style: 'cross'
        }
      });
    };

    Parser.prototype.parseOnce = function(i) {
      var stem, _ref;
      _ref = this.getStem(i), i = _ref[0], stem = _ref[1];
      if (stem === "\\override") {
        i = this.parseOverride(i, true);
      }
      return i;
    };

    Parser.prototype.parseChange = function(i) {
      var attribute, equal, value, _ref, _ref1, _ref2;
      _ref = this.getStem(i), i = _ref[0], attribute = _ref[1];
      _ref1 = this.getChar(i - 1), i = _ref1[0], equal = _ref1[1];
      if (equal === "=") {
        _ref2 = this.getStem(i), i = _ref2[0], value = _ref2[1];
      }
      return i;
    };

    Parser.prototype.parseGrace = function(i) {
      var c, j, _ref, _ref1;
      _ref = this.getChar(i), j = _ref[0], c = _ref[1];
      this.isGrace = true;
      switch (c) {
        case "<":
          i = this.parseChord(j);
          break;
        case "{":
          i = this.parseBlock(i);
          break;
        default:
          if (this.isNote(c)) {
            i = this.parseNote(i);
            this.onceOptions = {};
          } else {
            _ref1 = this.getStem(i), i = _ref1[0], c = _ref1[1];
            JellyScore.warn("parseGrace unexpected stem: " + c);
          }
      }
      this.isGrace = false;
      return i;
    };

    Parser.prototype.parseChord = function(i) {
      var command, duration, j, stem, voice, _i, _len, _ref, _ref1;
      if (this.text[i + 1] === '<') {
        return i + 1;
      }
      voice = this.voice;
      if (this.staff.whoAmI() === JellyScore.TabStaff) {
        this.voice = new JellyScore.TabChord();
      } else {
        this.voice = new JellyScore.Chord();
      }
      this.isInChord = true;
      while (this.charDifferentAt(i++, '>')) {
        switch (this.text[i]) {
          case '\\':
            i = this.parseCommand(i);
            break;
          case '#':
            i = this.parseCommand(i);
            break;
          case '~':
            i = this.parseTie(i);
            break;
          case '-':
            i = this.parseText(i);
            break;
          default:
            if (this.isNote(this.text[i])) {
              i = this.parseNote(i - 1);
            }
        }
      }
      this.slides = {};
      if (this.tmpSlides != null) {
        this.slides = this.tmpSlides;
      }
      if (this.tmpHammers != null) {
        this.hammers = this.tmpHammers;
      }
      delete this.tmpSlides;
      delete this.tmpHammers;
      this.isInChord = false;
      _ref = this.getStem(i - 1), i = _ref[0], stem = _ref[1];
      j = 0;
      _ref1 = stem.split("\\");
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        command = _ref1[_i];
        if (j === 0) {
          duration = command;
        } else if (command === "prall") {
          this.voice.vibrato = true;
        }
        j++;
      }
      duration = this.getDuration(duration);
      this.voice.setDuration(duration);
      if (this.isGrace) {
        this.voice.toGrace();
      } else {
        voice.addTickable(this.voice);
        this.lastNote = this.voice;
      }
      this.voice = voice;
      this.onceOptions = {};
      return i;
    };

    Parser.prototype.parseNote = function(i, options) {
      var currentNote, duration, finger, hasTie, j, note, pitch, stem, string, tie, type, _ref, _ref1;
      _ref = this.getStem(i), i = _ref[0], stem = _ref[1];
      hasTie = false;
      j = stem.indexOf('~');
      if (j >= 0) {
        hasTie = true;
        stem = stem.slice(0, j) + stem.substr(j + 1);
      }
      try {
        _ref1 = this.REGEXP.NOTE.exec(stem), note = _ref1[0], pitch = _ref1[1], duration = _ref1[2], string = _ref1[3], finger = _ref1[4];
      } catch (e) {
        JellyScore.error(stem);
        return i;
      }
      if (this.isGrace) {
        return i;
      }
      this.lastNote = currentNote = this.getPitch(pitch);
      string = this.getFret(string);
      if (string != null) {
        currentNote.setStringNbr(string);
      }
      string = currentNote.getStringNbr(this.staff.tuning);
      if (this.letRing) {
        currentNote.letRing = true;
        this.letRing = false;
      }
      if (this.palmMute) {
        currentNote.palmMute = true;
        this.palmMute = false;
      }
      if (this.vibrato) {
        currentNote.vibrato = true;
        this.vibrato = false;
      }
      if (this.hammers[string] != null) {
        currentNote.hammerFrom = this.hammers[string];
        this.hammers[string].refHammer = currentNote;
        delete this.hammers[string];
      }
      if (this.slides[string] != null) {
        currentNote.slideFrom = this.slides[string];
        this.slides[string].refSlide = currentNote;
        delete this.slides[string];
      }
      if (this.hammer) {
        if (this.isInChord) {
          if (!(this.tmpHammers != null)) {
            this.tmpHammers = {};
          }
          this.tmpHammers[string] = currentNote;
        } else {
          this.hammers[string] = currentNote;
        }
        this.hammer = false;
        currentNote.hammer = true;
      } else if (!this.isInChord) {
        this.hammers = {};
      }
      if (this.slide != null) {
        if (this.isInChord) {
          if (!(this.tmpSlides != null)) {
            this.tmpSlides = {};
          }
          this.tmpSlides[string] = currentNote;
        } else {
          this.slides[string] = currentNote;
        }
        currentNote.slideType = parseInt(this.slide.split("#")[1]);
        this.slide = null;
      } else if (!this.isInChord) {
        this.slides = {};
      }
      if ((this.bendPitch != null) && this.bendPitch.length !== 0) {
        currentNote.bendPitchArr = this.bendPitch.split("-");
        this.bendPitch = "";
      }
      if ((this.bendTime != null) && this.bendTime.length !== 0) {
        currentNote.bendTimeArr = this.bendTime.split("-");
        this.bendTime = "";
      }
      currentNote.setOptions(options);
      currentNote.setOptions(this.onceOptions);
      currentNote.setOptions(this.options);
      duration = this.getDuration(duration);
      currentNote.setDuration(duration);
      currentNote.setTransposition(this.transposition);
      tie = this.ties[currentNote.getValue()];
      if (tie != null) {
        type = this.staff.whoAmI() === JellyScore.TabStaff ? JellyScore.TabTie : JellyScore.Tie;
        currentNote = new type(currentNote, tie);
        this.ties[currentNote.getValue()] = null;
      }
      if (hasTie) {
        this.ties[currentNote.getValue()] = currentNote;
      }
      this.voice.addTickable(currentNote);
      this.lastNote = currentNote;
      return i;
    };

    Parser.prototype.parseRest = function(i) {
      var divide, duration, initDots, lastDuration, oldCurrentTimes, rest, restClass, stem, times, _ref, _ref1, _ref2, _ref3;
      _ref = this.getStem(i), i = _ref[0], stem = _ref[1];
      _ref1 = (stem.substr(1)).split('*'), duration = _ref1[0], times = _ref1[1];
      oldCurrentTimes = this.currentTimes;
      if (times != null) {
        _ref2 = times.split('/'), times = _ref2[0], divide = _ref2[1];
        if (divide != null) {
          try {
            times = parseInt(times);
            divide = parseInt(divide);
            times = Math.round(times / divide);
          } catch (e) {
            times = 1;
          }
        } else {
          try {
            times = parseInt(times);
          } catch (e) {
            times = 1;
          }
        }
      } else {
        times = 1;
      }
      duration = this.getDuration(duration);
      this.currentTimes = oldCurrentTimes;
      initDots = duration.getDots();
      restClass = (_ref3 = stem[0]) === 'S' || _ref3 === 's' ? JellyScore.InvisibleRest : JellyScore.Rest;
      while (times-- > 0) {
        rest = new restClass(duration);
        this.voice.addTickable(rest);
        duration.setDots(initDots);
        lastDuration = duration;
        while (duration.getDots() > 0) {
          lastDuration = new JellyScore.Duration(lastDuration.getBase() * 2);
          this.voice.addTickable(new restClass(lastDuration));
          duration.removeDot();
        }
      }
      return i;
    };

    Parser.prototype.parseTie = function(i) {
      var j, note, _ref;
      if (this.lastNote != null) {
        if ((_ref = this.lastNote.whoAmI()) === JellyScore.Chord || _ref === JellyScore.TabChord) {
          j = this.lastNote.notes.length - 1;
          while (j >= 0 && (this.ties[this.lastNote.notes[j].getValue()] != null)) {
            --j;
          }
          if (j >= 0) {
            note = this.lastNote.notes[j];
            this.ties[note.getValue()] = note;
          }
        } else {
          this.ties[this.lastNote.getValue()] = this.lastNote;
        }
      }
      return i;
    };

    Parser.prototype.parse = function() {
      var block, c, i, j, stem, _ref, _ref1, _ref2;
      this.options = {};
      this.onceOptions = {};
      this.vars = {};
      this.staffs = {};
      this.voices = {};
      this.ties = {};
      this.hammers = {};
      this.slides = {};
      this.transposition = 0;
      this.isGrace = false;
      this.hammer = false;
      this.letring = false;
      this.slide = null;
      this.bendPitch = "";
      this.bendTime = "";
      this.isInChord = false;
      this.score = new JellyScore.Score();
      this.score.chordDict = this.Dict;
      i = -1;
      this.length = this.text.length;
      while (++i < this.length) {
        c = this.text[i];
        switch (c) {
          case '\\':
            i = this.parseCommand(i);
            break;
          case '%':
            i = this.ignoreComment(i);
            break;
          default:
            if (__indexOf.call(this.SEPARATORS, c) < 0) {
              _ref = this.getStem(i - 1), i = _ref[0], stem = _ref[1];
              _ref1 = this.getChar(i - 1), j = _ref1[0], c = _ref1[1];
              if (c === '=') {
                _ref2 = this.getBlock(j), i = _ref2[0], block = _ref2[1];
                this.vars[stem] = block;
              }
            }
        }
      }
      this.score.clean();
      return this.score;
    };

    return Parser;

  })();

  JellyScore.Parser = Parser;

}).call(this);

(function() {
  var scores;

  JellyScore.loglevel = 0;

  scores = {};

  if (!(typeof window !== "undefined" && window !== null) && !(typeof module !== "undefined" && module !== null) && (typeof self !== "undefined" && self !== null)) {
    self.onmessage = function(event) {
      var clearTick, ctx, data, draw, drawTick, getResolution, id, init, k, parser, score, setResolution, _ref, _ref1, _ref2;
      data = event.data;
      id = data.id;
      if (id != null) {
        try {
          if (data.parse != null) {
            parser = new JellyScore.Parser(data.parse);
            score = parser.parse();
            score.setId(id);
            scores[id] = score;
          }
          score = scores[id];
          if (score != null) {
            getResolution = data.getResolution;
            if (getResolution != null) {
              score.getResolution();
              self.postMessage({
                getResolution: getResolution,
                id: id
              });
            }
            if (data.activeTabs != null) {
              score.activeTabs();
            }
            if (data.inactiveTabs != null) {
              score.inactiveTabs();
            }
            if (data.activeStaffs != null) {
              score.activeStaffs();
            }
            if (data.inactiveStaffs != null) {
              score.inactiveStaffs();
            }
            init = data.init;
            if ((data.activeTabs != null) || (data.inactiveTabs != null) || (data.activeStaffs != null) || (data.inactiveStaffs != null)) {
              score.init(true);
            } else if (init != null) {
              score.init(data.force === true);
            }
            setResolution = data.setResolution;
            if (setResolution != null) {
              score.setResolution(setResolution);
            }
            draw = data.draw;
            if (draw != null) {
              score._draw(draw, data.contextOptions);
              _ref = score.contexts;
              for (k in _ref) {
                ctx = _ref[k];
                ctx.postMessages();
              }
              self.postMessage({
                id: id,
                endDrawing: true
              });
            }
            clearTick = data.clearTick;
            if (clearTick != null) {
              score.clearTick(clearTick, data.options);
              _ref1 = score.contexts;
              for (k in _ref1) {
                ctx = _ref1[k];
                ctx.postMessages();
              }
            }
            drawTick = data.drawTick;
            if (drawTick != null) {
              score.drawTick(drawTick, data.options);
              _ref2 = score.contexts;
              for (k in _ref2) {
                ctx = _ref2[k];
                ctx.postMessages();
              }
            }
          }
        } catch (e) {
          self.postMessage({
            log: String(e)
          });
        }
      }
      return self.postMessage({
        ended: true,
        id: id
      });
    };
  }

}).call(this);

(function() {
  var cache, scores, url, worker;

  scores = {};

  worker = null;

  JellyScore.loglevel = 0;

  if (false && ((typeof window !== "undefined" && window !== null ? window.Worker : void 0) != null)) {
    try {
      throw new Error();
    } catch (e) {
      url = (new RegExp('https?://.*?\\.js:', 'i')).exec(e.stack);
      if ((url != null) && url.length > 0) {
        url = url[0];
        url = url.slice(0, url.length - 1);
        try {
          worker = new window.Worker(url);
        } catch (e) {
          console.log(e);
        }
        if (worker != null) {
          worker.onmessage = function(e) {
            var data, key, score, value, _results;
            data = e.data;
            if (data.log != null) {
              console.log(data.log);
            }
            if (data.id != null) {
              score = scores[data.id];
              if (score != null) {
                return score.onmessage(data);
              }
            } else {
              _results = [];
              for (key in data) {
                value = data[key];
                if (value.id != null) {
                  score = scores[value.id];
                  if (score != null) {
                    score.onmessage(value);
                  }
                }
                if (value.log != null) {
                  _results.push(console.log(value.log));
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            }
          };
        }
      }
    }
  }

  cache = {};

  JellyScore.ScoreInterface = (function() {

    function ScoreInterface(id, container) {
      this.id = id != null ? id : this.generateId();
      this.container = container != null ? container : null;
      this.context = null;
      this.savedContext = {};
      scores[this.id] = this;
      this.queue = [];
      this.callbacks = {};
      this.contextOptions = {};
      this.canvases = {};
      this.contexts = {};
      this.localCopy = true;
      this.eventHandler = $("<span></span>");
      $('body').append(this.eventHandler);
    }

    ScoreInterface.prototype.resetScore = function() {
      var duration, i, j, numberBar, rest, staff, voice, _i, _j;
      this.score = new JellyScore.Score();
      voice = new JellyScore.Voice();
      staff = new JellyScore.Staff();
      staff.addVoice(voice);
      this.score.addStaff(staff);
      this.score.chordDict = new JellyScore.ChordsDict();
      numberBar = 16;
      for (i = _i = 1; 1 <= numberBar ? _i <= numberBar : _i >= numberBar; i = 1 <= numberBar ? ++_i : --_i) {
        for (j = _j = 0; _j <= 3; j = ++_j) {
          duration = new JellyScore.Duration(4);
          rest = new JellyScore.Rest(duration);
          voice.addTickable(rest);
        }
      }
      this.score.resolution = 16;
      return this.score.init();
    };

    ScoreInterface.prototype.addNote = function(tick, midiNote, duration) {
      this.score.addNote(tick, midiNote, duration, 16);
      this.score.init();
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.changeNote = function(tick, midiNote, duration) {
      this.score.changeNote(tick, midiNote, duration, 16);
      this.score.init();
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.changeNoteDuration = function(tick, duration) {
      this.score.changeNoteDuration(tick, duration);
      this.score.init();
      return this.draw(this.container, this.contextOptions);
    };

    ScoreInterface.prototype.generateId = function() {
      var i, id;
      i = 0;
      id = "noid_0";
      while (scores[id] != null) {
        id = "noid_" + (++i);
      }
      return id;
    };

    ScoreInterface.prototype.setLocalCopy = function(localCopy) {
      return this.localCopy = localCopy || !(worker != null);
    };

    ScoreInterface.prototype.parse = function(data) {
      var parser;
      this.postMessage({
        parse: data,
        id: this.id
      });
      if (this.localCopy) {
        parser = new JellyScore.Parser(data);
        return this.score = parser.parse();
      }
    };

    ScoreInterface.prototype.init = function(force) {
      if (force == null) {
        force = false;
      }
      this.postMessage({
        init: true,
        force: force,
        id: this.id
      });
      if (this.localCopy) {
        return this.score.init(force);
      }
    };

    ScoreInterface.prototype.activeTabs = function() {
      this.postMessage({
        activeTabs: true,
        id: this.id
      });
      if (this.localCopy) {
        this.score.activeTabs();
        this.score.init(true);
      }
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.inactiveTabs = function() {
      this.postMessage({
        inactiveTabs: true,
        id: this.id
      });
      if (this.localCopy) {
        this.score.inactiveTabs();
        this.score.init(true);
      }
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.activeStaffs = function() {
      this.postMessage({
        activeStaffs: true,
        id: this.id
      });
      if (this.localCopy) {
        this.score.activeStaffs();
        this.score.init(true);
      }
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.inactiveStaffs = function() {
      this.postMessage({
        inactiveStaffs: true,
        id: this.id
      });
      if (this.localCopy) {
        this.score.inactiveStaffs();
        this.score.init(true);
      }
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.setStaffsOnly = function() {
      this.postMessage({
        activeStaffs: true,
        inactiveTabs: true,
        id: this.id
      });
      if (this.localCopy) {
        this.score.activeStaffs();
        this.score.inactiveTabs();
        this.score.init(true);
      }
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.setTabsOnly = function() {
      this.postMessage({
        inactiveStaffs: true,
        activeTabs: true,
        id: this.id
      });
      if (this.localCopy) {
        this.score.inactiveStaffs();
        this.score.activeTabs();
        this.score.init(true);
      }
      if (this.container != null) {
        return this.draw(this.container, this.contextOptions);
      }
    };

    ScoreInterface.prototype.areStaffsActive = function() {
      if (this.localCopy) {
        return this.score.areStaffsActive();
      }
    };

    ScoreInterface.prototype.areTabsActive = function() {
      if (this.localCopy) {
        return this.score.areTabsActive();
      }
    };

    ScoreInterface.prototype.draw = function(container, contextOptions) {
      var width;
      this.container = container;
      this.displaySpinner();
      this.container.css('position', 'relative');
      $.extend(this.contextOptions, contextOptions);
      width = this.container.width();
      this.postMessage({
        id: this.id,
        draw: {
          width: width
        },
        contextOptions: this.contextOptions
      });
      if (this.localCopy) {
        this.score.container = this.container;
      }
      if (worker != null) {
        if (this.localCopy) {
          return this.score.prepareDrawing({
            width: width
          }, this.contextOptions);
        }
      } else {
        this.score.draw(this.container, this.contextOptions);
        this.canvas = this.score.canvas;
        return this.bindEverything();
      }
    };

    ScoreInterface.prototype.drawTick = function(tick, options) {
      options.resolution = this.getResolution();
      if (this.localCopy) {
        return this.score.drawTick(tick, options);
      } else {
        return this.postMessage({
          id: this.id,
          drawTick: tick,
          options: options
        });
      }
    };

    ScoreInterface.prototype.clearTick = function(tick, options) {
      if (this.localCopy) {
        return this.score.clearTick(tick, {
          resolution: this.getResolution()
        });
      } else {
        return this.postMessage({
          id: this.id,
          clearTick: tick,
          options: {
            resolution: this.getResolution()
          }
        });
      }
    };

    ScoreInterface.prototype.clearHighlight = function() {
      if (this.localCopy) {
        return this.score.clearHighlight();
      }
    };

    ScoreInterface.prototype.setResolution = function(resolution) {
      this.resolution = resolution;
      if (this.localCopy) {
        this.score.setResolution(this.resolution);
        if (this.score.alreadyInit === true) {
          return this.score.init(true);
        }
      }
    };

    ScoreInterface.prototype.getResolution = function() {
      if (this.localCopy) {
        return this.score.getResolution();
      }
    };

    ScoreInterface.prototype.getLocalResolution = function(t1, t2, resolution) {
      if (resolution == null) {
        resolution = 1;
      }
      if (this.localCopy) {
        return this.score.getLocalResolution(t1, t2, resolution);
      }
    };

    ScoreInterface.prototype.setInstrument = function(instrument) {
      this.instrument = instrument;
      return this.trigger("changeInstrument");
    };

    ScoreInterface.prototype.getInstrument = function() {
      return this.instrument;
    };

    ScoreInterface.prototype.getLastTimeChange = function(tick) {
      if (this.localCopy) {
        return this.score.getLastTimeChange(tick);
      }
    };

    ScoreInterface.prototype.getLastTempoChange = function(tick) {
      if (this.localCopy) {
        return this.score.getLastTempoChange(tick);
      }
    };

    ScoreInterface.prototype.getTicksAt = function(tick) {
      if (this.localCopy) {
        return this.score.getTicksAt(tick);
      }
    };

    ScoreInterface.prototype.getChordWidth = function(chordName) {
      var ctx, textWidth;
      ctx = new JellyScore.Context();
      ctx.save();
      ctx.beginPath();
      ctx.font = 16 * this.contextOptions.scale + "px Calibri bold";
      textWidth = ctx.measureText(chordName).width + 10;
      ctx.restore();
      return textWidth;
    };

    ScoreInterface.prototype.highlightTick = function() {
      if (this.localCopy) {
        return this.score.highlightTick.apply(this.score, arguments);
      }
    };

    ScoreInterface.prototype.selectTick = function() {
      if (this.localCopy) {
        return this.score.selectTick.apply(this.score, arguments);
      }
    };

    ScoreInterface.prototype.hasTickOn = function() {
      if (this.localCopy) {
        return this.score.hasTickOn.apply(this.score, arguments);
      }
    };

    ScoreInterface.prototype.removeHighlight = function() {
      if (this.localCopy) {
        return this.score.removeHighlight();
      }
    };

    ScoreInterface.prototype.postMessage = function(message) {
      this.queue.push(message);
      if (this.queue.length === 1) {
        return this._postMessage(message);
      }
    };

    ScoreInterface.prototype._postMessage = function(message) {
      if (worker != null) {
        return worker.postMessage(message);
      }
    };

    ScoreInterface.prototype.onmessage = function(data) {
      var funct, key, value, _results;
      _results = [];
      for (key in data) {
        value = data[key];
        funct = this['on' + key];
        if ((funct != null) && typeof funct === "function") {
          _results.push(funct.apply(this, [value, data]));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ScoreInterface.prototype.onended = function() {
      var _ref;
      if (((_ref = this.queue[0]) != null ? _ref.draw : void 0) != null) {
        this.removeSpinner();
        this.bindEverything();
      }
      this.queue.splice(0, 1);
      if (this.queue.length > 0) {
        return this._postMessage(this.queue[0]);
      }
    };

    ScoreInterface.prototype.displaySpinner = function() {
      if (this.container.find('div.spinner').length === 0) {
        return this.container.append('<div class="spinner"></div>');
      }
    };

    ScoreInterface.prototype.removeSpinner = function() {
      return this.container.find('div.spinner').remove();
    };

    ScoreInterface.prototype.oncreateCanvas = function(options) {
      var canvas;
      this.removeHighlight();
      this.container.find('canvas').remove();
      this.container.css('position', 'relative');
      this.canvas = $("<canvas width=\"" + options.width + "\" height=\"" + options.height + "\"></canvas>");
      if (this.localCopy) {
        this.score.canvas = this.canvas;
      }
      this.bindEverything();
      canvas = this.canvas[0];
      if ((canvas != null ? canvas.getContext : void 0) != null) {
        return this.context = canvas.getContext('2d');
      }
    };

    ScoreInterface.prototype.onaddCanvas = function(options) {
      var canvas;
      if (this.canvases[options.contextId] != null) {
        this.canvases[options.contextId].remove();
      }
      this.canvases[options.contextId] = canvas = $("<canvas width=\"" + options.width + "\" height=\"" + options.height + "\"></canvas>");
      if (options.highlight) {
        canvas.addClass("highlight");
        canvas.css('margin-top', "-" + options.height + "px");
      }
      if (this.localCopy) {
        this.score.canvases[options.contextId] = canvas;
      }
      this.container.append(canvas);
      canvas = canvas[0];
      if ((canvas != null ? canvas.getContext : void 0) != null) {
        this.contexts[options.contextId] = canvas.getContext('2d');
        if (this.localCopy) {
          return this.score.contexts[options.contextId] = this.contexts[options.contextId];
        }
      }
    };

    ScoreInterface.prototype.onclearContainer = function() {
      return this.container.empty();
    };

    ScoreInterface.prototype.clearCanvas = function(options) {
      if (this.canvases[options.contextId] != null) {
        return this.canvases[options.contextId][0].width = this.canvases[options.contextId][0].width;
      }
    };

    ScoreInterface.prototype.ondisplayCanvas = function() {
      return this.container.append(this.canvas);
    };

    ScoreInterface.prototype.bindEverything = function() {
      var _this = this;
      this.container.unbind('mousemove');
      this.container.unbind('mousedown');
      this.container.unbind('mouseup');
      this.container.unbind('mouseout');
      $(document).unbind('keydown');
      this.container.mousemove(function(e) {
        return _this._onMouseMove(e);
      });
      this.container.mousedown(function(e) {
        return _this._onMouseDown(e);
      });
      this.container.mouseup(function(e) {
        return _this._onMouseUp(e);
      });
      this.container.mouseout(function(e) {
        return _this._onMouseOut(e);
      });
      return $(document).keydown(function(e) {
        return _this._onKeyDown(e);
      });
    };

    ScoreInterface.prototype.onset = function(data, args) {
      var ctx, key, value, _ref, _results;
      ctx = (_ref = this.caching) != null ? _ref : this.contexts[args.contextId];
      if (ctx != null) {
        _results = [];
        for (key in data) {
          value = data[key];
          _results.push(ctx[key] = value);
        }
        return _results;
      }
    };

    ScoreInterface.prototype.onstartCaching = function(id) {
      cache[id] = document.createElement("canvas");
      return this.caching = cache[id].getContext('2d');
    };

    ScoreInterface.prototype.onstopCaching = function(id) {
      return this.caching = null;
    };

    ScoreInterface.prototype.onscore = function(score) {};

    ScoreInterface.prototype.onctx = function(ctx, data) {
      var args, context, _ref;
      if (ctx != null) {
        context = (_ref = this.caching) != null ? _ref : this.contexts[data.contextId];
        if ((context != null) && (context[ctx] != null)) {
          args = data.args;
          if (args != null) {
            if (args[5] != null) {
              args.length = 6;
            } else if (args[4] != null) {
              args.length = 5;
            } else if (args[3] != null) {
              args.length = 4;
            } else if (args[2] != null) {
              args.length = 3;
            } else if (args[1] != null) {
              args.length = 2;
            } else if (args[0] != null) {
              args.length = 1;
            } else {
              args.length = 0;
            }
            if (ctx === 'drawImage' && (args[0] != null) && (cache[args[0]] != null)) {
              args[0] = cache[args[0]];
            }
            return context[ctx].apply(context, Array.prototype.slice.call(args));
          } else {
            return context[ctx]();
          }
        }
      }
    };

    ScoreInterface.prototype.getAllNotes = function(notes) {
      if (notes == null) {
        notes = {};
      }
      if (this.localCopy != null) {
        return this.score.getAllNotes(notes);
      } else {
        return notes;
      }
    };

    ScoreInterface.prototype.bind = function() {
      return this.eventHandler.bind.apply(this.eventHandler, arguments);
    };

    ScoreInterface.prototype.unbind = function() {
      return this.eventHandler.unbind.apply(this.eventHandler, arguments);
    };

    ScoreInterface.prototype.trigger = function() {
      return this.eventHandler.trigger.apply(this.eventHandler, arguments);
    };

    ScoreInterface.prototype._onKeyDown = function(e) {
      var charCode, durationArr, fret, tickDuration;
      if (this.score.editMode === true) {
        charCode = event.which;
        if (!e.ctrlKey) {
          if (charCode >= 48 && charCode <= 57) {
            fret = String.fromCharCode(charCode);
            return this.score.requestNewNote(fret);
          } else if (charCode === 46 || charCode === 8) {
            return this.score.requestDeleteNote();
          } else if (charCode === 37) {
            return console.log("get previous tick");
          } else if (charCode === 39) {
            return console.log("get next tick");
          } else if (charCode === 38) {
            return console.log("get up string");
          } else if (charCode === 40) {
            return console.log("get down string");
          } else if (charCode === 65) {
            return this.score.divideDurationByTwo();
          } else if (charCode === 90) {
            return this.score.multiplyDurationByTwo();
          } else if (charCode === 190) {
            return this.score.toggleDottedNote();
          } else if (charCode === 78) {
            this.addNote(0, 50, 4);
            durationArr = [1, 2, 4, 8];
            tickDuration = durationArr[Math.floor(Math.random() * durationArr.length)];
            return this.changeNoteDuration(0, tickDuration);
          }
        } else {
          if (charCode === 90) {
            this.score.undoEditor(this.container, this.contextOptions);
          }
          if (charCode === 89) {
            return this.score.redoEditor(this.container, this.contextOptions);
          }
        }
      }
    };

    ScoreInterface.prototype._onMouseMove = function(e) {
      var fretTickable, height, p, posChord, tick, width, x, y, _i, _len, _ref, _ref1, _ref2, _results;
      if (this.localCopy) {
        p = this.container.offset();
        x = e.pageX - p.left;
        y = e.pageY - p.top;
        _ref = this.score.getBarFromPos(x, y), e.bar = _ref[0], e.posBar = _ref[1];
        if ((e.bar != null) && (e.posBar != null)) {
          _ref1 = this.score.getTickFromPos(x, y, e.bar, e.posBar), e.tick = _ref1[0], e.posTick = _ref1[1];
        }
        if ((e.posBar != null) && y <= e.posBar.y) {
          this.hideHovers();
          _ref2 = e.bar.ticks;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            tick = _ref2[_i];
            fretTickable = this.score.getFretDiagramAt(tick);
            if (fretTickable != null) {
              height = e.bar.paddingTop > 0 ? e.bar.paddingTop / 1.5 : 0;
              width = this.getChordWidth(fretTickable.chordName);
              posChord = {
                x: fretTickable.position.x,
                width: width,
                height: height,
                y: e.posBar.y - height
              };
              if (this.isInFrame(posChord, {
                x: x,
                y: y
              })) {
                _results.push(this.displayHoverChord(posChord));
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else if (this.score.editMode === false) {
          if (this.startSelection != null) {
            this.displaySelection(this.startSelection.posTick, e.posTick);
          } else {
            this.displayHoverBar(e.posBar);
            this.displayHoverTick(e.posTick, e.tick);
          }
          return this.trigger(e);
        }
      }
    };

    ScoreInterface.prototype.isInFrame = function(framePos, mousePos) {
      var testX, testY;
      testX = mousePos.x >= framePos.x && mousePos.x <= (framePos.x + framePos.width);
      testY = mousePos.y >= framePos.y && mousePos.y <= (framePos.y + framePos.height);
      return testX && testY;
    };

    ScoreInterface.prototype._onMouseOut = function(e) {
      return this.hideHovers();
    };

    ScoreInterface.prototype._onMouseDown = function(e) {
      var $diagramContainer, fretTickable, p, posChord, tick, width, x, y, _i, _len, _ref, _ref1, _ref2, _results;
      if (this.localCopy) {
        p = this.container.offset();
        x = e.pageX - p.left;
        y = e.pageY - p.top;
        _ref = this.score.getBarFromPos(x, y), e.bar = _ref[0], e.posBar = _ref[1];
        if ((e.bar != null) && (e.posBar != null)) {
          if (y <= e.posBar.y) {
            _ref1 = e.bar.ticks;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              tick = _ref1[_i];
              fretTickable = this.score.getFretDiagramAt(tick);
              if (fretTickable != null) {
                width = this.getChordWidth(fretTickable.chordName);
                posChord = {
                  x: fretTickable.position.x,
                  width: width,
                  height: e.bar.paddingTop,
                  y: e.posBar.y - e.bar.paddingTop
                };
                if (this.isInFrame(posChord, {
                  x: x,
                  y: y
                })) {
                  if (fretTickable.diagramContainer != null) {
                    fretTickable.diagramContainer.remove();
                    _results.push(fretTickable.diagramContainer = null);
                  } else {
                    $diagramContainer = this.displayCanvasChord(posChord);
                    _results.push(fretTickable.drawChordDiagram($diagramContainer));
                  }
                } else {
                  _results.push(void 0);
                }
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            _ref2 = this.score.getTickFromPos(x, y, e.bar, e.posBar), e.tick = _ref2[0], e.posTick = _ref2[1];
            this.startSelection = {
              tick: e.tick,
              posTick: e.posTick
            };
            this.hideHovers();
            return this.trigger(e);
          }
        }
      }
    };

    ScoreInterface.prototype._onMouseUp = function(e) {
      var height, line, p, previousY, startSelection, tmp, x, y, _ref, _ref1, _ref2;
      if (this.localCopy) {
        p = this.container.offset();
        x = e.pageX - p.left;
        y = e.pageY - p.top;
        _ref = this.score.getLineFromPos(y), line = _ref[0], previousY = _ref[1], height = _ref[2];
        _ref1 = this.score.getBarFromPos(x, y), e.bar = _ref1[0], e.posBar = _ref1[1];
        if ((e.bar != null) && (e.posBar != null)) {
          _ref2 = this.score.getTickFromPos(x, y, e.bar, e.posBar), e.tick = _ref2[0], e.posTick = _ref2[1];
          this.score.selectNoteFromPos(x, y);
          this.trigger(e);
          if (this.startSelection != null) {
            startSelection = this.startSelection;
            this.endSelection = {
              tick: e.tick,
              posTick: e.posTick
            };
            if (this.startSelection.tick > this.endSelection.tick) {
              tmp = this.startSelection;
              this.startSelection = this.endSelection;
              this.endSelection = tmp;
            }
            this.endSelection.tick = this.endSelection.tick + (this.score.getDurationOn(this.endSelection.tick)) - 1;
            e.startSelection = this.startSelection;
            e.endSelection = this.endSelection;
            if (startSelection.tick === e.tick) {
              if (!(this.currentSelection != null) || (this.startSelection.tick >= this.currentSelection.start.tick && this.startSelection.tick <= this.currentSelection.end.tick)) {
                e.type = "click";
                this.selectTick(e.tick);
                this.trigger(e);
              } else {
                this.startSelection = null;
                this.currentSelection = null;
                this.hideSelection();
                e.type = "endselection";
                this.trigger(e);
              }
            } else {
              this.currentSelection = {
                start: this.startSelection,
                end: this.endSelection
              };
              this.selectTick(this.startSelection.tick);
              e.type = "selection";
              this.trigger(e);
            }
          }
        }
        if (this.startSelection != null) {
          return this.startSelection = null;
        }
      }
    };

    ScoreInterface.prototype.select = function(fromTick, endTick) {};

    ScoreInterface.prototype.displayCanvasChord = function(posCanvas) {
      var $canvas, $diagramContainer;
      $canvas = $("<canvas width=\"105\" height=\"95\" class=\"chord-diagram\"></canvas>");
      $diagramContainer = $("<div class=\"jellyscore-chord-preview\"></div>");
      $diagramContainer.css('position', 'absolute');
      $diagramContainer.append($canvas);
      this.container.append($diagramContainer);
      $diagramContainer.css({
        width: 105,
        height: 95,
        top: posCanvas.y - 95,
        left: posCanvas.x - ((105 - posCanvas.width) / 2)
      });
      return $diagramContainer;
    };

    ScoreInterface.prototype.displayHoverChord = function(posChord) {
      if (posChord != null) {
        if (!(this.hoverContainer != null)) {
          this.hoverContainer = $("<div class=\"jellyscore-hover jellyscore-chord\"></div>");
          this.hoverContainer.css('position', 'absolute');
          this.container.append(this.hoverContainer);
        }
        return this.hoverContainer.css({
          width: posChord.width,
          height: posChord.height,
          top: posChord.y,
          left: posChord.x
        });
      }
    };

    ScoreInterface.prototype.displayHoverBar = function(posBar) {
      if (posBar != null) {
        if (!(this.hoverContainer != null)) {
          this.hoverContainer = $("<div class=\"jellyscore-hover jellyscore-bar\"></div>");
          this.hoverContainer.css('position', 'absolute');
          this.container.append(this.hoverContainer);
        }
        return this.hoverContainer.css({
          width: posBar.width,
          height: posBar.height,
          top: posBar.y,
          left: posBar.x
        });
      }
    };

    ScoreInterface.prototype.displayHoverTick = function(posTick, tick) {
      if (posTick != null) {
        if (!(this.tickHoverContainer != null)) {
          this.tickHoverContainer = $("<div class=\"jellyscore-hover jellyscore-tick\"></div>");
          this.tickHoverContainer.css('position', 'absolute');
          this.container.append(this.tickHoverContainer);
        }
        return this.tickHoverContainer.css({
          width: posTick.width,
          height: posTick.height,
          top: posTick.y,
          left: posTick.x
        });
      }
    };

    ScoreInterface.prototype.hideHovers = function() {
      if (this.hoverContainer != null) {
        this.hoverContainer.remove();
        this.hoverContainer = null;
      }
      if (this.tickHoverContainer != null) {
        this.tickHoverContainer.remove();
        return this.tickHoverContainer = null;
      }
    };

    ScoreInterface.prototype.hideSelection = function() {
      this.startSelection = null;
      this.currentSelection = null;
      if (this.firstLineSelection != null) {
        this.firstLineSelection.remove();
        this.firstLineSelection = null;
      }
      if (this.middleLineSelection != null) {
        this.middleLineSelection.remove();
        this.middleLineSelection = null;
      }
      if (this.lastLineSelection != null) {
        this.lastLineSelection.remove();
        return this.lastLineSelection = null;
      }
    };

    ScoreInterface.prototype.displaySelection = function(from, to) {
      var _ref;
      if ((from != null) && (to != null)) {
        if (to.y < from.y || (to.y === from.y && to.x < from.x)) {
          _ref = [from, to], to = _ref[0], from = _ref[1];
        }
        if (!(this.firstLineSelection != null)) {
          this.firstLineSelection = $("<div class=\"jellyscore-selection jellyscore-selection-first\"></div>");
          this.firstLineSelection.css('position', 'absolute');
          this.container.append(this.firstLineSelection);
        }
        if (!(this.middleLineSelection != null)) {
          this.middleLineSelection = $("<div class=\"jellyscore-selection jellyscore-selection-middle\"></div>");
          this.middleLineSelection.css('position', 'absolute');
          this.container.append(this.middleLineSelection);
        }
        if (!(this.lastLineSelection != null)) {
          this.lastLineSelection = $("<div class=\"jellyscore-selection jellyscore-selection-last\"></div>");
          this.lastLineSelection.css('position', 'absolute');
          this.container.append(this.lastLineSelection);
        }
        if (from.y === to.y) {
          this.middleLineSelection.css({
            top: from.y,
            left: from.x,
            width: to.width + to.x - from.x,
            height: from.height
          });
          this.firstLineSelection.css({
            width: 0,
            height: 0
          });
          return this.lastLineSelection.css({
            width: 0,
            height: 0
          });
        } else {
          this.firstLineSelection.css({
            top: from.y,
            left: from.x,
            width: this.container.width() - from.x,
            height: from.height
          });
          this.middleLineSelection.css({
            top: from.y + from.height,
            left: 0,
            width: this.container.width(),
            height: to.y - (from.y + from.height)
          });
          return this.lastLineSelection.css({
            top: to.y,
            left: 0,
            width: to.x + to.width,
            height: to.height
          });
        }
      }
    };

    ScoreInterface.prototype.click = function(callback) {
      return this.bind('click', callback);
    };

    ScoreInterface.prototype.mousemove = function(callback) {
      return this.bind('mousemove', callback);
    };

    ScoreInterface.prototype.mousedown = function(callback) {
      return this.bind('mousedown', callback);
    };

    ScoreInterface.prototype.mouseup = function(callback) {
      return this.bind('mouseup', callback);
    };

    ScoreInterface.prototype.selection = function(callback) {
      return this.bind('selection', callback);
    };

    ScoreInterface.prototype.endselection = function(callback) {
      return this.bind('endselection', callback);
    };

    return ScoreInterface;

  })();

}).call(this);

