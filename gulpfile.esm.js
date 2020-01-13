import gulp from 'gulp';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import htmlMin from 'gulp-htmlmin';
import del from 'del';

const paths = {
    styles: {
        src: 'src/styles/**/*.css',
        dest: 'dist/styles/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/scripts/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    },
    html: {
        src: 'src/index.html',
        dest: 'dist/'
    }
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del(['dist']);

/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS())
        // pass in options to the stream
        .pipe(rename({
            basename: 'style',
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(uglify())
        .pipe(concat('index.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

export function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
}

export function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest))
}

/*
 * You could even use `export as` to rename exported tasks
 */
function watchFiles() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
}
export { watchFiles as watch };

const build = gulp.series(clean, gulp.parallel(styles, scripts, html, images));
/*
 * Export a default task
 */
export default build;