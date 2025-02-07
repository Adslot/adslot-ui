import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../Search';
import Breadcrumb from '../../Breadcrumb';
import { TreePickerPropTypesBreadCrumbNode } from '../../../prop-types/TreePickerPropTypes';
import './styles.css';

const TreePickerNav = ({
  breadcrumbRootNode,
  breadcrumbNodes,
  breadcrumbOnClick,
  debounceInterval = 0,
  disabled = false,
  isLoading = false,
  onClear,
  onChange,
  onSearch = _.noop,
  searchOnEnter = false,
  searchPlaceholder = '',
  searchValue,
  showSearch = true,
  svgSymbolCancel,
  svgSymbolSearch,
}) => {
  const icons = {};
  if (svgSymbolSearch) icons.search = svgSymbolSearch;
  if (svgSymbolCancel) icons.close = svgSymbolCancel;

  const breadcrumbProps = {
    disabled,
    nodes: breadcrumbNodes,
    onClick: breadcrumbOnClick,
    rootNode: breadcrumbRootNode,
  };
  const className = classnames('treepickernav-component', { disabled });

  return (
    <div className={className} data-test-selector="treepicker-nav-search" data-testid="treepicker-nav-wrapper">
      {showSearch && (
        <Search
          disabled={disabled}
          debounceInterval={debounceInterval}
          isLoading={isLoading}
          onClear={onClear}
          onChange={onChange}
          onSearch={onSearch}
          searchOnEnter={searchOnEnter}
          icons={icons}
          value={searchValue}
          placeholder={searchPlaceholder || 'Search'}
        />
      )}
      <Breadcrumb {...breadcrumbProps} />
    </div>
  );
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
  svgSymbolSearch: PropTypes.node,
};

export default TreePickerNav;
