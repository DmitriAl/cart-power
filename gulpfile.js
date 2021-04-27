/* Глобальные переменные */
const { src, dest, watch, parallel } = require('gulp');

/* Конкатенация файлов в один файл */
const concat = require('gulp-concat');

/* LESS */
const less = require('gulp-less');

/* Автообновление страницы */
const browserSync = require('browser-sync').create();

/* Минимизатор JS */
const uglify = require('gulp-uglify-es').default;

/* Автопрефиксер */
const autoprefixer = require('gulp-autoprefixer');





/* Функция автообновления страницы */
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'application/'
    }
  });
}

/* Функция минимизатора JS */
function scripts() {
  return src([ 
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'application/javascript/jquery-scripts.js',
    'node_modules/just-validate/dist/js/just-validate.min.js',
    'node_modules/inputmask/dist/inputmask.min.js',
    'application/javascript/script.js'
  ])
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(dest('application/javascript'))
  .pipe(browserSync.stream())
}

/* Функция для LESS  */
function styles() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'application/less/style.less'
  ])
  .pipe(less({compress: true}))
  .pipe(concat('style.min.css'))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 version'],
    grid: true
  }))
  .pipe(dest('application/css'))
  .pipe(browserSync.stream())
}

/* Билдер */
function build() {
  return src([
    'application/css/style.min.css',
    'application/fonts/**/*',
    'application/javascript/script.min.js',
    'application/*.html',
    'application/images/**/**/*'
  ], {base: "application"}
  )
  .pipe(dest('assests'))
}

/* Функция автообновления страницы */
function watcher() {
  watch(['application/less/**/*.less'], styles);
  watch(['application/javascript/**/*.js', '!application/javascript/script.min.js'], scripts);
  watch(['application/*.html']).on('change', browserSync.reload)
}





/* Экспорты */
exports.styles = styles;
exports.watcher = watcher;
exports.browsersync = browsersync;
exports.scripts = scripts;

exports.build = build;

exports.default = parallel(styles, scripts, browsersync, watcher);