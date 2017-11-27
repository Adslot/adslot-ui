Adslot UI
=========

[![npm version](https://badge.fury.io/js/adslot-ui.svg)](https://badge.fury.io/js/adslot-ui) 
[![Build Status](https://travis-ci.org/Adslot/adslot-ui.svg?branch=master)](https://travis-ci.org/Adslot/adslot-ui)
[![codecov.io](https://codecov.io/github/Adslot/adslot-ui/coverage.svg?branch=master)](https://codecov.io/github/Adslot/adslot-ui?branch=master)

See the docs at [https://adslot.github.io/adslot-ui/](https://adslot.github.io/adslot-ui/)

Core component library. By Adslot
---------------------------------

A library of core components used to develop our Adslot and Symphony products.
This includes Alexandria and third-party restyled components, e.g. Bootstrap.

Technology:

- [React](http://facebook.github.io/react/)
- ES201x (using [Babel](http://babeljs.io)\)
- [Webpack](https://github.com/webpack/webpack)
- [SCSS](http://sass-lang.com)
- [ESLint](http://eslint.org)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

Development
-----------

- Take a look at our [Contributing](CONTRIBUTING.md) guidelines

- Clone the repo: `git clone git@github.com:Adslot/adslot-ui.git`

- Install NPM dependencies: `npm i`

- Set-up git hooks

  `rm -rf .git/hooks && cd .git/ && ln -s ../scripts/git-hooks hooks && chmod +x hooks/* && cd -`

Commands
--------

```sh
# Start for development

npm start

# Start the dev-server without automatic refresh

npm run start:cold

# Just build the dist version and copy static files

npm run dist

# Lint all files in src (also automatically run after tests)

npm run lint

# Run tests and posttest linting

npm run test [-- --no-coverage]

# Run tests and rebuild on file changes.

npm run test:watch [--file=<path>] [--coverage]
```

Generating New Components
-------------------------

__Adslot UI:__

As simple as running the `scaffold` command which will create your new Adslot UI component from `/component-template`.

```sh
npm run scaffold MyComponentName
```

You'll get an `index.jsx`, `index.spec.jsx` and `styles.scss` created under `src/components/adslot-ui/MyComponentName`.

__Alexandria:__

We don't have a command for generating Alexandria components.
Create a directory for the component, and put all related files in there. You can copy `/component-template` to help.

Build Profiling
---------------

To generate a profile: `npm run profile`

Upload the new `stats.json` file to [Webpack Analyse Tool](http://webpack.github.io/analyse).

Optimizing Performance of Stateless Components
---------------

Add the following to /docs/Layout/index.jsx:

```js
import Perf from 'react-addons-perf';

window.Perf = Perf;
```

- In the browser, run `Perf.start()` to start recording.
- Interact the component in the way that feels slow.
- Run `Perf.stop()` to stop recording.
- Run `Perf.printWasted()` to see the nodes that are re–rendering but do not change the DOM.
- Use fastStatelessWrapper to wrap this component, passing in the properties to check.
- Re-test to make sure you're improving performance.
