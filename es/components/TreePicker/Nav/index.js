import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../Search';
import Breadcrumb from '../../Breadcrumb';
import { TreePickerPropTypesBreadCrumbNode } from '../../../prop-types/TreePickerPropTypes';

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
  var className = classnames('treepickernav-component', {
    disabled: disabled
  });
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    "data-test-selector": "treepicker-nav-search"
  }, showSearch && /*#__PURE__*/React.createElement(Search, {
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
  }), /*#__PURE__*/React.createElement(Breadcrumb, breadcrumbProps));
};

TreePickerNav.propTypes = {
  breadcrumbRootNode: TreePickerPropTypesBreadCrumbNode,
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypesBreadCrumbNode),
  breadcrumbOnClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  debounceInterval: PropTypes.number,
  searchOnEnter: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  showSearch: PropTypes.bool,
  svgSymbolCancel: PropTypes.node,
  svgSymbolSearch: PropTypes.node
};
TreePickerNav.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  searchPlaceholder: '',
  showSearch: true,
  onSearch: _.noop
};
export default TreePickerNav;