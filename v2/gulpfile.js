'use strict';

const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// create autoprefixer to add vendor prefixes.
const autoprefix = new LessAutoprefix({browsers: ['cover 99.5%']});

gulp.task('eslint', function() {
  return gulp.src([
    './app/**/*.js',
    './gulpfile.js',
    '!./app/public{,/**}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('less', function() {
  // Run less on only the make file and all the imports will be handled
  // automatically. Running on *.less will disturb import order and all less
  // files may not be imported in the final output.
  return gulp.src(__dirname + '/app/views/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [autoprefix], // Automatically adds vendor prefixes.
    }).on('error', function(err) {
      // Added handler to prevent gulp watch crashing on error in the task.
      console.log('[gulp-less]', err);
      this.emit('end');
    }))
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('./')) // Writes sourcemap to main.min.css.map
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('watch', function() {
  // Watch js files and run eslint on change.
  gulp.watch(
      [__dirname + '/app/**/*.js', __dirname + '/gulpfile.js'], ['eslint']);

  gulp.watch(__dirname + '/app/views/less/**/*.less', ['less']);
});
