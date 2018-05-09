
# Deployment

By running `npm run build` command, production files are created and saved in `build/` directory. Since this app is using external API for data and consist of static files (HTML, CSS, JS and JSON), front end can be deployed or copied to any server verbatim and should work. 

However, because we are using [React Router](https://github.com/ReactTraining/react-router) for routes we must instruct server to direct any request to our single `index.html` file. Inside [`server/`](../server/) directory is minimal node.js configuration needed to implement this behaviour and similar examples can be found for any back end enviroment (PHP, Ruby etc.). For more information, see [here](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/11-productionish-server).

## Deploying on Heroku

During development, production build is deployed on [Heroku](https://cha-dev.herokuapp.com/). To deploy on Heroku you need either access to existing Chicago Health project (cha-dev) or create new application (free tier will be enough to get it running).

1. Download and install [Heroku Command Line](https://devcenter.heroku.com/articles/heroku-cli)

2. Copy files from `server/` dir to `build/` dir (if it doesn't exist, create one by running `npm run build`).

3. Inside CHA repo go to `build/` directory and initilize new git repo for build.

4. Connect to existing Heroku app (cha-dev) or create new one by following instructions from [here](https://devcenter.heroku.com/articles/git).

5. Commit changes to production build and push repo to Heroku.

Example using terminal commands:

```
npm run build
cp -a server/. build/
cd build
git init
heroku git:remote -a cha-dev
git add . && git commit -am "new build"
git push heroku master
``` 

Note that with server files and production build you can also run `npm install` inside `build` directory and run production build locally with `npm start`.
