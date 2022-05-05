import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var Alert = function Alert(_ref) {
  var type = _ref.type,
      children = _ref.children,
      dts = _ref.dts;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: "alert-component alert-component-".concat(type)
  }, expandDts(dts)), children);
};

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