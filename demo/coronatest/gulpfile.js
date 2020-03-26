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
var gcmq = require('gulp-group-css-media-queries');
var rigger = require('gulp-rigger');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
// var os = require('os');
var open = require('gulp-open');
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

gulp.task('icons', gulp.series('generate-favicon', 'inject-favicon-markups'));

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
