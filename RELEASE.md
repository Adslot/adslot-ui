## Release

To release we tag and publish to NPM using [SemVer](http://semver.org/).

We check all commits since previous release and tag appropriately:

- No version: Docs, Build
- Patch version: Fix
- Minor: New, Update, Upgrade
- Major: Breaking

If at least one breaking commit since last release we tag as *major*.

Else, if at least one new, update or upgrade commit we tag as *minor*.

Else, if fix we tag as *patch*.

Else, if docs or build we don't need to do a release.


### Run

`RELEASE=true npm run release:<major|minor|patch>`

**Note**: `RELEASE=true` informs the git pre-commit hook not to run

**Issues**:
1. Does not work in Fish
2. Does not work in Windows

#### What's happening?
1. npm run preversion
   1. git checkout master
   1. git pull
   1. npm install
   1. npm prune (removes unused dependencies)
1. npm run version
   1. webpack --env=dist (generate distribution js)
   1. git add dist/* (add webpack generated distribution)
1. git commit -m 'Release: <major|minor|patch> version <x.x.x>.' (pre-commit hooks will not run for a release)
1. npm run postversion
   1. npm publish (publish to global npm repo)
   1. git push (git version tag inline with npm version)
