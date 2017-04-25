var gulp = require('gulp');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var size = require('gulp-size');
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");

var config = require('../../../config/gulp.conf');

/**
 * Generate CSS from SCSS/SASS and saved an expanded version under 'assets'
 * dir and a minimized one under 'dist/css'
 * Build sourcemaps
 */
gulp.task('compile-css-dev', function () {
	return gulp.src(config.sass.src)
		.pipe(plumber())
		.pipe(compass(config.sass.options.dev)) 
		.pipe(autoprefixer(config.autoprefixer))
		.pipe(rename(function (path) {
			// TODO opt out versioning in dev mode
            path.basename += "." + config.optimization.css.version[path.basename] + ".min";
            console.log("write "+ path.dirname + "/" + path.basename); 
		}))
		.pipe(gulp.dest(config.optimization.css.dest))
		.pipe(size())
		;
});

/**
 * Copy and minimize CSS files 
 */
gulp.task('compile-css-prod', function () { 
	return gulp.src(config.sass.src)
		.pipe(plumber())
		.pipe(compass(config.sass.options.prod)) 
		.pipe(autoprefixer(config.autoprefixer))
		.pipe(rename(function (path) {
            path.basename += "." + config.optimization.css.version[path.basename] + ".min";
            console.log("write "+ path.dirname + "/" + path.basename); 
		}))
		.pipe(gulp.dest(config.optimization.css.dest))
		.pipe(size())
		;
});
