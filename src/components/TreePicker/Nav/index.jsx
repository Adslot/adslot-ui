import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Search from '../../Search';
import Breadcrumb from '../../Breadcrumb';
import TreePickerPropTypes from '../../../prop-types/TreePickerPropTypes';
import './styles.scss';

const TreePickerNavComponent = ({
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

  return (
    <div className={`treepickernav-component ${disabled ? 'disabled' : ''}`} data-test-selector="treepicker-nav-search">
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

TreePickerNavComponent.displayName = 'TreePickerNavComponent';
TreePickerNavComponent.propTypes = {
  breadcrumbRootNode: TreePickerPropTypes.breadCrumbNode,
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode),
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

TreePickerNavComponent.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnEnter: false,
  searchPlaceholder: '',
  showSearch: true,
  onSearch: _.noop,
};

export default TreePickerNavComponent;
