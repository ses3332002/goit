var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

gulp.task('default', function() {
  gulp.src('./src/js/*.js')
    .pipe(concat('script.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
  gulp.src('./src/css/*.css')
    .pipe(concatCss('./build/css/style.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(''));
});

