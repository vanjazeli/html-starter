Setting up Gulp in a project

Run node.js command prompt

---------------------------------------------------------

Install gulp globally - "npm install gulp -g"

---------------------------------------------------------

To collect all gulp dependencies run command:

npm install

---------------------------------------------------------

To compile styles/svgs run "gulp" command

--------------------------------------------------------
                        Tasks

Start project -----> gulp ( Live server will start auto )

Build project -----> gulp build ---> Building in new /dist folder

---------------------------------------------------------

                         NOTE

If package.json is empty or not updating, run "npm init" command.

---------------------------------------------------------

Some dependencied you might need:

gulp-sass ---->  npm i gulp-sass

gulp-postcss ----> npm i gulp-postcss

gulp-styleliny ----> npm i gulp-stylelint

browsersync ----> npm i browsersync

gulp-iconfont-css ----> npm i gulp-iconfont-css

gulp-path ----> npm i path

--------------------------------------------------------

Having error on gulp saas:

1st step:
Uninstall node-sass: 
npm uninstall node-sass

2nd step:
Uninstall sass-loader:
npm uninstall sass-loader

3rd step:
npm install sass -dev

Iconfont 

TODO //

--------------------------------------------------------- UPDATES ---------------------------------------------------------

Update 1.1

- Font build path changed to assets/fonts 

--------------------

Update 1.2 

- Readme file updated

--------------------

Update 1.3

- Added iconfont

- Readme file updated

--------------------

Update 1.4 

- Added dist folder with starting screen template