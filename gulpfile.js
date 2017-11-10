var gulp = require('gulp'),
    argv = require('yargs').argv,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    autoPrefixer = require('gulp-autoprefixer'),
    sourceMaps = require('gulp-sourcemaps'),
    cachebust = require('gulp-cachebust'),
    stripDebug = require('gulp-strip-debug');

gulp.task('css', function () {
    gulp.src([
        'css/*.css'])
        .pipe(sourceMaps.init())
        .pipe(minifyCss())
        .pipe(autoPrefixer('last 2 versions', 'safari 5', 'ie9'))
        .pipe(concat('style.min.css'))
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('public_html/assets/css'))
});

gulp.task('js', function () {
    gulp.src([
        argv.production ? 'node_modules/vue/dist/vue.min.js' : 'node_modules/vue/dist/vue.js',
        argv.production ? 'node_modules/axios/dist/axios.min.js' : 'node_modules/axios/dist/axios.js',
        'assets/js/**/*.js'])
        .pipe(concat('app.min.js'))
        // .pipe(stripDebug())
        .pipe(uglify())
        // .pipe(cachebust({
        //     type: 'timestamp'
        // }))
        .pipe(gulp.dest('public_html/assets/js'))
});

gulp.task('default', ['css', 'js']);