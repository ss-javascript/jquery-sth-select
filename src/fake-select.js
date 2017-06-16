"use strict";

(function(){

	function FakeSelect($select){

		var self = this;
		this.$select = null;
		this.$fakeSelect = null;

		(function _constructor(){
			
			if( ! $select )
				throw new Error("Invalid select element.");

			self.$select = $select;

			hideOriginalSelect();

			self.$fakeSelect = createFakeSelect();
		})();

		/**
		 * Hides the original select element.
		 */
		function hideOriginalSelect(){
			self.$select.hide();
		}
	
		/**
		 * Creates a fake select element which overlays 
		 * the original one.
		 */
		function createFakeSelect(){
			let $fakeSelect = $('<div class="sth-select"></div>');
			self.$select.after($fakeSelect);

			return $fakeSelect;
		}
	}

})();