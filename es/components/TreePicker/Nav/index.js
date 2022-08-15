import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../Search';
import Breadcrumb from '../../Breadcrumb';
import { TreePickerPropTypesBreadCrumbNode } from '../../../prop-types/TreePickerPropTypes';

const TreePickerNav = _ref => {
  let {
    breadcrumbRootNode,
    breadcrumbNodes,
    breadcrumbOnClick,
    debounceInterval,
    disabled,
    isLoading,
    onClear,
    onChange,
    onSearch,
    searchOnEnter,
    searchPlaceholder,
    searchValue,
    showSearch,
    svgSymbolCancel,
    svgSymbolSearch
  } = _ref;
  const icons = {};
  if (svgSymbolSearch) icons.search = svgSymbolSearch;
  if (svgSymbolCancel) icons.close = svgSymbolCancel;
  const breadcrumbProps = {
    disabled,
    nodes: breadcrumbNodes,
    onClick: breadcrumbOnClick,
    rootNode: breadcrumbRootNode
  };
  const className = classnames('treepickernav-component', {
    disabled
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