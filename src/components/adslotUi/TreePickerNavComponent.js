import React from 'react';
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
    <Breadcrumb nodes={breadcrumbNodes} onClick={breadcrumbOnClick}/>
  </div>
);

TreePickerNavComponent.displayName = 'AdslotUiTreePickerNavComponent';

export default TreePickerNavComponent;
