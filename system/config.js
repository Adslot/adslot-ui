require('./scripts/register');
const tokens = require('./src');
const distFolderName = 'tokens';

module.exports = {
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      buildPath: `${distFolderName}/styles/`,
      files: [
        {
          // css custom properties
          destination: 'vars.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
        {
          destination: `tokens.css`,
          // scss format === postcss vars
          format: 'scss/variables',
          options: {
            outputReferences: true,
            showFileHeader: false,
          },
        },
      ],
    },
    // the main json exports come from these transforms.
    // Contains 'direct' values e.g color.blue.base is the hex string
    js: {
      transformGroup: 'js',
      buildPath: `${distFolderName}/`,
      // map through each src/tokens/*.json file
      // and create a transformed js file for it
      files: tokens.map((tokenCategory) => ({
        destination: `${tokenCategory}.json`,
        format: 'json/nested',
        options: {
          category: tokenCategory,
        },
        filter: {
          attributes: {
            category: tokenCategory,
          },
        },
      })),
    },
    // This is the whole tokens export with all metadata, kind of a mini design system API.
    // Due to its larger size, this should only be used for documentation and the like
    jsModule: {
      buildPath: `internal/`,
      transformGroup: 'js',
      files: [
        {
          destination: `index.js`,
          format: 'esm/module',
          options: {
            outputReferences: true,
          },
        },
      ],
    },

    /**
     * can be used via postcss-simple-variables plugin, in order to not have to import the css itself
     * ```
     * const tokens = require('adslot-ui/system/internal/variables.json');
     * 
     * require('postcss-simple-vars')({
        variables: tokens
       })
     * ```
     */
    postcssVariablesJSON: {
      buildPath: `internal/`,
      transformGroup: 'web',
      files: [
        {
          destination: `variables.json`,
          format: 'json/flat',
          options: {
            outputReferences: false,
          },
        },
      ],
    },
  },
};
