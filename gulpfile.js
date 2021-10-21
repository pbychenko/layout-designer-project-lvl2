// const {
//     src,
//     dest,
//     parallel,
//     series,
//     watch
// } = require('gulp');

// // Load plugins

// // const uglify = require('gulp-uglify');
// // const rename = require('gulp-rename');
// const sass = require('gulp-sass')(require('sass'));
// // const autoprefixer = require('gulp-autoprefixer');
// // const cssnano = require('gulp-cssnano');
// // const concat = require('gulp-concat');
// // const clean = require('gulp-clean');
// // const imagemin = require('gulp-imagemin');
// const changed = require('gulp-changed');
// const browsersync = require('browser-sync').create();

// // Clean assets

// // function clear() {
// //     return src('./assets/*', {
// //             read: false
// //         })
// //         .pipe(clean());
// // }

// // JS function 

// // function js() {
// //     const source = './src/js/*.js';

// //     return src(source)
// //         .pipe(changed(source))
// //         .pipe(concat('bundle.js'))
// //         .pipe(uglify())
// //         .pipe(rename({
// //             extname: '.min.js'
// //         }))
// //         .pipe(dest('./assets/js/'))
// //         .pipe(browsersync.stream());
// // }

// // CSS function 

// function css() {
//     const source = './src/scss/*';

//     return src(source)
//         .pipe(changed(source))
//         .pipe(sass())
//         // .pipe(autoprefixer({
//         //     overrideBrowserslist: ['last 2 versions'],
//         //     cascade: false
//         // }))
//         // .pipe(rename({
//         //     extname: '.min.css'
//         // }))
//         // .pipe(cssnano())
//         .pipe(dest('./src/css/'))
//         .pipe(browsersync.stream());
// }

// // Optimize images

// // function img() {
// //     return src('./src/img/*')
// //         .pipe(imagemin())
// //         .pipe(dest('./assets/img'));
// // }

// // // Watch files

// function watchFiles() {
//     watch('./src/scss/*', css);
//     // watch('./src/js/*', js);
//     // watch('./src/img/*', img);
// }

// // BrowserSync

// function browserSync() {
//     browsersync.init({
//         server: {
//             baseDir: 'src/index.html'
//         },
//         port: 3000
//     });
// }

// // Tasks to define the execution of the functions simultaneously or in series

// exports.watch = parallel(watchFiles, browserSync);
// exports.default = series(parallel(css));

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync');
var runSequence = require('gulp4-run-sequence');

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Zell!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './src'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('./src/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('./src/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', gulp.series('sass'));
  gulp.watch('./src/*.html', browserSync.reload);
//   gulp.watch('app/js/**/*.js', browserSync.reload);
})



gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})

