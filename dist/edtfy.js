(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.edtfy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {

var locale = 'en';

var parser = _dereq_('./tmp/edtfy.js');

var fr = _dereq_('./locales/fr');
var en = _dereq_('./locales/en');

var i18n = function(string, localeData) {
  localeData.months.forEach(function(month, i){
    i++;
    i = i >9 ? i : '0' + i;
    string = string.replace(new RegExp('\\b' + month + '\\b', 'g'), 'M' + i);
  });
  localeData.seasons.forEach(function(season, i){
    i++;
    i = '2' + i;
    string = string.replace(new RegExp('\\b' + season + '\\b', 'g'), 'S' + i);
  });
  string = string.replace(new RegExp('\\b' + localeData.century + '\\b', 'g'), 'C');
  string = string.replace(new RegExp('\\b' + localeData.around + '\\b', 'g'), '~');
  string = string.replace(new RegExp('\\b' + localeData.between1 + '\\b', 'g'), 'B1');
  string = string.replace(new RegExp('\\b' + localeData.between2 + '\\b', 'g'), 'B2');
  string = string.replace(new RegExp('\\b' + localeData.and + '\\b', 'g'), 'A');
  string = string.replace(new RegExp('\\b' + localeData.or + '\\b', 'g'), 'O');
  string = string.replace(new RegExp('\\b' + localeData.unknown + '\\b', 'g'), 'U');
  string = string.replace(new RegExp('\\b' + localeData.open + '\\b', 'g'), 'OP');
  string = string.replace(new RegExp('\\b' + localeData.before, 'g'), 'BF');
  string = string.replace(new RegExp('\\b' + localeData.after, 'g'), 'AF');
  string = string.replace(new RegExp('\\b' + localeData.days + '\\b', 'g'), '');
  string = string.replace(new RegExp(' *(' + localeData.negative + ')\\b', 'g'), ' NEG');
  string = string.replace(new RegExp(' *(' + localeData.positive + ')\\b', 'g'), '');
  return string;
};

module.exports = function(string, options) {
  options = options || {};
  options.locale = options.locale || locale;
  var localeData = options.locale === 'en' ? en : fr;
  string = string.trim()
    .toLowerCase()
    .replace(/ +/g, ' ')
    .replace(/[,.]/g, '')
    .replace(/[àáâãäå]/g,"a")
    .replace(/ç/g,"c")
    .replace(/[èéêë]/g,"e")
    .replace(/[ìíîï]/g,"i")
    .replace(/[òóôõö]/g,"o")
    .replace(/[ùúûü]/g,"u")
    .replace(/[ýÿ]/g,"y")
    .replace(/\ble\b/g, '').replace(/\ben\b\s*(\d)/g, '$1').replace(/\bl'\b/g, '').replace(/\bl'an\b/g, '')
    .replace(/(\d+)\s?eme\b/g, '$1').replace(/(\d+)\s?er\b/g, '$1').replace(/(\d+)\s?e\b/g, '$1')
    .replace(/\bthe\b/g, '').replace(/\bin\b/g, '')
    .replace(/(\d+)\s?st\b/g, '$1').replace(/(\d+)\s?nd\b/g, '$1').replace(/(\d+)\s?rd\b/g, '$1').replace(/(\d+)\s?th\b/g, '$1')
    .replace(/ +/g, ' ');
    string = i18n(string, localeData).trim()
    .replace(/([ivxlcdm]+)\s?eme C/g, '$1 C').replace(/([ivxlcdm]+)\s?er C/g, '$1 C').replace(/([ivxlcdm]+)\s?e C/g, '$1 C')
    .replace(/([ivxlcdm]+)\s?st C/g, '$1 C').replace(/([ivxlcdm]+)\s?nd C/g, '$1 C').replace(/([ivxlcdm]+)\s?rd C/g, '$1 C').replace(/([ivxlcdm]+)\s?th C/g, '$1 C');
  var result;
  localeData.format.forEach(function(format, i) {
    try {
      if (!result) {
        result = parser.parse(string, {format: format});
      }
    } catch (e) {
      if (i === localeData.format.length - 1) {
        throw e;
      }
    }
  });
  return result;
}

module.exports.locale = function(newLocale) {
  if (newLocale) {
    locale = newLocale;
  } else {
    return locale;
  }
}

})();

},{"./locales/en":2,"./locales/fr":3,"./tmp/edtfy.js":4}],2:[function(_dereq_,module,exports){

module.exports = {
  days: 'monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun',
  months: [
    'january|jan', 'february|feb', 'march|mar', 'april|apr',
    'may', 'june|jun', 'july|jul', 'august|aug',
    'september|sep', 'october|oct', 'november|nov', 'december|dec'
  ],
  seasons: ['spring', 'summer', 'autumn|fall', 'winter'],
  century: 'century',
  format: ['mdy', 'dmy'],
  around: 'around|about|abt|close to|estimated|est',
  between1: 'between|bet|from',
  between2: 'to',
  and: 'and',
  or: 'or',
  unknown: 'unknown|ukn',
  open: 'open',
  before: 'before|bef|bf|<',
  after: 'after|aft|af|>',
  negative: 'bce|bc',
  positive: 'ce|ad'
};

},{}],3:[function(_dereq_,module,exports){

module.exports = {
  days: 'lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|dimanche|dim',
  months: [
    'janvier|jan', 'fevrier|fev', 'mars|mar', 'avril|avr',
    'mai', 'juin|jun|jui', 'juillet|jul|juil', 'aout|aou',
    'septembre|sep', 'octobre|oct', 'novembre|nov', 'decembre|dec'
  ],
  seasons: ['printemps', 'ete', 'automne', 'hiver'],
  century: 'siecle',
  format: ['dmy'],
  around: 'vers|environ|env|autour de|estime|estimee|est',
  between1: 'entre|du|de',
  between2: 'au|a',
  and: 'et',
  or: 'ou',
  unknown: 'inconnue?',
  open: 'en cours',
  before: 'avant|avt|av|<',
  after: 'apres|apr|ap|>',
  negative: 'aec',
  positive: 'ec'
};

},{}],4:[function(_dereq_,module,exports){
module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = "B1 ",
        peg$c1 = { type: "literal", value: "B1 ", description: "\"B1 \"" },
        peg$c2 = " B2 ",
        peg$c3 = { type: "literal", value: " B2 ", description: "\" B2 \"" },
        peg$c4 = " A ",
        peg$c5 = { type: "literal", value: " A ", description: "\" A \"" },
        peg$c6 = function(date1, date2) {
              return date1 + '/' + date2
            },
        peg$c7 = " ",
        peg$c8 = { type: "literal", value: " ", description: "\" \"" },
        peg$c9 = "-",
        peg$c10 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c11 = " / ",
        peg$c12 = { type: "literal", value: " / ", description: "\" / \"" },
        peg$c13 = " O ",
        peg$c14 = { type: "literal", value: " O ", description: "\" O \"" },
        peg$c15 = function(date1, date2) {
              var year = date2.split('-')[0]
              var month = date2.split('-')[1]
              return '[' + year + '-' + month + '-' + date1 + ',' + date2 + ']'
            },
        peg$c16 = function(date1, date2) {
              var year = date2.split('-')[0]
              return '[' + year + '-' + date1.m + '-' + date1.d + ',' + date2 + ']'
            },
        peg$c17 = function(date1, date2) {
              return '[' + date2[2] + '-' + date1 + ',' + date2[2] + '-' + date2[0] + ']'
            },
        peg$c18 = function(date1, d) { return d },
        peg$c19 = function(date1, date2) {
              return '[' + date1 + ',' + date2 + ']'
            },
        peg$c20 = function(date1) {
              return '[..,' + date1 + ']'
            },
        peg$c21 = function(date1) {
              return '[' + date1 + ',..]'
            },
        peg$c22 = function(date1, date2) {
              var year = date2.split('-')[0]
              var month = date2.split('-')[1]
              return '{' + year + '-' + month + '-' + date1 + ',' + date2 + '}'
            },
        peg$c23 = function(date1, date2) {
              var year = date2.split('-')[0]
              return '{' + year + '-' + date1.m + '-' + date1.d + ',' + date2 + '}'
            },
        peg$c24 = function(date1, date2) {
              return '{' + date2[2] + '-' + date1 + ',' + date2[2] + '-' + date2[0] + '}'
            },
        peg$c25 = function(date1, date2) {
              return '{' + date1 + ',' + date2 + '}'
            },
        peg$c26 = "~",
        peg$c27 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c28 = function(d) {
              return d + '~'
            },
        peg$c29 = function(d) {
            return d + '~'
          },
        peg$c30 = "?",
        peg$c31 = { type: "literal", value: "?", description: "\"?\"" },
        peg$c32 = function(d, q) {
            validateDate(d);
            d = q ? d + '?' : d;
            return d;
          },
        peg$c33 = " NEG",
        peg$c34 = { type: "literal", value: " NEG", description: "\" NEG\"" },
        peg$c35 = function(d) {
            return '-' + d;
          },
        peg$c36 = function(d) {
            return d;
          },
        peg$c37 = function() { return options.format === 'mdy' },
        peg$c38 = function(d) { return d; },
        peg$c39 = function() { return options.format === 'dmy' },
        peg$c40 = "/",
        peg$c41 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c42 = function(m, d) {
          return m[0] + '-' + d
        },
        peg$c43 = function(md, y) { return y + '-' + md },
        peg$c44 = function(d, m) {
          return {d:d, m:m[1]}
        },
        peg$c45 = function(d, my) { return my + '-' + d },
        peg$c46 = function(m, y) { return y + '-' + m },
        peg$c47 = function(s, y) {
          if(s){
            y = '-' + y
          }
          if(!s && y.length > 4 || s && y.length > 5){
            y = 'y' + y
          }
          return y
        },
        peg$c48 = function(d, u) {
         var a = d || [];
         return a.concat(u).join('')
        },
        peg$c49 = "M",
        peg$c50 = { type: "literal", value: "M", description: "\"M\"" },
        peg$c51 = function(m) { return m },
        peg$c52 = "S",
        peg$c53 = { type: "literal", value: "S", description: "\"S\"" },
        peg$c54 = function(s) { return s },
        peg$c55 = " C",
        peg$c56 = { type: "literal", value: " C", description: "\" C\"" },
        peg$c57 = function(d) { return parseInt(d.join(''), 10) - 1 + 'xx' },
        peg$c58 = function(r) { return parseInt(deromanize(r.join('')), 10) - 1 + 'xx' },
        peg$c59 = function(s, y) { return y + '-' + s },
        peg$c60 = function(a, b) { return a + b;},
        peg$c61 = function(a, b) { return a + b; },
        peg$c62 = function(d) {return '0' + d},
        peg$c63 = "u",
        peg$c64 = { type: "literal", value: "u", description: "\"u\"" },
        peg$c65 = function() { return 'uu' },
        peg$c66 = "*",
        peg$c67 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c68 = "x",
        peg$c69 = { type: "literal", value: "x", description: "\"x\"" },
        peg$c70 = function() { return 'xx' },
        peg$c71 = /^[0-9]/,
        peg$c72 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c73 = /^[a-z]/,
        peg$c74 = { type: "class", value: "[a-z]", description: "[a-z]" },
        peg$c75 = function() { return 'u' },
        peg$c76 = /^[0-1]/,
        peg$c77 = { type: "class", value: "[0-1]", description: "[0-1]" },
        peg$c78 = /^[0-3]/,
        peg$c79 = { type: "class", value: "[0-3]", description: "[0-3]" },
        peg$c80 = "U",
        peg$c81 = { type: "literal", value: "U", description: "\"U\"" },
        peg$c82 = function() { return 'unknown' },
        peg$c83 = "OP",
        peg$c84 = { type: "literal", value: "OP", description: "\"OP\"" },
        peg$c85 = function() { return 'open' },
        peg$c86 = /^[ivxlcdm]/,
        peg$c87 = { type: "class", value: "[ivxlcdm]", description: "[ivxlcdm]" },
        peg$c88 = "BF ",
        peg$c89 = { type: "literal", value: "BF ", description: "\"BF \"" },
        peg$c90 = "AF ",
        peg$c91 = { type: "literal", value: "AF ", description: "\"AF \"" },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parseinterval();
      if (s0 === peg$FAILED) {
        s0 = peg$parseor();
        if (s0 === peg$FAILED) {
          s0 = peg$parseand();
          if (s0 === peg$FAILED) {
            s0 = peg$parsecomplexdate();
          }
        }
      }

      return s0;
    }

    function peg$parseinterval() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c0) {
        s1 = peg$c0;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c1); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomplexdate();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c2) {
            s3 = peg$c2;
            peg$currPos += 4;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c3); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c4) {
              s3 = peg$c4;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c5); }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseOPEN();
            if (s4 === peg$FAILED) {
              s4 = peg$parsecomplexdate();
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c6(s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c0) {
          s1 = peg$c0;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c1); }
        }
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomplexdate();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c2) {
              s3 = peg$c2;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c3); }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseOPEN();
              if (s4 === peg$FAILED) {
                s4 = peg$parsecomplexdate();
              }
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c6(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsecomplexdate();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 32) {
              s2 = peg$c7;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s3 = peg$c9;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c10); }
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 32) {
                  s4 = peg$c7;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
                }
                if (s4 === peg$FAILED) {
                  s4 = null;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseOPEN();
                  if (s5 === peg$FAILED) {
                    s5 = peg$parsecomplexdate();
                  }
                  if (s5 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c6(s1, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsecomplexdate();
            if (s1 !== peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c11) {
                s2 = peg$c11;
                peg$currPos += 3;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c12); }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parseOPEN();
                if (s3 === peg$FAILED) {
                  s3 = peg$parsecomplexdate();
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c6(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
      }

      return s0;
    }

    function peg$parseor() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseday();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c13) {
          s2 = peg$c13;
          peg$currPos += 3;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c14); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomplexdate();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c15(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedm();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c13) {
            s2 = peg$c13;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecomplexdate();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c16(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseseason();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c13) {
              s2 = peg$c13;
              peg$currPos += 3;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c14); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$currPos;
              s4 = peg$parseseason();
              if (s4 !== peg$FAILED) {
                s5 = [];
                if (input.charCodeAt(peg$currPos) === 32) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    if (input.charCodeAt(peg$currPos) === 32) {
                      s6 = peg$c7;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c8); }
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseyear();
                  if (s6 !== peg$FAILED) {
                    s4 = [s4, s5, s6];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c17(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsecomplexdate();
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$currPos;
              if (input.substr(peg$currPos, 3) === peg$c13) {
                s4 = peg$c13;
                peg$currPos += 3;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c14); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecomplexdate();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s3;
                  s4 = peg$c18(s1, s5);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  if (input.substr(peg$currPos, 3) === peg$c13) {
                    s4 = peg$c13;
                    peg$currPos += 3;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c14); }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsecomplexdate();
                    if (s5 !== peg$FAILED) {
                      peg$savedPos = s3;
                      s4 = peg$c18(s1, s5);
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
              } else {
                s2 = peg$FAILED;
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c19(s1, s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = [];
              s2 = peg$parseBEFORE();
              if (s2 !== peg$FAILED) {
                while (s2 !== peg$FAILED) {
                  s1.push(s2);
                  s2 = peg$parseBEFORE();
                }
              } else {
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parsecomplexdate();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c20(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = [];
                s2 = peg$parseAFTER();
                if (s2 !== peg$FAILED) {
                  while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    s2 = peg$parseAFTER();
                  }
                } else {
                  s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parsecomplexdate();
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c21(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseand() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseday();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c4) {
          s2 = peg$c4;
          peg$currPos += 3;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c5); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomplexdate();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c22(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedm();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c4) {
            s2 = peg$c4;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecomplexdate();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c23(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseseason();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c4) {
              s2 = peg$c4;
              peg$currPos += 3;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c5); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$currPos;
              s4 = peg$parseseason();
              if (s4 !== peg$FAILED) {
                s5 = [];
                if (input.charCodeAt(peg$currPos) === 32) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c8); }
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    if (input.charCodeAt(peg$currPos) === 32) {
                      s6 = peg$c7;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c8); }
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseyear();
                  if (s6 !== peg$FAILED) {
                    s4 = [s4, s5, s6];
                    s3 = s4;
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsecomplexdate();
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$currPos;
              if (input.substr(peg$currPos, 3) === peg$c4) {
                s4 = peg$c4;
                peg$currPos += 3;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c5); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecomplexdate();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s3;
                  s4 = peg$c18(s1, s5);
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$currPos;
                  if (input.substr(peg$currPos, 3) === peg$c4) {
                    s4 = peg$c4;
                    peg$currPos += 3;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c5); }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsecomplexdate();
                    if (s5 !== peg$FAILED) {
                      peg$savedPos = s3;
                      s4 = peg$c18(s1, s5);
                      s3 = s4;
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                }
              } else {
                s2 = peg$FAILED;
              }
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c25(s1, s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
      }

      return s0;
    }

    function peg$parsecomplexdate() {
      var s0;

      s0 = peg$parsearound();
      if (s0 === peg$FAILED) {
        s0 = peg$parseUK();
        if (s0 === peg$FAILED) {
          s0 = peg$parsedate_uncertain();
        }
      }

      return s0;
    }

    function peg$parsearound() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 126) {
        s1 = peg$c26;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c27); }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomplexdate_but_around();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c28(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsecomplexdate_but_around();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c7;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 126) {
              s3 = peg$c26;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c27); }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c29(s1);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parsecomplexdate_but_around() {
      var s0;

      s0 = peg$parseUK();
      if (s0 === peg$FAILED) {
        s0 = peg$parsedate_uncertain();
      }

      return s0;
    }

    function peg$parsedate_uncertain() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsedate_negative();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c7;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 63) {
            s4 = peg$c30;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c31); }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedate_negative() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsedate();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c33) {
          s2 = peg$c33;
          peg$currPos += 4;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c34); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c35(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedate();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsedate() {
      var s0, s1, s2;

      s0 = peg$parsecentury();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        peg$savedPos = peg$currPos;
        s1 = peg$c37();
        if (s1) {
          s1 = void 0;
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsemdy();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c38(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          peg$savedPos = peg$currPos;
          s1 = peg$c39();
          if (s1) {
            s1 = void 0;
          } else {
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsedmy();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c38(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseseason_year();
            if (s0 === peg$FAILED) {
              s0 = peg$parsemy();
              if (s0 === peg$FAILED) {
                s0 = peg$parseyear();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsemd() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parselettermonth();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c7;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$parsemonth();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s3 = peg$c40;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseday();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c42(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsemdy() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsemd();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 47) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c7;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseyear();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c43(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedm() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseday();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c7;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parselettermonth();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 47) {
            s3 = peg$c40;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsemonth();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c44(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsedmy() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseday();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 47) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c7;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemy();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c45(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsemy() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parselettermonth();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseyear();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c46(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsemonth();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s2 = peg$c40;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseyear();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c46(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parseyear() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c9;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseyeardigits();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseyeardigits() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseDIGIT();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseDIGIT();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 47) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseUNKNOWN();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseUNKNOWN();
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 47) {
            s3 = peg$c40;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          peg$silentFails--;
          if (s3 === peg$FAILED) {
            s2 = void 0;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c48(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parselettermonth() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 77) {
        s1 = peg$c49;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c50); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$currPos;
        s4 = peg$parseDIGIT();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseDIGIT();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = input.substring(s2, peg$currPos);
        } else {
          s2 = s3;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c51(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseseason() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 83) {
        s1 = peg$c52;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$currPos;
        s4 = peg$parseDIGIT();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseDIGIT();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = input.substring(s2, peg$currPos);
        } else {
          s2 = s3;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c54(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecentury() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseDIGIT();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseDIGIT();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c55) {
          s2 = peg$c55;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c56); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c57(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseROMAN();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseROMAN();
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c55) {
            s2 = peg$c55;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c56); }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c58(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parseseason_year() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseseason();
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c7;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c8); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (input.charCodeAt(peg$currPos) === 32) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c8); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseyear();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c59(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsemonth() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseUNKNOWN_MONTH();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseUNKNOWN();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c60(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseUNKNOWN_MONTH();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseDIGIT();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c61(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseunknown_day_month();
      }

      return s0;
    }

    function peg$parseday() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseUNKNOWN_DAY();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseUNKNOWN();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c60(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseUNKNOWN_DAY();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseDIGIT();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c61(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseunknown_day_month();
      }

      return s0;
    }

    function peg$parseunknown_day_month() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseDIGIT();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c62(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 117) {
          s1 = peg$c63;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 42) {
            s1 = peg$c66;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c67); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c65();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 120) {
              s1 = peg$c68;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c69); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c70();
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseDIGIT() {
      var s0;

      if (peg$c71.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c72); }
      }

      return s0;
    }

    function peg$parseCHAR() {
      var s0;

      if (peg$c73.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }

      return s0;
    }

    function peg$parseUNKNOWN() {
      var s0, s1;

      if (input.charCodeAt(peg$currPos) === 117) {
        s0 = peg$c63;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }
      if (s0 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 120) {
          s0 = peg$c68;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c69); }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 42) {
            s1 = peg$c66;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c67); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c75();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseUNKNOWN_MONTH() {
      var s0;

      s0 = peg$parseUNKNOWN();
      if (s0 === peg$FAILED) {
        if (peg$c76.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c77); }
        }
      }

      return s0;
    }

    function peg$parseUNKNOWN_DAY() {
      var s0;

      s0 = peg$parseUNKNOWN();
      if (s0 === peg$FAILED) {
        if (peg$c78.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c79); }
        }
      }

      return s0;
    }

    function peg$parseUK() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 85) {
        s1 = peg$c80;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c81); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c82();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseOPEN() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c83) {
        s1 = peg$c83;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c84); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c85();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseROMAN() {
      var s0;

      if (peg$c86.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c87); }
      }

      return s0;
    }

    function peg$parseBEFORE() {
      var s0;

      if (input.substr(peg$currPos, 3) === peg$c88) {
        s0 = peg$c88;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c89); }
      }

      return s0;
    }

    function peg$parseAFTER() {
      var s0;

      if (input.substr(peg$currPos, 3) === peg$c90) {
        s0 = peg$c90;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c91); }
      }

      return s0;
    }


    // Functions

      // Transform roman number to standard number
      var deromanize = function(str) {
        str = str.toUpperCase();
        var  validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
        token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
        key = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1},
        num = 0, m;
        if (!(str && validator.test(str))) {
          throw new Error('Invalid roman number');
        }
        while (m = token.exec(str)) {
          num += key[m[0]];
        }
        return num;
      }

      var cal = {
        1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30,
        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
      }

      var toInt = function(value) {
        if(/^(\-|\+)?([0-9]+)$/.test(value)) return Number(value);
        return NaN;
      }

      function validateDate (date) {
        date = date.replace(/[~\?y]/g, '').replace(/^-/, '');
        var parts = date.split('-'), month, day;
        var year = toInt(parts[0]);
        if(!toInt(year) && year === 0) {
          throw new Error('Invalid year');
        }
        // yyyy-mm-dd
        if (parts.length == 3) {
          month = toInt(parts[1]);
          day = toInt(parts[2]);
          // yyyy-mm
        } else if (parts.length == 2){
          month = toInt(parts[1]);
        }
        if (parts.length > 1 && day != null && !isNaN(day) && !isNaN(month)) {
          // day and month are defined and integers
          if (cal[month] == null) throw new Error('Invalid month');
          if (cal[month] < day || day < 1) throw new Error('Invalid day');
          // day and month are defined
        } else if (day != null) {
          if (!isNaN(month) && (month === 0 || month > 12)) throw new Error('Invalid month');
          if (!isNaN(day) && (day === 0 || day > 31)) throw new Error('Invalid day');
          // seasons
        } else if (month != null){
          if (!isNaN(month) && !((month > 0 && month < 13) || (month > 20 && month < 25))) throw new Error('Invalid month');
        }
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();
},{}]},{},[1])(1)
});