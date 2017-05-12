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
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },
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
        { type: 'text-summary', subdir: '.' },
      ],
      check: {
        each: {
          statements: 100,
          branches: 95,
          functions: 100,
          lines: 100,
          excludes: [
            'src/components/Main.jsx',
            'src/examples/components/FilePickerDemo.jsx'
          ],
        },
      },
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true,
    },
  });
};
