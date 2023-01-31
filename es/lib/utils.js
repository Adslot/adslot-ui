import _ from 'lodash';

/**
 * Get classNames for a component.
 *
 * @param  {Array} {classSuffixes The list of classSuffixes to add classes for.
 * @param  {Object} suffixOptions The boolean values to add classes for when true.
 * @param  {String} componentClass} The name of the component to add to each suffix.
 * @return {String} the string of classes to use in the component.
 */
export const classSuffixHelper = _ref => {
  let {
    classSuffixes,
    suffixOptions,
    componentClass
  } = _ref;
  const internalSuffixes = _.compact(classSuffixes);
  _.forEach(suffixOptions, (value, optionName) => {
    if (value) internalSuffixes.push(_.kebabCase(optionName));
  });
  if (_.isEmpty(internalSuffixes)) return '';
  return _.map(internalSuffixes, suffix => ` ${componentClass}-${suffix}`).join('');
};

// A DTS is an attribute which attaches a selector to a component so E2Es can locate and navigate through the DOM.
// expandDts converts a string to an object for ES6 expansion as <img {...expandDts(dtsString)} />
export const expandDts = dtsString => dtsString ? {
  'data-test-selector': dtsString
} : {};
const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'AdslotUI';
export const invariant = (condition, message) => {
  if (!isProduction && !condition) {
    throw new Error(`${prefix} ${message}`);
  }
};
export default {
  classSuffixHelper,
  expandDts,
  invariant
};