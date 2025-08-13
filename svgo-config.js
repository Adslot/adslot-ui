// https://github.com/svg/svgo#configuration
export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },

          removeDoctype: false,

          removeViewBox: false,
        },
      },
    },
    {
      name: 'convertStyleToAttrs',
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['id'],
      },
    },
    { name: 'removeDimensions' },
  ],
};
