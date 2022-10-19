import emoji from 'remark-emoji';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import webpack from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import * as commonConfig from './webpack.config.mjs';
import { default as paths } from './paths.mjs';

// Assert this just to be safe.
if (process.env.NODE_ENV !== 'dist') {
  throw new Error('Distribution builds must have NODE_ENV=dist.');
}

// This dist is used for creating the minified .css file.
// The output .js file will be removed.
export default webpackMerge(commonConfig.default, {
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
              providerImportSource: '@mdx-js/react',
              remarkPlugins: [emoji, remarkMdxCodeMeta],
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
        minify: async (data, inputMap, minimizerOptions) => {
          const { default: cssnano } = await import('cssnano');
          const { default: safe } = await import('postcss-safe-parser');

          const [[filename, input]] = Object.entries(data);

          const postcssOptions = {
            from: filename,
            to: filename,
            map: false,
            parser: safe,
          };

          const result = await cssnano({
            preset: [
              'default',
              {
                convertValues: false,
              },
            ],
          }).process(input, postcssOptions);

          return {
            code: result.css,
            map: result.map,
            warnings: result.warnings(),
          };
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
    new webpack.IgnorePlugin({ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }),
  ],
});
