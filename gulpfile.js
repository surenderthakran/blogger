'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var path = require('path');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// creates a vulcanized main.css file for main.scss and its dependencies.
gulp.task('sass', function () {
    console.log("in sass");
    return gulp.src(__dirname + '/app/views/app/scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(__dirname + '/app/views/dist/css'));
});

// creates minimized main.min.css for main.css.
gulp.task('clean-css', function() {
    console.log("in clean-css");
    return gulp.src(__dirname + '/app/views/dist/css/main.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest(__dirname + '/app/views/dist/css'));
});

gulp.task('lint-app', function() {
  return gulp.src([
    './app/**/*.js',
    '!./app/views/dist{,/**}'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// TODO(surenderthakran): update to vulcanize and minimize js files.
// moves main.js to dist on save.
gulp.task('js-move', function () {
    console.log("in js-move");
    return gulp.src(__dirname + '/app/views/app/js/main.js')
        .pipe(gulp.dest(__dirname + '/app/views/dist/js'));
});

// watches various frontend resources and runs tasks when saved.
gulp.task('watch', function () {
    console.log("in watch");
    // watches all .scss files and runs sass and clean-css tasks when saved.
    gulp.watch(__dirname + '/app/views/app/scss/**/*.scss', ['sass', 'clean-css']);
    // watches all frontend .js files and runs js-move task when saved.
    gulp.watch(__dirname + '/app/views/app/js/**/*.js', ['js-move']);
    // watches all .js files and runs lint-app task when saved.
    gulp.watch(__dirname + '/app/**/*.js', ['lint-app']);
});

gulp.task('build', ['sass']);
