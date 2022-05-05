"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var Search = /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      debounceInterval = _ref.debounceInterval,
      disabled = _ref.disabled,
      dts = _ref.dts,
      icons = _ref.icons,
      isLoading = _ref.isLoading,
      onBlur = _ref.onBlur,
      onChange = _ref.onChange,
      onClear = _ref.onClear,
      onSearch = _ref.onSearch,
      placeholder = _ref.placeholder,
      searchOnEnter = _ref.searchOnEnter,
      value = _ref.value,
      showSearchButton = _ref.showSearchButton;

  var _React$useState = _react.default.useState(''),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      inputValue = _React$useState2[0],
      setInputValue = _React$useState2[1];

  var onInputChange = function onInputChange(event) {
    var eventValue = _lodash.default.get(event, 'target.value');

    if (onChange) {
      onChange(eventValue);
    } else {
      setInputValue(eventValue);
    }

    if (!searchOnEnter) {
      onInputSearch(eventValue);
    }
  };

  var onInputClear = function onInputClear() {
    var emptyValue = '';

    if (onChange) {
      onChange(emptyValue);
    } else {
      setInputValue('');
    }

    if (!searchOnEnter) onInputSearch(emptyValue);
    if (onClear) onClear(emptyValue);
  };

  var onKeyPress = function onKeyPress(event) {
    if (searchOnEnter && event.key === 'Enter') {
      event.preventDefault();
      onInputSearch(_lodash.default.get(event, 'target.value'));
    }
  };

  var onInputSearch = function onInputSearch(searchValue) {
    var search = debounceInterval ? _lodash.default.debounce(onSearch, debounceInterval) : onSearch;
    search(searchValue);
  };

  var onSearchButtonClick = function onSearchButtonClick(event) {
    event.preventDefault();
    var searchValue = value || inputValue;
    onInputSearch(searchValue);
  };

  var currentInputValue = value || inputValue;
  if (value && !onChange) console.warn('Failed prop type: You have provided a `value` prop to Search Component without an `onChange` handler. This will render a read-only field.');
  var searchIcon = icons.search ? icons.search : /*#__PURE__*/_react.default.createElement("div", {
    className: "search-icon"
  });
  var closeIcon = icons.close ? icons.close : /*#__PURE__*/_react.default.createElement("div", {
    className: "cancel-icon"
  });
  var loaderIcon = icons.loader ? icons.loader : /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    size: "small"
  });

  var isValueEmpty = _lodash.default.isEmpty(value) && _lodash.default.isEmpty(inputValue);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--search-component', className),
    "data-test-selector": dts
  }, /*#__PURE__*/_react.default.createElement("input", {
    ref: ref,
    autoComplete: "off",
    className: "aui--search-component-input",
    disabled: disabled,
    name: "search",
    onChange: onInputChange,
    onKeyPress: onKeyPress,
    placeholder: placeholder,
    type: "search",
    value: currentInputValue,
    onBlur: onBlur
  }), isLoading && !searchOnEnter && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui--search-component-spinner"
  }, loaderIcon), searchOnEnter && showSearchButton ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, !isValueEmpty && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui--search-component-icon with-button",
    onClick: onInputClear
  }, closeIcon), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "aui--button aui--search-component-button",
    onClick: onSearchButtonClick
  }, isLoading ? /*#__PURE__*/_react.default.createElement("span", null, loaderIcon) : /*#__PURE__*/_react.default.createElement("span", null, searchIcon))) : /*#__PURE__*/_react.default.createElement("span", Object.assign({
    className: "aui--search-component-icon"
  }, isValueEmpty ? {} : {
    onClick: onInputClear
  }), isValueEmpty ? searchIcon : closeIcon));
});

Search.propTypes = {
  className: _propTypes.default.string,

  /**
   * 	Milliseconds
   */
  debounceInterval: _propTypes.default.number,

  /**
   * 	Determine whether the text area is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * 	Render `data-test-selector` onto the component. It can be useful for testing
   */
  dts: _propTypes.default.string,

  /**
   * 	{ search: React.Node, loader: React.Node, close: React.Node }
   */
  icons: _propTypes.default.shape({
    search: _propTypes.default.node,
    loader: _propTypes.default.node,
    close: _propTypes.default.node
  }),
  isLoading: _propTypes.default.bool,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onClear: _propTypes.default.func,

  /**
   * 	Required
   */
  onSearch: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string,

  /**
   * 	Determines whether onSearch() will be fired on ENTER key press (Default behaviour is to fire onSearch() when the input changes)
   */
  searchOnEnter: _propTypes.default.bool,
  value: _propTypes.default.string,

  /**
   * 	Determines whether displaying the search button or not
   */
  showSearchButton: _propTypes.default.bool
};
Search.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  placeholder: '',
  value: '',
  icons: {},
  showSearchButton: true
};
var _default = Search;
exports.default = _default;