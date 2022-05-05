import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

var Arc = function Arc(_ref) {
  var data = _ref.data;

  if (!data) {
    return /*#__PURE__*/React.createElement("path", {
      className: "arc-component"
    });
  }

  var dataString = "M0,0 L".concat(data.x1, ",").concat(data.y1, " A0.5,0.5 0 ").concat(data.largeArcFlag, ",1 ").concat(data.x2, ",").concat(data.y2, " z");
  return /*#__PURE__*/React.createElement("path", {
    className: "arc-component ".concat(_.kebabCase(data.label)),
    d: dataString
  });
};

Arc.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    largeArcFlag: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired
  })
};
export default Arc;