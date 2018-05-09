
# Dependencies

## Updating dependencies

All dependencies are updated manually when it is necessary (critical bugfixes, major improvements etc.). 

For this reason all npm dependencies are installed with **fixed version**. This is done using `-E` or `--save-exact` flag when running `npm install`. Because this doesn't impact inner dependencies that still very often use npm's [semver ranges](https://docs.npmjs.com/misc/semver), we are also [shrinkwrapping](https://docs.npmjs.com/cli/shrinkwrap) dependency tree by running `npm shrinkwrap --dev` after any new install or version update. **NOTE:** before running shrinkwrap, make sure to delete existing [npm-shrinkwrap.json](../npm-shrinkwrap.json) file in project root and clean your `node_modules` from any packages not in package.json by running `npm prune`. To save dependency in package.json use `-D` or `--save-dev` flag for development-only dependencies and -S or --save for vendor libs.

## Fixing dependecy bugs

If there is bug or issue with dependency there are certain steps to follow:

1. Check if there is newer version with bug fixed and try to update.
2. Make fork from original repo, fix bug, submit PR and use fork until fix is merged and released as new verison.
3. Explore possibility of switching to alternative library or removing it altogether.
