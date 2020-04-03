const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const reactDocgen = require('react-docgen');
const glob = require('glob');

const sourcePath = path.join(__dirname, '..');
const filesToIgnore = ['fastStatelessWrapper', 'mocks.jsx', 'spec.jsx'];
const outputFilePath = path.join(__dirname, '../www/containers/props.json');

(async () => {
  const files = _.reject(
    await promisify(glob)('src/components/**/*.jsx', { cwd: sourcePath }),
    (filePath) => _.some(filesToIgnore, (ignoreFile) => _.includes(filePath, ignoreFile))
  );

  const result = {};
  files.forEach((filePath) => {
    const absolutePath = path.join(sourcePath, filePath);

    result[filePath] = reactDocgen.parse(
      fs.readFileSync(absolutePath),
      reactDocgen.resolver.findAllComponentDefinitions
    );
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(result, null, '  '));
})();
