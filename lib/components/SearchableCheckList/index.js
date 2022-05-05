"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Search = _interopRequireDefault(require("../Search"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _CheckboxGroup = _interopRequireDefault(require("../CheckboxGroup"));

var SearchableCheckList = function SearchableCheckList(_ref) {
  var context = _ref.context,
      items = _ref.items,
      selectedItemsKeys = _ref.selectedItemsKeys,
      displayCount = _ref.displayCount,
      placeholder = _ref.placeholder,
      _onChange = _ref.onChange;

  var _React$useState = _react.default.useState(''),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      searchText = _React$useState2[0],
      setSearchText = _React$useState2[1];

  var eligibleItems = searchText ? (0, _lodash.default)(items).map(function (item) {
    return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ? item : null;
  }).compact().value() : items; // Select the checked items first

  var itemsToRender = (0, _lodash.default)(eligibleItems).filter(function (_ref2) {
    var value = _ref2.value;
    return _lodash.default.includes(selectedItemsKeys, value);
  }).slice(0, displayCount).value(); // Fill the rest of the items to display with un-selected items

  if (itemsToRender.length < displayCount) {
    var unSelectedItemsKeys = _lodash.default.difference(_lodash.default.map(eligibleItems, 'value'), selectedItemsKeys);

    var unSelectedItems = _lodash.default.filter(eligibleItems, function (_ref3) {
      var value = _ref3.value;
      return _lodash.default.includes(unSelectedItemsKeys, value);
    });

    itemsToRender = _lodash.default.union(itemsToRender, _lodash.default.slice(unSelectedItems, 0, displayCount - itemsToRender.length));
  }

  var mainCheckBoxState = selectedItemsKeys.length === 0 ? false : selectedItemsKeys.length === items.length ? true : 'partial';
  var singularLabel = context.singularLabel,
      pluralLabel = context.pluralLabel;
  var remainingItemsCount = items.length - itemsToRender.length;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--searchable-checklist"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--searchable-list-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, pluralLabel), /*#__PURE__*/_react.default.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/_react.default.createElement(_Search.default, {
    onSearch: function onSearch(value) {
      setSearchText(value);
    },
    placeholder: placeholder
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "main-checkbox"
  }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    checked: mainCheckBoxState,
    value: "all-".concat(pluralLabel),
    label: "All ".concat(pluralLabel),
    onChange: function onChange(nextState) {
      _onChange(nextState ? _lodash.default.map(items, 'value') : []);
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "items-container"
  }, /*#__PURE__*/_react.default.createElement(_CheckboxGroup.default, {
    name: "".concat(pluralLabel, "-group"),
    value: selectedItemsKeys,
    onChange: function onChange(newSelectionList) {
      _onChange(newSelectionList);
    }
  }, _lodash.default.map(itemsToRender, function (_ref4) {
    var value = _ref4.value,
        label = _ref4.label;
    return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: "".concat(value, "-key"),
      label: label,
      value: value,
      dts: "".concat(value, "-dts")
    });
  }))), remainingItemsCount > 0 && /*#__PURE__*/_react.default.createElement("div", {
    className: "footer"
  }, "".concat(remainingItemsCount.toLocaleString(), " more ").concat(_lodash.default.toLower(remainingItemsCount > 1 ? pluralLabel : singularLabel)))));
};

SearchableCheckList.propTypes = {
  /**
   * 	Context of the list displayed: {singularLabel: PropTypes.string, pluralLabel: PropTypes.string}
   */
  context: _propTypes.default.shape({
    singularLabel: _propTypes.default.string.isRequired,
    pluralLabel: _propTypes.default.string.isRequired
  }).isRequired,

  /**
   * 	List of items: { value: PropTypes.string, label: PropTypes.string }
   */
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  })),

  /**
   * 	List of checked items value
   */
  selectedItemsKeys: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * 	Search placeholder
   */
  placeholder: _propTypes.default.string,

  /**
   * 	Number of checkbox items to render
   */
  displayCount: _propTypes.default.number,
  onChange: _propTypes.default.func.isRequired
};
SearchableCheckList.defaultProps = {
  selectedItemsKeys: [],
  displayCount: 6,
  placeholder: 'Search'
};
var _default = SearchableCheckList;
exports.default = _default;