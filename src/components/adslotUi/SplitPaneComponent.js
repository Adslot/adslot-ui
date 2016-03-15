// TODO: Move to Alexandria.

import React, { PropTypes } from 'react';

require('styles/adslotUi/SplitPane.scss');

const SplitPaneComponent = ({ children, dts }) => (
  <div className="splitpane-component" if dts data-test-selector={dts}>
    {children}
  </div>
);

SplitPaneComponent.displayName = 'AdslotUiSplitPaneComponent';
SplitPaneComponent.propTypes = {
  children: PropTypes.node,
  dts: PropTypes.string,
};
export default SplitPaneComponent;
