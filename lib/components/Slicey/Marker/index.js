"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dataProcessor = require("../dataProcessor");

const Marker = _ref => {
  let {
    fraction
  } = _ref;

  const getMarkerPoints = markerValue => {
    const pointOnCircle = _dataProcessor.ROUND * markerValue - _dataProcessor.QUARTER;
    return `${(0, _dataProcessor.getPointX)(pointOnCircle)},${(0, _dataProcessor.getPointY)(pointOnCircle)} 0,0`;
  };

  return /*#__PURE__*/_react.default.createElement("polyline", {
    className: "marker-component",
    points: getMarkerPoints(fraction)
  });
};

Marker.propTypes = {
  fraction: _propTypes.default.number
};
Marker.defaultProps = {
  fraction: 0
};
var _default = Marker;
exports.default = _default;