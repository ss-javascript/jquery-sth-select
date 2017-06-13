(function(){
	"use strict";

	/*
	 * Helper 
	 */
	const outputPath = "./bin";
	const sourcePath = "./src";

	/*
	 * Dependencies
	 */
	const path = require("path");
	const webpack = require("webpack");

	/*
	 * Configuration
	 */
	let webpackConfig = {
		"entry": (sourcePath + "/app.js"),
		"output": {
			"path": path.resolve(__dirname, outputPath),
			"filename": "app.bundle.js"
		},

		"module": {
			"rules": [
				{ "test": /\.txt$/, "use": "raw-loader" }
			]
		},

		"plugins": [
			new webpack.optimize.UglifyJsPlugin()
		]
	};

	
	module.exports = webpackConfig;

})();