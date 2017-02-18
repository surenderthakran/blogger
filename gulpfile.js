'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var stylish = require('jshint-stylish');

// creates a vulcanized main.css file for main.scss and its dependencies.
gulp.task('sass', function () {
    return gulp.src(__dirname + '/app/views/app/scss/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(__dirname + '/app/views/dist/css'));
});

// creates minimized main.min.css for main.css.
gulp.task('clean-css', function() {
    return gulp.src(__dirname + '/app/views/dist/css/main.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(__dirname + '/app/views/dist/css'));
});

gulp.task('js-lint', function() {
  return gulp.src([
    './app/**/*.js',
    '!./app/views/dist{,/**}'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// combines and compresses all .js files
gulp.task('js-pack', function() {
  console.log('in js-pack');
  return gulp.src(__dirname + '/app/views/app/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(__dirname + '/app/views/dist/js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(__dirname + '/app/views/dist/js'));
});

// watches various frontend resources and runs tasks when saved.
gulp.task('watch', function () {
    // watches all .scss files and runs sass and clean-css tasks when saved.
    gulp.watch(__dirname + '/app/views/app/scss/**/*.scss', ['sass', 'clean-css']);
    // watches all frontend .js files and runs js-pack task when saved.
    gulp.watch(__dirname + '/app/views/app/js/**/*.js', ['js-pack']);
    // watches all .js files and runs js-lint task when saved.
    gulp.watch(__dirname + '/app/**/*.js', ['js-lint']);
});
