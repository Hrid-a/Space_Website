const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    data = require('gulp-data'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect');

gulp.task("server", ()=> {
    connect.server(
        {
            root:"dist/",
            livereload: true,
        });
})

gulp.task("html", ()=> {
    return gulp.src('src/*.pug')
            .pipe(pug())
            .pipe(gulp.dest('dist'))
            .pipe(connect.reload());
})


gulp.task("css", ()=> {
    return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('./styles.css.map'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload())
})

gulp.task("js", ()=> {
    return gulp.src('src/scripts/index.js')
        .pipe(gulp.dest('dist/scripts'))
        .pipe(connect.reload())
})

gulp.task("watch", ()=> {
    gulp.watch(['src/**/*.pug', 'src/sass/**/*.scss', 'src/scripts/index.js'], gulp.series("html", "css", "js"));
})

gulp.task("default", gulp.parallel("server", "watch"));