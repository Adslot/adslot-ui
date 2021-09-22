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

const env = {
  production: {
    plugins: ['babel-plugin-jsx-remove-data-test-id'],
  },
  development: {
    plugins: ['babel-plugin-jsx-remove-data-test-id'],
  },
  dist: {
    plugins: ['babel-plugin-jsx-remove-data-test-id'],
  },
  test: {
    plugins: [],
  },
};

module.exports = {
  presets,
  env,
};