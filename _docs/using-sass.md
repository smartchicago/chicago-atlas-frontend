
# Using Sass

By default, [create-react-app](https://github.com/facebookincubator/create-react-app) project makes use of Webpacks style loader to [import CSS directly in JS](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-stylesheet). We opt out of this approach as we feel it introduces unnecessary complexity for project of this level and we wanted to leverage benefits of Sass preprocessor without too much deviations from default boilerplate code.

All Sass code is processed by [node-sass](https://www.npmjs.com/package/node-sass) module and output is saved in `src/css` directory. Main CSS file is then imported in root JSX component so webpack can inject it inline and do hot reloading during development and extract it to separate bundle for production. Preprocessing script is located [here](../scripts/css.js) and run from npm scripts.

All styles are kept inside `sass` directory in project root, approximately matching structure of JSX components. 

We use conventions as defined in [Sass guideline](https://sass-guidelin.es/) and enforce them with [stylelint](https://stylelint.io/).
