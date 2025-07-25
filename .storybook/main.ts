import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../www/**/*.mdx', '../src/**/*.mdx', '../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: true
  },

  staticDirs: ['../www/assets'],

  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [
        svgr({
          svgrOptions: { exportType: 'default', ref: true, svgo: true },
          include: '**/*.svg',
        }),
      ],
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;
