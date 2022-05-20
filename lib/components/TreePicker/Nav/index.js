"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Search = _interopRequireDefault(require("../../Search"));

var _Breadcrumb = _interopRequireDefault(require("../../Breadcrumb"));

var _TreePickerPropTypes = require("../../../prop-types/TreePickerPropTypes");

var TreePickerNav = function TreePickerNav(_ref) {
  var breadcrumbRootNode = _ref.breadcrumbRootNode,
      breadcrumbNodes = _ref.breadcrumbNodes,
      breadcrumbOnClick = _ref.breadcrumbOnClick,
      debounceInterval = _ref.debounceInterval,
      disabled = _ref.disabled,
      isLoading = _ref.isLoading,
      onClear = _ref.onClear,
      onChange = _ref.onChange,
      onSearch = _ref.onSearch,
      searchOnEnter = _ref.searchOnEnter,
      searchPlaceholder = _ref.searchPlaceholder,
      searchValue = _ref.searchValue,
      showSearch = _ref.showSearch,
      svgSymbolCancel = _ref.svgSymbolCancel,
      svgSymbolSearch = _ref.svgSymbolSearch;
  var icons = {};
  if (svgSymbolSearch) icons.search = svgSymbolSearch;
  if (svgSymbolCancel) icons.close = svgSymbolCancel;
  var breadcrumbProps = {
    disabled: disabled,
    nodes: breadcrumbNodes,
    onClick: breadcrumbOnClick,
    rootNode: breadcrumbRootNode
  };
  var className = (0, _classnames.default)('treepickernav-component', {
    disabled: disabled
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    "data-test-selector": "treepicker-nav-search"
  }, showSearch && /*#__PURE__*/_react.default.createElement(_Search.default, {
    disabled: disabled,
    debounceInterval: debounceInterval,
    isLoading: isLoading,
    onClear: onClear,
    onChange: onChange,
    onSearch: onSearch,
    searchOnEnter: searchOnEnter,
    icons: icons,
    value: searchValue,
    placeholder: searchPlaceholder || 'Search'
  }), /*#__PURE__*/_react.default.createElement(_Breadcrumb.default, breadcrumbProps));
};

TreePickerNav.propTypes = {
  breadcrumbRootNode: _TreePickerPropTypes.TreePickerPropTypesBreadCrumbNode,
  breadcrumbNodes: _propTypes.default.arrayOf(_TreePickerPropTypes.TreePickerPropTypesBreadCrumbNode),
  breadcrumbOnClick: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onClear: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  debounceInterval: _propTypes.default.number,
  searchOnEnter: _propTypes.default.bool,
  searchPlaceholder: _propTypes.default.string,
  searchValue: _propTypes.default.string,
  showSearch: _propTypes.default.bool,
  svgSymbolCancel: _propTypes.default.node,
  svgSymbolSearch: _propTypes.default.node
};
TreePickerNav.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  searchPlaceholder: '',
  showSearch: true,
  onSearch: _lodash.default.noop
};
var _default = TreePickerNav;
exports.default = _default;