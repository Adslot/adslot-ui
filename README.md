Adslot UI
=========

[![npm version](https://badge.fury.io/js/adslot-ui.svg)](https://badge.fury.io/js/adslot-ui) 
[![Build Status](https://travis-ci.org/Adslot/adslot-ui.svg?branch=master)](https://travis-ci.org/Adslot/adslot-ui)
[![codecov.io](https://codecov.io/github/Adslot/adslot-ui/coverage.svg?branch=master)](https://codecov.io/github/Adslot/adslot-ui?branch=master)

Core component library. By Adslot
---------------------------------

A library of core components used to develop our Adslot and Symphony products.
This includes Alexandria and third-party restyled components, e.g. Bootstrap.

Technology:

- [React](http://facebook.github.io/react/)
- ES2015 (using [Babel](http://babeljs.io)\)
- [Webpack](https://github.com/webpack/webpack)
- [SCSS](http://sass-lang.com)
- [Yeoman](http://yeoman.io)
- [ESLint](http://eslint.org)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

Development
-----------

- Take a look at our [Contributing](CONTRIBUTING.md) guidelines

- Clone the repo: `git clone git@github.com:Adslot/adslot-ui.git`

- Install [yeoman](http://yeoman.io) globally: `npm install -g yo` [OPTIONAL]

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

npm run test

# Run tests and rebuild on file changes.

npm run test:watch
```

Generating New Components
-------------------------

__Adslot UI:__

`yo react-webpack:component adslot-ui/ComponentName` 

__Alexandria:__

`yo react-webpack:component alexandria/ComponentName` 

However, you __must__ change the file extension of the component and test to .jsx, as the generator
only supports creating components with a .js extension.

Most of the time you will also want to add: `--stateless`

That makes a stateless component (pure function, no internal state).

Build Profiling
---------------

To generate a profile: `npm run profile`

Upload the new `stats.json` file to [Webpack Analyse Tool](http://webpack.github.io/analyse).

Optimizing Performance of Stateless Components
---------------

Add the following to Main.js:

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
