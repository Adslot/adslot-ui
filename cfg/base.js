const path = require('path');

const port = 8000;
const srcPath = path.join(__dirname, '/../src');
const publicPath = '/assets/';
const supportedBrowsers = [
  'last 2 versions',
  '> 5%',
  'ie >= 8',
  'not and_chr > 0',
  'not and_uc > 0',
  'not android > 0',
  'not ie_mob > 0',
  'not ios_saf > 0',
  'not op_mini > 0',
].join('", "');
const autoprefixerConfig = `autoprefixer-loader?{browsers:["${supportedBrowsers}"]}`;

module.exports = {
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'app.js',
    publicPath: publicPath,
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: srcPath + '/components/',
      styles: srcPath + '/styles/',
    },
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.scss/,
        loader: `style-loader!css-loader!${autoprefixerConfig}!sass-loader?outputStyle=expanded`,
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192',
      },
    ],
  },
};
