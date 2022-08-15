"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Search = _interopRequireDefault(require("../Search"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _CheckboxGroup = _interopRequireDefault(require("../CheckboxGroup"));

const SearchableCheckList = _ref => {
  let {
    context,
    items,
    selectedItemsKeys,
    displayCount,
    hideTitle,
    placeholder,
    onChange,
    onSearch,
    searchOnEnter,
    onClear,
    showSearchButton,
    footerText
  } = _ref;

  const [searchText, setSearchText] = _react.default.useState('');

  const eligibleItems = searchText ? (0, _lodash.default)(items).map(item => {
    return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ? item : null;
  }).compact().value() : items; // Select the checked items first

  let itemsToRender = (0, _lodash.default)(eligibleItems).filter(_ref2 => {
    let {
      value
    } = _ref2;
    return _lodash.default.includes(selectedItemsKeys, value);
  }).slice(0, displayCount).value(); // Fill the rest of the items to display with un-selected items

  if (itemsToRender.length < displayCount) {
    const unSelectedItemsKeys = _lodash.default.difference(_lodash.default.map(eligibleItems, 'value'), selectedItemsKeys);

    const unSelectedItems = _lodash.default.filter(eligibleItems, _ref3 => {
      let {
        value
      } = _ref3;
      return _lodash.default.includes(unSelectedItemsKeys, value);
    });

    itemsToRender = _lodash.default.union(itemsToRender, _lodash.default.slice(unSelectedItems, 0, displayCount - itemsToRender.length));
  }

  const mainCheckBoxState = selectedItemsKeys.length === 0 ? false : selectedItemsKeys.length === items.length ? true : 'partial';
  const {
    singularLabel,
    pluralLabel
  } = context;
  const remainingItemsCount = items.length - itemsToRender.length;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--searchable-checklist"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--searchable-list-container"
  }, !hideTitle && /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, pluralLabel), /*#__PURE__*/_react.default.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/_react.default.createElement(_Search.default, {
    showSearchButton: showSearchButton,
    searchOnEnter: searchOnEnter,
    onClear: onClear,
    onSearch: value => {
      if (_lodash.default.isNil(onSearch)) {
        setSearchText(value);
      } else {
        onSearch(value);
      }
    },
    placeholder: placeholder
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "main-checkbox"
  }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    checked: mainCheckBoxState,
    value: `all-${pluralLabel}`,
    label: `All ${pluralLabel}`,
    onChange: nextState => {
      onChange(nextState ? _lodash.default.map(items, 'value') : []);
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "items-container"
  }, /*#__PURE__*/_react.default.createElement(_CheckboxGroup.default, {
    name: `${pluralLabel}-group`,
    value: selectedItemsKeys,
    onChange: newSelectionList => {
      onChange(newSelectionList);
    }
  }, _lodash.default.map(itemsToRender, _ref4 => {
    let {
      value,
      label
    } = _ref4;
    return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: `${value}-key`,
      label: label,
      value: value,
      dts: `${value}-dts`
    });
  }))), (!_lodash.default.isEmpty(footerText) || remainingItemsCount > 0) && /*#__PURE__*/_react.default.createElement("div", {
    className: "footer"
  }, !_lodash.default.isEmpty(footerText) ? footerText : `${remainingItemsCount.toLocaleString()} more ${_lodash.default.toLower(remainingItemsCount > 1 ? pluralLabel : singularLabel)}`)));
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

  /**
   * 	Hides the title
   */
  hideTitle: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,

  /**
   * 	Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
   */
  searchOnEnter: _propTypes.default.bool,
  onSearch: _propTypes.default.func,
  onClear: _propTypes.default.func,
  showSearchButton: _propTypes.default.bool,
  footerText: _propTypes.default.string
};
SearchableCheckList.defaultProps = {
  selectedItemsKeys: [],
  displayCount: 6,
  hideTitle: false,
  placeholder: 'Search',
  searchOnEnter: false,
  onClear: _lodash.default.noOp,
  showSearchButton: true
};
var _default = SearchableCheckList;
exports.default = _default;