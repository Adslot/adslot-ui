import { create } from 'storybook/theming';

export default create({
  brandTitle: 'Adslot UI',
  brandUrl: 'https://ui.adslot.com',
  brandImage: '/aui--logo.png',
  gridCellSize: 12,
  base: 'light',

  colorPrimary: '#006dcc',
  colorSecondary: '#006dcc',

  // UI
  appBg: 'white',
  appContentBg: '#ffffff',
  appBorderColor: '#e8e8e8',
  appBorderRadius: 3,

  // Typography
  fontBase: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333',
  textInverseColor: 'rgba(255,255,255,0.9)',
  textMutedColor: '#838383',

  // Toolbar default and active colors
  barTextColor: '#5a5a5a',
  barSelectedColor: '#5a5a5a',
  barBg: '#f9f9f9',

  // Form colors
  inputBg: 'white',
  inputBorder: '#d3d3d3',
  inputTextColor: '#333',
  inputBorderRadius: 3,
});
