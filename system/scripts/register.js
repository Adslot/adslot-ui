const StyleDictionary = require('style-dictionary');
const { fileHeader } = require('style-dictionary/lib/common/formatHelpers');

/**
 * @see https://amzn.github.io/style-dictionary/#/formats?id=custom-formats
 */

// same as javascript/module but with esm export
StyleDictionary.registerFormat({
  name: 'esm/module',
  formatter: function ({ dictionary, file }) {
    return fileHeader({ file }) + 'export default ' + JSON.stringify(dictionary.tokens, null, 2) + ';';
  },
});

/**
 * @see https://amzn.github.io/style-dictionary/#/transforms?id=defining-custom-transforms
 */

// By default 'size' category is converted to px.
// This accounts for categorizing by type (e.g font-size-x rather than size-font-x),
// as well as specifically targeting borderRadius
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: function (token) {
    return (
      typeof token.value === 'number' &&
      (token.attributes.type === 'size' || token.attributes.category === 'borderRadius')
    );
  },
  transformer: function (token) {
    return `${token.value}px`;
  },
});

// add the above transform to a new group with the scss defaults
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['scss'].concat(['size/px']),
});
