const svgoConfig = require('./svgo-config.cjs');

const isDevelopment = process.env.TYPE === 'development';

const presets = [
  ['@babel/preset-env', { useBuiltIns: 'usage', corejs: { version: 3 } }],
  [
    '@babel/preset-react',
    {
      development: isDevelopment,
      useBuiltIns: true,
    },
  ],
];

const inlineSvgPlugin = [
  'inline-react-svg',
  {
    svgo: svgoConfig,
  },
];

const env = {
  production: {
    plugins: ['jsx-remove-data-test-id', inlineSvgPlugin],
  },
  development: {
    plugins: ['jsx-remove-data-test-id', inlineSvgPlugin],
  },
  dist: {
    plugins: ['jsx-remove-data-test-id', inlineSvgPlugin],
  },
  test: {
    plugins: [inlineSvgPlugin],
  },
  esm: {
    presets: [['@babel/preset-env', { useBuiltIns: false, modules: false }]],
    plugins: [
      ['@babel/plugin-transform-runtime', { regenerator: true }],
      'jsx-remove-data-test-id',
      inlineSvgPlugin,
      ['transform-remove-imports', { test: '\\.css$' }],
      ['replace-import-extension',{ "extMapping": { ".jsx": ".js" }}]
    ],
  },
  cjs: {
    presets: [['@babel/preset-env', { useBuiltIns: false, modules: 'cjs' }]],
    plugins: [
      ['@babel/plugin-transform-runtime', { regenerator: true }],
      'jsx-remove-data-test-id',
      inlineSvgPlugin,
      ['transform-remove-imports', { test: '\\.css$' }],
      ['replace-import-extension',{ "extMapping": { ".jsx": ".js" }}]
    ],
  },
};

module.exports = {
  presets,
  env,
};
