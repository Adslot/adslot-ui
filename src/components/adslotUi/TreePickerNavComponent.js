import React from 'react';
import { Breadcrumb, Search } from 'alexandria-adslot';

require('styles/adslotUi/TreePickerNav.scss');

const TreePickerNavComponent = ({ breadcrumbNodes, breadcrumbOnClick, searchOnQuery }) => (
  <div className="treepickernav-component">
    <Search onQuery={searchOnQuery} throttleTime={300} />
    <Breadcrumb nodes={breadcrumbNodes} onClick={breadcrumbOnClick}/>
  </div>
);

TreePickerNavComponent.displayName = 'AdslotUiTreePickerNavComponent';

export default TreePickerNavComponent;
