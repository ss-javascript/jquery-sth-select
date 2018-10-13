"use strict";

/**
 * SthOverlay should be an external component. Many components 
 * created by us uses a type of overlay, and it should be added 
 * to the DOM only once.
 */
(function(){
	
	function SthOverlay(){

		var _$overlay = null;
		const FADE_ANIMATION_TIME = 500;

		/**
		 * Constructor.
		 * 
		 * Creates the overlay only once.
		 */
		(function create(){
			
			if( _isAlreadyCreated() ){
				_$overlay = $(".sth-overlay");
				return;
			}

			_$overlay = $('<div class="sth-overlay"></div>');
			_$overlay.appendTo( $("body") );
		})();

		/**
		 * Checks if overlay is already inserted on the DOM.
		 */
		function _isAlreadyCreated(){
			let alreadyExistent = $(".sth-overlay");
			return ( alreadyExistent && alreadyExistent.length > 0 );
		}

		/**
		 * Shows the overlay.
		 */
		function show(){
			_$overlay.fadeIn(FADE_ANIMATION_TIME);
		}

		/**
		 * Hides the overlay.
		 */
		function hide(){
			_$overlay.fadeOut(FADE_ANIMATION_TIME);
		}

		return { show, hide };
	}

	window.SthOverlay = window.SthOverlay || SthOverlay;
})();