
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var minify = require('gulp-minify');

gulp.task('test', function () {
    return gulp.src("test/testrunner.js", {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('minify', function () {
    return gulp.src("src/*.js")
    .pipe(minify({
        ignoreFiles: [".swp"]
    }))
    .pipe(gulp.dest("dist"));
});
