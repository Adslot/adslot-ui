const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const _ = require('lodash');

const env = { ADSLOT_TEST_FILE: '' };

webpackConfig.plugins.push(
  new webpack.DefinePlugin(
    _(env)
      .assign(_.pick(process.env, _.keys(env)))
      .mapValues(JSON.stringify)
      .value()
  )
);

module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    browsers: ['ChromeHeadless'],
    colors: true,
    files: [
      'config/loadtests.js',
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },
    client: {
      mocha: {},
    },
    singleRun: true,
    reporters: _.compact([
      process.env.npm_config_coverage ? 'coverage' : null,
      'mocha'
    ]),
    preprocessors: {
      'config/loadtests.js': ['webpack'],
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
            'component-template/*',
            'src/components/**/*.spec.*',
            'src/components/**/mocks.*',
            'src/components/**/example.jsx',
            'src/lib/**/*.js',
          ],
        },
      },
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        assets: false,
        chunks: false,
        children: false,
        colors: true,
        errorDetails: true,
        errors: true,
        timings: false,
        warnings: true,
      },
    },
  });
};
