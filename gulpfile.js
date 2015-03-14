var gulp = require('gulp');
var gutil = require('gulp-util')
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var ncp = require('ncp');

gulp.task('sass', function() {
    gulp.src('./app/styles/**/*.scss')
        .pipe(compass({
        css: 'css',
        sass: 'sass'
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./assets/styles'));
});

gulp.task('bowerjs', function() {
    // main app js file
    var vendorjs = [
        './app/dependencies/js/sails.io.js',
        './app/bower_components/angular/angular.js',
        './app/bower_components/angular-route/angular-route.js',
        './app/bower_components/hammerjs/hammer.js',
        './app/bower_components/angular-hammer/angular-hammer.js',
        './app/bower_components/json3/lib/json3.js',
        './app/bower_components/modernizr/modernizr.js'
    ];

    gulp.src(vendorjs,{base:'app/bower_compnents/'})
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('angularappjs', function(){
    var angularjsapp = ['./app/scripts/app.js',
        './app/scripts/models/*.js',
        './app/scripts/controllers/*.js']

    gulp.src(angularjsapp, {base:'app/scripts/'})
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('angularviews', function(){
    ncp('./app/views', './assets/views/', function(err){
        if(err) {
            throw err;
        }
    });
});

gulp.task('watch', function() {
    // watch scss files
    gulp.watch('./app/**/*.scss', function() {
        gulp.run('sass');
    });

    gulp.watch('./app/**/*.js', function() {
        gulp.run('bowerjs');
        gulp.run('angularappjs');
    });

    gulp.watch('./app/**/*.html', function(){
        gulp.run('angularviews');
    });
});

gulp.task('default', ['sass','angularappjs', 'bowerjs', 'angularviews', 'watch']);