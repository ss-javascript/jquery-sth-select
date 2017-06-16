(function(){
	"use strict";

	/*
	 * Helper 
	 */
	const outputPath = "./dist";
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
		"entry": (sourcePath + "/sth-select.js"),
		"output": {
			"path": path.resolve(__dirname, outputPath),
			"filename": "sth-select.js"
		},

		"module": {
			"rules": []
		},

		"plugins": []
	};

	
	module.exports = webpackConfig;

})();