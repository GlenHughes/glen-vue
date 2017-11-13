var gulp = require('gulp'),
    argv = require('yargs').argv,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    autoPrefixer = require('gulp-autoprefixer'),
    sourceMaps = require('gulp-sourcemaps'),
    cachebust = require('gulp-cachebust'),
    stripDebug = require('gulp-strip-debug'),
    babel = require('gulp-babel');

gulp.task('css', function () {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'assets/css/*.css'])
        // .pipe(sourceMaps.init())
        .pipe(autoPrefixer('last 2 versions', 'safari 5', 'ie9'))
        .pipe(concat('style.min.css'))
        .pipe(minifyCss())
        // .pipe(cachebust({
        //     type: 'timestamp'
        // }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('public_html/assets/css'))
});

gulp.task('js', function () {
    gulp.src([
        argv.production ? 'node_modules/vue/dist/vue.min.js' : 'node_modules/vue/dist/vue.js',
        argv.production ? 'node_modules/jquery/dist/jquery.slim.min.js' : 'node_modules/jquery/dist/jquery.slim.js',
        argv.production ? 'node_modules/axios/dist/axios.min.js' : 'node_modules/axios/dist/axios.js',
        argv.production ? 'node_modules/bootstrap/dist/bootstrap.min.js' : 'node_modules/bootstrap/dist/bootstrap.js',
        'assets/js/**/*.js'])
        .pipe(concat('app.min.js'))
        // .pipe(stripDebug())
        .pipe(babel({
            presets: ['vue']
        }))
        // .pipe(uglify())
        // .pipe(cachebust({
        //     type: 'timestamp'
        // }))
        .pipe(gulp.dest('public_html/assets/js'))
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
        'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('public_html/assets/fonts/'));
});

gulp.task('default', ['fonts', 'css', 'js']);