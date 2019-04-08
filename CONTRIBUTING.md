# Contributing

## Guidelines
:octocat: Make sure there's an issue open for any work you take on and intend to submit as a pull request - it helps core members review your concept and direction early and is a good way to discuss what you're planning to do.

:scroll: Please follow our established coding conventions (with regards to formatting, etc), please see our [style guides](#style-guides) below.

:100: We strive for 100% test coverage, to run tests locally use `npm run test`.

:do_not_litter: We love lint. It keeps things consistent and protects against human error. Linting will be run automatically after running `npm run test`. You can also run `npm run lint` on its own. See [commit conventions](#commit-conventions).

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

## Releasing

See [Release](RELEASE.md).

#### TL;DR

Releases need to have the variable `RELEASE=true` pre-pended to the command like so:

```
RELEASE=true npm run release:minor
```

This will ensure that the distribution gets bundled but the pre-commit hooks will not bail because you're committing to master.
