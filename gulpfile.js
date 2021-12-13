const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

const buildSass = () => {
  console.log('Complile SASS');

  return src('./src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/css/'))
    .pipe(browserSync.stream());
}

const reload = (f) => {
  console.log('reload for html');

  browserSync.reload();
  f();  
}

const browserSyncJob = () => {
  browserSync.init({
    server: "./src/"
  });

  watch('./src/scss/**/*.scss', buildSass);
  watch('./src/*.html', reload);
};

exports.server = browserSyncJob;
exports.build = buildSass;