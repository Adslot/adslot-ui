#!/usr/bin/env node
const prettier = require('prettier');
const _ = require('lodash');
const { transformSync } = require('@babel/core');
const commander = require('commander');
const { generateFromSource } = require('react-to-typescript-definitions');
const { glob } = require('glob');
const chalk = require('chalk');
const fs = require('fs/promises');
const paths = require('../../config/paths');
const parsePropTypesVariables = require('./babel-plugin-proptype-vars');
const copyTypes = require('./copyTypes');
const typesPostFixes = require('./typesPostFixes');
const pkg = require('../../package.json');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const program = new commander.Command();

program
  .option('-d, --debug', 'output propType conversion debugging')
  .option(
    '-o, --only <name>',
    `component (folder/glob) name to process.
    All jsx files under components/Card: --only=Card
    Specific jsx file:                   --only=RichTextEditor/FileUploadAction.jsx
    Glob:                                --only=RichT*`
  )
  .option(
    '-c, --copy',
    'skip generation and copy types from /src to /dist (this is done as part of the dist build step, but you can do it in isolation with this flag)'
  );

program.parse(process.argv);
const options = program.opts();

const parserPlugins = ['classStaticBlock', 'jsx', 'react', 'exportDefaultFrom'];
const parserOpts = {
  plugins: parserPlugins,
  sourceType: 'module',
};

function parsePropTypeVars(src, relPath) {
  const relativepath = relPath ? `../../${relPath}` : '../../src/components';

  const output = transformSync(src, {
    parserOpts,
    configFile: false,
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      parsePropTypesVariables(relativepath, { debug: options.debug }),
    ],
  });
  return output.code;
}

async function generateTypeDefs() {
  if (options.copy) {
    copyTypes();
    return;
  }
  // get all the jsx components using glob. Ignore spec & test files.
  const allComponentFiles = glob.sync(
    `${paths.appSrc}/components/${options.only ? options.only : '**'}${
      options.only?.endsWith('.jsx') ? '' : '/*[!.spec|.test].jsx'
    }`
  );

  if (!allComponentFiles || allComponentFiles.length === 0) {
    console.log(chalk.red(`No component files were found for ${options.only}`));
    return;
  }

  let allComponents = [];

  try {
    await Promise.all(
      allComponentFiles.map(async (file) => {
        const srcFile = await fs.readFile(file);
        const src = srcFile.toString();

        const pathParts = file.split('/');
        const fileName = _.last(pathParts);
        const componentName = fileName === 'index.jsx' ? pathParts[pathParts.length - 2] : fileName.replace('.jsx', '');

        allComponents.push({
          src,
          absPath: file,
          fileName,
          componentName,
          relPath: file.match(/(src\/components\/.*)+(\/)+/)[0],
        });
      })
    );
  } catch (error) {
    console.log(chalk.red('Failed to transform source files.\n'));
    console.log(error);
    process.exit(1);
  }
  // generate definitions for each component
  // and add them to the allDefs string
  try {
    const parsed = allComponents.map(({ src, fileName, relPath }) => {
      console.log(chalk.cyan(`Parsing PropTypes for ${relPath}${fileName}`));

      // run through babel plugin - attempts to make prop type declarations
      // literal i.e resolves variables, object spreads etc. directly into the .propTypes object
      // so react-to-typescript-definitions can turn them into type definitions
      return parsePropTypeVars(src, relPath);
    });
    await Promise.all(
      parsed.map(async (code, i) => {
        const result = await generateFromSource(null, code, {
          babylonPlugins: ['exportDefaultFrom', 'transformImports'],
        });

        const component = allComponents[i];
        console.log(chalk.green.bold(`Generated type defs for ${component.componentName}`));

        const output = typesPostFixes(component.componentName, result);
        const prettifiedOutput = prettier.format(output, { parser: 'typescript', ...pkg.prettier });

        const fileName = `${component.relPath}${component.fileName.replace(/\.jsx$/, '.d.ts')}`;
        // put definition files in corresponding src/components/* folder
        await fs.writeFile(`${paths.appDir}/${fileName}`, prettifiedOutput);

        console.log(chalk.green(fileName));
      })
    );
  } catch (error) {
    console.log(chalk.red('Failed to generate types.\n'));
    console.log(error);
    process.exit(1);
  }

  console.log(chalk.green(`Wrote types successfully.\n`));
}

generateTypeDefs();
