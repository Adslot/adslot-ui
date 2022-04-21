const StyleDictionary = require('style-dictionary');
const { fileHeader } = require('style-dictionary/lib/common/formatHelpers');
const JsonToTS = require('json-to-ts');
const fs = require('fs');
const path = require('path');
const tokens = require('./_tokens');
const distFolderName = 'output';

module.exports = {
  source: ['_tokens/**/*.json'],
  platforms: {
    // // just exports the above category modules
    'js/index': {
      buildPath: `${distFolderName}/`,
      files: [
        {
          destination: `index.js`,
          format: 'javascript/categories-index-json',
        },
      ],
    },
    'ts/index': {
      buildPath: `${distFolderName}/types/`,
      files: [
        {
          destination: `index.d.ts`,
          format: 'ts/categories-index',
        },
      ],
    },
    // the main exports come from these json transforms.
    // each folder within _tokens represents an export
    // e.g import { color } from 'adslot-ui/system';
    // this json contain nested 'direct' values e.g color.blue.base is the hex string
    json: {
      buildPath: `${distFolderName}/`,
      transforms: ['attribute/cti', 'tokens/px', 'size/px'],
      files: tokens.map((tokenCategory) => ({
        destination: `${tokenCategory}.json`,
        format: 'json/nested',
        filter: (token) => {
          return token.attributes.category === tokenCategory || token.category === tokenCategory;
        },
      })),
    },
    ts: {
      buildPath: `${distFolderName}/types/`,
      transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex'],
      files: tokens.map((tokenCategory) => ({
        destination: `${tokenCategory}.d.ts`,
        format: `typescript/accurate-module-declarations-${tokenCategory}`,
        filter: (token) => {
          return token.attributes.category === tokenCategory || token.category === tokenCategory;
        },
      })),
    },

    // this is the full tokens export
    // e.g import tokens from 'adslot-ui/system/tokens';
    // this contains all metadata like attributes and paths
    // due to its larger size, this should only be used for documentation and the like
    jsModule: {
      buildPath: `${distFolderName}/tokens/`,
      transformGroup: 'js',
      transforms: [...StyleDictionary.transformGroup.js, 'size/px', 'tokens/px'],
      files: [
        {
          destination: 'index.js',
          format: 'javascript/module-default',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    tsModule: {
      buildPath: `${distFolderName}/types/tokens/`,
      transforms: ['attribute/cti', 'name/cti/camel', 'size/px', 'color/hex'],
      files: [
        {
          destination: `index.d.ts`,
          format: `typescript/sub-module-declarations`,
        },
      ],
    },
    css: {
      transformGroup: 'css',
      buildPath: `${distFolderName}/styles/`,
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
        // sass is split into categories e.g _color.scss
        ...tokens.map((tokenCategory) => ({
          destination: `_${tokenCategory}.scss`,
          format: 'scss/variables',
          filter: (token) => {
            return token.attributes.category === tokenCategory || token.category === tokenCategory;
          },
          options: {
            outputReferences: true,
          },
        })),
        {
          destination: 'tokens.styl',
          format: 'stylus/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};

StyleDictionary.registerFormat({
  name: 'javascript/categories-index',
  formatter: function ({ dictionary }) {
    return `${tokens
      .map((tokenCategory) => {
        return `export { default as ${tokenCategory} } from './${tokenCategory}';`;
      })
      .join(`\n`)}`;
  },
});

StyleDictionary.registerFormat({
  name: 'ts/categories-index',
  formatter: function ({ dictionary }) {
    return `${tokens
      .map((tokenCategory) => {
        return `import type ${tokenCategory} from './${tokenCategory}';`;
      })
      .join(`\n`)}

export { ${tokens.map((tokenCategory) => tokenCategory).join(', ')} };`;
  },
});

StyleDictionary.registerFormat({
  name: 'javascript/categories-index-json',
  formatter: function ({ dictionary }) {
    return `${tokens
      .map((tokenCategory) => {
        return `import ${tokenCategory}Json from './${tokenCategory}.json';
const ${tokenCategory} = ${tokenCategory}Json.${tokenCategory};`;
      })
      .join(`\n`)}

export { ${tokens.map((tokenCategory) => tokenCategory).join(', ')} };
      `;
  },
});
StyleDictionary.registerFormat({
  name: 'javascript/module-default',
  formatter: function ({ dictionary, file }) {
    const { tokens: t } = dictionary;
    return fileHeader({ file }) + 'export default ' + JSON.stringify(t, null, 2) + ';';
  },
});

tokens.map((tokenCategory) =>
  StyleDictionary.registerFormat({
    name: `typescript/accurate-module-declarations-${tokenCategory}`,
    formatter: function ({ dictionary }) {
      return `declare const ${tokenCategory}Type: Root['${tokenCategory}']
export default ${tokenCategory}Type

${JsonToTS(JSON.parse(fs.readFileSync(`./${distFolderName}/${tokenCategory}.json`, 'utf-8')), {
  rootName: 'Root',
}).join('\n')}`;
    },
  })
);

// modified version of existing 'typescript/module-declarations' formatter
// with outer module declaration added
StyleDictionary.registerFormat({
  name: 'typescript/sub-module-declarations',
  formatter: function ({ dictionary, file, options }) {
    const { moduleName = `tokens` } = options;
    function treeWalker(obj) {
      let type = Object.create(null);
      let has = Object.prototype.hasOwnProperty.bind(obj);
      if (has('value')) {
        type = 'DesignToken';
      } else {
        for (var k in obj)
          if (has(k)) {
            // eslint-disable-next-line default-case
            switch (typeof obj[k]) {
              case 'object':
                type[k] = treeWalker(obj[k]);
            }
          }
      }
      return type;
    }
    const designTokenInterface = fs.readFileSync(
      path.resolve(__dirname, `../node_modules/style-dictionary/types/DesignToken.d.ts`),
      { encoding: 'UTF-8' }
    );

    // get the first and last lines to add to the format by
    // looking for the first and last single-line comment
    const lines = designTokenInterface.split('\n');
    const firstLine = lines.indexOf(`//start`) + 1;
    const lastLine = lines.indexOf(`//end`);

    const output =
      fileHeader({ file }) +
      `declare module 'adslot-ui/system/tokens' {
  export default ${moduleName};
  ${lines.slice(firstLine, lastLine).join(`\n`)}
  const ${moduleName}: ${JSON.stringify(treeWalker(dictionary.tokens), null, 2)}
}`;

    // JSON stringify will quote strings, because this is a type we need it unquoted.
    return output.replace(/"DesignToken"/g, 'DesignToken');
  },
});

StyleDictionary.registerTransform({
  name: 'tokens/px',
  type: 'value',
  matcher: isSpace,
  transformer: function (token) {
    const val = parseFloat(token.value);
    if (isNaN(val)) throwSpaceError(token.name, token.value, 'px');
    return val + 'px';
  },
});

function isSpace(token) {
  return (
    token.attributes.category === 'space' ||
    token.attributes.category === 'fontSize' ||
    token.attributes.category === 'lineHeight'
  );
}
function throwSpaceError(name, value, unitType) {
  throw new Error(`Invalid Number: '${name}: ${value}' is not a valid number, cannot transform to '${unitType}' \n`);
}

const cssTransforms = [
  'attribute/cti',
  'name/cti/kebab',
  'time/seconds',
  'content/icon',
  'size/px',
  'tokens/px',
  'color/css',
];

StyleDictionary.registerTransformGroup({
  name: 'css',
  transforms: cssTransforms,
});

StyleDictionary.registerTransformGroup({
  name: 'scss',
  transforms: cssTransforms,
});
