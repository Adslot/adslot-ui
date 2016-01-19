const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./base');

const config = _.merge({
  entry: [
    './src/components/run',
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new ExtractTextPlugin('adslot-ui.css'),
    new webpack.NoErrorsPlugin(),
  ],
}, baseConfig);

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: path.join(__dirname, '/../src'),
});

module.exports = config;
