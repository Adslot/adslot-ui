const config = {
  stories: ['../www/**/*.mdx', '../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  staticDirs: ['../www/assets'],

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
