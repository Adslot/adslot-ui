import React from 'react';

require('styles/adslotUi/TreePickerPane.scss');

const TreePickerPaneComponent = ({ children }) => (
  <div className="treepickerpane-component">
    {children}
  </div>
);

TreePickerPaneComponent.displayName = 'AdslotUiTreePickerPaneComponent';

export default TreePickerPaneComponent;
