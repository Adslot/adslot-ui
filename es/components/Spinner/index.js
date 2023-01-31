import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
const Spinner = _ref => {
  let {
    className,
    size
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(['spinner-component', className])
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames(['spinner', `spinner-${size}`])
  }));
};
Spinner.propTypes = {
  className: PropTypes.string,
  /**
   * Size of the spinner should be one of: 'large' (40x40px), 'medium' (30x30px), 'small' (16x16px)
   */
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
Spinner.defaultProps = {
  size: 'large'
};
export default Spinner;