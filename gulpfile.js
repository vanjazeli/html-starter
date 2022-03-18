const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const gulpStylelint = require("gulp-stylelint");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

// scss compiler
gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
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
gulp.task("copy-js", () => {
  return gulp.src("src/js/*.js").pipe(gulp.dest("dist/js"));
});

// copy html files to dist
gulp.task("copy-html", () => {
  return gulp.src("src/*.{html,ico}").pipe(gulp.dest("dist"));
});

// copy font files to dist
gulp.task("copy-fonts", () => {
  return gulp
    .src("src/fonts/*.{ttf,woff,woff2,eof}")
    .pipe(gulp.dest("dist/fonts"));
});

// browser sync
gulp.task("watch", () => {
  browserSync.init({
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
  "project-build",
  gulp.series("copy-fonts", "scss", "copy-js", "copy-html")
  // gulp.series("copy-fonts", "scss-lint", "scss", "copy-js", "copy-html")
);

//to run watch task type: gulp
gulp.task("default", gulp.series("watch"));
