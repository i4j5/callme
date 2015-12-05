var gulp = require('gulp'),
    stylus = require('gulp-stylus')
		rename = require('gulp-rename'),
		autoprefixer = require('gulp-autoprefixer'),
		minifyCSS = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		gutil = require('gulp-util'),
		concat = require('gulp-concat'),
	  browserSync = require('browser-sync').create(),
  	reload = browserSync.reload,
		chalk = require('chalk');

handleError = function(err){
  gutil.log(
    "\n\n-----------------\n",
    chalk.bold.red(err.name),
    "\n-----------------\n",
    err.message
  );

  gutil.beep();
}

gulp.task('clean', function () {
  return gulp.src(['.tmp'], {read: false})
    .pipe(clean());
});


gulp.task('server', function() {
	browserSync.init({
        server: "./"
    });
});

gulp.task('livereload', function () {
	gulp.src('*.html')
		.pipe( reload({stream:true}) );
});

gulp.task('stylus', function() {

	return gulp
		.src('app/stylus/main.styl')
    .pipe(stylus())
    .on('error', handleError)
    .pipe(autoprefixer({browsers: ['last 15 versions']}))
		.pipe(minifyCSS())
		.pipe(rename(function (path) {
			path.dirname = '';
			path.basename = '_';
			path.extname = '.css'
		}))
		.pipe(gulp.dest('.tmp'));

});

gulp.task('js', function() {

	return gulp
		.src([
			'bower_components/load/load.js',
			'app/scripts/main.js'
		])
		.pipe(concat('_.js'))
		.pipe(uglify())
		.pipe(gulp.dest('.tmp'));;

});

gulp.task('watch', function(){
  gulp.watch('app/scripts/*.js', ['js', 'livereload']);
  gulp.watch('app/stylus/*.styl', ['stylus', 'livereload']);
  gulp.watch('*.html', ['livereload']);
  gulp.start('server');
});

gulp.task('default', ['stylus', 'js', 'watch']);
gulp.task('dist', ['stylus', 'js']);

