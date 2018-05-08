let plugins = ['transform-strict-mode', 'transform-class-properties'];

if (process.env.TYPE === 'development') {
  plugins = [...plugins, 'react-hot-loader/babel'];
}

const presets = process.env.TYPE === 'development' ? [['env', { modules: false }], 'react'] : ['env', 'react'];

module.exports = {
  presets,
  plugins,
};
