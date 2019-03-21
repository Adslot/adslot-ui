import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';

const Alert = ({ type, children, dts }) => (
  <div className={`alert-component alert-component-${type}`} {...expandDts(dts)}>
    {children}
  </div>
);

Alert.displayName = 'AlexandriaAlertComponent';

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  children: PropTypes.node.isRequired,
  dts: PropTypes.string,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
