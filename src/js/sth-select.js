"use strict";

/*
 * Dependencies
 */
const $ = window.jQuery;

/*
 * Elements
 */
/*
const Popup = require("./popup.js");
const Item = require("./item.js");
const FakeSelect = require("./fake-select.js");
*/

/*
 * Constructor
 */
(function(){

	$.fn.SthSelect = function SthSelect(properties){

		var _$originalSelect = null;
		var _$popup = null;
		var _$fakeSelect = null;
		var _$overlay = null;
		var _properties = {};
		var _values = [];

		(function initialize($this){
			_$originalSelect = $this;
			_properties = buildDefault(properties);
			_values = extractValues($this);
			_$overlay = createOverlay();
			_$popup = createPopup(_values, properties);
			_$fakeSelect = fudgeSelect($this, properties);

			_$fakeSelect.click(function(){
				deleteOldOptionsList();
				createOptionsList(_$popup, _values);
				showPopup();
			});

		})( $(this) );

		function buildDefault(properties){
			return $.extend({
				title: "Select an option",
				placeholder: "Choose an option",
				autoSize: false
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
			let $alreadyExistent = $(".sth-select-popup");
			if( $alreadyExistent && $alreadyExistent.length > 0 )
				return;

			let $mainSection = $('<section class="sth-select-popup"></section>');
			let $title = $('<div class="sth-select-title">' + properties.title + '</div>');
			let $content = $('<div class="sth-select-content"></div>');
			
			$mainSection
				.append($title)
				.append($content)
				.appendTo( $("body") );

			return $mainSection;
		}

		function createOverlay(){
			let $alreadyExistent = $(".sth-overlay");
			if( $alreadyExistent && $alreadyExistent.length > 0 )
				return;

			let $overlay = $('<section class="sth-overlay"></section>');
			$overlay.appendTo( $("body") );

			return $overlay;
		}

		function fudgeSelect($select, properties){
			$select.hide();

			let $fakeSelect = $('<div class="sth-select"></div>');
			let $fakeSelectText = $('<span class="sth-select-text"></span>');
			let $fakeSelectArrow = $('<span class="sth-select-arrow"></span>');

			$fakeSelectText.text(properties.placeholder);
			$fakeSelect.append( $fakeSelectText );
			$fakeSelect.append( $fakeSelectArrow );

			if( ! properties.autoSize )
				$fakeSelect.addClass("fixed-width");
			
			$select.after($fakeSelect);

			return $fakeSelect;
		}

		function deleteOldOptionsList(){
			let $content = _$popup.find(".sth-select-content");
			$content.empty();
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
					hidePopup();
				});
			});

			$content.append($options);
		}

		function selectItem(selectedValue){
			let value = selectedValue.value;
			_$originalSelect.val(value);

			let text = selectedValue.text;
			_$fakeSelect.find(".sth-select-text").text(text);
		}

		function hidePopup(){
			_$overlay.fadeOut(500);
			_$popup.animate({height: 0}, 500);
		}

		function showPopup(){
			_$overlay.fadeIn(500);
			_$popup.animate({height: "500px"}, 500);
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
		let autoSize = $element.attr("sth-select-autosize");

		$element.SthSelect({
			title: title,
			placeholder: placeholder,
			autoSize: boolFromString(autoSize)
		});
	});

	function boolFromString(string){
		return (string == "true");
	}

})();