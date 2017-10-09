"use strict";

/**
 * SthOverlay should be an external component. Many components 
 * created by us uses a type of overlay, and it should be added 
 * to the DOM only once.
 */

(function () {

	function SthOverlay() {

		var _$overlay = null;

		/**
   * Constructor.
   * 
   * Creates the overlay only once.
   */
		(function create() {

			if (_isAlreadyCreated()) {
				_$overlay = $(".sth-overlay");
				return;
			}

			_$overlay = $('<div class="sth-overlay"></div>');
			_$overlay.appendTo($("body"));
		})();

		/**
   * Checks if overlay is already inserted on the DOM.
   */
		function _isAlreadyCreated() {
			var alreadyExistent = $(".sth-overlay");
			return alreadyExistent && alreadyExistent.length > 0;
		}

		/**
   * Shows the overlay.
   */
		function show() {
			_$overlay.fadeIn(500);
		}

		/**
   * Hides the overlay.
   */
		function hide() {
			_$overlay.fadeOut(500);
		}

		return {
			show: show,
			hide: hide
		};
	}

	window.SthOverlay = window.SthOverlay || SthOverlay;
})();
"use strict";

(function () {

	function SthSelectPopup(properties) {

		var self = this;
		var _$popup = null;
		var _$title = null;
		var _$titleText = null;
		var _$titleClose = null;
		var _$content = null;
		var _$filter = null;
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
		(function create() {
			var isInDOM = isAlreadyInDOM();
			if (isInDOM) {
				_$popup = $(".sth-select-popup");
				_$title = $(".sth-select-title");
				_$titleText = $(".sth-select-title-text");
				_$titleClose = $(".sth-select-title-close");
				_$content = $(".sth-select-content");
				_$filter = $(".sth-select-filter");
				_$overlay = $(".sth-overlay");
			} else {
				_$popup = $('<section class="sth-select-popup"></section>');
				_$title = $('<div class="sth-select-title"></div>');
				_$titleText = $('<span class="sth-select-title-text"></span>');
				_$titleClose = $('<span class="sth-select-title-close">X</span>');
				_$content = $('<div class="sth-select-content"></div>');
				_$filter = $('<input class="sth-select-filter"/>');
				_$overlay = new window.SthOverlay();

				_$title.append(_$titleText).append(_$titleClose);

				_$popup.append(_$title).append(_$filter).append(_$content).appendTo($("body"));
			}

			if (isInDOM) {
				_$titleClose.click(function (e) {
					hide(e);
				});
			}

			_$filter.keydown(function (e) {
				setTimeout(function (_) {
					_renderList(_properties.caseSensitive);
				}, 0);
			});

			_items = properties.items;
			_filteredItems = _items;
			_qntityOfItems = _items.length;
		})();

		/**
   * Checks if the popup is already inserted in DOM.
   * It prevents many insertions and performance loss.
   */
		function isAlreadyInDOM() {
			var $alreadyExistent = $(".sth-select-popup");
			return $alreadyExistent && $alreadyExistent.length > 0;
		}

		/**
   * Shows the popup on the screen.
   */
		function show(e) {
			_$overlay.show();
			_properties.onOpen(e);

			if (!_properties.hasFilter) _$filter.val("");

			_$titleText.text(_properties.title);
			_controlFilterVisibility();
			_renderList(_properties.caseSensitive);

			var height = _calculatePopupHeight();
			_$popup.animate({ height: height }, 500);
		}

		/**
   * Calculates pop-up's height based on
   * number of added items.
   */
		function _calculatePopupHeight() {
			var singleItemHeight = _$content.find(".sth-select-item").first().outerHeight();

			var qntityOfItems = _qntityOfItems;
			var allItemsHeight = singleItemHeight * qntityOfItems;
			var titleHeight = _$title.outerHeight();

			var contentHeight = allItemsHeight + titleHeight;
			return contentHeight < MAX_HEIGHT ? contentHeight : MAX_HEIGHT;
		}

		/**
   * Hides the popup on the screen.
   */
		function hide(e) {
			_$overlay.hide();
			_properties.onHide(e);
			_$popup.animate({ height: 0 }, 500);
		}

		/**
   * Add an item.
   */
		function _addItem(item, autoRender) {
			autoRender = autoRender || true;

			var text = item.text;
			var $listItem = $('<div class="sth-select-item">' + text + '</div>');
			$listItem.data('item', item);

			if (autoRender) _$content.append($listItem);

			return $listItem;
		}

		/**
   * Renders all elements in the list of options.
   */
		function _renderList(caseSensitive) {
			_clear();

			var rerenderOnEachItem = false;
			var $listItems = $([]);
			var textFilter = _formatText(caseSensitive, _$filter.val());

			_items.forEach(function (item) {
				var text = _formatText(caseSensitive, item.text);
				if (text.indexOf(textFilter) != -1) {
					var $listItem = _addItem(item, rerenderOnEachItem);
					$listItems = $listItems.add($listItem);
				}
			});

			_$content.append($listItems);
			_$content.one('click', function (event) {
				var item = $(event.target).data('item');
				_properties.onSelect(item, event);
				_onSelectCallback(item);
				hide(event);
			});
			var popupHeight = _calculatePopupHeight();
			var titleHeight = _$title.outerHeight();
			_$content.outerHeight(popupHeight - titleHeight);
		}

		/**
   * Clear (removes from DOM) all elements on the list.
   */
		function _clear() {
			_$content.off('click');
			_$content.empty();
		}

		/**
   * Event handler which calls a callback when an item
   * is selected.
   */
		function onSelect(callback) {
			_onSelectCallback = callback;
		}

		/**
   * Sets the filter field visibility based on
   * hasFilter property.
   */
		function _controlFilterVisibility() {
			var visibility = _properties.hasFilter ? "block" : "none";
			_$filter.css("display", visibility);
			_$filter.attr("placeholder", _properties.filterPlaceholder);
		}

		/**
   * Returns text itself if caseSensitive is true
   */
		function _formatText(caseSensitive, text) {
			return caseSensitive ? text : text.toLowerCase();
		}

		/**
   * Public available methods.
   */
		return {
			show: show,
			hide: hide,
			onSelect: onSelect
		};
	}

	window.SthSelect = window.SthSelect || {};
	window.SthSelect.SthSelectPopup = SthSelectPopup;
})();
"use strict";

