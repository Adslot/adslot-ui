# Contributing

## Guidelines
:octocat: Make sure there's an issue open for any work you take on and intend to submit as a pull request - it helps core members review your concept and direction early and is a good way to discuss what you're planning to do.

:scroll: Please follow our established coding conventions (with regards to formatting, etc), please see our [style guides](#style-guides) below.

:100: We strive for 100% test coverage, to run tests locally use `npm run test`.

:do_not_litter: We love lint. It keeps things consistent and protects against human error. Linting will be run automatically after running `npm run test`. You can also run `npm run posttest` on its own. See [commit conventions](#commit-conventions).

:speech_balloon: Ensure that your effort is aligned with the project's roadmap by talking to the maintainers, especially if you are going to spend a lot of time on it.

:+1: When in doubt, ask. We're here to help.

## Style guides

- [Airbnb ES2015](https://github.com/airbnb/javascript)
- [Airbnb React](https://github.com/airbnb/javascript/tree/master/react)

## Commit conventions

Our commit message format is as follows:

```
Tag: Short description

Longer description here if necessary.
The first line of the commit message (the summary) must have a specific format.
This format is checked by our build tools.
```

The `Tag` is one of the following:

- `Fix` - for a bug fix.
- `New` - implemented a new feature.
- `Update` - for a backwards-compatible enhancement.
- `Breaking` - for a backwards-incompatible enhancement or feature.
- `Docs` - changes to documentation only.
- `Build` - changes to build process only.
- `Upgrade` - for a dependency upgrade.

The message summary should be a one-sentence description of the change,
and it must be 72 characters in length or shorter.

Here are some good commit message summary examples:

```
Build: Update Travis to only test Node 0.10
Fix: Special characters in link label causing parse error
Upgrade: through2 to 2.0.0
```

The commit message format is important because they're used to create a changelog for each release.
