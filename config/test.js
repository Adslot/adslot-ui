// test config
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./common');

const srcPath = path.resolve(__dirname, '../src');
const testPath = path.resolve(__dirname, '../test'); // TODO: remove usage after co-location of test assets
const jsRegEx = /\.(js|jsx)$/;

module.exports = merge(commonConfig, {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  },
  resolve: {
    alias: {
      examples: `${srcPath}examples/`,
      testHelpers: path.join(__dirname, '../test/helpers'),
      mocks: path.join(__dirname, '../test/mocks'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre', // Lint before babel transpiles; fail fast on syntax
        test: jsRegEx,
        include: testPath,
        use: ['eslint-loader'],
      },
      {
        test: jsRegEx,
        loader: 'babel-loader',
        include: [
          testPath
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader', // tests don't care about images and style
      },
      {
        test: jsRegEx,
        include: [
          srcPath,
        ],
        loader: 'isparta-loader',
      },
    ],
  },
  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
    'react-addons-test-utils': 'react-dom',
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: jsRegEx,
    }),
  ],
});