/*
 * Dependencies
 */

var $ = window.jQuery;

/*
 * Constructor
 */
(function () {

	$.fn.SthSelect = function SthSelect(properties) {

		var _$originalSelect = null;
		var _$popup = null;
		var _$fakeSelect = null;
		var _properties = {};
		var _values = [];

		(function initialize($this) {
			_$originalSelect = $this;
			_properties = buildDefault(properties);
			_values = extractValues($this);
			_$fakeSelect = fudgeSelect($this, properties);

			var popupProperties = {
				items: _values,
				title: _properties.title,
				hasFilter: _properties.filter,
				filterPlaceholder: _properties.filterPlaceholder,
				caseSensitive: _properties.caseSensitive,
				onOpen: _properties.onOpen,
				onSelect: _properties.onSelect,
				onHide: _properties.onHide
			};
			_$popup = new window.SthSelect.SthSelectPopup(popupProperties);

			_$popup.onSelect(applySelectedValue);
			_$fakeSelect.click(openPopup);
		})($(this));

		function buildDefault(properties) {
			return $.extend({
				title: "Select an option",
				placeholder: "Choose an option",
				autoSize: false,
				filter: false,
				filterPlaceholder: "Search",
				caseSensitive: false,
				onOpen: Function.prototype,
				onSelect: Function.prototype,
				onHide: Function.prototype
			}, properties);
		}

		function extractValues($this) {
			var values = [];
			$this.find("option").each(function () {
				var $option = $(this);
				var content = { value: $option.val(), text: $option.text() };
				values.push(content);
			});

			return values;
		}

		function fudgeSelect($select, properties) {
			$select.hide();

			var $fakeSelect = $('<div class="sth-select"></div>');
			var $fakeSelectText = $('<span class="sth-select-text"></span>');
			var $fakeSelectArrow = $('<span class="sth-select-arrow"></span>');

			$fakeSelectText.text(properties.placeholder);
			$fakeSelect.append($fakeSelectText);
			$fakeSelect.append($fakeSelectArrow);

			if (!properties.autoSize) $fakeSelect.addClass("fixed-width");

			$select.after($fakeSelect);

			return $fakeSelect;
		}

		function openPopup(e) {
			_$popup.show(e);
		}

		function applySelectedValue(selectedValue) {
			var value = selectedValue.value;
			_$originalSelect.val(value);

			var text = selectedValue.text;
			_$fakeSelect.find(".sth-select-text").text(text);
		}
	};

	window.SthSelect = window.SthSelect || {};
	window.SthSelect.init = window.SthSelect.init || SthSelect;
})();

/*
 * Load all elements which use the component by HTML attributes API
 */
$(document).ready(function loadFromHtmlAPI() {

	var $elements = $("select[sth-select]");

	$elements.each(function () {
		var $element = $(this);
		var title = $element.attr("sth-select-title");
		var placeholder = $element.attr("sth-select-placeholder");
		var autoSize = $element.attr("sth-select-autosize");
		var filter = $element.attr("sth-select-filter");
		var filterPlaceholder = $element.attr("sth-select-filter-placeholder");
		var caseSensitive = $element.attr("sth-select-case-sensitive");

		$element.SthSelect({
			title: title,
			placeholder: placeholder,
			autoSize: boolFromString(autoSize),
			filter: boolFromString(filter),
			filterPlaceholder: filterPlaceholder,
			caseSensitive: boolFromString(caseSensitive),
			onOpen: function onOpen(e) {
				return console.log('onOpen', e);
			},
			onSelect: function onSelect(item, e) {
				return console.log('onSelect', item, e);
			},
			onHide: function onHide(e) {
				return console.log('onHide', e);
			}
		});
	});

	function boolFromString(string) {
		return string == "true";
	}
});