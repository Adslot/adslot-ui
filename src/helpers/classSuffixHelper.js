import _ from 'lodash';

/**
 * Get classNames for a component.
 *
 * @param  {Array} {classSuffixes The list of classSuffixes to add classes for.
 * @param  {Object} suffixOptions The boolean values to add classes for when true.
 * @param  {String} componentClass} The name of the component to add to each suffix.
 * @return {String} the string of classes to use in the component.
 */
const classSuffixHelper = ({ classSuffixes, suffixOptions, componentClass }) => {
  const internalSuffixes = _.compact(classSuffixes);

  _.forEach(suffixOptions, (value, optionName) => { if (value) internalSuffixes.push(_.kebabCase(optionName)); });

  if (_.isEmpty(internalSuffixes)) return '';

  return _.map(internalSuffixes, (suffix) => ` ${componentClass}-${suffix}`).join('');
};

export default classSuffixHelper;
