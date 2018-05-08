// test config
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./common');

const srcPath = path.resolve(__dirname, '../src');
const jsRegEx = /\.(js|jsx)$/;

const testConfig = merge(commonConfig, {
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  },
  resolve: {
    alias: {
      examples: `${srcPath}examples/`,
    },
  },
  module: {
    rules: [
      {
        test: /(\.spec)\.(js|jsx)$/,
        loader: 'babel-loader',
        include: srcPath,
      },

      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader', // tests don't care about images and style
      },
    ],
  },
  externals: {
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
    'react-addons-test-utils': 'react-dom',
  },
});

module.exports = process.env.npm_config_coverage
  ? merge(testConfig, {
      module: {
        rules: [
          {
            test: jsRegEx,
            include: srcPath,
            exclude: /src\/lib/,
            enforce: 'post',
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true },
            },
          },
        ],
      },
      devtool: 'inline-source-map',
      plugins: [
        new webpack.SourceMapDevToolPlugin({
          filename: null, // if no value is provided the sourcemap is inlined
          test: jsRegEx,
        }),
      ],
    })
  : testConfig;
