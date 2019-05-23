const autoprefixer = require('autoprefixer');
const flexBugFixes = require('postcss-flexbugs-fixes');

module.exports = {
  // Necessary for external CSS imports to work
  // https://github.com/facebookincubator/create-react-app/issues/2677
  ident: 'postcss',
  plugins: () => [
    flexBugFixes,
    autoprefixer({
      flexbox: 'no-2009',
    }),
  ],
};
