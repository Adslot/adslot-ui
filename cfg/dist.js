const _ = require('lodash');
const baseConfig = require('./base');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const componentsPath = path.resolve(__dirname, '../src/components/');

const config = _.merge(baseConfig, {
  cache: false,
  devtool: 'inline',
  externals: {
    lodash: {
      root: '_',
      commonjs2: 'lodash',
      commonjs: 'lodash',
      amd: 'lodash',
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-redux': {
      root: 'reactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    'redux': {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
  },
  entry: {
    main: path.join(componentsPath, '/distributionEntry.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'adslot-ui-[name].js',
    libraryTarget: 'umd',
    library: 'AdslotUI',
  },
  plugins: [
    new ExtractTextPlugin('adslot-ui.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: false,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
});

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: path.join(__dirname, '/../src'),
});

module.exports = config;
