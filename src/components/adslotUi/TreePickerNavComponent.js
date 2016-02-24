import React, { PropTypes } from 'react';
import { Breadcrumb, Search } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerNav.scss');

const TreePickerNavComponent = ({
  breadcrumbNodes,
  breadcrumbOnClick,
  searchOnChange,
  searchOnClear,
  searchValue,
}) => (
  <div className="treepickernav-component">
    <Search
      onChange={searchOnChange}
      onClear={searchOnClear}
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
};

export default TreePickerNavComponent;
