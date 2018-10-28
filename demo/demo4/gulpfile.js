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
var runSequence = require('run-sequence');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

var FAVICON_DATA_FILE = 'src/icons/faviconData.json';

gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'src/icons/logo_templ.png',
		dest: './',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'noChange',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#da532c',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'blackAndWhite',
				threshold: 50,
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

gulp.task('inject-favicon-markups', function() {
	return gulp.src([ './src/icons/head.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe(gulp.dest('./src/html/templates'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});

gulp.task('icons', function() {
  runSequence('generate-favicon',
  'inject-favicon-markups');
});

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
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./build/img'))
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
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

gulp.task('prepare_css', function() {
  gulp.src(['./src/css/reset.css', './src/css/style.css'])
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

gulp.task('styles', function() {
 runSequence('sass',
              'prepare_css');
});

gulp.task('prepare_js', function() {
  gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('script.min.js', {newLine: ';'}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['styles']);
  // gulp.watch('./src/scss/**/*.scss', ['sass', 'prepare_css']);
  gulp.watch('./src/js/*.js', ['prepare_js']);
  gulp.watch('./src/html/**/*.html', ['prepare_html']);
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

gulp.task('default', ['imagemin', 'prepare_js', 'prepare_html', 'styles', 'webserver', 'watch']);
// gulp.task('default', ['imagemin', 'prepare_js', 'prepare_html', 'sass', 'prepare_css', 'webserver', 'watch']);
