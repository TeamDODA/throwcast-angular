const _ = require('lodash');
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const $ = require('gulp-load-plugins')();

const clientPath = 'client';
const paths = {
  assets: `${clientPath}/assets/**/*`,
  images: `${clientPath}/assets/images/**/*`,
  scripts: [
    `${clientPath}/{app,components}/**/!(*.spec|*.mock).js`
  ],
  styles: [`${clientPath}/{app,components}/**/*.css`],
  mainStyle: `${clientPath}/style.css`,
  views: `${clientPath}/{app,components}/**/*.html`,
  mainView: `${clientPath}/index.html`,
  dest: 'dist'
};

const errorHandler = function(name) {
  return err => $.util.log($.util.color.red(`[${name}]`, err));
};

gulp.task('bower', () => gulp.src(['./bower.json']).pipe($.install()));

gulp.task('clean:dist', () => del([`${paths.dest}/!(.git*|.static|Procfile)**`], { dot: true }));

gulp.task('inject:scripts', () => {
  const injectScripts = gulp.src(paths.scripts)
    .pipe($.angularFilesort())
    .on('error', errorHandler('AngularFilesort'));

  const injectOptions = {
    ignorePath: [clientPath, `${clientPath}/lib`],
    starttag: '<!-- injector:js -->',
    endtag: '<!-- endinjector -->',
    transform: (filepath) => `<script src="${filepath.replace('/client/', '')}"></script>`,
  };

  return gulp.src(paths.mainView)
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(clientPath));
});

gulp.task('inject:css', () => {
  const injectStyles = gulp.src(_.union([paths.mainStyle], paths.styles), { read: false })
    .pipe($.sort());

  const injectOptions = {
    starttag: '<!-- injector:css -->',
    endtag: '<!-- endinjector -->',
    transform: (filepath) => `<link rel="stylesheet" href="${filepath.replace('/client/', '')}">`
  };

  return gulp.src(paths.mainView)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe(gulp.dest(clientPath));
});

gulp.task('wiredep', () => {
  return gulp.src(paths.mainView)
    .pipe($.wiredep({
      directory: `${clientPath}/lib/`,
      ignorePath: `${clientPath}/lib/`,
    }))
    .pipe(gulp.dest(clientPath));
});

gulp.task('inject', cb => runSequence(
  'inject:scripts',
  'inject:css',
  'wiredep',
  cb));

gulp.task('connect-dev', function () {
  $.connect.server({
    name: 'dev server',
    root: [clientPath],
    port: 3000,
    livereload: true,
  });
});

gulp.task('watch', () => {
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('default', cb => runSequence('inject', ['connect-dev', 'watch'], cb));
