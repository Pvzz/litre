var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');

// function errorLog(error) {
//     console.error.bind(error);
//     this.emit('end');
// }

// Scripts Task
// Uglifies
gulp.task('scripts', () => {
   
    return gulp
            .src('src/js/*.js')
            .pipe(plumber())
            .pipe(uglify())
            // .on('error', errorLog)
            .pipe(gulp.dest('src/build/js'));
});

gulp.task('scripts-watch', ['scripts'], browserSync.reload);

// Styles Task
// Autoprefix
gulp.task('styles', () => {

    return gulp
            .src('src/css/*.css')
            .pipe(plumber())
            // .on('error', errorLog)
            .pipe(prefix('last 2 versions'))
            .pipe(gulp.dest('src/build/css'));
});

gulp.task('styles-watch', ['styles'], browserSync.reload);

// Structures Task
// AutoReload
// gulp.task('structures', () => {

//     gulp.src('src/*.html')
//         .on('error', errorLog)
//         .pipe(gulp.dest('src/'))
// });

// Images Task
// Compress
gulp.task('images', () => {
    
    return gulp
            .src('src/images/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest('src/build/images'));
});

// Watch Task
gulp.task('watch', () => {

    browserSync({
        server: {
            baseDir:  'src/'
        }
    });

    gulp.watch('src/js/*.js', ['scripts-watch']);
    gulp.watch('src/css/*.css', ['styles-watch']);
});

gulp.task('default', ['scripts', 'styles', 'watch']);