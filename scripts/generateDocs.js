import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import reactDocgen from 'react-docgen';
import { default as displayNameHandler } from 'react-docgen-displayname-handler';
import glob from 'glob';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
