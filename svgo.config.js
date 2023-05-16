// https://github.com/svg/svgo#configuration
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },
          removeViewBox: false,
          removeDoctype: false,
        },
      },
    },
    {
      name: 'convertStyleToAttrs',
    },

    {
      name: 'removeAttrs',
      params: {
        attrs: ['id', 'class'],
      },
    },
  ],
};
