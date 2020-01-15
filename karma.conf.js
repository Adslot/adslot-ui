const _ = require('lodash');
const webpack = require('webpack');
const webpackConfig = require('./config/webpack.config.test');

const env = { ADSLOT_TEST_FILE: '' };
process.env.CHROME_BIN = require('puppeteer').executablePath();


webpackConfig.plugins.push(
  new webpack.DefinePlugin(
    _(env)
      .assign(_.pick(process.env, _.keys(env)))
      .mapValues(JSON.stringify)
      .value()
  )
);

/**
 * middleware to reply to all image requests with a fake image
 */
exports.ignoreImagesMw = (req, res, next) => {
  const imageExt = req.url.split('.').pop();

  if (!_.includes(['png', 'jpg', 'jpeg', 'svg'], imageExt)) {
    return next();
  }

  const fakeImageResponse = {
    data: Buffer.from('data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=', 'base64'),
    type: 'image/gif',
  };

  res.writeHead(200, {
    'Content-Type': fakeImageResponse.type,
    'Content-Length': fakeImageResponse.data.length,
  });

  return res.end(fakeImageResponse.data);
};

module.exports = function configureKarma(config) {
  config.set({
    mode: 'development',
    basePath: '',
    browsers: !_.isEmpty(process.env.KARMA_BROWSERS) ? process.env.KARMA_BROWSERS.split(',') : ['ChromeHeadless'],
    customLaunchers: {
      HeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
    colors: true,
    files: [
      'config/load-tests.js',
    ],
    port: 8080,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai'],
    middleware: ['ignoreImagesMw'],
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },
    client: {
      mocha: {},
    },
    singleRun: true,
    reporters: _.compact([process.env.npm_config_coverage ? 'coverage' : null, 'mocha']),
    preprocessors: {
      'config/load-tests.js': ['webpack'],
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'json', subdir: '.' }, { type: 'text-summary', subdir: '.' }],
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
            'src/lib/**/*.js',
          ],
        },
      },
    },
    plugins: [
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-chai',
      {
        'middleware:ignoreImagesMw': ['value', exports.ignoreImagesMw],
      },
    ],
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
