import _ from 'lodash';
/**
 * Get classNames for a component.
 *
 * @param  {Array} {classSuffixes The list of classSuffixes to add classes for.
 * @param  {Object} suffixOptions The boolean values to add classes for when true.
 * @param  {String} componentClass} The name of the component to add to each suffix.
 * @return {String} the string of classes to use in the component.
 */

export var classSuffixHelper = function classSuffixHelper(_ref) {
  var classSuffixes = _ref.classSuffixes,
      suffixOptions = _ref.suffixOptions,
      componentClass = _ref.componentClass;

  var internalSuffixes = _.compact(classSuffixes);

  _.forEach(suffixOptions, function (value, optionName) {
    if (value) internalSuffixes.push(_.kebabCase(optionName));
  });

  if (_.isEmpty(internalSuffixes)) return '';
  return _.map(internalSuffixes, function (suffix) {
    return " ".concat(componentClass, "-").concat(suffix);
  }).join('');
}; // A DTS is an attribute which attaches a selector to a component so E2Es can locate and navigate through the DOM.
// expandDts converts a string to an object for ES6 expansion as <img {...expandDts(dtsString)} />

export var expandDts = function expandDts(dtsString) {
  return dtsString ? {
    'data-test-selector': dtsString
  } : {};
};
export default {
  classSuffixHelper: classSuffixHelper,
  expandDts: expandDts
};