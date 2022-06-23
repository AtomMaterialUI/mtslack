import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import fileInclude from 'gulp-browser-js-include';
import injectVersion from 'gulp-inject-version';

const useSass = gulpSass(sass);

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
    .pipe(useSass())
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
    .pipe(useSass())
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
  gulp.watch(paths.styles.src, gulp.parallel('debugStyles', 'styles'));
});
gulp.task('watchScripts', () => {
  gulp.watch(paths.scripts.src, gulp.parallel('scripts'));
});
