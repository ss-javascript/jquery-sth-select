"use strict";

/*
 * Dependencies
 */
const $ = require("jquery");

/*
 * Constructor
 */
(function(){

	$.fn.SthSelect = function SthSelect(properties){

		(function initialize(properties, $this){
			
			properties = buildDefault(properties);
			let values = extractValues($this);
			let $popup = createPopup(values, properties);
			let $fakeSelect = fudgeSelect($this, properties);

			$fakeSelect.click(function(){
				createOptionsList($popup, values);
				$popup.animate({height: "500px"}, 500);
			});

		})(properties, $(this));

		function buildDefault(properties){
			return $.extend({
				title: "Select an option",
				placeholder: "Choose an option"
			}, properties);
		}

		function extractValues($this){
			let values = [];
			$this.find("option").each(function(){
				let $option = $(this);
				let content = { value: $option.val(), text: $option.text() };
				values.push( content );
			});

			return values;
		}

		function createPopup(values, properties){
			let $mainSection = $('<section class="sth-select-popup"></section>');
			let $title = $('<div class="sth-select-title">' + properties.title + '</div>');
			let $content = $('<div class="sth-select-content"></div>');
			
			$mainSection
				.append($title)
				.append($content)
				.appendTo( $("body") );

			return $mainSection;
		}

		function fudgeSelect($select, properties){
			$select.hide();

			let $fakeSelect = $('<div class="sth-select"></div>');
			$fakeSelect.text(properties.placeholder);
			
			$select.after($fakeSelect);

			return $fakeSelect;
		}

		function createOptionsList($popup, values){
			let $content = $popup.find(".sth-select-content");
			let $options = [];

			$.each(values, function(_, value){
				let text = value.text;
				let $listItem = $('<div class="sth-select-item">' + text + '</div>');
				
				$options.push($listItem);

				$listItem.click(function(){
					selectItem(value);
				});
			});

			$content.append($options);
		}

		function selectItem(selectedValue){
			console.log("value selected.");
			let value = selectedValue.value;
			$this.val(value);
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
		let placeholder = $element.attr("sth-select-placeholder");

		$element.SthSelect({
			title: title,
			placeholder: placeholder
		});
	});

})();