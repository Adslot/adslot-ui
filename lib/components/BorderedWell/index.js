"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
const BorderedWell = ({
  children
}) => /*#__PURE__*/_react.default.createElement("div", {
  className: "borderedwell-component"
}, children);
BorderedWell.propTypes = {
  children: _propTypes.default.node
};
var _default = exports.default = BorderedWell;