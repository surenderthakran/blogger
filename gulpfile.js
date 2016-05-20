'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var path = require('path');

gulp.task('sass', function () {
    console.log("in sass");
    return gulp.src(__dirname + '/views/app/scss/main.scss')                   // creates .css file for only main.scss
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(__dirname + '/views/dist/css'));
});

gulp.task('watch', function () {
    console.log("in watch");
    gulp.watch(__dirname + '/views/app/scss/**/*.scss', ['sass']);             // runs sass task if any .scss file is saved
});

gulp.task('build', ['sass']);
