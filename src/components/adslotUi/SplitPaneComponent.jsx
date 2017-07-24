// TODO: Move to Alexandria.
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/adslotUi/SplitPane.scss');

const SplitPaneComponent = ({ children, dts, additionalClassNames }) => {
  const splitPaneClass = classNames('splitpane-component', ...additionalClassNames);

  return (
    <div className={splitPaneClass} {...expandDts(dts)}>
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
