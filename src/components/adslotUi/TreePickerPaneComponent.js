import React, { PropTypes } from 'react';

require('styles/adslotUi/TreePickerPane.scss');

const TreePickerPaneComponent = ({ children }) => (
  <div className="treepickerpane-component">
    {children}
  </div>
);

TreePickerPaneComponent.displayName = 'AdslotUiTreePickerPaneComponent';
TreePickerPaneComponent.propTypes = {
  children: PropTypes.node,
};
export default TreePickerPaneComponent;
