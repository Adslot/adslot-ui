let plugins = ['transform-strict-mode'];

if (process.env.TYPE === 'development') {
  plugins = [...plugins, 'react-hot-loader/babel'];
}

const presets = ['env', 'react'];

module.exports = {
  presets,
  plugins,
};
