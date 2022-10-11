import fs from 'node:fs/promises';
import globPkg from 'glob';
import chalk from 'chalk';
import paths from '../../config/paths.js';

const { glob } = globPkg;

process.on('unhandledRejection', (err) => {
  throw err;
});

export default async function copyTypes() {
  try {
    const allDefs = glob.sync(`${paths.appSrc}/components/**/*.d.ts`);
    const indexDef = await fs.readFile(`${paths.appSrc}/index.d.ts`, 'utf8');
    await fs.mkdir(paths.appDistEs, { recursive: true });
    await fs.writeFile(`${paths.appDistEs}/index.d.ts`, indexDef);
    allDefs.forEach(async (def) => {
      const relFile = def.match(/(src\/components\/.*)+/)[0];
      const dir = relFile.match(/(src\/components\/.*)\//)[0];
      const filePath = `${relFile.replace(/^src\//, '')}`;
      const dirPath = `${dir.replace(/^src\//, '')}`;
      const data = await fs.readFile(`${paths.appSrc}/${filePath}`, 'utf8');
      await fs.mkdir(`${paths.appDistEs}/${dirPath}`, { recursive: true });
      await fs.writeFile(`${paths.appDistEs}/${filePath}`, data);
    });
    console.log(chalk.green('Copied type definitions.\n'));
  } catch (err) {
    console.log(err);
    console.log(chalk.red('Failed to copy type definitions.\n'));
  }
}
