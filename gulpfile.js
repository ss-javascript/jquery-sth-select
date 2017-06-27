(function()
{
	/*
	 * Dependencies
	 */
	const gulp = require("gulp");
	const jshint = require("gulp-jshint");
	const less = require("gulp-less");
	const concat = require("gulp-concat");
	const babel = require("gulp-babel");
	const uglify = require("gulp-uglify");
	const rename = require("gulp-rename");
	const minifyPipeline = require("pipeline-minify-css");
	const path = require("path");

	/*
	 * Variables
	 */
	let dependenciesPath = "./node_modules";

	let sourcePath = "./src";
	let sourceJsPath = (sourcePath + "/js");
	let sourceCssPath = (sourcePath + "/less");

	let distPath = "./dist";
	let distJsPath = (distPath + "/js");
	let distCssPath = (distPath + "/css");

	/*
	 * Gulp Lint
	 */
	gulp.task("lint:app", function()
	{
		return gulp
			.src(sourceJsPath + "/*.js")
			.pipe(jshint())
			.pipe(jshint.reporter("default"));
	});

	/*
	 * Gulp Concat
	 */
	gulp.task("concat:app", function()
	{
		return gulp
			.src([
				sourceJsPath + "/_overlay.js",
				sourceJsPath + "/_popup.js",
				sourceJsPath + "/sth-select.js"
			])
			.pipe(babel({ presets: ["es2015"] }))
			.pipe(concat("sth-select.js"))
			.pipe(gulp.dest(distJsPath));
	});

	gulp.task("concat:app:min", function()
	{
		return gulp
			.src(distJsPath + "/main.js")
			.pipe(uglify().on("error", console.log))
			.pipe(rename("sth-select.min.js"))
			.pipe(gulp.dest(distJsPath))
	});

	gulp.task("concat:vendor", function()
	{
		return gulp
			.src([dependenciesPath + "/jquery/dist/jquery.js"])
			.pipe(concat("vendor.js"))
			.pipe(gulp.dest(distJsPath));
	});

	gulp.task("concat:vendor:min", function()
	{
		return gulp
			.src(distJsPath + "/vendor.js")
			.pipe(uglify())
			.pipe(rename("vendor.min.js"))
			.pipe(gulp.dest(distJsPath));
	});

	/*
	 * Gulp Sass
	 */
	gulp.task("less:app", function()
	{
		return gulp
			.src(sourceCssPath + "/importer.less")
			.pipe(less({ paths: path.join(__dirname, sourceCssPath) }))
			.pipe(rename("sth-select.css"))
			.pipe(gulp.dest(distCssPath));
	});

	/*
	 * Gulp Concat CSS
	 */
	gulp.task("concat-css:vendor", function()
	{
		return gulp
			.src(dependenciesPath + "/css-reset/reset.min.css")
			.pipe(minifyPipeline.minifyCSS({
				addSourceMaps: false,
				concat: true,
				concatFilename: "vendor.min.css"
			}))
			.pipe(gulp.dest(distCssPath));
	});

	/*
	 * Gulp Watch
	 */
	gulp.task("watch", function()
	{
		gulp.watch(sourceJsPath + "/*.js", ["lint:app", "concat:app"]);
		gulp.watch(sourceCssPath + "/**/*.scss", ["sass:app"]);
	});

	/*
	 * Default task
	 */
	gulp.task("vendor", ["concat-css:vendor", "concat:vendor", "concat:vendor:min"]);
	gulp.task("app", ["lint:app", "less:app", "concat:app", "concat:app:min"]);
	gulp.task("default", ["vendor", "app"]);
})();