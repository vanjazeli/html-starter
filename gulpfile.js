const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const gulpStylelint = require("gulp-stylelint");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

// scss compiler
gulp.task("scss", () => {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer("last 2 versions")]))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

//style lint
gulp.task("scss-lint", () => {
  return gulp.src("src/scss/*.scss").pipe(
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
  return gulp.src("src/assets/*/*").pipe(gulp.dest("dist/assets"));
});

// copy font files to dist
gulp.task("fonts", () => {
  return gulp
    .src("src/assets/fonts/*.{ttf,woff,woff2,eof}")
    .pipe(gulp.dest("dist/fonts"));
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
    .watch("src/**/*.scss")
    .on("change", gulp.series("scss", browserSync.reload));
  gulp
    .watch("src/*.html")
    .on("change", gulp.series("copy-html", browserSync.reload));
  gulp
    .watch("src/**/*.js")
    .on("change", gulp.series("copy-js", browserSync.reload));
});

//build project
gulp.task(
  "build",
  gulp.series("fonts", "scss", "js", "html", "assets")
);

//to run watch task type: gulp
gulp.task("default", gulp.series("watch"));