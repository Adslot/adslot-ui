# Adslot UI

[![npm version](https://badge.fury.io/js/adslot-ui.svg)](https://badge.fury.io/js/adslot-ui)
![Build Status](https://github.com/Adslot/adslot-ui/actions/workflows/build.yml/badge.svg)
![Coverage Status](https://github.com/Adslot/adslot-ui/actions/workflows/coverage.yml/badge.svg)
![Linting Status](https://github.com/Adslot/adslot-ui/actions/workflows/linting.yml/badge.svg)
![Optimisation Status](https://github.com/Adslot/adslot-ui/actions/workflows/optimisation.yml/badge.svg)
[![codecov.io](https://codecov.io/github/Adslot/adslot-ui/coverage.svg?branch=master)](https://codecov.io/github/Adslot/adslot-ui?branch=master)

See the docs at [ui.adslot.com](https://ui.adslot.com)

## Core component library. By Adslot

A library of core components used to develop our Adslot and Symphony products.

Technology:

- [React](http://facebook.github.io/react/)
- ES201x (using [Babel](http://babeljs.io)\)
- [Webpack](https://github.com/webpack/webpack)
- [ESLint](http://eslint.org)
- [Autoprefixer](https://github.com/postcss/autoprefixer)

## Development

To get started, take a look at our [Contributing](https://ui.adslot.com/contributing) guidelines

### Native

- Clone the repo: `git clone git@github.com:Adslot/adslot-ui.git`
- Install NPM dependencies: `npm run deps`

### Visual Studio Code Remote - Containers

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Visual Studio Code](https://code.visualstudio.com/)
- Install [Visual Studio Code Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in your VS Code.
- Start VS Code and run `Remote-Containers: Clone Repository in Container Volume...` from the Command Palette.
- Authenticate with your GitHub account.
- Enter `adslot/adslot-ui` in the input box that appears and press `Enter`.
- VS Code window (instance) will reload, clone the source code of this project, and start building the dev container. A progress notifications provides status updates.
- After the build completes, VS Code will automatically connect to the container. You can now work with the repository source code in this independent environment as you would if you had cloned the code locally.

Notes:

- Due to bind mount performance issues on Windows and macOS, the steps above uses the [Clone Repository in Container Volume](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume) method. Other options can be found [here](https://code.visualstudio.com/docs/remote/containers).

### Development build

- Every branch has its own build of the documentation app ready at: `https://<branch-name>--adslot-ui.netlify.app`

## Commands

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

npm run test:watch [-- <path>] [--coverage]

# Optimize SVG before you commit
npm run svgo

# Generating types

# Generate types for all components
npm run generate-types

# Generate types for a single component
npm run generate-types -- --only=Button

# Generate types for a single component (this will run for all jsx files in the folder matching Button)
npm run generate-types -- --only=Button

# Generate types for a specific file
npm run generate-types -- --only=Button/index.jsx

# globs are accepted:
npm run generate-types -- --only="RichTe*"

# Copy generated types to es/*
npm run generate-types -- --copy

#Generate types with debugging output
npm run generate-types -- --debug

#Check validity of generated types
npm run type-check
```

## Build Profiling

To generate a profile: `npm run profile`

Upload the new `stats.json` file to [Webpack Analyse Tool](http://webpack.github.io/analyse).

## Optimizing Performance of Stateless Components

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
