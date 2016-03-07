Adslot UI
=========

Core component library. By Adslot
---------------------------------

A library of core components used to develop our Adslot and Symphony products.
This will draw on custom in-house components from adslot/alexandria as well as restyled
vendor components eg Bootstrap, Select2.

Technology:

- [React](http://facebook.github.io/react/)
- ES2015 (using [Babel](http://babeljs.io)\)
- [Webpack](https://github.com/webpack/webpack)
- [SCSS](http://sass-lang.com)
- [Yeoman](http://yeoman.io)
- [ESLint](http://eslint.org)
- [JSCS](http://jscs.info)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

Development
-----------

- Take a look at our [Contributing](CONTRIBUTING.md) guidelines

- Clone the repo: `git clone git@github.com:Adslot/adslot-ui.git`

- Install [yeoman](http://yeoman.io) globally: `npm install -g yo`

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

`yo react-webpack:component adslot-ui/component/name`

This creates a new component, its stylesheet and a basic test case.

Most of the time you will want to add:

`--stateless`

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
