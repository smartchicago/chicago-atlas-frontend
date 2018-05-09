
# Getting started

## Install Node

[**Windows prerequisites**](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#prerequisites)

Download and run official installer from <https://nodejs.org/en/download/>  
Choose LTS version >= 6 with npm verison >= 3 

Check that node and npm are installed and in path:

    node -v
    npm -v

## Install utils and dependencies

**NOTE: Make sure to run this command as root/admin!**

    npm install

After every update to `package.json`, run `npm install` again. To prevent any errors, it's best to first delete node_modules manually (`rm -rf node_modules`), clean cache (`npm cache clean`) and always run install command as admin.

## Run commands

**Local development**

    npm start

Runs the app in development mode.  
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.  
You will see the build errors and lint warnings in the console.    

**Production build**

    npm run build

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Generates service worker using [sw-precache](https://github.com/GoogleChrome/sw-precache).

**Tests**

    npm test

Runs the test watcher in an interactive mode.  
By default, runs tests related to files changes since the last commit.
