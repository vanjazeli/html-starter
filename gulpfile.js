const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const gulpStylelint = require("gulp-stylelint");
const autoprefixer = require("autoprefixer");
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const path = require('path');
const runTimestamp = Math.random(Date.now()/1000);
const { on } = require("gulp");
const plumber = require('gulp-plumber');
const coffee = require('gulp-coffee');
const browserSync = require("browser-sync").create();

gulp.src('./src/*.ext')
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('./dist'));

//iconfont task
gulp.task('iconfont', ()=> {
	return gulp.src(['src/assets/icons/*.svg'])
	 .pipe(iconfontCss({
	   fontName: 'svgicons',
	   cssClass: 'icon',
	   path: 'scss/iconfont-template/iconfont.scss',
	   targetPath: '../../../scss/utilities/_iconfont.scss',
	   fontPath: '../assets/fonts/'
	 }))
	 .pipe(iconfont({
	   fontName: 'svgicons', // required
	   prependUnicode: false, // recommended option
	   formats: ['ttf', 'woff'], // default, 'woff2' and 'svg' are available
	   normalize: true,
	   centerHorizontally: true
	 }))
	 .on('glyphs', function(glyphs, options) {
	   // CSS templating, e.g.
	   console.log(glyphs, options);
	 })
	.pipe(gulp.dest('dist/assets/fonts/'));
});

// scss compiler
gulp.task("scss", () => {
  return gulp
    .src("scss/styles.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer("last 2 versions")]))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

//style lint
gulp.task("scss-lint", () => {
  return gulp.src("scss/*.scss").pipe(
    gulpStylelint({
      reporters: [
        {
          formatter: "string",
          console: true,
        },
      ],
    })
  );
});

// copy js files to dist
gulp.task("js", () => {
  return gulp.src("src/js/*.js").pipe(gulp.dest("dist/js"));
});

// copy html files to dist
gulp.task("html", () => {
  return gulp.src("src/*.{html,ico}").pipe(gulp.dest("dist"));
});

// copy assets files to dist
gulp.task("assets", () => {
  return gulp.src("src/assets/images/*").pipe(gulp.dest("dist/assets/images"));
});

// copy font files to dist
gulp.task("fonts", () => {
  return gulp
    .src("src/assets/fonts/*.{ttf,woff,woff2,eof}")
    .pipe(gulp.dest("dist/assets/fonts"));
});

// browser sync
gulp.task("watch", () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./dist",
    },
  });
  gulp
    .watch("**/*.scss")
    .on("change", gulp.series("scss", browserSync.reload));
  gulp
    .watch("src/*.html")
    .on("change", gulp.series("html", browserSync.reload));
  gulp
    .watch("src/**/*.js")
    .on("change", gulp.series("js", browserSync.reload));
});

//build project
gulp.task(
  "build",
  gulp.series("fonts", "scss", "js", "html", "assets", "iconfont")
);

//to run watch task type: gulp
gulp.task("default", gulp.series("watch"));