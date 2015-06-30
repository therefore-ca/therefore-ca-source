# therefore.ca source
This repository is the main source code for the therefore.ca website. The project distributable exists as a seperate repository, but changes here will eventually make it into the dist upstream for release.

## Getting started
1. clone the repo and run ```npm install``` and ```bower install```
2. Run ```grunt serve``` for local development
3. A browser window should open, with Live Reload and you're good to go.


## Live server configuration.
On the custom_file you will see the configuration of the live server. The live server only get the built version of the site. The files under custom_files will be copy on the build process. Those file are the configuration of the live server. If you want to try it : 
cd dist
npm install
grunt serve

It use grunt-connect as a server and forever (see gruntstart.js).
Every time you build you need to redo npm install. 

This server have some configurations not enable on the dev server (as 404, redirect and contact mail).