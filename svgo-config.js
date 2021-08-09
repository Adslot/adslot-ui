const { extendDefaultPlugins } = require('svgo');
module.exports = {
  plugins: extendDefaultPlugins([
    {
      name: 'convertStyleToAttrs',
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['id'],
      },
    },
    {
      name: 'inlineStyles',
      params: {
        onlyMatchedOnce: false,
      },
    },
  ]),
};
