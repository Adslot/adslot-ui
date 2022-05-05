import React from 'react';
import PropTypes from 'prop-types';
import { ROUND, QUARTER, getPointX, getPointY } from '../dataProcessor';

var Marker = function Marker(_ref) {
  var fraction = _ref.fraction;

  var getMarkerPoints = function getMarkerPoints(markerValue) {
    var pointOnCircle = ROUND * markerValue - QUARTER;
    return "".concat(getPointX(pointOnCircle), ",").concat(getPointY(pointOnCircle), " 0,0");
  };

  return /*#__PURE__*/React.createElement("polyline", {
    className: "marker-component",
    points: getMarkerPoints(fraction)
  });
};

Marker.propTypes = {
  fraction: PropTypes.number
};
Marker.defaultProps = {
  fraction: 0
};
export default Marker;