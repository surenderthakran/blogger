'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var path = require('path');

gulp.task('sass', function () {
    console.log("in sass");
    return gulp.src(__dirname + '/app/views/app/scss/main.scss')                   // creates .css file for only main.scss
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(__dirname + '/app/views/dist/css'));
});

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

gulp.task('watch', function () {
    console.log("in watch");
    gulp.watch(__dirname + '/app/views/app/scss/**/*.scss', ['sass', 'clean-css']);             // runs sass task if any .scss file is saved
});

gulp.task('build', ['sass']);
