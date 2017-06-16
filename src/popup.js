"use strict";

(function(){
	
	function Popup(){

		/**
		 * Creates the popup section element in the DOM.
		 * 
		 * The section is created only once. Several calls 
		 * does not have effect.
		 */
		function create(){}

		/**
		 * Shows the popup on the screen.
		 */
		function show(){}

		/**
		 * Hides the popup on the screen.
		 */
		function hide(){}

		/**
		 * Adds an item to the item list.
		 */
		function addItem(){}

		return {
			create: create,
			show: show,
			hide: hide,
			addItem: addItem
		};
	}

	module.exports = Popup;

})();