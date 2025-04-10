"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
const BreadcrumbNode = ({
  isLast,
  node,
  onClick
}) => {
  const className = (0, _classnames.default)('aui--breadcrumb-node', {
    'aui--breadcrumb-node-link': !isLast
  });
  const onClickNode = () => {
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
    id: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
    label: _propTypes.default.string.isRequired
  }),
  onClick: _propTypes.default.func.isRequired
};
var _default = exports.default = BreadcrumbNode;