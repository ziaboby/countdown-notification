var gulp = require('gulp'); 
var browserSync  = require('browser-sync');  

var config = require('../../../config/gulp.conf');

/**
 * Init browser-sync
 */
gulp.task('browser-sync', function () {
    browserSync.init(null, {
        server:{
            baseDir: "",
            online:  true
        }
    });
});

/**
 * Reload browser windows opened by browser-sync
 */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/**
 * Watch files for changes
 *
 * NOTE Tasks within an array are executed before the task itself
 */
gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(config.watch.src.sass, [ 'compile-css-dev', 'bs-reload' ]); 
	gulp.watch(config.watch.src.js, [ 'compile-js-dev', 'bs-reload' ]);  
});

/**
 * Watch SASS files for changes 
 */
gulp.task('watch-sass', ['browser-sync'], function() {
	gulp.watch(config.watch.src.html, [ 'bs-reload' ]); 
	gulp.watch(config.watch.src.sass, [ 'compile-css-dev', 'bs-reload' ]);  
});

/*
 * Update min js version listed in the directory where some changes have been made 
 */
gulp.task('watch-js', ['browser-sync'], function() {
	gulp.watch(config.watch.src.js, [ 'compile-js-dev', 'bs-reload' ]); 
});
