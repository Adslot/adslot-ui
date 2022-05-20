import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var CountBadge = function CountBadge(_ref) {
  var value = _ref.value,
      status = _ref.status,
      dts = _ref.dts;
  var fontSize = value > 99 ? 'small' : 'normal';
  var classNames = "count-badge status-".concat(status, " count-badge-font-size-").concat(fontSize);
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