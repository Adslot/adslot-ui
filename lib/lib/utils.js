"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expandDts = exports.default = exports.classSuffixHelper = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

/**
 * Get classNames for a component.
 *
 * @param  {Array} {classSuffixes The list of classSuffixes to add classes for.
 * @param  {Object} suffixOptions The boolean values to add classes for when true.
 * @param  {String} componentClass} The name of the component to add to each suffix.
 * @return {String} the string of classes to use in the component.
 */
var classSuffixHelper = function classSuffixHelper(_ref) {
  var classSuffixes = _ref.classSuffixes,
      suffixOptions = _ref.suffixOptions,
      componentClass = _ref.componentClass;

  var internalSuffixes = _lodash.default.compact(classSuffixes);

  _lodash.default.forEach(suffixOptions, function (value, optionName) {
    if (value) internalSuffixes.push(_lodash.default.kebabCase(optionName));
  });

  if (_lodash.default.isEmpty(internalSuffixes)) return '';
  return _lodash.default.map(internalSuffixes, function (suffix) {
    return " ".concat(componentClass, "-").concat(suffix);
  }).join('');
}; // A DTS is an attribute which attaches a selector to a component so E2Es can locate and navigate through the DOM.
// expandDts converts a string to an object for ES6 expansion as <img {...expandDts(dtsString)} />


exports.classSuffixHelper = classSuffixHelper;

var expandDts = function expandDts(dtsString) {
  return dtsString ? {
    'data-test-selector': dtsString
  } : {};
};

exports.expandDts = expandDts;
var _default = {
  classSuffixHelper: classSuffixHelper,
  expandDts: expandDts
};
exports.default = _default;