import React, { PropTypes } from 'react';
import { Breadcrumb, Search, SvgSymbol } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerNav.scss');

const TreePickerNavComponent = ({
  breadcrumbNodes,
  breadcrumbOnClick,
  searchOnChange,
  searchOnClear,
  searchValue,
  svgSymbolCancel,
  svgSymbolSearch,
}) => (
  <div className="treepickernav-component">
    <Search
      onChange={searchOnChange}
      onClear={searchOnClear}
      svgSymbolCancel={svgSymbolCancel}
      svgSymbolSearch={svgSymbolSearch}
      value={searchValue}
    />
    <Breadcrumb nodes={breadcrumbNodes} onClick={breadcrumbOnClick} />
  </div>
);

TreePickerNavComponent.displayName = 'AdslotUiTreePickerNavComponent';
TreePickerNavComponent.propTypes = {
  breadcrumbNodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  breadcrumbOnClick: PropTypes.func,
  searchOnChange: PropTypes.func,
  searchOnClear: PropTypes.func,
  searchValue: PropTypes.string,
  svgSymbolCancel: PropTypes.shape(SvgSymbol.propTypes),
  svgSymbolSearch: PropTypes.shape(SvgSymbol.propTypes),
};

export default TreePickerNavComponent;
