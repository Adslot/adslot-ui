"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = clearCache;
exports.transform = transform;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// https://github.com/moment/moment/blob/e96809208c9d1b1bbe22d605e76985770024de42/src/lib/format/format.js#L4
var momentEscapeToken = '(\\[[^\\[]*\\])|(\\\\)?';
var momentLocalFormatting = 'LTS|LT|LL?L?L?|l{1,4}';
var momentFormattingTokens = '[Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?';
var momentFormattingTokensRegExp = new RegExp("".concat(momentEscapeToken, "(").concat(momentLocalFormatting, "|").concat(momentFormattingTokens, "|.)"), 'g');
var dateFnsformattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var cache = new Map();
var tokenMapping = {
  YY: 'yy',
  YYYY: 'yyyy',
  YYYYY: 'yyyyy',
  YYYYYY: 'yyyyyy',
  // Extended year
  // IOS week of year
  W: 'I',
  WW: 'II',
  Wo: 'Io',
  // IOS date of week
  d: 'i',
  do: 'io',
  dd: 'iiiiii',
  ddd: 'iii',
  dddd: 'iiii',
  // Day of Week (Locale)
  e: 'i',
  // Day of Week (ISO)
  E: 'i',
  // AM/PM
  a: 'aaa',
  // am pm
  A: 'a',
  // AM PM
  // Time Zone
  Z: 'xxx',
  // -07:00 -06:00 ... +06:00 +07:00
  ZZ: 'xx',
  //  -0700 -0600 ... +0600 +0700
  // Era
  N: 'G',
  // BC AD
  NN: 'GG',
  // BC AD
  NNN: 'GGG',
  // BC AD
  NNNN: 'GGGG',
  // Before Christ, Anno Domini
  NNNNN: 'G',
  // BC AD
  yy: 'yyyy',
  // Era Year?
  // Week Year
  gg: 'YY',
  //  70 71 ... 29 30
  gggg: 'YYYY',
  // 70 71 ... 29 30
  ggggg: 'YYYYY',
  // 1970 1971 ... 2029 2030
  // Week Year (ISO)
  GG: 'YY',
  // 70 71 ... 29 30
  GGGG: 'RRRR',
  // 1970 1971 ... 2029 2030
  GGGGG: 'RRRRR',
  //  01970 01971 ... 02029 02030
  // Day of Month
  D: 'd',
  DD: 'dd',
  Do: 'do',
  // Day of Year
  DDDD: 'DDD',
  DDDo: 'Do',
  // Time Zone (deprecated)
  z: '',
  zz: '',
  // Unix Timestamp
  X: 't',
  // Unix Millisecond Timestamp
  x: 'T',
  // locale, not equivalent but close
  LTS: 'pp',
  LT: 'p',
  L: 'P',
  LL: 'PP',
  LLL: 'PPp',
  LLLL: 'PPPPpp',
  l: 'P',
  ll: 'PP',
  lll: 'PPp',
  llll: 'PPPPp'
};

function isMomentJsToken(token) {
  return new RegExp("^(".concat(momentLocalFormatting, "|").concat(momentFormattingTokens, ")$")).test(token);
}

function escapeDateFnsToken(formatStr) {
  var escaping = false;
  var tmp = formatStr.replace(/'/g, "''");
  var result = '';

  var _iterator = _createForOfIteratorHelper(tmp.match(dateFnsformattingTokensRegExp)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var substring = _step.value;
      var shouldEscape = /[A-Za-z]/.test(substring[0]);

      if (shouldEscape === escaping || substring === "''") {
        result += substring;
      } else {
        escaping = shouldEscape;
        result += "'" + substring;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (escaping) result += "'";
  return result;
}

function transform(format) {
  if (!format) return format;
  var tokens = format.match(momentFormattingTokensRegExp);
  var substring = '';
  var result = '';

  var _iterator2 = _createForOfIteratorHelper(tokens),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var token = _step2.value;

      if (isMomentJsToken(token)) {
        if (substring) {
          result += escapeDateFnsToken(substring);
          substring = '';
        }

        result += token in tokenMapping ? tokenMapping[token] : token;
      } else {
        if (token.startsWith('[') && token.endsWith(']')) {
          // unescape
          substring += token.substring(1, token.length - 1);
        } else if (token.startsWith('\\')) {
          // unescape
          // https://github.com/moment/moment/blob/e96809208c9d1b1bbe22d605e76985770024de42/src/lib/format/format.js#L44
          substring += token.replace(/\\/g, '');
        } else {
          substring += token;
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (substring) result += escapeDateFnsToken(substring);
  return result;
}

function clearCache() {
  cache.clear();
}