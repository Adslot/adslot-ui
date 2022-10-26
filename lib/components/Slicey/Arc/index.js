"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

const Arc = _ref => {
  let {
    data
  } = _ref;

  if (!data) {
    return /*#__PURE__*/_react.default.createElement("path", {
      className: "arc-component"
    });
  }

  const dataString = `M0,0 L${data.x1},${data.y1} A0.5,0.5 0 ${data.largeArcFlag},1 ${data.x2},${data.y2} z`;
  return /*#__PURE__*/_react.default.createElement("path", {
    className: `arc-component ${_lodash.default.kebabCase(data.label)}`,
    d: dataString
  });
};

Arc.propTypes = {
  data: _propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    id: _propTypes.default.number.isRequired,
    largeArcFlag: _propTypes.default.number.isRequired,
    x1: _propTypes.default.number.isRequired,
    y1: _propTypes.default.number.isRequired,
    x2: _propTypes.default.number.isRequired,
    y2: _propTypes.default.number.isRequired
  })
};
var _default = Arc;
exports.default = _default;