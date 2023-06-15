const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');

const execFile = promisify(childProcess.execFile);

const outDirs = {
  esm: 'es',
  cjs: 'lib',
};

async function run() {
  const env = {
    NODE_ENV: process.env.BABEL_ENV || process.env.NODE_ENV,
  };

  if (!['esm', 'cjs'].includes(env.NODE_ENV)) {
    throw new Error('NODE_ENV must be one of "esm", "cjs"');
  }

  const srcDir = path.resolve(__dirname, '../src');
  const extensions = ['.js', '.jsx'];
  const ignore = ['**/__mocks__/*', '**/*.spec.js', '**/*.spec.jsx', '**/*.test.js', '**/*.test.jsx'];

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

  const command = 'npx';
  const args = ['babel', ...babelArgs];

  const { stderr } = await execFile(command, args, { env: { ...process.env, ...env } });
  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }
}

run();
