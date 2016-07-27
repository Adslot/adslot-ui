const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = '0.0.0.0';
const port = 8001;
const publicPath = '/assets/';
const srcPath = path.join(__dirname, '/../src');

module.exports = {
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath,
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    host,
    hot: true,
    port,
    publicPath,
    noInfo: true,
  },
  postcss: () => [
    autoprefixer({
      browsers: [
        'last 2 versions',
        '> 5%',
        'ie >= 8',
        'not and_chr > 0',
        'not and_uc > 0',
        'not android > 0',
        'not ie_mob > 0',
        'not ios_saf > 0',
        'not op_mini > 0',
      ],
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: `${srcPath}/components/`,
      helpers: `${srcPath}/helpers/`,
      styles: `${srcPath}/styles/`,
    },
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('css!postcss!sass?outputStyle=expanded'),
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
        loader: 'url?limit=8192',
      },
    ],
  },
};
