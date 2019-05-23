const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild: resolveApp('dist'),
  appDist: resolveApp('dist'),
  appPublic: resolveApp('docs'),
  appHtml: resolveApp('docs/index.html'),
  appIndexJs: resolveApp('docs'),
  appDistJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appDemo: resolveApp('docs'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
};
