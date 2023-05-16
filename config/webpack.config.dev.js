const path = require('path');
const emoji = require('remark-emoji');
const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const commonConfig = require('./webpack.config');
const paths = require('./paths');

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: ['webpack-dev-server/client?/', 'webpack/hot/dev-server', paths.appIndexJs],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: console.log(paths.appBuild) || paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[id].bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  cache: { type: 'filesystem' },
  module: {
    rules: [
      {
        test: /\.(md|mdx)?$/,
        include: [paths.appSrc, paths.appDemo],
        use: [
          { loader: 'babel-loader' },
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [emoji],
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 },
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: [paths.appSrc, paths.iconsSrc, paths.appDemo],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset',
        generator: {
          filename: 'static/media/[name].[hash:8][ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
    new webpack.ProgressPlugin(),
  ],
});
