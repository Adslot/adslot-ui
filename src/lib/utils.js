import _ from 'lodash';

/**
 * Get classNames for a component.
 *
 * @param  {Array} {classSuffixes The list of classSuffixes to add classes for.
 * @param  {Object} suffixOptions The boolean values to add classes for when true.
 * @param  {String} componentClass} The name of the component to add to each suffix.
 * @return {String} the string of classes to use in the component.
 */
export const classSuffixHelper = ({ classSuffixes, suffixOptions, componentClass }) => {
  const internalSuffixes = _.compact(classSuffixes);

  _.forEach(suffixOptions, (value, optionName) => {
    if (value) internalSuffixes.push(_.kebabCase(optionName));
  });

  if (_.isEmpty(internalSuffixes)) return '';

  return _.map(internalSuffixes, suffix => ` ${componentClass}-${suffix}`).join('');
};

// A DTS is an attribute which attaches a selector to a component so E2Es can locate and navigate through the DOM.
// expandDts converts a string to an object for ES6 expansion as <img {...expandDts(dtsString)} />
export const expandDts = dtsString => (dtsString ? { 'data-test-selector': dtsString } : {});

export default {
  classSuffixHelper,
  expandDts,
};
