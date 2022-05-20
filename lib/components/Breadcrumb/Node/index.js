"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var BreadcrumbNode = function BreadcrumbNode(_ref) {
  var isLast = _ref.isLast,
      node = _ref.node,
      onClick = _ref.onClick;
  var className = (0, _classnames.default)('aui--breadcrumb-node', {
    'aui--breadcrumb-node-link': !isLast
  });

  var onClickNode = function onClickNode() {
    if (!isLast) onClick(node.id);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    onClick: onClickNode
  }, node.label);
};

BreadcrumbNode.propTypes = {
  isLast: _propTypes.default.bool.isRequired,
  node: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  }),
  onClick: _propTypes.default.func.isRequired
};
var _default = BreadcrumbNode;
exports.default = _default;