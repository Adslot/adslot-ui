# Contributing

## Guidelines

:cat: Make sure there's an issue open for any work you take on and intend to submit as a pull request - it helps core members review your concept and direction early and is a good way to discuss what you're planning to do.

:scroll: Please follow our established coding conventions (with regards to formatting, etc), please see our [style guides](#style-guides) below.

:100: We strive for 100% test coverage, to run tests locally use `npm run test`.

:do_not_litter: We love lint. It keeps things consistent and protects against human error. Linting will be run automatically after running `npm run test`. You can also run `npm run lint` on its own. See [commit conventions](#commit-conventions).

:wrench: We auto-generate typescript types from prop-types. Please see [style guides](#generating-types).

:speech_balloon: Ensure that your effort is aligned with the project's roadmap by talking to the maintainers, especially if you are going to spend a lot of time on it.

:+1: When in doubt, ask. We're here to help.

## Style guides

- [Airbnb ES2015](https://github.com/airbnb/javascript)
- [Airbnb React](https://github.com/airbnb/javascript/tree/master/react)

## Commit conventions

Our commit message follows the conventional commit standard.

See https://github.com/marionebl/commitlint/tree/master/@commitlint/config-conventional for details.

## Classname conventions

Component classnames should be prefixed with namespace `aui--`. For example, `aui--my-component`.

## Type definitions and prop documentation

[prop-types](https://github.com/facebook/prop-types) are used to document and type the component props.
Please make sure prop-types are as specific as possible (e.g, if you know the prop accepts certain strings only, the definition should be `PropTypes.oneOf(['string1', 'string2'])` instead of `PropTypes.string`.
JSDoc style comments above a prop type will carry across to the type definition (and the documentation website), so please describe the props where it makes sense to.

## Generating types

- After making any changes or to a component's prop types, run `npm run generate-types`.
- Check the `d.ts` file changes and commit them along with your other changes.

## Issue review

If you have an idea about an awesome component, or encountering a bug, please raise an issue on our github <a href="https://github.com/Adslot/adslot-ui/issues" target="_blank_">repository</a>.

The internal Adslot team reviews the issue board twice every month, and we will label the issues accordingly. You can pick any issues that have the appropriate tags.
