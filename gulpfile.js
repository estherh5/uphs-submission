var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var series = require('stream-series');
var inject = require('gulp-inject');


// Gulp tasks for compiling CSS, JS, assets, HTML
gulp.task('css', compileSass);

gulp.task('js', compileJs);

gulp.task('assets', compileAssets);

gulp.task('html', compileHtml);

gulp.task('build', gulp.series(
  gulp.parallel('css', 'js', 'assets'),
  'html')
);

gulp.task('watch', updateBuild);


// Compile Sass script by preprocessing it to CSS and minifying it
function compileSass() {
  return gulp.src('./src/stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'));
}


// Compile main project script by minifying it
function compileJs() {
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('./dist'));
}


// Add assets and images to dist folder
function compileAssets() {
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/assets/*')
    .pipe(gulp.dest('./dist'));

  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));
}


// Compile HTML by injecting JS scripts and CSS stylesheets
function compileHtml() {
  var target = gulp.src('./src/index.html');

  target.pipe(gulp.dest('./dist'));

  var vendorCss = gulp.src('./dist/vendor/**/*.css', {read: false});

  var appCss = gulp.src('./dist/*.css', {read: false});

  var scripts = gulp.src('./dist/*.js', {read: false});

  return target
    .pipe(inject(series(vendorCss, appCss, scripts), {relative: true}));
}


// Update build whenever source file is changed
function updateBuild() {
  return gulp.watch('./src/*', gulp.series('build'));
}
