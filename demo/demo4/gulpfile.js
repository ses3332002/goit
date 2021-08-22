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
const webphtml = require('gulp-webp-for-html');
const realFavicon = require('gulp-real-favicon');
const fs = require('fs');
const ttf2woff2 = require('gulp-ttf2woff2');
const imagemin = require('gulp-imagemin');
const cwebp = require('gulp-cwebp');

function img2webp() {
  return (
    gulp
      .src('./src/img/*')
      .pipe(cwebp())
      // .pipe(cwebp({ metadata: 'exif' }))
      .pipe(gulp.dest('./build/img'))
  );
}

function img2min() {
  return gulp
    .src('./src/img/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(gulp.dest('./build/img'));
}

exports.images = parallel(img2min, img2webp);

function fontConvert() {
  return gulp
    .src(['./src/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./build/fonts/'));
}

exports.fonts = fontConvert;

const FAVICON_DATA_FILE = 'src/icons/faviconData.json';

function generateFavicon(done) {
  return realFavicon.generateFavicon(
    {
      masterPicture: 'src/icons/logo_templ.png',
      dest: './',
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '0%',
          assets: {
            ios6AndPriorIcons: true,
            ios7AndLaterIcons: true,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
          appName: 'Gallery',
        },
        desktopBrowser: {
          design: 'raw',
        },
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: '#603cba',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
          appName: 'Gallery',
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor: '#ffffff',
          manifest: {
            name: 'Gallery',
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: 'silhouette',
          themeColor: '#5bbad5',
        },
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    }
  );
}

function injectFaviconMarkups() {
  return gulp
    .src(['./src/icons/head.html'])
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(gulp.dest('./src/html/templates'));
}

exports.icons = series(generateFavicon, injectFaviconMarkups);

function pictureInsertion() {
  return gulp
    .src('./src/html/**/*.html')
    .pipe(webphtml(['.jpg', '.png']))
    .pipe(gulp.dest('./src/ready'));
}

function brOpen() {
  gulp.src('.').pipe(
    webserver({
      livereload: true,
      open: 'http://localhost:8000',
    })
  );
}

function prepareHtml() {
  return gulp
    .src('./src/html/*.html')
    .pipe(rigger())
    .pipe(webphtml(['.jpg', '.png']))
    .pipe(gulp.dest('.'));
}

// function prepareCss() {
//   return gulp
//     .src(['./src/css/reset.css', './src/css/style.css'])
//     .pipe(
//       concatCss('./build/css/style.min.css', {
//         rebaseUrls: false,
//       })
//     )
//     .pipe(gcmq())
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('.'));
// }

function prepareSass() {
  return (
    gulp
      .src('./src/scss/style.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(
        autoprefixer({
          autoprefixer: ['last 2 versions'],
          cascade: false,
        })
      )
      // .pipe(gulp.dest('./src/css'));
      .pipe(gcmq())
      .pipe(cleanCSS())
      .pipe(gulp.dest('./build/css'))
  );
}

function prepareJs() {
  return (
    gulp
      .src('./src/js/script.js')
      // .pipe(rigger())
      .pipe(plumber())
      // .pipe(concat('script.min.js', { newLine: ';' }))
      // .pipe(uglify())
      .pipe(gulp.dest('./build/js'))
  );
}

function images_() {
  return src('src/img/*')
    .pipe(
      squoosh({
        mozjpeg: {
          quality: 70,
        },
        // oxipng: {
        //   quality: 70,
        // },
        webp: {
          quality: 70,
        },
        //     avif: {},
      })
    )
    .pipe(dest('build/img'));
}

function watcher() {
  watch('./src/scss/**/*.scss', prepareSass);
  // watch('./src/scss/*.scss', series(prepareSass, prepareCss));
  watch('./src/js/**/*.js', prepareJs);
  watch('./src/html/**/*.html', prepareHtml);
}

exports.styles = series(prepareSass);
// exports.scripts = prepareJs;
// exports.brOpen = brOpen;
// exports.html = prepareHtml;

exports.pictIns = pictureInsertion;
exports.build = parallel(
  prepareHtml,
  prepareJs,
  prepareSass
  // series(prepareSass, prepareCss)
);
exports.default = parallel(brOpen, watcher);
