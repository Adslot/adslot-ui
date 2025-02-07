import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../utils';
import './styles.css';

const SplitPane = ({ children, dts, additionalClassNames = [] }) => {
  const splitPaneClass = classNames('splitpane-component', ...additionalClassNames);

  return (
    <div data-testid="split-panel-wrapper" className={splitPaneClass} {...expandDts(dts)}>
      {children}
    </div>
  );
};

SplitPane.propTypes = {
  additionalClassNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  /**
   * 	render `data-test-selector` onto the component. It can be useful for testing.
   */
  dts: PropTypes.string,
};

export default SplitPane;
