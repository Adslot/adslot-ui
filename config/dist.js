// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./common');

const componentsPath = path.resolve(__dirname, '../src/components/');

module.exports = merge(commonConfig, {
  entry: {
    main: path.join(componentsPath, '/distributionEntry'),
    core: path.join(componentsPath, '/distributionEntry/core'),
    extra: path.join(componentsPath, '/distributionEntry/extra'),
  },
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
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'adslot-ui-[name].js',
    libraryTarget: 'umd',
    library: 'AdslotUI',
  },
  devtool: 'inline',
  cache: false,
  plugins: [
    new webpack.DefinePlugin({ // ensures webpack will always optimise for production
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
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
});
