
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src("test/testrunner.js", {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});
