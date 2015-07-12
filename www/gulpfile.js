var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin  = require('gulp-imagemin'),
	clean = require('gulp-clean'),
	cache = require('gulp-cache'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify');

gulp.task('styles',function(){
	return gulp.src('resource/css/**/*.css')
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('assets/css'))
		.pipe(notify({message:'Styles task complete'}));
});
gulp.task('scripts', function() { 
	return gulp.src('resource/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'))
		.pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('images', function() { 
	return gulp.src('resource/img/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('assets/img'))
		.pipe(notify({ message:'Images task complete' }));
});
gulp.task('clean',function(){
	return gulp.src(['assets/css','assets/js','assets/img'], {read: false})
		.pipe(clean());
});
gulp.task('watch',function(){
	gulp.watch('resource/css/**/*.css',['styles']);
	gulp.watch('resource/js/**/*.js',['scripts']);
	gulp.watch('resource/img/**/*',['images']);
});
gulp.task('default',['clean','watch'],function(){
	gulp.start('styles','scripts','images');
}); 