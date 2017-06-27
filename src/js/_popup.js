"use strict";

(function(){
	
	function SthSelectPopup(){

		var _$popup = null;
		var _$title = null;
		var _$content = null;

		/**
		 * Constructor.
		 * Creates the popup section element in the DOM.
		 * 
		 * The section is created only once. Several calls 
		 * does not have effect.
		 */
		(function create(){

			if(isAlreadyInDOM()){
				_$popup = $(".sth-select-popup");
				_$title = $(".sth-select-title");
				_$content = $(".sth-select-content");
				return;
			}

			_$popup = $('<section class="sth-select-popup"></section>');
			_$title = $('<div class="sth-select-title"></div>');
			_$content = $('<div class="sth-select-content"></div>');
			
			_$popup
				.append(_$title)
				.append(_$content)
				.appendTo( $("body") );
		})();

		/**
		 * Checks if the popup is already inserted in DOM.
		 * It prevents many insertions and performance loss.
		 */
		function isAlreadyInDOM(){
			let $alreadyExistent = $(".sth-select-popup");
			return ( $alreadyExistent && $alreadyExistent.length > 0 );
		}

		/**
		 * Shows the popup on the screen.
		 */
		function show(){
			_$popup.animate({height: 500}, 500);
		}

		/**
		 * Hides the popup on the screen.
		 */
		function hide(){
			_$popup.animate({height: 0}, 500);
		}

		/**
		 * Adds an item to the item list.
		 */
		function addItem(){}

		return {
			show: show,
			hide: hide,
			addItem: addItem
		};
	}

	window.SthSelect = window.SthSelect || {};
	window.SthSelect.SthSelectPopup = SthSelectPopup;
})();