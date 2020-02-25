'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gcmq = require('gulp-group-css-media-queries');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
// var os = require('os');
var open = require('gulp-open');


gulp.task('webserver', function() {
  return connect.server(
    {
        // root: './',
        livereload: true,
        port: 3000
    }
  );
});

gulp.task('open', function() {
  var options = {
    uri: 'http://localhost:3000',
    // app: 'firefox'
  };
  return gulp.src(__filename)
  .pipe(open(options));
});

gulp.task('imagemin', function() {
  return gulp.src('./src/img/*.*')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('prepare_css', function() {
  return gulp.src(['./src/css/reset.css', './src/css/style.css'])
      .pipe(concatCss('./build/css/style.min.css', {
        rebaseUrls: false
      }))
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(gulp.dest('.'))
      .pipe(connect.reload());
});

gulp.task('prepare_js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('script.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      autoprefixer: ["last 2 versions"],
      cascade: false
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', gulp.series('sass', 'prepare_css'));
  gulp.watch('./src/js/*.js', gulp.series('prepare_js'));
  gulp.watch('./src/html/**/*.html', gulp.series('prepare_html'));
});

gulp.task('prepare_html', function () {
    return gulp.src('./src/html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('.'))
        .pipe(connect.reload());
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

gulp.task('default', gulp.series(gulp.parallel('imagemin', 'prepare_js', 'prepare_html', gulp.series('sass', 'prepare_css')), gulp.parallel('webserver', 'open', 'watch')));
