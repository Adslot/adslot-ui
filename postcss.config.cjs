const postcssPresetEnv = require('postcss-preset-env');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const flexBugFixes = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [
    postcssSimpleVars,
    postcssImport,
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
      },
      enableClientSidePolyfills: false,
      autoprefixer: { flexbox: 'no-2009' },
    }),
    flexBugFixes,
  ],
};
