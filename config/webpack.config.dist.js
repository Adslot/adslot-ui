const emoji = require('remark-emoji');
const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
  entry: { main: [paths.appDistJs] },
  output: {
    path: paths.appDist,
    filename: 'adslot-ui-[name].js',
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
        include: [paths.appSrc, paths.appDemo],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.((c|sc)ss)$/i,
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
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 10000 },
        },
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

          return cssnano()
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
