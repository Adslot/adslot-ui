"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;
// https://github.com/moment/moment/blob/e96809208c9d1b1bbe22d605e76985770024de42/src/lib/format/format.js#L4
const momentEscapeToken = '(\\[[^\\[]*\\])|(\\\\)?';
const momentLocalFormatting = 'LTS|LT|LL?L?L?|l{1,4}';
const momentFormattingTokens = '[Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?';
const momentFormattingTokensRegExp = new RegExp(`${momentEscapeToken}(${momentLocalFormatting}|${momentFormattingTokens}|.)`, 'g');
const dateFnsformattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
const tokenMapping = {
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
  return new RegExp(`^(${momentLocalFormatting}|${momentFormattingTokens})$`).test(token);
}
function escapeDateFnsToken(formatStr) {
  let escaping = false;
  let tmp = formatStr.replace(/'/g, "''");
  let result = '';
  for (const substring of tmp.match(dateFnsformattingTokensRegExp)) {
    const shouldEscape = /[A-Za-z]/.test(substring[0]);
    if (shouldEscape === escaping || substring === "''") {
      result += substring;
    } else {
      escaping = shouldEscape;
      result += "'" + substring;
    }
  }
  if (escaping) result += "'";
  return result;
}
function transform(format) {
  if (!format) return format;
  const tokens = format.match(momentFormattingTokensRegExp);
  let substring = '';
  let result = '';
  for (const token of tokens) {
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
  if (substring) result += escapeDateFnsToken(substring);
  return result;
}