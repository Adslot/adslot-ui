const autoprefixer = require('autoprefixer');
const SUPPORTED_BROWSERS = require('./supported-browsers');

module.exports = {
  plugins: [
    autoprefixer({ browsers: SUPPORTED_BROWSERS }),
  ],
};
