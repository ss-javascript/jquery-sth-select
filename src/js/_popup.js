"use strict";

(function(){
	
	function SthSelectPopup(properties){

		var self = this;
		var _$popup = null;
		var _$title = null;
		var _$content = null;
		var _$overlay = null;
		var _properties = properties;
		var _onSelectCallback = null;
		var _qntityOfItems = 0;
		var _items = [];
		var _filteredItems = [];

		/**
		 * Max of height (in pixels) that the popup can 
		 * assume when open.
		 */
		var MAX_HEIGHT = 500;

		/**
		 * Constructor.
		 * Creates the popup section element in the DOM.
		 * 
		 * The section is created only once. Several calls 
		 * does not have effect.
		 */
		(function create(){

			if( isAlreadyInDOM() ){
				_$popup = $(".sth-select-popup");
				_$title = $(".sth-select-title");
				_$content = $(".sth-select-content");
				_$overlay = $(".sth-overlay");
			} else {
				_$popup = $('<section class="sth-select-popup"></section>');
				_$title = $('<div class="sth-select-title"></div>');
				_$content = $('<div class="sth-select-content"></div>');
				_$overlay = (new window.SthOverlay());
				
				_$popup
					.append(_$title)
					.append(_$content)
					.appendTo( $("body") );
			}

			_items = properties.items;
			_filteredItems = _items;
			_qntityOfItems = _items.length;
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
			_$overlay.show();

			_renderList();

			let height = _calculatePopupHeight();
			_$popup.animate({height: height}, 500);
		}

		/**
		 * Calculates pop-up's height based on 
		 * number of added items.
		 */
		function _calculatePopupHeight(){
			let singleItemHeight = _$content
				.find(".sth-select-item")
				.first()
				.outerHeight();

			let qntityOfItems = _qntityOfItems;
			let allItemsHeight = (singleItemHeight * qntityOfItems);
			let titleHeight = _$title.outerHeight();
			
			let contentHeight = (allItemsHeight + titleHeight);
			return contentHeight < MAX_HEIGHT ? contentHeight : MAX_HEIGHT;
		}

		/**
		 * Hides the popup on the screen.
		 */
		function hide(){
			_$overlay.hide();
			_$popup.animate({height: 0}, 500);
		}

		/**
		 * Add an item.
		 */
		function addItem(item, autoRender){
			autoRender = autoRender || true;

			let text = item.text;
			let $listItem = $('<div class="sth-select-item">' + text + '</div>');

			if( autoRender )
				_$content.append( $listItem );

			return $listItem;
		}

		function _renderList(){
			_clear();

			let rerenderOnEachItem = false;
			let $listItems = [];

			_items.map( item => {
				let $listItem = addItem(item, rerenderOnEachItem);
					$listItem.click(function(){
						_onSelectCallback( item );
						hide();
					});

				$listItems.push( $listItem );
			});

			_$content.append( $listItems );

			let popupHeight = _calculatePopupHeight();
			let titleHeight = _$title.outerHeight();
			_$content.outerHeight( (popupHeight - titleHeight) );
		}

		/**
		 * Clear (removes from DOM) all elements on the list.
		 */
		function _clear(){
			_$content.empty();
		}

		/**
		 * Event handler which calls a callback when an item 
		 * is selected.
		 */
		function onSelect(callback){
			_onSelectCallback = callback;
		}

		/**
		 * Sets the popup's title. 
		 */
		function setTitle(title){
			_$title.text(title);
		}

		/**
		 * Adds a filter field above all items.
		 */
		function addFilter(placeholder){

			if( isFilterAlreadyInDOM() )
				return true;

			var $field = $('<input class="sth-select-filter" />');
				$field.attr("placeholder", placeholder);
				$field.keypress(function(e){
					let currentText = $field.val();
					let typedChar = e.key;

					filter( currentText + typedChar );
				});

			_$title.after($field);
		}

		/**
		 * Checks if filter field is already in DOM, avoiding 
		 * creating it many times.
		 */
		function isFilterAlreadyInDOM(){
			var $filter = $(".sth-select-filter");
			return ( $filter && $filter.length > 0 );
		}

		function filter(text){
			let filtered = _items.map( item => {
				if( item.text.indexOf(text) != -1 )
					return item;
			});

			setItems(filtered, true);
		}

		/**
		 * Public available methods.
		 */
		return {
			show: show,
			hide: hide,
			addItem: addItem,
			onSelect: onSelect,
			setTitle: setTitle,
			addFilter: addFilter
		};
	}

	window.SthSelect = window.SthSelect || {};
	window.SthSelect.SthSelectPopup = SthSelectPopup;
})();