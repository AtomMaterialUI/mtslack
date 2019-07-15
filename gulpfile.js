const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const paths = {
    styles: {
        src: 'styles/*.scss',
        dest: 'dist'
    }
};

gulp.task('styles', () => {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'slack.min'
        })).pipe(gulp.dest(paths.styles.dest));
});

gulp.task('debugStyles', () => {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(rename({
            basename: 'slack'
        })).pipe(gulp.dest(paths.styles.dest));
});

gulp.task('watchStyles', () => {
    gulp.watch(paths.styles.src, gulp.parallel('debugStyles'));
});