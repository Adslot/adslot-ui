import _ from 'lodash';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import prettier from 'prettier';

/**
 *
 * @param {string} cssFilePath path to css file
 * @returns {object} key value pairs of the css variables with '--' removed
 */
const cssVarsToJs = (cssFilePath) => {
  const css = readFileSync(cssFilePath, { encoding: 'utf-8' });
  // broken up to avoid sonarcloud backtracking security hotspot
  const lineRegex = /(--[^;]+)/g; // whole line up until semi colon
  const valRegex = /:([^;]+)/; // value after colon
  const keyRegex = /^--([^:]+):/; // key (custom property without --) before colon

  let match;
  let obj = {};

  while ((match = lineRegex.exec(css)) !== null) {
    const line = match[1];
    const value = valRegex.exec(line)[1].trim();
    const key = keyRegex.exec(line)[1].trim();
    obj[key] = value;
  }
  return obj;
};

/**
 * Writes the base colour palette to src/color/colors.json
 */
const main = async () => {
  // black & white are not currently part of the XD palette, but we use them
  const initial = {
    white: {
      value: '#ffffff',
    },
    black: {
      value: '#000000',
    },
  };

  // this css file comes from Adobe XD colours file -> {} tab
  const converted = cssVarsToJs(path.resolve(process.cwd(), 'scripts/AdslotUI-Colour.css'));

  const tokens = _(converted)
    .mapValues((hex, v) => {
      const [colorName, colorStop] = v.split('-');
      return { value: hex, _key: colorStop, _name: colorName };
    })
    .groupBy('_name')
    .mapValues((group) =>
      _(group)
        .keyBy('_key')
        .mapValues((gv) => _.omit(gv, ['_key', '_name']))
        .value()
    )
    .value();

  const complete = { color: { ...initial, ...tokens } };
  await writeFile(
    `${path.resolve(process.cwd(), 'src/color/colors.json')}`,
    prettier.format(JSON.stringify(complete), { parser: 'json' })
  );
};

main();
