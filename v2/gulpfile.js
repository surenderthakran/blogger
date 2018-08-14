'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('eslint', function() {
  return gulp.src([
    './app/**/*.js',
    './gulpfile.js',
    '!./app/public{,/**}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch(__dirname + '/app/**/*.js', ['eslint']);
});
