const baseConfig = require('./cfg/base');

module.exports = {
  verbose: false, // Set to true to show diagnostic information

  // IMPORTANT: Set next two configuration so you can customize
  // bootstrapCustomizations: gets loaded before bootstrap so you can configure the variables used
  // by bootstrap mainSass: gets loaded after bootstrap, so you can override a bootstrap style.
  // NOTE, these are optional.

  // Use preBootstrapCustomizations to change $brand-primary. Ensure this
  // preBootstrapCustomizations does not depend on other bootstrap variables.
  preBootstrapCustomizations: './src/styles/variable.scss',

  // Use bootstrapCustomizations to utilize other sass variables defined in
  // preBootstrapCustomizations or the _variables.scss file. This is useful to set one
  // customization value based on another value.
  // bootstrapCustomizations: './src/styles/variable.scss',

  mainSass: './src/styles/App.scss',

  // Default for the style loading
  styleLoader: baseConfig.module.loaders[1].loader,

  //
  // If you want to use the ExtractTextPlugin
  //   and you want compressed
  //     styleLoader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
  //
  // If you want expanded CSS
  //   styleLoader: ExtractTextPlugin.extract('style-loader',
  // 'css-loader!sass?outputStyle=expanded'),

  scripts: {
    // Include nothing since we use react-bootstrap instead of native bootstrap js.
  },
  styles: {
    mixins: true,
    normalize: true,

    // print: false,
    // glyphicons: false,

    scaffolding: true,
    type: true,

    // code: false,
    // grid: false,
    // tables: false,
    // forms: false,
    buttons: true,

    // 'component-animations': false,
    // dropdowns: false,
    // 'button-groups': false,
    // 'input-groups': false,
    navs: true,

    // navbar: false,
    // breadcrumbs: false,
    // pagination: false,
    // pager: false,
    // labels: false,
    // badges: false,
    // jumbotron: false,
    // thumbnails: false,
    // alerts: false,
    // 'progress-bars': false,
    // media: false,
    // 'list-group': false,
    // panels: false,
    // wells: false,
    // 'responsive-embed': false,
    close: true,

    modals: true,

    // tooltip: false,
    // popovers: false,
    // carousel: false,

    // utilities: false,
    // 'responsive-utilities': false,
  },
};
