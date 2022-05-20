import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Pill from '../Pill';
var styles = ['primary', 'success', 'warning', 'error', 'light'];
var sizes = ['large', 'medium', 'small'];

var StatusPill = function StatusPill(_ref) {
  var displayStyle = _ref.displayStyle,
      status = _ref.status,
      inverse = _ref.inverse,
      size = _ref.size,
      className = _ref.className,
      dts = _ref.dts;
  return /*#__PURE__*/React.createElement(Pill, {
    className: classnames(['aui--status-pill', "aui--status-pill-".concat(displayStyle), {
      'aui--status-pill-inverse': inverse
    }, className]),
    size: size,
    dts: dts
  }, status);
};

StatusPill.defaultProps = {
  displayStyle: styles[0],
  size: sizes[1],
  inverse: false
};
StatusPill.propTypes = {
  /**
   * 	Text inside status pill
   */
  status: PropTypes.node.isRequired,

  /**
   * one of ["primary", "success", "warning", "error", "light"]
   */
  displayStyle: PropTypes.oneOf(styles),

  /**
   * one of ["large",  "medium", "small"]
   */
  size: PropTypes.oneOf(sizes),

  /**
   * Status pill with inverse style
   */
  inverse: PropTypes.bool,

  /**
   * 	Generate "data-test-selector" on the status pill
   */
  dts: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
export default StatusPill;