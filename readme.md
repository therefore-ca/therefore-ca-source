# therefore.ca source
This repository is the main source code for the therefore.ca website. The project distributable exists as a seperate repository, but changes here will eventually make it into the dist upstream for release.

## Getting started
1. Clone the repo
2. Run `npm run init`. This will install the needed npm & bower packages, as well as the Grunt CLI to ensure you can work with the site. *NOTE:* Ensure you're using Node v4.x for this project (via nvm or the like) or else you will not be able to build and test it!
3. To run and work locally, run `npm run build:serve` to build and serve, or just `npm run serve` to host
4. You will be able to open a browser to http://localhost:8888, with Live Reload and you're good to go.
