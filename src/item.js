"use strict";

(function(){

	function Item(){

		/**
		 * Creates an element in the popup.
		 */
		function create(){}

		/**
		 * Sets the item's text.
		 * 
		 * @param {Item} item 
		 */
		function setText(item){}

		/**
		 * Sets the item's value.
		 *
		 * @param {Item} item 
		 */
		function setValue(item){}

		return {
			create: create,
			setText: setText,
			setValue: setValue
		};
	}

	module.exports = Item;

})();