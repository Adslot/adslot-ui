"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var OverlayLoader = function OverlayLoader(_ref) {
  var text = _ref.text,
      top = _ref.top,
      heading = _ref.heading,
      disableBackground = _ref.disableBackground;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: "aui--overlay-loader ".concat(disableBackground ? 'aui--overlay-loader-disabled' : '')
  }, disableBackground ? {
    onClick: function onClick(event) {
      return event.stopPropagation();
    }
  } : {}), /*#__PURE__*/_react.default.createElement("div", {
    className: "loader",
    style: {
      top: top
    }
  }, /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    size: "medium"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "loader-heading"
  }, heading), text && /*#__PURE__*/_react.default.createElement("span", {
    className: "loader-text"
  }, text)));
};

OverlayLoader.defaultProps = {
  heading: 'Loading',
  top: 320,
  disableBackground: false
};
OverlayLoader.propTypes = {
  heading: _propTypes.default.string,
  text: _propTypes.default.string,
  top: _propTypes.default.number,
  disableBackground: _propTypes.default.bool
};
var _default = OverlayLoader;
exports.default = _default;