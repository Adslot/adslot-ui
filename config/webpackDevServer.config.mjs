import { default as config } from './webpack.config.dev.mjs';
import { default as paths } from './paths.mjs';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

// eslint-disable-next-line
export default function (proxy, allowedHost) {
  return {
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    client: {
      logging: 'none',
    },
    static: {
      directory: paths.assetsPath,
      publicPath: '/assets',
      watch: true,
    },
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchFiles: {
      // advance chokidar options to exclude
      // https://webpack.js.org/configuration/dev-server/#devserverwatchfiles
      // https://github.com/paulmillr/chokidar
      options: {
        ignored: /node_modules|__test__|__snapshots__/,
      },
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === 'https',
    host,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    allowedHosts: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true' ? 'all' : [allowedHost],
    proxy,
    devMiddleware: {
      // It is important to tell WebpackDevServer to use the same "root" path
      // as we specified in the config. In development, we always serve from /.
      publicPath: config.output.publicPath,
    },
  };
}
