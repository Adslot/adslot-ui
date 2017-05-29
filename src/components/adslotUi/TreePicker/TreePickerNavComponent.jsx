import React, { PropTypes } from 'react';
import Breadcrumb from 'components/alexandria/Breadcrumb/component';
import Search from 'components/alexandria/SearchComponent';
import SvgSymbol from 'components/alexandria/SvgSymbolComponent';
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
  <div className="treepickernav-component" data-test-selector="treepicker-nav-search">
    <Search
      disabled={disabled}
      onChange={searchOnChange}
      onClear={searchOnClear}
      svgSymbolCancel={svgSymbolCancel}
      svgSymbolSearch={svgSymbolSearch}
      value={searchValue}
    />
    {!disabled ? <Breadcrumb nodes={breadcrumbNodes} onClick={breadcrumbOnClick} /> : null}
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
