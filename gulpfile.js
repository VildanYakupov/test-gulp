// *подключение плагинов;
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const fileInclude = require('gulp-file-include');
const uglify = require('gulp-uglify');

// *переменные к папке;
let distFolder = "dist";
let srcFolder = "src";

// *Пути до папок;
const paths = {
    // *пути до папок с источником
    src: {
        html: srcFolder + "/index.html",
        css: srcFolder + "/scss/style.scss",
        scripts: srcFolder + "/scripts/script.js",
        fonts: srcFolder + "/fonts/**/*.ttf",
        img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    // *
    dest: {
        html: distFolder + "/",
        css: distFolder + "/css/",
        scripts: distFolder + "/js/",
        fonts: distFolder + "/fonts/",
        img: distFolder + "/img/",
    },
    watch: {
        html: srcFolder + "/**/*.html",
        css: srcFolder + "/css/**/*.scss",
        scripts: srcFolder + "/js/**/*.js",
        img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    distClean: distFolder +"/",
}

function changeHTML() {
    return gulp.src(paths.src.html)
        .pipe(fileInclude())
        .pipe(gulp.dest(paths.dest.html))
        .pipe(browsersync.stream())
}

function changeStyles() {
    return gulp.src(paths.src.css)
        .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({cascade: false}))
            .pipe(gulp.dest(paths.dest.css))
            .pipe(cleanCSS())
            .pipe(rename({
                basename: 'style',
                suffix: '.min',
                extname: '.css'
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browsersync.stream())
}

function changeScripts() {
    return gulp.src(paths.src.scripts)
        .pipe(sourcemaps.init())
            .pipe(fileInclude())
            .pipe(gulp.dest(paths.dest.scripts))
            .pipe(uglify())
            .pipe(rename({
                basename: 'script',
                suffix: '.min',
                extname: '.js'
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest.scripts))
        .pipe(browsersync.stream())
}


function browserSync() {
    browsersync.init({
        server:{
            baseDir: distFolder +"/",
        },
    })
}

function watchFiles() {
    gulp.watch(paths.watch.html, changeHTML),
    gulp.watch(paths.watch.css, changeStyles),
    gulp.watch(paths.watch.css, changeScripts)
}

function cleanFolder() {
    return del(paths.distClean);
}

let build = gulp.series(cleanFolder, gulp.parallel(changeHTML, changeStyles, changeScripts))
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.build = build;
exports.watch = watch;
exports.browserSync = browserSync;
exports.watchFiles = watchFiles;
exports.changeHTML = changeHTML;
exports.changeStyles = changeStyles;
exports.changeScripts = changeScripts;
exports.cleanFolder = cleanFolder;