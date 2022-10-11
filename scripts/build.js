// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

import paths from '../config/paths.js';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles.js';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages.js';
import FileSizeReporter from 'react-dev-utils/FileSizeReporter.js';
import printBuildError from 'react-dev-utils/printBuildError.js';

let configFile = '../config/webpack.config.dev.build.js';
if (process.env.NODE_ENV === 'dist') {
  configFile = '../config/webpack.config.dist.js';
}
if (process.env.NODE_ENV === 'production') {
  configFile = '../config/webpack.config.prod.js';
}
const config = (await import(configFile)).default;

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const buildPath = !process.env.NODE_ENV || process.env.NODE_ENV === 'dist' ? paths.appDist : paths.appBuild;

// Warn and crash if required files are missingclear
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

async function copyDir(src, dest) {
  const entries = await fs.promises.readdir(src, { withFileTypes: true });
  await fs.promises.mkdir(dest, { recursive: true });
  entries.forEach(async (entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  });
}

async function copyDemoAssets() {
  await copyDir(paths.assetsPath, `${buildPath}/assets`);
  await fs.promises.copyFile(paths.redirectPath, `${buildPath}/_redirects`);
}

// Create the production build and print the deployment instructions.
function build() {
  console.log('Creating an optimized build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      // https://github.com/facebook/create-react-app/issues/9880#issuecomment-746131468
      const rawMessages = stats.toJson({ moduleTrace: false }, true);
      const messages = formatWebpackMessages({
        errors: rawMessages.errors.map((e) => e.message),
        warnings: rawMessages.warnings.map((e) => e.message),
      });

      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' + 'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      });
    });
  });
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
try {
  const previousFileSizes = await measureFileSizesBeforeBuild(buildPath);
  // Remove all content but keep the directory so that
  // if you're in it, you don't end up in Trash
  if (process.env.NODE_ENV === 'dist') {
    try {
      await fs.promises.stat(buildPath);
    } catch {
      await fs.promises.mkdir(buildPath);
    }
    fs.readdirSync(buildPath).forEach((f) => {
      fs.rmSync(`${buildPath}/${f}`, { recursive: true });
    });
  }
  // Merge with the public folder
  if (process.env.NODE_ENV === 'production' && process.env.DEMO_ASSETS) {
    await copyDemoAssets();
  }
  // Start the webpack build
  const { stats, warnings } = await build();
  if (warnings.length) {
    console.log(chalk.yellow('Compiled with warnings.\n'));
    console.log(warnings.join('\n\n'));
    console.log('\nSearch for the ' + chalk.underline(chalk.yellow('keywords')) + ' to learn more about each warning.');
    console.log('To ignore, add ' + chalk.cyan('// eslint-disable-next-line') + ' to the line before.\n');
  } else {
    console.log(chalk.green('Compiled successfully.\n'));
  }

  console.log('File sizes after gzip:\n');
  printFileSizesAfterBuild(
    stats,
    previousFileSizes,
    buildPath,
    WARN_AFTER_BUNDLE_GZIP_SIZE,
    WARN_AFTER_CHUNK_GZIP_SIZE
  );
} catch (err) {
  console.log(chalk.red('Failed to compile.\n'));
  printBuildError(err);
  process.exit(1);
}
