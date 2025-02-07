import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
import './styles.css';

const Alert = ({ type = 'info', children, dts }) => (
  <div data-testid="alert-wrapper" className={`alert-component alert-component-${type}`} {...expandDts(dts)}>
    {children}
  </div>
);

Alert.propTypes = {
  /**
   * ['success', 'info', 'warning', 'danger']
   */
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  children: PropTypes.node.isRequired,
  dts: PropTypes.string,
};

export default Alert;
