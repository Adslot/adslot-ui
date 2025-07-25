const path = require('path');
const paths = require('./paths');

const nodePathArray = (process.env.NODE_PATH || '').split(path.delimiter).filter(Boolean);
process.env.NODE_PATH = nodePathArray;

module.exports = {
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(nodePathArray),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.js', '.json', '.jsx'],

    alias: {
      styles: `${paths.appSrc}/styles/`,
    },
    fallback: { buffer: require.resolve('buffer/') },
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: { global: true },
  // Turn off performance processing
  performance: false,
};
