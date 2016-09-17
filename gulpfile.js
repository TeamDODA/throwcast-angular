const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const $ = require('gulp-load-plugins')();

const paths = {};
paths.client = 'client';
paths.dist = 'dist';
paths.temp = '.tmp';
paths.assets = `${paths.client}/assets/**/*`;
paths.images = `${paths.client}/assets/images/**/*`;
paths.scripts = `${paths.client}/{app,components}/**/!(*.spec|*.mock).js`;
paths.styles = `${paths.client}/{app,components}/**/*.css`;
paths.mainStyle = `${paths.client}/style.css`;
paths.views = `${paths.client}/{app,components}/**/*.html`;
paths.mainView = `${paths.client}/index.html`;
paths.builtPartials = `${paths.temp}/template-cache.js`;

gulp.task('bower', () => gulp.src(['./bower.json']).pipe($.install()));

gulp.task('inject', cb => runSequence(
  'inject:scripts',
  'inject:css',
  'inject:partials',
  'wiredep',
  cb));

gulp.task('inject:scripts', () => {
  const injectScripts = gulp.src(paths.scripts, { read: false })
    .pipe($.sort());

  const injectOptions = {
    ignorePath: [paths.client],
    starttag: '<!-- inject:js -->',
    endtag: '<!-- endinject -->',
  };

  return gulp.src(paths.mainView)
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(paths.client));
});

gulp.task('inject:css', () => {
  const injectStyles = gulp.src([paths.mainStyle, paths.styles], { read: false })
    .pipe($.sort());

  const injectOptions = {
    ignorePath: [paths.client],
    starttag: '<!-- injector:css -->',
    endtag: '<!-- endinjector -->',
  };

  return gulp.src(paths.mainView)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe(gulp.dest(paths.client));
});

gulp.task('inject:partials', ['build:partials'], () => {
  const injectPartials = gulp.src(`${paths.temp}/template-cache.js`);

  const injectOptions = {
    ignorePath: [paths.temp],
    starttag: '<!-- inject:partial -->',
    endtag: '<!-- endinject -->',
  };
  return gulp.src(paths.mainView)
    .pipe($.inject(injectPartials, injectOptions))
    .pipe(gulp.dest(paths.client));
});

gulp.task('build:partials', () => {
  return gulp.src(paths.views)
    .pipe($.htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe($.angularTemplatecache('template-cache.js', { module: 'throwcast', standalone: false }))
    .pipe(gulp.dest(paths.temp));
});

gulp.task('wiredep', () => {
  return gulp.src(paths.mainView)
    .pipe($.wiredep({
      directory: `${paths.client}/lib/`,
      fileTypes: {
        html: {
          replace: {
            js: '<script src="/{{filePath}}"></script>',
            css: '<link rel="stylesheet" href="/{{filePath}}" />'
          }
        }
      }
    }))
    .pipe(gulp.dest(paths.client));
});

gulp.task('watch', () => {
  gulp.watch(paths.views, ['build:partials']);
  gulp.watch('bower.json', ['wiredep']);

  const watchedSources = [
    paths.mainStyle,
    paths.builtPartials,
    paths.styles,
    paths.scripts,
  ];
  $.watch(watchedSources).pipe($.connect.reload());
});

gulp.task('serve:dev', function () {
  $.connect.server({
    name: 'dev server',
    root: [paths.client, paths.temp],
    port: 3000,
    livereload: true,
    fallback: `${paths.client}/index.html`,
  });
});

gulp.task('build', cb => runSequence(
  [
    'clean:dist',
    'clean:temp',
  ],
  'inject',
  'useref',
  'imagemin',
  'copy:extras',
  cb));

gulp.task('clean:dist', () => del([`${paths.dist}/!(.git*|.static|Procfile)**`], { dot: true }));
gulp.task('clean:temp', () => del([`${paths.temp}/**`], { dot: true }));

gulp.task('useref', ['clean:dist'], () => {
  return gulp.src(paths.mainView)
    .pipe($.useref())
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('imagemin', () => {
  return gulp.src(paths.images)
    .pipe($.imagemin({
      optimizationLevel: 3,
      progessive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(`${paths.dist}/assets/images`))
});

gulp.task('copy:extras', () => {
  return gulp.src([
    `${paths.client}/robots.txt`,
    `${paths.client}/.static`,
    `${paths.client}/nginx.conf.erb`,
  ], { dot: true })
    .pipe(gulp.dest(paths.dist));
});

gulp.task('serve:dist', ['build'], () => {
  $.connect.server({
    name: 'dist server',
    root: [paths.dist],
    port: 3000,
    livereload: true,
  });
});

gulp.task('default', cb => runSequence('inject', ['serve:dev', 'watch'], cb));
