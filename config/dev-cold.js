// dev-cold config (without hot reload)
const merge = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');

const commonConfig = require('./common');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '8888';
const publicPath = '/assets/';

module.exports = merge(commonConfig, {
  entry: [
    './docs/run', // the entry point of our app
  ],
  output: {
    path: resolve(__dirname, '../dist/assets'),
    filename: 'app.js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
  devServer: {
    hot: false, // disable HMR on the server
    contentBase: resolve(__dirname, '../src'), // match the output path
    publicPath, // match the output `publicPath`
    port: PORT,
    host: HOST,
    noInfo: true,
    stats: {
      assets: false,
      chunks: false,
      children: false,
      colors: true,
      errorDetails: true,
      errors: true,
      timings: false,
      warnings: true,
    },
  },
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
