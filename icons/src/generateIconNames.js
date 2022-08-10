const fs = require('fs/promises');
const prettier = require('prettier');
const chalk = require('chalk');
const { join } = require('path');
const paths = require('../../config/paths');
const pkg = require('../../package.json');

const ignoreFiles = ['index.jsx', '.DS_Store'];
const filesMap = async (p) => {
  const dir = await fs.readdir(p);
  const res = await Promise.all(
    dir.map(async (f) => {
      const stat = await fs.stat(join(p, f));
      if (stat.isDirectory())
        console.warn(chalk.red(`All icons should be in the top-level directory. Found sub-folder: ${chalk.yellow(f)}`));
      if (stat.isFile() && !ignoreFiles.includes(f)) {
        return f.replace('.jsx', '');
      }
      return null;
    })
  );
  return res.filter(Boolean);
};

const generateIconNamesArray = async () => {
  const data = await filesMap(`${paths.iconsSrc}/react`);
  const code = `export const iconNames = [${data.map((v) => `'${v}'`)}];`;
  return prettier.format(code, { parser: 'babel', ...pkg.prettier });
};

const writeToFile = async (code) => {
  const file = `${paths.iconsSrc}/iconNames.js`;
  await fs.writeFile(file, code);
  // eslint-disable-next-line no-console
  console.log(chalk.green(`Icon names successfully written to ${file}`));
};

/**
 * - Generate an array of all icon names for Icon's propTypes
 * - export the array from `iconNames.js`
 */
const generateIconNames = async () => {
  const iconNamesArray = await generateIconNamesArray();
  const comment = `/**
* Generated automatically - see icons/src/generateIconNames.js
*/

`;

  await writeToFile(comment + iconNamesArray);
};

generateIconNames();
