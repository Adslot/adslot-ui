import React from 'react';
import PropTypes from 'prop-types';
import Search from 'adslot-ui/Search';
import Breadcrumb from 'alexandria/Breadcrumb';
import SvgSymbol from 'alexandria/SvgSymbol';
import TreePickerPropTypes from '../../../prop-types/TreePickerPropTypes';

require('./styles.scss');

const TreePickerNavComponent = ({
  breadcrumbNodes,
  breadcrumbOnClick,
  debounceInterval,
  disabled,
  isLoading,
  onClear,
  onChange,
  onSearch,
  searchOnChange,
  searchOnEnterKey,
  searchValue,
  svgSymbolCancel,
  svgSymbolSearch,
}) => (
  <div className={`treepickernav-component ${disabled ? 'disabled' : ''}`} data-test-selector="treepicker-nav-search">
    <Search
      disabled={disabled}
      debounceInterval={debounceInterval}
      isLoading={isLoading}
      onClear={onClear}
      onChange={onChange}
      onSearch={onSearch}
      searchOnChange={searchOnChange}
      searchOnEnterKey={searchOnEnterKey}
      svgSymbolCancel={svgSymbolCancel}
      svgSymbolSearch={svgSymbolSearch}
      value={searchValue}
    />
    <Breadcrumb disabled={disabled} nodes={breadcrumbNodes} onClick={breadcrumbOnClick} />
  </div>
);

TreePickerNavComponent.displayName = 'AdslotUiTreePickerNavComponent';
TreePickerNavComponent.propTypes = {
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode),
  breadcrumbOnClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
  debounceInterval: PropTypes.number,
  searchOnChange: PropTypes.bool,
  searchOnEnterKey: PropTypes.bool,
  searchValue: PropTypes.string,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
};

TreePickerNavComponent.defaultProps = {
  debounceInterval: 0,
  disabled: false,
  isLoading: false,
  searchOnChange: true,
  searchOnEnterKey: false,
};

export default TreePickerNavComponent;
