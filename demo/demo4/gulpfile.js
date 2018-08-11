'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
// var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var gcmq = require('gulp-group-css-media-queries');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');


gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
    gutil.beep();
});

gulp.task('imagemin', function() {
  gulp.src('./src/img/*.*')
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./build/img'))
});

gulp.task('prepare_css', function() {
  gulp.src(['./src/css/reset.css', './src/css/owl.carousel.css', './src/css/style.css'])
      .pipe(concatCss('./build/css/style.min.css', {
        rebaseUrls: false
      }))
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(gulp.dest(''));
  // gulp.src('./src/css/ie8.css')
  //     .pipe(cleanCSS())
  //     .pipe(gulp.dest('./build/css/'));
});

gulp.task('prepare_js', function() {
  gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('script.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        "last 1 version",
        "last 3 Chrome versions",
        "last 3 Firefox versions",
        "last 3 Opera versions",
        "last 2 Edge versions"
        ],
      cascade: false
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass', 'prepare_css']);
  gulp.watch('./src/js/*.js', ['prepare_js']);
  gulp.watch('./src/html/*.html', ['prepare_html']);
});

gulp.task('prepare_html', function () {
    gulp.src('./src/html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('.'))
        // .pipe(reload({stream: true}));
});

// gulp.task('sprite', function() {
//   var spriteData =
//     gulp.src('./src/img/for_sprite/*.*')
//       .pipe(spritesmith({
//         imgName: '../img/users__sprite.png',
//         cssName: 'users__sprite.css',
//       }));
//
//   spriteData.img.pipe(gulp.dest('./build/img/'));
//   spriteData.css.pipe(gulp.dest('./src/css/'));
// });

gulp.task('default', ['imagemin', 'prepare_js', 'prepare_html', 'sass', 'prepare_css', 'webserver', 'watch']);
