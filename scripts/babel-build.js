import childProcess from 'child_process';
import glob from 'glob';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const exec = promisify(childProcess.exec);

const outDirs = {
  esm: 'es',
  cjs: 'lib',
};

async function run() {
  const relativeOutDir = '..';
  const env = {
    NODE_ENV: process.env.BABEL_ENV || process.env.NODE_ENV,
  };

  if (!['esm', 'cjs'].includes(env.NODE_ENV)) {
    throw new Error('NODE_ENV must be one of "esm", "cjs"');
  }

  const srcDir = path.resolve(__dirname, '../src');
  const extensions = ['.js', '.jsx'];
  const ignore = ['**/*.spec.js', '**/*.spec.jsx', '**/*.test.js', '**/*.test.jsx'];

  const topLevelNonIndexFiles = glob.sync(`*{${extensions.join(',')}}`, { cwd: srcDir, ignore }).filter((file) => {
    return path.basename(file, path.extname(file)) !== 'index';
  });
  const topLevelPathImportsCanBePackages = topLevelNonIndexFiles.length === 0;

  const outDir = path.resolve(__dirname, '..', outDirs[env.NODE_ENV]);

  const babelArgs = [
    '--extensions',
    `"${extensions.join(',')}"`,
    srcDir,
    '--out-dir',
    outDir,
    '--ignore',
    `"${ignore.join('","')}"`,
  ];

  const command = ['npx babel', ...babelArgs].join(' ');

  const { stderr, stdout } = await exec(command, { env: { ...process.env, ...env } });
  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }
}

run();
