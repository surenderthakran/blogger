'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const less = require('gulp-less');
var rename = require('gulp-rename');

gulp.task('eslint', function() {
  return gulp.src([
    './app/**/*.js',
    './gulpfile.js',
    '!./app/public{,/**}'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('less', function () {
  return gulp.src(__dirname + '/app/views/less/**/*.less')
    .pipe(less())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('watch', function() {
  gulp.watch(__dirname + '/app/**/*.js', ['eslint']);
  gulp.watch(__dirname + '/app/views/less/**/*.less', ['less']);
});
