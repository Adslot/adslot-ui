const _ = require('lodash');
const chalk = require('chalk');
const { replacements } = require('./typesPostFixes');
/**
 * @param {string[]} filePaths
 */

module.exports = async function checkTypeChanges(filePaths) {
  try {
    const customTypesFixComponents = _.keys(replacements());
    for (const component of customTypesFixComponents) {
      // [Component]/index.d.ts
      // Component/[SubComponent].d.ts
      // Component/[SubComponent]/index.d.ts
      const expectedPathMatches = [`${component}/index.d.ts$`, `/[A-Z]{1}[a-z]+/${component}.d.ts$`];
      const matchedArg = filePaths.find((p) => {
        let matched = false;
        expectedPathMatches.forEach((r) => {
          const match = p.match(new RegExp(r, 'g'));
          if (match?.[0]) {
            matched = true;
          }
        });
        return matched;
      });

      if (matchedArg) {
        console.log(
          chalk.yellow(
            `${chalk.bold('WARNING')}: Detected type changes in a component (${chalk.bold(
              component
            )}) with custom type fixes.\n`
          ),
          chalk.yellow(
            `Please check the new changes are compatible with those in ${chalk.bold(
              `scripts/generate-types/typesPostFixes.js`
            )}

            `
          )
        );
      }
    }
  } catch (err) {
    console.log(err);
    console.log(chalk.red('Failed to check type changes.\n'));
  }
};
