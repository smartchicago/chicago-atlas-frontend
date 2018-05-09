
# Troubleshooting

_It's best to try any of this steps running as admin._

If you get an EACCES error during install, you should [fix your permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If `npm install` fails for whatever reason (bad wi-fi etc.) make sure to delete `node_modules` and run `npm cache clean` before trying again (this is a [bug](https://github.com/npm/npm/issues/1341#issuecomment-20634338) with npm dependency resolution).

    rm -rf node_modules && npm cache clean && npm install
