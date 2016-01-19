/* eslint no-console:0 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.devServer.port, config.devServer.host, function handleErrors(err) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at %s:%d', config.devServer.host, config.devServer.port);
    console.log('Opening your system browser...');
    open('http://localhost:' + config.devServer.port + '/webpack-dev-server/');
  });
