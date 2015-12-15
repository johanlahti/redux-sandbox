var gulp = require('gulp');
var browserify = require('browserify');
var babel = require('babelify');
var react = require('react');
var concat = require("concat");
var fs = require("fs");
var source = require('vinyl-source-stream');
var uglify = require("gulp-uglify");
var jshint = require('jshint');
var jshintStylish = require('jshint-stylish');
var inject = require('gulp-inject');
var path = require("path");
var rename = require('gulp-rename');
var using = require('gulp-using');
var del = require("del");
var flatten = require('gulp-flatten');
var autoprefixer = require('gulp-autoprefixer');

// var sourcemaps = require('gulp-sourcemaps');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
// var watchify = require('watchify');

var p = {
	dest: "./build",
	
	ownJs: ["./src/**/*.js", "./src/**/*.jsx"],
	ownStylus: ["./src/**/*.styl"],
	ownCss: ["./src/**/*.css"],
	
	indexHtml: './src/index.html',
	
	libsDir: "./node_modules",
	libsDestSubDir: "resources/",
	libs: {
		"jquery": [
			"dist/jquery.min.js"
		],
		"bootstrap": [
			"dist/css/bootstrap.min.css",
			"dist/css/bootstrap-theme.min.css",
			"dist/js/bootstrap.min.js"
		]
		// ,
		// "bootstrap": "**/*"
	},
	libsCss: [
		"bootstrap/dist/css/bootstrap.min.css"
	]
};

function swallowError(e) {
	console.log(e);
	this.emit("end");
}

/**
 * Adapts the lib paths for moving and injecting by
 * adding a basepath.
 * @param  {Object} libs 	The libs in original key-value format
 * @param  {Boolean} inject	Get paths adapted for inject (if false, paths point to the lib source)
 * @return {Array}			Array of libs
 */
function getLibPaths(libs, inject) {
	inject = inject || false;

	var libName,
		libSrcs = [],
		outSrcs = [];
	for (libName in libs) {
		libSrcs = libs[libName];
		if (typeof libSrcs === "string") {
			libSrcs = [libSrcs];
		}
		var basePath;
		if (inject === true) {
			// Adapt basepath for inject
			basePath = path.join(p.dest, p.libsDestSubDir, libName);
		}
		else {
			// Adapt basepath for libs' origin
			basePath = path.join(p.libsDir, libName);
		}
		libSrcs = libSrcs.map(function(src) {
			return path.join(basePath, src);
		});

		outSrcs = outSrcs.concat(libSrcs);
	}
	return outSrcs;
}

gulp.task("clean:total", function() {
	del("./build");
});

gulp.task("html", ["libs:inject"], function() {
	return gulp
		.src([p.indexHtml])
			.pipe(gulp.dest(p.dest));
});

gulp.task("libs:move", function() {
	var sourcePaths = getLibPaths(p.libs, false);
	var destDir = path.join(p.dest, p.libsDestSubDir);
	console.log(sourcePaths);
	return gulp.src(sourcePaths, {base: p.libsDir})
		// .pipe(flatten())
		.pipe(using())
		.pipe(gulp.dest(destDir));
});

gulp.task("libs:inject", function() {
	// Find out which files to inject
	
	var libInjectPaths = getLibPaths(p.libs, true);
	// console.log(libInjectPaths);
	return gulp.src(p.indexHtml)
		.pipe(inject(gulp.src(libInjectPaths, {read: true, base: p.dest}), {addRootSlash: false, relative: false, ignorePath: "build"}))
		.pipe(rename("index.html"))
		.pipe(gulp.dest("./build"));
});

gulp.task("libs", ["libs:move"], function() {
	gulp.start("libs:inject");
});

gulp.task("css", function() {
	gulp.src("./src/**/*.css")
		.pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 9"))
		// .pipe(concat("style.css"))
		.pipe(gulp.dest(p.dest));
});

gulp.task("js", function() {
	return browserify({
		entries: "./src/index.jsx",
		debug: true
	})
		.transform("babelify", {presets: ["es2015", "react"]}).bundle()
	// .pipe(jshint())
	// .pipe(jshint.reporter(jshintStylish))
	.pipe(source("bundle.js"))
	// .pipe(uglify())
	// .pipe(concat("bundle.js"))
	.pipe(gulp.dest(p.dest))
		// .pipe(fs.createWriteStream("bundle.js"));
});

gulp.task("code", ["js", "css"]);

gulp.task("watch", function() {
	gulp.watch(p.ownJs.concat(p.ownCss), ["code"]).on("error", swallowError);
});

gulp.task("default", ["code", "watch"]);








