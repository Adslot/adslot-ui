const path = require('path');
const minimist = require('minimist');

/**
 * Get an environment from arguments
 * @param  {Array}  args
 * @return {String}
 */
function getEnv(args) {
  switch (true) {
    case Boolean(args._.length > 0 && args._.indexOf('start') !== -1):
      return 'test';

    case Boolean(args.env):
      return args.env;

    default:
      return 'dev';
  }
}

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  const allowedEnvs = ['dev', 'dist', 'test'];
  const isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig() {
  const args = minimist(process.argv.slice(2));
  const usedEnv = getValidEnv(getEnv(args));
  return require(path.join(__dirname, `config/${usedEnv}.js`)); // eslint-disable-line global-require
}

module.exports = buildConfig();
