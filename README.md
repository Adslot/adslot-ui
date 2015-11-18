Adslot UI
==========

Core component library. By Adslot
---------------------------------

A library of core components used to develop our Adslot and Symphony products. 
This will draw apon custom in-house components from adslot/alexandria as well as restyled 
vendor components eg Bootstrap, Select2. 

Technology:

-	[React](http://facebook.github.io/react/)

-	ES2015 (using [Babel](http://babeljs.io)\)

-	[Webpack](https://github.com/webpack/webpack)

-	[SCSS](http://sass-lang.com)

-	[Yeoman](http://yeoman.io)

-	[ESLint](http://eslint.org)

-	[JSCS](http://jscs.info)

-	[Autoprefixer](https://github.com/postcss/autoprefixer)

Style guides:

-	[Airbnb ES2015](https://github.com/airbnb/javascript)

-	[Airbnb React](https://github.com/airbnb/javascript/tree/master/react)

Development
-----------

-	Clone the repo: `git clone git@github.com:Adslot/adslot-ui.git`

-	Install [yeoman](http://yeoman.io) globally: `npm install -g yo`

-	Install NPM dependencies: `npm i`

Commands
--------

```
# Start for development

npm start # or npm run serve

# Start the dev-server with the dist version

npm run serve:dist

# Just build the dist version and copy static files

npm run dist

# Lint all files in src (also automatically run after tests)

npm run lint

# Clean up the dist directory

npm run clean

# Just copy the static assets

npm run copy

# TODO: Work out how we want to test components to then be able to run `npm test`
```

Generating New Components
-------------------------

`yo react-webpack:component adslot-ui/component/name`

This creates a new component, its stylesheet and a basic test case.

Most of the time you will want to add:

`--stateless`

That makes a stateless component (pure function, no internal state).
