import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Pill from '../Pill';
const styles = ['info', 'success', 'warning', 'error', 'light'];
const sizes = ['large', 'medium', 'small'];
const StatusPill = _ref => {
  let {
    displayStyle,
    status,
    inverse,
    size,
    className,
    dts
  } = _ref;
  return /*#__PURE__*/React.createElement(Pill, {
    className: classnames(['aui--status-pill', `aui--status-pill-${displayStyle}`, {
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
   * one of ["info", "success", "warning", "error", "light"]
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