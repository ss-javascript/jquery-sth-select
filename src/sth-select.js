"use strict";

/*
 * Dependencies
 */
const $ = require("jquery");

/*
 * Constructor
 */
(function(){

	$.fn.SthSelect = function SthSelect(options){

		(function initialize(options){
			
			options = buildDefault(options);
			let $this = $(this);
			let $popup = createPopup();
			
		})(options);

		function buildDefault(options){
			return $.extend({
				title: "Select an option"
			}, options);
		}

		function createPopup()
		{
			let $mainSection = $('<section class="sth-select-popup"></section>');
			let $title = $('<h3 class="sth-select-title"></h3>');
			let $content = $('<div class="sth-select-content"></div>')
			
		}
	};

})();

/*
 * Load all elements which use the component by HTML attributes API
 */
(function loadFromHtmlAPI(){

	let $elements = $("select[sth-select]");
	
	$elements.each(function(){
		let $element = $(this);
		let title = $element.attr("sth-select-title");

		$element.SthSelect({
			title: title
		});
	});

})();