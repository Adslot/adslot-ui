const path = require('path');
const srcPath = path.join(__dirname, '/../src/');

module.exports = {
  devtool: 'eval',
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
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
          path.join(__dirname, '/../test'),
        ],
      },
      {
        test: /\.js?$/,
        include: [
          path.join(__dirname, '/../src'),
        ],
        loader: 'isparta',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: `${srcPath}components/`,
      examples: `${srcPath}examples/`,
      helpers: `${srcPath}helpers/`,
      styles: `${srcPath}styles/`,
      testHelpers: path.join(__dirname, '/../test/helpers'),
      mocks: path.join(__dirname, '/../test/mocks'),
    },
  },
};
