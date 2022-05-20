"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var Donut = function Donut() {
  return /*#__PURE__*/_react.default.createElement("circle", {
    className: "donut-component",
    r: ".45",
    cx: "0",
    cy: "0"
  });
};

var _default = Donut;
exports.default = _default;