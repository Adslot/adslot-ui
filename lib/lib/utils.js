"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invariant = exports.expandDts = exports.default = exports.classSuffixHelper = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

/**
 * Get classNames for a component.
 *
 * @param  {Array} {classSuffixes The list of classSuffixes to add classes for.
 * @param  {Object} suffixOptions The boolean values to add classes for when true.
 * @param  {String} componentClass} The name of the component to add to each suffix.
 * @return {String} the string of classes to use in the component.
 */
const classSuffixHelper = _ref => {
  let {
    classSuffixes,
    suffixOptions,
    componentClass
  } = _ref;

  const internalSuffixes = _lodash.default.compact(classSuffixes);

  _lodash.default.forEach(suffixOptions, (value, optionName) => {
    if (value) internalSuffixes.push(_lodash.default.kebabCase(optionName));
  });

  if (_lodash.default.isEmpty(internalSuffixes)) return '';
  return _lodash.default.map(internalSuffixes, suffix => ` ${componentClass}-${suffix}`).join('');
}; // A DTS is an attribute which attaches a selector to a component so E2Es can locate and navigate through the DOM.
// expandDts converts a string to an object for ES6 expansion as <img {...expandDts(dtsString)} />


exports.classSuffixHelper = classSuffixHelper;

const expandDts = dtsString => dtsString ? {
  'data-test-selector': dtsString
} : {};

exports.expandDts = expandDts;
const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'AdslotUI';

const invariant = (condition, message) => {
  if (!isProduction && !condition) {
    throw new Error(`${prefix} ${message}`);
  }
};

exports.invariant = invariant;
var _default = {
  classSuffixHelper,
  expandDts,
  invariant
};
exports.default = _default;