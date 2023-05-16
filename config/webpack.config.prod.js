const webpack = require('webpack');
const emoji = require('remark-emoji');
const { merge: webpackMerge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const commonConfig = require('./webpack.config');
const paths = require('./paths');

// Assert this just to be safe.
if (process.env.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=dist.');
}

// This dist is used for creating the minified .css file.
// The output .js file will be removed.
module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  // Don't attempt to continue if there are any errors.
  bail: true,
  devtool: false,
  entry: paths.appDemo,
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/adslot-ui-docs.prod.js',
    publicPath: '/',
    libraryTarget: 'umd',
    library: 'AdslotUI',
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
    moment: {
      root: 'moment',
      commonjs2: 'moment',
      commonjs: 'moment',
      amd: 'moment',
    },
  },
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
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
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
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
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
      new CssMinimizerPlugin({
        minify: (data, inputMap, minimizerOptions) => {
          const cssnano = require('cssnano');
          const safe = require('postcss-safe-parser');

          const [[filename, input]] = Object.entries(data);

          const postcssOptions = {
            from: filename,
            to: filename,
            map: false,
            parser: safe,
          };

          return cssnano({
            preset: [
              'default',
              {
                convertValues: false,
              },
            ],
          })
            .process(input, postcssOptions)
            .then((result) => {
              return {
                code: result.css,
                map: result.map,
                warnings: result.warnings(),
              };
            });
        },
      }),
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new MiniCssExtractPlugin({
      filename: 'static/adslot-ui-docs.prod.css',
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
  ],
});
