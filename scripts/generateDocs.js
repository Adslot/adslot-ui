const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const reactDocgen = require('react-docgen');
const displayNameHandler = require('react-docgen-displayname-handler').default;
const glob = require('glob');

const handlers = reactDocgen.defaultHandlers.concat(displayNameHandler);

const sourcePath = path.join(__dirname, '..');
const filesToIgnore = ['fastStatelessWrapper', 'mocks.jsx', 'spec.jsx', 'test.jsx', 'BlockStyleButtons', 'InlineStyleButtons'];
const outputFilePath = path.join(__dirname, '../www/containers/props.json');

(async () => {
  const files = _.reject(await promisify(glob)('src/components/**/*.jsx', { cwd: sourcePath }), filePath =>
    _.some(filesToIgnore, ignoreFile => _.includes(filePath, ignoreFile))
  );

  const result = {};
  files.forEach(filePath => {
    const absolutePath = path.join(sourcePath, filePath);
    try {
      result[filePath] = reactDocgen.parse(
        fs.readFileSync(absolutePath),
        reactDocgen.resolver.findAllComponentDefinitions,
        handlers
      );
    } catch (err) {
      // Check: https://github.com/reactjs/react-docgen/issues/336
      console.warn(`Prop generation skipped for ${filePath} due to react-docgen parsing error`);
    }
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(result, null, '  '));
})();
