'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
  return gulp.src([
    './app/**/*.js',
    './gulpfile.js',
    '!./app/public{,/**}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('watch', function () {
  gulp.watch(__dirname + '/app/**/*.js', ['eslint']);
});
