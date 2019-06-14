const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config');
const paths = require('./paths');

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'devtool-source-map',
  entry: paths.appSrc,
  output: {
    path: paths.appBuild,
    filename: 'adslot-ui.js',
    libraryTarget: 'umd',
    library: 'AdslotUI',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader', // tests don't care about images and style
      },
    ],
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
});
