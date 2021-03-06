'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('imagemin', function() {
  gulp.src('./src/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'))
});

gulp.task('prepare_css', function() {
  gulp.src(['./src/css/reset.css', './src/css/carusel.css', './src/css/style.css'])
      .pipe(concatCss('./build/css/style.min.css', {
        rebaseUrls: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest(''));
});

gulp.task('prepare_js', function() {
  gulp.src('./src/js/*.js')
    .pipe(concat('script.min.js', {newLine: ';'}))
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

gulp.task('sprite', function() {
  var spriteData =
    gulp.src('./src/img/for_sprite1/*.*')
      .pipe(spritesmith({
        imgName: '../img/header__sprite.png',
        cssName: 'header__sprite.css',
      }));

  spriteData.img.pipe(gulp.dest('./build/img/'));
  spriteData.css.pipe(gulp.dest('./src/css/'));

  var spriteData =
    gulp.src('./src/img/for_sprite2/*.*')
      .pipe(spritesmith({
        imgName: '../img/footer__sprite.png',
        cssName: 'footer__sprite.css',
      }));

  spriteData.img.pipe(gulp.dest('./build/img/'));
  spriteData.css.pipe(gulp.dest('./src/css/'));
});

gulp.task('default', ['sprite', 'imagemin', 'prepare_js', 'sass', 'prepare_css', 'webserver', 'sass:watch']);
