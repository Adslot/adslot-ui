const webpackCfg = require('./webpack.config');

module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    files: [
      'test/loadtests.js',
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['phantomjs-shim', 'mocha', 'chai'],
    client: {
      mocha: {},
    },
    singleRun: true,
    reporters: ['coverage', 'mocha'],
    preprocessors: {
      'test/loadtests.js': ['webpack'],
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'json', subdir: '.' },
      ],
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true,
    },
  });
};
