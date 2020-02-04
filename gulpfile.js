var gulp = require('gulp'),
 pug = require('gulp-pug'),
 webserver = require('gulp-webserver'),
 scss = require('gulp-sass'),
 autoprefixer = require('gulp-autoprefixer'),
 rename = require("gulp-rename")
 cleanCSS = require('gulp-clean-css');

gulp.task('css',function(){
 gulp.src('./dev/scss/*.scss')
 .pipe(
  scss().on('error', scss.logError)
 )
 .pipe(autoprefixer({
        browsers: ['last 50 versions'],
        cascade: false
    }))
 .pipe(
  gulp.dest('./app/css/')
 )
 .pipe(rename({
 	suffix: ".min"
 }))
 .pipe(cleanCSS({compatibility: 'ie8'}))
 .pipe(
 	gulp.dest('./app/css/')
 	)
})
gulp.src("./src/main/text/hello.txt")
  .pipe(rename("main/text/ciao/goodbye.md"))
  .pipe(gulp.dest("./dist"));

gulp.task('img', function(){
  gulp.src('./dev/images/*')
  .pipe(
    gulp.dest('./app/images/')
    )
});

gulp.task('webserver', function () {
    gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      /*path: './app',
      fallback: 'index.html'*/
    }));
});

gulp.task('html', function(){
 gulp.src('./dev/*.pug')
 .pipe(pug({
  pretty: true
 }))
 .pipe(gulp.dest('./app/'));

});
gulp.task('watch', function(){
 gulp.watch('./dev/*.pug', ['html']);
 gulp.watch('./dev/scss/*.scss', ['css']);
 gulp.watch('./dev/parts/*.pug', ['html']);
})

gulp.task('default', ['html','webserver','watch','css']);