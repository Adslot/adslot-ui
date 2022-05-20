"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Empty = function Empty(_ref) {
  var collection = _ref.collection,
      text = _ref.text,
      icon = _ref.icon;

  if (_lodash.default.isEmpty(collection)) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "empty-component"
    }, icon, /*#__PURE__*/_react.default.createElement("div", {
      className: "empty-component-text"
    }, text));
  }

  return /*#__PURE__*/_react.default.createElement("div", null);
};

Empty.propTypes = {
  collection: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array, _propTypes.default.object]),
  text: _propTypes.default.node,
  // can be string or, if you want rich formatting, a node
  icon: _propTypes.default.node
};
Empty.defaultProps = {
  text: 'Nothing to show.'
};
var _default = Empty;
exports.default = _default;