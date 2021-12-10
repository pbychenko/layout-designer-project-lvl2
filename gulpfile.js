const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const buildSass = () => {
  console.log('Complile SASS');

  return src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./temp/styles/'));
}

const reload = (f) => {
  console.log('reload for html');

  browserSync.reload();
  f();  
}

const moveStyles = () => {
  console.log('Move app.css to /css');

  return src('./temp/styles/app.css')
  .pipe(dest('./src/css/'))
  .pipe(browserSync.stream());
}

const browserSyncJob = () => {
  browserSync.init({
    server: "./src/"
  });
  
  watch('./src/scss/*.scss', series(buildSass, moveStyles));
  watch('./src/*.html', reload);
};

exports.server = browserSyncJob;
exports.build = series(buildSass, moveStyles);