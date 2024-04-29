#!/usr/bin/env node
const prettier = require('prettier');
const _ = require('lodash');
const { transformSync } = require('@babel/core');
const { Command } = require('commander');
const { generateFromSource } = require('react-to-typescript-definitions');
const { glob } = require('glob');
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');
const paths = require('../../config/paths');
const parsePropTypesVariables = require('./babel-plugin-proptype-vars');
const copyTypes = require('./copyTypes');
const { typesPostFixes } = require('./typesPostFixes');
const checkTypeChanges = require('./checkTypeChanges');
const pkg = require('../../package.json');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const program = new Command();

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
  const globString = `${paths.appSrc}/components/${options.only ? options.only : '**'}${
    options.only?.endsWith('.jsx') ? '' : '/*[!.spec|.test].jsx'
  }`
    .split(path.sep)
    .join(path.posix.sep);

  // get all the jsx components using glob. Ignore spec & test files.
  const allComponentFiles = glob.sync(globString).filter((entry) => !entry.includes('/TreePicker/'));

  if (!allComponentFiles || allComponentFiles.length === 0) {
    console.log(
      chalk.red(`No component files were found for ${options.only}
    ${globString}`)
    );
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
    console.log(
      chalk.cyan(
        `Parsing PropTypes for ${
          allComponents.length > 5
            ? `${allComponents.length} components`
            : allComponents
                .map(({ fileName, relPath }, i) => `${relPath.replace('src/components/', '')}${fileName}`)
                .join(', ')
        }`
      )
    );

    const parsed = allComponents.map(({ src, fileName, relPath }) => {
      options.debug && console.log(chalk.cyan(`Parsing ${chalk.bold(`${relPath}${fileName}`)}`));

      // run through babel plugin - attempts to make prop type declarations
      // literal i.e resolves variables, object spreads etc. directly into the .propTypes object
      // so react-to-typescript-definitions can turn them into type definitions
      return parsePropTypeVars(src, relPath);
    });

    let filesToCheck = [];

    await Promise.all(
      parsed.map(async (code, i) => {
        const result = await generateFromSource(null, code, {
          babylonPlugins: ['exportDefaultFrom', 'transformImports', 'nullishCoalescingOperator'],
        });

        const component = allComponents[i];

        const output = typesPostFixes(component.componentName, result);
        const prettifiedOutput = await prettier.format(output, { parser: 'typescript', ...pkg.prettier });

        const fileName = `${component.relPath}${component.fileName.replace(/\.jsx$/, '.d.ts')}`;
        const existingFile = await fs.readFile(fileName, 'utf-8');

        // pass changed files to checkTypeChanges
        if (existingFile !== prettifiedOutput) {
          filesToCheck.push(fileName);
        }

        // put definition files in corresponding src/components/* folder
        await fs.writeFile(`${paths.appDir}/${fileName}`, prettifiedOutput);
      })
    );
    if (filesToCheck.length > 0) {
      await checkTypeChanges(filesToCheck);
    }
    console.log(
      chalk.cyan(
        `Generated type defs for ${allComponents.map(({ componentName }) => chalk.bold(componentName)).join(', ')}
        `
      )
    );
  } catch (error) {
    console.log(chalk.red('Failed to generate types.\n'));
    console.log(error);
    process.exit(1);
  }

  console.log(chalk.green.bold(`Wrote types successfully.\n`));
}

generateTypeDefs();
