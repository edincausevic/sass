var gulp = require('gulp'),
	sass = require('gulp-sass'),
	min = require('gulp-uglify'),
	prefix = require('gulp-autoprefixer'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber');

gulp.task('styles', function(){
	
	gulp.src('app/sass/styles.scss')
		.pipe(plumber())
        .pipe(sass({outputStyle: 'compressed'})) 
        .pipe(prefix('last 2 versions')) 
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});

gulp.task('scripts', function(){
	
	gulp.src('app/js/respond.js')
		.pipe(plumber())
		.pipe(connect.reload());
});

// livereload
// go to: http://localhost:8080/
gulp.task('connect', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('watch', function(){
	
	gulp.watch('app/sass/**/*.scss', ['styles']);
	gulp.watch('app/js/respond.js', ['scripts']);
});

gulp.task('default', ['watch', 'connect']);