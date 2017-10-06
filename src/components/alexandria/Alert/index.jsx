import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { expandDts } from 'lib/utils';
import './styles.scss';

class Alert extends PureComponent {
  render = () => (
    <div className={`alert-component alert-component-${this.props.type}`} {...expandDts(this.props.dts)}>
      {this.props.children}
    </div>
  );
}

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
