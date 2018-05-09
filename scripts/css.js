#!/usr/bin/env node

'use strict';

/**
 * Node script for generating CSS from Sass source, building source maps and pass code trough Autoprefixer.
 * Run code from npm scripts using `node scripts/css.js` command.
 * For production build pass --production flag, this will generate minifed output, run code trough CSS Nano plugin
 * and skip outputting source maps
 */

const fs = require('fs');
const path = require('path');

const sass = require('node-sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');

const pathTo = path.join.bind(null, process.cwd());

/**
 * Input and output paths are hardcoded to sass/ dir for input and src/css for output.
 * We must save CSS inside src/ dir so webpack can see it and do hot reloading on changes.
 * Make sure both directories exist before running any commands.
 */
const input = pathTo('sass', 'main.scss');
const output = pathTo('src', 'css', 'main.css');
const sourceMap = output + '.map';

let start, end, map;

const config = {
  production: false,
  cssPlugins: [autoprefixer()]
};

// Parse command for any possible flags.
process.argv.forEach((val, index, array) => {
  if (val.match(/^(--)/)) {
    switch (val) {
      case '--production':
        config.production = true;
        break;
      default:
        console.log('Invalid flag. Available flags: --production');
    }
  }
});

// If runnin production build add cssnano to the process and clean output folder
if (config.production) {
  config.cssPlugins.push(cssnano({
    discardComments: {
      removeAll: true
    },
    discardDuplicates: true
  }));

  del.sync(pathTo('src', 'css', '*.css'));
  del.sync(pathTo('src', 'css', '*.css.map'));
}

sass.render({
  file: input,
  outFile: output,
  sourceMap: !config.production,
  sourceComments: false,
  includePaths: [
    pathTo('sass')
  ],
  outputStyle: 'compressed'
}, (error, result) => {
  if (error) {
    console.log(error.message);
  }
  if (result) {
    start = new Date().getTime();
    _processOutput(result.css, result.map ? result.map.toString() : false);
  }
});

// Apply postCSS plugin to output from node-sass, default plugin is just Autoprefixer
function _processOutput(css, map) {
  postcss(config.cssPlugins)
    .process(css, {
      from: input,
      to: output,
      map: !map ? false : {
        inline: true,
        prev: map,
        sourcesContent: false
      }
    })
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });

      fs.writeFile(output, result.css, () => {
        end = Date.now();
        const time = end - start;
        console.log('CSS generated in ', time, 'ms');
      });

      if (result.map) {
        fs.writeFile(sourceMap, result.map.toString(), () => {
          console.log('CSS source map generated');
        });
      }
    });
}
