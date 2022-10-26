import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

const CountBadge = _ref => {
  let {
    value,
    status,
    dts
  } = _ref;
  const fontSize = value > 99 ? 'small' : 'normal';
  const classNames = `count-badge status-${status} count-badge-font-size-${fontSize}`;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classNames
  }, expandDts(dts)), value);
};

CountBadge.propTypes = {
  /**
   * determines the number that is rendered inside the counter badge
   */
  value: PropTypes.number.isRequired,

  /**
   * determines the appearance of the counter badge: oneOf(['info', 'warning', 'danger', 'light'])
   */
  status: PropTypes.string,

  /**
   * data-test-selector for the counter badge component
   */
  dts: PropTypes.string
};
CountBadge.defaultProps = {
  status: 'default'
};
export default CountBadge;