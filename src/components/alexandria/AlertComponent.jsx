import React, { PropTypes } from 'react';
import expandDts from '../../helpers/expandDtsHelper';

require('styles/alexandria/Alert.scss');

const AlertComponent = ({ type, children, dts }) => (
  <div className={`alert-component alert-component-${type}`} {...expandDts(dts)}>
    {children}
  </div>
);

AlertComponent.displayName = 'AlexandriaAlertComponent';

AlertComponent.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  children: PropTypes.node.isRequired,
  dts: PropTypes.string,
};

AlertComponent.defaultProps = {
  type: 'info',
};

export default AlertComponent;
