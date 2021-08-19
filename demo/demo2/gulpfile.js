const gulp = require('gulp');
const { series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rigger = require('gulp-rigger');
const webserver = require('gulp-webserver');
const squoosh = require('gulp-libsquoosh');

function brOpen() {
  gulp.src('.').pipe(
    webserver({
      livereload: true,
      open: 'http://localhost:8000',
    })
  );
}

function prepareHtml() {
  return gulp.src('./src/html/index.html').pipe(rigger()).pipe(gulp.dest('.'));
}

function prepareCss() {
  return gulp
    .src([
      './src/css/reset.css',
      './src/css/owl.carousel.css',
      './src/css/jquery.countdown.css',
      './src/css/unite-gallery.css',
      './src/css/ug-theme-default.css',
      './src/css/style.css',
    ])
    .pipe(
      concatCss('./build/css/style.min.css', {
        rebaseUrls: false,
      })
    )
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(gulp.dest('.'));
}

function prepareSass() {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        autoprefixer: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(gulp.dest('./src/css'));
}

function prepareJs() {
  return gulp
    .src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('script.min.js', { newLine: ';' }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
}

function images() {
  return (
    src('src/img/*.png')
      .pipe(
        squoosh({
          // mozjpeg: {
          //   quality: 70,
          // },
          oxipng: {
            quality: 70,
          },
        })
      )
      // .pipe(
      //   squoosh({
      //     webp: {},
      //     avif: {},
      //   }),
      // )

      .pipe(dest('build/img'))
  );
}

exports.images = images;

// function css(cb) {
//   cb();
// }

// function javascript(cb) {
//   //   cb(new Error('kaboom'));
//   cb();
// }

// function streamTask() {
//   return src('*.js').pipe(dest('output'));
// }

// exports.build = series(clean, parallel(css, javascript));

function watcher() {
  watch('./src/scss/*.scss', series(prepareSass, prepareCss));
  watch('./src/js/*.js', prepareJs);
  watch('./src/html/**/*.html', prepareHtml);
}

// exports.styles = series(prepareSass, prepareCss);
// exports.scripts = prepareJs;
// exports.brOpen = brOpen;
// exports.html = prepareHtml;
exports.build = parallel(
  prepareHtml,
  prepareJs,
  series(prepareSass, prepareCss)
);
exports.default = parallel(brOpen, watcher);
