const gulp = require('gulp');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');

gulp.task('runUploader', async function () {
    gulp.src('./src/**')
        .pipe(tar('archive.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('./dist')) 
});
