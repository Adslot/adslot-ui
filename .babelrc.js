const isDevelopment = process.env.TYPE === 'development';
const isTest = process.env.TYPE === 'test';

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  isDevelopment ? 'react-hot-loader/babel' : '',
  isTest ? 'istanbul' : '',
].filter(Boolean);

const presets = [
  [
    '@babel/preset-env', { useBuiltIns: 'entry' }
  ],
  [
    '@babel/preset-react',
    {
      development: isDevelopment,
      useBuiltIns: true,
    },
  ],
];

module.exports = {
  presets,
  plugins,
};
