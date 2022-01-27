const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('docs'),
  appDist: resolveApp('dist'),
  appDistEs: resolveApp('es'),
  appDistCjs: resolveApp('lib'),
  appPublic: resolveApp('www'),
  appHtml: resolveApp('www/index.html'),
  appIndexJs: resolveApp('www/index.jsx'),
  appDistJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appDemo: resolveApp('www'),
  appSrc: resolveApp('src'),
  appDir: resolveApp(''),
  appNodeModules: resolveApp('node_modules'),
  assetsPath: resolveApp('www/assets'),
  redirectPath: resolveApp('www/_redirects'),
};
