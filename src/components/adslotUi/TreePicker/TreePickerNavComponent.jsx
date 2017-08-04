import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from 'components/alexandria/Breadcrumb';
import Search from 'components/alexandria/Search';
import SvgSymbol from 'components/alexandria/SvgSymbol';
import TreePickerPropTypes from 'helpers/propTypes/TreePickerPropTypes';

require('styles/adslotUi/TreePickerNav.scss');

const TreePickerNavComponent = ({
  breadcrumbNodes,
  breadcrumbOnClick,
  disabled,
  searchOnChange,
  searchOnClear,
  searchValue,
  svgSymbolCancel,
  svgSymbolSearch,
}) => (
  <div className={`treepickernav-component ${disabled ? 'disabled' : ''}`} data-test-selector="treepicker-nav-search">
    <Search
      disabled={disabled}
      onChange={searchOnChange}
      onClear={searchOnClear}
      svgSymbolCancel={svgSymbolCancel}
      svgSymbolSearch={svgSymbolSearch}
      value={searchValue}
    />
    <Breadcrumb
      disabled={disabled}
      nodes={breadcrumbNodes}
      onClick={breadcrumbOnClick}
    />
  </div>
);

TreePickerNavComponent.displayName = 'AdslotUiTreePickerNavComponent';
TreePickerNavComponent.propTypes = {
  breadcrumbNodes: PropTypes.arrayOf(TreePickerPropTypes.breadCrumbNode),
  breadcrumbOnClick: PropTypes.func,
  disabled: PropTypes.bool,
  searchOnChange: PropTypes.func,
  searchOnClear: PropTypes.func,
  searchValue: PropTypes.string,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
};

TreePickerNavComponent.defaultProps = {
  disabled: false,
};

export default TreePickerNavComponent;
