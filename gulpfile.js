'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');

// compiles and compresses all .scss files.
gulp.task('css-pack', function() {
  return gulp.src(__dirname + '/app/views/app/scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(__dirname + '/app/views/dist/css'))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(__dirname + '/app/views/dist/css'));
});

// tests javascript for lint errors and reports to console.
gulp.task('js-lint', function() {
  return gulp.src([
    './**/*.js',
    '!./app/views/dist{,/**}',
    '!./node_modules{,/**}'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// combines and compresses all .js files.
gulp.task('js-pack', function() {
  return gulp.src(__dirname + '/app/views/app/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(__dirname + '/app/views/dist/js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(__dirname + '/app/views/dist/js'));
});

// watches various frontend resources and runs tasks when saved.
gulp.task('watch', function () {
  // watches all .scss files and runs css-pack task when saved.
  gulp.watch(__dirname + '/app/views/app/scss/**/*.scss', ['css-pack']);
  // watches all frontend .js files and runs js-pack task when saved.
  gulp.watch(__dirname + '/app/views/app/js/**/*.js', ['js-pack']);
  // watches all .js files and runs js-lint task when saved.
  gulp.watch(__dirname + '/app/**/*.js', ['js-lint']);
});
