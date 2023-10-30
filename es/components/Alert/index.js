import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
const Alert = ({
  type,
  children,
  dts
}) => /*#__PURE__*/React.createElement("div", Object.assign({
  className: `alert-component alert-component-${type}`
}, expandDts(dts)), children);
Alert.propTypes = {
  /**
   * ['success', 'info', 'warning', 'danger']
   */
  type: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  children: PropTypes.node.isRequired,
  dts: PropTypes.string
};
Alert.defaultProps = {
  type: 'info'
};
export default Alert;