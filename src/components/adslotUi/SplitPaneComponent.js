import React, { PropTypes } from 'react';

require('styles/adslotUi/SplitPane.scss');

const SplitPaneComponent = ({ children }) => (
  <div className="splitpane-component">
    {children}
  </div>
);

SplitPaneComponent.displayName = 'AdslotUiSplitPaneComponent';
SplitPaneComponent.propTypes = {
  children: PropTypes.node,
};
export default SplitPaneComponent;
