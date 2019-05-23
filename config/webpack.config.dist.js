const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const commonConfig = require('./webpack.config');
const paths = require('./paths');
const postCssConfig = require('./postCssConfig');

// Assert this just to be safe.
if (process.env.NODE_ENV !== 'dist') {
  throw new Error('Distribution builds must have NODE_ENV=dist.');
}

// This dist is used for creating the minified .css file.
// The output .js file will be removed.
module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  devtool: false,
  entry: { docs: [paths.appDemo], main: [paths.appDistJs] },
  output: {
    path: paths.appDist,
    filename: 'adslot-ui-[name].js',
    libraryTarget: 'umd',
    library: 'AdslotUI',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        enforce: 'pre', // Lint before babel transpiles; fail fast on syntax
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /(\.spec)\.(js|jsx)$/],
        include: [paths.appSrc, paths.appDemo],
        use: ['eslint-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: [paths.appSrc, paths.appDemo],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: postCssConfig,
          },
          'sass-loader',
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: false,
        cache: true,
        parallel: true,
        terserOptions: {
          ecma: 8,
          compress: {
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: false,
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'adslot-ui-[name].css',
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
});
