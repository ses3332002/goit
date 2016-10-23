'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var concatCss = require('gulp-concat-css');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('prepare_css', function() {
  gulp.src(['./src/css/reset.css', './src/css/style.css'])
      .pipe(concatCss('./build/css/style.min.css', {
        // rebaseUrls: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest(''));
});

gulp.task('prepare_js', function() {
  gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass', 'prepare_css']);
});

gulp.task('watch',function() {
  gulp.watch('*.html', ['html']);
  gulp.watch('./src/js/*.js', ['js']);
});

gulp.task('default', ['sass', 'prepare_css', 'webserver', 'sass:watch']);
