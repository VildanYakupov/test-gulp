// *подключение плагинов;
const gulp = require('gulp');
// const browserSync = require('browserSync').create();
// const del = require('del');
const scss = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

// *переменные к папке;
let distFolder = "dist";
let srcFolder = "src";

// *Пути до папок;
const paths = {
    // *пути до папок с источником
    src: {
        html: srcFolder + "/index.html",
        css: srcFolder + "/scss/style.scss",
        scripts: srcFolder + "/scripts/**/*.js",
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
    clean: "./" + distFolder +"/",
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
        .pipe(gulp.dest(paths.dest.css));
}

function changeHTML() {
    return gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.dest.html));
}

// function browsersync() {
//     browserSync.init({
//         server:{
//             baseDir: './' + distFolder + "/"
//         },
//     })
// }

function watchFiles() {
    gulp.watch(paths.watch.html, changeHTML),
    gulp.watch(paths.watch.css, changeStyles)
}



exports.watchFiles = watchFiles;
exports.changeHTML = changeHTML;
exports.changeStyles = changeStyles;