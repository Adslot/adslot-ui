const path = require('path');
const srcPath = path.join(__dirname, '/../src/');

module.exports = {
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl)$/,
        loader: 'null-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test'),
        ],
      },
    ],
    postLoaders: [
      {
        test: /\.js?$/,
        exclude: /(test|node_modules)\//,
        loader: 'istanbul-instrumenter',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      helpers: path.join(__dirname, '/../test/helpers'),
      components: srcPath + 'components/',
      styles: srcPath + 'styles/',
    },
  },
};
