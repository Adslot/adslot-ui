// TODO: Move to Alexandria.

import React, { PropTypes } from 'react';
import classNames from 'classnames';

require('styles/adslotUi/SplitPane.scss');

const SplitPaneComponent = ({ children, dts, additionalClassNames }) => {
  const splitPaneClass = classNames('splitpane-component', ...additionalClassNames);

  return (
    <div className={splitPaneClass} if dts data-test-selector={dts}>
      {children}
    </div>
  );
};

SplitPaneComponent.displayName = 'AdslotUiSplitPaneComponent';
SplitPaneComponent.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  dts: PropTypes.string,
};
SplitPaneComponent.defaultProps = {
  additionalClassNames: [],
};
export default SplitPaneComponent;
