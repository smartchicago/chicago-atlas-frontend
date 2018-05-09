
# Project Overview

```
  ├── _docs
  ├── assets
  ├── build
  ├── config
  ├── public
  ├── sass
  ├── scripts
  ├── server
  └── src
     ├── css
     ├── data
     └── jsx
         ├── __tests__
         ├── actions
         ├── components
         ├── constants
         ├── reducers
         └── utils
```

**NOTE:** inner file structure may vary during development lifecycle so this is just high-level overview.

## Dirs

**_docs** - project documentation.

**assets** - all static assets used on front end delivered by client (images, icons etc.) in original size and form, before optimizations.

**build** - production build output - directory doesn't exist unitil running `npm run build`.

**config** - configuration files from [Create React App](https://github.com/facebookincubator/create-react-app) after [ejecting](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) default configuration. Might be slightly modified but are mostly unchanged from original source.

**public** - public folder contains `index.html` that is entry point for application and any static asstes placed here are copied as-is for production build. This includes any images, locally stored fonts and static data files.

**sass** - project styles written in Sass. Source is compiled using `scripts/css.js` script and output is saved in `src/css/`.

**scripts** - node scripts used in npm scripts or webpack. Except `css.js` other scripts are from [Create React App](https://github.com/facebookincubator/create-react-app) and are mostly unchanged from original source.

**server** -  sample files for mininal Node.js server configuration used for hosting front end build. This files should be copied inside `build/` directory before [deployment](./deployment.md).

**src** - contains `index.js` which is JS entry point.

**src/css** - output directory for CSS bundle generated from Sass source and imported in JS.

**src/data** - data and variables related to data extracted for easier maintenence. This data is imported inside other JS files and ends up in main JS build for production.

**src/jsx** - all of application JS/React/Redux code split by type: actions and action creators, JSX components, reducers, constants and utilities. Also contains `__test__` directory for placing unit tests that is watched for changes when running `npm test`.

## Dotfiles

**[.babelrc](https://babeljs.io/docs/usage/babelrc/)** - configuration file for passing options to [Babel](https://babeljs.io) - the ES2015 transpiler recommended for writing next-generation JavaScript. 

**[.editorconfig](http://editorconfig.org/)** - file format and collection of text editor plugins for maintaining consistent coding styles between different editors and IDEs. This project uses 2 spaces for indentation.

**.eslintrc** and **.eslintignore** - configuration files for [ESLint](http://eslint.org/), JavaScript linter that checks and enforces coding rules and best practices. Used in npm scripts, Webpack and available as plugin for various code editors. Base styleguide for this project is [JS Standard](https://standardjs.com/index.html) with custom overrides and modifications.

**.gitattributes** and **.gitignore** - [Git](https://git-scm.com/) configuration files used for keeping unwanted files outside version control.

**.stylelintrc** - configuration file for [Stylelint](https://stylelint.io/), CSS and Sass linter for enforcing coding rules and best practices. Used in Webpack and npm and available as plugin for various editors. Base styleguide for this project is [Sass Guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines) with custom overrides and modifications.

## npm

[package.json](https://docs.npmjs.com/files/package.json) and `npm-shrinkwrap.json` - files used to specify project tooling dependencies from [npm](http://npmjs.org) - the Node package manager. When you run `npm install`, `package.json` is read to discover what packages need to be installed. 

`package.json` can also contain other metadata such as a project description, version, configuration information and scripts that can run from console using `npm run` command. 

More information about npm packages is provided under [dependencies](./_docs/dependencies.md)

# Technical debt

In CSS and JS source code there are comments prefixed with `@TODO` that note technical debt. Use this syntax to note code improvements that are not significant to stand backlog but represent fixes of various hacks and sub-optimal patterns that should still be acknowledged. Code reffered with this comments should al least always be fully functional (if code is not working that should be reported as bug). If working on task or module that contains technical debt, do your best to remove it inside the scope of working task and not add to it.
