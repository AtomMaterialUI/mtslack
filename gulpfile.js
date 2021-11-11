const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const fileInclude = require('gulp-browser-js-include');
const injectVersion = require('gulp-inject-version');

const paths = {
  styles: {
    src: 'styles/**/*.scss',
    dest: 'dist',
  },
  scripts: {
    src: 'includes/**/*.js',
    main: 'includes/**/plugins.js',
    dest: 'dist',
  },
};

gulp.task('styles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(injectVersion())
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: 'slack.min',
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('debugStyles', () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(injectVersion())
    .pipe(
      rename({
        basename: 'slack',
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', () => {
  return (
    gulp
      .src(paths.scripts.main)
      .pipe(injectVersion())
      .pipe(fileInclude())
      // .pipe(butternut())
      .pipe(gulp.dest(paths.scripts.dest))
  );
});

gulp.task('watchStyles', () => {
  gulp.watch(paths.styles.src, gulp.parallel('debugStyles'));
});
gulp.task('watchScripts', () => {
  gulp.watch(paths.scripts.src, gulp.parallel('scripts'));
});
