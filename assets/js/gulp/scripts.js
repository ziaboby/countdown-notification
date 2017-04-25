var gulp = require('gulp'); 
var size = require('gulp-size');
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");

var config = require('../../../config/gulp.conf');

/**
 * Merge all development scripts in a single minified file
 */
gulp.task('compile-js-dev', function () {
	return gulp.src(config.watch.src.js)
		.pipe(plumber())
		.pipe(rename(function (path) {
			path.basename += "." + config.optimization.js.version[path.basename] + ".min";
            console.log("write "+ path.dirname + "/" + path.basename); 
		})) 
		.pipe(gulp.dest(config.optimization.js.dest))
		.pipe(size())
		;
}); 
gulp.task('compile-js-prod', function () {
	return gulp.src(config.watch.src.js)
		.pipe(plumber())
		.pipe(rename(function (path) {
			path.basename += "." + config.optimization.js.version[path.basename] + ".min";
            console.log("write "+ path.dirname + "/" + path.basename); 
		}))
		.pipe(uglify()) 
		.pipe(gulp.dest(config.optimization.js.dest))
		.pipe(size())
		;
}); 
