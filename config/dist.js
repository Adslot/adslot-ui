const _ = require('lodash');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');
const commonConfig = require('./common');

const polyfill = resolve(__dirname, './polyfill');

module.exports = () => {
  const buildType = process.env.TYPE || 'development';

  let entries = {
    main: [polyfill, resolve(__dirname, '../src')],
    docs: [polyfill, resolve(__dirname, '../docs/run')],
  };

  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ];

  if (buildType === 'development') {
    entries = _.mapKeys(entries, (value, key) => `${key}.dev`);
  }

  if (buildType === 'production') {
    plugins.push(
      new webpack.DefinePlugin({
        // ensures webpack will always optimise for production
        'process.env.NODE_ENV': '"production"',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
        sourceMap: false,
        include: /\.js$/,
        parallel: {
          cache: true,
          workers: 2, // run on two cores #GSD
        },
      })
    );
  }

  return merge(commonConfig, {
    entry: entries,
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
      redux: {
        root: 'Redux',
        commonjs2: 'redux',
        commonjs: 'redux',
        amd: 'redux',
      },
      moment: {
        root: 'moment',
        commonjs2: 'moment',
        commonjs: 'moment',
        amd: 'moment',
      },
    },
    output: {
      path: resolve(__dirname, '../dist'),
      filename: 'adslot-ui-[name].js',
      libraryTarget: 'umd',
      library: 'AdslotUI',
    },
    devtool: 'inline',
    cache: false,
    plugins,
  });
};
